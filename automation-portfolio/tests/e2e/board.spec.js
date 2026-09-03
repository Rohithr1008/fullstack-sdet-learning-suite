const { test, expect } = require('@playwright/test');

test.describe('E2E TaskBoard', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('login shows seeded tasks', async ({ page }) => {
    await page.getByLabel('Username').fill('demo');
    await page.getByLabel('Password').fill('demo123');
    await page.getByRole('button', { name: 'Log in' }).click();

    await expect(page.getByRole('heading', { name: 'Your tasks' })).toBeVisible();
    await expect(page.getByText('Write acceptance criteria')).toBeVisible();
    await expect(page.getByText('Smoke-test login flow')).toBeVisible();
  });

  test('happy path: add and delete a task', async ({ page }) => {
    await page.getByLabel('Username').fill('demo');
    await page.getByLabel('Password').fill('demo123');
    await page.getByRole('button', { name: 'Log in' }).click();
    await expect(page.getByRole('heading', { name: 'Your tasks' })).toBeVisible();

    const title = `E2E task ${Date.now()}`;
    await page.getByLabel('New task').fill(title);
    await page.getByRole('button', { name: 'Add task' }).click();

    const item = page.locator('[data-testid="task-item"]', { hasText: title });
    await expect(item).toBeVisible();
    await item.getByTestId('delete-task').click();
    await expect(page.locator('[data-testid="task-item"]', { hasText: title })).toHaveCount(0);
  });

  test('negative: bad password shows error and stays on login', async ({ page }) => {
    await page.getByLabel('Username').fill('demo');
    await page.getByLabel('Password').fill('wrong-password');
    await page.getByRole('button', { name: 'Log in' }).click();

    await expect(page.getByRole('alert')).toContainText(/invalid credentials/i);
    await expect(page.getByRole('heading', { name: 'Sign in' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Your tasks' })).toHaveCount(0);
  });
});
