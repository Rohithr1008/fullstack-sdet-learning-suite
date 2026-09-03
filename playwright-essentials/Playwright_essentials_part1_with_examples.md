# Playwright Essentials — Part 1: Foundations

> Plain study guide (print/PDF friendly). Same curriculum as the interactive markdown and study app.

### 🗺 Your path — where Part 1 fits

```
Part 0 Strategy → Part 1 Foundations → Part 2 Locators → Part 3 Architecture → Part 4 Reliability → Part 5 CI
```

Requires Node + Playwright browsers. Study app mocks teach offline; labs prove skill.

## Table of Contents

1. What E2E is vs unit/integration
2. Strategy slice — pyramid & when not to E2E
3. Why Playwright
4. Install & browsers
5. test() and expect()
6. First visit + assert
7. Codegen intro
8. Config basics
9. Headed vs headless
10. Traces & screenshots on fail
11. Common pitfalls
12. Practice
13. Challenges
14. Answer key

## 1. What E2E is vs unit/integration

> 🚩 **Why it matters:** E2E drives a real browser through user journeys.

### 🧪 Quiz

Think: how would you explain this section to a teammate in one sentence?

---

## 2. Strategy slice — pyramid & when not to E2E

> 🚩 **Why it matters:** Keep E2E thin; push logic down the pyramid.

| Layer | Speed | What it catches | Count |
|---|---|---|---|
| Unit | Fastest | Pure logic bugs | Many |
| Integration / API | Medium | Wiring, contracts | Some |
| E2E (Playwright) | Slowest | Real user flows | Few |

Skip E2E when:

1. The behavior is a pure function (unit test).
2. You're only checking HTTP status/body (API test).
3. The UI is static marketing copy with no behavior.
4. A cheaper test already covers the risk.

### 🧪 Quiz

Think: how would you explain this section to a teammate in one sentence?

---

## 3. Why Playwright

> 🚩 **Why it matters:** Auto-wait, tracing, codegen, multi-browser.

### 🧪 Quiz

Think: how would you explain this section to a teammate in one sentence?

---

## 4. Install & browsers

> 🚩 **Why it matters:** `npm i -D @playwright/test` then `npx playwright install`.

```bash
npm i -D @playwright/test
npx playwright install
npx playwright test labs/part1
```

### 🧪 Quiz

Think: how would you explain this section to a teammate in one sentence?

---

## 5. test() and expect()

> 🚩 **Why it matters:** Smallest green test structure.

```js
const { test, expect } = require('@playwright/test');

test('home loads', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: /ShopLite/i })).toBeVisible();
});
```

### 🧪 Quiz

Think: how would you explain this section to a teammate in one sentence?

---

## 6. First visit + assert

> 🚩 **Why it matters:** `goto`, `getByRole`, `toBeVisible`.

```js
const { test, expect } = require('@playwright/test');

test('home loads', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: /ShopLite/i })).toBeVisible();
});
```

### 🧪 Quiz

Think: how would you explain this section to a teammate in one sentence?

---

## 7. Codegen intro

> 🚩 **Why it matters:** Bootstrap then clean recordings.

### 🧪 Quiz

Think: how would you explain this section to a teammate in one sentence?

---

## 8. Config basics

> 🚩 **Why it matters:** `baseURL`, projects, `webServer`.

### 🧪 Quiz

Think: how would you explain this section to a teammate in one sentence?

---

## 9. Headed vs headless

> 🚩 **Why it matters:** Debug with `--headed` / UI mode.

### 🧪 Quiz

Think: how would you explain this section to a teammate in one sentence?

---

## 10. Traces & screenshots on fail

> 🚩 **Why it matters:** `trace: 'on-first-retry'`.

### 🧪 Quiz

Think: how would you explain this section to a teammate in one sentence?

---

## 11. Common pitfalls

> 🚩 **Why it matters:** Hard waits, brittle CSS, missing baseURL.

### 🧪 Quiz

Think: how would you explain this section to a teammate in one sentence?

---

## 12. Practice

> 🚩 **Why it matters:** Run `labs/part1` against demo-app.

**Lab:** `labs/part1/home.spec.js` — home heading + Shop now navigation.

```bash
npm test -- labs/part1
```

### 🧪 Quiz

Think: how would you explain this section to a teammate in one sentence?

---

## 13. Challenges

> 🚩 **Why it matters:** Locator-style helper.

Open the study app challenges for auto-graded pure functions (same ideas as JE).

### 🧪 Quiz

Think: how would you explain this section to a teammate in one sentence?

---

## 14. Answer key

> 🚩 **Why it matters:** Solutions.

Challenge solutions are embedded in each study app as `window.PW1_SOLUTIONS` (console) and mirrored in interactive edition hints.

### 🧪 Quiz (sample)

1. What belongs at the top of the pyramid? → Few critical E2E journeys.
2. Prefer `getByRole` over long CSS? → Yes.
3. Part 3 API depth? → Overview only; deeper kit later.

### 🧪 Quiz

Think: how would you explain this section to a teammate in one sentence?

---

## 🎉 Congratulations

You finished the plain edition of Part 1. Next: open the study app, run the labs, then continue the path.

<!--P1-END-->
