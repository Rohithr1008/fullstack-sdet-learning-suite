/**
 * Part 1 lab — first green API smoke (Node 18+ fetch).
 * Run: npm run mock-api   (other terminal)
 *      npm run lab:part1
 */
const BASE = process.env.API_BASE || "http://127.0.0.1:4040";

function assert(cond, msg) {
  if (!cond) throw new Error(msg);
}

const health = await fetch(`${BASE}/health`);
assert(health.status === 200, `health expected 200, got ${health.status}`);
const healthBody = await health.json();
assert(healthBody.status === "ok", "health.status should be ok");

const list = await fetch(`${BASE}/products`);
assert(list.status === 200, `products expected 200, got ${list.status}`);
const listBody = await list.json();
assert(Array.isArray(listBody.data), "products.data should be an array");
assert(listBody.count === listBody.data.length, "count should match data.length");

const one = await fetch(`${BASE}/products/1`);
assert(one.status === 200, "GET /products/1 should 200");
const product = await one.json();
assert(product.id === 1, "product.id should be 1");
assert(typeof product.title === "string", "product.title should be string");

const missing = await fetch(`${BASE}/products/9999`);
assert(missing.status === 404, "missing product should 404");

console.log("✅ Part 1 smoke passed");
