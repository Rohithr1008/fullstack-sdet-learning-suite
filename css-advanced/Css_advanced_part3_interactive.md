# CSS Advanced — Part 3: Variables, Tokens & Preprocessors (Interactive Edition)

> **Module:** CSS Advanced · **Part:** 3 of 3  
> **Interactive Preview:** Open in VS Code (Ctrl+Shift+V / Cmd+Shift+V)

---

## Interactive Quiz & Knowledge Check

### Section 1: Custom Properties & Theming

- [ ] **Q1:** Which token tier represents intent rather than raw hardcoded visual values?
  - A) Primitive Tokens (e.g. `--blue-600`)
  - B) Semantic Tokens (e.g. `--color-surface-danger`)
  - C) Hardcoded Pixel Values (`16px`)
  - D) HTML Tag Selectors
  *(Answer: B — Semantic Tokens define intent, enabling seamless light/dark mode switching).*

---

### Section 2: Sass vs. PostCSS

- [ ] **Q2:** What role does PostCSS typically perform in modern front-end build pipelines?
  - A) Compiles Java bytecode.
  - B) Transforms CSS via JS plugins (e.g., Autoprefixer, Tailwind, Nesting).
  - C) Replaces Playwright test suites.
  - D) Renders WebGL shaders.
  *(Answer: B — PostCSS runs JS-based CSS transformation plugins).*

---

## E2E Testing Tips for Design Token Compliance

- [ ] 1. Assert computed styles in Playwright tests using `toHaveCSS('background-color', 'rgb(29, 79, 145)')`.
- [ ] 2. Test dark mode token switching by toggling theme classes or `page.emulateMedia({ colorScheme: 'dark' })`.
