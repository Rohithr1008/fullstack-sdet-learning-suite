# Playwright Essentials — Part 2: Locators & Actions

> Plain study guide (print/PDF friendly). Same curriculum as the interactive markdown and study app.

### 🗺 Your path — where Part 2 fits

```
Part 0 Strategy → Part 1 Foundations → Part 2 Locators → Part 3 Architecture → Part 4 Reliability → Part 5 CI
```

Demo-app forms and dialogs exist for these labs.

## Table of Contents

1. Locator philosophy
2. getByRole / Label / Text / TestId
3. CSS & XPath sparingly
4. Clicks, fill, select, check
5. Auto-waiting & timeouts
6. Frames, dialogs, downloads
7. Soft assertions
8. Flaky locator Spot-the-Bug
9. Practice on ShopLite forms
10. Challenges
11. Answer key

## 1. Locator philosophy

> 🚩 **Why it matters:** Prefer user-facing queries over CSS soup.

### 🧪 Quiz

Think: how would you explain this section to a teammate in one sentence?

---

## 2. getByRole / Label / Text / TestId

> 🚩 **Why it matters:** Everyday locator toolkit.

### 🧪 Quiz

Think: how would you explain this section to a teammate in one sentence?

---

## 3. CSS & XPath sparingly

> 🚩 **Why it matters:** Escape hatches only.

### 🧪 Quiz

Think: how would you explain this section to a teammate in one sentence?

---

## 4. Clicks, fill, select, check

> 🚩 **Why it matters:** Actions that wait for actionability.

### 🧪 Quiz

Think: how would you explain this section to a teammate in one sentence?

---

## 5. Auto-waiting & timeouts

> 🚩 **Why it matters:** Know why a click timed out.

### 🧪 Quiz

Think: how would you explain this section to a teammate in one sentence?

---

## 6. Frames, dialogs, downloads

> 🚩 **Why it matters:** Special Playwright events.

### 🧪 Quiz

Think: how would you explain this section to a teammate in one sentence?

---

## 7. Soft assertions

> 🚩 **Why it matters:** Collect multiple failures.

### 🧪 Quiz

Think: how would you explain this section to a teammate in one sentence?

---

## 8. Flaky locator Spot-the-Bug

> 🚩 **Why it matters:** Tighten selectors.

### 🧪 Quiz

Think: how would you explain this section to a teammate in one sentence?

---

## 9. Practice on ShopLite forms

> 🚩 **Why it matters:** `labs/part2`.

**Lab:** `labs/part2/forms.spec.js` — cart, login, dialogs.

```bash
npm test -- labs/part2
```

### 🧪 Quiz

Think: how would you explain this section to a teammate in one sentence?

---

## 10. Challenges

> 🚩 **Why it matters:** Score locator quality.

Open the study app challenges for auto-graded pure functions (same ideas as JE).

### 🧪 Quiz

Think: how would you explain this section to a teammate in one sentence?

---

## 11. Answer key

> 🚩 **Why it matters:** Solutions.

Challenge solutions are embedded in each study app as `window.PW2_SOLUTIONS` (console) and mirrored in interactive edition hints.

### 🧪 Quiz (sample)

1. What belongs at the top of the pyramid? → Few critical E2E journeys.
2. Prefer `getByRole` over long CSS? → Yes.
3. Part 3 API depth? → Overview only; deeper kit later.

### 🧪 Quiz

Think: how would you explain this section to a teammate in one sentence?

---

## 🎉 Congratulations

You finished the plain edition of Part 2. Next: open the study app, run the labs, then continue the path.

<!--P2-END-->
