# JavaScript Essentials - Part 3

A quick reference covering the JavaScript you need for **full-stack (MERN) development**: iterables, `Map`/`Set`, generators, regex, **DOM & events** (for React), **`fetch` & Web APIs**, and **Node.js core** (for Express/Mongoose).

> 💡 **Study guide (plain edition):** quizzes are plain Q&A, flashcards are bullets, every answer shown openly — no HTML/CSS. For clickable activity see the interactive edition (`Javascript_essentials_part3_interactive.md`) or the standalone app (`Javascript_essentials_part3_study_app.html`).

---

### 🗺 Your path through the 3-part series

```
Part 1  Core language  →  Part 2  Async/OOP/Modules  →  Part 3  MERN Bridge
(let, loops, functions,        (promises, async/await,          (Map/Set, generators, regex,
 objects, arrays, closures)     classes, error handling)         DOM, fetch, Node core)
```
You are here: **Part 3 — MERN Bridge** (the finish line for the JS foundation). This part builds directly on [Part 1](Javascript_essentials_part1_with_examples.md) (Core) and [Part 2](Javascript_essentials_part2_with_examples.md) (Async/OOP).

---

## Table of Contents

1. [Iterables, Map & Set](#1-iterables-map--set)
2. [Generators & async iteration](#2-generators--async-iteration)
3. [Regular Expressions](#3-regular-expressions)
4. [DOM & Events (for React)](#4-dom--events-for-react)
5. [fetch & Web APIs](#5-fetch--web-apis)
6. [Node.js Core](#6-nodejs-core)
7. [Common Pitfalls (MERN)](#7-common-pitfalls-mern)
8. [Practice Exercises](#8-practice-exercises)
9. [Challenges](#9-challenges)
10. [Answer Key](#10-answer-key)

**📈 Your progress** — tick as you go:

- [ ] Sections 1–3 (language tiles: Map/Set, generators, regex)
- [ ] Sections 4–5 (browser: DOM & fetch)
- [ ] Section 6 (Node core)
- [ ] Exercises 1–8 attempted
- [ ] Challenges 1–5 attempted
- [ ] All answers checked

---

## 📋 Quick Reference Summary

### Map & Set
- `Map` preserves insertion order, any keys; `.get/.set/.has/.delete/.size`, iterate with `for...of` or `.forEach`.
- `Set` stores unique values; `.add/.has/.delete/.size`; great for de-duplication.

### Generators
- `function*` + `yield`. `.next()` returns `{ value, done }`. `for await...of` consumes async generators.

### RegExp
- Patterns between `/.../flags`; flags `g` (global), `i` (case-insensitive), `m` (multiline). `.test()`, `.match()`, `.replace()`.

### DOM & Events
- `document.querySelector`/`createElement`/`textContent`/`append`.
- `element.addEventListener('click', handler)`; the event object has `target`, `preventDefault()`.

### fetch
- `await fetch(url)` → `res.ok`? → `await res.json()`; POST sends a body with headers.

### Node core
- `import`/`require`, `fs.readFileSync`, `path.join`, `process.env`, `http.createServer`.

### Golden rules
1. Use `Map`/`Set` when order+uniqueness/arbitrary keys matter; plain objects for small fixed shapes.
2. Never `await` inside a plain `.forEach` — use `for...of`.
3. In React/DOM: re-render from **state**, and avoid mutating arrays/objects you plot by reference.
4. Always check `res.ok` after `fetch`, and `.json()` exactly once.
5. Never block the Node event loop with sync `fs` inside a request handler.

---

### 🧩 Real-world scenario (what this part builds toward)

This is the **MERN Bridge** — it connects your JS knowledge to the four pillars of the stack:

- **Map / Set** → Mongo returns `Map`-like structures; `Set` de-duplicates tags and categories in one line.
- **Generators** → paginating large datasets, infinite sequences, and async streams (Mongo cursors).
- **Regular Expressions** → slugifying URLs, validating emails, searching product text.
- **DOM & Events** → exactly what **React** compiles to: click handlers, form input, `event.target.value`.
- **fetch & Web APIs** → the React app calling your **Express** API over HTTP.
- **Node core** → `fs`, `path`, `process.env`, `http` — the engine under **Express** and **Mongoose**.

Finish this part and you have the complete JS language foundation to start building real MERN apps (a cart, a blog, a chat) instead of just studying fragments.
## 1. Iterables, Map & Set

> 🚩 **Why it matters:** MongoDB cursors and de-duplicating tags/lists in a cart or feed use these daily — `Set` removes duplicates in one line, and `Map` stores any key type in order.

> An **iterable** is anything you can loop over with `for...of` — arrays, strings, maps, sets. `Map` and `Set` are two built-in collections with real advantages over objects/arrays.

### Map

A `Map` holds key-value pairs where keys can be **any type** (objects, numbers, functions), and it remembers **insertion order**.

```javascript
const user = new Map();
user.set("name", "Rohit");
user.set(1, "one");                 // number key
user.set({id: 7}, "object key");    // object key

console.log(user.get("name"));      // "Rohit"
console.log(user.has(1));           // true
console.log(user.size);             // 3
user.delete(1);
console.log(user.size);             // 2
```

**Iterating a Map:**

```javascript
const scores = new Map([["alice", 90], ["bob", 85]]);
for (const [name, score] of scores) {
  console.log(name, score);   // alice 90, bob 85
}
scores.forEach((score, name) => console.log(name, score));
```

**Map vs plain object:** an object only allows string/symbol keys and doesn't guarantee order; a `Map` allows any keys and is a better fit when you do lots of add/remove.

### Set

A `Set` is a collection of **unique** values. It's the go-to for de-duplication.

```javascript
const ids = new Set([1, 2, 3, 3, 2, 1]);
console.log(ids.size);        // 3 (duplicates removed)
ids.add(4);
console.log(ids.has(4));      // true
ids.delete(2);
console.log([...ids]);        // [1, 3, 4]
```

**De-duplicate an array:**
```javascript
const unique = [...new Set([1,1,2,3,3])];   // [1,2,3]
```

### Quiz (Self-test)

1. **What does `new Set([1,1,2,3,3]).size` equal?**
   - A) 5  B) 3 → **Answer:** B) 3 — a Set stores unique values.

2. **What type of keys can a `Map` hold?**
   - A) strings only  B) any type → **Answer:** B) any type (objects, numbers, etc.).

3. **Which preserves insertion order and allows any key type?**
   - A) object  B) Map → **Answer:** B) Map.

---

## 2. Generators & async iteration

> 🚩 **Why it matters:** paginating large API results and async data streams (Mongo cursors, infinite scroll) are built on generators — `for await` consumes them.

> A **generator** is a function you can pause and resume. Declared with `function*`, it yields values one at a time with `yield`, and `.next()` pulls the next value.

### A simple generator

```javascript
function* countUp() {
  yield 1;
  yield 2;
  yield 3;
}

const gen = countUp();
console.log(gen.next());  // { value: 1, done: false }
console.log(gen.next());  // { value: 2, done: false }
console.log(gen.next());  // { value: 3, done: false }
console.log(gen.next());  // { value: undefined, done: true }
```

You can also loop over a generator directly:

```javascript
function* letters() { yield "a"; yield "b"; }
for (const l of letters()) console.log(l);  // a, b
```

### Infinite/lazy sequences

Generators compute lazily — great when the full set is huge or expensive:

```javascript
function* fibonacci() {
  let a = 0, b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}
const fib = fibonacci();
console.log(fib.next().value); // 0
console.log(fib.next().value); // 1
console.log(fib.next().value); // 1
console.log(fib.next().value); // 2
```

### Async generators & `for await...of`

An **async generator** yields promises; `for await...of` consumes them as they resolve:

```javascript
async function* fetchPages() {
  for (const url of ["/page/1", "/page/2", "/page/3"]) {
    yield await fetch(url);
  }
}
for await (const res of fetchPages()) {
  // handle each response one at a time
}
```

### Why generators matter for MERN

- **Paginated data / streams** — process items as they arrive instead of loading everything.
- **Redux-Saga** (a React state library) is built on generators.
- **Async producers** — cleanly model "produce values over time."

### Quiz (Self-test)

1. **What does a generator's `.next()` return?**
   - A) the value directly  B) `{ value, done }` → **Answer:** B) an object `{ value, done }`.

2. **Which keyword marks a generator?**
   - A) `yield`  B) `function*` (with the `*`) → **Answer:** B) `function*`; `yield` is used *inside* it.

---

## 3. Regular Expressions

> 🚩 **Why it matters:** slugifying URLs, validating emails/phone numbers, and search autocomplete on your Express API are all regex under the hood.

> A **RegExp** is a pattern for matching text. Use it to validate input, extract data, or transform strings.

### Basic patterns & flags

```javascript
const email = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
console.log(email.test("Rohit@Example.com")); // true (i = case-insensitive)

const phone = /\d{3}-\d{3}-\d{4}/;
console.log(phone.test("555-123-4567")); // true
console.log(phone.test("hello"));        // false
```

**Common flags:** `g` (global/find all), `i` (case-insensitive), `m` (multiline).

### `.match()`, `.matchAll()`, `.replace()`

```javascript
const text = "Item 12 costs $5, Item 34 costs $20";
const nums = text.match(/\d+/g);       // ["12","34","5","20"]
console.log(nums);

const cleaned = "  hello  ".replace(/\s+/g, " ").trim(); // "hello"
```

### Capture groups `(...)`

```javascript
const iso = /^(\d{4})-(\d{2})-(\d{2})$/;
const m = iso.exec("2026-09-02");
console.log(m[1], m[2], m[3]);   // 2026 09 02
```

### Real-world MERN uses

- **Validation** (Mongoose/Express): email, phone, username patterns.
- **Routing/path parsing**: match route params, normalize slugs.
- **Sanitization**: strip unwanted characters from inputs.

### Quiz (Self-test)

1. **Which flag makes a search find *all* matches?**
   - A) `i`  B) `g` → **Answer:** B) `g` (global).

2. **`"abc123".replace(/\d/g, "#")` = ?**
   - A) `abc123`  B) `abc###` → **Answer:** B) `abc###` — every digit replaced.

---

## 4. DOM & Events (for React)

> 🚩 **Why it matters:** this is exactly what React compiles to — every `onClick`/`onChange` becomes `addEventListener` + reading `event.target`.

> The **DOM** (Document Object Model) is the browser's tree of elements. React builds on the DOM behind the scenes, so understanding it is a must. These are browser-only APIs — run in the browser dev tools or a React project, not Node.

### Selecting elements

```javascript
const button = document.querySelector("#save");        // by id
const inputs = document.querySelectorAll("input");       // NodeList
const title = document.getElementById("title");
const items = document.getElementsByClassName("item");
```

### Creating & modifying elements

```javascript
const li = document.createElement("li");
li.textContent = "New item";          // set text
li.classList.add("active");            // add a class
list.appendChild(li);                  // add to the page

title.textContent = "Updated!";        // change existing text
title.style.color = "blue";            // inline style
```

### Events & listeners

```javascript
button.addEventListener("click", (event) => {
  console.log("Clicked!", event.target, event.clientX);
});

form.addEventListener("submit", (event) => {
  event.preventDefault();   // stop the page from reloading
  console.log("submitted");
});
```

The **event object** gives you `target` (what was clicked), `clientX/clientY` (position), `key` (for keydown), and `preventDefault()`.

### Reading form inputs

```javascript
function handleChange(event) {
  console.log(event.target.value);   // what the user typed
}
// with a controlled value:
input.addEventListener("input", handleChange);
```

**Why this matters for React:** React's synthetic events and controlled inputs build directly on these concepts (`onClick`, `onChange`, `event.target.value`, `preventDefault` in forms).

### DOM quiz (Self-test)

1. **Which selects the first matching element?**
   - A) `querySelectorAll`  B) `querySelector` → **Answer:** B) `querySelector` (singular returns first); `querySelectorAll` returns a list.

2. **Which method stops a form from reloading the page?**
   - A) `event.stop()`  B) `event.preventDefault()` → **Answer:** B) `preventDefault()`.

3. **What does `event.target` hold?**
   - A) where the event happened  B) the event type → **Answer:** A) the element the event occurred on.

---

## 5. fetch & Web APIs

> 🚩 **Why it matters:** the React front-end talking to your Express API — every read/write to the server goes through `fetch`, and checking `res.ok` is non-negotiable.

> **`fetch`** is the modern way to make HTTP requests in the browser (and Node 18+). It returns a promise. Use it to talk to your Express API from a React app.

### GET request

```javascript
async function getUsers() {
  const res = await fetch("https://api.example.com/users");
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const users = await res.json();      // parse JSON body
  return users;
}
```

Always check `res.ok` — `fetch` does **not** reject on a 404/500 (only on network errors).

### POST with JSON body

```javascript
async function createUser(name) {
  const res = await fetch("/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.status === 204 ? null : await res.json();
}
```

### Error handling with try/catch

```javascript
async function safeGet(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    return await res.json();
  } catch (err) {
    console.error("Request failed:", err.message);
    return null;
  }
}
```

### Some `res` methods (call only one)

- `await res.json()` — parse JSON
- `await res.text()` — raw text
- `await res.formData()` — form data
- `res.ok` / `res.status` — HTTP state

Use **only one** body-parsing method per response (the body is a one-time stream).

### AbortController (timeouts & cancelling)

```javascript
const controller = new AbortController();
setTimeout(() => controller.abort(), 5000);
const res = await fetch(url, { signal: controller.signal });
```

### Quiz (Self-test)

1. **Does `fetch` reject on a 500 error?**
   - A) yes  B) no (it resolves, `res.ok` is false) → **Answer:** B) no — you must check `res.ok`.

2. **How do you send JSON in a POST body?**
   - A) `body: JSON.stringify(data)`  B) pass the object directly → **Answer:** A) stringify it, and set `Content-Type: application/json`.

3. **How many body-parsing methods can you call on one response?**
   - A) multiple  B) one → **Answer:** B) one — the body is a one-time stream.

---

## 6. Node.js Core

> 🚩 **Why it matters:** `fs`, `path`, `process.env`, and `http` are the engine running Express & Mongoose on the server — the "N" in MERN.

> **Node.js** runs JavaScript on the server. Express and Mongoose run on it. The core APIs below are what you'll reach for daily. These run in Node, not the browser.

### Modules: CommonJS vs ES modules

```javascript
// CommonJS (traditional, .js in older projects)
const express = require("express");
module.exports = { myHelper };

// ES modules (.mjs or with "type":"module")
import express from "express";
export { myHelper };
```

Modern Express/Mongoose projects often use ES modules. Both work.

### `fs` — file system

```javascript
import { readFileSync, writeFileSync } from "node:fs";

const text = readFileSync("./data.txt", "utf8");   // read
writeFileSync("./out.txt", "Hello Node!");          // write
```

Async versions avoid blocking the event loop — prefer `fs.promises` for most HTTP work:

```javascript
import { promises as fs } from "node:fs";
const data = await fs.readFile("./data.json", "utf8");
```

### `path` — file paths

```javascript
import path from "node:path";
const file = path.join("src", "server", "index.js");  // "src/server/index.js"
const ext = path.extname("photo.jpg");                // ".jpg"
```

### `process` & environment variables

```javascript
console.log(process.argv);            // CLI args
const PORT = process.env.PORT || 3000;  // env vars (PORT=5000 node app.js)
console.log(process.cwd());           // current working directory
```

### A tiny HTTP server

```javascript
import { createServer } from "node:http";

const server = createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ ok: true, url: req.url }));
});
server.listen(3000, () => console.log("Server on :3000"));
```

Express wraps this: `app.listen(3000)` is built on this same `http` server.

### Why this matters for MERN

- **Express** = `http` server + routing middleware.
- **Node seed scripts** read files with `fs`, use `path` and `process.env`.
- **Mongoose** connects to MongoDB and talks via async/await — which you already know.

### Node quiz (Self-test)

1. **How do you read a file (sync) in Node?**
   - A) `fetch`  B) `fs.readFileSync` → **Answer:** B) `fs.readFileSync`.

2. **What does `process.env.PORT` give you?**
   - A) a CLI argument  B) an environment variable → **Answer:** B) an environment variable (e.g. `PORT`).

3. **Which is best for an async read in a request handler?**
   - A) `readFileSync`  B) `fs.promises.readFile` → **Answer:** B) async `fs.promises` — it doesn't block the event loop.

---

## 7. Common Pitfalls (MERN)

> 🚩 **Why it matters:** these are the real bugs that crash MERN apps in production — knowing them up-front saves hours of debugging later.

**1. `await` inside a `.forEach`**

```javascript
// ❌ .forEach does NOT await — promises escape
items.forEach(async (i) => await save(i));

// ✅ for...of respects await
for (const i of items) await save(i);
```

**2. Not checking `res.ok` after `fetch`**

```javascript
// ❌ silently treats errors as data
const data = await res.json();
// ✅ check first, then parse
if (!res.ok) throw new Error(`HTTP ${res.status}`);
```

**3. Calling `.json()` twice**

```javascript
// ❌ second call throws "body already read"
const a = await res.json();
const b = await res.json();
```

**4. Blocking the event loop with sync `fs` in a handler**

```javascript
// ❌ readFileSync blocks ALL other requests
app.get("/data", (req, res) => res.send(readFileSync("big.txt")));
// ✅ async
app.get("/data", async (req, res) => res.send(await fs.readFile("big.txt", "utf8")));
```

**5. Mutating state objects directly (React)**

> 💡 **Preview (full treatment in Part 4):** this is the classic React immutability trap. Part 4 covers it with live demos and challenges — here it's just the foreshadow.

```javascript
// ❌ mutates the original array/object React tracks
items.push(newItem);
setItems(items);
// ✅ copy first — create a new reference
setItems([...items, newItem]);
```

**6. Using a plain `object` where a `Map`/`Set` fits better**

```javascript
// ❌ clumsily using keys to fake uniqueness
// ✅ a Set guarantees uniqueness
```

**7. RegExp without the `g` flag when you need all matches**

```javascript
"a1b2".match(/\d/)    // only "1"
"a1b2".match(/\d/g)   // ["1","2"]
```

---

## 8. Practice Exercises

> 🚩 **Why it matters:** short, spaced, low-stakes practice is how knowledge moves from "seen it" to "can build with it."

**Exercise 1 — Map of scores** <span class="badge b-green">Easy</span><span class="badge b-time">~3 min</span>

Create a `Map` of three students to their scores, then iterate it with `for...of` logging `name: score`.

**Exercise 2 — Deduplicate an array** <span class="badge b-green">Easy</span><span class="badge b-time">~3 min</span>

Turn `[1,1,2,3,3,4,4,5]` into a `Set`, then back into a unique array.

**Exercise 3 — First N fibonacci** <span class="badge b-yellow">Medium</span><span class="badge b-time">~5 min</span>

Write a generator `take(gen, n)` that pulls the first `n` values from any generator. Use it to get the first 8 Fibonacci numbers.

**Exercise 4 — Email validation** <span class="badge b-yellow">Medium</span><span class="badge b-time">~5 min</span>

Write a function `isEmail(s)` using a RegExp that returns `true` for `"a@b.co"` and `false` for `"nope"`.

**Exercise 5 — Build a list item** <span class="badge b-yellow">Medium</span><span class="badge b-time">~5 min</span>

Write code that creates an `<li>`, sets its text, adds class `'active'`, and appends it to an element with id `list`. (Browser.)

**Exercise 6 — fetch GET with error check** <span class="badge b-yellow">Medium</span><span class="badge b-time">~5 min</span>

Write `getData(url)` that fetches, checks `res.ok`, and returns `await res.json()` or throws.

**Exercise 7 — fetch POST** <span class="badge b-yellow">Medium</span><span class="badge b-time">~5 min</span>

Write `postData(url, obj)` that sends a JSON POST with the right header and body.

**Exercise 8 — Simple Node file read** <span class="badge b-yellow">Medium</span><span class="badge b-time">~5 min</span>

Use `fs.promises.readFile` with a `path.join` to read `data.json` and `console.log` it.

---

## 9. Challenges

> 🚩 **Why it matters:** these graded challenges mirror the exact coding tasks you'll do daily as a MERN dev — a safe place to make (and fix) mistakes.

**Challenge 1 — Unique words counter** <span class="badge b-red">Hard</span><span class="badge b-time">~10 min</span>

Write `countWords(text)` that returns a `Map` of word → count, using a `Set` helper to also report the number of unique words.

<details><summary>Hint</summary>
Split on `/\s+/`, iterate, `map.set(word, (map.get(word)||0)+1)`.
</details>

**Challenge 2 — Range generator** <span class="badge b-red">Hard</span><span class="badge b-time">~10 min</span>

Write a generator `range(start, end)` that yields every integer from `start` to `end` (inclusive), and use it in a `for...of` to print 1–5.

<details><summary>Hint</summary>
`for (let i=start; i<=end; i++) yield i;`
</details>

**Challenge 3 — Slugify** <span class="badge b-red">Hard</span><span class="badge b-time">~10 min</span>

Write `slugify(s)` that lowercases, replaces non-word chars with `-`, and collapses repeats: `"Hello World!"` → `"hello-world"`.

<details><summary>Hint</summary>
`.toLowerCase().replace(/[^a-z0-9]+/g, "-")` then `.replace(/^-+|-+$/g, "")`.
</details>

**Challenge 4 — DOM click counter** <span class="badge b-red">Hard</span><span class="badge b-time">~10 min</span>

Write code attaching a click listener to `#btn` that increments a counter and updates `#count` text each click. (Browser.)

<details><summary>Hint</summary>
`addEventListener("click", () => countEl.textContent = ++n)`.
</details>

**Challenge 5 — fetch with timeout** <span class="badge b-red">Hard</span><span class="badge b-time">~12 min</span>

Write `fetchWithTimeout(url, ms)` that uses an `AbortController` + `setTimeout` to abort if it takes too long, returning parsed JSON or throwing.

<details><summary>Hint</summary>
```
const c = new AbortController();
setTimeout(() => c.abort(), ms);
const res = await fetch(url, { signal: c.signal });
```
</details>

---

## 10. Answer Key

> 🚩 **Why it matters:** compare your work against the canonical solutions — noticing small differences is where real learning happens.

### Quiz answers

- **Section 1 (Map/Set):** 1-B · 2-B · 3-B
- **Section 2 (Generators):** 1-B · 2-B
- **Section 3 (RegExp):** 1-B · 2-B
- **Section 4 (DOM):** 1-B · 2-B · 3-A
- **Section 5 (fetch):** 1-B · 2-A · 3-B
- **Section 6 (Node):** 1-B · 2-B · 3-B

### Exercise solutions

**Ex 1 — Map of scores**
```javascript
const scores = new Map([["alice",90],["bob",85],["carol",92]]);
for (const [name, score] of scores) {
  console.log(name + ": " + score);
}
```

**Ex 2 — Deduplicate**
```javascript
const arr = [1,1,2,3,3,4,4,5];
const unique = [...new Set(arr)];   // [1,2,3,4,5]
```

**Ex 3 — First N fibonacci via generator**
```javascript
function* fibonacci() { let a=0,b=1; while(true){ yield a; [a,b]=[b,a+b]; } }
function take(gen, n) { const out=[]; for(let i=0;i<n;i++) out.push(gen.next().value); return out; }
console.log(take(fibonacci(), 8)); // [0,1,1,2,3,5,8,13]
```

**Ex 4 — Email validation**
```javascript
const isEmail = (s) => /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(s);
```

**Ex 5 — Build a list item (browser)**
```javascript
const li = document.createElement("li");
li.textContent = "Item";
li.classList.add("active");
document.getElementById("list").appendChild(li);
```

**Ex 6 — fetch GET**
```javascript
async function getData(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return await res.json();
}
```

**Ex 7 — fetch POST**
```javascript
async function postData(url, obj) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(obj),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return await res.json();
}
```

**Ex 8 — Node file read**
```javascript
import { promises as fs } from "node:fs";
import path from "node:path";
const data = await fs.readFile(path.join(".", "data.json"), "utf8");
console.log(data);
```

### Challenge solutions

**C1 — Unique words counter**
```javascript
function countWords(text) {
  const map = new Map();
  for (const word of text.split(/\s+/).filter(Boolean)) {
    map.set(word, (map.get(word) || 0) + 1);
  }
  return { counts: map, unique: map.size };
}
```

**C2 — Range generator**
```javascript
function* range(start, end) {
  for (let i = start; i <= end; i++) yield i;
}
for (const n of range(1, 5)) console.log(n); // 1 2 3 4 5
```

**C3 — Slugify**
```javascript
const slugify = (s) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
console.log(slugify("Hello World!")); // "hello-world"
```

**C4 — DOM click counter (browser)**
```javascript
let n = 0;
const btn = document.getElementById("btn");
const countEl = document.getElementById("count");
btn.addEventListener("click", () => { countEl.textContent = ++n; });
```

**C5 — fetch with timeout**
```javascript
async function fetchWithTimeout(url, ms) {
  const c = new AbortController();
  const timer = setTimeout(() => c.abort(), ms);
  try {
    const res = await fetch(url, { signal: c.signal });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } finally {
    clearTimeout(timer);
  }
}
```

---

## 🎉 Congratulations!

You've completed **JavaScript Essentials — Part 3 (MERN Bridge)**. You now understand iterables, `Map`/`Set`, generators, RegExp, DOM & events, `fetch`, and Node.js core — the JS foundation you need for **React, Express, and Mongoose**. For the interactive edition with quizzes to click, flashcards, and a coding sandbox, open **`Javascript_essentials_part3_interactive.md`** or the standalone **`Javascript_essentials_part3_study_app.html`**.

<!--P3-END-->