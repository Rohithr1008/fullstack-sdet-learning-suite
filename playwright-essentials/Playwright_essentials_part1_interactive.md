# Playwright Essentials — Part 1: Foundations (Interactive)

<style>
.tip{background:#f0fff4;border-left:4px solid #38a169;padding:10px 14px;margin:8px 0;color:#1a202c;}
.warn{background:#fffaf0;border-left:4px solid #dd6b20;padding:10px 14px;margin:8px 0;color:#1a202c;}
.chall{background:#f5f3ff;border-left:4px solid #6b46c1;padding:10px 14px;margin:8px 0;color:#1a202c;}
.why{background:#eef2ff;border-left:4px solid #5a67d8;padding:6px 12px;margin:6px 0 10px;font-size:0.92rem;color:#1a202c;}
.quiz-box{background:#f7f9fc;border:2px solid #4299e1;border-radius:10px;padding:14px 18px;margin:18px 0;}
.quiz-correct{color:#276749;font-weight:700;}
.quiz-wrong{color:#9b2c2c;}
.flashcard{background:#fff;border:1px solid #cbd5e0;border-radius:8px;padding:12px;margin:8px 0;cursor:pointer;}
.mood{margin:12px 0;}
.predict details{background:#fff;border:1px solid #cbd5e0;border-radius:8px;padding:8px 12px;margin:6px 0;}
.partnav{display:flex;gap:8px;flex-wrap:wrap;background:#2d3748;color:#e2e8f0;padding:8px 12px;border-radius:8px;}
.partnav a{color:#7dd3fc;}
@media (prefers-color-scheme:dark){
  .tip,.warn,.chall,.why,.quiz-box,.flashcard,.predict details{color:#e2e8f0;}
  .tip{background:#132a1c;} .warn{background:#2b2013;} .chall{background:#2b1420;} .why{background:#1c2333;}
  .quiz-box{background:#141c28;} .flashcard,.predict details{background:#0f1622;}
}
</style>

<div class="partnav" aria-label="Part navigation">
  <a href="index.html">Hub</a>
  <strong>Part 1</strong>
  <a href="Playwright_essentials_part1_study_app.html">Study app</a>
  <a href="Playwright_essentials_part1_with_examples.md">Plain</a>
</div>

> Interactive markdown — open with VS Code preview (`Ctrl+Shift+V`). Full mocks/SRS/certificate live in the study app.

Requires Node + Playwright browsers. Study app mocks teach offline; labs prove skill.

## 1. What E2E is vs unit/integration

<div class="why">🚩 <strong>Why it matters:</strong> E2E drives a real browser through user journeys.</div>

<div class="quiz-box"><h3>Quick check</h3><p>Can you restate this section's why-it-matters?</p>
<details><summary>Reveal</summary><p class="quiz-correct">✓ E2E drives a real browser through user journeys.</p><p class="quiz-wrong">✗ Skipping the "why" makes facts forgettable.</p></details></div>

## 2. Strategy slice — pyramid & when not to E2E

<div class="why">🚩 <strong>Why it matters:</strong> Keep E2E thin; push logic down the pyramid.</div>

<div class="predict"><details><summary>Predict: 200 E2E and almost no unit tests — what happens?</summary><p>Slow CI, frequent flakes, late feedback.</p></details></div>

## 3. Why Playwright

<div class="why">🚩 <strong>Why it matters:</strong> Auto-wait, tracing, codegen, multi-browser.</div>

## 4. Install & browsers

<div class="why">🚩 <strong>Why it matters:</strong> `npm i -D @playwright/test` then `npx playwright install`.</div>

<div class="quiz-box"><h3>Quick check</h3><p>Can you restate this section's why-it-matters?</p>
<details><summary>Reveal</summary><p class="quiz-correct">✓ `npm i -D @playwright/test` then `npx playwright install`.</p><p class="quiz-wrong">✗ Skipping the "why" makes facts forgettable.</p></details></div>

## 5. test() and expect()

<div class="why">🚩 <strong>Why it matters:</strong> Smallest green test structure.</div>

## 6. First visit + assert

<div class="why">🚩 <strong>Why it matters:</strong> `goto`, `getByRole`, `toBeVisible`.</div>

## 7. Codegen intro

<div class="why">🚩 <strong>Why it matters:</strong> Bootstrap then clean recordings.</div>

<div class="quiz-box"><h3>Quick check</h3><p>Can you restate this section's why-it-matters?</p>
<details><summary>Reveal</summary><p class="quiz-correct">✓ Bootstrap then clean recordings.</p><p class="quiz-wrong">✗ Skipping the "why" makes facts forgettable.</p></details></div>

## 8. Config basics

<div class="why">🚩 <strong>Why it matters:</strong> `baseURL`, projects, `webServer`.</div>

## 9. Headed vs headless

<div class="why">🚩 <strong>Why it matters:</strong> Debug with `--headed` / UI mode.</div>

## 10. Traces & screenshots on fail

<div class="why">🚩 <strong>Why it matters:</strong> `trace: 'on-first-retry'`.</div>

<div class="quiz-box"><h3>Quick check</h3><p>Can you restate this section's why-it-matters?</p>
<details><summary>Reveal</summary><p class="quiz-correct">✓ `trace: 'on-first-retry'`.</p><p class="quiz-wrong">✗ Skipping the "why" makes facts forgettable.</p></details></div>

## 11. Common pitfalls

<div class="why">🚩 <strong>Why it matters:</strong> Hard waits, brittle CSS, missing baseURL.</div>

## 12. Practice

<div class="why">🚩 <strong>Why it matters:</strong> Run `labs/part1` against demo-app.</div>

## 13. Challenges

<div class="why">🚩 <strong>Why it matters:</strong> Locator-style helper.</div>

<div class="quiz-box"><h3>Quick check</h3><p>Can you restate this section's why-it-matters?</p>
<details><summary>Reveal</summary><p class="quiz-correct">✓ Locator-style helper.</p><p class="quiz-wrong">✗ Skipping the "why" makes facts forgettable.</p></details></div>

## 14. Answer key

<div class="why">🚩 <strong>Why it matters:</strong> Solutions.</div>

## Spot-the-Bug

<div class="chall">
<details><summary>🐞 Only CSS nth-child locators everywhere</summary><p>Prefer role/label/test id; CSS breaks on layout churn.</p></details>
<details><summary>🐞 `waitForTimeout(5000)` before every click</summary><p>Use auto-waiting assertions/actions instead.</p></details>
</div>

## Flashcards

<div class="flashcard" onclick="this.classList.toggle('open')"><strong>Q:</strong> What is storageState?<br><em>A: Saved cookies/localStorage to reuse auth.</em></div>
<div class="flashcard"><strong>Q:</strong> When not to E2E?<br><em>A: Pure logic / static content / cheaper coverage exists.</em></div>

<div class="mood"><span>Mood check:</span> 😅 / 😐 / 😄 — be honest, then revisit tough sections.</div>

## Lab

`labs/part1/home.spec.js` — home heading + Shop now navigation.

```bash
npm test -- labs/part1
```

<script>
function p1iExpand(on){
  document.querySelectorAll('.quiz-box details,.predict details').forEach(function(d){ d.open=!!on; });
}
</script>

<!--P1I-END-->
