<!-- Pull Request Template for agent and human contributors -->

## Summary

<!-- Short description of the change -->

## Checklist (agents MUST follow)

- [ ] I updated `.codex/tasks.md` with the task this PR implements.
- [ ] I wrote/updated failing tests that demonstrate the required behavior (TDD first).
- [ ] All tests pass locally and in CI.
- [ ] I created or updated `CHANGELOG.md` with a short entry describing this change.

## Website Exploration-specific rules (only for PRs that include generated artifacts)

- [ ] This PR was created on a feature branch named `generated/<target>-<timestamp>` or `proto/<feature>`.
- [ ] I confirmed `.codex/config.json.agent_capabilities.allow_web_exploration` is true before capturing any data.
- [ ] I performed a legal check: `robots.txt` and Terms of Service allow the requested capture (recorded in `.codex/context.md`).
- [ ] Explorer outputs (HTML, network traces) are NOT committed to `main`. If included in this PR, they are minimal and redacted for PII.
- [ ] If full explorer outputs are large or contain potential PII, they are uploaded to an external artifact store and referenced in this PR with artifact IDs.

Note: PRs opened from branches with names starting with `codex/` will be auto-merged by CI once all required checks pass and the PR is mergeable. To opt into auto-merge for agent-generated artifacts, create a branch with the `codex/` prefix (for example `codex/target-example-20251007`). Ensure tests and changelog are present before relying on auto-merge.

## Testing & Validation

Describe test plan and what was validated:

- Unit tests added:
- Integration tests added:
- E2E smoke test (if applicable):

## Reviewer notes

Any manual steps or known limitations for reviewers.

---

Thank you for following the repository conventions. PRs that do not follow these rules may be asked to revise before review.
