# Security Policy

## Scope

### In scope

- The Well's production site and any `*.thewell.law` subdomain.
- The contribution Worker and every endpoint it exposes.
- Authentication flows, including Clerk-hosted components that we configure.
- This repository's source code and build pipeline, to the extent vulnerabilities in them reach production.

### Out of scope

- Third-party services we depend on (Clerk, Cloudflare, GitHub). Report those to the vendor directly.
- Social engineering of maintainers or contributors.
- Physical attacks on our infrastructure.
- Denial-of-service attacks.
- Automated scanner output without proof of exploitability.
- Best-practice recommendations without a demonstrated vulnerability (missing headers, outdated libraries with no known exploit, etc.).

## Reporting a vulnerability

Email **security@thewell.law**. Do not open a public issue for security vulnerabilities.

For sensitive reports, encrypt with our PGP key, published at `https://thewell.law/.well-known/pgp-key.asc`.

### What to include

- A description of the issue.
- Steps to reproduce, or a proof-of-concept.
- The impact you believe it has.
- Whether you would like credit in the advisory and in our Hall of Fame.

## Bounty

We pay cash rewards for legitimate findings.

| Severity | Reward        |
|----------|---------------|
| Critical | $1,000–$3,000 |
| High     | $500–$1,000   |
| Medium   | $200–$500     |
| Low      | $50–$200      |

Severity is judged against our threat model. Findings that compromise contributor anonymity — or demonstrably threaten to — are weighted toward the high end of their bracket.

## Responsible disclosure

We ask researchers to allow **90 days** between first report and public disclosure, or until a fix is released, whichever comes first. We may request a short extension if a fix is ready but not yet deployed; we will not request an extension indefinitely.

Researchers who follow responsible disclosure will not face legal action from us for good-faith testing within scope.

## What to expect

- **48 hours** — we acknowledge receipt of your report.
- **7 days** — initial triage and severity assessment.
- **30 days** — remediation target for valid findings, or a written timeline if remediation takes longer.

## Hall of Fame

Researchers who report valid vulnerabilities are credited, with their consent, at [thewell.law/security/hall-of-fame](https://thewell.law/security/hall-of-fame).

## Legal process

If you are a law enforcement agent, prosecutor, or civil litigant seeking data about contributors, see [CANARY.md](./CANARY.md) and [`docs/threat-model.md`](./docs/threat-model.md). The short version: the system is designed to hold as little as possible about contributors, and overbroad process will be challenged.
