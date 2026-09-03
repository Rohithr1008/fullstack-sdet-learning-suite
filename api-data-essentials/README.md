# 🔌 API & Data Essentials

Hands-on study kit for **automation testers**: REST API testing, auth & negative cases, contract/schema smoke, and **SQL-for-testers** with API↔DB checks. Same pedagogy as JavaScript Essentials — **three editions**, ADHD-friendly chunks, why-it-matters, quizzes, Spot-the-Bug, study apps.

> **Progress:** Part 1 ✅ · Part 2 ✅ · Part 3 ✅  
> Part of the **[Automation Tester Path](../automation-tester-path/README.md)** (alongside JavaScript Essentials, Playwright Essentials, Perf Basics).

### 🧭 Path navigation

| | |
|---|---|
| **Umbrella** | [`../automation-tester-path/README.md`](../automation-tester-path/README.md) · [`START_HERE`](../automation-tester-path/START_HERE.md) |
| **Previous** | [JE Part 6](../javascript-essentials/Javascript_essentials_part6_study_app.html) (after Playwright E2E) |
| **Also before** | [Playwright Essentials](../playwright-essentials/README.md) — Part 3 API is overview only; this kit goes deep |
| **Next** | [Perf Basics](../perf-basics/README.md) |
| **Siblings** | [JavaScript Essentials](../javascript-essentials/README.md) · [Playwright](../playwright-essentials/README.md) · [Perf](../perf-basics/README.md) |

---

## 📚 Choose your edition

| Edition | Best for | How to open |
|---|---|---|
| 🖥️ **Interactive Study App** | Browser study — dark mode, progress, mocks, SRS, certificate | Open `index.html`, then a part's `*_study_app.html` |
| 📝 **Interactive Markdown** | VS Code / Typora — quizzes & flashcards inline | Open `*_interactive.md` → `Ctrl+Shift+V` |
| 📄 **Plain Markdown** | Print / PDF / distraction-free | Open `*_with_examples.md` |

---

## 🗂️ Series map

```
Part 1  HTTP/REST + assertions + Postman→code
   ↓
Part 2  Auth · negative tests · contract/schema smoke
   ↓
Part 3  SQL-for-testers · seed/teardown · API↔DB checks
```

| Part | Title | Focus |
|---|---|---|
| 1 | HTTP & REST Foundations | Methods, status codes, assertions, Postman-to-code, first green test |
| 2 | Auth & Contracts | Bearer/API key, 401/403/422, negative matrix, JSON Schema smoke |
| 3 | Data & SQL for Testers | SELECT/JOIN, fixtures, seed/teardown, wire API results to DB rows |

---

## 🚀 Quick start

```bash
cd api-data-essentials
npm run mock-api          # terminal 1 — http://127.0.0.1:4040
npm run lab:part1         # terminal 2 — first smoke
npm run lab:part2         # auth + negatives + schema
npm run lab:part3         # API↔DB consistency
```

**Study offline (no Node required for reading):**

1. Open [`index.html`](index.html) in a browser, **or**
2. Double-click `Api_data_essentials_part1_study_app.html`

In-app **mock API playgrounds** work without starting the server. Real labs need `npm run mock-api`.

---

## 📁 Layout

```
api-data-essentials/
  README.md, HANDOFF.md, START_HERE.md, index.html
  shared/study-shell.css, shared/study-shell.js
  mock-api/server.js
  labs/part1|part2|part3/
  PARTN_PLAN.md, API_DATA_ESSENTIALS_PARTN_CONTEXT.md
  Api_data_essentials_partN_{with_examples,interactive}.md
  Api_data_essentials_partN_study_app.html
```

---

## Prerequisites

- JE Parts 1–2 (async + `fetch` basics) recommended
- Comfortable with a terminal and Node 18+
- No prior Postman mastery required (we translate collections → code)

---

*Read a little, predict the status code, flip the card, break the assertion.*
