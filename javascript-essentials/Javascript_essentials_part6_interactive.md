# JavaScript Essentials - Part 6 (Production Hardening: CI/CD, Testing & Scale)

Take your **Part 5** deployed app and make it **bulletproof**: unit/integration tests, CI/CD, monitoring, advanced security, and scale. Beginner-friendly, ADHD-friendly chunks.

<div class="interactive-note">💡 <strong>Interactive guide — click to reveal, flip, and explore:</strong> quizzes, flashcards, mood checks, Spot-the-Bug, predict-the-output cards, and a <strong>mock CI story</strong> (push → lint → test → build → deploy). Best in <strong>VS Code preview</strong> (<code>Ctrl+Shift+V</code>); the standalone <strong>.html edition</strong> adds a live mock CI runner, coverage simulator, RBAC panel, progress, SRS, Focus Mode, and auto-graded challenges.</div>

<div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;background:#2d3748;color:#e2e8f0;padding:8px 12px;border-radius:8px;margin:10px 0;font-size:0.95rem;">
  <a href="index.html" style="color:#7dd3fc;text-decoration:none;">Hub</a>
  <a href="Javascript_essentials_part1_interactive.md" style="color:#7dd3fc;text-decoration:none;">1 Core</a>
  <a href="Javascript_essentials_part2_interactive.md" style="color:#7dd3fc;text-decoration:none;">2 Async/OOP</a>
  <a href="Javascript_essentials_part3_interactive.md" style="color:#7dd3fc;text-decoration:none;">3 MERN Bridge</a>
  <a href="Javascript_essentials_part4_interactive.md" style="color:#7dd3fc;text-decoration:none;">4 MERN</a>
  <a href="Javascript_essentials_part5_interactive.md" style="color:#7dd3fc;text-decoration:none;">5 Production</a>
  <strong style="color:#fff;">6 Hardening</strong>
  <span style="flex:1;"></span>
  <button onclick="p6iExpand(1)" style="cursor:pointer;border:none;border-radius:6px;padding:4px 10px;">📖 Expand all</button>
  <button onclick="p6iExpand(0)" style="cursor:pointer;border:none;border-radius:6px;padding:4px 10px;">📕 Collapse all</button>
  <button onclick="p6iFocus(this)" style="cursor:pointer;border:none;border-radius:6px;padding:4px 10px;">🧘 Focus Mode</button>
</div>

<div class="layer-legend">
  <span class="l l-test">🧪 Tests</span>
  <span class="l l-ci">⚙️ CI/CD</span>
  <span class="l l-mon">📡 Monitor</span>
  <span class="l l-sec">🔒 Security</span>
  <span class="l l-scale">📈 Scale</span>
</div>

<div class="chall" style="border-left-color:#0f766e;background:#f0fdfa;">👋 <strong>3-minute map:</strong> 1️⃣ write <strong>tests</strong> (unit → integration → component). 2️⃣ let <strong>CI</strong> run lint+test+build on every push. 3️⃣ <strong>CD</strong> deploys when main is green. 4️⃣ add logs, rate limits, RBAC. Deep browser E2E lives in <strong>Playwright Essentials</strong> — not here.</div>
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
.l-test{background:#0369a1;} .l-ci{background:#7c3aed;} .l-mon{background:#0f766e;} .l-sec{background:#be185d;} .l-scale{background:#b45309;}
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
.sandbox button { background:#7c3aed; color:#fff; border:none; padding:7px 14px; border-radius:6px; cursor:pointer; margin:6px 6px 0 0; font-weight:600; }
.sandbox .out { background:#020617; color:#86efac; border-radius:6px; padding:10px; margin-top:8px; min-height:40px; white-space:pre-wrap; font-family:Consolas,monospace; }
.ci-step { display:inline-block; padding:4px 10px; border-radius:6px; margin:3px; background:#334155; }
.ci-step.on { background:#047857; }
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
  .mood label { background:#1a202c; color:#e2e8f0; }
}
</style>

## Table of Contents

1. [Why hardened matters](#1-why-hardened-matters)
2. [Unit &amp; integration — Vitest/Jest](#2-unit--integration--vitestjest)
3. [Backend tests — Express &amp; Mongoose](#3-backend-tests--express--mongoose)
4. [Frontend tests — RTL](#4-frontend-tests--rtl)
5. [Coverage &amp; TDD](#5-coverage--tdd)
6. [CI/CD &amp; GitHub Actions](#6-cicd--github-actions)
7. [CI pipeline](#7-ci-pipeline)
8. [CD pipeline](#8-cd-pipeline)
9. [Env &amp; secrets in CI](#9-env--secrets-in-ci)
10. [Monitoring &amp; logging](#10-monitoring--logging)
11. [Performance](#11-performance)
12. [Security — refresh &amp; rate limits](#12-security--refresh--rate-limits)
13. [Security — RBAC, CORS, HTTPS](#13-security--rbac-cors-https)
14. [Scaling patterns](#14-scaling-patterns)
15. [Pitfalls](#15-pitfalls)
16. [Practice &amp; challenges](#16-practice--challenges)
17. [Answer key](#17-answer-key)

<div class="mood"><span>Before you start:</span>
<input type="radio" id="m6s1" name="mood-start6"><label for="m6s1">🌱 brand new</label>
<input type="radio" id="m6s2" name="mood-start6"><label for="m6s2">🙂 okay</label>
<input type="radio" id="m6s3" name="mood-start6"><label for="m6s3">💪 ready</label>
</div>

---

## 1. Why hardened matters
<a id="1-why-hardened-matters"></a>

<div class="why">🚩 <strong>Why it matters:</strong> deployed ≠ safe forever. Hardening = tests + CI/CD + monitoring + security/scale.</div>

| Layer | Job |
|---|---|
| Tests | Catch bugs before users |
| CI/CD | Auto-check and auto-ship |
| Monitoring | Know when prod is sick |
| Security + scale | Survive traffic & attackers |

<div class="quiz-box"><h3>🎯 Quiz</h3>
<details><summary>What does "production-hardened" add?</summary>
<p><span class="quiz-wrong">❌ Only prettier CSS</span></p>
<p><span class="quiz-correct">✅ Tests, CI/CD, monitoring, security, scale</span></p>
</details>
<details><summary>Who runs CI checks?</summary>
<p><span class="quiz-wrong">❌ Only your laptop, forever</span></p>
<p><span class="quiz-correct">✅ The pipeline (e.g. GitHub Actions) on push/PR</span></p>
</details></div>

<details class="flashcard"><summary>🃏 Flash: Part 5 vs Part 6?</summary><div class="back">Part 5 = ship (auth + deploy). Part 6 = keep healthy every day (tests + pipelines + harden).</div></details>

---

## 2. Unit &amp; integration — Vitest/Jest
<a id="2-unit--integration--vitestjest"></a>

<div class="why">🚩 <strong>Why it matters:</strong> <code>describe</code> / <code>it</code> / <code>expect</code> are the grammar of modern JS tests.</div>

```javascript
import { describe, it, expect } from "vitest";
function add(a, b) { return a + b; }
describe("add", () => {
  it("adds", () => { expect(add(2, 3)).toBe(5); });
});
```

<div class="tip">Unit = one function. Integration = several pieces (route + mock DB).</div>

<div class="quiz-box"><h3>🎯 Quiz</h3>
<details><summary>What does expect(x).toBe(5) do if x is 4?</summary>
<p><span class="quiz-wrong">❌ Silently continues</span></p>
<p><span class="quiz-correct">✅ Fails the test</span></p>
</details></div>

<div class="predict">
<details><summary>Predict: expect(2+2).toBe(5) → ?</summary><p>❌ Fail — 4 !== 5</p></details>
<details><summary>Predict: describe groups what?</summary><p>Related tests under one label</p></details>
</div>

---

## 3. Backend tests — Express &amp; Mongoose
<a id="3-backend-tests--express--mongoose"></a>

<div class="why">🚩 <strong>Why it matters:</strong> mock the DB; assert status + body on your routes.</div>

```javascript
it("GET /api/notes → 200", async () => {
  const res = await request(app).get("/api/notes");
  expect(res.status).toBe(200);
});
```

<div class="quiz-box"><h3>🎯 Quiz</h3>
<details><summary>Why mock Mongoose in CI?</summary>
<p><span class="quiz-wrong">❌ Because Mongo is illegal in tests</span></p>
<p><span class="quiz-correct">✅ Speed, offline, no shared DB pollution</span></p>
</details></div>

---

## 4. Frontend tests — RTL
<a id="4-frontend-tests--rtl"></a>

<div class="why">🚩 <strong>Why it matters:</strong> test what users see — roles and labels — with React Testing Library.</div>

```javascript
render(<Login />);
await userEvent.click(screen.getByRole("button", { name: /log in/i }));
```

<div class="warn">🔗 Full browser E2E (Playwright) → <strong>Playwright Essentials</strong> series — not re-taught here.</div>

<div class="quiz-box"><h3>🎯 Quiz</h3>
<details><summary>Prefer getByRole or CSS class?</summary>
<p><span class="quiz-wrong">❌ Always .btn-primary</span></p>
<p><span class="quiz-correct">✅ getByRole / getByLabelText when possible</span></p>
</details></div>

---

## 5. Coverage &amp; TDD
<a id="5-coverage--tdd"></a>

<div class="why">🚩 <strong>Why it matters:</strong> Red → Green → Refactor. Coverage % is a signal, not a trophy.</div>

<div class="quiz-box"><h3>🎯 Quiz</h3>
<details><summary>Does 100% coverage guarantee quality?</summary>
<p><span class="quiz-wrong">❌ Yes, always</span></p>
<p><span class="quiz-correct">✅ No — weak asserts still miss bugs</span></p>
</details></div>

<details class="flashcard"><summary>🃏 Flash: TDD three steps?</summary><div class="back">Red (failing test) → Green (make it pass) → Refactor (clean up).</div></details>

---

## 6. CI/CD &amp; GitHub Actions
<a id="6-cicd--github-actions"></a>

<div class="why">🚩 <strong>Why it matters:</strong> CI = auto-check on push; CD = auto-deploy when green.</div>

```yaml
# .github/workflows/ci.yml
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm test
```

<div class="sandbox">
  <strong>Mock story — press Push</strong>
  <div>
    <button type="button" onclick="p6iCiPush()">🚀 Push</button>
    <button type="button" onclick="p6iCiReset()">Reset</button>
  </div>
  <div id="p6iCiSteps" style="margin-top:8px;">
    <span class="ci-step" id="p6i-lint">lint</span>
    <span class="ci-step" id="p6i-test">test</span>
    <span class="ci-step" id="p6i-build">build</span>
    <span class="ci-step" id="p6i-deploy">deploy</span>
  </div>
  <div class="out" id="p6iCiOut">Idle — press Push to simulate a pipeline.</div>
</div>

<div class="quiz-box"><h3>🎯 Quiz</h3>
<details><summary>Where do Actions workflows live?</summary>
<p><span class="quiz-wrong">❌ /tmp/actions</span></p>
<p><span class="quiz-correct">✅ .github/workflows/*.yml</span></p>
</details></div>

---

## 7. CI pipeline
<a id="7-ci-pipeline"></a>

<div class="why">🚩 <strong>Why it matters:</strong> lint → test → build. Fail fast.</div>

<div class="quiz-box"><h3>🎯 Quiz</h3>
<details><summary>Sensible CI order?</summary>
<p><span class="quiz-wrong">❌ deploy → lint → test</span></p>
<p><span class="quiz-correct">✅ lint → test → build</span></p>
</details></div>

---

## 8. CD pipeline
<a id="8-cd-pipeline"></a>

<div class="why">🚩 <strong>Why it matters:</strong> merge to main + green CI → Render (API) + Vercel (UI).</div>

<div class="quiz-box"><h3>🎯 Quiz</h3>
<details><summary>When does auto-deploy usually run?</summary>
<p><span class="quiz-wrong">❌ On every typo in a draft branch</span></p>
<p><span class="quiz-correct">✅ After merge to main (and green CI)</span></p>
</details></div>

---

## 9. Env &amp; secrets in CI
<a id="9-env--secrets-in-ci"></a>

<div class="why">🚩 <strong>Why it matters:</strong> <code>${{ secrets.NAME }}</code> — never echo secrets in logs.</div>

<div class="quiz-box"><h3>🎯 Quiz</h3>
<details><summary>Should CI print JWT_SECRET?</summary>
<p><span class="quiz-wrong">❌ Yes, for debugging</span></p>
<p><span class="quiz-correct">✅ Never — rotate if leaked</span></p>
</details></div>

---

## 10. Monitoring &amp; logging
<a id="10-monitoring--logging"></a>

<div class="why">🚩 <strong>Why it matters:</strong> structured logs + error tracking + uptime on <code>/health</code>.</div>

```javascript
console.log(JSON.stringify({ level: "info", msg: "login_ok", userId }));
```

<div class="quiz-box"><h3>🎯 Quiz</h3>
<details><summary>Why structured logs?</summary>
<p><span class="quiz-wrong">❌ They look cooler in screenshots</span></p>
<p><span class="quiz-correct">✅ Easy to search and filter later</span></p>
</details></div>

---

## 11. Performance
<a id="11-performance"></a>

<div class="why">🚩 <strong>Why it matters:</strong> lazy load, cache/CDN, indexes, pagination.</div>

<div class="quiz-box"><h3>🎯 Quiz</h3>
<details><summary>Why paginate lists?</summary>
<p><span class="quiz-wrong">❌ To confuse users</span></p>
<p><span class="quiz-correct">✅ Avoid huge payloads and slow queries</span></p>
</details></div>

---

## 12. Security — refresh &amp; rate limits
<a id="12-security--refresh--rate-limits"></a>

<div class="why">🚩 <strong>Why it matters:</strong> short access tokens + refresh + httpOnly; 429 when hammered.</div>

<div class="quiz-box"><h3>🎯 Quiz</h3>
<details><summary>Rate limited status?</summary>
<p><span class="quiz-wrong">❌ 201</span></p>
<p><span class="quiz-correct">✅ 429</span></p>
</details></div>

<details class="flashcard"><summary>🃏 Flash: httpOnly cookie benefit?</summary><div class="back">Page JavaScript cannot read the cookie — helps vs XSS token theft.</div></details>

---

## 13. Security — RBAC, CORS, HTTPS
<a id="13-security--rbac-cors-https"></a>

<div class="why">🚩 <strong>Why it matters:</strong> 403 = logged in but forbidden; tight CORS; HTTPS on custom domains.</div>

<div class="quiz-box"><h3>🎯 Quiz</h3>
<details><summary>Member hits admin-only delete?</summary>
<p><span class="quiz-wrong">❌ 200 OK</span></p>
<p><span class="quiz-correct">✅ 403 Forbidden</span></p>
</details></div>

---

## 14. Scaling patterns
<a id="14-scaling-patterns"></a>

<div class="why">🚩 <strong>Why it matters:</strong> stateless servers, indexes, CDN, env-per-environment.</div>

<div class="quiz-box"><h3>🎯 Quiz</h3>
<details><summary>Why stateless app servers?</summary>
<p><span class="quiz-wrong">❌ So RAM stores every session forever</span></p>
<p><span class="quiz-correct">✅ Any instance can handle any request — easy to scale out</span></p>
</details></div>

---

## 15. Pitfalls
<a id="15-pitfalls"></a>

<div class="why">🚩 <strong>Why it matters:</strong> skipping CI, leaking secrets, fake-green tests, deploy-on-red.</div>

<div class="warn">Pyramid: many unit tests, fewer integration, thin E2E (Playwright Essentials).</div>

<div class="spotbug">
<details><summary>🐞 CI is red but you merge anyway?</summary><p class="quiz-correct">Don't — fix or revert; red means known breakage.</p></details>
<details><summary>🐞 echo $JWT_SECRET in the workflow for "debug"?</summary><p class="quiz-correct">Never — secrets in logs are leaks; rotate.</p></details>
<details><summary>🐞 Only Playwright E2E, zero unit tests?</summary><p class="quiz-correct">Too slow/flaky as your only net — keep a test pyramid.</p></details>
<details><summary>🐞 expect(true).toBe(true) as your only assert?</summary><p class="quiz-correct">Useless — assert real behavior.</p></details>
</div>

---

## 16. Practice &amp; challenges
<a id="16-practice--challenges"></a>

<div class="why">🚩 <strong>Why it matters:</strong> write the pure functions; the study app auto-grades them.</div>

**Practice:** E1 CD deploys · E2 lint→test→build · E3 fail on mismatch · E4 403 · E5 GitHub Secrets · E6 429

**Challenges:** `testAssert` · `ciStepsOrder` · `statusFromLint` · `tokenRefresh` · `rbacAllowed`

Open `Javascript_essentials_part6_study_app.html` for the live graders + mock CI runner.

---

## 17. Answer key
<a id="17-answer-key"></a>

```javascript
function testAssert(actual, expected){ return actual === expected; }
function ciStepsOrder(steps){ return steps.slice().sort((a,b)=>a.order-b.order); }
function statusFromLint(ok){ return ok ? "pass" : "fail"; }
function tokenRefresh(accessExpired, hasRefresh){
  if (!accessExpired) return "ok";
  return hasRefresh ? "new_access" : "login";
}
function rbacAllowed(role, action){
  if (role === "admin") return true;
  if (role === "member") return action === "read";
  return false;
}
```

### 🎉 Congrats
Part 6 complete — harden with tests, CI/CD, and security. Next for deep E2E: **Playwright Essentials**.

<script>
function p6iExpand(open){
  document.querySelectorAll("details").forEach(function(d){ d.open = !!open; });
}
function p6iFocus(btn){
  document.body.classList.toggle("focus-mode");
  var on = document.body.classList.contains("focus-mode");
  if (btn) { btn.setAttribute("aria-pressed", on ? "true" : "false"); btn.textContent = on ? "🧘 Focus ON" : "🧘 Focus Mode"; }
  if (on) document.querySelectorAll("details").forEach(function(d){ d.open = false; });
}
var p6iCiTimer = null;
function p6iCiReset(){
  if (p6iCiTimer) clearTimeout(p6iCiTimer);
  ["p6i-lint","p6i-test","p6i-build","p6i-deploy"].forEach(function(id){
    var el = document.getElementById(id); if (el) el.classList.remove("on");
  });
  var o = document.getElementById("p6iCiOut"); if (o) o.textContent = "Idle — press Push to simulate a pipeline.";
}
function p6iCiPush(){
  p6iCiReset();
  var out = document.getElementById("p6iCiOut");
  var steps = [
    { id:"p6i-lint", msg:"⚙️ lint… ✅" },
    { id:"p6i-test", msg:"🧪 test… ✅" },
    { id:"p6i-build", msg:"📦 build… ✅" },
    { id:"p6i-deploy", msg:"🚀 deploy… ✅ shipped" }
  ];
  var i = 0;
  function next(){
    if (i >= steps.length) return;
    var s = steps[i++];
    var el = document.getElementById(s.id); if (el) el.classList.add("on");
    if (out) out.textContent = s.msg;
    p6iCiTimer = setTimeout(next, 450);
  }
  if (out) out.textContent = "🚀 Push received — starting CI…";
  p6iCiTimer = setTimeout(next, 300);
}
</script>

<!--P6I-END-->
