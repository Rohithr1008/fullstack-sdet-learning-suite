import React from 'react';

export interface TaskItem {
  id: string;
  title: string;
  status: 'todo' | 'in_progress' | 'completed';
  createdAt: string;
}

interface TaskCardProps {
  task: TaskItem;
  onUpdateStatus: (id: string, status: TaskItem['status']) => void;
  onDeleteTask: (id: string) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onUpdateStatus, onDeleteTask }) => {
  const getBadgeStyle = (status: TaskItem['status']) => {
    switch (status) {
      case 'completed':
        return { bg: 'var(--green-100)', color: 'var(--green-600)', label: 'Completed' };
      case 'in_progress':
        return { bg: 'var(--yellow-100)', color: 'var(--yellow-600)', label: 'In Progress' };
      default:
        return { bg: 'var(--blue-100)', color: 'var(--blue-600)', label: 'To Do' };
    }
  };

  const badge = getBadgeStyle(task.status);

  return (
    <article
      className="task-card"
      data-testid={`task-card-${task.id}`}
      style={{
        backgroundColor: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-md)',
        padding: 'var(--space-4)',
        marginBottom: 'var(--space-3)',
        boxShadow: 'var(--shadow-card)'
      }}
    >
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--color-text)' }}>{task.title}</h3>
        <span
          data-testid="status-badge"
          style={{
            backgroundColor: badge.bg,
            color: badge.color,
            padding: 'var(--space-1) var(--space-3)',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.8rem',
            fontWeight: 700
          }}
        >
          {badge.label}
        </span>
      </header>

      <footer style={{ marginTop: 'var(--space-3)', display: 'flex', gap: 'var(--space-2)', alignItems: 'center' }}>
        <label htmlFor={`status-select-${task.id}`} style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
          Status:
        </label>
        <select
          id={`status-select-${task.id}`}
          data-testid="task-status-select"
          value={task.status}
          onChange={(e) => onUpdateStatus(task.id, e.target.value as TaskItem['status'])}
          aria-label={`Change status for ${task.title}`}
          style={{
            padding: 'var(--space-1) var(--space-2)',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--color-border)',
            backgroundColor: 'var(--color-bg)',
            color: 'var(--color-text)'
          }}
        >
          <option value="todo">To Do</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <button
          className="btn-action"
          data-testid="delete-task-btn"
          onClick={() => onDeleteTask(task.id)}
          aria-label={`Delete task ${task.title}`}
          style={{
            marginLeft: 'auto',
            padding: 'var(--space-1) var(--space-3)',
            backgroundColor: '#b91c1c',
            color: '#ffffff',
            border: 'none',
            borderRadius: 'var(--radius-sm)',
            cursor: 'pointer',
            fontWeight: 700
          }}
        >
          Delete
        </button>
      </footer>
    </article>
  );
};
