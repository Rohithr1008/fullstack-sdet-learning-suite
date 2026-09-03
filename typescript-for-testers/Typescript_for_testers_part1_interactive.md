# TypeScript for Testers — Part 1: Basics

Thin guide: **why TypeScript in automation** + types/interfaces/unions/optional.

<div class="interactive-note">💡 <strong>Interactive edition:</strong> quizzes, flashcards, predict cards. Best in <strong>VS Code preview</strong> (<code>Ctrl+Shift+V</code>). Study app adds progress + certificate.</div>

<div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;background:#1e3a5f;color:#e2e8f0;padding:8px 12px;border-radius:8px;margin:10px 0;font-size:0.95rem;">
  <a href="index.html" style="color:#7dd3fc;font-weight:600;text-decoration:none;">Hub</a>
  <strong style="color:#fff;">1 Basics</strong>
  <a href="Typescript_for_testers_part2_interactive.md" style="color:#7dd3fc;font-weight:600;text-decoration:none;">2 Playwright-TS →</a>
</div>

<style>
h2 { border-bottom: 3px solid #3178C6; padding-bottom: 6px; }
.interactive-note { background: #eff6ff; border-left: 4px solid #3178C6; padding: 10px 14px; border-radius: 6px; }
.tip    { background: #f0fff4; border-left: 4px solid #38a169; padding: 10px 14px; border-radius: 6px; }
.why    { background:#ebf4ff; border-left:4px solid #3178C6; padding:6px 12px; border-radius:6px; margin:6px 0 10px 0; font-size:0.92rem; }
.warn   { background: #fffaf0; border-left: 4px solid #dd6b20; padding: 10px 14px; border-radius: 6px; }
.quiz-box { background: #f7fafc; border: 2px solid #3178C6; border-radius: 10px; padding: 14px 18px; margin: 18px 0; }
.quiz-box h3 { margin-top: 0; color: #3178C6; }
.quiz-box details { background: #ffffff; border: 1px solid #cbd5e0; border-radius: 8px; padding: 8px 12px; margin: 8px 0; }
.quiz-box summary { cursor: pointer; font-weight: 600; }
.quiz-correct { color: #276749; font-weight: 700; }
.flashcard { background: #fffbeb; border: 2px solid #d69e2e; border-radius: 10px; padding: 10px 14px; margin: 10px 0; }
.flashcard summary { cursor: pointer; font-weight: 700; color: #744210; }
.predict { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 10px; margin: 14px 0; }
.predict details { background: #fff; border: 1px solid #cbd5e0; border-radius: 8px; padding: 8px 12px; }
.predict summary { cursor: pointer; font-weight: 600; }
.mood { margin-top: 12px; display: flex; flex-wrap: wrap; gap: 6px; align-items: center; }
.mood > span { font-weight: 700; margin-right: 4px; }
.mood input { display: none; }
.mood label { cursor: pointer; border: 1px solid #a0aec0; border-radius: 999px; padding: 4px 12px; background: #fff; font-size: 14px; user-select: none; }
.mood input:checked + label { background: #3178C6; border-color: #3178C6; color: #fff; font-weight: 700; }
.study-plan { background: #eff6ff; border: 1px solid #3178C6; border-radius: 10px; padding: 10px 16px; margin: 14px 0; }
.study-plan summary { cursor: pointer; font-weight: 700; color: #1e40af; font-size: 1.05em; }
.footer { text-align: center; padding: 18px; margin-top: 30px; background: #3178C6; color: #fff; border-radius: 10px; }
@media (prefers-color-scheme: dark) {
  .interactive-note, .study-plan { background: #0f1a2a; }
  .quiz-box { background: #151f30; border-color: #3178C6; }
  .quiz-box details, .predict details { background: #0d1420; border-color: #28374d; color: #e2e8f0; }
  .flashcard { background: #241d0e; color: #e2e8f0; }
  .mood label { background: #151f30; color: #cbd5e0; border-color: #28374d; }
}
</style>

<details class="study-plan">
<summary>📅 Suggested 5-day plan (Part 1)</summary>
<ol>
<li><strong>Day 1:</strong> §§1–2 why + primitives</li>
<li><strong>Day 2:</strong> §3 interfaces + flashcards</li>
<li><strong>Day 3:</strong> §§4–5 unions + optional</li>
<li><strong>Day 4:</strong> §§6–7 aliases + pitfalls</li>
<li><strong>Day 5:</strong> practice + challenges → Part 2</li>
</ol>
</details>

---

## 1. Why TypeScript in automation

<div class="why">🚩 <strong>Why it matters:</strong> wrong helper args fail in the IDE, not after a long CI run.</div>

Types catch shape mistakes early. This kit is **test-oriented** — Phase B covers full develop+test depth.

<div class="quiz-box">
<h3>🧪 Self-test</h3>
<details><summary>Do green E2E tests prove helper argument types are correct?</summary><p class="quiz-correct">No.</p></details>
<details><summary>One automation win from TS?</summary><p class="quiz-correct">Safer refactors of shared helpers/POM; fail fast in the IDE.</p></details>
</div>

<details class="flashcard"><summary>🃏 When is TS most valuable for testers?</summary><p>Shared helpers, fixtures, and POM — anything reused and refactored often.</p></details>

<div class="mood"><span>Mood:</span>
<input type="radio" name="m1" id="m1a"><label for="m1a">😊 Clear</label>
<input type="radio" name="m1" id="m1b"><label for="m1b">😐 OK</label>
<input type="radio" name="m1" id="m1c"><label for="m1c">😵 Foggy</label>
</div>

---

## 2. Primitive types & annotations

<div class="why">🚩 <strong>Why it matters:</strong> annotate your helper boundaries first.</div>

```ts
function isOk(status: number): boolean {
  return status >= 200 && status < 300;
}
```

<div class="quiz-box">
<details><summary>Annotate add(a,b) for numbers?</summary><p class="quiz-correct">(a: number, b: number): number</p></details>
<details><summary>Prefer any or unknown for unparsed JSON?</summary><p class="quiz-correct">unknown — then narrow.</p></details>
</div>

---

## 3. Interfaces

<div class="why">🚩 <strong>Why it matters:</strong> name fixture/API shapes once.</div>

```ts
interface UserFixture {
  email: string;
  password: string;
}
```

<div class="quiz-box">
<details><summary>Re-type every DOM node?</summary><p class="quiz-correct">No — use Playwright's Page/Locator types.</p></details>
</div>

---

## 4. Unions

<div class="why">🚩 <strong>Why it matters:</strong> lock small sets of allowed values.</div>

```ts
type TestResult = 'pass' | 'fail' | 'skip';
```

<div class="predict">
<details><summary>Predict: badge('passed') with TestResult union?</summary><p class="quiz-correct">Compile error — 'passed' not in union.</p></details>
<details><summary>Predict: env as 'dev' | 'stage' | 'prod' vs string?</summary><p class="quiz-correct">Union catches typos like 'stag'.</p></details>
</div>

---

## 5. Optional properties

<div class="why">🚩 <strong>Why it matters:</strong> options objects are full of maybes.</div>

```ts
interface ClickOptions { timeout?: number; force?: boolean }
```

<div class="quiz-box">
<details><summary>Must email?: string be provided?</summary><p class="quiz-correct">No — can omit.</p></details>
<details><summary>?? vs || ?</summary><p class="quiz-correct">?? only for null/undefined; || also treats 0 and '' as missing.</p></details>
</div>

---

## 6. Type aliases (light)

<div class="why">🚩 <strong>Why it matters:</strong> one consistent style beats debating online.</div>

<div class="tip">type → unions/aliases · interface → object shapes</div>

<details class="flashcard"><summary>🃏 Union of three strings — type or interface?</summary><p>type</p></details>

---

## 7. Common pitfalls

<div class="why">🚩 <strong>Why it matters:</strong> any-spam deletes the value of TS.</div>

<div class="warn"><strong>Spot-the-Bug:</strong> <code>function setEnv(env: any)</code> — fix with a string union.</div>

<div class="quiz-box">
<details><summary>Is @ts-ignore a good default?</summary><p class="quiz-correct">No — fix or narrow.</p></details>
</div>

---

## 8. Practice

1. Annotate `fullName(first, last)`.
2. `CartItem` interface with optional `note?`.
3. `BrowserName` union.
4. Warm-up: type `assertStatus` (full lab in Part 2).

---

## 9. Challenges

1. `idOf(res)` safely from `{ status, body?: { id?: string } }`.
2. Reporter param → `TestResult` union.
3. One sentence: `unknown` vs `any`.

---

## 10. Answer key

See plain edition §10 or study app. Short: annotate strings; `CartItem` as above; union for browsers; prefer `unknown`.

<div class="footer">Part 1 complete → <a href="Typescript_for_testers_part2_interactive.md" style="color:#fff;font-weight:700;">Part 2 Interactive</a></div>

<!--P1I-END-->
