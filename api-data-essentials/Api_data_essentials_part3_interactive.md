# API & Data Essentials — Part 3 (Data & SQL for Testers)

<div class="interactive-note">💡 Interactive edition — SQL drills, JOIN predicts, Spot-the-Bug. Study app includes in-memory SQL playground.</div>

<div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;background:#2d3748;color:#e2e8f0;padding:8px 12px;border-radius:8px;margin:10px 0;font-size:0.95rem;"><a href="index.html" style="color:#7dd3fc;font-weight:600;text-decoration:none;">Hub</a> <a href="Api_data_essentials_part1_interactive.md" style="color:#7dd3fc;font-weight:600;text-decoration:none;">1</a> · <a href="Api_data_essentials_part2_interactive.md" style="color:#7dd3fc;font-weight:600;text-decoration:none;">2</a> · <strong style="color:#fff;">3</strong></div>
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

## 1. Why testers need SQL
> 🚩 **Why it matters:** API responses can drift from stored state.

<div class="quiz-box"><h3>🧪 Why SQL</h3><details><summary>Q1. Name one assert that needs the DB.</summary><p><span class="quiz-correct">✓ POST created a row / soft-delete flag / report JOIN totals</span></p></details></div>

<div class="mood"><span>Mood:</span>
<input type="radio" name="m3" id="m3a"><label for="m3a">😊 Clear</label>
<input type="radio" name="m3" id="m3b"><label for="m3b">😐 Fuzzy</label>
<input type="radio" name="m3" id="m3c"><label for="m3c">😵 Stuck</label></div>


## 2. SELECT basics
> 🚩 **Why it matters:** every data check starts here.

```sql
SELECT id, title FROM products WHERE price >= 5 ORDER BY price DESC LIMIT 10;
```

<div class="predict"><details><summary>🤔 Predict: Which clause filters rows?</summary><p>WHERE</p></details><details><summary>🤔 Predict: Which clause caps rows for a fast test?</summary><p>LIMIT</p></details></div>


## 3. JOIN
> 🚩 **Why it matters:** orders need user + product context.

<details class="flashcard"><summary>🃏 Flash: INNER JOIN?</summary><div>Returns rows only when both sides match on the ON condition.</div></details>

## 4–5. Seed / teardown / strategies
Unique per-test data + reset fixtures. Avoid shared mutable users in parallel CI.

## 6. API ↔ DB
```bash
npm run lab:part3
```

## 7. Spot-the-Bug
<div class="spotbug"><details><summary>🐞 Bug 1 — Compare wrong table</summary><pre><code>expect(apiOrders.length).toBe(db.products.length)</code></pre><p><strong>Fix:</strong> Compare to db.orders.</p></details><details><summary>🐞 Bug 2 — No teardown</summary><pre><code>await create(); await assert(); // end</code></pre><p><strong>Fix:</strong> finally { await reset(); }</p></details></div>


<details class="studyplan7"><summary>📅 7-day study plan</summary><ol><li>Why SQL</li><li>SELECT</li><li>JOIN</li><li>Seed/teardown</li><li>Strategies</li><li>API↔DB lab</li><li>Challenges + certificate</li></ol></details>


<div class="footer">Part 3 · API & Data Essentials</div>

<!--P3I-END-->
