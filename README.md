# The Well

An open-source, citation-backed database of judicial procedure.

The Well collects, verifies, and publishes information about how judges run their courtrooms: scheduling norms, motion practice, discovery posture, docket tempo, standing orders, and everything else that determines whether a litigant gets a fair hearing. We believe this information should be public, accurate, and owned by nobody.

## Status

Early development. Schema, scraper pipeline, and contribution flow are being designed in the open. Expect breaking changes.

## What's here

- `site/` — Astro static site, rendered from YAML judge data.
- `scrapers/` — Python extractors that turn court documents into structured data.
- `data/` — YAML judge records (CC-BY-SA 4.0).
- `scripts/` — Build, validation, and operational tooling.
- `docs/` — Architecture, threat model, methodology, governance.

## How it works

Public reads are static HTML. Every judge page is pre-rendered from YAML at build time and served from Cloudflare's edge. No database call sits on the read path.

Contributions flow through a small Cloudflare Workers API into a D1 database, kept separate from the identity database. Authentication is handled by Clerk. See [`docs/architecture.md`](./docs/architecture.md).

## Licenses

- **Code** — [AGPL-3.0-only](./LICENSE)
- **Data** (everything under `data/`) — [CC-BY-SA 4.0](./LICENSE-DATA)

The license split is deliberate: the code should stay free even when operated as a service, and the data should be freely reusable with attribution and share-alike.

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md). Contributors can remain pseudonymous — see [`docs/anonymity.md`](./docs/anonymity.md) for what that guarantees and where the limits are.

## Security and transparency

- Vulnerabilities: [SECURITY.md](./SECURITY.md).
- Legal process: [CANARY.md](./CANARY.md).
- Threat model: [`docs/threat-model.md`](./docs/threat-model.md).

## Code of Conduct

[Contributor Covenant v2.1](./CODE_OF_CONDUCT.md) applies to all project spaces.
