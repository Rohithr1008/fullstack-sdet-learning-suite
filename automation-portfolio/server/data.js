/** Seed + in-memory store — resets on each server start for deterministic tests. */

const SEED_USER = {
  username: 'demo',
  password: 'demo123',
  name: 'Demo User'
};

function createStore() {
  let nextId = 3;
  const tokens = new Map();
  const tasks = [
    { id: 1, title: 'Write acceptance criteria', status: 'todo', owner: 'demo' },
    { id: 2, title: 'Smoke-test login flow', status: 'doing', owner: 'demo' }
  ];

  return {
    user: SEED_USER,

    login(username, password) {
      if (username === SEED_USER.username && password === SEED_USER.password) {
        const token = `tok_${SEED_USER.username}_${Date.now()}`;
        tokens.set(token, SEED_USER.username);
        return { token, user: { username: SEED_USER.username, name: SEED_USER.name } };
      }
      return null;
    },

    userFromToken(token) {
      if (!token) return null;
      const username = tokens.get(token);
      return username ? { username, name: SEED_USER.name } : null;
    },

    listTasks(username) {
      return tasks.filter((t) => t.owner === username).map((t) => ({ ...t }));
    },

    getTask(id, username) {
      const task = tasks.find((t) => t.id === id && t.owner === username);
      return task ? { ...task } : null;
    },

    createTask(username, { title, status = 'todo' }) {
      const task = {
        id: nextId++,
        title: String(title).trim(),
        status: status || 'todo',
        owner: username
      };
      tasks.push(task);
      return { ...task };
    },

    updateTask(id, username, patch) {
      const idx = tasks.findIndex((t) => t.id === id && t.owner === username);
      if (idx === -1) return null;
      if (patch.title !== undefined) tasks[idx].title = String(patch.title).trim();
      if (patch.status !== undefined) tasks[idx].status = patch.status;
      return { ...tasks[idx] };
    },

    deleteTask(id, username) {
      const idx = tasks.findIndex((t) => t.id === id && t.owner === username);
      if (idx === -1) return false;
      tasks.splice(idx, 1);
      return true;
    }
  };
}

module.exports = { createStore, SEED_USER };
