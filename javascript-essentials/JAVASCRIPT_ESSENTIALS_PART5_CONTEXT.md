# JavaScript Essentials — Part 5 (Context / Transfer Doc)

A context transfer document for the **Part 5** set of the JavaScript Essentials study guide.
Part 5 is the **Production chapter** — it takes the working MERN apps from Part 4 and makes them
real for users: **authentication** (accounts, hashed passwords, JWT, protected routes) and
**deployment** (hosting backend/frontend/database with safe env vars). Project sequencing:
**Part 1** Core → **Part 2** Async/OOP → **Part 3** MERN Bridge → **Part 4** Build MERN apps →
**Part 5** Ship to production.

## Summary

**Part 5** teaches auth + deployment in the same **three-edition** pattern as Parts 1–4 (plain
Markdown, interactive Markdown, standalone HTML study app) plus this context doc. Written for a
**complete beginner**, **ADHD/autistic-friendly**: colour-coded layers (now including 🩷 Auth and
🟩 Production), tiny chunks, "why it matters", a jargon glossary, onboarding hint, and a **live mock
auth server** so learners watch the whole register → hash → login → JWT → protected-route flow.

## Project Files (Part 5)

| File | Purpose |
|---|---|
| `Javascript_essentials_part5_with_examples.md` | Plain Markdown, 17 sections — printing/PDF/read-anywhere |
| `Javascript_essentials_part5_interactive.md` | Interactive Markdown — quizzes, flashcards, mood checks, live auth-demo buttons, Focus Mode |
| `Javascript_essentials_part5_study_app.html` | Standalone HTML app — 🔐 live mock auth server + JWT viewer + 5 auto-graded challenges + SRS + Focus Mode |
| `PART5_PLAN.md` | The planning file for Part 5 |
| `JAVASCRIPT_ESSENTIALS_PART5_CONTEXT.md` | This context / transfer doc |
| `index.html`, `README.md` | Updated to link/include Part 5 |

## What's Covered (16 Sections)

1. **The production layer** — local vs production; auth + deployment
2. **Authentication vs Authorization** — WHO you are vs WHAT you may do
3. **Hashing with bcrypt** — why never plain text; `hash` vs `compare`
4. **JWT — the three parts** — header, payload, signature
5. **Register a user** — validate + hash + avoid duplicates → 201
6. **Login & issuing a token** — compare + `jwt.sign` → token
7. **Protected routes (middleware)** — `auth` checks Bearer header → 401 or `next()`
8. **Token in React** — localStorage + `Authorization: Bearer`
9. **The full auth module** — register + login + protected in one place (live demo)
10. **Deployment** — host backend + frontend + database
11. **Backend hosting + env vars + Atlas** — Render, `.env`/env tab, secrets
12. **Frontend hosting** — Vercel/Netlify, `VITE_API_URL`, CORS
13. **Testing basics** — assert behavior; red = broken
14. **Routing libraries** — React Router maps URL → page; Navigate guards
15. **Common production pitfalls** — the 6 classic leaks/bugs
16. **Practice & auto-graded challenges** — 5 challenges

## Study App Interactivity (reuses proven Parts 1–4 features; now at full parity)

- Theme, font zoom, progress + Mark Complete, Learning Path, SRS + shuffle, Focus Mode
- **Full parity feature set** (matches Parts 1–3): predict-the-output cards, difficulty/time badges + per-challenge hints, mood checks, 7-day study plan, 🐞 Spot-the-Bug final quiz, 🏆 completion certificate (unlocks at 100%), 🧭 scrollspy nav
- **🔐 Live Mock Auth Server** — buttons for Register / Login / Get /api/me / Logout / Watch-the-whole-flow
- **JWT viewer** — token shown as 3 coloured chips (header · payload · signature)
- **Hash demo** — see a password become a one-way hash
- **5 auto-graded challenges** (neverPlainText, tokenPayload, attachAuthHeader, authMiddleware, deployOrder)
- Onboarding hint + auth/deploy jargon glossary, XP/streak/confetti, focus timer, surprise
- All part-specific content (predict cards, Spot-the-Bug, 7-day plan) tailored to **auth/deploy**

## Verification Done

- Part 5 app inline `<script>` compiles clean (`node --check`) — single script block, DOCTYPE/body/html,
  P5H-END sentinel, no leftover build markers
- **Functional DOM tests pass (14/14):** register stores a one-way hash (not plain), login issues a token,
  token has **exactly 3 parts**, JWT chips render, logout clears the token, protected route 401-path works,
  and all 5 challenge solutions pass (C1–C5)
- **Found & fixed a real bug:** the mock JWT signature `"sig"+userId` contained a literal dot (email) →
  made it 4 parts instead of 3. Fixed with a base64url codec + dot-free hex-style signature → exactly 3 parts.
- **Certificate**: unlocks green at 100% and correctly resets to locked when sections are un-marked
- Made challenge C1 unambiguous (rule: a hash contains `$`; plain `secret` doesn't)
- Interactive markdown: 1 balanced `<script>` (compiles), 17 `<h2>` sections, P5I-END present
- Plain markdown: 17 sections, P5-END present

## What's Next (beyond Part 5)

Scale & teams: CI/CD (auto-deploy on push), monitoring/logging, performance, and advanced security
(refresh tokens, rate limiting, HTTPS, role-based access control). Mastery comes from shipping a
real project with auth deployed, then iterating.

---
*Part 5 created: 2026-09-02*