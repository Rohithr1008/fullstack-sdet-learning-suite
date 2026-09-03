# TypeScript for Testers — Part 1: Basics

Thin study guide: **why TypeScript in automation**, then the types you'll actually use in helpers and fixtures.

> 💡 **Plain edition:** quizzes are open Q&A. Interactive: `Typescript_for_testers_part1_interactive.md`. Study app: `Typescript_for_testers_part1_study_app.html`.

---

### 🗺 Your path

```
JE / HTML-CSS → TypeScript for Testers (Part 1 you are here → Part 2) → Playwright Essentials
                                         ↘ Phase B: TypeScript Develop + Test (later, not this kit)
```

**Scope:** test-oriented TS only. **Not** enough alone for TS-only develop jobs.

---

## Table of Contents

1. [Why TypeScript in automation](#1-why-typescript-in-automation)
2. [Primitive types & annotations](#2-primitive-types--annotations)
3. [Interfaces](#3-interfaces)
4. [Unions](#4-unions)
5. [Optional properties](#5-optional-properties)
6. [Type aliases (light)](#6-type-aliases-light)
7. [Common pitfalls](#7-common-pitfalls)
8. [Practice exercises](#8-practice-exercises)
9. [Challenges](#9-challenges)
10. [Answer key](#10-answer-key)

**📈 Progress**

- [ ] §§1–3 (why + primitives + interfaces)
- [ ] §§4–6 (unions, optional, aliases)
- [ ] §7 pitfalls
- [ ] Practice + challenges

---

## 1. Why TypeScript in automation

> 🚩 **Why it matters:** a wrong argument to a helper fails at *edit time*, not after a 12-minute CI run.

TypeScript adds **static types** on top of JavaScript. For testers that means:

| Without TS | With TS |
|---|---|
| `login(user)` where `user` is a string by mistake | Compiler: expected `{ email, password }` |
| Rename a fixture field, miss one call site | Red squiggle on every miss |
| Guess return shape of `getOrder()` | Interface documents the shape |

**What this kit is not:** building React apps, advanced generics, or interviewing for "TS developer" roles. That is **Phase B — TypeScript Develop + Test**.

### 🧪 Quiz

1. Does green Playwright prove your helpers have correct argument types? **Answer:** No — that's a compile-time / review concern (TS helps).  
2. Name one automation win from types. **Answer:** Safer refactors of shared helpers/POM; fail fast in the IDE.

---

## 2. Primitive types & annotations

> 🚩 **Why it matters:** annotate the boundaries of *your* helpers — params and returns — first.

```ts
function waitMs(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function titleOf(pageTitle: string): string {
  return pageTitle.trim();
}

function isOk(status: number): boolean {
  return status >= 200 && status < 300;
}
```

| Type | Use in tests |
|---|---|
| `string` | labels, URLs, emails |
| `number` | timeouts, status codes |
| `boolean` | flags (`headless`, `rememberMe`) |
| `void` | function returns nothing useful |
| `unknown` | "I have data but won't pretend I know the shape yet" |

Prefer `unknown` over `any` when parsing JSON — then narrow.

### 🧪 Quiz

1. Annotate: `function add(a, b) { return a + b; }` for numbers. **Answer:** `(a: number, b: number): number`  
2. Return type of a function that only throws or side-effects? Often **`void`**.

---

## 3. Interfaces

> 🚩 **Why it matters:** fixtures and API bodies are *shapes* — interfaces name those shapes once.

```ts
interface UserFixture {
  email: string;
  password: string;
  role: string;
}

interface ApiResponse {
  status: number;
  body: unknown;
}

function assertOk(res: ApiResponse): void {
  if (res.status < 200 || res.status >= 300) {
    throw new Error('not ok: ' + res.status);
  }
}
```

**Tester rule:** interface the objects *you* create (fixtures, payloads, page-object options). Don't try to re-type the entire browser.

### 🧪 Quiz

1. Why name `UserFixture` instead of inline object types everywhere? **Answer:** one source of truth + clearer errors.  
2. Should every DOM node get a custom interface? **Answer:** No — overkill; trust Playwright's types.

---

## 4. Unions

> 🚩 **Why it matters:** many test values are a *small set* of strings or numbers — unions lock that set.

```ts
type TestResult = 'pass' | 'fail' | 'skip';
type HttpOk = 200 | 201 | 204;

function badge(result: TestResult): string {
  return result.toUpperCase();
}

// badge('passed'); // ❌ Error — not in the union
```

Unions beat free-form `string` for statuses, environments (`'dev' | 'stage' | 'prod'`), and browser names you support.

### 🧪 Quiz

1. Better for env: `string` or `'dev' | 'stage' | 'prod'`? **Answer:** the union.  
2. Can a union mix types (`string | number`)? **Answer:** Yes — then narrow before use.

---

## 5. Optional properties

> 🚩 **Why it matters:** Playwright-style options are full of "sometimes present" fields.

```ts
interface ClickOptions {
  timeout?: number;   // may be omitted
  force?: boolean;
}

function clickName(name: string, opts?: ClickOptions): void {
  const timeout = opts?.timeout ?? 5000;
  // ...
}
```

| Syntax | Meaning |
|---|---|
| `timeout?: number` | property may be missing |
| `timeout: number \| undefined` | may be present but `undefined` |
| `opts?.timeout` | optional chaining — safe access |

### 🧪 Quiz

1. Is `email?: string` required when creating the object? **Answer:** No — can omit.  
2. What does `??` do vs `\|\|`? **Answer:** `??` only falls through for `null`/`undefined` (not `0` or `''`).

---

## 6. Type aliases (light)

> 🚩 **Why it matters:** pick one style and stay consistent in the test repo.

```ts
type Id = string;
type Result = 'pass' | 'fail' | 'skip';

interface LoginPageOptions {
  baseURL: string;
  storageState?: string;
}
```

**Rule of thumb for testers:**

- **`type`** — unions, aliases for primitives, function types  
- **`interface`** — object shapes you might extend later (`LoginPageOptions`)

Don't debate religion — match the repo you're in.

### 🧪 Quiz

1. Union of three strings — `type` or `interface`? **Answer:** `type`.  
2. Object with optional fields for a POM — usually **`interface`**.

---

## 7. Common pitfalls

> 🚩 **Why it matters:** bad TS habits erase the value of adopting it.

1. **`any` everywhere** — silences the compiler; you paid for nothing.  
2. **Typing Playwright internals** — use `Page`, `Locator` from `@playwright/test`; don't invent parallel DOM types.  
3. **Ignoring errors with `// @ts-ignore`** — fix the types or narrow; don't wallpaper.  
4. **Over-modeling** — a 40-field interface for a 2-field fixture is noise.  
5. **Thinking TS replaces tests** — types catch shape bugs; tests catch behavior.

### Spot-the-Bug

```ts
function setEnv(env: any) {
  process.env.TEST_ENV = env;
}
setEnv(42); // "works" — until something expects 'stage'
```

**Fix:** `env: 'dev' | 'stage' | 'prod'`.

---

## 8. Practice exercises

> 🚩 **Why it matters:** annotate small helpers before touching a full POM.

1. Annotate params + return: `function fullName(first, last) { return first + ' ' + last; }`  
2. Write an interface `CartItem` with `sku: string`, `qty: number`, optional `note?: string`.  
3. Write `type BrowserName = 'chromium' | 'firefox' | 'webkit'`.  
4. Warm-up migrate: take `function assertStatus(res, expected) { ... }` and add types (see Part 2 lab for a full version).

---

## 9. Challenges

1. Given `{ status: 201, body: { id: 'x' } }`, write `ApiResponse` + a function `idOf(res)` that returns `string | undefined` safely.  
2. Replace `string` status params in a fake reporter with a `TestResult` union.  
3. Explain in one sentence when you'd choose `unknown` over `any`.

---

## 10. Answer key

**Practice**

1. `(first: string, last: string): string`  
2. `interface CartItem { sku: string; qty: number; note?: string }`  
3. As written in §8.  
4. See Part 2 `labs/migrate-after.ts`.

**Challenges**

1. Example:

```ts
interface ApiResponse { status: number; body?: { id?: string } }
function idOf(res: ApiResponse): string | undefined {
  return res.body?.id;
}
```

2. `type TestResult = 'pass' | 'fail' | 'skip'` then `function report(r: TestResult)`.  
3. `unknown` forces you to narrow before use; `any` disables checking.

---

## 🎉 Next

Part 1 done → open **[Part 2](Typescript_for_testers_part2_with_examples.md)** (tsconfig, Playwright+TS, POM annotations, migrate lab).

<!--P1-END-->
