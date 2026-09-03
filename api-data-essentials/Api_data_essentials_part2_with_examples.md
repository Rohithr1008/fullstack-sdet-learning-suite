# API & Data Essentials — Part 2 (Auth & Contracts)

Auth for API tests, **negative testing**, and lightweight **contract/schema smoke**.

> 💡 Plain edition — open answers. Interactive + study app for clickable quizzes and auth mock.

---

### 🗺 Your path

```
Part 1  HTTP/REST ✅
Part 2  Auth · negatives · schema   ← you are here
Part 3  SQL · seed/teardown · API↔DB
```

Demo login: `tester@demo.test` / `pass123` → Bearer `demo-token-abc123`. API key: `lab-key-42` (tester; cannot DELETE).

---

## Table of Contents

1. [Auth types](#1-auth-types)
2. [Login → token flow](#2-login--token-flow)
3. [Negative testing mindset](#3-negative-testing-mindset)
4. [Status matrix](#4-status-matrix)
5. [Contract & JSON Schema smoke](#5-contract--json-schema-smoke)
6. [Idempotency, retries, flaky auth](#6-idempotency-retries-flaky-auth)
7. [Common pitfalls](#7-common-pitfalls)
8. [Practice exercises](#8-practice-exercises)
9. [Challenges](#9-challenges)
10. [Answer key](#10-answer-key)

---

## 1. Auth types

> 🚩 **Why it matters:** wrong header = 401 forever; knowing the type tells you what to send.

| Type | Header / where | Tester note |
|------|----------------|-------------|
| Bearer JWT/opaque | `Authorization: Bearer <token>` | Login first or use fixture token |
| API key | `X-API-Key: …` or query | Often lower privilege |
| Basic | `Authorization: Basic base64(user:pass)` | Rare in modern APIs |
| Cookie session | `Cookie: sid=…` | Pair with UI login / storageState |

Our mock: Bearer admin token can DELETE; API key is tester → **403** on DELETE.

---

## 2. Login → token flow

> 🚩 **Why it matters:** tests must obtain tokens the same way clients do (or via a trusted test hook).

```javascript
const login = await fetch("http://127.0.0.1:4040/auth/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email: "tester@demo.test", password: "pass123" }),
});
const { access_token } = await login.json();

const create = await fetch("http://127.0.0.1:4040/products", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${access_token}`,
  },
  body: JSON.stringify({ title: "Auth Widget", price: 2, stock: 1 }),
});
console.log(create.status); // 201
```

**Test design:** prefer login once per worker/fixture; avoid logging in every test if slow (cache token with expiry awareness).

---

## 3. Negative testing mindset

> 🚩 **Why it matters:** happy paths miss security and validation bugs.

Ask: What if **no** auth? **Wrong** auth? **Right** auth, **wrong** role? **Malformed** body? **Missing** field?

Each answer becomes a case with an **expected status + error shape**.

---

## 4. Status matrix

> 🚩 **Why it matters:** 401 ≠ 403 ≠ 422 — triage depends on it.

| Case | Expected |
|------|----------|
| No Authorization on protected POST | 401 |
| Valid tester key on admin DELETE | 403 |
| Unknown id | 404 |
| Empty title / negative price | 422 |
| Valid create | 201 |

```bash
npm run mock-api
npm run lab:part2
```

---

## 5. Contract & JSON Schema smoke

> 🚩 **Why it matters:** status 200 with wrong types still breaks clients.

Lightweight smoke (not full Pact):

```javascript
function shapeOk(obj, schema) {
  for (const key of schema.required || []) if (!(key in obj)) return false;
  for (const [k, rule] of Object.entries(schema.properties || {})) {
    if (!(k in obj)) continue;
    const v = obj[k];
    if (rule.type === "string" && typeof v !== "string") return false;
    if (rule.type === "number" && typeof v !== "number") return false;
    if (rule.type === "integer" && !Number.isInteger(v)) return false;
  }
  return true;
}
```

Fetch schema from `GET /_schema/product` and check create responses.

---

## 6. Idempotency, retries, flaky auth

> 🚩 **Why it matters:** blind retries can create duplicate orders.

- Retry **safe** GETs on network blips; be careful with POST.
- Expired tokens → refresh or re-login once, then fail loudly.
- Don't mark flakes as "pass on retry" without understanding.

---

## 7. Common pitfalls

1. Putting token in query string (logs/leaks).  
2. Asserting 401 when API returns 403 (role vs auth).  
3. Schema check only on happy path.  
4. Sharing one mutable user across parallel tests.  
5. Hardcoding tokens that rotate in staging.

### 🐞 Spot-the-Bug
```javascript
// expects 401 but sends API key on admin delete
await fetch(url, { method: "DELETE", headers: { "X-API-Key": "lab-key-42" } });
expect(status).toBe(401); // BUG: should be 403
```

---

## 8. Practice exercises

1. 🟢 Bad password → 401.  
2. 🟢 POST product without auth → 401.  
3. 🟡 Create with Bearer → 201 + schema smoke.  
4. 🟡 Invalid body → 422.  
5. 🔴 DELETE with API key → 403; with Bearer → 200.

---

## 9. Challenges

1. `login(base, email, password)` → token or throw.  
2. `authHeaders(token)` → headers object.  
3. `expectStatus(res, code)`.  
4. `schemaSmoke(obj, schema)` boolean.  
5. `negativeMatrix(base)` runs 401/403/422 checks; returns `'pass'`.

---

## 10. Answer key

See `labs/part2/auth-negatives.mjs`. Spot-bug fix: expect **403**.

### 📅 7-day plan
D1 auth types · D2 login flow · D3 negatives · D4 matrix lab · D5 schema · D6 pitfalls · D7 challenges

🎉 **Part 2 complete** → Part 3 (SQL & data).

<!--P2-END-->
