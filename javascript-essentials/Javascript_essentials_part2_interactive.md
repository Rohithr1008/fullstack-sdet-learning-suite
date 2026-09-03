# JavaScript Essentials - Part 2

A quick reference covering the JavaScript **intermediate** concepts: promises, async/await, error handling, classes/OOP, and modules.

<div class="interactive-note">💡 <strong>Interactive guide — enhanced edition:</strong> clickable quizzes, flashcards, mood checks, predict-the-output cards, Spot-the-Bug quiz, a live Promise Simulator, a working code sandbox, and collapsible hints/solutions. Best in <strong>VS Code preview</strong> (<code>Ctrl+Shift+V</code>) or a browser; the standalone <strong>.html edition</strong> adds a live progress bar, spaced-repetition flashcards, quiz persistence and an auto-graded challenge runner.</div>

<div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;background:#2d3748;color:#e2e8f0;padding:8px 12px;border-radius:8px;margin:10px 0;font-size:0.95rem;">
  <a href="index.html" style="color:#7dd3fc;font-weight:600;text-decoration:none;">Hub</a>
  <a href="Javascript_essentials_part1_interactive.md" style="color:#7dd3fc;font-weight:600;text-decoration:none;">1 Core</a>
  <strong style="color:#fff;">2 Async/OOP</strong>
  <a href="Javascript_essentials_part3_interactive.md" style="color:#7dd3fc;font-weight:600;text-decoration:none;">3 MERN Bridge</a>
  <a href="Javascript_essentials_part4_interactive.md" style="color:#7dd3fc;font-weight:600;text-decoration:none;">4 MERN Foundations</a>
  <a href="Javascript_essentials_part5_interactive.md" style="color:#7dd3fc;font-weight:600;text-decoration:none;">5 Production →</a>
</div>

<style>
/* ===== JavaScript Essentials Part 2 — Interactive Styles ===== */
h2 { border-bottom: 3px solid #4299e1; padding-bottom: 6px; }
h2[id] { scroll-margin-top: 12px; }
.interactive-note { background: #eef6ff; border-left: 4px solid #2b6cb0; padding: 10px 14px; border-radius: 6px; }
.tip    { background: #f0fff4; border-left: 4px solid #38a169; padding: 10px 14px; border-radius: 6px; }
.why    { background:#eef2ff; border-left:4px solid #5a67d8; padding:6px 12px; border-radius:6px; margin:6px 0 10px 0; font-size:0.92rem; }
.warn   { background: #fffaf0; border-left: 4px solid #dd6b20; padding: 10px 14px; border-radius: 6px; }
.chall  { background: #f5f3ff; border-left: 4px solid #6b46c1; padding: 10px 14px; border-radius: 6px; }
.quiz-box { background: #f7f9fc; border: 2px solid #4299e1; border-radius: 10px; padding: 14px 18px; margin: 18px 0; }
.quiz-box h3 { margin-top: 0; color: #2b6cb0; }
.quiz-box details { background: #ffffff; border: 1px solid #cbd5e0; border-radius: 8px; padding: 8px 12px; margin: 8px 0; }
.quiz-box summary { cursor: pointer; font-weight: 600; }
.quiz-correct { color: #276749; font-weight: 700; }
.quiz-wrong { color: #9b2c2c; }
.answer { background: #edf2f7; border: 1px dashed #718096; border-radius: 6px; padding: 6px 10px; margin-top: 4px; }
.spotbug { display: grid; gap: 10px; margin: 14px 0; }
.spotbug details { background: #fff; border: 1px solid #cbd5e0; border-radius: 8px; padding: 10px 14px; }
.spotbug summary { cursor: pointer; font-weight: 600; }
.flashcard { background: #fffbeb; border: 2px solid #d69e2e; border-radius: 10px; padding: 10px 14px; margin: 10px 0; }
.flashcard summary { cursor: pointer; font-weight: 700; color: #744210; }
.flashcard .back { margin-top: 8px; }
.badge { display: inline-block; font-size: 12px; padding: 2px 9px; border-radius: 999px; margin-left: 6px; vertical-align: middle; font-weight: 700; }
.b-green  { background: #c6f6d5; color: #22543d; }
.b-yellow { background: #fefcbf; color: #744210; }
.b-red    { background: #fed7d7; color: #742a2a; }
.b-time   { background: #e2e8f0; color: #2d3748; font-weight: 600; }
.predict { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 10px; margin: 14px 0; }
.predict details { background: #fff; border: 1px solid #cbd5e0; border-radius: 8px; padding: 8px 12px; }
.predict summary { cursor: pointer; font-weight: 600; }
.hint { background: #fffbeb; border: 1px dashed #d69e2e; border-radius: 8px; padding: 8px 12px; margin: 10px 0; }
.hint summary { cursor: pointer; font-weight: 700; color: #744210; }
.mood { margin-top: 12px; display: flex; flex-wrap: wrap; gap: 6px; align-items: center; }
.mood > span { font-weight: 700; margin-right: 4px; }
.mood input { display: none; }
.mood label { cursor: pointer; border: 1px solid #a0aec0; border-radius: 999px; padding: 4px 12px; background: #fff; font-size: 14px; user-select: none; }
.mood input:checked + label { background: #38a169; border-color: #38a169; color: #fff; font-weight: 700; }
.quiz-box details[open] > :not(summary), .flashcard details[open] > :not(summary) { animation: pop .25s ease; }
@keyframes pop { from { opacity: 0; transform: translateY(-3px); } to { opacity: 1; transform: none; } }
.totop { text-align: right; margin: 6px 0; }
.totop a { font-size: 13px; color: #2b6cb0; text-decoration: none; }
.footer { text-align: center; padding: 18px; margin-top: 30px; background: #2b6cb0; color: #fff; border-radius: 10px; }
pre { background: #1a202c; color: #e2e8f0; padding: 12px 14px; border-radius: 8px; overflow-x: auto; }
pre code { background: transparent; color: inherit; font-family: "Cascadia Code", Consolas, monospace; }
.sandbox { background: #0f172a; border: 1px solid #334155; border-radius: 10px; padding: 14px; color: #e2e8f0; }
.sandbox textarea { width: 100%; box-sizing: border-box; background: #0b1220; color: #a5f3fc; border: 1px solid #334155; border-radius: 6px; font-family: "Cascadia Code", Consolas, monospace; padding: 10px; }
.sandbox .out { background: #020617; color: #86efac; border-radius: 6px; padding: 10px; margin-top: 8px; min-height: 40px; white-space: pre-wrap; font-family: "Cascadia Code", monospace; }
.sandbox button { background: #2563eb; color: #fff; border: none; padding: 6px 14px; border-radius: 6px; cursor: pointer; margin: 6px 6px 0 0; }
.sandbox .err { color: #fca5a5; }
@media (prefers-color-scheme: dark) {
  body { background: #0d1117; color: #e6edf3; }
  h2 { border-bottom-color: #63b3ed; }
  .interactive-note { background: #17202b; }
  .tip { background: #132a1c; }
  .warn { background: #2b2013; }
  .chall { background: #221b3a; }
  .quiz-box { background: #141c28; border-color: #2b6cb0; color: #e2e8f0; }
  .quiz-box h3 { color: #90cdf4; }
  .quiz-box details { background: #0f1622; border-color: #2d3748; }
  .flashcard { background: #241d0e; border-color: #975a16; }
  .answer { background: #1a202c; border-color: #4a5568; color: #e2e8f0; }
  .quiz-wrong { color: #fc8181; }
  .spotbug details { background: #0f1622; border-color: #2d3748; color: #e2e8f0; }
  .predict details { background: #0f1622; border-color: #2d3748; color: #e2e8f0; }
  .mind { color: #e2e8f0; }
}
</style>

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

<div class="mood"><span>How's your mood today?</span>
<input type="radio" name="mood0" id="m0a"><label for="m0a">😴 Sleepy</label>
<input type="radio" name="mood0" id="m0b"><label for="m0b">😊 Ready</label>
<input type="radio" name="mood0" id="m0c"><label for="m0c">🔥 Pumped</label></div>

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

## 1. Promises

<div class="why">🚩 **Why it matters:** every async I/O — fetching data, DB queries, timers — settles as a promise; mastering it unlocks the whole stack.</div>

<div class="tip">💡 A <strong>Promise</strong> is an object representing a value that will be available now, later, or never. It starts <strong>pending</strong>, then becomes <strong>fulfilled</strong> (with a value) or <strong>rejected</strong> (with a reason).</div>

### 🧪 Live Promise Simulator

Click a button to watch a promise move through its states:

<div class="sandbox" id="promise-box">
  <div><strong>Promise State:</strong> <span id="ps-state">pending</span></div>
  <button onclick="psRun(true)">✅ Resolve</button>
  <button onclick="psRun(false)">❌ Reject</button>
  <button onclick="psReset()">↺ Reset</button>
  <div class="out" id="ps-out">Promise created — click a button.</div>
</div>

<script>
function psRun(ok) {
  var state = document.getElementById("ps-state");
  var out = document.getElementById("ps-out");
  state.textContent = "pending → " + (ok ? "fulfilled" : "rejected");
  out.textContent = ok ? "✅ .then ran → value: 42" : "❌ .catch ran → reason: Error('boom')";
}
function psReset() {
  document.getElementById("ps-state").textContent = "pending";
  document.getElementById("ps-out").textContent = "Promise created — click a button.";
}
</script>

### Simple: a promise lifecycle

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

### Promise combinators

`Promise` gives you four ways to work with several promises at once.

<details class="hint"><summary>⚡ `Promise.all` — all must succeed (array of values)</summary>
```javascript
const [users, posts] = await Promise.all([fetchUsers(), fetchPosts()]);
console.log(users.length, posts.length);
```
Rejects fast on the first failure.
</details>

<details class="hint"><summary>⚡ `Promise.allSettled` — reports every outcome</summary>
```javascript
const results = await Promise.allSettled([fetchUsers(), fetchMissing()]);
// [{status:"fulfilled", value:[...]}, {status:"rejected", reason:Error}]
```
Never rejects; great for partial-success reporting.
</details>

<details class="hint"><summary>⚡ `Promise.race` — first to settle wins (timeouts)</summary>
```javascript
function withTimeout(promise, ms) {
  const timer = new Promise((_, reject) =>
    setTimeout(() => reject(new Error("Timed out")), ms)
  );
  return Promise.race([promise, timer]);
}
```
</details>

<details class="hint"><summary>⚡ `Promise.any` — first to succeed wins (CDNs)</summary>
```javascript
const firstOk = await Promise.any([cdnA(), cdnB(), cdnC()]);
```
Fails only if *all* reject.
</details>

> 🧠 Quick pick: **all** → `all` · **every outcome** → `allSettled` · **fastest** → `race` · **first success** → `any`.

<div class="mood"><span>Promise states click?</span>
<input type="radio" name="m1" id="p1a"><label for="p1a">👍 Got it</label>
<input type="radio" name="m1" id="p1b"><label for="p1b">🔄 Review</label></div>

### Quiz (click each to reveal the answer)

<div class="quiz-box">
<h3>🎯 Promises quiz</h3>

<details><summary>Q1. What does a promise's state start as?</summary>
<div class="answer"><span class="quiz-correct">A) pending</span> — It later settles to fulfilled or rejected.</div></details>

<details><summary>Q2. Which method always runs whether the promise succeeded or failed?</summary>
<div class="answer"><span class="quiz-correct">C) .finally</span> — It runs after both `.then` and `.catch`.</div></details>

<details><summary>Q3. What does each `.then()` return?</summary>
<div class="answer"><span class="quiz-correct">A new promise</span> — that's why you can keep chaining.</div></details>

<details><summary>Q4. Which combinator resolves with the first *successful* promise?</summary>
<div class="answer"><span class="quiz-correct">C) Promise.any</span> — fails only if all reject.</div></details>

<details><summary>Q5. Which combinator settles only when every promise settles?</summary>
<div class="answer"><span class="quiz-correct">B) Promise.allSettled</span> — reports success or failure per item.</div></details>
</div>


---

## 2. async / await

<div class="why">🚩 **Why it matters:** reads like plain synchronous code but stays non-blocking — the default style for all MERN I/O.</div>

<div class="tip">💡 <strong>`async function`</strong> always returns a promise. <strong>`await`</strong> pauses the function until the awaited promise settles, then unwraps its value. Inside `async` functions you can write async code that reads like sync code.</div>

### 🧪 Live Code Sandbox

Type code and click **Run** (or press Ctrl+Enter). Try: `const x = [1,2,3]; x.push(4); x` then Run — you'll see `[ 1, 2, 3, 4 ]`.

<div class="sandbox" id="p2-sandbox">
  <textarea id="p2-code" rows="4" style="width:100%">const greet = async () => "Hello from async!";
await greet();</textarea>
  <br>
  <button onclick="p2Run()">▶️ Run Code</button>
  <button onclick="document.getElementById('p2-code').value=''">🗑 Clear</button>
  <div class="out" id="p2-out">Output will appear here…</div>
</div>

<script>
function p2Run() {
  var code = document.getElementById("p2-code").value;
  var out = document.getElementById("p2-out");
  out.className = "out";
  var logs = [];
  var orig = console.log;
  console.log = function () {
    logs.push(Array.prototype.slice.call(arguments).join(" "));
  };
  var run = new Function("console", "(async()=>{ " + code + " })()");
  Promise.resolve(run(console)).then(function () {
    console.log = orig;
    out.textContent = logs.join("\n") || "(no output)";
  }).catch(function (e) {
    console.log = orig;
    out.className = "out err";
    out.textContent = "Error: " + e.message;
  });
}
document.addEventListener("keydown", function (e) {
  if (e.ctrlKey && e.key === "Enter") p2Run();
});
</script>

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

### `for await...of` — async iteration

For **async iterables** (streams, async generators), `for await...of` consumes each awaited value as it arrives:

```javascript
async function* generateNumbers() {
  yield 1; yield 2; yield 3;
}
for await (const num of generateNumbers()) {
  console.log(num); // 1, then 2, then 3
}
```

This is how Node.js reads a stream line-by-line without loading it all into memory:

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
  return await res.json();
}
getGitHubUser("rohithr1008")
  .then((u) => console.log("Login:", u.login))
  .catch((err) => console.error("Failed:", err.message));
```

### Predict the output

<div class="predict">
<details><summary>What does `await` only pause?</summary>
<div class="answer">The <span class="quiz-correct">current `async` function</span> — not the whole program.</div></details>
<details><summary>What does `async () => 5` return?</summary>
<div class="answer">A <span class="quiz-correct">promise resolving to 5</span>, never the bare number.</div></details>
<details><summary>How should you await an array of independent promises?</summary>
<div class="answer"><span class="quiz-correct">Promise.all([...])</span> for parallel speed.</div></details>
</div>

### Quiz (click each to reveal the answer)

<div class="quiz-box">
<h3>🎯 async / await quiz</h3>

<details><summary>Q1. What does an `async` function always return?</summary>
<div class="answer"><span class="quiz-correct">B) a promise</span> — Even `async () => 5` returns `Promise<5>`.</div></details>

<details><summary>Q2. How do you run two independent async tasks at the same time?</summary>
<div class="answer"><span class="quiz-correct">B) Promise.all([...])</span> — sequential `await` is slower.</div></details>
</div>

---

## 3. Error Handling

<div class="why">🚩 **Why it matters:** a crash in one request shouldn't kill the server — `try/catch` and central error handlers keep your API alive.</div>

<div class="warn">⚠️ JavaScript errors are objects. `throw` raises one; `try / catch / finally` catches and recovers. Different error types tell you what kind of thing went wrong.</div>

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

<div class="hint"><details><summary>🔎 Why does `null.name` give a TypeError and not a ReferenceError?</summary>
`null` <em>exists</em> (so no ReferenceError), it just can't have a property — reading a property of `null`/`undefined` throws <strong>TypeError</strong>.</details></div>

### Quiz (click each to reveal the answer)

<div class="quiz-box">
<h3>🎯 Error Handling quiz</h3>

<details><summary>Q1. What error type fires when you read a property of `null`?</summary>
<div class="answer"><span class="quiz-correct">B) TypeError</span> — `null.name` throws TypeError.</div></details>

<details><summary>Q2. What runs regardless of whether an error was thrown?</summary>
<div class="answer"><span class="quiz-correct">B) finally</span> — after both try and catch.</div></details>
</div>

---

## 4. Classes & OOP

<div class="why">🚩 **Why it matters:** Express controllers and Mongoose models are structured as classes/objects — this is the shape of server code.</div>

<div class="tip">💡 A <strong>class</strong> is a blueprint for creating objects. It bundles a `constructor` and methods. JavaScript classes are syntactic sugar over prototype-based objects.</div>

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

### Flashcards (click to flip)

<div class="flashcard"><details><summary>What does `super()` do?</summary>
<div class="back">Calls the <strong>parent class constructor</strong>. Required before using `this` in a subclass constructor.</div></details></div>

<div class="flashcard"><details><summary>How is a static method accessed?</summary>
<div class="back">On the <strong>class itself</strong>, not an instance: `MathUtils.sum(1,2,3)`.</div></details></div>

<div class="flashcard"><details><summary>What makes a private field private?</summary>
<div class="back">The <strong>`#` prefix</strong> — `#balance` is truly private, unlike a convention like `_balance`.</div></details></div>

### Worked Example: a small class hierarchy

**Step 1 — Understand the problem:** build a `BankAccount` with private `#balance`, then a `SavingsAccount` subclass that can't go overdrawn and adds interest.

**Step 2 — Anatomy:** a `class` with a private field, a subclass using `super()`, and a `throw` on invalid operations.

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
<details class="solution"><summary>Show solution</summary>
```javascript
class BankAccount {
  #balance = 0;
  deposit(amount) { this.#balance += amount; }
  getBalance() { return this.#balance; }
}
class SavingsAccount extends BankAccount {
  constructor(rate) {
    super();
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
</details>

**Step 5 — Variations:** add a `get formatted()` accessor that returns `$1,234.56`, or export the classes as a module.

### Predict the output

<div class="predict">
<details><summary>`new Admin(...) instanceof User`?</summary>
<div class="answer"><span class="quiz-correct">true</span> — instanceof walks the whole inheritance chain.</div></details>
<details><summary>In a setInterval arrow, what is `this`?</summary>
<div class="answer">The <span class="quiz-correct">class instance</span> — arrows capture the enclosing `this`.</div></details>
<details><summary>`circle.area` after radius 2?</summary>
<div class="answer"><span class="quiz-correct">≈ 12.57</span> — π × 2².</div></details>
</div>

### Quiz (click each to reveal the answer)

<div class="quiz-box">
<h3>🎯 Classes & OOP quiz</h3>

<details><summary>Q1. What word calls the parent class constructor?</summary>
<div class="answer"><span class="quiz-correct">A) super()</span> — `parent()` is not a JS keyword.</div></details>

<details><summary>Q2. How do you make an instance field truly private?</summary>
<div class="answer"><span class="quiz-correct">B) hash #balance</span> — the `#` private field syntax.</div></details>
</div>

---

## 5. Modules

<div class="why">🚩 **Why it matters:** real MERN projects split models, routes, and utilities into separate `export`/`import` files — modules make that possible.</div>

<div class="chall">📦 ES modules let you split code into files that explicitly `export` what they share and `import` what they need. They run in strict mode and are the modern standard.</div>

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

### Flashcards (click to flip)

<div class="flashcard"><details><summary>How do you import a default export?</summary>
<div class="back"><strong>No braces</strong>: `import x from "./file.js"`.</div></details></div>

<div class="flashcard"><details><summary>When would you use dynamic `import()`?</summary>
<div class="back">To <strong>load a module on demand</strong> at runtime; it returns a promise.</div></details></div>

### Quiz (click each to reveal the answer)

<div class="quiz-box">
<h3>🎯 Modules quiz</h3>

<details><summary>Q1. Which syntax brings in a default export?</summary>
<div class="answer"><span class="quiz-correct">A) import x from "./file.js"</span> — default imports use no braces.</div></details>

<details><summary>Q2. Which keyword loads a module asynchronously at runtime?</summary>
<div class="answer"><span class="quiz-correct">B) import() (dynamic)</span> — the dynamic import form.</div></details>
</div>

---

## 6. Common Pitfalls

<div class="why">🚩 **Why it matters:** these are the real async bugs that silently cost hours — knowing them upfront skips the pain.</div>

<div class="danger"><strong>1. Forgetting to `await` or to handle a rejection</strong></div>

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

<div class="danger"><strong>2. Believing `await` pauses the whole program</strong></div>

`await` only pauses its own `async` function. Other code keeps running.

<div class="danger"><strong>3. Chains with deep nesting instead of `Promise.all`</strong></div>

```javascript
// ❌ slow, sequential
const a = await f1();
const b = await f2();

// ✅ parallel
const [a, b] = await Promise.all([f1(), f2()]);
```

<div class="danger"><strong>4. Losing `this` in class methods</strong></div>

```javascript
// ❌ `this` may be undefined when the method is passed around
setTimeout(this.save, 1000);

// ✅ bind, or use an arrow property
setTimeout(() => this.save(), 1000);
```

<div class="danger"><strong>5. Modifying objects you copied by reference</strong></div>

```javascript
const a = { x: 1 };
const b = a;       // ❌ same object
b.x = 2;           // a.x is now 2 too
// ✅ deep copy instead: structuredClone(a)
```

<div class="danger"><strong>6. Using `==` instead of `===`</strong> — `==` coerces types and hides bugs. Always use `===` unless you really need coercion.</div>

---

## 7. Practice Exercises

<div class="why">🚩 **Why it matters:** short, low-stakes reps move knowledge from "seen it" to "can build with it."</div>

**Exercise 1 — Promise from a timeout** <span class="badge b-green">Easy</span><span class="badge b-time">~2 min</span>

Write a function `delay(ms)` that returns a promise resolving after `ms` milliseconds.

<details class="hint"><summary>💡 Hint</summary>
Use `new Promise((resolve) => setTimeout(resolve, ms))`.
</details>

**Exercise 2 — Chain of string operations** <span class="badge b-green">Easy</span><span class="badge b-time">~3 min</span>

Starting from `Promise.resolve(" Hello ")`, chain `.then()` calls that trim, uppercase, and log the string.

<details class="solution"><summary>💡 Hint</summary>
`.then(s => s.trim())`, `.then(s => s.toUpperCase())`, `.then(console.log)`.
</details>

**Exercise 3 — async/await sum** <span class="badge b-yellow">Medium</span><span class="badge b-time">~5 min</span>

Write an `async` function `addAfter(a, b)` that awaits `delay(100)`, then returns `a + b`. Call it and log the result.

<details class="hint"><summary>💡 Hint</summary>
`async function` + `await delay(100)` then `return a + b`. Calling it returns a promise, so `await addAfter(2,3)` or `.then(console.log)`.
</details>

**Exercise 4 — Parallel fetches** <span class="badge b-yellow">Medium</span><span class="badge b-time">~5 min</span>

Given async `fetchA()` and `fetchB()`, run them in parallel with `Promise.all` and log both results.

**Exercise 5 — ValidationError** <span class="badge b-yellow">Medium</span><span class="badge b-time">~5 min</span>

Create a `ValidationError` class, throw it when a string is empty, and catch it in a `try/catch`, logging only validation failures.

**Exercise 6 — A simple class** <span class="badge b-yellow">Medium</span><span class="badge b-time">~5 min</span>

Build a `Rectangle` class with `width`, `height`, an `area()` method, and a `scale(factor)` method that multiplies both dimensions.

**Exercise 7 — Private balance** <span class="badge b-yellow">Medium</span><span class="badge b-time">~6 min</span>

Write a `Wallet` class with a `#balance`, a `deposit(amount)`, a `withdraw(amount)` (throw if insufficient), and a `getBalance()`.

**Exercise 8 — Named exports** <span class="badge b-green">Easy</span><span class="badge b-time">~3 min</span>

Create a module exporting `export const PI` and `export const double = x => x * 2` from one file and import them in another.

---

## 8. Challenges

<div class="why">🚩 **Why it matters:** these graded tasks mirror what you'll actually code daily as a MERN developer.</div>

**Challenge 1 — Promise queue** <span class="badge b-red">Hard</span><span class="badge b-time">~10 min</span>

Write a function `inSequence(tasks)` that takes an array of functions (each returning a promise) and runs them one at a time, resolving with an array of results in order.

<details class="hint"><summary>💡 Hint</summary>
Reduce over the array, `await`ing each task: `tasks.reduce((p, task) => p.then(task), Promise.resolve())`. Or simply `for...of` + `await`.
</details>

**Challenge 2 — Retry with backoff** <span class="badge b-red">Hard</span><span class="badge b-time">~12 min</span>

Write `retry(fn, times)` that calls an async `fn`, and if it rejects, retries up to `times` attempts, waiting a growing delay (backoff) between tries.

<details class="hint"><summary>💡 Hint</summary>
Wrap in an async loop; on catch, if attempts remain, `await delay(attempt * 500)` and try again; otherwise rethrow.
</details>

**Challenge 3 — Bank account class hierarchy** <span class="badge b-red">Hard</span><span class="badge b-time">~10 min</span>

Create a base `Account` class `(owner, balance)` with `deposit` and `withdraw`, then a `SavingsAccount` that adds an `interestRate` and an `addInterest()` method, and disallows withdrawing below `0`.

<details class="hint"><summary>💡 Hint</summary>
`class SavingsAccount extends Account` calling `super(owner, balance)`.
</details>

**Challenge 4 — Promise.allSettled report** <span class="badge b-red">Hard</span><span class="badge b-time">~10 min</span>

Call an array of promises using `Promise.allSettled` and produce a report object: `{ succeeded: [...], failed: [...] }` grouped by status.

<details class="hint"><summary>💡 Hint</summary>
Filter results by `status === "fulfilled"` vs `"rejected"`.
</details>

**Challenge 5 — Module `import()` loader** <span class="badge b-red">Hard</span><span class="badge b-time">~12 min</span>

Write an `async` function that dynamically imports a module name (as a string) and calls its default-exported function, catching and logging any load error.

<details class="hint"><summary>💡 Hint</summary>
`const mod = await import(name); mod.default();` wrapped in `try/catch`.
</details>

---

## 9. Answer Key

<div class="why">🚩 **Why it matters:** comparing your solution to the canonical one is where the real learning happens.</div>

<div class="answer-key">

<details><summary>✅ Quiz answers</summary>
<div class="answer">- Section 1: 1-A · 2-C · 3-A<br>- Section 2: 1-B · 2-B<br>- Section 3: 1-B · 2-B<br>- Section 4: 1-A · 2-B<br>- Section 5: 1-A · 2-B</div>
</details>

<details><summary>🔧 Ex 1 — delay</summary>
```javascript
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
```
</details>

<details><summary>🔧 Ex 2 — String chain</summary>
```javascript
Promise.resolve(" Hello ")
  .then((s) => s.trim())
  .then((s) => s.toUpperCase())
  .then(console.log); // "HELLO"
```
</details>

<details><summary>🔧 Ex 3 — async/await sum</summary>
```javascript
async function addAfter(a, b) {
  await delay(100);
  return a + b;
}
addAfter(2, 3).then(console.log); // 5
```
</details>

<details><summary>🔧 Ex 4 — Parallel fetches</summary>
```javascript
const [resA, resB] = await Promise.all([fetchA(), fetchB()]);
console.log(resA, resB);
```
</details>

<details><summary>🔧 Ex 5 — ValidationError</summary>
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
try { check(""); }
catch (err) {
  if (err instanceof ValidationError) console.error("Validation:", err.message);
}
```
</details>

<details><summary>🔧 Ex 6 — Rectangle</summary>
```javascript
class Rectangle {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }
  area() { return this.width * this.height; }
  scale(factor) {
    this.width *= factor;
    this.height *= factor;
  }
}
```
</details>

<details><summary>🔧 Ex 7 — Wallet</summary>
```javascript
class Wallet {
  #balance = 0;
  deposit(amount) { this.#balance += amount; }
  withdraw(amount) {
    if (amount > this.#balance) throw new Error("Insufficient funds");
    this.#balance -= amount;
  }
  getBalance() { return this.#balance; }
}
```
</details>

<details><summary>🔧 Ex 8 — Named exports</summary>
```javascript
// constants.js
export const PI = 3.14159;
export const double = (x) => x * 2;
// main.js
import { PI, double } from "./constants.js";
```
</details>

<details><summary>🏆 C1 — Promise queue</summary>
```javascript
async function inSequence(tasks) {
  const results = [];
  for (const task of tasks) {
    results.push(await task());
  }
  return results;
}
```
</details>

<details><summary>🏆 C2 — Retry with backoff</summary>
```javascript
async function retry(fn, times) {
  for (let attempt = 1; attempt <= times; attempt++) {
    try {
      return await fn();
    } catch (err) {
      if (attempt === times) throw err;
      await delay(attempt * 500);
    }
  }
}
```
</details>

<details><summary>🏆 C3 — Account hierarchy</summary>
```javascript
class Account {
  constructor(owner, balance) {
    this.owner = owner;
    this.balance = balance;
  }
  deposit(amount) { this.balance += amount; }
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
  addInterest() { this.balance += this.balance * this.interestRate; }
}
```
</details>

<details><summary>🏆 C4 — allSettled report</summary>
```javascript
async function report(promises) {
  const results = await Promise.allSettled(promises);
  return {
    succeeded: results.filter((r) => r.status === "fulfilled").map((r) => r.value),
    failed: results.filter((r) => r.status === "rejected").map((r) => r.reason),
  };
}
```
</details>

<details><summary>🏆 C5 — Dynamic import loader</summary>
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
</details>

</div>

---

## 🐞 Spot-the-Bug — final boss quiz

<div class="why">🚩 <strong>Why it matters:</strong> the #1 skill in async code is spotting <em>which promise never resolves</em>. Try each, then reveal.</div>

<div class="spotbug">
<details><summary>Q1. What's the bug?  <code>fetch(url).then(r =&gt; r.json());</code></summary>
<p class="quiz-correct">✅ The result isn't returned/consumed — you must return it or attach another <code>.then()</code>. The chain ends with a dangling promise.</p>
<p class="quiz-wrong">❌ Thinking <code>.then</code> alone "runs the request" for you — without consuming the promise, the JSON is never used.</p>
</details>
<details><summary>Q2. What's the bug?  <code>for (const x of arr) { await work(x); }</code> in a <em>non-async</em> function</summary>
<p class="quiz-correct">✅ <code>await</code> is only valid inside an <code>async</code> function — this throws a SyntaxError. Wrap it in <code>async function(){...}</code>.</p>
<p class="quiz-wrong">❌ Thinking <code>await</code> works anywhere a promise appears — it needs an <code>async</code> function (or top-level await in modules).</p>
</details>
<details><summary>Q3. What's the bug?  <code>Promise.all(fetch(a), fetch(b))</code></summary>
<p class="quiz-correct">✅ <code>Promise.all</code> takes an <strong>array</strong>: <code>Promise.all([fetch(a), fetch(b)])</code>.</p>
<p class="quiz-wrong">❌ Passing two arguments like <code>Promise.all(a, b)</code> — only the first argument is used; it must be iterable.</p>
</details>
<details><summary>Q4. What's the bug?  <code>new Promise((resolve) =&gt; { work(); });</code></summary>
<p class="quiz-correct">✅ The promise never calls <code>resolve()</code>/<code>reject()</code> — it stays pending forever. It must resolve/reject once the work finishes.</p>
<p class="quiz-wrong">❌ Assuming <code>work()</code> settling auto-settles the promise — you must call <code>resolve</code>/<code>reject</code> yourself.</p>
</details>
<details><summary>Q5. What's the bug?  <code>catch(async () =&gt; { await x(); })</code> on a promise chain</summary>
<p class="quiz-correct">✅ You usually want <code>.catch(err =&gt; ...)</code> with a handler that consumes the error. Using an async arrow that returns a promise means the catch itself can fail silently — fixed error handling should be explicit.</p>
</details>
</div>

<div class="mood"><span>How was Spot-the-Bug?</span>
<input type="radio" name="mood-bug2" id="mb2a"><label for="mb2a">😅 tough</label>
<input type="radio" name="mood-bug2" id="mb2b"><label for="mb2b">🙂 okay</label>
<input type="radio" name="mood-bug2" id="mb2c"><label for="mb2c">😎 nailed it</label>
</div>

---

## 🤔 More predict-the-output cards

<div class="why">🚩 <strong>Why it matters:</strong> guessing the output trains the async mental model faster than reading.</div>

<div class="predict">
<details><summary><code>Promise.resolve(1).then(x =&gt; x + 1)</code> → ?</summary>
<p class="quiz-correct">✅ 2 (a fulfilled promise with 2)</p>
</details>
<details><summary><code>await Promise.allSettled([Promise.resolve(1), Promise.reject(2)])</code> → ?</summary>
<p class="quiz-correct">✅ <code>[{status:"fulfilled",value:1},{status:"rejected",reason:2}]</code> — allSettled never rejects</p>
</details>
<details><summary><code>setTimeout(() =&gt; console.log('b'),0); console.log('a');</code> → ?</summary>
<p class="quiz-correct">✅ <code>a</code> then <code>b</code> (timers are async)</p>
</details>
<details><summary><code>Promise.reject('x').catch(() =&gt; 7)</code> → ?</summary>
<p class="quiz-correct">✅ fulfilled with 7 (the catch's return value)</p>
</details>
</div>

---

## 🎉 Congratulations!

You've completed **JavaScript Essentials — Part 2**! You now understand promises, `async/await`, error handling, classes/OOP, and ES modules. For a live progress bar, spaced-repetition flashcards and auto-graded challenges, open the **`Javascript_essentials_part2_study_app.html`** edition.

<div class="totop"><a href="#table-of-contents">⬆ Back to top</a></div>

<!--P2I-END-->