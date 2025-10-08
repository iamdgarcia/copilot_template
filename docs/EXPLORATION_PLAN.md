Website Exploration Plan

Purpose
-------
This document defines the plan and guardrails for agents to explore, capture, and summarize a target website so the repository remains an instruction-only template while enabling agents to run safe, auditable explorations.

Preconditions
-------------
- `.codex/config.json.agent_capabilities.allow_web_exploration` must be true.
- Agent must obtain explicit user consent (recorded in `.codex/context.md`) before crawling.
- Agent must check `robots.txt` and the site's Terms of Service; if prohibited, the agent must abort and notify the user.

Tools & environment
-------------------
- Headless browser: Playwright (recommended) or Puppeteer.
- Network capture: built-in Playwright request/response capture.
- Storage: explorer outputs are written to `backend/src/scripts/explorer/output/<target>/` as JSON and HTML files.
- Analysis: downstream analyzers (separate agents) parse captures to infer schemas.

Crawl scope and depth
---------------------
- Default: visit the root page + all internal pages within the same hostname up to depth 2.
- Respect `robots.txt` and crawl-delay.
- When crawling SPAs, prefer a headless browser load with `networkidle` and capture XHRs for 30-60s after load.
- Allow a `--pages` or `--sitemap` override to supply explicit pages to capture.

Rate limits & politeness
------------------------
- Default concurrency: 1 parallel browser/page per domain.
- Default throttle: 1 request per second per domain (configurable).
- Retries: up to 2 retries for transient network failures with exponential backoff.

Legal & privacy
----------------
- Perform `robots.txt` and TOS checks before any requests.
- If credentials are required, do NOT attempt to brute-force or use scraped credentials. Request user-provided credentials and only use them for the scope defined by the user.
- Redact PII before committing artifacts: emails, phone numbers, national IDs. When redaction occurs, write a record to the changelog describing the action.

Data to capture
----------------
- Page HTML (`page.html`)
- Full network requests (`requests.json`) with method, URL, headers, and resource type
- Full network responses (`responses.json`) with status, headers, and body (text or base64 for binaries)
- Console logs (`console.log`)
- Screenshot (`screenshot.png`) where feasible
- Metadata (`meta.json`) with timestamp, user consent reference, and crawl parameters

Artifact layout
---------------
backend/src/scripts/explorer/output/<target>/
- meta.json
- page.html
- requests.json
- responses.json
- console.log
- screenshot.png

Minimal scripts & invocation
----------------------------
- Provide a minimal explorer script (Playwright) that:
  1. Reads target URL and outDir from CLI args
  2. Performs robots.txt/TOS quick-check
  3. Launches Playwright, navigates, records requests/responses, saves artifacts
- Agents must never commit raw explorer outputs to the main branch without redaction and user approval. Use a generated branch/PR for artifacts or keep outputs in an external artifact store.

Discovery & analysis
--------------------
- Endpoint discovery: collect all XHR/fetch URLs and group by path pattern to form endpoint candidates.
- Schema inference: cluster JSON responses by endpoint and compute a best-effort JSON Schema for each endpoint.
- Auth detection: detect 401/403 patterns and login form submissions; record the flow and ask user for credentials if they want deeper exploration.

Reporting
---------
- Agents must produce a short report placed in `docs/REQUIREMENTS.md` summarizing:
  - Target URL and scope
  - Number of pages captured
  - List of discovered API endpoints and sample schemas
  - Any redactions performed and why
  - Recommended next steps (generate scaffold, manual review, or stop)

Security & audit
----------------
- Keep a changelog entry for each crawl in `CHANGELOG.md` (or an external audit log if repository policy forbids committing crawl outputs).
- If the repository policy forbids storing crawl outputs, agents must upload outputs to an external artifact store and reference the artifact IDs in `docs/REQUIREMENTS.md` and `CHANGELOG.md`.

Acceptable use
--------------
- This plan is for authorized, non-malicious exploration only. Agents must refuse to proceed if the target site forbids automated access or if legal/ethical concerns are present.

