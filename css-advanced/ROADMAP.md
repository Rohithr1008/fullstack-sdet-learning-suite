# CSS Advanced — ROADMAP

**Status:** STUB — section outlines only.

Short execution plan. Not a curriculum essay.

---

## Goal

Deepen CSS after **HTML & CSS Essentials** (Phase B): motion, transforms, custom properties, and a gentle intro to design tokens / preprocessors — without turning into a full design-system course.

## Audience

- Finished html-css Parts 1–3  
- Moving toward React or design handoff (Phase C)  
- Testers who want to read component styles and token names confidently  

---

## Parts (planned)

### Part 1 — Motion

- `transition` vs `animation` — when each  
- `@keyframes`, timing, easing  
- `prefers-reduced-motion` (required habit)  
- Performance: transform/opacity vs layout thrash  
- Labs: hover/focus micro-interactions, loading skeleton  

### Part 2 — Transforms & layering

- 2D/3D transforms, `transform-origin`  
- Stacking contexts, `z-index` sanity  
- Clip/mask light touch  
- Labs: card flip, modal overlay, parallax (subtle)  

### Part 3 — Variables, tokens, preprocessors (light)

- CSS custom properties (`--token`) and theming  
- Design tokens intro (naming, light/dark)  
- Sass/PostCSS — what they solve, one-file demo each  
- Bridge to Figma tokens / Code Connect (link [`../figma-to-dev/`](../figma-to-dev/))  

---

## Deliverables (when built)

| Artifact | Role |
|---|---|
| `Css_advanced_partN_with_examples.md` | Plain / print |
| `Css_advanced_partN_interactive.md` | VS Code preview |
| `Css_advanced_partN_study_app.html` | Offline app |
| `index.html` | Hub |
| `_generate.js` | Regenerate three editions |

---

## Out of scope

- Full React styling course → [`../react-essentials/`](../react-essentials/)  
- Figma workflow depth → [`../figma-to-dev/`](../figma-to-dev/)  
- Re-teaching flex/grid/a11y from html-css  

---

*Phase C · STUB — build later.*
