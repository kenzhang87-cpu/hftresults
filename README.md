# hftresults

A static dashboard of **sourced** revenue, net income, capital, and headcount for ten proprietary / HFT firms. It is built to make gaps visible, not to look complete.

The page is tables plus one plain chart. There are no KPI cards, no derived ROC / margin / PNL-per-head, and no interpolated quarters.

Live data file: [`data/observations.json`](data/observations.json) (240 observations, generated 2026-09-11).

## View locally

This is a zero-build static site. Browsers will not `fetch` the JSON from a `file://` URL, so serve the repo root over HTTP:

```bash
python3 -m http.server 8000
```

or

```bash
npx serve
```

Then open `http://localhost:8000`.

GitHub Pages can host the root as-is (`index.html` + `css/` + `js/` + `data/`).

## What you can do on the page

- Multi-select any subset of firms (default: all firms that have at least one observation). Select all / clear all.
- Toggle the chart metric: Revenue, Net income, Capital, or Headcount.
- Toggle period grain: **Annual** or **Quarterly**.
  - Quarterly plots only `period_type=quarter`. Annual-only firms show empty series. That is correct.
  - Annual plots only `period_type=annual`. FY / FY-ended labels are mapped to the year in the period; the original label stays in the table and tooltips.
- Sort the table. Hover a number for line item (ANTI vs NTR vs turnover are not the same), native currency, excerpt, and conflicts.
- See unique sources for the rows currently in view. Full bibliography: [`docs/sources.md`](docs/sources.md).

## Firms

Jane Street, Citadel Securities, Hudson River Trading, XTX Markets, Optiver, IMC Trading, Virtu Financial, Flow Traders, Quadrature Capital, Wolverine Trading.

Public names (Virtu, Flow) have dense quarterly series. Most private firms are annual-only. Wolverine has no public P&amp;L — capital from Form X-17A-5 only.

## Data integrity

- **Do not invent numbers.** If research did not find a figure, the cell is blank.
- **Do not interpolate** missing quarters or years in the UI. Chart lines break on gaps (`spanGaps: false`).
- **Do not annualize into quarters.** An FY print is never drawn as four quarterly points.
- **Conflicts are kept.** If two sources disagree on the same firm + period + metric, the table shows the preferred `confirmed` value and a conflict badge; both URLs appear in the tooltip. Values are never averaged. See IMC FY2023 revenue and Citadel FY2025 capital in [`docs/gaps.md`](docs/gaps.md).
- **Line items differ.** Hover to see whether a “revenue” cell is Adjusted Net Trading Income, net trading revenue, UK combined revenue, or statutory turnover.
- **Currency.** Chart and table display `value_usd` in millions of USD. When that field is missing in the JSON (some Optiver, XTX, and Flow annuals), the page applies the documented yearly EURUSD / GBPUSD averages from [`docs/sources.md`](docs/sources.md) and says so in the tooltip. Native currency remains on hover.
- Units: `value` / `value_usd` are millions unless `unit=count` (headcount).

## Research notes

| File | Contents |
| --- | --- |
| [`docs/firms.md`](docs/firms.md) | Per-firm public status, what is known, entity caveats |
| [`docs/sources.md`](docs/sources.md) | Bibliography (86 URLs) and FX table |
| [`docs/gaps.md`](docs/gaps.md) | Explicit firm × period × metric holes |

Numbers in those notes match the observation file. If they ever diverge, trust `data/observations.json` and file a correction — do not “smooth” the dashboard.

## What this replaces

An earlier dashboard at [kenzhang.tech/hftresults](https://kenzhang.tech/hftresults) (snapshot around 2026-04-07) showed annual trading PNL / NI / headcount / capital plus derived KPIs (PNL per head, ROC, margin) and estimate methodology. This version keeps the three raw series in the primary view and leaves methodology in `docs/` plus a collapsible footer.
