const { test, expect } = require("@playwright/test");
const AxeBuilder = require("@axe-core/playwright").default;

test.describe("Part 4 — Network mock + a11y + debug helpers", () => {
  test("mock checkout API and place order", async ({ page }) => {
    await page.goto("/demo-app/products.html");
    await page.getByTestId("add-sticker").click();
    await page.goto("/demo-app/checkout.html");

    await page.route("**/api/checkout", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ orderId: "PW-42", ok: true }),
      });
    });

    await page.getByTestId("checkout-name").fill("Ada Tester");
    await page.getByTestId("checkout-address").fill("1 Lab Lane");
    await page.getByTestId("place-order").click();
    await expect(page.getByRole("status")).toContainText("Order PW-42");
  });

  test("axe finds issues on intentionally bad page", async ({ page }) => {
    await page.goto("/demo-app/a11y-bad.html");
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations.length).toBeGreaterThan(0);
  });

  test("home page has no critical axe violations", async ({ page }) => {
    await page.goto("/demo-app/");
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa"])
      .analyze();
    const critical = results.violations.filter((v) => v.impact === "critical" || v.impact === "serious");
    expect(critical, JSON.stringify(critical, null, 2)).toEqual([]);
  });
});
