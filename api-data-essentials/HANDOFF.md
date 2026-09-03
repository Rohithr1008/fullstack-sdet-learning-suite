# 📌 Project Handoff — API & Data Essentials (3-Part Kit)

> **Purpose:** Everything a fresh session needs to continue this repo. Mirror of JE HANDOFF habits.

---

## 1. Project Overview

ADHD/autistic-friendly study kit teaching **API testing + SQL-for-testers** in the same **three-edition** format as JavaScript Essentials.

| Part | Title | Sections (approx) | Covers |
|---|---|---|---|
| 1 | HTTP & REST Foundations | 11 | HTTP, REST, assertions, Postman→code, first smoke |
| 2 | Auth & Contracts | 10 | Bearer/API key, negatives, schema smoke |
| 3 | Data & SQL for Testers | 10 | SELECT/JOIN, seed/teardown, API↔DB |

**Status:** ✅ Scaffold + Parts 1–3 content shipped. Local git only (no remote required).

**Path:** `C:\Users\rohit\.cline\data\workspaces\chat\api-data-essentials`

### Automation Tester Path

| | |
|---|---|
| Umbrella | [`../automation-tester-path/README.md`](../automation-tester-path/README.md) |
| Previous | JE Part 6 (after [Playwright](../playwright-essentials/README.md)) |
| Next | [`../perf-basics/`](../perf-basics/README.md) |
| Not this kit | Browser E2E → Playwright · JE unit/CI → JE Part 6 · Load → Perf |

---

## 2. File Naming

For each Part N:

- `Api_data_essentials_partN_with_examples.md` — plain Markdown
- `Api_data_essentials_partN_interactive.md` — interactive Markdown
- `Api_data_essentials_partN_study_app.html` — standalone study app
- `PARTN_PLAN.md` — planning doc
- `API_DATA_ESSENTIALS_PARTN_CONTEXT.md` — context/transfer doc
- `index.html` — hub
- `README.md` — top-level

Sentinels: `<!--PN-END-->` (plain), `<!--PNI-END-->` (interactive), `<!--PNH-END-->` (HTML).

---

## 3. Pedagogy checklist (every part)

- `> 🚩 Why it matters:` on each teaching section
- Quizzes / predict cards / Spot-the-Bug / mood / 7-day plan / certificate gate
- Pitfalls → Practice → Challenges → Answer key
- Study-app: theme, font zoom, progress (`pN-sec-N`), Focus Mode, SRS, XP, part-specific mock

---

## 4. Mock API & labs

- `mock-api/server.js` — zero-dep Node HTTP on `127.0.0.1:4040`
- Demo login: `tester@demo.test` / `pass123` → Bearer `demo-token-abc123`
- API key: `X-API-Key: lab-key-42` (tester role; cannot DELETE)
- Labs: `labs/part1/smoke.mjs`, `labs/part2/auth-negatives.mjs`, `labs/part3/api-db-check.mjs`

```bash
npm run mock-api
npm run lab:part1
```

---

## 5. Shared shell

Copied from JE: `shared/study-shell.css`, `shared/study-shell.js`. Study apps inline equivalent styles; prefer consistency with JE markers if you later add `inline-shell`.

---

## 6. Verification

- Start mock API; run all three labs green
- Open each `*_study_app.html` — theme toggle, Mark Complete, mock panel, certificate unlocks at 100%
- Interactive MD preview in VS Code

---

## 7. What's intentionally out of scope

- Full OpenAPI tooling / Pact deep dive
- Real Postgres install (Part 3 teaches SQL + uses in-memory `/_db/snapshot` as stand-in)
- Browser E2E / Playwright UI (overview links only)

---
*Handoff written for Automation Tester Path — API & Data kit.*
