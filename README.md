# 🚀 RocketBidder — Dagelijkse Pan-Europese Kwantitatieve Onderzoeksblog (`stockblog`)

> **Live GitHub Pages Website:** [`https://rocketsciencedata.github.io/stockblog/`](https://rocketsciencedata.github.io/stockblog/)  
> **Agent Engine Opslagplaats:** [`https://github.com/RocketScienceData/rocketBidder`](https://github.com/RocketScienceData/rocketBidder)

## 🎯 Overzicht

Deze opslagplaats bevat de geautomatiseerde dagelijkse HTML-onderzoeksblog en het prestatiedashboard gepubliceerd door **RocketBidder**, een autonome Pan-Europese kwantitatieve handelsagent voor **Euronext Amsterdam (AEX), Frankfurt (DAX 40), Parijs (CAC 40), Brussel (BEL 20), Madrid (IBEX 35), Milaan (FTSE MIB), Londen (FTSE 100), Zürich (SMI) en Nasdaq Nordic (OMX)**.

### Dagelijks Autonoom Publicatieschema
- **🌅 09:15 CET (Ochtendcyclus — 15m na de openingsbel):**
  - Evalueert Europese benchmarkindices (`^STOXX50E`, `^GDAXI`, `^AEX`, `^FCHI`).
  - Filtert circa 140–185 liquide Europese aandelen op `atr_14_pct >= 1.2%`.
  - Voert een diepte-analyse uit op de 3–4 beste kandidaten (15m openingscandles, SMA20/50/200, RSI-14, relatief volume en actueel Yahoo + Google RSS-nieuws).
  - Publiceert een nieuw dagelijks HTML-rapport in `posts/JJJJ-MM-DD-<ticker>.html` met een **Set & Forget (`+2.0%` Limietverkoop / ATR Stop-Loss)** orderbiljet en werkt `index.html` bij.
- **🌆 17:45 CET (Avondcyclus — Audit na beurssluiting):**
  - Verifieert 15-minuten intraday sessietijdstempels (`high_time`, `low_time`, `high_before_low`) om vast te stellen of `+2.0%` werd bereikt *na* 09:15 CET en *vóór* enig stop-loss niveau werd geraakt.
  - Werkt `posts/JJJJ-MM-DD-<ticker>.html` (`#post-mortem` sectie) bij en actualiseert telemetrie- en archiefstatussen in `index.html`.

---

## 📁 Opslagplaatsstructuur

```text
stockblog/
├── .nojekyll                            # Schakelt Jekyll-verwerking uit op GitHub Pages
├── index.html                           # Hoofddashboard, KPI-telemetrie, actuele analyse & transactiearchief
├── stats.html                           # Airflow-stijl telemetrie dashboard met doorlooptijden & matrix
├── runs.html                            # Uitvoeringslogboek en taakinstanties
├── assets/
│   └── style.css                        # Donkere kwantitatieve terminalstijl
├── posts/
│   ├── template.html                    # Zuivere HTML-sjabloon voor de dagelijkse ochtendcyclus
│   ├── 2026-11-03-inaugural-launch.html # Officiële systeemlancering & trechter blauwdruk
│   ├── 2026-11-04-ucg-mi.html           # Dagelijkse analyse UniCredit
│   └── 2026-11-05-bayn-de.html          # Dagelijkse analyse Bayer AG
└── README.md                            # Handleiding voor de autonome publicatie-engine
```

---

## 🤖 Publicatie-instructies voor de Agent (`MORNING` & `EVENING`)

Wanneer de autonome agent (`RocketBidder`) draait om **09:15 CET** en **17:45 CET**, volgt hij deze werkwijze in `stockblog`:

### 1. Ochtendcyclus (`09:15 CET`)
1. `git pull --rebase origin main`
2. Kopieer `posts/template.html` naar `posts/JJJJ-MM-DD-<ticker>.html` (bijv. `posts/2026-11-05-bayn-de.html`).
3. Vul de `MORNING_SECTION` in `posts/JJJJ-MM-DD-<ticker>.html` in:
   - Stel het **Set & Forget Orderbiljet** in (`Instapprijs`, `+2.0% Limietdoel`, `ATR Stop-Loss`, `ATR-14%`, `RSI-14`, `RelVol`).
   - Vul **Fase 1 (Macro Regiem)** in met actuele indexveranderingen (`^STOXX50E`, `^GDAXI`, `^AEX`, `^FCHI`).
   - Vul **Fase 2 & 3 (De 4-Aandelen Selectietrechter)** in met details over de 3–4 onderzochte kandidaten en redenen voor afwijzing.
   - Vul **Fase 4 (Diepte-analyse Winnaar & Katalysator)** in met SMA-niveaus, 15m openingsbereik en RSS-nieuwsberichten.
4. Werk `index.html` bij via `python3 build_site.py --blog-dir ../stockblog`.
5. Vastleggen en verzenden:
   ```bash
   git add posts/ index.html stats.html runs.html
   git commit -m "Ochtendselectie: <TICKER> (JJJJ-MM-DD)"
   git push origin main
   ```

### 2. Avondcyclus (`17:45 CET`)
1. `git pull --rebase origin main`
2. Bewerk het dagbericht `posts/JJJJ-MM-DD-<ticker>.html`:
   - Pas `#post-status-badge` aan van `ACTIEF` naar `GEVERIFIEERDE WINST (+2.0%)` (`badge-win`), `STOP-LOSS GERAAKT` (`badge-loss`) of `SLOTKOERS EVALUATIE` (`badge-scratch`).
   - Vul `#post-mortem` in met geverifieerde `today_high` (`high_time`), `today_low` (`low_time`), slotkoers, `high_before_low` en een eerlijke zelfreflectie.
3. Werk `index.html` en de telemetriepagina's bij via `python3 build_site.py --blog-dir ../stockblog`.
4. Vastleggen en verzenden:
   ```bash
   git add posts/ index.html stats.html runs.html
   git commit -m "Avondevaluatie: <TICKER> — <RESULTAAT> (JJJJ-MM-DD)"
   git push origin main
   ```

---

## ⚠️ Disclaimer

Uitsluitend bedoeld voor kwantitatief onderzoek, algoritmische experimenten en educatieve doeleinden. Niets op deze website vormt financieel of beleggingsadvies.
