# Async, background jobs, and real-time features

## What is the difference between WSGI and ASGI?

WSGI is the traditional synchronous Python web server interface. ASGI supports both synchronous and asynchronous protocols and enables async views, WebSockets, and long-lived connections when the stack supports them.

## Does async Django automatically make database queries non-blocking?

No. Async views help for non-blocking I/O, but database ORM operations may still require sync-to-async boundaries unless using supported async ORM methods. Incorrect async usage can reduce performance instead of improving it.

## When should you use async views in Django?

Use async views for endpoints dominated by concurrent I/O, such as calling multiple external APIs, long polling, or streaming. Do not use async just for CPU-bound work or normal database-heavy CRUD without understanding bottlenecks.

## What is Celery commonly used for in Django projects?

Celery runs background jobs such as emails, reports, imports, exports, notifications, billing reconciliation, image processing, and scheduled tasks. It decouples slow or retryable work from request-response latency.

## What problems can occur with background tasks?

Tasks can run twice, fail halfway, see stale data, overload dependencies, or execute before a transaction commits. Design tasks to be idempotent, retry-safe, observable, and triggered after commit where appropriate.

## What is an outbox pattern?

The outbox pattern writes an event or message to a database table in the same transaction as business data. A separate worker publishes it reliably, reducing the chance of losing side effects after commit.

## What is Django Channels used for?

Django Channels adds support for WebSockets and other asynchronous protocols. It is useful for real-time notifications, chat, dashboards, collaborative features, and event streams.

## How would you scale WebSockets in Django?

Use ASGI workers, a channel layer such as Redis, load balancer support for long-lived connections, authentication on connect, backpressure controls, and horizontal scaling with careful resource limits.

## How do you schedule periodic tasks in a Django ecosystem?

Use Celery Beat, django-q, APScheduler, Kubernetes CronJobs, or cloud scheduler services. The right choice depends on reliability, observability, locking, deployment topology, and operational ownership.

## How do you prevent multiple workers from running the same scheduled job concurrently?

Use distributed locks, database advisory locks, unique job rows, scheduler singleton configuration, or idempotent task design. In Kubernetes or autoscaled environments, assume multiple instances can exist.
