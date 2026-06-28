# Observability, logging, and incident response

## What is observability?

::: details View Answer
Observability is the ability to understand system behavior from outputs such as logs, metrics, traces, events, and profiles. For Django, it helps diagnose slow requests, errors, database issues, queue delays, and dependency failures.
:::

## What should Django application logs include?

::: details View Answer
Logs should include timestamp, level, service, environment, request ID, user or tenant identifier when safe, path, status, latency, error details, and correlation IDs. Avoid secrets and unnecessary personal data.
:::

## What is structured logging?

::: details View Answer
Structured logging emits machine-parseable fields, often JSON, instead of only free-text messages. It improves searching, alerting, dashboards, and incident analysis.
:::

## What metrics would you collect for Django web requests?

::: details View Answer
Collect request count, latency percentiles, status code distribution, error rate, throughput, active workers, database query latency, cache hit rate, external API latency, and saturation signals.
:::

## What traces are useful in Django?

::: details View Answer
Distributed traces show time spent in middleware, views, serializers, ORM queries, cache, external APIs, templates, and background tasks. They help locate bottlenecks across service boundaries.
:::

## How do you use request IDs?

::: details View Answer
Generate or propagate a request ID for each incoming request and include it in logs, responses, and downstream calls. It lets engineers trace one user request across Django, workers, proxies, and external services.
:::

## What is an SLO?

::: details View Answer
A Service Level Objective is a measurable reliability target, such as 99.9% successful requests under 300 ms for a key endpoint. SLOs guide alerting and engineering trade-offs.
:::

## What should an alert be based on?

::: details View Answer
Alerts should focus on user impact and actionable symptoms, such as high error rate, high latency, failed payments, queue backlog, or database unavailability. Avoid noisy alerts that do not require human action.
:::

## How would you investigate a sudden increase in 500 errors?

::: details View Answer
Check deployment timeline, error tracking, logs with request IDs, changed dependencies, database health, external APIs, feature flags, and traffic patterns. Roll back if the issue is severe and a recent release is strongly correlated.
:::

## What should a post-incident review include?

::: details View Answer
It should include timeline, impact, detection, root causes, contributing factors, what worked, what failed, and concrete follow-up actions. The tone should be blameless and focused on system improvement.
:::