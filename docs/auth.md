# Authentication

The Well uses [Clerk](https://clerk.com) for authentication. This document describes what Clerk does, what it holds, and the configuration choices that follow from the threat model.

## What Clerk does

- Manages sign-up, sign-in, and password reset.
- Stores credentials and enforces 2FA.
- Issues short-lived session JWTs that the contribution Worker verifies.
- Provides the management API used for user-driven account deletion.

## What Clerk holds

Clerk is the system of record for:

- Email address.
- Hashed password (argon2id, per Clerk's defaults).
- 2FA device registration (TOTP apps, security keys).
- Session metadata: creation time, last-used time, approximate geolocation (city-level, derived from IP at creation).
- A Clerk user ID, which our `IDENTITY_DB` references.
- Per-user private metadata including `contribution_key_hash` (derived server-side at account creation from a pepper and random salt) and public metadata including `can_contribute` (set by moderators).

## What Clerk does not hold

- Real name.
- Phone number (we do not collect one — see below).
- Mailing address.
- Any contribution content. Observations, citations, and everything else live in `PUBLIC_DB`, keyed by `contribution_key_hash` that Clerk's claim exposes but never indexes with identity.
- IP address beyond the Clerk session table's "created from" field, which we treat as coarse.

## JWT template

Clerk is configured with a session token template that includes the following private claims. Set this up in the Clerk dashboard under **JWT Templates**:

```json
{
  "aud": "authenticated",
  "contribution_key_hash": "{{user.private_metadata.contribution_key_hash}}",
  "can_contribute": "{{user.public_metadata.can_contribute}}"
}
```

The contribution Worker reads `contribution_key_hash` from the verified JWT and uses it as the write key for `PUBLIC_DB`. It does **not** read the Clerk user ID on the contribution path. `can_contribute` gates access: a `false` or absent value causes the Worker to reject the request.

## Session TTLs

- Session token (JWT): **60 minutes**, rotated via Clerk's refresh flow.
- Refresh token: **7 days**.
- Inactivity timeout: **30 minutes** — sessions idle this long require re-authentication.
- Maximum session lifetime: **7 days** regardless of activity.

Short TTLs mean that a leaked token is useful only briefly, and that a compelled disclosure of session state reveals at most the current week.

## 2FA requirements

- **Required for all contributor accounts** at first sign-in.
- Accepted factors: TOTP apps (Authy, Aegis, 1Password, Google Authenticator) and WebAuthn security keys (YubiKey, Titan, platform authenticators).
- **Maintainer accounts require WebAuthn.** TOTP is not sufficient for accounts that can approve moderation or deploy code.

## Disabled authentication methods

### Magic links

Magic links are **disabled**. A magic link turns account access into "whoever currently reads this inbox":

- Employers, spouses, and shared-device users can intercept email.
- A compromised email provider grants account access without touching our infrastructure.
- Magic links traveling over email are frequently archived, creating a durable auth artifact.

Password + 2FA is stronger against the threats we care about.

### SMS 2FA

SMS 2FA is **disabled**. SIM-swap attacks are well-documented and within the capability of motivated civil adversaries, not just nation-states. Carrier logs also create a record of authentication events that sits outside our control and is reachable by subpoena.

TOTP apps and hardware security keys cover the same use case without the carrier in the loop.

## Account deletion

Users can delete their account from account settings. Deletion:

1. Marks the `IDENTITY_DB` row as tombstoned (retained 30 days for abuse investigation, then purged).
2. Severs the link between Clerk user ID and `contribution_key_hash`.
3. Triggers Clerk's user-deletion flow, which deletes credentials, 2FA registrations, and session records.
4. Via the `user.deleted` webhook, the contribution Worker marks all contributions from that hash as `revoked` (the Worker does not delete them outright — contributions merged into `data/` belong to the public record, and revocation lets the moderator decide whether to carry the fact forward under a different attribution).

## Operational controls

- Maintainer sessions require WebAuthn re-authentication for any action that reads personally identifying data.
- Clerk admin-dashboard access is limited to two maintainers, each holding a hardware key.
- Admin actions are logged to `identity_access_log` (append-only).

## Open questions

- Whether to support pseudonymous OIDC (e.g., Tor-friendly self-hosted IdP) as an alternative to Clerk. Tracked in [`governance.md`](./governance.md).
