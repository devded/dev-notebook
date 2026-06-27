# Performance and scalability

## How do you approach Django performance optimization?

Start with measurement: latency percentiles, traces, query plans, CPU, memory, cache, and traffic patterns. Optimize the real bottleneck, validate improvement, and avoid premature complexity.

## What are common Django performance bottlenecks?

Common bottlenecks include N+1 queries, slow database queries, inefficient serializers, template rendering overhead, large payloads, cache misses, slow external APIs, too few workers, and CPU-heavy work inside requests.

## How do you optimize a slow DRF list endpoint?

Inspect queries, add select_related or prefetch_related, limit fields, paginate, avoid expensive SerializerMethodField loops, add indexes, cache stable data, and profile serialization time separately from database time.

## What is SerializerMethodField and what is the performance risk?

SerializerMethodField computes representation values in Python. It can cause N+1 queries or expensive per-row work if it accesses related data or external services inside a list serializer.

## How do you reduce response payload size?

Use pagination, field selection, concise representations, compression, separate detail endpoints, avoid embedding huge nested objects, and return links or IDs where appropriate.

## What is horizontal scaling?

Horizontal scaling adds more application instances to handle load. Django web instances are usually easy to scale horizontally when they are stateless and shared services handle database, cache, storage, and sessions.

## What is vertical scaling?

Vertical scaling increases resources of an existing instance, such as CPU or memory. It can be simple but has limits and may not improve bottlenecks caused by database locks, slow queries, or external APIs.

## How do you tune Gunicorn workers?

Tune based on CPU cores, workload type, memory usage, request latency, blocking I/O, and load testing. Too few workers reduce throughput; too many can exhaust memory or database connections.

## How do you protect a Django app from overload?

Use rate limiting, throttling, timeouts, queue backpressure, circuit breakers, autoscaling, caching, database connection limits, load shedding, and graceful degradation.

## What is graceful degradation?

Graceful degradation means keeping critical functionality available when non-critical dependencies fail. For example, checkout should work even if recommendation widgets, analytics, or email previews are unavailable.

## How do you implement database sharding in a Django application? <Badge type="danger" text="hard" />

Database sharding splits data across multiple database instances to scale write throughput. Since Django has no out-of-the-box sharding middleware:
1. Define shard databases in the `DATABASES` setting.
2. Write a custom database router (`BaseDatabaseRouter`) with `db_for_read` and `db_for_write` logic to route queries to the correct shard based on partitioning criteria (e.g., tenant ID or user ID range).
3. Alternatively, utilize third-party packages or partition tables at the PostgreSQL level using tools like Citus.
