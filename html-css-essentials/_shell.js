(function () {
  var cfg = window.__KIT__ || { part: 1, total: 12, cards: [], paths: [] };
  var TOTAL = cfg.total;
  var prefix = 'p' + cfg.part;
  var KEY = function (n) { return prefix + '-sec-' + n; };
  var BOOST = prefix + '-boost';
  var FONT = prefix + '-font';
  var THEME = prefix + '-theme';
  var cards = cfg.cards || [];
  var PATHS = cfg.paths || [];
  var srIndex = 0, srShow = false;

  function doneCount() {
    var n = 0;
    for (var i = 1; i <= TOTAL; i++) if (localStorage.getItem(KEY(i)) === '1') n++;
    return n;
  }
  function updateProgress() {
    var n = doneCount();
    var pct = Math.round((n / TOTAL) * 100);
    document.getElementById('progressBar').textContent = '📊 Progress: ' + n + '/' + TOTAL + ' sections (' + pct + '%)';
    for (var i = 1; i <= TOTAL; i++) {
      var btn = document.querySelector('button[data-sec="' + i + '"]');
      if (btn) btn.textContent = localStorage.getItem(KEY(i)) === '1' ? '✅ Completed' : 'Mark Complete';
    }
    var pathEl = document.getElementById('learningPathContent');
    var tip = PATHS.length ? PATHS[0].text : 'Start a section.';
    for (var p = 0; p < PATHS.length; p++) if (n >= PATHS[p].min) tip = PATHS[p].text;
    if (pathEl) pathEl.textContent = tip;
    var cert = document.getElementById('certPanel');
    var status = document.getElementById('certStatus');
    var body = document.getElementById('certBody');
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
    var on = localStorage.getItem(KEY(n)) === '1';
    localStorage.setItem(KEY(n), on ? '0' : '1');
    if (!on) addXp(5);
    updateProgress();
  };
  function loadBoost() { try { return JSON.parse(localStorage.getItem(BOOST) || '{}'); } catch (e) { return {}; } }
  function saveBoost(b) { localStorage.setItem(BOOST, JSON.stringify(b)); }
  function addXp(x) {
    var b = loadBoost();
    b.xp = (b.xp || 0) + x;
    var today = new Date().toDateString();
    if (b.last !== today) {
      b.streak = (b.last && (Date.now() - new Date(b.last).getTime() < 172800000)) ? (b.streak || 0) + 1 : 1;
      b.last = today;
    }
    saveBoost(b);
    renderBoost();
  }
  window.addXp = addXp;
  function renderBoost() {
    var b = loadBoost();
    document.getElementById('pointCount').textContent = (b.xp || 0) + ' XP';
    document.getElementById('streakCount').textContent = (b.streak || 0) + '-day streak';
  }
  window.fontZoom = function (dir) {
    document.body.classList.remove('font-sm', 'font-lg');
    var cur = localStorage.getItem(FONT) || 'md';
    if (dir === 0) cur = 'md';
    else if (dir < 0) cur = cur === 'lg' ? 'md' : 'sm';
    else cur = cur === 'sm' ? 'md' : 'lg';
    localStorage.setItem(FONT, cur);
    if (cur === 'sm') document.body.classList.add('font-sm');
    if (cur === 'lg') document.body.classList.add('font-lg');
  };
  window.toggleTheme = function () {
    var html = document.documentElement;
    var dark = html.classList.toggle('force-dark');
    html.classList.toggle('force-light', !dark);
    localStorage.setItem(THEME, dark ? 'dark' : 'light');
    document.getElementById('themeBtn').textContent = dark ? '☀️ Light mode' : '🌙 Dark mode';
  };
  window.focusMode = function (btn) {
    var on = document.body.classList.toggle('focus-mode');
    btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    document.getElementById('focusHint').style.display = on ? 'block' : 'none';
    if (on) collapseAll(false);
  };
  window.collapseAll = function (open) {
    document.querySelectorAll('details').forEach(function (d) { d.open = !!open; });
  };
  window.surpriseJump = function () {
    var n = 1 + Math.floor(Math.random() * TOTAL);
    var el = document.getElementById('s' + n);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  window.srStart = function () { srIndex = 0; srShow = false; renderSr(); };
  function renderSr() {
    var c = cards[srIndex % cards.length];
    document.getElementById('srQ').textContent = c.q;
    var a = document.getElementById('srA');
    a.style.display = srShow ? 'block' : 'none';
    a.textContent = c.a;
    document.getElementById('srBtns').innerHTML = srShow
      ? '<button type="button" onclick="srNext()">Next</button>'
      : '<button type="button" onclick="srReveal()">Show answer</button>';
  }
  window.srReveal = function () { srShow = true; renderSr(); };
  window.srNext = function () { srIndex++; srShow = false; renderSr(); addXp(1); };

  var theme = localStorage.getItem(THEME);
  if (theme === 'dark' || (!theme && matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('force-dark');
    document.getElementById('themeBtn').textContent = '☀️ Light mode';
  } else {
    document.documentElement.classList.add('force-light');
  }
  fontZoom(0);
  var savedFont = localStorage.getItem(FONT);
  if (savedFont === 'sm') document.body.classList.add('font-sm');
  if (savedFont === 'lg') document.body.classList.add('font-lg');
  renderBoost();
  updateProgress();
})();
