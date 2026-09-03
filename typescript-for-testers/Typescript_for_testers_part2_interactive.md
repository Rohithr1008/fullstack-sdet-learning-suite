# TypeScript for Testers — Part 2: Playwright-oriented

tsconfig · Playwright+TS · light POM/helpers · JS→TS migrate.

<div class="interactive-note">💡 <strong>Interactive edition.</strong> VS Code preview (<code>Ctrl+Shift+V</code>). Lab files: <code>labs/migrate-before.js</code> → <code>labs/migrate-after.ts</code>.</div>

<div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;background:#134e4a;color:#e2e8f0;padding:8px 12px;border-radius:8px;margin:10px 0;font-size:0.95rem;">
  <a href="index.html" style="color:#5eead4;font-weight:600;text-decoration:none;">Hub</a>
  <a href="Typescript_for_testers_part1_interactive.md" style="color:#5eead4;font-weight:600;text-decoration:none;">← 1 Basics</a>
  <strong style="color:#fff;">2 Playwright-TS</strong>
</div>

<style>
h2 { border-bottom: 3px solid #0f766e; padding-bottom: 6px; }
.interactive-note { background: #ecfdf5; border-left: 4px solid #0f766e; padding: 10px 14px; border-radius: 6px; }
.why    { background:#e6fffa; border-left:4px solid #319795; padding:6px 12px; border-radius:6px; margin:6px 0 10px 0; font-size:0.92rem; }
.warn   { background: #fffaf0; border-left: 4px solid #dd6b20; padding: 10px 14px; border-radius: 6px; }
.quiz-box { background: #f7faf9; border: 2px solid #0f766e; border-radius: 10px; padding: 14px 18px; margin: 18px 0; }
.quiz-box details { background: #ffffff; border: 1px solid #cbd5e0; border-radius: 8px; padding: 8px 12px; margin: 8px 0; }
.quiz-box summary { cursor: pointer; font-weight: 600; }
.quiz-correct { color: #276749; font-weight: 700; }
.flashcard { background: #fffbeb; border: 2px solid #d69e2e; border-radius: 10px; padding: 10px 14px; margin: 10px 0; }
.flashcard summary { cursor: pointer; font-weight: 700; color: #744210; }
.predict details { background: #fff; border: 1px solid #cbd5e0; border-radius: 8px; padding: 8px 12px; margin: 8px 0; }
.mood { margin-top: 12px; display: flex; flex-wrap: wrap; gap: 6px; align-items: center; }
.mood input { display: none; }
.mood label { cursor: pointer; border: 1px solid #a0aec0; border-radius: 999px; padding: 4px 12px; background: #fff; font-size: 14px; }
.mood input:checked + label { background: #0f766e; border-color: #0f766e; color: #fff; font-weight: 700; }
.study-plan { background: #ecfdf5; border: 1px solid #0f766e; border-radius: 10px; padding: 10px 16px; margin: 14px 0; }
.study-plan summary { cursor: pointer; font-weight: 700; color: #0f766e; }
.footer { text-align: center; padding: 18px; margin-top: 30px; background: #0f766e; color: #fff; border-radius: 10px; }
@media (prefers-color-scheme: dark) {
  .interactive-note, .study-plan { background: #0f1f1c; }
  .quiz-box { background: #12201a; }
  .quiz-box details, .predict details { background: #0c1612; border-color: #243830; color: #e2e8f0; }
  .flashcard { background: #241d0e; color: #e2e8f0; }
  .mood label { background: #12201a; color: #cbd5e0; border-color: #243830; }
}
</style>

<details class="study-plan">
<summary>📅 Suggested 5-day plan (Part 2)</summary>
<ol>
<li>Days 1–2: §§1–2 tsconfig + Playwright overview</li>
<li>Day 3: §§3–4 POM + helpers</li>
<li>Day 4: §5 migrate lab + §6 errors</li>
<li>Day 5: pitfalls + practice → Playwright Essentials</li>
</ol>
</details>

---

## 1. tsconfig for testers

<div class="why">🚩 <strong>Why it matters:</strong> <code>strict</code> decides how many bugs the IDE catches.</div>

<div class="quiz-box">
<details><summary>Prefer strict false to move faster?</summary><p class="quiz-correct">No — hide fewer bugs; fix types instead.</p></details>
<details><summary>What does include control?</summary><p class="quiz-correct">Which files are typechecked.</p></details>
</div>

---

## 2. Playwright + TypeScript overview

<div class="why">🚩 <strong>Why it matters:</strong> Page/Locator/expect types are free docs.</div>

```ts
import { test, expect, type Page } from '@playwright/test';
```

<details class="flashcard"><summary>🃏 Where do Page types come from?</summary><p>@playwright/test</p></details>

---

## 3. Light POM annotations

<div class="why">🚩 <strong>Why it matters:</strong> typed fields document the page API.</div>

```ts
export class LoginPage {
  readonly page: Page;
  constructor(page: Page) { this.page = page; /* locators... */ }
  async login(email: string, password: string): Promise<void> { /* ... */ }
}
```

<div class="quiz-box">
<details><summary>Return type of async login?</summary><p class="quiz-correct">Promise&lt;void&gt;</p></details>
</div>

---

## 4. Helper annotations

<div class="why">🚩 <strong>Why it matters:</strong> shared asserts amplify type mistakes.</div>

<div class="predict">
<details><summary>Predict: expectStatus(res, '200') with expected: number?</summary><p class="quiz-correct">Type error — string not number.</p></details>
</div>

---

## 5. JS→TS migrate exercise

<div class="why">🚩 <strong>Why it matters:</strong> migrate helpers first — high reuse.</div>

Compare `labs/migrate-before.js` → `labs/migrate-after.ts`.

<div class="quiz-box">
<details><summary>Convert every file day one?</summary><p class="quiz-correct">No — incremental is normal.</p></details>
</div>

---

## 6. Reading TS errors

<div class="why">🚩 <strong>Why it matters:</strong> squiggles are clues.</div>

<details class="flashcard"><summary>🃏 Object is possibly undefined — first fix?</summary><p>Optional chaining, default (??), or a type guard — not as any.</p></details>

---

## 7. Common pitfalls

<div class="warn"><strong>Spot-the-Bug:</strong> <code>page: any</code> in open() — use <code>Page</code>.</div>

<div class="mood"><span>Mood:</span>
<input type="radio" name="m2" id="m2a"><label for="m2a">😊 Clear</label>
<input type="radio" name="m2" id="m2b"><label for="m2b">😐 OK</label>
<input type="radio" name="m2" id="m2c"><label for="m2c">😵 Foggy</label>
</div>

---

## 8–9. Practice & challenges

Annotate a tiny LogoutPage · `JobStatus` union · re-type lab payload · explain Phase B still exists (this kit ≠ TS-only develop jobs).

---

## 10. Where next

Playwright Essentials → harden/API/perf on the path. **Phase B** = TypeScript Develop + Test for app depth.

<div class="footer">Thin TS kit complete · next: Playwright Essentials</div>

<!--P2I-END-->
