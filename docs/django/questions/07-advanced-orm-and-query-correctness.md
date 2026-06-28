# Advanced ORM and query correctness

## What is defer() or only() used for?

::: details View Answer
defer() postpones loading specific fields and only() loads only selected fields initially. They can reduce payload size for wide tables, but careless use can create extra queries when deferred fields are later accessed.
:::

## What is bulk_create()?

::: details View Answer
bulk_create() inserts many objects efficiently in fewer queries. It bypasses some per-object save behavior and signals depending on options and backend, so it should be used when you understand those trade-offs.
:::

## What is bulk_update()?

::: details View Answer
bulk_update() updates selected fields across many model instances efficiently. It is useful for batch jobs but can bypass custom save() logic and may produce large SQL statements if used with very large batches.
:::

## What is update_or_create() and what should you be careful about?

::: details View Answer
update_or_create() fetches an object matching lookup arguments, updates it if found, or creates it otherwise. Under concurrency it may still require database uniqueness constraints and transaction handling to avoid duplicates.
:::

## What is get_or_create() and when can it race?

::: details View Answer
get_or_create() tries to retrieve an object and creates it if absent. It can race when no database-level unique constraint protects the lookup fields, so correctness depends on constraints and transaction semantics.
:::

## How would you write efficient existence checks?

::: details View Answer
Use exists() when you only need to know whether at least one matching row exists. It avoids loading full model instances and usually produces a cheaper SQL query than evaluating the entire QuerySet.
:::

## How should you handle very large QuerySets?

::: details View Answer
Use pagination, streaming patterns, iterator(), chunking by primary key, background jobs, and database-side filtering. Avoid loading millions of rows into memory or doing per-row queries inside loops.
:::

## What are database functions in Django ORM?

::: details View Answer
Database functions such as Lower, Coalesce, Cast, Trunc, Extract, JSONObject, and window functions allow computation in SQL while remaining inside the ORM. They are useful for reporting, filtering, normalization, and analytics.
:::

## What are Subquery and OuterRef used for?

::: details View Answer
Subquery and OuterRef express correlated subqueries in ORM code. They help annotate rows with related computed values, such as latest event time, without pulling all data into Python.
:::

## When would you use raw SQL in a Django project?

::: details View Answer
Use raw SQL for database-specific optimizations, complex reports, unsupported SQL features, or performance-critical queries that the ORM cannot express cleanly. Keep it isolated, parameterized, tested, documented, and reviewed for portability and security.
:::