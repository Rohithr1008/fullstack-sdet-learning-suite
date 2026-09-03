const { test, expect } = require("@playwright/test");
const AxeBuilder = require("@axe-core/playwright").default;

const APPS = [0, 1, 2, 3, 4, 5].map(
  (n) => `Playwright_essentials_part${n}_study_app.html`
);

for (const file of APPS) {
  test(`a11y: ${file} has no critical/serious axe violations`, async ({ page }) => {
    await page.goto(`/${file}`);
    await expect(page.locator("h1").first()).toBeVisible({ timeout: 15000 });
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa"])
      .disableRules(["color-contrast"])
      .analyze();
    const bad = results.violations.filter(
      (v) => v.impact === "critical" || v.impact === "serious"
    );
    expect(bad, JSON.stringify(bad.map((v) => ({ id: v.id, nodes: v.nodes.length })), null, 2)).toEqual([]);
  });
}
