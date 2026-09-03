# HTML & CSS Essentials — Part 2: Layout & a11y (Interactive)

<style>
.tip,.warn,.why,.quiz-box,.flashcard,.mood{border-radius:8px;padding:10px 14px;margin:12px 0}
.why{background:#ebf4ff;border-left:4px solid #3182ce}
.quiz-box{background:#f7f9fc;border:2px solid #4299e1}
.quiz-box details{background:#fff;border:1px solid #cbd5e0;border-radius:8px;padding:8px 12px;margin:8px 0}
.quiz-correct{color:#276749;font-weight:700}
.partnav{display:flex;gap:8px;flex-wrap:wrap;background:#1e3a5f;color:#e2e8f0;padding:8px 12px;border-radius:8px;margin:8px 0}
.partnav a{color:#93c5fd;font-weight:600;text-decoration:none}
@media (prefers-color-scheme:dark){.why{background:#0f1a2a}.quiz-box{background:#151f30}.quiz-box details{background:#0d1420;border-color:#28374d}}
</style>

<div class="partnav" aria-label="Part navigation">
<a href="index.html">Hub</a>
<a href="Html_css_essentials_part1_interactive.md">1</a>
<a href="Html_css_essentials_part2_interactive.md">2</a>
<a href="Html_css_essentials_part3_interactive.md">3</a>
<strong>Part 2</strong>
</div>

> Open with **Ctrl+Shift+V** in VS Code. Study app (offline): `Html_css_essentials_part2_study_app.html`.

You are here: **Part 2 — Layout, responsive, specificity, a11y markup**. Prev: [Part 1](Html_css_essentials_part1_with_examples.md). Next: [Part 3](Html_css_essentials_part3_with_examples.md).

## 1. CSS mental model

<div class="why">🚩 <strong>Why it matters:</strong> Cascade + specificity explain “why didn’t my style apply?” — same root cause as flaky visual asserts.</div>

Browser: parse HTML → build DOM → apply CSS (cascade) → layout → paint.

| **Layer****Tester angle**|

| Author stylesYour stylesheet / component CSS|

| Inline styleOften wins — check Elements|

| !importantEscape hatch; smell in reviews|

<div class="quiz-box"><strong>🧪 Self-test</strong>
<details><summary>Where do you verify the final style?</summary><p class="quiz-correct">Computed styles in DevTools.</p></details>
<details><summary>Does class order in HTML set specificity?</summary><p class="quiz-correct">No — specificity + source order in CSS matter.</p></details>
</div>

---

## 2. Selectors &amp; specificity (practical)

<div class="why">🚩 <strong>Why it matters:</strong> Knowing specificity stops blind !important wars and helps you read component CSS.</div>

| **Selector****Rough weight**|

| element (`button`)0,0,1|

| class / attr (`.btn`, `[data-x]`)0,1,0|

| id (`#pay`)1,0,0|

| inline stylebeats ids (unless !important fights)|

```html
button.primary { }          /* class beats bare button */
#nav .link { }              /* id context wins over .link alone */

```

> 🧪 *Playground available in the study app.*

<div class="quiz-box"><strong>🧪 Self-test</strong>
<details><summary>Does <code>#id</code> beat <code>.class.class</code>?</summary><p class="quiz-correct">Yes — one id beats any number of classes.</p></details>
<details><summary>Best fix for “style not applying”?</summary><p class="quiz-correct">Inspect computed + check more specific rule, not random !important.</p></details>
</div>

---

## 3. Flexbox essentials

<div class="why">🚩 <strong>Why it matters:</strong> Most modern toolbars, navs, and card rows are flex — layout bugs show as overflow/overlap in tests.</div>

```html
.row {
  display: flex;
  gap: 12px;
  justify-content: space-between; /* main axis */
  align-items: center;            /* cross axis */
}

```

| **Prop****Job**|

| `flex-direction`row / column|

| `justify-content`main-axis packing|

| `align-items`cross-axis alignment|

| `flex-wrap`allow wrapping|

> 🧪 *Playground available in the study app.*

BC

Tweaking flex…

<div class="quiz-box"><strong>🧪 Self-test</strong>
<details><summary>Main axis for default flex-direction:row?</summary><p class="quiz-correct">Horizontal (left→right in LTR).</p></details>
<details><summary>Prop for spacing between items without margins?</summary><p class="quiz-correct"><code>gap</code></p></details>
</div>

---

## 4. CSS Grid essentials

<div class="why">🚩 <strong>Why it matters:</strong> Dashboards and form layouts often use Grid — broken tracks look like “missing” UI in screenshots.</div>

```html
.layout {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 16px;
}

```

`fr` = fraction of free space. `repeat(3, 1fr)` = three equal columns.

> 🧪 *Playground available in the study app.*

234

Grid columns: 1fr 1fr

<div class="quiz-box"><strong>🧪 Self-test</strong>
<details><summary>What does <code>1fr</code> mean?</summary><p class="quiz-correct">One share of remaining free space.</p></details>
<details><summary>Flex vs Grid one-liner?</summary><p class="quiz-correct">Flex = 1D; Grid = 2D tracks.</p></details>
</div>

---

## 5. Responsive basics &amp; media queries

<div class="why">🚩 <strong>Why it matters:</strong> Mobile failures are real bugs — Playwright projects often run a mobile project for a reason.</div>

```html
.nav { display: flex; }
@media (max-width: 600px) {
  .nav { flex-direction: column; }
}

```

- Design mobile-first (`min-width` queries) when you can

- Test at common widths: ~375, 768, 1280

- `viewport` meta is required for real mobile layout

> 🧪 *Playground available in the study app.*

<div class="quiz-box"><strong>🧪 Self-test</strong>
<details><summary>Meta tag needed for mobile CSS?</summary><p class="quiz-correct"><code>&lt;meta name="viewport" content="width=device-width, initial-scale=1"&gt;</code></p></details>
<details><summary>Why retest at 375px?</summary><p class="quiz-correct">Nav/stack breakpoints often hide or move controls.</p></details>
</div>

---

## 6. Units: rem, %, vw/vh

<div class="why">🚩 <strong>Why it matters:</strong> Font zoom + responsive units change hit targets — a11y and mobile projects care.</div>

| **Unit****Relative to**|

| `px`absolute CSS pixels|

| `rem`root font size|

| `%`parent (context-dependent)|

| `vw`/`vh`viewport width/height|

Prefer `rem` for type/spacing so user font settings scale the UI.

<div class="quiz-box"><strong>🧪 Self-test</strong>
<details><summary>Best unit for scalable typography?</summary><p class="quiz-correct"><code>rem</code></p></details>
<details><summary>100vw is…?</summary><p class="quiz-correct">Full viewport width.</p></details>
</div>

---

## 7. Accessibility markup that helps tests

<div class="why">🚩 <strong>Why it matters:</strong> Good a11y markup = stable <code>getByRole</code> / <code>getByLabel</code> — less testid spam.</div>

- Real `<button>` / `<a href>` — not clickable divs

- Label every input

- One `h1`; don’t skip heading levels wildly

- `alt` on meaningful images; `alt=""` when decorative

- `lang` on `<html>`

```html
<button aria-pressed="false">Mute</button>
<nav aria-label="Primary">…</nav>

```

<div class="quiz-box"><strong>🧪 Self-test</strong>
<details><summary>Why does aria-label on nav help?</summary><p class="quiz-correct">Distinguishes landmarks; names the navigation for AT + roles.</p></details>
<details><summary>Clickable div vs button?</summary><p class="quiz-correct">Prefer button for keyboard/role.</p></details>
</div>

---

## 8. Color, contrast &amp; focus (light)

<div class="why">🚩 <strong>Why it matters:</strong> Low contrast and missing focus rings fail a11y checks and keyboard testing.</div>

- Aim for WCAG AA contrast (≈ 4.5:1 normal text)

- Never remove `:focus` outlines without a visible replacement

- Don’t rely on color alone for errors

```html
button:focus-visible {
  outline: 3px solid #1d4f91;
  outline-offset: 2px;
}

```

<div class="quiz-box"><strong>🧪 Self-test</strong>
<details><summary>Is outline:none OK with no replacement?</summary><p class="quiz-correct">No — keyboard users lose position.</p></details>
<details><summary>AA contrast ballpark for normal text?</summary><p class="quiz-correct">About 4.5:1</p></details>
</div>

---

## 9. Layout pitfalls for testers

<div class="why">🚩 <strong>Why it matters:</strong> Overlap, overflow hidden, and sticky headers cause “not visible” / wrong click targets.</div>

| **Smell****What you see**|

| `overflow: hidden`Clipped content; Playwright may still think attached|

| z-index stackingClick hits overlay|

| fixed headerElement covered; need scroll-into-view offset|

| duplicate namesgetByRole strict mode violation|

**🐞 Spot-the-Bug**
Test clicks “Save” but hits a transparent marketing bannerStacking/overlay — inspect z-index & pointer-events; dismiss banner or target with trial.

Two buttons named Submit on pageStrict mode ambiguity — scope to form or use testid.

<div class="quiz-box"><strong>🧪 Self-test</strong>
<details><summary>Covered by sticky header — first check?</summary><p class="quiz-correct">Scroll into view / layout; maybe offset or dismiss chrome.</p></details>
<details><summary>Strict mode violation means?</summary><p class="quiz-correct">Locator resolved to multiple elements.</p></details>
</div>

---

## 10. Practice, challenges &amp; answer key

<div class="why">🚩 <strong>Why it matters:</strong> Build tiny layout fluency before Part 3’s mini page.</div>

- Make a flex header: logo left, nav right.

- Make a 2-column grid that becomes 1 column under 600px.

- Add `:focus-visible` outline to buttons.

- Label a search field accessibly.

- Explain why `#app .btn` beats `.btn`.

Answer key (sketch)

- `display:flex; justify-content:space-between; align-items:center`

- `grid-template-columns:1fr 1fr` + `@media (max-width:600px){ … 1fr }`

- outline + offset on `:focus-visible`

- `<label for="q">` + `id="q"`

- Higher specificity (extra id + class vs class)

<div class="quiz-box"><strong>🧪 Self-test</strong>
<details><summary>After Part 2, what’s next?</summary><p class="quiz-correct">Part 3 mini page + Playwright checklist (not full E2E course).</p></details>
</div>


🎉 **Done with Part 2 interactive notes.**

<script>
function hceExpand(open){document.querySelectorAll('details').forEach(function(d){d.open=!!open;});}
</script>
<!--P2I-END-->
