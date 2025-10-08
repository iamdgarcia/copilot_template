Copilot Template Frontend

This folder contains a minimal Vite + React scaffold used by the Codex agent as a starting point for generated frontends.

Purpose

- Example SPA used to preview generated UI components and static pages.

Main entry points

- `index.html` — the HTML entry that loads `/src/main.jsx`.
- `src/main.jsx` — React app bootstrap (creates root and renders `App`).
- `src/App.jsx` — Minimal example component.

Commands

- Install dependencies: `npm install`
- Start dev server (Vite): `npm run dev` (usually serves at http://localhost:5173)
- Build for production: `npm run build`
- Preview production build: `npm run preview` (if available)

Notes

- The dev server expects `backend` to be running if the frontend is configured to call local APIs. Configure any API base URLs using environment variables or Vite's `import.meta.env` system.
