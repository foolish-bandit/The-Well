# Contributing to The Well

Thank you for considering a contribution. This is a public-interest project; the quality and integrity of what we publish matters.

## Ways to contribute

- **Data corrections** — Tell us when a judge's record is wrong. File a `data_correction` issue, or open a PR against the relevant YAML file with a citation.
- **Observations** — First-hand courtroom observations (scheduling patterns, motion handling, etc.). Submit through the site once contribution intake is live.
- **Jurisdiction requests** — Ask for a court we don't yet cover. File a `jurisdiction_request` issue.
- **Code** — Scrapers, site improvements, tooling. See the setup below.
- **Documentation** — Anything under `docs/` is fair game.

## Anonymity

You can contribute pseudonymously. Read [`docs/anonymity.md`](./docs/anonymity.md) first so you understand what that actually guarantees and what it doesn't.

- **Git commits**: use a pseudonymous name and a protected email (GitHub `noreply` works).
- **Data submissions**: the contribution flow is designed so that identity is separable from content. See [`docs/architecture.md`](./docs/architecture.md) and [`docs/threat-model.md`](./docs/threat-model.md).
- **High-risk contributors** (court employees, etc.): read [`docs/anonymity.md`](./docs/anonymity.md) and contact us via the channel in [SECURITY.md](./SECURITY.md) *before* you submit anything.

## Ground rules

- **Every factual claim needs a citation.** Primary sources (court records, published opinions, official schedules, standing orders) are strongly preferred. Second-hand accounts are accepted but flagged.
- **No speculation, no editorializing.** The Well records what happens, not what we think of it.
- **No identifying information about litigants, witnesses, or jurors** unless it is already in the public record.
- **Respect the [Code of Conduct](./CODE_OF_CONDUCT.md).**

## Hard rule: no AI/LLM in the extraction path

Scrapers, extractors, and the contribution-validation pipeline **must not** use large language models or any AI-based inference to produce, classify, or rewrite data values. Extraction is rules-based: regex, structural parsing, deterministic normalization.

The reason is auditability. Every fact in `data/` must trace to a specific excerpt in a specific source document via a reproducible rule. An LLM's output cannot be reproduced or audited in that way, and a hallucinated procedural rule is worse than a missing one.

LLMs are acceptable for:

- Suggesting review for human moderators (clearly labeled).
- Writing documentation, commit messages, and non-data code.
- Developer tooling that does not touch `data/`.

## Development setup

Prerequisites: Node 20+, Python 3.11+, [`pnpm`](https://pnpm.io), [`uv`](https://docs.astral.sh/uv/).

```bash
git clone https://github.com/thewell/thewell
cd thewell
pnpm install
```

Site (once scaffolded):

```bash
pnpm --filter site dev
```

Scrapers:

```bash
cd scrapers
uv sync
uv run pytest
```

## Pull requests

- Branch from `main`.
- Keep PRs focused — one concern per PR.
- Add or update tests for code changes.
- Add or update citations for data changes.
- Link the issue you're closing, if any.

## Data changes

YAML data lives under `data/`. A PR that changes data should:

- Cite every changed field (primary source preferred).
- Leave a brief note in the PR body explaining the change.
- Not delete historical information unless it was incorrect — prefer marking fields as superseded.

Schema is documented in [`docs/schema.md`](./docs/schema.md).

## Questions

Open a discussion or an issue. For security matters, use [SECURITY.md](./SECURITY.md).
