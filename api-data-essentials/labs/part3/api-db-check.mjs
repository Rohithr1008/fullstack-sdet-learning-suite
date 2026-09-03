/**
 * Part 3 lab — API ↔ "DB" consistency check + seed/teardown via reset.
 * Run: npm run mock-api && npm run lab:part3
 *
 * Teaching note: /_db/snapshot stands in for a real SQL client.
 * In production you'd SELECT from Postgres/MySQL and compare to API JSON.
 */
const BASE = process.env.API_BASE || "http://127.0.0.1:4040";

function assert(cond, msg) {
  if (!cond) throw new Error(msg);
}

// Teardown / seed baseline
const reset = await fetch(`${BASE}/_db/reset`, { method: "POST" });
assert(reset.status === 200, "reset failed");

const apiOrders = await (await fetch(`${BASE}/orders`)).json();
const snap = await (await fetch(`${BASE}/_db/snapshot`)).json();

assert(apiOrders.count === snap.tables.orders.length, "API order count ≠ DB orders");
for (const row of apiOrders.data) {
  const db = snap.tables.orders.find((o) => o.id === row.id);
  assert(db, `order ${row.id} in API but not DB`);
  assert(db.status === row.status, `order ${row.id} status drift`);
  assert(db.product_id === row.product_id, `order ${row.id} product_id drift`);
}

// Simulate "JOIN": order → product title via DB tables
const joined = snap.tables.orders.map((o) => {
  const p = snap.tables.products.find((x) => x.id === o.product_id);
  const u = snap.tables.users.find((x) => x.id === o.user_id);
  return {
    order_id: o.id,
    email: u?.email,
    product: p?.title,
    qty: o.qty,
    status: o.status,
  };
});
assert(joined.length >= 2, "expected seeded joins");
assert(joined.every((j) => j.email && j.product), "JOIN missing user or product");

// API create then DB sees it
const login = await (
  await fetch(`${BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "tester@demo.test", password: "pass123" }),
  })
).json();

const created = await (
  await fetch(`${BASE}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${login.access_token}`,
    },
    body: JSON.stringify({ title: "Seed Probe", price: 1, stock: 1 }),
  })
).json();

const after = await (await fetch(`${BASE}/_db/snapshot`)).json();
assert(
  after.tables.products.some((p) => p.id === created.id),
  "API create not visible in DB snapshot"
);

// Teardown
await fetch(`${BASE}/_db/reset`, { method: "POST" });
console.log("✅ Part 3 API↔DB check passed");
console.log("Sample JOIN view:", joined[0]);
