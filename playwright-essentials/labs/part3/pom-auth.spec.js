const { test, expect } = require("@playwright/test");
const path = require("path");
const fs = require("fs");

const { LoginPage } = require("./pages/LoginPage");
const { AccountPage } = require("./pages/AccountPage");

test.describe("Part 3 — POM + auth overview", () => {
  test("login via Page Object", async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.signIn("pom@example.com", "playwright");
    const account = new AccountPage(page);
    await expect(account.welcome).toContainText("pom@example.com");
  });

  test("API request smoke (overview — deep API in future kit)", async ({ request }) => {
    const res = await request.get("/demo-app/");
    expect(res.ok()).toBeTruthy();
    const body = await res.text();
    expect(body).toContain("ShopLite");
  });
});

test.describe("Part 3 — storageState setup", () => {
  const authFile = path.join(__dirname, ".auth", "user.json");

  test("save storage state after login", async ({ page }) => {
    fs.mkdirSync(path.dirname(authFile), { recursive: true });
    await page.goto("/demo-app/login.html");
    await page.getByLabel("Email").fill("state@example.com");
    await page.getByLabel("Password").fill("playwright");
    await page.getByTestId("login-submit").click();
    await expect(page).toHaveURL(/\/account(\.html)?\/?$/);
    await page.context().storageState({ path: authFile });
  });
});
