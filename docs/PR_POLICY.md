Pull Request Policy

Overview
--------
This document defines the repository's expectations for pull requests (PRs), including agent-generated PRs, approvals, and auto-merge rules.

Key principles
--------------
- Keep `main` instruction-only.
- Generated artifacts must be reviewed and tested in PRs before merging.
- Agent-generated PRs can be auto-merged if they meet strict criteria (checks passing, approvals present, no conflicts).

PR requirements
---------------
1. All PRs must reference a task in `.codex/tasks.md`.
2. PRs must include unit tests and/or integration tests demonstrating behavior.
3. PRs must include an entry in `CHANGELOG.md` describing the change.
4. PRs that include generated artifacts must include a security/privacy note explaining any redactions performed.

Approval & reviewers
--------------------
- By default, PRs require at least one approval from a human reviewer listed in the `CODEOWNERS` file or a member of the `reviewers` team.
- For agent-generated PRs (branches `codex/*`), auto-merge will only proceed after the required approvals are present.
- If no approver is available, the PR should be flagged for manual review and not auto-merged.

Auto-merge criteria for `codex/*` branches
-----------------------------------------
Auto-merge will proceed only when all of the following are true:
- PR is not a draft
- PR head branch name starts with `codex/`
- All required CI checks are completed and successful
- PR is mergeable (no conflicts)
- At least one required approval is present (or defined exceptions applied)

Handling requested reviewers
---------------------------
- The auto-merge workflow will verify the `reviews` API to ensure required reviewers have approved the PR. If any required approval is missing for N minutes (configurable), the job will comment and abort auto-merge.

Operational notes
-----------------
- Agents should create PRs and request reviewers as part of their PR creation step.
- If the PR includes large or sensitive artifacts, upload them to an external artifact store and add links to the PR rather than committing them to `main`.
