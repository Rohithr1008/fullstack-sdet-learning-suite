# Playwright Essentials — Part 0: Testing Mindset (Strategy) (Interactive)

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
  <strong>Part 0</strong>
  <a href="Playwright_essentials_part0_study_app.html">Study app</a>
  <a href="Playwright_essentials_part0_with_examples.md">Plain</a>
</div>

> Interactive markdown — open with VS Code preview (`Ctrl+Shift+V`). Full mocks/SRS/certificate live in the study app.

This is the Strategy module (Part 0). Playwright Part 1 also repeats a short strategy slice.

## 1. Why testing strategy exists

<div class="why">🚩 <strong>Why it matters:</strong> Strategy decides *what* to automate so you don't drown in brittle E2E.</div>

<div class="quiz-box"><h3>Quick check</h3><p>Can you restate this section's why-it-matters?</p>
<details><summary>Reveal</summary><p class="quiz-correct">✓ Strategy decides *what* to automate so you don't drown in brittle E2E.</p><p class="quiz-wrong">✗ Skipping the "why" makes facts forgettable.</p></details></div>

## 2. The test pyramid

<div class="why">🚩 <strong>Why it matters:</strong> Many unit, fewer integration/API, fewest E2E — speed and signal.</div>

<div class="predict"><details><summary>Predict: 200 E2E and almost no unit tests — what happens?</summary><p>Slow CI, frequent flakes, late feedback.</p></details></div>

## 3. Risk-based selection

<div class="why">🚩 <strong>Why it matters:</strong> Automate paths that hurt customers or revenue when broken.</div>

## 4. When NOT to E2E

<div class="why">🚩 <strong>Why it matters:</strong> Pure logic, static pages, and anything already proven cheaper.</div>

<div class="quiz-box"><h3>Quick check</h3><p>Can you restate this section's why-it-matters?</p>
<details><summary>Reveal</summary><p class="quiz-correct">✓ Pure logic, static pages, and anything already proven cheaper.</p><p class="quiz-wrong">✗ Skipping the "why" makes facts forgettable.</p></details></div>

## 5. Flake vs product bug

<div class="why">🚩 <strong>Why it matters:</strong> Triage intermittent failures before rewriting product code.</div>

## 6. Bug reports that help

<div class="why">🚩 <strong>Why it matters:</strong> Repro, expected vs actual, environment, artifacts.</div>

## 7. Definition of done for tests

<div class="why">🚩 <strong>Why it matters:</strong> Deterministic, CI-green, readable failure messages.</div>

<div class="quiz-box"><h3>Quick check</h3><p>Can you restate this section's why-it-matters?</p>
<details><summary>Reveal</summary><p class="quiz-correct">✓ Deterministic, CI-green, readable failure messages.</p><p class="quiz-wrong">✗ Skipping the "why" makes facts forgettable.</p></details></div>

## 8. Common strategy pitfalls

<div class="why">🚩 <strong>Why it matters:</strong> 100% E2E, testing implementation details, ignoring ROI.</div>

## 9. Practice

<div class="why">🚩 <strong>Why it matters:</strong> Map one feature across pyramid layers.</div>

## 10. Challenges

<div class="why">🚩 <strong>Why it matters:</strong> Classify scenarios into unit / api / e2e.</div>

<div class="quiz-box"><h3>Quick check</h3><p>Can you restate this section's why-it-matters?</p>
<details><summary>Reveal</summary><p class="quiz-correct">✓ Classify scenarios into unit / api / e2e.</p><p class="quiz-wrong">✗ Skipping the "why" makes facts forgettable.</p></details></div>

## 11. Answer key

<div class="why">🚩 <strong>Why it matters:</strong> Compare classifications.</div>

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

Conceptual — apply mindset before writing labs in Part 1.

```bash
npm test -- labs/part1
```

<script>
function p0iExpand(on){
  document.querySelectorAll('.quiz-box details,.predict details').forEach(function(d){ d.open=!!on; });
}
</script>

<!--P0I-END-->
