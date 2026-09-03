import React, { useState, useEffect } from 'react';
import { TaskCard, TaskItem } from './components/TaskCard.js';

export const App: React.FC = () => {
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [newTitle, setNewTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [darkTheme, setDarkTheme] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/tasks');
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.error('Failed to fetch tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    try {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTitle.trim() })
      });
      const created = await res.json();
      setTasks(prev => [...prev, created]);
      setNewTitle('');
    } catch (err) {
      console.error('Failed to create task:', err);
    }
  };

  const handleUpdateStatus = async (id: string, status: TaskItem['status']) => {
    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      const updated = await res.json();
      setTasks(prev => prev.map(t => t.id === id ? updated : t));
    } catch (err) {
      console.error('Failed to update task status:', err);
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
      setTasks(prev => prev.filter(t => t.id !== id));
    } catch (err) {
      console.error('Failed to delete task:', err);
    }
  };

  const toggleTheme = () => {
    setDarkTheme(prev => !prev);
    document.documentElement.classList.toggle('dark-theme');
  };

  return (
    <main style={{ maxWidth: '760px', margin: '0 auto', padding: 'var(--space-6) var(--space-4)' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)' }}>
        <div>
          <h1 style={{ margin: 0, color: 'var(--color-brand-primary)' }}>Phase B &amp; C TaskBoard</h1>
          <p style={{ margin: 0, color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>
            Full-Stack TypeScript API + React + CSS Tokens + Playwright Suite
          </p>
        </div>
        <button
          className="btn-action"
          data-testid="theme-toggle-btn"
          onClick={toggleTheme}
          aria-label="Toggle theme mode"
          style={{
            padding: 'var(--space-2) var(--space-4)',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--color-border)',
            backgroundColor: 'var(--color-surface)',
            color: 'var(--color-text)',
            cursor: 'pointer',
            fontWeight: 600
          }}
        >
          {darkTheme ? '☀️ Light' : '🌙 Dark'}
        </button>
      </header>

      {/* Add Task Controlled Form */}
      <section
        style={{
          backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-md)',
          padding: 'var(--space-4)',
          marginBottom: 'var(--space-6)',
          boxShadow: 'var(--shadow-card)'
        }}
      >
        <form onSubmit={handleAddTask} style={{ display: 'flex', gap: 'var(--space-3)' }}>
          <label htmlFor="new-task-input" style={{ position: 'absolute', left: '-9999px' }}>
            New Task Title
          </label>
          <input
            id="new-task-input"
            data-testid="new-task-input"
            type="text"
            placeholder="Add new capstone task title..."
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            style={{
              flex: 1,
              padding: 'var(--space-2) var(--space-3)',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--color-border)',
              backgroundColor: 'var(--color-bg)',
              color: 'var(--color-text)',
              fontSize: '1rem'
            }}
          />
          <button
            type="submit"
            className="btn-action"
            data-testid="add-task-btn"
            style={{
              padding: 'var(--space-2) var(--space-6)',
              backgroundColor: 'var(--color-brand-primary)',
              color: '#ffffff',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
              cursor: 'pointer',
              fontWeight: 700
            }}
          >
            Add Task
          </button>
        </form>
      </section>

      {/* Tasks List / Shimmer Loading */}
      <section aria-label="Task list">
        {loading ? (
          <div>
            <div className="skeleton-loader" style={{ marginBottom: '12px' }}></div>
            <div className="skeleton-loader" style={{ marginBottom: '12px' }}></div>
          </div>
        ) : tasks.length === 0 ? (
          <p data-testid="empty-message" style={{ textAlign: 'center', color: 'var(--color-text-muted)' }}>
            No tasks available. Add one above!
          </p>
        ) : (
          tasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onUpdateStatus={handleUpdateStatus}
              onDeleteTask={handleDeleteTask}
            />
          ))
        )}
      </section>
    </main>
  );
};
