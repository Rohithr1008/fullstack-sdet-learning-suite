# Perf Basics Part 1 — Context Transfer & Project Status

> **Purpose:** Capture what's done, key decisions, and next steps so a fresh conversation can continue without losing context.

---

## Project Location

```
C:\Users\rohit\.cline\data\workspaces\chat\perf-basics\
```

**Remote:** none required (local git init only).  
**Umbrella path:** Automation Tester Path (sibling to JE / Playwright / API kits).

---

## Files in This Project

| File | Purpose |
|---|---|
| `Perf_basics_part1_with_examples.md` | Plain Markdown — print / PDF |
| `Perf_basics_part1_interactive.md` | Interactive Markdown — quizzes, flashcards |
| `Perf_basics_part1_study_app.html` | Standalone study app — progress, mocks, certificate |
| `README.md` | Repo entry |
| `HANDOFF.md` | Agent/human handoff |
| `index.html` | Edition chooser hub |
| `PART1_PLAN.md` | Section plan |
| `PERF_BASICS_PART1_CONTEXT.md` | This file |
| `labs/hello.js` | k6 hello-world lab |

---

## What's Complete — 12 Sections

| # | Section | Key concepts |
|---|---|---|
| 1 | What perf testing is | Correctness vs speed/capacity; tool roles |
| 2 | SLIs & SLOs | Indicator vs objective; example user-facing SLO |
| 3 | Latency / throughput / load | ms, RPS, VUs |
| 4 | k6 hello-world | Script shape, checks, how to run |
| 5 | Interpreting p95 | Why p95 > mean; tail latency |
| 6 | Perf ≠ functional E2E | When to use Playwright vs k6 |
| 7 | Glossary | Core terms |
| 8 | Pitfalls | Common mistakes |
| 9–11 | Practice / challenges / answers | Drills |
| 12 | Deeper careers | Honest link-outs |

### Interactive elements (app + interactive MD)

- Self-test quizzes · flashcards · predict cards · mood checks  
- Spot-the-Bug · 7-day plan · glossary  
- Study app: theme, progress, Focus Mode, percentile mock, SLO checker, optional certificate  

---

## Key Decisions

1. **Prefer k6** over Playwright for load honesty (Playwright stays functional E2E).  
2. **Basics only** — one script + reading results, not full capacity engineering.  
3. **Three-edition pedagogy** identical in spirit to JE.  
4. **Thin kit** — single part; no Parts 2–N unless requested.  

---

## Out of Scope (by design)

- Soak/spike/stress methodology deep-dives  
- Vendor certification tracks  
- Building other Automation Tester Path kits in this folder  

---

## Next Steps (only if asked)

- Cross-link from umbrella README / Playwright Part 5  
- Optional CI smoke for HTML  
- Extra lab: thresholds + stages (still keep thin)
