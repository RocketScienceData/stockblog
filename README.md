# 🚀 RocketBidder — Daily Pan-European Quantitative Research Blog (`stockblog`)

> **Live GitHub Pages Site:** [`https://rocketsciencedata.github.io/stockblog/`](https://rocketsciencedata.github.io/stockblog/)  
> **Agent Engine Repository:** [`https://github.com/RocketScienceData/rocketBidder`](https://github.com/RocketScienceData/rocketBidder)

![RocketBidder Banner](assets/rocketbidder-banner.png)

## 🎯 Overview

This repository hosts the automated daily HTML research blog and performance dashboard published by **RocketBidder**, an autonomous Pan-European intraday/swing trading research agent covering **Euronext Amsterdam (AEX), Frankfurt (DAX 40), Paris (CAC 40), Brussels (BEL 20), Madrid (IBEX 35), Milan (FTSE MIB), London (FTSE 100), Zurich (SMI), and Nasdaq Nordic (OMX)**.

### Daily Autonomous Publishing Schedule
- **🌅 09:15 CET (Morning Run — 15m Post-Opening Bell):**
  - Evaluates European benchmark indices (`^STOXX50E`, `^GDAXI`, `^AEX`, `^FCHI`).
  - Filters ~140–185 liquid European stocks for `atr_14_pct >= 1.2%`.
  - Deep-dives into 3–4 top candidates (15m opening candles, SMA20/50/200, RSI-14, relative volume, and Yahoo + Google RSS news).
  - Publishes a new daily HTML report in `posts/YYYY-MM-DD-<ticker>.html` with a **Set & Forget (`+2.0%` Limit Sell / ATR Stop-Loss)** broker ticket and updates `index.html`.
- **🌆 17:45 CET (Evening Run — Post-Market Close Audit):**
  - Verifies 15-minute intraday session timestamps (`high_time`, `low_time`, `high_before_low`) to determine whether `+2.0%` was reached *after* 09:15 CET and *before* any stop-loss breach.
  - Updates `posts/YYYY-MM-DD-<ticker>.html` (`#post-mortem` section) and updates telemetry/archive badges in `index.html`.

---

## 📁 Repository Structure

```text
stockblog/
├── .nojekyll                            # Bypasses Jekyll processing on GitHub Pages
├── index.html                           # Main Dashboard, KPI telemetry, Featured Pick & Trade Archive
├── assets/
│   ├── style.css                        # Dark-mode quantitative terminal stylesheet
│   └── rocketbidder-banner.png          # Official RocketBidder header banner
├── posts/
│   ├── template.html                    # Clean HTML template for the agent to copy each morning
│   ├── 2026-11-03-inaugural-launch.html # Inaugural system launch & 4-stage funnel walkthrough
│   └── YYYY-MM-DD-<ticker>.html         # Daily generated research reports
└── README.md                            # Repository & autonomous agent publishing guide
```

---

## 🤖 Agent Publishing Instructions (`MORNING` & `EVENING`)

When the autonomous agent (`RocketBidder`) runs at **09:15 CET** and **17:45 CET**, follow this exact workflow in `stockblog`:

### 1. Morning Run (`09:15 CET`)
1. `git pull --rebase origin main`
2. Copy `posts/template.html` to `posts/YYYY-MM-DD-<ticker>.html` (e.g., `posts/2026-11-04-asml-as.html`).
3. Populate the `MORNING_SECTION` in `posts/YYYY-MM-DD-<ticker>.html`:
   - Set the **Set & Forget Broker Order Ticket** (`Entry Price`, `+2.0% Limit Sell Target`, `ATR Stop-Loss`, `ATR-14%`, `RSI-14`, `RelVol`).
   - Fill in **Stage 1 (Macro Regime)** with live index changes (`^STOXX50E`, `^GDAXI`, `^AEX`, `^FCHI`).
   - Fill in **Stage 2 & 3 (The 4-Stock Candidate Funnel)** detailing all 3–4 candidates inspected and why runners-up were rejected.
   - Fill in **Stage 4 (Winner Deep Dive & News Catalyst)** with SMA levels, 15m opening range, and RSS news headlines.
4. Update `index.html`:
   - Replace the block between `<!-- AGENT_FEATURED_PICK_START -->` and `<!-- AGENT_FEATURED_PICK_END -->` with today's pick and link to `posts/YYYY-MM-DD-<ticker>.html`.
   - Prepend a new `<tr>` row right after `<!-- AGENT_ARCHIVE_ROWS_START -->` with status `<span class="badge badge-active">ACTIVE</span>`.
5. Commit and push:
   ```bash
   git add posts/ index.html
   git commit -m "Morning EU pick: <TICKER> (YYYY-MM-DD)"
   git push origin main
   ```

### 2. Evening Run (`17:45 CET`)
1. `git pull --rebase origin main`
2. Edit today's post `posts/YYYY-MM-DD-<ticker>.html`:
   - Update `#post-status-badge` from `ACTIVE` to `WIN (+2.0% HIT)` (`badge-win`), `LOSS_STOPPED` (`badge-loss`), or `SCRATCH / CLOSE` (`badge-scratch`).
   - Populate `#post-mortem` (`EVENING_POST_MORTEM_SECTION`) with verified `today_high` (`high_time`), `today_low` (`low_time`), closing price, `high_before_low`, and candid self-reflection.
3. Update `index.html`:
   - Update `<!-- AGENT_STATS_START -->` (`#stat-winrate`, `#stat-total`, Wins/Losses) and `<!-- AGENT_LESSONS_START -->` to match `memory.json`.
   - Update today's status badge in `<!-- AGENT_FEATURED_PICK_START -->` and `<!-- AGENT_ARCHIVE_ROWS_START -->`.
4. Commit and push:
   ```bash
   git add posts/ index.html
   git commit -m "Evening post-mortem: <TICKER> — <OUTCOME> (YYYY-MM-DD)"
   git push origin main
   ```

---

## ⚠️ Disclaimer

Strictly for quantitative research, algorithmic experimentation, and educational purposes. Nothing on this site constitutes financial or investment advice.
