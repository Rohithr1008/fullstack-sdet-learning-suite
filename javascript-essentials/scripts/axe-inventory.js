/**
 * One-shot axe inventory (local). Usage: node scripts/axe-inventory.js
 * Starts serve briefly if needed.
 */
const { spawn } = require("child_process");
const { chromium } = require("@playwright/test");
const AxeBuilder = require("@axe-core/playwright").default;

const PORT = 4180;
const BASE = `http://127.0.0.1:${PORT}`;

async function waitForServer() {
  for (let i = 0; i < 40; i++) {
    try {
      const res = await fetch(BASE + "/");
      if (res.ok || res.status === 404) return;
    } catch (_) {}
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error("serve did not start");
}

(async () => {
  const child = spawn("npx", ["--yes", "serve", "-l", String(PORT), "."], {
    cwd: require("path").join(__dirname, ".."),
    shell: true,
    stdio: "ignore",
  });
  try {
    await waitForServer();
    const browser = await chromium.launch();
    const page = await browser.newPage();
    for (const n of [1, 2, 3, 4, 5]) {
      await page.goto(`${BASE}/Javascript_essentials_part${n}_study_app.html`);
      await page.evaluate(() => {
        document.documentElement.classList.remove("force-dark");
        document.documentElement.classList.add("force-light");
      });
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
        .analyze();
      const bad = results.violations.filter((v) =>
        ["serious", "critical"].includes(v.impact)
      );
      console.log(`\n=== Part ${n} (${bad.length} serious/critical) ===`);
      for (const v of bad) {
        console.log(
          `- ${v.id} [${v.impact}] nodes=${v.nodes.length}: ${v.help}`
        );
      }
    }
    await browser.close();
  } finally {
    child.kill();
  }
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
