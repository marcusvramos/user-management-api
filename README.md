# 🛠️ User Management API

API REST simples para gerenciamento de usuários (CRUD), usada em conjunto com o frontend “User Management Front”.

## 🚀 O que tem aqui
- Endpoints para listar, criar, editar e remover usuários
- Campos: nome, email, role (`admin`, `manager`, `viewer`) e status (`active`)
- Banco SQLite leve e embutido

## 📦 Tecnologias
- Node.js + Express
- better-sqlite3 (SQLite)
- CORS

## 🧩 Como rodar
- `pnpm install` ou `npm install`
- Desenvolvimento: `pnpm dev` ou `npm run dev`
- Produção: `pnpm start` ou `npm start`
- Servidor padrão: `http://localhost:3001`

## 🛠️ Scripts
- `dev` — inicia com watch (desenvolvimento)
- `start` — inicia em produção

## 🔗 Frontend
- Demo (GitHub Pages): https://marcusvramos.github.io/user-management-front
- Repositório (Front): https://github.com/marcusvramos/user-management-front
