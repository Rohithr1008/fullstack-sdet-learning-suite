"use strict";
/**
 * Generates compact but JE-pattern study apps for Parts 1–3.
 */
const fs = require("fs");
const path = require("path");
const root = __dirname;
const shellCss = fs.readFileSync(path.join(root, "shared", "study-shell.css"), "utf8");
const shellJs = fs.readFileSync(path.join(root, "shared", "study-shell.js"), "utf8");

function app({ part, title, subtitle, sections, extraCss, mockHtml, mockJs, srCards, challenges, predicts, spotbugs, studyDays }) {
  const total = sections.length;
  const toc = sections.map((s, i) => `<a href="#s${i + 1}">${i + 1}. ${s}</a>`).join(" · ");
  const sectionHtml = sections
    .map((s, i) => {
      const n = i + 1;
      return `
<section id="s${n}">
<h2>${n}. ${s}</h2>
<blockquote class="why">🚩 <strong>Why it matters:</strong> ${whyFor(part, n)}</blockquote>
${bodyFor(part, n)}
${n <= Math.min(4, total - 3) ? quizFor(part, n) : ""}
<button class="section-complete-btn mark-btn" onclick="toggleSection${part}(${n})" id="btn-sec-${n}">Mark Complete</button>
</section>`;
    })
    .join("\n");

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>API &amp; Data Essentials — Part ${part}</title>
<style>
body{font-family:"Segoe UI",system-ui,sans-serif;max-width:920px;margin:0 auto;padding:16px 18px 60px;line-height:1.55;color:#1a202c;background:#f7f9fc}
h1{color:#0e7490}
h2{border-bottom:3px solid #0e7490;padding-bottom:6px;scroll-margin-top:12px}
pre,code{font-family:Consolas,"Cascadia Code",monospace}
pre{background:#1a202c;color:#e2e8f0;padding:12px 14px;border-radius:8px;overflow-x:auto}
.toc{background:#edf2f7;padding:10px 14px;border-radius:8px;margin:10px 0;font-size:0.92rem}
.mock-api{background:#0f172a;color:#e2e8f0;border-radius:12px;padding:14px 16px;margin:14px 0}
.mock-api button{margin:4px 6px 4px 0;padding:6px 12px;border:none;border-radius:6px;cursor:pointer;background:#0e7490;color:#fff;font-weight:600}
.mock-api .out{background:#020617;color:#86efac;padding:10px;border-radius:6px;min-height:48px;white-space:pre-wrap;margin-top:8px;font-family:Consolas,monospace;font-size:13px}
.challenge{background:#f5f3ff;border-left:4px solid #6b46c1;padding:12px;border-radius:8px;margin:12px 0}
.challenge textarea{width:100%;min-height:90px;box-sizing:border-box;font-family:Consolas,monospace;padding:8px}
${extraCss || ""}
<!-- SHARED-SHELL-CSS:START -->
${shellCss}
<!-- SHARED-SHELL-CSS:END -->
</style>
</head>
<body>
<a class="skip-link" href="#progressBar">Skip to content</a>
<h1>API &amp; Data Essentials — Part ${part}</h1>
<div class="partnav" aria-label="Part navigation">
  <a href="index.html">Hub</a>
  ${[1, 2, 3].map((i) => (i === part ? `<strong>${i} ${short(i)}</strong>` : `<a href="Api_data_essentials_part${i}_study_app.html">${i}</a>`)).join("\n  ")}
</div>
<button id="themeBtn" class="theme-btn" onclick="toggleTheme${part}()" aria-label="Toggle theme">🌙 Dark mode</button>
<div style="display:flex;gap:6px;flex-wrap:wrap;margin:4px 0 8px;align-items:center;">
  <span style="font-weight:600;">Size:</span>
  <button onclick="fontZoom${part}(-1)" aria-label="Decrease text">A−</button>
  <button onclick="fontZoom${part}(0)" aria-label="Reset text">A</button>
  <button onclick="fontZoom${part}(1)" aria-label="Increase text">A+</button>
  <button onclick="collapseAll${part}(true)">📖 Expand all</button>
  <button onclick="collapseAll${part}(false)">📕 Collapse all</button>
  <button id="focusBtn${part}" onclick="focusMode${part}(this)" aria-pressed="false">🧘 Focus Mode</button>
</div>
<div id="focusHint${part}" style="display:none;background:#eef2ff;border:2px solid #5a67d8;border-radius:8px;padding:8px 14px;margin:6px 0;color:#3730a3;font-weight:600;">🧘 Focus Mode ON — distractions hidden.</div>
<p>${subtitle}</p>
<div id="progressBar" style="background:#2d3748;border-radius:8px;padding:10px 16px;margin:10px 0;color:#e2e8f0;font-weight:600;text-align:center;">📊 Progress: 0/${total} sections (0%)</div>
<div id="boostBar" style="background:#1a202c;border:2px solid #dd6b20;border-radius:12px;padding:12px 16px;margin:12px 0;color:#e2e8f0;display:flex;flex-wrap:wrap;gap:12px;align-items:center;justify-content:space-between;">
  <div>⚡ <span id="streakCount" style="color:#fbbf24;">0-day streak</span></div>
  <div>⭐ <span id="pointCount" style="color:#fbbf24;">0 XP</span></div>
  <button onclick="boostSurprise${part}()" aria-label="Surprise me">🎲 Surprise me</button>
  <button onclick="startFocusTimer${part}()" aria-label="Focus sprint">🧠 Focus sprint</button>
  <span id="focusTimer" style="font-weight:700;color:#68d391;">⏱ 25:00</span>
</div>
<div id="toastZone" style="position:fixed;top:16px;right:16px;z-index:999;display:flex;flex-direction:column;gap:8px;"></div>
<canvas id="confettiCanvas" style="position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:998;display:none;"></canvas>
<div id="learningPathPanel" style="background:#2d3748;border:2px solid #805ad5;border-radius:12px;padding:16px 20px;margin:16px 0;">
  <h3 style="color:#b794f4;margin-top:0;">🧭 Learning Path</h3>
  <div id="learningPathContent" style="color:#e2e8f0;"><p>Mark sections complete for recommendations…</p></div>
</div>
<div id="spacedRepetitionPanel" style="background:#2d3748;border:2px solid #319795;border-radius:12px;padding:16px 20px;margin:16px 0;">
  <h3 style="color:#4fd1c5;margin-top:0;">🃏 Spaced Repetition</h3>
  <div id="srCard" style="background:#1a202c;border-radius:8px;padding:16px;text-align:center;">
    <p id="srQuestion" style="color:#e2e8f0;">Click Start Review</p>
    <p id="srAnswer" style="color:#68d391;display:none;"></p>
    <div id="srButtons">
      <button onclick="startSRReview${part}()">Start Review</button>
      <button onclick="srToggleShuffle${part}()" id="srShuffleBtn">🔀 Shuffle: Off</button>
    </div>
    <div id="srStats" style="color:#a0aec0;font-size:12px;margin-top:10px;"></div>
  </div>
</div>

<div class="toc"><strong>TOC:</strong> ${toc}</div>

${mockHtml}

${sectionHtml}

<section id="predicts">
<h2>🤔 Predict deck</h2>
<div class="predict">${predicts.map((p) => `<details><summary>${p.q}</summary><p>${p.a}</p></details>`).join("")}</div>
</section>

<section id="spotbug">
<h2>🐞 Spot-the-Bug</h2>
<div class="spotbug">${spotbugs.map((b, i) => `<details><summary>Bug ${i + 1}: ${b.t}</summary><pre><code>${b.c}</code></pre><p><strong>Fix:</strong> ${b.f}</p></details>`).join("")}</div>
</section>

<section id="challenges">
<h2>Challenges (auto-graded)</h2>
${challenges
  .map(
    (ch, i) => `<div class="challenge" id="chal${i + 1}">
<strong>${i + 1}. ${ch.name}</strong> — ${ch.prompt}
<textarea id="code${i + 1}" aria-label="Challenge ${i + 1} code">${ch.starter}</textarea>
<button onclick="runTest${part}(${i + 1})">Run tests</button>
<pre id="out${i + 1}" class="out" style="background:#1a202c;color:#e2e8f0;padding:8px;border-radius:6px;"></pre>
</div>`
  )
  .join("\n")}
</section>

<details class="studyplan7"><summary>📅 7-day study plan</summary><ol>${studyDays.map((d) => `<li>${d}</li>`).join("")}</ol></details>

<div class="mood"><span>Mood check:</span>
<input type="radio" name="mood${part}" id="mood${part}a"><label for="mood${part}a">😊 Clear</label>
<input type="radio" name="mood${part}" id="mood${part}b"><label for="mood${part}b">😐 Fuzzy</label>
<input type="radio" name="mood${part}" id="mood${part}c"><label for="mood${part}c">😵 Stuck</label>
</div>

<div id="certificate" class="certificate" style="display:none;">
  <h2>🏆 Certificate</h2>
  <p class="big">API &amp; Data Essentials — Part ${part}: ${title}</p>
  <p>All ${total} sections marked complete. Nice work.</p>
</div>

<script>
<!-- SHARED-SHELL-JS:START -->
${shellJs}
<!-- SHARED-SHELL-JS:END -->
</script>
<script>
(function(){
  "use strict";
  var PART = ${part};
  var TOTAL = ${total};
  var THEME_KEY = "api-p"+PART+"-theme";
  var FONT_KEY = "api-p"+PART+"-font";
  var BOOST_KEY = "p"+PART+"-boost";
  var SR_KEY = "p"+PART+"-sr";
  var SR_SHUF = "p"+PART+"-sr-shuffle";

  window["toggleTheme"+PART] = function(){ StudyShell.toggleTheme(THEME_KEY); };
  window["fontZoom"+PART] = function(d){ StudyShell.fontZoom(d, FONT_KEY); };
  window["focusMode"+PART] = function(btn){ StudyShell.focusMode(btn, "focusHint"+PART); };
  window["collapseAll"+PART] = function(exp){ StudyShell.collapseDetails(exp); };

  function toast(msg){
    var z = document.getElementById("toastZone");
    var t = document.createElement("div");
    t.setAttribute("role","status");
    t.style.cssText="background:#276749;color:#fff;padding:8px 12px;border-radius:8px;font-weight:600;";
    t.textContent = msg;
    z.appendChild(t);
    setTimeout(function(){ t.remove(); }, 2200);
  }

  function loadBoost(){
    try { return JSON.parse(localStorage.getItem(BOOST_KEY)||"{\\"xp\\":0,\\"streak\\":0,\\"day\\":\\"\\"}"); }
    catch(e){ return {xp:0,streak:0,day:""}; }
  }
  function saveBoost(b){ localStorage.setItem(BOOST_KEY, JSON.stringify(b)); }
  function refreshBoost(){
    var b = loadBoost();
    var today = new Date().toISOString().slice(0,10);
    if (b.day && b.day !== today){ /* keep streak until earn */ }
    document.getElementById("streakCount").textContent = (b.streak||0)+"-day streak";
    document.getElementById("pointCount").textContent = (b.xp||0)+" XP";
  }
  function addXp(n){
    var b = loadBoost();
    var today = new Date().toISOString().slice(0,10);
    if (b.day !== today){ b.streak = (b.day ? (b.streak||0)+1 : 1); b.day = today; }
    b.xp = (b.xp||0)+n;
    saveBoost(b); refreshBoost(); toast("+"+n+" XP");
  }

  window["toggleSection"+PART] = function(n){
    var key = "p"+PART+"-sec-"+n;
    var on = localStorage.getItem(key) === "1";
    localStorage.setItem(key, on ? "0" : "1");
    if (!on) addXp(5);
    updateProgress();
  };

  function updateProgress(){
    var done = 0;
    for (var i=1;i<=TOTAL;i++){
      var on = localStorage.getItem("p"+PART+"-sec-"+i)==="1";
      if (on) done++;
      var btn = document.getElementById("btn-sec-"+i);
      if (btn){ btn.textContent = on ? "✓ Completed" : "Mark Complete"; btn.classList.toggle("done", on); }
    }
    var pct = Math.round(done/TOTAL*100);
    document.getElementById("progressBar").textContent = "📊 Progress: "+done+"/"+TOTAL+" sections ("+pct+"%)";
    var cert = document.getElementById("certificate");
    if (cert) cert.style.display = done===TOTAL ? "block" : "none";
    var lp = document.getElementById("learningPathContent");
    if (lp){
      if (done===0) lp.innerHTML="<p>Start with section 1 — mark complete as you go.</p>";
      else if (done<TOTAL) lp.innerHTML="<p>Next: section "+(done+1)+". Keep the streak with a Focus sprint.</p>";
      else lp.innerHTML="<p>🎉 Part complete — run <code>npm run lab:part"+PART+"</code> if you have not.</p>";
    }
  }

  window["boostSurprise"+PART] = function(){
    var n = 1+Math.floor(Math.random()*TOTAL);
    location.hash = "s"+n;
    addXp(1);
  };

  var timerId=null, left=25*60;
  window["startFocusTimer"+PART] = function(){
    if (timerId){ clearInterval(timerId); timerId=null; document.getElementById("focusTimer").textContent="⏱ 25:00"; return; }
    left=25*60;
    timerId=setInterval(function(){
      left--;
      var m=Math.floor(left/60), s=left%60;
      document.getElementById("focusTimer").textContent="⏱ "+m+":"+String(s).padStart(2,"0");
      if (left<=0){ clearInterval(timerId); timerId=null; addXp(20); toast("Sprint done!"); }
    },1000);
  };

  var srCards = ${JSON.stringify(srCards)};
  var srIdx=0, srShuffle=localStorage.getItem(SR_SHUF)==="1";
  function deck(){
    var d=srCards.slice();
    if (srShuffle) d.sort(function(){return Math.random()-0.5;});
    return d;
  }
  var cur=deck();
  window["startSRReview"+PART]=function(){
    cur=deck(); srIdx=0; showSR();
  };
  function showSR(){
    if (!cur.length) return;
    var c=cur[srIdx%cur.length];
    document.getElementById("srQuestion").textContent=c.q;
    var ans=document.getElementById("srAnswer");
    ans.style.display="none"; ans.textContent=c.a;
    document.getElementById("srButtons").innerHTML=
      '<button onclick="showSRAnswer'+PART+'()">Show answer</button>'+
      '<button onclick="srKnow'+PART+'(true)">Got it</button>'+
      '<button onclick="srKnow'+PART+'(false)">Again</button>'+
      '<button onclick="srToggleShuffle'+PART+'()" id="srShuffleBtn">🔀 Shuffle: '+(srShuffle?"On":"Off")+'</button>';
    document.getElementById("srStats").textContent="Card "+((srIdx%cur.length)+1)+"/"+cur.length;
  }
  window["showSRAnswer"+PART]=function(){ document.getElementById("srAnswer").style.display="block"; };
  window["srKnow"+PART]=function(ok){ if(ok) addXp(2); srIdx++; showSR(); };
  window["srToggleShuffle"+PART]=function(){
    srShuffle=!srShuffle; localStorage.setItem(SR_SHUF, srShuffle?"1":"0");
    var b=document.getElementById("srShuffleBtn"); if(b) b.textContent="🔀 Shuffle: "+(srShuffle?"On":"Off");
  };

  var TESTS = ${JSON.stringify(challenges.map((c) => c.tests))};
  window["runTest"+PART]=function(n){
    var code=document.getElementById("code"+n).value;
    var out=document.getElementById("out"+n);
    try{
      var fn=new Function(code + "\\n; return (" + TESTS[n-1] + ");");
      var result=fn();
      if (result === true || result === "pass"){ out.textContent="✅ PASS"; addXp(15); confettiBurst(); }
      else out.textContent="❌ "+String(result);
    }catch(e){ out.textContent="❌ "+e.message; }
  };

  function confettiBurst(){
    var c=document.getElementById("confettiCanvas");
    if(!c) return;
    c.style.display="block";
    var ctx=c.getContext("2d");
    c.width=innerWidth; c.height=innerHeight;
    var bits=[];
    for(var i=0;i<80;i++) bits.push({x:Math.random()*c.width,y:Math.random()*c.height*0.3,vy:2+Math.random()*4,vx:-2+Math.random()*4,col:"hsl("+Math.random()*360+",70%,55%)"});
    var frames=40;
    (function tick(){
      ctx.clearRect(0,0,c.width,c.height);
      bits.forEach(function(b){ b.x+=b.vx; b.y+=b.vy; ctx.fillStyle=b.col; ctx.fillRect(b.x,b.y,4,4); });
      if(--frames>0) requestAnimationFrame(tick); else c.style.display="none";
    })();
  }

  ${mockJs}

  StudyShell.applyTheme(THEME_KEY);
  StudyShell.applyFontZoom(FONT_KEY);
  refreshBoost();
  updateProgress();
})();
</script>
</body>
</html>
<!--P${part}H-END-->
`;
}

function short(i) {
  return { 1: "HTTP", 2: "Auth", 3: "SQL" }[i];
}

function whyFor(part, n) {
  const map = {
    1: {
      1: "UI-only suites miss cheap contract bugs.",
      2: "Status codes are your first assertion.",
      3: "Stable URLs make reusable tests.",
      4: "Most failures are headers or Content-Type.",
      5: "Green tests must prove something.",
      6: "CI runs code, not Postman clicks.",
      7: "One smoke unlocks the habit.",
      8: "Avoid the classic assertion traps.",
      9: "Practice wires theory to muscle memory.",
      10: "Challenges prove you can ship helpers.",
      11: "Check yourself — then the lab.",
    },
    2: {
      1: "Wrong auth type → endless 401s.",
      2: "Tests need a repeatable token path.",
      3: "Happy paths miss security bugs.",
      4: "401≠403≠422 for triage.",
      5: "Wrong types break clients even on 201.",
      6: "Blind retries create duplicates.",
      7: "Auth pitfalls cause flakes and leaks.",
      8: "Practice the negative matrix.",
      9: "Build reusable auth helpers.",
      10: "Confirm with the lab.",
    },
    3: {
      1: "The DB is often the source of truth.",
      2: "SELECT is the start of every data assert.",
      3: "JOINs unlock order↔user↔product checks.",
      4: "Dirty data causes flakes.",
      5: "Shared users break parallel CI.",
      6: "Prove API and DB agree.",
      7: "Avoid coupling and pollution.",
      8: "Drill the SQL + seed habits.",
      9: "Automate the consistency checks.",
      10: "Series wrap-up.",
    },
  };
  return (map[part] && map[part][n]) || "Stay curious.";
}

function bodyFor(part, n) {
  if (part === 1 && n === 2) {
    return `<pre><code>const res = await fetch("http://127.0.0.1:4040/products");
console.log(res.status); // 200</code></pre>
<p>Assert <strong>status first</strong>, then body. Prefer 201 on create.</p>`;
  }
  if (part === 1 && n === 5) {
    return `<pre><code>function assert(c,m){ if(!c) throw new Error(m); }
assert(res.status===200,"status");
const p = await res.json();
assert(typeof p.title==="string","title");</code></pre>`;
  }
  if (part === 1 && n === 7) {
    return `<p>Run <code>npm run mock-api</code> then <code>npm run lab:part1</code>. Or use the mock playground above (offline).</p>`;
  }
  if (part === 2 && n === 2) {
    return `<pre><code>POST /auth/login { email, password } → { access_token }
Authorization: Bearer &lt;token&gt;</code></pre>`;
  }
  if (part === 2 && n === 4) {
    return `<table border="1" cellpadding="6"><tr><th>Case</th><th>Status</th></tr>
<tr><td>No auth on POST</td><td>401</td></tr><tr><td>Tester DELETE</td><td>403</td></tr>
<tr><td>Bad body</td><td>422</td></tr><tr><td>Missing id</td><td>404</td></tr></table>`;
  }
  if (part === 3 && n === 2) {
    return `<pre><code>SELECT id, title, price FROM products
WHERE price &gt;= 5 ORDER BY price DESC LIMIT 10;</code></pre>`;
  }
  if (part === 3 && n === 3) {
    return `<pre><code>SELECT o.id, u.email, p.title
FROM orders o
JOIN users u ON u.id = o.user_id
JOIN products p ON p.id = o.product_id;</code></pre>`;
  }
  if (part === 3 && n === 6) {
    return `<p>Pattern: seed → API call → SELECT/snapshot → assert → teardown. Lab: <code>npm run lab:part3</code>.</p>`;
  }
  return `<p>See the plain/interactive Markdown editions for full narrative and examples for this section.</p>`;
}

function quizFor(part, n) {
  const q = {
    "1-1": { q: "Where do API tests sit in the pyramid?", a: "Between unit and UI E2E" },
    "1-2": { q: "Best status for successful create?", a: "201" },
    "1-3": { q: "Collection URL for products?", a: "/products" },
    "1-4": { q: "Header for JSON body?", a: "Content-Type: application/json" },
    "2-1": { q: "Bearer header form?", a: "Authorization: Bearer &lt;token&gt;" },
    "2-3": { q: "Why negative tests?", a: "Catch auth/validation/security gaps" },
    "2-4": { q: "Authenticated but forbidden?", a: "403" },
    "3-1": { q: "Why SQL for testers?", a: "Verify stored state / source of truth" },
    "3-2": { q: "Filter clause?", a: "WHERE" },
    "3-3": { q: "Combine orders+users?", a: "JOIN" },
  };
  const item = q[part + "-" + n];
  if (!item) return "";
  return `<div class="quiz-box"><h3>🧪 Quick check</h3><details><summary>${item.q}</summary><p><span class="quiz-correct">✓ ${item.a}</span></p></details></div>`;
}

// Part 1
const p1 = app({
  part: 1,
  title: "HTTP & REST Foundations",
  subtitle: "Methods, status codes, assertions, Postman→code, first green smoke — with an offline mock playground.",
  sections: [
    "Why API testing",
    "HTTP methods & status codes",
    "REST resources & URLs",
    "Headers, query params, JSON bodies",
    "Assertions",
    "Postman → code",
    "First green smoke test",
    "Common pitfalls",
    "Practice exercises",
    "Challenges",
    "Answer key",
  ],
  mockHtml: `<div class="mock-api" id="mockPanel">
  <h3 style="margin-top:0;color:#67e8f9;">🔌 Offline mock API playground</h3>
  <p style="color:#cbd5e0;font-size:14px;">In-page fake server (no Node). Mirrors the real <code>mock-api</code> shapes.</p>
  <button type="button" onclick="mockRun1('GET','/health')">GET /health</button>
  <button type="button" onclick="mockRun1('GET','/products')">GET /products</button>
  <button type="button" onclick="mockRun1('GET','/products/1')">GET /products/1</button>
  <button type="button" onclick="mockRun1('GET','/products/9999')">GET /products/9999</button>
  <button type="button" onclick="mockRun1('POST','/products')">POST /products (auth)</button>
  <div class="out" id="mockOut1" role="status">Ready.</div>
</div>`,
  mockJs: `
  var mockDb = { products:[{id:1,title:"Notebook",price:4.5,stock:20},{id:2,title:"Pen Set",price:9.99,stock:50},{id:3,title:"USB Cable",price:7.25,stock:0}] };
  window.mockRun1 = function(method, path){
    var out = document.getElementById("mockOut1");
    var status=200, body;
    if (path==="/health") body={status:"ok",service:"in-page-mock"};
    else if (method==="GET" && path==="/products") body={data:mockDb.products,count:mockDb.products.length};
    else if (method==="GET" && path==="/products/1") body=mockDb.products[0];
    else if (method==="GET" && path==="/products/9999"){ status=404; body={error:"not_found"}; }
    else if (method==="POST" && path==="/products"){
      status=201; var row={id:99,title:"Sticker",price:1.5,stock:10}; mockDb.products.push(row); body=row;
    } else { status=404; body={error:"not_found"}; }
    out.textContent = status + " " + JSON.stringify(body,null,2);
    addXp(1);
  };
  `,
  srCards: [
    { q: "Safe HTTP method for reads?", a: "GET" },
    { q: "Create success status?", a: "201" },
    { q: "Missing resource status?", a: "404" },
    { q: "Postman pm.response.code → ?", a: "res.status / res.status()" },
    { q: "Assert order?", a: "status → headers → shape → business fields" },
  ],
  predicts: [
    { q: "GET /health status?", a: "200" },
    { q: "GET missing product?", a: "404" },
    { q: "POST create with auth?", a: "201" },
  ],
  spotbugs: [
    { t: "Wrong status on list", c: "expect(res.status).toBe(201)", f: "GET list → 200" },
    { t: "No JSON parse", c: "await fetch(url);", f: "await res.json() then assert" },
  ],
  challenges: [
    {
      name: "statusOk",
      prompt: "Write function statusOk(code) returning true only for 2xx.",
      starter: "function statusOk(code){\n  \n}",
      tests: 'statusOk(200)===true && statusOk(201)===true && statusOk(404)===false && statusOk(500)===false',
    },
    {
      name: "assertProductShape",
      prompt: "Return true if obj has id(number), title(string), price(number).",
      starter: "function assertProductShape(obj){\n  \n}",
      tests: 'assertProductShape({id:1,title:"a",price:1})===true && assertProductShape({id:"1",title:"a",price:1})===false',
    },
    {
      name: "pickTitles",
      prompt: "From {data:[{title}]} return titles array.",
      starter: "function pickTitles(body){\n  \n}",
      tests: 'JSON.stringify(pickTitles({data:[{title:"A"},{title:"B"}]}))===JSON.stringify(["A","B"])',
    },
  ],
  studyDays: ["Why API + methods", "REST URLs", "Headers/body", "Assertions", "Postman→code + lab", "Pitfalls + Spot-the-Bug", "Challenges + certificate"],
});

const p2 = app({
  part: 2,
  title: "Auth & Contracts",
  subtitle: "Bearer/API key, negative matrix, schema smoke — with a live auth mock.",
  sections: [
    "Auth types",
    "Login → token flow",
    "Negative testing mindset",
    "Status matrix",
    "Contract & JSON Schema smoke",
    "Idempotency, retries, flaky auth",
    "Common pitfalls",
    "Practice exercises",
    "Challenges",
    "Answer key",
  ],
  mockHtml: `<div class="mock-api">
  <h3 style="margin-top:0;color:#c4b5fd;">🔐 Auth mock</h3>
  <button type="button" onclick="authDemo2('login-ok')">Login OK</button>
  <button type="button" onclick="authDemo2('login-bad')">Login bad</button>
  <button type="button" onclick="authDemo2('post-noauth')">POST no auth</button>
  <button type="button" onclick="authDemo2('post-auth')">POST with Bearer</button>
  <button type="button" onclick="authDemo2('del-key')">DELETE with API key</button>
  <button type="button" onclick="authDemo2('schema')">Schema smoke sample</button>
  <div class="out" id="mockOut2" role="status">Ready.</div>
</div>`,
  mockJs: `
  var token2 = null;
  window.authDemo2 = function(action){
    var out=document.getElementById("mockOut2");
    var status, body;
    if(action==="login-ok"){ status=200; token2="demo-token-abc123"; body={access_token:token2,token_type:"Bearer"}; }
    else if(action==="login-bad"){ status=401; body={error:"invalid_credentials"}; }
    else if(action==="post-noauth"){ status=401; body={error:"unauthorized"}; }
    else if(action==="post-auth"){ status=token2?201:401; body=token2?{id:50,title:"Auth Widget",price:2,stock:1}:{error:"unauthorized"}; }
    else if(action==="del-key"){ status=403; body={error:"forbidden",message:"Admin only"}; }
    else if(action==="schema"){
      status=200;
      var row={id:1,title:"Notebook",price:4.5,stock:20};
      var schema={required:["id","title","price","stock"],properties:{id:{type:"integer"},title:{type:"string"},price:{type:"number"},stock:{type:"integer"}}};
      var ok = schema.required.every(function(k){return k in row;});
      body={row:row,schemaOk:ok};
    }
    out.textContent=status+" "+JSON.stringify(body,null,2);
    addXp(1);
  };
  `,
  srCards: [
    { q: "401 means?", a: "Not authenticated" },
    { q: "403 means?", a: "Authenticated but forbidden" },
    { q: "422 means?", a: "Validation failed" },
    { q: "Where does Bearer token go?", a: "Authorization header" },
    { q: "Schema smoke checks?", a: "Required keys + basic types" },
  ],
  predicts: [
    { q: "Bad password login?", a: "401" },
    { q: "Tester DELETE admin resource?", a: "403" },
    { q: "Empty title create?", a: "422" },
  ],
  spotbugs: [
    { t: "Expect 401 on role deny", c: "expect(status).toBe(401) // API key delete", f: "Use 403" },
    { t: "Token in query", c: "GET /x?access_token=...", f: "Use Authorization header" },
  ],
  challenges: [
    {
      name: "authHeader",
      prompt: "authHeader(token) returns {Authorization:'Bearer '+token}.",
      starter: "function authHeader(token){\n  \n}",
      tests: 'authHeader("abc").Authorization==="Bearer abc"',
    },
    {
      name: "isAuthError",
      prompt: "True for 401 or 403.",
      starter: "function isAuthError(code){\n  \n}",
      tests: "isAuthError(401)&&isAuthError(403)&&!isAuthError(404)",
    },
    {
      name: "requiredKeys",
      prompt: "requiredKeys(obj, keys) true if all keys present.",
      starter: "function requiredKeys(obj, keys){\n  \n}",
      tests: 'requiredKeys({a:1,b:2},["a","b"])===true && requiredKeys({a:1},["a","b"])===false',
    },
  ],
  studyDays: ["Auth types", "Login flow", "Negatives", "Status matrix + lab", "Schema", "Pitfalls", "Challenges"],
});

const p3 = app({
  part: 3,
  title: "Data & SQL for Testers",
  subtitle: "SELECT/JOIN, seed/teardown, API↔DB — with an in-memory SQL playground.",
  sections: [
    "Why testers need SQL",
    "SELECT / WHERE / ORDER / LIMIT",
    "JOIN basics",
    "Seed & teardown",
    "Test data strategies",
    "API ↔ DB verification",
    "Common pitfalls",
    "Practice exercises",
    "Challenges",
    "Answer key",
  ],
  extraCss: `.sql-play input{width:100%;box-sizing:border-box;padding:8px;margin:6px 0;font-family:Consolas,monospace}`,
  mockHtml: `<div class="mock-api sql-play">
  <h3 style="margin-top:0;color:#fbbf24;">🗄️ In-memory SQL playground</h3>
  <p style="color:#cbd5e0;font-size:14px;">Tiny parser: supports SELECT * FROM products|orders|users, simple WHERE stock = 0, and JOIN demo button.</p>
  <input id="sqlInput3" value="SELECT * FROM products" aria-label="SQL input">
  <button type="button" onclick="runSql3()">Run SQL</button>
  <button type="button" onclick="runJoin3()">Demo JOIN</button>
  <button type="button" onclick="resetDb3()">Reset seed</button>
  <button type="button" onclick="apiDbCheck3()">API↔DB check</button>
  <div class="out" id="mockOut3" role="status">Ready.</div>
</div>`,
  mockJs: `
  function seed3(){
    return {
      products:[{id:1,title:"Notebook",price:4.5,stock:20},{id:2,title:"Pen Set",price:9.99,stock:50},{id:3,title:"USB Cable",price:7.25,stock:0}],
      users:[{id:1,email:"admin@demo.test",role:"admin"},{id:2,email:"tester@demo.test",role:"tester"}],
      orders:[{id:101,user_id:2,product_id:1,qty:2,status:"paid"},{id:102,user_id:2,product_id:2,qty:1,status:"pending"}]
    };
  }
  var db3 = seed3();
  window.resetDb3 = function(){ db3=seed3(); document.getElementById("mockOut3").textContent="Seed reset."; addXp(1); };
  window.runSql3 = function(){
    var q=(document.getElementById("sqlInput3").value||"").trim().toLowerCase();
    var out=document.getElementById("mockOut3");
    var rows;
    if (/from products/.test(q)) rows=db3.products.slice();
    else if (/from orders/.test(q)) rows=db3.orders.slice();
    else if (/from users/.test(q)) rows=db3.users.slice();
    else { out.textContent="Supported: SELECT * FROM products|orders|users [WHERE stock = 0]"; return; }
    if (/where stock\\s*=\\s*0/.test(q)) rows=rows.filter(function(r){return r.stock===0;});
    out.textContent=JSON.stringify(rows,null,2);
    addXp(1);
  };
  window.runJoin3 = function(){
    var joined=db3.orders.map(function(o){
      var u=db3.users.find(function(x){return x.id===o.user_id;});
      var p=db3.products.find(function(x){return x.id===o.product_id;});
      return {order_id:o.id,email:u&&u.email,product:p&&p.title,qty:o.qty,status:o.status};
    });
    document.getElementById("mockOut3").textContent=JSON.stringify(joined,null,2);
    addXp(2);
  };
  window.apiDbCheck3 = function(){
    var apiOrders={data:db3.orders.slice(),count:db3.orders.length};
    var ok = apiOrders.count===db3.orders.length && apiOrders.data.every(function(r){
      return db3.orders.some(function(o){return o.id===r.id && o.status===r.status;});
    });
    document.getElementById("mockOut3").textContent = ok ? "✅ API↔DB consistent ("+apiOrders.count+" orders)" : "❌ drift detected";
    if (ok) addXp(5);
  };
  `,
  srCards: [
    { q: "Clause that filters?", a: "WHERE" },
    { q: "Combine tables?", a: "JOIN" },
    { q: "Why teardown?", a: "Prevent cross-test data pollution" },
    { q: "API↔DB pattern?", a: "seed → API → SELECT → assert → teardown" },
    { q: "Avoid in parallel CI?", a: "Shared mutable test users" },
  ],
  predicts: [
    { q: "stock = 0 products in seed?", a: "USB Cable (1 row)" },
    { q: "Compare api orders length to?", a: "db.orders length" },
    { q: "Best unique title strategy?", a: "Prefix + timestamp / uuid" },
  ],
  spotbugs: [
    { t: "Wrong table compare", c: "expect(apiOrders.length).toBe(db.products.length)", f: "Compare orders to orders" },
    { t: "No finally reset", c: "await create(); await assert();", f: "try/finally reset" },
  ],
  challenges: [
    {
      name: "stockOut",
      prompt: "stockOut(products) → titles where stock===0.",
      starter: "function stockOut(products){\n  \n}",
      tests: 'JSON.stringify(stockOut([{title:"A",stock:0},{title:"B",stock:2}]))===JSON.stringify(["A"])',
    },
    {
      name: "joinOrders",
      prompt: "joinOrders(orders,users,products) → [{order_id,email,product}].",
      starter: "function joinOrders(orders,users,products){\n  \n}",
      tests: 'JSON.stringify(joinOrders([{id:1,user_id:2,product_id:3}],[{id:2,email:"t@x"}],[{id:3,title:"Pen"}]))===JSON.stringify([{order_id:1,email:"t@x",product:"Pen"}])',
    },
    {
      name: "countsMatch",
      prompt: "countsMatch(apiCount, dbRows) true if equal lengths/counts.",
      starter: "function countsMatch(apiCount, dbRows){\n  \n}",
      tests: "countsMatch(2,[{},{}])===true && countsMatch(1,[{},{}])===false",
    },
  ],
  studyDays: ["Why SQL", "SELECT", "JOIN", "Seed/teardown", "Strategies", "API↔DB lab", "Challenges + certificate"],
});

fs.writeFileSync(path.join(root, "Api_data_essentials_part1_study_app.html"), p1);
fs.writeFileSync(path.join(root, "Api_data_essentials_part2_study_app.html"), p2);
fs.writeFileSync(path.join(root, "Api_data_essentials_part3_study_app.html"), p3);
console.log("Study apps written", p1.length, p2.length, p3.length);
