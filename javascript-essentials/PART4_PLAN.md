# PART 4 — MERN Foundations Plan

## Goal
Give an absolute beginner (no prior MERN/server/React experience, with ADHD/autistic-friendly
design needs) a complete, interactive, three-edition study kit that teaches how to build a real
MERN app end-to-end — two working mini-projects — in small, predictable, highly-visual steps.

This EXACTLY mirrors the Part 1/2/3 format: plain Markdown + interactive Markdown + standalone
HTML study app + a context doc, plus index.html/README updates.

## Audience constraints
- Never touched Node, Express, Mongoose, React, or TypeScript.
- Neurodivergent-friendly: tiny chunks, predict-before-reveal, colour-coded layers, "why it
  matters" every section, a jargon glossary, Focus Mode, low-stakes practice.
- Must be able to LEARN and CLICK without installing anything (study app runs fully offline with
  a mock API so the client/server/db round-trip is visible in the browser).

## Two mini-projects
1. **Project A — Notes App** — simplest full-stack CRUD (Express + Mongoose + a React page that
   fetches & posts; offline mock API teaches the same request/response shape).
2. **Project B — Product Store with Reviews** — relationships (Mongoose `ref` + `populate`),
   nested routes (POST /api/products/:id/reviews), and a connected React product page.

## Sections (16)
1. Hello MERN — the 3-layer sandwich + why each piece
2. Setting up a project — Node, npm, package.json, folder structure
3. The full request/response cycle — how a click becomes a DB row
4. Express server — routing, middleware, req/res
5. REST API design — endpoints, HTTP verbs, status codes, JSON
6. MongoDB + Mongoose — connect, schema, model, CRUD
7. **Project A — backend**: Notes API (full CRUD)
8. React fundamentals — components, JSX, props, state, hooks
9. Client → server — fetch GET/POST, forms, rendering in React
10. **Project A — full stack**: wire React + fetch to the Notes API
11. CORS & the sandwich — why CORS exists, enabling it
12. Node core for servers — fs, path, env, http (bridge from Part 3)
13. TypeScript in 30 minutes — types, interfaces, typed as you build
14. **Project B — Product Store**: nested routes, refs, populate
15. Common pitfalls in MERN
16. Practice exercises · Challenges (5, auto-graded) · Answer key

## Study app interactivity (ALL proved in Parts 1–3, reused)
- Theme, font zoom, progress bar + Mark Complete (localStorage)
- Learning Path, SRS flashcards + shuffle, mood checks
- Focus Mode, collapse/expand-all, "Why it matters" callouts
- Layer-colour legend (client/server/db)
- **Offline Mock API** + live request/response playground (click → see method, path, status, body)
- React component sandbox (render a "component" mentally via JS)
- 5 auto-graded challenges (pure-function tests, no install needed)
- Confetti, XP/streak, focus timer, surprise

## Deliverables
- PART4_PLAN.md
- Javascript_essentials_part4_with_examples.md (plain)
- Javascript_essentials_part4_interactive.md (interactive)
- Javascript_essentials_part4_study_app.html (app)
- JAVASCRIPT_ESSENTIALS_PART4_CONTEXT.md
- Update index.html (Part 4 cards), README.md (Part 4 section)
- Validate: node --check on scripts, run functional DOM tests on interactive funcs, verify structure.

## Notes
- The study app cannot run real Node/Mongo; it uses a faithful in-memory mock API so learners build
  the mental model and can copy the SAME code to a real project in the included quick-start.
- All code samples styled for ADHD: one idea per block, comments as "labels", avoid wall-of-text.