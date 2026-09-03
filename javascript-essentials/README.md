# ⚡ JavaScript Essentials — Part 1

A hands-on study kit covering the JavaScript fundamentals: variables, control flow, functions, closures, arrays, strings, objects, and the classic pitfalls — in **three editions**, from print-friendly to fully interactive.

> **Progress:** Part 1 ✅ · Part 2 ✅ · Part 3 (MERN Bridge) ✅ · Part 4 (MERN Foundations) ✅ · Part 5 (Production: Auth + Deployment) ✅ · Part 6 (Production Hardening) ✅ complete

### 🧭 Automation Tester Path

Part of the **[Automation Tester Path](../automation-tester-path/README.md)** · [`START_HERE`](../automation-tester-path/START_HERE.md) · [`ROADMAP`](../automation-tester-path/ROADMAP.md)

| | |
|---|---|
| **On the path** | **Start here** for language/app foundations (Parts 1–5), then Playwright, then **Part 6** hardening |
| **Previous** | — (first kit) |
| **Next** | [HTML & CSS Essentials](../html-css-essentials/) Part 1 → [TypeScript for Testers](../typescript-for-testers/) → [Playwright Essentials](../playwright-essentials/README.md) |
| **After Playwright** | Come back for [Part 6 study app](Javascript_essentials_part6_study_app.html) · then [API & Data](../api-data-essentials/README.md) → [Perf Basics](../perf-basics/README.md) |
| **Sibling** | Deep E2E → Playwright · Deep REST/SQL → API & Data · Load literacy → Perf · Phase B TS → [TypeScript Develop + Test](../typescript-develop-test/README.md) |

---

## 📚 Choose your edition

| Edition | Best for | Link |
|---|---|---|
| 🖥️ **Interactive Study App** | Studying in the browser — dark mode, saved progress, syntax highlighting | [**Open the live app**](https://rohithr1008.github.io/javascript-essentials/) (also works offline: download `Javascript_essentials_part1_study_app.html` and double-click) |
| 📝 **Interactive Markdown** | VS Code / Typora users — quizzes, flashcards & hint cards inline | [View on GitHub](Javascript_essentials_part1_interactive.md) — open in VS Code preview with `Ctrl+Shift+V` |
| 📄 **Plain Markdown** | Printing, PDF export, distraction-free reading | [View on GitHub](Javascript_essentials_part1_with_examples.md) |

Same curriculum across all three editions; features differ by format — pick what fits how you study:
- **Study app** — progress, SRS, Spot-the-Bug, live mocks, certificate, theme, Focus Mode
- **Interactive Markdown** — quizzes, flashcards, Spot-the-Bug + predict cards (Parts 1–5), and inline demos in the preview
- **Plain Markdown** — print-friendly, open answers, distraction-free reading

---

## 🗂️ What's covered (16 sections)

1. Variables: `let`, `const`, `var` · 2. Conditions · 3. Loops · 4. Logical operators · 5. Data types & NaN · 6. Mutable vs immutable (+ `Object.freeze`) · 7. Operators & `Math` · 8. Functions, arrows, closures, hoisting · 9. Arrays & methods (incl. ES2023 `toSorted`/`with`) · 10. Strings & methods (+ template literals) · 11. Objects, methods & `this` · 12. Symbols cheat sheet · 13. 13 common pitfalls · 14. 10 practice exercises · 15. 9 challenges · 16. Answer key

## 🧪 Built-in interactivity (in every part's study app — parts 1–6)

- 🧪 **Self-test quizzes** with click-to-reveal answers
- 🤔 **Predict-the-output cards** (logic, mutability, async, MERN/auth traps)
- 🃏 **Flashcards** + SRS spaced repetition + symbol drills
- 🟢🟡🔴 **Difficulty & time badges** with 💡 hints on exercises/challenges
- 🐞 **Spot-the-bug** final boss quiz *(in interactive Markdown + study apps; study apps also have live mocks / SRS / certificate)*
- 😅 **Mood checks** · 📅 **7-day study plan** · 🏆 **completion certificate** *(certificate + live mocks + SRS engine: study-app primary)*
- *(App edition)* 🌙 dark mode · 📊 progress that persists via localStorage · 🧭 scrollspy navigation · 🧘 Focus Mode
- Interactive Markdown now includes Spot-the-Bug + predict decks for Parts 2–6 (static). Live mocks, SRS, progress, and certificates stay study-app primary.
- Every feature is **content-tailored to its part** (Part 4 → MERN, Part 5 → auth/deploy, Part 6 → CI/testing/security), so no two parts share identical material.

## 🚀 Quick start

```bash
git clone https://github.com/Rohithr1008/javascript-essentials.git
```

1. **Easiest:** open `Javascript_essentials_part1_study_app.html` in any browser (or use the [live version](https://rohithr1008.github.io/javascript-essentials/)).
2. **In VS Code:** open either `.md` file and press `Ctrl+Shift+V` for the interactive preview.
3. **On paper:** print the plain edition — code blocks and tables are print-friendly.

Run any snippet as you read:

```bash
node -e "console.log([10,1,2].sort())"   # [1, 10, 2] 😱 — see pitfall #2!
```

---

*Made for hands-on learning — read a little, guess the output, flip the card, break the code.* ❤️

---

## ⚡ Part 2 — Intermediate (promises, async/await, classes, modules)

The same three-edition study kit, now for the **intermediate** level.

### 📚 Choose your edition

| Edition | Best for | Link |
|---|---|---|
| 🖥️ **Interactive Study App** | Browser study — dark mode, saved progress, learning path, spaced repetition, **5 auto-graded challenges** | [Open the live app](https://rohithr1008.github.io/javascript-essentials/Javascript_essentials_part2_study_app.html) — or open the file offline by double-clicking |
| 📝 **Interactive Markdown** | VS Code / Typora — Promise Simulator, code sandbox, quizzes & flashcards | [`Javascript_essentials_part2_interactive.md`](Javascript_essentials_part2_interactive.md) — open with `Ctrl+Shift+V` |
| 📄 **Plain Markdown** | Printing / PDF / distraction-free reading | [`Javascript_essentials_part2_with_examples.md`](Javascript_essentials_part2_with_examples.md) |

### 🗂️ What's covered (9 sections)

1. Promises · 2. async / await · 3. Error Handling · 4. Classes & OOP · 5. Modules · 6. Common Pitfalls · 7. Practice Exercises (8) · 8. Challenges (5, auto-graded) · 9. Answer Key

### 🚀 Part 2 quick start

```bash
# Try a challenge solution right in the terminal
node -e "async function inSequence(t){const r=[];for(const x of t)r.push(await x());return r;} ; inSequence([async()=>1,async()=>2]).then(console.log)  # [1, 2]"
```

See [`JAVASCRIPT_ESSENTIALS_PART2_CONTEXT.md`](JAVASCRIPT_ESSENTIALS_PART2_CONTEXT.md) for the full context/transfer notes, and [`index.html`](index.html) to launch any part.

---

## ⚡ Part 3 — MERN Bridge (Map/Set, generators, regex, DOM & events, fetch, Node core)

The same three-edition study kit, now for the **full-stack (MERN)** JavaScript you use across Mongo, Express, React, and Node.

### 📚 Choose your edition

| Edition | Best for | Link |
|---|---|---|
| 🖥️ **Interactive Study App** | Browser study — dark mode, saved progress, learning path, spaced repetition, **live DOM + fetch demos**, **🧘 Focus Mode**, **5 auto-graded challenges** | [Open the live app](https://rohithr1008.github.io/javascript-essentials/Javascript_essentials_part3_study_app.html) — or open the file offline by double-clicking |
| 📝 **Interactive Markdown** | VS Code / Typora — Map/Set playground, RegExp tester, live DOM & fetch demos, quizzes | [`Javascript_essentials_part3_interactive.md`](Javascript_essentials_part3_interactive.md) — open with `Ctrl+Shift+V` |
| 📄 **Plain Markdown** | Printing / PDF / distraction-free reading | [`Javascript_essentials_part3_with_examples.md`](Javascript_essentials_part3_with_examples.md) |

### 🗂️ What's covered (10 sections)

1. Iterables, Map & Set · 2. Generators & async iteration · 3. Regular Expressions · 4. DOM & Events (for React) · 5. fetch & Web APIs · 6. Node.js Core · 7. Common Pitfalls (MERN) · 8. Practice Exercises · 9. Challenges (5, auto-graded) · 10. Answer Key

### 🚀 Part 3 quick start

```bash
# De-dupe + slugify + count words — the MERN bread-and-butter
node -e "console.log([...new Set([1,1,2,3,3])]); const slugify=s=>s.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,''); console.log(slugify('Hello World!')); const f=(t)=>{const o={};for(const w of t.split(/\s+/).filter(Boolean))o[w]=(o[w]||0)+1;return o;}; console.log(f('the cat sat'));"
# [ 1, 2, 3 ]  hello-world  { the: 1, cat: 1, sat: 1 }
```

### 🧩 Series at a glance

```
Part 1  Core  →  Part 2  Async/OOP  →  Part 3  MERN Bridge  →  Part 4  MERN Foundations  →  Part 5  Production  →  Part 6  Hardening
```

---

## ⚡ Part 4 — MERN Foundations (Express, Mongoose, React, Node, TypeScript)

The payoff: build two real full-stack apps — **Notes** and **Product Store with Reviews**. Written for an absolute beginner with ADHD/autistic-friendly design (colour-coded layers, tiny chunks, Focus Mode, and a working in-page mock server — no install needed).

### 📚 Choose your edition

| Edition | Best for | Link |
|---|---|---|
| 🖥️ **Interactive Study App** | Click through a **live mock MERN server** + two mini-apps, SRS, **6 auto-graded challenges**, Focus Mode | [Open live](https://rohithr1008.github.io/javascript-essentials/Javascript_essentials_part4_study_app.html) — or open the file offline |
| 📝 **Interactive Markdown** | VS Code / Typora — Notes + Reviews demos, quizzes, flashcards | [`Javascript_essentials_part4_interactive.md`](Javascript_essentials_part4_interactive.md) — `Ctrl+Shift+V` |
| 📄 **Plain Markdown** | Printing / PDF / distraction-free reading | [`Javascript_essentials_part4_with_examples.md`](Javascript_essentials_part4_with_examples.md) |

### 🗂️ What's covered (17 sections)

1. Hello MERN (the 3-layer sandwich) · 2. Setting up a project · 3. The request/response cycle · 4. Express · 5. REST API · 6. MongoDB + Mongoose · 7. Project A — Notes backend · 8. React fundamentals · 9. fetch in React · 10. Project A — full stack · 11. CORS · 12. Node core · 13. TypeScript · 14. Project B — Product Store with Reviews · 15. Pitfalls · 16. Exercises & challenges · 17. Answer key

### 🚀 Part 4 quick start (your first real MERN)

```bash
# Backend
npm init -y && npm install express mongoose cors
node server/server.js        # Notes API on http://localhost:3000

# Frontend (React via Vite) — then copy the App.jsx from section 10
npm create vite@latest client -- --template react
```

See [`JAVASCRIPT_ESSENTIALS_PART4_CONTEXT.md`](JAVASCRIPT_ESSENTIALS_PART4_CONTEXT.md) for full context/transfer notes.

---

## ⚡ Part 5 — Production: Auth + Deployment

Take your Part 4 MERN app and make it real: **user authentication** (bcrypt hashing, JWT, protected routes) and **deployment** (Render + Vercel/Netlify + MongoDB Atlas). Beginner-friendly with a **live in-page mock auth server** — watch register → hash → login → token → protected route, no install needed.

### 📚 Choose your edition

| Edition | Best for | Link |
|---|---|---|
| 🖥️ **Interactive Study App** | **Live mock auth server** + JWT viewer, 5 auto-graded challenges, Focus Mode | [Open live](https://rohithr1008.github.io/javascript-essentials/Javascript_essentials_part5_study_app.html) — or open offline |
| 📝 **Interactive Markdown** | VS Code / Typora — auth demos, quizzes, flashcards | [`Javascript_essentials_part5_interactive.md`](Javascript_essentials_part5_interactive.md) — `Ctrl+Shift+V` |
| 📄 **Plain Markdown** | Printing / PDF / distraction-free reading | [`Javascript_essentials_part5_with_examples.md`](Javascript_essentials_part5_with_examples.md) |

### 🗂️ What's covered (16 sections)

1. The production layer · 2. Authentication vs Authorization · 3. Hashing with bcrypt · 4. JWT (header·payload·signature) · 5. Register · 6. Login &amp; issuing a token · 7. Protected routes (middleware) · 8. Token in React · 9. Full auth module · 10. Deployment · 11. Backend hosting + env + Atlas · 12. Frontend hosting · 13. Testing · 14. Routing (React Router) · 15. Production pitfalls · 16. Practice &amp; challenges

See [`JAVASCRIPT_ESSENTIALS_PART5_CONTEXT.md`](JAVASCRIPT_ESSENTIALS_PART5_CONTEXT.md) for full context/transfer notes.

---

## ⚡ Part 6 — Production Hardening: CI/CD, Testing & Scale

Take your Part 5 app and make it bulletproof: **unit/integration tests** (Vitest/Jest, Express mocks, React Testing Library), **CI/CD** (GitHub Actions → lint/test/build → Render/Vercel), **monitoring**, **advanced security** (refresh tokens, rate limits, RBAC), and **scaling**. Offline **mock CI runner**, coverage simulator, and logger/RBAC panel — no install. Deep browser E2E → **[Playwright Essentials](../playwright-essentials/README.md)** (separate series on the same path).

### 📚 Choose your edition

| Edition | Best for | Link |
|---|---|---|
| 🖥️ **Interactive Study App** | **Mock CI runner** + coverage + RBAC panel, 5 auto-graded challenges, Focus Mode | [Open live](https://rohithr1008.github.io/javascript-essentials/Javascript_essentials_part6_study_app.html) — or open offline |
| 📝 **Interactive Markdown** | VS Code / Typora — CI story, quizzes, Spot-the-Bug | [`Javascript_essentials_part6_interactive.md`](Javascript_essentials_part6_interactive.md) — `Ctrl+Shift+V` |
| 📄 **Plain Markdown** | Printing / PDF / distraction-free reading | [`Javascript_essentials_part6_with_examples.md`](Javascript_essentials_part6_with_examples.md) |

### 🗂️ What's covered (16 sections)

1. Why harden · 2. Vitest/Jest · 3. Express/Mongoose tests · 4. React Testing Library · 5. Coverage & TDD · 6. CI/CD & Actions · 7. CI pipeline · 8. CD deploy · 9. Secrets in CI · 10. Monitoring · 11. Performance · 12. Refresh tokens & rate limits · 13. RBAC/CORS/HTTPS · 14. Scaling · 15. Pitfalls · 16. Practice & challenges

See [`JAVASCRIPT_ESSENTIALS_PART6_CONTEXT.md`](JAVASCRIPT_ESSENTIALS_PART6_CONTEXT.md) for full context/transfer notes.

---

*The full 6-part series covers JavaScript → MERN apps → production → hardening.* ❤️

---

## 📌 Handoff documentation

See **[`HANDOFF.md`](HANDOFF.md)** for the full project handoff — conventions, architecture rules, verification checklist, known gotchas, and what's done vs. next steps. A fresh session should read it first.
