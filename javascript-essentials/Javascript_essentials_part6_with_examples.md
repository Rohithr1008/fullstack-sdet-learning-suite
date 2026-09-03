# JavaScript Essentials — Part 6 (Production Hardening: CI/CD, Testing & Scale)

Take your **Part 4 + Part 5** app (working, authenticated, deployed) and make it **production-grade**: automated tests, CI/CD, monitoring, advanced security, performance, and scaling. Written for a complete beginner who finished Parts 1–5.

> 💡 **Study guide (plain edition):** quizzes are plain Q&A, examples are numbered steps, every answer shown openly — no HTML/CSS. For clickable activity see the interactive edition (`Javascript_essentials_part6_interactive.md`) or the standalone app (`Javascript_essentials_part6_study_app.html`).

---

### 🗺 Your path — where Part 6 fits

```
Part 5  Auth + Deploy  →  Part 6  Hardening (tests + CI/CD + scale)  →  (E2E browsers: Playwright Essentials)
```
You are here: **Part 6 — make it bulletproof.** Parts 1–5 got you shipping; Part 6 keeps shipping *safe* on every push.

**Deep browser E2E (Playwright)** is *not* re-taught here — see the separate **Playwright Essentials** series when you want locators, POM, and browser CI. This part covers **unit/integration**, **component tests**, and **general CI/CD + deploy**.

**What you'll be able to do by the end:**
1. Write Vitest/Jest unit tests and React Testing Library checks.
2. Explain a GitHub Actions pipeline: lint → test → build → deploy.
3. Harden auth (refresh tokens, rate limits, RBAC) and read basic monitoring signals.

---

## Table of Contents

1. [Why "production-hardened" matters](#1-why-production-hardened-matters)
2. [Unit &amp; integration testing — Vitest/Jest](#2-unit--integration-testing--vitestjest)
3. [Testing the backend — Express &amp; Mongoose](#3-testing-the-backend--express--mongoose)
4. [Testing the frontend — React Testing Library](#4-testing-the-frontend--react-testing-library)
5. [Coverage &amp; TDD mindset](#5-coverage--tdd-mindset)
6. [CI/CD — what it is, GitHub Actions basics](#6-cicd--what-it-is-github-actions-basics)
7. [CI pipeline — lint + test + build](#7-ci-pipeline--lint--test--build)
8. [CD pipeline — auto-deploy on merge](#8-cd-pipeline--auto-deploy-on-merge)
9. [Environment &amp; secrets in CI](#9-environment--secrets-in-ci)
10. [Monitoring &amp; logging](#10-monitoring--logging)
11. [Performance](#11-performance)
12. [Advanced security (1) — refresh tokens &amp; rate limits](#12-advanced-security-1--refresh-tokens--rate-limits)
13. [Advanced security (2) — RBAC, CORS, HTTPS](#13-advanced-security-2--rbac-cors-https)
14. [Scaling patterns](#14-scaling-patterns)
15. [Common hardening pitfalls](#15-common-hardening-pitfalls)
16. [Practice &amp; auto-graded challenges](#16-practice--auto-graded-challenges)
17. [Answer key](#17-answer-key)

---
---

## 1. Why "production-hardened" matters

> 🚩 **Why it matters:** a deployed app can still break on the next change. Hardening means tests, auto-checks on push, logs when things fail, and security/scale habits.

| Layer | Job |
|---|---|
| **Tests** | Catch bugs before users |
| **CI/CD** | Run checks + deploy automatically |
| **Monitoring** | Know when production is sick |
| **Security + scale** | Survive real traffic and attackers |

**Mental model:** Part 5 = *ship it*. Part 6 = *keep it healthy every day*.

### 🧪 Quiz
1. What does "production-hardened" add on top of "deployed"? → Tests, CI/CD, monitoring, security, scale.
2. Who runs the checks if you use CI? → The pipeline (e.g. GitHub Actions), on every push/PR.

---

## 2. Unit &amp; integration testing — Vitest/Jest

> 🚩 **Why it matters:** a *unit* test checks one small function; an *integration* test checks several pieces together. Both use `describe` / `it` / `expect`.

```javascript
// Vitest or Jest — same shape
import { describe, it, expect } from "vitest";

function add(a, b) { return a + b; }

describe("add", () => {
  it("adds two numbers", () => {
    expect(add(2, 3)).toBe(5);
  });
});
```

| Word | Meaning |
|---|---|
| `describe` | Group of related tests |
| `it` / `test` | One example |
| `expect(x).toBe(y)` | Assertion |

**Unit** = pure logic (no DB, no HTTP). **Integration** = route + DB mock, or two modules together.

### 🧪 Quiz
1. What does `expect(x).toBe(5)` do? → Fails the test if `x` is not `5`.
2. Unit vs integration — which hits more pieces? → Integration.

---

## 3. Testing the backend — Express &amp; Mongoose

> 🚩 **Why it matters:** APIs break silently. Test routes with a fake request and mock the database so tests stay fast and offline.

```javascript
// Idea (supertest-style): hit the route, assert status + body
import request from "supertest";
import app from "../app.js";

it("GET /api/notes returns 200", async () => {
  const res = await request(app).get("/api/notes");
  expect(res.status).toBe(200);
  expect(Array.isArray(res.body)).toBe(true);
});

// Mock Mongoose so you don't need a real Atlas cluster in CI
vi.mock("../models/Note.js", () => ({
  default: { find: vi.fn().mockResolvedValue([{ title: "hi" }]) },
}));
```

**Rule of thumb:** mock external I/O (DB, email, third-party APIs); exercise *your* route logic for real.

### 🧪 Quiz
1. Why mock Mongoose in CI? → Speed, no network, no shared test DB pollution.
2. What status do you often expect for a happy GET list? → 200.

---

## 4. Testing the frontend — React Testing Library

> 🚩 **Why it matters:** test what the *user* sees and does — roles, labels, clicks — not internal class names.

```javascript
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "./Login";

it("shows an error on empty submit", async () => {
  render(<Login />);
  await userEvent.click(screen.getByRole("button", { name: /log in/i }));
  expect(screen.getByText(/email required/i)).toBeInTheDocument();
});
```

Prefer `getByRole` / `getByLabelText` over `getByTestId` when possible (accessible queries = better UX too).

> 🔗 **Browser E2E** (full click-through in Chrome): use **Playwright Essentials** — not this part.

### 🧪 Quiz
1. What library tests React components by user behavior? → React Testing Library (RTL).
2. Prefer `getByRole` or CSS selectors? → `getByRole` / labels.

---

## 5. Coverage &amp; TDD mindset

> 🚩 **Why it matters:** coverage shows *what lines ran*; TDD means write a failing test first, then code until green.

```
Red → Green → Refactor
  │       │         └─ clean up without breaking tests
  │       └─ make the test pass with simplest code
  └─ write a test that fails for the right reason
```

**Coverage %** is a signal, not a trophy. 100% with weak assertions still ships bugs. Aim for meaningful asserts on critical paths (auth, payments, data writes).

### 🧪 Quiz
1. What are the three TDD steps? → Red, Green, Refactor.
2. Does 100% coverage guarantee no bugs? → No.

---

## 6. CI/CD — what it is, GitHub Actions basics

> 🚩 **Why it matters:** CI/CD = robots that test and deploy so you don't forget.

| Term | Meaning |
|---|---|
| **CI** (Continuous Integration) | On every push/PR: install, lint, test, build |
| **CD** (Continuous Delivery/Deploy) | After green CI: ship to Render/Vercel |
| **Workflow** | A YAML file in `.github/workflows/` |
| **Job / Step** | A job is a machine; steps run in order |

```yaml
# .github/workflows/ci.yml (sketch)
name: CI
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: "20" }
      - run: npm ci
      - run: npm test
```

### 🧪 Quiz
1. Where do GitHub Actions workflows live? → `.github/workflows/*.yml`
2. CI vs CD — which deploys? → CD (after CI is green).

---

## 7. CI pipeline — lint + test + build

> 🚩 **Why it matters:** a green push means "style OK + tests OK + it still builds."

Typical order:
1. **Lint** (`eslint`) — catch typos and style issues fast
2. **Test** (`npm test`) — unit/integration
3. **Build** (`npm run build`) — prove the frontend/backend still compiles

If lint fails, stop early — no point burning minutes on tests. Same for tests before deploy.

### 🧪 Quiz
1. Sensible CI order? → lint → test → build.
2. Why fail fast? → Save time and give a clear first error.

---

## 8. CD pipeline — auto-deploy on merge

> 🚩 **Why it matters:** merging to `main` can auto-deploy backend (Render) and frontend (Vercel) so production stays in sync with git.

**Common pattern:**
- PR → CI only (lint/test/build)
- Merge to `main` → CI + CD (deploy)

Render/Vercel usually watch the GitHub repo: green build → new release. You still keep secrets in the host's env UI — not in the repo.

### 🧪 Quiz
1. When should auto-deploy usually run? → After merge to main (and green CI).
2. Where do production secrets live for Render/Vercel? → Hosting dashboard env vars.

---

## 9. Environment &amp; secrets in CI

> 🚩 **Why it matters:** CI needs the same kinds of secrets as production — but never print them in logs.

```
GitHub repo → Settings → Secrets and variables → Actions
  TEST_MONGODB_URI
  JWT_SECRET   (or a throwaway test secret)
```

In the workflow: `env: JWT_SECRET: ${{ secrets.JWT_SECRET }}`. Never `echo` a secret. Never commit `.env`. Rotate anything that leaked.

### 🧪 Quiz
1. How do workflows read a GitHub secret? → `${{ secrets.NAME }}`
2. Should secrets appear in CI logs? → Never.

---

## 10. Monitoring &amp; logging

> 🚩 **Why it matters:** if production fails at 3am, logs and uptime checks tell you *before* users flood your DMs.

| Idea | Beginner practice |
|---|---|
| **Structured logs** | JSON-ish: `{ level, msg, userId, route }` |
| **Error tracking** | Sentry (or similar) catches uncaught errors |
| **Uptime** | Ping `/health` every few minutes |

```javascript
// Tiny structured log habit
console.log(JSON.stringify({ level: "info", msg: "login_ok", userId }));
console.error(JSON.stringify({ level: "error", msg: "login_fail", reason: "bad_password" }));
```

### 🧪 Quiz
1. Why structured logs? → Easy to search/filter later.
2. What does an uptime check usually hit? → A health endpoint.

---

## 11. Performance

> 🚩 **Why it matters:** slow apps feel broken even when "correct."

| Lever | Example |
|---|---|
| **Bundling** | Code-split; don't ship unused deps |
| **Lazy loading** | `React.lazy` for heavy pages |
| **Caching** | HTTP cache / CDN for static assets |
| **Query perf** | Mongo indexes; paginate lists |

```javascript
// Index the field you filter/sort by
await Note.createIndexes({ userId: 1, createdAt: -1 });
// Paginate instead of returning 10_000 docs
Note.find({ userId }).skip(page * 20).limit(20);
```

### 🧪 Quiz
1. Why paginate API lists? → Avoid huge payloads and slow queries.
2. What do indexes speed up? → Lookups/sorts on those fields.

---

## 12. Advanced security (1) — refresh tokens &amp; rate limits

> 🚩 **Why it matters:** short-lived access tokens + httpOnly cookies reduce theft windows; rate limits slow brute-force.

| Idea | Simple version |
|---|---|
| **Access token** | Short life (e.g. 15m) |
| **Refresh token** | Longer life; used only to get a new access token |
| **httpOnly cookie** | JS on the page can't read it (helps vs XSS) |
| **Rate limit** | Max N login attempts per IP/minute |

```javascript
// Pseudocode rate limit
if (attemptsFrom(ip) > 10) return res.status(429).json({ error: "Too many requests" });
```

### 🧪 Quiz
1. What status often means "slow down"? → 429.
2. Why httpOnly cookies for tokens? → Not readable by page JavaScript.

---

## 13. Advanced security (2) — RBAC, CORS, HTTPS

> 🚩 **Why it matters:** identity ≠ permission. Tighten who can do what, who can call you, and encrypt the wire.

```javascript
// RBAC sketch
function requireRole(role) {
  return (req, res, next) => {
    if (req.user?.role !== role) return res.status(403).json({ error: "Forbidden" });
    next();
  };
}
app.delete("/api/users/:id", auth, requireRole("admin"), deleteUser);
```

- **401** = not authenticated · **403** = authenticated but not allowed
- **CORS**: allow only your real frontend origin(s)
- **HTTPS** on a custom domain: encrypt traffic; set Secure cookies

### 🧪 Quiz
1. Admin-only route, logged-in user is "member" → which status? → 403.
2. Should CORS allow `*` in production? → No — allow your frontend origin.

---

## 14. Scaling patterns

> 🚩 **Why it matters:** one laptop ≠ many users. Design so more machines and more data still work.

| Pattern | Why |
|---|---|
| **Stateless servers** | Any instance can handle any request (session in JWT/Redis, not RAM) |
| **Indexes + pagination** | DB stays fast as data grows |
| **CDN** | Static JS/CSS/images near the user |
| **Env per environment** | `dev` / `staging` / `prod` secrets and URLs |

### 🧪 Quiz
1. Why stateless app servers? → Easy to add more instances behind a load balancer.
2. Name one env-per-environment habit → Separate Mongo URI / API URL for staging vs prod.

---

## 15. Common hardening pitfalls

> 🚩 **Why it matters:** these mistakes undo Parts 5–6 overnight.

```
1. Skipping CI "just this once"              → broken main
2. Committing secrets / printing them in logs → rotate immediately
3. Tests that always pass (no real assert)    → false confidence
4. Deploying on red CI                        → ship known breakage
5. No rate limit on /login                    → credential stuffing
6. Treating E2E as the only tests             → slow, flaky feedback
7. 100% coverage with weak tests              → metrics theater
8. Wide-open CORS + long-lived tokens in JS   → XSS becomes account theft
```

**Pyramid reminder:** many fast unit tests, fewer integration tests, a thin layer of E2E (Playwright Essentials) for critical journeys.

### 🧪 Quiz
1. Should you merge with failing CI? → No.
2. Are E2E tests a replacement for unit tests? → No — use both (pyramid).

---

## 16. Practice &amp; auto-graded challenges

> 🚩 **Why it matters:** reps move knowledge from "saw it" to "can write it." The study app grades these instantly.

**✏️ Practice (answers in §17)**
- **E1.** CI vs CD — which one deploys?
- **E2.** Name the three common CI steps in order.
- **E3.** What does `expect(x).toBe(5)` do when `x` is `4`?
- **E4.** 401 vs 403 — which is "logged in but not allowed"?
- **E5.** Where do GitHub Actions secrets live?
- **E6.** What HTTP status for rate limited?

**🏆 Auto-graded challenges (5)**
- **C1 — `testAssert(actual, expected)`** → return `true` if equal (strict), else `false`.
- **C2 — `ciStepsOrder(steps)`** → sort step objects by `.order` ascending (lint→test→build→deploy).
- **C3 — `statusFromLint(ok)`** → `"pass"` if `ok` is true, else `"fail"`.
- **C4 — `tokenRefresh(accessExpired, hasRefresh)`** → `"new_access"` if access expired and refresh exists; `"login"` if no refresh; `"ok"` if access still valid.
- **C5 — `rbacAllowed(role, action)`** → `admin` may do anything; `member` may only `"read"`; else `false`.

**🎬 Scenario check**
- Push with failing tests → CI red → do **not** deploy.
- Login hammered from one IP → return **429** and log it.
- Member hits `DELETE /api/users/1` → **403**.

---

## 17. Answer key

### Practice
- **E1.** CD · **E2.** lint → test → build · **E3.** test fails · **E4.** 403 · **E5.** GitHub repo Settings → Secrets · **E6.** 429

### Challenges
```javascript
// C1
function testAssert(actual, expected){ return actual === expected; }
// C2
function ciStepsOrder(steps){ return steps.slice().sort((a,b)=>a.order-b.order); }
// C3
function statusFromLint(ok){ return ok ? "pass" : "fail"; }
// C4
function tokenRefresh(accessExpired, hasRefresh){
  if (!accessExpired) return "ok";
  return hasRefresh ? "new_access" : "login";
}
// C5
function rbacAllowed(role, action){
  if (role === "admin") return true;
  if (role === "member") return action === "read";
  return false;
}
```

### All section answers (quick recap)
| § | Answer |
|---|---|
| 1 | harden = tests + CI/CD + monitoring + security/scale |
| 2 | describe/it/expect; unit = small; integration = several pieces |
| 3 | test Express routes; mock Mongoose in CI |
| 4 | RTL = user-facing queries; E2E → Playwright Essentials |
| 5 | Red→Green→Refactor; coverage ≠ quality alone |
| 6 | CI checks; CD deploys; Actions = YAML workflows |
| 7 | lint → test → build |
| 8 | deploy on merge to main after green CI |
| 9 | secrets via `${{ secrets.X }}`; never log them |
| 10 | structured logs + errors + uptime |
| 11 | split/lazy/cache/index/paginate |
| 12 | short access + refresh; httpOnly; 429 rate limits |
| 13 | RBAC 403; tight CORS; HTTPS |
| 14 | stateless, indexes, CDN, env-per-env |
| 15 | don't skip CI; no secret leaks; pyramid of tests |

---

### 🎉 Congratulations!

You've completed **JavaScript Essentials — Part 6 (Production Hardening)**. You can now:
- Explain unit vs integration vs component tests, and write Vitest/Jest-style asserts.
- Sketch a GitHub Actions CI/CD path and keep secrets out of git/logs.
- Talk through refresh tokens, rate limits, RBAC, monitoring, and basic scale.

**Series path:** Core → Async/OOP → MERN Bridge → Build MERN → Auth/Deploy → **Hardening**. For deep browser automation, continue with **Playwright Essentials**. 🚀

<!--P6-END-->
