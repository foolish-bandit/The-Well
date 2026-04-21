# Contributing to The Well

Thank you for considering a contribution. The Well is a public-interest project, and the integrity of what we publish depends on the integrity of what comes in. Read this document before opening a PR.

## Editorial line

These are the principles that govern what we accept and what we refuse.

1. The Well publishes factual, sourced information about judicial procedure. We do not publish opinions or temperament commentary.
2. Contributor identity is architecturally unlinkable from contributions. PRs that add logging, analytics, session tracking, user identifiers on contribution endpoints, or anything that weakens unlinkability will be closed.
3. No AI in the data pipeline. Extractors are regex + parsing.
4. Every fact on the site has a source.

## Adding a new jurisdiction

New jurisdictions live as their own directory under `scrapers/`. Shared utilities live under `scrapers/common/`:

- `scrapers/common/extractors.py` — regex and parsing primitives for standing orders, calendars, and dockets.
- `scrapers/common/normalize.py` — canonicalization helpers (judge names, dates, case numbers).
- `scrapers/common/http.py` — rate-limited fetcher with polite-crawler defaults.

To add a jurisdiction:

1. File a `jurisdiction_request` issue so we can coordinate and avoid duplication.
2. Create `scrapers/<jurisdiction>/` with an entry point and a README describing the source system (court website, docket API, opinion repository).
3. Reuse `scrapers/common/` wherever possible. If you need to extend a common helper, open a separate PR for that change.
4. Generate YAML under `data/<jurisdiction>/` and submit as a PR. Every fact needs a citation, per principle 4.

## Improving extractors

Open a PR against `scrapers/common/extractors.py` or the relevant jurisdiction extractor. Every change must:

- Include a test that fails on `main` and passes with the change.
- Include the source document or an excerpt under `scrapers/<jurisdiction>/tests/fixtures/`.
- Preserve determinism. If the output depends on ordering or ambient state, the extractor is broken.

## Correcting a judge card

Two paths:

1. **Open an issue** with the `data-correction` label. Include the judge URL on our site, the field you believe is wrong, the correct value, and a citation.
2. **Open a PR** directly against the YAML under `data/`. Cite every changed field. Primary sources — published standing orders, docket entries, official calendars — are strongly preferred. Secondary sources are accepted but flagged.

Citations are non-negotiable. A correction without a source is indistinguishable from a rumor.

## What we will not merge

- PRs that add analytics, telemetry, session tracking, or any code that logs user behavior on contribution endpoints.
- PRs that introduce an LLM or any AI inference into the extraction or contribution-validation path.
- Data changes without citations.
- Opinion or temperament commentary.
- Identifying information about litigants, witnesses, or jurors beyond what already appears in the public record.
- Changes that weaken the architectural separation between identity and content.

## Development setup

Prerequisites: Node 20+, Python 3.12+, [`pnpm`](https://pnpm.io), [`uv`](https://docs.astral.sh/uv/).

```bash
git clone https://github.com/thewell-law/thewell
cd thewell
pnpm install
```

Site:

```bash
pnpm --filter site dev
```

Scrapers:

```bash
cd scrapers
uv sync
uv run pytest
```

## First-time contributors

If this is your first open-source contribution anywhere, read the editorial line above and skim [`docs/anonymity.md`](./docs/anonymity.md) and [`docs/threat-model.md`](./docs/threat-model.md). They frame why this project has the constraints it has.

Good first issues:

- Data corrections in jurisdictions we already cover.
- Extractor fixtures that exercise an edge case.
- Documentation typos and clarity improvements.

Ask in a GitHub Discussion before investing hours in a large PR if you are unsure whether it will be accepted.
