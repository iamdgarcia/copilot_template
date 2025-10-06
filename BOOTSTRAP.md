# Bootstrap & Incremental Development Instructions

1. Read the user request from `README.md` or the latest update in `.codex/context.md`.
2. If new project:
   - Extract requirements → write `docs/REQUIREMENTS.md`
   - Propose architecture → write `docs/ARCHITECTURE.md`
   - Detect language/framework → update `.codex/config.json`
   - Create `src/` and `tests/` with placeholders
   - Extend `pipelines.yml` with correct build/test steps
3. If existing project:
   - Parse `docs/REQUIREMENTS.md` + `.codex/tasks.md`
   - Propose incremental changes
   - Write failing tests first (**TDD**)
   - Implement code until all tests pass
4. Always open a PR; never push directly to `main`.
5. PR merges only if:
   - ✅ All tests green
   - ✅ Linting passes
   - ✅ Reviewer agent approves
