# JavaScript Essentials — Part 6 (Context / Transfer Doc)

A context transfer document for the **Part 6** set of the JavaScript Essentials study guide.
Part 6 is the **Production Hardening** chapter — it takes the authenticated, deployed MERN app from
Part 5 and adds **automated testing**, **CI/CD**, **monitoring**, **advanced security**,
**performance**, and **scaling**. Project sequencing:
**Part 1** Core → **Part 2** Async/OOP → **Part 3** MERN Bridge → **Part 4** Build MERN apps →
**Part 5** Auth + Deploy → **Part 6** Hardening.

Deep **browser E2E (Playwright)** is intentionally *out of scope* here — learners are pointed to the
separate **Playwright Essentials** series.

## Summary

**Part 6** teaches production hardening in the same **three-edition** pattern as Parts 1–5 (plain
Markdown, interactive Markdown, standalone HTML study app) plus this context doc. Written for a
**complete beginner** who finished Parts 1–5, **ADHD/autistic-friendly**: colour-coded layers
(Tests / CI/CD / Monitor / Security / Scale), tiny chunks, "why it matters", jargon glossary,
and **offline mocks** (CI runner, coverage simulator, logger/rate-limit/RBAC panel).

## Project Files (Part 6)

| File | Purpose |
|---|---|
| `Javascript_essentials_part6_with_examples.md` | Plain Markdown — printing/PDF/read-anywhere |
| `Javascript_essentials_part6_interactive.md` | Interactive Markdown — quizzes, flashcards, Spot-the-Bug, mock CI story |
| `Javascript_essentials_part6_study_app.html` | Standalone HTML app — mock CI + coverage + RBAC panel + 5 auto-graded challenges |
| `PART6_PLAN.md` | Planning file (status: built) |
| `JAVASCRIPT_ESSENTIALS_PART6_CONTEXT.md` | This context / transfer doc |
| `index.html`, `README.md`, `HANDOFF.md` | Updated to link/include Part 6 |

## What's Covered (16 markable sections + answer key)

1. **Why production-hardened matters** — tests, CI/CD, monitoring, scale
2. **Unit & integration** — Vitest/Jest, `describe`/`it`/`expect`
3. **Backend tests** — Express routes & Mongoose mocks
4. **Frontend tests** — React Testing Library (E2E → Playwright Essentials)
5. **Coverage & TDD** — Red → Green → Refactor
6. **CI/CD basics** — GitHub Actions workflows
7. **CI pipeline** — lint → test → build
8. **CD pipeline** — Render + Vercel on merge
9. **Env & secrets in CI** — `${{ secrets.X }}`, never log secrets
10. **Monitoring & logging** — structured logs, errors, uptime
11. **Performance** — lazy load, cache/CDN, indexes, pagination
12. **Advanced security (1)** — refresh tokens, httpOnly, rate limits (429)
13. **Advanced security (2)** — RBAC, CORS, HTTPS
14. **Scaling patterns** — stateless, indexes, CDN, env-per-env
15. **Hardening pitfalls** — skip-CI, leak secrets, fake greens, E2E-only
16. **Practice & auto-graded challenges** — 5 pure functions
17. **Answer key** (not progress-gated)

## Study App Interactivity

- Theme, font zoom, progress + Mark Complete, Learning Path, SRS + shuffle, Focus Mode
- Full parity: predict cards, difficulty/time badges + hints, mood checks, 7-day plan, Spot-the-Bug, certificate, scrollspy
- **⚙️ Live Mock CI/CD Runner** — Push / fail-lint / reset; lint→test→build→deploy lights up
- **📊 Coverage simulator** — green/red file chips + demo %
- **🔒 Logger · Rate-limit · RBAC panel** — login 429 after spam; admin 200 vs member 403
- **5 auto-graded challenges:** `testAssert`, `ciStepsOrder`, `statusFromLint`, `tokenRefresh`, `rbacAllowed`
- Part-suffixed globals (`fontZoom6`, `updateCertificate6`, `scrollspy6`, …)
- Shared shell markers + `StudyShell` wrappers (same as Parts 1–5)

## Verification

- `node verify-study-apps.js` includes Part 6
- `node scripts/inline-shell.js --check` includes Part 6
- App script compiles (`node --check`); sentinel `<!--P6H-END-->`
- Challenge solutions validated (15/15 asserts)

## What's Next (beyond Part 6)

- **Playwright Essentials** — deep browser E2E
- Optional kits: API & Data Essentials, Perf Basics (k6)
- Ship a real repo with Actions + deploy + monitoring

---
*Part 6 created: 2026-09-03*
