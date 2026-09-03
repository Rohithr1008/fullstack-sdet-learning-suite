# JavaScript Essentials - Part 3

A quick reference covering the JavaScript you need for **full-stack (MERN) development**: iterables, `Map`/`Set`, generators, regex, **DOM & events** (React), **`fetch` & Web APIs**, and **Node.js core** (Express/Mongoose).

<div class="interactive-note">💡 <strong>Interactive guide — MERN Bridge:</strong> clickable quizzes, flashcards, mood checks, predict-the-output cards, Spot-the-Bug quiz, a Map/Set playground, RegExp tester, and Node quick-reference. Best in <strong>VS Code preview</strong> (<code>Ctrl+Shift+V</code>) or a browser. The standalone <strong>.html edition</strong> adds live progress, spaced-repetition flashcards, and auto-graded challenges.</div>

<div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;background:#2d3748;color:#e2e8f0;padding:8px 12px;border-radius:8px;margin:10px 0;font-size:0.95rem;">
  <a href="index.html" style="color:#7dd3fc;font-weight:600;text-decoration:none;">Hub</a>
  <a href="Javascript_essentials_part1_interactive.md" style="color:#7dd3fc;font-weight:600;text-decoration:none;">1 Core</a>
  <a href="Javascript_essentials_part2_interactive.md" style="color:#7dd3fc;font-weight:600;text-decoration:none;">2 Async/OOP</a>
  <strong style="color:#fff;">3 MERN Bridge</strong>
  <a href="Javascript_essentials_part4_interactive.md" style="color:#7dd3fc;font-weight:600;text-decoration:none;">4 MERN Foundations</a>
  <a href="Javascript_essentials_part5_interactive.md" style="color:#7dd3fc;font-weight:600;text-decoration:none;">5 Production →</a>
  <span style="flex:1;"></span>
  <button onclick="p3iExpand(1)" style="cursor:pointer;border:none;border-radius:6px;padding:4px 10px;">📖 Expand all</button>
  <button onclick="p3iExpand(0)" style="cursor:pointer;border:none;border-radius:6px;padding:4px 10px;">📕 Collapse all</button>
  <button onclick="p3iFocus(this)" style="cursor:pointer;border:none;border-radius:6px;padding:4px 10px;">🧘 Focus Mode</button>
</div>

<div id="p3iFocusHint" style="display:none;background:#eef2ff;border:2px solid #5a67d8;border-radius:8px;padding:8px 14px;margin:8px 0;color:#3730a3;font-weight:600;">🧘 <strong>Focus Mode ON</strong> — extra panels are hidden and quizzes are closed for calm reading. Click "🧘 Focus Mode" again to restore everything.</div>

<style>
h2 { border-bottom: 3px solid #4299e1; padding-bottom: 6px; }
h2[id] { scroll-margin-top: 12px; }
.interactive-note { background: #eef6ff; border-left: 4px solid #2b6cb0; padding: 10px 14px; border-radius: 6px; }
.tip    { background: #f0fff4; border-left: 4px solid #38a169; padding: 10px 14px; border-radius: 6px; }
.warn   { background: #fffaf0; border-left: 4px solid #dd6b20; padding: 10px 14px; border-radius: 6px; }
.chall  { background: #f5f3ff; border-left: 4px solid #6b46c1; padding: 10px 14px; border-radius: 6px; }
.quiz-box { background: #f7f9fc; border: 2px solid #4299e1; border-radius: 10px; padding: 14px 18px; margin: 18px 0; }
.quiz-box h3 { margin-top: 0; color: #2b6cb0; }
.quiz-box details { background: #ffffff; border: 1px solid #cbd5e0; border-radius: 8px; padding: 8px 12px; margin: 8px 0; }
.quiz-box summary { cursor: pointer; font-weight: 600; }
.quiz-correct { color: #276749; font-weight: 700; }
.quiz-wrong { color: #9b2c2c; }
.answer { background: #edf2f7; border: 1px dashed #718096; border-radius: 6px; padding: 6px 10px; margin-top: 4px; }
.predict { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 10px; margin: 14px 0; }
.predict details { background: #fff; border: 1px solid #cbd5e0; border-radius: 8px; padding: 8px 12px; }
.predict summary { cursor: pointer; font-weight: 600; }
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
.hint { background: #fffbeb; border: 1px dashed #d69e2e; border-radius: 8px; padding: 8px 12px; margin: 10px 0; }
.hint summary { cursor: pointer; font-weight: 700; color: #744210; }
.mood { margin-top: 12px; display: flex; flex-wrap: wrap; gap: 6px; align-items: center; }
.mood > span { font-weight: 700; margin-right: 4px; }
.mood input { display: none; }
.mood label { cursor: pointer; border: 1px solid #a0aec0; border-radius: 999px; padding: 4px 12px; background: #fff; font-size: 14px; user-select: none; }
.mood input:checked + label { background: #38a169; border-color: #38a169; color: #fff; font-weight: 700; }
details[open] > :not(summary) { animation: pop .25s ease; }
@keyframes pop { from { opacity: 0; transform: translateY(-3px); } to { opacity: 1; transform: none; } }
.totop { text-align: right; margin: 6px 0; }
.why { background:#eef2ff; border-left:4px solid #5a67d8; padding:6px 12px; border-radius:6px; margin:6px 0 10px 0; font-size:0.92rem; }
body.focus-mode h2 { background:#eef2ff; padding:8px 12px; border-radius:8px; }
body.focus-mode .interactive-note, body.focus-mode .badge { opacity:.85; }
body.focus-mode .mood { display:none; }
.totop a { font-size: 13px; color: #2b6cb0; text-decoration: none; }
pre { background: #1a202c; color: #e2e8f0; padding: 12px 14px; border-radius: 8px; overflow-x: auto; }
pre code { background: transparent; color: inherit; font-family: "Cascadia Code", Consolas, monospace; }
.sandbox { background: #0f172a; border: 1px solid #334155; border-radius: 10px; padding: 14px; color: #e2e8f0; }
.sandbox textarea { width: 100%; box-sizing: border-box; background: #0b1220; color: #a5f3fc; border: 1px solid #334155; border-radius: 6px; font-family: "Cascadia Code", Consolas, monospace; padding: 10px; }
.sandbox .out { background: #020617; color: #86efac; border-radius: 6px; padding: 10px; margin-top: 8px; min-height: 40px; white-space: pre-wrap; font-family: "Cascadia Code", monospace; }
.sandbox .err { color: #fca5a5; }
.sandbox button { background: #2563eb; color: #fff; border: none; padding: 6px 14px; border-radius: 6px; cursor: pointer; margin: 6px 6px 0 0; }
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
  .predict details { background: #0f1622; border-color: #2d3748; color: #e2e8f0; }
  .spotbug details { background: #0f1622; border-color: #2d3748; color: #e2e8f0; }
}
</style>

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

- [ ] Sections 1–3 (language tiles)
- [ ] Sections 4–5 (browser: DOM & fetch)
- [ ] Section 6 (Node core)
- [ ] Exercises 1–8 attempted
- [ ] Challenges 1–5 attempted
- [ ] All answers checked

<div class="mood"><span>How's your mood today?</span>
<input type="radio" name="mood0" id="m0a"><label for="m0a">😴 Sleepy</label>
<input type="radio" name="mood0" id="m0b"><label for="m0b">😊 Ready</label>
<input type="radio" name="mood0" id="m0c"><label for="m0c">🔥 Pumped</label></div>

---

## 📋 Quick Reference Summary

- **Map:** any keys, insertion order, `.set/.get/.has/.delete/.size`.
- **Set:** unique values, `.add/.has/.delete/.size`, `[...set]` to dedupe.
- **Generators:** `function*` + `yield`, `.next()` → `{value, done}`.
- **RegExp:** `/pattern/flags`, flags `g i m`; `.test`, `.match`, `.replace`.
- **DOM:** `querySelector`, `createElement`, `appendChild`, `addEventListener`, `event.preventDefault()`.
- **fetch:** `await fetch(url)` → check `res.ok` → `await res.json()`.
- **Node:** `fs.readFile`, `path.join`, `process.env`, `http.createServer`.

### Golden rules
1. Use `Map`/`Set` when order/uniqueness/arbitrary keys matter.
2. Never `await` inside `.forEach` — use `for...of`.
3. Always check `res.ok` after `fetch`; call `.json()` once.
4. Don't block Node's event loop with sync `fs` in a handler.
5. Copy-then-set for React state (don't mutate in place).

---

## 1. Iterables, Map & Set

<div class="why">🚩 **Why it matters:** MongoDB cursors and de-duplicating tags/lists in a cart or feed use these daily — `Set` removes duplicates in one line, and `Map` stores any key type in order.</div>

<div class="tip">💡 An <strong>iterable</strong> is anything you loop with `for...of`. <strong>`Map`</strong> allows any key type + preserves insertion order; <strong>`Set`</strong> stores unique values.</div>

### 🧪 Map / Set Live Playground

<div class="sandbox" id="ms-box">
  <div>Try: <code>new Set([1,1,2,3,3]).size</code> or <code>new Map([["a",1]]).get("a")</code></div>
  <textarea id="ms-code" rows="3">const s = new Set([1,1,2,3,3]);
s.size;</textarea>
  <br>
  <button onclick="msRun()">▶️ Run</button>
  <button onclick="document.getElementById('ms-code').value=''">🗑 Clear</button>
  <div class="out" id="ms-out">Output…</div>
</div>

<script>
function msRun() {
  var code = document.getElementById("ms-code").value;
  var out = document.getElementById("ms-out");
  out.className = "out";
  try {
    var result = new Function("return eval('(' + code + ')')")();
    out.textContent = "Result: " + String(result);
  } catch (e) {
    out.className = "out err";
    out.textContent = "Error: " + e.message;
  }
}
</script>

### Map

```javascript
const user = new Map();
user.set("name", "Rohit");
user.set(1, "one");
console.log(user.get("name"));      // "Rohit"
console.log(user.has("name"));      // true
console.log(user.size);             // 2
for (const [k, v] of user) console.log(k, v);
```

### Set

```javascript
const ids = new Set([1,2,3,3,2,1]);
console.log(ids.size);              // 3
const unique = [...new Set([1,1,2,3,3])]; // [1,2,3]
```

### Flashcards (click to flip)

<div class="flashcard"><details><summary>What type of keys can a Map hold?</summary>
<div class="back">Any type — objects, numbers, functions, not just strings.</div></details></div>
<div class="flashcard"><details><summary>What guarantees uniqueness with no duplicates?</summary>
<div class="back">A <strong>Set</strong> — `size` counts unique values.</div></details></div>

### Quiz (click each to reveal)

<div class="quiz-box">
<h3>🎯 Map & Set quiz</h3>
<details><summary>Q1. `new Set([1,1,2,3,3]).size` = ?</summary><div class="answer"><span class="quiz-correct">3</span> — a Set stores unique values.</div></details>
<details><summary>Q2. Which preserves insertion order & allows any key?</summary><div class="answer"><span class="quiz-correct">Map</span></div></details>
<details><summary>Q3. Map or object for non-string keys / lots of add-remove?</summary><div class="answer"><span class="quiz-correct">Map</span></div></details>
</div>

<div class="mood"><span>Map & Set clicks?</span>
<input type="radio" name="m1" id="p1a"><label for="p1a">👍 Got it</label>
<input type="radio" name="m1" id="p1b"><label for="p1b">🔄 Review</label></div>

---

## 2. Generators & async iteration

<div class="why">🚩 **Why it matters:** paginating large API results and async data streams (Mongo cursors, infinite scroll) are built on generators — `for await` consumes them.</div>

<div class="tip">💡 A <strong>generator</strong> is a pause-able function: `function*` + `yield`. `.next()` pulls the next `{value, done}`.</div>

```javascript
function* countUp() {
  yield 1; yield 2; yield 3;
}
const gen = countUp();
console.log(gen.next());  // { value: 1, done: false }
console.log(gen.next());  // { value: 2, done: false }
console.log(gen.next());  // { value: 3, done: false }
```

```javascript
function* fibonacci() {
  let a = 0, b = 1;
  while (true) { yield a; [a, b] = [b, a + b]; }
}
const fib = fibonacci();
fib.next().value; // 0
fib.next().value; // 1
fib.next().value; // 1
fib.next().value; // 2
```

### Async generators & `for await...of`

```javascript
async function* fetchPages() {
  for (const url of ["/p1", "/p2"]) {
    yield await fetch(url);
  }
}
for await (const res of fetchPages()) {
  // handle each response as it arrives
}
```

### Why for MERN
- Stream / paginate data lazily.
- **Redux-Saga** builds on generators.
- Async producers ("values over time").

### Predict the output

<div class="quiz-box">
<details><summary>What does `countUp().next()` return?</summary><div class="answer"><span class="quiz-correct">{value, done}</span> — an object, not the bare value.</div></details>
<details><summary>With `fib.next().value` called 4 times starting 0,1,1,2 — next value? </summary><div class="answer"><span class="quiz-correct">3</span> (0,1,1,2,3…)</div></details>
</div>

### Quiz (click each to reveal)

<div class="quiz-box">
<h3>🎯 Generators quiz</h3>
<details><summary>Q1. What does `.next()` return?</summary><div class="answer"><span class="quiz-correct">B) {value, done}</span></div></details>
<details><summary>Q2. Which marks a generator?</summary><div class="answer"><span class="quiz-correct">B) function*</span> — `yield` is used inside it.</div></details>
</div>

---

## 3. Regular Expressions

<div class="why">🚩 **Why it matters:** slugifying URLs, validating emails/phone numbers, and search autocomplete on your Express API are all regex under the hood.</div>

<div class="chall">🔤 A <strong>RegExp</strong> is a pattern for matching text — used for validation, extraction, and cleanup.</div>

### Patterns & flags

```javascript
const email = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
email.test("Rohit@Example.com"); // true (i = case-insensitive)

const phone = /\d{3}-\d{3}-\d{4}/;
phone.test("555-123-4567");      // true
```

### `.test`, `.match`, `.replace`, capture groups

```javascript
"a1b2".match(/\d/g);                // ["1","2"]  (g = all)
"  hi  ".replace(/\s+/g, " ").trim(); // "hi"

const iso = /^(\d{4})-(\d{2})-(\d{2})$/;
const m = iso.exec("2026-09-02");
m[1]; // "2026"  m[2]; // "09"  m[3]; // "02"
```

### 🧪 RegExp Tester

<div class="sandbox" id="rx-box">
  <textarea id="rx-pattern" rows="1">^\d{3}-\d{3}-\d{4}$</textarea>
  <textarea id="rx-text" rows="2">555-123-4567</textarea><br>
  <button onclick="rxTest()">▶️ Test</button>
  <div class="out" id="rx-out">Result…</div>
</div>

<script>
function rxTest() {
  var pat = document.getElementById("rx-pattern").value;
  var text = document.getElementById("rx-text").value;
  var out = document.getElementById("rx-out");
  out.className = "out";
  try {
    var re = new RegExp(pat);
    out.textContent = re.test(text) ? "✅ MATCH" : "❌ no match";
  } catch (e) { out.className = "out err"; out.textContent = "Invalid regex: " + e.message; }
}
</script>

### Quiz (click each to reveal)

<div class="quiz-box">
<h3>🎯 RegExp quiz</h3>
<details><summary>Q1. Which flag finds ALL matches?</summary><div class="answer"><span class="quiz-correct">B) g</span> (global)</div></details>
<details><summary>Q2. `"abc123".replace(/\d/g,"#")` = ?</summary><div class="answer"><span class="quiz-correct">abc###</span></div></details>
</div>

---

## 4. DOM & Events (for React)

<div class="why">🚩 **Why it matters:** this is exactly what React compiles to — every `onClick`/`onChange` becomes `addEventListener` + reading `event.target`.</div>

<div class="warn">🌐 Browser-only API — run in the browser dev tools or a React project, not Node.</div>

### Selecting, creating, modifying

```javascript
const btn = document.querySelector("#save");      // first match
const inputs = document.querySelectorAll("input");  // list
const li = document.createElement("li");
li.textContent = "New item";
li.classList.add("active");
document.querySelector("#list").appendChild(li);
```

### Events

```javascript
btn.addEventListener("click", (event) => {
  console.log(event.target, event.clientX);
});
form.addEventListener("submit", (event) => {
  event.preventDefault();     // stop page reload
});
```

`event.target` = the element the event happened on; `preventDefault()` blocks default (form submit). This is exactly the foundation of React's `onClick`/`onChange`/`event.target.value`.

<div class="tip">🖱 <strong>Try it live:</strong> each click fires an event and updates <code>textContent</code> — the same <code>addEventListener</code> foundation React's <code>onClick</code> uses.</div>
<div class="sandbox">
  <button onclick="p3iDomAdd()">➕ Click me</button>
  <button onclick="p3iDomReset()">↺ Reset</button>
  <span style="margin-left:10px;">Clicks: <strong id="p3iDomCount">0</strong></span>
  <div class="out" id="p3iDomOut">0 clicks so far — click the button!</div>
</div>

### Flashcards (click to flip)

<div class="flashcard"><details><summary>Which method stops a form reloading?</summary>
<div class="back">`event.preventDefault()`</div></details></div>
<div class="flashcard"><details><summary>How do you read what a user typed?</summary>
<div class="back">`event.target.value` (React inputs build on this)</div></details></div>

### Quiz (click each to reveal)

<div class="quiz-box">
<h3>🎯 DOM & Events quiz</h3>
<details><summary>Q1. Which returns the FIRST matching element?</summary><div class="answer"><span class="quiz-correct">querySelector</span> (singular)</div></details>
<details><summary>Q2. What stops a form reloading?</summary><div class="answer"><span class="quiz-correct">preventDefault()</span></div></details>
<details><summary>Q3. What is `event.target`?</summary><div class="answer"><span class="quiz-correct">The element the event occurred on</span></div></details>
</div>

---

## 5. fetch & Web APIs

<div class="why">🚩 **Why it matters:** the React front-end talking to your Express API — every read/write to the server goes through `fetch`, and checking `res.ok` is non-negotiable.</div>

<div class="chall">📡 Use `fetch` to talk to your Express API from a React app. Returns a promise.</div>

### GET

```javascript
async function getUsers() {
  const res = await fetch("https://api.example.com/users");
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return await res.json();
}
```

⚠️ `fetch` does **not** reject on 404/500 — always check `res.ok`.

### POST with JSON body

```javascript
async function createUser(name) {
  const res = await fetch("/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return await res.json();
}
```

### Body methods (call ONE)
`res.json()` · `res.text()` · `res.formData()` — the body is a one-time stream.

### AbortController

```javascript
const controller = new AbortController();
setTimeout(() => controller.abort(), 5000);
await fetch(url, { signal: controller.signal });
```

<div class="tip">🌍 <strong>Try it live (fetch demo):</strong> calls the public JSONPlaceholder API, checks <code>res.ok</code>, then renders the result — the real pattern for talking to your Express API.
</div>
<div class="sandbox">
  <button onclick="p3iFetchDemo()">🚀 Run fetch demo</button>
  <span id="p3iFetchStatus" style="margin-left:10px;font-weight:600;">Not run yet</span>
  <div class="out" id="p3iFetchOut">Click the button to fetch a sample user from the internet.</div>
</div>

### Quiz (click each to reveal)

<div class="quiz-box">
<h3>🎯 fetch quiz</h3>
<details><summary>Q1. Does fetch reject on a 500?</summary><div class="answer"><span class="quiz-correct">No</span> — check `res.ok`.</div></details>
<details><summary>Q2. How to send JSON in POST?</summary><div class="answer"><span class="quiz-correct">`body: JSON.stringify(obj)` + JSON header</span></div></details>
<details><summary>Q3. How many body-parsing methods can you call?</summary><div class="answer"><span class="quiz-correct">One</span> — body is a one-time stream.</div></details>
</div>

---

## 6. Node.js Core

<div class="why">🚩 **Why it matters:** `fs`, `path`, `process.env`, and `http` are the engine running Express & Mongoose on the server — the "N" in MERN.</div>

<div class="tip">🖥 Node runs JS on the server — <strong>Express & Mongoose</strong> sit on top. These run in Node, not the browser.</div>

### modules, fs, path, process

```javascript
import { promises as fs } from "node:fs";
import path from "node:path";

const data = await fs.readFile(path.join(".", "data.json"), "utf8");

const PORT = process.env.PORT || 3000;
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

Express wraps this same `http` server.

### Flashcards (click to flip)

<div class="flashcard"><details><summary>How do you read a file?</summary>
<div class="back">`fs.readFileSync` (sync) or `fs.promises.readFile` (async, preferred in handlers)</div></details></div>
<div class="flashcard"><details><summary>What is `process.env.PORT`?</summary>
<div class="back">An environment variable (e.g. `PORT=5000 node app.js`)</div></details></div>

### Quiz (click each to reveal)

<div class="quiz-box">
<h3>🎯 Node quiz</h3>
<details><summary>Q1. Sync file read?</summary><div class="answer"><span class="quiz-correct">fs.readFileSync</span></div></details>
<details><summary>Q2. `process.env.PORT`?</summary><div class="answer"><span class="quiz-correct">An env variable</span></div></details>
<details><summary>Q3. Best file read in a handler?</summary><div class="answer"><span class="quiz-correct">fs.promises.readFile</span> (non-blocking)</div></details>
</div>

---

## 7. Common Pitfalls (MERN)

<div class="why">🚩 **Why it matters:** these are the real bugs that crash MERN apps in production — knowing them up-front saves hours of debugging later.</div>

<div class="warn"><strong>1. `await` inside `.forEach`</strong> — `.forEach` does NOT await!</div>
```javascript
// ❌ promises escape, order lost
arr.forEach(async (x) => await save(x));
// ✅ for...of respects await
for (const x of arr) await save(x);
```

<div class="warn"><strong>2. Not checking `res.ok`</strong></div>
```javascript
// ❌
const data = await res.json();
// ✅
if (!res.ok) throw new Error(`HTTP ${res.status}`);
```

<div class="warn"><strong>3. Calling `.json()` twice</strong> — throws "body already read".
<div class="warn"><strong>4. Blocking the event loop</strong> — sync `fs` in a handler blocks all requests.
<div class="warn"><strong>5. Mutating React state in place</strong> — copy then set: `setItems([...items, x])`.
<div class="tip">💡 <strong>Preview — full treatment in Part 4:</strong> this is the classic React immutability trap. Part 4 covers it with live demos and challenges — here it's just the foreshadow.</div>
<div class="warn"><strong>6. Object where a Set/Map fits better</strong>.
<div class="warn"><strong>7. Missing `g` flag</strong> — `"a1b2".match(/\d/)` gives only `["1"]`.

---

## 8. Practice Exercises

<div class="why">🚩 **Why it matters:** short, spaced, low-stakes practice is how knowledge moves from "seen it" to "can build with it."</div>

**Exercise 1** <span class="badge b-green">Easy</span> Create a Map of 3 students → scores; iterate logging `name: score`.

**Exercise 2** <span class="badge b-green">Easy</span> Dedupe `[1,1,2,3,3,4,4,5]` with a Set.

<details class="hint"><summary>💡 Hint</summary>`[...new Set(arr)]`
</details>

**Exercise 3** <span class="badge b-yellow">Medium</span> Write `take(gen, n)` pulling first `n` values from any generator; get first 8 Fibonacci.

**Exercise 4** <span class="badge b-yellow">Medium</span> Write `isEmail(s)` (RegExp) true for `"a@b.co"`, false for `"nope"`.

**Exercise 5** <span class="badge b-yellow">Medium</span> Create an `<li>`, set text, add class `active`, append to `#list`. (browser)

**Exercise 6** <span class="badge b-yellow">Medium</span> `getData(url)` — fetch, check `res.ok`, return json or throw.

**Exercise 7** <span class="badge b-yellow">Medium</span> `postData(url, obj)` JSON POST with header + body.

**Exercise 8** <span class="badge b-yellow">Medium</span> Read `data.json` with `fs.promises` + `path.join`; log it.

---

## 9. Challenges

<div class="why">🚩 **Why it matters:** these graded challenges mirror the exact coding tasks you'll do daily as a MERN dev — a safe place to make (and fix) mistakes.</div>

**Challenge 1** <span class="badge b-red">Hard</span> `countWords(text)` → Map of word→count + `unique` (via `map.size`).

<details class="hint"><summary>💡 Hint</summary>split on `/\s+/`; `map.set(w, (map.get(w)||0)+1)`
</details>

**Challenge 2** <span class="badge b-red">Hard</span> Generator `range(start, end)`, use in `for...of` to print 1–5.

<details class="hint"><summary>💡 Hint</summary>`for (let i=start; i<=end; i++) yield i;`
</details>

**Challenge 3** <span class="badge b-red">Hard</span> `slugify("Hello World!")` → `"hello-world"`.

<details class="hint"><summary>💡 Hint</summary>lowercase, `.replace(/[^a-z0-9]+/g,"-")`, trim `-` edges
</details>

**Challenge 4** <span class="badge b-red">Hard</span> Click listener on `#btn` updating `#count` text. (browser)

<details class="hint"><summary>💡 Hint</summary>`.addEventListener("click", () => countEl.textContent = ++n)`
</details>

**Challenge 5** <span class="badge b-red">Hard</span> `fetchWithTimeout(url, ms)` using `AbortController`.

<details class="hint"><summary>💡 Hint</summary>`new AbortController()` + `setTimeout(abort, ms)` + `signal`
</details>

---

## 10. Answer Key

<div class="why">🚩 **Why it matters:** compare your work against the canonical solutions — noticing small differences is where real learning happens.</div>

<div class="answer-key">

<details><summary>✅ Quiz answers</summary>
<div class="answer">- S1 (Map/Set): 1-3, 2-Map, 3-Map · S2 (Gen): 1-B, 2-B · S3 (RegExp): 1-B, 2-abc###<br>- S4 (DOM): 1-querySelector, 2-preventDefault, 3-target · S5 (fetch): 1-No, 2-json+header, 3-One<br>- S6 (Node): 1-readFileSync, 2-env var, 3-fs.promises</div>
</details>

<details><summary>🔧 Ex 1 — Map of scores</summary>
```javascript
const scores = new Map([["alice",90],["bob",85],["carol",92]]);
for (const [name, score] of scores) console.log(`${name}: ${score}`);
```
</details>

<details><summary>🔧 Ex 2 — Deduplicate</summary>
```javascript
const unique = [...new Set([1,1,2,3,3,4,4,5])]; // [1,2,3,4,5]
```
</details>

<details><summary>🔧 Ex 3 — take(gen, n)</summary>
```javascript
function* fibonacci(){ let a=0,b=1; while(true){ yield a; [a,b]=[b,a+b]; } }
function take(gen,n){ const out=[]; for(let i=0;i<n;i++) out.push(gen.next().value); return out; }
take(fibonacci(), 8); // [0,1,1,2,3,5,8,13]
```
</details>

<details><summary>🔧 Ex 4 — isEmail</summary>
```javascript
const isEmail = s => /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(s);
```
</details>

<details><summary>🔧 Ex 5 — build list item</summary>
```javascript
const li = document.createElement("li");
li.textContent = "Item"; li.classList.add("active");
document.querySelector("#list").appendChild(li);
```
</details>

<details><summary>🔧 Ex 6 — getData</summary>
```javascript
async function getData(url){
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return await res.json();
}
```
</details>

<details><summary>🔧 Ex 7 — postData</summary>
```javascript
async function postData(url, obj){
  const res = await fetch(url, { method:"POST", headers:{ "Content-Type":"application/json" }, body: JSON.stringify(obj) });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return await res.json();
}
```
</details>

<details><summary>🔧 Ex 8 — Node read</summary>
```javascript
import { promises as fs } from "node:fs";
import path from "node:path";
const data = await fs.readFile(path.join(".","data.json"), "utf8");
console.log(data);
```
</details>

<details><summary>🏆 C1 — countWords</summary>
```javascript
function countWords(text){
  const map = new Map();
  for (const w of text.split(/\s+/).filter(Boolean)) map.set(w, (map.get(w)||0)+1);
  return { counts: map, unique: map.size };
}
```
</details>

<details><summary>🏆 C2 — range</summary>
```javascript
function* range(start, end){ for(let i=start;i<=end;i++) yield i; }
for (const n of range(1,5)) console.log(n);
```
</details>

<details><summary>🏆 C3 — slugify</summary>
```javascript
const slugify = s => s.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");
slugify("Hello World!"); // "hello-world"
```
</details>

<details><summary>🏆 C4 — DOM counter</summary>
```javascript
let n=0;
const btn=document.getElementById("btn"), countEl=document.getElementById("count");
btn.addEventListener("click", () => { countEl.textContent = ++n; });
```
</details>

<details><summary>🏆 C5 — fetchWithTimeout</summary>
```javascript
async function fetchWithTimeout(url, ms){
  const c = new AbortController();
  const timer = setTimeout(() => c.abort(), ms);
  try {
    const res = await fetch(url, { signal: c.signal });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } finally { clearTimeout(timer); }
}
```
</details>

</div>

---

<script>
// ===== Interactive-part live demos (DOM & fetch) =====
function p3iExpand(open){
  document.querySelectorAll("details").forEach(function(d){ try{ d.open = !!open; }catch(e){} });
}
function p3iFocus(btn){
  var on = !document.body.classList.contains("focus-mode");
  document.body.classList.toggle("focus-mode", on);
  var hint = document.getElementById("p3iFocusHint");
  if(hint) hint.style.display = on ? "block" : "none";
  if(btn) btn.textContent = on ? "🧘 Focus ON" : "🧘 Focus Mode";
  document.querySelectorAll("details").forEach(function(d){ try{ d.open = false; }catch(e){} });
}
var p3iDomCount = 0;
function p3iDomAdd(){
  p3iDomCount++;
  var c = document.getElementById("p3iDomCount"), o = document.getElementById("p3iDomOut");
  if(c) c.textContent = p3iDomCount;
  if(o) o.textContent = p3iDomCount + " click" + (p3iDomCount===1?"":"s") + " — event fired by addEventListener!";
}
function p3iDomReset(){
  p3iDomCount = 0;
  var c = document.getElementById("p3iDomCount"), o = document.getElementById("p3iDomOut");
  if(c) c.textContent = "0";
  if(o) o.textContent = "0 clicks so far — click the button!";
}
function p3iFetchDemo(){
  var s = document.getElementById("p3iFetchStatus"), o = document.getElementById("p3iFetchOut");
  if(s) s.textContent = "⏳ Loading…";
  if(o) o.style.opacity = "0.4";
  fetch("https://jsonplaceholder.typicode.com/users/1")
    .then(function(res){ if(!res.ok) throw new Error("HTTP " + res.status); return res.json(); })
    .then(function(u){
      if(o){ o.style.opacity = "1"; o.innerHTML = "✅ <strong>Fetched</strong>: " + u.name + " — " + u.email; }
      if(s) s.textContent = "✅ Done";
    })
    .catch(function(e){ if(o){ o.style.opacity = "1"; o.textContent = "⚠️ fetch failed: " + e.message + " (offline?)"; } if(s) s.textContent = "❌ Error"; });
}
</script>

---

## 🐞 Spot-the-Bug — final boss quiz

<div class="why">🚩 <strong>Why it matters:</strong> catch the classic MERN mistakes before they catch you.</div>

<div class="spotbug">
<details><summary>Q1. What's the bug?  <code>const notes = Note.find();</code></summary>
<p class="quiz-correct">✅ Missing <code>await</code> — it's a promise, not data. Use <code>await Note.find()</code>.</p>
<p class="quiz-wrong">❌ Treating <code>Note.find()</code> like a sync array — without <code>await</code> you get a Query/Promise.</p>
</details>
<details><summary>Q2. What's the bug?  <code>setNotes(notes.push(newOne))</code></summary>
<p class="quiz-correct">✅ <code>push</code> mutates and returns the length — use <code>setNotes([...notes, newOne])</code>.</p>
<p class="quiz-wrong">❌ Expecting <code>push</code> to return the new array — it returns a number, so React state becomes wrong.</p>
</details>
<details><summary>Q3. What's the bug?  React frontend calling <code>http://localhost:3000</code> from a different port</summary>
<p class="quiz-correct">✅ CORS — add <code>app.use(cors())</code> on the server.</p>
<p class="quiz-wrong">❌ Fixing it only in React — CORS is enforced by the browser via response headers from the server.</p>
</details>
<details><summary>Q4. What's the bug?  <code>fetch(url); const d = await res.json();</code></summary>
<p class="quiz-correct">✅ Never assigned the fetch result to <code>res</code>, and didn't check <code>res.ok</code>.</p>
<p class="quiz-wrong">❌ Assuming <code>res</code> magically exists — you need <code>const res = await fetch(url)</code> first.</p>
</details>
<details><summary>Q5. What's the bug?  <code>Note.findByIdAndUpdate(id, upd)</code></summary>
<p class="quiz-correct">✅ Returns the OLD doc — add <code>{ new: true }</code> to get the updated one.</p>
</details>
</div>

<div class="mood"><span>How was Spot-the-Bug?</span>
<input type="radio" name="mood-bug3" id="mb3a"><label for="mb3a">😅 tough</label>
<input type="radio" name="mood-bug3" id="mb3b"><label for="mb3b">🙂 okay</label>
<input type="radio" name="mood-bug3" id="mb3c"><label for="mb3c">😎 nailed it</label>
</div>

---

## 🤔 More predict-the-output cards

<div class="why">🚩 <strong>Why it matters:</strong> guessing the output builds the mental model fast.</div>

<div class="predict">
<details><summary><code>[...new Set([1,1,2,3,3])]</code> → ?</summary>
<p class="quiz-correct">✅ <code>[1,2,3]</code></p>
</details>
<details><summary><code>"A  B!!".toLowerCase().replace(/[^a-z0-9]+/g,"-")</code> → ?</summary>
<p class="quiz-correct">✅ <code>"a-b-"</code> (after slugify trims edges → <code>"a-b"</code>)</p>
</details>
<details><summary><code>new Map().set("a",1).size</code> → ?</summary>
<p class="quiz-correct">✅ 1</p>
</details>
<details><summary><code>/a+/g.test("baaaad")</code> → ?</summary>
<p class="quiz-correct">✅ true (one or more <code>a</code>)</p>
</details>
</div>

---

## 🎉 Congratulations!

You've completed **JavaScript Essentials — Part 3 (MERN Bridge)**! You now have the JS foundation for **React (DOM/events), Express (Node core), and Mongoose (async/Map/Set)** — plus generators, regex, and `fetch`. Open the standalone **`Javascript_essentials_part3_study_app.html`** for live progress and auto-graded challenges.

<div class="totop"><a href="#table-of-contents">⬆ Back to top</a></div>

<!--P3I-END-->