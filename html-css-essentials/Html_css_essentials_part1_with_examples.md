# HTML & CSS Essentials — Part 1: For testers

> 💡 **Study guide (plain edition):** open answers, print-friendly. Interactive: `Html_css_essentials_part1_interactive.md`. Study app: `Html_css_essentials_part1_study_app.html`.

### 🗺 Your path

Part of the **[Automation Tester Path](../automation-tester-path/README.md)**.
You are here: **Part 1 — HTML/CSS for testers**. Next: [Part 2](Html_css_essentials_part2_with_examples.md) (layout/a11y) → [Part 3](Html_css_essentials_part3_with_examples.md) (mini page) → [Playwright Essentials](../playwright-essentials/README.md).

## Table of Contents

1. Why HTML & CSS for testers
2. Tags & document structure
3. Forms, inputs & buttons
4. Links & images
5. Semantic HTML
6. Attributes: id, class, name, data-testid
7. DevTools Elements panel
8. CSS selectors enough for automation
9. Visibility: display, visibility, opacity
10. Box model (light)
11. Glossary & common pitfalls
12. Practice, challenges & answer key

---

## 1. Why HTML & CSS for testers

> 🚩 **Why it matters:** Locators, visibility failures, and “element not found” almost always start in the DOM — not in Playwright magic.

Before writing `page.getByRole(...)`, you need to **read the page**: tags, attributes, what CSS hides, and what screen readers / Playwright roles see.

| **You will use this for…****Example**|

| Stable selectors`data-testid`, roles, labels|

| Debugging flakesopacity 0 vs `display:none`|

| Talking with devs“That div isn’t a button — add a real <button>”|

**Path note:** Do this Part 1 _before_ deep Playwright. Parts 2–3 help when you also build or polish UI.

### 🧪 Quiz

**Q:** Do green unit tests prove your locator will find the Submit button?
**A:** No — locators care about the live DOM/CSS.

**Q:** Name one reason a tester opens DevTools Elements.
**A:** Inspect tag/attributes, computed styles, or why something is invisible.

---

## 2. Tags & document structure

> 🚩 **Why it matters:** Playwright and accessibility trees walk the same HTML skeleton you see in Elements.

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

### 🧪 Quiz

**Q:** Is div a landmark for getByRole?
**A:** Usually no — prefer semantic tags or explicit roles.

**Q:** Where does visible page content live?
**A:** Inside <body>.

---

## 3. Forms, inputs & buttons

> 🚩 **Why it matters:** Most automation pain is forms: wrong type, missing label, submit via div-click.

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

### 🧪 Quiz

**Q:** Why prefer <button type="submit"> over a styled div?
**A:** Native keyboard/Enter, roles, and form submit behavior.

**Q:** What links a label to an input?
**A:** for matching the input id (or wrapping).

---

## 4. Links & images

> 🚩 **Why it matters:** Broken hrefs and empty alt text show up in a11y scans and confused click targets.

```html
<a href="/labs">Open labs</a>
<img src="hero.png" alt="ShopLite home hero" />
```

- `a[href]` → role **link**

- Decorative images: `alt=""` (empty), not missing

- Meaningful images need descriptive `alt`

### 🧪 Quiz

**Q:** Role of <a href="…">?
**A:** link

**Q:** Decorative image alt?
**A:** Empty string alt="".

---

## 5. Semantic HTML

> 🚩 **Why it matters:** Semantics = cheaper, more stable locators (getByRole('navigation')) and better a11y.

| **Prefer****Instead of**|

| `<nav>`, `<main>`, `<header>``<div class="nav">` everywhere|

| `<button>``<div onclick>`|

| `<h2>` for section titlesBold `div` pretending to be a heading|

Landmarks help humans _and_ Playwright roles.

### 🧪 Quiz

**Q:** Is class name a semantic landmark?
**A:** No — tags/roles are.

**Q:** Best tag for primary page content?
**A:** <main>

---

## 6. Attributes: id, class, name, data-testid

> 🚩 **Why it matters:** Your locator strategy lives in attributes — choose stable ones.

| **Attribute****Good for****Caution**|

| `id`Unique hooksMust be unique; often auto-generated|

| `class`StylingChanges with redesigns — fragile for tests|

| `name`Forms / POST fieldsGreat with labels|

| `data-testid`Explicit test hooksAgree naming with team|

```html
<button data-testid="checkout-submit" type="submit">Pay</button>
```

> 🧪 *Playground available in the study app.*

### 🧪 Quiz

**Q:** Safest default for UI redesigns?
**A:** Role/label first; data-testid when needed.

**Q:** Why is class often fragile?
**A:** CSS refactors rename classes without changing behavior.

---

## 7. DevTools Elements panel

> 🚩 **Why it matters:** When a test fails, Elements is where you verify reality vs assumption.

- Right-click → Inspect (or F12 → Elements)

- Select an element — see HTML + computed styles

- Check if it’s in DOM but hidden (`display`, size 0, off-screen)

- Edit HTML/CSS temporarily to confirm a hypothesis (refresh clears it)

**Tester habit:** before changing a locator, confirm the node still exists and is visible.

### 🧪 Quiz

**Q:** Element in DOM but test says not visible — what next?
**A:** Check computed display/visibility/opacity/size/coverage.

**Q:** Do DevTools live edits persist after refresh?
**A:** No.

---

## 8. CSS selectors enough for automation

> 🚩 **Why it matters:** Even if you prefer roles, traces and older suites still speak CSS.

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

### 🧪 Quiz

**Q:** CSS for data-testid=&quot;login-email&quot;?
**A:** [data-testid=&quot;login-email&quot;]

**Q:** Prefer #id or role when both work?
**A:** Prefer role/label for resilience; id/testid when agreed.

---

## 9. Visibility: display, visibility, opacity

> 🚩 **Why it matters:** “Attached but not visible” is a top flake category.

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

### 🧪 Quiz

**Q:** Which removes the element from layout?
**A:** display: none

**Q:** Does opacity:0 keep layout space?
**A:** Yes.

---

## 10. Box model (light)

> 🚩 **Why it matters:** Click coordinates and “covered by another element” failures care about padding/margin/border.

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

### 🧪 Quiz

**Q:** Order from outside in?
**A:** margin → border → padding → content

**Q:** Does padding increase clickable area inside the border?
**A:** Yes (for the element’s box).

---

## 11. Glossary & common pitfalls

> 🚩 **Why it matters:** Shared words stop “it works on my machine” locator debates.

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

### 🧪 Quiz

**Q:** DOM stands for?
**A:** Document Object Model

**Q:** Best first locator style in Playwright?
**A:** Role + accessible name (then testid).

---

## 12. Practice, challenges & answer key

> 🚩 **Why it matters:** Tiny drills beat rereading tables.

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

### 🧪 Quiz

**Q:** After Part 1, where next on the path?
**A:** Playwright Essentials (or HTML/CSS Parts 2–3 if you build UI).


🎉 **Congratulations** — Part 1 plain edition complete. Next: see README hub.

<!--P1-END-->
