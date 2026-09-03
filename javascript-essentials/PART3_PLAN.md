# JavaScript Essentials - Part 3 (Planning File) — MERN Bridge

Building the **Part 3** set that turns the core-language foundation (Parts 1–2) into **MERN-readiness**, following the same **three-edition** pattern in the same repo.

**Target:** Fill the two big gaps a MERN dev needs beyond Parts 1–2 — **browser/DOM APIs (for React)** and **Node core (for Express)** — plus the last core-language tiles (`Map`/`Set`, generators/iterators, RegExp) and a **fetch/API bridge**.

## Part 3 Sections

1. **Iterables, `Map` & `Set`** — iterables/iterators, `Map` (vs object), `Set` (vs array), real-world usage
2. **Generators & `for await...of` deep dive** — generator functions, yield, async generators, use cases
3. **Regular Expressions (RegExp)** — patterns, flags, `.match`/`.replace`/`.test`, capture groups, validation
4. **DOM & Events (for React)** — selecting/creating/modifying elements, event listeners, forms & input, event object
5. **`fetch` & Web APIs** — `fetch` GET/POST, JSON, headers, error handling, `FormData`, AbortController
6. **Node.js Core** — `require` vs ESM, `fs`, `path`, `process`/env, `http` server, `os` (for Express/Mongoose)
7. **Common Pitfalls (MERN-focused)** — async in loops, unhandled rejections, `.json()` mistakes, blocking the event loop, shallow vs deep copies in state
8. **Practice Exercises** — 8 exercises across DOM, fetch, Node, Map/Set
9. **Challenges** — 5 auto-graded challenges
10. **Answer Key**

## Editions (3 files)

| File | Purpose |
|------|---------|
| `part3_with_examples.md` | Plain Markdown for print/PDF — full sections |
| `part3_interactive.md` | Interactive Markdown — quizzes, flashcards, mood, collapsible |
| `part3_study_app.html` | Standalone HTML app — dark mode, progress, sandbox, auto-graded challenges, DOM/fetch live labs |

## Conventions carried over from Parts 1–2

- `const` by default, `===` always
- Arrow functions for callbacks, template literals
- Real-world MERN-flavored examples with verified output (validated with Node)
- Self-test quizzes, flashcards, mood checks, difficulty/time badges
- Pitfalls, practice exercises, challenges, answer key
- Each section has an anchor `<h2 id="N-...">`

## Node-validation note
Browser-only APIs (DOM, `fetch`) cannot run in plain Node — these are **validated by syntax-check** and illustrated with runnable browser-facing snippets, while Node-only snippets (`fs`, `path`, `http`) are actually executed.

*Part 3 plan created: 2026-09-02*
