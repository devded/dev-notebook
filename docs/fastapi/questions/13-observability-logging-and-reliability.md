# Observability, Logging, and Reliability

## What is observability?

Observability is the ability to understand system behavior from logs, metrics, and traces. It helps diagnose production issues without guessing.

## What should be logged in a FastAPI request?

Log request method, path, status code, latency, correlation ID, user or tenant ID when safe, and error information. Do not log secrets or sensitive personal data.

## What is structured logging?

Structured logging uses machine-readable fields, often JSON, instead of free-form text. It makes logs searchable and easier to analyze in centralized systems.

## What is a correlation ID?

A correlation ID links logs and traces for a single request across services. It is essential in microservices and distributed systems.

## What metrics are useful for FastAPI?

Useful metrics include request count, latency percentiles, error rate, in-flight requests, CPU/memory, database pool usage, and downstream call latency.

## What is distributed tracing?

Distributed tracing follows a request across services and records spans for each operation. It helps identify which service or database call caused latency.

## What is OpenTelemetry?

OpenTelemetry is a standard framework for collecting traces, metrics, and logs. It is commonly used to instrument FastAPI services in enterprise platforms.

## What is p95 latency?

p95 latency means 95% of requests are faster than that value. It is more informative than average latency for user experience and SLOs.

## What is an SLO?

A service-level objective defines a reliability target such as 99.9% successful requests under 300 ms. SLOs guide engineering trade-offs.

## What is an error budget?

An error budget is the allowed amount of unreliability within an SLO. If it is exhausted, teams usually prioritize reliability over new features.

## How do you detect event-loop blocking?

Look for high latency under I/O load, use async profiling, monitor loop lag, and inspect code for blocking calls in `async def` endpoints.

## How do you monitor database bottlenecks?

Track slow queries, connection pool saturation, lock waits, transaction duration, and query plans. API symptoms often originate in the database.

## What is a circuit breaker?

A circuit breaker stops calling a failing downstream service for a period of time. It prevents cascading failures and gives dependencies time to recover.

## What is retry logic?

Retry logic repeats failed operations that are likely transient. Use bounded retries with exponential backoff and jitter, and avoid retrying non-idempotent operations blindly.

## What is a timeout budget?

A timeout budget allocates time across downstream calls so the API can return within its overall latency target. It prevents one dependency from consuming the entire request time.

## How do you make FastAPI health checks useful?

Separate liveness from readiness and include dependency checks only where they are operationally meaningful. Health endpoints should be fast and reliable.

## What is graceful degradation?

Graceful degradation means returning partial or reduced functionality when dependencies fail. For example, serve cached data when a recommendation service is unavailable.

## How do you handle incidents?

Use alerts based on user-impacting symptoms, inspect dashboards and traces, mitigate first, communicate clearly, and perform a blameless postmortem afterwards.

## What should not be in logs under GDPR?

Do not log unnecessary personal data, passwords, tokens, full identifiers, health data, or sensitive business data. Apply minimization, retention limits, and access controls.

## What observability answer stands out?

Describe a full path: instrument middleware, propagate correlation IDs, collect metrics/traces/logs, define SLOs, alert on symptoms, and use postmortems to improve resilience.
