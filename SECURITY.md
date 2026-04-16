# Security Policy

## Reporting a vulnerability

**Do not open a public issue for security vulnerabilities.**

Email: `security@thewell.law` (replace before first release).

A PGP key will be published in this file before the first tagged release. Until then, email is acceptable for non-critical reports.

We aim to acknowledge reports within **72 hours** and to provide an initial assessment within **7 days**.

### What to include

- A description of the issue.
- Steps to reproduce, or a proof-of-concept.
- The impact you believe it has.
- Whether you would like credit in the advisory.

### Scope

In scope:

- The Well's site and any `*.thewell.law` subdomain once live.
- The contribution intake Worker.
- This repository's code and build pipeline.
- Any Clerk-facing configuration that we control.

Out of scope:

- Issues in Clerk, Cloudflare, GitHub, or other third-party services — report those to the vendor.
- Social engineering of contributors or maintainers.
- Denial-of-service attacks.
- Automated scanner output without proof of exploitability.

## Legal process

If you are a law enforcement agent, prosecutor, or civil litigant seeking data about contributors, see [CANARY.md](./CANARY.md) and [`docs/threat-model.md`](./docs/threat-model.md). The short version: the system is designed to hold as little as possible about contributors, and overbroad process will be challenged.

## Supported versions

The project is pre-1.0. `main` is the only supported branch.
