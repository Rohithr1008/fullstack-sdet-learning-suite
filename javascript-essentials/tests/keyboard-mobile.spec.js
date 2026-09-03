const { test, expect } = require("@playwright/test");

const APPS = [1, 2, 3, 4, 5, 6].map((n) => ({
  n,
  path: `/Javascript_essentials_part${n}_study_app.html`,
  focusBtn: `#focusBtn${n}`,
  focusHint: n === 3 ? "#focusHint" : `#focusHint${n}`,
}));

for (const app of APPS) {
  test.describe(`keyboard/mobile Part ${app.n}`, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(app.path);
      await page.evaluate(() => localStorage.clear());
      await page.reload();
    });

    test("skip link reaches progress with keyboard", async ({ page }) => {
      await page.keyboard.press("Tab");
      const skip = page.locator(".skip-link");
      await expect(skip).toBeFocused();
      await page.keyboard.press("Enter");
      await expect(page.locator("#progressBar")).toBeInViewport();
    });

    test("theme toggle flips force class and keeps font class", async ({
      page,
    }) => {
      await page.evaluate((n) => {
        document.documentElement.classList.add("font-md");
        StudyShell.setThemeMode("force-light");
        localStorage.setItem(`p${n}-theme`, "force-light");
      }, app.n);

      const before = await page.evaluate(() => ({
        dark: document.documentElement.classList.contains("force-dark"),
        font: document.documentElement.classList.contains("font-md"),
      }));
      expect(before.dark).toBe(false);
      expect(before.font).toBe(true);

      await page
        .getByRole("button", { name: /toggle light\/dark theme/i })
        .click();
      const after = await page.evaluate(() => ({
        dark: document.documentElement.classList.contains("force-dark"),
        light: document.documentElement.classList.contains("force-light"),
        font: document.documentElement.classList.contains("font-md"),
      }));
      expect(after.dark).toBe(true);
      expect(after.light).toBe(false);
      expect(after.font).toBe(true);
    });

    test("focus mode toggles via keyboard Enter", async ({ page }) => {
      const btn = page.locator(app.focusBtn);
      await btn.focus();
      await page.keyboard.press("Enter");
      await expect(page.locator("body")).toHaveClass(/focus-mode/);
      await expect(page.locator(app.focusHint)).toBeVisible();
      await expect(btn).toHaveAttribute("aria-pressed", "true");
      await page.keyboard.press("Enter");
      await expect(page.locator("body")).not.toHaveClass(/focus-mode/);
      await expect(btn).toHaveAttribute("aria-pressed", "false");
    });

    test("font zoom A+ adds font-md without wiping theme", async ({ page }) => {
      await page.evaluate((n) => {
        StudyShell.setThemeMode("force-dark");
        localStorage.setItem(`p${n}-theme`, "force-dark");
      }, app.n);
      await page.getByRole("button", { name: /increase text size/i }).click();
      const state = await page.evaluate(() => ({
        dark: document.documentElement.classList.contains("force-dark"),
        font: document.documentElement.classList.contains("font-md"),
      }));
      expect(state.dark).toBe(true);
      expect(state.font).toBe(true);
    });
  });
}
