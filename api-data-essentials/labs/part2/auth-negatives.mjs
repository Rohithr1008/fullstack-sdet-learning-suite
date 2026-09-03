/**
 * Part 2 lab — auth + negative + tiny schema smoke.
 * Run: npm run mock-api && npm run lab:part2
 */
const BASE = process.env.API_BASE || "http://127.0.0.1:4040";

function assert(cond, msg) {
  if (!cond) throw new Error(msg);
}

function shapeOk(obj, schema) {
  for (const key of schema.required || []) {
    if (!(key in obj)) return false;
  }
  for (const [k, rule] of Object.entries(schema.properties || {})) {
    if (!(k in obj)) continue;
    const v = obj[k];
    if (rule.type === "string" && typeof v !== "string") return false;
    if (rule.type === "number" && typeof v !== "number") return false;
    if (rule.type === "integer" && !Number.isInteger(v)) return false;
  }
  return true;
}

// Login happy path
const login = await fetch(`${BASE}/auth/login`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email: "tester@demo.test", password: "pass123" }),
});
assert(login.status === 200, `login expected 200, got ${login.status}`);
const { access_token } = await login.json();
assert(typeof access_token === "string" && access_token.length > 0, "token missing");

// Bad login → 401
const badLogin = await fetch(`${BASE}/auth/login`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email: "tester@demo.test", password: "nope" }),
});
assert(badLogin.status === 401, "bad login should 401");

// Create without auth → 401
const noAuth = await fetch(`${BASE}/products`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ title: "X", price: 1 }),
});
assert(noAuth.status === 401, "POST without auth should 401");

// Create with auth — happy
const created = await fetch(`${BASE}/products`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${access_token}`,
  },
  body: JSON.stringify({ title: "Lab Widget", price: 3.5, stock: 2 }),
});
assert(created.status === 201, `create expected 201, got ${created.status}`);
const row = await created.json();

// Schema smoke
const schemaRes = await fetch(`${BASE}/_schema/product`);
const schema = await schemaRes.json();
assert(shapeOk(row, schema), "created product failed schema smoke");

// Validation negative → 422
const badBody = await fetch(`${BASE}/products`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${access_token}`,
  },
  body: JSON.stringify({ title: "", price: -1 }),
});
assert(badBody.status === 422, "invalid body should 422");

// Forbidden delete with API key (tester role)
const deny = await fetch(`${BASE}/products/${row.id}`, {
  method: "DELETE",
  headers: { "X-API-Key": "lab-key-42" },
});
assert(deny.status === 403, "tester delete should 403");

console.log("✅ Part 2 auth/negatives/schema smoke passed");
