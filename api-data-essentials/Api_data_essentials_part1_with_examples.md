# API & Data Essentials — Part 1 (HTTP & REST Foundations)

A hands-on guide to **API testing foundations**: HTTP methods, status codes, REST shapes, assertions, and turning Postman clicks into code.

> 💡 **Study guide (plain edition):** quizzes are open Q&A. For clickable quizzes see `Api_data_essentials_part1_interactive.md` or the study app.

---

### 🗺 Your path

```
Part 1  HTTP/REST + assertions + Postman→code   ← you are here
Part 2  Auth · negatives · contract/schema
Part 3  SQL-for-testers · seed/teardown · API↔DB
```

Prereq: JE Part 1–2 comfort (`fetch`, async/await). Companion mock: `npm run mock-api` → http://127.0.0.1:4040

---

## Table of Contents

1. [Why API testing](#1-why-api-testing)
2. [HTTP methods & status codes](#2-http-methods--status-codes)
3. [REST resources & URLs](#3-rest-resources--urls)
4. [Headers, query params, JSON bodies](#4-headers-query-params-json-bodies)
5. [Assertions](#5-assertions)
6. [Postman → code](#6-postman--code)
7. [First green smoke test](#7-first-green-smoke-test)
8. [Common pitfalls](#8-common-pitfalls)
9. [Practice exercises](#9-practice-exercises)
10. [Challenges](#10-challenges)
11. [Answer key](#11-answer-key)

**📈 Progress**

- [ ] Sections 1–4 (HTTP/REST)
- [ ] Sections 5–7 (assert + code)
- [ ] Pitfalls + practice + challenges

---

## 📋 Quick Reference

| Method | Typical use | Safe? | Idempotent? |
|--------|-------------|-------|-------------|
| GET | Read | Yes | Yes |
| POST | Create / action | No | Usually no |
| PUT | Replace | No | Yes |
| PATCH | Partial update | No | Often yes |
| DELETE | Remove | No | Yes |

| Status | Meaning for testers |
|--------|---------------------|
| 200 | OK (body usually present) |
| 201 | Created (check Location / id) |
| 204 | No content |
| 400 | Bad request (client mistake) |
| 401 | Unauthenticated |
| 403 | Authenticated but forbidden |
| 404 | Missing resource |
| 422 | Validation failed |
| 500 | Server bug — file it |

---

## 1. Why API testing

> 🚩 **Why it matters:** UI tests are slow and brittle. Many bugs live in status codes and JSON — API tests catch them cheaper.

The tester pyramid: **Unit** → **API/service (this kit)** → **UI E2E (Playwright)**.

**When API wins:** contract breaks, auth rules, validation, pagination, CRUD without a browser.  
**When UI still needed:** layout, real clicks, a11y, multi-tab flows.

### 🧪 Quiz
**Q:** Name one bug an API test finds faster than Playwright UI.  
**A:** Wrong status (e.g. 500 on validation) or missing JSON field after a deploy.

---

## 2. HTTP methods & status codes

> 🚩 **Why it matters:** asserting only `200` hides half the truth — method + status encode the story.

```javascript
const res = await fetch("http://127.0.0.1:4040/products");
console.log(res.status); // 200
const body = await res.json();
console.log(body.count); // 3
```

**Golden rules:** (1) assert status first, (2) prefer specific codes (201 on create), (3) unexpected 5xx = product bug.

### 🧪 Quiz
**Q:** POST create succeeds — which status is most precise?  
**A:** **201 Created** (legacy APIs sometimes return 200 — document the contract).

---

## 3. REST resources & URLs

> 🚩 **Why it matters:** stable resource naming makes tests readable and reusable.

Good: `GET /products`, `GET /products/1`, `POST /products`, `DELETE /products/1`.  
Our mock list returns `{ data, count }`; item endpoints return one object.

---

## 4. Headers, query params, JSON bodies

> 🚩 **Why it matters:** most mysterious failures are missing `Content-Type` or wrong query types.

```javascript
const res = await fetch("http://127.0.0.1:4040/products?minPrice=5");
const { data } = await res.json();

await fetch("http://127.0.0.1:4040/products", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer demo-token-abc123",
  },
  body: JSON.stringify({ title: "Sticker", price: 1.5, stock: 10 }),
});
```

---

## 5. Assertions

> 🚩 **Why it matters:** a green test that only checks "no throw" teaches nothing.

Minimum set: status → critical headers → shape (keys/types) → business fields.

```javascript
function assert(cond, msg) { if (!cond) throw new Error(msg); }
const res = await fetch("http://127.0.0.1:4040/products/1");
assert(res.status === 200, "status");
const p = await res.json();
assert(p.id === 1 && typeof p.title === "string", "shape");
```

Playwright: `expect(response).toBeOK()` then `toMatchObject({ id: 1 })`.

---

## 6. Postman → code

> 🚩 **Why it matters:** collections are great for exploration; code is what CI runs.

| Postman | Code |
|---------|------|
| Method + URL | `fetch(url, { method })` |
| Headers | `headers: { ... }` |
| Body raw JSON | `JSON.stringify(obj)` |
| `pm.response.code` | `res.status` |
| `{{baseUrl}}` | `process.env.API_BASE` |

```javascript
// Playwright request fixture sketch
const res = await request.get("/products");
expect(res.status()).toBe(200);
```

---

## 7. First green smoke test

> 🚩 **Why it matters:** one reliable smoke unlocks API checks in every PR.

```bash
npm run mock-api   # terminal 1
npm run lab:part1  # terminal 2
```

Covers: `/health`, list, get one, missing → 404.

---

## 8. Common pitfalls

1. Asserting only 200 on create.  
2. Forgetting `await res.json()`.  
3. Hardcoding full URLs (break in CI).  
4. Parsing HTML error pages as JSON.  
5. Order-dependent tests without reset.  
6. Treating 401 as "API down".

### 🐞 Spot-the-Bug
```javascript
const res = await fetch(base + "/products");
expect(res.status).toBe(201); // BUG: GET list → 200
```
**Fix:** expect `200`.

---

## 9. Practice exercises

1. 🟢 `GET /health` → `status === "ok"`.  
2. 🟢 `GET /products?minPrice=8` → every price >= 8.  
3. 🟡 `GET /products/9999` → 404 + `error === "not_found"`.  
4. 🟡 Helper `expectJson(res, status)` checks status + content-type.  
5. 🔴 Translate Postman POST create into `fetch` + Bearer.

---

## 10. Challenges

1. `statusOf(url)` — GET status number.  
2. `titles(base)` — product titles array.  
3. `assertProductShape(obj)` — type checks.  
4. `notFoundMessage(base, id)` — error message.  
5. `smoke(base)` — health+list+one or throw.

---

## 11. Answer key

- Ex1–3: see `labs/part1/smoke.mjs` patterns.  
- Ex4: check `res.headers.get("content-type")` includes `json`.  
- Ex5: POST + Authorization → expect 201.  
- Challenges: pure helpers around `fetch` + `assert`.

### 📅 7-day plan
D1 §§1–2 · D2 §3 · D3 §4 · D4 §5 · D5 §§6–7 lab · D6 pitfalls · D7 challenges

🎉 **Part 1 complete** → Part 2 (Auth & Contracts).

<!--P1-END-->
