(() => {
  "use strict";

  function pageDir() {
    const url = new URL(window.location.href);
    let path = url.pathname;
    if (/\/index\.html$/i.test(path)) path = path.replace(/index\.html$/i, "/");
    if (!path.endsWith("/")) path += "/";
    url.pathname = path;
    url.search = "";
    url.hash = "";
    return url;
  }

  const DATA_URL = new URL("data/observations.json", pageDir()).href;

  const FIRM_ORDER = [
    "Jane Street",
    "Citadel Securities",
    "Hudson River Trading",
    "XTX Markets",
    "Optiver",
    "IMC Trading",
    "Virtu Financial",
    "Flow Traders",
    "Wolverine Trading",
    "Quadrature Capital",
  ];

  const FIRM_ABBR = {
    "Jane Street": "JS",
    "Citadel Securities": "CS",
    "Hudson River Trading": "HRT",
    "XTX Markets": "XTX",
    "Optiver": "OPT",
    "IMC Trading": "IMC",
    "Virtu Financial": "VIRT",
    "Flow Traders": "FLOW",
    "Wolverine Trading": "WLV",
    "Quadrature Capital": "QC",
  };

  const FIRM_COLORS = {
    "Jane Street": "#1d4ed8",
    "Citadel Securities": "#b45309",
    "Hudson River Trading": "#047857",
    "XTX Markets": "#7c3aed",
    "Optiver": "#be123c",
    "IMC Trading": "#0f766e",
    "Virtu Financial": "#1e3a8a",
    "Flow Traders": "#a16207",
    "Quadrature Capital": "#4b5563",
    "Wolverine Trading": "#9f1239",
  };

  const FX = {
    EUR: { 2019: 1.12, 2020: 1.14, 2021: 1.18, 2022: 1.05, 2023: 1.08, 2024: 1.08, 2025: 1.1, 2026: 1.1 },
    GBP: { 2019: 1.28, 2020: 1.28, 2021: 1.38, 2022: 1.24, 2023: 1.24, 2024: 1.28, 2025: 1.32, 2026: 1.3 },
  };

  const CONF_RANK = { confirmed: 0, estimated: 1, interpolated: 2, unknown: 3 };

  const METRIC_LABEL = {
    revenue: "Revenue",
    net_income: "Net income",
    capital: "Capital",
    headcount: "Headcount",
  };

  const state = {
    payload: null,
    observations: [],
    firms: [],
    selected: new Set(),
    metric: "revenue",
    grain: "annual",
    year: "all",
    sort: { key: "period", dir: "desc" },
    chart: null,
  };

  const els = {
    firmList: document.getElementById("firm-list"),
    selectAll: document.getElementById("select-all"),
    clearAll: document.getElementById("clear-all"),
    grainHint: document.getElementById("grain-hint"),
    yearList: document.getElementById("year-list"),
    chartCaption: document.getElementById("chart-caption"),
    chartEmpty: document.getElementById("chart-empty"),
    tableCaption: document.getElementById("table-caption"),
    tbody: document.querySelector("#table tbody"),
    sourceList: document.getElementById("source-list"),
    tip: document.getElementById("tip"),
    canvas: document.getElementById("chart"),
  };

  function periodYear(period) {
    const m = String(period).match(/(\d{4})/);
    return m ? Number(m[1]) : null;
  }

  function periodSortKey(period, periodType) {
    const q = String(period).match(/^(\d{4})Q(\d)$/);
    if (q) return Number(q[1]) * 100 + Number(q[2]) * 10;
    const fy = String(period).match(/^FY(\d{4})$/);
    if (fy) return Number(fy[1]) * 100 + 50;
    const jan = String(period).match(/^FY_ended_31Jan(\d{4})$/);
    if (jan) return Number(jan[1]) * 100 + 8;
    const mar = String(period).match(/^FYeMar(\d{4})$/);
    if (mar) return Number(mar[1]) * 100 + 20;
    if (period === "2025YTD9m") return 2025 * 100 + 70;
    const year = periodYear(period);
    return (year || 0) * 100 + (periodType === "half" ? 70 : 40);
  }

  function formatPeriod(period) {
    const q = String(period).match(/^(\d{4})Q(\d)$/);
    if (q) return `${q[1]} Q${q[2]}`;
    const fy = String(period).match(/^FY(\d{4})$/);
    if (fy) return `FY ${fy[1]}`;
    const jan = String(period).match(/^FY_ended_31Jan(\d{4})$/);
    if (jan) return `FY ended 31 Jan ${jan[1]}`;
    const mar = String(period).match(/^FYeMar(\d{4})$/);
    if (mar) return `FY ended Mar ${mar[1]}`;
    if (period === "2025YTD9m") return "2025 YTD 9m";
    return period;
  }

  function chartPeriodKey(obs) {
    if (obs.period_type === "quarter") return obs.period;
    if (obs.period_type === "half") return null;
    const year = periodYear(obs.period);
    return year ? `FY${year}` : obs.period;
  }

  function formatChartPeriod(key) {
    const q = String(key).match(/^(\d{4})Q(\d)$/);
    if (q) return `${q[1]} Q${q[2]}`;
    const fy = String(key).match(/^FY(\d{4})$/);
    if (fy) return `FY ${fy[1]}`;
    return formatPeriod(key);
  }

  function applyUsd(obs) {
    if (obs.unit === "count") {
      return { usd: obs.value, fxNote: null, fxRate: null };
    }
    if (obs.value_usd != null) {
      return { usd: obs.value_usd, fxNote: null, fxRate: obs.fx_rate };
    }
    if (obs.currency === "USD") {
      return { usd: obs.value, fxNote: null, fxRate: 1 };
    }
    const year = periodYear(obs.period);
    const table = FX[obs.currency];
    const rate = year && table ? table[year] : null;
    if (rate == null || obs.value == null) {
      return { usd: null, fxNote: "no USD conversion in source; yearly FX table also missing", fxRate: null };
    }
    return {
      usd: obs.value * rate,
      fxNote: `USD converted with documented ${obs.currency}USD ${year} average ${rate}`,
      fxRate: rate,
    };
  }

  function pickPreferred(list) {
    return [...list].sort((a, b) => {
      const c = (CONF_RANK[a.confidence] ?? 9) - (CONF_RANK[b.confidence] ?? 9);
      if (c) return c;
      const ua = a.value_usd == null ? 1 : 0;
      const ub = b.value_usd == null ? 1 : 0;
      if (ua !== ub) return ua - ub;
      return String(a.source_date || "").localeCompare(String(b.source_date || ""));
    })[0];
  }

  function valuesConflict(list) {
    if (list.length < 2) return false;
    const usds = list.map((o) => applyUsd(o).usd).filter((v) => v != null);
    if (usds.length < 2) return list.length > 1 && new Set(list.map((o) => o.source_url)).size > 1 && new Set(list.map((o) => o.value)).size > 1;
    const min = Math.min(...usds);
    const max = Math.max(...usds);
    return max - min > 0.05;
  }

  function formatNumber(value, kind) {
    if (value == null || Number.isNaN(value)) return "";
    if (kind === "headcount") {
      return Math.round(value).toLocaleString("en-US");
    }
    const abs = Math.abs(value);
    const digits = abs >= 100 ? 1 : abs >= 10 ? 1 : 2;
    return value.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: digits });
  }

  function grainMatch(obs) {
    if (state.grain === "quarter") return obs.period_type === "quarter";
    return obs.period_type === "annual" || obs.period_type === "half";
  }

  function chartGrainMatch(obs) {
    if (state.grain === "quarter") return obs.period_type === "quarter";
    return obs.period_type === "annual";
  }

  function selectedObservations() {
    return state.observations.filter((o) => state.selected.has(o.firm) && grainMatch(o));
  }

  function groupCells(obsList) {
    const groups = new Map();
    for (const obs of obsList) {
      const key = `${obs.firm}||${obs.period}||${obs.metric}`;
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(obs);
    }
    const cells = [];
    for (const list of groups.values()) {
      const preferred = pickPreferred(list);
      const usdInfo = applyUsd(preferred);
      cells.push({
        preferred,
        all: list,
        conflict: valuesConflict(list),
        usd: usdInfo.usd,
        fxNote: usdInfo.fxNote,
      });
    }
    return cells;
  }

  function tableRows(cells) {
    const rows = new Map();
    for (const cell of cells) {
      const o = cell.preferred;
      const key = `${o.firm}||${o.period}`;
      if (!rows.has(key)) {
        rows.set(key, {
          firm: o.firm,
          period: o.period,
          period_type: o.period_type,
          metrics: {},
          sources: [],
        });
      }
      const row = rows.get(key);
      row.metrics[o.metric] = cell;
      row.sources.push(cell);
    }
    return [...rows.values()];
  }

  function rowConfidence(row) {
    const cells = Object.values(row.metrics);
    if (cells.some((c) => c.conflict)) return "conflict";
    if (cells.some((c) => c.preferred.confidence !== "confirmed")) return "estimated";
    return "confirmed";
  }

  function primarySource(row) {
    const order = ["revenue", "net_income", "capital", "headcount"];
    for (const m of order) {
      if (row.metrics[m]) return row.metrics[m].preferred;
    }
    return null;
  }

  function buildQuarterKeys() {
    const keys = [];
    for (let year = 2019; year <= 2026; year += 1) {
      for (let q = 1; q <= 4; q += 1) {
        if (year === 2026 && q > 2) continue;
        keys.push(`${year}Q${q}`);
      }
    }
    return keys;
  }

  function buildAnnualKeys() {
    return ["FY2019", "FY2020", "FY2021", "FY2022", "FY2023", "FY2024", "FY2025"];
  }

  function renderFirms() {
    els.firmList.innerHTML = "";
    for (const firm of state.firms) {
      const id = `firm-${firm.replace(/\s+/g, "-").toLowerCase()}`;
      const label = document.createElement("label");
      label.htmlFor = id;
      label.title = firm;
      const input = document.createElement("input");
      input.type = "checkbox";
      input.id = id;
      input.value = firm;
      input.checked = state.selected.has(firm);
      input.addEventListener("change", () => {
        if (input.checked) state.selected.add(firm);
        else state.selected.delete(firm);
        render();
      });
      const swatch = document.createElement("span");
      swatch.setAttribute("aria-hidden", "true");
      swatch.style.width = "10px";
      swatch.style.height = "10px";
      swatch.style.background = FIRM_COLORS[firm] || "#444";
      swatch.style.flex = "0 0 10px";
      const abbr = document.createElement("span");
      abbr.className = "abbr";
      abbr.textContent = FIRM_ABBR[firm] || firm;
      const full = document.createElement("span");
      full.className = "full";
      full.textContent = firm;
      label.append(input, swatch, abbr, full);
      els.firmList.append(label);
    }
  }

  function availableYears() {
    const years = new Set();
    for (const obs of state.observations) {
      if (!grainMatch(obs)) continue;
      const year = periodYear(obs.period);
      if (year) years.add(year);
    }
    return [...years].sort((a, b) => b - a);
  }

  function renderYearFilter() {
    const years = availableYears();
    if (state.year !== "all" && !years.includes(state.year)) state.year = "all";
    els.yearList.replaceChildren();
    const options = [["all", "All"], ...years.map((y) => [String(y), String(y)])];
    for (const [value, labelText] of options) {
      const label = document.createElement("label");
      const input = document.createElement("input");
      input.type = "radio";
      input.name = "table-year";
      input.value = value;
      input.checked = String(state.year) === value;
      input.addEventListener("change", () => {
        if (!input.checked) return;
        state.year = value === "all" ? "all" : Number(value);
        render();
      });
      label.append(input, document.createTextNode(` ${labelText}`));
      els.yearList.append(label);
    }
  }

  function filterRowsByYear(rows) {
    if (state.year === "all") return rows;
    return rows.filter((row) => periodYear(row.period) === state.year);
  }

  function cellTooltip(cell) {
    if (!cell) return "";
    const lines = [];
    for (const obs of cell.all) {
      const usd = applyUsd(obs);
      const native =
        obs.unit === "count"
          ? `${formatNumber(obs.value, "headcount")} people`
          : `${obs.currency} ${formatNumber(obs.value, obs.metric)}m`;
      const usdText =
        obs.unit === "count"
          ? ""
          : usd.usd == null
            ? " · no USD"
            : ` · $${formatNumber(usd.usd, obs.metric)}m`;
      lines.push(`${obs.line_item}: ${native}${usdText} (${obs.confidence})`);
      if (usd.fxNote) lines.push(usd.fxNote);
      if (obs.excerpt) lines.push(`“${obs.excerpt}”`);
      if (obs.notes) lines.push(obs.notes);
      lines.push(obs.source_publisher + (obs.source_date ? ` · ${obs.source_date}` : ""));
      if (cell.all.length > 1) lines.push(obs.source_url);
      if (cell.all.indexOf(obs) !== cell.all.length - 1) lines.push("");
    }
    if (cell.conflict) {
      lines.unshift("Conflict: multiple sourced values. Cell shows preferred confirmed figure; nothing was averaged.");
    }
    return lines.join("\n");
  }

  function tipHtml(text) {
    return text
      .split("\n")
      .map((line) => {
        if (!line) return "<br>";
        return `<div>${escapeHtml(line)}</div>`;
      })
      .join("");
  }

  function escapeHtml(s) {
    return String(s)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");
  }

  function bindTip(el, text) {
    if (!text) return;
    el.classList.add("cell-with-tip");
    el.addEventListener("pointerenter", (ev) => showTip(text, ev));
    el.addEventListener("pointermove", (ev) => moveTip(ev));
    el.addEventListener("pointerleave", hideTip);
  }

  function showTip(text, ev) {
    els.tip.hidden = false;
    els.tip.innerHTML = tipHtml(text);
    moveTip(ev);
  }

  function moveTip(ev) {
    const pad = 14;
    const rect = els.tip.getBoundingClientRect();
    let x = ev.clientX + pad;
    let y = ev.clientY + pad;
    if (x + rect.width > window.innerWidth - 8) x = ev.clientX - rect.width - pad;
    if (y + rect.height > window.innerHeight - 8) y = ev.clientY - rect.height - pad;
    els.tip.style.left = `${Math.max(8, x)}px`;
    els.tip.style.top = `${Math.max(8, y)}px`;
  }

  function hideTip() {
    els.tip.hidden = true;
  }

  function renderTable(rows) {
    const { key, dir } = state.sort;
    const mul = dir === "asc" ? 1 : -1;
    const sorted = [...rows].sort((a, b) => {
      const cmp = compareRows(a, b, key);
      if (cmp !== 0) return cmp * mul;
      const firm = a.firm.localeCompare(b.firm);
      if (firm) return firm;
      return periodSortKey(a.period, a.period_type) - periodSortKey(b.period, b.period_type);
    });

    els.tbody.replaceChildren();
    for (const row of sorted) {
      const tr = document.createElement("tr");
      tr.append(textTd(row.firm));
      tr.append(textTd(formatPeriod(row.period)));
      for (const metric of ["revenue", "net_income", "capital", "headcount"]) {
        tr.append(metricTd(row.metrics[metric], metric));
      }
      tr.append(confidenceTd(row));
      tr.append(sourceTd(row));
      els.tbody.append(tr);
    }

    els.tableCaption.textContent = `${sorted.length} period row${sorted.length === 1 ? "" : "s"} for ${state.selected.size} firm${state.selected.size === 1 ? "" : "s"}${state.year === "all" ? "" : ` in ${state.year}`}. Blank cells are missing observations.`;
  }

  function compareRows(a, b, key) {
    if (key === "firm") return a.firm.localeCompare(b.firm);
    if (key === "period") return periodSortKey(a.period, a.period_type) - periodSortKey(b.period, b.period_type);
    if (key === "confidence") return rowConfidence(a).localeCompare(rowConfidence(b));
    if (key === "source") {
      const sa = primarySource(a)?.source_publisher || "";
      const sb = primarySource(b)?.source_publisher || "";
      return sa.localeCompare(sb);
    }
    const va = a.metrics[key]?.usd;
    const vb = b.metrics[key]?.usd;
    if (va == null && vb == null) return 0;
    if (va == null) return 1;
    if (vb == null) return -1;
    return va - vb;
  }

  function textTd(text) {
    const td = document.createElement("td");
    td.textContent = text;
    return td;
  }

  function metricTd(cell, metric) {
    const td = document.createElement("td");
    td.className = "num";
    if (!cell || cell.usd == null) {
      td.classList.add("blank");
      td.textContent = "—";
      return td;
    }
    td.textContent = formatNumber(cell.usd, metric);
    if (cell.preferred.confidence !== "confirmed") {
      const badge = document.createElement("span");
      badge.className = "badge badge-est";
      badge.textContent = "est.";
      td.append(" ", badge);
    }
    if (cell.conflict) {
      const badge = document.createElement("span");
      badge.className = "badge badge-conflict";
      badge.textContent = "conflict";
      td.append(" ", badge);
    }
    bindTip(td, cellTooltip(cell));
    return td;
  }

  function confidenceTd(row) {
    const td = document.createElement("td");
    const rank = rowConfidence(row);
    const badge = document.createElement("span");
    if (rank === "confirmed") {
      badge.className = "badge badge-ok";
      badge.textContent = "confirmed";
    } else if (rank === "estimated") {
      badge.className = "badge badge-est";
      badge.textContent = "estimated";
    } else {
      badge.className = "badge badge-conflict";
      badge.textContent = "conflict";
    }
    td.append(badge);
    const notes = Object.values(row.metrics)
      .filter((c) => c.conflict || c.preferred.confidence !== "confirmed")
      .map((c) => cellTooltip(c));
    if (notes.length) bindTip(td, notes.join("\n\n"));
    return td;
  }

  function sourceTd(row) {
    const td = document.createElement("td");
    const seen = new Map();
    for (const cell of Object.values(row.metrics)) {
      for (const obs of cell.all) {
        if (!seen.has(obs.source_url)) seen.set(obs.source_url, obs);
      }
    }
    const list = [...seen.values()];
    if (!list.length) {
      td.textContent = "—";
      return td;
    }
    const first = list[0];
    const a = document.createElement("a");
    a.href = first.source_url;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.textContent = first.source_publisher || "Source";
    td.append(a);
    if (list.length > 1) {
      td.append(document.createTextNode(` +${list.length - 1}`));
    }
    const tip = list
      .map((o) => `${o.source_publisher}${o.source_date ? ` · ${o.source_date}` : ""}\n${o.source_url}`)
      .join("\n\n");
    bindTip(td, tip);
    return td;
  }

  function renderSources(rows) {
    const seen = new Map();
    for (const row of rows) {
      for (const cell of Object.values(row.metrics)) {
        for (const obs of cell.all) {
          const key = `${obs.source_publisher}||${obs.source_url}`;
          if (!seen.has(key)) {
            seen.set(key, {
              publisher: obs.source_publisher,
              url: obs.source_url,
              date: obs.source_date || "",
            });
          }
        }
      }
    }
    const items = [...seen.values()].sort((a, b) => {
      const p = String(a.publisher).localeCompare(String(b.publisher));
      if (p) return p;
      return String(b.date).localeCompare(String(a.date));
    });
    els.sourceList.replaceChildren();
    if (!items.length) {
      const li = document.createElement("li");
      li.textContent = "No sources in view. Select at least one firm.";
      els.sourceList.append(li);
      return;
    }
    for (const item of items) {
      const li = document.createElement("li");
      const pub = document.createElement("span");
      pub.className = "pub";
      pub.textContent = item.publisher || "Unknown publisher";
      const date = document.createElement("span");
      date.className = "date";
      date.textContent = item.date || "date unknown";
      const link = document.createElement("a");
      link.href = item.url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = item.url;
      li.append(pub, date, link);
      els.sourceList.append(li);
    }
  }

  function renderChart(cells) {
    const keys = state.grain === "quarter" ? buildQuarterKeys() : buildAnnualKeys();
    const byFirm = new Map();
    for (const firm of state.firms) {
      if (state.selected.has(firm)) byFirm.set(firm, new Map());
    }
    for (const cell of cells) {
      const obs = cell.preferred;
      if (!chartGrainMatch(obs)) continue;
      if (obs.metric !== state.metric) continue;
      const key = chartPeriodKey(obs);
      if (!key || !byFirm.has(obs.firm)) continue;
      byFirm.get(obs.firm).set(key, cell);
    }

    const labels = keys.map(formatChartPeriod);
    const datasets = [];
    let anyPoint = false;
    for (const firm of state.firms) {
      if (!state.selected.has(firm)) continue;
      const series = byFirm.get(firm);
      const data = keys.map((key) => {
        const cell = series.get(key);
        if (!cell || cell.usd == null) return null;
        anyPoint = true;
        return cell.usd;
      });
      datasets.push({
        label: firm,
        data,
        borderColor: FIRM_COLORS[firm] || "#333",
        backgroundColor: FIRM_COLORS[firm] || "#333",
        spanGaps: false,
        tension: 0,
        pointRadius: 3,
        pointHoverRadius: 5,
        borderWidth: 1.75,
      });
    }

    const yTitle = state.metric === "headcount" ? "Employees" : "USD millions";
    els.chartCaption.textContent =
      state.grain === "quarter"
        ? `${METRIC_LABEL[state.metric]} · quarterly observations only. Annual-only firms have empty series.`
        : `${METRIC_LABEL[state.metric]} · annual observations only. FY-ended labels map to the year in the period (tooltip keeps the original). YTD / half-year prints stay in the table.`;

    if (!datasets.length) {
      els.chartEmpty.hidden = false;
      els.chartEmpty.textContent = "Select one or more firms.";
    } else if (!anyPoint) {
      els.chartEmpty.hidden = false;
      els.chartEmpty.textContent =
        state.grain === "quarter"
          ? "No quarterly observations for this metric among the selected firms. That is a real gap — try Annual."
          : "No annual observations for this metric among the selected firms.";
    } else {
      els.chartEmpty.hidden = true;
      els.chartEmpty.textContent = "";
    }

    const pointMeta = datasets.map((ds) => {
      const series = byFirm.get(ds.label);
      return keys.map((key) => series.get(key) || null);
    });

    if (state.chart) state.chart.destroy();
    state.chart = new Chart(els.canvas, {
      type: "line",
      data: { labels, datasets },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: "nearest", intersect: false },
        plugins: {
          legend: { position: "bottom", labels: { boxWidth: 12, font: { size: 11 } } },
          tooltip: {
            callbacks: {
              label(ctx) {
                const cell = pointMeta[ctx.datasetIndex]?.[ctx.dataIndex];
                if (!cell) return `${ctx.dataset.label}: —`;
                const unit = state.metric === "headcount" ? "" : "m";
                const usd = formatNumber(cell.usd, state.metric);
                const native =
                  cell.preferred.currency && cell.preferred.currency !== "USD" && cell.preferred.unit !== "count"
                    ? ` (${cell.preferred.currency} ${formatNumber(cell.preferred.value, state.metric)}m)`
                    : "";
                return `${ctx.dataset.label}: ${usd}${unit}${native} · ${cell.preferred.line_item}`;
              },
            },
          },
        },
        scales: {
          x: {
            ticks: { maxRotation: 60, minRotation: 0, font: { size: 10 } },
            grid: { color: "#eeeae2" },
          },
          y: {
            beginAtZero: true,
            title: { display: true, text: yTitle },
            grid: { color: "#eeeae2" },
            ticks: {
              callback(value) {
                return formatNumber(value, state.metric);
              },
            },
          },
        },
      },
    });
  }

  function renderGrainHint() {
    els.grainHint.textContent =
      state.grain === "quarter"
        ? "Only period_type=quarter is plotted. Jane Street, Optiver, XTX, IMC, Quadrature, Wolverine will look empty or nearly empty."
        : "Only period_type=annual is plotted. Virtu and Flow still have annual totals; their dense series appear under Quarterly.";
  }

  function render() {
    const cells = groupCells(selectedObservations());
    renderGrainHint();
    renderYearFilter();
    const rows = filterRowsByYear(tableRows(cells));
    renderChart(cells);
    renderTable(rows);
    renderSources(rows);
  }

  function bindControls() {
    els.selectAll.addEventListener("click", () => {
      state.selected = new Set(state.firms);
      renderFirms();
      render();
    });
    els.clearAll.addEventListener("click", () => {
      state.selected.clear();
      renderFirms();
      render();
    });
    document.querySelectorAll('input[name="metric"]').forEach((input) => {
      input.addEventListener("change", () => {
        if (input.checked) {
          state.metric = input.value;
          render();
        }
      });
    });
    document.querySelectorAll('input[name="grain"]').forEach((input) => {
      input.addEventListener("change", () => {
        if (input.checked) {
          state.grain = input.value;
          render();
        }
      });
    });
    document.querySelectorAll("#table thead th[data-sort]").forEach((th) => {
      th.querySelector("button").addEventListener("click", () => {
        const key = th.dataset.sort;
        if (state.sort.key === key) {
          state.sort.dir = state.sort.dir === "asc" ? "desc" : "asc";
        } else {
          state.sort = { key, dir: key === "firm" || key === "period" || key === "source" ? "asc" : "desc" };
        }
        document.querySelectorAll("#table thead th").forEach((el) => el.setAttribute("aria-sort", "none"));
        th.setAttribute("aria-sort", state.sort.dir === "asc" ? "ascending" : "descending");
        render();
      });
    });
  }

  function showFatal(message) {
    const box = document.createElement("div");
    box.className = "error";
    box.innerHTML = `<strong>Could not load observations.</strong><p>${escapeHtml(message)}</p><p>Serve the repo over HTTP (for example <code>python3 -m http.server</code> from the project root) so <code>data/observations.json</code> can be fetched.</p>`;
    document.body.prepend(box);
  }

  async function init() {
    bindControls();
    let payload;
    try {
      const res = await fetch(DATA_URL);
      if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
      payload = await res.json();
    } catch (err) {
      showFatal(err.message || String(err));
      return;
    }
    state.payload = payload;
    state.observations = payload.observations || [];
    const names = payload.firms || [...new Set(state.observations.map((o) => o.firm))];
    state.firms = [...names].sort((a, b) => {
      const ia = FIRM_ORDER.indexOf(a);
      const ib = FIRM_ORDER.indexOf(b);
      return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib) || a.localeCompare(b);
    });
    state.selected = new Set(state.firms);
    const meta = document.querySelector(".meta");
    if (meta && payload.generated) {
      meta.textContent = `Research access date ${payload.generated}. ${payload.observation_count} observations. ${payload.units_note || ""}`;
    }
    const badge = document.getElementById("updated-badge");
    if (badge && payload.generated) badge.textContent = `Research ${payload.generated}`;
    renderFirms();
    render();
  }

  init();
})();
