#!/usr/bin/env node
/**
 * Inline shared study-shell CSS/JS into study apps between markers.
 *
 *   node scripts/inline-shell.js          # --write (default)
 *   node scripts/inline-shell.js --check  # fail if HTML drifts from shared sources
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const APPS = [0, 1, 2, 3, 4, 5].map(
  (n) => `Playwright_essentials_part${n}_study_app.html`
);

const ASSETS = [
  {
    file: path.join(ROOT, "shared", "study-shell.css"),
    start: "<!-- SHARED-SHELL-CSS:START -->",
    end: "<!-- SHARED-SHELL-CSS:END -->",
    label: "CSS",
  },
  {
    file: path.join(ROOT, "shared", "study-shell.js"),
    start: "<!-- SHARED-SHELL-JS:START -->",
    end: "<!-- SHARED-SHELL-JS:END -->",
    label: "JS",
  },
];

const checkOnly = process.argv.includes("--check");
let failed = 0;

function syncAsset(raw, asset) {
  const src = fs.readFileSync(asset.file, "utf8").replace(/\r\n/g, "\n").trimEnd() + "\n";
  const expectedBlock = `${asset.start}\n${src}${asset.end}`;
  const startIdx = raw.indexOf(asset.start);
  const endIdx = raw.indexOf(asset.end);
  if (startIdx < 0 || endIdx < 0 || endIdx < startIdx) {
    return { ok: false, error: `missing ${asset.label} markers`, raw };
  }
  const current = raw.slice(startIdx, endIdx + asset.end.length).replace(/\r\n/g, "\n");
  if (checkOnly) {
    return current === expectedBlock
      ? { ok: true, matched: true, raw }
      : { ok: false, error: `${asset.label} not inlined`, raw };
  }
  const next =
    raw.slice(0, startIdx) + expectedBlock + raw.slice(endIdx + asset.end.length);
  return { ok: true, matched: next === raw, raw: next, wrote: next !== raw };
}

for (const file of APPS) {
  const full = path.join(ROOT, file);
  if (!fs.existsSync(full)) {
    console.error("FAIL:", file, "missing");
    failed++;
    continue;
  }
  let raw = fs.readFileSync(full, "utf8");
  let fileFailed = false;
  let wroteAny = false;

  for (const asset of ASSETS) {
    const result = syncAsset(raw, asset);
    if (!result.ok) {
      console.error(
        "FAIL:",
        file,
        result.error,
        checkOnly && asset.label === "CSS"
          ? "(run: node scripts/inline-shell.js)"
          : asset.label === "JS" && checkOnly
            ? "(add markers + run: node scripts/inline-shell.js)"
            : ""
      );
      failed++;
      fileFailed = true;
      break;
    }
    raw = result.raw;
    if (result.wrote) wroteAny = true;
    if (checkOnly) {
      console.log("OK  ", file, `shared ${asset.label} matches`);
    }
  }

  if (fileFailed) continue;
  if (!checkOnly) {
    if (wroteAny) {
      fs.writeFileSync(full, raw);
      console.log("WROTE", file);
    } else {
      console.log("OK  ", file, "(already current)");
    }
  }
}

if (failed) {
  console.error(`\n${failed} check(s) failed`);
  process.exit(1);
}
if (checkOnly) console.log("\nShared-shell check passed.");
else console.log("\nInline complete.");
