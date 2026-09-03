# React Essentials — Part 2: State & Hooks (Interactive Edition)

> **Module:** React Essentials · **Part:** 2 of 3  
> **Interactive Preview:** Open in VS Code (Ctrl+Shift+V / Cmd+Shift+V)

---

## Interactive Quiz & Knowledge Check

### Section 1: State Management

- [ ] **Q1:** What is the correct way to add an item to an array stored in React state?
  - A) `items.push(newItem); setItems(items);`
  - B) `setItems([...items, newItem]);`
  - C) `items[0] = newItem;`
  - D) `delete items[0];`
  *(Answer: B — State must be updated immutably using new array references).*

---

### Section 2: useEffect & Fetching

- [ ] **Q2:** What does passing an empty dependency array `[]` to `useEffect` do?
  - A) The effect runs on every single render.
  - B) The effect runs only once after the component mounts.
  - C) The effect never runs.
  - D) The effect throws an error.
  *(Answer: B — An empty array `[]` causes the effect to execute only once upon mount).*

---

## Testing Controlled Forms in Playwright

- [ ] 1. Test controlled input validation by filling out fields using `page.fill('input[type="text"]', 'Buy groceries')` and verifying state submission.
- [ ] 2. Test async loading states triggered by `useEffect` using `expect(page.getByText('Loading user data...')).toBeVisible()`.
