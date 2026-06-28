# Databases, ORMs, and Transactions

## Which database libraries are commonly used with FastAPI?

::: details View Answer
Common choices include SQLAlchemy, SQLModel, asyncpg, psycopg, databases, Tortoise ORM, and Beanie for MongoDB. The choice depends on sync/async needs and team experience.
:::

## Should FastAPI route handlers directly contain SQL queries?

::: details View Answer
For small prototypes it is acceptable, but production code should usually use repositories or services. This improves testability and separates HTTP concerns from persistence.
:::

## How do you manage SQLAlchemy sessions in FastAPI?

::: details View Answer
Use a dependency that creates a session per request, yields it, and closes it afterwards. For writes, handle commit/rollback carefully in the service or transaction boundary.
:::

## What is the difference between sync and async database drivers?

::: details View Answer
Sync drivers block the executing thread during I/O. Async drivers cooperate with the event loop and are better suited for high-concurrency async endpoints.
:::

## Should you always use an async database driver with FastAPI?

::: details View Answer
No. Sync SQLAlchemy can work well when properly run in threadpools and sized correctly. Async drivers help most when the app is I/O-bound and the whole stack is async.
:::

## What is a transaction?

::: details View Answer
A transaction groups database operations so they either all succeed or all fail. It protects data consistency when multiple changes must be atomic.
:::

## Where should transaction boundaries be placed?

::: details View Answer
Usually at the service/use-case layer, not scattered across route handlers. This allows one business operation to commit or roll back as a unit.
:::

## How do you handle database integrity errors?

::: details View Answer
Catch specific database exceptions, roll back the session, and translate them into meaningful HTTP errors such as 409 conflict or 400 bad request. Do not expose raw database messages.
:::

## What is optimistic locking?

::: details View Answer
Optimistic locking detects conflicting updates using a version column or timestamp. It is useful when multiple users may edit the same resource concurrently.
:::

## What is pagination and why is it important?

::: details View Answer
Pagination limits large result sets and improves performance. Use limit/offset for simplicity or cursor pagination for stable high-volume feeds.
:::

## What is cursor pagination?

::: details View Answer
Cursor pagination uses a stable cursor such as an encoded ID/timestamp rather than an offset. It performs better on large datasets and avoids some consistency issues.
:::

## How do you avoid exposing database IDs when needed?

::: details View Answer
Use UUIDs, ULIDs, slugs, or public IDs instead of sequential internal IDs. This does not replace authorization, but it reduces enumeration risk.
:::

## What is connection pool exhaustion?

::: details View Answer
It occurs when all database connections are in use and new requests wait or fail. Causes include too many workers, slow queries, leaked sessions, and missing timeouts.
:::

## How do you tune DB connection pools for FastAPI?

::: details View Answer
Consider worker count, max concurrent requests, database limits, query latency, and external poolers like PgBouncer. Avoid multiplying workers by pool size beyond database capacity.
:::

## How do you handle migrations?

::: details View Answer
Use a migration tool such as Alembic for SQLAlchemy. Migrations should be reviewed, tested, reversible where possible, and deployed carefully for zero-downtime changes.
:::

## What is a zero-downtime migration pattern?

::: details View Answer
Use expand-and-contract: add backward-compatible schema changes, deploy code that supports both old and new schema, backfill data, then remove old fields later.
:::

## How do you model multi-tenancy?

::: details View Answer
Common approaches include tenant_id columns, schema-per-tenant, or database-per-tenant. Every query must enforce tenant isolation, preferably centrally.
:::

## How do you test database code?

::: details View Answer
Use integration tests with a real test database or containers for realistic behavior. Mocking can help for service tests, but database behavior should be tested with the actual engine.
:::

## What is the repository pattern?

::: details View Answer
It encapsulates data access behind an interface, so services do not depend directly on ORM details. It can improve testability but should not become unnecessary abstraction.
:::

## What database answer works well for German enterprise interviews?

::: details View Answer
Emphasize consistency, transactions, migrations, auditability, tenant isolation, backup/restore, performance monitoring, and GDPR-aware data retention.
:::

## Why does lazy loading relationships in SQLAlchemy often crash in async FastAPI routes, and how do you fix it?

::: details View Answer
Standard lazy loading implicitly triggers a blocking database query upon attribute access. In an async context, this blocks the event loop and throws a `MissingGreenlet` error. The fix is to use eager loading strategies when querying, such as `.options(selectinload(Model.relation))`.
:::