const { test, expect } = require('@playwright/test');

const DEMO = { username: 'demo', password: 'demo123' };

async function login(request) {
  const res = await request.post('/api/login', { data: DEMO });
  expect(res.status()).toBe(200);
  const body = await res.json();
  expect(body.token).toBeTruthy();
  return body.token;
}

test.describe('API auth & tasks', () => {
  test('health returns ok', async ({ request }) => {
    const res = await request.get('/api/health');
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.ok).toBe(true);
  });

  test('login returns token for demo user', async ({ request }) => {
    const res = await request.post('/api/login', { data: DEMO });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.token).toMatch(/^tok_/);
    expect(body.user.username).toBe('demo');
  });

  test('login rejects bad credentials with 401', async ({ request }) => {
    const res = await request.post('/api/login', {
      data: { username: 'demo', password: 'wrong' }
    });
    expect(res.status()).toBe(401);
  });

  test('GET /api/tasks without token returns 401', async ({ request }) => {
    const res = await request.get('/api/tasks');
    expect(res.status()).toBe(401);
  });

  test('create and list tasks with Bearer token', async ({ request }) => {
    const token = await login(request);
    const title = `API task ${Date.now()}`;

    const create = await request.post('/api/tasks', {
      headers: { Authorization: `Bearer ${token}` },
      data: { title }
    });
    expect(create.status()).toBe(201);
    const created = await create.json();
    expect(created.task.title).toBe(title);
    expect(created.task.id).toBeGreaterThan(0);

    const list = await request.get('/api/tasks', {
      headers: { Authorization: `Bearer ${token}` }
    });
    expect(list.status()).toBe(200);
    const body = await list.json();
    expect(body.tasks.some((t) => t.id === created.task.id)).toBe(true);
  });

  test('GET missing task returns 404', async ({ request }) => {
    const token = await login(request);
    const res = await request.get('/api/tasks/999999', {
      headers: { Authorization: `Bearer ${token}` }
    });
    expect(res.status()).toBe(404);
  });

  test('invalid token returns 401 on create', async ({ request }) => {
    const res = await request.post('/api/tasks', {
      headers: { Authorization: 'Bearer not-a-real-token' },
      data: { title: 'Nope' }
    });
    expect(res.status()).toBe(401);
  });
});
