# CSS Advanced — Part 3: Variables, Tokens & Preprocessors (Plain Edition)

> **Module:** CSS Advanced · **Part:** 3 of 3  
> **Topic:** CSS Custom Properties (`var(--token)`), Design Token Hierarchies, Light/Dark Theming, & Sass/PostCSS Overview

---

## 1. CSS Custom Properties (Variables)

CSS Custom Properties allow dynamic theme values to cascade through the DOM tree.

```css
:root {
  /* Primitive / Global Tokens */
  --color-blue-500: #1d4f91;
  --color-gray-100: #f4f7fb;
  --color-gray-900: #182333;

  /* Semantic / Component Tokens */
  --theme-bg: var(--color-gray-100);
  --theme-text: var(--color-gray-900);
  --button-primary-bg: var(--color-blue-500);
}

@media (prefers-color-scheme: dark) {
  :root {
    --theme-bg: #0d1420;
    --theme-text: #dbe4ef;
    --button-primary-bg: #3b82f6;
  }
}
```

---

## 2. Design Token Tier Hierarchy

Design tokens bridge design tools (e.g. Figma) and codebase implementation:

1. **Primitive Tokens**: Hardcoded values (e.g. `--color-blue-500: #1d4f91;`, `--space-4: 16px;`).
2. **Semantic Tokens**: Intent-based tokens (e.g. `--color-surface-primary`, `--color-text-muted`).
3. **Component Tokens**: Scoped to specific UI elements (e.g. `--card-border-radius`, `--btn-padding`).

---

## 3. Preprocessors Overview: Sass & PostCSS

### Sass (Syntactically Awesome Style Sheets)
Adds nesting, mixins, functions, and file splitting to CSS before compilation.

```scss
/* Sass Example */
$primary: #1d4f91;

@mixin flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.card {
  background: $primary;
  @include flex-center;

  .title {
    font-size: 1.25rem;
  }
}
```

### PostCSS
A JavaScript plugin toolchain for transforming CSS (e.g., Autoprefixer, Tailwind CSS compiler, CSS nesting polyfills).

---

## 4. Bridge to Figma Design Tokens & Code Connect

Design tokens defined in CSS (`var(--color-brand-primary)`) map directly to Figma variables. This allows automated verification of design handoff specifications in component libraries and automated E2E tests.

---

## 5. Summary & Best Practices

1. Use **Semantic Tokens** (`--color-bg-surface`) rather than Primitive Tokens (`--blue-500`) inside components.
2. Structure custom property fallbacks safely: `color: var(--theme-text, #333);`.
3. Leverage native CSS nesting and Custom Properties in modern codebases to minimize preprocessor runtime build steps.
