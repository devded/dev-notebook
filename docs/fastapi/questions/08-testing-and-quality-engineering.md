# Testing and Quality Engineering

## How do you test FastAPI endpoints?

::: details View Answer
Use FastAPI’s test client or an async HTTP client to call the application in tests. Assert status codes, response bodies, headers, and side effects.
:::

## What is the purpose of dependency overrides in tests?

::: details View Answer
They let you replace production dependencies with test doubles, fake users, or test database sessions. This makes tests deterministic and faster.
:::

## What should be unit-tested in a FastAPI project?

::: details View Answer
Domain logic, services, validators, authorization policies, and utility functions should be unit-tested without HTTP. Route tests should cover integration points.
:::

## What should be integration-tested?

::: details View Answer
Test endpoints with database, authentication, serialization, migrations, and external-service boundaries where practical. Integration tests catch wiring mistakes that unit tests miss.
:::

## How do you test authentication?

::: details View Answer
Override the current-user dependency, generate valid and invalid tokens, and verify 401/403 behavior. Also test expired tokens and missing scopes.
:::

## How do you test authorization?

::: details View Answer
Create users with different roles, tenants, and ownership relationships. Test both allowed and denied access, especially object-level authorization.
:::

## How do you test validation errors?

::: details View Answer
Send malformed payloads, missing fields, wrong types, and boundary values. Verify FastAPI returns 422 or your custom error format.
:::

## How do you test background tasks?

::: details View Answer
Keep the task logic in a separate function and test it directly. For end-to-end behavior, assert that the task is scheduled or run using controlled test hooks.
:::

## How do you test database transactions?

::: details View Answer
Use a test database and roll back after each test or recreate schema using fixtures. Verify failed operations do not leave partial data.
:::

## What is contract testing?

::: details View Answer
Contract testing verifies that API providers and consumers agree on request/response formats and behavior. OpenAPI schemas can support this, but behavior must also be tested.
:::

## How do you test OpenAPI compatibility?

::: details View Answer
Generate or inspect the OpenAPI schema and check that required endpoints, schemas, status codes, and security schemes exist. This is useful in CI for API governance.
:::

## What is property-based testing?

::: details View Answer
Property-based testing generates many inputs to check general invariants. It is useful for validators, parsers, and business rules with many edge cases.
:::

## What is load testing?

::: details View Answer
Load testing measures system behavior under expected or high traffic. For FastAPI, tools like k6, Locust, or wrk can reveal bottlenecks in DB, serialization, or external calls.
:::

## What metrics do you examine during load tests?

::: details View Answer
Look at p50/p95/p99 latency, error rates, throughput, CPU, memory, event-loop blocking, database pool usage, and downstream service latency.
:::

## How do you avoid flaky API tests?

::: details View Answer
Control time, isolate databases, avoid dependence on external services, clean state between tests, and use deterministic fixtures. Flakiness is often a sign of hidden coupling.
:::

## What is test coverage, and is 100% coverage enough?

::: details View Answer
Coverage shows which lines were executed by tests, but it does not prove correctness. Meaningful assertions and risk-based test design matter more than chasing 100%.
:::

## How do you structure test folders?

::: details View Answer
Common structures include `tests/unit`, `tests/integration`, and `tests/e2e`, with fixtures in `conftest.py`. Match tests to the application architecture.
:::

## How do you test error handling?

::: details View Answer
Force known exceptions from dependencies or services and assert stable error responses. Also verify logs do not leak secrets.
:::

## How do you use CI for FastAPI quality?

::: details View Answer
Run formatting, linting, type checks, unit tests, integration tests, migration checks, security scanning, and Docker build verification. Enterprise teams expect automated gates.
:::

## What testing answer impresses interviewers?

::: details View Answer
Explain a test pyramid: many unit tests for domain logic, fewer integration tests for API/database behavior, contract tests for consumers, and targeted load/security tests for production risks.
:::

## When testing a FastAPI app, when must you use `httpx.AsyncClient` instead of `TestClient`?

::: details View Answer
`TestClient` calls the ASGI app synchronously (wrapping the ASGI app using threads). You must use `AsyncClient` if you want to test async behaviors directly, trigger lifespan events correctly in strict async environments, or test WebSockets comprehensively.
:::