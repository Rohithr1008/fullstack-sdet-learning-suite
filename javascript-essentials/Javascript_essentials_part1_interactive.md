# JavaScript Essentials - Part 1

A quick reference covering the JavaScript fundamentals you have learned so far.

<div class="interactive-note">💡 <strong>Interactive guide v3 — enhanced with Phase 1 & 2 features:</strong> Truthy/Falsy checker, JavaScript Sandbox, Hoisting Visualizer, Type Coercion Flowchart, Worked Examples (Closures, reduce, Destructuring), 12 Spot-the-Bug challenges, Difficulty Filters, Predict-Output cards, Learning Path, and more! Best in <strong>VS Code preview</strong> (<code>Ctrl+Shift+V</code>) or a browser; the standalone <strong>.html edition</strong> adds a live progress bar, spaced-repetition flashcards, quiz persistence and personalized recommendations.</div>

<div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;background:#2d3748;color:#e2e8f0;padding:8px 12px;border-radius:8px;margin:10px 0;font-size:0.95rem;">
  <a href="index.html" style="color:#7dd3fc;font-weight:600;text-decoration:none;">Hub</a>
  <strong style="color:#fff;">1 Core</strong>
  <a href="Javascript_essentials_part2_interactive.md" style="color:#7dd3fc;font-weight:600;text-decoration:none;">2 Async/OOP</a>
  <a href="Javascript_essentials_part3_interactive.md" style="color:#7dd3fc;font-weight:600;text-decoration:none;">3 MERN Bridge</a>
  <a href="Javascript_essentials_part4_interactive.md" style="color:#7dd3fc;font-weight:600;text-decoration:none;">4 MERN Foundations</a>
  <a href="Javascript_essentials_part5_interactive.md" style="color:#7dd3fc;font-weight:600;text-decoration:none;">5 Production →</a>
</div>

<style>
/* ===== JavaScript Essentials — Interactive Styles v2 ===== */
h2 { border-bottom: 3px solid #4299e1; padding-bottom: 6px; }
.interactive-note { background: #eef6ff; border-left: 4px solid #2b6cb0; padding: 10px 14px; border-radius: 6px; }
.tip    { background: #f0fff4; border-left: 4px solid #38a169; padding: 10px 14px; border-radius: 6px; }
.why    { background:#eef2ff; border-left:4px solid #5a67d8; padding:6px 12px; border-radius:6px; margin:6px 0 10px 0; font-size:0.92rem; }
.warn   { background: #fffaf0; border-left: 4px solid #dd6b20; padding: 10px 14px; border-radius: 6px; }
.danger { background: #fff5f5; border-left: 4px solid #e53e3e; padding: 10px 14px; border-radius: 6px; }

/* Quiz boxes */
.quiz-box { background: #f7f9fc; border: 2px solid #4299e1; border-radius: 10px; padding: 14px 18px; margin: 18px 0; }
.quiz-box h3 { margin-top: 0; color: #2b6cb0; }
.quiz-box details { background: #ffffff; border: 1px solid #cbd5e0; border-radius: 8px; padding: 8px 12px; margin: 8px 0; }
.quiz-box summary { cursor: pointer; font-weight: 600; }
.quiz-correct { color: #276749; font-weight: 700; }
.quiz-wrong { color: #9b2c2c; }

/* Flashcards */
.flashcard { background: #fffbeb; border: 2px solid #d69e2e; border-radius: 10px; padding: 10px 14px; margin: 10px 0; }
.flashcard summary { cursor: pointer; font-weight: 700; color: #744210; }
.flashcard .back { margin-top: 8px; }

/* Tabs (radio hack) */
.tabs label { display: inline-block; padding: 8px 18px; margin-right: 4px; border: 1px solid #4299e1; border-bottom: none; border-radius: 8px 8px 0 0; cursor: pointer; background: #ebf8ff; font-weight: 600; }
.tabs input { display: none; }
.tabs .tab-page { display: none; border: 1px solid #4299e1; padding: 12px 16px; border-radius: 0 8px 8px 8px; background: #fff; }
#tab-arr:checked ~ .page-arr, #tab-str:checked ~ .page-str { display: block; }
#tab-arr:checked ~ label[for="tab-arr"], #tab-str:checked ~ label[for="tab-str"] { background: #4299e1; color: #fff; }

/* Answer key cards */
.solution { border: 1px solid #cbd5e0; border-radius: 8px; padding: 8px 12px; margin: 10px 0; background: #fafffe; }
.solution summary { cursor: pointer; font-weight: 600; color: #2c7a7b; }
.answer-key details { border: 1px solid #b2dfdb; border-radius: 8px; padding: 8px 12px; margin: 10px 0; background: #fafffe; }
.answer-key summary { cursor: pointer; font-weight: 600; color: #2c7a7b; }
.footer { text-align: center; padding: 18px; margin-top: 30px; background: #2b6cb0; color: #fff; border-radius: 10px; }

/* v2: difficulty & time badges */
.badge { display: inline-block; font-size: 12px; padding: 2px 9px; border-radius: 999px; margin-left: 6px; vertical-align: middle; font-weight: 700; }
.b-green  { background: #c6f6d5; color: #22543d; }
.b-yellow { background: #fefcbf; color: #744210; }
.b-red    { background: #fed7d7; color: #742a2a; }
.b-time   { background: #e2e8f0; color: #2d3748; font-weight: 600; }

/* v2: predict-the-output cards */
.predict { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 10px; margin: 14px 0; }
.predict details { background: #fff; border: 1px solid #cbd5e0; border-radius: 8px; padding: 8px 12px; }
.predict summary { cursor: pointer; font-weight: 600; }

/* v2: hint cards */
.hint { background: #fffbeb; border: 1px dashed #d69e2e; border-radius: 8px; padding: 8px 12px; margin: 10px 0; }
.hint summary { cursor: pointer; font-weight: 700; color: #744210; }

/* v2: mood check */
.mood { margin-top: 12px; display: flex; flex-wrap: wrap; gap: 6px; align-items: center; }
.mood > span { font-weight: 700; margin-right: 4px; }
.mood input { display: none; }
.mood label { cursor: pointer; border: 1px solid #a0aec0; border-radius: 999px; padding: 4px 12px; background: #fff; font-size: 14px; user-select: none; }
.mood input:checked + label { background: #38a169; border-color: #38a169; color: #fff; font-weight: 700; }

/* v2: study plan & certificate */
.study-plan { background: #ebf8ff; border: 1px solid #4299e1; border-radius: 10px; padding: 10px 16px; margin: 14px 0; }
.study-plan summary { cursor: pointer; font-weight: 700; color: #2b6cb0; font-size: 1.05em; }
.cert { background: linear-gradient(135deg, #2b6cb0, #6b46c1); color: #fff; border-radius: 14px; padding: 26px; text-align: center; margin: 30px 0; }
.cert h2 { color: #fff; border-bottom: none; }
.cert ul { text-align: left; display: inline-block; }
.totop { text-align: right; margin: 6px 0; }
.totop a { font-size: 13px; color: #2b6cb0; text-decoration: none; }

/* v2: micro-animations */
details[open] > :not(summary) { animation: pop .25s ease; }
@keyframes pop { from { opacity: 0; transform: translateY(-3px); } to { opacity: 1; transform: none; } }

@media (prefers-color-scheme: dark) {
/*DM-START*/
h2 { border-bottom-color: #63b3ed; }
.interactive-note { background: #17202b; }
.tip { background: #132a1c; }
.warn { background: #2b2013; }
.danger { background: #2b1414; }
.quiz-box { background: #141c28; border-color: #2b6cb0; }
.quiz-box h3 { color: #90cdf4; }
.quiz-box details { background: #0f1622; border-color: #2d3748; color: #e2e8f0; }
.quiz-correct { color: #68d391; }
.quiz-wrong { color: #fc8181; }
.flashcard { background: #241d0e; border-color: #975a16; }
.flashcard summary { color: #f6e05e; }
.tabs label { background: #141c28; color: #bee3f8; border-color: #2b6cb0; }
.tabs .tab-page { background: #0f1622; color: #e2e8f0; }
.solution, .answer-key details { background: #0e1c1b; border-color: #285e61; color: #e2e8f0; }
.solution summary, .answer-key summary { color: #81e6d9; }
.predict details { background: #0f1622; border-color: #2d3748; color: #e2e8f0; }
.hint { background: #241d0e; border-color: #975a16; color: #e2e8f0; }
.hint summary { color: #f6e05e; }
.mood label { background: #141c28; color: #cbd5e0; border-color: #2d3748; }
.study-plan { background: #141c28; color: #e2e8f0; }
.study-plan summary { color: #90cdf4; }
.totop a { color: #90cdf4; }
/*DM-END*/
}
</style>

---

## Table of Contents

1. [Variables: `let`, `const`, `var`](#1-variables-let-const-var)
2. [Conditions: `if...else` and `switch`](#2-conditions-ifelse-and-switch)
3. [Loops: `while`, `do...while`, `for`](#3-loops-while-dowhile-for)
4. [Logical Operators](#4-logical-operators)
5. [Data Types](#5-data-types)
6. [Mutable vs Immutable](#6-mutable-vs-immutable)
7. [Operators](#7-operators)
8. [Functions and Arrow Functions](#8-functions-and-arrow-functions)
9. [Arrays and Methods](#9-arrays-and-methods)
10. [Strings and Common Methods](#10-strings-and-common-methods)
11. [Objects](#11-objects)
12. [Symbols Cheat Sheet](#12-symbols-cheat-sheet)
13. [Common Pitfalls](#13-common-pitfalls)
14. [Practice Exercises](#14-practice-exercises)
15. [Challenges](#15-challenges)
16. [Answer Key](#16-answer-key)

**📈 Your progress** — tick as you go:

- [ ] Sections 1–6 (basics)
- [ ] Sections 7–12 (core toolkit)
- [ ] Section 13 (pitfalls)
- [ ] Exercises 1–10 attempted
- [ ] Challenges 1–9 attempted
- [ ] All answers checked

<details class="study-plan">
<summary>📅 Suggested 7-day study plan (click to open)</summary>
<ol>
<li><strong>Day 1:</strong> Sections 1–3 — variables, conditions, loops. Do every Self-Test.</li>
<li><strong>Day 2:</strong> Sections 4–7 — logic, data types, mutability, operators.</li>
<li><strong>Day 3:</strong> Section 8 — functions, closures, hoisting. Rewrite one example from memory.</li>
<li><strong>Day 4:</strong> Section 9 — arrays. Redo the predict cards until you go 6-for-6.</li>
<li><strong>Day 5:</strong> Sections 10–12 — strings, objects, symbols. Flip all flashcards.</li>
<li><strong>Day 6:</strong> Section 13 — pitfalls. Take the Spot-the-bug quiz cold.</li>
<li><strong>Day 7:</strong> Sections 14–15 — all exercises &amp; challenges, then check the Answer Key. 🏆</li>
</ol>
</details>

---

<div style="page-break-after: always;"></div>

## 📋 Quick Reference Summary

### Variables & scope

| Keyword | Scope    | Reassign? | Use when          |
|---------|----------|-----------|-------------------|
| `let`   | Block    | Yes       | value will change |
| `const` | Block    | No        | default choice    |
| `var`   | Function | Yes       | avoid in new code |

### Truthy vs falsy

**Falsy (only 6):** `false`, `0`, `""` (empty string), `null`, `undefined`, `NaN` — everything else is truthy (including `"0"`, `[]`, `{}`).

### Golden rules

1. Use `const` by default — `let` only when the value must change.
2. Always compare with `===` / `!==` — never `==` / `!=`.
3. Strings are immutable; arrays and objects are mutable.
4. `sort()` on numbers needs a compare function: `.sort((a, b) => a - b)`.
5. Every `switch` case needs a `break` (or `return`).

### 🃏 Flashcards — click each card to flip it

<details class="flashcard"><summary>🃏 <code>let</code> vs <code>const</code>?</summary><div class="back"><code>const</code> locks the <em>binding</em> — you can't reassign it, but contents of objects/arrays CAN still change. Default to <code>const</code>.</div></details>

<details class="flashcard"><summary>🃏 <code>==</code> vs <code>===</code>?</summary><div class="back"><code>==</code> converts types first (<code>"5" == 5</code> → <code>true</code>). <code>===</code> checks type AND value. Always use <code>===</code>.</div></details>

<details class="flashcard"><summary>🃏 <code>map</code> vs <code>forEach</code>?</summary><div class="back"><code>map</code> returns a <strong>new array</strong> of transformed items. <code>forEach</code> returns <code>undefined</code> — for side effects only.</div></details>

<details class="flashcard"><summary>🃏 <code>slice</code> vs <code>splice</code>?</summary><div class="back"><code>slice</code> copies a portion (original untouched). <code>splice</code> changes the array <strong>in place</strong>.</div></details>

<details class="flashcard"><summary>🃏 Spread vs Rest (<code>...</code>)?</summary><div class="back">On the <strong>left</strong> of <code>=</code> → <strong>rest</strong> (collects into an array/object). In literals & calls → <strong>spread</strong> (expands out).</div></details>

<details class="flashcard"><summary>🃏 <code>null</code> vs <code>undefined</code>?</summary><div class="back"><code>undefined</code> = never assigned a value. <code>null</code> = intentionally empty (you assigned it).</div></details>

<details class="flashcard"><summary>🃏 <code>??</code> vs <code>||</code>?</summary><div class="back"><code>||</code> falls back on ANY falsy value (so <code>0</code> and <code>""</code> get skipped!). <code>??</code> only falls back on <code>null</code>/<code>undefined</code>.</div></details>

<details class="flashcard"><summary>🃏 Are strings mutable?</summary><div class="back">No — every string method returns a <strong>new string</strong>; the original is untouched.</div></details>

<details class="flashcard"><summary>🃏 What is a closure?</summary><div class="back">A function that remembers the variables of the place where it was created — even after the outer function has returned.</div></details>

<details class="flashcard"><summary>🃏 How do you test for <code>NaN</code>?</summary><div class="back"><code>Number.isNaN(x)</code>. Never <code>x === NaN</code> — that is always <code>false</code>!</div></details>

<div class="tip">🔁 <strong>Spaced repetition schedule:</strong> review these cards today, then re-test yourself after <strong>1 day</strong>, again after <strong>3 days</strong>, then <strong>1 week</strong>, and finally after <strong>2 weeks</strong>. If you get one wrong, reset that card's schedule back to 1 day. (The HTML study app automates this — see its Spaced Repetition panel.)</div>

### 🧭 Learning Path — suggested reading order

Follow this path based on where you are. Each step lists its prerequisites and practice:

1. **Variables (S1)** — *Prerequisites: none* → practice with the Truthy/Falsy checker above
2. **Conditions (S2)** — *Prerequisites: S1* → watch for `switch` `break` pitfalls (S13)
3. **Loops (S3)** → **Logical Operators (S4)** → **Data Types (S5)** — *Prerequisites: S1–S2*
4. **Mutability (S6)** → **Operators (S7)** — *Prerequisites: S5* → try the Type Coercion flowchart (S7)
5. **Functions (S8)** — *Prerequisites: S1–S5* → crucial! Use the Hoisting Visualizer + Closures worked example
6. **Arrays (S9)** → **Strings (S10)** — *Prerequisites: S8* → use the `reduce()` worked example + Sandbox
7. **Objects (S11)** — *Prerequisites: S5–S8* → use the Destructuring worked example
8. **Symbols (S12)** → **Common Pitfalls (S13)** — *Prerequisites: S1–S9* → attempt all 12 Spot-the-Bug challenges
9. **Exercises (S14)** → **Challenges (S15)** — *Prerequisites: S1–S13* → filter by 🟢 Warm-up first, then level up
10. **Answer Key (S16)** — check yourself only after attempting!

<div class="interactive-note">📊 <strong>Tracking your progress?</strong> The HTML study app (<code>Javascript_essentials_part1_study_app.html</code>) adds a live progress bar, "Mark complete" buttons per section, quiz-answer persistence, and personalized next-topic recommendations.</div>

### 🗂️ Mini tabs — pick a cheat list

<div class="tabs">

<input type="radio" name="qr" id="tab-arr" checked>
<label for="tab-arr">Array methods</label>
<input type="radio" name="qr" id="tab-str">
<label for="tab-str">String methods</label>

<div class="tab-page page-arr">

<pre><code>map(fn)      transform each item → new array
filter(fn)   keep matches → new array
reduce(fn,0) fold to a single value
find(fn)     first match or undefined
at(-1)       last item (negative index!)</code></pre>

</div>

<div class="tab-page page-str">

<pre><code>slice(a,b)   copy a part → new string
split(sep)   string → array of pieces
trim()       strip whitespace
padStart(n)  pad from the left
replace(a,b) replace first match</code></pre>

</div>

</div>

<!-- ============ PHASE 1: INTERACTIVE ENHANCEMENTS ============ -->

## 🔥 Phase 1 Interactive Tools

### 🔍 Truthy/Falsy Checker

Explore truthiness yourself! Enter any value and see instantly:

<div class="tool-truthy-falsy" style="background: #f7f9fc; border: 2px solid #4299e1; border-radius: 10px; padding: 14px; margin: 16px 0;">
  <p>Enter a value to check if it's truthy or falsy:</p>
  <div style="display: flex; gap: 8px; margin: 10px 0;">
    <input 
      type="text" 
      id="truthyInput" 
      placeholder='Try: null, 0, "", [], {}, "hello", 1, true' 
      style="flex: 1; padding: 8px; font-family: monospace; border: 1px solid #ccc; border-radius: 4px;"
    >
    <button onclick="checkTruthiness()" style="padding: 8px 16px; background: #4299e1; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: 600;">Check</button>
  </div>
  <div id="truthyResult" style="margin-top: 10px; padding: 12px; border-radius: 8px; display: none; font-weight: 600; border-left: 4px solid #4299e1;"></div>
</div>

<script>
function checkTruthiness() {
  const input = document.getElementById('truthyInput').value;
  const result = document.getElementById('truthyResult');
  
  if (input === '') {
    result.style.display = 'none';
    return;
  }
  
  let value;
  try {
    value = eval(input);
  } catch(e) {
    value = input;
  }
  
  const isTruthy = Boolean(value);
  const type = typeof value;
  
  result.style.display = 'block';
  result.style.background = isTruthy ? '#c6f6d5' : '#fed7d7';
  result.style.color = isTruthy ? '#22543d' : '#742a2a';
  result.style.borderColor = isTruthy ? '#38a169' : '#e53e3e';
  
  result.innerHTML = `
    <strong>${isTruthy ? '✅ TRUTHY' : '❌ FALSY'}</strong><br>
    <small>Value: <code>${JSON.stringify(value)}</code> | Type: <code>${type}</code></small>
  `;
}

document.getElementById('truthyInput')?.addEventListener('keypress', function(e) {
  if (e.key === 'Enter') checkTruthiness();
});
</script>

<div style="page-break-after: always;"></div>

<!-- ============ PHASE 2: INTERACTIVE ENHANCEMENTS ============ -->

## 🔧 Phase 2 Interactive Tools

### 🔧 JavaScript Interactive Sandbox

**Try it:** Edit the code below and click "Run Code" to see the output instantly! (Ctrl+Enter to run)

<div class="sandbox-container" style="background: #f7f9fc; border: 2px solid #4299e1; border-radius: 10px; padding: 14px; margin: 16px 0;">
  <div style="margin-bottom: 10px;">
    <strong>📝 Enter JavaScript code:</strong>
    <textarea 
      id="sandboxCode" 
      placeholder="const arr = [1,2,3]; console.log(arr.push(4));"
      style="width: 100%; height: 120px; padding: 10px; font-family: 'Courier New', monospace; font-size: 13px; border: 1px solid #cbd5e0; border-radius: 6px; display: block; margin-top: 8px; background: #fff;"
    ></textarea>
  </div>
  
  <div style="display: flex; gap: 8px; margin: 10px 0;">
    <button onclick="runSandboxCode()" style="padding: 8px 16px; background: #2b6cb0; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: 600; flex: 1;">▶️ Run Code</button>
    <button onclick="clearSandboxCode()" style="padding: 8px 16px; background: #718096; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: 600;">Clear</button>
  </div>
  
  <div style="margin-top: 10px;">
    <strong>📤 Output:</strong>
    <pre id="sandboxOutput" style="background: #0f1622; color: #e2e8f0; padding: 12px; border-radius: 6px; border: 1px solid #2d3748; min-height: 60px; max-height: 300px; overflow-y: auto; font-family: 'Courier New', monospace; font-size: 13px; margin-top: 8px;">// Output will appear here</pre>
  </div>
</div>

<script>
let originalLog = console.log;
let outputBuffer = [];

function runSandboxCode() {
  const code = document.getElementById('sandboxCode').value;
  const output = document.getElementById('sandboxOutput');
  
  outputBuffer = [];
  
  console.log = function(...args) {
    const formatted = args.map(arg => {
      if (typeof arg === 'object') return JSON.stringify(arg, null, 2);
      return String(arg);
    }).join(' ');
    outputBuffer.push(formatted);
  };
  
  try {
    eval(code);
    output.innerHTML = outputBuffer.length > 0 
      ? outputBuffer.join('\n') 
      : '(no output)';
    output.style.color = '#68d391';
  } catch(error) {
    output.innerHTML = `❌ Error: ${error.message}`;
    output.style.color = '#fc8181';
  }
  
  console.log = originalLog;
}

function clearSandboxCode() {
  document.getElementById('sandboxCode').value = '';
  document.getElementById('sandboxOutput').innerHTML = '// Output will appear here';
  document.getElementById('sandboxOutput').style.color = '#e2e8f0';
}

document.getElementById('sandboxCode')?.addEventListener('keydown', function(e) {
  if (e.ctrlKey && e.key === 'Enter') runSandboxCode();
});
</script>

<p class="tip"><strong>💡 Tip:</strong> Use this sandbox to experiment with code from any section! Try modifying examples, testing edge cases, or practicing concepts in real-time.</p>

<div style="page-break-after: always;"></div>

<!-- FLASHCARDS -->

## 1. Variables: `let`, `const`, `var`

<div class="why">🚩 **Why it matters:** everything you write — React state, cart totals, API data — starts with choosing `const` vs `let` correctly.</div>

| Keyword  | Scope          | Reassign? | Notes                          |
|----------|----------------|-----------|--------------------------------|
| `let`    | Block          | Yes       | Use when the value will change |
| `const`  | Block          | No        | Use by default                 |
| `var`    | Function       | Yes       | Older style, avoid in new code |

### Basic Examples

```javascript
let name = "Rohit";
name = "Amit"; // allowed

const age = 25;
// age = 26; // Error: cannot reassign const

const person = { name: "Rohit" };
person.name = "Amit"; // allowed (modifying content)
// person = {}; // Error: cannot reassign
```

### Real-world Examples

#### E-commerce: Managing cart items

```javascript
// Quantity can change
let cartQuantity = 3;
cartQuantity = 5; // ✅ Allowed

// Product info doesn't change once created
const product = {
  id: 101,
  name: "Laptop",
  price: 50000
};
// product = { id: 102 }; // ❌ Error: cannot reassign

// Array of items can be modified
let cartItems = [];
cartItems.push(product); // ✅ Allowed
```

#### User authentication: Session management

```javascript
// Session token is constant
const sessionToken = "abc123xyz789";
// sessionToken = "def456"; // ❌ Error

// User status can change
let isLoggedIn = false;
isLoggedIn = true; // ✅ Allowed after login

// User profile object exists but content changes
const user = {
  id: 1,
  email: "user@example.com",
  lastLogin: null
};
user.lastLogin = new Date(); // ✅ Allowed
user.email = "newemail@example.com"; // ✅ Allowed
```

### More Examples

#### Simple: Swapping values with a temp variable

```javascript
let x = 1;
let y = 2;

const temp = x;   // remember x
x = y;            // x becomes 2
y = temp;         // y becomes 1

console.log(x, y); // 2 1
```

#### Complicated: `const` with an array of mutable items

```javascript
const cartItems = [];

// The binding (cartItems) can't be reassigned...
// cartItems = ["x"]; // ❌ Error

// ...but we CAN modify the array's contents
cartItems.push({ id: 101, name: "Keyboard", qty: 1 });
cartItems.push({ id: 102, name: "Mouse", qty: 2 });

console.log(cartItems.length); // 2
// cartItems = []; // ❌ Error (not allowed - const binding)
```

#### Complicated: Scoping with `let` vs `var` inside a block

```javascript
if (true) {
  var functionScoped = "var";   // leaks out of the block
  let blockScoped = "let";      // stays inside the block
}

console.log(functionScoped); // "var" (works - var is function-scoped)
// console.log(blockScoped); // ❌ ReferenceError (let is block-scoped)
```

<div class="quiz-box">

<h3>🧪 Self-Test — Variables (Enhanced with Explanations)</h3>

<details><summary>Q1. What does <code>const</code> actually prevent?</summary>

<div style="margin-top: 10px;">
  <div style="background: #f0fff4; border-left: 4px solid #38a169; padding: 10px; margin: 8px 0; border-radius: 4px;">
    <strong>✅ Reassigning the variable to a new value</strong>
    <p><small><strong>Why:</strong> `const` locks the <em>binding</em> (the variable reference itself), not the contents. You can't do `person = {}`, but you CAN do `person.name = "new"` because you're modifying the object's contents, not reassigning the variable binding.</small></p>
  </div>
  
  <div style="background: #fff5f5; border-left: 4px solid #e53e3e; padding: 10px; margin: 8px 0; border-radius: 4px;">
    <strong>❌ Changing an object's contents</strong>
    <p><small><strong>Why this is wrong:</strong> This is actually allowed! `const` only locks the variable binding, not the object's properties. Objects and arrays are mutable by nature, and `const` doesn't change that behavior.</small></p>
  </div>
</div>

</details>

<details><summary>Q2. What is <code>let x = "5" + 3;</code>?</summary>

<div style="margin-top: 10px;">
  <div style="background: #f0fff4; border-left: 4px solid #38a169; padding: 10px; margin: 8px 0; border-radius: 4px;">
    <strong>✅ <code>"53"</code> (a string)</strong>
    <p><small><strong>Why:</strong> The `+` operator has special behavior. When ONE operand is a string, JavaScript converts the other to a string and concatenates. So `"5" + 3` becomes `"53"`.</small></p>
  </div>
  
  <div style="background: #fff5f5; border-left: 4px solid #e53e3e; padding: 10px; margin: 8px 0; border-radius: 4px;">
    <strong>❌ <code>8</code></strong>
    <p><small><strong>Why this is wrong:</strong> Only subtraction, multiplication, division, and modulo (`- * / %`) coerce strings to numbers. The `+` operator prefers string concatenation when a string is present.</small></p>
  </div>
</div>

</details>

<div class="mood"><span>How did this feel?</span>
<input type="radio" id="mood-var-1" name="mood-var"><label for="mood-var-1">😅 Again, please</label>
<input type="radio" id="mood-var-2" name="mood-var"><label for="mood-var-2">🙂 Getting there</label>
<input type="radio" id="mood-var-3" name="mood-var"><label for="mood-var-3">😎 Mastered</label>
</div>
</div>

---
<p class="totop"><a href="#table-of-contents">⬆️ Back to top</a></p>

## 2. Conditions: `if...else` and `switch`

<div class="why">🚩 **Why it matters:** rendering logged-in vs logged-out UI, validation, access control — all conditional logic starts here.</div>

### `if...else`

```javascript
if (age >= 18) {
  console.log("Adult");
} else {
  console.log("Minor");
}

if (score >= 90) {
  console.log("Grade A");
} else if (score >= 80) {
  console.log("Grade B");
} else {
  console.log("Grade C");
}
```

### `switch`

```javascript
switch (day) {
  case "Monday":
    console.log("Start of week");
    break;
  case "Friday":
    console.log("Almost weekend");
    break;
  default:
    console.log("Regular day");
}
```

### Real-world: E-commerce Order Status

```javascript
const orderStatus = "shipped";

switch (orderStatus) {
  case "pending":
    console.log("Order received, payment processing...");
    break;
  case "confirmed":
    console.log("Payment successful, preparing shipment...");
    break;
  case "shipped":
    console.log("Order on the way, tracking: TRK123456");
    break;
  case "delivered":
    console.log("Order delivered! Please rate your experience");
    break;
  case "cancelled":
    console.log("Order cancelled, refund initiated");
    break;
  default:
    console.log("Unknown status, please contact support");
}
```

### Real-world: Banking - Account Approval

```javascript
const creditScore = 650;
const income = 50000;
const employmentYears = 2;

if (creditScore >= 750 && income >= 30000) {
  console.log("Premium account approved, interest rate: 5%");
} else if (creditScore >= 700 && income >= 25000 && employmentYears >= 1) {
  console.log("Standard account approved, interest rate: 7%");
} else if (creditScore >= 650 && income >= 20000) {
  console.log("Basic account approved, interest rate: 10%");
} else {
  console.log("Application rejected");
}
```

### Real-world: Restaurant Reservation - Discount Logic

```javascript
const dayOfWeek = "Tuesday";
const numberOfGuests = 8;
const mealTime = "lunch";

let discount = 0;

if (mealTime === "lunch" && numberOfGuests >= 5) {
  discount = 0.15; // 15% lunch group discount
} else if (dayOfWeek === "Monday" || dayOfWeek === "Tuesday") {
  discount = 0.10; // 10% weekday special
} else if (numberOfGuests >= 10) {
  discount = 0.20; // 20% for large groups
}

const basePrice = 3000;
const finalPrice = basePrice * (1 - discount);
console.log(`Final: ₹${finalPrice}`); // ₹2550
```

### More Examples

#### Simple: Chained conditions (if / else if / else)

```javascript
const marks = 74;

if (marks >= 90) {
  console.log("Grade A");
} else if (marks >= 80) {
  console.log("Grade B");
} else if (marks >= 70) {
  console.log("Grade C");
} else {
  console.log("Below C");
}
// Grade C
```

#### Complicated: Switch with shared case (grouping)

```javascript
const month = "April";

switch (month) {
  case "December":
  case "January":
  case "February":
    console.log("Winter");
    break;
  case "March":
  case "April":
  case "May":
    console.log("Spring");
    break;
  default:
    console.log("Other season");
}
// Spring
```

#### Complicated: Nested conditions for a booking system

```javascript
const booking = {
  seatsAvailable: true,
  isWeekend: false,
  hasDiscountCode: true
};

let price = 500;

if (booking.seatsAvailable) {
  if (booking.isWeekend) {
    price += 150;                       // weekend surcharge
  } else if (booking.hasDiscountCode) {
    price *= 0.9;                       // 10% off on weekdays
  }
  console.log(`Final ticket price: ₹${price}`); // ₹450
} else {
  console.log("No seats available");
}
```

<div class="quiz-box">

<h3>🧪 Self-Test — Conditions</h3>

<details><summary>Q1. What happens if you forget <code>break</code> in a <code>switch</code> case?</summary>
<p><span class="quiz-correct">✅ Execution "falls through" into the next case</span> — even if it doesn't match!</p>
<p><span class="quiz-wrong">❌ JavaScript throws an error</span> — it's silent and logical, which is what makes it dangerous.</p>
</details>

<details><summary>Q2. When is <code>switch</code> nicer than <code>if...else if</code>?</summary>
<p><span class="quiz-correct">✅ Comparing one value against many fixed options</span> — cleaner and easier to scan.</p>
<p><span class="quiz-wrong">❌ When conditions are ranges</span> — <code>score &gt;= 40</code> style checks fit <code>if</code> better.</p>
</details>

<div class="mood"><span>How did this feel?</span>
<input type="radio" id="mood-cond-1" name="mood-cond"><label for="mood-cond-1">😅 Again, please</label>
<input type="radio" id="mood-cond-2" name="mood-cond"><label for="mood-cond-2">🙂 Getting there</label>
<input type="radio" id="mood-cond-3" name="mood-cond"><label for="mood-cond-3">😎 Mastered</label>
</div>
</div>

---
<p class="totop"><a href="#table-of-contents">⬆️ Back to top</a></p>

## 3. Loops: `while`, `do...while`, `for`

<div class="why">🚩 **Why it matters:** rendering lists, processing rows, pagination — looping is how you touch many items with one idea.</div>

### `while` - Basic Example

> Syntax: `while (condition) { ... }`
> Checks the condition **first**.

```javascript
let i = 0;
while (i < 3) {
  console.log(i); // 0, 1, 2
  i++;
}
```

### `while` - Real-world: Password Validation Loop

```javascript
let attempts = 0;
let isPasswordCorrect = false;
const correctPassword = "secret123";

while (attempts < 3 && !isPasswordCorrect) {
  const entered = prompt(`Attempt ${attempts + 1}/3: Enter password`);

  if (entered === correctPassword) {
    isPasswordCorrect = true;
    console.log("Access granted!");
  } else {
    attempts++;
    console.log(`Wrong password. ${3 - attempts} attempts left`);
  }
}

if (!isPasswordCorrect) {
  console.log("Account locked due to too many failed attempts");
}
```

### `do...while` - Basic Example

> Syntax: `do { ... } while (condition);`
> Runs the body **at least once**, then checks the condition.

```javascript
let j = 0;
do {
  console.log(j); // 0, 1, 2
  j++;
} while (j < 3);
```

### `do...while` - Real-world: Menu Selection

```javascript
let userChoice;

do {
  console.log("\n=== MENU ===");
  console.log("1. View Account");
  console.log("2. Transfer Money");
  console.log("3. Withdraw");
  console.log("4. Exit");

  userChoice = prompt("Enter choice (1-4):");

  switch (userChoice) {
    case "1":
      console.log("Account Balance: ₹50,000");
      break;
    case "2":
      console.log("Processing transfer...");
      break;
    case "3":
      console.log("Processing withdrawal...");
      break;
    case "4":
      console.log("Thank you for banking with us!");
      break;
    default:
      console.log("Invalid choice, please try again");
  }
} while (userChoice !== "4");
```

### `for` - Basic Example

> Syntax: `for (initial; condition; update) { ... }`

```javascript
for (let k = 0; k < 3; k++) {
  console.log(k); // 0, 1, 2
}
```

### `for` - Real-world: Processing Monthly Transactions

```javascript
const transactions = [
  { date: "2024-01-05", amount: 5000, type: "credit" },
  { date: "2024-01-10", amount: 2000, type: "debit" },
  { date: "2024-01-15", amount: 3000, type: "credit" },
  { date: "2024-01-20", amount: 1000, type: "debit" }
];

let totalCredit = 0;
let totalDebit = 0;

for (let i = 0; i < transactions.length; i++) {
  const txn = transactions[i];

  if (txn.type === "credit") {
    totalCredit += txn.amount;
  } else {
    totalDebit += txn.amount;
  }

  console.log(`${txn.date}: ${txn.type.toUpperCase()} ₹${txn.amount}`);
}

console.log(`\nTotal Credits: ₹${totalCredit}`);
console.log(`Total Debits: ₹${totalDebit}`);
console.log(`Net: ₹${totalCredit - totalDebit}`);
```

### `for...of` - Modern Loop for Arrays

```javascript
const fruits = ["apple", "banana", "mango"];

for (const fruit of fruits) {
  console.log(fruit); // apple, banana, mango
}
```

### `for...of` - Real-world: Calculating Total Bill

```javascript
const cartItems = [
  { product: "Keyboard", price: 5000, quantity: 1 },
  { product: "Mouse", price: 800, quantity: 2 },
  { product: "Monitor", price: 15000, quantity: 1 }
];

let totalBill = 0;

for (const item of cartItems) {
  const itemTotal = item.price * item.quantity;
  totalBill += itemTotal;

  console.log(`${item.product}: ₹${item.price} × ${item.quantity} = ₹${itemTotal}`);
}

const tax = totalBill * 0.18;
const finalAmount = totalBill + tax;

console.log(`\nSubtotal: ₹${totalBill}`);
console.log(`GST (18%): ₹${tax.toFixed(2)}`);
console.log(`Total: ₹${finalAmount.toFixed(2)}`);
```

### `for...in` - Loop Through Object Keys

```javascript
const person = {
  name: "Rohit",
  age: 25,
  city: "Delhi",
  job: "Developer"
};

for (const key in person) {
  console.log(`${key}: ${person[key]}`);
}
```

### More Examples

#### Simple: `break` and `continue`

```javascript
for (let i = 0; i < 10; i++) {
  if (i === 2) continue;   // skip 2
  if (i === 5) break;      // stop at 5
  console.log(i);          // 0, 1, 3, 4
}
```

#### Complicated: Nested loop with labeled `break`

```javascript
const seats = [
  ["A1", "A2", "A3"],
  ["B1", "B2", "B3"],
  ["C1", "C2", "C3"]
];

let found = false;
outer:
for (const row of seats) {
  for (const seat of row) {
    if (seat === "B2") {
      console.log(`Found seat: ${seat}`); // Found seat: B2
      found = true;
      break outer;   // exit BOTH loops
    }
  }
}
console.log(found); // true
```

#### Complicated: while loop reading user input countdown

```javascript
let attempts = 3;
while (attempts > 0) {
  console.log(`Trying... ${attempts} left`);
  attempts--;   // 3, 2, 1
}
console.log("Locked!");   // runs after loop ends
```

<div class="quiz-box">

<h3>🧪 Self-Test — Loops</h3>

<details><summary>Q1. How many times does a <code>do...while</code> loop run at minimum?</summary>
<p><span class="quiz-correct">✅ Once</span> — the condition is checked <em>after</em> the body runs.</p>
<p><span class="quiz-wrong">❌ Zero</span> — that's plain <code>while</code>, which can skip the body entirely.</p>
</details>

<details><summary>Q2. What does <code>continue</code> do inside a loop?</summary>
<p><span class="quiz-correct">✅ Skips to the next iteration</span> — the rest of the current pass is ignored.</p>
<p><span class="quiz-wrong">❌ Exits the loop completely</span> — that's <code>break</code>.</p>
</details>

<details><summary>Q3. <code>for...in</code> vs <code>for...of</code> — which one for arrays?</summary>
<p><span class="quiz-correct">✅ <code>for...of</code></span> — it gives the <strong>values</strong>.</p>
<p><span class="quiz-wrong">❌ <code>for...in</code></span> — on arrays it gives string indexes and can surprise you.</p>
</details>

<div class="mood"><span>How did this feel?</span>
<input type="radio" id="mood-loops-1" name="mood-loops"><label for="mood-loops-1">😅 Again, please</label>
<input type="radio" id="mood-loops-2" name="mood-loops"><label for="mood-loops-2">🙂 Getting there</label>
<input type="radio" id="mood-loops-3" name="mood-loops"><label for="mood-loops-3">😎 Mastered</label>
</div>
</div>

---
<p class="totop"><a href="#table-of-contents">⬆️ Back to top</a></p>

### 🎯 Which loop should I use?

| Situation | Use | Example |
|---|---|---|
| Fixed steps, or you need the index | `for` | `for (let i = 0; i < 10; i++)` |
| Loop an array/string of **values** | `for...of` | `for (const item of cart)` |
| Loop an object's **keys** | `for...in` | `for (const key in settings)` |
| Run while a condition holds (check first) | `while` | password retries |
| Run at least once, check later | `do...while` | menus, prompt loops |
| Transform without a loop keyword | array methods | `.forEach / .map / .filter` |

> 💡 Rule of thumb: **arrays → `for...of`**, **objects → `for...in`**, everything else → `for`/`while`.

## 4. Logical Operators

<div class="why">🚩 **Why it matters:** `&&`, `||`, and `!` combine conditions — and `||`/`&&` double as clever defaulting in React.</div>

| Operator | Meaning                                    |
|----------|--------------------------------------------|
| `&&`     | AND: both must be true                     |
| `\|\|`   | OR: at least one must be true              |
| `!`      | NOT: reverses a boolean                    |
| `??`     | Nullish coalescing: fallback for null/undefined |
| `?.`     | Optional chaining: safe property access    |

```javascript
console.log(true && false);  // false
console.log(true || false);  // true
console.log(!true);          // false

const user = null;
console.log(user ?? "Guest"); // "Guest"
console.log(user?.name);      // undefined
```

### Real-world: Complex Logical Operations

#### Permission Checking (AND operator)

```javascript
const user = {
  isAdmin: false,
  isActive: true,
  email: "user@example.com"
};

// All conditions must be true
if (user.isAdmin && user.isActive && user.email) {
  console.log("User has full access");
} else {
  console.log("Access denied");
}
// Output: Access denied (isAdmin is false)
```

#### Account Eligibility (OR operator)

```javascript
const customer = {
  isPremium: false,
  totalSpent: 45000,
  referralCount: 3,
  joinedMonthsAgo: 2
};

// At least one condition must be true
const isEligibleForDiscount =
  customer.isPremium ||
  customer.totalSpent >= 50000 ||
  customer.referralCount >= 5;

console.log(isEligibleForDiscount); // false
```

#### Combining AND and OR

```javascript
const booking = {
  paymentConfirmed: true,
  isWeekend: false,
  seatsAvailable: true,
  userHasVoucher: true
};

// Complex logic: booking confirmed AND (weekend special OR has voucher) AND seats available
const canProceedBooking =
  booking.paymentConfirmed &&
  (booking.isWeekend || booking.userHasVoucher) &&
  booking.seatsAvailable;

console.log(canProceedBooking); // true
```

#### Using Nullish Coalescing for Defaults

```javascript
const userSettings = {
  theme: null,
  language: undefined,
  fontSize: 14,
  notifications: false
};

const theme = userSettings.theme ?? "light";
const language = userSettings.language ?? "en";
const fontSize = userSettings.fontSize ?? 12;
const notifications = userSettings.notifications ?? true;

console.log({theme, language, fontSize, notifications});
// { theme: "light", language: "en", fontSize: 14, notifications: false }
// Note: notifications is still false (not overridden) because false is a value, not null/undefined
```

#### Optional Chaining for Safe Navigation

```javascript
const response = {
  data: {
    user: {
      profile: {
        avatar: "https://example.com/avatar.jpg"
      }
    }
  }
};

// Without optional chaining (risky)
// console.log(response.data.user.profile.avatar); // Works but fails if any property is null

// With optional chaining (safe)
console.log(response?.data?.user?.profile?.avatar); // "https://example.com/avatar.jpg"
console.log(response?.data?.products?.list?.items); // undefined (safely returns undefined)
```

### More Examples

#### Simple: Truthy vs falsy values

```javascript
// Falsy values → 0, "", null, undefined, NaN, false
// Everything else is truthy

console.log(!!"hello");  // true  (non-empty string)
console.log(!!"");       // false (empty string)
console.log(!!0);        // false
console.log(!!100);      // true
console.log(!!undefined); // false
console.log(!![]);       // true  (empty array is truthy!)
```

#### Complicated: Short-circuit returns the actual value

```javascript
// && and || return one of the operands, not necessarily true/false

console.log("a" || "b");      // "a"     (first truthy)
console.log(""  || "b");      // "b"     (first falsy → fallback)
console.log("a" && "b");      // "b"     (last value if all truthy)
console.log(0 || "fallback"); // "fallback"

// Real-world: default value instead of if/else
const user = { name: "Rohit" };
const name = user.name || "Guest";   // "Rohit"
const missing = user.city || "Unknown"; // "Unknown"
console.log(name, missing);

// Guard: only run action if a value exists
const process = (n) => `process(${n})`;
console.log(user.id && process(user.id));  // undefined (no id, short-circuits)
```

<div class="quiz-box">

<h3>🧪 Self-Test — Logical Operators & Data Types</h3>

<details><summary>Q1. What does <code>typeof []</code> return?</summary>
<p><span class="quiz-correct">✅ <code>"object"</code></span> — arrays are objects; use <code>Array.isArray()</code> to check for an array.</p>
<p><span class="quiz-wrong">❌ <code>"array"</code></span> — that type does not exist in <code>typeof</code>.</p>
</details>

<details><summary>Q2. What is <code>"5" * 2</code>?</summary>
<p><span class="quiz-correct">✅ <code>10</code></span> — <code>*</code> coerces the string to a number.</p>
<p><span class="quiz-wrong">❌ <code>"55"</code></span> — only <code>+</code> concatenates.</p>
</details>

<details><summary>Q3. What does <code>0 || "default"</code> return, and what does <code>0 ?? "default"</code> return?</summary>
<p><span class="quiz-correct">✅ <code>0 || "default"</code> → <code>"default"</code> (0 is falsy!), but <code>0 ?? "default"</code> → <code>0</code> — <code>??</code> only falls back on <code>null</code>/<code>undefined</code>.</span></p>
</details>

<div class="mood"><span>How did this feel?</span>
<input type="radio" id="mood-logic-1" name="mood-logic"><label for="mood-logic-1">😅 Again, please</label>
<input type="radio" id="mood-logic-2" name="mood-logic"><label for="mood-logic-2">🙂 Getting there</label>
<input type="radio" id="mood-logic-3" name="mood-logic"><label for="mood-logic-3">😎 Mastered</label>
</div>
</div>

---
> 🎮 **Predict first, then flip** — say the answer out loud before opening each card.

<div class="predict">

<details><summary>🤔 <code>console.log(1 &amp;&amp; 2)</code></summary>
<p><span class="quiz-correct">✅ 2</span> — <code>&amp;&amp;</code> returns the <strong>last</strong> truthy operand.</p>
</details>

<details><summary>🤔 <code>console.log(0 || "fallback")</code></summary>
<p><span class="quiz-correct">✅ "fallback"</span> — <code>||</code> returns the <strong>first</strong> truthy operand (0 is falsy).</p>
</details>

<details><summary>🤔 <code>console.log(null ?? 0)</code></summary>
<p><span class="quiz-correct">✅ 0</span> — <code>??</code> falls back only on <code>null</code>/<code>undefined</code>.</p>
</details>

<details><summary>🤔 <code>console.log(!"hello")</code></summary>
<p><span class="quiz-correct">✅ false</span> — a non-empty string is truthy, and <code>!</code> flips it.</p>
</details>

<details><summary>🤔 <code>console.log(5 > 3 && 2 > 4)</code></summary>
<p><span class="quiz-correct">✅ false</span> — AND needs <strong>both</strong> sides true.</p>
</details>

</div>

<p class="totop"><a href="#table-of-contents">⬆️ Back to top</a></p>

### 🎯 Which loop when?

| Situation | Best loop | Why |
|---|---|---|
| You know the exact count of iterations | `for` | Counter built in |
| You iterate over array values | `for...of` | Clean, no index needed |
| You iterate over object keys | `for...in` | Enumerates keys |
| You need the index AND value | `for` or `for...of` + `.entries()` | Index access |
| You loop until a condition is met (unknown count) | `while` | Condition-checked first |
| You must run at least once | `do...while` | Condition-checked after |

```javascript
// for...of with entries — get both index and value
const colors = ["red", "green", "blue"];
for (const [i, color] of colors.entries()) {
  console.log(`${i}: ${color}`);
}
// 0: red
// 1: green
// 2: blue
```

## 5. Data Types

<div class="why">🚩 **Why it matters:** knowing what a value *is* (number, string, object…) stops most type bugs before they start.</div>

### Primitives (immutable)

- `string`
- `number`
- `bigint`
- `boolean`
- `undefined`
- `null`
- `symbol`

### Reference Types (mutable)

- `object`
- `array`
- `function`

```javascript
console.log(typeof "Hello"); // "string"
console.log(typeof 25);      // "number"
console.log(typeof {});      // "object"
console.log(typeof []);      // "object" (arrays are objects)
console.log(typeof null);    // "object" (quirk in JS)
```

### Real-world: Type Checking

```javascript
// Check if value is a number
function isValidAge(age) {
  return typeof age === "number" && age > 0 && age < 150;
}

console.log(isValidAge(25));   // true
console.log(isValidAge("25")); // false

// Check if value is an array
function processData(data) {
  if (Array.isArray(data)) {
    return data.map(item => item * 2);
  } else if (typeof data === "number") {
    return data * 2;
  }
  return null;
}

console.log(processData(5));      // 10
console.log(processData([1, 2])); // [2, 4]
```

### More Examples

#### Simple: Type conversion

```javascript
const price = "100";
console.log(Number(price));       // 100 (string → number)
console.log(Number(price) + 1);   // 101
console.log(String(25));          // "25" (number → string)
console.log(Boolean(0));          // false (0 is falsy)
console.log(Boolean("hello"));    // true (non-empty string is truthy)
```

#### Complicated: Converting user input safely

```javascript
function safeNumber(input) {
  const converted = Number(input);
  return Number.isNaN(converted) ? 0 : converted; // fallback on NaN
}

console.log(safeNumber("250"));    // 250
console.log(safeNumber("abc"));    // 0 (NaN → fallback)
console.log(safeNumber("12.5"));   // 12.5
console.log(safeNumber(""));       // 0 (Number("") is 0, not NaN!)
```

#### Complicated: typeof pitfalls

```javascript
console.log(typeof null);   // "object"  (famous bug, by design)
console.log(typeof []);     // "object"  (arrays are objects)
console.log(typeof function () {}); // "function"
console.log(Array.isArray([]));     // true (the reliable check)
console.log(Array.isArray({}));     // false
```

### NaN — the "not a number" number

> `NaN` appears whenever a conversion or math operation fails. It is **type `"number"`**, never equals itself, and needs `Number.isNaN()` to detect.

```javascript
console.log(typeof NaN);           // "number" (surprise!)
console.log(NaN === NaN);          // false — NaN is never equal to itself

const bad = Number("abc");         // NaN
console.log(bad);                  // NaN
console.log(Number.isNaN(bad));    // true ✅ — the correct way to test

// parseInt / parseFloat read numbers from the START of a string
console.log(parseInt("42px"));     // 42  (stops at the first non-digit)
console.log(parseInt("px42"));     // NaN (must start with a digit)
console.log(parseFloat("3.5rem")); // 3.5 (keeps decimals, unlike parseInt)
```

---
<p class="totop"><a href="#table-of-contents">⬆️ Back to top</a></p>

<div class="quiz-box">

<h3>🧪 Self-Test — Data Types</h3>

<details><summary>Q1. <code>NaN === NaN</code> — what does it return, and what's the right check?</summary>
<p><span class="quiz-correct">✅ false — use <code>Number.isNaN(x)</code></span>, the reliable check.</p>
<p><span class="quiz-wrong">❌ true</span> — NaN is never equal to itself.</p>
</details>

<details><summary>Q2. What do <code>parseInt("42px")</code> and <code>parseInt("px42")</code> return?</summary>
<p><span class="quiz-correct">✅ 42 and NaN</span> — parseInt reads digits from the START only.</p>
<p><span class="quiz-wrong">❌ 42 and 42</span> — parsing doesn't skip leading junk.</p>
</details>

</div>

## 6. Mutable vs Immutable

<div class="why">🚩 **Why it matters:** React re-renders rely on snapshots — mutating arrays/objects in place is the #1 cause of "UI won't update" bugs.</div>

### Primitive assignment copies the value

```javascript
let a = 10;
let b = a;
b = 20;
console.log(a); // 10 (unchanged)
console.log(b); // 20
```

### Object assignment copies the reference

```javascript
let p1 = { name: "Rohit" };
let p2 = p1;
p2.name = "Amit";
console.log(p1.name); // "Amit" (both point to same object)
```

### `const` does not freeze the contents

```javascript
const p3 = { name: "Rohit" };
p3.name = "Amit"; // ✅ allowed (modifying content)
// p3 = {}; // ❌ Error (reassigning variable)
```

### Copying objects

```javascript
let copy1 = { ...p1 };                 // shallow copy
let copy2 = Object.assign({}, p1);     // shallow copy
let deepCopy = structuredClone(p1);    // deep copy
```

### `Object.freeze` — actually lock the contents

> `const` protects the binding, not the contents. To make contents read-only, freeze them (shallow — nested objects stay editable).

```javascript
const config = Object.freeze({ theme: "dark", retries: 3 });

config.theme = "light";      // silently ignored (throws in strict mode)
console.log(config.theme);   // "dark"

// const alone does NOT do this:
const settings = { lang: "en" };
settings.lang = "hi";        // ✅ allowed — const ≠ frozen
console.log(settings.lang);  // "hi"
```

### Real-world: User Profile - Shallow Copy Problem

```javascript
const originalUser = {
  name: "Rohit",
  contact: { email: "rohit@example.com", phone: "9876543210" }
};

// Shallow copy affects nested objects
const userCopy = { ...originalUser };
userCopy.contact.email = "new@example.com";
console.log(originalUser.contact.email); // "new@example.com" (affected!)

// Deep copy preserves the original
const userDeep = structuredClone(originalUser);
userDeep.contact.email = "another@example.com";
console.log(originalUser.contact.email); // "new@example.com" (still unchanged by userDeep)
```

### Real-world: E-commerce Cart Mutation

```javascript
const originalCart = [
  { id: 1, product: "Laptop", quantity: 1 },
  { id: 2, product: "Mouse", quantity: 2 }
];

// Direct reference modifies the original
const cart1 = originalCart;
cart1[0].quantity = 10;
console.log(originalCart[0].quantity); // 10

// Copy each item so nested objects are independent
const cart2 = originalCart.map(item => ({ ...item }));
cart2[0].quantity = 5;
console.log(originalCart[0].quantity); // 10 (unchanged by cart2)
```

### More Examples

#### Simple: Primitive is copied, object is shared

```javascript
let num = 5;
let anotherNum = num;      // copies the value 5
anotherNum = 99;
console.log(num);          // 5 (unchanged)

const config = { retries: 3 };
const alias = config;      // both point to the SAME object
alias.retries = 10;
console.log(config.retries); // 10 (changed via alias!)
```

#### Complicated: Passing into functions

```javascript
let counter = 0;
const tryToChange = (n) => { n = 100; };   // receives a copy
tryToChange(counter);
console.log(counter); // 0 (unchanged — primitives pass by value)

const settings = { theme: "light" };
const changeTheme = (obj) => { obj.theme = "dark"; }; // receives the reference
changeTheme(settings);
console.log(settings.theme); // "dark" (changed — objects pass by reference)

// Object.freeze blocks mutation
const frozen = Object.freeze({ score: 10 });
// frozen.score = 20; // ❌ silently ignored (or throws in strict mode)
console.log(frozen.score); // 10
```

---
> 🎮 **Predict the output** — mutation traps. Commit to an answer before flipping!

<div class="predict">

<details><summary>🤔 <code>const a = [1, 2]; const b = a; b.push(3);</code> — what is <code>a.length</code>?</summary>
<p><span class="quiz-correct">✅ 3</span> — <code>b</code> points to the <strong>same array</strong> as <code>a</code>. Assignment copies the reference, not the array.</p>
</details>

<details><summary>🤔 <code>let s = "hi"; s[0] = "H";</code> — what is <code>s</code>?</summary>
<p><span class="quiz-correct">✅ "hi" — unchanged!</span> Strings are <strong>immutable</strong>: index assignment is silently ignored. Build a new string instead: <code>s = "H" + s.slice(1)</code>.</p>
</details>

<details><summary>🤔 <code>const copy = { ...user }; copy.tags.push("x");</code> — did <code>user.tags</code> change?</summary>
<p><span class="quiz-correct">✅ Yes — spread is a shallow copy</span>. The top level is new, but nested arrays/objects are still <strong>shared</strong>. Use <code>structuredClone(user)</code> for a true deep copy.</p>
</details>

<details><summary>🤔 <code>Object.freeze({ theme: "dark" })</code>, then <code>cfg.theme = "light"</code> — result?</summary>
<p><span class="quiz-correct">✅ Still "dark"</span> — <code>Object.freeze</code> locks the contents. <code>const</code> alone only locks the binding.</p>
</details>

</div>

<p class="totop"><a href="#table-of-contents">⬆️ Back to top</a></p>

## 7. Operators

<div class="why">🚩 **Why it matters:** `+`, `===`, `??`, spread — the everyday tools for transforming values and combining data.</div>

### Arithmetic Operators

```javascript
console.log(10 + 3);  // 13
console.log(10 - 3);  // 7
console.log(10 * 3);  // 30
console.log(10 / 3);  // 3.333...
console.log(10 % 3);  // 1   (remainder)
console.log(2 ** 3);  // 8   (power)
```

### Assignment Operators

```javascript
let score = 10;
score += 5;   // score = score + 5 → 15
score -= 3;   // score = score - 3 → 12
score *= 2;   // score = score * 2 → 24
score /= 4;   // score = score / 4 → 6

console.log(score); // 6
```

### Comparison Operators

| Operator | Meaning                          | Example           |
|----------|----------------------------------|-------------------|
| `===`    | Strict equality (value and type) | `5 === "5"` → false |
| `!==`    | Strict inequality                | `5 !== "5"` → true |
| `==`     | Loose equality (avoid)           | `5 == "5"` → true |
| `!=`     | Loose inequality                 | `5 != "5"` → false |
| `<`, `>` | Less/Greater than                | `3 < 5` → true |
| `<=`, `>=` | Less/Greater or equal           | `5 <= 5` → true |

### 🔀 Type Coercion: What Actually Happens?

**Interactive Guide:** Click on each scenario to see when and how JavaScript coerces types.

<div class="coercion-flowchart" style="background: #f7f9fc; border: 2px solid #4299e1; border-radius: 10px; padding: 14px; margin: 16px 0;">
  
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px;">
    
    <div onclick="showCoercionExample('concat')" style="padding: 12px; background: #fff; border: 1px solid #cbd5e0; border-radius: 6px; cursor: pointer; transition: all 0.2s;">
      <strong>🔗 String Concatenation (+)</strong>
      <div style="font-size: 12px; color: #718096; margin-top: 6px;">When one operand is a string</div>
    </div>
    
    <div onclick="showCoercionExample('subtract')" style="padding: 12px; background: #fff; border: 1px solid #cbd5e0; border-radius: 6px; cursor: pointer; transition: all 0.2s;">
      <strong>🔢 Numeric Operations (- * / %)</strong>
      <div style="font-size: 12px; color: #718096; margin-top: 6px;">Coerce strings to numbers</div>
    </div>
    
    <div onclick="showCoercionExample('comparison')" style="padding: 12px; background: #fff; border: 1px solid #cbd5e0; border-radius: 6px; cursor: pointer; transition: all 0.2s;">
      <strong>⚖️ Loose Comparison (==)</strong>
      <div style="font-size: 12px; color: #718096; margin-top: 6px;">Different types? Coerce first!</div>
    </div>
    
    <div onclick="showCoercionExample('strict')" style="padding: 12px; background: #fff; border: 1px solid #cbd5e0; border-radius: 6px; cursor: pointer; transition: all 0.2s;">
      <strong>✅ Strict Comparison (===)</strong>
      <div style="font-size: 12px; color: #718096; margin-top: 6px;">No coercion, no surprises!</div>
    </div>
    
  </div>
  
  <div id="coercionResult" style="margin-top: 14px; padding: 12px; background: #ebf8ff; border-left: 4px solid #2b6cb0; border-radius: 4px; display: none;">
    <p id="coercionText"></p>
    <pre id="coercionCode" style="background: #0f1622; color: #e2e8f0; padding: 10px; border-radius: 4px; margin-top: 8px; font-size: 12px; overflow-x: auto;"></pre>
  </div>
  
</div>

<script>
function showCoercionExample(type) {
  const result = document.getElementById('coercionResult');
  const text = document.getElementById('coercionText');
  const code = document.getElementById('coercionCode');
  
  const examples = {
    concat: {
      title: '🔗 String Concatenation with +',
      explanation: 'When ONE operand is a string, the + operator converts the other to a string and concatenates.',
      code: '"5" + 3      // Result: "53" (string)\n5 + "3"      // Result: "53" (string)\n"Hello" + 1  // Result: "Hello1" (string)'
    },
    subtract: {
      title: '🔢 Numeric Operations',
      explanation: 'The -, *, /, % operators coerce both operands to numbers. Strings that look like numbers become numbers!',
      code: '"5" - 3      // Result: 2 (number)\n"10" * "2"   // Result: 20 (number)\n"5" / "5"    // Result: 1 (number)\n"abc" - 3    // Result: NaN (can\'t convert "abc")'
    },
    comparison: {
      title: '⚖️ Loose Comparison (==)',
      explanation: 'The == operator coerces types when comparing different types. This can lead to unexpected results!',
      code: '"5" == 5     // Result: true (coerced to same type)\n0 == false   // Result: true (false coerced to 0)\n"" == false  // Result: true (both coerce to falsy)\nnull == undefined // Result: true (special case)'
    },
    strict: {
      title: '✅ Strict Comparison (===)',
      explanation: 'The === operator never coerces. If types differ, it\'s false. This is what you should ALWAYS use!',
      code: '"5" === 5    // Result: false (different types)\n0 === false  // Result: false (different types)\n5 === 5      // Result: true (same type & value)\nnull === undefined // Result: false (different types)'
    }
  };
  
  const example = examples[type];
  text.innerHTML = `<strong>${example.title}</strong><br>${example.explanation}`;
  code.textContent = example.code;
  result.style.display = 'block';
}
</script>

### Ternary Operator

> Syntax: `condition ? valueIfTrue : valueIfFalse`

```javascript
let result = age >= 18 ? "Adult" : "Minor";

// Nested ternary
const category = score >= 90 ? "A" : score >= 80 ? "B" : score >= 70 ? "C" : "F";
```

### Real-world: Discount Calculator with Ternary

```javascript
const purchaseAmount = 5000;
const customerType = "gold";
const isMonthEnd = true;

const discount = purchaseAmount > 10000 ? 0.20 :
                 purchaseAmount > 5000 ? 0.15 :
                 customerType === "gold" ? 0.10 : 0;

const additionalDiscount = isMonthEnd ? 0.05 : 0;
const finalDiscount = discount + additionalDiscount;
const finalAmount = purchaseAmount * (1 - finalDiscount);

console.log(`Original: ₹${purchaseAmount}`);
console.log(`Discount: ${(finalDiscount * 100).toFixed(1)}%`);
console.log(`Final: ₹${finalAmount}`);
```

### Increment and Decrement

```javascript
let count = 5;
count++;      // 6 (post-increment)
count--;      // 5 (post-decrement)
++count;      // 6 (pre-increment)
--count;      // 5 (pre-decrement)
```

### Real-world: Loop Counter with Operators

```javascript
const inventory = [
  { product: "Laptop", stock: 10 },
  { product: "Mouse", stock: 50 },
  { product: "Keyboard", stock: 30 }
];

for (let i = 0; i < inventory.length; i++) {
  const item = inventory[i];
  const status = item.stock > 0 ? "In Stock" : "Out of Stock";
  const stockLevel = item.stock <= 10 ? "Low Stock" : "Good Stock";

  console.log(`${item.product}: ${status} (${stockLevel})`);
}
```

### Spread Operator

```javascript
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5]; // [1, 2, 3, 4, 5]

const obj1 = { name: "Rohit" };
const obj2 = { ...obj1, age: 25 }; // { name: "Rohit", age: 25 }
```

### Other Operators

```javascript
typeof 25;           // "number"
typeof "hello";      // "string"
typeof true;         // "boolean"

const obj = { a: 1 };
delete obj.a;        // true (property deleted)

"name" in obj;       // true/false (check if key exists)
```

### Math — the built-in calculator

> `Math` is a global object full of helpers — no import needed. `**` is the power operator (`Math.pow` does the same).

```javascript
console.log(Math.round(4.5));   // 5    (nearest, .5 rounds up)
console.log(Math.floor(4.9));   // 4    (always down)
console.log(Math.ceil(4.1));    // 5    (always up)
console.log(Math.trunc(-4.9));  // -4   (just chops the decimals)
console.log(Math.abs(-7));      // 7
console.log(Math.max(3, 9, 2)); // 9
console.log(Math.min(3, 9, 2)); // 2
console.log(2 ** 10);           // 1024 (power — also Math.pow(2, 10))

// Random: Math.random() gives 0 to <1. Dice roll 1–6:
const dice = Math.floor(Math.random() * 6) + 1;
console.log(dice);              // e.g. 4

// Rounding for display — toFixed returns a STRING:
console.log((123.456).toFixed(2)); // "123.46"
```

### More Examples

#### Simple: Modulo for even/odd

```javascript
const n = 7;
console.log(n % 2 === 0 ? "even" : "odd"); // "odd"
```

#### Complicated: Combining operators for a checkout total

```javascript
let total = 0;

total += 500;          // + assignment
total *= 2;            // → 1000 (double)
total -= 120;          // → 880
total /= 4;            // → 220

console.log(total);          // 220
console.log(total ** 2);     // 48400 (power)
console.log(total % 3);      // 1 (remainder)
console.log(total >= 200 && total < 300); // true (comparison + logical)
```

<div class="quiz-box">

<h3>🧪 Self-Test — Operators</h3>

<details><summary>Q1. What does <code>7 % 2</code> return, and what is it good for?</summary>
<p><span class="quiz-correct">✅ <code>1</code> — the remainder. Perfect for even/odd checks and cycling through indexes.</span></p>
</details>

<details><summary>Q2. What is <code>2 ** 10</code>?</summary>
<p><span class="quiz-correct">✅ <code>1024</code> — the exponent (power) operator.</span></p>
<p><span class="quiz-wrong">❌ <code>20</code></span> — that would be <code>2 * 10</code>.</p>
</details>

<div class="mood"><span>How did this feel?</span>
<input type="radio" id="mood-ops-1" name="mood-ops"><label for="mood-ops-1">😅 Again, please</label>
<input type="radio" id="mood-ops-2" name="mood-ops"><label for="mood-ops-2">🙂 Getting there</label>
<input type="radio" id="mood-ops-3" name="mood-ops"><label for="mood-ops-3">😎 Mastered</label>
</div>
</div>

---
<p class="totop"><a href="#table-of-contents">⬆️ Back to top</a></p>

### ⚖️ Operator precedence — who wins when they mix?

> Rule of thumb: **arithmetic → comparison → logical**. When unsure, add parentheses — they always win.

| Priority | Operators | Example | Result |
|---|---|---|---|
| 1st | `( )` parentheses | `(2 + 3) * 4` | `20` |
| 2nd | `**` power | `2 ** 3 * 2` | `16` (power first) |
| 3rd | `* / %` | `2 + 4 / 2` | `4` (division first) |
| 4th | `+ -` | `1 + 2 * 3` | `7` |
| 5th | `> < >= <=` | `1 + 1 > 1` | `true` (math first) |
| 6th | `=== !== == !=` | `1 + 1 === 2` | `true` |
| 7th | `&&` | `true || false && false` | `true` (`&&` tighter) |
| 8th | `||` | `true || false` | `true` |

> ⚠️ **`??` can't be mixed** with `&&` or `||` without parentheses — SyntaxError. Wrap it: `(a || b) ?? c`.

> Assignment (`=`, `+=`…) and ternary sit at the very bottom.

### 🛡️ Optional Chaining vs `&&` Comparison

Four ways to safely access nested properties — know when to use each:

<details style="background:#fff;border:1px solid #cbd5e0;border-radius:8px;padding:12px;margin:10px 0;">
<summary style="cursor:pointer;font-weight:600;color:#2b6cb0;"><strong>🛡️ Optional Chaining (<code>?.</code>)</strong></summary>
<p>Returns <code>undefined</code> immediately if any link in the chain is null/undefined. <strong>Best for deep nesting.</strong></p>
<pre><code>const user = { address: null };
console.log(user?.address?.city);      // undefined (safe!)
console.log(user?.name);               // undefined
// Also works with arrays & functions:
console.log(arr?.[0]);                 // undefined if arr is null
console.log(func?.());                 // undefined if func is null</code></pre>
</details>

<details style="background:#fff;border:1px solid #cbd5e0;border-radius:8px;padding:12px;margin:10px 0;">
<summary style="cursor:pointer;font-weight:600;color:#2b6cb0;"><strong>⚡ Logical AND (<code>&amp;&amp;</code>)</strong></summary>
<p>Traditional guard pattern. Returns the first falsy value or the last truthy value. <strong>Verbose for deep chains.</strong></p>
<pre><code>const user = { address: null };
console.log(user && user.name);                    // "Alice"
console.log(user && user.address && user.address.city);  // null
// Common guard pattern:
if (user && user.address && user.address.city) {
  console.log(user.address.city);
}</code></pre>
</details>

<details style="background:#fff;border:1px solid #cbd5e0;border-radius:8px;padding:12px;margin:10px 0;">
<summary style="cursor:pointer;font-weight:600;color:#2b6cb0;"><strong>🔄 Nullish Coalescing (<code>??</code>)</strong></summary>
<p>Returns the right side <strong>only</strong> when left is <code>null</code>/<code>undefined</code> (NOT for <code>0</code>, <code>""</code>, <code>false</code>).</p>
<pre><code>const val = 0;
console.log(val || 42);     // 42 (0 is falsy → fallback)
console.log(val ?? 42);     // 0 (only null/undefined trigger fallback)
// Common use case:
const settings = { theme: "dark", fontSize: 0 };
const size = settings.fontSize ?? 16;  // 0 (not 16!)</code></pre>
</details>

<details style="background:#fff;border:1px solid #cbd5e0;border-radius:8px;padding:12px;margin:10px 0;">
<summary style="cursor:pointer;font-weight:600;color:#2b6cb0;"><strong>❓ Ternary / Conditional</strong></summary>
<p>Traditional if-else in expression form. <strong>Most verbose</strong> for deep nesting.</p>
<pre><code>const user = { address: null };
const city = user !== null && user.address !== null
  ? user.address.city
  : undefined;
// vs optional chaining (much cleaner):
const city2 = user?.address?.city;</code></pre>
</details>

## 8. Functions and Arrow Functions

<div class="why">🚩 **Why it matters:** every React component and every event handler is just a function — this is the core shape of React.</div>

### Function Declaration - Basic

```javascript
function greet(name) {
  return `Hello, ${name}`;
}

console.log(greet("Rohit")); // "Hello, Rohit"
```

### Function Expression

```javascript
const greet2 = function (name) {
  return `Hello, ${name}`;
};

console.log(greet2("Amit")); // "Hello, Amit"
```

### Arrow Function - Basic

```javascript
const greet3 = (name) => `Hello, ${name}`;
```

### Return Rules - Critical!

```javascript
// ✅ Implicit return (one line, no braces)
const add1 = (a, b) => a + b;

// ✅ Explicit return (with braces and return keyword)
const add2 = (a, b) => {
  return a + b;
};

// ❌ WRONG: braces but no return (returns undefined)
const add3 = (a, b) => {
  a + b; // NOT returned!
};
```

### Real-world: E-commerce Pricing Calculator

```javascript
// Function with multiple conditions
function calculateFinalPrice(basePrice, quantity, customerType) {
  let discount = 0;

  // Bulk discount
  if (quantity >= 10) {
    discount += 0.10;
  }

  // Customer type discount
  if (customerType === "gold") {
    discount += 0.05;
  } else if (customerType === "silver") {
    discount += 0.03;
  }

  const finalPrice = basePrice * quantity * (1 - discount);
  return {
    basePrice,
    quantity,
    subtotal: basePrice * quantity,
    discount: discount * 100,
    finalPrice: finalPrice.toFixed(2)
  };
}

const order = calculateFinalPrice(500, 15, "gold");
console.log(order);
// {
//   basePrice: 500,
//   quantity: 15,
//   subtotal: 7500,
//   discount: 15,
//   finalPrice: "6375.00"
// }
```

### Real-world: Password Validation (Arrow Function)

```javascript
const isValidPassword = (password) => {
  const hasMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[!@#$%^&*]/.test(password);

  return hasMinLength && hasUppercase && hasNumber && hasSpecial;
};

console.log(isValidPassword("Weak123")); // false
console.log(isValidPassword("Strong@123")); // true
```

### Real-world: Complex Data Processing

```javascript
function analyzeGrades(students) {
  let totalScore = 0;
  let topStudent = null;
  let topScore = 0;

  for (const student of students) {
    totalScore += student.grade;

    if (student.grade > topScore) {
      topScore = student.grade;
      topStudent = student;
    }
  }

  const average = totalScore / students.length;

  return {
    average: average.toFixed(2),
    topStudent: topStudent.name,
    topScore: topScore,
    passCount: students.filter(s => s.grade >= 40).length,
    failCount: students.filter(s => s.grade < 40).length
  };
}

const students = [
  { name: "Rohit", grade: 85 },
  { name: "Priya", grade: 92 },
  { name: "Amit", grade: 35 },
  { name: "Neha", grade: 78 }
];

console.log(analyzeGrades(students));
// {
//   average: "72.50",
//   topStudent: "Priya",
//   topScore: 92,
//   passCount: 3,
//   failCount: 1
// }
```

### Default Parameters

```javascript
const greet5 = (name = "Guest") => `Hello, ${name}`;

console.log(greet5()); // "Hello, Guest"
console.log(greet5("Rohit")); // "Hello, Rohit"
```

### Higher-order Function: Function as Parameter

```javascript
const applyOperation = (a, b, operation) => {
  return operation(a, b);
};

const add = (x, y) => x + y;
const multiply = (x, y) => x * y;

console.log(applyOperation(5, 3, add)); // 8
console.log(applyOperation(5, 3, multiply)); // 15
```

### Rest Parameters

```javascript
const sumAll = (...numbers) => numbers.reduce((total, n) => total + n, 0);

console.log(sumAll(1, 2));          // 3
console.log(sumAll(1, 2, 3, 4, 5)); // 15
```

#### Simple: Rest with a first argument

```javascript
const buildList = (category, ...items) => `${category}: ${items.join(", ")}`;
console.log(buildList("fruits", "apple", "mango")); // "fruits: apple, mango"
```

#### Complicated: Function returning a function (factory)

```javascript
const makeDiscounter = (percent) => (price) => price * (1 - percent);

const tenPercentOff = makeDiscounter(0.10);
const halfPrice = makeDiscounter(0.50);

console.log(tenPercentOff(1000)); // 900
console.log(halfPrice(1000));     // 500
```

### Recursion (function calling itself)

```javascript
const factorial = (n) => (n <= 1 ? 1 : n * factorial(n - 1));

console.log(factorial(5)); // 120 (5*4*3*2*1)
console.log(factorial(6)); // 720

// Complicated: Flatten a nested array with recursion
const deepFlatten = (arr) =>
  arr.reduce(
    (result, item) => result.concat(Array.isArray(item) ? deepFlatten(item) : item),
    []
  );

console.log(deepFlatten([1, [2, [3, [4]]]])); // [1, 2, 3, 4]
```

### Hoisting — what exists before its line runs

> Function **declarations** are hoisted — usable earlier in the file. `let`/`const` are not: using them before their line throws (the *temporal dead zone*).

```javascript
sayHi(); // "Hi!" ✅ works — the whole declaration is hoisted to the top

function sayHi() {
  console.log("Hi!");
}

// Arrow functions stored in const behave like any const:
// greet(); // ❌ ReferenceError — can't use before its line
const greet = () => console.log("Hello!");
greet(); // "Hello!"
```

### 📊 Interactive Hoisting Visualizer

**Understand hoisting:** JavaScript processes your code in two phases. See how variables and functions are handled!

<div class="hoisting-visualizer" style="background: #f7f9fc; border: 2px solid #4299e1; border-radius: 10px; padding: 14px; margin: 16px 0;">
  
  <div style="display: flex; gap: 8px; margin-bottom: 14px;">
    <button onclick="showHoistingPhase(1)" id="btn-phase1" style="padding: 8px 14px; background: #2b6cb0; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: 600; flex: 1;">Phase 1: Creation</button>
    <button onclick="showHoistingPhase(2)" id="btn-phase2" style="padding: 8px 14px; background: #718096; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: 600; flex: 1;">Phase 2: Execution</button>
  </div>

  <div id="hoistingCode" style="background: #0f1622; color: #e2e8f0; padding: 12px; border-radius: 6px; font-family: 'Courier New', monospace; font-size: 13px; margin-bottom: 14px;">
    <div id="hoistingPhase1" style="display: block;">
      <strong>📋 Phase 1: Creation (Variables & Functions Hoisted)</strong><br>
      <code>
        var x = undefined  <span style="color: #fc8181;">← hoisted but not assigned</span><br>
        let y = ✋ TDZ     <span style="color: #fc8181;">← temporal dead zone</span><br>
        function f() { } <span style="color: #68d391;">← fully hoisted!</span>
      </code>
    </div>
    
    <div id="hoistingPhase2" style="display: none;">
      <strong>▶️ Phase 2: Execution (Code Runs Top to Bottom)</strong><br>
      <code>
        var x = 5          <span style="color: #68d391;">← assignment happens</span><br>
        let y = 10         <span style="color: #68d391;">← assignment happens</span><br>
        f()                <span style="color: #68d391;">← can call here!</span>
      </code>
    </div>
  </div>

  <div id="hoistingExpl" style="background: #ebf8ff; border-left: 4px solid #2b6cb0; padding: 10px; border-radius: 4px; font-size: 14px;">
    <p id="hoistingText"></p>
  </div>
</div>

<script>
function showHoistingPhase(phase) {
  document.getElementById('hoistingPhase1').style.display = phase === 1 ? 'block' : 'none';
  document.getElementById('hoistingPhase2').style.display = phase === 2 ? 'block' : 'none';
  
  document.getElementById('btn-phase1').style.background = phase === 1 ? '#2b6cb0' : '#718096';
  document.getElementById('btn-phase2').style.background = phase === 2 ? '#2b6cb0' : '#718096';
  
  const explanations = {
    1: '<strong>Phase 1 - Creation:</strong> JavaScript scans your code and creates variables. Functions are fully hoisted (ready to use). <code>var</code> variables get <code>undefined</code>. <code>let</code> and <code>const</code> go into the Temporal Dead Zone (TDZ) — they exist but you can\'t access them yet.',
    2: '<strong>Phase 2 - Execution:</strong> Your code runs line by line. Assignments happen now. Variables and functions are now accessible. This is why you can call a function BEFORE it\'s declared (if it was hoisted), but not a <code>var</code> before assignment.'
  };
  
  document.getElementById('hoistingText').innerHTML = explanations[phase];
}

showHoistingPhase(1);
</script>

### Closures — a function remembers where it was born

> A closure is a function that keeps access to the variables of the place where it was created — even after the outer function has returned. You already used one: `makeDiscounter` remembered `percent`.

```javascript
const makeCounter = () => {
  let count = 0;          // private — nothing outside can touch it
  return () => ++count;   // this inner function "closes over" count
};

const next = makeCounter();
console.log(next()); // 1
console.log(next()); // 2
console.log(next()); // 3

// A new counter starts fresh — closures don't share state:
const other = makeCounter();
console.log(other()); // 1
console.log(next());  // 4 (next still remembers its own count)
```

<div class="quiz-box">

<h3>🧪 Self-Test — Functions</h3>

<details><summary>Q1. What does <code>const f = (x) =&gt; { x * 2 };</code> return when called?</summary>
<p><span class="quiz-correct">✅ <code>undefined</code></span> — with <code>{}</code> braces you must write <code>return</code> yourself.</p>
<p><span class="quiz-wrong">❌ <code>x * 2</code></span> — without <code>return</code>, the block's result is thrown away.</p>
</details>

<details><summary>Q2. Two counters made from the same factory — do they share their count?</summary>
<p><span class="quiz-correct">✅ No</span> — each factory call creates a fresh closure with its own private <code>count</code>.</p>
<p><span class="quiz-wrong">❌ Yes</span> — closures would share one variable.</p>
</details>

<details><summary>Q3. Which can be called before its line appears in the file?</summary>
<p><span class="quiz-correct">✅ A function <strong>declaration</strong></span> — it is hoisted to the top.</p>
<p><span class="quiz-wrong">❌ A <code>const</code> arrow function</span> — it sits in the temporal dead zone until its line.</p>
</details>

<div class="mood"><span>How did this feel?</span>
<input type="radio" id="mood-func-1" name="mood-func"><label for="mood-func-1">😅 Again, please</label>
<input type="radio" id="mood-func-2" name="mood-func"><label for="mood-func-2">🙂 Getting there</label>
<input type="radio" id="mood-func-3" name="mood-func"><label for="mood-func-3">😎 Mastered</label>
</div>
</div>

---
<p class="totop"><a href="#table-of-contents">⬆️ Back to top</a></p>

### 🧰 `Set` — instant de-duplication

> A `Set` holds **unique** values. Spread it back into an array and duplicates vanish — the fastest de-dup (this is what Challenge C3 needs).

```javascript
const mixed = [1, 2, 2, 3, 3, 3];
const unique = [...new Set(mixed)];
console.log(unique);              // [1, 2, 3]
console.log(new Set(mixed).size); // 3
console.log(new Set(mixed).has(2)); // true
```

---

## 📖 Worked Example: Closures — Making a Counter

**Problem:** Create a counter that increments each time it's called. Each counter should be independent.

<details style="background: #fff; border: 1px solid #cbd5e0; border-radius: 8px; padding: 12px; margin: 10px 0;">
<summary style="cursor: pointer; font-weight: 600; color: #2b6cb0;"><strong>Step 1: Understand the Problem</strong></summary>

We want:
```javascript
const counter1 = makeCounter();
const counter2 = makeCounter();

counter1();  // 1
counter1();  // 2
counter1();  // 3

counter2();  // 1 (separate counter!)
counter2();  // 2
```

Each counter is independent and remembers its own count. This is a **closure**.

</details>

<details style="background: #fff; border: 1px solid #cbd5e0; border-radius: 8px; padding: 12px; margin: 10px 0;">
<summary style="cursor: pointer; font-weight: 600; color: #2b6cb0;"><strong>Step 2: The Approach</strong></summary>

To create a closure:
1. Make a function that has a variable (count)
2. Return a function from inside it
3. The returned function can access and modify the count
4. Each call to the outer function creates a **new** closure

The key insight: **The inner function "remembers" the outer function's variables even after the outer function has finished.**

</details>

<details style="background: #fff; border: 1px solid #cbd5e0; border-radius: 8px; padding: 12px; margin: 10px 0;">
<summary style="cursor: pointer; font-weight: 600; color: #2b6cb0;"><strong>Step 3: Complete Solution</strong></summary>

```javascript
function makeCounter() {
  let count = 0;  // This will be "remembered" by the inner function
  
  return function() {
    count++;
    return count;
  };
}

const counter1 = makeCounter();
console.log(counter1());  // 1
console.log(counter1());  // 2
console.log(counter1());  // 3

const counter2 = makeCounter();  // Different closure!
console.log(counter2());  // 1 (starts fresh)
console.log(counter1());  // 4 (counter1 still at 4)
```

Notice: `counter1` and `counter2` have **separate** copies of the `count` variable!

</details>

<details style="background: #fff; border: 1px solid #cbd5e0; border-radius: 8px; padding: 12px; margin: 10px 0;">
<summary style="cursor: pointer; font-weight: 600; color: #2b6cb0;"><strong>Step 4: Variations to Try</strong></summary>

```javascript
// Variation 1: Start from a custom value
function makeCounter(start = 0) {
  let count = start;
  return () => ++count;
}

const counter = makeCounter(10);
console.log(counter());  // 11
console.log(counter());  // 12

// Variation 2: Add reset functionality
function makeCounterWithReset() {
  let count = 0;
  return {
    increment: () => ++count,
    reset: () => { count = 0; return count; }
  };
}

const cnt = makeCounterWithReset();
console.log(cnt.increment());  // 1
console.log(cnt.increment());  // 2
console.log(cnt.reset());      // 0
console.log(cnt.increment());  // 1

// Variation 3: Decrement too
function makeCounterBoth(start = 0) {
  let count = start;
  return {
    up: () => ++count,
    down: () => --count,
    value: () => count
  };
}

const calc = makeCounterBoth(5);
console.log(calc.up());     // 6
console.log(calc.down());   // 5
console.log(calc.value());  // 5
```

</details>

---

## 9. Arrays and Methods

<div class="why">🚩 **Why it matters:** `map`/`filter`/`reduce` power 90% of React list rendering and data shaping — the most used tool in the stack.</div>

```javascript
let numbers = [1, 2, 3, 4, 5];
console.log(numbers[0]); // 1
```

### Methods reference

| Method     | Syntax                                      | Purpose                            |
|------------|---------------------------------------------|------------------------------------|
| `push`     | `array.push(item)`                          | Add to end                         |
| `pop`      | `array.pop()`                               | Remove from end                    |
| `unshift`  | `array.unshift(item)`                       | Add to beginning                   |
| `shift`    | `array.shift()`                             | Remove from beginning              |
| `splice`   | `array.splice(start, deleteCount, newItem)` | Add/remove/replace at any index    |
| `slice`    | `array.slice(start, end)`                   | Copy portion (no mutation)         |
| `includes` | `array.includes(value)`                     | Check if value exists              |
| `indexOf`  | `array.indexOf(value)`                      | Find index, returns `-1` if absent |
| `lastIndexOf` | `array.lastIndexOf(value)`               | Last index of value, or `-1`       |
| `at`       | `array.at(index)`                          | Value at index (supports negative) |
| `fill`     | `array.fill(value, start?, end?)`          | Fill with value (mutates)          |
| `Array.from`| `Array.from(iterable, mapFn?)`            | Create array from iterable         |
| `keys` / `values` / `entries` | `array.keys()` etc.                | Iterate indexes / values / pairs   |
| `join`     | `array.join(separator?)`                    | Convert to string                  |
| `concat`   | `array.concat(otherArray)`                  | Combine arrays                     |
| `forEach`  | `array.forEach((el, i?) => {})`             | Loop (no return)                   |
| `map`      | `array.map(el => newValue)`                 | New array with transformed values  |
| `filter`   | `array.filter(el => condition)`             | Keep elements that match           |
| `find`     | `array.find(el => condition)`               | First match                        |
| `findIndex`| `array.findIndex(el => condition)`          | Index of first match               |
| `some`     | `array.some(el => condition)`               | True if at least one matches       |
| `every`    | `array.every(el => condition)`              | True if all match                  |
| `sort`     | `array.sort(compareFn?)`                    | Sort in place                      |
| `reverse`  | `array.reverse()`                           | Reverse in place                   |
| `flat`     | `array.flat(depth?)`                        | Flatten nested arrays              |
| `flatMap`  | `array.flatMap(el => newValue)`             | Map then flatten one level         |
| `findLast` / `findLastIndex` | `array.findLast(fn)`                        | Last match (searches from the end) |
| `toSorted` / `toReversed` | `array.toSorted(cmp)`                       | Sorted / reversed **copy** (no mutation) |
| `with`     | `array.with(index, value)`                  | Copy with one index replaced       |
| `reduce`   | `array.reduce((acc, cur) => ..., init)`     | Reduce to a single value           |

### Methods that mutate

- `push`, `pop`, `shift`, `unshift`, `splice`, `sort`, `reverse`

### Methods that return new results

- `slice`, `concat`, `map`, `filter`, `find`, `findIndex`,
  `findLast`, `findLastIndex`, `includes`, `indexOf`, `some`, `every`,
  `reduce`, `flat`, `flatMap`, `join`, `toSorted`, `toReversed`, `with`

```javascript
// ES2023: change a copy, keep the original intact
const scores = [30, 10, 20];
console.log(scores.toSorted());    // [10, 20, 30]
console.log(scores.toReversed());  // [20, 10, 30]
console.log(scores.with(1, 99));   // [30, 99, 20]
console.log(scores);               // [30, 10, 20] — untouched ✅

const names = ["Rohit", "Amit", "Priya"];
console.log(names.findLast((n) => n.length > 3)); // "Priya" (last match)
```

### Examples

```javascript
let doubled = numbers.map((n) => n * 2);
let evens = numbers.filter((n) => n % 2 === 0);
let sum = numbers.reduce((total, n) => total + n, 0);

numbers.sort((a, b) => a - b);
numbers.reverse();
```

### Utility

```javascript
Array.isArray([1, 2]); // true
Array.isArray({});      // false
```

---

### Array Method Examples

A single sample array used in most of the examples below:

```javascript
const marks = [20, 40, 50, 35, 60, 15];
```

#### `push`

> Syntax: `array.push(item1, item2, ...)`
> Adds items to the **end** of the array. Changes the **existing array**. Returns the new length.

```javascript
const fruits = ["apple", "banana"];
fruits.push("mango");
console.log(fruits); // ["apple", "banana", "mango"]
```

#### `pop`

> Syntax: `array.pop()`
> Removes the **last** item from the array. Changes the **existing array**. Returns the removed item.

```javascript
const colors = ["red", "green", "blue"];
const removed = colors.pop();
console.log(colors, removed); // ["red", "green"], "blue"
```

#### `unshift`

> Syntax: `array.unshift(item1, item2, ...)`
> Adds items to the **beginning** of the array. Changes the **existing array**. Returns the new length.

```javascript
const numbers = [2, 3, 4];
numbers.unshift(1);
console.log(numbers); // [1, 2, 3, 4]
```

#### `shift`

> Syntax: `array.shift()`
> Removes the **first** item from the array. Changes the **existing array**. Returns the removed item.

```javascript
const queue = ["first", "second", "third"];
queue.shift();
console.log(queue); // ["second", "third"]
```

#### `splice`

> Syntax: `array.splice(startIndex, deleteCount, item1?, item2?, ...)`
> Adds, removes, or replaces items at any index. Changes the **existing array**. Returns the removed items.

```javascript
const sample1 = [10, 20, 30, 40];
sample1.splice(1, 1);
console.log(sample1); // [10, 30, 40]  (remove)

const sample2 = [10, 20, 30];
sample2.splice(2, 0, 99);
console.log(sample2); // [10, 20, 99, 30]  (insert)

const sample3 = [10, 20, 30];
sample3.splice(0, 1, 100);
console.log(sample3); // [100, 20, 30]  (replace)
```

#### `slice`

> Syntax: `array.slice(startIndex?, endIndex?)`
> Copies a portion of the array into a **new array**. The original array is **not changed**.

```javascript
const letters = ["a", "b", "c", "d"];
const sliced = letters.slice(1, 3);
console.log(sliced, letters); // ["b", "c"], original unchanged
```

#### `includes`

> Syntax: `array.includes(value, fromIndex?)`
> Checks whether the array contains a value. Returns `true` or `false`. Original array is not changed.

```javascript
console.log(marks.includes(40));  // true
console.log(marks.includes(999)); // false
```

#### `indexOf`

> Syntax: `array.indexOf(value, fromIndex?)`
> Finds the **first index** of a value. Returns the index, or `-1` if not found. Original array is not changed.

```javascript
const items = ["pen", "book", "pen", "laptop"];
console.log(items.indexOf("pen"));   // 0
console.log(items.indexOf("phone")); // -1
```

#### `join`

> Syntax: `array.join(separator?)`
> Joins all items into a **new string** using a separator. Original array is not changed.

```javascript
const tags = ["html", "css", "js"];
console.log(tags.join(", ")); // "html, css, js"
```

#### `concat` and spread

> Syntax: `array.concat(array2, array3, ...)`
> Spread syntax: `[...array1, ...array2]`
> Combines arrays into a **new array**. Original arrays are not changed.

```javascript
const groupA = [1, 2];
const groupB = [3, 4];
console.log(groupA.concat(groupB));        // [1, 2, 3, 4]
console.log([...groupA, ...groupB]);       // [1, 2, 3, 4]
```

#### `forEach`

> Syntax: `array.forEach((element, index?, array?) => { ... })`
> Runs a function on each item. Does **not** return a new array. Used for side effects like printing.

```javascript
marks.forEach((mark) => {
  if (mark >= 40) {
    console.log(`Pass: ${mark}`);
  } else {
    console.log(`Fail: ${mark}`);
  }
});
```

#### `map`

> Syntax: `array.map((element, index?, array?) => newValue)`
> Creates a **new array** with each item transformed. Original array is not changed.

```javascript
const doubled = marks.map((mark) => mark * 2);
console.log(doubled); // [40, 80, 100, 70, 120, 30]
```

#### `filter`

> Syntax: `array.filter((element, index?, array?) => condition)`
> Creates a **new array** with items that pass the condition. Original array is not changed.

```javascript
const passing = marks.filter((mark) => mark >= 40);
console.log(passing); // [40, 50, 60]
```

#### `find`

> Syntax: `array.find((element, index?, array?) => condition)`
> Returns the **first item** that matches the condition, or `undefined`. Original array is not changed.

```javascript
const firstHigh = marks.find((mark) => mark >= 40);
console.log(firstHigh); // 40
```

#### `findIndex`

> Syntax: `array.findIndex((element, index?, array?) => condition)`
> Returns the **index of the first match**, or `-1` if not found. Original array is not changed.

```javascript
const highIndex = marks.findIndex((mark) => mark >= 40);
console.log(highIndex); // 1
```

#### `some`

> Syntax: `array.some((element, index?, array?) => condition)`
> Returns `true` if **at least one** item matches. Original array is not changed.

```javascript
console.log(marks.some((mark) => mark > 50)); // true
```

#### `every`

> Syntax: `array.every((element, index?, array?) => condition)`
> Returns `true` only if **all** items match. Original array is not changed.

```javascript
console.log(marks.every((mark) => mark > 0)); // true
```

#### `sort`

> Syntax: `array.sort(compareFn?)`
> Compare: `(a, b) => a - b` for ascending, `b - a` for descending.
> Sorts the **existing array in place**. Returns the same array.

```javascript
const random = [40, 1, 100, 5];
console.log([...random].sort((a, b) => a - b)); // [1, 5, 40, 100]
console.log([...random].sort((a, b) => b - a)); // [100, 40, 5, 1]
```

#### `reverse`

> Syntax: `array.reverse()`
> Reverses the order in the **existing array**. Returns the same array.

```javascript
const reverseNumbers = [1, 2, 3, 4];
reverseNumbers.reverse();
console.log(reverseNumbers); // [4, 3, 2, 1]
```

#### `flat`

> Syntax: `array.flat(depth?)`
> Flattens nested arrays into a **new array**. Original array is not changed.

```javascript
const nested = [1, [2, 3], [4, [5, 6]]];
console.log(nested.flat());   // [1, 2, 3, 4, [5, 6]]
console.log(nested.flat(2));  // [1, 2, 3, 4, 5, 6]
```

#### `flatMap`

> Syntax: `array.flatMap((element, index?, array?) => newValue)`
> Maps each item, then flattens the result by one level into a **new array**. Original array is not changed.

```javascript
const sentences = ["Hello world", "Good morning"];
const words = sentences.flatMap((s) => s.split(" "));
console.log(words); // ["Hello", "world", "Good", "morning"]
```

#### `reduce` (sum)

> Syntax: `array.reduce((accumulator, current, index?, array?) => ..., initialValue)`
> Combines all items into a **single value**. Can return a number, string, array, or object.

```javascript
const total = marks.reduce((sum, mark) => sum + mark, 0);
console.log(total); // 220
```

#### `reduce` (build object)

> Same syntax as above. Initial value can be an object `{}`.
> Builds a **new object** as the final result.

```javascript
const wordList = ["a", "b", "a", "c", "b", "a"];
const counts = wordList.reduce((acc, word) => {
  acc[word] = (acc[word] || 0) + 1;
  return acc;
}, {});
console.log(counts); // { a: 3, b: 2, c: 1 }
```

#### Chaining methods together

```javascript
const result = marks
  .filter((mark) => mark >= 40)
  .map((mark) => mark + 5)
  .reduce((sum, mark) => sum + mark, 0);

console.log(result); // 165
```

#### `forEach` vs `map`

```javascript
// forEach: no new array
const sideEffects = [];
marks.forEach((m) => sideEffects.push(m * 2));

// map: new array
const doubled2 = marks.map((m) => m * 2);
```

#### Sorting products by price

```javascript
const products = [
  { name: "Phone", price: 1200 },
  { name: "Watch", price: 200 },
  { name: "Laptop", price: 1500 }
];

const byPrice = [...products].sort((a, b) => b.price - a.price);
console.log(byPrice.map((p) => p.name)); // ["Laptop", "Phone", "Watch"]
```

#### Cleaning messy data

```javascript
const mixed = [80, 45, null, 30, undefined, 70, "absent", 90];
const cleanTotal = mixed
  .filter((m) => typeof m === "number" && !isNaN(m))
  .map((m) => (m < 40 ? 40 : m))
  .reduce((sum, m) => sum + m, 0);
console.log(cleanTotal); // 325
```

### Array Destructuring

#### Simple: Destructuring basics

```javascript
const [first, second] = ["apple", "banana", "mango"];
console.log(first, second); // "apple" "banana"
```

#### Complicated: Skipping, defaults, and rest

```javascript
const languages = ["HTML", "CSS", "JS", "Python"];

// Skip, default, and gather the rest
const [, second, third = "none", ...others] = languages;
console.log(second, third, others); // "CSS" "JS" ["Python"]

// Swap two variables (no temp variable needed)
let a = 1, b = 2;
[a, b] = [b, a];
console.log(a, b); // 2 1
```

#### Complicated: Flattening nested arrays

```javascript
const nested = [[1, 2], [3, [4]], [5]];
console.log(nested.flat());   // [1, 2, 3, [4], 5]
console.log(nested.flat(2));  // [1, 2, 3, 4, 5]

// Practical: UI tags from a list of products
const products = [
  { name: "Laptop", tags: ["tech", "work"] },
  { name: "Mouse", tags: ["tech", "gaming"] }
];
const allTags = products.map((p) => p.tags).flat();
console.log(allTags); // ["tech", "work", "tech", "gaming"]

// Same with flatMap (shorter)
const allTags2 = products.flatMap((p) => p.tags);
console.log(allTags2); // ["tech", "work", "tech", "gaming"]
```

### More Examples

#### `.at()` — read with negative index

> Returns the item at an index. Supports negative values (`-1` = last item).

```javascript
const arrAt = [10, 20, 30, 40];
console.log(arrAt.at(0));   // 10
console.log(arrAt.at(-1));  // 40
console.log(arrAt.at(-2));  // 30
console.log(arrAt.at(9));   // undefined (out of range)
```

#### `.lastIndexOf()`

> Like `indexOf`, but returns the **last** position of a value, or `-1`.

```javascript
const items2 = ["a", "b", "a", "c"];
console.log(items2.lastIndexOf("a")); // 2
console.log(items2.lastIndexOf("z")); // -1
```

#### `.fill()`

> Fills the array (or a range) with a value. **Mutates** the array.

```javascript
const filled = new Array(4).fill("x");
console.log(filled); // ["x", "x", "x", "x"]

const nums2 = [1, 2, 3, 4];
nums2.fill(0, 1, 3);       // start=1, end=3
console.log(nums2);        // [1, 0, 0, 4]
```

#### `Array.from()`

> Creates a new array from any iterable (Set, string, arguments, ...).

```javascript
const fromSet = Array.from(new Set([1, 2, 2, 3]));
console.log(fromSet); // [1, 2, 3]  (duplicates removed)

const fromString = Array.from("hello");
console.log(fromString); // ["h", "e", "l", "l", "o"]

// Optional map function
const fromMap = Array.from([1, 2, 3], (n) => n * 2);
console.log(fromMap); // [2, 4, 6]
```

#### `keys()`, `values()`, `entries()`

> Loop helpers that return iterators over indexes, values, or index/value pairs.

```javascript
const chars = ["x", "y"];

console.log([...chars.keys()]);       // [0, 1]
console.log([...chars.values()]);     // ["x", "y"]
console.log([...chars.entries()]);    // [[0, "x"], [1, "y"]]

// Practical: index + value in a loop
for (const [index, value] of chars.entries()) {
  console.log(`${index}: ${value}`);  // "0: x" then "1: y"
}
```

### Real-world: Student Grade Analysis

```javascript
const students = [
  { id: 1, name: "Rohit", marks: [85, 78, 92] },
  { id: 2, name: "Priya", marks: [95, 88, 90] },
  { id: 3, name: "Amit", marks: [45, 50, 40] },
  { id: 4, name: "Neha", marks: [88, 92, 85] }
];

// Calculate average for each student
const studentAverages = students.map((student) => ({
  name: student.name,
  average: (student.marks.reduce((sum, m) => sum + m, 0) / student.marks.length).toFixed(2)
}));

console.log(studentAverages);
// [
//   { name: "Rohit", average: "85.00" },
//   { name: "Priya", average: "91.00" },
//   { name: "Amit", average: "45.00" },
//   { name: "Neha", average: "88.33" }
// ]

// Find students who passed (average >= 50)
const passedStudents = studentAverages.filter((s) => parseFloat(s.average) >= 50);
console.log(passedStudents.length); // 3

// Get top performer
const topStudent = studentAverages.reduce((top, current) =>
  parseFloat(current.average) > parseFloat(top.average) ? current : top
);
console.log(topStudent); // { name: "Priya", average: "91.00" }
```

### Real-world: E-commerce Cart Processing

```javascript
const cart = [
  { product: "Keyboard", price: 5000, quantity: 1, discount: 0.05 },
  { product: "Mouse", price: 800, quantity: 2, discount: 0.10 },
  { product: "Monitor", price: 15000, quantity: 1, discount: 0.0 }
];

// Calculate subtotal for each item
const itemTotals = cart.map((item) => ({
  product: item.product,
  itemTotal: item.price * item.quantity,
  discountAmount: (item.price * item.quantity * item.discount).toFixed(2),
  finalPrice: (item.price * item.quantity * (1 - item.discount)).toFixed(2)
}));

console.log(itemTotals);
// [
//   { product: "Keyboard", itemTotal: 5000, discountAmount: "250.00", finalPrice: "4750.00" },
//   { product: "Mouse", itemTotal: 1600, discountAmount: "160.00", finalPrice: "1440.00" },
//   { product: "Monitor", itemTotal: 15000, discountAmount: "0.00", finalPrice: "15000.00" }
// ]

// Calculate total
const cartTotal = cart.reduce((total, item) => {
  const itemFinalPrice = item.price * item.quantity * (1 - item.discount);
  return total + itemFinalPrice;
}, 0);

const tax = cartTotal * 0.18;
const grandTotal = cartTotal + tax;

console.log(`\nCart Total: ₹${cartTotal.toFixed(2)}`);
console.log(`GST (18%): ₹${tax.toFixed(2)}`);
console.log(`Grand Total: ₹${grandTotal.toFixed(2)}`);
```

### Real-world: Finding Duplicates and Counts

```javascript
const orders = [
  { id: 101, product: "Laptop", quantity: 1 },
  { id: 102, product: "Mouse", quantity: 3 },
  { id: 103, product: "Laptop", quantity: 2 },
  { id: 104, product: "Keyboard", quantity: 1 },
  { id: 105, product: "Mouse", quantity: 1 }
];

// Count products ordered
const productCounts = orders.reduce((counts, order) => {
  counts[order.product] = (counts[order.product] || 0) + order.quantity;
  return counts;
}, {});

console.log(productCounts);
// { Laptop: 3, Mouse: 4, Keyboard: 1 }

// Find most ordered product
const mostOrdered = Object.entries(productCounts).sort((a, b) => b[1] - a[1])[0];
console.log(`Most ordered: ${mostOrdered[0]} (${mostOrdered[1]} units)`);
// Most ordered: Mouse (4 units)
```

<div class="quiz-box">

<h3>🧪 Self-Test — Arrays</h3>

<details><summary>Q1. Does <code>marks.map(m =&gt; m * 2)</code> change the original <code>marks</code> array?</summary>
<p><span class="quiz-correct">✅ No — <code>map</code> returns a brand-new array</span>; the original stays exactly the same.</p>
<p><span class="quiz-wrong">❌ Yes</span> — only <code>push</code>, <code>pop</code>, <code>splice</code>, <code>sort</code>, <code>reverse</code>, <code>fill</code> etc. mutate in place.</p>
</details>

<details><summary>Q2. What does <code>[1, 10, 2].sort()</code> return?</summary>
<p><span class="quiz-correct">✅ <code>[1, 10, 2]</code> — sorted as STRINGS ("1" &lt; "10" &lt; "2")! Fix: <code>.sort((a, b) =&gt; a - b)</code>.</span></p>
</details>

<details><summary>Q3. What does <code>[].filter(...)</code> return when nothing matches?</summary>
<p><span class="quiz-correct">✅ An empty array <code>[]</code> — never <code>null</code> or <code>undefined</code>, so chaining is always safe.</span></p>
</details>

<div class="mood"><span>How did this feel?</span>
<input type="radio" id="mood-arr-1" name="mood-arr"><label for="mood-arr-1">😅 Again, please</label>
<input type="radio" id="mood-arr-2" name="mood-arr"><label for="mood-arr-2">🙂 Getting there</label>
<input type="radio" id="mood-arr-3" name="mood-arr"><label for="mood-arr-3">😎 Mastered</label>
</div>
</div>
> 🎮 **Predict the output** — array methods rapid-fire.

<div class="predict">

<details><summary>🤔 <code>[10, 1, 2].sort()</code></summary>
<p><span class="quiz-correct">✅ [1, 10, 2]</span> — default sort compares as <strong>strings</strong>! Numbers need <code>.sort((a, b) =&gt; a - b)</code>.</p>
</details>

<details><summary>🤔 <code>[1, 2, 3].slice(-2)</code></summary>
<p><span class="quiz-correct">✅ [2, 3]</span> — negative indexes count from the end, and <code>slice</code> never mutates.</p>
</details>

<details><summary>🤔 <code>[1, 2, 3].indexOf(4)</code></summary>
<p><span class="quiz-correct">✅ -1</span> — the universal "not found" signal.</p>
</details>

<details><summary>🤔 <code>["a", "b", "c"].includes("b")</code></summary>
<p><span class="quiz-correct">✅ true</span> — <code>includes</code> returns a boolean; cleaner than <code>indexOf(...) !== -1</code>.</p>
</details>

<details><summary>🤔 <code>[1, 2, 3].at(-1)</code></summary>
<p><span class="quiz-correct">✅ 3</span> — <code>.at()</code> supports negative indexes, <code>[]</code> does not.</p>
</details>

<details><summary>🤔 <code>[1, 2, 3].flatMap(n =&gt; [n, n * 10])</code></summary>
<p><span class="quiz-correct">✅ [1, 10, 2, 20, 3, 30]</span> — <code>map</code> then flatten one level.</p>
</details>

</div>

<p class="totop"><a href="#table-of-contents">⬆️ Back to top</a></p>

---

## 📖 Worked Examples: Array Methods

### Example 1: Using `map()` to Transform Prices

**Problem:** You have an array of prices. Calculate the price with 10% tax applied.

<details style="background: #fff; border: 1px solid #cbd5e0; border-radius: 8px; padding: 12px; margin: 10px 0;">
<summary style="cursor: pointer; font-weight: 600; color: #2b6cb0;"><strong>Step 1: Understand the Problem</strong></summary>

We start with:
```javascript
const prices = [100, 200, 50];
// We want: [110, 220, 55] (each price increased by 10%)
```

We need to:
1. Take each price
2. Multiply by 1.1 (add 10%)
3. Return a new array with the results

`map()` is perfect for this!

</details>

<details style="background: #fff; border: 1px solid #cbd5e0; border-radius: 8px; padding: 12px; margin: 10px 0;">
<summary style="cursor: pointer; font-weight: 600; color: #2b6cb0;"><strong>Step 2: How `map()` Works</strong></summary>

```javascript
array.map((item) => {
  // 'item' = current element
  // return the transformed value
  return item * 1.1;
});
// Returns: [110, 220, 55]
```

Key points:
- `map()` runs the function **once PER ITEM**
- You **must return** the new value
- `map()` returns a **NEW array** (original unchanged)

</details>

<details style="background: #fff; border: 1px solid #cbd5e0; border-radius: 8px; padding: 12px; margin: 10px 0;">
<summary style="cursor: pointer; font-weight: 600; color: #2b6cb0;"><strong>Step 3: Complete Solution</strong></summary>

```javascript
const prices = [100, 200, 50];

const withTax = prices.map(price => price * 1.1);

console.log(withTax); // [110, 220, 55]
console.log(prices);  // [100, 200, 50] (original unchanged!)
```

</details>

<details style="background: #fff; border: 1px solid #cbd5e0; border-radius: 8px; padding: 12px; margin: 10px 0;">
<summary style="cursor: pointer; font-weight: 600; color: #2b6cb0;"><strong>Step 4: Variations to Try</strong></summary>

```javascript
// Variation 1: Create objects with details
const priceDetails = prices.map(price => ({
  original: price,
  tax: price * 0.1,
  total: price * 1.1
}));

// Variation 2: Format as currency
const formatted = prices.map(price => `$${(price * 1.1).toFixed(2)}`);
// Result: ["$110.00", "$220.00", "$55.00"]

// Variation 3: Chain map calls
const discounted = prices
  .map(price => price * 0.9)    // 10% off
  .map(price => price * 1.1);   // then 10% tax
```

</details>

---

### Example 2: Using `reduce()` to Sum Scores

**Problem:** You have an array of student scores. Calculate the total.

<details style="background: #fff; border: 1px solid #cbd5e0; border-radius: 8px; padding: 12px; margin: 10px 0;">
<summary style="cursor: pointer; font-weight: 600; color: #2b6cb0;"><strong>Step 1: Understand the Problem</strong></summary>

We start with:
```javascript
const scores = [85, 90, 78, 92];
// We want: 85 + 90 + 78 + 92 = 345 (the total)
```

`reduce()` is perfect for combining all items into one value.

</details>

<details style="background: #fff; border: 1px solid #cbd5e0; border-radius: 8px; padding: 12px; margin: 10px 0;">
<summary style="cursor: pointer; font-weight: 600; color: #2b6cb0;"><strong>Step 2: How `reduce()` Works</strong></summary>

```javascript
array.reduce((accumulator, item) => {
  // accumulator = running total
  // item = current element
  // return the new total
}, initialValue);
```

Breakdown:
```
Iteration 1: acc=0,      score=85  → 0 + 85 = 85
Iteration 2: acc=85,     score=90  → 85 + 90 = 175
Iteration 3: acc=175,    score=78  → 175 + 78 = 253
Iteration 4: acc=253,    score=92  → 253 + 92 = 345
Result: 345
```

</details>

<details style="background: #fff; border: 1px solid #cbd5e0; border-radius: 8px; padding: 12px; margin: 10px 0;">
<summary style="cursor: pointer; font-weight: 600; color: #2b6cb0;"><strong>Step 3: Complete Solution</strong></summary>

```javascript
const scores = [85, 90, 78, 92];

const total = scores.reduce((sum, score) => sum + score, 0);

console.log(total);  // 345
```

That's it! The `0` at the end is the starting value (accumulator starts at 0).

</details>

<details style="background: #fff; border: 1px solid #cbd5e0; border-radius: 8px; padding: 12px; margin: 10px 0;">
<summary style="cursor: pointer; font-weight: 600; color: #2b6cb0;"><strong>Step 4: Variations to Try</strong></summary>

```javascript
// Variation 1: Find average
const average = scores.reduce((sum, score) => sum + score, 0) / scores.length;
// 345 / 4 = 86.25

// Variation 2: Find highest score
const highest = scores.reduce((max, score) => score > max ? score : max, 0);
// Result: 92

// Variation 3: Convert array to object
const gradeList = scores.reduce((acc, score, index) => {
  acc['student' + (index + 1)] = score;
  return acc;
}, {});
// Result: {student1: 85, student2: 90, student3: 78, student4: 92}

// Variation 4: Sum only passing scores (>= 80)
const passingTotal = scores.reduce((sum, score) => 
  score >= 80 ? sum + score : sum, 0);
// Result: 85 + 90 + 92 = 267
```

</details>

---

## 10. Strings and Common Methods

<div class="why">🚩 **Why it matters:** formatting prices, URLs, names, and user input — string methods do the everyday cleanup in every app.</div>

Strings are **immutable** in JavaScript. Every method that "changes" a string actually returns a **new string**; the original is not modified.

```javascript
let firstName = "Rohit";
let lastName = "Kumar";
let fullName = firstName + " " + lastName;
let greeting = `Hello, ${firstName}!`;
```

### Quick reference table

| Method                     | Purpose                              | Returns          |
|----------------------------|--------------------------------------|------------------|
| `.length`                  | Number of characters                 | number           |
| `.toUpperCase()`           | Convert to uppercase                 | new string       |
| `.toLowerCase()`           | Convert to lowercase                 | new string       |
| `.trim()`                  | Remove whitespace from both ends     | new string       |
| `.trimStart()`             | Remove whitespace from start         | new string       |
| `.trimEnd()`               | Remove whitespace from end           | new string       |
| `.includes(sub)`           | Check if substring exists            | true/false       |
| `.startsWith(sub)`         | Check if it starts with substring    | true/false       |
| `.endsWith(sub)`           | Check if it ends with substring      | true/false       |
| `.indexOf(sub)`            | Position of first occurrence         | index or -1      |
| `.lastIndexOf(sub)`        | Position of last occurrence          | index or -1      |
| `.slice(start, end?)`      | Extract part of string               | new string       |
| `.substring(start, end?)`  | Extract part (no negatives)          | new string       |
| `.substr(start, length?)`  | Extract by length (deprecated)      | new string       |
| `.replace(old, new)`       | Replace first match                  | new string       |
| `.replaceAll(old, new)`    | Replace all matches                  | new string       |
| `.split(separator?)`       | Split into array                     | array            |
| `.concat(other)`           | Join strings                         | new string       |
| `.repeat(count)`           | Repeat string N times                | new string       |
| `.padStart(len, pad?)`     | Pad to length at start               | new string       |
| `.padEnd(len, pad?)`       | Pad to length at end                 | new string       |
| `.charAt(index)`           | Character at index                   | string           |
| `.charCodeAt(index)`       | Unicode of character                 | number           |
| `.at(index)`               | Character at index (supports `-1`)   | string           |
| `.match(regex)`            | Match against regex                  | array or null    |
| `.search(regex)`           | Index of regex match                 | index or -1      |
| `.localeCompare(other)`    | Compare strings for sorting          | number           |

### Template literals — build strings the modern way

> Backtick strings do three things quotes can't: interpolate expressions with `${}`, span multiple lines, and read much cleaner. You've seen them all through this book — now you know the name.

```javascript
const name = "Rohit";
const cartTotal = 499.5;

// 1. Interpolation — ANY expression inside ${ }
console.log(`Hi ${name}!`);                                 // "Hi Rohit!"
console.log(`Total: ₹${cartTotal}`);                        // "Total: ₹499.5"
console.log(`With GST: ₹${(cartTotal * 1.18).toFixed(2)}`); // "With GST: ₹589.41"

// 2. Multi-line — no \n, no concatenation
const receipt = `
=== Receipt ===
Customer: ${name}
Total:    ₹${cartTotal.toFixed(2)}
`;
console.log(receipt);

// 3. Expressions, not just variables
const items = ["pen", "book"];
console.log(`You have ${items.length} item(s): ${items.join(", ")}`);
// "You have 2 item(s): pen, book"
```

### Examples

#### `.length`

> Returns the **number of characters**. Original string is not changed.

```javascript
const text = "Hello";
console.log(text.length); // 5
```

#### `.toUpperCase()` and `.toLowerCase()`

> Return a **new string** with the case changed. Original is not modified.

```javascript
const city = "Delhi";
console.log(city.toUpperCase()); // "DELHI"
console.log(city.toLowerCase()); // "delhi"
console.log(city);               // "Delhi"
```

#### `.trim()`, `.trimStart()`, `.trimEnd()`

> Return a **new string** with whitespace removed. Useful for cleaning user input.

```javascript
const input = "  hello  ";
console.log(input.trim());       // "hello"
console.log(input.trimStart());  // "hello  "
console.log(input.trimEnd());    // "  hello"
```

#### `.includes()`

> Returns `true` or `false` depending on whether the substring exists. Case-sensitive.

```javascript
const sentence = "I love JavaScript";
console.log(sentence.includes("Java"));     // true
console.log(sentence.includes("java"));     // false
```

#### `.startsWith()` and `.endsWith()`

> Useful for checking prefixes and suffixes like file extensions or URL parts.

```javascript
const filename = "report.pdf";
console.log(filename.startsWith("report")); // true
console.log(filename.endsWith(".pdf"));     // true
```

#### `.indexOf()` and `.lastIndexOf()`

> Return the **first or last position** of a substring. Return `-1` if not found.

```javascript
const phrase = "banana";
console.log(phrase.indexOf("a"));       // 1
console.log(phrase.lastIndexOf("a"));   // 5
console.log(phrase.indexOf("z"));       // -1
```

#### `.slice()`

> Extracts part of a string into a **new string**. Supports negative indexes.

```javascript
const name = "JavaScript";
console.log(name.slice(0, 4));   // "Java"
console.log(name.slice(4));      // "Script"
console.log(name.slice(-3));     // "ipt"
```

#### `.substring()`

> Similar to `slice`, but does **not** accept negative indexes. Negative values are treated as `0`.

```javascript
const name = "JavaScript";
console.log(name.substring(0, 4)); // "Java"
console.log(name.substring(4));    // "Script"
```

#### `.replace()` and `.replaceAll()`

> Replace the **first** or **all** matches. By default the search is case-sensitive.

```javascript
const text = "Hello World";
console.log(text.replace("World", "JS"));     // "Hello JS"
console.log(text.replaceAll("l", "L"));       // "HeLLo WorLd"

// Case-insensitive with regex
console.log(text.replace(/world/i, "JS"));    // "Hello JS"
```

#### `.split()`

> Splits the string into a **new array** using a separator.

```javascript
const csv = "apple,banana,mango";
console.log(csv.split(","));      // ["apple", "banana", "mango"]

const word = "hello";
console.log(word.split(""));      // ["h", "e", "l", "l", "o"]

const sentence = "I love JS";
console.log(sentence.split(" "));  // ["I", "love", "JS"]

```

#### `.concat()`

> Joins two or more strings. `+` is usually simpler.

```javascript
const first = "Hello";
const result = first.concat(" ", "World");
console.log(result); // "Hello World"
```

#### `.repeat()`

> Repeats the string N times. Returns a **new string**.

```javascript
console.log("ha".repeat(3)); // "hahaha"
```

#### `.padStart()` and `.padEnd()`

> Pad the string to a target length. Useful for aligning IDs or numbers.

```javascript
const id = "7";
console.log(id.padStart(4, "0")); // "0007"
console.log(id.padEnd(4, "*"));   // "7***"
```

#### `.localeCompare()`

> The right way to compare/sort strings — respects case and accented letters, unlike `<` or a plain `.sort()`.

```javascript
console.log("a".localeCompare("b")); // -1 (a sorts first)
console.log("b".localeCompare("a")); // 1  (b sorts after)
console.log("é".localeCompare("e")); // 1  (accent-aware)

// Default .sort() puts ALL capitals first; localeCompare fixes it:
console.log(["apple", "Banana", "cherry"].sort()); // ["Banana", "apple", "cherry"] 😕
console.log(["apple", "Banana", "cherry"].sort((a, b) => a.localeCompare(b)));
// ["apple", "Banana", "cherry"] ✅
```

#### `.charAt()` and `.charCodeAt()`

> Get a single character or its Unicode code.

```javascript
const word = "Hello";
console.log(word.charAt(0));       // "H"
console.log(word.charCodeAt(0));   // 72
```

#### `.at()`

> Like `charAt`, but **supports negative indexes**.

```javascript
const word = "Hello";
console.log(word.at(-1)); // "o"
console.log(word.at(0));  // "H"
```

#### `.match()` and `.search()`

> Work with regular expressions. `.match` returns matches as an array, `.search` returns the index.

```javascript
const text = "Order #1234 placed";
console.log(text.match(/\d+/));    // ["1234"]
console.log(text.search(/\d+/));   // 7
```

### More Examples

#### `.substring()` vs `.slice()` — negative indexes

```javascript
console.log("hello".slice(-2));       // "lo"   (slice supports negatives)
console.log("hello".substring(-2));   // "hello" (substring treats -2 as 0)
console.log("hello".substring(1, 3)); // "el"   (can swap start/end)
```

#### `.match()` with the global flag

```javascript
const matchText = "a1 b2 c3";
console.log(matchText.match(/\d/g)); // ["1", "2", "3"]  (all digits, not just first)
```

#### `.replace()` with a function — reformatting a date

```javascript
const dateStr = "2024-05-06";
const reformattedDate = dateStr.replace(
  /(\d{4})-(\d{2})-(\d{2})/,
  (match, year, month, day) => `${day}/${month}/${year}`
);
console.log(reformattedDate); // "06/05/2024"
```

#### `.split()` with regex and limit

```javascript
console.log("one, two; three".split(/[,;]\s*/)); // ["one", "two", "three"]
console.log("a-b-c-d".split("-", 2));            // ["a", "b"]
```

#### `.search()` returns `-1` when not found

```javascript
console.log("no digits here".search(/\d/)); // -1
```

#### Combining string methods on user input

```javascript
const messyInput = "  Hello World  ";
console.log(messyInput.trim().includes("World")); // true

const orderId = "7";
console.log(orderId.padStart(3, "0")); // "007"

console.log("ab".repeat(2).split("")); // ["a", "b", "a", "b"]
```

#### Real-world snippets

##### Validate email shape

```javascript
const email = "user@example.com";
console.log(email.includes("@") && email.endsWith(".com")); // true
```

##### Get file extension

```javascript
const file = "photo.png";
const ext = file.slice(file.lastIndexOf(".") + 1);
console.log(ext); // "png"
```

##### Capitalize first letter

```javascript
const word = "javascript";
const capitalized = word.charAt(0).toUpperCase() + word.slice(1);
console.log(capitalized); // "Javascript"
```

##### Convert CSV line to array of values

```javascript
const line = "name,age,city";
const values = line.split(",");
console.log(values); // ["name", "age", "city"]
```

##### Mask part of a phone number

```javascript
const phone = "9876543210";
const masked = phone.slice(0, 4) + "*".repeat(4) + phone.slice(-2);
console.log(masked); // "9876****10"
```

##### Count words in a sentence

```javascript
const sentence = "I love JavaScript";
const count = sentence.split(" ").length;
console.log(count); // 3
```

##### Truncate long text

```javascript
const longText = "This is a very long description";
const short = longText.length > 15 ? longText.slice(0, 15) + "..." : longText;
console.log(short); // "This is a very ..."
```

#### Simple: Reversing a string

```javascript
const word = "JavaScript";
const reversed = word.split("").reverse().join("");
console.log(reversed); // "tpircSavaJ"
```

#### Complicated: Extracting and transforming parts

```javascript
const invoice = "INV-2024-0042";

// Split into parts
const parts = invoice.split("-");
console.log(parts); // ["INV", "2024", "0042"]

// Rebuild in a different format
const reformatted = `${parts[2]}/${parts[1]}`;
console.log(reformatted); // "0042/2024"

// Replace + pad combined
const invoiceNum = invoice.slice(-4);
console.log(invoiceNum.padStart(6, "0")); // "000042"
```

#### Complicated: Email domain extraction with fallback

```javascript
const emails = ["rohit@example.com", "invalid-email", "priya@company.co.in"];

emails.forEach((email) => {
  if (email.includes("@") && !email.startsWith("@") && !email.endsWith("@")) {
    const domain = email.slice(email.indexOf("@") + 1);
    console.log(`${email}  ->  domain: ${domain}`);
  } else {
    console.log(`${email}  ->  invalid`);
  }
});
// "rohit@example.com  ->  domain: example.com"
// "invalid-email  ->  invalid"
// "priya@company.co.in  ->  domain: company.co.in"
```

### Advanced Real-world Examples

#### URL Slug Generation

```javascript
const title = "Best JavaScript Learning Tips 2024";

const slug = title
  .toLowerCase()
  .trim()
  .replace(/[^\w\s-]/g, "")  // Remove special characters
  .replace(/\s+/g, "-")        // Replace spaces with hyphens
  .replace(/-+/g, "-");        // Replace multiple hyphens with single

console.log(slug); // "best-javascript-learning-tips-2024"
```

#### Password Strength Validator

```javascript
function validatePasswordStrength(password) {
  const checks = {
    minLength: password.length >= 8,
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecial: /[!@#$%^&*]/.test(password)
  };

  const passedChecks = Object.values(checks).filter(Boolean).length;

  return {
    isValid: passedChecks >= 4,
    strength: passedChecks <= 2 ? "Weak" : passedChecks === 3 ? "Medium" : "Strong",
    checks: checks
  };
}

console.log(validatePasswordStrength("Pass@123"));
// { isValid: true, strength: "Strong", checks: { ... } }
```

#### Email Parsing

```javascript
const email = "john.doe@company.co.uk";

const [username, domain] = email.split("@");
const [subdomain, ...extension] = domain.split(".");

console.log({
  username,      // "john.doe"
  domain,        // "company.co.uk"
  subdomain,     // "company"
  extension: extension.join(".") // "co.uk"
});
```

#### Query String Parser

```javascript
const queryString = "?name=Rohit&age=25&city=Delhi";

const params = queryString
  .slice(1)  // Remove "?"
  .split("&")
  .reduce((obj, pair) => {
    const [key, value] = pair.split("=");
    obj[key] = decodeURIComponent(value);
    return obj;
  }, {});

console.log(params); // { name: "Rohit", age: "25", city: "Delhi" }
```

#### Text Statistics

```javascript
const text = "JavaScript is awesome. JavaScript is powerful. JavaScript is fun!";

const wordCount = text.split(/\s+/).length;
const sentenceCount = text.split(/[.!?]+/).filter(s => s.trim()).length;
const characterCount = text.replace(/\s/g, "").length;
const averageWordLength = (text.replace(/\s/g, "").length / wordCount).toFixed(2);

console.log({
  wordCount,           // 9
  sentenceCount,       // 3
  characterCount,      // 57
  averageWordLength    // "6.33"
});
```

### Split only once — `"i-l-s"` → `["i", "l-s"]`

`split("-", 2)` **drops** the rest (`["i","l"]`) — it does not keep it together. To split at only the **first** separator:

```javascript
// Way 1 (recommended): split + rest + join
const input = "i-l-s";
const [first, ...restParts] = input.split("-");
console.log([first, restParts.join("-")]); // ["i", "l-s"]

// Way 2: indexOf + slice
const idx = input.indexOf("-");
console.log([input.slice(0, idx), input.slice(idx + 1)]); // ["i", "l-s"]

// Edge case: no separator at all
const [head, ...tail] = "abc".split("-");
console.log([head, tail.join("-")]); // ["abc", ""]
```

<div class="tip">💡 <strong>Real-world:</strong> parse settings like <code>"color=blue"</code> this way — the value itself may contain <code>=</code>, so split on the <strong>first</strong> one only.</div>

```javascript
const setting = "color=blue";
const eqIndex = setting.indexOf("=");
console.log([setting.slice(0, eqIndex), setting.slice(eqIndex + 1)]);
// ["color", "blue"]
```

<div class="quiz-box">

<h3>🧪 Self-Test — Strings</h3>

<details><summary>Q1. What does <code>"hello"[-1]</code> return?</summary>
<p><span class="quiz-correct">✅ <code>undefined</code> — negative indexes don't work with <code>[]</code>; use <code>.at(-1)</code> instead.</span></p>
</details>

<details><summary>Q2. After <code>const s = " hi ".trim();</code> — what is <code>s</code>, and did <code>" hi "</code> change?</summary>
<p><span class="quiz-correct">✅ <code>s</code> is <code>"hi"</code>, and the original string is unchanged — strings are immutable; methods return new strings.</span></p>
</details>

<details><summary>Q3. What does <code>"a-b-c".split("-", 2)</code> return?</summary>
<p><span class="quiz-correct">✅ <code>["a", "b"]</code> — the limit <em>drops</em> the rest, it does NOT keep "b-c" together. Use split + rest to split once.</span></p>
</details>

<div class="mood"><span>How did this feel?</span>
<input type="radio" id="mood-str-1" name="mood-str"><label for="mood-str-1">😅 Again, please</label>
<input type="radio" id="mood-str-2" name="mood-str"><label for="mood-str-2">🙂 Getting there</label>
<input type="radio" id="mood-str-3" name="mood-str"><label for="mood-str-3">😎 Mastered</label>
</div>
</div>

---
<p class="totop"><a href="#table-of-contents">⬆️ Back to top</a></p>

## 11. Objects

<div class="why">🚩 **Why it matters:** JSON — the format of every API — *is* JS objects; reading/writing them is how you talk to any server.</div>

### Basic Object Operations

```javascript
let student = {
  name: "Rohit",
  age: 25,
  course: "JS"
};

console.log(student.name);    // dot notation
console.log(student["name"]); // bracket notation

student.city = "Delhi";
student.age = 26;

delete student.course;

"name" in student; // true
```

### `for...in` loop

```javascript
for (let key in student) {
  console.log(key, student[key]);
}
// Output:
// name Rohit
// age 26
// city Delhi
```

### Built-in helpers

```javascript
Object.keys(student);   // ["name", "age", "city"]
Object.values(student); // ["Rohit", 26, "Delhi"]
Object.entries(student);
// [["name", "Rohit"], ["age", 26], ["city", "Delhi"]]
```

#### 🔁 Loop over entries the modern way

`Object.entries` + `for...of` + destructuring:

```javascript
const student = { name: "Rohit", age: 26, city: "Delhi" };
for (const [key, value] of Object.entries(student)) {
  console.log(key + ": " + value);
}
// name: Rohit
// age: 26
// city: Delhi
```

### Methods and `this`

> A method is a function stored in an object. Inside a shorthand method, `this` means **"the object before the dot"** at call time.

```javascript
const account = {
  owner: "Rohit",
  balance: 1000,
  // shorthand method — no ": function" needed
  deposit(amount) {
    this.balance += amount;   // this === account
    return this.balance;
  },
  describe() {
    return `${this.owner} has ₹${this.balance}`;
  }
};

console.log(account.deposit(500)); // 1500
console.log(account.describe());   // "Rohit has ₹1500"

// ⚠️ Arrow functions do NOT get their own `this` —
// use shorthand/regular methods when you need it.
```

### Copying

```javascript
let copy1 = { ...student };
let copy2 = Object.assign({}, student);
```

### Real-world: User Authentication Object

```javascript
const user = {
  id: 12345,
  email: "user@example.com",
  password: "hashed_password",
  profile: {
    firstName: "Rohit",
    lastName: "Kumar",
    avatar: "https://example.com/avatar.jpg",
    bio: "JavaScript Developer"
  },
  settings: {
    theme: "dark",
    notifications: true,
    language: "en"
  },
  createdAt: new Date("2023-01-15"),
  lastLogin: new Date(),
  isActive: true
};

// Access nested properties
console.log(user.profile.firstName);  // "Rohit"
console.log(user.settings.theme);     // "dark"

// Update nested property
user.settings.theme = "light";
user.lastLogin = new Date();

// Check multiple conditions
const isValidUser = user.isActive && user.email.includes("@");
console.log(isValidUser); // true
```

### Real-world: E-commerce Product Object

```javascript
const product = {
  id: "PROD-001",
  name: "Wireless Keyboard",
  price: 3500,
  currency: "INR",
  stock: 150,
  category: "Electronics",
  subcategory: "Input Devices",
  description: "Premium mechanical keyboard with RGB lighting",
  specifications: {
    brand: "TechPro",
    color: "Black",
    switchType: "MechSwitch",
    layout: "Full Size",
    connectivity: "Wireless",
    batteryLife: "40 hours"
  },
  pricing: {
    original: 5000,
    discount: 0.30,
    finalPrice: 3500,
    taxRate: 0.18
  },
  ratings: {
    average: 4.5,
    count: 2145,
    distribution: {
      5: 1500,
      4: 450,
      3: 150,
      2: 30,
      1: 15
    }
  },
  images: [
    "https://example.com/img1.jpg",
    "https://example.com/img2.jpg",
    "https://example.com/img3.jpg"
  ],
  inStock: true,
  reviews: [
    { user: "John", rating: 5, comment: "Excellent keyboard!" },
    { user: "Sarah", rating: 4, comment: "Good quality, minor issues" }
  ]
};

// Calculate final price with tax
const finalPriceWithTax = product.pricing.finalPrice * (1 + product.pricing.taxRate);
console.log(`Final Price: ₹${finalPriceWithTax.toFixed(2)}`); // ₹4130.00

// Calculate average rating from distribution
const totalRatings = Object.values(product.ratings.distribution).reduce((a, b) => a + b, 0);
console.log(`Total Reviews: ${totalRatings}`); // 2145
```

### Real-world: Order Processing Object

```javascript
const order = {
  orderId: "ORD-2024-001",
  customer: {
    id: "CUST-001",
    name: "Priya Sharma",
    email: "priya@example.com",
    phone: "9876543210",
    address: {
      street: "123 MG Road",
      city: "Bangalore",
      state: "Karnataka",
      pincode: "560001"
    }
  },
  items: [
    { productId: "PROD-001", name: "Keyboard", price: 3500, quantity: 1 },
    { productId: "PROD-002", name: "Mouse", price: 1200, quantity: 2 },
    { productId: "PROD-003", name: "Monitor", price: 12000, quantity: 1 }
  ],
  pricing: {
    subtotal: 0,
    taxRate: 0.18,
    shippingCost: 200,
    discount: 0,
    total: 0
  },
  status: "pending",
  payment: {
    method: "credit_card",
    status: "completed",
    transactionId: "TXN-12345"
  },
  shippingDetails: {
    method: "express",
    estimatedDelivery: new Date("2024-01-25"),
    trackingNumber: "TRACK123456"
  },
  createdAt: new Date(),
  updatedAt: new Date()
};

// Calculate subtotal
order.pricing.subtotal = order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

// Calculate total with tax and shipping
order.pricing.total = order.pricing.subtotal + (order.pricing.subtotal * order.pricing.taxRate) + order.pricing.shippingCost - order.pricing.discount;

console.log(order.pricing);
// { subtotal: 17900, taxRate: 0.18, shippingCost: 200, discount: 0, total: 21322 }

// Get order summary
const orderSummary = {
  orderId: order.orderId,
  customerName: order.customer.name,
  itemCount: order.items.length,
  status: order.status,
  total: order.pricing.total,
  shippingAddress: `${order.customer.address.street}, ${order.customer.address.city}`
};

console.log(orderSummary);
```

### Real-world: Merging Objects (Shallow and Deep)

```javascript
const userDefaults = {
  theme: "light",
  language: "en",
  notifications: true
};

const userPreferences = {
  theme: "dark",
  fontSize: 14
};

// Merge with spread operator (shallow)
const mergedSettings = { ...userDefaults, ...userPreferences };
console.log(mergedSettings);
// { theme: "dark", language: "en", notifications: true, fontSize: 14 }

// Object.assign
const merged2 = Object.assign({}, userDefaults, userPreferences);
console.log(merged2); // Same result as above
```

---

<div style="page-break-after: always;"></div>

## 📋 Quick Reference Cheat Sheet (One-Page Summary)

This is a condensed summary of all 12 sections for quick lookup and printing.

> 💡 **New in the HTML study app:** Spaced-repetition flashcards, personalized learning path, progress tracking with "Mark complete" buttons, quiz-answer persistence, and a dark/light theme toggle. Open `Javascript_essentials_part1_study_app.html` in a browser to use them.

<div class="cheat-sheet-preview" style="margin: 20px 0; background: #ebf8ff; border: 2px solid #4299e1; border-radius: 10px; padding: 16px;">

### Part 1: Variables, Conditions, Loops

| Topic | Key Points |
|-------|-----------|
| **Variables** | `const` by default • `let` when value changes • Block scope for both • `var` = avoid |
| **Conditions** | `if/else/else if` for ranges • `switch` for fixed options (need `break`) • Ternary `? :` for inline |
| **Loops** | `for` = known count • `while` = unknown count • `do...while` = at least once • `for...of` = values • `for...in` = keys |
| **Logical** | `&&` (AND) • `\|\|` (OR) • `!` (NOT) • Short-circuit evaluation • 6 falsy values only |

### Part 2: Data & Operators

| Topic | Key Points |
|-------|-----------|
| **Types** | 7 primitives (string, number, boolean, null, undefined, symbol, bigint) • Objects/Arrays mutable • `Number.isNaN()` for NaN |
| **Mutability** | Primitives copied on assignment • Objects by reference • `const` ≠ frozen • `Object.freeze()` for immutability |
| **Operators** | Always `===`, never `==` • `??` (nullish) vs `\|\|` (falsy) • `?.` optional chaining • `...` spread/rest |
| **Math** | Arithmetic: `+ - * / % **` • Comparison: `< > <= >=` • Modulo for even/odd • Ternary `condition ? true : false` |

### Part 3: Functions, Arrays, Strings

| Topic | Key Points |
|-------|-----------|
| **Functions** | Declaration vs Expression vs Arrow • Implicit return (no braces) vs explicit • Closures remember outer scope • Hoisting: functions full, `let`/`const` TDZ |
| **Arrays** | `map()` transform • `filter()` keep matches • `reduce()` fold to value • `find()` first match • `.at(-1)` negative index • `toSorted()` non-mutating |
| **Strings** | Immutable (methods return new) • `.slice()` copy part • `.split()` → array • `.join()` ← array • Template literals `` ` `` for `${}` • `.trim()` whitespace |

### Part 4: Objects & Best Practices

| Topic | Key Points |
|-------|-----------|
| **Objects** | Dot notation `obj.key` • Bracket notation `obj["key"]` • Destructuring `{ x, y } = obj` • `Object.keys/values/entries()` |
| **Spread** | `{ ...obj }` shallow copy •  `[...arr]` shallow copy • Nested objects still shared • Use `structuredClone()` for deep copy |
| **`this`** | Points to object before dot at call time • Arrow functions: no own `this` • Methods: use shorthand or regular functions |
| **Golden Rules** | 1. `const` default 2. `===` always 3. Immutable strings 4. Mutable objects 5. Sort numbers: `(a,b) => a - b` 6. Switch needs `break` |

### Common Pitfalls Checklist

- [ ] Assignment `=` vs comparison `===` in conditions
- [ ] Sorting numbers without compare function
- [ ] `push` returns length, not array
- [ ] Missing `break` in `switch` (fall-through)
- [ ] `map` without `return` when using braces
- [ ] `const` doesn't freeze object contents
- [ ] Spread is shallow copy (nested objects shared)
- [ ] NaN ≠ NaN (use `Number.isNaN()`)
- [ ] Strings immutable (can't change by index)
- [ ] Mutating array during iteration (use `filter`)

</div>

### 📥 Download & Print

To create a printable PDF:
1. Click your browser's **Print** button (Ctrl+P / Cmd+P)
2. Choose "Save as PDF"
3. Print from the PDF viewer

<button onclick="window.print()" style="padding: 10px 20px; background: #2b6cb0; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: 600; font-size: 14px; margin-top: 10px;">🖨️ Print This Cheat Sheet</button>

---

<p class="totop"><a href="#table-of-contents">⬆️ Back to top</a></p>

## 🎓 Completion Summary

**You've completed JavaScript Essentials — Part 1!**

### What You've Learned (12 Sections)

✅ Variables & scoping (`let`, `const`, `var`)  
✅ Conditions & control flow (`if/else`, `switch`)  
✅ Loops & iteration (`for`, `while`, `for...of`)  
✅ Logical operators & truthiness  
✅ Data types & type conversions  
✅ Mutability & references  
✅ All operators (arithmetic, comparison, logical, ternary)  
✅ Functions & closures  
✅ Arrays & array methods (map, filter, reduce, etc.)  
✅ Strings & string methods  
✅ Objects & destructuring  
✅ Symbol operators & precedence  

### Common Pitfalls You Know to Avoid (12 Bugs)

🐞 Assignment vs comparison  
🐞 Number sorting  
🐞 `push()` returns length  
🐞 Missing `switch` `break`  
🐞 Infinite loops  
🐞 `map` without return  
🐞 Immutable strings  
🐞 `const` vs `Object.freeze()`  
🐞 Shallow vs deep copy  
🐞 Type coercion  
🐞 Mutating during iteration  
🐞 `NaN` quirks  

### Practice You've Done

💪 10 exercises (Warm-up, Standard, Challenging)  
💪 9 challenges (Real-world scenarios)  
💪 19 solutions (Verified)  
💪 10 flashcards (Concepts)  
💪 12 spot-the-bug quizzes  
💪 11 self-test quizzes  
💪 15 predict-the-output cards  
💪 9 mood checks  

### Next Steps → Part 2 (Coming Soon)

🚀 **Promises & async/await** — Async programming  
🚀 **Error handling** — try/catch/finally  
🚀 **Classes & OOP** — Object-oriented programming  
🚀 **Modules** — import/export  
🚀 **Generators** — Advanced patterns  

---

## 🏆 You Did It!

Congratulations on completing JavaScript Essentials Part 1. You now have a solid foundation in sync JavaScript fundamentals. Use this knowledge to build real projects, and revisit this guide whenever you need a refresher.

**Keep learning, keep building! 🚀**

<p class="totop"><a href="#table-of-contents">⬆️ Back to top</a></p>

---

*Last updated: 2026-09-01 | Interactive Edition v3 with Phase 1 Enhancements | Part 1 Complete ✅*

### Real-world: Extracting Data from Objects

```javascript
const userData = {
  id: 1,
  name: "Rohit",
  email: "rohit@example.com",
  profile: { bio: "Developer", location: "Delhi" },
  settings: { theme: "dark", notifications: true }
};

// Extract specific keys
const { name, email } = userData;
console.log(name, email); // "Rohit" "rohit@example.com"

// Extract nested property
const { profile: { bio } } = userData;
console.log(bio); // "Developer"

// Get all values for display
const displayInfo = Object.entries(userData)
  .filter(([key]) => !key.includes("settings"))
  .map(([key, value]) => `${key}: ${typeof value === "object" ? JSON.stringify(value) : value}`);

console.log(displayInfo);
// ["id: 1", "name: Rohit", "email: rohit@example.com", ...]
```

### More Examples

#### Simple: Computed property keys

```javascript
const langKey = "language";
const userPrefs = {
  [langKey]: "English",       // key comes from a variable
  theme: "dark"
};
console.log(userPrefs.language); // "English"
```

#### Complicated: Destructuring with default values

```javascript
const settings = { theme: "dark", fontSize: 14 };

// Pull values out, with a fallback if a key is missing
const { theme = "light", fontSize = 12, notifications = true } = settings;
console.log(theme, fontSize, notifications);
// "dark", 14, true  (notifications was missing, so default applied)

// Rename while destructuring
const { theme: colorScheme } = settings;
console.log(colorScheme); // "dark"
```

#### Complicated: Nested destructuring with rest

```javascript
const apiResponse = {
  status: 200,
  data: {
    id: 55,
    profile: { name: "Rohit", city: "Delhi" }
  }
};

const {
  status,
  data: { id, profile: { name } },
  ...meta
} = apiResponse;

console.log(status, id, name); // 200, 55, "Rohit"
console.log(meta); // {} (nothing left over)
```

#### Complicated: Checking if a key exists

```javascript
const product = { id: 101, name: "Laptop" };

console.log("name" in product);  // true
console.log("price" in product); // false

// Guard before accessing (avoids 'undefined' surprise)
if ("price" in product) {
  console.log(product.price);
} else {
  console.log("price key missing"); // runs
}
```

<div class="interactive-tool" style="background:#f7f9fc;border:2px solid #4299e1;border-radius:12px;padding:18px 22px;margin:18px 0;">

### 📖 Worked Example: Object Destructuring (Step-by-Step)

Let's extract values from a profile object — one step at a time:

<details style="background:#fff;border:1px solid #cbd5e0;border-radius:8px;padding:12px;margin:10px 0;">
<summary style="cursor:pointer;font-weight:600;color:#2b6cb0;"><strong>Step 1: Understand the Problem</strong></summary>

We have a profile object and need several values — the old way needs one line per property:

```javascript
const profile = {
  name: "Rohit",
  role: "Developer",
  city: "Bengaluru",
  skills: ["JS", "HTML", "CSS"]
};

// Old way (repetitive):
const name = profile.name;
const role = profile.role;
```

</details>

<details style="background:#fff;border:1px solid #cbd5e0;border-radius:8px;padding:12px;margin:10px 0;">
<summary style="cursor:pointer;font-weight:600;color:#2b6cb0;"><strong>Step 2: Destructuring Anatomy</strong></summary>

List the property names you want inside `{}` — they must match the object's keys:

```javascript
const { propertyA, propertyB } = object;
//  ↑ new constants  ↑ keys to pull out
```

</details>

<details style="background:#fff;border:1px solid #cbd5e0;border-radius:8px;padding:12px;margin:10px 0;">
<summary style="cursor:pointer;font-weight:600;color:#2b6cb0;"><strong>Step 3: Complete Solution (defaults & renaming)</strong></summary>

```javascript
const { name, role, city, country = "India" } = profile;

console.log(name);    // "Rohit"
console.log(country); // "India" (default — key doesn't exist)

// Rename while destructuring:
const { name: fullName } = profile;
console.log(fullName); // "Rohit"
```

</details>

<details style="background:#fff;border:1px solid #cbd5e0;border-radius:8px;padding:12px;margin:10px 0;">
<summary style="cursor:pointer;font-weight:600;color:#2b6cb0;"><strong>Step 4: Try Variations</strong></summary>

```javascript
// Variation 1: Destructure in function parameters
function introduce({ name, role }) {
  return `${name} works as a ${role}`;
}
console.log(introduce(profile)); // "Rohit works as a Developer"

// Variation 2: Destructure arrays
const [first, second] = profile.skills;
console.log(first, second); // "JS" "HTML"

// Variation 3: Skip items with holes
const [, , third] = profile.skills;
console.log(third); // "CSS"

// Variation 4: Nested destructuring
const { skills: { 0: firstSkill } } = profile;
console.log(firstSkill); // "JS"
```

</details>

</div>

### 🎯 `this` Context Comparison

`this` is decided by **how a function is called**, not where it's defined. Click each scenario:

<details style="background:#fff;border:1px solid #cbd5e0;border-radius:8px;padding:12px;margin:10px 0;">
<summary style="cursor:pointer;font-weight:600;color:#2b6cb0;"><strong>📌 Method Call: <code>obj.method()</code></strong></summary>
<p>When called as a method on an object, <code>this</code> = the object before the dot.</p>
<pre><code>const user = {
  name: "Alice",
  greet() { console.log(this.name); }  // this = user
};
user.greet(); // "Alice"</code></pre>
</details>

<details style="background:#fff;border:1px solid #cbd5e0;border-radius:8px;padding:12px;margin:10px 0;">
<summary style="cursor:pointer;font-weight:600;color:#2b6cb0;"><strong>🔧 Standalone: <code>func()</code></strong></summary>
<p>When called standalone, <code>this</code> = <code>undefined</code> (strict mode) or <code>globalThis</code>.</p>
<pre><code>function showThis() { console.log(this); }
showThis(); // undefined (strict mode)</code></pre>
</details>

<details style="background:#fff;border:1px solid #cbd5e0;border-radius:8px;padding:12px;margin:10px 0;">
<summary style="cursor:pointer;font-weight:600;color:#2b6cb0;"><strong>➡️ Arrow Function: <code>() =&gt; {}</code></strong></summary>
<p>Arrow functions have <strong>no own <code>this</code></strong> — they inherit from the enclosing scope!</p>
<pre><code>const user = {
  name: "Alice",
  greet: () => console.log(this.name)  // undefined! inherits outer this
};</code></pre>
</details>

<details style="background:#fff;border:1px solid #cbd5e0;border-radius:8px;padding:12px;margin:10px 0;">
<summary style="cursor:pointer;font-weight:600;color:#2b6cb0;"><strong>🏗️ Constructor: <code>new Func()</code></strong></summary>
<p>With <code>new</code>, <code>this</code> = the newly created object instance.</p>
<pre><code>function Person(name) { this.name = name; }  // this = new object
const alice = new Person("Alice");</code></pre>
</details>

<div class="quiz-box">

<h3>🧪 Self-Test — Objects</h3>

<details><summary>Q1. Inside a method, what does <code>this</code> refer to?</summary>
<p><span class="quiz-correct">✅ The object <strong>before the dot</strong></span> — <code>account.deposit()</code> makes <code>this</code> = <code>account</code>.</p>
<p><span class="quiz-wrong">❌ The function itself / the global object</span> — <code>this</code> is decided by the call, not the definition.</p>
</details>

<details><summary>Q2. What does <code>Object.keys({ a: 1, b: 2 })</code> return?</summary>
<p><span class="quiz-correct">✅ <code>["a", "b"]</code></span> — an array of the keys.</p>
<p><span class="quiz-wrong">❌ <code>[1, 2]</code></span> — that's <code>Object.values</code>.</p>
</details>

<details><summary>Q3. When is bracket notation required instead of a dot?</summary>
<p><span class="quiz-correct">✅ When the key is dynamic or has spaces</span> — <code>user["first name"]</code>, <code>user[keyName]</code>.</p>
<p><span class="quiz-wrong">❌ Never — dot always works</span> — dot fails on keys with spaces or from variables.</p>
</details>

<div class="mood"><span>How did this feel?</span>
<input type="radio" id="mood-obj-1" name="mood-obj"><label for="mood-obj-1">😅 Again, please</label>
<input type="radio" id="mood-obj-2" name="mood-obj"><label for="mood-obj-2">🙂 Getting there</label>
<input type="radio" id="mood-obj-3" name="mood-obj"><label for="mood-obj-3">😎 Mastered</label>
</div>
</div>

---
---

### 🔁 Looping over an object with `Object.entries`

`Object.entries(obj)` returns `[key, value]` pairs — perfect for `for...of` when you need both.

```javascript
const user = { name: "Rohit", role: "admin", active: true };

// Old way: for...in (keys only)
for (const key in user) {
  console.log(key + ": " + user[key]);
}
// name: Rohit
// role: admin
// active: true

// Modern way: for...of + entries (key + value together)
for (const [key, value] of Object.entries(user)) {
  console.log(`${key}: ${value}`);
}
// name: Rohit
// role: admin
// active: true

// Bonus: Object.keys (just keys), Object.values (just values)
console.log(Object.keys(user));   // ["name", "role", "active"]
console.log(Object.values(user)); // ["Rohit", "admin", true]
```

<p class="totop"><a href="#table-of-contents">⬆️ Back to top</a></p>

## 12. Symbols Cheat Sheet

| Symbol           | Purpose                                  |
|------------------|------------------------------------------|
| `()`             | Parameters, conditions, function calls   |
| `{}`             | Code block, function body, or object     |
| `[]`             | Array literal or index/property access   |
| `=>`             | Defines an arrow function                |
| `...`            | Spread or rest operator                  |
| `? :`            | Ternary: short `if...else`               |
| `**`             | Power: `2 ** 3` = 8                      |
| `??`             | Nullish coalescing                       |
| `?.`             | Optional chaining                        |
| `&&` `\|\|` `!`  | Logical AND, OR, NOT                     |
| `=` `+=` `-=` ... | Assignment operators                     |
| `===` `!==`      | Strict equality / inequality             |
| `typeof`         | Check datatype                           |
| `**`          | Power (exponent): `2 ** 10`             | number           |
| `delete`         | Remove an object property                |

### Symbols in action - combined example

```javascript
const user = { name: "Rohit", prefs: { theme: null } };

// Arrow (=>) + template literal () + optional chaining (?.) + nullish (??)
const themeLabel = (u) => `${u.name} uses ${u.prefs?.theme ?? "light"} theme`;
console.log(themeLabel(user)); // "Rohit uses light theme"

// Spread (...) to copy an object
const copy = { ...user, prefs: { ...user.prefs, lang: "en" } };
console.log(copy); // { name: "Rohit", prefs: { theme: null, lang: "en" } }

// Ternary (? :) + typeof
const price = "150";
console.log(typeof price === "number" ? "number" : "string"); // "string"
```

### Rest vs Spread — the two faces of `...`

| Where `...` appears | Name | What it does |
|---------------------|------|--------------|
| Left of `=` (destructuring, params) | **Rest** | Collects remaining values **into** an array/object |
| Right side (literals, calls) | **Spread** | Pulls values **out** to spread them somewhere else |

```javascript
// REST — collecting
const [head, ...tail] = [1, 2, 3, 4];
console.log(head, tail);                    // 1 [2,3,4]

const sum = (...nums) => nums.reduce((t, n) => t + n, 0);
console.log(sum(1, 2, 3, 4));               // 10

const { name, ...details } = { name: "Rohit", age: 25, city: "Delhi" };
console.log(name, details);                 // "Rohit" { age: 25, city: "Delhi" }

// SPREAD — expanding
console.log([1, 2, ...[3, 4, 5]]);          // [1,2,3,4,5]
const original = [1, 2, 3];
const copy = [...original];
console.log(copy, copy === original);       // [1,2,3] false (new array, same values)

const base = { theme: "dark" };
const merged = { ...base, fontSize: 16, lang: "en" };
console.log(merged);                        // {"theme":"dark","fontSize":16,"lang":"en"}
```

<div style="page-break-after: always;"></div>
### 🃏 Flip-card drills — symbol → meaning

<details class="flashcard"><summary>🃏 <code>user?.address?.city</code></summary><div class="back"><strong>Optional chaining (?.)</strong> — short-circuits to <code>undefined</code> instead of crashing when a link is null/undefined.</div></details>

<details class="flashcard"><summary>🃏 <code>input ?? "default"</code></summary><div class="back"><strong>Nullish coalescing (??)</strong> — falls back only on <code>null</code>/<code>undefined</code>; keeps <code>0</code> and <code>""</code>.</div></details>

<details class="flashcard"><summary>🃏 <code>...arr</code> / <code>...obj</code></summary><div class="back"><strong>Spread</strong> — expands elements/properties into a new array, object or call. On the left of <code>=</code> it becomes <strong>rest</strong> (collects).</div></details>

<details class="flashcard"><summary>🃏 <code>(a, b) =&gt; a + b</code></summary><div class="back"><strong>Arrow function</strong> — compact function syntax. Expression body returns implicitly; a <code>{}</code> body needs an explicit <code>return</code>.</div></details>

<details class="flashcard"><summary>🃏 <code>score &gt;= 90 ? "A" : "B"</code></summary><div class="back"><strong>Ternary (?:)</strong> — a one-line if/else that returns a value: <code>condition ? then : else</code>.</div></details>

<details class="flashcard"><summary>🃏 <code>0 || "hi"</code> vs <code>0 ?? "hi"</code></summary><div class="back"><code>||</code> → <code>"hi"</code> (0 is falsy). <code>??</code> → <code>0</code> (0 is not nullish). Prefer <code>??</code> when <code>0</code>/<code>""</code> are valid values.</div></details>

<p class="totop"><a href="#table-of-contents">⬆️ Back to top</a></p>

## 13. Common Pitfalls

<div class="why">🚩 **Why it matters:** these are the classic bugs that confuse beginners — recognizing them saves hours of head-scratching.</div>

<div class="danger">🚨 <strong>The #1 trap:</strong> <code>[10, 1, 2].sort()</code> sorts numbers as <strong>strings</strong>. Always pass a compare function: <code>.sort((a, b) =&gt; a - b)</code>.</div>

### ⚠️ Error Types Explorer

Click each error type to see when it occurs and how to fix it:

<details style="background:#fff;border:1px solid #cbd5e0;border-radius:8px;padding:12px;margin:10px 0;">
<summary style="cursor:pointer;font-weight:600;color:#2b6cb0;"><strong>❌ ReferenceError: Variable not defined</strong></summary>
<p>Occurs when you try to use a variable that hasn't been declared or is out of scope.</p>
<pre><code>console.log(myVar);
// ReferenceError: myVar is not defined
// Fix: Declare the variable first
let myVar = "hello";
console.log(myVar); // "hello"</code></pre>
</details>

<details style="background:#fff;border:1px solid #cbd5e0;border-radius:8px;padding:12px;margin:10px 0;">
<summary style="cursor:pointer;font-weight:600;color:#2b6cb0;"><strong>❌ TypeError: Wrong type operation</strong></summary>
<p>Occurs when you try to use a value in a way that's not allowed for its type.</p>
<pre><code>const num = 42;
num.toUpperCase();
// TypeError: num.toUpperCase is not a function
// Fix: Check the type before operating
if (typeof num === "string") num.toUpperCase();</code></pre>
</details>

<details style="background:#fff;border:1px solid #cbd5e0;border-radius:8px;padding:12px;margin:10px 0;">
<summary style="cursor:pointer;font-weight:600;color:#2b6cb0;"><strong>❌ SyntaxError: Invalid code structure</strong></summary>
<p>Occurs when code violates JavaScript grammar rules. Caught at parse time — before anything runs!</p>
<pre><code>const obj = { name: "Alice" age: 30 };
// SyntaxError: Unexpected identifier (missing comma)
// Fix: Add the missing comma
const obj = { name: "Alice", age: 30 };</code></pre>
</details>

<details style="background:#fff;border:1px solid #cbd5e0;border-radius:8px;padding:12px;margin:10px 0;">
<summary style="cursor:pointer;font-weight:600;color:#2b6cb0;"><strong>❌ RangeError: Value out of allowed range</strong></summary>
<p>Occurs when a value is outside the allowed range (e.g., array with invalid length).</p>
<pre><code>const arr = new Array(-1);
// RangeError: Invalid array length
// Fix: Validate the value before using
if (length > 0) {
  const arr = new Array(length);
}</code></pre>
</details>

### 1. `=` vs `===` (assignment inside a condition)

```javascript
let z = 1;
if ((z = 0)) {        // ⚠️ assigns 0, then checks truthiness
  console.log("truthy");
} else {
  console.log("falsy, z =", z); // falsy, z = 0  (z was overwritten!)
}
```

### 2. Sorting numbers without a compare function

```javascript
const nums = [1, 10, 2, 30];
console.log(nums.sort());                  // [1, 10, 2, 30]  (string order!)
console.log([...nums].sort((a, b) => a - b)); // [1, 2, 10, 30]  ✅
```

### 3. `push` returns the new length, not the array

```javascript
const list = [1, 2];
const result = list.push(3);
console.log(result);        // 3  (the length!)
list.push(3);               // correct usage: ignore the return, use `list`
console.log(list);          // [1, 2, 3]
```

### 4. Missing `break` in `switch` (fall-through)

```javascript
const fruit = "apple";
switch (fruit) {
  case "banana":
    console.log("Banana selected");
  case "apple":
    console.log("Apple selected"); // runs — AND falls through (no break!)
  case "mango":
    console.log("Mango selected"); // also runs!
    break;
  default:
    console.log("Unknown");
}
// Apple selected
// Mango selected   ← "mango" case ran even though fruit is "apple"
```

### 5. Floating-point precision

```javascript
console.log(0.1 + 0.2);               // 0.30000000000000004
console.log(0.1 + 0.2 === 0.3);       // false
console.log((0.1 + 0.2).toFixed(2));  // "0.30" ✅
```

### 6. `map` without a `return` (arrow with `{}` needs `return`)

```javascript
const nums2 = [1, 2, 3];
console.log(nums2.map((n) => { n * 2 }));  // [undefined, undefined, undefined]
const fixed = nums2.map((n) => { return n * 2; }); // or just (n) => n * 2
console.log(fixed);                        // [2, 4, 6] ✅
```

### 7. `const` does NOT freeze objects/arrays

```javascript
const colors = ["red"];
colors.push("yellow");
console.log(colors.join(" ")); // "red yellow" — const only locks the binding
```

### 8. `typeof null` is `"object"` (a historical bug)

```javascript
console.log(typeof null); // "object" — use value === null to check
```

### 9. Reading an out-of-bounds index gives `undefined` (no error!)

```javascript
const arr = [1, 2, 3];
console.log(arr[10]); // undefined — silent!
```

### 10. `charAt(-1)` doesn't work — use `.at(-1)`

```javascript
const word = "abc";
console.log(word.charAt(-1)); // ""   (empty string, no error)
console.log(word.at(-1));     // "c" ✅ (negative index supported)
```

### 11. `==` coerces types — `===` does not

```javascript
console.log("5" === 5);  // false ✅ (different types)
console.log("5" == 5);   // true  (string "5" converted to number)
console.log(0 == false); // true  (another coercion surprise)
```

<div style="page-break-after: always;"></div>

### 12. `NaN` is never equal to itself — test with `Number.isNaN()`

```javascript
const result = Number("abc");
console.log(result === NaN);        // false — ALWAYS false, even for real NaN!
console.log(Number.isNaN(result));  // true ✅ the reliable check
```

### 13. `sort()` and `reverse()` mutate the original — copy first

```javascript
const original = [3, 1, 2];
const sorted = [...original].sort((a, b) => a - b); // copy → then sort
console.log(sorted);   // [1, 2, 3]
console.log(original); // [3, 1, 2] ✅ untouched

// Or use the ES2023 non-mutating versions:
console.log(original.toSorted((a, b) => a - b)); // [1, 2, 3]
```
<div class="quiz-box">

<h3>🐞 Spot the Bug — Expanded Edition (12 Bugs)</h3>
<p><strong>Find the bug in each code snippet!</strong> Difficulty levels: 🟢 Easy | 🟡 Medium | 🔴 Hard</p>

<details style="margin: 12px 0;"><summary><strong>Bug #1 🟢 (Easy):</strong> Assignment instead of comparison</summary>
<pre><code>if (user = "admin") {  // ❌ BUG
  grantAccess();
}</code></pre>
<div style="background: #f0fff4; border-left: 4px solid #38a169; padding: 10px; margin-top: 8px; border-radius: 4px;">
  <strong>✅ The bug:</strong> `=` assigns instead of comparing. The condition is always the truthy string `"admin"`.
  <br><strong>Fix:</strong> Use `===` → `if (user === "admin")`
</div>
</details>

<details style="margin: 12px 0;"><summary><strong>Bug #2 🟢 (Easy):</strong> Sorting numbers as strings</summary>
<pre><code>const nums = [10, 9, 1];
console.log(nums.sort());  // ❌ Outputs [1, 10, 9]</code></pre>
<div style="background: #f0fff4; border-left: 4px solid #38a169; padding: 10px; margin-top: 8px; border-radius: 4px;">
  <strong>✅ The bug:</strong> Default sort treats all values as strings. `"10" < "9"` in lexicographic order.
  <br><strong>Fix:</strong> `nums.sort((a, b) => a - b)` → `[1, 9, 10]`
</div>
</details>

<details style="margin: 12px 0;"><summary><strong>Bug #3 🟢 (Easy):</strong> `push` returns length, not array</summary>
<pre><code>const result = [1, 2].push(3);
console.log(result);  // ❌ Outputs 3, not [1, 2, 3]</code></pre>
<div style="background: #f0fff4; border-left: 4px solid #38a169; padding: 10px; margin-top: 8px; border-radius: 4px;">
  <strong>✅ The bug:</strong> `push()` mutates the array AND returns the new length.
  <br><strong>Fix:</strong> Don't assign → `list.push(3);` or use `[...list, 3]` to create new array
</div>
</details>

<details style="margin: 12px 0;"><summary><strong>Bug #4 🟡 (Medium):</strong> Missing `break` in switch (fall-through)</summary>
<pre><code>const day = "Monday";
switch(day) {
  case "Monday":
    console.log("Start of week");
    // ❌ Missing break
  case "Friday":
    console.log("Almost weekend");
    break;
}
// Outputs: Both "Start of week" AND "Almost weekend"</code></pre>
<div style="background: #f0fff4; border-left: 4px solid #38a169; padding: 10px; margin-top: 8px; border-radius: 4px;">
  <strong>✅ The bug:</strong> Without `break`, execution falls through to the next case.
  <br><strong>Fix:</strong> Add `break;` after each case (or use `return`)
</div>
</details>

<details style="margin: 12px 0;"><summary><strong>Bug #5 🟡 (Medium):</strong> Infinite loop (missing increment)</summary>
<pre><code>let i = 0;
while (i < 10) {
  console.log(i);
  // ❌ Missing i++
}
// Output: 0 0 0 0 ... (browser hangs)</code></pre>
<div style="background: #f0fff4; border-left: 4px solid #38a169; padding: 10px; margin-top: 8px; border-radius: 4px;">
  <strong>✅ The bug:</strong> Loop condition never becomes false.
  <br><strong>Fix:</strong> Add `i++` inside the loop
</div>
</details>

<details style="margin: 12px 0;"><summary><strong>Bug #6 🟡 (Medium):</strong> `map` without return (arrow + braces)</summary>
<pre><code>const nums = [1, 2, 3];
const doubled = nums.map(x => { x * 2 });  // ❌ No return!
console.log(doubled);  // [undefined, undefined, undefined]</code></pre>
<div style="background: #f0fff4; border-left: 4px solid #38a169; padding: 10px; margin-top: 8px; border-radius: 4px;">
  <strong>✅ The bug:</strong> Braces `{}` without `return` = undefined.
  <br><strong>Fix:</strong> Either remove braces → `x => x * 2` OR add return → `x => { return x * 2; }`
</div>
</details>

<details style="margin: 12px 0;"><summary><strong>Bug #7 🟡 (Medium):</strong> Strings are immutable (index assignment ignored)</summary>
<pre><code>let str = "hello";
str[0] = "H";  // ❌ Silently ignored
console.log(str);  // Still "hello"</code></pre>
<div style="background: #f0fff4; border-left: 4px solid #38a169; padding: 10px; margin-top: 8px; border-radius: 4px;">
  <strong>✅ The bug:</strong> Strings can't be modified by index.
  <br><strong>Fix:</strong> Build a new string → `str = "H" + str.slice(1)`
</div>
</details>

<details style="margin: 12px 0;"><summary><strong>Bug #8 🟡 (Medium):</strong> `const` only locks binding, not contents</summary>
<pre><code>const colors = ["red"];
colors.push("yellow");  // ❌ Looks like it shouldn't work, but it does!
console.log(colors);  // ["red", "yellow"]</code></pre>
<div style="background: #f0fff4; border-left: 4px solid #38a169; padding: 10px; margin-top: 8px; border-radius: 4px;">
  <strong>✅ The bug (trap):</strong> `const` prevents reassignment, not mutation. Objects/arrays stay mutable.
  <br><strong>Know:</strong> To freeze contents, use `Object.freeze(colors)`
</div>
</details>

<details style="margin: 12px 0;"><summary><strong>Bug #9 🔴 (Hard):</strong> Shallow copy mutation (spread operator)</summary>
<pre><code>const original = { name: "Rohit", tags: ["JS"] };
const copy = { ...original };
copy.tags.push("Python");  // ❌ Affects original!
console.log(original.tags);  // ["JS", "Python"] — original changed!</code></pre>
<div style="background: #f0fff4; border-left: 4px solid #38a169; padding: 10px; margin-top: 8px; border-radius: 4px;">
  <strong>✅ The bug:</strong> Spread `{...}` is shallow. Nested objects/arrays are still shared references.
  <br><strong>Fix:</strong> Use deep copy → `const copy = structuredClone(original)`
</div>
</details>

<details style="margin: 12px 0;"><summary><strong>Bug #10 🔴 (Hard):</strong> Type coercion with `+`</summary>
<pre><code>const result = "5" + 3 - 2;  // ❌ What is it?
console.log(result);  // 50, not 6!</code></pre>
<div style="background: #f0fff4; border-left: 4px solid #38a169; padding: 10px; margin-top: 8px; border-radius: 4px;">
  <strong>✅ The bug:</strong> `"5" + 3` = `"53"` (string concat). Then `"53" - 2` = `51` (coerced to number).
  <br><strong>Know:</strong> `+` prefers string concat when a string is present. Use `===` to avoid coercion surprises.
</div>
</details>

<details style="margin: 12px 0;"><summary><strong>Bug #11 🔴 (Hard):</strong> Mutating array during iteration</summary>
<pre><code>const arr = [1, 2, 3, 4, 5];
arr.forEach(x => {
  if (x % 2 === 0) {
    arr.splice(arr.indexOf(x), 1);  // ❌ Don't mutate during iteration!
  }
});
// Result: [1, 3, 5] — but items are skipped randomly!</code></pre>
<div style="background: #f0fff4; border-left: 4px solid #38a169; padding: 10px; margin-top: 8px; border-radius: 4px;">
  <strong>✅ The bug:</strong> Modifying array during loop causes items to be skipped.
  <br><strong>Fix:</strong> Use `filter()` → `const filtered = arr.filter(x => x % 2 !== 0)`
</div>
</details>

<details style="margin: 12px 0;"><summary><strong>Bug #12 🔴 (Hard):</strong> `NaN` never equals itself</summary>
<pre><code>const bad = Number("abc");
console.log(bad === NaN);         // ❌ false — ALWAYS false!
console.log(Number.isNaN(bad));   // ✅ true</code></pre>
<div style="background: #f0fff4; border-left: 4px solid #38a169; padding: 10px; margin-top: 8px; border-radius: 4px;">
  <strong>✅ The bug:</strong> By definition, `NaN !== NaN`. This is a JavaScript quirk.
  <br><strong>Fix:</strong> Always use `Number.isNaN(x)` to test for NaN
</div>
</details>

</div>

<p class="totop"><a href="#table-of-contents">⬆️ Back to top</a></p>

## 14. Practice Exercises

<div class="why">🚩 **Why it matters:** short reps move knowledge from "seen it" to "can build with it."</div>

<div class="tip">✍️ <strong>How to use:</strong> write your solution below each TODO, run it with Node, and compare with the <strong>Expected</strong> output. Full solutions are in <a href="#16-answer-key">Section 16</a> — no peeking until you have tried!</div>

### Difficulty Filter

<div class="difficulty-filter" style="margin: 16px 0; display: flex; gap: 8px; flex-wrap: wrap; align-items: center;">
  <strong>Filter exercises:</strong>
  <button onclick="filterExercises('all')" class="filter-btn active" style="padding: 6px 12px; border: 2px solid #4299e1; background: #ebf8ff; border-radius: 4px; cursor: pointer; font-weight: 600; color: #2b6cb0;">All</button>
  <button onclick="filterExercises('easy')" class="filter-btn" style="padding: 6px 12px; border: 1px solid #22543d; background: #f0fff4; border-radius: 4px; cursor: pointer; font-weight: 600; color: #22543d;">🟢 Warm-up</button>
  <button onclick="filterExercises('medium')" class="filter-btn" style="padding: 6px 12px; border: 1px solid #744210; background: #fffbeb; border-radius: 4px; cursor: pointer; font-weight: 600; color: #744210;">🟡 Standard</button>
  <button onclick="filterExercises('hard')" class="filter-btn" style="padding: 6px 12px; border: 1px solid #742a2a; background: #fff5f5; border-radius: 4px; cursor: pointer; font-weight: 600; color: #742a2a;">🔴 Challenging</button>
</div>

<script>
function filterExercises(level) {
  const exercises = document.querySelectorAll('[data-difficulty]');
  exercises.forEach(ex => {
    if (level === 'all' || ex.getAttribute('data-difficulty') === level) {
      ex.style.display = '';
    } else {
      ex.style.display = 'none';
    }
  });
}
</script>

### Ex 1 — Split once (arrays + rest) <span class="badge b-green">🟢 Warm-up</span> <span class="badge b-time">⏱ 2 min</span>

```javascript
// TODO: split "a-b-c-d" at the FIRST "-" only
const input = "a-b-c-d";
// Expected: ["a", "b-c-d"]
```
<details class="hint"><summary>💡 Hint</summary>
<p>Resist <code>split("-")</code> — it cuts at <em>every</em> dash. Find the first one with <code>indexOf("-")</code>, then <code>slice</code> before and after it.</p>
</details>

### Ex 2 — Split once when the value contains `=` <span class="badge b-green">🟢 Warm-up</span> <span class="badge b-time">⏱ 3 min</span>

```javascript
// TODO: split into key and FULL value (value itself contains "=")
const setting = "color=blue=dark";
// Expected: ["color", "blue=dark"]
```
<details class="hint"><summary>💡 Hint</summary>
<p>Same split-once trick as Ex 1: <code>indexOf("=")</code> locates the first <code>=</code>; everything <strong>after</strong> it stays together — even more <code>=</code> signs.</p>
</details>

### Ex 3 — Parse an email <span class="badge b-green">🟢 Warm-up</span> <span class="badge b-time">⏱ 2 min</span>

```javascript
// TODO: extract the username and the domain
const email = "rohit.g@example.com";
// Expected: username "rohit.g", domain "example.com"
```
<details class="hint"><summary>💡 Hint</summary>
<p>One <code>split("@")</code> is safe here (an email has exactly one <code>@</code>) — destructure into <code>[username, domain]</code>.</p>
</details>

### Ex 4 — Reformat a date <span class="badge b-yellow">🟡 Core</span> <span class="badge b-time">⏱ 5 min</span>

```javascript
// TODO: convert "2026-08-31" to "31/08/2026"
const date = "2026-08-31";
// Expected: "31/08/2026"
```
<details class="hint"><summary>💡 Hint</summary>
<p><code>split("-")</code> gives <code>["2026", "08", "31"]</code> — destructure as <code>[y, m, d]</code> and rebuild with a template literal: <code>`${d}/${m}/${y}`</code>.</p>
</details>

### Ex 5 — Rest parameters <span class="badge b-green">🟢 Warm-up</span> <span class="badge b-time">⏱ 3 min</span>

```javascript
// TODO: write sumAny(...) that adds ANY number of arguments
// Expected: sumAny(1, 2, 3, 4) → 10
```
<details class="hint"><summary>💡 Hint</summary>
<p>Rest parameters: <code>const sumAny = (...nums) =&gt; nums.reduce((t, n) =&gt; t + n, 0)</code>.</p>
</details>

### Ex 6 — Spread into Math.max <span class="badge b-green">🟢 Warm-up</span> <span class="badge b-time">⏱ 2 min</span>

```javascript
// TODO: find the largest number WITHOUT a loop
const scores = [3, 9, 2];
// Expected: 9
```
<details class="hint"><summary>💡 Hint</summary>
<p><code>Math.max</code> accepts any number of arguments — spread the array in: <code>Math.max(...scores)</code>.</p>
</details>

### Ex 7 — Merge + dedupe + sort <span class="badge b-yellow">🟡 Core</span> <span class="badge b-time">⏱ 5 min</span>

```javascript
// TODO: combine both arrays — no duplicates, sorted
const a = [1, 2, 3];
const b = [3, 4];
// Expected: [1, 2, 3, 4]
```
<details class="hint"><summary>💡 Hint</summary>
<p>Spread both arrays into one, de-duplicate with <code>new Set(...)</code>, spread back into an array, then <code>.sort((a, b) =&gt; a - b)</code>.</p>
</details>

### Ex 8 — Map to HTML list items <span class="badge b-green">🟢 Warm-up</span> <span class="badge b-time">⏱ 3 min</span>

```javascript
// TODO: turn each language into an <li> item
const langs = ["HTML", "CSS"];
// Expected: ["<li>HTML</li>", "<li>CSS</li>"]
```
<details class="hint"><summary>💡 Hint</summary>
<p><code>map</code> with a template literal: <code>langs.map(lang =&gt; `&lt;li&gt;${lang}&lt;/li&gt;`)</code>.</p>
</details>

### Ex 9 — Copy an object and override a key (no mutation!) <span class="badge b-yellow">🟡 Core</span> <span class="badge b-time">⏱ 5 min</span>

```javascript
// TODO: create a NEW object with role "admin" — original must stay "viewer"
const user = { name: "Rohit", role: "viewer" };
// Expected: original {name "Rohit", role "viewer"}, copy {name "Rohit", role "admin"}
```
<details class="hint"><summary>💡 Hint</summary>
<p>One-liner: <code>{ ...user, role: "admin" }</code> — spread copies first, then the later key wins. Original untouched.</p>
</details>

### Ex 10 — Drop the first element without mutating <span class="badge b-green">🟢 Warm-up</span> <span class="badge b-time">⏱ 3 min</span>

```javascript
// TODO: return [20, 30, 40] — original must stay unchanged
const queue = [10, 20, 30, 40];
// Expected: [20, 30, 40], original [10, 20, 30, 40]
```
<details class="hint"><summary>💡 Hint</summary>
<p><code>queue.slice(1)</code> returns a new array without the first element — the original stays intact.</p>
</details>

<div style="page-break-after: always;"></div>
<p class="totop"><a href="#table-of-contents">⬆️ Back to top</a></p>

## 15. Challenges

<div class="why">🚩 **Why it matters:** graded tasks mirror real coding — a safe place to make and fix mistakes.</div>

<div class="warn">🔥 <strong>Level up:</strong> each challenge mixes 2–4 concepts from earlier sections. Try them before opening the <a href="#16-answer-key">Answer Key</a>.</div>

> 💡 **New in the HTML study app:** The <code>Javascript_essentials_part1_study_app.html</code> edition adds an <strong>auto-graded code editor</strong> for C1 — write your solution, click "Run Tests", and get instant pass/fail feedback with hints. Open the HTML app to try it.

### C1 — Cart total (map + reduce + operators) <span class="badge b-red">🔴 Boss</span> <span class="badge b-time">⏱ 10 min</span>

```javascript
// TODO: total = sum of (price × qty), applying discount when present (0.1 = 10%)
const cart = [
  { name: "Keyboard", price: 500, qty: 2, discount: 0.1 },
  { name: "Mouse", price: 300, qty: 3 },
  { name: "Monitor", price: 1500, qty: 1 }
];
// Expected: 3300
```
<details class="hint"><summary>💡 Hint</summary>
<p>Two steps: <code>map</code> each item to <code>price * qty * (1 - discount)</code> (discount may be missing — default it with <code>?? 0</code>), then <code>reduce</code> to a total.</p>
</details>

### C2 — Longest word (split + reduce) <span class="badge b-yellow">🟡 Core</span> <span class="badge b-time">⏱ 7 min</span>

```javascript
// TODO: find the longest word; on a tie keep the FIRST one
const sentence = "The quick brown fox jumps over the lazy dog";
// Expected: "quick"
```
<details class="hint"><summary>💡 Hint</summary>
<p><code>split(" ")</code> into words, then <code>reduce</code>: keep whichever word is <strong>strictly longer</strong> — that automatically keeps the FIRST word on ties.</p>
</details>

### C3 — Merge + dedupe + sort (spread + Set + sort) <span class="badge b-yellow">🟡 Core</span> <span class="badge b-time">⏱ 5 min</span>

```javascript
// TODO: merge into one sorted array with no duplicates
const arrA = [3, 1, 2];
const arrB = [2, 5, 4];
// Expected: [1, 2, 3, 4, 5]
```
<details class="hint"><summary>💡 Hint</summary>
<p><code>[...new Set([...arrA, ...arrB])]</code> dedupes the merge — then sort numerically with a compare function.</p>
</details>

### C4 — Palindrome checker (strings + conditions) <span class="badge b-yellow">🟡 Core</span> <span class="badge b-time">⏱ 7 min</span>

```javascript
// TODO: return true if the word reads the same reversed
// Expected: isPalindrome("madam") → true, isPalindrome("hello") → false
```
<details class="hint"><summary>💡 Hint</summary>
<p>A palindrome reads the same reversed: compare <code>word</code> with <code>[...word].reverse().join("")</code>.</p>
</details>

### C5 — Word frequency (split + reduce + object) <span class="badge b-red">🔴 Boss</span> <span class="badge b-time">⏱ 10 min</span>

```javascript
// TODO: count how many times each word appears (case-insensitive)
const text = "The cat and the dog and the bird";
// Expected: { the: 3, cat: 1, and: 2, dog: 1, bird: 1 }
```
<details class="hint"><summary>💡 Hint</summary>
<p>Lowercase first (<code>toLowerCase()</code>), split into words, then <code>reduce</code> into an object: <code>acc[w] = (acc[w] || 0) + 1</code>.</p>
</details>

### C6 — FizzBuzz (loop + ternary) <span class="badge b-yellow">🟡 Core</span> <span class="badge b-time">⏱ 7 min</span>

```javascript
// TODO: 1..15 → multiples of 3 "Fizz", of 5 "Buzz", of both "FizzBuzz"
// Expected: [1, 2, "Fizz", 4, "Buzz", "Fizz", 7, 8, "Fizz", "Buzz", 11, "Fizz", 13, 14, "FizzBuzz"]
```
<details class="hint"><summary>💡 Hint</summary>
<p>Loop 1–15 building an array. Check <code>% 15</code> FIRST (FizzBuzz), then <code>% 3</code>, then <code>% 5</code> — order matters, or 15 prints "Fizz".</p>
</details>

### C7 — Group by category (reduce building an object) <span class="badge b-red">🔴 Boss</span> <span class="badge b-time">⏱ 10 min</span>

```javascript
// TODO: group product names by their category
const items = [
  { name: "Apple", cat: "food" },
  { name: "Laptop", cat: "tech" },
  { name: "Bread", cat: "food" },
  { name: "Phone", cat: "tech" }
];
// Expected: { food: ["Apple", "Bread"], tech: ["Laptop", "Phone"] }
```
<details class="hint"><summary>💡 Hint</summary>
<p><code>reduce((acc, item) =&gt; ...)</code>: ensure the bucket exists — <code>acc[item.cat] = acc[item.cat] || []</code> — push the name, <code>return acc</code>.</p>
</details>

### C8 — Flatten + sum (flat + reduce) <span class="badge b-yellow">🟡 Core</span> <span class="badge b-time">⏱ 7 min</span>

```javascript
// TODO: fully flatten AND sum in one pipeline
const nested = [1, [2, [3, [4, 5]]]];
// Expected: [1, 2, 3, 4, 5] and 15
```
<details class="hint"><summary>💡 Hint</summary>
<p><code>flat(Infinity)</code> flattens any depth, then <code>reduce</code> to sum. Bonus: do both in ONE <code>reduce</code> with <code>concat</code>.</p>
</details>

### C9 — Email with `+tag` (split-once thinking!) <span class="badge b-red">🔴 Boss</span> <span class="badge b-time">⏱ 12 min</span>

```javascript
// TODO: parse "rohit.dev+news@example.com" into parts
const email = "rohit.dev+news@example.com";
// Expected: { username: "rohit.dev", tag: "news", domain: "example.com" }
```
<details class="hint"><summary>💡 Hint</summary>
<p>Split at <code>"@"</code> first (once) → local part + domain. Then split the local part at the <strong>first</strong> <code>"+"</code> with <code>indexOf</code> + <code>slice</code> — <code>split("+")</code> would break on extra pluses.</p>
</details>

<div style="page-break-after: always;"></div>
<p class="totop"><a href="#table-of-contents">⬆️ Back to top</a></p>

## 16. Answer Key

<div class="why">🚩 **Why it matters:** comparing your answer to the canonical one is where the real learning happens.</div>

> 🙈 **Only look after you have tried!** Click each card to reveal the solution.

<div class="answer-key">

<details class="solution"><summary>✅ Ex 1 <span class="badge b-green">🟢</span> <span class="badge b-time">⏱2m</span> — Split once</summary>

```javascript
const input = "a-b-c-d";
const [first, ...restParts] = input.split("-");
console.log([first, restParts.join("-")]); // ["a", "b-c-d"]
```

</details>

<details class="solution"><summary>✅ Ex 2 <span class="badge b-green">🟢</span> <span class="badge b-time">⏱3m</span> — Split once with <code>=</code> in the value</summary>

```javascript
const setting = "color=blue=dark";
const eq = setting.indexOf("=");
console.log([setting.slice(0, eq), setting.slice(eq + 1)]); // ["color", "blue=dark"]
```

</details>

<details class="solution"><summary>✅ Ex 3 <span class="badge b-green">🟢</span> <span class="badge b-time">⏱2m</span> — Parse an email</summary>

```javascript
const email = "rohit.g@example.com";
const [username, domain] = email.split("@");
console.log(username, domain); // rohit.g example.com
```

</details>

<details class="solution"><summary>✅ Ex 4 <span class="badge b-yellow">🟡</span> <span class="badge b-time">⏱5m</span> — Reformat a date</summary>

```javascript
const date = "2026-08-31";
const [y, m, d] = date.split("-");
console.log([d, m, y].join("/")); // 31/08/2026
```

</details>

<details class="solution"><summary>✅ Ex 5 <span class="badge b-green">🟢</span> <span class="badge b-time">⏱3m</span> — Rest parameters</summary>

```javascript
const sumAny = (...nums) => nums.reduce((total, n) => total + n, 0);
console.log(sumAny(1, 2, 3, 4)); // 10
```

</details>

<details class="solution"><summary>✅ Ex 6 <span class="badge b-green">🟢</span> <span class="badge b-time">⏱2m</span> — Spread into Math.max</summary>

```javascript
const scores = [3, 9, 2];
console.log(Math.max(...scores)); // 9
```

</details>

<details class="solution"><summary>✅ Ex 7 <span class="badge b-yellow">🟡</span> <span class="badge b-time">⏱5m</span> — Merge + dedupe + sort</summary>

```javascript
const a = [1, 2, 3];
const b = [3, 4];
console.log([...new Set([...a, ...b])].sort((x, y) => x - y)); // [1, 2, 3, 4]
```

</details>

<details class="solution"><summary>✅ Ex 8 <span class="badge b-green">🟢</span> <span class="badge b-time">⏱3m</span> — Map to HTML list items</summary>

```javascript
const langs = ["HTML", "CSS"];
console.log(langs.map((lang) => `<li>${lang}</li>`));
// ["<li>HTML</li>", "<li>CSS</li>"]
```

</details>

<details class="solution"><summary>✅ Ex 9 <span class="badge b-yellow">🟡</span> <span class="badge b-time">⏱5m</span> — Copy + override (no mutation)</summary>

```javascript
const user = { name: "Rohit", role: "viewer" };
const admin = { ...user, role: "admin" };
console.log(user, admin);
// {name:"Rohit",role:"viewer"} {name:"Rohit",role:"admin"}
```

</details>

<details class="solution"><summary>✅ Ex 10 <span class="badge b-green">🟢</span> <span class="badge b-time">⏱3m</span> — Drop first without mutating</summary>

```javascript
const queue = [10, 20, 30, 40];
const withoutFirst = queue.slice(1);
console.log(withoutFirst, queue); // [20,30,40] [10,20,30,40]
```

</details>

<details class="solution"><summary>✅ C1 <span class="badge b-red">🔴</span> <span class="badge b-time">⏱10m</span> — Cart total</summary>

```javascript
const cart = [
  { name: "Keyboard", price: 500, qty: 2, discount: 0.1 },
  { name: "Mouse", price: 300, qty: 3 },
  { name: "Monitor", price: 1500, qty: 1 }
];

const total = cart
  .map((item) => item.price * item.qty * (1 - (item.discount ?? 0)))
  .reduce((sum, line) => sum + line, 0);

console.log(total); // 3300
```

</details>

<details class="solution"><summary>✅ C2 <span class="badge b-yellow">🟡</span> <span class="badge b-time">⏱7m</span> — Longest word</summary>

```javascript
const sentence = "The quick brown fox jumps over the lazy dog";
const longest = sentence
  .split(" ")
  .reduce((best, word) => (word.length > best.length ? word : best));
console.log(longest); // quick (first max wins on ties)
```

</details>

<details class="solution"><summary>✅ C3 <span class="badge b-yellow">🟡</span> <span class="badge b-time">⏱5m</span> — Merge + dedupe + sort</summary>

```javascript
const arrA = [3, 1, 2];
const arrB = [2, 5, 4];
console.log([...new Set([...arrA, ...arrB])].sort((a, b) => a - b));
// [1, 2, 3, 4, 5]
```

</details>

<details class="solution"><summary>✅ C4 <span class="badge b-yellow">🟡</span> <span class="badge b-time">⏱7m</span> — Palindrome checker</summary>

```javascript
const isPalindrome = (word) => word === word.split("").reverse().join("");
console.log(isPalindrome("madam"), isPalindrome("hello")); // true false
```

</details>

<details class="solution"><summary>✅ C5 <span class="badge b-red">🔴</span> <span class="badge b-time">⏱10m</span> — Word frequency</summary>

```javascript
const text = "The cat and the dog and the bird";
const counts = text
  .toLowerCase()
  .split(" ")
  .reduce((acc, word) => {
    acc[word] = (acc[word] ?? 0) + 1; // ?? avoids treating a missing key as 0-vs-falsy bug
    return acc; // remember: a {} arrow body NEEDS return (Pitfall 6!)
  }, {});
console.log(counts); // {"the":3,"cat":1,"and":2,"dog":1,"bird":1}
```

</details>

<details class="solution"><summary>✅ C6 <span class="badge b-yellow">🟡</span> <span class="badge b-time">⏱7m</span> — FizzBuzz</summary>

```javascript
const result = [];
for (let i = 1; i <= 15; i++) {
  result.push(i % 15 === 0 ? "FizzBuzz" : i % 3 === 0 ? "Fizz" : i % 5 === 0 ? "Buzz" : i);
}
console.log(result);
// [1, 2, "Fizz", 4, "Buzz", "Fizz", 7, 8, "Fizz", "Buzz", 11, "Fizz", 13, 14, "FizzBuzz"]
```

</details>

<details class="solution"><summary>✅ C7 <span class="badge b-red">🔴</span> <span class="badge b-time">⏱10m</span> — Group by category</summary>

```javascript
const items = [
  { name: "Apple", cat: "food" },
  { name: "Laptop", cat: "tech" },
  { name: "Bread", cat: "food" },
  { name: "Phone", cat: "tech" }
];

const grouped = items.reduce((acc, item) => {
  (acc[item.cat] ??= []).push(item.name); // create array if missing, then push
  return acc;
}, {});
console.log(grouped); // {"food":["Apple","Bread"],"tech":["Laptop","Phone"]}
```

</details>

<details class="solution"><summary>✅ C8 <span class="badge b-yellow">🟡</span> <span class="badge b-time">⏱7m</span> — Flatten + sum</summary>

```javascript
const nested = [1, [2, [3, [4, 5]]]];
const flat = nested.flat(Infinity); // Infinity flattens every level
console.log(flat, flat.reduce((s, n) => s + n, 0)); // [1,2,3,4,5] 15
```

</details>

<details class="solution"><summary>✅ C9 <span class="badge b-red">🔴</span> <span class="badge b-time">⏱12m</span> — Email with <code>+tag</code></summary>

```javascript
const email = "rohit.dev+news@example.com";
const [localPart, domain] = email.split("@");           // split once at @
const [username, tag = null] = localPart.split("+");    // split once at +
console.log({ username, tag, domain });
// {"username":"rohit.dev","tag":"news","domain":"example.com"}
// (tag is null when there is no "+tag" part)
```

</details>

</div>

<div class="cert">
<h2>🏆 Certificate of Completion</h2>
<p>This certifies that <strong>Rohit</strong> has completed</p>
<p><strong>JavaScript Essentials — Part 1</strong></p>
<p><em>16 sections · 9 self-tests · 16 flashcards · 10 exercises · 9 challenges · 13 pitfalls survived</em></p>
<p>Next stop: <strong>Part 2 — promises, async/await, classes &amp; modules</strong> 🚀</p>
</div>
---

<footer align="center">

**JavaScript Essentials — Part 1 (Interactive Edition)** 🎉

Made for hands-on learning — quizzes, flashcards, exercises & challenges.

</footer>
