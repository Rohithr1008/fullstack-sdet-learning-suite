# Project Handoff — Perf Basics (1-Part Kit)

> **Purpose:** Everything a fresh session (human or AI) needs to continue this repo confidently. Read this first.  
> **Scope:** Thin **Perf Basics** kit only — do not expand into full capacity engineering or other Automation Tester Path kits here unless asked.

---

## 1. Project Overview

A beginner-friendly, ADHD-friendly study guide that teaches **performance literacy for automation testers**: goals (SLI/SLO), one k6 script, reading percentiles, and the boundary vs functional E2E.

| Part | Title | Sections | Covers |
|---|---|---|---|
| 1 | Perf Basics | 12 | SLI/SLO, latency/load, k6 hello, p95, E2E vs perf, glossary, pitfalls, practice |

**Status:** Scaffold + Part 1 complete (local git). No remote required.

### Automation Tester Path

| | |
|---|---|
| Umbrella | [`../automation-tester-path/README.md`](../automation-tester-path/README.md) |
| Previous | [`../api-data-essentials/`](../api-data-essentials/README.md) |
| Next | — (end of path) |
| Siblings (do not build here) | JavaScript Essentials, Playwright Essentials, API & Data Essentials |

---

## 2. File Naming Convention

For Part 1:
- `Perf_basics_part1_with_examples.md` — plain Markdown (no HTML; print/PDF friendly)
- `Perf_basics_part1_interactive.md` — interactive Markdown (`<style>`, quiz-boxes, flashcards)
- `Perf_basics_part1_study_app.html` — standalone study app (offline)
- `PART1_PLAN.md` — planning doc
- `PERF_BASICS_PART1_CONTEXT.md` — context/transfer doc
- `index.html` — landing hub
- `README.md` — top-level doc
- `labs/hello.js` — real k6 hello-world lab

Sentinels at EOF:
- Plain: `<!--P1-END-->`
- Interactive: `<!--P1I-END-->`
- Study app: `<!--P1H-END-->`

---

## 3. Pedagogy Canon (mirror JE)

- Every teaching section opens with `> 🚩 **Why it matters:**`
- Quizzes, glossary, pitfalls, practice, challenges, answer key
- Study app: theme, progress (`p1-sec-N`), Focus Mode, optional certificate at 100%
- Thin kit: **concept mocks** (percentile interpreter, SLO checker) offline; **real lab** = `k6 run labs/hello.js`

---

## 4. What's intentionally out of scope

- Full capacity / soak / spike methodology deep-dives
- Distributed tracing careers, SRE on-call playbooks
- Playwright timing as a substitute for load tools (mention only: wrong tool for load)
- Building Playwright / API / JE kits inside this folder

---

## 5. Verification (lightweight)

- Open `index.html` and study app in a browser
- Preview interactive MD in VS Code
- If k6 installed: `k6 run labs/hello.js` should print checks + trends

---

## 6. Next work (only if asked)

- Optional CI verify for the study app HTML
- Extra labs (thresholds file, stages) — keep thin

### ✅ Path cross-links

Umbrella + prev/next: [`../automation-tester-path/`](../automation-tester-path/README.md)
