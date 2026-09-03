# TypeScript for Testers — Part 2: Playwright-oriented

Apply Part 1 types to **tsconfig**, **Playwright + TS**, light **POM/helper** annotations, and a tiny **JS→TS migrate** lab.

> 💡 **Plain edition.** Interactive: `Typescript_for_testers_part2_interactive.md`. Study app: `Typescript_for_testers_part2_study_app.html`.

---

### 🗺 Your path

```
Part 1 Basics → Part 2 (you are here) → Playwright Essentials
                              ↘ Phase B: TypeScript Develop + Test (later)
```

**Reminder:** this kit alone is **not** enough for TS-only develop jobs.

---

## Table of Contents

1. [tsconfig for testers](#1-tsconfig-for-testers)
2. [Playwright + TypeScript overview](#2-playwright--typescript-overview)
3. [Light POM annotations](#3-light-pom-annotations)
4. [Helper annotations](#4-helper-annotations)
5. [JS→TS migrate exercise](#5-jsts-migrate-exercise)
6. [Reading TS errors](#6-reading-ts-errors)
7. [Common pitfalls](#7-common-pitfalls)
8. [Practice exercises](#8-practice-exercises)
9. [Challenges](#9-challenges)
10. [Answer key + where next](#10-answer-key--where-next)

**📈 Progress**

- [ ] §§1–2 (tsconfig + Playwright overview)
- [ ] §§3–5 (POM, helpers, migrate)
- [ ] §§6–7 (errors + pitfalls)
- [ ] Practice + challenges

---

## 1. tsconfig for testers

> 🚩 **Why it matters:** one JSON file decides how strict your test repo is — and how noisy the IDE feels.

Typical Playwright TS project includes something like:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "commonjs",
    "moduleResolution": "node",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "types": ["node"]
  },
  "include": ["tests/**/*.ts", "pages/**/*.ts"]
}
```

| Option | Tester takeaway |
|---|---|
| `strict: true` | Best default — catches null/undefined mistakes |
| `target` | Output JS flavor (modern is fine for Node runners) |
| `include` | Only typecheck test/page folders you own |
| `skipLibCheck` | Speeds CI; don't skip *your* code |

You usually **don't hand-author** this from scratch — `npm init playwright@latest` scaffolds it. Learn to *read* it.

### 🧪 Quiz

1. Should test repos prefer `strict: false` to "move faster"? **Answer:** No — fix types; loose mode hides bugs.  
2. What does `include` control? **Answer:** Which files TypeScript typechecks.

---

## 2. Playwright + TypeScript overview

> 🚩 **Why it matters:** Playwright's own types (`Page`, `Locator`, `expect`) are free documentation.

```ts
import { test, expect, type Page } from '@playwright/test';

test('login heading', async ({ page }: { page: Page }) => {
  await page.goto('/login');
  await expect(page.getByRole('heading', { name: 'Sign in' })).toBeVisible();
});
```

Notes:

- Specs are `.ts` / `.tsx` (usually `.ts`).
- Fixtures already type `page`, `context`, `request`.
- Codegen can emit TypeScript — great for learning locators, still refactor into POM.

Deep Playwright skills live in **Playwright Essentials** — this section is the TS surface only.

### 🧪 Quiz

1. Where do `Page` types come from? **Answer:** `@playwright/test`.  
2. Do you need to annotate `({ page })` always? **Answer:** Often inferred; annotate when writing standalone helpers that take `Page`.

---

## 3. Light POM annotations

> 🚩 **Why it matters:** a typed page object tells teammates which locators and actions exist — without reading every method body.

```ts
import type { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly email: Locator;
  readonly password: Locator;
  readonly submit: Locator;

  constructor(page: Page) {
    this.page = page;
    this.email = page.getByLabel('Email');
    this.password = page.getByLabel('Password');
    this.submit = page.getByRole('button', { name: 'Sign in' });
  }

  async login(email: string, password: string): Promise<void> {
    await this.email.fill(email);
    await this.password.fill(password);
    await this.submit.click();
  }
}
```

Keep it **light**: fields + constructor + a few methods. Don't invent a framework.

### 🧪 Quiz

1. Why `readonly` on locators? **Answer:** signals they shouldn't be reassigned after construction.  
2. Return type of `login`? **Answer:** `Promise<void>` (async side effects).

---

## 4. Helper annotations

> 🚩 **Why it matters:** shared asserts and waits are where wrong types hurt the whole suite.

```ts
import type { APIResponse } from '@playwright/test';

export async function expectStatus(
  res: APIResponse,
  expected: number
): Promise<void> {
  const status = res.status();
  if (status !== expected) {
    throw new Error(`Expected ${expected} got ${status}`);
  }
}

export function envName(): 'dev' | 'stage' | 'prod' {
  const v = process.env.TEST_ENV ?? 'dev';
  if (v === 'dev' || v === 'stage' || v === 'prod') return v;
  throw new Error('bad TEST_ENV: ' + v);
}
```

### 🧪 Quiz

1. Why type `expected: number` instead of trusting callers? **Answer:** catches `expectStatus(res, '200')` mistakes.  
2. What does narrowing in `envName` buy you? **Answer:** return type is a safe union, not `string`.

---

## 5. JS→TS migrate exercise

> 🚩 **Why it matters:** most teams don't rewrite — they **migrate file by file**.

Open side-by-side:

| Before | After |
|---|---|
| [`labs/migrate-before.js`](labs/migrate-before.js) | [`labs/migrate-after.ts`](labs/migrate-after.ts) |

**Your job (mental checklist):**

1. Name shapes with `interface` (`ApiResponse`, `LoginPayload`).  
2. Replace free strings with a union (`TestResult`).  
3. Mark optional fields (`rememberMe?`).  
4. Annotate params + returns.  
5. Prefer `unknown` for opaque `body`.

Optional: `npx --yes typescript@5.6.3 --noEmit labs/migrate-after.ts` (may need a minimal tsconfig — reading the file is enough for this kit).

### 🧪 Quiz

1. First migrate target in a real repo? **Answer:** shared helpers / fixtures — high reuse.  
2. Must you convert every file on day one? **Answer:** No — incremental is normal.

---

## 6. Reading TS errors

> 🚩 **Why it matters:** the red squiggle is a *clue*, not an insult.

| Message (short) | Likely fix |
|---|---|
| `Argument of type 'X' is not assignable to 'Y'` | Wrong arg — fix call or widen type intentionally |
| `Object is possibly 'undefined'` | Optional chaining, default, or guard |
| `Property 'x' does not exist on type 'Y'` | Typo, or update the interface |
| `Type 'string' is not assignable to '...'` union | Use an allowed literal |

### 🧪 Quiz

1. `possibly undefined` on `opts.timeout` — quick fix? **Answer:** `opts?.timeout ?? 5000` or require the field.  
2. Is `as any` the right first move? **Answer:** No — last resort.

---

## 7. Common pitfalls

> 🚩 **Why it matters:** fighting the compiler trains bad habits.

1. **Re-declaring Playwright types** — import them.  
2. **`as any` to ship** — hides bugs your suite won't catch.  
3. **Huge POM base classes** — keep page objects boring.  
4. **Typing test *data* as `string` when a union fits** — missed typos.  
5. **Skipping Part 1** — POM annotations are just interfaces + promises.

### Spot-the-Bug

```ts
async function open(page: any, path: string) {
  await page.goto(path);
}
```

**Fix:** `page: Page` from `@playwright/test`.

---

## 8. Practice exercises

1. Add types to a `LogoutPage` with one `logout(): Promise<void>` method.  
2. Write `type JobStatus = 'queued' | 'running' | 'done' | 'failed'`.  
3. Migrate `buildLoginPayload` from the lab (or re-type it from memory).  
4. Read a `tsconfig` in Playwright Essentials (or any sample) and list three options you recognize.

---

## 9. Challenges

1. Given an untyped `function selectBrowser(name) { ... }`, constrain `name` to Playwright's three browser unions you care about.  
2. Sketch `interface RetryOptions { times: number; delayMs?: number }` and a `withRetry(fn, opts)` signature (no need to implement).  
3. Explain why Phase B still exists after this kit.

---

## 10. Answer key + where next

**Practice / challenges (short)**

1. Same pattern as `LoginPage` — `readonly page: Page`, async method `Promise<void>`.  
2. As written.  
3. See `labs/migrate-after.ts`.  
4. e.g. `strict`, `target`, `include`.  
**Challenge 1:** `'chromium' | 'firefox' | 'webkit'`.  
**Challenge 2:** `function withRetry<T>(fn: () => Promise<T>, opts: RetryOptions): Promise<T>` (generics optional — even without `<T>`, typing `opts` helps).  
**Challenge 3:** This kit is test-oriented only; **Phase B TypeScript Develop + Test** covers building apps + tests for TS-heavy jobs.

### Where next

| Next | Why |
|---|---|
| [Playwright Essentials](../playwright-essentials/README.md) | Real E2E, POM depth, flakes, CI |
| Phase B `typescript-develop-test` | App + tests in TS (career depth) |
| [Automation Tester Path](../automation-tester-path/README.md) | Full map |

---

## 🎉 Done with the thin TS kit

You can annotate helpers, read tsconfig, and follow Playwright's types. Go write tests — deepen TS later in Phase B if your job needs it.

<!--P2-END-->
