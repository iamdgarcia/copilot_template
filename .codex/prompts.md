# Coding Guidelines

- Always apply Test-Driven Development (TDD):
  1. Write/extend failing test first.
  2. Implement minimal code to pass.
  3. Refactor with tests green.

- Respect `.codex/config.json` for language/framework.
- Every new feature requires ≥1 test.
- Commit messages must be descriptive.
- Document public functions and classes.

Exploration & cloning rules (short):

- Agents may perform website exploration if `.codex/config.json.agent_capabilities.allow_web_exploration` is true.
- Always run a legal check before crawling: fetch `robots.txt`, inspect Terms of Service, and record user consent in `.codex/context.md` unless a human explicitly waived it.
- Write explorer outputs (HTML, network traces, console logs) to `agent_capabilities.artifact_paths.explorer_output` and reference them in `docs/REQUIREMENTS.md` and `CHANGELOG.md`.
- Redact or avoid storing personal data and secrets. If PII is discovered, the agent should redact and note the action in the changelog entry.
