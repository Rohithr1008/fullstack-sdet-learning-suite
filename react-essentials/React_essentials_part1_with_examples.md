# React Essentials — Part 1: Components & JSX (Plain Edition)

> **Module:** React Essentials · **Part:** 1 of 3  
> **Topic:** JSX Rules, Fragments, Conditional Rendering, Props, Composition, & Lists/Keys

---

## 1. Why React for Develop + Test Engineers?

React is the dominant component-driven UI library in modern web development. Understanding React enables developers and test automation engineers to:
- Read component source code and understand component state trees.
- Select reliable test locators (`data-testid`, accessible roles, component props).
- Inspect conditional rendering logic to construct boundary test cases.

---

## 2. JSX Syntax Rules & Fragments

JSX is a syntax extension for JavaScript that allows writing HTML-like markup inside JavaScript code.

### Core Rules:
1. **Return a single root element**: Wrap adjacent elements in a fragment (`<>...</>`) or parent `<div>`.
2. **Close all tags**: Self-close void tags (e.g. `<img />`, `<input />`).
3. **CamelCase attributes**: Use `className` instead of `class`, and `htmlFor` instead of `for`.
4. **JS Expressions in `{}`**: Embed variables, string interpolation, or logic inside curly braces `{}`.

```jsx
// Example Component
function UserHeader({ name, isOnline }) {
  return (
    <header className="user-header">
      <h1>Welcome back, {name}!</h1>
      {isOnline ? <span className="status-online">Online</span> : <span className="status-offline">Offline</span>}
    </header>
  );
}
```

---

## 3. Props, Children, and Composition

Props (short for *properties*) are read-only arguments passed from parent components down to child components.

```jsx
function Card({ title, children }) {
  return (
    <div className="card">
      <h2 className="card-title">{title}</h2>
      <div className="card-body">{children}</div>
    </div>
  );
}

// Composition Usage
function App() {
  return (
    <Card title="Task Summary">
      <p>All automated E2E tests passed successfully.</p>
    </Card>
  );
}
```

---

## 4. Rendering Lists & Key Props

When rendering lists of elements with `.map()`, React requires a unique `key` prop on each item to track list mutations efficiently during reconciliation.

```jsx
function TaskList({ tasks }) {
  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li key={task.id} className={task.completed ? 'done' : ''}>
          {task.title}
        </li>
      ))}
    </ul>
  );
}
```

> **Warning:** Avoid using array index (`key={index}`) if the list order can change, as it leads to component state bugs.

---

## 5. Summary & Best Practices

1. Keep components small, modular, and single-purpose.
2. Treat props as immutable inputs—never mutate props directly.
3. Always supply stable, unique IDs as `key` props when rendering dynamic arrays.
