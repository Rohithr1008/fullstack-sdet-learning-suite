/**
 * Generates HTML & CSS Essentials curriculum files (plain MD, interactive MD, study apps).
 * Run: node _generate.js
 */
const fs = require('fs');
const path = require('path');
const ROOT = __dirname;

function w(name, body) {
  fs.writeFileSync(path.join(ROOT, name), body.replace(/\r\n/g, '\n'), 'utf8');
  console.log('wrote', name);
}

const ACCENT = '#1d4f91';
const ACCENT_DARK = '#1e3a5f';

const SHARED_CSS = `
:root { --accent:${ACCENT}; --bg:#f4f7fb; --text:#182333; --card:#fff; --muted:#5b6b80; --border:#d9e2ec; }
html.force-dark, html.force-dark body { --bg:#0d1420; --text:#dbe4ef; --card:#151f30; --muted:#8a9bb0; --border:#28374d; }
html.force-dark { color-scheme: dark; }
body { margin:0; font:16px/1.6 "Segoe UI",system-ui,sans-serif; background:var(--bg); color:var(--text); padding:16px 18px 48px; max-width:880px; margin-inline:auto; }
body.font-sm { font-size:14px; } body.font-lg { font-size:18px; }
.skip-link { position:absolute; left:-9999px; }
.skip-link:focus { position:fixed; left:8px; top:8px; z-index:9999; background:#fff; color:var(--accent); padding:8px 14px; border-radius:6px; font-weight:700; }
.partnav { display:flex; gap:8px; flex-wrap:wrap; align-items:center; background:${ACCENT_DARK}; color:#e2e8f0; padding:8px 12px; border-radius:8px; margin:6px 0 12px; }
.partnav a { color:#93c5fd; text-decoration:none; font-weight:600; }
.partnav strong { color:#fff; }
.theme-btn, button { cursor:pointer; }
h1 { color:var(--accent); }
h2 { border-bottom:3px solid var(--accent); padding-bottom:6px; margin-top:2rem; }
.why { background:#ebf4ff; border-left:4px solid #3182ce; padding:6px 12px; border-radius:6px; margin:6px 0 10px; font-size:0.92rem; }
html.force-dark .why { background:#0f1a2a; }
.quiz-box, .panel, .mock, .certificate, .playground { background:var(--card); border:2px solid var(--border); border-radius:12px; padding:14px 18px; margin:14px 0; }
.quiz-box details, .flash details { background:var(--bg); border:1px solid var(--border); border-radius:8px; padding:8px 12px; margin:8px 0; }
summary { cursor:pointer; font-weight:600; }
.quiz-correct { color:#276749; font-weight:700; }
html.force-dark .quiz-correct { color:#68d391; }
.badge { display:inline-block; font-size:12px; padding:2px 9px; border-radius:999px; font-weight:700; margin-left:6px; }
.b-green { background:#c6f6d5; color:#22543d; }
.b-yellow { background:#fefcbf; color:#744210; }
.toolbar { display:flex; gap:6px; flex-wrap:wrap; margin:4px 0 8px; align-items:center; }
.toolbar button, .theme-btn { padding:6px 12px; border-radius:8px; border:1px solid var(--border); background:var(--card); color:var(--text); font-weight:600; }
#progressBar { background:${ACCENT_DARK}; color:#e2e8f0; border-radius:8px; padding:10px 16px; font-weight:600; text-align:center; }
.mark { margin:8px 0; }
.mark button { background:var(--accent); color:#fff; border:none; border-radius:8px; padding:6px 12px; font-weight:600; }
body.focus-mode #progressBar, body.focus-mode #boostBar, body.focus-mode #learningPathPanel, body.focus-mode #srPanel, body.focus-mode .studyplan7 { display:none !important; }
#focusHint { display:none; background:#eef2ff; border:2px solid #5a67d8; border-radius:8px; padding:8px 14px; margin:6px 0; color:#3730a3; font-weight:600; }
html.force-dark #focusHint { background:#1a1a2e; color:#c7d2fe; }
table { border-collapse:collapse; width:100%; margin:10px 0; }
th, td { border:1px solid var(--border); padding:6px 10px; text-align:left; }
pre, code { font-family:ui-monospace,Consolas,monospace; }
pre { overflow:auto; background:var(--card); border:1px solid var(--border); padding:12px; border-radius:8px; }
.playground label { display:block; margin:6px 0 2px; font-weight:600; }
.playground input, .playground select, .playground textarea { width:100%; max-width:100%; padding:6px 8px; border-radius:6px; border:1px solid var(--border); background:var(--bg); color:var(--text); box-sizing:border-box; }
.playground .out { margin-top:10px; padding:10px; border-radius:8px; background:var(--bg); font-family:ui-monospace,Consolas,monospace; font-size:14px; white-space:pre-wrap; }
.playground .stage { margin-top:10px; padding:12px; border:1px dashed var(--border); border-radius:8px; min-height:48px; background:var(--bg); }
.demo-box { padding:12px; border:2px solid var(--accent); margin:8px 0; background:#fff; color:#182333; }
html.force-dark .demo-box { background:#1a2332; color:#dbe4ef; }
.certificate { text-align:center; border-color:#d69e2e; background:linear-gradient(135deg,#ebf4ff,#fef9c3); }
html.force-dark .certificate { background:linear-gradient(135deg,#0f1a2a,#422006); }
.certificate.locked { opacity:0.75; }
.mood { display:flex; flex-wrap:wrap; gap:6px; align-items:center; margin-top:10px; }
.mood input { display:none; }
.mood label { border:1px solid var(--border); border-radius:999px; padding:4px 12px; background:var(--card); cursor:pointer; font-size:14px; }
.mood input:checked + label { background:var(--accent); color:#fff; border-color:var(--accent); font-weight:700; }
.studyplan7 { background:var(--card); border:1px solid var(--border); border-radius:10px; padding:10px 16px; margin:14px 0; }
.checklist { list-style:none; padding-left:0; }
.checklist li { margin:6px 0; }
footer { text-align:center; margin-top:28px; color:var(--muted); font-size:13px; }
@media (prefers-reduced-motion:reduce) { * { animation:none !important; transition:none !important; } }
@media print { .toolbar, .theme-btn, #boostBar, #srPanel { display:none !important; } }
`.trim();

function shellJS(part, total, cards, paths, extras = '') {
  const prefix = `p${part}`;
  return `
(function () {
  const TOTAL = ${total};
  const KEY = (n) => '${prefix}-sec-' + n;
  const BOOST = '${prefix}-boost';
  const FONT = '${prefix}-font';
  const THEME = '${prefix}-theme';
  const cards = ${JSON.stringify(cards)};
  let srIndex = 0, srShow = false;
  const PATHS = ${JSON.stringify(paths)};

  function doneCount() {
    let n = 0;
    for (let i = 1; i <= TOTAL; i++) if (localStorage.getItem(KEY(i)) === '1') n++;
    return n;
  }
  function updateProgress() {
    const n = doneCount();
    const pct = Math.round((n / TOTAL) * 100);
    document.getElementById('progressBar').textContent = '📊 Progress: ' + n + '/' + TOTAL + ' sections (' + pct + '%)';
    for (let i = 1; i <= TOTAL; i++) {
      const btn = document.querySelector('button[data-sec="' + i + '"]');
      if (btn) btn.textContent = localStorage.getItem(KEY(i)) === '1' ? '✅ Completed' : 'Mark Complete';
    }
    const path = document.getElementById('learningPathContent');
    let tip = PATHS[0];
    for (const p of PATHS) if (n >= p.min) tip = p.text;
    path.textContent = tip;
    const cert = document.getElementById('certPanel');
    const status = document.getElementById('certStatus');
    const body = document.getElementById('certBody');
    if (n >= TOTAL) {
      cert.classList.remove('locked');
      status.hidden = true;
      body.hidden = false;
      cert.style.background = '';
    } else {
      cert.classList.add('locked');
      status.hidden = false;
      body.hidden = true;
      cert.style.background = '';
      status.innerHTML = 'Complete all <strong>' + TOTAL + ' sections</strong> to unlock your optional certificate. (' + n + '/' + TOTAL + ')';
    }
  }
  window.toggleSection = function (n) {
    const on = localStorage.getItem(KEY(n)) === '1';
    localStorage.setItem(KEY(n), on ? '0' : '1');
    if (!on) addXp(5);
    updateProgress();
  };
  function loadBoost() { try { return JSON.parse(localStorage.getItem(BOOST) || '{}'); } catch { return {}; } }
  function saveBoost(b) { localStorage.setItem(BOOST, JSON.stringify(b)); }
  function addXp(x) {
    const b = loadBoost();
    b.xp = (b.xp || 0) + x;
    const today = new Date().toDateString();
    if (b.last !== today) {
      b.streak = (b.last && (Date.now() - new Date(b.last).getTime() < 172800000)) ? (b.streak || 0) + 1 : 1;
      b.last = today;
    }
    saveBoost(b); renderBoost();
  }
  window.addXp = addXp;
  function renderBoost() {
    const b = loadBoost();
    document.getElementById('pointCount').textContent = (b.xp || 0) + ' XP';
    document.getElementById('streakCount').textContent = (b.streak || 0) + '-day streak';
  }
  window.fontZoom = function (dir) {
    document.body.classList.remove('font-sm', 'font-lg');
    let cur = localStorage.getItem(FONT) || 'md';
    if (dir === 0) cur = 'md';
    else if (dir < 0) cur = cur === 'lg' ? 'md' : 'sm';
    else cur = cur === 'sm' ? 'md' : 'lg';
    localStorage.setItem(FONT, cur);
    if (cur === 'sm') document.body.classList.add('font-sm');
    if (cur === 'lg') document.body.classList.add('font-lg');
  };
  window.toggleTheme = function () {
    const html = document.documentElement;
    const dark = html.classList.toggle('force-dark');
    html.classList.toggle('force-light', !dark);
    localStorage.setItem(THEME, dark ? 'dark' : 'light');
    document.getElementById('themeBtn').textContent = dark ? '☀️ Light mode' : '🌙 Dark mode';
  };
  window.focusMode = function (btn) {
    const on = document.body.classList.toggle('focus-mode');
    btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    document.getElementById('focusHint').style.display = on ? 'block' : 'none';
    if (on) collapseAll(false);
  };
  window.collapseAll = function (open) {
    document.querySelectorAll('details').forEach((d) => { d.open = !!open; });
  };
  window.surpriseJump = function () {
    const n = 1 + Math.floor(Math.random() * TOTAL);
    const el = document.getElementById('s' + n);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  window.srStart = function () { srIndex = 0; srShow = false; renderSr(); };
  function renderSr() {
    const c = cards[srIndex % cards.length];
    document.getElementById('srQ').textContent = c.q;
    const a = document.getElementById('srA');
    a.style.display = srShow ? 'block' : 'none';
    a.textContent = c.a;
    document.getElementById('srBtns').innerHTML = srShow
      ? '<button type="button" onclick="srNext()">Next</button>'
      : '<button type="button" onclick="srReveal()">Show answer</button>';
  }
  window.srReveal = function () { srShow = true; renderSr(); };
  window.srNext = function () { srIndex++; srShow = false; renderSr(); addXp(1); };
  ${extras}
  const theme = localStorage.getItem(THEME);
  if (theme === 'dark' || (!theme && matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('force-dark');
    document.getElementById('themeBtn').textContent = '☀️ Light mode';
  } else {
    document.documentElement.classList.add('force-light');
  }
  fontZoom(0);
  const savedFont = localStorage.getItem(FONT);
  if (savedFont === 'sm') document.body.classList.add('font-sm');
  if (savedFont === 'lg') document.body.classList.add('font-lg');
  renderBoost();
  updateProgress();
})();
`.trim();
}

function appChrome(part, title, subtitle, total, planHtml, navExtra) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>HTML &amp; CSS Essentials — Part ${part}</title>
<style>
${SHARED_CSS}
</style>
</head>
<body>
<a class="skip-link" href="#progressBar">Skip to content</a>
<h1>HTML &amp; CSS Essentials — Part ${part}</h1>
<div class="partnav" aria-label="Part navigation">
  <a href="index.html">Hub</a>
  <a href="Html_css_essentials_part1_study_app.html">1</a>
  <a href="Html_css_essentials_part2_study_app.html">2</a>
  <a href="Html_css_essentials_part3_study_app.html">3</a>
  <strong>Part ${part}: ${title}</strong>
  ${navExtra || ''}
</div>
<button id="themeBtn" class="theme-btn" onclick="toggleTheme()" aria-label="Toggle light/dark theme">🌙 Dark mode</button>
<div class="toolbar">
  <span style="font-weight:600;">📐 Size:</span>
  <button type="button" onclick="fontZoom(-1)" aria-label="Decrease text size">A−</button>
  <button type="button" onclick="fontZoom(0)" aria-label="Reset text size">A</button>
  <button type="button" onclick="fontZoom(1)" aria-label="Increase text size">A+</button>
  <button type="button" onclick="collapseAll(true)">📖 Expand all</button>
  <button type="button" onclick="collapseAll(false)">📕 Collapse all</button>
  <button type="button" id="focusBtn" onclick="focusMode(this)" aria-pressed="false">🧘 Focus Mode</button>
</div>
<div id="focusHint">🧘 <strong>Focus Mode ON</strong> — extra panels hidden. Click Focus Mode again to restore.</div>
<p>${subtitle}</p>
<div id="progressBar" role="status">📊 Progress: 0/${total} sections (0%)</div>
<div id="boostBar" class="panel" style="display:flex;flex-wrap:wrap;gap:12px;align-items:center;justify-content:space-between;">
  <strong>⚡ <span id="streakCount">0-day streak</span></strong>
  <strong>⭐ <span id="pointCount">0 XP</span></strong>
  <button type="button" onclick="surpriseJump()">🎲 Surprise me</button>
</div>
<details class="studyplan7"><summary>📅 Suggested study plan</summary>
${planHtml}
</details>
<div id="learningPathPanel" class="panel">
  <h3 style="margin-top:0;color:var(--accent);">🧭 Learning Path</h3>
  <div id="learningPathContent">Complete a section to get a next-step tip.</div>
</div>
<div id="srPanel" class="panel">
  <h3 style="margin-top:0;color:var(--accent);">🃏 Flashcard drill</h3>
  <p id="srQ">Click Start to begin.</p>
  <p id="srA" style="display:none;color:var(--accent);font-weight:600;"></p>
  <div id="srBtns"><button type="button" onclick="srStart()">Start Review</button></div>
</div>
`;
}

function appFooter(part, total, certTitle, certBlurb, script) {
  return `
<h2 id="certificate">🏆 Certificate of Completion</h2>
<div class="certificate locked" id="certPanel">
  <p class="big" id="certStatus">Complete all <strong>${total} sections</strong> to unlock your optional certificate.</p>
  <div id="certBody" hidden>
    <h3 style="margin:0 0 8px;border:none;">${certTitle}</h3>
    <p>${certBlurb}</p>
    <p><em>Automation Tester Path · optional certificate</em></p>
  </div>
</div>
<footer>HTML &amp; CSS Essentials · Part ${part} · works offline · sibling to JE / Playwright kits</footer>
<script>
${script}
</script>
<!--P${part}H-END-->
</body>
</html>
`;
}

function mark(n) {
  return `<div class="mark"><button type="button" data-sec="${n}" onclick="toggleSection(${n})">Mark Complete</button></div>`;
}

function quiz(items) {
  return `<div class="quiz-box"><strong>🧪 Self-test</strong>${items.map(([q,a]) =>
    `<details><summary>${q}</summary><p class="quiz-correct">${a}</p></details>`).join('')}</div>`;
}

// ========== PART CONTENT ==========

const p1Sections = [
  {
    id: 1, title: '1. Why HTML &amp; CSS for testers',
    why: 'Locators, visibility failures, and “element not found” almost always start in the DOM — not in Playwright magic.',
    body: `<p>Before writing <code>page.getByRole(...)</code>, you need to <strong>read the page</strong>: tags, attributes, what CSS hides, and what screen readers / Playwright roles see.</p>
<table><tr><th>You will use this for…</th><th>Example</th></tr>
<tr><td>Stable selectors</td><td><code>data-testid</code>, roles, labels</td></tr>
<tr><td>Debugging flakes</td><td>opacity 0 vs <code>display:none</code></td></tr>
<tr><td>Talking with devs</td><td>“That div isn’t a button — add a real &lt;button&gt;”</td></tr>
</table>
<p><strong>Path note:</strong> Do this Part 1 <em>before</em> deep Playwright. Parts 2–3 help when you also build or polish UI.</p>`,
    quiz: [['Do green unit tests prove your locator will find the Submit button?', 'No — locators care about the live DOM/CSS.'],
           ['Name one reason a tester opens DevTools Elements.', 'Inspect tag/attributes, computed styles, or why something is invisible.']]
  },
  {
    id: 2, title: '2. Tags &amp; document structure',
    why: 'Playwright and accessibility trees walk the same HTML skeleton you see in Elements.',
    body: `<p>Every page is a tree:</p>
<pre><code>&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
  &lt;head&gt;…meta, title, CSS…&lt;/head&gt;
  &lt;body&gt;
    &lt;header&gt;…&lt;/header&gt;
    &lt;main&gt;…&lt;/main&gt;
    &lt;footer&gt;…&lt;/footer&gt;
  &lt;/body&gt;
&lt;/html&gt;</code></pre>
<table><tr><th>Tag</th><th>Job</th></tr>
<tr><td><code>h1</code>–<code>h6</code></td><td>Headings (outline)</td></tr>
<tr><td><code>p</code>, <code>ul</code>/<code>ol</code>/<code>li</code></td><td>Text &amp; lists</td></tr>
<tr><td><code>div</code>/<code>span</code></td><td>Generic boxes (no meaning)</td></tr>
<tr><td><code>button</code>, <code>a</code>, <code>input</code></td><td>Interactive controls</td></tr>
</table>
<div class="playground" aria-label="Structure playground">
<strong>🧪 Tiny playground — peek at tags</strong>
<p>Click a node name to highlight a sample tree (offline demo).</p>
<p>
<button type="button" onclick="p1Highlight('header')">header</button>
<button type="button" onclick="p1Highlight('main')">main</button>
<button type="button" onclick="p1Highlight('footer')">footer</button>
<button type="button" onclick="p1Highlight('nav')">nav</button>
</p>
<div class="stage" id="p1Tree">
  <div data-node="header" class="demo-box">HEADER — logo + nav</div>
  <div data-node="nav" class="demo-box" style="margin-left:16px;">nav — Home | Labs</div>
  <div data-node="main" class="demo-box">MAIN — page content</div>
  <div data-node="footer" class="demo-box">FOOTER — copyright</div>
</div>
<div class="out" id="p1TreeOut">Pick a region.</div>
</div>`,
    quiz: [['Is <code>div</code> a landmark for getByRole?', 'Usually no — prefer semantic tags or explicit roles.'],
           ['Where does visible page content live?', 'Inside <code>&lt;body&gt;</code>.']]
  },
  {
    id: 3, title: '3. Forms, inputs &amp; buttons',
    why: 'Most automation pain is forms: wrong type, missing label, submit via div-click.',
    body: `<pre><code>&lt;form&gt;
  &lt;label for="email"&gt;Email&lt;/label&gt;
  &lt;input id="email" name="email" type="email" /&gt;
  &lt;button type="submit"&gt;Sign in&lt;/button&gt;
&lt;/form&gt;</code></pre>
<table><tr><th>Control</th><th>Tester tip</th></tr>
<tr><td><code>input type="text|email|password"</code></td><td>Prefer <code>getByLabel</code></td></tr>
<tr><td><code>checkbox</code> / <code>radio</code></td><td>Check <code>checked</code> state</td></tr>
<tr><td><code>select</code> + <code>option</code></td><td>Select by label/value</td></tr>
<tr><td><code>button type="submit"</code></td><td>Better than clickable <code>div</code></td></tr>
</table>
<div class="playground">
<strong>🧪 Live form playground</strong>
<form id="p1Form" onsubmit="return p1FormSubmit(event)">
  <label for="p1Email">Email</label>
  <input id="p1Email" name="email" type="email" required placeholder="you@example.com" />
  <label for="p1Agree"><input id="p1Agree" type="checkbox" /> I agree</label>
  <p><button type="submit">Submit</button>
  <button type="button" onclick="p1FormReset()">Reset</button></p>
</form>
<div class="out" id="p1FormOut">Fill and submit — watch validation + values.</div>
</div>`,
    quiz: [['Why prefer <code>&lt;button type="submit"&gt;</code> over a styled div?', 'Native keyboard/Enter, roles, and form submit behavior.'],
           ['What links a label to an input?', '<code>for</code> matching the input <code>id</code> (or wrapping).']]
  },
  {
    id: 4, title: '4. Links &amp; images',
    why: 'Broken hrefs and empty alt text show up in a11y scans and confused click targets.',
    body: `<pre><code>&lt;a href="/labs"&gt;Open labs&lt;/a&gt;
&lt;img src="hero.png" alt="ShopLite home hero" /&gt;</code></pre>
<ul>
<li><code>a[href]</code> → role <strong>link</strong></li>
<li>Decorative images: <code>alt=""</code> (empty), not missing</li>
<li>Meaningful images need descriptive <code>alt</code></li>
</ul>`,
    quiz: [['Role of <code>&lt;a href="…"&gt;</code>?', 'link'],
           ['Decorative image alt?', 'Empty string <code>alt=""</code>.']]
  },
  {
    id: 5, title: '5. Semantic HTML',
    why: 'Semantics = cheaper, more stable locators (<code>getByRole(\'navigation\')</code>) and better a11y.',
    body: `<table><tr><th>Prefer</th><th>Instead of</th></tr>
<tr><td><code>&lt;nav&gt;</code>, <code>&lt;main&gt;</code>, <code>&lt;header&gt;</code></td><td><code>&lt;div class="nav"&gt;</code> everywhere</td></tr>
<tr><td><code>&lt;button&gt;</code></td><td><code>&lt;div onclick&gt;</code></td></tr>
<tr><td><code>&lt;h2&gt;</code> for section titles</td><td>Bold <code>div</code> pretending to be a heading</td></tr>
</table>
<p>Landmarks help humans <em>and</em> Playwright roles.</p>`,
    quiz: [['Is class name a semantic landmark?', 'No — tags/roles are.'],
           ['Best tag for primary page content?', '<code>&lt;main&gt;</code>']]
  },
  {
    id: 6, title: '6. Attributes: id, class, name, data-testid',
    why: 'Your locator strategy lives in attributes — choose stable ones.',
    body: `<table><tr><th>Attribute</th><th>Good for</th><th>Caution</th></tr>
<tr><td><code>id</code></td><td>Unique hooks</td><td>Must be unique; often auto-generated</td></tr>
<tr><td><code>class</code></td><td>Styling</td><td>Changes with redesigns — fragile for tests</td></tr>
<tr><td><code>name</code></td><td>Forms / POST fields</td><td>Great with labels</td></tr>
<tr><td><code>data-testid</code></td><td>Explicit test hooks</td><td>Agree naming with team</td></tr>
</table>
<pre><code>&lt;button data-testid="checkout-submit" type="submit"&gt;Pay&lt;/button&gt;</code></pre>
<div class="playground">
<strong>🧪 Attribute inspector</strong>
<label for="p1AttrHtml">Paste a snippet</label>
<textarea id="p1AttrHtml" rows="4">&lt;button id="pay" class="btn primary" data-testid="checkout-submit" name="pay"&gt;Pay&lt;/button&gt;</textarea>
<p><button type="button" onclick="p1InspectAttrs()">List attributes</button></p>
<div class="out" id="p1AttrOut">Run to list attrs + tester recommendation.</div>
</div>`,
    quiz: [['Safest default for UI redesigns?', 'Role/label first; <code>data-testid</code> when needed.'],
           ['Why is class often fragile?', 'CSS refactors rename classes without changing behavior.']]
  },
  {
    id: 7, title: '7. DevTools Elements panel',
    why: 'When a test fails, Elements is where you verify reality vs assumption.',
    body: `<ol>
<li>Right-click → Inspect (or F12 → Elements)</li>
<li>Select an element — see HTML + computed styles</li>
<li>Check if it’s in DOM but hidden (<code>display</code>, size 0, off-screen)</li>
<li>Edit HTML/CSS temporarily to confirm a hypothesis (refresh clears it)</li>
</ol>
<p><strong>Tester habit:</strong> before changing a locator, confirm the node still exists and is visible.</p>`,
    quiz: [['Element in DOM but test says not visible — what next?', 'Check computed display/visibility/opacity/size/coverage.'],
           ['Do DevTools live edits persist after refresh?', 'No.']]
  },
  {
    id: 8, title: '8. CSS selectors enough for automation',
    why: 'Even if you prefer roles, traces and older suites still speak CSS.',
    body: `<table><tr><th>Selector</th><th>Matches</th></tr>
<tr><td><code>#pay</code></td><td>id=&quot;pay&quot;</td></tr>
<tr><td><code>.primary</code></td><td>class contains primary</td></tr>
<tr><td><code>button[data-testid="x"]</code></td><td>attr exact</td></tr>
<tr><td><code>form input[name="email"]</code></td><td>descendant</td></tr>
<tr><td><code>ul &gt; li</code></td><td>direct child</td></tr>
</table>
<div class="playground">
<strong>🧪 Selector try-out</strong>
<div class="stage" id="p1SelStage">
  <form id="demoForm">
    <input name="email" data-testid="login-email" value="a@b.com" />
    <button type="submit" class="btn primary" data-testid="login-submit">Go</button>
  </form>
</div>
<label for="p1Sel">CSS selector</label>
<input id="p1Sel" value='button[data-testid="login-submit"]' />
<p><button type="button" onclick="p1TrySel()">Query</button></p>
<div class="out" id="p1SelOut">Enter a selector against the mini form above.</div>
</div>`,
    quiz: [['CSS for data-testid=&quot;login-email&quot;?', '<code>[data-testid=&quot;login-email&quot;]</code>'],
           ['Prefer <code>#id</code> or role when both work?', 'Prefer role/label for resilience; id/testid when agreed.']]
  },
  {
    id: 9, title: '9. Visibility: display, visibility, opacity',
    why: '“Attached but not visible” is a top flake category.',
    body: `<table><tr><th>Property</th><th>Effect</th><th>In layout?</th></tr>
<tr><td><code>display: none</code></td><td>Removed from layout</td><td>No</td></tr>
<tr><td><code>visibility: hidden</code></td><td>Invisible, space kept</td><td>Yes</td></tr>
<tr><td><code>opacity: 0</code></td><td>Fully transparent</td><td>Yes (often still “visible” to some checks)</td></tr>
</table>
<div class="playground">
<strong>🧪 Visibility lab</strong>
<div class="stage"><div id="p1VisBox" class="demo-box">Target box — can you still “see” me?</div></div>
<p>
<button type="button" onclick="p1Vis('display')">display:none</button>
<button type="button" onclick="p1Vis('visibility')">visibility:hidden</button>
<button type="button" onclick="p1Vis('opacity')">opacity:0</button>
<button type="button" onclick="p1Vis('reset')">Reset</button>
</p>
<div class="out" id="p1VisOut">Toggle styles and read the note.</div>
</div>`,
    quiz: [['Which removes the element from layout?', '<code>display: none</code>'],
           ['Does opacity:0 keep layout space?', 'Yes.']]
  },
  {
    id: 10, title: '10. Box model (light)',
    why: 'Click coordinates and “covered by another element” failures care about padding/margin/border.',
    body: `<p>Outside → inside: <strong>margin</strong> · <strong>border</strong> · <strong>padding</strong> · <strong>content</strong>.</p>
<pre><code>.card {
  width: 200px;
  padding: 16px;
  border: 2px solid #333;
  margin: 8px;
}</code></pre>
<p>DevTools shows the box model diagram for the selected node — use it when a click hits the wrong layer.</p>`,
    quiz: [['Order from outside in?', 'margin → border → padding → content'],
           ['Does padding increase clickable area inside the border?', 'Yes (for the element’s box).']]
  },
  {
    id: 11, title: '11. Glossary &amp; common pitfalls',
    why: 'Shared words stop “it works on my machine” locator debates.',
    body: `<table><tr><th>Term</th><th>Meaning</th></tr>
<tr><td>DOM</td><td>Document Object Model — live HTML tree</td></tr>
<tr><td>Semantic tag</td><td>Tag with meaning (<code>nav</code>, <code>button</code>)</td></tr>
<tr><td>Locator</td><td>How automation finds a node</td></tr>
<tr><td>Computed style</td><td>Final CSS after cascade</td></tr>
<tr><td>data-testid</td><td>Hook dedicated to tests</td></tr>
</table>
<div class="quiz-box"><strong>🐞 Spot-the-Bug</strong>
<details><summary>Test uses <code>.btn-primary-v2</code> after a redesign</summary><p class="quiz-correct">Class renamed — fragile locator; use role/label/testid.</p></details>
<details><summary>Click <code>div.login</code> that looks like a button</summary><p class="quiz-correct">Not a real button — keyboard/a11y/role issues; ask for <code>&lt;button&gt;</code>.</p></details>
<details><summary>Assert visible while CSS has <code>opacity: 0</code> on overlay twin</summary><p class="quiz-correct">Wrong node or visibility mismatch — inspect which element Playwright resolved.</p></details>
</div>
<div class="mood"><span>Mood:</span>
<input type="radio" name="m11" id="m11a"><label for="m11a">😅</label>
<input type="radio" name="m11" id="m11b"><label for="m11b">🙂</label>
<input type="radio" name="m11" id="m11c"><label for="m11c">😎</label>
</div>`,
    quiz: [['DOM stands for?', 'Document Object Model'],
           ['Best first locator style in Playwright?', 'Role + accessible name (then testid).']]
  },
  {
    id: 12, title: '12. Practice, challenges &amp; answer key',
    why: 'Tiny drills beat rereading tables.',
    body: `<p><span class="badge b-green">easy</span> Practice</p>
<ol>
<li>Write a labeled email field + submit button (HTML only).</li>
<li>Give the button a <code>data-testid</code>.</li>
<li>Write a CSS selector for that testid.</li>
<li>Name one difference: <code>display:none</code> vs <code>visibility:hidden</code>.</li>
<li>Why is <code>div</code>+click a smell?</li>
</ol>
<p><span class="badge b-yellow">medium</span> Challenges</p>
<p><strong>C1.</strong> Predict: element has <code>display:none</code> — attached? visible?<br>
<strong>C2.</strong> Pick a locator strategy for a nav “Pricing” link with good semantics.<br>
<strong>C3.</strong> Spot the bug: <code>&lt;label&gt;Email&lt;/label&gt;&lt;input id="mail"&gt;</code></p>
<details><summary>Answer key</summary>
<ol>
<li><code>&lt;label for="e"&gt;Email&lt;/label&gt;&lt;input id="e" type="email"&gt;&lt;button type="submit"&gt;…</code></li>
<li>e.g. <code>data-testid="login-submit"</code></li>
<li><code>[data-testid="login-submit"]</code></li>
<li>none removes from layout; hidden keeps space</li>
<li>Poor a11y/roles/keyboard</li>
</ol>
<p><strong>C1.</strong> Attached yes (if in DOM), visible no.<br>
<strong>C2.</strong><code>getByRole('link', { name: 'Pricing' })</code> inside nav.<br>
<strong>C3.</strong> Missing <code>for="mail"</code> (or wrap input).</p>
</details>`,
    quiz: [['After Part 1, where next on the path?', 'Playwright Essentials (or HTML/CSS Parts 2–3 if you build UI).']]
  }
];

const p1Extras = `
  window.p1Highlight = function (name) {
    document.querySelectorAll('#p1Tree [data-node]').forEach((el) => {
      el.style.outline = el.getAttribute('data-node') === name ? '3px solid #1d4f91' : 'none';
    });
    document.getElementById('p1TreeOut').textContent = 'Highlighted: <' + name + '> — semantic region for landmarks/roles.';
    addXp(1);
  };
  window.p1FormSubmit = function (e) {
    e.preventDefault();
    const email = document.getElementById('p1Email');
    const agree = document.getElementById('p1Agree');
    document.getElementById('p1FormOut').textContent =
      'submit OK\\nemail=' + email.value + '\\nagree=' + agree.checked +
      '\\n(Playwright: getByLabel(\\'Email\\') + getByRole(\\'button\\', { name: /submit/i }))';
    addXp(2);
    return false;
  };
  window.p1FormReset = function () {
    document.getElementById('p1Form').reset();
    document.getElementById('p1FormOut').textContent = 'Form reset.';
  };
  window.p1InspectAttrs = function () {
    const raw = document.getElementById('p1AttrHtml').value;
    const tmp = document.createElement('div');
    tmp.innerHTML = raw.trim();
    const el = tmp.firstElementChild;
    if (!el) { document.getElementById('p1AttrOut').textContent = 'No element found.'; return; }
    const attrs = [...el.attributes].map((a) => a.name + '=' + JSON.stringify(a.value));
    let tip = 'Prefer role/name; ';
    if (el.hasAttribute('data-testid')) tip += 'data-testid is a solid explicit hook.';
    else if (el.id) tip += 'id works if stable & unique.';
    else tip += 'consider adding data-testid if roles are weak.';
    document.getElementById('p1AttrOut').textContent = el.tagName.toLowerCase() + '\\n' + attrs.join('\\n') + '\\n—\\n' + tip;
    addXp(2);
  };
  window.p1TrySel = function () {
    const sel = document.getElementById('p1Sel').value;
    try {
      const nodes = document.querySelectorAll('#p1SelStage ' + sel);
      document.getElementById('p1SelOut').textContent = 'Matches: ' + nodes.length + (nodes[0] ? '\\nFirst text: ' + (nodes[0].textContent || nodes[0].value || '').trim() : '');
      addXp(1);
    } catch (err) {
      document.getElementById('p1SelOut').textContent = 'Invalid selector: ' + err.message;
    }
  };
  window.p1Vis = function (mode) {
    const box = document.getElementById('p1VisBox');
    box.style.display = '';
    box.style.visibility = '';
    box.style.opacity = '';
    let note = 'Reset — visible in layout.';
    if (mode === 'display') { box.style.display = 'none'; note = 'display:none — out of layout; typically not visible to users/Playwright.'; }
    if (mode === 'visibility') { box.style.visibility = 'hidden'; note = 'visibility:hidden — invisible but space remains.'; }
    if (mode === 'opacity') { box.style.opacity = '0'; note = 'opacity:0 — transparent; still in layout; visibility checks can be tricky.'; }
    document.getElementById('p1VisOut').textContent = note;
    addXp(1);
  };
`;

function sectionsToAppHtml(sections) {
  return sections.map((s) => `<h2 id="s${s.id}">${s.title}</h2>
<div class="why">🚩 <strong>Why it matters:</strong> ${s.why}</div>
${s.body}
${quiz(s.quiz)}
${mark(s.id)}
`).join('\n');
}

function htmlToPlainChunk(html) {
  return html
    .replace(/<div class="playground"[\s\S]*?<\/div>\s*(?=<|$)/gi, '\n> 🧪 *Playground available in the study app.*\n\n')
    .replace(/<pre><code>/gi, '\n```html\n')
    .replace(/<\/code><\/pre>/gi, '\n```\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<\/li>/gi, '\n')
    .replace(/<li>/gi, '- ')
    .replace(/<\/?ul>/gi, '\n')
    .replace(/<\/?ol>/gi, '\n')
    .replace(/<\/?strong>/gi, '**')
    .replace(/<\/?em>/gi, '_')
    .replace(/<code>/gi, '`').replace(/<\/code>/gi, '`')
    .replace(/<table>/gi, '\n').replace(/<\/table>/gi, '\n')
    .replace(/<tr>/gi, '| ').replace(/<\/tr>/gi, '|\n')
    .replace(/<\/?th>/gi, '**').replace(/<\/?td>/gi, '')
    .replace(/\| \|/g, '|')
    .replace(/<[^>]+>/g, '')
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').replace(/&quot;/g, '"')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function buildPlain(part, title, blurb, sections) {
  const toc = sections.map((s) => `${s.id}. ${s.title.replace(/^\d+\.\s*/, '').replace(/&amp;/g, '&')}`).join('\n');
  const body = sections.map((s) => {
    const quizzes = s.quiz.map(([q, a]) => `**Q:** ${q.replace(/<[^>]+>/g, '').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&')}\n**A:** ${a.replace(/<[^>]+>/g, '').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&')}`).join('\n\n');
    return `## ${s.title.replace(/&amp;/g, '&')}

> 🚩 **Why it matters:** ${s.why.replace(/&amp;/g, '&').replace(/<[^>]+>/g, (t) => t.includes('code') ? '' : '').replace(/<\/?code>/g, '`')}

${htmlToPlainChunk(s.body)}

### 🧪 Quiz

${quizzes}
`;
  }).join('\n---\n\n');
  return `# HTML & CSS Essentials — Part ${part}: ${title}

> 💡 **Study guide (plain edition):** open answers, print-friendly. Interactive: \`Html_css_essentials_part${part}_interactive.md\`. Study app: \`Html_css_essentials_part${part}_study_app.html\`.

### 🗺 Your path

${blurb}

## Table of Contents

${toc}

---

${body}

🎉 **Congratulations** — Part ${part} plain edition complete. Next: see README hub.

<!--P${part}-END-->
`;
}

function buildInteractive(part, title, blurb, sections) {
  const style = `<style>
.tip,.warn,.why,.quiz-box,.flashcard,.mood{border-radius:8px;padding:10px 14px;margin:12px 0}
.why{background:#ebf4ff;border-left:4px solid #3182ce}
.quiz-box{background:#f7f9fc;border:2px solid #4299e1}
.quiz-box details{background:#fff;border:1px solid #cbd5e0;border-radius:8px;padding:8px 12px;margin:8px 0}
.quiz-correct{color:#276749;font-weight:700}
.partnav{display:flex;gap:8px;flex-wrap:wrap;background:#1e3a5f;color:#e2e8f0;padding:8px 12px;border-radius:8px;margin:8px 0}
.partnav a{color:#93c5fd;font-weight:600;text-decoration:none}
@media (prefers-color-scheme:dark){.why{background:#0f1a2a}.quiz-box{background:#151f30}.quiz-box details{background:#0d1420;border-color:#28374d}}
</style>`;
  const body = sections.map((s) => {
    const qs = s.quiz.map(([q, a]) => `<details><summary>${q}</summary><p class="quiz-correct">${a}</p></details>`).join('\n');
    return `## ${s.title}

<div class="why">🚩 <strong>Why it matters:</strong> ${s.why}</div>

${htmlToPlainChunk(s.body).split('\n').map((l) => l).join('\n')}

<div class="quiz-box"><strong>🧪 Self-test</strong>
${qs}
</div>
`;
  }).join('\n---\n\n');
  return `# HTML & CSS Essentials — Part ${part}: ${title} (Interactive)

${style}

<div class="partnav" aria-label="Part navigation">
<a href="index.html">Hub</a>
<a href="Html_css_essentials_part1_interactive.md">1</a>
<a href="Html_css_essentials_part2_interactive.md">2</a>
<a href="Html_css_essentials_part3_interactive.md">3</a>
<strong>Part ${part}</strong>
</div>

> Open with **Ctrl+Shift+V** in VS Code. Study app (offline): \`Html_css_essentials_part${part}_study_app.html\`.

${blurb}

${body}

🎉 **Done with Part ${part} interactive notes.**

<script>
function hceExpand(open){document.querySelectorAll('details').forEach(function(d){d.open=!!open;});}
</script>
<!--P${part}I-END-->
`;
}

// ========== PART 2 ==========
const p2Sections = [
  {
    id: 1, title: '1. CSS mental model',
    why: 'Cascade + specificity explain “why didn’t my style apply?” — same root cause as flaky visual asserts.',
    body: `<p>Browser: parse HTML → build DOM → apply CSS (cascade) → layout → paint.</p>
<table><tr><th>Layer</th><th>Tester angle</th></tr>
<tr><td>Author styles</td><td>Your stylesheet / component CSS</td></tr>
<tr><td>Inline style</td><td>Often wins — check Elements</td></tr>
<tr><td>!important</td><td>Escape hatch; smell in reviews</td></tr>
</table>`,
    quiz: [['Where do you verify the final style?', 'Computed styles in DevTools.'],
           ['Does class order in HTML set specificity?', 'No — specificity + source order in CSS matter.']]
  },
  {
    id: 2, title: '2. Selectors &amp; specificity (practical)',
    why: 'Knowing specificity stops blind !important wars and helps you read component CSS.',
    body: `<table><tr><th>Selector</th><th>Rough weight</th></tr>
<tr><td>element (<code>button</code>)</td><td>0,0,1</td></tr>
<tr><td>class / attr (<code>.btn</code>, <code>[data-x]</code>)</td><td>0,1,0</td></tr>
<tr><td>id (<code>#pay</code>)</td><td>1,0,0</td></tr>
<tr><td>inline style</td><td>beats ids (unless !important fights)</td></tr>
</table>
<pre><code>button.primary { }          /* class beats bare button */
#nav .link { }              /* id context wins over .link alone */
</code></pre>
<div class="playground">
<strong>🧪 Specificity guess</strong>
<label for="p2SpecA">Rule A</label>
<input id="p2SpecA" value=".btn.primary" />
<label for="p2SpecB">Rule B</label>
<input id="p2SpecB" value="button#submit" />
<p><button type="button" onclick="p2Spec()">Which wins (typical)?</button></p>
<div class="out" id="p2SpecOut">Compare rough weights.</div>
</div>`,
    quiz: [['Does <code>#id</code> beat <code>.class.class</code>?', 'Yes — one id beats any number of classes.'],
           ['Best fix for “style not applying”?', 'Inspect computed + check more specific rule, not random !important.']]
  },
  {
    id: 3, title: '3. Flexbox essentials',
    why: 'Most modern toolbars, navs, and card rows are flex — layout bugs show as overflow/overlap in tests.',
    body: `<pre><code>.row {
  display: flex;
  gap: 12px;
  justify-content: space-between; /* main axis */
  align-items: center;            /* cross axis */
}
</code></pre>
<table><tr><th>Prop</th><th>Job</th></tr>
<tr><td><code>flex-direction</code></td><td>row / column</td></tr>
<tr><td><code>justify-content</code></td><td>main-axis packing</td></tr>
<tr><td><code>align-items</code></td><td>cross-axis alignment</td></tr>
<tr><td><code>flex-wrap</code></td><td>allow wrapping</td></tr>
</table>
<div class="playground">
<strong>🧪 Flex lab</strong>
<label>justify-content
<select id="p2FlexJ" onchange="p2Flex()"><option>flex-start</option><option selected>space-between</option><option>center</option><option>space-around</option></select>
</label>
<label>align-items
<select id="p2FlexA" onchange="p2Flex()"><option>stretch</option><option selected>center</option><option>flex-start</option></select>
</label>
<div class="stage" id="p2FlexStage" style="display:flex;gap:8px;min-height:80px;justify-content:space-between;align-items:center;">
  <div class="demo-box">A</div><div class="demo-box">B</div><div class="demo-box">C</div>
</div>
<div class="out" id="p2FlexOut">Tweaking flex…</div>
</div>`,
    quiz: [['Main axis for default flex-direction:row?', 'Horizontal (left→right in LTR).'],
           ['Prop for spacing between items without margins?', '<code>gap</code>']]
  },
  {
    id: 4, title: '4. CSS Grid essentials',
    why: 'Dashboards and form layouts often use Grid — broken tracks look like “missing” UI in screenshots.',
    body: `<pre><code>.layout {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 16px;
}
</code></pre>
<p><code>fr</code> = fraction of free space. <code>repeat(3, 1fr)</code> = three equal columns.</p>
<div class="playground">
<strong>🧪 Grid lab</strong>
<label>columns
<select id="p2GridCols" onchange="p2Grid()">
<option value="1fr">1fr</option>
<option value="1fr 1fr" selected>1fr 1fr</option>
<option value="200px 1fr">200px 1fr</option>
<option value="repeat(3,1fr)">repeat(3,1fr)</option>
</select></label>
<div class="stage" id="p2GridStage" style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
  <div class="demo-box">1</div><div class="demo-box">2</div><div class="demo-box">3</div><div class="demo-box">4</div>
</div>
<div class="out" id="p2GridOut">Grid columns: 1fr 1fr</div>
</div>`,
    quiz: [['What does <code>1fr</code> mean?', 'One share of remaining free space.'],
           ['Flex vs Grid one-liner?', 'Flex = 1D; Grid = 2D tracks.']]
  },
  {
    id: 5, title: '5. Responsive basics &amp; media queries',
    why: 'Mobile failures are real bugs — Playwright projects often run a mobile project for a reason.',
    body: `<pre><code>.nav { display: flex; }
@media (max-width: 600px) {
  .nav { flex-direction: column; }
}
</code></pre>
<ul>
<li>Design mobile-first (<code>min-width</code> queries) when you can</li>
<li>Test at common widths: ~375, 768, 1280</li>
<li><code>viewport</code> meta is required for real mobile layout</li>
</ul>
<div class="playground">
<strong>🧪 Width reporter</strong>
<p><button type="button" onclick="p2Width()">Read window width</button></p>
<div class="out" id="p2WidthOut">Click to sample current width (resize then re-click).</div>
</div>`,
    quiz: [['Meta tag needed for mobile CSS?', '<code>&lt;meta name="viewport" content="width=device-width, initial-scale=1"&gt;</code>'],
           ['Why retest at 375px?', 'Nav/stack breakpoints often hide or move controls.']]
  },
  {
    id: 6, title: '6. Units: rem, %, vw/vh',
    why: 'Font zoom + responsive units change hit targets — a11y and mobile projects care.',
    body: `<table><tr><th>Unit</th><th>Relative to</th></tr>
<tr><td><code>px</code></td><td>absolute CSS pixels</td></tr>
<tr><td><code>rem</code></td><td>root font size</td></tr>
<tr><td><code>%</code></td><td>parent (context-dependent)</td></tr>
<tr><td><code>vw</code>/<code>vh</code></td><td>viewport width/height</td></tr>
</table>
<p>Prefer <code>rem</code> for type/spacing so user font settings scale the UI.</p>`,
    quiz: [['Best unit for scalable typography?', '<code>rem</code>'],
           ['100vw is…?', 'Full viewport width.']]
  },
  {
    id: 7, title: '7. Accessibility markup that helps tests',
    why: 'Good a11y markup = stable <code>getByRole</code> / <code>getByLabel</code> — less testid spam.',
    body: `<ul>
<li>Real <code>&lt;button&gt;</code> / <code>&lt;a href&gt;</code> — not clickable divs</li>
<li>Label every input</li>
<li>One <code>h1</code>; don’t skip heading levels wildly</li>
<li><code>alt</code> on meaningful images; <code>alt=""</code> when decorative</li>
<li><code>lang</code> on <code>&lt;html&gt;</code></li>
</ul>
<pre><code>&lt;button aria-pressed="false"&gt;Mute&lt;/button&gt;
&lt;nav aria-label="Primary"&gt;…&lt;/nav&gt;
</code></pre>`,
    quiz: [['Why does aria-label on nav help?', 'Distinguishes landmarks; names the navigation for AT + roles.'],
           ['Clickable div vs button?', 'Prefer button for keyboard/role.']]
  },
  {
    id: 8, title: '8. Color, contrast &amp; focus (light)',
    why: 'Low contrast and missing focus rings fail a11y checks and keyboard testing.',
    body: `<ul>
<li>Aim for WCAG AA contrast (≈ 4.5:1 normal text)</li>
<li>Never remove <code>:focus</code> outlines without a visible replacement</li>
<li>Don’t rely on color alone for errors</li>
</ul>
<pre><code>button:focus-visible {
  outline: 3px solid #1d4f91;
  outline-offset: 2px;
}
</code></pre>`,
    quiz: [['Is outline:none OK with no replacement?', 'No — keyboard users lose position.'],
           ['AA contrast ballpark for normal text?', 'About 4.5:1']]
  },
  {
    id: 9, title: '9. Layout pitfalls for testers',
    why: 'Overlap, overflow hidden, and sticky headers cause “not visible” / wrong click targets.',
    body: `<table><tr><th>Smell</th><th>What you see</th></tr>
<tr><td><code>overflow: hidden</code></td><td>Clipped content; Playwright may still think attached</td></tr>
<tr><td>z-index stacking</td><td>Click hits overlay</td></tr>
<tr><td>fixed header</td><td>Element covered; need scroll-into-view offset</td></tr>
<tr><td>duplicate names</td><td>getByRole strict mode violation</td></tr>
</table>
<div class="quiz-box"><strong>🐞 Spot-the-Bug</strong>
<details><summary>Test clicks “Save” but hits a transparent marketing banner</summary><p class="quiz-correct">Stacking/overlay — inspect z-index &amp; pointer-events; dismiss banner or target with trial.</p></details>
<details><summary>Two buttons named Submit on page</summary><p class="quiz-correct">Strict mode ambiguity — scope to form or use testid.</p></details>
</div>`,
    quiz: [['Covered by sticky header — first check?', 'Scroll into view / layout; maybe offset or dismiss chrome.'],
           ['Strict mode violation means?', 'Locator resolved to multiple elements.']]
  },
  {
    id: 10, title: '10. Practice, challenges &amp; answer key',
    why: 'Build tiny layout fluency before Part 3’s mini page.',
    body: `<ol>
<li>Make a flex header: logo left, nav right.</li>
<li>Make a 2-column grid that becomes 1 column under 600px.</li>
<li>Add <code>:focus-visible</code> outline to buttons.</li>
<li>Label a search field accessibly.</li>
<li>Explain why <code>#app .btn</code> beats <code>.btn</code>.</li>
</ol>
<details><summary>Answer key (sketch)</summary>
<ol>
<li><code>display:flex; justify-content:space-between; align-items:center</code></li>
<li><code>grid-template-columns:1fr 1fr</code> + <code>@media (max-width:600px){ … 1fr }</code></li>
<li>outline + offset on <code>:focus-visible</code></li>
<li><code>&lt;label for="q"&gt;</code> + <code>id="q"</code></li>
<li>Higher specificity (extra id + class vs class)</li>
</ol>
</details>`,
    quiz: [['After Part 2, what’s next?', 'Part 3 mini page + Playwright checklist (not full E2E course).']]
  }
];

const p2Extras = `
  window.p2Spec = function () {
    function score(s) {
      s = s.trim();
      let id = (s.match(/#[\\w-]+/g) || []).length;
      let cls = (s.match(/\\.[\\w-]+/g) || []).length + (s.match(/\\[[^\\]]+\\]/g) || []).length;
      let el = (s.match(/^[a-z]+|[\\s>+~][a-z]+/gi) || []).length;
      return { id, cls, el, raw: s };
    }
    const a = score(document.getElementById('p2SpecA').value);
    const b = score(document.getElementById('p2SpecB').value);
    let winner = 'Tie / depends on source order';
    if (a.id !== b.id) winner = (a.id > b.id ? 'A' : 'B') + ' wins (more ids)';
    else if (a.cls !== b.cls) winner = (a.cls > b.cls ? 'A' : 'B') + ' wins (more classes/attrs)';
    else if (a.el !== b.el) winner = (a.el > b.el ? 'A' : 'B') + ' wins (more elements)';
    document.getElementById('p2SpecOut').textContent =
      'A ~ (' + a.id + ',' + a.cls + ',' + a.el + ')\\nB ~ (' + b.id + ',' + b.cls + ',' + b.el + ')\\n' + winner;
    addXp(1);
  };
  window.p2Flex = function () {
    const st = document.getElementById('p2FlexStage');
    st.style.justifyContent = document.getElementById('p2FlexJ').value;
    st.style.alignItems = document.getElementById('p2FlexA').value;
    document.getElementById('p2FlexOut').textContent = 'justify=' + st.style.justifyContent + '; align=' + st.style.alignItems;
    addXp(1);
  };
  window.p2Grid = function () {
    const v = document.getElementById('p2GridCols').value;
    document.getElementById('p2GridStage').style.gridTemplateColumns = v;
    document.getElementById('p2GridOut').textContent = 'Grid columns: ' + v;
    addXp(1);
  };
  window.p2Width = function () {
    const w = window.innerWidth;
    let tip = 'Desktop-ish';
    if (w <= 600) tip = 'Mobile breakpoint territory — expect stacked nav';
    else if (w <= 900) tip = 'Tablet-ish — check wrapping';
    document.getElementById('p2WidthOut').textContent = 'innerWidth=' + w + 'px → ' + tip;
    addXp(1);
  };
`;

// ========== PART 3 ==========
const p3Sections = [
  {
    id: 1, title: '1. Mini project brief: LabCard page',
    why: 'One small page ties DOM + layout + a11y into something you can actually test.',
    body: `<p><strong>Build:</strong> a single-page “Lab status” card list for a fictional QA lab.</p>
<ul>
<li>Header with site title + primary nav (Home, Labs)</li>
<li>Main: heading + 2–3 lab cards (name, status badge, Open button)</li>
<li>Footer with copyright</li>
<li>Works at ~375px and desktop; keyboard-focusable controls</li>
</ul>
<p>Keep CSS in a <code>&lt;style&gt;</code> block — offline-friendly, like these study apps.</p>`,
    quiz: [['Why a mini page before Playwright deep-dive?', 'You need realistic DOM/CSS to practice locators & visibility.'],
           ['Must it be a framework app?', 'No — static HTML/CSS is enough.']]
  },
  {
    id: 2, title: '2. Information architecture &amp; semantics',
    why: 'Landmarks and headings become your locator map.',
    body: `<pre><code>&lt;header&gt;
  &lt;p class="brand"&gt;QA Lab Desk&lt;/p&gt;
  &lt;nav aria-label="Primary"&gt;…&lt;/nav&gt;
&lt;/header&gt;
&lt;main&gt;
  &lt;h1&gt;Open labs&lt;/h1&gt;
  &lt;article aria-labelledby="lab-1-title"&gt;…&lt;/article&gt;
&lt;/main&gt;
&lt;footer&gt;…&lt;/footer&gt;
</code></pre>
<p>Use <code>article</code> or list items for cards — give each a heading.</p>`,
    quiz: [['Role for primary nav?', 'navigation (named via aria-label if multiple).'],
           ['Where does <code>h1</code> live?', 'Usually once, in main content.']]
  },
  {
    id: 3, title: '3. Build the HTML skeleton',
    why: 'Stable structure first — cosmetics second.',
    body: `<p>Checklist while you type:</p>
<ul class="checklist">
<li>☐ <code>lang="en"</code> + viewport meta</li>
<li>☐ One <code>h1</code></li>
<li>☐ Labels if any inputs (filter optional)</li>
<li>☐ Real <code>&lt;button&gt;</code> / <code>&lt;a&gt;</code></li>
<li>☐ <code>data-testid</code> on Open buttons (e.g. <code>lab-open-alpha</code>)</li>
</ul>
<div class="playground">
<strong>🧪 Skeleton preview (built-in demo)</strong>
<div class="stage" id="p3Demo"></div>
<p><button type="button" onclick="p3Mount()">Mount demo LabCard page</button></p>
<div class="out" id="p3MountOut">Click to inject a tiny semantic demo into the stage.</div>
</div>`,
    quiz: [['Why add data-testid on Open?', 'Stable explicit hook when card titles change copy.'],
           ['Skip viewport meta?', 'Mobile layout/media queries won’t behave.']]
  },
  {
    id: 4, title: '4. Style with Flex/Grid',
    why: 'Cards in a responsive grid is the Part 2 payoff.',
    body: `<pre><code>.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
}
.card-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
@media (max-width: 600px) {
  .site-header { flex-direction: column; align-items: flex-start; }
}
</code></pre>
<p>Status badge: padding + radius + strong text (don’t use color alone — include the word “Pass/Fail”).</p>`,
    quiz: [['auto-fit minmax helps…?', 'Responsive columns without many breakpoints.'],
           ['Color-only status badge OK?', 'No — include text/icon.']]
  },
  {
    id: 5, title: '5. A11y pass on your page',
    why: 'A 5-minute pass prevents most role/label flakes.',
    body: `<ol>
<li>Tab through — every control shows focus</li>
<li>Headings in order</li>
<li>Buttons have accessible names</li>
<li>Contrast roughly OK on badges/text</li>
<li>Landmarks present (header/main/footer/nav)</li>
</ol>`,
    quiz: [['First keyboard check?', 'Tab order + visible focus.'],
           ['Unnamed button symptom in Playwright?', 'getByRole(\'button\', { name: … }) fails or is awkward.']]
  },
  {
    id: 6, title: '6. How you’d test this in Playwright (checklist)',
    why: 'Bridge to the Playwright kit — without re-teaching E2E here.',
    body: `<p>Full setup, fixtures, and patterns live in <strong><a href="../playwright-essentials/README.md">Playwright Essentials</a></strong>. Here is only a <em>what to assert</em> checklist for LabCard:</p>
<ul class="checklist">
<li>☐ <code>getByRole('heading', { name: 'Open labs' })</code> visible</li>
<li>☐ <code>getByRole('navigation', { name: 'Primary' })</code> present</li>
<li>☐ Open lab via <code>getByTestId('lab-open-alpha')</code> or role+name</li>
<li>☐ Status text “Pass” / “Fail” visible (not color-only)</li>
<li>☐ Mobile project: nav still usable at 375 width</li>
<li>☐ Keyboard: focus Open button, activate with Enter</li>
</ul>
<pre><code>// sketch only — details in playwright-essentials
test('lab cards render', async ({ page }) => {
  await page.goto('/labdesk.html');
  await expect(page.getByRole('heading', { name: 'Open labs' })).toBeVisible();
  await page.getByTestId('lab-open-alpha').click();
});
</code></pre>
<p>Do <strong>not</strong> expand this into a full E2E course here — continue in the Playwright kit.</p>`,
    quiz: [['Where to learn fixtures/Page Object depth?', '../playwright-essentials'],
           ['Prefer getByRole or raw CSS here?', 'getByRole / getByLabel / getByTestId per team strategy.']]
  },
  {
    id: 7, title: '7. Debug failures with DevTools',
    why: 'When the checklist item fails, Elements + Computed still save you.',
    body: `<ol>
<li>Is the node in the DOM?</li>
<li>Is it visible (display/visibility/opacity/coverage)?</li>
<li>Is the accessible name what you expect?</li>
<li>Did a media query change the control?</li>
</ol>
<p>Map each failure to Part 1–2 lessons before changing the test blindly.</p>`,
    quiz: [['Test not visible + node exists → check?', 'Computed visibility / cover / size.'],
           ['Name mismatch often means?', 'Wrong element, split text, or missing label.']]
  },
  {
    id: 8, title: '8. Optional polish &amp; handoff',
    why: 'Ship a calm page someone else can open offline.',
    body: `<ul>
<li>Prefer system fonts; keep motion subtle; honor <code>prefers-reduced-motion</code></li>
<li>Document testids in a one-line README comment</li>
<li>Link your page from this kit’s hub when you save it beside the study apps</li>
</ul>
<div class="mood"><span>Mood after build:</span>
<input type="radio" name="m3" id="m3a"><label for="m3a">😅</label>
<input type="radio" name="m3" id="m3b"><label for="m3b">🙂</label>
<input type="radio" name="m3" id="m3c"><label for="m3c">😎</label>
</div>`,
    quiz: [['Offline-friendly means?', 'Open HTML locally — no build step required for the exercise.']]
  },
  {
    id: 9, title: '9. Practice, challenges &amp; answer key',
    why: 'Close the loop with a short self-check.',
    body: `<ol>
<li>List 3 locators you’d use on LabCard.</li>
<li>Write the grid CSS for responsive cards.</li>
<li>Name 2 a11y checks before opening Playwright.</li>
<li>Where do you go next on the Automation Tester Path?</li>
</ol>
<details><summary>Answer key</summary>
<ol>
<li>e.g. heading, nav, getByTestId open, getByRole button name</li>
<li><code>repeat(auto-fit, minmax(220px, 1fr))</code> + gap</li>
<li>Tab focus; labels/names; landmarks; contrast</li>
<li><a href="../playwright-essentials/README.md">Playwright Essentials</a> (after JE foundations as your path maps)</li>
</ol>
</details>`,
    quiz: [['Part 3’s main deliverable?', 'A small semantic responsive page + Playwright-oriented checklist.']]
  }
];

const p3Extras = `
  window.p3Mount = function () {
    document.getElementById('p3Demo').innerHTML = (
      '<header class="demo-box" style="display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap;">' +
      '<strong>QA Lab Desk</strong><nav aria-label="Primary"><a href="#">Home</a> · <a href="#">Labs</a></nav></header>' +
      '<main style="margin-top:8px;"><h3 style="margin:0 0 8px;">Open labs</h3>' +
      '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:8px;">' +
      '<article class="demo-box"><div style="display:flex;justify-content:space-between;"><span id="lab-1-title">Alpha</span><span>Pass</span></div>' +
      '<button type="button" data-testid="lab-open-alpha">Open</button></article>' +
      '<article class="demo-box"><div style="display:flex;justify-content:space-between;"><span>Beta</span><span>Fail</span></div>' +
      '<button type="button" data-testid="lab-open-beta">Open</button></article>' +
      '</div></main>' +
      '<footer class="demo-box" style="margin-top:8px;">© QA Lab Desk</footer>'
    );
    document.getElementById('p3MountOut').textContent = 'Demo mounted — inspect testids + landmarks. Try tabbing Open.';
    addXp(2);
  };
`;

function writeStudyApp(part, title, subtitle, sections, cards, paths, planHtml, extras, certTitle, certBlurb) {
  const total = sections.length;
  const html = appChrome(part, title, subtitle, total, planHtml) +
    sectionsToAppHtml(sections) +
    appFooter(part, total, certTitle, certBlurb, shellJS(part, total, cards, paths, extras));
  w('Html_css_essentials_part' + part + '_study_app.html', html);
}

// ---- emit all ----
const pathBlurb1 = `Part of the **[Automation Tester Path](../automation-tester-path/README.md)**.
You are here: **Part 1 — HTML/CSS for testers**. Next: [Part 2](Html_css_essentials_part2_with_examples.md) (layout/a11y) → [Part 3](Html_css_essentials_part3_with_examples.md) (mini page) → [Playwright Essentials](../playwright-essentials/README.md).`;

const pathBlurb2 = `You are here: **Part 2 — Layout, responsive, specificity, a11y markup**. Prev: [Part 1](Html_css_essentials_part1_with_examples.md). Next: [Part 3](Html_css_essentials_part3_with_examples.md).`;

const pathBlurb3 = `You are here: **Part 3 — Mini page + Playwright checklist**. Prev: [Part 2](Html_css_essentials_part2_with_examples.md). Deep E2E: [Playwright Essentials](../playwright-essentials/README.md) (do not re-learn E2E here).`;

writeStudyApp(
  1, 'For testers',
  'DOM, forms, attributes/data-testid, DevTools, selectors, visibility & box model — calm, offline study.',
  p1Sections,
  [
    { q: 'What does DOM stand for?', a: 'Document Object Model' },
    { q: 'Best first Playwright locator style?', a: 'Role + accessible name (then testid)' },
    { q: 'display:none vs visibility:hidden?', a: 'none removes from layout; hidden keeps space' },
    { q: 'Why is class often fragile for tests?', a: 'Redesigns rename classes without changing behavior' },
    { q: 'What links a label to an input?', a: 'for= matching id (or wrapping)' }
  ],
  [
    { min: 0, text: 'Start with §1–3: why HTML for testers, tags, forms.' },
    { min: 4, text: 'Next: attributes + DevTools + selectors (§6–8).' },
    { min: 8, text: 'Finish visibility/box model, then practice (§9–12).' },
    { min: 12, text: 'Part 1 done — continue to Part 2 layout/a11y.' }
  ],
  '<ol><li>Day 1: §§1–4</li><li>Day 2: §§5–8</li><li>Day 3: §§9–12 + quizzes</li></ol>',
  p1Extras,
  'HTML & CSS Essentials — Part 1',
  'You can read a page like a tester: DOM, forms, testids, DevTools, selectors, visibility.'
);

writeStudyApp(
  2, 'Layout & a11y',
  'Flex/Grid, responsive, specificity, and accessibility markup that makes locators kinder.',
  p2Sections,
  [
    { q: 'Flex vs Grid?', a: 'Flex = one dimension; Grid = two-dimensional tracks' },
    { q: 'Does #id beat .class?', a: 'Yes' },
    { q: 'Mobile meta tag?', a: 'viewport width=device-width' },
    { q: 'focus outline:none without replacement?', a: 'Not OK for keyboard users' },
    { q: 'Preferred typography unit?', a: 'rem' }
  ],
  [
    { min: 0, text: 'Start with cascade + specificity (§1–2).' },
    { min: 3, text: 'Practice Flex + Grid labs (§3–4).' },
    { min: 6, text: 'Responsive + a11y + focus (§5–8).' },
    { min: 10, text: 'Part 2 done — build the Part 3 mini page.' }
  ],
  '<ol><li>Day 1: §§1–4</li><li>Day 2: §§5–7</li><li>Day 3: §§8–10</li></ol>',
  p2Extras,
  'HTML & CSS Essentials — Part 2',
  'You can reason about Flex/Grid, breakpoints, specificity, and a11y markup.'
);

writeStudyApp(
  3, 'Mini page + test checklist',
  'Build a small LabCard page, then a Playwright-oriented checklist — E2E depth lives in playwright-essentials.',
  p3Sections,
  [
    { q: 'Where is deep Playwright taught?', a: 'playwright-essentials sibling kit' },
    { q: 'Responsive cards CSS idea?', a: 'grid auto-fit minmax' },
    { q: 'Why data-testid on Open?', a: 'Stable hook when copy changes' },
    { q: 'First a11y pass step?', a: 'Keyboard tab + visible focus' },
    { q: 'Color-only status OK?', a: 'No — include text' }
  ],
  [
    { min: 0, text: 'Read the brief + semantics (§1–2).' },
    { min: 3, text: 'Build HTML/CSS (§3–4) then a11y pass (§5).' },
    { min: 6, text: 'Playwright checklist + debug habits (§6–7).' },
    { min: 9, text: 'Part 3 done — open Playwright Essentials.' }
  ],
  '<ol><li>Day 1: brief + HTML</li><li>Day 2: CSS + a11y</li><li>Day 3: checklist + practice</li></ol>',
  p3Extras,
  'HTML & CSS Essentials — Part 3',
  'You built a tiny testable page and know what to assert next in Playwright.'
);

w('Html_css_essentials_part1_with_examples.md', buildPlain(1, 'For testers', pathBlurb1, p1Sections));
w('Html_css_essentials_part2_with_examples.md', buildPlain(2, 'Layout & a11y', pathBlurb2, p2Sections));
w('Html_css_essentials_part3_with_examples.md', buildPlain(3, 'Mini page + Playwright checklist', pathBlurb3, p3Sections));
w('Html_css_essentials_part1_interactive.md', buildInteractive(1, 'For testers', pathBlurb1, p1Sections));
w('Html_css_essentials_part2_interactive.md', buildInteractive(2, 'Layout & a11y', pathBlurb2, p2Sections));
w('Html_css_essentials_part3_interactive.md', buildInteractive(3, 'Mini page + Playwright checklist', pathBlurb3, p3Sections));

w('index.html', `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>HTML &amp; CSS Essentials — Parts 1–3</title>
<style>
  :root{color-scheme:light dark}
  body{margin:0;min-height:100vh;display:grid;place-items:center;font:16px/1.6 "Segoe UI",system-ui,sans-serif;background:#f4f7fb;color:#182333}
  @media (prefers-color-scheme:dark){body{background:#0d1420;color:#dbe4ef}}
  .wrap{max-width:720px;padding:32px;text-align:center}
  h1{color:#1d4f91;margin:0 0 6px}
  @media (prefers-color-scheme:dark){h1{color:#5b9bf0}}
  p.sub{color:#5b6b80;margin:0 0 16px}
  #seriesProgress{background:#1e3a5f;color:#e2e8f0;border-radius:10px;padding:12px 16px;margin:0 0 22px;font-weight:600;text-align:left}
  #seriesProgress .bar{height:8px;background:#4a5568;border-radius:999px;margin-top:8px;overflow:hidden}
  #seriesProgress .fill{height:100%;background:#38a169;width:0%;border-radius:999px}
  .cards{display:grid;gap:14px}
  a.card{display:block;padding:18px 22px;border-radius:12px;text-decoration:none;border:1px solid #d9e2ec;background:#fff;color:inherit;text-align:left;transition:transform .15s,box-shadow .15s}
  a.card:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(15,30,60,.12)}
  @media (prefers-color-scheme:dark){a.card{background:#151f30;border-color:#28374d}}
  .card b{display:block;font-size:17px}
  .card span{color:#5b6b80;font-size:14px}
  .part-meta{font-size:13px;color:#5b6b80;margin:4px 0 0}
  footer{margin-top:28px;font-size:13px;color:#5b6b80}
</style>
</head>
<body>
<div class="wrap">
  <h1>HTML &amp; CSS Essentials</h1>
  <p class="sub">Parts 1–3 — study in three formats (works offline)</p>
  <div id="seriesProgress" aria-live="polite">
    <div id="seriesLabel">Series progress: loading…</div>
    <div class="bar" aria-hidden="true"><div class="fill" id="seriesFill"></div></div>
  </div>
  <h2 style="color:#1d4f91;margin:8px 0 6px;font-size:20px;">Part 1 — For testers</h2>
  <p class="part-meta" data-part-progress="1">Progress: —</p>
  <div class="cards">
    <a class="card" href="Html_css_essentials_part1_study_app.html"><b>Part 1 · Study App</b><span>DOM, forms, testids, DevTools, selectors, visibility — dark mode, progress, quizzes</span></a>
    <a class="card" href="Html_css_essentials_part1_interactive.md"><b>Part 1 · Interactive Markdown</b><span>Quizzes inline — VS Code preview (Ctrl+Shift+V)</span></a>
    <a class="card" href="Html_css_essentials_part1_with_examples.md"><b>Part 1 · Plain Markdown</b><span>Print / PDF / distraction-free</span></a>
  </div>
  <h2 style="color:#2f855a;margin:22px 0 6px;font-size:20px;">Part 2 — Layout &amp; a11y</h2>
  <p class="part-meta" data-part-progress="2">Progress: —</p>
  <div class="cards">
    <a class="card" href="Html_css_essentials_part2_study_app.html"><b>Part 2 · Study App</b><span>Flex/Grid labs, responsive, specificity, a11y markup</span></a>
    <a class="card" href="Html_css_essentials_part2_interactive.md"><b>Part 2 · Interactive Markdown</b><span>Quizzes &amp; notes — VS Code preview</span></a>
    <a class="card" href="Html_css_essentials_part2_with_examples.md"><b>Part 2 · Plain Markdown</b><span>Print / PDF edition</span></a>
  </div>
  <h2 style="color:#b45309;margin:22px 0 6px;font-size:20px;">Part 3 — Mini page + Playwright checklist</h2>
  <p class="part-meta" data-part-progress="3">Progress: —</p>
  <div class="cards">
    <a class="card" href="Html_css_essentials_part3_study_app.html"><b>Part 3 · Study App</b><span>LabCard build + how you’d test in Playwright (links out)</span></a>
    <a class="card" href="Html_css_essentials_part3_interactive.md"><b>Part 3 · Interactive Markdown</b><span>Build notes + checklist — VS Code preview</span></a>
    <a class="card" href="Html_css_essentials_part3_with_examples.md"><b>Part 3 · Plain Markdown</b><span>Print / PDF edition</span></a>
  </div>
  <p class="sub" style="margin:28px 0 8px;text-align:left">
    <strong>Automation Tester Path</strong> —
    <a href="../automation-tester-path/README.md">path map</a> ·
    sibling: <a href="../javascript-essentials/index.html">JavaScript Essentials</a> ·
    next deep E2E: <a href="../playwright-essentials/README.md">Playwright Essentials</a>
  </p>
  <footer>Made for calm, offline study · Part 1: 12 · 2: 10 · 3: 9 sections</footer>
</div>
<script>
(function () {
  var PARTS = [{ n: 1, total: 12 }, { n: 2, total: 10 }, { n: 3, total: 9 }];
  function countDone(part, total) {
    var done = 0;
    for (var i = 1; i <= total; i++) if (localStorage.getItem('p' + part + '-sec-' + i) === '1') done++;
    return done;
  }
  var seriesDone = 0, seriesTotal = 0;
  PARTS.forEach(function (p) {
    var done = countDone(p.n, p.total);
    seriesDone += done; seriesTotal += p.total;
    var el = document.querySelector('[data-part-progress="' + p.n + '"]');
    if (el) el.textContent = 'Progress: ' + done + '/' + p.total + ' sections (' + Math.round((done / p.total) * 100) + '%)';
  });
  var pctAll = seriesTotal ? Math.round((seriesDone / seriesTotal) * 100) : 0;
  document.getElementById('seriesLabel').textContent = 'Series progress: ' + seriesDone + '/' + seriesTotal + ' sections (' + pctAll + '%)';
  document.getElementById('seriesFill').style.width = pctAll + '%';
})();
</script>
</body>
</html>
`);

w('README.md', `# HTML & CSS Essentials

ADHD-friendly study kit for **automation testers**: read the DOM, write kinder locators, and build a tiny page you can assert on — in the same three-edition format as JavaScript Essentials.

> **Progress:** Part 1 ✅ · Part 2 ✅ · Part 3 ✅

### 🧭 Automation Tester Path

Part of the **[Automation Tester Path](../automation-tester-path/README.md)** · [\`START_HERE\`](../automation-tester-path/START_HERE.md)

| | |
|---|---|
| **On the path** | HTML/CSS literacy for locators, visibility, and light UI build |
| **Sibling** | [JavaScript Essentials](../javascript-essentials/README.md) |
| **Next (E2E depth)** | [Playwright Essentials](../playwright-essentials/README.md) — Part 3 only checklists; it does **not** re-teach Playwright |

---

## Choose your edition

| Edition | Best for | Link |
|---|---|---|
| Study app | Browser — theme, progress, quizzes, labs | [Hub \`index.html\`](index.html) |
| Interactive Markdown | VS Code preview quizzes | \`*_interactive.md\` |
| Plain Markdown | Print / PDF | \`*_with_examples.md\` |

### Part 1 — For testers
DOM, forms, attributes/\`data-testid\`, DevTools, CSS selectors, visibility, box model (light).

- [Study app](Html_css_essentials_part1_study_app.html) · [Interactive](Html_css_essentials_part1_interactive.md) · [Plain](Html_css_essentials_part1_with_examples.md)

### Part 2 — Layout & a11y
Flex/Grid, responsive, specificity, a11y markup, focus/contrast (light).

- [Study app](Html_css_essentials_part2_study_app.html) · [Interactive](Html_css_essentials_part2_interactive.md) · [Plain](Html_css_essentials_part2_with_examples.md)

### Part 3 — Mini page + Playwright checklist
LabCard mini build + “how you’d test in Playwright” checklist → links to \`../playwright-essentials\`.

- [Study app](Html_css_essentials_part3_study_app.html) · [Interactive](Html_css_essentials_part3_interactive.md) · [Plain](Html_css_essentials_part3_with_examples.md)

## Quick start

\`\`\`bash
git clone https://github.com/Rohithr1008/html-css-essentials.git
\`\`\`

1. Open [\`index.html\`](index.html) or any \`*_study_app.html\` in a browser (offline OK).
2. Or open a \`*_interactive.md\` with Ctrl+Shift+V in VS Code.

Regenerate apps from source: \`node _generate.js\`

---

*Calm UI · quizzes · offline-friendly.*
`);

w('START_HERE.md', `# START HERE — HTML & CSS Essentials

**Status:** Parts 1–3 complete  
**Hub:** [\`index.html\`](index.html)

## What to do (pick one)

### Option A — Fastest (browser)
1. Open \`index.html\`
2. Start **Part 1 · Study App**
3. Use Focus Mode if the chrome feels noisy
4. Mark sections complete as you go (progress saves in localStorage)

### Option B — VS Code
1. Open \`Html_css_essentials_part1_interactive.md\`
2. Ctrl+Shift+V
3. Expand quiz answers as you study

### Option C — Print / PDF
Use \`Html_css_essentials_part1_with_examples.md\` (then parts 2–3).

## Suggested order
1. Part 1 — think like a tester in the DOM  
2. Part 2 — layout + a11y markup  
3. Part 3 — mini page + Playwright checklist  
4. Continue to [Playwright Essentials](../playwright-essentials/README.md)

## Files
| File | Purpose |
|---|---|
| \`HANDOFF.md\` | Conventions for the next human/AI session |
| \`_generate.js\` | Regenerates curriculum files |
| \`_shell.css\` / \`_shell.js\` | Shared shell reference (inlined into apps by generator) |
`);

w('HANDOFF.md', `# Handoff — HTML & CSS Essentials

> Read this before editing. Match the JavaScript Essentials three-edition pattern.

## Overview
ADHD/autistic-friendly kit teaching HTML/CSS **for automation testers**.

| Part | Title | Sections | Covers |
|---|---|---|---|
| 1 | For testers | 12 | DOM, forms, testids, DevTools, selectors, visibility, box model |
| 2 | Layout & a11y | 10 | Flex/Grid, responsive, specificity, a11y, focus |
| 3 | Mini page + checklist | 9 | LabCard build + Playwright-oriented checklist (link out) |

**Repo:** https://github.com/Rohithr1008/html-css-essentials

## Naming
- \`Html_css_essentials_partN_with_examples.md\` — plain
- \`Html_css_essentials_partN_interactive.md\` — interactive MD
- \`Html_css_essentials_partN_study_app.html\` — offline study app
- Sentinels: \`<!--PN-END-->\`, \`<!--PNI-END-->\`, \`<!--PNH-END-->\`

## Study-app features (keep consistent)
Theme toggle, font zoom, progress (\`pN-sec-N\`), XP/streak, learning path, flashcards, Focus Mode, certificate, skip link, one inline \`<script>\` block.

## Generate
\`\`\`bash
node _generate.js
\`\`\`
Prefer editing \`_generate.js\` section data, then regenerate — don’t hand-drift three editions forever.

## Path links
- Umbrella: \`../automation-tester-path/\`
- Sibling: \`../javascript-essentials/\`
- Next E2E: \`../playwright-essentials/\` (do **not** re-teach Playwright here)

## Do not
- Edit \`typescript-for-testers\` or \`automation-tester-path\` from this workstream unless asked
`);

console.log('Done.');
