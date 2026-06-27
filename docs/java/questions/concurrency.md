# Concurrency

> Add new questions below in the same format: `## Question? <Badge ... />` then the answer.

## `synchronized` vs `volatile`? <Badge type="danger" text="hard" />

`synchronized` provides mutual exclusion and visibility for a block/method. `volatile` only guarantees visibility of a variable across threads — no atomicity for compound operations.

## Runnable vs Callable? <Badge type="warning" text="medium" />

`Runnable.run()` returns nothing and can't throw checked exceptions. `Callable.call()` returns a value and can throw — used with `ExecutorService` and `Future`.

```java
Callable<Integer> task = () -> 42;
Future<Integer> f = executor.submit(task);
int result = f.get();
```
