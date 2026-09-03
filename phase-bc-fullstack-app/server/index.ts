import express from 'express';
import cors from 'cors';
import { taskRouter } from './routes/tasks.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Task API router
app.use('/api/tasks', taskRouter);

app.listen(PORT, () => {
  console.log(`Phase B API Server listening on http://localhost:${PORT}`);
});
