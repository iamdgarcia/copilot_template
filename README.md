# Copilot Template (AI-Bootstrapped)

This repository is a minimal scaffold used by an AI agent to incrementally generate full-stack web SaaS projects (frontend + lightweight backend). It is intended as a starting point and example of the Codex-agent driven workflow described in `BOOTSTRAP.md`.

Key principles
- Incremental development driven by the agent and user requests.
- Test-Driven Development (TDD): write failing tests, implement minimal code, refactor.

Quick overview
- Frontend: simple Vite + React app (entry: `frontend/index.html`, `frontend/src/main.jsx`, `frontend/src/App.jsx`).
- Backend: Minimal Express server (entry: `backend/src/index.js`) and a Vercel-compatible serverless function at `backend/api/index.js`.
- Database: Prisma is present and configured to use a local SQLite DB for development. Serverless-friendly Prisma client helper: `backend/lib/prisma.js`.

Where to start
1. Read `BOOTSTRAP.md` for the agent workflow.
2. See `docs/ARCHITECTURE.md` for system-level design and the generated scaffold expectations.
3. Try the quick-start steps below to run the example scaffold locally.

Quick start (local)
1. Install dependencies for frontend and backend:

  - Frontend (from repo root): `cd frontend && npm install`
  - Backend (from repo root): `cd backend && npm install`

2. Start backend:

  - Development server: `cd backend && npm run dev` (or `node src/index.js`)

3. Start frontend dev server:

  - `cd frontend && npm run dev` (Vite runs on port 5173 by default)

4. Visit the frontend in your browser (usually http://localhost:5173) and the backend root at http://localhost:3000

Important files and entry points

- `frontend/index.html` — Frontend HTML entry that loads `/src/main.jsx`.
- `frontend/src/main.jsx` — React entry that renders `App`.
- `frontend/src/App.jsx` — Minimal React app used as a demo.
- `backend/src/index.js` — Express development server; listens on `process.env.PORT || 3000`.
- `backend/api/index.js` — Vercel serverless function entry.
- `backend/lib/prisma.js` — Serverless-friendly Prisma client helper.
- `docs/ARCHITECTURE.md` — Architecture overview and artifact locations.

If you'd like the agent to scaffold a specific SaaS (endpoints, pages, DB models), add a request to `README.md` or open an issue describing the desired app and the agent will follow the process in `BOOTSTRAP.md`.

Check `.codex/config.json` and `.codex/tasks.md` for agent metadata and active tasks.
