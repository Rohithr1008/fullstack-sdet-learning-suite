# PART 6 — Production Hardening: CI/CD, Testing & Scale (Plan)

> **Built plan.** The series is complete through Part 6 (Core → Async/OOP → MERN Bridge →
> Build MERN apps → Auth & Deployment → Production Hardening). Part 6 turns a *working, deployed* app into a *professional,
> maintainable, scalable* app. Delivered in the same three-edition format as Parts 1–5.

## Goal
Take the Part 4 + Part 5 app and make it production-grade: **automated testing**, **CI/CD** (auto-test
and auto-deploy on every push), **monitoring & logging**, **advanced security** (refresh tokens, rate
limiting, RBAC), **performance**, and **scaling patterns**. Same three-edition format, for a
**complete beginner** who is **neurodivergent (ADHD/autistic)**: tiny chunks, colour-coded layers,
"why it matters", predict-then-reveal, a jargon glossary, Focus Mode, and no-install interactivity.

## Audience constraints
- Completed Parts 1–5 (has built and deployed a MERN app). This part is the "make it bulletproof" layer.
- Still beginner-friendly and ADHD/autistic-friendly: no walls of text; one idea per block; the study
  app must run fully offline with faithful in-page mocks so every concept is clickable with zero install.

## Sections (16)
1. Why "production-hardened" matters — tests, CI/CD, monitoring, scale
2. Unit & integration testing — Vitest/Jest, `describe`/`it`/`expect`
3. Testing the backend — testing Express routes & Mongoose logic (with mocks)
4. Testing the frontend — testing React components & hooks (Testing Library)
5. Coverage & test-driven development (TDD) mindset
6. CI/CD — what it is, GitHub Actions basics
7. CI pipeline — lint + test + build on every push
8. CD pipeline — auto-deploy backend (Render) + frontend (Vercel) on merge
9. Environment & secrets in CI — how env vars flow through the pipeline
10. Monitoring & logging — structured logs, error tracking, uptime
11. Performance — bundling, lazy loading, caching, query perf (indexes)
12. Advanced security (1) — refresh tokens, httpOnly cookies, rate limiting
13. Advanced security (2) — RBAC, CORS tightening, HTTPS on a custom domain
14. Scaling patterns — stateless servers, Mongo indexes/pagination, CDN, env-per-environment
15. Common hardening pitfalls
16. Practice + auto-graded challenges + answer key

## Study-app interactivity (reuses the proven Parts 1–5 architecture)
- Theme, font zoom, progress, Learning Path, SRS + shuffle, Focus Mode, collapse-all
- **Full parity feature set** (now standard across the series): predict-the-output cards,
  difficulty/time badges + hints, mood checks, 7-day study plan, 🐞 Spot-the-Bug, 🏆 certificate, 🧭 scrollspy
- **Live mock CI runner** — press "Push" and watch lint → test → build → deploy light up step by step
- **Coverage / test-result simulator** — see green/red checks and what coverage % means
- **Mock logger / rate-limiter / RBAC panel** — watch requests get logged, limited, or role-checked
- **5 auto-graded challenges** (pure functions: e.g. testAssert, ciStepsOrder, statusFromLint,
  tokenRefresh, rbacAllowed)
- XP/streak/confetti, focus timer, surprise, onboarding + jargon glossary
- All interactive content tailored to *this* part's material (CI/CD, testing, security)

## Deliverables
- PART6_PLAN.md
- Javascript_essentials_part6_with_examples.md (plain)
- Javascript_essentials_part6_interactive.md
- Javascript_essentials_part6_study_app.html
- JAVASCRIPT_ESSENTIALS_PART6_CONTEXT.md
- Update index.html (Part 6 cards), README.md (Part 6 section)
- Update HANDOFF.md §8 (mark Part 6 as available / done when built) + the per-part inventory §5b
- Validate: node --check scripts, functional DOM tests on mock CI + challenges, structure checks.

## Notes
- Follow the exact Part 4/5 approach: the study app cannot run real CI/CD/security, so it faithfully
  *simulates* each concept (a mock CI runner, coverage visualiser, logger/limiter/RBAC panel) so the
  learner builds the correct mental model before touching real GitHub Actions / Render / Vercel.
- Reuse the exact proven script scaffolding (part-suffixed globals like `updateCertificate6`, `scrollspy6`).
- Reminder from Part 5: JWT must be exactly 3 parts; keep the certificate-lock background-reset fix;
  keep challenge solutions as pure functions validated via the real `runTest` harness (with a canvas mock).

---
_Created: 2026-09-02 · Status: ✅ BUILT (2026-09-03) — three editions + context + hub updates._