(() => {
  const TOKEN_KEY = 'taskboard_token';
  const USER_KEY = 'taskboard_user';

  const loginView = document.getElementById('loginView');
  const boardView = document.getElementById('boardView');
  const loginForm = document.getElementById('loginForm');
  const loginError = document.getElementById('loginError');
  const userBar = document.getElementById('userBar');
  const userName = document.getElementById('userName');
  const logoutBtn = document.getElementById('logoutBtn');
  const addForm = document.getElementById('addForm');
  const newTitle = document.getElementById('newTitle');
  const taskList = document.getElementById('taskList');
  const emptyState = document.getElementById('emptyState');
  const statusText = document.getElementById('statusText');
  const toastEl = document.getElementById('toast');

  let toastTimer;

  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { toastEl.hidden = true; }, 2200);
  }

  function getToken() {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  function setSession(token, user) {
    sessionStorage.setItem(TOKEN_KEY, token);
    sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  function clearSession() {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(USER_KEY);
  }

  async function api(path, options = {}) {
    const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
    const res = await fetch(path, { ...options, headers });
    const text = await res.text();
    let data = null;
    if (text) {
      try { data = JSON.parse(text); } catch { data = { raw: text }; }
    }
    return { res, data };
  }

  function showLogin(errorMsg) {
    loginView.hidden = false;
    boardView.hidden = true;
    userBar.hidden = true;
    if (errorMsg) {
      loginError.textContent = errorMsg;
      loginError.hidden = false;
    } else {
      loginError.hidden = true;
    }
  }

  function showBoard(user) {
    loginView.hidden = true;
    boardView.hidden = false;
    userBar.hidden = false;
    userName.textContent = user.name || user.username;
    loginError.hidden = true;
  }

  function renderTasks(tasks) {
    taskList.innerHTML = '';
    emptyState.hidden = tasks.length > 0;
    for (const task of tasks) {
      const li = document.createElement('li');
      li.className = 'task';
      li.dataset.testid = 'task-item';
      li.dataset.id = String(task.id);

      const info = document.createElement('div');
      const title = document.createElement('p');
      title.className = 'task-title';
      title.textContent = task.title;
      const meta = document.createElement('p');
      meta.className = 'task-meta';
      meta.textContent = `Status: ${task.status} · #${task.id}`;
      info.append(title, meta);

      const actions = document.createElement('div');
      actions.className = 'task-actions';

      const statusSelect = document.createElement('select');
      statusSelect.setAttribute('aria-label', `Status for ${task.title}`);
      statusSelect.dataset.testid = 'status-select';
      for (const s of ['todo', 'doing', 'done']) {
        const opt = document.createElement('option');
        opt.value = s;
        opt.textContent = s;
        if (s === task.status) opt.selected = true;
        statusSelect.appendChild(opt);
      }
      statusSelect.addEventListener('change', async () => {
        const { res, data } = await api(`/api/tasks/${task.id}`, {
          method: 'PATCH',
          body: JSON.stringify({ status: statusSelect.value })
        });
        if (!res.ok) {
          toast(data?.error || 'Update failed');
          await loadTasks();
          return;
        }
        statusText.textContent = `Updated “${task.title}” → ${statusSelect.value}`;
        toast('Task updated');
        await loadTasks();
      });

      const del = document.createElement('button');
      del.type = 'button';
      del.className = 'btn btn-danger btn-sm';
      del.dataset.testid = 'delete-task';
      del.textContent = 'Delete';
      del.addEventListener('click', async () => {
        const { res, data } = await api(`/api/tasks/${task.id}`, { method: 'DELETE' });
        if (!res.ok && res.status !== 204) {
          toast(data?.error || 'Delete failed');
          return;
        }
        statusText.textContent = `Deleted “${task.title}”`;
        toast('Task deleted');
        await loadTasks();
      });

      actions.append(statusSelect, del);
      li.append(info, actions);
      taskList.appendChild(li);
    }
  }

  async function loadTasks() {
    const { res, data } = await api('/api/tasks');
    if (res.status === 401) {
      clearSession();
      showLogin('Session expired — please log in again.');
      return;
    }
    if (!res.ok) {
      statusText.textContent = data?.error || 'Could not load tasks';
      return;
    }
    renderTasks(data.tasks || []);
  }

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    loginError.hidden = true;
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const { res, data } = await api('/api/login', {
      method: 'POST',
      body: JSON.stringify({ username, password })
    });
    if (!res.ok) {
      showLogin(data?.error || 'Login failed');
      return;
    }
    setSession(data.token, data.user);
    showBoard(data.user);
    statusText.textContent = 'Logged in';
    toast('Welcome back');
    await loadTasks();
  });

  logoutBtn.addEventListener('click', () => {
    clearSession();
    showLogin();
    toast('Logged out');
  });

  addForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = newTitle.value.trim();
    if (!title) return;
    const { res, data } = await api('/api/tasks', {
      method: 'POST',
      body: JSON.stringify({ title })
    });
    if (!res.ok) {
      toast(data?.error || 'Could not add task');
      return;
    }
    newTitle.value = '';
    statusText.textContent = `Added “${data.task.title}”`;
    toast('Task added');
    await loadTasks();
    newTitle.focus();
  });

  async function boot() {
    const token = getToken();
    const rawUser = sessionStorage.getItem(USER_KEY);
    if (!token || !rawUser) {
      showLogin();
      return;
    }
    try {
      const user = JSON.parse(rawUser);
      showBoard(user);
      await loadTasks();
    } catch {
      clearSession();
      showLogin();
    }
  }

  boot();
})();
