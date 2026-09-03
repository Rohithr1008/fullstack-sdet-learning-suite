#!/usr/bin/env node
/**
 * Lightweight study-app verification (HANDOFF checklist subset).
 * Usage: node verify-study-apps.js
 */
const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const ROOT = __dirname;
const APPS = [0, 1, 2, 3, 4, 5].map((n) =>
  n === 0
    ? "Playwright_essentials_part0_study_app.html"
    : `Playwright_essentials_part${n}_study_app.html`
);

let failed = 0;

function fail(msg) {
  console.error("FAIL:", msg);
  failed++;
}
function ok(msg) {
  console.log("OK  ", msg);
}

for (const file of APPS) {
  const full = path.join(ROOT, file);
  if (!fs.existsSync(full)) {
    fail(`${file} missing`);
    continue;
  }
  const raw = fs.readFileSync(full, "utf8");

  const bodyCloses = (raw.match(/<\/body>/gi) || []).length;
  const htmlCloses = (raw.match(/<\/html>/gi) || []).length;
  if (bodyCloses !== 1 || htmlCloses !== 1) {
    fail(`${file}: expected 1 </body> and 1 </html> (got ${bodyCloses}/${htmlCloses})`);
  } else {
    ok(`${file}: single body/html close`);
  }

  if (/ðŸ|â€|Ã©|Â /.test(raw)) {
    fail(`${file}: mojibake / encoding corruption detected`);
  } else {
    ok(`${file}: no mojibake patterns`);
  }

  if (!/aria-label="Part navigation"/.test(raw) || !/href="index\.html"/.test(raw)) {
    fail(`${file}: missing Hub/partnav`);
  } else {
    ok(`${file}: Hub partnav present`);
  }

  const scripts = [...raw.matchAll(/<script>([\s\S]*?)<\/script>/gi)];
  if (scripts.length === 0) {
    fail(`${file}: no <script> block`);
    continue;
  }
  const js = scripts.map((m) => m[1]).join("\n;\n");
  const tmp = path.join(ROOT, `_verify_part_tmp.js`);
  fs.writeFileSync(tmp, js);
  const check = spawnSync("node", ["--check", tmp], { encoding: "utf8" });
  fs.unlinkSync(tmp);
  if (check.status !== 0) {
    fail(`${file}: node --check failed\n${check.stderr || check.stdout}`);
  } else {
    ok(`${file}: script syntax OK (${scripts.length} block(s))`);
  }

  if (/<pre><code>[^<]*\n<h2\b/i.test(raw)) {
    fail(`${file}: likely unclosed <pre><code> before <h2>`);
  }

  if (
    !raw.includes("<!-- SHARED-SHELL-CSS:START -->") ||
    !raw.includes("<!-- SHARED-SHELL-CSS:END -->")
  ) {
    fail(`${file}: missing SHARED-SHELL-CSS markers`);
  } else {
    ok(`${file}: shared-shell CSS markers present`);
  }

  if (
    !raw.includes("<!-- SHARED-SHELL-JS:START -->") ||
    !raw.includes("<!-- SHARED-SHELL-JS:END -->")
  ) {
    fail(`${file}: missing SHARED-SHELL-JS markers`);
  } else {
    ok(`${file}: shared-shell JS markers present`);
  }

  if (!/StudyShell\.(toggleTheme|applyTheme|fontZoom|focusMode)/.test(raw)) {
    fail(`${file}: expected StudyShell shell wrappers`);
  } else {
    ok(`${file}: StudyShell wrappers present`);
  }

  if (!/quiz-correct/.test(raw) || !/quiz-wrong/.test(raw)) {
    fail(`${file}: must use both quiz-correct and quiz-wrong`);
  } else {
    ok(`${file}: quiz-correct + quiz-wrong present`);
  }

  if (!/class="skip-link"/.test(raw)) {
    fail(`${file}: missing skip link`);
  } else {
    ok(`${file}: skip link present`);
  }
}

if (failed) {
  console.error(`\n${failed} check(s) failed`);
  process.exit(1);
}
console.log("\nAll study-app checks passed.");
