import express from 'express';
import cors from 'cors';
import { getUsers, getUser, createUser, updateUser, deleteUser } from './routes.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/api/users', getUsers);
app.get('/api/users/:id', getUser);
app.post('/api/users', createUser);
app.put('/api/users/:id', updateUser);
app.delete('/api/users/:id', deleteUser);

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║   🚀 Users API Server                  ║
║                                        ║
║   📍 http://localhost:${PORT}           ║
║   🏥 Health: /health                   ║
║   👥 Users: /api/users                 ║
║                                        ║
║   Press Ctrl+C to stop                 ║
╚════════════════════════════════════════╝
  `);
});
