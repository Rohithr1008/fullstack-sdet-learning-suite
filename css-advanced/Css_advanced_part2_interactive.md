# CSS Advanced — Part 2: Transforms & Layering (Interactive Edition)

> **Module:** CSS Advanced · **Part:** 2 of 3  
> **Interactive Preview:** Open in VS Code (Ctrl+Shift+V / Cmd+Shift+V)

---

## Interactive Quiz & Knowledge Check

### Section 1: 3D Transforms

- [ ] **Q1:** Which CSS property must be applied to a parent container to enable 3D perspective depth for child elements?
  - A) `transform-style: preserve-3d`
  - B) `perspective: 1000px`
  - C) `z-index: 9999`
  - D) `backface-visibility: hidden`
  *(Answer: B — `perspective` defines the depth distance from the viewer).*

---

### Section 2: Stacking Contexts

- [ ] **Q2:** Why might a child element with `z-index: 9999` still appear underneath a sibling container with `z-index: 2`?
  - A) `z-index` values cannot exceed 1000.
  - B) The child is inside a parent that established a lower stacking context.
  - C) `z-index` only works in Firefox.
  - D) `z-index` requires `display: flex`.
  *(Answer: B — Stacking contexts isolate internal `z-index` hierarchies).*

---

### Section 3: Isolation & Masking

- [ ] **Q3:** Which modern CSS property isolates an element into its own stacking context without needing `position` or `z-index` hacks?
  - A) `isolation: isolate`
  - B) `box-sizing: border-box`
  - C) `contain: strict`
  - D) `overflow: hidden`
  *(Answer: A — `isolation: isolate`).*

---

## E2E Testing Tips for Overlays & Modals

- [ ] 1. Ensure modal overlays use `isolation: isolate` so target element click selectors are not intercepted by background layers.
- [ ] 2. Verify target element visibility with Playwright's `toBeInViewport()` when testing card flips or transform transitions.
