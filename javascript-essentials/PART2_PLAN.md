# JavaScript Essentials - Part 2 (Planning File)

Building the **core Part 2** set (Promises, async/await, error handling, classes/OOP, modules) to match the Part 1 **three-edition** pattern, inside the same repo.

## Part 2 Sections

1. **Promises** — what they are, states, `.then`/`.catch`/`.finally`, chaining, `Promise.all`/`allSettled`/`race`/`any`
2. **async / await** — async functions, `await`, try/catch with await, top-level await, parallelism vs sequential
3. **Error Handling** — `Error` types (revisit), `throw`, `try`/`catch`/`finally`, custom errors, error properties
4. **Classes & OOP** — `class`, `constructor`, methods, `this`, `extends`/`super`, static, getters/setters, private fields, mixins, instanceof
5. **Modules** — ES modules `import`/`export`, named/default, re-export, dynamic `import()`, CommonJS vs ESM

## Editions (3 files)

| File | Purpose | Status |
|------|---------|--------|
| `part2_with_examples.md` | Plain Markdown for print/PDF | Pending |
| `part2_interactive.md` | Interactive Markdown (quizzes, flashcards, mood, collapsible) | Pending |
| `part2_study_app.html` | Standalone HTML app (dark mode, progress, sandbox, interactivity) | Pending |

## Conventions carried over from Part 1

- `const` by default, `===` always
- Arrow functions for callbacks, template literals
- Real-world examples with verified output (validated with Node)
- Self-test quizzes, flashcards, mood checks, difficulty/time badges
- Pitfalls, practice exercises, challenges, answer key
- Each section has an anchor `<h2 id="N-...">`

## Verification

- All JS snippets validated with Node.js (async where needed)
- HTML app's inline `<script>` compiles (checked with a Node harness)

*Part 2 plan created: 2026-09-02*
