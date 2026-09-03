# HTML & CSS Essentials — Part 3: Mini page + Playwright checklist

> 💡 **Study guide (plain edition):** open answers, print-friendly. Interactive: `Html_css_essentials_part3_interactive.md`. Study app: `Html_css_essentials_part3_study_app.html`.

### 🗺 Your path

You are here: **Part 3 — Mini page + Playwright checklist**. Prev: [Part 2](Html_css_essentials_part2_with_examples.md). Deep E2E: [Playwright Essentials](../playwright-essentials/README.md) (do not re-learn E2E here).

## Table of Contents

1. Mini project brief: LabCard page
2. Information architecture & semantics
3. Build the HTML skeleton
4. Style with Flex/Grid
5. A11y pass on your page
6. How you’d test this in Playwright (checklist)
7. Debug failures with DevTools
8. Optional polish & handoff
9. Practice, challenges & answer key

---

## 1. Mini project brief: LabCard page

> 🚩 **Why it matters:** One small page ties DOM + layout + a11y into something you can actually test.

**Build:** a single-page “Lab status” card list for a fictional QA lab.

- Header with site title + primary nav (Home, Labs)

- Main: heading + 2–3 lab cards (name, status badge, Open button)

- Footer with copyright

- Works at ~375px and desktop; keyboard-focusable controls

Keep CSS in a `<style>` block — offline-friendly, like these study apps.

### 🧪 Quiz

**Q:** Why a mini page before Playwright deep-dive?
**A:** You need realistic DOM/CSS to practice locators & visibility.

**Q:** Must it be a framework app?
**A:** No — static HTML/CSS is enough.

---

## 2. Information architecture & semantics

> 🚩 **Why it matters:** Landmarks and headings become your locator map.

```html
<header>
  <p class="brand">QA Lab Desk</p>
  <nav aria-label="Primary">…</nav>
</header>
<main>
  <h1>Open labs</h1>
  <article aria-labelledby="lab-1-title">…</article>
</main>
<footer>…</footer>

```

Use `article` or list items for cards — give each a heading.

### 🧪 Quiz

**Q:** Role for primary nav?
**A:** navigation (named via aria-label if multiple).

**Q:** Where does h1 live?
**A:** Usually once, in main content.

---

## 3. Build the HTML skeleton

> 🚩 **Why it matters:** Stable structure first — cosmetics second.

Checklist while you type:

- ☐ `lang="en"` + viewport meta

- ☐ One `h1`

- ☐ Labels if any inputs (filter optional)

- ☐ Real `<button>` / `<a>`

- ☐ `data-testid` on Open buttons (e.g. `lab-open-alpha`)

> 🧪 *Playground available in the study app.*

Mount demo LabCard page

Click to inject a tiny semantic demo into the stage.

### 🧪 Quiz

**Q:** Why add data-testid on Open?
**A:** Stable explicit hook when card titles change copy.

**Q:** Skip viewport meta?
**A:** Mobile layout/media queries won’t behave.

---

## 4. Style with Flex/Grid

> 🚩 **Why it matters:** Cards in a responsive grid is the Part 2 payoff.

```html
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
}
.card-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
@media (max-width: 600px) {
  .site-header { flex-direction: column; align-items: flex-start; }
}

```

Status badge: padding + radius + strong text (don’t use color alone — include the word “Pass/Fail”).

### 🧪 Quiz

**Q:** auto-fit minmax helps…?
**A:** Responsive columns without many breakpoints.

**Q:** Color-only status badge OK?
**A:** No — include text/icon.

---

## 5. A11y pass on your page

> 🚩 **Why it matters:** A 5-minute pass prevents most role/label flakes.

- Tab through — every control shows focus

- Headings in order

- Buttons have accessible names

- Contrast roughly OK on badges/text

- Landmarks present (header/main/footer/nav)

### 🧪 Quiz

**Q:** First keyboard check?
**A:** Tab order + visible focus.

**Q:** Unnamed button symptom in Playwright?
**A:** getByRole('button', { name: … }) fails or is awkward.

---

## 6. How you’d test this in Playwright (checklist)

> 🚩 **Why it matters:** Bridge to the Playwright kit — without re-teaching E2E here.

Full setup, fixtures, and patterns live in **Playwright Essentials**. Here is only a _what to assert_ checklist for LabCard:

- ☐ `getByRole('heading', { name: 'Open labs' })` visible

- ☐ `getByRole('navigation', { name: 'Primary' })` present

- ☐ Open lab via `getByTestId('lab-open-alpha')` or role+name

- ☐ Status text “Pass” / “Fail” visible (not color-only)

- ☐ Mobile project: nav still usable at 375 width

- ☐ Keyboard: focus Open button, activate with Enter

```html
// sketch only — details in playwright-essentials
test('lab cards render', async ({ page }) => {
  await page.goto('/labdesk.html');
  await expect(page.getByRole('heading', { name: 'Open labs' })).toBeVisible();
  await page.getByTestId('lab-open-alpha').click();
});

```

Do **not** expand this into a full E2E course here — continue in the Playwright kit.

### 🧪 Quiz

**Q:** Where to learn fixtures/Page Object depth?
**A:** ../playwright-essentials

**Q:** Prefer getByRole or raw CSS here?
**A:** getByRole / getByLabel / getByTestId per team strategy.

---

## 7. Debug failures with DevTools

> 🚩 **Why it matters:** When the checklist item fails, Elements + Computed still save you.

- Is the node in the DOM?

- Is it visible (display/visibility/opacity/coverage)?

- Is the accessible name what you expect?

- Did a media query change the control?

Map each failure to Part 1–2 lessons before changing the test blindly.

### 🧪 Quiz

**Q:** Test not visible + node exists → check?
**A:** Computed visibility / cover / size.

**Q:** Name mismatch often means?
**A:** Wrong element, split text, or missing label.

---

## 8. Optional polish & handoff

> 🚩 **Why it matters:** Ship a calm page someone else can open offline.

- Prefer system fonts; keep motion subtle; honor `prefers-reduced-motion`

- Document testids in a one-line README comment

- Link your page from this kit’s hub when you save it beside the study apps

Mood after build:
😅
🙂
😎

### 🧪 Quiz

**Q:** Offline-friendly means?
**A:** Open HTML locally — no build step required for the exercise.

---

## 9. Practice, challenges & answer key

> 🚩 **Why it matters:** Close the loop with a short self-check.

- List 3 locators you’d use on LabCard.

- Write the grid CSS for responsive cards.

- Name 2 a11y checks before opening Playwright.

- Where do you go next on the Automation Tester Path?

Answer key

- e.g. heading, nav, getByTestId open, getByRole button name

- `repeat(auto-fit, minmax(220px, 1fr))` + gap

- Tab focus; labels/names; landmarks; contrast

- Playwright Essentials (after JE foundations as your path maps)

### 🧪 Quiz

**Q:** Part 3’s main deliverable?
**A:** A small semantic responsive page + Playwright-oriented checklist.


🎉 **Congratulations** — Part 3 plain edition complete. Next: see README hub.

<!--P3-END-->
