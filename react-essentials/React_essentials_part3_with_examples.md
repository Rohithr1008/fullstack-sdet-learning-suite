# React Essentials — Part 3: Styling & Testing (Plain Edition)

> **Module:** React Essentials · **Part:** 3 of 3  
> **Topic:** CSS Modules, Tailwind Overview, Accessible Components, & E2E Test Strategy

---

## 1. CSS Modules in React

CSS Modules automatically scope class names to prevent global namespace collisions.

```jsx
// Button.module.css
.btn {
  padding: 10px 16px;
  border-radius: 8px;
  border: none;
}
.primary {
  background-color: #1d4f91;
  color: white;
}

// Button.jsx
import styles from './Button.module.css';

function Button({ children, variant = 'primary' }) {
  return (
    <button className={`${styles.btn} ${styles[variant]}`}>
      {children}
    </button>
  );
}
```

---

## 2. Utility-First CSS with Tailwind CSS

Tailwind uses inline utility classes directly inside JSX.

```jsx
function Badge({ status }) {
  return (
    <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
      {status}
    </span>
  );
}
```

---

## 3. Accessibility (a11y) in React Components

1. **Labels & Inputs**: Pair form fields with labels or `aria-label`.
2. **Keyboard Focus**: Ensure interactive custom components manage focus correctly (`tabIndex={0}`, `onKeyDown`).
3. **Semantic Landmarks**: Use `<main>`, `<nav>`, `<header>`, `<article>` tags.

---

## 4. E2E & Component Testing Strategy (Playwright)

```javascript
// Example Playwright test targeting accessible component attributes
import { test, expect } from '@playwright/test';

test('submits controlled form successfully', async ({ page }) => {
  await page.goto('http://localhost:5173');
  
  const input = page.getByRole('textbox', { name: /task title/i });
  await input.fill('Write E2E automated test');
  
  await page.getByRole('button', { name: /add task/i }).click();
  
  await expect(page.getByText('Write E2E automated test')).toBeVisible();
});
```

---

## 5. Summary & Best Practices

1. Prefer CSS Modules or Tailwind CSS for predictable component styling.
2. Build accessible components from day one—always include proper labels, roles, and focus styles.
3. Test components using accessible selectors (`getByRole`, `getByLabel`) rather than implementation details.
