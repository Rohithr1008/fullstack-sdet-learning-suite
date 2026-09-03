import { test, expect } from '@playwright/test';
test.describe('Phase B & C — End-to-End TaskBoard UI Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });
    test('renders header and task list', async ({ page }) => {
        await expect(page.getByRole('heading', { name: /phase b & c taskboard/i })).toBeVisible();
        await expect(page.getByTestId('new-task-input')).toBeVisible();
    });
    test('adds a new task through controlled form', async ({ page }) => {
        const taskTitle = `Automated E2E Task ${Date.now()}`;
        await page.getByTestId('new-task-input').fill(taskTitle);
        await page.getByTestId('add-task-btn').click();
        await expect(page.getByText(taskTitle)).toBeVisible();
    });
    test('toggles dark theme CSS custom property engine', async ({ page }) => {
        const themeBtn = page.getByTestId('theme-toggle-btn');
        await expect(themeBtn).toContainText('Dark');
        await themeBtn.click();
        await expect(themeBtn).toContainText('Light');
        const htmlClass = await page.locator('html').getAttribute('class');
        expect(htmlClass).toContain('dark-theme');
    });
    test('updates task status via select dropdown', async ({ page }) => {
        const firstTaskCard = page.locator('[data-testid^="task-card-"]').first();
        const select = firstTaskCard.getByTestId('task-status-select');
        await select.selectOption('completed');
        await expect(firstTaskCard.getByTestId('status-badge')).toHaveText('Completed');
    });
});
