const { test, expect } = require("@playwright/test");

test.describe("Part 5 — CI-ready smoke @smoke", () => {
  test("hub redirects learners via demo home @smoke", async ({ page }) => {
    await page.goto("/demo-app/");
    await expect(page.getByRole("heading", { name: /ShopLite/i })).toBeVisible();
  });

  test("products listing is reachable @smoke", async ({ page }) => {
    await page.goto("/demo-app/products.html");
    await expect(page.getByTestId("product-mug")).toBeVisible();
  });
});

test.describe("Part 5 — extended (grep with --grep-invert @smoke in slow jobs)", () => {
  test("download receipt", async ({ page }) => {
    await page.goto("/demo-app/download.html");
    const [download] = await Promise.all([
      page.waitForEvent("download"),
      page.getByTestId("download-receipt").click(),
    ]);
    expect(download.suggestedFilename()).toMatch(/receipt/i);
  });
});
