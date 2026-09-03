# HTML & CSS Essentials — Part 3: Mini page + Playwright checklist (Interactive)

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
<strong>Part 3</strong>
</div>

> Open with **Ctrl+Shift+V** in VS Code. Study app (offline): `Html_css_essentials_part3_study_app.html`.

You are here: **Part 3 — Mini page + Playwright checklist**. Prev: [Part 2](Html_css_essentials_part2_with_examples.md). Deep E2E: [Playwright Essentials](../playwright-essentials/README.md) (do not re-learn E2E here).

## 1. Mini project brief: LabCard page

<div class="why">🚩 <strong>Why it matters:</strong> One small page ties DOM + layout + a11y into something you can actually test.</div>

**Build:** a single-page “Lab status” card list for a fictional QA lab.

- Header with site title + primary nav (Home, Labs)

- Main: heading + 2–3 lab cards (name, status badge, Open button)

- Footer with copyright

- Works at ~375px and desktop; keyboard-focusable controls

Keep CSS in a `<style>` block — offline-friendly, like these study apps.

<div class="quiz-box"><strong>🧪 Self-test</strong>
<details><summary>Why a mini page before Playwright deep-dive?</summary><p class="quiz-correct">You need realistic DOM/CSS to practice locators & visibility.</p></details>
<details><summary>Must it be a framework app?</summary><p class="quiz-correct">No — static HTML/CSS is enough.</p></details>
</div>

---

## 2. Information architecture &amp; semantics

<div class="why">🚩 <strong>Why it matters:</strong> Landmarks and headings become your locator map.</div>

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

<div class="quiz-box"><strong>🧪 Self-test</strong>
<details><summary>Role for primary nav?</summary><p class="quiz-correct">navigation (named via aria-label if multiple).</p></details>
<details><summary>Where does <code>h1</code> live?</summary><p class="quiz-correct">Usually once, in main content.</p></details>
</div>

---

## 3. Build the HTML skeleton

<div class="why">🚩 <strong>Why it matters:</strong> Stable structure first — cosmetics second.</div>

Checklist while you type:

- ☐ `lang="en"` + viewport meta

- ☐ One `h1`

- ☐ Labels if any inputs (filter optional)

- ☐ Real `<button>` / `<a>`

- ☐ `data-testid` on Open buttons (e.g. `lab-open-alpha`)

> 🧪 *Playground available in the study app.*

Mount demo LabCard page

Click to inject a tiny semantic demo into the stage.

<div class="quiz-box"><strong>🧪 Self-test</strong>
<details><summary>Why add data-testid on Open?</summary><p class="quiz-correct">Stable explicit hook when card titles change copy.</p></details>
<details><summary>Skip viewport meta?</summary><p class="quiz-correct">Mobile layout/media queries won’t behave.</p></details>
</div>

---

## 4. Style with Flex/Grid

<div class="why">🚩 <strong>Why it matters:</strong> Cards in a responsive grid is the Part 2 payoff.</div>

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

<div class="quiz-box"><strong>🧪 Self-test</strong>
<details><summary>auto-fit minmax helps…?</summary><p class="quiz-correct">Responsive columns without many breakpoints.</p></details>
<details><summary>Color-only status badge OK?</summary><p class="quiz-correct">No — include text/icon.</p></details>
</div>

---

## 5. A11y pass on your page

<div class="why">🚩 <strong>Why it matters:</strong> A 5-minute pass prevents most role/label flakes.</div>

- Tab through — every control shows focus

- Headings in order

- Buttons have accessible names

- Contrast roughly OK on badges/text

- Landmarks present (header/main/footer/nav)

<div class="quiz-box"><strong>🧪 Self-test</strong>
<details><summary>First keyboard check?</summary><p class="quiz-correct">Tab order + visible focus.</p></details>
<details><summary>Unnamed button symptom in Playwright?</summary><p class="quiz-correct">getByRole('button', { name: … }) fails or is awkward.</p></details>
</div>

---

## 6. How you’d test this in Playwright (checklist)

<div class="why">🚩 <strong>Why it matters:</strong> Bridge to the Playwright kit — without re-teaching E2E here.</div>

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

<div class="quiz-box"><strong>🧪 Self-test</strong>
<details><summary>Where to learn fixtures/Page Object depth?</summary><p class="quiz-correct">../playwright-essentials</p></details>
<details><summary>Prefer getByRole or raw CSS here?</summary><p class="quiz-correct">getByRole / getByLabel / getByTestId per team strategy.</p></details>
</div>

---

## 7. Debug failures with DevTools

<div class="why">🚩 <strong>Why it matters:</strong> When the checklist item fails, Elements + Computed still save you.</div>

- Is the node in the DOM?

- Is it visible (display/visibility/opacity/coverage)?

- Is the accessible name what you expect?

- Did a media query change the control?

Map each failure to Part 1–2 lessons before changing the test blindly.

<div class="quiz-box"><strong>🧪 Self-test</strong>
<details><summary>Test not visible + node exists → check?</summary><p class="quiz-correct">Computed visibility / cover / size.</p></details>
<details><summary>Name mismatch often means?</summary><p class="quiz-correct">Wrong element, split text, or missing label.</p></details>
</div>

---

## 8. Optional polish &amp; handoff

<div class="why">🚩 <strong>Why it matters:</strong> Ship a calm page someone else can open offline.</div>

- Prefer system fonts; keep motion subtle; honor `prefers-reduced-motion`

- Document testids in a one-line README comment

- Link your page from this kit’s hub when you save it beside the study apps

Mood after build:
😅
🙂
😎

<div class="quiz-box"><strong>🧪 Self-test</strong>
<details><summary>Offline-friendly means?</summary><p class="quiz-correct">Open HTML locally — no build step required for the exercise.</p></details>
</div>

---

## 9. Practice, challenges &amp; answer key

<div class="why">🚩 <strong>Why it matters:</strong> Close the loop with a short self-check.</div>

- List 3 locators you’d use on LabCard.

- Write the grid CSS for responsive cards.

- Name 2 a11y checks before opening Playwright.

- Where do you go next on the Automation Tester Path?

Answer key

- e.g. heading, nav, getByTestId open, getByRole button name

- `repeat(auto-fit, minmax(220px, 1fr))` + gap

- Tab focus; labels/names; landmarks; contrast

- Playwright Essentials (after JE foundations as your path maps)

<div class="quiz-box"><strong>🧪 Self-test</strong>
<details><summary>Part 3’s main deliverable?</summary><p class="quiz-correct">A small semantic responsive page + Playwright-oriented checklist.</p></details>
</div>


🎉 **Done with Part 3 interactive notes.**

<script>
function hceExpand(open){document.querySelectorAll('details').forEach(function(d){d.open=!!open;});}
</script>
<!--P3I-END-->
