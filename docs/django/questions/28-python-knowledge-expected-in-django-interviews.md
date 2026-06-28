# Python knowledge expected in Django interviews

## Why is Python knowledge important for Django roles?

::: details View Answer
Django is Python code, so performance, correctness, typing, packaging, concurrency, and readability depend on core Python skill. Senior interviews often test Python fundamentals alongside Django-specific patterns.
:::

## What is a decorator and where is it used in Django?

::: details View Answer
A decorator wraps a function or method to add behavior. Django uses decorators for login_required, permission_required, csrf_exempt, cache control, and custom access checks.
:::

## What is a context manager and how does Django use it?

::: details View Answer
A context manager controls setup and teardown around a block using with. Django uses this pattern in transaction.atomic(), override_settings(), database cursor handling, and tests.
:::

## What are generators useful for?

::: details View Answer
Generators produce values lazily, reducing memory usage for streams or large sequences. In Django, streaming responses or batch processing can benefit, but database and transaction behavior must be considered carefully.
:::

## What is the GIL and does it affect Django?

::: details View Answer
The Global Interpreter Lock limits execution of Python bytecode by multiple threads in one CPython process. Django apps often bottleneck on I/O, but CPU-heavy work should move to separate processes, workers, or specialized services.
:::

## What is the difference between a list comprehension and a generator expression?

::: details View Answer
A list comprehension builds the full list immediately, while a generator expression yields values lazily. For large data, generator expressions can reduce memory, but they can only be consumed once.
:::

## Why should mutable default arguments be avoided?

::: details View Answer
Mutable defaults are created once at function definition time and shared across calls. This can cause unexpected state leakage between requests, tests, or users.
:::

## What is type hinting useful for in Django projects?

::: details View Answer
Type hints improve readability, IDE support, refactoring safety, and static analysis. They are especially useful in service layers, domain code, and integration boundaries, even when dynamic ORM typing is imperfect.
:::

## What is dependency injection in Python/Django?

::: details View Answer
Dependency injection means passing dependencies explicitly instead of hardcoding them. It makes services easier to test and swap, such as payment clients, email senders, or storage adapters.
:::

## How do you profile Python code in a Django service?

::: details View Answer
Use cProfile, py-spy, scalene, APM profilers, logging timers, and database traces. Profile under realistic data and traffic because microbenchmarks can mislead.
:::