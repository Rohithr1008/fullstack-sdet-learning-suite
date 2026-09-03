# PART 5 — Production: Auth + Deployment (Plan)

## Goal
Extend the series beyond "runs on my computer" into **production depth**: user authentication
(hashed passwords + JWT + protected routes + React login) and **deployment** (hosting the backend,
frontend, and database). Same three-edition format as Parts 1–4, for a **complete beginner** who is
**neurodivergent (ADHD/autistic)**: tiny chunks, colour-coded layers, "why it matters", predict-then-
reveal, a jargon glossary, Focus Mode, and no-install interactivity.

## Sections (16)
1. Production layer — why auth & deployment matter
2. Authentication vs authorization
3. Passwords done right — hashing with bcrypt
4. JWT — the three parts, how login works
5. Register a user (backend)
6. Login & issuing a token
7. Protecting routes with middleware
8. Using the token in React (login form, header)
9. 🔐 Live auth demo (mock: register/login/protected route)
10. Deployment — what it actually means
11. Hosting the backend (Render) + env vars + Atlas DB
12. Hosting the frontend (Vercel / Netlify)
13. Testing basics (why + a first test)
14. Routing libraries (React Router)
15. Common production pitfalls
16. Practice + auto-graded challenges + answer key

## Study-app interactivity (reuses proven Parts 1–4 architecture)
- Theme, font zoom, progress, Learning Path, SRS + shuffle, Focus Mode, collapse-all
- **Live mock auth server**: register → "hash" (visually, shows never-plain-text) → login → mock JWT
  (see header/payload/signature) → protected route (401 without token, 200 with it)
- **JWT decoder playground** + **deployment step-builder checklist**
- **5 auto-graded challenges** (pure functions, e.g. hashCheck, tokenPayload, authMiddleware,
  attachAuthHeader, deployOrder)
- XP/streak/confetti, focus timer, surprise, onboarding + jargon glossary

## Deliverables
- PART5_PLAN.md
- Javascript_essentials_part5_with_examples.md (plain)
- Javascript_essentials_part5_interactive.md
- Javascript_essentials_part5_study_app.html
- JAVASCRIPT_ESSENTIALS_PART5_CONTEXT.md
- Update index.html (Part 5 cards), README.md (Part 5 section)
- Validate: node --check scripts, functional DOM tests on mock auth + challenges, structure checks.

## Notes
- Real bcrypt/JWT require a server + npm packages; the study app faithfully *simulates* the flow so
  learners build the exact mental model before running the real thing. All code still works 1:1 in a
  real Express + React project (quick-start included).
- Strong emphasis on the `Authorization: Bearer <token>` header and "never trust the client" mindset.