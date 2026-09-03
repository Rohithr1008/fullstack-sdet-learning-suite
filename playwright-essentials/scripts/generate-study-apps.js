#!/usr/bin/env node
/**
 * Generates Playwright Essentials study apps (Parts 0–5) with shared-shell markers.
 * Run: node scripts/generate-study-apps.js
 * Then: node scripts/inline-shell.js
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");

const PARTS = {
  0: {
    title: "Testing Mindset (Strategy)",
    short: "Strategy",
    color: "#0f766e",
    sections: [
      ["Why testing strategy exists", "strategy is how you choose what to automate — not how many tests you write"],
      ["The test pyramid", "many fast unit checks, fewer integration, fewest E2E"],
      ["Risk-based selection", "automate what hurts when it breaks"],
      ["When NOT to E2E", "E2E is slow, brittle, and expensive — use it for critical paths"],
      ["Flake vs product bug", "triage before you rewrite the suite"],
      ["Bug reports that help", "repro steps, expected vs actual, environment"],
      ["Definition of done for tests", "green locally + CI + readable failure"],
      ["Common strategy pitfalls", "100% E2E, testing implementation details, ignoring ROI"],
      ["Practice", "map a feature to pyramid layers"],
      ["Challenges", "classify scenarios into unit / API / E2E"],
      ["Answer key", "compare your classifications"],
    ],
    mockTitle: "Pyramid builder",
    mockHtml: `
<div class="chall interactive-tool" id="pyramidMock">
  <p>Click a layer to see what belongs there:</p>
  <div style="display:flex;flex-direction:column;align-items:center;gap:6px;max-width:360px;margin:12px auto;">
    <button type="button" class="btn" data-layer="e2e" style="width:40%;background:#9b2c2c;color:#fff;padding:10px;border:none;border-radius:8px;cursor:pointer;">E2E (few)</button>
    <button type="button" class="btn" data-layer="int" style="width:65%;background:#c05621;color:#fff;padding:10px;border:none;border-radius:8px;cursor:pointer;">Integration / API</button>
    <button type="button" class="btn" data-layer="unit" style="width:90%;background:#276749;color:#fff;padding:10px;border:none;border-radius:8px;cursor:pointer;">Unit (many)</button>
  </div>
  <p id="pyramidOut" role="status" style="text-align:center;font-weight:600;">Pick a layer…</p>
</div>`,
    mockJs: `
function pyramidClick(layer){
  var map={e2e:'Critical user journeys in a real browser. Slowest. Keep few.',int:'Service + DB or API contracts. Faster than UI. Catch wiring bugs.',unit:'Pure functions, components in isolation. Fast feedback.'};
  var el=document.getElementById('pyramidOut'); if(el) el.textContent=map[layer]||'';
}
document.querySelectorAll('#pyramidMock [data-layer]').forEach(function(b){
  b.addEventListener('click', function(){ pyramidClick(b.getAttribute('data-layer')); });
});`,
    quizzes: [
      ["What does the test pyramid recommend?", "Many unit tests, fewer integration, fewest E2E.", "Mostly E2E because they catch everything"],
      ["When is E2E a poor fit?", "Validating a pure date-format helper.", "Checking login → checkout happy path"],
      ["A flake is…", "A test that fails intermittently without a product change.", "Always a product regression"],
    ],
    predicts: [
      ["You have 200 E2E and 5 unit tests. What usually happens?", "CI gets slow and brittle; feedback arrives late."],
      ["A utility formats currency. Best level?", "Unit test — no browser needed."],
    ],
    spotbugs: [
      ["Suite only has E2E for every bug. What’s wrong?", "Missing cheaper lower-level coverage; high maintenance."],
      ["Test asserts CSS class names for a button.", "Couples to implementation; prefer role/name."],
    ],
    srs: [
      ["Test pyramid", "Many fast unit, fewer integration, fewest E2E"],
      ["When not to E2E", "Pure logic, static content, already covered cheaper"],
      ["Flake", "Intermittent failure without intentional product change"],
      ["DoD for a test", "Deterministic, clear failure, runs in CI"],
    ],
    challenges: [
      { name: "classifyLevel", prompt: "Return 'unit'|'api'|'e2e' for scenario string keywords.", starter: "function classifyLevel(scenario){\n  // TODO\n}\n", tests: `assert(classifyLevel('pure function add(a,b)')==='unit');assert(classifyLevel('REST GET /users status 200')==='api');assert(classifyLevel('user logs in and checks out')==='e2e');` },
    ],
  },
  1: {
    title: "Foundations",
    short: "Foundations",
    color: "#2b6cb0",
    sections: [
      ["What E2E is (vs unit/integration)", "E2E drives a real browser like a user"],
      ["Strategy slice — pyramid & when not to E2E", "reuse Part 0; keep E2E for critical paths"],
      ["Why Playwright", "auto-wait, multi-browser, tracing, codegen"],
      ["Install & browsers", "npm i -D @playwright/test && npx playwright install"],
      ["test() and expect()", "the smallest green test"],
      ["First visit + assert", "goto, getByRole, toBeVisible"],
      ["Codegen intro", "npx playwright codegen — then clean the script"],
      ["Config basics", "baseURL, projects, webServer"],
      ["Headed vs headless", "debug with --headed / UI mode"],
      ["Traces & screenshots on fail", "trace: on-first-retry"],
      ["Common pitfalls", "hard waits, CSS-only locators, no baseURL"],
      ["Practice", "run labs/part1"],
      ["Challenges", "write assertions as pure helpers"],
      ["Answer key", "solutions"],
    ],
    mockTitle: "Fake test runner",
    mockHtml: `
<div class="chall interactive-tool" id="runnerMock">
  <p>Press Run to watch a fake Playwright timeline:</p>
  <ol id="runnerSteps" style="font-family:ui-monospace,monospace;"></ol>
  <button type="button" class="btn" id="runnerGo" style="padding:8px 14px;background:#1e40af;color:#fff;border:none;border-radius:8px;cursor:pointer;">▶ Run fake test</button>
  <button type="button" class="btn" id="runnerReset" style="padding:8px 14px;background:#4a5568;color:#fff;border:none;border-radius:8px;cursor:pointer;">Reset</button>
</div>`,
    mockJs: `
var runnerTimer=null;
function runnerReset(){
  if(runnerTimer) clearTimeout(runnerTimer);
  var ol=document.getElementById('runnerSteps'); if(ol) ol.innerHTML='';
}
function runnerGo(){
  runnerReset();
  var steps=['test.start','page.goto(/)','expect(heading).toBeVisible','test.passed ✓'];
  var i=0; var ol=document.getElementById('runnerSteps');
  function tick(){
    if(i>=steps.length) return;
    var li=document.createElement('li'); li.textContent=steps[i++]; ol.appendChild(li);
    runnerTimer=setTimeout(tick,450);
  }
  tick();
}
var rg=document.getElementById('runnerGo'); if(rg) rg.onclick=runnerGo;
var rr=document.getElementById('runnerReset'); if(rr) rr.onclick=runnerReset;`,
    quizzes: [
      ["Playwright auto-waiting means…", "Actions/assertions retry until timeout instead of needing sleep.", "You must always use waitForTimeout"],
      ["baseURL helps because…", "Tests can use relative paths like '/login'.", "It replaces expect()"],
      ["Codegen is best used to…", "Bootstrap selectors, then refactor for clarity.", "Commit raw recordings forever"],
    ],
    predicts: [
      ["await page.waitForTimeout(5000) in every test → ?", "Slow, flaky suite; prefer auto-wait + assertions."],
      ["expect(locator).toBeVisible() fails → ?", "Playwright waited up to timeout; check locator/trace."],
    ],
    spotbugs: [
      ["page.click('.btn:nth-child(3)') only", "Brittle CSS; prefer getByRole/name."],
      ["No webServer; tests hit random ports", "Configure webServer + baseURL in playwright.config."],
    ],
    srs: [
      ["E2E", "Browser-level user journey test"],
      ["expect", "Playwright assertion API with auto-retry"],
      ["trace", "Timeline + DOM snapshots for debugging failures"],
      ["codegen", "Record actions to generate a starter script"],
    ],
    challenges: [
      { name: "pickLocatorStyle", prompt: "Prefer role over css: return true if locator starts with getByRole/getByLabel/getByText/getByTestId", starter: "function pickLocatorStyle(code){\n  // TODO\n}\n", tests: `assert(pickLocatorStyle("getByRole('button',{name:'Save'})")===true);assert(pickLocatorStyle("locator('.x > div')")===false);` },
    ],
  },
  2: {
    title: "Locators & Actions",
    short: "Locators",
    color: "#38a169",
    sections: [
      ["Locator philosophy", "user-facing first: role, label, text, test id"],
      ["getByRole / Label / Text / TestId", "the everyday toolkit"],
      ["CSS & XPath sparingly", "escape hatches, not defaults"],
      ["Clicks, fill, select, check", "actions that auto-wait"],
      ["Auto-waiting & timeouts", "understand actionability"],
      ["Frames, dialogs, downloads", "special page events"],
      ["Soft assertions", "collect multiple failures"],
      ["Flaky locator Spot-the-Bug", "tighten selectors"],
      ["Practice on ShopLite forms", "labs/part2"],
      ["Challenges", "normalize locator choice"],
      ["Answer key", "solutions"],
    ],
    mockTitle: "Locator chooser",
    mockHtml: `
<div class="chall interactive-tool" id="locMock">
  <p>Pick the best locator for: <em>Submit order</em> button</p>
  <label><input type="radio" name="loc" value="role"> getByRole('button', { name: 'Submit order' })</label><br>
  <label><input type="radio" name="loc" value="css"> locator('div > span > button.btn-3')</label><br>
  <label><input type="radio" name="loc" value="xpath"> locator('//*[@id=\"x\"]/button[2]')</label><br>
  <button type="button" id="locCheck" style="margin-top:8px;padding:8px 14px;background:#1e40af;color:#fff;border:none;border-radius:8px;cursor:pointer;">Check</button>
  <p id="locOut" role="status"></p>
</div>`,
    mockJs: `
var lc=document.getElementById('locCheck');
if(lc) lc.onclick=function(){
  var v=(document.querySelector('input[name=loc]:checked')||{}).value;
  var out=document.getElementById('locOut');
  out.textContent=v==='role'?'✓ Best — mirrors how users/AT find it.':v?'Not ideal — brittle to DOM churn.':'Pick one.';
  out.className=v==='role'?'quiz-correct':'quiz-wrong';
};`,
    quizzes: [
      ["Preferred locator for a labeled input?", "getByLabel('Email')", "xpath to the 4th input"],
      ["page.on('dialog') is needed when…", "alert/confirm/prompt appears", "navigating to a new URL"],
      ["Soft expect helps to…", "See multiple assertion failures in one run", "Skip waiting"],
    ],
    predicts: [
      ["Two buttons named Save — getByRole without filter → ?", "Strict mode violation; narrow with exact/has."],
      ["fill() on a disabled input → ?", "Timeout — not actionable."],
    ],
    spotbugs: [
      ["getByText('Save') matches a paragraph too", "Use getByRole('button',{name:'Save'}) or exact."],
      ["Ignoring iframe for inner button", "Use frameLocator before clicking."],
    ],
    srs: [
      ["getByRole", "Locate by ARIA role + accessible name"],
      ["Actionability", "Visible, enabled, stable before action"],
      ["frameLocator", "Scope locators inside an iframe"],
      ["soft expect", "Continue after failure; report all"],
    ],
    challenges: [
      { name: "scoreLocator", prompt: "Score 2 for role/label/testid, 1 for text, 0 for css/xpath keywords", starter: "function scoreLocator(s){\n  // TODO\n}\n", tests: `assert(scoreLocator("getByRole")==2);assert(scoreLocator("getByText")==1);assert(scoreLocator("xpath")==0);` },
    ],
  },
  3: {
    title: "Architecture (POM, fixtures, auth)",
    short: "Architecture",
    color: "#6b46c1",
    sections: [
      ["Why architecture matters", "suites grow; structure keeps them readable"],
      ["Page Object Model", "page class owns locators + flows"],
      ["Fixtures", "inject custom pages / data"],
      ["describe, hooks, projects", "organize + multi-browser"],
      ["env + baseURL", "one config, many environments"],
      ["APIRequestContext overview", "API depth → future API & Data kit"],
      ["Authentication + storageState", "login once, reuse cookies"],
      ["Parallelization basics", "workers, isolation"],
      ["Practice — refactor to POM", "labs/part3"],
      ["Challenges", "design a tiny POM API"],
      ["Answer key", "solutions"],
    ],
    mockTitle: "POM spotlight",
    mockHtml: `
<div class="chall interactive-tool" id="pomMock">
  <p>Click pieces of a Page Object flow:</p>
  <div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:center;">
    <button type="button" data-pom="page" style="padding:10px;background:#553c9a;color:#fff;border:none;border-radius:8px;">LoginPage</button>
    <span>→</span>
    <button type="button" data-pom="loc" style="padding:10px;background:#2b6cb0;color:#fff;border:none;border-radius:8px;">locators</button>
    <span>→</span>
    <button type="button" data-pom="act" style="padding:10px;background:#276749;color:#fff;border:none;border-radius:8px;">signIn()</button>
  </div>
  <p id="pomOut" role="status" style="text-align:center;font-weight:600;"></p>
</div>`,
    mockJs: `
var pomMap={page:'Owns the URL + elements for one screen.',loc:'getByLabel / getByTestId live on the page object.',act:'A flow method: fill + click + wait for navigation.'};
document.querySelectorAll('#pomMock [data-pom]').forEach(function(b){
  b.onclick=function(){ document.getElementById('pomOut').textContent=pomMap[b.getAttribute('data-pom')]; };
});`,
    quizzes: [
      ["storageState is for…", "Reusing authenticated cookies/localStorage across tests", "Storing screenshots"],
      ["API testing in this series is…", "An overview; deep REST/SQL lives in API & Data Essentials", "The main focus of Part 3"],
      ["A fixture helps you…", "Share setup (e.g. logged-in page) without copy-paste", "Replace expect()"],
    ],
    predicts: [
      ["Login in beforeEach of 50 tests → ?", "Slow; prefer storageState setup project."],
      ["POM method returns void after navigation → ?", "OK; next page object can take over."],
    ],
    spotbugs: [
      ["Giant God-page with every selector in the app", "Split by page/area; keep methods small."],
      ["Deep SQL assertions inside UI tests here", "Point that work to the API & Data kit."],
    ],
    srs: [
      ["POM", "Encapsulate page locators and flows"],
      ["Fixture", "Playwright test.extend shared setup"],
      ["storageState", "Saved auth storage for reuse"],
      ["project", "Named browser/config slice in playwright.config"],
    ],
    challenges: [
      { name: "pomMethodName", prompt: "Return camelCase flow name from words join with space", starter: "function pomMethodName(words){\n  // TODO\n}\n", tests: `assert(pomMethodName('sign in')==='signIn');assert(pomMethodName('add to cart')==='addToCart');` },
    ],
  },
  4: {
    title: "Reliability & Quality",
    short: "Advanced",
    color: "#b45309",
    sections: [
      ["Network mocking / routing", "page.route to stub APIs"],
      ["Clock / time", "control timers for deterministic UI"],
      ["Visual comparisons (light)", "screenshots as optional guardrails"],
      ["Accessibility with axe", "catch serious a11y regressions"],
      ["Mobile projects", "device descriptors"],
      ["Debugging: UI mode, trace, --debug", "see what the browser saw"],
      ["Flake triage", "isolate, quarantine, fix root cause"],
      ["Test data strategies", "factories, seeds, cleanup"],
      ["Practice", "labs/part4"],
      ["Challenges", "design a route mock"],
      ["Answer key", "solutions"],
    ],
    mockTitle: "Network stub timeline",
    mockHtml: `
<div class="chall interactive-tool" id="netMock">
  <button type="button" id="netPlay" style="padding:8px 14px;background:#1e40af;color:#fff;border:none;border-radius:8px;cursor:pointer;">Simulate mocked checkout</button>
  <ol id="netSteps" style="font-family:ui-monospace,monospace;"></ol>
</div>`,
    mockJs: `
var np=document.getElementById('netPlay');
if(np) np.onclick=function(){
  var ol=document.getElementById('netSteps'); ol.innerHTML='';
  ['page.route(/api/checkout)','UI clicks Place order','fulfill {orderId:PW-42}','expect status text'].forEach(function(s){
    var li=document.createElement('li'); li.textContent=s; ol.appendChild(li);
  });
};`,
    quizzes: [
      ["page.route is useful to…", "Stub backend responses for UI tests", "Replace locators"],
      ["axe in CI should fail on…", "Critical/serious violations you choose to gate", "Every minor contrast tip forever without triage"],
      ["A flake fix starts with…", "Reproducing with trace/UI mode", "Deleting the test silently"],
    ],
    predicts: [
      ["Mock returns 500 → UI error path can be tested", "Yes — negative paths without a broken backend."],
      ["Visual snapshot on every pixel of a live clock → ?", "Constant false fails; mask dynamic regions."],
    ],
    spotbugs: [
      ["route never unrouted and leaks into next test", "Use test isolation; prefer route in-test or auto fixtures."],
      ["Ignoring axe serious on checkout form", "Gate serious issues; fix unlabeled inputs."],
    ],
    srs: [
      ["page.route", "Intercept and mock network"],
      ["axe", "Automated accessibility rules engine"],
      ["trace viewer", "Time-travel debug for failures"],
      ["flake", "Intermittent test failure"],
    ],
    challenges: [
      { name: "isSeriousImpact", prompt: "Return true for critical or serious", starter: "function isSeriousImpact(impact){\n  // TODO\n}\n", tests: `assert(isSeriousImpact('critical')===true);assert(isSeriousImpact('serious')===true);assert(isSeriousImpact('minor')===false);` },
    ],
  },
  5: {
    title: "CI, Scale & Professional Workflow",
    short: "CI & Scale",
    color: "#be185d",
    sections: [
      ["GitHub Actions + Playwright", "install browsers, run tests"],
      ["Artifacts: report & traces", "upload on failure"],
      ["Sharding overview", "split suite across jobs"],
      ["Tagging / grep", "@smoke vs full"],
      ["Cloud browsers overview", "when local CI browsers aren’t enough"],
      ["Reporting & definition of done", "readable failures for the team"],
      ["Common CI pitfalls", "missing deps, no artifacts, flaky quarantine"],
      ["Component testing overview (optional)", "not the focus — know it exists"],
      ["Practice — kit workflow", ".github/workflows/verify.yml"],
      ["Challenges + certificate", "finish the series"],
      ["Answer key", "solutions"],
    ],
    mockTitle: "Push → CI runner",
    mockHtml: `
<div class="chall interactive-tool" id="ciMock">
  <button type="button" id="ciGo" style="padding:8px 14px;background:#1e40af;color:#fff;border:none;border-radius:8px;cursor:pointer;">Simulate push</button>
  <ol id="ciSteps"></ol>
</div>`,
    mockJs: `
var cg=document.getElementById('ciGo');
if(cg) cg.onclick=function(){
  var ol=document.getElementById('ciSteps'); ol.innerHTML='';
  ['checkout','npm ci','playwright install chromium','playwright test','upload report (on failure)'].forEach(function(s,i){
    setTimeout(function(){ var li=document.createElement('li'); li.textContent=(i+1)+'. '+s; ol.appendChild(li); }, i*400);
  });
};`,
    quizzes: [
      ["Why upload traces on failure?", "So you can debug without re-running blindly on a laptop", "To make CI slower always"],
      ["Sharding means…", "Splitting tests across parallel CI jobs", "Deleting half the suite"],
      ["Cloud browser grids help when…", "You need many browsers/OS combos beyond self-hosted runners", "You want to skip assertions"],
    ],
    predicts: [
      ["CI green locally red → ?", "Check browser deps, baseURL, secrets, timing."],
      ["--shard=1/3 runs… ?", "Approximately one third of the tests."],
    ],
    spotbugs: [
      ["No artifact upload; CI fails with 'timeout'", "Upload html-report + traces on failure."],
      ["Running headed tests in GHA by default", "Prefer headless; use headed only for debug jobs."],
    ],
    srs: [
      ["artifact", "Saved CI file (report/trace) for download"],
      ["shard", "Partition tests across workers/jobs"],
      ["@smoke", "Tag for a fast critical subset"],
      ["cloud browsers", "Hosted browser grid (BrowserStack, etc.)"],
    ],
    challenges: [
      { name: "shardSlice", prompt: "Return true if testIndex belongs to shard (1-based) of totalShards", starter: "function shardSlice(testIndex, shard, totalShards){\n  // TODO\n}\n", tests: `assert(shardSlice(0,1,2)===true);assert(shardSlice(1,1,2)===false);assert(shardSlice(1,2,2)===true);` },
    ],
  },
};

function challengeSolution(name) {
  const map = {
    classifyLevel: `function classifyLevel(scenario){
  const s=String(scenario).toLowerCase();
  if(/user |logs in|checkout|browser/.test(s)) return 'e2e';
  if(/rest|get \\/|api|status 200/.test(s)) return 'api';
  return 'unit';
}`,
    pickLocatorStyle: `function pickLocatorStyle(code){
  return /getBy(Role|Label|Text|TestId)/.test(code);
}`,
    scoreLocator: `function scoreLocator(s){
  if(/getByRole|getByLabel|getByTestId/.test(s)) return 2;
  if(/getByText/.test(s)) return 1;
  return 0;
}`,
    pomMethodName: `function pomMethodName(words){
  return String(words).trim().split(/\\s+/).map((w,i)=>i===0?w.toLowerCase():w[0].toUpperCase()+w.slice(1).toLowerCase()).join('');
}`,
    isSeriousImpact: `function isSeriousImpact(impact){
  return impact==='critical'||impact==='serious';
}`,
    shardSlice: `function shardSlice(testIndex, shard, totalShards){
  return (testIndex % totalShards) === (shard - 1);
}`,
  };
  return map[name] || "function noop(){}";
}

function buildApp(n, meta) {
  const total = meta.sections.length;
  const partNav = [0, 1, 2, 3, 4, 5]
    .map((p) => {
      if (p === n) return `<strong>${p === 0 ? "0 Strategy" : p + " " + PARTS[p].short}</strong>`;
      return `<a href="Playwright_essentials_part${p}_study_app.html">${p === 0 ? "0 Strategy" : p + " " + PARTS[p].short}</a>`;
    })
    .join("\n  ");

  const sectionHtml = meta.sections
    .map((s, i) => {
      const num = i + 1;
      return `
<section id="sec${num}" data-section="${num}">
  <h2>${num}. ${s[0]}</h2>
  <div class="why">🚩 <strong>Why it matters:</strong> ${s[1]}</div>
  <p>Read the plain/interactive markdown for full notes, then mark this section complete.</p>
  <div class="mood" role="group" aria-label="Mood check section ${num}">
    <span>Mood:</span>
    <input type="radio" name="mood${n}_${num}" id="m${n}_${num}a"><label for="m${n}_${num}a">😅 Stuck</label>
    <input type="radio" name="mood${n}_${num}" id="m${n}_${num}b"><label for="m${n}_${num}b">😐 OK</label>
    <input type="radio" name="mood${n}_${num}" id="m${n}_${num}c"><label for="m${n}_${num}c">😄 Clear</label>
  </div>
  <p><button type="button" class="mark-btn section-complete-btn" data-mark="${num}" onclick="toggleSection${n}(${num})">Mark Complete</button></p>
</section>`;
    })
    .join("\n");

  const quizHtml = meta.quizzes
    .map(
      (q, i) => `
<div class="quiz-box">
  <h3>Quiz ${i + 1}</h3>
  <p>${q[0]}</p>
  <details><summary>Show answer</summary>
    <p class="quiz-correct">✓ ${q[1]}</p>
    <p class="quiz-wrong">✗ Not: ${q[2]}</p>
  </details>
</div>`
    )
    .join("\n");

  const predictHtml = `<div class="predict">${meta.predicts
    .map(
      (p) =>
        `<details><summary>${p[0]}</summary><p>${p[1]}</p></details>`
    )
    .join("")}</div>`;

  const spotHtml = `<div class="spotbug">${meta.spotbugs
    .map(
      (p) =>
        `<details><summary>🐞 ${p[0]}</summary><p>${p[1]}</p></details>`
    )
    .join("")}</div>`;

  const challengeHtml = meta.challenges
    .map((c, i) => {
      const idx = i + 1;
      return `
<div class="chall challenge" id="chal${n}_${idx}">
  <h3>Challenge ${idx}: ${c.name}</h3>
  <p>${c.prompt}</p>
  <p><span style="background:#ebf8ff;border:1px solid #2b6cb0;border-radius:999px;padding:2px 10px;font-size:12px;color:#1a365d;">🟡 medium · ~10 min</span></p>
  <details class="hint"><summary>💡 Hint</summary><p>Keep it a pure function. Match the test strings exactly.</p></details>
  <label for="code${n}_${idx}">Your code</label>
  <textarea id="code${n}_${idx}" class="code-editor" rows="8">${c.starter}</textarea>
  <p><button type="button" onclick="runTest${n}(${idx})">Run tests</button></p>
  <pre id="out${n}_${idx}" role="status"></pre>
</div>`;
    })
    .join("\n");

  const testsObj = meta.challenges
    .map((c, i) => `  ${i + 1}: ${JSON.stringify(c.tests)}`)
    .join(",\n");

  const solutionsObj = meta.challenges
    .map((c, i) => `  ${i + 1}: ${JSON.stringify(challengeSolution(c.name))}`)
    .join(",\n");

  const srsJson = JSON.stringify(meta.srs.map((x) => ({ q: x[0], a: x[1] })));

  const planDays = meta.sections
    .slice(0, 7)
    .map((s, i) => `<li><strong>Day ${i + 1}:</strong> ${s[0]}</li>`)
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Playwright Essentials — Part ${n}: ${meta.title}</title>
<style>
body{margin:0 auto;max-width:920px;padding:16px 18px 64px;font:16px/1.55 "Segoe UI",system-ui,sans-serif;background:#f7f9fc;color:#1a202c;}
h1{color:${meta.color};}
h2{border-bottom:2px solid #e2e8f0;padding-bottom:6px;margin-top:28px;}
pre,code,textarea{font-family:ui-monospace,Consolas,monospace;}
textarea{width:100%;border:1px solid #a0aec0;border-radius:8px;padding:10px;}
.totop{position:fixed;right:16px;bottom:16px;}
<!-- SHARED-SHELL-CSS:START -->
/* placeholder — run node scripts/inline-shell.js */
<!-- SHARED-SHELL-CSS:END -->
</style>
</head>
<body>
<a class="skip-link" href="#progressBar">Skip to content</a>

<h1>Playwright Essentials — Part ${n}: ${meta.title}</h1>

<div class="partnav" aria-label="Part navigation">
  <a href="index.html">Hub</a>
  ${partNav}
</div>

<button id="themeBtn" class="theme-btn" onclick="toggleTheme${n}()" aria-label="Toggle light/dark theme">🌙 Dark mode</button>

<div style="display:flex;gap:6px;flex-wrap:wrap;margin:4px 0 8px 0;align-items:center;">
  <span style="font-weight:600;">Size:</span>
  <button type="button" onclick="fontZoom${n}(-1)" aria-label="Decrease text size">A−</button>
  <button type="button" onclick="fontZoom${n}(0)" aria-label="Reset text size">A</button>
  <button type="button" onclick="fontZoom${n}(1)" aria-label="Increase text size">A+</button>
  <button type="button" onclick="collapseAll${n}(true)" aria-label="Expand all quiz answers">📖 Expand all</button>
  <button type="button" onclick="collapseAll${n}(false)" aria-label="Collapse all quiz answers">📕 Collapse all</button>
  <button type="button" id="focusBtn${n}" onclick="focusMode${n}(this)" aria-pressed="false">🧘 Focus Mode</button>
</div>
<div id="focusHint${n}" style="display:none;background:#eef2ff;border:2px solid #5a67d8;border-radius:8px;padding:8px 14px;margin:6px 0;color:#3730a3;font-weight:600;">Focus Mode ON — panels hidden. Toggle again to restore.</div>

<p>ADHD-friendly E2E study app: why-it-matters, quizzes, predicts, Spot-the-Bug, live mock, labs on <code>demo-app/</code>.</p>

<div id="progressBar" style="background:#2d3748;border-radius:8px;padding:10px 16px;margin:10px 0;color:#e2e8f0;font-weight:600;text-align:center;">📊 Progress: 0/${total} sections (0%)</div>

<div id="boostBar" style="background:#1a202c;border:2px solid #dd6b20;border-radius:12px;padding:12px 16px;margin:12px 0;color:#e2e8f0;display:flex;flex-wrap:wrap;gap:12px;align-items:center;justify-content:space-between;">
  <div>⚡ <span id="streakCount${n}" style="color:#fbbf24;">0-day streak</span></div>
  <div>⭐ <span id="pointCount${n}" style="color:#fbbf24;">0 XP</span></div>
  <button type="button" onclick="boostSurprise${n}()" aria-label="Surprise me: jump to a random section">🎲 Surprise me</button>
  <button type="button" onclick="startFocusTimer${n}()" aria-label="Start or stop a 25 minute focus sprint">🧠 Focus sprint</button>
  <span id="focusTimer${n}" style="font-weight:700;color:#68d391;">⏱ 25:00</span>
</div>
<div id="toastZone" style="position:fixed;top:16px;right:16px;z-index:999;"></div>
<canvas id="confettiCanvas" style="position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:998;display:none;"></canvas>

<div id="learningPathPanel" style="background:#2d3748;border:2px solid #805ad5;border-radius:12px;padding:16px 20px;margin:16px 0;">
  <h3 style="color:#b794f4;margin-top:0;">🧭 Learning Path</h3>
  <div id="learningPathContent${n}" style="color:#e2e8f0;">Mark sections complete for recommendations…</div>
</div>

<div id="spacedRepetitionPanel" style="background:#2d3748;border:2px solid #319795;border-radius:12px;padding:16px 20px;margin:16px 0;">
  <h3 style="color:#4fd1c5;margin-top:0;">🃏 Spaced Repetition</h3>
  <div id="srCard${n}" style="background:#1a202c;border-radius:8px;padding:16px;text-align:center;">
    <p id="srQuestion${n}" style="color:#e2e8f0;">Click Start Review</p>
    <p id="srAnswer${n}" style="color:#68d391;display:none;"></p>
    <div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap;">
      <button type="button" onclick="startSRReview${n}()">Start Review</button>
      <button type="button" onclick="srToggleShuffle${n}()" id="srShuffleBtn${n}">🔀 Shuffle: Off</button>
      <button type="button" onclick="showSRAnswer${n}()">Show answer</button>
      <button type="button" onclick="srKnow${n}(true)">Got it</button>
      <button type="button" onclick="srKnow${n}(false)">Again</button>
    </div>
    <div id="srStats${n}" style="color:#a0aec0;font-size:12px;margin-top:10px;"></div>
  </div>
</div>

<nav aria-label="Section list" id="scrollspy${n}" style="position:sticky;top:0;background:#edf2f7;padding:8px;border-radius:8px;z-index:5;display:flex;flex-wrap:wrap;gap:6px;font-size:13px;"></nav>

<h2>Live mock — ${meta.mockTitle}</h2>
${meta.mockHtml}

${sectionHtml}

<h2>Quizzes</h2>
${quizHtml}

<h2>Predict the outcome</h2>
${predictHtml}

<h2>Spot-the-Bug</h2>
${spotHtml}

<details class="studyplan7"><summary>📅 7-day study plan</summary><ol>${planDays}</ol></details>

<h2>Auto-graded challenges</h2>
${challengeHtml}

<div class="certificate" id="certificate${n}" hidden>
  <h2>🏆 Certificate</h2>
  <p class="big">Playwright Essentials — Part ${n}</p>
  <p>You completed all ${total} sections. Nice work.</p>
</div>

<p><a class="totop" href="#progressBar">Top</a></p>

<script>
<!-- SHARED-SHELL-JS:START -->
/* placeholder — run node scripts/inline-shell.js */
<!-- SHARED-SHELL-JS:END -->
</script>
<script>
(function(){
"use strict";
var PART=${n};
var TOTAL=${total};
var P_TESTS={
${testsObj}
};
var P_SOLUTIONS={
${solutionsObj}
};
var srCards=${srsJson};
var srIndex=0, srShuffle=false;

function key(sec){ return "pw"+PART+"-sec-"+sec; }
function boostKey(){ return "pw"+PART+"-boost"; }

function toggleTheme${n}(){ StudyShell.toggleTheme("pw"+PART+"-theme","themeBtn"); }
function fontZoom${n}(d){ StudyShell.fontZoom(d,"pw"+PART+"-font"); }
function focusMode${n}(btn){ return StudyShell.focusMode(btn,"focusHint"+PART); }
function collapseAll${n}(expand){ StudyShell.collapseDetails(expand); }

function readBoost(){
  try{ return JSON.parse(localStorage.getItem(boostKey())||"{\\"xp\\":0,\\"streak\\":0}"); }catch(e){ return {xp:0,streak:0}; }
}
function writeBoost(b){
  localStorage.setItem(boostKey(), JSON.stringify(b));
  var s=document.getElementById("streakCount"+PART); if(s) s.textContent=b.streak+"-day streak";
  var p=document.getElementById("pointCount"+PART); if(p) p.textContent=b.xp+" XP";
}
function toast(msg){
  var z=document.getElementById("toastZone"); if(!z) return;
  var d=document.createElement("div"); d.textContent=msg; d.style.cssText="background:#2d3748;color:#fff;padding:8px 12px;border-radius:8px;margin-bottom:6px;";
  z.appendChild(d); setTimeout(function(){ d.remove(); },1800);
}
function confetti(){
  var c=document.getElementById("confettiCanvas"); if(!c||!c.getContext) return;
  if(window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  c.style.display="block"; var ctx=c.getContext("2d"); c.width=innerWidth; c.height=innerHeight;
  var bits=[]; for(var i=0;i<40;i++) bits.push({x:Math.random()*c.width,y:Math.random()*c.height/2,vy:2+Math.random()*3,c:"#"+(Math.random()*0xffffff|0).toString(16)});
  var n=0; (function frame(){ ctx.clearRect(0,0,c.width,c.height); bits.forEach(function(b){ b.y+=b.vy; ctx.fillStyle=b.c; ctx.fillRect(b.x,b.y,4,6); }); if(++n<40) requestAnimationFrame(frame); else c.style.display="none"; })();
}

function updateProgress${n}(){
  var done=0; for(var i=1;i<=TOTAL;i++) if(localStorage.getItem(key(i))==="1") done++;
  var pct=Math.round(done/TOTAL*100);
  var bar=document.getElementById("progressBar");
  if(bar) bar.textContent="📊 Progress: "+done+"/"+TOTAL+" sections ("+pct+"%)";
  document.querySelectorAll("[data-mark]").forEach(function(btn){
    var n=Number(btn.getAttribute("data-mark"));
    var on=localStorage.getItem(key(n))==="1";
    btn.classList.toggle("done", on); btn.textContent=on?"Completed ✓":"Mark Complete";
  });
  var cert=document.getElementById("certificate"+PART);
  if(cert) cert.hidden = done!==TOTAL;
  updateLearningPath${n}(done);
}

function toggleSection${n}(n){
  var on=localStorage.getItem(key(n))==="1";
  if(on) localStorage.removeItem(key(n)); else {
    localStorage.setItem(key(n),"1");
    var b=readBoost(); b.xp+=10; b.streak=Math.max(1,b.streak); writeBoost(b); toast("+10 XP"); confetti();
  }
  updateProgress${n}();
}

function updateLearningPath${n}(done){
  var el=document.getElementById("learningPathContent"+PART); if(!el) return;
  if(done===0) el.textContent="Start with section 1 — and skim the live mock.";
  else if(done<TOTAL) el.textContent="Next: open the first incomplete section. Run labs/part"+PART+" when ready.";
  else el.textContent="Part complete! Grab the certificate and move to the next part.";
}

function boostSurprise${n}(){
  var n=1+Math.floor(Math.random()*TOTAL);
  var t=document.getElementById("sec"+n); if(t) t.scrollIntoView({behavior:"smooth"});
}
var timerId=null, left=25*60;
function startFocusTimer${n}(){
  var label=document.getElementById("focusTimer"+PART);
  if(timerId){ clearInterval(timerId); timerId=null; left=25*60; if(label) label.textContent="⏱ 25:00"; return; }
  timerId=setInterval(function(){
    left--; var m=String(Math.floor(left/60)).padStart(2,"0"); var s=String(left%60).padStart(2,"0");
    if(label) label.textContent="⏱ "+m+":"+s;
    if(left<=0){ clearInterval(timerId); timerId=null; toast("Sprint done"); left=25*60; }
  },1000);
}

function startSRReview${n}(){
  srIndex=0; renderSR();
}
function srToggleShuffle${n}(){
  srShuffle=!srShuffle;
  var b=document.getElementById("srShuffleBtn"+PART); if(b) b.textContent="🔀 Shuffle: "+(srShuffle?"On":"Off");
  if(srShuffle) srCards=srCards.slice().sort(function(){ return Math.random()-0.5; });
}
function renderSR(){
  var card=srCards[srIndex%srCards.length];
  var q=document.getElementById("srQuestion"+PART); var a=document.getElementById("srAnswer"+PART);
  if(q) q.textContent=card.q; if(a){ a.style.display="none"; a.textContent=card.a; }
  var st=document.getElementById("srStats"+PART); if(st) st.textContent="Card "+((srIndex%srCards.length)+1)+"/"+srCards.length;
}
function showSRAnswer${n}(){ var a=document.getElementById("srAnswer"+PART); if(a) a.style.display="block"; }
function srKnow${n}(ok){ if(ok){ var b=readBoost(); b.xp+=2; writeBoost(b); } srIndex++; renderSR(); }

function runTest${n}(idx){
  var code=document.getElementById("code"+PART+"_"+idx).value;
  var tests=P_TESTS[idx];
  var out=document.getElementById("out"+PART+"_"+idx);
  try{
    var harness=code+"\\n;"+tests;
    var fn=new Function("assert", harness);
    fn(function(cond){ if(!cond) throw new Error("assertion failed"); });
    out.textContent="✅ All passed";
    var b=readBoost(); b.xp+=25; writeBoost(b); confetti(); toast("Challenge passed");
  }catch(e){
    out.textContent="❌ "+e.message;
  }
}

// expose solutions for learners via console
window["PW"+PART+"_SOLUTIONS"]=P_SOLUTIONS;

StudyShell.applyTheme("pw"+PART+"-theme","themeBtn");
StudyShell.applyFontZoom("pw"+PART+"-font");
writeBoost(readBoost());
updateProgress${n}();

var spy=document.getElementById("scrollspy"+PART);
if(spy){
  for(var i=1;i<=TOTAL;i++){
    var a=document.createElement("a"); a.href="#sec"+i; a.textContent=String(i); a.style.marginRight="6px"; spy.appendChild(a);
  }
}

${meta.mockJs}
})();
</script>
</body>
</html>
<!--P${n}H-END-->
`;
}

for (const n of Object.keys(PARTS).map(Number)) {
  const html = buildApp(n, PARTS[n]);
  const file = path.join(ROOT, `Playwright_essentials_part${n}_study_app.html`);
  fs.writeFileSync(file, html);
  console.log("Wrote", path.basename(file));
}
console.log("Done. Run: node scripts/inline-shell.js");
