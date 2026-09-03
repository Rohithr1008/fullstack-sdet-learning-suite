// @ts-check
const { defineConfig, devices } = require("@playwright/test");

const PORT = 4178;
const BASE = `http://127.0.0.1:${PORT}`;

module.exports = defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: BASE,
    trace: "on-first-retry",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    {
      name: "mobile",
      use: { ...devices["Pixel 5"] },
      testMatch: /keyboard-mobile\.spec\.js/,
    },
  ],
  webServer: {
    command: `npx --yes serve -l ${PORT} .`,
    url: BASE,
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
});
