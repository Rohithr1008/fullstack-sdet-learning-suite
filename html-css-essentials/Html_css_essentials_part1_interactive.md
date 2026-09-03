# HTML & CSS Essentials — Part 1: For testers (Interactive)

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
<strong>Part 1</strong>
</div>

> Open with **Ctrl+Shift+V** in VS Code. Study app (offline): `Html_css_essentials_part1_study_app.html`.

Part of the **[Automation Tester Path](../automation-tester-path/README.md)**.
You are here: **Part 1 — HTML/CSS for testers**. Next: [Part 2](Html_css_essentials_part2_with_examples.md) (layout/a11y) → [Part 3](Html_css_essentials_part3_with_examples.md) (mini page) → [Playwright Essentials](../playwright-essentials/README.md).

## 1. Why HTML &amp; CSS for testers

<div class="why">🚩 <strong>Why it matters:</strong> Locators, visibility failures, and “element not found” almost always start in the DOM — not in Playwright magic.</div>

Before writing `page.getByRole(...)`, you need to **read the page**: tags, attributes, what CSS hides, and what screen readers / Playwright roles see.

| **You will use this for…****Example**|

| Stable selectors`data-testid`, roles, labels|

| Debugging flakesopacity 0 vs `display:none`|

| Talking with devs“That div isn’t a button — add a real <button>”|

**Path note:** Do this Part 1 _before_ deep Playwright. Parts 2–3 help when you also build or polish UI.

<div class="quiz-box"><strong>🧪 Self-test</strong>
<details><summary>Do green unit tests prove your locator will find the Submit button?</summary><p class="quiz-correct">No — locators care about the live DOM/CSS.</p></details>
<details><summary>Name one reason a tester opens DevTools Elements.</summary><p class="quiz-correct">Inspect tag/attributes, computed styles, or why something is invisible.</p></details>
</div>

---

## 2. Tags &amp; document structure

<div class="why">🚩 <strong>Why it matters:</strong> Playwright and accessibility trees walk the same HTML skeleton you see in Elements.</div>

Every page is a tree:

```html
<!DOCTYPE html>
<html lang="en">
  <head>…meta, title, CSS…</head>
  <body>
    <header>…</header>
    <main>…</main>
    <footer>…</footer>
  </body>
</html>
```

| **Tag****Job**|

| `h1`–`h6`Headings (outline)|

| `p`, `ul`/`ol`/`li`Text & lists|

| `div`/`span`Generic boxes (no meaning)|

| `button`, `a`, `input`Interactive controls|

> 🧪 *Playground available in the study app.*

nav — Home | Labs
  MAIN — page content
  FOOTER — copyright

Pick a region.

<div class="quiz-box"><strong>🧪 Self-test</strong>
<details><summary>Is <code>div</code> a landmark for getByRole?</summary><p class="quiz-correct">Usually no — prefer semantic tags or explicit roles.</p></details>
<details><summary>Where does visible page content live?</summary><p class="quiz-correct">Inside <code>&lt;body&gt;</code>.</p></details>
</div>

---

## 3. Forms, inputs &amp; buttons

<div class="why">🚩 <strong>Why it matters:</strong> Most automation pain is forms: wrong type, missing label, submit via div-click.</div>

```html
<form>
  <label for="email">Email</label>
  <input id="email" name="email" type="email" />
  <button type="submit">Sign in</button>
</form>
```

| **Control****Tester tip**|

| `input type="text|email|password"`Prefer `getByLabel`|

| `checkbox` / `radio`Check `checked` state|

| `select` + `option`Select by label/value|

| `button type="submit"`Better than clickable `div`|

> 🧪 *Playground available in the study app.*

<div class="quiz-box"><strong>🧪 Self-test</strong>
<details><summary>Why prefer <code>&lt;button type="submit"&gt;</code> over a styled div?</summary><p class="quiz-correct">Native keyboard/Enter, roles, and form submit behavior.</p></details>
<details><summary>What links a label to an input?</summary><p class="quiz-correct"><code>for</code> matching the input <code>id</code> (or wrapping).</p></details>
</div>

---

## 4. Links &amp; images

<div class="why">🚩 <strong>Why it matters:</strong> Broken hrefs and empty alt text show up in a11y scans and confused click targets.</div>

```html
<a href="/labs">Open labs</a>
<img src="hero.png" alt="ShopLite home hero" />
```

- `a[href]` → role **link**

- Decorative images: `alt=""` (empty), not missing

- Meaningful images need descriptive `alt`

<div class="quiz-box"><strong>🧪 Self-test</strong>
<details><summary>Role of <code>&lt;a href="…"&gt;</code>?</summary><p class="quiz-correct">link</p></details>
<details><summary>Decorative image alt?</summary><p class="quiz-correct">Empty string <code>alt=""</code>.</p></details>
</div>

---

## 5. Semantic HTML

<div class="why">🚩 <strong>Why it matters:</strong> Semantics = cheaper, more stable locators (<code>getByRole('navigation')</code>) and better a11y.</div>

| **Prefer****Instead of**|

| `<nav>`, `<main>`, `<header>``<div class="nav">` everywhere|

| `<button>``<div onclick>`|

| `<h2>` for section titlesBold `div` pretending to be a heading|

Landmarks help humans _and_ Playwright roles.

<div class="quiz-box"><strong>🧪 Self-test</strong>
<details><summary>Is class name a semantic landmark?</summary><p class="quiz-correct">No — tags/roles are.</p></details>
<details><summary>Best tag for primary page content?</summary><p class="quiz-correct"><code>&lt;main&gt;</code></p></details>
</div>

---

## 6. Attributes: id, class, name, data-testid

<div class="why">🚩 <strong>Why it matters:</strong> Your locator strategy lives in attributes — choose stable ones.</div>

| **Attribute****Good for****Caution**|

| `id`Unique hooksMust be unique; often auto-generated|

| `class`StylingChanges with redesigns — fragile for tests|

| `name`Forms / POST fieldsGreat with labels|

| `data-testid`Explicit test hooksAgree naming with team|

```html
<button data-testid="checkout-submit" type="submit">Pay</button>
```

> 🧪 *Playground available in the study app.*

<div class="quiz-box"><strong>🧪 Self-test</strong>
<details><summary>Safest default for UI redesigns?</summary><p class="quiz-correct">Role/label first; <code>data-testid</code> when needed.</p></details>
<details><summary>Why is class often fragile?</summary><p class="quiz-correct">CSS refactors rename classes without changing behavior.</p></details>
</div>

---

## 7. DevTools Elements panel

<div class="why">🚩 <strong>Why it matters:</strong> When a test fails, Elements is where you verify reality vs assumption.</div>

- Right-click → Inspect (or F12 → Elements)

- Select an element — see HTML + computed styles

- Check if it’s in DOM but hidden (`display`, size 0, off-screen)

- Edit HTML/CSS temporarily to confirm a hypothesis (refresh clears it)

**Tester habit:** before changing a locator, confirm the node still exists and is visible.

<div class="quiz-box"><strong>🧪 Self-test</strong>
<details><summary>Element in DOM but test says not visible — what next?</summary><p class="quiz-correct">Check computed display/visibility/opacity/size/coverage.</p></details>
<details><summary>Do DevTools live edits persist after refresh?</summary><p class="quiz-correct">No.</p></details>
</div>

---

## 8. CSS selectors enough for automation

<div class="why">🚩 <strong>Why it matters:</strong> Even if you prefer roles, traces and older suites still speak CSS.</div>

| **Selector****Matches**|

| `#pay`id="pay"|

| `.primary`class contains primary|

| `button[data-testid="x"]`attr exact|

| `form input[name="email"]`descendant|

| `ul > li`direct child|

> 🧪 *Playground available in the study app.*

CSS selector

Query

Enter a selector against the mini form above.

<div class="quiz-box"><strong>🧪 Self-test</strong>
<details><summary>CSS for data-testid=&quot;login-email&quot;?</summary><p class="quiz-correct"><code>[data-testid=&quot;login-email&quot;]</code></p></details>
<details><summary>Prefer <code>#id</code> or role when both work?</summary><p class="quiz-correct">Prefer role/label for resilience; id/testid when agreed.</p></details>
</div>

---

## 9. Visibility: display, visibility, opacity

<div class="why">🚩 <strong>Why it matters:</strong> “Attached but not visible” is a top flake category.</div>

| **Property****Effect****In layout?**|

| `display: none`Removed from layoutNo|

| `visibility: hidden`Invisible, space keptYes|

| `opacity: 0`Fully transparentYes (often still “visible” to some checks)|

> 🧪 *Playground available in the study app.*

display:none
visibility:hidden
opacity:0
Reset

Toggle styles and read the note.

<div class="quiz-box"><strong>🧪 Self-test</strong>
<details><summary>Which removes the element from layout?</summary><p class="quiz-correct"><code>display: none</code></p></details>
<details><summary>Does opacity:0 keep layout space?</summary><p class="quiz-correct">Yes.</p></details>
</div>

---

## 10. Box model (light)

<div class="why">🚩 <strong>Why it matters:</strong> Click coordinates and “covered by another element” failures care about padding/margin/border.</div>

Outside → inside: **margin** · **border** · **padding** · **content**.

```html
.card {
  width: 200px;
  padding: 16px;
  border: 2px solid #333;
  margin: 8px;
}
```

DevTools shows the box model diagram for the selected node — use it when a click hits the wrong layer.

<div class="quiz-box"><strong>🧪 Self-test</strong>
<details><summary>Order from outside in?</summary><p class="quiz-correct">margin → border → padding → content</p></details>
<details><summary>Does padding increase clickable area inside the border?</summary><p class="quiz-correct">Yes (for the element’s box).</p></details>
</div>

---

## 11. Glossary &amp; common pitfalls

<div class="why">🚩 <strong>Why it matters:</strong> Shared words stop “it works on my machine” locator debates.</div>

| **Term****Meaning**|

| DOMDocument Object Model — live HTML tree|

| Semantic tagTag with meaning (`nav`, `button`)|

| LocatorHow automation finds a node|

| Computed styleFinal CSS after cascade|

| data-testidHook dedicated to tests|

**🐞 Spot-the-Bug**
Test uses `.btn-primary-v2` after a redesignClass renamed — fragile locator; use role/label/testid.

Click `div.login` that looks like a buttonNot a real button — keyboard/a11y/role issues; ask for `<button>`.

Assert visible while CSS has `opacity: 0` on overlay twinWrong node or visibility mismatch — inspect which element Playwright resolved.

Mood:
😅
🙂
😎

<div class="quiz-box"><strong>🧪 Self-test</strong>
<details><summary>DOM stands for?</summary><p class="quiz-correct">Document Object Model</p></details>
<details><summary>Best first locator style in Playwright?</summary><p class="quiz-correct">Role + accessible name (then testid).</p></details>
</div>

---

## 12. Practice, challenges &amp; answer key

<div class="why">🚩 <strong>Why it matters:</strong> Tiny drills beat rereading tables.</div>

easy Practice

- Write a labeled email field + submit button (HTML only).

- Give the button a `data-testid`.

- Write a CSS selector for that testid.

- Name one difference: `display:none` vs `visibility:hidden`.

- Why is `div`+click a smell?

medium Challenges

**C1.** Predict: element has `display:none` — attached? visible?

**C2.** Pick a locator strategy for a nav “Pricing” link with good semantics.

**C3.** Spot the bug: `<label>Email</label><input id="mail">`

Answer key

- `<label for="e">Email</label><input id="e" type="email"><button type="submit">…`

- e.g. `data-testid="login-submit"`

- `[data-testid="login-submit"]`

- none removes from layout; hidden keeps space

- Poor a11y/roles/keyboard

**C1.** Attached yes (if in DOM), visible no.

**C2.**`getByRole('link', { name: 'Pricing' })` inside nav.

**C3.** Missing `for="mail"` (or wrap input).

<div class="quiz-box"><strong>🧪 Self-test</strong>
<details><summary>After Part 1, where next on the path?</summary><p class="quiz-correct">Playwright Essentials (or HTML/CSS Parts 2–3 if you build UI).</p></details>
</div>


🎉 **Done with Part 1 interactive notes.**

<script>
function hceExpand(open){document.querySelectorAll('details').forEach(function(d){d.open=!!open;});}
</script>
<!--P1I-END-->
