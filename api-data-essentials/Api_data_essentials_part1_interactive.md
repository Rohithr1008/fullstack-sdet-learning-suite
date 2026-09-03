# API & Data Essentials — Part 1 (HTTP & REST Foundations)

<div class="interactive-note">💡 <strong>Interactive edition:</strong> quizzes, predict cards, Spot-the-Bug. Best in VS Code (<code>Ctrl+Shift+V</code>). Study app adds live mock + progress + certificate.</div>

<div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;background:#2d3748;color:#e2e8f0;padding:8px 12px;border-radius:8px;margin:10px 0;font-size:0.95rem;"><a href="index.html" style="color:#7dd3fc;font-weight:600;text-decoration:none;">Hub</a> <strong style="color:#fff;">1</strong> · <a href="Api_data_essentials_part2_interactive.md" style="color:#7dd3fc;font-weight:600;text-decoration:none;">2</a> · <a href="Api_data_essentials_part3_interactive.md" style="color:#7dd3fc;font-weight:600;text-decoration:none;">3</a></div>
<style>
h2 { border-bottom: 3px solid #0e7490; padding-bottom: 6px; }
h2[id] { scroll-margin-top: 12px; }
.interactive-note { background: #eef6ff; border-left: 4px solid #0e7490; padding: 10px 14px; border-radius: 6px; }
.tip { background: #f0fff4; border-left: 4px solid #38a169; padding: 10px 14px; border-radius: 6px; }
.why { background:#eef2ff; border-left:4px solid #5a67d8; padding:6px 12px; border-radius:6px; margin:6px 0 10px 0; font-size:0.92rem; }
.warn { background: #fffaf0; border-left: 4px solid #dd6b20; padding: 10px 14px; border-radius: 6px; }
.chall { background: #f5f3ff; border-left: 4px solid #6b46c1; padding: 10px 14px; border-radius: 6px; }
.quiz-box { background: #f7f9fc; border: 2px solid #0e7490; border-radius: 10px; padding: 14px 18px; margin: 18px 0; }
.quiz-box h3 { margin-top: 0; color: #0e7490; }
.quiz-box details { background: #ffffff; border: 1px solid #cbd5e0; border-radius: 8px; padding: 8px 12px; margin: 8px 0; }
.quiz-box summary { cursor: pointer; font-weight: 600; }
.quiz-correct { color: #276749; font-weight: 700; }
.quiz-wrong { color: #9b2c2c; }
.flashcard { background: #fffbeb; border: 2px solid #d69e2e; border-radius: 10px; padding: 10px 14px; margin: 10px 0; }
.flashcard summary { cursor: pointer; font-weight: 700; color: #744210; }
.predict { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 10px; margin: 14px 0; }
.predict details { background: #fff; border: 1px solid #cbd5e0; border-radius: 8px; padding: 8px 12px; }
.predict summary { cursor: pointer; font-weight: 600; }
.spotbug { display: grid; gap: 10px; margin: 14px 0; }
.spotbug details { background: #fff; border: 1px solid #cbd5e0; border-radius: 8px; padding: 10px 14px; }
.mood { margin-top: 12px; display: flex; flex-wrap: wrap; gap: 6px; align-items: center; }
.mood > span { font-weight: 700; margin-right: 4px; }
.mood input { display: none; }
.mood label { cursor: pointer; border: 1px solid #a0aec0; border-radius: 999px; padding: 4px 12px; background: #fff; font-size: 14px; }
.mood input:checked + label { background: #0e7490; border-color: #0e7490; color: #fff; font-weight: 700; }
.footer { text-align: center; padding: 18px; margin-top: 30px; background: #0e7490; color: #fff; border-radius: 10px; }
pre { background: #1a202c; color: #e2e8f0; padding: 12px 14px; border-radius: 8px; overflow-x: auto; }
@media (prefers-color-scheme: dark) {
  body { background: #0d1117; color: #e6edf3; }
  .quiz-box { background: #141c28; }
  .quiz-box details, .predict details, .spotbug details { background: #0f1622; border-color: #2d3748; color: #e2e8f0; }
  .flashcard { background: #241d0e; border-color: #975a16; }
}
</style>

### 🗺 Path: **Part 1** → Part 2 Auth → Part 3 SQL

## 1. Why API testing
> 🚩 **Why it matters:** catch contract bugs without a browser.

<div class="quiz-box"><h3>🧪 Pyramid check</h3><details><summary>Q1. Fastest feedback for a wrong JSON field?</summary><p><span class="quiz-correct">✓ API/service test</span> — No browser; assert JSON directly.</p></details><details><summary>Q2. Best for "button must be keyboard reachable"?</summary><p><span class="quiz-correct">✓ UI E2E / a11y</span> — Needs the real page.</p></details></div>

<div class="mood"><span>Mood:</span>
<input type="radio" name="m1" id="m1a"><label for="m1a">😊 Clear</label>
<input type="radio" name="m1" id="m1b"><label for="m1b">😐 Fuzzy</label>
<input type="radio" name="m1" id="m1c"><label for="m1c">😵 Stuck</label></div>


## 2. HTTP methods & status codes
> 🚩 **Why it matters:** status codes are the first assertion.

```javascript
const res = await fetch("http://127.0.0.1:4040/health");
console.log(res.status); // 200
```

<div class="predict"><details><summary>🤔 Predict: GET /products → status?</summary><p>200</p></details><details><summary>🤔 Predict: GET /products/9999 → status?</summary><p>404</p></details><details><summary>🤔 Predict: POST /products (valid+auth) → status?</summary><p>201</p></details></div>


## 3. REST resources & URLs
> 🚩 **Why it matters:** readable paths → readable tests.

<div class="quiz-box"><h3>🧪 REST</h3><details><summary>Q1. Prefer /products/1 or /getProduct?id=1?</summary><p><span class="quiz-correct">✓ /products/1</span> — Resource + id is conventional.</p></details></div>


## 4. Headers, query, JSON
> 🚩 **Why it matters:** missing Content-Type breaks servers.

Always send `Content-Type: application/json` for JSON bodies; put tokens in `Authorization`.

## 5. Assertions
> 🚩 **Why it matters:** status + shape + business field.

<details class="flashcard"><summary>🃏 Flash: Minimum assert set?</summary><div>Status → headers → shape → business fields</div></details>

## 6. Postman → code
> 🚩 **Why it matters:** CI cannot click Postman.

Map URL/method/headers/body/tests → `fetch` / Playwright `request` + asserts. Env var for base URL.

## 7. First green smoke
```bash
npm run mock-api && npm run lab:part1
```

## 8. Pitfalls + Spot-the-Bug
<div class="spotbug"><details><summary>🐞 Bug 1 — Wrong status on GET list</summary><pre><code>expect(res.status).toBe(201);</code></pre><p><strong>Fix:</strong> Use 200 for GET collection.</p></details><details><summary>🐞 Bug 2 — Never read body</summary><pre><code>await fetch(url);</code></pre><p><strong>Fix:</strong> const body = await res.json(); then assert.</p></details><details><summary>🐞 Bug 3 — 401 misread</summary><pre><code>// treat 401 as server down</code></pre><p><strong>Fix:</strong> 401 = missing/invalid auth.</p></details></div>


<details class="studyplan7"><summary>📅 7-day study plan</summary><ol><li>§§1–2</li><li>§3</li><li>§4</li><li>§5</li><li>§§6–7 lab</li><li>Pitfalls + Spot-the-Bug</li><li>Challenges + certificate in study app</li></ol></details>


## Practice & Challenges
See plain edition; auto-graded runner in **study app**.

<div class="footer">Part 1 · API & Data Essentials</div>

<!--P1I-END-->
