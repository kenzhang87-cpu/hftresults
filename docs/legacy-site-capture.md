# HFT Results live capture

Captured **2026-09-11 09:09 EDT / 13:09 UTC**. The origin `https://kenzhang.tech/hftresults/` was returning `ERR_CONNECTION_CLOSED` in Chrome/curl, so the same live origin was rendered through Google Translate's public proxy at `https://kenzhang-tech.translate.goog/hftresults/?_x_tr_sl=auto&_x_tr_tl=en&_x_tr_hl=en`. The returned HTML is saved at `/workspace/hftresults-capture-source.html`; screenshots are in `/workspace/hftresults-shots/`. No login or site modification was performed.

## Dashboard identity and controls

- Title: **Prop Trading Dashboard** / **Prop Trading Firms — Dashboard**.
- Badge: **Updated Apr 7, 2026**.
- Firm filter pills: All, JS, CS, HRT, XTX, OPT, IMC, VIRT, FLOW, WLV, QC.
- Metrics-year filter: 2019–2025, default 2025. Historical-table filters: All Years/2026/2025/2024/2023/2022/2021/2020/2019 and All Firms or each firm.
- Table default is 2025; I switched it to **All Years** to expose every non-empty row. The table initially sorts year descending; the complete table below is normalized firm/year order.

## KPI cards

- Industry Total PNL: **$80.4B**, “8 firms with data (2025)”.
- Top Performer: **$39.6B**, Jane Street — record.
- Fastest Growing: **55% YoY**, HRT.
- Highest PNL/Head: **$10.3M**, HRT.
- Best ROC: **~84%**, HRT.
- Biggest Headcount: **~3,500**, Jane Street (est.).

## Headcount snapshot (2025)

| Firm | 2025 FTE | YoY vs 2024 |
|---|---:|---:|
| Jane Street | 3,500 | ▲18% |
| Citadel Securities | 1,800 | ▲3% |
| HRT | 1,100 | — flat |
| XTX Markets | 270 | ▲3% |
| Optiver | 2,230 | ▲6% |
| IMC Trading | 1,900 | ▲19% |
| Virtu Financial | 1,027 | ▲6% |
| Flow Traders | 680 | ▲12% |
| Wolverine | 338 | — flat; estimated |
| Quadrature | N/A (card omitted) | — |

The ranked chart orders Jane Street, Optiver, IMC Trading, Citadel Securities, HRT, Virtu Financial, Flow Traders, Wolverine, XTX Markets.

## Full historical table

Values retain the site's display rules: values below $1B show `$m`; values at least $1B show `$B` to 2 decimals; calculated metrics are rounded to one decimal. `N/A`/`—` are the site's visible missing-value markers. `~est` is the actual table badge and its hover tooltip is summarized in the last column; the badge is applied to the populated raw cells for that firm/year.

| Firm | Year | Trading PNL ($B) | Net Income ($B) | Headcount | Capital ($B) | PNL/Head ($M) | ROC (%) | Margin (%) | Estimate badge / tooltip basis |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---|
| Jane Street | 2019 | $1.50B | $500m | 700 | $3.80B | $2.1M | 39.5% | 33.3% | ~est — 2019–2021: Bloomberg bond offering documents, interview references and industry reports; no public accounts. 2022–2025 confirmed via Bloomberg; 2025 $39.6B confirmed April 2026. |
| Jane Street | 2020 | $6.00B | $3.00B | 900 | $8.00B | $6.7M | 75.0% | 50.0% | ~est — 2019–2021: Bloomberg bond offering documents, interview references and industry reports; no public accounts. 2022–2025 confirmed via Bloomberg; 2025 $39.6B confirmed April 2026. |
| Jane Street | 2021 | $5.30B | $2.50B | 1,500 | $12.00B | $3.5M | 44.2% | 47.2% | ~est — 2019–2021: Bloomberg bond offering documents, interview references and industry reports; no public accounts. 2022–2025 confirmed via Bloomberg; 2025 $39.6B confirmed April 2026. |
| Jane Street | 2022 | $12.00B | $7.20B | 2,000 | $16.00B | $6.0M | 75.0% | 60.0% | — |
| Jane Street | 2023 | $10.60B | $7.40B | 2,500 | $22.00B | $4.2M | 48.2% | 69.8% | — |
| Jane Street | 2024 | $20.50B | $13.00B | 2,960 | $29.90B | $6.9M | 68.6% | 63.4% | — |
| Jane Street | 2025 | $39.60B | $17.00B | 3,500 | $45.00B | $11.3M | 88.0% | 42.9% | — |
| Citadel Securities | 2019 | $4.00B | $2.00B | 1,000 | $7.00B | $4.0M | 57.1% | 50.0% | ~est — 2019 industry benchmarks/trajectory; 2020 confirmed Risk.net $6.7B; 2021 estimated record year; 2022–2025 Bloomberg disclosures. |
| Citadel Securities | 2020 | $6.70B | $4.00B | 1,200 | $10.00B | $5.6M | 67.0% | 59.7% | — |
| Citadel Securities | 2021 | $7.00B | $4.50B | 1,500 | $14.00B | $4.7M | 50.0% | 64.3% | ~est — 2019 industry benchmarks/trajectory; 2020 confirmed Risk.net $6.7B; 2021 estimated record year; 2022–2025 Bloomberg disclosures. |
| Citadel Securities | 2022 | $7.50B | $4.20B | 1,800 | $16.00B | $4.2M | 46.9% | 56.0% | — |
| Citadel Securities | 2023 | $6.30B | $4.30B | 2,000 | $18.00B | $3.1M | 35.0% | 68.3% | — |
| Citadel Securities | 2024 | $9.70B | $4.20B | 1,750 | $20.00B | $5.5M | 48.5% | 43.3% | — |
| Citadel Securities | 2025 | $12.20B | $5.40B | 1,800 | $21.80B | $6.8M | 56.0% | 44.3% | — |
| HRT | 2019 | $500m | $200m | 300 | $300m | $1.7M | 166.7% | 40.0% | ~est — 2019–2021 Bloomberg/industry estimates; 2022 Bloomberg $2.5B confirmed; 2023 interpolated (~$4B) between 2022 and 2024; 2024–2025 Bloomberg. |
| HRT | 2020 | $1.50B | $800m | 400 | $800m | $3.8M | 187.5% | 53.3% | ~est — 2019–2021 Bloomberg/industry estimates; 2022 Bloomberg $2.5B confirmed; 2023 interpolated (~$4B) between 2022 and 2024; 2024–2025 Bloomberg. |
| HRT | 2021 | $2.00B | $1.00B | 500 | $1.50B | $4.0M | 133.3% | 50.0% | ~est — 2019–2021 Bloomberg/industry estimates; 2022 Bloomberg $2.5B confirmed; 2023 interpolated (~$4B) between 2022 and 2024; 2024–2025 Bloomberg. |
| HRT | 2022 | $2.50B | $1.00B | 700 | $3.00B | $3.6M | 83.3% | 40.0% | — |
| HRT | 2023 | $4.00B | $1.50B | 900 | $5.00B | $4.4M | 80.0% | 37.5% | ~est — 2019–2021 Bloomberg/industry estimates; 2022 Bloomberg $2.5B confirmed; 2023 interpolated (~$4B) between 2022 and 2024; 2024–2025 Bloomberg. |
| HRT | 2024 | $8.00B | $3.50B | 1,100 | $9.00B | $7.3M | 88.9% | 43.8% | — |
| HRT | 2025 | $12.30B | $8.00B | 1,100 | $14.70B | $11.2M | 83.7% | 65.0% | — |
| XTX Markets | 2019 | $500m | $200m | 170 | $500m | $2.9M | 100.0% | 40.0% | ~est — Pre-2022 estimated; partial UK filings understate group after Brexit; 2022–2025 combined UK entities. |
| XTX Markets | 2020 | $1.00B | $400m | 200 | $800m | $5.0M | 125.0% | 40.0% | ~est — Pre-2022 estimated; partial UK filings understate group after Brexit; 2022–2025 combined UK entities. |
| XTX Markets | 2021 | $1.20B | $600m | 220 | $1.00B | $5.5M | 120.0% | 50.0% | ~est — Pre-2022 estimated; partial UK filings understate group after Brexit; 2022–2025 combined UK entities. |
| XTX Markets | 2022 | $3.08B | $1.36B | 240 | $1.20B | $12.8M | 256.7% | 44.2% | — |
| XTX Markets | 2023 | $2.48B | $1.04B | 280 | $1.50B | $8.9M | 165.3% | 41.9% | — |
| XTX Markets | 2024 | $3.51B | $1.64B | 263 | $2.00B | $13.3M | 175.5% | 46.7% | — |
| XTX Markets | 2025 | $5.15B | $2.24B | 270 | $2.50B | $19.1M | 206.0% | 43.5% | — |
| Optiver | 2019 | $1.26B | $440m | 1,010 | $1.70B | $1.2M | 74.1% | 34.9% | — |
| Optiver | 2020 | $3.54B | $1.57B | 1,200 | $2.80B | $3.0M | 126.4% | 44.4% | — |
| Optiver | 2021 | $2.56B | $1.06B | 1,390 | $3.10B | $1.8M | 82.6% | 41.4% | — |
| Optiver | 2022 | $3.45B | $1.35B | 1,709 | $3.75B | $2.0M | 92.0% | 39.1% | — |
| Optiver | 2023 | $2.99B | $1.25B | 1,952 | $4.43B | $1.5M | 67.5% | 41.8% | — |
| Optiver | 2024 | $3.77B | $1.48B | 2,100 | $5.30B | $1.8M | 71.1% | 39.3% | — |
| Optiver | 2025 | $5.02B | $1.95B | 2,230 | $6.04B | $2.3M | 83.1% | 38.8% | — |
| IMC Trading | 2019 | $700m | $560m | 1,100 | $800m | $0.6M | 87.5% | 80.0% | ~est — 2019–2021 Dutch AFM filings/industry estimates; 2022–2025 IMC annual reports. |
| IMC Trading | 2020 | $900m | $620m | 1,200 | $1.00B | $0.8M | 90.0% | 68.9% | ~est — 2019–2021 Dutch AFM filings/industry estimates; 2022–2025 IMC annual reports. |
| IMC Trading | 2021 | $1.30B | $560m | 1,300 | $1.20B | $1.0M | 108.3% | 43.1% | ~est — 2019–2021 Dutch AFM filings/industry estimates; 2022–2025 IMC annual reports. |
| IMC Trading | 2022 | $1.64B | $530m | 1,400 | $1.74B | $1.2M | 94.3% | 32.3% | — |
| IMC Trading | 2023 | $1.37B | $310m | 1,500 | $1.68B | $0.9M | 81.5% | 22.6% | — |
| IMC Trading | 2024 | $2.41B | $740m | 1,600 | $2.70B | $1.5M | 89.3% | 30.7% | — |
| IMC Trading | 2025 | $3.43B | $1.07B | 1,900 | $4.39B | $1.8M | 78.1% | 31.2% | — |
| Virtu Financial | 2019 | $1.45B | $-100m | 1,550 | $1.90B | $0.9M | 76.3% | -6.9% | — |
| Virtu Financial | 2020 | $3.24B | $1.12B | 1,600 | $2.10B | $2.0M | 154.3% | 34.6% | — |
| Virtu Financial | 2021 | $2.81B | $830m | 1,550 | $2.30B | $1.8M | 122.2% | 29.5% | — |
| Virtu Financial | 2022 | $1.47B | $470m | 1,400 | $2.50B | $1.1M | 58.8% | 32.0% | — |
| Virtu Financial | 2023 | $1.21B | $260m | 1,150 | $2.60B | $1.1M | 46.5% | 21.5% | — |
| Virtu Financial | 2024 | $1.60B | $530m | 969 | $2.80B | $1.7M | 57.1% | 33.1% | — |
| Virtu Financial | 2025 | $2.15B | $910m | 1,027 | $3.40B | $2.1M | 63.2% | 42.3% | — |
| Virtu Financial | 2026 Q1 | $787m | $347m | N/A | $3.15B | — | 25.0% | 44.1% | — |
| Flow Traders | 2019 | $240m | $60m | 494 | $410m | $0.5M | 58.5% | 25.0% | — |
| Flow Traders | 2020 | $1.03B | $520m | 517 | $860m | $2.0M | 119.8% | 50.5% | — |
| Flow Traders | 2021 | $430m | $130m | 568 | $680m | $0.8M | 63.2% | 30.2% | — |
| Flow Traders | 2022 | $480m | $130m | 660 | $720m | $0.7M | 66.7% | 27.1% | — |
| Flow Traders | 2023 | $320m | $40m | 613 | $630m | $0.5M | 50.8% | 12.5% | — |
| Flow Traders | 2024 | $520m | $170m | 609 | $840m | $0.9M | 61.9% | 32.7% | — |
| Flow Traders | 2025 | $530m | $150m | 680 | $1.15B | $0.8M | 46.1% | 28.3% | — |
| Flow Traders | 2026 Q1 | $172m | $55m | 656 | $1.20B | $0.3M | 14.3% | 32.0% | — |
| Wolverine | 2019 | N/A | N/A | 285 | N/A | — | — | — | ~est — Private, no public financial disclosures; all figures estimated from industry benchmarks, headcount-scaled PNL ratios and Bloomberg references. |
| Wolverine | 2020 | N/A | N/A | 300 | N/A | — | — | — | ~est — Private, no public financial disclosures; all figures estimated from industry benchmarks, headcount-scaled PNL ratios and Bloomberg references. |
| Wolverine | 2021 | N/A | N/A | 320 | N/A | — | — | — | ~est — Private, no public financial disclosures; all figures estimated from industry benchmarks, headcount-scaled PNL ratios and Bloomberg references. |
| Wolverine | 2022 | N/A | N/A | 340 | N/A | — | — | — | ~est — Private, no public financial disclosures; all figures estimated from industry benchmarks, headcount-scaled PNL ratios and Bloomberg references. |
| Wolverine | 2023 | N/A | N/A | 340 | N/A | — | — | — | ~est — Private, no public financial disclosures; all figures estimated from industry benchmarks, headcount-scaled PNL ratios and Bloomberg references. |
| Wolverine | 2024 | N/A | N/A | 338 | N/A | — | — | — | ~est — Private, no public financial disclosures; all figures estimated from industry benchmarks, headcount-scaled PNL ratios and Bloomberg references. |
| Wolverine | 2025 | N/A | N/A | 338 | N/A | — | — | — | ~est — Private, no public financial disclosures; all figures estimated from industry benchmarks, headcount-scaled PNL ratios and Bloomberg references. |
| Quadrature | 2019 | $460m | $310m | 68 | $550m | $6.8M | 83.6% | 67.4% | — |
| Quadrature | 2020 | $580m | $340m | 83 | $900m | $7.0M | 64.4% | 58.6% | — |
| Quadrature | 2021 | $1.34B | $730m | 98 | $1.68B | $13.7M | 79.8% | 54.5% | — |
| Quadrature | 2022 | $820m | $280m | 113 | $1.79B | $7.3M | 45.8% | 34.1% | — |
| Quadrature | 2023 | $740m | $60m | 143 | $240m | $5.2M | 308.3% | 8.1% | — |
| Quadrature | 2024 | $1.57B | $530m | 173 | $390m | $9.1M | 402.6% | 33.8% | — |

**Rows covered:** 71 visible non-empty rows. Wolverine has only estimated headcount rows; fully empty Wolverine 2026 and Quadrature 2025–2026 are filtered out by the site.

## Charts

- Employees Ranked — 2025.
- Trading PNL / Net Trading Income ($B): bar and trajectory (2019–2026).
- Net Income ($B): bar and trajectory.
- Headcount (FTEs): bar and trajectory.
- Trading Capital ($B): bar and trajectory.
- Performance Metrics (year selector): PNL per Head ($M/Employee), Return on Capital (%), Net Income Margin (%), and Revenue CAGR 2019–selected year (%). Default is 2025.

## Data Sources listed on the page

- Jane Street 2024 — [MLQ.ai — Jane Street Reports Record $20.5B Revenue](https://mlq.ai/news/jane-street-reports-record-205-billion-net-trading-revenue-for-2024-nearly-doubling-previous-year/)
- Jane Street 2025 — [Bloomberg — Jane Street Record $39.6B Trading Haul](https://www.bloomberg.com/news/articles/2026-04-24/jane-street-snatches-wall-street-crown-with-record-39-6-billion-trading-haul)
- Citadel Securities 2025 — [Bloomberg — Nets Record $12B](https://www.bloomberg.com/news/articles/2026-03-24/citadel-securities-nets-record-12-billion-trading-haul-in-2025)
- HRT 2024 — [Business Insider — HRT $8B Trading Revenue](https://www.businessinsider.com/hudson-river-trading-hrt-8-billion-trading-revenue-2025-3)
- HRT 2025 — [Bloomberg — 2025 Revenue Record $12.3B](https://www.bloomberg.com/news/articles/2026-01-13/hudson-river-s-2025-trading-revenue-set-for-record-12-3-billion)
- XTX Markets 2025 — [Finance Magnates — Revenue Rises 43%](https://www.financemagnates.com/forex/brokers/xtx-markets-revenue-rises-43-to-393-billion-in-2025/)
- Optiver 2025 — [Optiver — Robust Financial Results](https://optiver.com/optiver-reports-robust-financial-results-for-2025/)
- Optiver 2024 — [Optiver — Strong Financial Results](https://optiver.com/optiver-reports-strong-financial-results-for-2024/)
- IMC Trading 2025 — [Bloomberg — Trading Revenue Rises 40%](https://www.bloomberg.com/news/articles/2026-03-26/market-maker-imc-s-trading-revenue-rises-40-on-volatility-surge)
- IMC Trading 2024 — [IMC — 2024 Annual Report](https://www.imc.com/us/corporate-news/IMC-launches-2024-annual-report)
- Virtu Financial 2025 — [Investing.com — Q4 2025 Earnings](https://www.investing.com/news/transcripts/earnings-call-transcript-virtu-financial-q4-2025-beats-eps-expectations-93CH-4480938)
- Flow Traders 2025 — [Flow Traders — FY 2025 Results](https://www.flowtraders.com/news/flow-traders-4q-fy-2025-results/)
- Quadrature Capital (all years) — [Companies House filing history](https://find-and-update.company-information.service.gov.uk/company/09516131/filing-history)
- Quadrature FY Jan 2025 — [Companies House full accounts PDF](https://find-and-update.company-information.service.gov.uk/company/09516131/filing-history/MzQ4NDg0MjIyMGFkaXF6a2N4/document?format=pdf&download=0)
- Citadel Securities 2020 (confirmed) — [Risk.net](https://www.risk.net/derivatives/7934291/flow-market-maker-of-the-year-citadel-securities)
- HRT 2021 estimate basis — [Bloomberg](https://www.bloomberg.com/news/articles/2021-06-24/prop-trader-hudson-river-reaps-1-billion-in-frenzied-quarter)
- HRT 2023 estimate basis — [S&P Global](https://www.spglobal.com/ratings/en/regulatory/article/-/view/type/HTML/id/3119087)
- XTX Markets 2019–2020 estimate basis — [FX News Group](https://fxnewsgroup.com/forex-news/institutional/exclusive-market-maker-xtx-markets-sees-2020-revenue-soar-92-to-651m/)
- XTX Markets 2021 estimate basis — [Finance Magnates](https://www.financemagnates.com/forex/brokers/xtx-markets-2021-revenue-dropped-by-18-cites-brexit/)

The rendered table also adds source-arrow links per populated revenue/income/headcount/capital cell. The complete year-by-year `SOURCES` and `CAPITAL_SOURCES` objects, including those links/labels, are preserved in the raw source HTML and summarized in the JS payload section below.

## Methodology & notes (page text)

- EUR→USD: 2019 1.12; 2020 1.14; 2021 1.18; 2022 1.05; 2023 1.08; 2024 1.08; 2025 1.10.
- GBP→USD for 2025: 1.32.
- Figures marked `~est` are estimates; hover gives the firm-specific basis listed in the table.
- Jane Street 2019–2021 estimated from Bloomberg bond offering documents and industry reports; confirmed from 2022.
- Citadel Securities 2019 and 2021 estimated from benchmarks; 2020 confirmed at $6.7B via Risk.net; confirmed from 2022.
- HRT 2019–2021 estimated; 2023 interpolated between 2022 ($2.5B confirmed) and 2024 ($8.0B confirmed); no public accounts.
- XTX Markets 2019–2021 estimated; earlier UK filings are partial after Brexit; 2022–2024 use combined UK entities (CH 09779919).
- IMC Trading 2019–2021 estimated; annual reports from 2022.
- Wolverine 2019–2025 all estimated; private firm with no public financial disclosures.
- Jane Street 2025 confirmed at $39.6B per Bloomberg April 2026.
- Virtu Financial and Flow Traders are publicly traded; financial data from SEC/regulatory filings.
- Wolverine is a private Chicago options market maker; insufficient public data for financials.
- Quadrature FY ends 31 Jan and is mapped to nearest calendar year. Trading PNL = `max(Turnover, Pre-Tax Profit + Employee Costs)`; 2019–2021 use Pre-Tax + Employee Costs, 2022–2024 use Turnover. Net Income = Profit After Tax. Capital = net book equity, affected by dividends (FY2024 £1.33B; FY2025 £360M). GBP/USD: 2019 1.28, 2020 1.30, 2021 1.38, 2022 1.24, 2023 1.25, 2024 1.28.
- PNL per Head = Trading PNL / Headcount. ROC = Net Trading Revenue / Trading Capital. Net Income Margin = Net Income / Net Trading Revenue. Revenue CAGR = `(Revenue_2025 / Revenue_2019)^(1/6) − 1`.

## Assets and data-bearing code

The origin response is one static HTML document: inline `<style>` and inline `<script>` contain the dashboard and data. No page-local `.json` file or separate page-local JS/CSS bundle was present.

Origin/page assets found:

- `https://cdn.jsdelivr.net/npm/chart.js` — Chart.js.
- `https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap` — stylesheet for Inter and JetBrains Mono.
- `https://fonts.googleapis.com` and `https://fonts.gstatic.com` — preconnects.
- Inline `<style>` — all dashboard CSS.
- Inline `<script>` — all dashboard logic and data; no JSON fetch observed.

The Google Translate rendering additionally injected proxy/navigation assets (not origin assets), including `https://www.gstatic.com/_/translate_http/_/js/.../m=corsproxy`, `.../m=phishing_protection`, `.../m=navigationui`, the Google Translate CSS/JS endpoints, and Material Symbols CSS. These are only proxy UI assets.

### Raw data payload copied from the inline script

```js
const YEARS = [2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026];
const FIRMS = [
  "Jane Street", "Citadel Securities", "HRT", "XTX Markets", "Optiver",
  "IMC Trading", "Virtu Financial", "Flow Traders", "Wolverine", "Quadrature"
];
const revenue = {"Jane Street": [1.5, 6.0, 5.3, 12.0, 10.6, 20.5, 39.6, null], "Citadel Securities": [4.0, 6.7, 7.0, 7.5, 6.3, 9.7, 12.2, null], "HRT": [0.5, 1.5, 2.0, 2.5, 4.0, 8.0, 12.3, null], "XTX Markets": [0.5, 1.0, 1.2, 3.08, 2.48, 3.51, 5.15, null], "Optiver": [1.26, 3.54, 2.56, 3.45, 2.99, 3.77, 5.02, null], "IMC Trading": [0.7, 0.9, 1.3, 1.64, 1.37, 2.41, 3.43, null], "Virtu Financial": [1.45, 3.24, 2.81, 1.47, 1.21, 1.6, 2.15, 0.787], "Flow Traders": [0.24, 1.03, 0.43, 0.48, 0.32, 0.52, 0.53, 0.172], "Wolverine": [null, null, null, null, null, null, null, null], "Quadrature": [0.46, 0.58, 1.34, 0.82, 0.74, 1.57, null, null]};
const income = {"Jane Street": [0.5, 3.0, 2.5, 7.2, 7.4, 13.0, 17.0, null], "Citadel Securities": [2.0, 4.0, 4.5, 4.2, 4.3, 4.2, 5.4, null], "HRT": [0.2, 0.8, 1.0, 1.0, 1.5, 3.5, 8.0, null], "XTX Markets": [0.2, 0.4, 0.6, 1.36, 1.04, 1.64, 2.24, null], "Optiver": [0.44, 1.57, 1.06, 1.35, 1.25, 1.48, 1.95, null], "IMC Trading": [0.56, 0.62, 0.56, 0.53, 0.31, 0.74, 1.07, null], "Virtu Financial": [-0.1, 1.12, 0.83, 0.47, 0.26, 0.53, 0.91, 0.347], "Flow Traders": [0.06, 0.52, 0.13, 0.13, 0.04, 0.17, 0.15, 0.055], "Wolverine": [null, null, null, null, null, null, null, null], "Quadrature": [0.31, 0.34, 0.73, 0.28, 0.06, 0.53, null, null]};
const headcount = {"Jane Street": [700, 900, 1500, 2000, 2500, 2960, 3500, null], "Citadel Securities": [1000, 1200, 1500, 1800, 2000, 1750, 1800, null], "HRT": [300, 400, 500, 700, 900, 1100, 1100, null], "XTX Markets": [170, 200, 220, 240, 280, 263, 270, null], "Optiver": [1010, 1200, 1390, 1709, 1952, 2100, 2230, null], "IMC Trading": [1100, 1200, 1300, 1400, 1500, 1600, 1900, null], "Virtu Financial": [1550, 1600, 1550, 1400, 1150, 969, 1027, null], "Flow Traders": [494, 517, 568, 660, 613, 609, 680, 656], "Wolverine": [285, 300, 320, 340, 340, 338, 338, null], "Quadrature": [68, 83, 98, 113, 143, 173, null, null]};
const capital = {"Jane Street": [3.8, 8.0, 12.0, 16.0, 22.0, 29.9, 45.0, null], "Citadel Securities": [7.0, 10.0, 14.0, 16.0, 18.0, 20.0, 21.8, null], "HRT": [0.3, 0.8, 1.5, 3.0, 5.0, 9.0, 14.7, null], "XTX Markets": [0.5, 0.8, 1.0, 1.2, 1.5, 2.0, 2.5, null], "Optiver": [1.7, 2.8, 3.1, 3.75, 4.43, 5.3, 6.04, null], "IMC Trading": [0.8, 1.0, 1.2, 1.74, 1.68, 2.7, 4.39, null], "Virtu Financial": [1.9, 2.1, 2.3, 2.5, 2.6, 2.8, 3.4, 3.146], "Flow Traders": [0.41, 0.86, 0.68, 0.72, 0.63, 0.84, 1.15, 1.2], "Wolverine": [null, null, null, null, null, null, null, null], "Quadrature": [0.55, 0.9, 1.68, 1.79, 0.24, 0.39, null, null]};
const estimated = {"Jane Street": [true, true, true, false, false, false, false], "Citadel Securities": [true, false, true, false, false, false, false], "HRT": [true, true, true, false, true, false, false], "XTX Markets": [true, true, true, false, false, false, false], "Optiver": [false, false, false, false, false, false, false], "IMC Trading": [true, true, true, false, false, false, false], "Virtu Financial": [false, false, false, false, false, false, false], "Flow Traders": [false, false, false, false, false, false, false, false,], "Wolverine": [true, true, true, true, true, true, true], "Quadrature": [false, false, false, false, false, false, false]};
const periodLabels = { "Virtu Financial": {2026:"2026 Q1"}, "Flow Traders": {2026:"2026 Q1"} };
```

## Hosting / homepage observation

Direct HTTP probing of `http://kenzhang.tech/` and `/hftresults/` returned **HTTP 308 Permanent Redirect**, `Server: Caddy`, with `Location: https://kenzhang.tech/...`; HTTPS then closed the connection from this box. I found no GitHub Pages marker in the dashboard HTML. The dashboard is served as a static HTML page with inline code, Chart.js and Google Fonts; it contains no internal navigation links to a site section. The homepage could not be rendered because the same origin TLS close affected `/`, so no stronger claim about its other pages or GitHub linkage is made.

## Screenshot files

- `/workspace/hftresults-shots/00-full-page.png` (browser full-page capture)
- `/workspace/hftresults-shots/01-overview.png`
- `/workspace/hftresults-shots/02-headcount.png`
- `/workspace/hftresults-shots/03-revenue-income.png`
- `/workspace/hftresults-shots/04-headcount-capital.png`
- `/workspace/hftresults-shots/05-metrics-top.png`
- `/workspace/hftresults-shots/06-metrics-bottom.png`
- `/workspace/hftresults-shots/07-table-all-years.png`
- `/workspace/hftresults-shots/08-sources-methodology.png`
- `/workspace/hftresults-shots/09-table-all-years-top.png`
- `/workspace/hftresults-shots/10-table-all-years-2024-23.png`
- `/workspace/hftresults-shots/11-table-all-years-23-22.png`
- `/workspace/hftresults-shots/12-table-all-years-21-20.png`
- `/workspace/hftresults-shots/13-table-all-years-20-19.png`
