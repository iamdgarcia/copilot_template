# Architecture

## Automated Website Clone: Architecture Overview

This architecture describes the components used to explore a target website, capture artifacts, infer API/data schemas, and generate a working scaffold (frontend + backend + database) into the `generated/` folder.

High-level components

- Controller (Planner/Architect agent): receives the user input (URL or technical requirements document) and orchestrates the pipeline.
- Explorer (Headless browser): uses Playwright to load pages, capture HTML, network traces (XHR/fetch), console logs, and screenshots. Outputs are written to `backend/src/scripts/explorer/output/`.
- Analyzer: processes explorer outputs to discover routes, cluster API responses, infer JSON schemas, detect auth flows, and extract static assets (CSS/JS/images).
- Artifact Generator: converts inferred schemas to ORM models (Prisma schema by default), generates backend route stubs that return recorded responses, and creates frontend components (static pages or React components) placing results into `generated/`.
- DB Seeder: generates `prisma` seed scripts or SQL seed files and creates a portable SQLite dev DB for quick testing.
- Tests & Validator: generates basic API contract tests (Jest + supertest) and a smoke E2E test (Playwright) that validates key pages render.

ASCII diagram

  [User input]
        |
   [Controller/Planner]
        |
  +-----+-----------------------+
  |                             |
 [Explorer]                 [Analyzer]
  (Playwright)   ---->   (schema infer, asset extractor)
        |                             |
        +-------------+---------------+
                      |
             [Artifact Generator]
                      |
                generated/ (scaffold)

Data & artifact locations

- Explorer output: `backend/src/scripts/explorer/output/`
- Generated scaffold: `generated/`
- Static assets: `assets/`
- Change log: `CHANGELOG.md`

Runtime flow (frontend ↔ backend)

- The frontend is a Vite-powered SPA that typically calls backend APIs at runtime. During development the frontend runs on a separate port (Vite dev server) and the backend runs on `PORT` (default 3000). You can proxy API requests from Vite to the backend or configure the frontend to use absolute API URLs (e.g., http://localhost:3000/api).
- The generated backend exposes REST endpoints that either serve stubbed, recorded responses (initial prototype) or real business logic backed by Prisma models and a database.

Serverless deployment strategy

- Backend code includes a Vercel-compatible function at `backend/api/index.js`. To deploy serverless on Vercel, place `backend` at the project root or configure the build to expose the `api/` folder as serverless functions.
- Use the serverless-friendly Prisma client in `backend/lib/prisma.js` to avoid creating multiple PrismaClient instances across invocations.
- Ensure `DATABASE_URL` and secrets are configured in the serverless provider environment (Vercel env vars, AWS Lambda environment variables, etc.).

Security & Legal

- Agents MUST run legal checks before crawling: fetch `robots.txt` and inspect TOS. Explicit user consent must be recorded in `.codex/context.md`.
- PII discovered during exploration must be redacted before committing.

Extensibility

- The analyzer can be swapped for other inference engines. The default assumes Prisma for ORM and SQLite for local dev.
- CI pipelines should run migrations, seed the DB, run tests, and generate a test preview (optional).

Acceptance criteria for generated scaffold

1. Backend starts and serves at least the root endpoint.
2. Key discovered API endpoints return recorded response shapes (stubbed) and tests validate shapes.
3. Frontend serves static pages or a minimal SPA that renders the main pages captured.

Notes

- This architecture is intentionally modular: the first working prototype will stub backend behavior using recorded responses and simple Prisma models. Later iterations will improve fidelity.
