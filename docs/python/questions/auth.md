# Authentication & Authorization

> Add new questions below in the same format: `## Question? <Badge ... />` then the answer.

## What is authentication? <Badge type="tip" text="easy" />

::: details View Answer
Verifying **who** a user is — confirming identity via credentials like a password, token, or biometric. ("Are you who you claim to be?")
:::

## What is authorization? <Badge type="tip" text="easy" />

::: details View Answer
Determining **what** an authenticated user is allowed to do — permissions and access control. ("Are you allowed to do this?") Authentication comes first, then authorization.
:::

## Explain sessions, cookies, and JWT authentication. <Badge type="danger" text="hard" />

::: details View Answer
- **Sessions:** server stores session state; the client holds a session ID (usually in a **cookie**) sent on each request. Stateful — easy to revoke.
- **Cookies:** small key-value data the browser stores and sends automatically; use `HttpOnly`, `Secure`, `SameSite` for safety.
- **JWT:** a signed, self-contained token carrying claims; the server verifies the signature without server-side storage. Stateless and scalable, but harder to revoke before expiry.
:::

## What are OAuth 2.0 and OpenID Connect? <Badge type="danger" text="hard" />

::: details View Answer
**OAuth 2.0** is an *authorization* framework — it lets an app access resources on a user's behalf via access tokens, without sharing passwords (e.g. "Sign in with Google" granting limited access). **OpenID Connect (OIDC)** is an *authentication* layer built on top of OAuth 2.0 that adds an ID token proving the user's identity.
:::