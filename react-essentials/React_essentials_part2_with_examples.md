# React Essentials — Part 2: State & Hooks (Plain Edition)

> **Module:** React Essentials · **Part:** 2 of 3  
> **Topic:** `useState`, Controlled Form Inputs, `useEffect` (Fetching & Cleanup), & Lifting State

---

## 1. Component State with `useState`

State allows components to retain and update dynamic data between renders.

```jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="counter-box">
      <p>Current Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

---

## 2. Controlled Inputs

In React, form fields (like `<input>`, `<textarea>`, `<select>`) are controlled by tying their `value` to state and handling changes via `onChange`.

```jsx
function TaskForm({ onAddTask }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAddTask(text);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter task title"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit">Add Task</button>
    </form>
  );
}
```

---

## 3. Data Fetching & Side Effects with `useEffect`

`useEffect` manages side effects such as HTTP requests, DOM event subscriptions, or timer setups.

```jsx
import { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetch(`/api/users/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        if (isMounted) {
          setUser(data);
          setLoading(false);
        }
      });

    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, [userId]); // Re-run effect when userId changes

  if (loading) return <div>Loading user data...</div>;
  return <div>User: {user.name}</div>;
}
```

---

## 4. Lifting State Up

When sibling components need to share state, lift the state up to their closest common parent component and pass down handlers via props.

---

## 5. Summary & Best Practices

1. Keep state minimal—derive values during render whenever possible.
2. Always clean up subscriptions or pending async operations in `useEffect` cleanup return functions.
3. Treat state updates as immutable (e.g. use `[...items, newItem]` instead of `items.push()`).
