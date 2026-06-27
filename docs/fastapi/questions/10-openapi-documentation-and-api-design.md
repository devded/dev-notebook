# OpenAPI, Documentation, and API Design

## How does FastAPI generate OpenAPI documentation?

FastAPI inspects routes, type hints, Pydantic models, dependencies, status codes, and metadata to generate an OpenAPI schema. The schema powers interactive docs and client generation.

## What is OpenAPI?

OpenAPI is a standard specification for describing HTTP APIs. It documents endpoints, parameters, request bodies, responses, authentication, and schemas.

## Why is OpenAPI important in large companies?

It enables contract-first collaboration, client generation, governance, testing, documentation, and integration between teams. It reduces ambiguity in distributed systems.

## How do you add tags to endpoints?

Use the `tags` parameter in route decorators or routers. Tags group endpoints in generated documentation.

## How do you add summaries and descriptions?

Use `summary` and `description` in path operation decorators, or docstrings for longer descriptions. Good docs should explain behavior, not just repeat names.

## How do you document response status codes?

Use `responses={...}` in route decorators and set explicit `status_code`. This documents success, validation, auth, conflict, and error responses.

## How do you hide an endpoint from OpenAPI docs?

Set `include_in_schema=False` on the route decorator. This is useful for internal endpoints but should not be used as a security mechanism.

## How do you customize the OpenAPI schema?

FastAPI allows custom OpenAPI generation by overriding the app’s `openapi` function. Use this carefully for corporate metadata, gateways, or documentation extensions.

## What is API versioning?

API versioning manages changes over time. Common approaches include URL versioning such as `/v1`, header versioning, or media type versioning.

## What changes require a new API version?

Breaking changes such as removing fields, changing field meanings, renaming endpoints, or changing status code semantics usually require versioning or a careful migration path.

## What is backward compatibility?

Backward compatibility means old clients continue working after the API changes. Additive changes are usually safe; removals and semantic changes are risky.

## How should deprecation be handled?

Document deprecation, add response headers if useful, communicate timelines, monitor usage, and provide migration guidance. Do not break clients silently.

## What is idempotency?

An operation is idempotent if repeating it has the same effect as doing it once. GET, PUT, and DELETE are expected to be idempotent in many REST designs.

## How do you implement idempotency for POST requests?

Accept an idempotency key, store request outcome, and return the same result for retries. This is important for payments, orders, and unreliable networks.

## What is the difference between PUT and PATCH?

PUT usually replaces a resource representation. PATCH applies partial changes. In practice, define semantics clearly and test them.

## How do you design error responses?

Use consistent fields such as code, message, details, correlation ID, and validation errors. Avoid leaking stack traces or internal implementation details.

## What is HATEOAS, and is it common in FastAPI APIs?

HATEOAS means responses include links for available actions. It is part of REST maturity but is not commonly implemented fully in many enterprise JSON APIs.

## How do you design APIs for frontend teams?

Keep schemas stable, document examples, use predictable errors, support pagination/filtering/sorting, and coordinate changes through OpenAPI contracts.

## What is a health endpoint?

A health endpoint reports service status. Production systems often separate liveness, readiness, and dependency health.

## What API design answer stands out?

Explain trade-offs: REST consistency, backward compatibility, OpenAPI governance, domain-driven resource boundaries, pagination, error contracts, and security-by-design.
