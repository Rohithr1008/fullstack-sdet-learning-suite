import { test, expect } from '@playwright/test';
test.describe('Phase B — Express REST API Tests', () => {
    test('GET /api/health should return ok status', async ({ request }) => {
        const response = await request.get('http://localhost:3001/api/health');
        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body.status).toBe('ok');
    });
    test('GET /api/tasks should return task list', async ({ request }) => {
        const response = await request.get('http://localhost:3001/api/tasks');
        expect(response.status()).toBe(200);
        const tasks = await response.json();
        expect(Array.isArray(tasks)).toBeTruthy();
        expect(tasks.length).toBeGreaterThanOrEqual(1);
    });
    test('POST /api/tasks should create a new task', async ({ request }) => {
        const title = 'Test Task from API Suite';
        const response = await request.post('http://localhost:3001/api/tasks', {
            data: { title }
        });
        expect(response.status()).toBe(201);
        const task = await response.json();
        expect(task.title).toBe(title);
        expect(task.status).toBe('todo');
    });
});
