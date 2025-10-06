# Copilot / AI Agent Instructions for this repository

This file gives focused, actionable guidance for AI coding agents working in this repo. Keep it short and refer to concrete files and patterns.

- Big picture
  - This is an AI-bootstrap project scaffold. The repo is incrementally built by agents following the process in `BOOTSTRAP.md`.
  - Primary sources of truth: `README.md`, `.codex/context.md`, and `.codex/tasks.md`.
  - High-level roles are defined in `AGENTS.md` (Planner, Architect, Builder, Tester, Reviewer, Merger). Align actions with those roles.

- Workflow rules (required)
  - Always follow TDD: write a failing test first, implement minimal code, then refactor. See `.codex/prompts.md` and `BOOTSTRAP.md`.
  - Never push directly to `main`. Open a PR for every change and wait for Reviewer approval and CI green before merging (`BOOTSTRAP.md`).
  - Update `.codex/tasks.md` and `docs/REQUIREMENTS.md`/`docs/ARCHITECTURE.md` when scope or architecture changes.

- Where to start for a new user request
  1. Read the user request in `README.md` or `.codex/context.md`.
  2. Planner: Extract requirements → write `docs/REQUIREMENTS.md`.
  3. Architect: Draft `docs/ARCHITECTURE.md` and update `.codex/config.json` with detected language/framework.
  4. Builder/Tester: Create `src/` and `tests/`, add failing tests first.

- Project-specific conventions & patterns
  - Test-first development is enforced; tests live under `tests/` (create if missing).
  - Metadata and agent state live under `.codex/`: `.codex/config.json`, `.codex/tasks.md`, `.codex/context.md`, `.codex/prompts.md`.
  - CI / pipeline hints: update `pipelines.yml` with language-specific build/test steps during bootstrap (see `BOOTSTRAP.md`).
  - Documentation is authoritative: keep `README.md`, `docs/REQUIREMENTS.md`, and `docs/ARCHITECTURE.md` in sync with implemented code.

- Integration points & external dependencies
  - There are no declared language/framework settings yet; check and set `.codex/config.json` before adding language-specific code.
  - CI and pipelines are controlled by `pipelines.yml` — update it when adding build/test steps.
  - No external services are configured by default; document any new external integrations in `docs/ARCHITECTURE.md` and `.codex/tasks.md`.

- Examples of actionable edits
  - To implement a feature: (1) update `.codex/tasks.md` with the task, (2) add failing tests in `tests/`, (3) update `.codex/config.json` if you choose a language/framework, (4) implement minimal code in `src/`, (5) update `pipelines.yml` and open a PR.
  - To change the architecture: edit `docs/ARCHITECTURE.md`, include diagrams or ASCII flows, and list affected files in the PR body.

- Files to read first (in order)
  1. `README.md` (user request + project overview)
  2. `BOOTSTRAP.md` (development process)
  3. `.codex/context.md` and `.codex/tasks.md` (current work)
  4. `.codex/config.json` (language/framework metadata)
  5. `.codex/prompts.md` (coding guidelines)
  6. `AGENTS.md` and `docs/*` (roles & docs)

- Small conventions to follow
  - Commit messages: descriptive and reference the `.codex/tasks.md` item when applicable.
  - Keep changes minimal per PR: prefer multiple small PRs focused on TDD cycles.
  - When introducing a language/framework, update `.codex/config.json` with `language` and `framework` fields.

- When something is missing
  - If `docs/REQUIREMENTS.md` or `docs/ARCHITECTURE.md` are blank, create the minimal content needed by the Planner/Architect roles.
  - If `.codex/config.json` has `language` or `framework` still `unset`, set them before adding language-specific code.

- What not to do
  - Don't bypass TDD or push directly to `main`.
  - Don't assume CI steps—update `pipelines.yml` explicitly for the chosen stack.

If anything here is unclear or you want more detail (examples for a specific language/toolchain, CI snippets for GitHub Actions, or explicit test templates), tell me which stack you plan to use and I'll expand the file.
