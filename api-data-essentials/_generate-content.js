"use strict";
const fs = require("fs");
const path = require("path");
const root = __dirname;

const style = `<style>
h2 { border-bottom: 3px solid #0e7490; padding-bottom: 6px; }
h2[id] { scroll-margin-top: 12px; }
.interactive-note { background: #eef6ff; border-left: 4px solid #0e7490; padding: 10px 14px; border-radius: 6px; }
.tip { background: #f0fff4; border-left: 4px solid #38a169; padding: 10px 14px; border-radius: 6px; }
.why { background:#eef2ff; border-left:4px solid #5a67d8; padding:6px 12px; border-radius:6px; margin:6px 0 10px 0; font-size:0.92rem; }
.warn { background: #fffaf0; border-left: 4px solid #dd6b20; padding: 10px 14px; border-radius: 6px; }
.chall { background: #f5f3ff; border-left: 4px solid #6b46c1; padding: 10px 14px; border-radius: 6px; }
.quiz-box { background: #f7f9fc; border: 2px solid #0e7490; border-radius: 10px; padding: 14px 18px; margin: 18px 0; }
.quiz-box h3 { margin-top: 0; color: #0e7490; }
.quiz-box details { background: #ffffff; border: 1px solid #cbd5e0; border-radius: 8px; padding: 8px 12px; margin: 8px 0; }
.quiz-box summary { cursor: pointer; font-weight: 600; }
.quiz-correct { color: #276749; font-weight: 700; }
.quiz-wrong { color: #9b2c2c; }
.flashcard { background: #fffbeb; border: 2px solid #d69e2e; border-radius: 10px; padding: 10px 14px; margin: 10px 0; }
.flashcard summary { cursor: pointer; font-weight: 700; color: #744210; }
.predict { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 10px; margin: 14px 0; }
.predict details { background: #fff; border: 1px solid #cbd5e0; border-radius: 8px; padding: 8px 12px; }
.predict summary { cursor: pointer; font-weight: 600; }
.spotbug { display: grid; gap: 10px; margin: 14px 0; }
.spotbug details { background: #fff; border: 1px solid #cbd5e0; border-radius: 8px; padding: 10px 14px; }
.mood { margin-top: 12px; display: flex; flex-wrap: wrap; gap: 6px; align-items: center; }
.mood > span { font-weight: 700; margin-right: 4px; }
.mood input { display: none; }
.mood label { cursor: pointer; border: 1px solid #a0aec0; border-radius: 999px; padding: 4px 12px; background: #fff; font-size: 14px; }
.mood input:checked + label { background: #0e7490; border-color: #0e7490; color: #fff; font-weight: 700; }
.footer { text-align: center; padding: 18px; margin-top: 30px; background: #0e7490; color: #fff; border-radius: 10px; }
pre { background: #1a202c; color: #e2e8f0; padding: 12px 14px; border-radius: 8px; overflow-x: auto; }
@media (prefers-color-scheme: dark) {
  body { background: #0d1117; color: #e6edf3; }
  .quiz-box { background: #141c28; }
  .quiz-box details, .predict details, .spotbug details { background: #0f1622; border-color: #2d3748; color: #e2e8f0; }
  .flashcard { background: #241d0e; border-color: #975a16; }
}
</style>`;

function nav(n, kind) {
  const ext = kind === "plain" ? "with_examples.md" : "interactive.md";
  const links = [1, 2, 3]
    .map((i) =>
      i === n
        ? `<strong style="color:#fff;">${i}</strong>`
        : `<a href="Api_data_essentials_part${i}_${ext}" style="color:#7dd3fc;font-weight:600;text-decoration:none;">${i}</a>`
    )
    .join(" · ");
  return `<div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;background:#2d3748;color:#e2e8f0;padding:8px 12px;border-radius:8px;margin:10px 0;font-size:0.95rem;"><a href="index.html" style="color:#7dd3fc;font-weight:600;text-decoration:none;">Hub</a> ${links}</div>`;
}

function quizBox(title, items) {
  return (
    `<div class="quiz-box"><h3>🧪 ${title}</h3>` +
    items
      .map(
        (it, i) =>
          `<details><summary>Q${i + 1}. ${it.q}</summary><p><span class="quiz-correct">✓ ${it.a}</span>${
            it.why ? " — " + it.why : ""
          }</p></details>`
      )
      .join("") +
    `</div>\n`
  );
}

function predict(cards) {
  return (
    `<div class="predict">` +
    cards
      .map((c) => `<details><summary>🤔 Predict: ${c.q}</summary><p>${c.a}</p></details>`)
      .join("") +
    `</div>\n`
  );
}

function spotbug(bugs) {
  return (
    `<div class="spotbug">` +
    bugs
      .map(
        (b, i) =>
          `<details><summary>🐞 Bug ${i + 1} — ${b.title}</summary><pre><code>${b.code}</code></pre><p><strong>Fix:</strong> ${b.fix}</p></details>`
      )
      .join("") +
    `</div>\n`
  );
}

function mood(id) {
  return `<div class="mood"><span>Mood:</span>
<input type="radio" name="m${id}" id="m${id}a"><label for="m${id}a">😊 Clear</label>
<input type="radio" name="m${id}" id="m${id}b"><label for="m${id}b">😐 Fuzzy</label>
<input type="radio" name="m${id}" id="m${id}c"><label for="m${id}c">😵 Stuck</label></div>\n`;
}

function studyPlan(days) {
  return (
    `<details class="studyplan7"><summary>📅 7-day study plan</summary><ol>` +
    days.map((d) => `<li>${d}</li>`).join("") +
    `</ol></details>\n`
  );
}

// ---- Part 1 plain ----
const p1plain = `# API & Data Essentials — Part 1 (HTTP & REST Foundations)

A hands-on guide to **API testing foundations**: HTTP methods, status codes, REST shapes, assertions, and turning Postman clicks into code.

> 💡 **Study guide (plain edition):** quizzes are open Q&A. For clickable quizzes see \`Api_data_essentials_part1_interactive.md\` or the study app.

---

### 🗺 Your path

\`\`\`
Part 1  HTTP/REST + assertions + Postman→code   ← you are here
Part 2  Auth · negatives · contract/schema
Part 3  SQL-for-testers · seed/teardown · API↔DB
\`\`\`

Prereq: JE Part 1–2 comfort (\`fetch\`, async/await). Companion mock: \`npm run mock-api\` → http://127.0.0.1:4040

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

> 🚩 **Why it matters:** asserting only \`200\` hides half the truth — method + status encode the story.

\`\`\`javascript
const res = await fetch("http://127.0.0.1:4040/products");
console.log(res.status); // 200
const body = await res.json();
console.log(body.count); // 3
\`\`\`

**Golden rules:** (1) assert status first, (2) prefer specific codes (201 on create), (3) unexpected 5xx = product bug.

### 🧪 Quiz
**Q:** POST create succeeds — which status is most precise?  
**A:** **201 Created** (legacy APIs sometimes return 200 — document the contract).

---

## 3. REST resources & URLs

> 🚩 **Why it matters:** stable resource naming makes tests readable and reusable.

Good: \`GET /products\`, \`GET /products/1\`, \`POST /products\`, \`DELETE /products/1\`.  
Our mock list returns \`{ data, count }\`; item endpoints return one object.

---

## 4. Headers, query params, JSON bodies

> 🚩 **Why it matters:** most mysterious failures are missing \`Content-Type\` or wrong query types.

\`\`\`javascript
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
\`\`\`

---

## 5. Assertions

> 🚩 **Why it matters:** a green test that only checks "no throw" teaches nothing.

Minimum set: status → critical headers → shape (keys/types) → business fields.

\`\`\`javascript
function assert(cond, msg) { if (!cond) throw new Error(msg); }
const res = await fetch("http://127.0.0.1:4040/products/1");
assert(res.status === 200, "status");
const p = await res.json();
assert(p.id === 1 && typeof p.title === "string", "shape");
\`\`\`

Playwright: \`expect(response).toBeOK()\` then \`toMatchObject({ id: 1 })\`.

---

## 6. Postman → code

> 🚩 **Why it matters:** collections are great for exploration; code is what CI runs.

| Postman | Code |
|---------|------|
| Method + URL | \`fetch(url, { method })\` |
| Headers | \`headers: { ... }\` |
| Body raw JSON | \`JSON.stringify(obj)\` |
| \`pm.response.code\` | \`res.status\` |
| \`{{baseUrl}}\` | \`process.env.API_BASE\` |

\`\`\`javascript
// Playwright request fixture sketch
const res = await request.get("/products");
expect(res.status()).toBe(200);
\`\`\`

---

## 7. First green smoke test

> 🚩 **Why it matters:** one reliable smoke unlocks API checks in every PR.

\`\`\`bash
npm run mock-api   # terminal 1
npm run lab:part1  # terminal 2
\`\`\`

Covers: \`/health\`, list, get one, missing → 404.

---

## 8. Common pitfalls

1. Asserting only 200 on create.  
2. Forgetting \`await res.json()\`.  
3. Hardcoding full URLs (break in CI).  
4. Parsing HTML error pages as JSON.  
5. Order-dependent tests without reset.  
6. Treating 401 as "API down".

### 🐞 Spot-the-Bug
\`\`\`javascript
const res = await fetch(base + "/products");
expect(res.status).toBe(201); // BUG: GET list → 200
\`\`\`
**Fix:** expect \`200\`.

---

## 9. Practice exercises

1. 🟢 \`GET /health\` → \`status === "ok"\`.  
2. 🟢 \`GET /products?minPrice=8\` → every price >= 8.  
3. 🟡 \`GET /products/9999\` → 404 + \`error === "not_found"\`.  
4. 🟡 Helper \`expectJson(res, status)\` checks status + content-type.  
5. 🔴 Translate Postman POST create into \`fetch\` + Bearer.

---

## 10. Challenges

1. \`statusOf(url)\` — GET status number.  
2. \`titles(base)\` — product titles array.  
3. \`assertProductShape(obj)\` — type checks.  
4. \`notFoundMessage(base, id)\` — error message.  
5. \`smoke(base)\` — health+list+one or throw.

---

## 11. Answer key

- Ex1–3: see \`labs/part1/smoke.mjs\` patterns.  
- Ex4: check \`res.headers.get("content-type")\` includes \`json\`.  
- Ex5: POST + Authorization → expect 201.  
- Challenges: pure helpers around \`fetch\` + \`assert\`.

### 📅 7-day plan
D1 §§1–2 · D2 §3 · D3 §4 · D4 §5 · D5 §§6–7 lab · D6 pitfalls · D7 challenges

🎉 **Part 1 complete** → Part 2 (Auth & Contracts).

<!--P1-END-->
`;

const p1inter = `# API & Data Essentials — Part 1 (HTTP & REST Foundations)

<div class="interactive-note">💡 <strong>Interactive edition:</strong> quizzes, predict cards, Spot-the-Bug. Best in VS Code (<code>Ctrl+Shift+V</code>). Study app adds live mock + progress + certificate.</div>

${nav(1, "interactive")}
${style}

### 🗺 Path: **Part 1** → Part 2 Auth → Part 3 SQL

## 1. Why API testing
> 🚩 **Why it matters:** catch contract bugs without a browser.

${quizBox("Pyramid check", [
  { q: "Fastest feedback for a wrong JSON field?", a: "API/service test", why: "No browser; assert JSON directly." },
  { q: 'Best for "button must be keyboard reachable"?', a: "UI E2E / a11y", why: "Needs the real page." },
])}
${mood(1)}

## 2. HTTP methods & status codes
> 🚩 **Why it matters:** status codes are the first assertion.

\`\`\`javascript
const res = await fetch("http://127.0.0.1:4040/health");
console.log(res.status); // 200
\`\`\`

${predict([
  { q: "GET /products → status?", a: "200" },
  { q: "GET /products/9999 → status?", a: "404" },
  { q: "POST /products (valid+auth) → status?", a: "201" },
])}

## 3. REST resources & URLs
> 🚩 **Why it matters:** readable paths → readable tests.

${quizBox("REST", [{ q: "Prefer /products/1 or /getProduct?id=1?", a: "/products/1", why: "Resource + id is conventional." }])}

## 4. Headers, query, JSON
> 🚩 **Why it matters:** missing Content-Type breaks servers.

Always send \`Content-Type: application/json\` for JSON bodies; put tokens in \`Authorization\`.

## 5. Assertions
> 🚩 **Why it matters:** status + shape + business field.

<details class="flashcard"><summary>🃏 Flash: Minimum assert set?</summary><div>Status → headers → shape → business fields</div></details>

## 6. Postman → code
> 🚩 **Why it matters:** CI cannot click Postman.

Map URL/method/headers/body/tests → \`fetch\` / Playwright \`request\` + asserts. Env var for base URL.

## 7. First green smoke
\`\`\`bash
npm run mock-api && npm run lab:part1
\`\`\`

## 8. Pitfalls + Spot-the-Bug
${spotbug([
  { title: "Wrong status on GET list", code: "expect(res.status).toBe(201);", fix: "Use 200 for GET collection." },
  { title: "Never read body", code: "await fetch(url);", fix: "const body = await res.json(); then assert." },
  { title: "401 misread", code: "// treat 401 as server down", fix: "401 = missing/invalid auth." },
])}

${studyPlan(["§§1–2", "§3", "§4", "§5", "§§6–7 lab", "Pitfalls + Spot-the-Bug", "Challenges + certificate in study app"])}

## Practice & Challenges
See plain edition; auto-graded runner in **study app**.

<div class="footer">Part 1 · API & Data Essentials</div>

<!--P1I-END-->
`;

// ---- Part 2 ----
const p2plain = `# API & Data Essentials — Part 2 (Auth & Contracts)

Auth for API tests, **negative testing**, and lightweight **contract/schema smoke**.

> 💡 Plain edition — open answers. Interactive + study app for clickable quizzes and auth mock.

---

### 🗺 Your path

\`\`\`
Part 1  HTTP/REST ✅
Part 2  Auth · negatives · schema   ← you are here
Part 3  SQL · seed/teardown · API↔DB
\`\`\`

Demo login: \`tester@demo.test\` / \`pass123\` → Bearer \`demo-token-abc123\`. API key: \`lab-key-42\` (tester; cannot DELETE).

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
| Bearer JWT/opaque | \`Authorization: Bearer <token>\` | Login first or use fixture token |
| API key | \`X-API-Key: …\` or query | Often lower privilege |
| Basic | \`Authorization: Basic base64(user:pass)\` | Rare in modern APIs |
| Cookie session | \`Cookie: sid=…\` | Pair with UI login / storageState |

Our mock: Bearer admin token can DELETE; API key is tester → **403** on DELETE.

---

## 2. Login → token flow

> 🚩 **Why it matters:** tests must obtain tokens the same way clients do (or via a trusted test hook).

\`\`\`javascript
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
    Authorization: \`Bearer \${access_token}\`,
  },
  body: JSON.stringify({ title: "Auth Widget", price: 2, stock: 1 }),
});
console.log(create.status); // 201
\`\`\`

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

\`\`\`bash
npm run mock-api
npm run lab:part2
\`\`\`

---

## 5. Contract & JSON Schema smoke

> 🚩 **Why it matters:** status 200 with wrong types still breaks clients.

Lightweight smoke (not full Pact):

\`\`\`javascript
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
\`\`\`

Fetch schema from \`GET /_schema/product\` and check create responses.

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
\`\`\`javascript
// expects 401 but sends API key on admin delete
await fetch(url, { method: "DELETE", headers: { "X-API-Key": "lab-key-42" } });
expect(status).toBe(401); // BUG: should be 403
\`\`\`

---

## 8. Practice exercises

1. 🟢 Bad password → 401.  
2. 🟢 POST product without auth → 401.  
3. 🟡 Create with Bearer → 201 + schema smoke.  
4. 🟡 Invalid body → 422.  
5. 🔴 DELETE with API key → 403; with Bearer → 200.

---

## 9. Challenges

1. \`login(base, email, password)\` → token or throw.  
2. \`authHeaders(token)\` → headers object.  
3. \`expectStatus(res, code)\`.  
4. \`schemaSmoke(obj, schema)\` boolean.  
5. \`negativeMatrix(base)\` runs 401/403/422 checks; returns \`'pass'\`.

---

## 10. Answer key

See \`labs/part2/auth-negatives.mjs\`. Spot-bug fix: expect **403**.

### 📅 7-day plan
D1 auth types · D2 login flow · D3 negatives · D4 matrix lab · D5 schema · D6 pitfalls · D7 challenges

🎉 **Part 2 complete** → Part 3 (SQL & data).

<!--P2-END-->
`;

const p2inter = `# API & Data Essentials — Part 2 (Auth & Contracts)

<div class="interactive-note">💡 Interactive edition — auth quizzes, negative predicts, Spot-the-Bug. Study app has live auth mock.</div>

${nav(2, "interactive")}
${style}

## 1. Auth types
> 🚩 **Why it matters:** wrong header = endless 401s.

${quizBox("Auth", [
  { q: "Bearer token goes in which header?", a: "Authorization: Bearer <token>" },
  { q: "401 vs 403?", a: "401 = not authenticated; 403 = authenticated but not allowed", why: "Role/permission vs missing identity." },
])}
${mood(2)}

## 2. Login → token
> 🚩 **Why it matters:** tests need a repeatable way to get credentials.

\`\`\`javascript
const { access_token } = await (await fetch(base+"/auth/login", {
  method:"POST", headers:{"Content-Type":"application/json"},
  body: JSON.stringify({email:"tester@demo.test", password:"pass123"})
})).json();
\`\`\`

## 3–4. Negatives & status matrix
${predict([
  { q: "POST /products no auth → ?", a: "401" },
  { q: "DELETE with X-API-Key lab-key-42 → ?", a: "403" },
  { q: "POST {title:'', price:-1} with auth → ?", a: "422" },
])}

## 5. Schema smoke
> 🚩 **Why it matters:** 201 with string price still breaks clients.

<details class="flashcard"><summary>🃏 Flash: What is schema smoke?</summary><div>Quick required-keys + type checks — not full contract testing.</div></details>

## 6–7. Retries & pitfalls
${spotbug([
  { title: "Wrong expected on role deny", code: "expect(status).toBe(401); // API key delete", fix: "Expect 403 for authenticated-but-forbidden." },
  { title: "Token in URL", code: "GET /products?token=abc", fix: "Use Authorization header." },
])}

\`\`\`bash
npm run lab:part2
\`\`\`

${studyPlan(["Auth types", "Login flow", "Negatives", "Matrix + lab", "Schema smoke", "Pitfalls", "Challenges"])}

<div class="footer">Part 2 · API & Data Essentials</div>

<!--P2I-END-->
`;

// ---- Part 3 ----
const p3plain = `# API & Data Essentials — Part 3 (Data & SQL for Testers)

**SQL basics for testers**, seed/teardown, test-data strategies, and **API ↔ DB** checks.

> 💡 We teach real SQL syntax. The mock API's \`GET /_db/snapshot\` stands in for a SQL client so labs run with zero DB install.

---

### 🗺 Your path

\`\`\`
Part 1  HTTP/REST ✅
Part 2  Auth & contracts ✅
Part 3  SQL · data · API↔DB   ← you are here
\`\`\`

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

\`\`\`sql
SELECT id, title, price
FROM products
WHERE price >= 5
ORDER BY price DESC
LIMIT 10;
\`\`\`

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

\`\`\`sql
SELECT o.id AS order_id, u.email, p.title, o.qty, o.status
FROM orders o
JOIN users u ON u.id = o.user_id
JOIN products p ON p.id = o.product_id
WHERE o.status = 'paid';
\`\`\`

**INNER JOIN** = only matching rows. Know it exists vs LEFT JOIN (keep left rows even if right missing).

---

## 4. Seed & teardown

> 🚩 **Why it matters:** dirty data is the #1 source of API flakes.

Patterns:

1. **Reset** known fixtures before suite (\`POST /_db/reset\` in our mock).  
2. **Create unique rows** per test (\`title: "t-" + Date.now()\`).  
3. **Delete what you created** in \`afterEach\` / \`finally\`.  
4. Prefer **transaction rollback** in real apps when available.

\`\`\`javascript
await fetch(base + "/_db/reset", { method: "POST" });
// ... test ...
await fetch(base + "/_db/reset", { method: "POST" });
\`\`\`

---

## 5. Test data strategies

> 🚩 **Why it matters:** shared "testuser1" across parallel jobs = chaos.

| Strategy | When |
|----------|------|
| Static fixtures | Tiny read-only smoke |
| Factories (\`buildProduct()\`) | Many variants |
| Per-test unique keys | Parallel CI |
| Isolated schemas/DBs | Large teams |

Never rely on row **order** without \`ORDER BY\`.

---

## 6. API ↔ DB verification

> 🚩 **Why it matters:** this is the killer skill — prove the API and DB agree.

Pattern:

1. Seed baseline.  
2. Call API (POST/PATCH).  
3. SELECT (or snapshot) the row.  
4. Assert fields match.  
5. Teardown.

\`\`\`bash
npm run mock-api
npm run lab:part3
\`\`\`

Lab compares \`GET /orders\` to \`/_db/snapshot\` tables and checks a JOIN view.

---

## 7. Common pitfalls

1. Asserting API only — never checking DB.  
2. Using \`SELECT *\` and coupling tests to extra columns.  
3. Forgetting teardown → cross-test pollution.  
4. Comparing floats without tolerance.  
5. Running destructive SQL on shared staging without a sandbox.

### 🐞 Spot-the-Bug
\`\`\`javascript
const api = await getOrders();
const db = await snapshot();
expect(api.data.length).toBe(db.tables.products.length); // BUG: wrong table
\`\`\`
**Fix:** compare to \`db.tables.orders\`.

---

## 8. Practice exercises

1. 🟢 Write SELECT of products with \`stock = 0\`.  
2. 🟢 WHERE + ORDER BY price ascending.  
3. 🟡 JOIN orders→users emails.  
4. 🟡 Seed via API create, confirm id in snapshot.  
5. 🔴 Design teardown that resets even if the test throws.

---

## 9. Challenges

1. \`paidOrders(snapshot)\` — filter paid.  
2. \`joinOrders(snapshot)\` — array of \`{order_id, email, product}\`.  
3. \`assertApiMatchesDb(apiOrders, dbOrders)\`.  
4. \`withReset(base, fn)\` — reset, run fn, reset again.  
5. \`stockOutTitles(snapshot)\` — titles where stock === 0.

---

## 10. Answer key

- Ex1: \`SELECT title FROM products WHERE stock = 0;\`  
- Ex3: JOIN on \`user_id\`.  
- Ex5: \`try { await fn() } finally { await reset() }\`.  
- Challenges: see \`labs/part3/api-db-check.mjs\`.

### 📅 7-day plan
D1 why SQL · D2 SELECT · D3 JOIN · D4 seed/teardown · D5 strategies · D6 API↔DB lab · D7 challenges

🎉 **Series complete** — you can honestly claim API + SQL-for-testers basics on the Automation Tester Path.

<!--P3-END-->
`;

const p3inter = `# API & Data Essentials — Part 3 (Data & SQL for Testers)

<div class="interactive-note">💡 Interactive edition — SQL drills, JOIN predicts, Spot-the-Bug. Study app includes in-memory SQL playground.</div>

${nav(3, "interactive")}
${style}

## 1. Why testers need SQL
> 🚩 **Why it matters:** API responses can drift from stored state.

${quizBox("Why SQL", [
  { q: "Name one assert that needs the DB.", a: "POST created a row / soft-delete flag / report JOIN totals" },
])}
${mood(3)}

## 2. SELECT basics
> 🚩 **Why it matters:** every data check starts here.

\`\`\`sql
SELECT id, title FROM products WHERE price >= 5 ORDER BY price DESC LIMIT 10;
\`\`\`

${predict([
  { q: "Which clause filters rows?", a: "WHERE" },
  { q: "Which clause caps rows for a fast test?", a: "LIMIT" },
])}

## 3. JOIN
> 🚩 **Why it matters:** orders need user + product context.

<details class="flashcard"><summary>🃏 Flash: INNER JOIN?</summary><div>Returns rows only when both sides match on the ON condition.</div></details>

## 4–5. Seed / teardown / strategies
Unique per-test data + reset fixtures. Avoid shared mutable users in parallel CI.

## 6. API ↔ DB
\`\`\`bash
npm run lab:part3
\`\`\`

## 7. Spot-the-Bug
${spotbug([
  { title: "Compare wrong table", code: "expect(apiOrders.length).toBe(db.products.length)", fix: "Compare to db.orders." },
  { title: "No teardown", code: "await create(); await assert(); // end", fix: "finally { await reset(); }" },
])}

${studyPlan(["Why SQL", "SELECT", "JOIN", "Seed/teardown", "Strategies", "API↔DB lab", "Challenges + certificate"])}

<div class="footer">Part 3 · API & Data Essentials</div>

<!--P3I-END-->
`;

fs.writeFileSync(path.join(root, "Api_data_essentials_part1_with_examples.md"), p1plain);
fs.writeFileSync(path.join(root, "Api_data_essentials_part1_interactive.md"), p1inter);
fs.writeFileSync(path.join(root, "Api_data_essentials_part2_with_examples.md"), p2plain);
fs.writeFileSync(path.join(root, "Api_data_essentials_part2_interactive.md"), p2inter);
fs.writeFileSync(path.join(root, "Api_data_essentials_part3_with_examples.md"), p3plain);
fs.writeFileSync(path.join(root, "Api_data_essentials_part3_interactive.md"), p3inter);

// Context docs
for (const [n, title, files] of [
  [1, "HTTP & REST Foundations", "11 sections; labs/part1/smoke.mjs"],
  [2, "Auth & Contracts", "10 sections; labs/part2/auth-negatives.mjs"],
  [3, "Data & SQL for Testers", "10 sections; labs/part3/api-db-check.mjs"],
]) {
  fs.writeFileSync(
    path.join(root, `API_DATA_ESSENTIALS_PART${n}_CONTEXT.md`),
    `# API & Data Essentials — Part ${n} (Context / Transfer Doc)

## Summary
**Part ${n} — ${title}** in three editions (plain MD, interactive MD, study app) plus PART${n}_PLAN.md.

## Files
| File | Purpose |
|---|---|
| \`Api_data_essentials_part${n}_with_examples.md\` | Plain / print |
| \`Api_data_essentials_part${n}_interactive.md\` | Quizzes / predict / Spot-the-Bug |
| \`Api_data_essentials_part${n}_study_app.html\` | Offline study app |
| \`PART${n}_PLAN.md\` | Plan |

## Coverage
${files}

## Conventions
Same as JE: why-it-matters, quizzes, pitfalls → practice → challenges → answer key. Sentinels \`<!--P${n}-END-->\` / \`<!--P${n}I-END-->\` / \`<!--P${n}H-END-->\`.

## Verify
\`npm run mock-api\` then \`npm run lab:part${n}\`. Open study app — theme, Mark Complete, mock panel, certificate at 100%.

---
*Part ${n} context — API & Data Essentials*
`
  );
}

console.log("Markdown + context written");
