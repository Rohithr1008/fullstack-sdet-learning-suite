# JavaScript Essentials — Part 5 (Production: Auth + Deployment)

Extend **Part 4** from "works on my laptop" to the real world: **user accounts** (authentication) and **putting your app on the internet** (deployment). Written for a complete beginner; builds directly on the MERN foundation from [Part 4](Javascript_essentials_part4_with_examples.md).

> 💡 **Study guide (plain edition):** quizzes are plain Q&A, examples are numbered steps, every answer shown openly — no HTML/CSS. For clickable activity see the interactive edition (`Javascript_essentials_part5_interactive.md`) or the standalone app (`Javascript_essentials_part5_study_app.html`).

---

### 🗺 Your path — where Part 5 fits

```
Part 4  Build MERN apps  →  Part 5  Production (auth + deployment)  →  (beyond: scale, CI/CD, teams)
```
You are here: **Part 5 — the shipping step.** Everything up to here runs on *your* machine; now you make real, secure accounts and put the app where everyone can use it.

**What you'll be able to do by the end:**
1. Explain hacking vs auth, and why hashing passwords matters.
2. Build a register → login → protected-route flow with JWT.
3. Deploy the backend, frontend, and database, with secrets kept safe.

---

## Table of Contents

1. [The production layer](#1-the-production-layer)
2. [Authentication vs Authorization](#2-authentication-vs-authorization)
3. [Passwords done right — hashing with bcrypt](#3-passwords-done-right--hashing-with-bcrypt)
4. [JWT — the three parts](#4-jwt--the-three-parts)
5. [Register a user (backend)](#5-register-a-user-backend)
6. [Login &amp; issuing a token](#6-login--issuing-a-token)
7. [Protecting routes with middleware](#7-protecting-routes-with-middleware)
8. [Using the token in React](#8-using-the-token-in-react)
9. [The full auth module](#9-the-full-auth-module)
10. [Deployment — what it actually means](#10-deployment--what-it-actually-means)
11. [Hosting the backend + env vars + Atlas](#11-hosting-the-backend--env-vars--atlas)
12. [Hosting the frontend](#12-hosting-the-frontend)
13. [Testing basics](#13-testing-basics)
14. [Routing libraries (React Router)](#14-routing-libraries-react-router)
15. [Common production pitfalls](#15-common-production-pitfalls)
16. [Practice &amp; auto-graded challenges](#16-practice--auto-graded-challenges)
17. [Answer key](#17-answer-key)

---
---

## 1. The production layer

> 🚩 **Why it matters:** "works on my laptop" ≠ "ready for real users." Production means accounts + security + putting it online.

| | local (your machine) | production (the internet) |
|---|---|---|
| URL | `localhost:3000` | `myapp.onrender.com` |
| Who can use it | only you | anyone |
| Data safety | fine for learning | must be secure (hashing, tokens) |

**Two big additions on top of Part 4:**
1. **Authentication** — real user accounts (register / login).
2. **Deployment** — host each piece (backend, frontend, database) so it's always online.

### 🧪 Quiz
1. What does "production" mean? → Your app running on a real server on the internet for anyone to use.
2. What two things does production add? → Authentication (accounts) and Deployment (hosting).

---

## 2. Authentication vs Authorization

> 🚩 **Why it matters:** two words, two jobs — mixing them up causes bugs.

```
AUTHENTICATION  = WHO are you?    (login / register)   → proves identity
AUTHORIZATION   = WHAT may you do? (permissions)        → allows actions
```
**Analogy:** showing your ID at the hotel desk = *authentication*. Getting a key card that opens *only your room* = *authorization*.

### 🧪 Quiz
1. "Log in with your email & password" → Authentication
2. "You may only edit YOUR OWN notes" → Authorization
3. "Show your passport to prove who you are" → Authentication

---

## 3. Passwords done right — hashing with bcrypt

> 🚩 **Why it matters:** storing plain-text passwords is a disaster. Hashing scrambles them one-way so a leak doesn't expose them.

```javascript
// ❌ NEVER store the raw password
user.password = req.body.password;

// ✅ Store a HASH (one-way; can't be unscrambled)
const bcrypt = require("bcrypt");
const hash = await bcrypt.hash(req.body.password, 10);   // 10 = "salt rounds" (slow = safer)
user.password = hash;

// To CHECK a login, compare in one safe step
const ok = await bcrypt.compare(typedPassword, savedHash);
if (!ok) return res.status(401).json({ error: "Wrong password" });
```
**Why "slow on purpose"?** bcrypt is deliberately slow (~50–100ms) so an attacker can't brute-force thousands of attempts fast.

### 🧪 Quiz
1. Why not store plain text? → If the DB leaks, real passwords are exposed.
2. Can you turn a hash back into the password? → No, it's one-way.
3. How do you check a password at login? → `bcrypt.compare(typed, savedHash)`.

---
---

## 4. JWT — the three parts

> 🚩 **Why it matters:** a JWT is the "ID badge" the server issues so it can trust the user WITHOUT re-checking the password every request.

```javascript
const token = jwt.sign({ userId: user._id, email: user.email }, SECRET, { expiresIn: "7d" });
// token looks like:  header.payload.signature
```
- **Header** — says "I'm a JWT" (`{ alg: "HS256", typ: "JWT" }`).
- **Payload** — safe claims like `userId` and `email` (NEVER the password).
- **Signature** — a cryptographic seal made from the server's secret. If anyone edits the token, the seal breaks → `jwt.verify` fails.

> 🧪 **Try it:** in the study app, after login the token appears as 3 coloured chips (🟣 header · 🟢 payload · 🩷 signature).

### 🧪 Quiz
1. How many parts does a JWT have? → 3 (header, payload, signature).
2. Does the payload contain the password? → No, only safe claims.
3. What does the signature prove? → The token wasn't tampered with.

---

## 5. Register a user (backend)

> 🚩 **Why it matters:** signup must validate input, hash the password, and avoid duplicate emails.

```javascript
app.post("/api/auth/register", async (req, res) => {
  const { email, password } = req.body;
  if (await User.findOne({ email }))
    return res.status(400).json({ error: "Email already used" });
  if (!password || password.length < 6)
    return res.status(400).json({ error: "Password must be at least 6 chars" });

  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ email, password: hash });
  res.status(201).json({ message: "User created" });   // never return the hash
});
```

### 🧪 Quiz
1. What must register do to the password? → Hash it with bcrypt before saving.
2. What if the email already exists? → 400 "Email already used".
3. Should the response include the saved hash? → No — never return password/hash.

---

## 6. Login &amp; issuing a token

> 🚩 **Why it matters:** login checks the password, then mints a JWT for later requests.

```javascript
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ error: "Bad credentials" });
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({ error: "Bad credentials" });
  const token = jwt.sign({ userId: user._id, email: user.email }, SECRET, { expiresIn: "7d" });
  res.json({ token, user: { id: user._id, email: user.email } });
});
```

### 🧪 Quiz
1. What does the server return on success? → A JWT token (plus safe user info).
2. What status for a wrong email/password? → 401.
3. What goes in the payload? → user.id + email — never the password.

---
---

## 7. Protecting routes with middleware

> 🚩 **Why it matters:** middleware checks the token BEFORE the route runs, so private data stays private.

```javascript
function auth(req, res, next) {
  const header = req.headers.authorization;              // "Bearer <token>"
  if (!header || !header.startsWith("Bearer "))
    return res.status(401).json({ error: "No token" });
  const token = header.split(" ")[1];
  try {
    req.user = jwt.verify(token, SECRET);                // seal OK → user known
    next();                                               // carry on to the route
  } catch {
    res.status(401).json({ error: "Invalid or expired token" });
  }
}
app.get("/api/me", auth, async (req, res) => {
  res.json({ user: req.user });                          // only if token valid
});
```
Notice `auth` is passed *between* the route path and the handler — Express runs it first.

### 🧪 Quiz
1. What does the middleware do before the route runs? → Verifies the JWT in the Authorization header.
2. What if no/invalid token? → 401, without running the route.
3. How is a private route marked? → Add `auth` as middleware before the handler.

---

## 8. Using the token in React

> 🚩 **Why it matters:** the frontend stores the token (this guide uses `localStorage` for a simple first ship) and sends it in a header on every protected call.

```javascript
async function login(email, password) {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  localStorage.setItem("token", data.token);        // remember the badge (demo)
  setUser(data.user);
}
async function loadMe() {
  const token = localStorage.getItem("token");
  const res = await fetch("/api/me", {
    headers: { "Authorization": "Bearer " + token }, // send the badge
  });
  if (res.status === 401) { setUser(null); return; } // expired → log out
  setUser(await res.json());
}
```
> ⚠️ **Caveat:** XSS can steal tokens from `localStorage`. Production often prefers **httpOnly Secure cookies** (or a BFF). This guide uses `localStorage` for a simple first-ship demo.

**memory aid:** login → `localStorage.setItem("token", …)` (demo storage) → every protected call sends `Authorization: Bearer token`. Remember the XSS caveat above.

### 🧪 Quiz
1. Where does the frontend store the token in this guide's simple demo? → `localStorage` (common first-ship pattern; production often prefers httpOnly cookies).
2. What header carries it? → `Authorization: Bearer <token>`.
3. What if /api/me returns 401? → Log the user out (token expired).

---

## 9. The full auth module

> 🚩 **Why it matters:** the entire server-side auth (register + login + protected) in one place. The study app's 🔐 mock runs exactly this flow so you can SEE it.

```javascript
app.post("/api/auth/register", async (req,res)=>{ const {email,password}=req.body;
  if(await User.findOne({email})) return res.status(400).json({error:"email exists"});
  const user=await User.create({email, password:await bcrypt.hash(password,10)});
  res.status(201).json({message:"User created"}); });

app.post("/api/auth/login", async (req,res)=>{ const {email,password}=req.body;
  const u=await User.findOne({email}); if(!u) return res.status(401).json({error:"bad credentials"});
  const ok=await bcrypt.compare(password,u.password); if(!ok) return res.status(401).json({error:"bad credentials"});
  const token=jwt.sign({userId:u._id,email:u.email},SECRET,{expiresIn:"7d"});
  res.json({token,user:{id:u._id,email:u.email}}); });

app.get("/api/me", auth, (req,res)=>res.json({user:req.user}));   // auth middleware from §7
```

### 🧪 Quiz
1. What 5 steps is the whole auth flow? → register → hash → login → JWT → protected route with Bearer header.
2. What status for a protected route with NO token? → 401.

---

## 10. Deployment — what it actually means

> 🚩 **Why it matters:** your localhost app only works on your computer. Deployment puts it on the internet for everyone.

```
Deploying a MERN app = hosting 3 things:
  1. BACKEND (Express)   → Render / Railway / Fly.io
  2. FRONTEND (React)    → Vercel / Netlify
  3. DATABASE (MongoDB)  → MongoDB Atlas (cloud)
```
Each host gives your piece a public URL, and they talk over the internet. **Before:** `localhost:3000` (only you). **After:** `myapp.onrender.com` (anyone).

### 🧪 Quiz
1. What 3 pieces do you host? → Backend, Frontend, Database.
2. Where does the DB live in production? → MongoDB Atlas (cloud).

---

## 11. Hosting the backend + env vars + Atlas

> 🚩 **Why it matters:** the server needs a public home, plus secrets set as env variables — never hard-coded.

```bash
# .env  (DO NOT commit this file!)
PORT=3000
MONGODB_URI=mongodb+srv://user:pw@cluster.mongodb.net
JWT_SECRET=make-up-a-long-secret-string
```
```javascript
const PORT = process.env.PORT || 3000;
mongoose.connect(process.env.MONGODB_URI);
const SECRET = process.env.JWT_SECRET;
```
**Steps to host the backend on Render:** 1️⃣ push code to GitHub · 2️⃣ New → Web Service · 3️⃣ pick repo · 4️⃣ start command `node server/server.js` · 5️⃣ add the secrets in Render's "Environment" tab · 6️⃣ Deploy → get a public URL.

### 🧪 Quiz
1. Where do secrets live in production? → Environment variables (not in the code).
2. What two secrets do you usually need? → MONGODB_URI and JWT_SECRET.
3. Should .env be committed? → No — add it to .gitignore.
---

## 12. Hosting the frontend

> 🚩 **Why it matters:** the React screen needs a public URL, and its fetch calls must point at the hosted backend (plus CORS).

```javascript
// BAD (won't work after deploy)  |  GOOD
fetch("http://localhost:3000/api/notes");
fetch(import.meta.env.VITE_API_URL + "/api/notes");
// Vite .env →  VITE_API_URL=https://my-backend.onrender.com
```
**Steps:** 1️⃣ `npm run build` · 2️⃣ connect repo to Vercel/Netlify · 3️⃣ add `VITE_API_URL` env var · 4️⃣ deploy. Then update the **backend's CORS** to allow the new frontend URL.

### 🧪 Quiz
1. What must the frontend's fetch URLs use in production? → The hosted backend URL via an env var.
2. After moving the frontend, what must you update on the backend? → CORS.

---

## 13. Testing basics

> 🚩 **Why it matters:** a test is code that checks your code — it catches regressions before users do.

```javascript
// TOY ONLY — not bcrypt. Real apps: bcrypt.hash / bcrypt.compare
function toyHash(pw) { return "h$" + pw.length + "$" + pw.charCodeAt(0); }
test("toyHash never returns the plain password", () => {
  expect(toyHash("abc")).not.toBe("abc");
  expect(toyHash("abc")).toBe(toyHash("abc"));   // same input → same toy output
});
```
**Mental model:** write a small function that calls your real function and asserts the result. If something breaks later, the test turns red and tells you exactly where. The toy above only teaches invariants (not plain, deterministic) — never ship it as a real hash.

### 🧪 Quiz
1. What does a test do? → Asserts your code works, catching regressions.
2. When a test "goes red"? → Something broke — fix before shipping.

---

## 14. Routing libraries (React Router)

> 🚩 **Why it matters:** real apps have multiple pages (Home, Login, Profile). React Router maps URLs to components.

```jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// inside a component:
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
  </Routes>
</BrowserRouter>
```

### 🧪 Quiz
1. What does React Router do? → Maps URL paths to components/pages.
2. How do you protect a /profile page in React? → Redirect to /login if not authenticated (Navigate).

---

## 15. Common production pitfalls

> 🚩 **Why it matters:** the mistakes that break deployed apps and leak data.

```javascript
1. Storing plain-text passwords               ❌  →  always bcrypt.hash
2. Hard-coding the JWT secret / DB URL        ❌  →  use env vars
3. Committing .env to GitHub                  ❌  →  add to .gitignore (+ rotate leaked secrets)
4. Forgetting CORS on the deployed backend    ❌  →  allow your real frontend URL
5. Frontend still calls localhost after deploy ❌  →  use VITE_API_URL
6. Putting the password IN the JWT payload    ❌  →  only userId/email
```

### 🧪 Quiz
1. Deployed frontend can't reach the API? First check? → CORS on the backend + the API URL env var.
2. Your .env got pushed? → Add to .gitignore and rotate the leaked secrets.
3. Should the JWT payload contain the password? → Never.

---

## 16. Practice &amp; auto-graded challenges

> 🚩 **Why it matters:** low-stakes reps move knowledge from "saw it" to "build it." The study app grades these instantly — no install needed.

**✏️ Practice (answers in §17)**
- **E1.** Authentication proves *who* / *what*? (→ who you are)
- **E2.** Which `bcrypt` method hashes a password? (→ `bcrypt.hash(pw, 10)`)
- **E3.** Which one checks it? (→ `bcrypt.compare(typed, hash)`)
- **E4.** What 3 parts make a JWT? (→ header, payload, signature)
- **E5.** What header carries the token? (→ `Authorization: Bearer <token>`)
- **E6.** Where should secrets live? (→ env vars, not in code)

**🏆 Auto-graded challenges (5)**
- **C1 — `neverPlainText(stored)`** → `true` if the stored value is a hash (contains `$`), `false` if plain.
- **C2 — `tokenPayload(user)`** → return only `{ userId, email }`, never the password.
- **C3 — `attachAuthHeader(existing, token)`** → copy existing headers and add `Authorization: "Bearer " + token`.
- **C4 — `authMiddleware(req)`** → return `"401"` if no token, else `"ok"`.
- **C5 — `deployOrder(steps)`** → sort steps ascending by their `.sort` number (push code → env → backend → frontend → CORS).

**🎬 Scenario check** (think before coding):
- Plain `password: "secret123"` in the DB → always **hash** with bcrypt before save.
- JWT secret hard-coded in source → use **`process.env.JWT_SECRET`**; never commit secrets.
- Protected route with no `Authorization` header → **401**.
---

## 17. Answer key

### Practice
- **E1.** who you are · **E2.** `bcrypt.hash` · **E3.** `bcrypt.compare` · **E4.** header, payload, signature · **E5.** `Authorization: Bearer <token>` · **E6.** env vars.

### Challenges
```javascript
// C1
function neverPlainText(stored){ return stored.indexOf("$") !== -1; }
// C2
function tokenPayload(user){ return { userId: user.userId, email: user.email }; }
// C3
function attachAuthHeader(existing, token){
  return Object.assign({}, existing, { Authorization: "Bearer " + token });
}
// C4
function authMiddleware(req){
  return (req.headers && req.headers.authorization) ? "ok" : "401";
}
// C5
function deployOrder(steps){ return steps.slice().sort((a, b) => a.sort - b.sort); }
```

### All section answers (quick recap)
| § | Answer |
|---|---|
| 1 | production = app online; auth + deployment |
| 2 | authn = WHO; authz = WHAT you may do |
| 3 | hash with bcrypt; compare at login |
| 4 | JWT = header · payload · signature |
| 5 | register hashes + validates + 201 |
| 6 | login compares + issues JWT (401 on bad) |
| 7 | `auth` middleware → verify Bearer token → 401 or next() |
| 8 | this guide: token in localStorage + Bearer header (prod often prefers httpOnly cookies) |
| 9 | flow = register → hash → login → JWT → protected route |
| 10 | deploy backend + frontend + database |
| 11 | Render + env vars + Atlas |
| 12 | Vercel/Netlify + VITE_API_URL + CORS |
| 13 | test = assert code behavior; red = broken |
| 14 | React Router maps URLs → pages; Navigate guards |
| 15 | hash, env vars, .gitignore, CORS, no localhost, no password in JWT |

---

### 🎉 Congratulations!

You've completed **JavaScript Essentials — Part 5 (Production: Auth + Deployment)**. You can now:
- Explain authentication vs authorization and hash passwords safely.
- Build a register → login → protected-route flow with JWT.
- Deploy the backend (Render), frontend (Vercel/Netlify), and database (Atlas), keeping secrets in env vars.

This completes the 5-part series: **Core → Async/OOP → MERN Bridge → Build MERN apps → Ship to production.** You're ready to take a real project end-to-end. 🚀

> 💡 **Beyond this first ship** (not in scope here): httpOnly Secure cookies or a BFF, refresh tokens, rate limits, HTTPS security headers, and real CI — next steps after this part. Ties to the §8 localStorage caveat.

<!--P5-END-->