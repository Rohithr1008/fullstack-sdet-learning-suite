# API & Data Essentials — Part 3 (Data & SQL for Testers)

**SQL basics for testers**, seed/teardown, test-data strategies, and **API ↔ DB** checks.

> 💡 We teach real SQL syntax. The mock API's `GET /_db/snapshot` stands in for a SQL client so labs run with zero DB install.

---

### 🗺 Your path

```
Part 1  HTTP/REST ✅
Part 2  Auth & contracts ✅
Part 3  SQL · data · API↔DB   ← you are here
```

---

## Table of Contents

1. [Why testers need SQL](#1-why-testers-need-sql)
2. [SELECT / WHERE / ORDER / LIMIT](#2-select--where--order--limit)
3. [JOIN basics](#3-join-basics)
4. [Seed & teardown](#4-seed--teardown)
5. [Test data strategies](#5-test-data-strategies)
6. [API ↔ DB verification](#6-api--db-verification)
7. [Common pitfalls](#7-common-pitfalls)
8. [Practice exercises](#8-practice-exercises)
9. [Challenges](#9-challenges)
10. [Answer key](#10-answer-key)

---

## 1. Why testers need SQL

> 🚩 **Why it matters:** the API can lie; the database is often the source of truth for state.

Use SQL to: confirm a POST actually inserted a row, check soft-deletes, verify JOIN'd reports, debug "works in UI but wrong total".

You are not becoming a DBA — you need **read** skills + safe seed/teardown habits.

---

## 2. SELECT / WHERE / ORDER / LIMIT

> 🚩 **Why it matters:** almost every data assert starts with SELECT.

```sql
SELECT id, title, price
FROM products
WHERE price >= 5
ORDER BY price DESC
LIMIT 10;
```

| Clause | Job |
|--------|-----|
| SELECT | Which columns |
| FROM | Which table |
| WHERE | Filter rows |
| ORDER BY | Sort |
| LIMIT | Cap rows (tests love this) |

---

## 3. JOIN basics

> 🚩 **Why it matters:** orders without product titles are useless for asserts.

```sql
SELECT o.id AS order_id, u.email, p.title, o.qty, o.status
FROM orders o
JOIN users u ON u.id = o.user_id
JOIN products p ON p.id = o.product_id
WHERE o.status = 'paid';
```

**INNER JOIN** = only matching rows. Know it exists vs LEFT JOIN (keep left rows even if right missing).

---

## 4. Seed & teardown

> 🚩 **Why it matters:** dirty data is the #1 source of API flakes.

Patterns:

1. **Reset** known fixtures before suite (`POST /_db/reset` in our mock).  
2. **Create unique rows** per test (`title: "t-" + Date.now()`).  
3. **Delete what you created** in `afterEach` / `finally`.  
4. Prefer **transaction rollback** in real apps when available.

```javascript
await fetch(base + "/_db/reset", { method: "POST" });
// ... test ...
await fetch(base + "/_db/reset", { method: "POST" });
```

---

## 5. Test data strategies

> 🚩 **Why it matters:** shared "testuser1" across parallel jobs = chaos.

| Strategy | When |
|----------|------|
| Static fixtures | Tiny read-only smoke |
| Factories (`buildProduct()`) | Many variants |
| Per-test unique keys | Parallel CI |
| Isolated schemas/DBs | Large teams |

Never rely on row **order** without `ORDER BY`.

---

## 6. API ↔ DB verification

> 🚩 **Why it matters:** this is the killer skill — prove the API and DB agree.

Pattern:

1. Seed baseline.  
2. Call API (POST/PATCH).  
3. SELECT (or snapshot) the row.  
4. Assert fields match.  
5. Teardown.

```bash
npm run mock-api
npm run lab:part3
```

Lab compares `GET /orders` to `/_db/snapshot` tables and checks a JOIN view.

---

## 7. Common pitfalls

1. Asserting API only — never checking DB.  
2. Using `SELECT *` and coupling tests to extra columns.  
3. Forgetting teardown → cross-test pollution.  
4. Comparing floats without tolerance.  
5. Running destructive SQL on shared staging without a sandbox.

### 🐞 Spot-the-Bug
```javascript
const api = await getOrders();
const db = await snapshot();
expect(api.data.length).toBe(db.tables.products.length); // BUG: wrong table
```
**Fix:** compare to `db.tables.orders`.

---

## 8. Practice exercises

1. 🟢 Write SELECT of products with `stock = 0`.  
2. 🟢 WHERE + ORDER BY price ascending.  
3. 🟡 JOIN orders→users emails.  
4. 🟡 Seed via API create, confirm id in snapshot.  
5. 🔴 Design teardown that resets even if the test throws.

---

## 9. Challenges

1. `paidOrders(snapshot)` — filter paid.  
2. `joinOrders(snapshot)` — array of `{order_id, email, product}`.  
3. `assertApiMatchesDb(apiOrders, dbOrders)`.  
4. `withReset(base, fn)` — reset, run fn, reset again.  
5. `stockOutTitles(snapshot)` — titles where stock === 0.

---

## 10. Answer key

- Ex1: `SELECT title FROM products WHERE stock = 0;`  
- Ex3: JOIN on `user_id`.  
- Ex5: `try { await fn() } finally { await reset() }`.  
- Challenges: see `labs/part3/api-db-check.mjs`.

### 📅 7-day plan
D1 why SQL · D2 SELECT · D3 JOIN · D4 seed/teardown · D5 strategies · D6 API↔DB lab · D7 challenges

🎉 **Series complete** — you can honestly claim API + SQL-for-testers basics on the Automation Tester Path.

<!--P3-END-->
