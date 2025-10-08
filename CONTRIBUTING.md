
# Contributing

Thanks for helping improve this repository. This project is agent-driven and follows strict rules to keep `main` instruction-only while allowing generated artifacts to be introduced via PRs.

Please read these documents before contributing:

- `docs/PR_POLICY.md` — rules for PRs, approvals, and auto-merge behavior.
- `docs/BRANCH_POLICY.md` — branch naming and artifact handling guidelines.
- `.github/PULL_REQUEST_TEMPLATE.md` — use this template when opening a PR.

General rules
-------------

- Test-Driven Development: write failing tests first, then implement the minimal change to pass, then refactor.
- Keep `main` instruction-only. Generated artifacts should be introduced via `codex/*` or `generated/*` branches and follow the PR policy.
- Do not commit large raw explorer outputs to `main`. Use an external artifact store and reference artifacts in the PR.

Agent-specific guidance
-----------------------

- Agents must consult `.codex/config.json` before performing exploration (look at `agent_capabilities.allow_web_exploration`).
- Agents must record explicit user consent in `.codex/context.md` before any crawling begins.
- Agents must create PRs on `codex/*` branches to opt into auto-merge and request an appropriate human reviewer using the `requested_reviewers` field when creating the PR.

Legal & privacy
---------------

- Agents and humans must perform `robots.txt` and Terms of Service checks before crawling. If crawling is disallowed, do not proceed.
- Redact PII before committing. If any redaction was performed, document it in the PR and `CHANGELOG.md`.

Code of conduct
---------------

Be respectful and constructive. If you find misuse or legal issues, file an issue and ping the maintainers.

Questions
---------
If you're unsure how to proceed, open an issue describing your intended change and tag `agents` or `maintainers` for guidance.

