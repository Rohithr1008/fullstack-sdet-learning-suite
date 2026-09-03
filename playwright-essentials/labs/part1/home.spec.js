const { test, expect } = require("@playwright/test");

test.describe("Part 1 — Foundations", () => {
  test("home page loads with ShopLite heading", async ({ page }) => {
    await page.goto("/demo-app/");
    await expect(page.getByRole("heading", { name: "Welcome to ShopLite" })).toBeVisible();
    await expect(page.getByTestId("shop-now")).toBeVisible();
  });

  test("shop now navigates to products", async ({ page }) => {
    await page.goto("/demo-app/");
    await page.getByTestId("shop-now").click();
    await expect(page).toHaveURL(/\/products(\.html)?\/?$/);
    await expect(page.getByRole("heading", { name: "Products" })).toBeVisible();
  });
});
