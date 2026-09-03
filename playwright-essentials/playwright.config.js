// @ts-check
const { defineConfig, devices } = require("@playwright/test");

const PORT = 4179;
const BASE = `http://127.0.0.1:${PORT}`;

module.exports = defineConfig({
  testDir: ".",
  testMatch: ["{labs,tests}/**/*.spec.js"],
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : "list",
  use: {
    // Repo root so labs use /demo-app/* and a11y can hit study apps
    baseURL: BASE,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
  ],
  webServer: {
    command: `npx --yes serve -l ${PORT} .`,
    url: BASE,
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
});
