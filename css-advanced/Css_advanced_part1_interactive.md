# CSS Advanced — Part 1: Motion (Interactive Edition)

> **Module:** CSS Advanced · **Part:** 1 of 3  
> **Interactive Preview:** Open in VS Code (Ctrl+Shift+V / Cmd+Shift+V)

---

## Interactive Quiz & Knowledge Check

### Section 1: Transitions vs. Animations

- [ ] **Q1:** Which CSS mechanism is best suited for smoothly animating an element's background color when a user hovers over a button?
  - A) `@keyframes` animation loop
  - B) CSS `transition` on `:hover` state
  - C) JavaScript `setInterval` function
  - D) CSS `clip-path`
  *(Answer: B — Transitions handle smooth state-to-state transitions efficiently).*

- [ ] **Q2:** Why is `transform: translateY(-2px)` preferred over `top: -2px` for hover animations?
  - A) `top` does not support easing curves.
  - B) `transform` runs on the GPU compositor thread without triggering layout reflow.
  - C) `transform` only works in dark mode.
  - D) `top` requires JavaScript to activate.
  *(Answer: B — `transform` avoids CPU layout thrashing).*

---

### Section 2: Motion Accessibility

- [ ] **Q3:** Which media query respects OS settings for users with vestibular spectrum disorders?
  - A) `@media (prefers-color-scheme: dark)`
  - B) `@media (prefers-reduced-motion: reduce)`
  - C) `@media (min-width: 768px)`
  - D) `@media (orientation: landscape)`
  *(Answer: B — `prefers-reduced-motion: reduce`).*

---

### Section 3: Easing Functions

- [ ] **Q4:** Which easing curve is recommended for elements entering the viewport?
  - A) `linear`
  - B) `ease-in`
  - C) `ease-out`
  - D) `step-start`
  *(Answer: C — `ease-out` enters quickly and decelerates smoothly).*

---

## Interactive Playwright Checklist

When automating UI tests for animated components:

- [ ] 1. Emulate `reduced-motion` to skip non-essential animations: `await page.emulateMedia({ reducedMotion: 'reduce' });`
- [ ] 2. Avoid using arbitrary `page.waitForTimeout(300)` — rely on Playwright's automatic actionability checks.
- [ ] 3. Verify component state using `toBeVisible()` or `toHaveCSS()` assertions after motion finishes.
