# React Essentials — Part 3: Styling & Testing (Interactive Edition)

> **Module:** React Essentials · **Part:** 3 of 3  
> **Interactive Preview:** Open in VS Code (Ctrl+Shift+V / Cmd+Shift+V)

---

## Interactive Quiz & Knowledge Check

### Section 1: CSS Modules vs. Tailwind

- [ ] **Q1:** What major problem do CSS Modules solve when styling React components?
  - A) They make JavaScript run twice as fast.
  - B) They scope CSS class names locally to prevent global style leaks across components.
  - C) They eliminate the need for HTML markup.
  - D) They automatically write unit tests.
  *(Answer: B — CSS Modules provide local class name scoping).*

---

### Section 2: Component Testing with Playwright

- [ ] **Q2:** Which Playwright selector strategy is most resilient against React refactoring?
  - A) `page.locator('div > div:nth-child(3) > button')`
  - B) `page.getByRole('button', { name: 'Submit' })`
  - C) `page.locator('.css-182333-button')`
  - D) `page.locator('button[style="background: red"]')`
  *(Answer: B — Accessible role selectors remain stable regardless of styling or DOM structural updates).*

---

## Playwright Component Testing Checklist

- [ ] 1. Test keyboard navigation using `page.keyboard.press('Tab')` and `page.keyboard.press('Enter')`.
- [ ] 2. Verify dark mode theme switching using `page.emulateMedia({ colorScheme: 'dark' })`.
