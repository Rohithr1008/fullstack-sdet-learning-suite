import { Router, Request, Response } from 'express';

export interface Task {
  id: string;
  title: string;
  status: 'todo' | 'in_progress' | 'completed';
  createdAt: string;
}

let tasks: Task[] = [
  {
    id: 'task-1',
    title: 'Setup Phase B Express API Server',
    status: 'completed',
    createdAt: new Date().toISOString()
  },
  {
    id: 'task-2',
    title: 'Build Phase C React UI & CSS Motion Tokens',
    status: 'in_progress',
    createdAt: new Date().toISOString()
  },
  {
    id: 'task-3',
    title: 'Run Automated Playwright E2E & A11y Audit Suite',
    status: 'todo',
    createdAt: new Date().toISOString()
  }
];

export const taskRouter = Router();

// GET all tasks
taskRouter.get('/', (_req: Request, res: Response) => {
  res.json(tasks);
});

// POST new task
taskRouter.post('/', (req: Request, res: Response) => {
  const { title } = req.body;
  if (!title || typeof title !== 'string') {
    return res.status(400).json({ error: 'Title string is required' });
  }

  const newTask: Task = {
    id: `task-${Date.now()}`,
    title: title.trim(),
    status: 'todo',
    createdAt: new Date().toISOString()
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

// PATCH update task status
taskRouter.patch('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  const task = tasks.find(t => t.id === id);
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }

  if (status && ['todo', 'in_progress', 'completed'].includes(status)) {
    task.status = status;
  }

  res.json(task);
});

// DELETE task
taskRouter.delete('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const index = tasks.findIndex(t => t.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  tasks.splice(index, 1);
  res.status(204).send();
});
