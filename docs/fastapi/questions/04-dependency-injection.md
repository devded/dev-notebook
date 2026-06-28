# Dependency Injection

## What is dependency injection in FastAPI?

::: details View Answer
It is FastAPI’s mechanism for declaring reusable components needed by endpoints, such as database sessions, current users, settings, or authorization checks. Dependencies are declared with `Depends()`.
:::

## Why is FastAPI dependency injection useful?

::: details View Answer
It improves modularity, testability, and separation of concerns. It lets you centralize cross-cutting logic without manually wiring it in every endpoint.
:::

## How do you declare a dependency?

::: details View Answer
Define a function or callable and include it as a parameter with `Depends(dependency_func)`. FastAPI resolves it before calling the route function.
:::

## Can dependencies be async?

::: details View Answer
Yes. Dependencies may be normal `def` or `async def`, and FastAPI handles both. Use async dependencies for non-blocking I/O.
:::

## What is a sub-dependency?

::: details View Answer
A sub-dependency is a dependency required by another dependency. FastAPI resolves the dependency tree automatically.
:::

## How do dependency scopes work conceptually?

::: details View Answer
Dependencies are resolved per request by default. When using `yield`, setup runs before the response and cleanup runs after the request lifecycle step.
:::

## How do you manage a database session with dependencies?

::: details View Answer
Create a dependency that opens a session, yields it, and closes or rolls it back in cleanup. This keeps session lifecycle tied to the request.
:::

## What is a `yield` dependency?

::: details View Answer
It is a dependency that runs setup code before `yield` and cleanup code after. It is useful for database sessions, transactions, locks, and resource cleanup.
:::

## How do you override dependencies in tests?

::: details View Answer
Set `app.dependency_overrides[original_dependency] = override_dependency`. This lets tests inject fake users, in-memory repositories, or test database sessions.
:::

## How can dependencies enforce authentication?

::: details View Answer
A dependency can validate a token, load the current user, and raise `HTTPException(status_code=401)` if invalid. Endpoints then accept the current user as a typed parameter.
:::

## How can dependencies enforce authorization?

::: details View Answer
Use dependencies that check roles, scopes, ownership, or policies. Authorization should not stop at authentication; object-level checks are critical.
:::

## What is dependency caching in FastAPI?

::: details View Answer
Within a single request, dependencies are cached by default so the same dependency is not executed repeatedly. This can be changed with `use_cache=False` when necessary.
:::

## When would you use `use_cache=False`?

::: details View Answer
Use it when the dependency must run every time it is requested in the dependency tree, such as generating a fresh timestamp or reading changing state. Most dependencies should remain cached.
:::

## Can classes be used as dependencies?

::: details View Answer
Yes. A class instance with `__call__` or a class constructor can be used as a dependency. This is useful for parameterized dependencies.
:::

## How do you inject application settings?

::: details View Answer
Create a settings object with Pydantic Settings and expose it through a dependency, often cached with `lru_cache`. This avoids repeatedly parsing environment variables.
:::

## Why should dependencies not become too large?

::: details View Answer
Large dependencies hide business logic and make endpoint behavior hard to reason about. Keep dependencies focused on wiring, context, security, and resource management.
:::

## What is the difference between middleware and dependency injection?

::: details View Answer
Middleware wraps every request/response globally, while dependencies are applied per route or router and can return typed values. Dependencies are usually better for auth context and database sessions.
:::

## How can dependencies be applied to a whole router?

::: details View Answer
Pass `dependencies=[Depends(...)]` to `APIRouter` or route decorators. This is useful for requiring authentication or permissions across a group of endpoints.
:::

## What is a common dependency-injection pattern in enterprise FastAPI?

::: details View Answer
Use dependencies to inject current user, tenant context, request ID, database session, settings, and service classes. This keeps APIs consistent across many teams.
:::

## What dependency injection mistakes should you avoid?

::: details View Answer
Avoid opening global database sessions, doing heavy work in dependencies unnecessarily, hiding authorization in unclear places, and forgetting to override dependencies in integration tests.
:::

## How does FastAPI handle teardown when a dependency uses `yield`, and what happens if an exception occurs in the route?

::: details View Answer
Code after the `yield` runs after the response has been delivered. If the route raises an exception, the code after `yield` will still execute *if* you use a `try/finally` or `try/except` block inside the dependency. Without it, cleanup code (like closing a database connection) might be bypassed, leading to resource leaks.
:::