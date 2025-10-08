Copilot Template Backend

This folder contains a minimal Express server scaffold and a Vercel-compatible serverless function. It's intended as a lightweight example backend that the Codex agent can expand with generated routes and Prisma models.

Commands
- Install dependencies: `npm install`
- Start dev server: `npm run dev` (should run `node src/index.js` or equivalent)

Main entry points
- `src/index.js` — Express development server. Listens on `process.env.PORT || 3000` and serves a simple root endpoint.
- `api/index.js` — Vercel serverless function compatible wrapper for the root endpoint.
- `lib/prisma.js` — Serverless-friendly Prisma client helper (single global instance).

Environment variables
- `PORT` — port for the dev server (default 3000)
- `DATABASE_URL` — Prisma DB connection string (for production or CI). For local development, a SQLite URL such as `file:./dev.db` is commonly used.

Serverless notes
- `backend/api/index.js` is a single-file export suitable for Vercel. When deploying to Vercel, set `DATABASE_URL` and any other secrets in the project settings.

Local development tips
- Run the backend and frontend concurrently (using two terminals or a process manager like `concurrently`).
- If you add Prisma schema and migrations, run `npx prisma migrate dev` to create the local DB and `npx prisma db seed` for seeding.
