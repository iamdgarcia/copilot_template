# Requirements

This document captures the current state of the repository, prioritized gaps, and concrete next actions needed for the Codex platform to fully automate cloning an arbitrary website into a working frontend+backend+database scaffold.

Date: 2025-10-07

1) Inventory (what exists now)
 - Instruction files and agent guidance:
   - `README.md`, `BOOTSTRAP.md`, `AGENTS.md`
   - `.codex/` files: `config.json`, `prompts.md`, `tasks.md`, `context.md` (config now contains `agent_capabilities` flags)
   - `.github/copilot-instructions.md` updated with website-exploration checklist
 - Placeholder docs:
   - `docs/ARCHITECTURE.md` (filled with high-level architecture)
   - `docs/EXPLORATION_PLAN.md` (detailed exploration plan)

2) Gaps / Priority items
 - Exploration tooling (prototype scripts) are intentionally not committed to main to keep repo instruction-only. Agents must produce or request prototypes in a separate branch or ephemeral environment.
 - Schema inference and artifact generation code is not present. We need an Analyzer and Artifact Generator (separate modules/agents) that:
    - ingest explorer outputs
    - infer endpoint schemas
    - output Prisma models and seed data
    - scaffold backend routes and frontend pages into `generated/`
 - CI pipeline is a placeholder; needs concrete build/test steps per chosen stack.
 - Tests: minimal contract tests and e2e smoke tests for generated scaffolds must be added.

3) Security, Legal & Policy
 - Agents must run legal checks before crawling (robots.txt, TOS) and record user consent in `.codex/context.md`.
 - PII handling: agents must redact or avoid committing PII; redaction must be recorded.

4) Acceptance Criteria (for end-to-end automation)
 - Given a publicly accessible URL and explicit user consent, the pipeline should:
   - Produce a `generated/` scaffold containing frontend and backend code.
   - Produce a `prisma` schema (or equivalent ORM model) and seed scripts; local dev DB should be creatable (SQLite recommended).
   - Include tests that validate that the root page renders and API endpoints return recorded response shapes.
   - Provide a changelog entry and `docs/REQUIREMENTS.md` summary describing what was captured and the limitations.

5) Immediate action items (short-term)
 - Planner: confirm default stack (suggestion: Node.js + Prisma + React/Vite). Update `.codex/config.json.language` and `.codex/config.json.framework` accordingly.
 - Architect: finalize `docs/ARCHITECTURE.md` with expected file layout for `generated/` and CI steps.
 - Builder/Tester: create a small Analyzer prototype (separate branch) that accepts `responses.json`, groups by endpoint, and emits sample JSON Schemas and a minimal `prisma/schema.prisma`.
 - CI: add pipeline steps in `pipelines.yml` for building, testing, and running smoke tests on the generated scaffold (run in a PR with generated code attached).

6) Longer-term / research items
 - HTML -> React component transformer (research + prototype).
 - Improved schema inference (handle polymorphic fields, arrays of different shapes).
 - Auth replication & secure credential handling for restricted sites.

7) Reporting and audit
 - Agents must generate a short `docs/REQUIREMENTS.md` update after each exploration summarizing endpoints, sample schemas, and redactions.
 - If repository policy forbids committing explorer outputs, upload them to an artifact store and reference IDs in the docs and changelog.

Notes
 - The repository is intentionally instruction-first. Implementation artifacts (scripts, prototypes) should live in separate branches or an artifacts store to keep `main` clean.
