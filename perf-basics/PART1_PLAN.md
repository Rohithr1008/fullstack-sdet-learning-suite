# Perf Basics — Part 1 (Planning File)

Thin **1-part** kit: performance literacy for automation testers (k6 intro). Pedagogy mirrors JavaScript Essentials three-edition format.

## Sections

1. **What performance testing is (and isn't)** — goals vs functional correctness; smoke timing ≠ load
2. **SLIs & SLOs in plain language** — Service Level Indicator vs Objective; error budgets (light touch)
3. **Latency, throughput, and load** — response time, RPS, concurrent VUs
4. **k6 hello-world** — install pointer, `http.get`, checks, `k6 run labs/hello.js`
5. **Interpreting p95** — mean vs median vs p95/p99; why averages lie
6. **When perf ≠ functional E2E** — Playwright/E2E for user journeys; k6 for load; don't confuse them
7. **Glossary** — SLI, SLO, SLA, VU, RPS, latency, throughput, threshold, check
8. **Common pitfalls** — testing prod by accident, tiny sample sizes, averaging only, E2E as load
9. **Practice exercises** — short drills
10. **Challenges** — interpret sample result tables; write a tiny script sketch
11. **Answer key**
12. **Where to go next** — SRE/perf careers link-outs (Grafana k6 docs, Google SRE book concepts)

## Editions (3 files)

| File | Purpose |
|------|---------|
| `Perf_basics_part1_with_examples.md` | Plain Markdown for print/PDF |
| `Perf_basics_part1_interactive.md` | Interactive Markdown (quizzes, flashcards, predict) |
| `Perf_basics_part1_study_app.html` | Standalone HTML (progress, mocks, glossary, optional certificate) |

## Lab

- `labs/hello.js` — minimal k6 script hitting a public demo URL or `https://test.k6.io`

## Conventions

- Why-it-matters on every teaching section
- ADHD-friendly chunking; no capacity-engineering rabbit holes
- Certificate optional (unlock at 100% section complete in study app)

## Verification

- Browser open study app + hub
- Optional: `k6 run labs/hello.js` if k6 installed

*Part 1 plan created for Perf Basics thin kit.*
