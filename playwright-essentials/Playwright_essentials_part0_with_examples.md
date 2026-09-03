# Playwright Essentials — Part 0: Testing Mindset (Strategy)

> Plain study guide (print/PDF friendly). Same curriculum as the interactive markdown and study app.

### 🗺 Your path — where Part 0 fits

```
Part 0 Strategy → Part 1 Foundations → Part 2 Locators → Part 3 Architecture → Part 4 Reliability → Part 5 CI
```

This is the Strategy module (Part 0). Playwright Part 1 also repeats a short strategy slice.

## Table of Contents

1. Why testing strategy exists
2. The test pyramid
3. Risk-based selection
4. When NOT to E2E
5. Flake vs product bug
6. Bug reports that help
7. Definition of done for tests
8. Common strategy pitfalls
9. Practice
10. Challenges
11. Answer key

## 1. Why testing strategy exists

> 🚩 **Why it matters:** Strategy decides *what* to automate so you don't drown in brittle E2E.

Testing without a strategy turns into "automate everything in the browser." That feels productive for a week, then CI is red for mysterious reasons.

**Rule of thumb:** ask *what decision does this test help us make?* If the answer is unclear, don't automate it yet.

### 🧪 Quiz

Think: how would you explain this section to a teammate in one sentence?

---

## 2. The test pyramid

> 🚩 **Why it matters:** Many unit, fewer integration/API, fewest E2E — speed and signal.

| Layer | Speed | What it catches | Count |
|---|---|---|---|
| Unit | Fastest | Pure logic bugs | Many |
| Integration / API | Medium | Wiring, contracts | Some |
| E2E (Playwright) | Slowest | Real user flows | Few |

### 🧪 Quiz

Think: how would you explain this section to a teammate in one sentence?

---

## 3. Risk-based selection

> 🚩 **Why it matters:** Automate paths that hurt customers or revenue when broken.

### 🧪 Quiz

Think: how would you explain this section to a teammate in one sentence?

---

## 4. When NOT to E2E

> 🚩 **Why it matters:** Pure logic, static pages, and anything already proven cheaper.

Skip E2E when:

1. The behavior is a pure function (unit test).
2. You're only checking HTTP status/body (API test).
3. The UI is static marketing copy with no behavior.
4. A cheaper test already covers the risk.

### 🧪 Quiz

Think: how would you explain this section to a teammate in one sentence?

---

## 5. Flake vs product bug

> 🚩 **Why it matters:** Triage intermittent failures before rewriting product code.

### 🧪 Quiz

Think: how would you explain this section to a teammate in one sentence?

---

## 6. Bug reports that help

> 🚩 **Why it matters:** Repro, expected vs actual, environment, artifacts.

### 🧪 Quiz

Think: how would you explain this section to a teammate in one sentence?

---

## 7. Definition of done for tests

> 🚩 **Why it matters:** Deterministic, CI-green, readable failure messages.

### 🧪 Quiz

Think: how would you explain this section to a teammate in one sentence?

---

## 8. Common strategy pitfalls

> 🚩 **Why it matters:** 100% E2E, testing implementation details, ignoring ROI.

### 🧪 Quiz

Think: how would you explain this section to a teammate in one sentence?

---

## 9. Practice

> 🚩 **Why it matters:** Map one feature across pyramid layers.

**Lab:** Conceptual — apply mindset before writing labs in Part 1.

```bash
npm test -- labs/part1
```

### 🧪 Quiz

Think: how would you explain this section to a teammate in one sentence?

---

## 10. Challenges

> 🚩 **Why it matters:** Classify scenarios into unit / api / e2e.

Open the study app challenges for auto-graded pure functions (same ideas as JE).

### 🧪 Quiz

Think: how would you explain this section to a teammate in one sentence?

---

## 11. Answer key

> 🚩 **Why it matters:** Compare classifications.

Challenge solutions are embedded in each study app as `window.PW0_SOLUTIONS` (console) and mirrored in interactive edition hints.

### 🧪 Quiz (sample)

1. What belongs at the top of the pyramid? → Few critical E2E journeys.
2. Prefer `getByRole` over long CSS? → Yes.
3. Part 3 API depth? → Overview only; deeper kit later.

### 🧪 Quiz

Think: how would you explain this section to a teammate in one sentence?

---

## 🎉 Congratulations

You finished the plain edition of Part 0. Next: open the study app, run the labs, then continue the path.

<!--P0-END-->
