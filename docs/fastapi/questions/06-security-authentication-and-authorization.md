# Security, Authentication, and Authorization

## How does FastAPI support security schemes?

FastAPI provides security utilities that integrate with OpenAPI, including OAuth2, bearer tokens, API keys, and HTTP basic authentication. These are usually implemented as dependencies.

## What is the difference between authentication and authorization?

Authentication verifies who the user or service is. Authorization decides what that authenticated identity is allowed to do.

## How would you implement JWT authentication in FastAPI?

Receive a bearer token, verify its signature, expiration, issuer, audience, and claims, then load or construct the current user. Put this logic in a dependency.

## What JWT mistakes should you avoid?

Avoid accepting unsigned tokens, skipping issuer/audience checks, using weak secrets, storing sensitive data in token payloads, and trusting client-side claims without server-side authorization.

## What is OAuth2 password flow, and when is it appropriate?

It is a flow where a username and password are exchanged for a token. It is mostly suitable for first-party trusted clients, not arbitrary third-party apps.

## What is OAuth2 authorization code flow?

It is a browser-based OAuth2 flow where users authenticate with an identity provider and the app receives an authorization code to exchange for tokens. It is preferred for many enterprise SSO scenarios.

## How would you integrate FastAPI with enterprise SSO?

Use OpenID Connect/OAuth2 with providers such as Azure AD, Keycloak, Okta, or Auth0. Validate tokens locally or introspect them, map claims to internal roles, and enforce authorization in dependencies.

## What is RBAC?

Role-based access control grants permissions based on roles like admin, manager, or viewer. It is simple but can become coarse if object ownership and context are ignored.

## What is ABAC?

Attribute-based access control uses attributes of the user, resource, action, and environment. It is more flexible for enterprise policies such as department, region, clearance, or tenant.

## What is object-level authorization?

It checks whether the caller can access a specific object, not just an endpoint. For example, a user may access `/invoices/{id}` only if that invoice belongs to their organization.

## Why is object-level authorization important?

Broken object-level authorization is a common API vulnerability. Endpoint-level role checks are insufficient if users can change IDs and access other tenants' data.

## How do you prevent SQL injection in FastAPI?

Use parameterized queries or ORM query builders, never string-concatenate untrusted input into SQL. Validate input, but do not rely on validation alone for SQL safety.

## How do you prevent mass assignment vulnerabilities?

Use explicit request schemas and map allowed fields to domain objects. Never blindly persist all client-provided fields into database models.

## How do you handle CORS securely?

Allow only trusted origins, methods, and headers. Avoid wildcard origins when credentials are used, and treat CORS as browser protection, not server-side authorization.

## How do you protect secrets in FastAPI applications?

Load secrets from environment variables, secret managers, or orchestration platforms. Do not commit secrets, log them, return them in errors, or put them in Docker images.

## How should password hashing be handled?

Use modern password hashing algorithms such as Argon2id or bcrypt through maintained libraries. Never store plaintext passwords or use fast general-purpose hashes like SHA-256 alone.

## What is rate limiting?

Rate limiting restricts how many requests a client can make in a time window. It helps reduce abuse, brute-force attacks, scraping, and accidental overload.

## How would you implement API key authentication?

Read the key from a header, validate it against a secure store or hash, identify the client, and enforce scopes or quotas. Rotate keys and avoid logging them.

## What security headers may be relevant?

Headers like `Strict-Transport-Security`, `X-Content-Type-Options`, and content security policy can matter depending on the API and web clients. TLS termination and reverse proxies often manage them.

## What is a strong answer to a security interview question?

Start with threat modeling, validate inputs, authenticate identities, authorize resources, protect secrets, log security events, test abuse cases, and align with OWASP API Security guidance.
