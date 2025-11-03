import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create/open database
const db = new Database(path.join(__dirname, '../data/users.db'));

db.pragma('foreign_keys = ON');

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    role TEXT NOT NULL CHECK(role IN ('admin', 'manager', 'viewer')),
    active INTEGER NOT NULL DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// Seed initial data if table is empty
const count = db.prepare('SELECT COUNT(*) as count FROM users').get();
if (count.count === 0) {
  console.log('Seeding database with initial data...');

  const insert = db.prepare(`
    INSERT INTO users (name, email, role, active)
    VALUES (?, ?, ?, ?)
  `);

  const seedData = [
    { name: 'João Silva', email: 'joao.silva@empresa.com', role: 'admin', active: 1 },
    { name: 'Maria Santos', email: 'maria.santos@empresa.com', role: 'admin', active: 1 },
    { name: 'Pedro Oliveira', email: 'pedro.oliveira@empresa.com', role: 'manager', active: 1 },
    { name: 'Ana Costa', email: 'ana.costa@empresa.com', role: 'manager', active: 1 },
    { name: 'Carlos Souza', email: 'carlos.souza@empresa.com', role: 'manager', active: 1 },
    { name: 'Beatriz Lima', email: 'beatriz.lima@empresa.com', role: 'viewer', active: 1 },
    { name: 'Rafael Alves', email: 'rafael.alves@empresa.com', role: 'viewer', active: 1 },
    { name: 'Juliana Ferreira', email: 'juliana.ferreira@empresa.com', role: 'viewer', active: 0 },
    { name: 'Marcos Pereira', email: 'marcos.pereira@empresa.com', role: 'viewer', active: 1 },
    { name: 'Fernanda Rodrigues', email: 'fernanda.rodrigues@empresa.com', role: 'viewer', active: 1 },
  ];

  const insertMany = db.transaction((users) => {
    for (const user of users) {
      insert.run(user.name, user.email, user.role, user.active);
    }
  });

  insertMany(seedData);
  console.log(`✅ Database seeded with ${seedData.length} users`);
}

export default db;
