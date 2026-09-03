# JavaScript Essentials - Part 5 (Production: Auth + Deployment)

Extend **Part 4** from "works on my laptop" to the real world: real user accounts (**authentication**) and putting your app on the internet (**deployment**). Beginner-friendly, follow-along.

<div class="interactive-note">💡 <strong>Interactive guide — click to reveal, flip, and run:</strong> quizzes, flashcards, mood checks, Spot-the-Bug, predict-the-output cards, and a <strong>live mock auth flow</strong> (register → hash → login → JWT → protected route). Best in <strong>VS Code preview</strong> (<code>Ctrl+Shift+V</code>) or a browser; the standalone <strong>.html edition</strong> adds progress, SRS, Focus Mode, and auto-graded challenges.</div>

<div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;background:#2d3748;color:#e2e8f0;padding:8px 12px;border-radius:8px;margin:10px 0;font-size:0.95rem;">
  <a href="index.html" style="color:#7dd3fc;text-decoration:none;">Hub</a>
  <a href="Javascript_essentials_part1_interactive.md" style="color:#7dd3fc;text-decoration:none;">1 Core</a>
  <a href="Javascript_essentials_part2_interactive.md" style="color:#7dd3fc;text-decoration:none;">2 Async/OOP</a>
  <a href="Javascript_essentials_part3_interactive.md" style="color:#7dd3fc;text-decoration:none;">3 MERN Bridge</a>
  <a href="Javascript_essentials_part4_interactive.md" style="color:#7dd3fc;text-decoration:none;">4 MERN</a>
  <strong style="color:#fff;">5 Production</strong>
  <span style="flex:1;"></span>
  <button onclick="p5iExpand(1)" style="cursor:pointer;border:none;border-radius:6px;padding:4px 10px;">📖 Expand all</button>
  <button onclick="p5iExpand(0)" style="cursor:pointer;border:none;border-radius:6px;padding:4px 10px;">📕 Collapse all</button>
  <button onclick="p5iFocus(this)" style="cursor:pointer;border:none;border-radius:6px;padding:4px 10px;">🧘 Focus Mode</button>
</div>

<div class="layer-legend">
  <span class="l l-react">🟣 React — screen</span>
  <span class="l l-express">🟢 Express — server</span>
  <span class="l l-mongo">🟡 MongoDB — db</span>
  <span class="l l-auth">🩷 Auth — identity</span>
  <span class="l l-prod">🟩 Production — hosting</span>
</div>

<div class="chall" style="border-left-color:#be185d;background:#fdf2f8;">👋 <strong>New to auth? 3-minute map:</strong> 1️⃣ sign up → password is <strong>hashed</strong> (never plain). 2️⃣ login → server issues a <strong>JWT</strong> (an ID badge). 3️⃣ every request sends it in the <code>Authorization</code> header. Then ship it to the internet. All terms are explained as you go.</div>
<style>
h2 { border-bottom: 3px solid #3182ce; padding-bottom: 6px; }
h2[id] { scroll-margin-top: 12px; }
.interactive-note { background:#eef6ff; border-left:4px solid #2b6cb0; padding:10px 14px; border-radius:6px; }
.tip { background:#f0fff4; border-left:4px solid #38a169; padding:10px 14px; border-radius:6px; }
.warn { background:#fffaf0; border-left:4px solid #dd6b20; padding:10px 14px; border-radius:6px; }
.chall { background:#f5f3ff; border-left:4px solid #6b46c1; padding:10px 14px; border-radius:6px; }
.why { background:#eef2ff; border-left:4px solid #5a67d8; padding:6px 12px; border-radius:6px; margin:6px 0 10px 0; font-size:0.92rem; }
.layer-legend { display:flex; gap:8px; flex-wrap:wrap; background:#edf2f7; border:1px solid #cbd5e0; border-radius:8px; padding:8px 12px; margin:10px 0; }
.layer-legend .l, .l { padding:3px 10px; border-radius:999px; color:#fff; font-weight:600; }
.l-react{background:#6d28d9;} .l-express{background:#047857;} .l-mongo{background:#b45309;} .l-node{background:#374151;} .l-auth{background:#be185d;} .l-prod{background:#0f766e;}
.quiz-box { background:#f7f9fc; border:2px solid #3182ce; border-radius:10px; padding:14px 18px; margin:18px 0; }
.quiz-box h3 { margin-top:0; color:#2b6cb0; }
.quiz-box details { background:#fff; border:1px solid #cbd5e0; border-radius:8px; padding:8px 12px; margin:8px 0; }
.quiz-box summary { cursor:pointer; font-weight:600; }
.quiz-correct { color:#276749; font-weight:700; }
.quiz-wrong { color:#9b2c2c; }
.predict { display:grid; grid-template-columns:repeat(auto-fit, minmax(250px, 1fr)); gap:10px; margin:14px 0; }
.predict details { background:#fff; border:1px solid #cbd5e0; border-radius:8px; padding:8px 12px; }
.predict summary { cursor:pointer; font-weight:600; }
.spotbug { display:grid; gap:10px; margin:14px 0; }
.spotbug details { background:#fff; border:1px solid #cbd5e0; border-radius:8px; padding:10px 14px; }
.spotbug summary { cursor:pointer; font-weight:600; }
.flashcard { background:#fffbeb; border:2px solid #d69e2e; border-radius:10px; padding:10px 14px; margin:10px 0; }
.flashcard summary { cursor:pointer; font-weight:700; color:#744210; }
.flashcard .back { margin-top:8px; }
pre { background:#1a202c; color:#e2e8f0; padding:12px 14px; border-radius:8px; overflow-x:auto; }
pre code { background:transparent; color:inherit; font-family:Consolas,monospace; }
code { background:#e2e8f0; padding:1px 5px; border-radius:4px; font-family:Consolas,monospace; color:#2d3748; }
.sandbox { background:#0f172a; border:1px solid #334155; border-radius:10px; padding:14px; color:#e2e8f0; }
.sandbox button { background:#be185d; color:#fff; border:none; padding:7px 14px; border-radius:6px; cursor:pointer; margin:6px 6px 0 0; font-weight:600; }
.sandbox .out { background:#020617; color:#86efac; border-radius:6px; padding:10px; margin-top:8px; min-height:40px; white-space:pre-wrap; font-family:Consolas,monospace; }
.mood { margin-top:12px; display:flex; flex-wrap:wrap; gap:6px; align-items:center; }
.mood input { display:none; }
.mood label { cursor:pointer; border:1px solid #a0aec0; border-radius:999px; padding:4px 12px; background:#fff; font-size:14px; user-select:none; }
.mood input:checked + label { background:#38a169; border-color:#38a169; color:#fff; font-weight:700; }
.totop { text-align:right; margin:6px 0; }
.totop a { font-size:13px; color:#2b6cb0; text-decoration:none; }
body.focus-mode h2 { background:#eef2ff; padding:8px 12px; border-radius:8px; }
body.focus-mode .mood { display:none; }
@media (prefers-color-scheme: dark){
  body { background:#0d1117; color:#e6edf3; }
  h2 { border-bottom-color:#63b3ed; }
  .interactive-note { background:#17202b; }
  .tip { background:#132a1c; } .warn { background:#2b2013; } .chall { background:#221b3a; }
  .why { background:#1c2333; border-left-color:#6366f1; color:#dbe4ef; }
  .quiz-box { background:#141c28; border-color:#2b6cb0; color:#e2e8f0; }
  .quiz-box h3 { color:#90cdf4; } .quiz-box details { background:#0f1622; border-color:#2d3748; }
  .quiz-wrong { color:#fc8181; }
  .predict details { background:#0f1622; border-color:#2d3748; color:#e2e8f0; }
  .spotbug details { background:#0f1622; border-color:#2d3748; color:#e2e8f0; }
  .flashcard { background:#241d0e; border-color:#975a16; }
  code { background:#1f2937; color:#e2e8f0; }
  .layer-legend { background:#1a202c; border-color:#2d3748; }
}
</style>

## Table of Contents

1. [The production layer](#1-the-production-layer)
2. [Authentication vs Authorization](#2-authentication-vs-authorization)
3. [Hashing with bcrypt](#3-hashing-with-bcrypt)
4. [JWT — the three parts](#4-jwt--the-three-parts)
5. [Register a user](#5-register-a-user)
6. [Login &amp; issuing a token](#6-login--issuing-a-token)
7. [Protected routes](#7-protected-routes)
8. [Token in React](#8-token-in-react)
9. [The full auth module — live demo](#9-the-full-auth-module--live-demo)
10. [Deployment](#10-deployment)
11. [Backend hosting + env vars + Atlas](#11-backend-hosting--env-vars--atlas)
12. [Frontend hosting](#12-frontend-hosting)
13. [Testing basics](#13-testing-basics)
14. [Routing libraries](#14-routing-libraries)
15. [Common production pitfalls](#15-common-production-pitfalls)
16. [Practice &amp; challenges](#16-practice--challenges)
17. [Answer key](#17-answer-key)

**📈 Your progress** — tick as you go:
- [ ] Sections 1–4 (concepts: auth and JWT)
- [ ] Sections 5–9 (build the auth flow + live demo)
- [ ] Sections 10–15 (deployment + testing + routing + pitfalls)
- [ ] Section 16–17 (practice, challenges, answers)
<h2 id="1-the-production-layer">1. The production layer</h2>

<div class="why">🚩 **Why it matters:** "works on my laptop" ≠ "ready for real users." Production = accounts + security + putting it online.

| | local | production |
|---|---|---|
| URL | `localhost:3000` | `myapp.onrender.com` |
| Users | only you | anyone |
| Data | fine | must be secure |

**Production adds two things on top of Part 4:** 1️⃣ **Authentication** (accounts) · 2️⃣ **Deployment** (hosting).

<div class="quiz-box"><h3>🎯 Section 1 quiz</h3><details><summary>What does "production" mean?</summary><div class="answer"><span class="quiz-correct">Your app running on a real server on the internet for anyone</span></div></details><details><summary>What two things does production add?</summary><div class="answer"><span class="quiz-correct">Authentication and Deployment</span></div></details></div>

---

<h2 id="2-authentication-vs-authorization">2. Authentication vs Authorization</h2>

<div class="why">🚩 **Why it matters:** two words, two jobs — mixing them up causes bugs.

- **Authentication** = WHO are you? (login/register) → proves identity
- **Authorization** = WHAT may you do? (permissions) → allows actions

**Analogy:** showing your ID at the hotel = *authentication*; a key card opening only *your* room = *authorization*.

<div class="quiz-box"><h3>🎯 Section 2 quiz</h3><details><summary>"Log in with your email & password" →</summary><div class="answer"><span class="quiz-correct">Authentication</span></div></details><details><summary>"You may only edit YOUR OWN notes" →</summary><div class="answer"><span class="quiz-correct">Authorization</span></div></details><details><summary>"Show your passport to prove who you are" →</summary><div class="answer"><span class="quiz-correct">Authentication</span></div></details></div>

<div class="flashcard"><details><summary>🃏 Authentication vs Authorization?</summary><div class="back">Authentication = WHO you are · Authorization = WHAT you may do</div></details></div>

---

<h2 id="3-hashing-with-bcrypt">3. Hashing with bcrypt</h2>

<div class="why">🚩 **Why it matters:** storing plain-text passwords is a disaster — hashing scrambles them one-way.

```javascript
const bcrypt = require("bcrypt");
const hash = await bcrypt.hash(req.body.password, 10);   // hash, not plain
user.password = hash;                                     // store only the hash

const ok = await bcrypt.compare(typedPassword, savedHash); // check at login
if (!ok) return res.status(401).json({ error: "Wrong password" });
```
**Why "slow on purpose"?** bcrypt is deliberately slow so attackers can't brute-force fast.

<div class="sandbox"><strong>🔐 Try it (demo):</strong> a hash can't be reversed. <button onclick="p5iDemoHash()">🔐 Demo hash</button><div class="out" id="p5i-hash-out">Click to see a password become a hash.</div></div>

<div class="quiz-box"><h3>🎯 Section 3 quiz</h3><details><summary>Why not store plain-text passwords?</summary><div class="answer"><span class="quiz-correct">If the DB leaks, passwords are exposed — hashing protects them</span></div></details><details><summary>Can you turn a hash back into the password?</summary><div class="answer"><span class="quiz-correct">No, it's one-way</span></div></details><details><summary>How do you check a password at login?</summary><div class="answer"><span class="quiz-correct">bcrypt.compare(typed, savedHash)</span></div></details></div>

---

<h2 id="4-jwt--the-three-parts">4. JWT — the three parts</h2>

<div class="why">🚩 **Why it matters:** a JWT is the "ID badge" the server issues so it can trust the user without re-checking the password every request.

```javascript
const token = jwt.sign({ userId: user._id, email: user.email }, SECRET, { expiresIn: "7d" });
//  header . payload . signature
```
- **header** — "I'm a JWT" (`{ alg: "HS256", typ: "JWT" }` — note `typ`, not `type`) · **payload** — safe claims (userId/email, NEVER password) · **signature** — a seal; editing the token breaks it.

<div class="flashcard"><details><summary>🃏 What 3 parts make a JWT?</summary><div class="back">header · payload · signature</div></details></div>

<div class="quiz-box"><h3>🎯 Section 4 quiz</h3><details><summary>How many parts in a JWT?</summary><div class="answer"><span class="quiz-correct">3 — header, payload, signature</span></div></details><details><summary>Does the payload contain the password?</summary><div class="answer"><span class="quiz-correct">No, only safe claims like userId/email</span></div></details><details><summary>What does the signature do?</summary><div class="answer"><span class="quiz-correct">Proves the token wasn't tampered with</span></div></details></div>

---
<h2 id="5-register-a-user">5. Register a user</h2>

<div class="why">🚩 **Why it matters:** signup must validate, hash the password, and avoid duplicate emails.

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

<div class="quiz-box"><h3>🎯 Section 5 quiz</h3><details><summary>What must register do to the password?</summary><div class="answer"><span class="quiz-correct">Hash it with bcrypt before saving</span></div></details><details><summary>If email already exists?</summary><div class="answer"><span class="quiz-correct">400 "Email already used"</span></div></details><details><summary>Should the response include the hash?</summary><div class="answer"><span class="quiz-correct">No — never return password/hash</span></div></details></div>

---

<h2 id="6-login--issuing-a-token">6. Login &amp; issuing a token</h2>

<div class="why">🚩 **Why it matters:** login checks the password, then mints a JWT for later requests.

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

<div class="quiz-box"><h3>🎯 Section 6 quiz</h3><details><summary>What does the server return on success?</summary><div class="answer"><span class="quiz-correct">A JWT token + safe user info</span></div></details><details><summary>Status for wrong email/password?</summary><div class="answer"><span class="quiz-correct">401</span></div></details><details><summary>What's in the payload?</summary><div class="answer"><span class="quiz-correct">userId + email — never the password</span></div></details></div>

---

<h2 id="7-protected-routes">7. Protected routes</h2>

<div class="why">🚩 **Why it matters:** middleware checks the token BEFORE the route runs.

```javascript
function auth(req, res, next) {
  const header = req.headers.authorization;              // "Bearer <token>"
  if (!header || !header.startsWith("Bearer "))
    return res.status(401).json({ error: "No token" });
  const token = header.split(" ")[1];
  try { req.user = jwt.verify(token, SECRET); next(); }
  catch { res.status(401).json({ error: "Invalid or expired token" }); }
}
app.get("/api/me", auth, async (req, res) => {
  res.json({ user: req.user });                          // only if token valid
});
```

<div class="quiz-box"><h3>🎯 Section 7 quiz</h3><details><summary>What does middleware do before the route?</summary><div class="answer"><span class="quiz-correct">Verifies the JWT in the Authorization header</span></div></details><details><summary>No/invalid token →</summary><div class="answer"><span class="quiz-correct">401, without running the route</span></div></details><details><summary>How is a private route marked?</summary><div class="answer"><span class="quiz-correct">Add `auth` before the handler</span></div></details></div>

---
<h2 id="8-token-in-react">8. Token in React</h2>

<div class="why">🚩 **Why it matters:** the frontend stores the token (this guide uses `localStorage` for a simple first ship) and sends it in a header.

```javascript
async function login(email, password) {
  const res = await fetch("/api/auth/login", { method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }) });
  const data = await res.json();
  localStorage.setItem("token", data.token);   // demo storage
  setUser(data.user);
}
async function loadMe() {
  const token = localStorage.getItem("token");
  const res = await fetch("/api/me", { headers: { "Authorization": "Bearer " + token } });
  if (res.status === 401) { setUser(null); return; }
  setUser(await res.json());
}
```
<div class="warn">⚠️ **Caveat:** XSS can steal tokens from `localStorage`. Production often prefers **httpOnly Secure cookies** (or a BFF). This guide uses `localStorage` for a simple first-ship demo.</div>

**memory aid:** login → store token in `localStorage` (demo) → send `Authorization: Bearer token`. Remember the XSS caveat.

<div class="quiz-box"><h3>🎯 Section 8 quiz</h3><details><summary>Where does the frontend store the token (this guide's simple demo)?</summary><div class="answer"><span class="quiz-correct">localStorage — common first-ship demo; production often prefers httpOnly cookies (XSS can steal localStorage tokens)</span></div></details><details><summary>What header carries it?</summary><div class="answer"><span class="quiz-correct">Authorization: Bearer &lt;token&gt;</span></div></details><details><summary>If /api/me returns 401?</summary><div class="answer"><span class="quiz-correct">Log the user out (token expired)</span></div></details></div>

---

<h2 id="9-the-full-auth-module--live-demo">9. The full auth module — live demo</h2>

<div class="why">🚩 **Why it matters:** the entire flow in one place. The study app runs it for real (mock).

<div class="chall">🧪 <strong>Try the full flow NOW:</strong> watch register → hash → login → JWT → protected route in the study app's 🔐 panel, or tap here:
<button onclick="p5iDemoFlow()" style="background:#6d28d9;color:#fff;border:none;border-radius:6px;padding:8px 14px;cursor:pointer;">▶️ Watch auth flow</button>
<div class="out" id="p5i-flow-out" style="background:#020617;color:#86efac;border-radius:6px;padding:10px;margin-top:8px;font-family:Consolas,monospace;font-size:13px;">(click to build the auth flow in the log)</div></div>

```javascript
// SERVER — register + login + protected
app.post("/api/auth/register", async (req,res)=>{ const {email,password}=req.body;
  if(await User.findOne({email})) return res.status(400).json({error:"exists"});
  await User.create({email, password:await bcrypt.hash(password,10)});
  res.status(201).json({message:"User created"}); });
app.post("/api/auth/login", async (req,res)=>{ const {email,password}=req.body;
  const u=await User.findOne({email}); if(!u) return res.status(401).json({error:"bad"});
  const ok=await bcrypt.compare(password,u.password); if(!ok) return res.status(401).json({error:"bad"});
  res.json({token:jwt.sign({userId:u._id,email:u.email},SECRET,{expiresIn:"7d"})}); });
app.get("/api/me", auth, (req,res)=>res.json({user:req.user}));
```

<div class="quiz-box"><h3>🎯 Section 9 quiz</h3><details><summary>What 5 steps is the whole auth flow?</summary><div class="answer"><span class="quiz-correct">register → hash → login → JWT → protected route with Bearer header</span></div></details><details><summary>Protected route with NO token →</summary><div class="answer"><span class="quiz-correct">401</span></div></details></div>

<div class="mood"><span>How's the auth flow so far? </span><input type="radio" name="m5a" id="m5a1"><label for="m5a1">😕 tricky</label><input type="radio" name="m5a" id="m5a2"><label for="m5a2">👍 ok</label><input type="radio" name="m5a" id="m5a3"><label for="m5a3">😎 easy</label></div>

---

<h2 id="10-deployment">10. Deployment</h2>

<div class="why">🚩 **Why it matters:** your localhost app only works on your computer. Deployment puts it online for everyone.

```
Deploy a MERN app = host 3 things:
  1. BACKEND (Express)   → Render / Railway
  2. FRONTEND (React)    → Vercel / Netlify
  3. DATABASE (MongoDB)  → MongoDB Atlas
```

<div class="quiz-box"><h3>🎯 Section 10 quiz</h3><details><summary>What 3 pieces do you host?</summary><div class="answer"><span class="quiz-correct">Backend, Frontend, Database</span></div></details><details><summary>Where does the DB live in production?</summary><div class="answer"><span class="quiz-correct">MongoDB Atlas (cloud)</span></div></details></div>

---
<h2 id="11-backend-hosting--env-vars--atlas">11. Backend hosting + env vars + Atlas</h2>

<div class="why">🚩 **Why it matters:** the server needs a public home + secrets as env vars, never hard-coded.

```bash
# .env  (DO NOT commit!)
PORT=3000
MONGODB_URI=mongodb+srv://user:pw@cluster.mongodb.net
JWT_SECRET=make-up-a-long-secret-string
```
```javascript
const PORT = process.env.PORT || 3000;
mongoose.connect(process.env.MONGODB_URI);
const SECRET = process.env.JWT_SECRET;
```
**Backend host steps (Render):** 1. push to GitHub · 2. New → Web Service · 3. pick repo · 4. start: `node server/server.js` · 5. add secrets in Env tab · 6. Deploy → public URL.

<div class="quiz-box"><h3>🎯 Section 11 quiz</h3><details><summary>Where do secrets live in production?</summary><div class="answer"><span class="quiz-correct">Environment variables (not in code)</span></div></details><details><summary>Two secrets you usually need?</summary><div class="answer"><span class="quiz-correct">MONGODB_URI and JWT_SECRET</span></div></details><details><summary>Should .env be committed?</summary><div class="answer"><span class="quiz-correct">No — add to .gitignore</span></div></details></div>

---

<h2 id="12-frontend-hosting">12. Frontend hosting</h2>

<div class="why">🚩 **Why it matters:** the React screen needs a public URL, and its fetch calls must point at the hosted backend.

```javascript
fetch(import.meta.env.VITE_API_URL + "/api/notes");   // NOT localhost
// VITE_API_URL=https://my-backend.onrender.com
```
**Steps:** `npm run build` → connect repo to Vercel/Netlify → add `VITE_API_URL` env var → deploy. Then update the backend's **CORS** to allow the new frontend URL.

<div class="quiz-box"><h3>🎯 Section 12 quiz</h3><details><summary>What must the frontend's fetch URLs use in production?</summary><div class="answer"><span class="quiz-correct">The hosted backend URL via an env var</span></div></details><details><summary>After moving the frontend, update what on the backend?</summary><div class="answer"><span class="quiz-correct">CORS</span></div></details></div>

---

<h2 id="13-testing-basics">13. Testing basics</h2>

<div class="why">🚩 **Why it matters:** a test is code that checks your code — it catches regressions before users do.

```javascript
// TOY ONLY — not bcrypt. Real apps: bcrypt.hash / bcrypt.compare
function toyHash(pw) { return "h$" + pw.length + "$" + pw.charCodeAt(0); }
test("toyHash never returns the plain password", () => {
  expect(toyHash("abc")).not.toBe("abc");
  expect(toyHash("abc")).toBe(toyHash("abc"));
});
```

<div class="quiz-box"><h3>🎯 Section 13 quiz</h3><details><summary>What does a test do?</summary><div class="answer"><span class="quiz-correct">Asserts your code works, catching regressions</span></div></details><details><summary>"Red" test means…</summary><div class="answer"><span class="quiz-correct">Something broke — fix before shipping</span></div></details></div>

---

<h2 id="14-routing-libraries">14. Routing libraries</h2>

<div class="why">🚩 **Why it matters:** real apps have many pages. React Router maps URLs to components.

```jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/login" element={<Login />} />
  <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
</Routes>
```

<div class="quiz-box"><h3>🎯 Section 14 quiz</h3><details><summary>What does React Router do?</summary><div class="answer"><span class="quiz-correct">Maps URL paths to components/pages</span></div></details><details><summary>How to protect /profile?</summary><div class="answer"><span class="quiz-correct">Redirect to /login if not authenticated (Navigate)</span></div></details></div>

---
<h2 id="15-common-production-pitfalls">15. Common production pitfalls</h2>

<div class="why">🚩 **Why it matters:** the mistakes that break deployed apps and leak data.

```javascript
1. Storing plain-text passwords               ❌  →  bcrypt.hash
2. Hard-coding the JWT secret / DB URL        ❌  →  env vars
3. Committing .env                            ❌  →  .gitignore
4. Forgetting CORS on the backend             ❌  →  allow frontend URL
5. Frontend calls localhost after deploy      ❌  →  VITE_API_URL
6. Password in the JWT payload                ❌  →  only userId/email
```

<div class="quiz-box"><h3>🎯 Section 15 quiz</h3><details><summary>Deployed frontend can't reach the API? First check?</summary><div class="answer"><span class="quiz-correct">CORS on backend + the API URL env var</span></div></details><details><summary>.env got pushed to GitHub?</summary><div class="answer"><span class="quiz-correct">Add to .gitignore and rotate leaked secrets</span></div></details><details><summary>Password in the JWT payload?</summary><div class="answer"><span class="quiz-correct">Never</span></div></details></div>

---

<h2 id="16-practice--challenges">16. Practice &amp; challenges</h2>

<div class="why">🚩 **Why it matters:** low-stakes reps move knowledge from "saw it" to "build it."

**✏️ Practice:** E1. Authentication proves *who*? (who you are) · E2. Which bcrypt method hashes? (`bcrypt.hash`) · E3. Which checks? (`bcrypt.compare`) · E4. 3 parts of a JWT? (header, payload, signature) · E5. Header carrying the token? (`Authorization: Bearer <token>`) · E6. Where do secrets live? (env vars).

<div class="chall">🏆 <strong>5 auto-graded challenges live in the study app</strong> — C1 neverPlainText · C2 tokenPayload · C3 attachAuthHeader · C4 authMiddleware · C5 deployOrder. Each is a tiny pure function you run instantly, no install. Solutions in §17.</div>

<div class="quiz-box"><h3>🎬 Scenario check (before you code)</h3>
<details><summary>DB dump shows <code>password: "secret123"</code> in plain text. What went wrong?</summary><div class="answer"><span class="quiz-correct">Never store plain passwords — hash with <code>bcrypt.hash(password, 10)</code> before save.</span></div></details>
<details><summary><code>const SECRET = "my-secret-in-source"</code> shipped in the repo. Risk?</summary><div class="answer"><span class="quiz-correct">Anyone with the repo can forge JWTs. Use <code>process.env.JWT_SECRET</code> and keep <code>.env</code> out of git.</span></div></details>
<details><summary>GET /api/me with no Authorization header — what should happen?</summary><div class="answer"><span class="quiz-correct">401 Unauthorized — auth middleware blocks before the route runs.</span></div></details>
</div>

<div class="mood"><span>After the practice: </span><input type="radio" name="m5b" id="m5b1"><label for="m5b1">😕 tricky</label><input type="radio" name="m5b" id="m5b2"><label for="m5b2">👍 ok</label><input type="radio" name="m5b" id="m5b3"><label for="m5b3">😎 easy</label></div>

---

<h2 id="17-answer-key">17. Answer key</h2>

<div class="why">🚩 **Why it matters:** compare your work — noticing differences is where learning happens.

```javascript
// C1
function neverPlainText(stored){ return stored.indexOf("$") !== -1; }
// C2
function tokenPayload(user){ return { userId: user.userId, email: user.email }; }
// C3
function attachAuthHeader(existing, token){ return { ...existing, Authorization: "Bearer " + token }; }
// C4
function authMiddleware(req){ return (req.headers && req.headers.authorization) ? "ok" : "401"; }
// C5
function deployOrder(steps){ return steps.slice().sort((a,b) => a.sort - b.sort); }
```

**Quick recap:** S1 production = app online · S2 authn=WHO, authz=WHAT · S3 hash with bcrypt · S4 JWT=header·payload·signature · S5 register hashes → 201 · S6 login compares → JWT · S7 auth middleware → 401 or next() · S8 this guide: token in localStorage + Bearer header (prod often prefers httpOnly cookies) · S9 register→hash→login→JWT→protected · S10 host backend+frontend+db · S11 Render+env+Atlas · S12 Vercel+VITE_API_URL+CORS · S13 test catches regressions · S14 Router maps URL→page · S15 hash, env, CORS, no localhost, no password in JWT

---

## 🐞 Spot-the-Bug — final boss quiz

<div class="why">🚩 <strong>Why it matters:</strong> catch the classic auth mistakes before they leak data.</div>

<div class="spotbug">
<details><summary>Q1. Storing <code>user.password = req.body.password</code> (plain)?</summary>
<p class="quiz-correct">✅ Never — always store <code>bcrypt.hash(password, 10)</code>.</p>
<p class="quiz-wrong">❌ Saving the plain password "just for now" — if the DB leaks, every account is compromised.</p>
</details>
<details><summary>Q2. <code>jwt.sign({id}, SECRET)</code> — but SECRET hard-coded in code?</summary>
<p class="quiz-correct">✅ Use an env var (<code>process.env.JWT_SECRET</code>), never commit it.</p>
<p class="quiz-wrong">❌ Shipping secrets in source — anyone with the repo can forge tokens.</p>
</details>
<details><summary>Q3. Protected route not checking the Authorization header?</summary>
<p class="quiz-correct">✅ Add middleware that verifies the Bearer token first, else 401.</p>
<p class="quiz-wrong">❌ Trusting that "only logged-in users know the URL" — without middleware, anyone can hit the route.</p>
</details>
<details><summary>Q4. Putting the user's password in the JWT payload?</summary>
<p class="quiz-correct">✅ Never — payload holds only safe claims like userId/email.</p>
</details>
</div>

<div class="mood"><span>How was Spot-the-Bug?</span>
<input type="radio" name="mood-bug5" id="mb5a"><label for="mb5a">😅 tough</label>
<input type="radio" name="mood-bug5" id="mb5b"><label for="mb5b">🙂 okay</label>
<input type="radio" name="mood-bug5" id="mb5c"><label for="mb5c">😎 nailed it</label>
</div>

---

## 🤔 More predict-the-output cards

<div class="why">🚩 <strong>Why it matters:</strong> guessing the output builds the auth mental model fast.</div>

<div class="predict">
<details><summary><code>bcrypt.compare("pw", savedHash)</code> on a correct password?</summary>
<p class="quiz-correct">✅ <code>true</code> (resolves to true)</p>
</details>
<details><summary>A signed JWT <code>token.split(".").length</code>?</summary>
<p class="quiz-correct">✅ <code>3</code> — header, payload, signature</p>
</details>
<details><summary><code>localStorage.getItem("token")</code> right after a successful login?</summary>
<p class="quiz-correct">✅ the token string (if <code>setItem</code> was called)</p>
</details>
<details><summary>Hitting a protected route with NO Authorization header → status?</summary>
<p class="quiz-correct">✅ <code>401</code></p>
</details>
<details><summary>Can a hacker read a password from <code>bcrypt.hash("pw", 10)</code>?</summary>
<p class="quiz-correct">✅ no — it's a one-way hash, never plain text</p>
</details>
</div>

---

## 🎉 Congratulations!

You've completed **JavaScript Essentials — Part 5 (Production: Auth + Deployment)**. You can now build a secured login flow and deploy a real MERN app. This completes the 5-part series → **you're ready to ship.** 🚀

<div class="tip">💡 **Beyond this first ship** (not in scope here): httpOnly Secure cookies or a BFF, refresh tokens, rate limits, HTTPS security headers, and real CI — next steps after this part. Ties to the §8 localStorage caveat.</div>

<div class="totop"><a href="#table-of-contents">⬆ Back to top</a></div>

<script>
// ===== Part 5 interactive md — demos + focus =====
function p5iExpand(open){ document.querySelectorAll("details").forEach(function(d){ try{ d.open=!!open; }catch(e){} }); }
function p5iFocus(btn){ var on=!document.body.classList.contains("focus-mode"); document.body.classList.toggle("focus-mode",on);
  if(btn) btn.textContent=on?"🧘 Focus ON":"🧘 Focus Mode"; document.querySelectorAll("details").forEach(function(d){ try{ d.open=false; }catch(e){} }); }
function p5iDemoHash(){
  var el=document.getElementById("p5i-hash-out"); if(!el) return;
  el.textContent="password: \"secret123\"\n→ hash: h$8f3a92f$8  (can't be reversed!)";
}
function p5iDemoFlow(){
  var el=document.getElementById("p5i-flow-out"); if(!el) return;
  el.innerHTML="1. POST /api/auth/register  → password hashed (never plain)<br>" +
               "2. POST /api/auth/login     → bcrypt.compare OK → JWT issued<br>" +
               "3. GET /api/me  with   Authorization: Bearer <token>   → 200 ✓<br>" +
               "4. (logout) protected route with NO token → 401";
}
</script>

<!--P5I-END-->