Branch Policy for Codex-generated Artifacts

Purpose
-------
This document explains how Codex agents and humans should create branches and PRs when generated artifacts (scaffolds, captures) are produced. It ensures `main` remains instruction-only while enabling safe review and CI for generated code.

Branch naming
-------------
- Agent-generated branches that intend to be auto-merged: `codex/<target>-<YYYYMMDD>-<short-id>`
  - Example: `codex/example-20251007-01`
- Developer or prototype branches: `proto/<feature>` or `generated/<target>-<timestamp>`

PR rules
--------
- PRs containing generated artifacts must:
  - Include a `CHANGELOG.md` entry describing the artifact and redactions performed.
  - Reference the exploration `meta.json` artifact or external artifact ID if raw outputs are stored externally.
  - Not commit large raw explorer outputs to `main`; push them to an external artifact store and reference them in the PR.
- PRs created from `codex/*` branches will be considered for auto-merge by CI once all checks pass and the PR is mergeable.

Approval model
--------------
- Auto-merge requires:
  - All required CI checks passing
  - No blocking review comments
  - PR is not a draft
- Manual merges can be performed by human reviewers following the normal process.

Security & redaction
--------------------
- Always redact PII discovered during exploration before committing artifacts. If redaction is incomplete, add a note in the PR and mark the PR as `needs-review`.

Artifact storage
----------------
- For large explorer outputs, upload artifacts to a secure artifact store (S3, GCS, etc.) and include references in the PR.

Operational notes
-----------------
- Agents should create PRs on `codex/*` branches and rely on the auto-merge workflow. If auto-merge fails, CI will post a comment and a human reviewer should intervene.

