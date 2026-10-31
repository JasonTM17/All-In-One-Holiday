# Security Policy

## Scope

This is a fully static website (Next.js `output: "export"`) — there is no
server, database, authentication, or user-data storage. The main security
surface is:

- Third-party dependencies (npm).
- Outbound links embedded in content (story sources, image credits).
- The generated `public/api/holidays.json` dataset.
- Client-side scripts (service worker, canvas card maker).

## Reporting a vulnerability

Please **do not** open a public issue for security reports.

Instead, report privately via GitHub's
[private vulnerability reporting](https://github.com/jasontm17/All-In-One-Holiday/security/advisories/new)
for this repository. Include:

- A description of the issue and its impact.
- Steps to reproduce (URLs, inputs, or a proof of concept).
- The affected version/commit if known.

You should receive an acknowledgment within a few days. If the report is
confirmed, a fix will be prepared and released before public disclosure.

## Supported versions

Only the latest deployed version (`main` branch on GitHub Pages) is
supported. There are no back-ported fixes.

## Dependency policy

- Dev and runtime dependencies are monitored via Dependabot (weekly).
- Known-vulnerable versions are updated promptly; see open Dependabot PRs.
