Deployment Options and Setup
=============================

This document explains how to deploy the frontend and backend using provider-side builds (no registry needed). The recommended simple setup is:

- Frontend: Vercel (builds from repo, `frontend/` folder)
- Backend: Render (builds and runs from repo, `backend/` folder)

CI workflow included
--------------------
We provide a GitHub Actions workflow `.github/workflows/deploy-vercel-render.yml` that will:

- Build the frontend (npm install + npm run build)
- If `VERCEL_TOKEN`, `VERCEL_ORG_ID`, and `VERCEL_PROJECT_ID` are configured in repository secrets, use the Vercel CLI to deploy the built frontend to your Vercel project.
- If `RENDER_API_KEY` and `RENDER_SERVICE_ID` are configured, the job will call the Render API to trigger a new deploy for the backend service.

Secrets to configure
---------------------
- For Vercel deploy via CLI (optional if you prefer the native Git integration):
  - `VERCEL_TOKEN` — a Vercel personal token
  - `VERCEL_ORG_ID` — your Vercel organization ID
  - `VERCEL_PROJECT_ID` — the Vercel project id for the frontend

- For Render backend deploy trigger:
  - `RENDER_API_KEY` — Render service API key (Bearer)
  - `RENDER_SERVICE_ID` — Render service id for your backend

Notes
-----
- You can instead use provider native GitHub integrations (Vercel/Render) which avoid storing tokens in repo secrets. If possible, prefer the provider's integration — it is simpler and secure.
- If you want to deploy elsewhere (Fly, Railway, Netlify, etc.), I can add provider-specific workflows.

Vercel serverless backend
-------------------------
To deploy the backend as a Vercel serverless project:

- Place serverless functions under `backend/api/` (we provide `backend/api/index.js` as an example).
- Use a serverless-friendly DB and client (see `backend/lib/prisma.js` for a Prisma pattern).
- Configure your Vercel project to point to the `backend/` folder (or use monorepo settings) and set environment variables (e.g., `DATABASE_URL`).

Vercel env vars:
- `DATABASE_URL` — Postgres/connection string
- Any other API keys required by your backend


How the workflow behaves
------------------------
- The workflow runs on pushes to `main`. It will not fail the whole job if deploy tokens are absent; instead it will log that deploy was skipped and succeed the build steps.
