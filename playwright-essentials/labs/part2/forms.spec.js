const { test, expect } = require("@playwright/test");

test.describe("Part 2 — Locators and actions", () => {
  test("add product to cart via role and test id", async ({ page }) => {
    await page.goto("/demo-app/products.html");
    await page.getByRole("button", { name: "Add Ceramic Mug to cart" }).click();
    await expect(page.getByTestId("cart-count")).toHaveText("1");
    await page.goto("/demo-app/cart.html");
    await expect(page.getByTestId("cart-total")).toContainText("$12");
  });

  test("login form validation and success", async ({ page }) => {
    await page.goto("/demo-app/login.html");
    await page.getByLabel("Email").fill("learner@example.com");
    await page.getByLabel("Password").fill("nope");
    await page.getByTestId("login-submit").click();
    await expect(page.getByRole("alert")).toContainText(/Invalid credentials/i);

    await page.getByLabel("Password").fill("playwright");
    await page.getByTestId("login-submit").click();
    await expect(page).toHaveURL(/\/account(\.html)?\/?$/);
    await expect(page.getByTestId("welcome")).toContainText("learner@example.com");
  });

  test("dialog confirm accept", async ({ page }) => {
    await page.goto("/demo-app/dialog.html");
    page.once("dialog", async (dialog) => {
      expect(dialog.type()).toBe("confirm");
      await dialog.accept();
    });
    await page.getByTestId("confirm-btn").click();
    await expect(page.getByTestId("dialog-result")).toHaveText("Confirmed");
  });
});
