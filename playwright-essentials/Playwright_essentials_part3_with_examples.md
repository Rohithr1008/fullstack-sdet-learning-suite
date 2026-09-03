# Playwright Essentials — Part 3: Architecture (POM, fixtures, auth)

> Plain study guide (print/PDF friendly). Same curriculum as the interactive markdown and study app.

### 🗺 Your path — where Part 3 fits

```
Part 0 Strategy → Part 1 Foundations → Part 2 Locators → Part 3 Architecture → Part 4 Reliability → Part 5 CI
```

**API testing here is overview only.** For REST/SQL depth, use the future API & Data Essentials kit.

## Table of Contents

1. Why architecture matters
2. Page Object Model
3. Fixtures
4. describe, hooks, projects
5. env + baseURL
6. APIRequestContext overview
7. Authentication + storageState
8. Parallelization basics
9. Practice — refactor to POM
10. Challenges
11. Answer key

## 1. Why architecture matters

> 🚩 **Why it matters:** Suites grow; structure keeps them maintainable.

### 🧪 Quiz

Think: how would you explain this section to a teammate in one sentence?

---

## 2. Page Object Model

> 🚩 **Why it matters:** Page class owns locators + flows.

```js
// labs/part3/pages/LoginPage.js
class LoginPage {
  constructor(page) {
    this.page = page;
    this.email = page.getByLabel('Email');
    this.password = page.getByLabel('Password');
    this.submit = page.getByTestId('login-submit');
  }
  async signIn(email, password) {
    await this.email.fill(email);
    await this.password.fill(password);
    await this.submit.click();
  }
}
```

### 🧪 Quiz

Think: how would you explain this section to a teammate in one sentence?

---

## 3. Fixtures

> 🚩 **Why it matters:** `test.extend` shared setup.

### 🧪 Quiz

Think: how would you explain this section to a teammate in one sentence?

---

## 4. describe, hooks, projects

> 🚩 **Why it matters:** Organize + multi-browser.

### 🧪 Quiz

Think: how would you explain this section to a teammate in one sentence?

---

## 5. env + baseURL

> 🚩 **Why it matters:** One config, many environments.

### 🧪 Quiz

Think: how would you explain this section to a teammate in one sentence?

---

## 6. APIRequestContext overview

> 🚩 **Why it matters:** Depth deferred to API & Data Essentials kit.

> **Scope note:** Part 3 shows `APIRequestContext` / `request.get` as a *smoke* alongside UI. Deep REST assertions, auth matrices, schema/contract checks, and SQL-for-testers belong in **API & Data Essentials** (separate kit).

### 🧪 Quiz

Think: how would you explain this section to a teammate in one sentence?

---

## 7. Authentication + storageState

> 🚩 **Why it matters:** Login once, reuse storage.

### 🧪 Quiz

Think: how would you explain this section to a teammate in one sentence?

---

## 8. Parallelization basics

> 🚩 **Why it matters:** Workers and isolation.

### 🧪 Quiz

Think: how would you explain this section to a teammate in one sentence?

---

## 9. Practice — refactor to POM

> 🚩 **Why it matters:** `labs/part3`.

```js
// labs/part3/pages/LoginPage.js
class LoginPage {
  constructor(page) {
    this.page = page;
    this.email = page.getByLabel('Email');
    this.password = page.getByLabel('Password');
    this.submit = page.getByTestId('login-submit');
  }
  async signIn(email, password) {
    await this.email.fill(email);
    await this.password.fill(password);
    await this.submit.click();
  }
}
```

**Lab:** `labs/part3` — LoginPage POM, request smoke, storageState save.

```bash
npm test -- labs/part3
```

### 🧪 Quiz

Think: how would you explain this section to a teammate in one sentence?

---

## 10. Challenges

> 🚩 **Why it matters:** Name POM methods.

Open the study app challenges for auto-graded pure functions (same ideas as JE).

### 🧪 Quiz

Think: how would you explain this section to a teammate in one sentence?

---

## 11. Answer key

> 🚩 **Why it matters:** Solutions.

Challenge solutions are embedded in each study app as `window.PW3_SOLUTIONS` (console) and mirrored in interactive edition hints.

### 🧪 Quiz (sample)

1. What belongs at the top of the pyramid? → Few critical E2E journeys.
2. Prefer `getByRole` over long CSS? → Yes.
3. Part 3 API depth? → Overview only; deeper kit later.

### 🧪 Quiz

Think: how would you explain this section to a teammate in one sentence?

---

## 🎉 Congratulations

You finished the plain edition of Part 3. Next: open the study app, run the labs, then continue the path.

<!--P3-END-->
