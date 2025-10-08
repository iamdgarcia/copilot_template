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
4. Website exploration and cloning (allowed if configured):
   - Check `.codex/config.json.agent_capabilities.allow_web_exploration` before starting.
   - Perform legal checks: `robots.txt`, Terms of Service, and record explicit user consent in `.codex/context.md`.
   - Use headless browser capture (Playwright preferred) to record page HTML, console, and XHR/fetch traces.
   - Store artifacts under the paths in `agent_capabilities.artifact_paths` and write a short summary to `docs/REQUIREMENTS.md`.
   - Add a changelog entry to `CHANGELOG.md` describing the target URL, scope, and any redactions.
4. Always open a PR; never push directly to `main`.
5. PR merges only if:
   - ✅ All tests green
   - ✅ Linting passes
   - ✅ Reviewer agent approves
