# API & Data Essentials — Part 2 (Auth & Contracts)

<div class="interactive-note">💡 Interactive edition — auth quizzes, negative predicts, Spot-the-Bug. Study app has live auth mock.</div>

<div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;background:#2d3748;color:#e2e8f0;padding:8px 12px;border-radius:8px;margin:10px 0;font-size:0.95rem;"><a href="index.html" style="color:#7dd3fc;font-weight:600;text-decoration:none;">Hub</a> <a href="Api_data_essentials_part1_interactive.md" style="color:#7dd3fc;font-weight:600;text-decoration:none;">1</a> · <strong style="color:#fff;">2</strong> · <a href="Api_data_essentials_part3_interactive.md" style="color:#7dd3fc;font-weight:600;text-decoration:none;">3</a></div>
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

## 1. Auth types
> 🚩 **Why it matters:** wrong header = endless 401s.

<div class="quiz-box"><h3>🧪 Auth</h3><details><summary>Q1. Bearer token goes in which header?</summary><p><span class="quiz-correct">✓ Authorization: Bearer <token></span></p></details><details><summary>Q2. 401 vs 403?</summary><p><span class="quiz-correct">✓ 401 = not authenticated; 403 = authenticated but not allowed</span> — Role/permission vs missing identity.</p></details></div>

<div class="mood"><span>Mood:</span>
<input type="radio" name="m2" id="m2a"><label for="m2a">😊 Clear</label>
<input type="radio" name="m2" id="m2b"><label for="m2b">😐 Fuzzy</label>
<input type="radio" name="m2" id="m2c"><label for="m2c">😵 Stuck</label></div>


## 2. Login → token
> 🚩 **Why it matters:** tests need a repeatable way to get credentials.

```javascript
const { access_token } = await (await fetch(base+"/auth/login", {
  method:"POST", headers:{"Content-Type":"application/json"},
  body: JSON.stringify({email:"tester@demo.test", password:"pass123"})
})).json();
```

## 3–4. Negatives & status matrix
<div class="predict"><details><summary>🤔 Predict: POST /products no auth → ?</summary><p>401</p></details><details><summary>🤔 Predict: DELETE with X-API-Key lab-key-42 → ?</summary><p>403</p></details><details><summary>🤔 Predict: POST {title:'', price:-1} with auth → ?</summary><p>422</p></details></div>


## 5. Schema smoke
> 🚩 **Why it matters:** 201 with string price still breaks clients.

<details class="flashcard"><summary>🃏 Flash: What is schema smoke?</summary><div>Quick required-keys + type checks — not full contract testing.</div></details>

## 6–7. Retries & pitfalls
<div class="spotbug"><details><summary>🐞 Bug 1 — Wrong expected on role deny</summary><pre><code>expect(status).toBe(401); // API key delete</code></pre><p><strong>Fix:</strong> Expect 403 for authenticated-but-forbidden.</p></details><details><summary>🐞 Bug 2 — Token in URL</summary><pre><code>GET /products?token=abc</code></pre><p><strong>Fix:</strong> Use Authorization header.</p></details></div>


```bash
npm run lab:part2
```

<details class="studyplan7"><summary>📅 7-day study plan</summary><ol><li>Auth types</li><li>Login flow</li><li>Negatives</li><li>Matrix + lab</li><li>Schema smoke</li><li>Pitfalls</li><li>Challenges</li></ol></details>


<div class="footer">Part 2 · API & Data Essentials</div>

<!--P2I-END-->
