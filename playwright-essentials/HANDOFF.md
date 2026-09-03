# Project Handoff — Playwright Essentials

> Everything a fresh session needs: conventions, layout, verification. Read this first.

---

## 1. Overview

ADHD/autistic-friendly **Playwright E2E** series (Part 0 strategy + Parts 1–5), mirroring JavaScript Essentials pedagogy: three editions per part, shared study-shell, why-it-matters, quizzes, predicts, Spot-the-Bug, 7-day plan, certificate.

**Companion fixture:** `demo-app/` (ShopLite). **Real specs:** `labs/partN/`.

### Automation Tester Path

| | |
|---|---|
| Umbrella | [`../automation-tester-path/README.md`](../automation-tester-path/README.md) |
| Previous | [`../javascript-essentials/`](../javascript-essentials/README.md) (Parts 1–5) |
| Next | JE Part 6 → [`../api-data-essentials/`](../api-data-essentials/README.md) → [`../perf-basics/`](../perf-basics/README.md) |
| Out of scope here | JE Part 6 content, deep API/SQL kit, Perf kit (link only) |

---

## 2. Naming

For Part N (including 0):

| File | Role |
|---|---|
| `Playwright_essentials_partN_with_examples.md` | Plain markdown |
| `Playwright_essentials_partN_interactive.md` | Interactive markdown |
| `Playwright_essentials_partN_study_app.html` | Standalone study app |
| `PARTN_PLAN.md` | Plan |
| `PLAYWRIGHT_ESSENTIALS_PARTN_CONTEXT.md` | Context / transfer |

Sentinels: `<!--PN-END-->`, `<!--PNI-END-->`, `<!--PNH-END-->`.

---

## 3. Study-app features (parity with JE)

Theme, font zoom, progress (`pwN-sec-N`), learning path, SRS, XP/streak/confetti, focus sprint, Focus Mode, collapse/expand, skip link, quizzes (correct+wrong), predicts, mood, 7-day plan, Spot-the-Bug, certificate @ 100%, scrollspy, auto-graded challenges via `new Function`, part-specific live mock.

Shared CSS/JS: `shared/study-shell.*` inlined between `SHARED-SHELL-CSS/JS` markers.

```bash
node scripts/inline-shell.js          # write
node scripts/inline-shell.js --check  # CI
```

Regenerate apps from generator (optional):

```bash
node scripts/generate-study-apps.js
node scripts/inline-shell.js
node scripts/generate-markdown.js
```

---

## 4. Verification

```bash
npm ci
node verify-study-apps.js
node scripts/inline-shell.js --check
npx playwright install chromium
npx playwright test
```

CI: `.github/workflows/verify.yml` (structural verify + shell check + Playwright labs/a11y + artifacts on failure).

---

## 5. Demo credentials

- Any email + password **`playwright`**
- Checkout API is static-404 unless mocked (`labs/part4`)

---

## 6. Part map

| Part | Focus |
|---|---|
| 0 | Strategy / Testing Mindset |
| 1 | Foundations + first green tests |
| 2 | Locators & actions |
| 3 | POM, fixtures, auth; **API overview only** |
| 4 | Network mock, a11y, debug, flakes |
| 5 | GHA CI, artifacts, sharding, cloud browsers, certificate |

---

## 7. Status

Spine scaffold + Parts 0–5 content + demo-app + labs + verify CI workflow — initial kit complete. Polish/content depth can iterate without changing naming.

**Path cross-links:** umbrella + prev/next live in README / this handoff / hub `index.html`.
