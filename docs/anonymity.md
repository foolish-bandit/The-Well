# Anonymity

What anonymity means for contributors to The Well: what the system protects, what it cannot protect, and the tradeoffs you implicitly accept when you contribute.

Read alongside [`threat-model.md`](./threat-model.md).

## What we promise

1. **No real-name requirement.** Contribute under a pseudonym. Accounts require an email address; we do not verify identity.
2. **Separation of identity and content.** Identity data lives in one D1 database, operated through Clerk. Contribution data lives in a separate D1 database. The join between the two is a random identifier; severing the identity row severs the link.
3. **No identifying telemetry.** No analytics, no third-party scripts on contribution pages. Server logs are scrubbed of IP addresses before they persist beyond 24 hours.
4. **Minimal retention.** Draft submissions are deleted after 30 days. Authentication tokens are short-lived. Session records are purged on logout.
5. **Transparency about legal process.** See [`../CANARY.md`](../CANARY.md).

## What we cannot promise

1. **Network-level observation.** We do not see your ISP's logs and cannot prevent an observer on your network from knowing you visited The Well. If that is a threat you face, use Tor.
2. **Third-party compromise.** Clerk, Cloudflare, and GitHub each hold some data about you. A breach or compelled disclosure at any of them is outside our control. See [`threat-model.md`](./threat-model.md).
3. **Writing-style analysis.** Enough prose under a single pseudonym can be correlated with other writing by the same person. This is a linguistic attack, not a technical one; we cannot prevent it.
4. **Correlation across submissions.** If you contribute one very specific piece of information known to only a few people, you can be identified by elimination. This is a structural risk of any disclosure system.
5. **Your own OPSEC errors.** Logging in from a work laptop on a court network, or reusing an account you use for other things, cannot be undone after the fact.

## If you are a high-risk contributor

"High-risk" here means: you are a court employee, clerk, paralegal, or anyone whose employer would retaliate if they learned of your contribution.

Before contributing:

- Use a device and network not associated with your employer.
- Use Tor Browser with its default settings.
- Create an email address you do not use for anything else. `tutanota.com` and `proton.me` both accept sign-ups over Tor.
- Do not reuse a pseudonym you use elsewhere.
- Contact us first (see [`../SECURITY.md`](../SECURITY.md)) if you are disclosing something novel, so we can advise on attribution risk.

## Revoking a contribution

You can request deletion of your contribution at any time. Because of the identity/content split, the contribution can be deleted without us needing to know which person submitted it — you verify ownership through the Clerk-held token, and the Worker processes the deletion.

## Questions

Open an issue if the question is general. For anything sensitive, use the contact in [`../SECURITY.md`](../SECURITY.md).
