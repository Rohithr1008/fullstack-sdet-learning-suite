#!/usr/bin/env node
/**
 * Tiny in-memory mock API for API & Data Essentials labs.
 * Zero deps — Node 18+ only. Start: npm run mock-api
 * Base URL: http://127.0.0.1:4040
 */
"use strict";

const http = require("http");
const { URL } = require("url");

const PORT = Number(process.env.PORT) || 4040;
const TOKEN = "demo-token-abc123";

/** @type {{id:number,title:string,price:number,stock:number}[]} */
let products = [
  { id: 1, title: "Notebook", price: 4.5, stock: 20 },
  { id: 2, title: "Pen Set", price: 9.99, stock: 50 },
  { id: 3, title: "USB Cable", price: 7.25, stock: 0 },
];

/** @type {{id:number,email:string,role:string}[]} */
let users = [
  { id: 1, email: "admin@demo.test", role: "admin" },
  { id: 2, email: "tester@demo.test", role: "tester" },
];

/** Fake "DB rows" for Part 3 API↔DB demos (mirrors products + orders). */
let orders = [
  { id: 101, user_id: 2, product_id: 1, qty: 2, status: "paid" },
  { id: 102, user_id: 2, product_id: 2, qty: 1, status: "pending" },
];

function send(res, status, body, extraHeaders = {}) {
  const payload = typeof body === "string" ? body : JSON.stringify(body, null, 2);
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, X-API-Key",
    "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,DELETE,OPTIONS",
    ...extraHeaders,
  });
  res.end(payload);
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (c) => chunks.push(c));
    req.on("end", () => {
      const raw = Buffer.concat(chunks).toString("utf8");
      if (!raw) return resolve(null);
      try {
        resolve(JSON.parse(raw));
      } catch (e) {
        reject(new Error("Invalid JSON body"));
      }
    });
    req.on("error", reject);
  });
}

function auth(req) {
  const h = req.headers.authorization || "";
  if (h === `Bearer ${TOKEN}`) return { ok: true, role: "admin" };
  const key = req.headers["x-api-key"];
  if (key === "lab-key-42") return { ok: true, role: "tester" };
  return { ok: false };
}

function productSchemaOk(obj) {
  if (!obj || typeof obj !== "object") return false;
  if (typeof obj.title !== "string" || !obj.title.trim()) return false;
  if (typeof obj.price !== "number" || Number.isNaN(obj.price) || obj.price < 0) return false;
  if (obj.stock != null && (typeof obj.stock !== "number" || obj.stock < 0)) return false;
  return true;
}

const server = http.createServer(async (req, res) => {
  if (req.method === "OPTIONS") return send(res, 204, "");

  const u = new URL(req.url || "/", `http://127.0.0.1:${PORT}`);
  const path = u.pathname.replace(/\/+$/, "") || "/";

  try {
    // Health
    if (req.method === "GET" && path === "/health") {
      return send(res, 200, { status: "ok", service: "api-data-mock", ts: Date.now() });
    }

    // Login → token (demo only)
    if (req.method === "POST" && path === "/auth/login") {
      const body = await readBody(req);
      if (body && body.email === "tester@demo.test" && body.password === "pass123") {
        return send(res, 200, { access_token: TOKEN, token_type: "Bearer", expires_in: 3600 });
      }
      return send(res, 401, { error: "invalid_credentials", message: "Bad email or password" });
    }

    // Products collection
    if (req.method === "GET" && path === "/products") {
      const minPrice = u.searchParams.get("minPrice");
      let list = products.slice();
      if (minPrice != null) list = list.filter((p) => p.price >= Number(minPrice));
      return send(res, 200, { data: list, count: list.length });
    }

    if (req.method === "POST" && path === "/products") {
      const a = auth(req);
      if (!a.ok) return send(res, 401, { error: "unauthorized", message: "Bearer token or X-API-Key required" });
      const body = await readBody(req);
      if (!productSchemaOk(body)) {
        return send(res, 422, {
          error: "validation_error",
          message: "title (string) and price (number >= 0) required",
        });
      }
      const id = products.reduce((m, p) => Math.max(m, p.id), 0) + 1;
      const row = { id, title: body.title.trim(), price: body.price, stock: body.stock ?? 0 };
      products.push(row);
      return send(res, 201, row, { Location: `/products/${id}` });
    }

    const prodMatch = path.match(/^\/products\/(\d+)$/);
    if (prodMatch) {
      const id = Number(prodMatch[1]);
      const idx = products.findIndex((p) => p.id === id);
      if (req.method === "GET") {
        if (idx < 0) return send(res, 404, { error: "not_found", message: `Product ${id} missing` });
        return send(res, 200, products[idx]);
      }
      if (req.method === "PUT" || req.method === "PATCH") {
        const a = auth(req);
        if (!a.ok) return send(res, 401, { error: "unauthorized" });
        if (idx < 0) return send(res, 404, { error: "not_found" });
        const body = await readBody(req);
        const next = { ...products[idx], ...body, id };
        if (!productSchemaOk(next)) return send(res, 422, { error: "validation_error" });
        products[idx] = next;
        return send(res, 200, next);
      }
      if (req.method === "DELETE") {
        const a = auth(req);
        if (!a.ok) return send(res, 401, { error: "unauthorized" });
        if (a.role !== "admin") return send(res, 403, { error: "forbidden", message: "Admin only" });
        if (idx < 0) return send(res, 404, { error: "not_found" });
        const [gone] = products.splice(idx, 1);
        return send(res, 200, { deleted: true, id: gone.id });
      }
    }

    // Users (read-only list for DB-style checks)
    if (req.method === "GET" && path === "/users") {
      const a = auth(req);
      if (!a.ok) return send(res, 401, { error: "unauthorized" });
      return send(res, 200, { data: users });
    }

    // Orders — API view of "DB"
    if (req.method === "GET" && path === "/orders") {
      return send(res, 200, { data: orders, count: orders.length });
    }

    // Internal DB snapshot for Part 3 labs (not a real production pattern — teaching aid)
    if (req.method === "GET" && path === "/_db/snapshot") {
      return send(res, 200, {
        tables: {
          products: products.slice(),
          users: users.slice(),
          orders: orders.slice(),
        },
      });
    }

    // Reset demo data
    if (req.method === "POST" && path === "/_db/reset") {
      products = [
        { id: 1, title: "Notebook", price: 4.5, stock: 20 },
        { id: 2, title: "Pen Set", price: 9.99, stock: 50 },
        { id: 3, title: "USB Cable", price: 7.25, stock: 0 },
      ];
      orders = [
        { id: 101, user_id: 2, product_id: 1, qty: 2, status: "paid" },
        { id: 102, user_id: 2, product_id: 2, qty: 1, status: "pending" },
      ];
      return send(res, 200, { reset: true });
    }

    // Contract example: OpenAPI-ish shape description
    if (req.method === "GET" && path === "/_schema/product") {
      return send(res, 200, {
        $id: "Product",
        type: "object",
        required: ["id", "title", "price", "stock"],
        properties: {
          id: { type: "integer" },
          title: { type: "string", minLength: 1 },
          price: { type: "number", minimum: 0 },
          stock: { type: "integer", minimum: 0 },
        },
      });
    }

    return send(res, 404, { error: "not_found", path });
  } catch (e) {
    return send(res, 400, { error: "bad_request", message: e.message || String(e) });
  }
});

server.listen(PORT, "127.0.0.1", () => {
  console.log(`API & Data mock listening on http://127.0.0.1:${PORT}`);
  console.log("Try: GET /health  GET /products  POST /auth/login");
});
