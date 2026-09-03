# Perf Basics — Part 1

A thin, hands-on study kit for **performance literacy** (not full capacity engineering): SLIs/SLOs in plain language, a k6 hello-world, reading p95, and when perf ≠ functional E2E — in **three editions**, matching the JavaScript Essentials pedagogy.

> **Progress:** Part 1 ✅ (single-part kit) · Deeper perf careers → link-outs in §12  
> **Path:** [Automation Tester Path](../automation-tester-path/README.md) · last kit on the map

### Path navigation

| | |
|---|---|
| **Umbrella** | [`../automation-tester-path/README.md`](../automation-tester-path/README.md) · [`START_HERE`](../automation-tester-path/START_HERE.md) |
| **Previous** | [API & Data Essentials](../api-data-essentials/README.md) |
| **Next** | — (end of path; §12 has optional deeper careers) |
| **Siblings** | [JavaScript Essentials](../javascript-essentials/README.md) · [Playwright](../playwright-essentials/README.md) (functional E2E ≠ load) · [API & Data](../api-data-essentials/README.md) |

---

## Choose your edition

| Edition | Best for | Link |
|---|---|---|
| **Interactive Study App** | Browser study — dark mode, progress, glossary drills, certificate | [`Perf_basics_part1_study_app.html`](Perf_basics_part1_study_app.html) (double-click / open offline) |
| **Interactive Markdown** | VS Code / Typora — quizzes, flashcards, predict cards | [`Perf_basics_part1_interactive.md`](Perf_basics_part1_interactive.md) — `Ctrl+Shift+V` |
| **Plain Markdown** | Printing, PDF, distraction-free reading | [`Perf_basics_part1_with_examples.md`](Perf_basics_part1_with_examples.md) |

Same curriculum across all three; features differ by format.

---

## What's covered (12 sections)

1. What performance testing is (and isn't)  
2. SLIs & SLOs in plain language  
3. Latency, throughput, and load  
4. k6 hello-world  
5. Interpreting p95 (and friends)  
6. When perf ≠ functional E2E  
7. Glossary  
8. Common pitfalls  
9. Practice exercises  
10. Challenges  
11. Answer key  
12. Where to go next (deeper careers)

---

## Quick start

1. Open [`index.html`](index.html) or the study app in any browser.  
2. Or preview an `.md` file in VS Code (`Ctrl+Shift+V`).  
3. Optional lab: install [k6](https://k6.io/docs/get-started/installation/), then:

```bash
k6 run labs/hello.js
```

---

## Hub files

| File | Purpose |
|---|---|
| [`HANDOFF.md`](HANDOFF.md) | Conventions for humans/agents continuing this kit |
| [`PART1_PLAN.md`](PART1_PLAN.md) | Section plan |
| [`PERF_BASICS_PART1_CONTEXT.md`](PERF_BASICS_PART1_CONTEXT.md) | Context / transfer notes |
| [`labs/hello.js`](labs/hello.js) | Minimal k6 script |

---

*Made for hands-on learning — read a little, guess the metric, run one script, know when not to use E2E for load.*
