# Playwright Essentials — Part 5: CI, Scale & Professional Workflow

> Plain study guide (print/PDF friendly). Same curriculum as the interactive markdown and study app.

### 🗺 Your path — where Part 5 fits

```
Part 0 Strategy → Part 1 Foundations → Part 2 Locators → Part 3 Architecture → Part 4 Reliability → Part 5 CI
```

Series certificate unlocks in the Part 5 study app at 100% section completion.

## Table of Contents

1. GitHub Actions + Playwright
2. Artifacts: report & traces
3. Sharding overview
4. Tagging / grep
5. Cloud browsers overview
6. Reporting & definition of done
7. Common CI pitfalls
8. Component testing overview
9. Practice — kit workflow
10. Challenges + certificate
11. Answer key

## 1. GitHub Actions + Playwright

> 🚩 **Why it matters:** Install browsers and run tests in CI.

See `.github/workflows/verify.yml` in this repo for a working pattern:

- `npm ci`
- `npx playwright install --with-deps chromium`
- `npx playwright test`
- Upload `playwright-report/` and `test-results/` on failure

Sharding (overview):

```bash
npx playwright test --shard=1/2
npx playwright test --shard=2/2
```

Cloud browsers (overview): vendors host browsers/OS matrices (e.g. BrowserStack, Azure Playwright Testing). Use when self-hosted runners can't cover the matrix — evaluate cost, debug UX, and secrets handling; this series does not require a vendor account.

### 🧪 Quiz

Think: how would you explain this section to a teammate in one sentence?

---

## 2. Artifacts: report & traces

> 🚩 **Why it matters:** Upload on failure.

### 🧪 Quiz

Think: how would you explain this section to a teammate in one sentence?

---

## 3. Sharding overview

> 🚩 **Why it matters:** `--shard=k/n` across jobs.

See `.github/workflows/verify.yml` in this repo for a working pattern:

- `npm ci`
- `npx playwright install --with-deps chromium`
- `npx playwright test`
- Upload `playwright-report/` and `test-results/` on failure

Sharding (overview):

```bash
npx playwright test --shard=1/2
npx playwright test --shard=2/2
```

Cloud browsers (overview): vendors host browsers/OS matrices (e.g. BrowserStack, Azure Playwright Testing). Use when self-hosted runners can't cover the matrix — evaluate cost, debug UX, and secrets handling; this series does not require a vendor account.

### 🧪 Quiz

Think: how would you explain this section to a teammate in one sentence?

---

## 4. Tagging / grep

> 🚩 **Why it matters:** `@smoke` vs full suite.

### 🧪 Quiz

Think: how would you explain this section to a teammate in one sentence?

---

## 5. Cloud browsers overview

> 🚩 **Why it matters:** Hosted grids when self-hosted isn't enough.

### 🧪 Quiz

Think: how would you explain this section to a teammate in one sentence?

---

## 6. Reporting & definition of done

> 🚩 **Why it matters:** Readable failures for teammates.

### 🧪 Quiz

Think: how would you explain this section to a teammate in one sentence?

---

## 7. Common CI pitfalls

> 🚩 **Why it matters:** Missing deps, no artifacts, silent flakes.

### 🧪 Quiz

Think: how would you explain this section to a teammate in one sentence?

---

## 8. Component testing overview

> 🚩 **Why it matters:** Optional short — know it exists.

### 🧪 Quiz

Think: how would you explain this section to a teammate in one sentence?

---

## 9. Practice — kit workflow

> 🚩 **Why it matters:** `.github/workflows/verify.yml`.

**Lab:** `labs/part5/ci-smoke.spec.js` — tagged smoke + download.

```bash
npm test -- labs/part5
```

### 🧪 Quiz

Think: how would you explain this section to a teammate in one sentence?

---

## 10. Challenges + certificate

> 🚩 **Why it matters:** Finish the series.

Open the study app challenges for auto-graded pure functions (same ideas as JE).

### 🧪 Quiz

Think: how would you explain this section to a teammate in one sentence?

---

## 11. Answer key

> 🚩 **Why it matters:** Solutions.

Challenge solutions are embedded in each study app as `window.PW5_SOLUTIONS` (console) and mirrored in interactive edition hints.

### 🧪 Quiz (sample)

1. What belongs at the top of the pyramid? → Few critical E2E journeys.
2. Prefer `getByRole` over long CSS? → Yes.
3. Part 3 API depth? → Overview only; deeper kit later.

### 🧪 Quiz

Think: how would you explain this section to a teammate in one sentence?

---

## 🎉 Congratulations

You finished the plain edition of Part 5. Next: open the study app, run the labs, then continue the path.

<!--P5-END-->
