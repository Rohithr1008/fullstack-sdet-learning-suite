# Automation Tester Path

Map for the kits: **JS → HTML/CSS → thin TS → Playwright → harden → API → perf → portfolio**, then optional **develop+test** depth.

Same pedagogy everywhere (ADHD/autistic-friendly): why-it-matters, short chunks, three editions, quizzes, labs.

**Execution plan:** [`ROADMAP.md`](ROADMAP.md) — Phase A (automation) · Phase B (develop + test) · Phase C (FE depth, stubs) · sprint workstreams.

---

## Who this is for

- People moving into **automation testing** who want a clear order  
- Learners who prefer **scan → try → predict → lab**  
- Anyone who needs **what comes next** without a wall of theory  

Skip or skim what you already know.

---

## Phase A — automation (study order)

```
1. JE Parts 1–5
2. HTML & CSS Essentials Part 1   ← before Playwright
3. TypeScript for Testers         ← thin kit (not full TS jobs)
4. Playwright Essentials
5. JE 6 → API & Data → Perf → automation-portfolio
```

| Step | Kit | Folder | Role |
|---|---|---|---|
| 1 | [JavaScript Essentials](../javascript-essentials/README.md) | `javascript-essentials` | Language + app foundations (Parts 1–5) |
| 2 | HTML & CSS Essentials Part 1 | `html-css-essentials` | DOM/layout before E2E |
| 3 | TypeScript for Testers | `typescript-for-testers` | Test-oriented TS only |
| 4 | [Playwright Essentials](../playwright-essentials/README.md) | `playwright-essentials` | Strategy + browser E2E |
| 5a | [JE Part 6](../javascript-essentials/README.md) | `javascript-essentials` | Unit/CI/security |
| 5b | [API & Data](../api-data-essentials/README.md) | `api-data-essentials` | REST, contracts, SQL |
| 5c | [Perf Basics](../perf-basics/README.md) | `perf-basics` | Thin perf literacy |
| 5d | automation-portfolio | (portfolio) | Show the work |

**Start here:** [`START_HERE.md`](START_HERE.md) · **Build plan:** [`ROADMAP.md`](ROADMAP.md)

---

## Phase B — develop + test

| Step | Kit | Role |
|---|---|---|
| 6 | HTML & CSS Parts 2–3 | Deeper FE literacy |
| 7 | [TypeScript Develop + Test](../typescript-develop-test/) ✅ | App + tests in TS |

Thin TS (Phase A) ≠ enough for TS-only develop jobs — Phase B closes that gap.

**Hub:** [`../typescript-develop-test/index.html`](../typescript-develop-test/index.html) · **Start:** [`../typescript-develop-test/START_HERE.md`](../typescript-develop-test/START_HERE.md)

---

## Phase C — front-end depth (STUB)

After Phase B. Plans only — full curriculum build later.

| Step | Kit | Role | Status |
|---|---|---|---|
| 8 | [CSS Advanced](../css-advanced/) | Animations, transforms, variables, tokens intro | STUB |
| 9 | [React Essentials](../react-essentials/) | Components, hooks light, CSS Modules / Tailwind | STUB |
| 10 | [Figma to Dev](../figma-to-dev/) (optional) | Handoff, inspect, Code Connect concept | STUB (mini) |

**Default:** React over Vue (job market). Vue = optional future stub.

**Order:** css-advanced → react-essentials → figma-to-dev (optional). See [`ROADMAP.md`](ROADMAP.md).

---

## How the kits fit (no overlap panic)

| If you need… | Go to… | Not… |
|---|---|---|
| JS / MERN / auth / deploy basics | JE Parts 1–5 | Playwright |
| DOM / layout before E2E | HTML & CSS Part 1 | Playwright first |
| Types for test code | TypeScript for Testers | Full TS develop kit |
| “Should I even write an E2E?” | Playwright Part 0 | Perf |
| Browser E2E, POM, flakes, CI | Playwright Parts 1–5 | JE Part 6 |
| Vitest/Jest, RTL, app CI/CD | JE Part 6 | Playwright (except E2E link) |
| Deep REST / SQL checks | API & Data | Playwright Part 3 overview |
| Load / p95 / SLOs | Perf Basics | Functional E2E timing |
| App + tests in TypeScript | [TypeScript Develop + Test](../typescript-develop-test/) | Thin TS kit alone |
| Motion, tokens, advanced CSS | [CSS Advanced](../css-advanced/) (stub) | html-css Part 1 again |
| React UI literacy | [React Essentials](../react-essentials/) (stub) | Full Next/Redux course |
| Design handoff | [Figma to Dev](../figma-to-dev/) (stub, optional) | Figma design mastery |

Sibling folders (chat workspace):

```
chat/
  automation-tester-path/     ← you are here
  javascript-essentials/
  html-css-essentials/        ← Phase A/B
  typescript-for-testers/     ← Phase A (thin)
  typescript-develop-test/    ← Phase B
  css-advanced/               ← Phase C (stub)
  react-essentials/           ← Phase C (stub)
  figma-to-dev/               ← Phase C optional (stub)
  playwright-essentials/
  api-data-essentials/
  perf-basics/
```

---

## Quick open (hubs)

| Kit | Hub |
|---|---|
| JavaScript Essentials | [`../javascript-essentials/index.html`](../javascript-essentials/index.html) |
| Playwright Essentials | [`../playwright-essentials/index.html`](../playwright-essentials/index.html) |
| API & Data Essentials | [`../api-data-essentials/index.html`](../api-data-essentials/index.html) |
| Perf Basics | [`../perf-basics/index.html`](../perf-basics/index.html) |
| TypeScript Develop + Test | [`../typescript-develop-test/index.html`](../typescript-develop-test/index.html) |

---

*Path navigation only — curriculum lives inside each kit. See [`ROADMAP.md`](ROADMAP.md) for Phase A/B/C + sprint workstreams.*
