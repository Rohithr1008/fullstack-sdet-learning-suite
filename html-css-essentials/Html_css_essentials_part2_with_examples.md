# HTML & CSS Essentials — Part 2: Layout & a11y

> 💡 **Study guide (plain edition):** open answers, print-friendly. Interactive: `Html_css_essentials_part2_interactive.md`. Study app: `Html_css_essentials_part2_study_app.html`.

### 🗺 Your path

You are here: **Part 2 — Layout, responsive, specificity, a11y markup**. Prev: [Part 1](Html_css_essentials_part1_with_examples.md). Next: [Part 3](Html_css_essentials_part3_with_examples.md).

## Table of Contents

1. CSS mental model
2. Selectors & specificity (practical)
3. Flexbox essentials
4. CSS Grid essentials
5. Responsive basics & media queries
6. Units: rem, %, vw/vh
7. Accessibility markup that helps tests
8. Color, contrast & focus (light)
9. Layout pitfalls for testers
10. Practice, challenges & answer key

---

## 1. CSS mental model

> 🚩 **Why it matters:** Cascade + specificity explain “why didn’t my style apply?” — same root cause as flaky visual asserts.

Browser: parse HTML → build DOM → apply CSS (cascade) → layout → paint.

| **Layer****Tester angle**|

| Author stylesYour stylesheet / component CSS|

| Inline styleOften wins — check Elements|

| !importantEscape hatch; smell in reviews|

### 🧪 Quiz

**Q:** Where do you verify the final style?
**A:** Computed styles in DevTools.

**Q:** Does class order in HTML set specificity?
**A:** No — specificity + source order in CSS matter.

---

## 2. Selectors & specificity (practical)

> 🚩 **Why it matters:** Knowing specificity stops blind !important wars and helps you read component CSS.

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

### 🧪 Quiz

**Q:** Does #id beat .class.class?
**A:** Yes — one id beats any number of classes.

**Q:** Best fix for “style not applying”?
**A:** Inspect computed + check more specific rule, not random !important.

---

## 3. Flexbox essentials

> 🚩 **Why it matters:** Most modern toolbars, navs, and card rows are flex — layout bugs show as overflow/overlap in tests.

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

### 🧪 Quiz

**Q:** Main axis for default flex-direction:row?
**A:** Horizontal (left→right in LTR).

**Q:** Prop for spacing between items without margins?
**A:** gap

---

## 4. CSS Grid essentials

> 🚩 **Why it matters:** Dashboards and form layouts often use Grid — broken tracks look like “missing” UI in screenshots.

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

### 🧪 Quiz

**Q:** What does 1fr mean?
**A:** One share of remaining free space.

**Q:** Flex vs Grid one-liner?
**A:** Flex = 1D; Grid = 2D tracks.

---

## 5. Responsive basics & media queries

> 🚩 **Why it matters:** Mobile failures are real bugs — Playwright projects often run a mobile project for a reason.

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

### 🧪 Quiz

**Q:** Meta tag needed for mobile CSS?
**A:** <meta name="viewport" content="width=device-width, initial-scale=1">

**Q:** Why retest at 375px?
**A:** Nav/stack breakpoints often hide or move controls.

---

## 6. Units: rem, %, vw/vh

> 🚩 **Why it matters:** Font zoom + responsive units change hit targets — a11y and mobile projects care.

| **Unit****Relative to**|

| `px`absolute CSS pixels|

| `rem`root font size|

| `%`parent (context-dependent)|

| `vw`/`vh`viewport width/height|

Prefer `rem` for type/spacing so user font settings scale the UI.

### 🧪 Quiz

**Q:** Best unit for scalable typography?
**A:** rem

**Q:** 100vw is…?
**A:** Full viewport width.

---

## 7. Accessibility markup that helps tests

> 🚩 **Why it matters:** Good a11y markup = stable getByRole / getByLabel — less testid spam.

- Real `<button>` / `<a href>` — not clickable divs

- Label every input

- One `h1`; don’t skip heading levels wildly

- `alt` on meaningful images; `alt=""` when decorative

- `lang` on `<html>`

```html
<button aria-pressed="false">Mute</button>
<nav aria-label="Primary">…</nav>

```

### 🧪 Quiz

**Q:** Why does aria-label on nav help?
**A:** Distinguishes landmarks; names the navigation for AT + roles.

**Q:** Clickable div vs button?
**A:** Prefer button for keyboard/role.

---

## 8. Color, contrast & focus (light)

> 🚩 **Why it matters:** Low contrast and missing focus rings fail a11y checks and keyboard testing.

- Aim for WCAG AA contrast (≈ 4.5:1 normal text)

- Never remove `:focus` outlines without a visible replacement

- Don’t rely on color alone for errors

```html
button:focus-visible {
  outline: 3px solid #1d4f91;
  outline-offset: 2px;
}

```

### 🧪 Quiz

**Q:** Is outline:none OK with no replacement?
**A:** No — keyboard users lose position.

**Q:** AA contrast ballpark for normal text?
**A:** About 4.5:1

---

## 9. Layout pitfalls for testers

> 🚩 **Why it matters:** Overlap, overflow hidden, and sticky headers cause “not visible” / wrong click targets.

| **Smell****What you see**|

| `overflow: hidden`Clipped content; Playwright may still think attached|

| z-index stackingClick hits overlay|

| fixed headerElement covered; need scroll-into-view offset|

| duplicate namesgetByRole strict mode violation|

**🐞 Spot-the-Bug**
Test clicks “Save” but hits a transparent marketing bannerStacking/overlay — inspect z-index & pointer-events; dismiss banner or target with trial.

Two buttons named Submit on pageStrict mode ambiguity — scope to form or use testid.

### 🧪 Quiz

**Q:** Covered by sticky header — first check?
**A:** Scroll into view / layout; maybe offset or dismiss chrome.

**Q:** Strict mode violation means?
**A:** Locator resolved to multiple elements.

---

## 10. Practice, challenges & answer key

> 🚩 **Why it matters:** Build tiny layout fluency before Part 3’s mini page.

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

### 🧪 Quiz

**Q:** After Part 2, what’s next?
**A:** Part 3 mini page + Playwright checklist (not full E2E course).


🎉 **Congratulations** — Part 2 plain edition complete. Next: see README hub.

<!--P2-END-->
