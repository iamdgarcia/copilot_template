# Agents

- **Planner**: extracts requirements from the user prompt.
- **Architect**: drafts `docs/REQUIREMENTS.md` and `docs/ARCHITECTURE.md`.
- **Builder**: implements code in `src/`.
- **Tester**: writes/updates tests in `tests/`.
- **Reviewer**: checks PRs against tests and guidelines in `.codex/prompts.md`.
- **Merger**: merges PRs once all checks are green.

Each role is simulated by the AI agent. Humans may intervene at any step if desired.
