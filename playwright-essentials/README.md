# Playwright Essentials

Hands-on **web E2E** study kit (Playwright) with the same ADHD-friendly pedagogy as JavaScript Essentials: why-it-matters, three editions per part, study-app shell, and real labs against an in-repo **ShopLite** demo app.

> **Progress:** Part 0 (Strategy) ✅ · Parts 1–5 ✅

### Automation Tester Path

Part of the **[Automation Tester Path](../automation-tester-path/README.md)** · [`START_HERE` (path)](../automation-tester-path/START_HERE.md) · [`ROADMAP`](../automation-tester-path/ROADMAP.md)

| | |
|---|---|
| **On the path** | After JE Parts 1–5 · before JE Part 6 hardening |
| **Prep** | [HTML & CSS Essentials](../html-css-essentials/) Part 1 + [TypeScript for Testers](../typescript-for-testers/) (before heavy E2E) |
| **Previous** | [JavaScript Essentials](../javascript-essentials/README.md) (Parts 1–5 foundations) |
| **Next** | [JE Part 6](../javascript-essentials/Javascript_essentials_part6_study_app.html) (unit/CI/security) → [API & Data](../api-data-essentials/README.md) → [Perf Basics](../perf-basics/README.md) |
| **Siblings** | Deep REST/SQL → [API & Data](../api-data-essentials/README.md) · Load literacy → [Perf Basics](../perf-basics/README.md) · App unit/CI → JE Part 6 · Phase B → [TypeScript Develop + Test](../typescript-develop-test/README.md) |

---

## Choose your path

| Part | Title | Study app |
|---|---|---|
| 0 | Testing Mindset (Strategy) | [Open](Playwright_essentials_part0_study_app.html) |
| 1 | Foundations | [Open](Playwright_essentials_part1_study_app.html) |
| 2 | Locators & Actions | [Open](Playwright_essentials_part2_study_app.html) |
| 3 | Architecture (POM, fixtures, auth) | [Open](Playwright_essentials_part3_study_app.html) |
| 4 | Reliability & Quality | [Open](Playwright_essentials_part4_study_app.html) |
| 5 | CI, Scale & Professional Workflow | [Open](Playwright_essentials_part5_study_app.html) |

**Hub:** open [`index.html`](index.html) in a browser (or run `npx serve .`).

Each part ships three editions:

| Edition | Best for |
|---|---|
| Study app (`.html`) | Offline browser study — progress, SRS, mocks, certificate |
| Interactive Markdown | VS Code preview (`Ctrl+Shift+V`) — quizzes + Spot-the-Bug |
| Plain Markdown | Print / PDF / distraction-free reading |

---

## Quick start

```bash
cd playwright-essentials
npm ci
npx playwright install chromium
npm test                 # labs + study-app a11y
npm run verify           # structural study-app checks
npm run inline-shell:check
```

**Demo app (under test):**

```bash
npm run demo             # http://127.0.0.1:4179  (repo root)
# open http://127.0.0.1:4179/demo-app/
# login password for any email: playwright
```

**Labs only:**

```bash
npx playwright test labs/part1
npx playwright test labs/part2
# …
```

---

## Series map

```
Part 0 Strategy → Part 1 Foundations → Part 2 Locators
  → Part 3 Architecture → Part 4 Reliability → Part 5 CI
```

- **Part 3 API:** overview only (`request` smoke). Deep REST/SQL → **[API & Data Essentials](../api-data-essentials/README.md)**.
- **Part 5:** GitHub Actions Playwright CI, artifacts, sharding overview, cloud browsers overview, certificate.
- Unit/component depth and general CD deploy stay in **[JE Part 6](../javascript-essentials/Javascript_essentials_part6_study_app.html)**.

---

## Repo layout

```
playwright-essentials/
  index.html, README.md, HANDOFF.md, START_HERE.md
  shared/study-shell.css|js
  scripts/inline-shell.js, generate-*.js
  demo-app/                 # ShopLite fixture
  labs/partN/               # real Playwright specs
  Playwright_essentials_partN_{with_examples,interactive}.md
  Playwright_essentials_partN_study_app.html
  PARTN_PLAN.md, PLAYWRIGHT_ESSENTIALS_PARTN_CONTEXT.md
  .github/workflows/verify.yml
```

See [`HANDOFF.md`](HANDOFF.md) for conventions and verification.

---

*Made for hands-on learning — read a little, predict the failure, run the lab, open the trace.*
