# CSS Advanced — Part 1: Motion (Plain Edition)

> **Module:** CSS Advanced · **Part:** 1 of 3  
> **Topic:** Transitions, Keyframes, Easing, Accessibility (`prefers-reduced-motion`), & Compositing Performance

---

## 1. Why Motion Matters in Modern UI & Testing

CSS transitions and animations elevate static interfaces into responsive, interactive user experiences. For developers and QA automation engineers, understanding CSS motion ensures that:
- Micro-interactions feel natural and non-disruptive.
- Layout thrashing and frame drops are avoided.
- Automated E2E tests (e.g., Playwright) handle animated state changes cleanly without flakiness or race conditions.
- Accessibility standards (WCAG 2.1 Success Criterion 2.3.3) are satisfied for motion-sensitive users.

---

## 2. CSS Transitions vs. Animations

### CSS Transitions
Transitions smooth the change between two visual states triggered by user interaction (e.g., `:hover`, `:focus-visible`, `:active`, or class toggles).

```css
.button {
  background-color: #1d4f91;
  transform: translateY(0);
  transition: background-color 0.2s ease, transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.button:hover {
  background-color: #153e75;
  transform: translateY(-2px);
}
```

### CSS Animations (`@keyframes`)
Animations allow multi-step, complex sequences that can run automatically, loop infinitely, or execute custom keyframe percentage stages without requiring state triggers.

```css
@keyframes pulse-glow {
  0% {
    box-shadow: 0 0 0 0 rgba(29, 79, 145, 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(29, 79, 145, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(29, 79, 145, 0);
  }
}

.skeleton-loader {
  animation: pulse-glow 1.8s infinite ease-in-out;
}
```

---

## 3. Timing Functions & Easing Curves

Easing controls the acceleration and deceleration of an animation.

- **`linear`**: Constant speed throughout. Feels mechanical (use for spinners or continuous rotation).
- **`ease-in`**: Starts slow, accelerates. Best for elements exiting the screen.
- **`ease-out`**: Starts fast, decelerates. Best for UI elements entering the screen or responding to user clicks.
- **`ease-in-out`**: Starts slow, speeds up, decelerates. Great for state toggles.
- **`cubic-bezier(x1, y1, x2, y2)`**: Custom bezier curve for springy or brand-specific micro-interactions.

---

## 4. Accessibility: `prefers-reduced-motion`

Many users experience vestibular disorders or motion sickness caused by large UI movements. Browsers honor OS-level accessibility preferences via the `@media (prefers-reduced-motion: reduce)` media query.

```css
@media (prefers-reduced-motion: reduce) {
  *, ::before, ::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## 5. Performance: Layout Thrash vs. GPU Compositing

### Cheap Properties (GPU Composited)
- `transform` (`translate`, `scale`, `rotate`)
- `opacity`

*Why:* These run on the GPU compositing layer without triggering CPU layout shifts (`reflow`) or repaints (`repaint`).

### Expensive Properties (Layout Thrash / CPU Heavy)
- `width`, `height`, `margin`, `padding`, `top`, `left`
- `box-shadow`, `border-radius`, `filter`

*Why:* Changing layout dimensions forces the browser engine to recalculate the position of surrounding page elements on every single frame.

---

## 6. Testing Micro-interactions in Playwright

When testing pages with motion:
1. Playwright automatically waits for actionability (e.g. element stability), but fast transitions (`transform: translateY(-2px)`) can cause pointer offset shifts if clicked mid-animation.
2. Emulate reduced motion in Playwright tests when testing static snapshots or fast execution:

```javascript
// Emulate reduced motion in Playwright
await page.emulateMedia({ reducedMotion: 'reduce' });
```

---

## 7. Summary & Best Practices

1. Use **`transition`** for state changes (`:hover`, `:focus`).
2. Use **`@keyframes`** for complex multi-step sequences or loading skeletons.
3. Only animate **`transform`** and **`opacity`** for silky 60fps performance.
4. **Always** include `@media (prefers-reduced-motion: reduce)` in production stylesheets.
