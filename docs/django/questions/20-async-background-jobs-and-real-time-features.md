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

## What are sync_to_async and async_to_sync (from asgiref), and when must you use them? <Badge type="danger" text="hard" />

They are thread-safe wrappers for crossing the synchronous/asynchronous boundary. Use `sync_to_async` to call synchronous code (like Django ORM queries) from inside an async view without blocking the event loop. Use `async_to_sync` to call an async function from a synchronous view.

## What is acks_late in Celery, and why is it important for idempotent tasks? <Badge type="danger" text="hard" />

By default, Celery acknowledges a task as soon as it starts (acks_early). If the worker crashes mid-execution, the task is lost. Setting `acks_late=True` tells the worker to acknowledge only after the task finishes successfully. If a crash occurs, the task goes back to the queue. The task must be idempotent so it can safely be retried.

## How do you implement a distributed lock for a Celery task to prevent concurrent execution across multiple workers? <Badge type="danger" text="hard" />

You can implement a distributed lock using Redis and its `SETNX` (Set if Not eXists) operation. The task tries to acquire the lock upon starting and releases it upon completion or failure. This prevents scheduled tasks (like Celery Beat cron jobs) from overlapping if a previous run is still executing.

## What are the pros and cons of using RabbitMQ versus Redis as a Celery broker? <Badge type="warning" text="medium" />

RabbitMQ is a dedicated message broker with advanced routing, guarantees for message delivery, persistence, and backpressure handling. Redis is an in-memory datastore that is very fast and easy to set up, but it can lose messages on eviction or power loss, making it less reliable for critical background jobs compared to RabbitMQ.

