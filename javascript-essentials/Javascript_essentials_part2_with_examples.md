# JavaScript Essentials - Part 2

A quick reference covering the JavaScript **intermediate** concepts: promises, async/await, error handling, classes/OOP, and modules.

> 💡 **Study guide (plain edition):** quizzes are plain Q&A, flashcards are bullets, and every answer is shown openly — no HTML/CSS. For the clickable version see the interactive edition (`Javascript_essentials_part2_interactive.md`) or the standalone app (`Javascript_essentials_part2_study_app.html`).

---

### 🗺 Your path through the 3-part series

```
Part 1  Core language  →  Part 2  Async/OOP/Modules  →  Part 3  MERN Bridge
(let, loops, functions,        (promises, async/await,          (Map/Set, generators, regex,
 objects, arrays, closures)     classes, error handling)         DOM, fetch, Node core)
```
You are here: **Part 2 — Async/OOP/Modules**. You should already know [Part 1](Javascript_essentials_part1_with_examples.md) (Core); when done move to [Part 3](Javascript_essentials_part3_with_examples.md) (MERN Bridge).

---

## Table of Contents

1. [Promises](#1-promises)
2. [async / await](#2-async--await)
3. [Error Handling](#3-error-handling)
4. [Classes & OOP](#4-classes--oop)
5. [Modules](#5-modules)
6. [Common Pitfalls](#6-common-pitfalls)
7. [Practice Exercises](#7-practice-exercises)
8. [Challenges](#8-challenges)
9. [Answer Key](#9-answer-key)

**📈 Your progress** — tick as you go:

- [ ] Sections 1–3 (async & errors)
- [ ] Sections 4–5 (OOP & modules)
- [ ] Section 6 (pitfalls)
- [ ] Exercises 1–8 attempted
- [ ] Challenges 1–5 attempted
- [ ] All answers checked

---

## 📋 Quick Reference Summary

### Promise states

- **pending** → **fulfilled** (resolved) or **rejected** (errored). Once settled, a promise never changes state again.

### Async basics

- `async function` → always returns a promise. `await` pauses inside an async function until a promise settles.
- `try / catch` around `await` handles rejections like sync errors.

### Classes basics

- `class` defines a constructor and methods. `extends` sets up inheritance; `super()` calls the parent constructor.
- `static` methods live on the class, not instances. Private fields start with `#`.

### Module imports

- ES modules: `export` / `import { x } from "./file.js"`. Default exports need no braces.

### Golden rules

1. Prefer `async/await` over raw `.then()` for readability; keep `Promise.all` for parallel work.
2. Always `catch` async errors — an unhandled rejection can crash a process.
3. Use `for...of` + `await` for sequential async loops; `Promise.all` for parallel.
4. Prefer composition (small classes/objects) over deep inheritance chains.
5. Use named exports by default; default exports for a single main thing.

---

### 🧩 Real-world scenario (what this part builds toward)

Continuing the **React shopping cart**: once the cart works locally, it must talk to a server. That is exactly where Part 2 lives:

- **Promises / async-await** → fetching the product catalog, placing orders, checking out — all async.
- **Error handling** -> so a failed order shows a friendly message instead of crashing.
- **Classes & OOP** → Express controllers, Mongoose models, and React classes/(logic) are objects with methods.
- **Modules** → splitting code into reusable files (routes, models, utilities) with `export`/`import`.

Every concept below is what makes the "async" half of **M**ongo, **E**xpress, **R**eact, **N**ode actually work. Get comfortable with promises and error handling and the rest of MERN clicks into place.
## 1. Promises

> 🚩 **Why it matters:** every async I/O — fetching data, DB queries, timers — settles as a promise; mastering it unlocks the whole stack.

### Simple: a promise lifecycle

> A **Promise** is an object representing a value that will be available now, later, or never. It starts **pending**, then becomes **fulfilled** (with a value) or **rejected** (with a reason).

**Creating a promise:**

```javascript
const fetchUser = new Promise((resolve, reject) => {
  setTimeout(() => {
    const ok = true;
    if (ok) resolve({ name: "Rohit", id: 7 });
    else reject(new Error("User not found"));
  }, 1000);
});

fetchUser
  .then((user) => console.log("Loaded:", user.name)) // "Loaded: Rohit"
  .catch((err) => console.error("Error:", err.message))
  .finally(() => console.log("Done loading")); // always runs
```

**Chaining `.then()` calls:**

```javascript
new Promise((resolve) => resolve(4))
  .then((x) => x * 2)          // 8
  .then((x) => x + 1)          // 9
  .then(console.log);          // logs 9
```

Each `.then` returns a new promise, so you can keep chaining. A single `.catch` at the end handles errors from any earlier step.

**Why callbacks are replaced by promises:** promises are *composable* — you pass them around, store them, and attach handlers anytime, instead of nesting callbacks.

### Promise combinators

`Promise` gives you four combinators to work with several promises at once.

`Promise.all` — **all must succeed**, resolves with an array of values (rejects fast on the first failure):

```javascript
const [users, posts] = await Promise.all([fetchUsers(), fetchPosts()]);
console.log(users.length, posts.length);
```

`Promise.allSettled` — never rejects; reports each result, successful or not:

```javascript
const results = await Promise.allSettled([
  fetchUsers(), fetchMissing()
]);
// [{status:"fulfilled", value:[...]}, {status:"rejected", reason:Error}]
```

`Promise.race` — resolves/rejects with the **first** one to settle (great for timeouts):

```javascript
function withTimeout(promise, ms) {
  const timer = new Promise((_, reject) =>
    setTimeout(() => reject(new Error("Timed out")), ms)
  );
  return Promise.race([promise, timer]);
}
```

`Promise.any` — resolves with the **first to succeed** (fails only if *all* reject):

```javascript
const firstOk = await Promise.any([cdnA(), cdnB(), cdnC()]);
// picks whichever CDN responds first with a value
```

> 🧠 Quick pick: need **all** → `all`. Need **every outcome** → `allSettled`. Need the **fastest** regardless → `race`. Need the **first success** → `any`.

### Worked Example: Promise.all with a catch

**Step 1 — Understand the problem:** load a user and their posts in parallel, but handle a network failure gracefully instead of crashing.

**Step 2 — Anatomy:** two independent async calls → `Promise.all` → `try/catch` around `await`.

**Step 3 — First attempt:**
```javascript
async function loadDashboard() {
  // your code here — fetch user and posts in parallel
}
```

**Step 4 — Complete solution:**
```javascript
async function loadDashboard() {
  try {
    const [user, posts] = await Promise.all([fetchUser(1), fetchPosts(1)]);
    return { user, posts };
  } catch (err) {
    console.error("Dashboard failed:", err.message);
    return null;
  }
}
```

**Step 5 — Variations:** load 5 repos in parallel and keep the fastest with `Promise.race`; or report partial success with `allSettled`.

### Quiz (Self-test)

1. **What does a promise's state start as?**
   - A) pending  → **Answer:** A) pending. It later settles to fulfilled or rejected.

2. **Which method always runs whether the promise succeeded or failed?**
   - A) `.then`  B) `.catch`  C) `.finally` → **Answer:** C) `.finally`.

3. **Which combinator resolves with the first *successful* promise (and fails only if all reject)?**
   - A) `Promise.all`  B) `Promise.race`  C) `Promise.any` → **Answer:** C) `Promise.any`.

4. **Which combinator settles only when *every* promise settles, reporting success or failure?**
   - A) `Promise.all`  B) `Promise.allSettled`  C) `Promise.any` → **Answer:** B) `Promise.allSettled`.

---

## 2. async / await

> 🚩 **Why it matters:** reads like plain synchronous code but stays non-blocking — the default style for all MERN I/O.

> **`async function`** always returns a promise. **`await`** pauses the function until the awaited promise settles, then unwraps its value. Inside `async` functions you can write async code that reads like sync code.

**Basic example:**

```javascript
function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function greet() {
  await wait(500);              // pause 500ms
  return "Hello after 500ms";
}

greet().then(console.log);      // "Hello after 500ms"
```

**`await` is not blocking the whole program** — it only pauses the current `async` function. Other code keeps running.

### try/catch with await

Because `await` unwraps rejections as thrown errors, you can catch them with plain `try/catch`:

```javascript
async function loadProfile(id) {
  try {
    const user = await fetchUser(id);   // may reject
    console.log("Profile:", user);
    return user;
  } catch (err) {
    console.error("Failed to load:", err.message);
    return null;
  }
}
```

### Sequential vs parallel

**Sequential (slow — one after another):**

```javascript
const a = await taskA();  // wait for A
const b = await taskB();  // then wait for B
```

**Parallel (fast — all at once):**

```javascript
const [a, b] = await Promise.all([taskA(), taskB()]);
```

The second version finishes in about `max(timeA, timeB)` instead of `timeA + timeB`.

### `for...of` + `await` — sequential async loop

```javascript
for (const item of items) {
  await processItem(item);  // one at a time
}
```

### `for await...of` — async iteration

For **async iterables** (like streams or async generators), `for await...of` lets you consume each awaited value as it arrives:

```javascript
async function* generateNumbers() {
  yield 1; yield 2; yield 3;
}

for await (const num of generateNumbers()) {
  console.log(num); // 1, then 2, then 3
}
```

It's how Node.js lets you read a stream line-by-line without loading it all into memory:

```javascript
for await (const line of readline.createInterface(input)) {
  console.log("Line:", line);
}
```

### Real-world example: fetching with `async/await`

```javascript
async function getGitHubUser(username) {
  const res = await fetch(`https://api.github.com/users/${username}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const user = await res.json();
  return user;
}

getGitHubUser("rohithr1008")
  .then((u) => console.log("Login:", u.login))
  .catch((err) => console.error("Failed:", err.message));
```

### Top-level await

In ES modules you can `await` at the top level (outside any function):

```javascript
// module file
const data = await fetchData();
console.log(data);
```

### Quiz (Self-test)

1. **What does an `async` function always return?**
   - A) a value  B) a promise → **Answer:** B) a promise. Even `async () => 5` returns `Promise<5>`.

2. **How do you run two independent async tasks at the same time?**
   - A) `await` them one after another  B) `Promise.all([...])` → **Answer:** B) `Promise.all`.

---

## 3. Error Handling

> 🚩 **Why it matters:** a crash in one request shouldn't kill the server — `try/catch` and central error handlers keep your API alive.

> JavaScript errors are objects. `throw` raises one; `try / catch / finally` catches and recovers. Different error types tell you what kind of thing went wrong.

### Error types

| Type | Meaning | Example trigger |
|------|---------|-----------------|
| `Error` | Generic base error | `new Error("boom")` |
| `TypeError` | Wrong type used | `null.name` |
| `RangeError` | Numeric value out of range | `new Array(-1)` |
| `ReferenceError` | Using an undeclared variable | `console.log(nope)` |
| `SyntaxError` | Invalid syntax (parse time) | `consl.log("x")` |

### try / catch / finally

```javascript
try {
  riskyOperation();           // may throw
} catch (err) {
  console.error("Caught:", err.message);
} finally {
  cleanup();                  // always runs, even on return
}
```

`finally` runs after both the `try` and `catch` blocks — perfect for releasing resources.

### throw

```javascript
function divide(a, b) {
  if (b === 0) throw new Error("Cannot divide by zero");
  return a / b;
}
```

### Custom errors

Subclass `Error` to give failures a clear type:

```javascript
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

function validateAge(age) {
  if (age < 0) throw new ValidationError("Age cannot be negative");
}

try {
  validateAge(-5);
} catch (err) {
  if (err instanceof ValidationError) {
    console.error("Validation:", err.message);
  } else {
    throw err;                 // rethrow unexpected errors
  }
}
```

### Error properties

- `.message` — human-readable description.
- `.name` — the error type name (defaults to constructor name).
- `.stack` — where the error was created (for debugging).

### Quiz (Self-test)

1. **What error type fires when you read a property of `null`?**
   - A) ReferenceError  B) TypeError → **Answer:** B) TypeError.

2. **What runs regardless of whether an error was thrown?**
   - A) `catch`  B) `finally` → **Answer:** B) `finally`.

---

## 4. Classes & OOP

> 🚩 **Why it matters:** Express controllers and Mongoose models are structured as classes/objects — this is the shape of server code.

> A **class** is a blueprint for creating objects. It bundles a `constructor` and methods. JavaScript classes are syntactic sugar over prototype-based objects.

### A basic class

```javascript
class User {
  constructor(name, age) {
    this.name = name;    // instance property
    this.age = age;
  }

  greet() {
    return `Hi, I'm ${this.name}`;
  }
}

const rohit = new User("Rohit", 25);
console.log(rohit.greet()); // "Hi, I'm Rohit"
```

### Getters and setters

```javascript
class Circle {
  constructor(radius) {
    this._radius = radius;
  }
  get area() {
    return Math.PI * this._radius ** 2;
  }
  set radius(value) {
    if (value < 0) throw new RangeError("Radius can't be negative");
    this._radius = value;
  }
}
```

### Static methods & properties

```javascript
class MathUtils {
  static sum(...nums) {      // lives on the class, not instances
    return nums.reduce((a, b) => a + b, 0);
  }
}

console.log(MathUtils.sum(1, 2, 3)); // 6
```

### Private fields (`#`)

```javascript
class BankAccount {
  #balance = 0;              // truly private — not accessible outside
  deposit(amount) {
    this.#balance += amount;
  }
  getBalance() {
    return this.#balance;
  }
}
```

### Inheritance: `extends` & `super`

```javascript
class Admin extends User {
  constructor(name, age, permissions) {
    super(name, age);        // call the parent constructor
    this.permissions = permissions;
  }
  can(perm) {
    return this.permissions.includes(perm);
  }
}
```

### `this` in classes vs arrow functions

A regular method's `this` depends on *how it's called*. Passing a method around can lose its `this`. An arrow function captures `this` from where it's defined:

```javascript
class Timer {
  constructor() { this.seconds = 0; }
  start() {
    setInterval(() => {
      this.seconds++;   // arrow keeps `this` = instance
    }, 1000);
  }
}
```

### `instanceof`

```javascript
const admin = new Admin("A", 30, ["edit"]);
console.log(admin instanceof Admin); // true
console.log(admin instanceof User);  // true (inheritance chain)
```

### Worked Example: a small class hierarchy

**Step 1 — Understand the problem:** build a `BankAccount` with private `#balance`, then a `SavingsAccount` subclass that can't go overdrawn and adds interest.

**Step 2 — Anatomy:** a `class` with private field + methods, a subclass using `super()`, and a `throw` on invalid operations.

**Step 3 — First attempt:**
```javascript
class BankAccount {
  // your code here — private #balance, deposit, getBalance
}
class SavingsAccount extends BankAccount {
  // your code here — withdraw guard + addInterest
}
```

**Step 4 — Complete solution:**
```javascript
class BankAccount {
  #balance = 0;
  deposit(amount) {
    this.#balance += amount;
  }
  getBalance() {
    return this.#balance;
  }
}
class SavingsAccount extends BankAccount {
  constructor(rate) {
    super();            // call parent constructor (no args needed)
    this.rate = rate;
  }
  withdraw(amount) {
    if (amount > this.getBalance()) throw new Error("Insufficient funds");
    this.deposit(-amount);
  }
  addInterest() {
    this.deposit(this.getBalance() * this.rate);
  }
}
```

**Step 5 — Variations:** add a `get formatted()` accessor that returns `$1,234.56`; or make the classes live in their own module and export them.

### Quiz (Self-test)

1. **What word calls the parent class constructor?**
   - A) `super()`  B) `parent()` → **Answer:** A) `super()`.

2. **How do you make an instance field truly private?**
   - A) underscore `_balance`  B) hash `#balance` → **Answer:** B) the `#` private field syntax.

---

## 5. Modules

> 🚩 **Why it matters:** real MERN projects split models, routes, and utilities into separate `export`/`import` files — modules make that possible.

> ES modules let you split code into files that explicitly `export` what they share and `import` what they need. They run in strict mode and are the modern standard.

### Named exports & imports

```javascript
// math.js
export const PI = 3.14159;
export function square(n) {
  return n * n;
}

// main.js
import { PI, square } from "./math.js";
console.log(square(4)); // 16
```

### Default export

```javascript
// logger.js
export default function log(msg) {
  console.log(msg);
}

// main.js
import log from "./logger.js";
log("hello");
```

A default export needs **no braces** on import; you can name it whatever you like.

### Import & rename

```javascript
import { square as sq } from "./math.js";
import * as math from "./math.js";   // namespace import

sq(3);          // 9
math.square(5); // 25
```

### Re-export (barrel files)

```javascript
// index.js
export { PI, square } from "./math.js";
export { default as logger } from "./logger.js";
```

### Dynamic `import()`

Import on demand inside a function; returns a promise:

```javascript
async function loadTheme() {
  const mod = await import("./theme.js");
  mod.apply();
}
```

### CommonJS vs ES modules

| | CommonJS (`require`) | ES modules (`import`) |
|---|---|---|
| Keyword | `require()` / `module.exports` | `import` / `export` |
| Loading | synchronous | asynchronous |
| Strict mode | opt-in | always |
| File | `.cjs` or older scripts | `.js`/`.mjs` |
| Top-level await | no | yes |

```javascript
// CommonJS
const fs = require("fs");
module.exports = { readFile: fs.readFileSync };

// ES module
import fs from "fs";
export { fs };
```

### Quiz (Self-test)

1. **Which syntax brings in a default export?**
   - A) `import x from "./file.js"`  B) `import { x } from "./file.js"` → **Answer:** A) default imports use no braces.

2. **Which keyword loads a module asynchronously at runtime?**
   - A) `import`  B) `import()` (dynamic) → **Answer:** B) dynamic `import()`.

---

## 6. Common Pitfalls

> 🚩 **Why it matters:** these are the real async bugs that silently cost hours — knowing them upfront skips the pain.

**1. Forgetting to `await` or to handle a rejection**

```javascript
// ❌ unhandled rejection can crash the process
fetchData();

// ✅ await and catch
try {
  await fetchData();
} catch (err) {
  console.error(err);
}
```

**2. Believing `await` pauses the whole program**

`await` only pauses its own `async` function. Other code keeps running.

**3. Chains with deep nesting instead of `Promise.all`**

```javascript
// ❌ slow, sequential
const a = await f1();
const b = await f2();

// ✅ parallel
const [a, b] = await Promise.all([f1(), f2()]);
```

**4. Losing `this` in class methods**

```javascript
// ❌ `this` may be undefined when the method is passed around
setTimeout(this.save, 1000);

// ✅ bind, or use an arrow property
setTimeout(() => this.save(), 1000);
```

**5. Modifying objects you copied by reference**

```javascript
const a = { x: 1 };
const b = a;       // ❌ same object
b.x = 2;           // a.x is now 2 too
// ✅ deep copy instead: structuredClone(a)
```

**6. Using `==` instead of `===`** — `==` coerces types and hides bugs. Always use `===` unless you really need coercion.

---

## 7. Practice Exercises

> 🚩 **Why it matters:** short, low-stakes reps move knowledge from "seen it" to "can build with it."

**Exercise 1 — Promise from a timeout** (Easy, ~2 min)

Write a function `delay(ms)` that returns a promise resolving after `ms` milliseconds.

<details><summary>Hint</summary>

Use `new Promise((resolve) => setTimeout(resolve, ms))`.

</details>

**Exercise 2 — Chain of string operations** (Easy, ~3 min)

Starting from `Promise.resolve(" Hello ")`, chain `.then()` calls that trim, uppercase, and log the string.

**Exercise 3 — async/await sum** (Medium, ~5 min)

Write an `async` function `addAfter(a, b)` that awaits `delay(100)`, then returns `a + b`. Call it and log the result.

<details><summary>Hint</summary>

`async function` + `await delay(100)` then `return a + b`. Calling it returns a promise, so `await addAfter(2,3)` or `.then(console.log)`.

</details>

**Exercise 4 — Parallel fetches** (Medium, ~5 min)

Given async `fetchA()` and `fetchB()`, run them in parallel with `Promise.all` and log both results.

**Exercise 5 — ValidationError** (Medium, ~5 min)

Create a `ValidationError` class, throw it when a string is empty, and catch it in a `try/catch`, logging only validation failures.

**Exercise 6 — A simple class** (Medium, ~5 min)

Build a `Rectangle` class with `width`, `height`, an `area()` method, and a `scale(factor)` method that multiplies both dimensions.

**Exercise 7 — Private balance** (Medium, ~6 min)

Write a `Wallet` class with a `#balance`, a `deposit(amount)`, a `withdraw(amount)` (throw if insufficient), and a `getBalance()`.

**Exercise 8 — Named exports** (Easy, ~3 min)

Create a module exporting `export const PI` and `export const double = x => x * 2` from one file and import them in another.

---

## 8. Challenges

> 🚩 **Why it matters:** these graded tasks mirror what you'll actually code daily as a MERN developer.

**Challenge 1 — Promise queue** (Hard, ~10 min)

Write a function `inSequence(tasks)` that takes an array of functions (each returning a promise) and runs them one at a time, resolving with an array of results in order.

<details><summary>Hint</summary>

Reduce over the array, `await`ing each task inside the accumulator: `tasks.reduce((p, task) => p.then(task), Promise.resolve())`. Collect results in an array as you go.

</details>

**Challenge 2 — Retry with backoff** (Hard, ~12 min)

Write `retry(fn, times)` that calls an async `fn`, and if it rejects, retries up to `times` attempts, waiting a growing delay (backoff) between tries.

<details><summary>Hint</summary>

Wrap in an async loop; on catch, if attempts remain, `await delay(attempt * 500)` and try again; otherwise rethrow.

</details>

**Challenge 3 — Bank account class hierarchy** (Hard, ~10 min)

Create a base `Account` class `(owner, balance)` with `deposit` and `withdraw`, then a `SavingsAccount` that adds an `interestRate` and an `addInterest()` method, and disallows withdrawing below `0`.

<details><summary>Hint</summary>

`class SavingsAccount extends Account` calling `super(owner, balance)`. In `withdraw`, check `balance - amount < 0` and throw.

</details>

**Challenge 4 — Promise.allSettled report** (Hard, ~10 min)

Call an array of promises using `Promise.allSettled` and produce a report object: `{ succeeded: [...], failed: [...] }` grouped by status.

<details><summary>Hint</summary>

`allSettled` returns `{status, value|reason}` per item. Filter by `result.status === "fulfilled"` vs `"rejected"`.

</details>

**Challenge 5 — Module `import()` loader** (Hard, ~12 min)

Write an `async` function that dynamically imports a module name (as a string) and calls its default-exported function, catching and logging any load error.

<details><summary>Hint</summary>

`const mod = await import(name); mod.default();` wrapped in `try/catch`. If the path is wrong, it rejects with a load error.

</details>

---

## 9. Answer Key

> 🚩 **Why it matters:** comparing your solution to the canonical one is where the real learning happens.

### Quiz answers

- **Section 1:** 1-A (pending) · 2-C (`.finally`) · 3-C (`Promise.any`) · 4-B (`Promise.allSettled`)
- **Section 2:** 1-B (promise) · 2-B (`Promise.all`)
- **Section 3:** 1-B (TypeError) · 2-B (`finally`)
- **Section 4:** 1-A (`super()`) · 2-B (`#`)
- **Section 5:** 1-A (no braces) · 2-B (dynamic `import()`)

### Exercise solutions

**Ex 1 — delay**
```javascript
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
```

**Ex 2 — String chain**
```javascript
Promise.resolve(" Hello ")
  .then((s) => s.trim())
  .then((s) => s.toUpperCase())
  .then(console.log); // "HELLO"
```

**Ex 3 — async/await sum**
```javascript
async function addAfter(a, b) {
  await delay(100);
  return a + b;
}
addAfter(2, 3).then(console.log); // 5
```

**Ex 4 — Parallel fetches**
```javascript
const [resA, resB] = await Promise.all([fetchA(), fetchB()]);
console.log(resA, resB);
```

**Ex 5 — ValidationError**
```javascript
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}
function check(s) {
  if (s === "") throw new ValidationError("Empty string");
}
try {
  check("");
} catch (err) {
  if (err instanceof ValidationError) console.error("Validation:", err.message);
}
```

**Ex 6 — Rectangle**
```javascript
class Rectangle {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }
  area() {
    return this.width * this.height;
  }
  scale(factor) {
    this.width *= factor;
    this.height *= factor;
  }
}
```

**Ex 7 — Wallet**
```javascript
class Wallet {
  #balance = 0;
  deposit(amount) {
    this.#balance += amount;
  }
  withdraw(amount) {
    if (amount > this.#balance) throw new Error("Insufficient funds");
    this.#balance -= amount;
  }
  getBalance() {
    return this.#balance;
  }
}
```

**Ex 8 — Named exports**
```javascript
// constants.js
export const PI = 3.14159;
export const double = (x) => x * 2;

// main.js
import { PI, double } from "./constants.js";
```

### Challenge solutions

**C1 — Promise queue**
```javascript
async function inSequence(tasks) {
  const results = [];
  for (const task of tasks) {
    results.push(await task());
  }
  return results;
}
```

**C2 — Retry with backoff**
```javascript
async function retry(fn, times) {
  for (let attempt = 1; attempt <= times; attempt++) {
    try {
      return await fn();
    } catch (err) {
      if (attempt === times) throw err;
      await delay(attempt * 500);   // growing backoff
    }
  }
}
```

**C3 — Account hierarchy**
```javascript
class Account {
  constructor(owner, balance) {
    this.owner = owner;
    this.balance = balance;
  }
  deposit(amount) {
    this.balance += amount;
  }
  withdraw(amount) {
    if (amount > this.balance) throw new Error("Insufficient funds");
    this.balance -= amount;
  }
}

class SavingsAccount extends Account {
  constructor(owner, balance, interestRate) {
    super(owner, balance);
    this.interestRate = interestRate;
  }
  addInterest() {
    this.balance += this.balance * this.interestRate;
  }
}
```

**C4 — allSettled report**
```javascript
async function report(promises) {
  const results = await Promise.allSettled(promises);
  return {
    succeeded: results.filter((r) => r.status === "fulfilled").map((r) => r.value),
    failed: results.filter((r) => r.status === "rejected").map((r) => r.reason),
  };
}
```

**C5 — Dynamic import loader**
```javascript
async function loadMod(name) {
  try {
    const mod = await import(name);
    mod.default();
  } catch (err) {
    console.error("Failed to load module:", err.message);
  }
}
```

---

## 🎉 Congratulations!

You've completed **JavaScript Essentials — Part 2**. You now understand promises, `async/await`, error handling, classes/OOP, and ES modules. For the interactive version with quizzes to click, flashcards, and a coding sandbox, open **`Javascript_essentials_part2_interactive.md`** or the standalone **`Javascript_essentials_part2_study_app.html`**.

<!--P2-END-->
