# Warrant Canary

**Last updated:** 2026-04-16

As of the date above, The Well project:

1. Has **not** received any national security letter, FISA order, or other classified legal process.
2. Has **not** received any subpoena, warrant, court order, or informal request for information about a specific contributor.
3. Has **not** been compelled to modify its software, infrastructure, or data handling in a way that would undermine contributor anonymity.
4. Has **not** had any administrator credential, signing key, or production secret compromised, shared under duress, or turned over to a third party.
5. Retains sole control of this repository, the production deployment, and the associated domains.

This canary is updated at least **every 30 days**. If this file is not updated within 45 days of the date above, or if any of the statements above are removed or qualified, readers should assume that at least one of the statements above is no longer true.

## Signing

Once production infrastructure is established, each update will be signed by at least two maintainers using PGP. Signatures will be appended below. Until then, treat the canary as informational.

## What this canary does not cover

- We cannot promise we will never receive legal process. We are stating that we have not at the time of the last signed update.
- We cannot promise that a sufficiently well-resourced adversary cannot compromise infrastructure we depend on (Cloudflare, Clerk, GitHub). See [`docs/threat-model.md`](./docs/threat-model.md).
- A warrant canary is a convention, not a legal instrument. Its meaning rests on the shared understanding of the community that reads it.

## History

- 2026-04-16 — Initial canary established.
