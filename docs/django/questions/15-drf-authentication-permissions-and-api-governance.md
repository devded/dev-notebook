# DRF authentication, permissions, and API governance

## What is the difference between authentication_classes and permission_classes in DRF?

::: details View Answer
Authentication identifies the user or client making the request. Permissions decide whether that authenticated or anonymous principal may perform the action.
:::

## What DRF authentication methods are common in enterprise systems?

::: details View Answer
Common methods include session authentication for internal tools, token authentication for simple APIs, JWT/OIDC for modern SSO, OAuth2 for delegated access, and mTLS or signed requests for service-to-service calls.
:::

## What is IsAuthenticated?

::: details View Answer
IsAuthenticated is a DRF permission class that allows only authenticated users. It does not by itself enforce object ownership, roles, tenant boundaries, or business-specific authorization.
:::

## What is has_object_permission()?

::: details View Answer
has_object_permission() checks authorization for a specific object, usually after the object is retrieved. It is needed for object-level rules such as ownership, organization membership, or per-resource roles.
:::

## What is throttling in DRF?

::: details View Answer
Throttling limits request rates by user, IP, scope, or custom keys. It protects against abuse, accidental traffic spikes, brute force behavior, and expensive endpoints being overused.
:::

## What is API versioning?

::: details View Answer
API versioning allows clients to migrate between incompatible API changes. DRF supports strategies such as URL path, namespace, host name, query parameter, and accept header versioning.
:::

## How would you deprecate an API endpoint?

::: details View Answer
Communicate deprecation timelines, add response headers or documentation warnings, monitor client usage, provide migration guides, and remove only after the agreed support window. Big companies expect predictable lifecycle management.
:::

## What is pagination in DRF?

::: details View Answer
Pagination splits large result sets into pages. DRF supports page number, limit-offset, and cursor pagination. Cursor pagination is often preferred for high-volume stable feeds.
:::

## How do you implement filtering and ordering in DRF?

::: details View Answer
Use filter backends such as DjangoFilterBackend, SearchFilter, and OrderingFilter, or custom filter logic. Always whitelist allowed filter and ordering fields to avoid performance and data exposure problems.
:::

## How do you document DRF APIs for large teams?

::: details View Answer
Generate OpenAPI schemas with tools such as drf-spectacular or DRF's schema support, keep examples accurate, document errors, versioning, authentication, rate limits, pagination, and idempotency behavior.
:::