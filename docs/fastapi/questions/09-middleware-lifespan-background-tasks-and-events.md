# Middleware, Lifespan, Background Tasks, and Events

## What is middleware in FastAPI?

::: details View Answer
Middleware is code that runs around requests and responses. It can handle logging, correlation IDs, CORS, compression, timing, and security headers.
:::

## When should you use middleware instead of dependencies?

::: details View Answer
Use middleware for cross-cutting behavior that should apply globally to all requests. Use dependencies when behavior is route-specific and returns typed values.
:::

## What is a lifespan event?

::: details View Answer
Lifespan events manage application startup and shutdown. They are used to initialize resources like connection pools, clients, caches, and to clean them up.
:::

## Why are lifespan handlers preferred over old startup/shutdown events?

::: details View Answer
Lifespan provides a structured async context manager pattern for application lifecycle. It makes setup and teardown more explicit and composable.
:::

## What should be initialized during application startup?

::: details View Answer
Initialize shared clients, connection pools, telemetry, caches, model loading, and health-check dependencies. Avoid doing slow or fragile work unless the deployment expects it.
:::

## What should happen during shutdown?

::: details View Answer
Close database pools, HTTP clients, message consumers, and telemetry exporters gracefully. This helps prevent data loss and resource leaks.
:::

## What are FastAPI background tasks?

::: details View Answer
Background tasks are functions scheduled to run after the response is sent. They are useful for simple post-response work such as sending emails or writing audit records.
:::

## When should you not use FastAPI background tasks?

::: details View Answer
Do not use them for critical, long-running, CPU-heavy, or distributed jobs. Use Celery, RQ, Dramatiq, Arq, Kafka consumers, or a workflow system instead.
:::

## What is a common risk with in-process background tasks?

::: details View Answer
If the process crashes, the task may be lost. In multi-worker deployments, background tasks are also tied to the worker that handled the request.
:::

## How do you implement request timing middleware?

::: details View Answer
Record time before calling `call_next(request)`, then add duration to logs or response headers. Use monotonic clocks rather than wall-clock time.
:::

## How do you implement correlation IDs?

::: details View Answer
Read an incoming request ID header or generate one if missing, store it in context, add it to logs, and return it in response headers. This improves debugging across services.
:::

## What is CORS middleware?

::: details View Answer
CORS middleware controls which browser origins can call your API. It is important for frontend integration but does not replace authentication or authorization.
:::

## What is GZip middleware?

::: details View Answer
It compresses responses above a configured size. It can reduce bandwidth but costs CPU and may not help already-compressed content.
:::

## How do you handle exceptions globally?

::: details View Answer
Register exception handlers for specific exception types. Return consistent error bodies and status codes while logging enough detail for operators.
:::

## What is a custom response class?

::: details View Answer
A custom response class controls serialization, media type, or headers. Examples include `ORJSONResponse`, `HTMLResponse`, `FileResponse`, and `StreamingResponse`.
:::

## How do you support WebSockets in FastAPI?

::: details View Answer
Use `@app.websocket('/path')` and accept/send messages through a WebSocket object. Authentication and scaling need special attention with WebSockets.
:::

## What is the challenge of WebSockets in multi-instance deployments?

::: details View Answer
Connections are stateful and live on a specific instance. Broadcasts, presence, and shared state usually require Redis, pub/sub, or a message broker.
:::

## How would you implement graceful degradation in middleware?

::: details View Answer
Keep middleware robust: do not let optional telemetry or logging failures break user requests. Use timeouts and fallback behavior for non-critical middleware calls.
:::

## What should not be done in middleware?

::: details View Answer
Avoid heavy business logic, blocking I/O, large body reads without need, and route-specific authorization that depends on complex domain state. Middleware should remain thin.
:::

## What lifecycle answer is strong for enterprise interviews?

::: details View Answer
Discuss startup readiness, graceful shutdown, resource cleanup, Kubernetes probes, telemetry initialization, and safe handling of partially available dependencies.
:::

## When would you create a custom `APIRoute` class instead of using `BaseHTTPMiddleware`?

::: details View Answer
Middleware intercepts *all* traffic (even 404s) and struggles to read or modify the request body because it consumes the stream. Custom `APIRoute` classes run strictly on matched routes, making it safe and easy to intercept, log request/response bodies, or unify error formats.
:::