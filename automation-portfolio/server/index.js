const path = require('path');
const express = require('express');
const { createStore } = require('./data');

const PORT = Number(process.env.PORT) || 4173;
const store = createStore();
const app = express();

app.use(express.json());

function bearer(req) {
  const h = req.headers.authorization || '';
  const m = /^Bearer\s+(.+)$/i.exec(h);
  return m ? m[1].trim() : null;
}

function requireAuth(req, res, next) {
  const user = store.userFromToken(bearer(req));
  if (!user) {
    return res.status(401).json({ error: 'Unauthorized — missing or invalid token' });
  }
  req.user = user;
  next();
}

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'taskboard' });
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) {
    return res.status(400).json({ error: 'username and password required' });
  }
  const result = store.login(username, password);
  if (!result) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  res.json(result);
});

app.get('/api/tasks', requireAuth, (req, res) => {
  res.json({ tasks: store.listTasks(req.user.username) });
});

app.post('/api/tasks', requireAuth, (req, res) => {
  const title = (req.body && req.body.title) || '';
  if (!String(title).trim()) {
    return res.status(400).json({ error: 'title is required' });
  }
  const status = (req.body && req.body.status) || 'todo';
  const task = store.createTask(req.user.username, { title, status });
  res.status(201).json({ task });
});

app.get('/api/tasks/:id', requireAuth, (req, res) => {
  const id = Number(req.params.id);
  const task = store.getTask(id, req.user.username);
  if (!task) return res.status(404).json({ error: 'Task not found' });
  res.json({ task });
});

app.patch('/api/tasks/:id', requireAuth, (req, res) => {
  const id = Number(req.params.id);
  const task = store.updateTask(id, req.user.username, req.body || {});
  if (!task) return res.status(404).json({ error: 'Task not found' });
  res.json({ task });
});

app.delete('/api/tasks/:id', requireAuth, (req, res) => {
  const id = Number(req.params.id);
  const ok = store.deleteTask(id, req.user.username);
  if (!ok) return res.status(404).json({ error: 'Task not found' });
  res.status(204).send();
});

const publicDir = path.join(__dirname, '..', 'public');
app.use(express.static(publicDir));
app.get('/', (_req, res) => {
  res.sendFile(path.join(publicDir, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`TaskBoard on http://localhost:${PORT}`);
});
