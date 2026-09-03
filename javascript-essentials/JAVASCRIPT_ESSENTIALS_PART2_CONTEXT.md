# JavaScript Essentials — Part 2 (Context / Transfer Doc)

A context transfer document for the **Part 2** set of the JavaScript Essentials study guide.
Project homepage: **Part 1** (see `JAVASCRIPT_ESSENTIALS_PART1_CONTEXT.md`) · built in the same repo.

## Summary

**Part 2** covers the JavaScript **intermediate** concepts in the same **three-edition** pattern as Part 1: a plain Markdown edition, an interactive Markdown edition, and a standalone HTML study app — plus a context doc.

## Project Files (Part 2)

| File | Purpose |
|---|---|
| `Javascript_essentials_part2_with_examples.md` | Plain Markdown (~34 KB, 9 sections) — for printing/PDF |
| `Javascript_essentials_part2_interactive.md` | Interactive Markdown (~50 KB) — VS Code preview with quizzes, flashcards, mood checks, Promise Simulator, code sandbox |
| `Javascript_essentials_part2_study_app.html` | Standalone HTML app — dark mode, progress tracking, SRS flashcards, learning path, code sandbox, 5 auto-graded challenges |
| `PART2_PLAN.md` | The original planning file for Part 2 |
| `index.html`, `README.md` | Updated to link/include Part 2 |

## What's Covered (9 Sections)

1. **Promises** — lifecycle, `.then`/`.catch`/`.finally`, chaining
2. **async / await** — async functions, `await`, try/catch, sequential vs parallel, top-level await
3. **Error Handling** — error types, `throw`, `try/catch/finally`, custom errors, error properties
4. **Classes & OOP** — `class`, constructor, methods, `this`, `extends`/`super`, static, getters/setters, private fields, instanceof
5. **Modules** — ES modules, named/default/re-export, dynamic `import()`, CommonJS vs ESM
6. **Common Pitfalls** — 6 async/OOP pitfalls
7. **Practice Exercises** — 8 exercises (Easy/Medium with hints)
8. **Challenges** — 5 hard challenges, auto-graded in the HTML app
9. **Answer Key** — all quiz/exercise/challenge solutions

## Interactive Elements (by edition)

- **All editions:** content parity (same sections/examples)
- **Interactive Markdown:** 5 quiz-boxes, 5 flashcards, predict-the-output cards, mood checks, live Promise Simulator, live Code Sandbox (ctrl+enter)
- **HTML App:** everything above plus — 🌙 dark mode toggle, 📊 progress bar + "Mark Complete" (localStorage), 🧭 learning path, 🃏 spaced-repetition flashcards (new→learning→mastered), ▶️ code sandbox, 🎯 **5 auto-graded challenges** with instant pass/fail + hints

## Conventions (carried from Part 1)

- `const` by default, `===` always
- Arrow functions for callbacks, template literals
- Real-world examples with verified output (all validated with Node)
- Difficulty/time badges, collapsible hints & answers
- Each section has an anchor `<h2 id="N-...">`; TOC navigation in the app

## Verification Done

- All JS snippets validated with Node.js (output confirmed: chaining `9`, class `Hi, Rohit`, static `6`, private `5`, inheritance `true true true`, etc.)
- All 5 auto-graded challenges pass with the canonical solutions (12/12 tests)
- Inline `<script>` in the HTML app compiles clean (`node --check` OK)
- HTML structure intact: `<!DOCTYPE>`, single `<script>`/`</script>`, `</body>`, `</html>`

## What's Next (Part 3 candidate)

`Map`/`Set` deep dive, generators, proxies, DOM/events, and web APIs (fetch) — not yet started.

---
*Part 2 created: 2026-09-02*
