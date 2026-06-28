# Transactions, concurrency, and consistency

## What is transaction.atomic()?

::: details View Answer
transaction.atomic() creates a database transaction block. If the block completes, changes commit; if an exception escapes, changes roll back. Nested atomic blocks use savepoints depending on configuration and backend.
:::

## When should you use transactions in Django?

::: details View Answer
Use transactions when multiple database operations must succeed or fail together, such as payments, inventory updates, order creation, or permission changes. Keep transactions short to avoid lock contention.
:::

## What is select_for_update()?

::: details View Answer
select_for_update() locks selected rows until the transaction commits or rolls back. It is used to prevent concurrent updates to the same rows, such as account balances, inventory, or job claims.
:::

## How would you prevent double-spending or duplicate order processing?

::: details View Answer
Use idempotency keys, database constraints, transactions, row-level locks, unique references, and state-machine transitions. Do not rely only on application checks before writes because concurrent requests can pass the same check.
:::

## What are race conditions in Django applications?

::: details View Answer
Race conditions occur when concurrent requests or workers read and write shared data in an unsafe order. They are common in counters, bookings, payments, inventory, and status transitions. Mitigation usually requires database constraints, atomic updates, locks, or queues.
:::

## How can F expressions help avoid race conditions?

::: details View Answer
F expressions let the database update a value based on its current value atomically, such as views = F('views') + 1. This avoids lost updates caused by reading a value into Python, modifying it, and saving it later.
:::

## What is optimistic locking?

::: details View Answer
Optimistic locking allows concurrent reads but detects conflicting writes using a version number, timestamp, or conditional update. If the row changed since it was read, the update fails and the application retries or reports a conflict.
:::

## What is pessimistic locking?

::: details View Answer
Pessimistic locking prevents conflicts by locking data before modification, often with select_for_update. It improves correctness for critical sections but can reduce throughput and cause deadlocks if locks are held too long or acquired inconsistently.
:::

## What is transaction.on_commit()?

::: details View Answer
transaction.on_commit() registers callbacks to run only after the surrounding transaction successfully commits. It is useful for sending Celery tasks, emails, or cache invalidations that should not happen if the transaction rolls back.
:::

## Why should external API calls usually not happen inside a database transaction?

::: details View Answer
External calls can be slow, fail unpredictably, and hold database locks longer than necessary. A safer pattern is to commit local state, then trigger external side effects through an outbox, task queue, or on_commit callback.
:::