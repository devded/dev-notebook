# 300 FastAPI Interview Questions and Answers

**Target:** FastAPI interviews for European and German big-company environments.

**Level coverage:** Junior, Mid-level, Senior Backend, Platform, API, and Microservice interviews.

**Focus areas:** FastAPI fundamentals, Pydantic v2, async Python, security, testing, deployment, observability, system design, GDPR, and enterprise production readiness.

> Tip: For German/EU enterprise interviews, do not answer only with framework syntax. Connect FastAPI decisions to reliability, privacy, auditability, security, testing, and operational ownership.

## References Consulted

- [FastAPI official documentation](https://fastapi.tiangolo.com/)
- [FastAPI dependencies](https://fastapi.tiangolo.com/tutorial/dependencies/)
- [FastAPI security](https://fastapi.tiangolo.com/tutorial/security/)
- [FastAPI async / await](https://fastapi.tiangolo.com/async/)
- [FastAPI background tasks](https://fastapi.tiangolo.com/tutorial/background-tasks/)
- [FastAPI settings](https://fastapi.tiangolo.com/advanced/settings/)
- [Pydantic v2 documentation](https://pydantic.dev/)

## Table of Contents

1. [1. FastAPI Fundamentals and Architecture](#1-fastapi-fundamentals-and-architecture)
2. [2. Routing, Parameters, and Request Handling](#2-routing-parameters-and-request-handling)
3. [3. Pydantic v2, Schemas, and Validation](#3-pydantic-v2-schemas-and-validation)
4. [4. Dependency Injection](#4-dependency-injection)
5. [5. Async Python, Concurrency, and Performance](#5-async-python-concurrency-and-performance)
6. [6. Security, Authentication, and Authorization](#6-security-authentication-and-authorization)
7. [7. Databases, ORMs, and Transactions](#7-databases-orms-and-transactions)
8. [8. Testing and Quality Engineering](#8-testing-and-quality-engineering)
9. [9. Middleware, Lifespan, Background Tasks, and Events](#9-middleware-lifespan-background-tasks-and-events)
10. [10. OpenAPI, Documentation, and API Design](#10-openapi-documentation-and-api-design)
11. [11. Error Handling, Responses, and Serialization](#11-error-handling-responses-and-serialization)
12. [12. Deployment, Containers, and Production Operations](#12-deployment-containers-and-production-operations)
13. [13. Observability, Logging, and Reliability](#13-observability-logging-and-reliability)
14. [14. Microservices, Integration, and System Design](#14-microservices-integration-and-system-design)
15. [15. Europe/Germany Enterprise, GDPR, and Big-Company Scenarios](#15-europegermany-enterprise-gdpr-and-big-company-scenarios)

## 1. FastAPI Fundamentals and Architecture

### 1. What is FastAPI, and why is it popular for modern API development?

**Answer:** FastAPI is a Python web framework for building APIs using standard Python type hints. It is popular because it combines high performance, automatic request validation, automatic OpenAPI documentation, dependency injection, and strong editor support.

### 2. How does FastAPI differ from Flask?

**Answer:** Flask is minimal and flexible but requires more extensions for validation, serialization, dependency handling, and API docs. FastAPI provides these features natively through type hints, Pydantic models, Starlette, and OpenAPI generation.

### 3. How does FastAPI differ from Django REST Framework?

**Answer:** Django REST Framework is tied to Django’s batteries-included ecosystem and is excellent for monolithic database-backed applications. FastAPI is lighter, async-friendly, framework-composable, and often preferred for microservices, high-throughput APIs, and ML/AI service endpoints.

### 4. What are the main building blocks behind FastAPI?

**Answer:** FastAPI sits on Starlette for ASGI routing, middleware, requests, responses, and WebSockets, and uses Pydantic for data validation and serialization. Uvicorn or another ASGI server usually runs the application.

### 5. What is ASGI, and why does it matter in FastAPI?

**Answer:** ASGI is the asynchronous server gateway interface for Python web applications. It allows FastAPI to handle async requests, WebSockets, long-lived connections, and high-concurrency workloads better than traditional WSGI-only frameworks.

### 6. What is a path operation in FastAPI?

**Answer:** A path operation is a function decorated with an HTTP method and path, such as `@app.get('/users/{user_id}')`. It defines how the application handles a specific route and HTTP method.

### 7. What is the difference between `FastAPI()` and `APIRouter()`?

**Answer:** `FastAPI()` creates the main application object. `APIRouter()` groups related endpoints into modules so large codebases can be organized by domain, version, or bounded context.

### 8. Why does FastAPI use Python type hints?

**Answer:** Type hints let FastAPI infer request parameters, validate incoming data, serialize responses, generate OpenAPI schemas, and provide better IDE support. They reduce boilerplate and make API contracts explicit.

### 9. What happens when a request body does not match the declared Pydantic model?

**Answer:** FastAPI returns a 422 validation error by default. The response describes which field failed validation, where it failed, and why.

### 10. What is automatic documentation in FastAPI?

**Answer:** FastAPI automatically generates OpenAPI schema and interactive documentation UIs, usually available at `/docs` and `/redoc`. This helps teams test endpoints and align backend/frontend contracts.

### 11. Why is FastAPI considered high performance?

**Answer:** It runs on ASGI, uses Starlette’s efficient routing layer, supports async I/O, and relies on optimized validation from Pydantic. Actual performance still depends on database access, external services, serialization, and deployment configuration.

### 12. Can FastAPI be used for monoliths as well as microservices?

**Answer:** Yes. FastAPI can power small services, modular monoliths, and microservice architectures. The key is organizing routers, dependencies, configuration, and domain logic cleanly.

### 13. What is the role of Starlette in FastAPI?

**Answer:** Starlette provides the underlying ASGI toolkit: routing, middleware, requests, responses, WebSockets, background tasks, and lifespan events. FastAPI adds validation, dependency injection, OpenAPI generation, and developer ergonomics on top.

### 14. What is the role of Pydantic in FastAPI?

**Answer:** Pydantic validates and serializes input and output data according to Python type annotations. In FastAPI it is commonly used for request bodies, response models, settings, and internal DTOs.

### 15. What does 'declarative API design' mean in FastAPI?

**Answer:** It means defining API behavior through type annotations, models, decorators, and dependencies instead of manual parsing. FastAPI reads these declarations and handles validation, docs, and conversion.

### 16. What is a production-ready FastAPI project structure?

**Answer:** A common structure separates API routers, schemas, domain services, database models, repositories, configuration, tests, and infrastructure code. Large companies expect clear boundaries rather than all logic inside route functions.

### 17. Should business logic live inside FastAPI route functions?

**Answer:** Usually no. Route functions should stay thin: validate input, call application services, and return responses. Business logic belongs in service/domain layers so it can be tested without HTTP.

### 18. What is the difference between a schema and a database model?

**Answer:** A schema is usually a Pydantic model used for validation and API serialization. A database model is usually an ORM or SQL model representing database tables and persistence details.

### 19. What is an ASGI server?

**Answer:** An ASGI server runs an ASGI application and translates network requests into ASGI events. Common choices for FastAPI are Uvicorn, Hypercorn, or Gunicorn with Uvicorn workers.

### 20. What should you mention when asked why a company should choose FastAPI?

**Answer:** Mention type-safe API contracts, automatic docs, async support, ecosystem maturity, good testability, and suitability for microservices. Also acknowledge trade-offs: Django may be better when an admin panel and tightly integrated ORM stack are required.

## 2. Routing, Parameters, and Request Handling

### 21. How do you define a basic GET endpoint in FastAPI?

**Answer:** Use a path operation decorator such as `@app.get('/items')` above a function. The function return value is automatically serialized to JSON unless a custom response is returned.

### 22. How are path parameters declared?

**Answer:** Path parameters are declared in the URL template and function signature, for example `/users/{user_id}` with `user_id: int`. FastAPI validates and converts the value based on the type hint.

### 23. How are query parameters declared?

**Answer:** Any function parameter not present in the path is treated as a query parameter by default. For example, `limit: int = 10` becomes an optional query parameter with a default value.

### 24. What is the difference between required and optional query parameters?

**Answer:** A parameter without a default value is required. A parameter with a default value or typed as `str | None = None` is optional.

### 25. How do you add validation to query parameters?

**Answer:** Use `Query()` with constraints such as `min_length`, `max_length`, `ge`, `le`, `pattern`, and descriptions. This validation is reflected in OpenAPI documentation.

### 26. How do you add validation to path parameters?

**Answer:** Use `Path()` with constraints such as `gt`, `ge`, `lt`, and `le`. Path parameters are always required because they are part of the route.

### 27. How do you accept request headers?

**Answer:** Declare a parameter using `Header()`, for example `user_agent: str | None = Header(default=None)`. FastAPI handles header name conversion, including hyphenated names.

### 28. How do you accept cookies?

**Answer:** Declare a parameter using `Cookie()`. This is useful for session IDs, CSRF tokens, or feature flags, although stateless token auth is often preferred for APIs.

### 29. How do you receive a JSON request body?

**Answer:** Declare a parameter typed as a Pydantic model. FastAPI parses the body as JSON, validates it, and gives your function a model instance.

### 30. How do you receive multiple body parameters?

**Answer:** Declare multiple parameters with `Body()`, or wrap them into a single Pydantic request model. For enterprise APIs, a single explicit request model is usually clearer.

### 31. How do you upload files in FastAPI?

**Answer:** Use `UploadFile` with `File()`. `UploadFile` is preferred for large files because it provides a file-like interface and avoids loading the entire file into memory at once.

### 32. What is the difference between `bytes` and `UploadFile` for file uploads?

**Answer:** `bytes` reads the entire uploaded file into memory. `UploadFile` streams via a spooled temporary file and exposes metadata like filename and content type.

### 33. How do you support form data?

**Answer:** Use `Form()` parameters. It is commonly used for OAuth2 password flows or compatibility with browser form submissions.

### 34. How do you return a custom status code?

**Answer:** Set `status_code` in the decorator, for example `@app.post('/items', status_code=201)`, or return a `Response`/`JSONResponse` with an explicit status code.

### 35. How do you redirect from a FastAPI endpoint?

**Answer:** Return `RedirectResponse(url='...')`. Use appropriate status codes such as 302 for temporary redirects or 307/308 when preserving the method matters.

### 36. How do you stream a response?

**Answer:** Return `StreamingResponse` with an iterator or async iterator. This is useful for large downloads, server-generated files, or incremental AI output.

### 37. How do you serve static files?

**Answer:** Mount `StaticFiles` at a path, such as `app.mount('/static', StaticFiles(directory='static'), name='static')`. In production, static files are often better served by a CDN or reverse proxy.

### 38. How does FastAPI choose whether a parameter is path, query, body, header, or cookie?

**Answer:** FastAPI uses the path template, parameter type, default marker classes like `Query`, `Body`, `Header`, and whether the type is a Pydantic model. Pydantic models are usually interpreted as request bodies.

### 39. What is route ordering, and why can it matter?

**Answer:** More specific routes should be registered before conflicting dynamic routes. For example, `/users/me` should appear before `/users/{user_id}` to avoid interpreting `me` as a user ID.

### 40. How would you design route naming and versioning for a large company API?

**Answer:** Use consistent resource naming, plural nouns, clear HTTP methods, and version prefixes such as `/api/v1`. For large systems, route modules should map to domains and avoid leaking internal database structure.

## 3. Pydantic v2, Schemas, and Validation

### 41. What is a Pydantic model?

**Answer:** A Pydantic model is a class derived from `BaseModel` that defines fields using type annotations. It validates input data and provides structured Python objects and serialized output.

### 42. What changed conceptually from Pydantic v1 to v2?

**Answer:** Pydantic v2 introduced a redesigned validation engine, new validator decorators, `model_validate`, `model_dump`, and updated configuration patterns. Interviewers often expect awareness of migration differences.

### 43. What is `model_dump()` used for?

**Answer:** `model_dump()` converts a Pydantic model into a Python dictionary. It replaces common v1 usage of `.dict()` in Pydantic v2.

### 44. What is `model_validate()` used for?

**Answer:** `model_validate()` validates external data and creates a model instance. It is the v2-style explicit method for validating Python objects against a model.

### 45. What is the difference between request models and response models?

**Answer:** Request models validate client input. Response models define the shape of output, filter unexpected fields, and document the API contract.

### 46. Why should you use `response_model`?

**Answer:** `response_model` ensures responses match the public API schema and can prevent leaking internal fields such as passwords, internal IDs, or debug metadata.

### 47. How do you exclude `None` fields from a response?

**Answer:** Use `response_model_exclude_none=True` on the route or call `model_dump(exclude_none=True)`. This keeps responses compact and avoids ambiguous nulls.

### 48. How do you define optional fields in modern Python typing?

**Answer:** Use `field: str | None = None` or `Optional[str] = None`. The default value determines whether the field is required.

### 49. What is the difference between `list[str]` and `List[str]`?

**Answer:** `list[str]` is the modern built-in generic syntax introduced in Python 3.9. `List[str]` from `typing` is older but still seen in legacy code.

### 50. How do you add field constraints in Pydantic?

**Answer:** Use `Field()` with constraints and metadata such as `min_length`, `max_length`, `ge`, `le`, `description`, and examples. These constraints can appear in generated JSON Schema.

### 51. How do you define a custom field validator in Pydantic v2?

**Answer:** Use `@field_validator('field_name')` inside the model. It should validate or transform the value and raise a clear error when invalid.

### 52. How do you define validation involving multiple fields?

**Answer:** Use `@model_validator` in Pydantic v2. This is useful for rules like `end_date` must be after `start_date` or exactly one of two fields must be provided.

### 53. What is a computed field?

**Answer:** A computed field is derived from other model fields and included in serialization when configured. It is useful for read-only values such as `full_name` or calculated totals.

### 54. How do aliases work in Pydantic/FastAPI?

**Answer:** Aliases let external JSON names differ from internal Python names. For example, you may expose `userId` while keeping `user_id` internally.

### 55. Why separate create, update, and read schemas?

**Answer:** Create schemas define required input for creation, update schemas usually allow partial fields, and read schemas include output-only fields such as IDs and timestamps. This avoids overloading one model for all use cases.

### 56. How do you model partial updates with Pydantic?

**Answer:** Use an update schema where fields are optional and apply only fields explicitly provided by the client. `model_dump(exclude_unset=True)` is commonly used for PATCH operations.

### 57. What is strict validation?

**Answer:** Strict validation avoids coercing types unexpectedly, such as accepting string `'1'` as integer `1`. It is valuable in financial, healthcare, and regulated systems where silent coercion is risky.

### 58. What is JSON Schema in the FastAPI context?

**Answer:** JSON Schema describes the structure and constraints of JSON data. FastAPI derives JSON Schema from Pydantic models and embeds it into the OpenAPI specification.

### 59. How should you handle backward-compatible schema changes?

**Answer:** Add optional fields, avoid renaming or removing existing fields, and version breaking changes. Communicate deprecations clearly in OpenAPI and release notes.

### 60. What Pydantic mistakes are common in interviews?

**Answer:** Common mistakes include using one schema for everything, leaking password fields in responses, misunderstanding optional vs nullable fields, ignoring `exclude_unset` for PATCH, and using outdated v1 validator patterns without explanation.

## 4. Dependency Injection

### 61. What is dependency injection in FastAPI?

**Answer:** It is FastAPI’s mechanism for declaring reusable components needed by endpoints, such as database sessions, current users, settings, or authorization checks. Dependencies are declared with `Depends()`.

### 62. Why is FastAPI dependency injection useful?

**Answer:** It improves modularity, testability, and separation of concerns. It lets you centralize cross-cutting logic without manually wiring it in every endpoint.

### 63. How do you declare a dependency?

**Answer:** Define a function or callable and include it as a parameter with `Depends(dependency_func)`. FastAPI resolves it before calling the route function.

### 64. Can dependencies be async?

**Answer:** Yes. Dependencies may be normal `def` or `async def`, and FastAPI handles both. Use async dependencies for non-blocking I/O.

### 65. What is a sub-dependency?

**Answer:** A sub-dependency is a dependency required by another dependency. FastAPI resolves the dependency tree automatically.

### 66. How do dependency scopes work conceptually?

**Answer:** Dependencies are resolved per request by default. When using `yield`, setup runs before the response and cleanup runs after the request lifecycle step.

### 67. How do you manage a database session with dependencies?

**Answer:** Create a dependency that opens a session, yields it, and closes or rolls it back in cleanup. This keeps session lifecycle tied to the request.

### 68. What is a `yield` dependency?

**Answer:** It is a dependency that runs setup code before `yield` and cleanup code after. It is useful for database sessions, transactions, locks, and resource cleanup.

### 69. How do you override dependencies in tests?

**Answer:** Set `app.dependency_overrides[original_dependency] = override_dependency`. This lets tests inject fake users, in-memory repositories, or test database sessions.

### 70. How can dependencies enforce authentication?

**Answer:** A dependency can validate a token, load the current user, and raise `HTTPException(status_code=401)` if invalid. Endpoints then accept the current user as a typed parameter.

### 71. How can dependencies enforce authorization?

**Answer:** Use dependencies that check roles, scopes, ownership, or policies. Authorization should not stop at authentication; object-level checks are critical.

### 72. What is dependency caching in FastAPI?

**Answer:** Within a single request, dependencies are cached by default so the same dependency is not executed repeatedly. This can be changed with `use_cache=False` when necessary.

### 73. When would you use `use_cache=False`?

**Answer:** Use it when the dependency must run every time it is requested in the dependency tree, such as generating a fresh timestamp or reading changing state. Most dependencies should remain cached.

### 74. Can classes be used as dependencies?

**Answer:** Yes. A class instance with `__call__` or a class constructor can be used as a dependency. This is useful for parameterized dependencies.

### 75. How do you inject application settings?

**Answer:** Create a settings object with Pydantic Settings and expose it through a dependency, often cached with `lru_cache`. This avoids repeatedly parsing environment variables.

### 76. Why should dependencies not become too large?

**Answer:** Large dependencies hide business logic and make endpoint behavior hard to reason about. Keep dependencies focused on wiring, context, security, and resource management.

### 77. What is the difference between middleware and dependency injection?

**Answer:** Middleware wraps every request/response globally, while dependencies are applied per route or router and can return typed values. Dependencies are usually better for auth context and database sessions.

### 78. How can dependencies be applied to a whole router?

**Answer:** Pass `dependencies=[Depends(...)]` to `APIRouter` or route decorators. This is useful for requiring authentication or permissions across a group of endpoints.

### 79. What is a common dependency-injection pattern in enterprise FastAPI?

**Answer:** Use dependencies to inject current user, tenant context, request ID, database session, settings, and service classes. This keeps APIs consistent across many teams.

### 80. What dependency injection mistakes should you avoid?

**Answer:** Avoid opening global database sessions, doing heavy work in dependencies unnecessarily, hiding authorization in unclear places, and forgetting to override dependencies in integration tests.

## 5. Async Python, Concurrency, and Performance

### 81. What is the difference between concurrency and parallelism?

**Answer:** Concurrency means handling multiple tasks by interleaving progress, often during I/O waits. Parallelism means executing tasks at the same time on multiple CPU cores.

### 82. When should you use `async def` in FastAPI endpoints?

**Answer:** Use `async def` when the endpoint awaits non-blocking I/O such as async database drivers, HTTP clients, queues, or caches. It allows the event loop to serve other requests while waiting.

### 83. When is normal `def` acceptable in FastAPI?

**Answer:** Use normal `def` for CPU-light synchronous code or when using blocking libraries that FastAPI can run in a threadpool. However, heavy blocking work should be moved out of the request path.

### 84. What happens if you call blocking I/O inside an `async def` endpoint?

**Answer:** It can block the event loop and reduce concurrency for all requests handled by that worker. Use async libraries, run blocking code in a threadpool, or offload to background workers.

### 85. What is the event loop?

**Answer:** The event loop schedules async tasks and resumes them when awaited I/O completes. Blocking the event loop is one of the most common async performance bugs.

### 86. What is an awaitable?

**Answer:** An awaitable is an object that can be used with `await`, such as a coroutine or task. Awaiting it allows other work to run while waiting for completion.

### 87. How does FastAPI handle sync endpoints?

**Answer:** FastAPI can run synchronous path operation functions in a threadpool so they do not block the event loop directly. This is useful for compatibility with sync libraries.

### 88. What is the GIL, and does async solve CPU-bound problems?

**Answer:** The Global Interpreter Lock limits execution of Python bytecode in multiple threads. Async improves I/O concurrency but does not make CPU-bound Python code faster; use multiprocessing, native extensions, or external workers.

### 89. How would you handle CPU-heavy work in FastAPI?

**Answer:** Offload it to a task queue, worker process, multiprocessing pool, or specialized compute service. The API should return quickly and provide job status if the work is long-running.

### 90. How would you handle long-running requests?

**Answer:** Prefer asynchronous job submission with a 202 response, background processing, and status endpoints. For streaming progress, use WebSockets or server-sent events when appropriate.

### 91. What is connection pooling?

**Answer:** Connection pooling reuses database or HTTP connections instead of opening a new one for every request. It reduces latency and protects downstream systems from connection storms.

### 92. How do you improve FastAPI latency?

**Answer:** Profile first. Common improvements include async I/O, efficient DB queries, connection pooling, caching, response compression where appropriate, smaller payloads, and avoiding blocking calls.

### 93. How do you improve FastAPI throughput?

**Answer:** Use multiple worker processes, tune database pools, reduce per-request overhead, cache expensive reads, avoid synchronous bottlenecks, and scale horizontally behind a load balancer.

### 94. What is the difference between Uvicorn workers and async concurrency?

**Answer:** Async concurrency happens inside a worker process. Multiple workers create multiple processes, allowing better CPU utilization and isolation.

### 95. Why should you be careful with global mutable state?

**Answer:** Global mutable state can behave unpredictably across multiple workers and concurrent requests. Use databases, caches, queues, or carefully protected in-process state.

### 96. What is backpressure in API systems?

**Answer:** Backpressure means slowing or rejecting requests when downstream systems are overloaded. Techniques include rate limits, queues, timeouts, circuit breakers, and 429/503 responses.

### 97. How do timeouts improve reliability?

**Answer:** Timeouts prevent requests from hanging indefinitely and consuming resources. They should be applied to database calls, outbound HTTP calls, queues, and client-facing operations.

### 98. How do you avoid N+1 query problems in FastAPI APIs?

**Answer:** Use eager loading, joins, batch queries, or data loaders depending on the ORM and query pattern. Serialization should not trigger hidden database calls per item.

### 99. What is profiling, and why is it important?

**Answer:** Profiling measures where time or memory is actually spent. Senior interviewers expect evidence-based optimization rather than guessing.

### 100. What performance answer impresses enterprise interviewers?

**Answer:** Explain that FastAPI itself is rarely the only bottleneck; databases, network calls, serialization, and deployment topology usually dominate. Then describe measurement, tracing, load testing, and targeted optimization.

## 6. Security, Authentication, and Authorization

### 101. How does FastAPI support security schemes?

**Answer:** FastAPI provides security utilities that integrate with OpenAPI, including OAuth2, bearer tokens, API keys, and HTTP basic authentication. These are usually implemented as dependencies.

### 102. What is the difference between authentication and authorization?

**Answer:** Authentication verifies who the user or service is. Authorization decides what that authenticated identity is allowed to do.

### 103. How would you implement JWT authentication in FastAPI?

**Answer:** Receive a bearer token, verify its signature, expiration, issuer, audience, and claims, then load or construct the current user. Put this logic in a dependency.

### 104. What JWT mistakes should you avoid?

**Answer:** Avoid accepting unsigned tokens, skipping issuer/audience checks, using weak secrets, storing sensitive data in token payloads, and trusting client-side claims without server-side authorization.

### 105. What is OAuth2 password flow, and when is it appropriate?

**Answer:** It is a flow where a username and password are exchanged for a token. It is mostly suitable for first-party trusted clients, not arbitrary third-party apps.

### 106. What is OAuth2 authorization code flow?

**Answer:** It is a browser-based OAuth2 flow where users authenticate with an identity provider and the app receives an authorization code to exchange for tokens. It is preferred for many enterprise SSO scenarios.

### 107. How would you integrate FastAPI with enterprise SSO?

**Answer:** Use OpenID Connect/OAuth2 with providers such as Azure AD, Keycloak, Okta, or Auth0. Validate tokens locally or introspect them, map claims to internal roles, and enforce authorization in dependencies.

### 108. What is RBAC?

**Answer:** Role-based access control grants permissions based on roles like admin, manager, or viewer. It is simple but can become coarse if object ownership and context are ignored.

### 109. What is ABAC?

**Answer:** Attribute-based access control uses attributes of the user, resource, action, and environment. It is more flexible for enterprise policies such as department, region, clearance, or tenant.

### 110. What is object-level authorization?

**Answer:** It checks whether the caller can access a specific object, not just an endpoint. For example, a user may access `/invoices/{id}` only if that invoice belongs to their organization.

### 111. Why is object-level authorization important?

**Answer:** Broken object-level authorization is a common API vulnerability. Endpoint-level role checks are insufficient if users can change IDs and access other tenants' data.

### 112. How do you prevent SQL injection in FastAPI?

**Answer:** Use parameterized queries or ORM query builders, never string-concatenate untrusted input into SQL. Validate input, but do not rely on validation alone for SQL safety.

### 113. How do you prevent mass assignment vulnerabilities?

**Answer:** Use explicit request schemas and map allowed fields to domain objects. Never blindly persist all client-provided fields into database models.

### 114. How do you handle CORS securely?

**Answer:** Allow only trusted origins, methods, and headers. Avoid wildcard origins when credentials are used, and treat CORS as browser protection, not server-side authorization.

### 115. How do you protect secrets in FastAPI applications?

**Answer:** Load secrets from environment variables, secret managers, or orchestration platforms. Do not commit secrets, log them, return them in errors, or put them in Docker images.

### 116. How should password hashing be handled?

**Answer:** Use modern password hashing algorithms such as Argon2id or bcrypt through maintained libraries. Never store plaintext passwords or use fast general-purpose hashes like SHA-256 alone.

### 117. What is rate limiting?

**Answer:** Rate limiting restricts how many requests a client can make in a time window. It helps reduce abuse, brute-force attacks, scraping, and accidental overload.

### 118. How would you implement API key authentication?

**Answer:** Read the key from a header, validate it against a secure store or hash, identify the client, and enforce scopes or quotas. Rotate keys and avoid logging them.

### 119. What security headers may be relevant?

**Answer:** Headers like `Strict-Transport-Security`, `X-Content-Type-Options`, and content security policy can matter depending on the API and web clients. TLS termination and reverse proxies often manage them.

### 120. What is a strong answer to a security interview question?

**Answer:** Start with threat modeling, validate inputs, authenticate identities, authorize resources, protect secrets, log security events, test abuse cases, and align with OWASP API Security guidance.

## 7. Databases, ORMs, and Transactions

### 121. Which database libraries are commonly used with FastAPI?

**Answer:** Common choices include SQLAlchemy, SQLModel, asyncpg, psycopg, databases, Tortoise ORM, and Beanie for MongoDB. The choice depends on sync/async needs and team experience.

### 122. Should FastAPI route handlers directly contain SQL queries?

**Answer:** For small prototypes it is acceptable, but production code should usually use repositories or services. This improves testability and separates HTTP concerns from persistence.

### 123. How do you manage SQLAlchemy sessions in FastAPI?

**Answer:** Use a dependency that creates a session per request, yields it, and closes it afterwards. For writes, handle commit/rollback carefully in the service or transaction boundary.

### 124. What is the difference between sync and async database drivers?

**Answer:** Sync drivers block the executing thread during I/O. Async drivers cooperate with the event loop and are better suited for high-concurrency async endpoints.

### 125. Should you always use an async database driver with FastAPI?

**Answer:** No. Sync SQLAlchemy can work well when properly run in threadpools and sized correctly. Async drivers help most when the app is I/O-bound and the whole stack is async.

### 126. What is a transaction?

**Answer:** A transaction groups database operations so they either all succeed or all fail. It protects data consistency when multiple changes must be atomic.

### 127. Where should transaction boundaries be placed?

**Answer:** Usually at the service/use-case layer, not scattered across route handlers. This allows one business operation to commit or roll back as a unit.

### 128. How do you handle database integrity errors?

**Answer:** Catch specific database exceptions, roll back the session, and translate them into meaningful HTTP errors such as 409 conflict or 400 bad request. Do not expose raw database messages.

### 129. What is optimistic locking?

**Answer:** Optimistic locking detects conflicting updates using a version column or timestamp. It is useful when multiple users may edit the same resource concurrently.

### 130. What is pagination and why is it important?

**Answer:** Pagination limits large result sets and improves performance. Use limit/offset for simplicity or cursor pagination for stable high-volume feeds.

### 131. What is cursor pagination?

**Answer:** Cursor pagination uses a stable cursor such as an encoded ID/timestamp rather than an offset. It performs better on large datasets and avoids some consistency issues.

### 132. How do you avoid exposing database IDs when needed?

**Answer:** Use UUIDs, ULIDs, slugs, or public IDs instead of sequential internal IDs. This does not replace authorization, but it reduces enumeration risk.

### 133. What is connection pool exhaustion?

**Answer:** It occurs when all database connections are in use and new requests wait or fail. Causes include too many workers, slow queries, leaked sessions, and missing timeouts.

### 134. How do you tune DB connection pools for FastAPI?

**Answer:** Consider worker count, max concurrent requests, database limits, query latency, and external poolers like PgBouncer. Avoid multiplying workers by pool size beyond database capacity.

### 135. How do you handle migrations?

**Answer:** Use a migration tool such as Alembic for SQLAlchemy. Migrations should be reviewed, tested, reversible where possible, and deployed carefully for zero-downtime changes.

### 136. What is a zero-downtime migration pattern?

**Answer:** Use expand-and-contract: add backward-compatible schema changes, deploy code that supports both old and new schema, backfill data, then remove old fields later.

### 137. How do you model multi-tenancy?

**Answer:** Common approaches include tenant_id columns, schema-per-tenant, or database-per-tenant. Every query must enforce tenant isolation, preferably centrally.

### 138. How do you test database code?

**Answer:** Use integration tests with a real test database or containers for realistic behavior. Mocking can help for service tests, but database behavior should be tested with the actual engine.

### 139. What is the repository pattern?

**Answer:** It encapsulates data access behind an interface, so services do not depend directly on ORM details. It can improve testability but should not become unnecessary abstraction.

### 140. What database answer works well for German enterprise interviews?

**Answer:** Emphasize consistency, transactions, migrations, auditability, tenant isolation, backup/restore, performance monitoring, and GDPR-aware data retention.

## 8. Testing and Quality Engineering

### 141. How do you test FastAPI endpoints?

**Answer:** Use FastAPI’s test client or an async HTTP client to call the application in tests. Assert status codes, response bodies, headers, and side effects.

### 142. What is the purpose of dependency overrides in tests?

**Answer:** They let you replace production dependencies with test doubles, fake users, or test database sessions. This makes tests deterministic and faster.

### 143. What should be unit-tested in a FastAPI project?

**Answer:** Domain logic, services, validators, authorization policies, and utility functions should be unit-tested without HTTP. Route tests should cover integration points.

### 144. What should be integration-tested?

**Answer:** Test endpoints with database, authentication, serialization, migrations, and external-service boundaries where practical. Integration tests catch wiring mistakes that unit tests miss.

### 145. How do you test authentication?

**Answer:** Override the current-user dependency, generate valid and invalid tokens, and verify 401/403 behavior. Also test expired tokens and missing scopes.

### 146. How do you test authorization?

**Answer:** Create users with different roles, tenants, and ownership relationships. Test both allowed and denied access, especially object-level authorization.

### 147. How do you test validation errors?

**Answer:** Send malformed payloads, missing fields, wrong types, and boundary values. Verify FastAPI returns 422 or your custom error format.

### 148. How do you test background tasks?

**Answer:** Keep the task logic in a separate function and test it directly. For end-to-end behavior, assert that the task is scheduled or run using controlled test hooks.

### 149. How do you test database transactions?

**Answer:** Use a test database and roll back after each test or recreate schema using fixtures. Verify failed operations do not leave partial data.

### 150. What is contract testing?

**Answer:** Contract testing verifies that API providers and consumers agree on request/response formats and behavior. OpenAPI schemas can support this, but behavior must also be tested.

### 151. How do you test OpenAPI compatibility?

**Answer:** Generate or inspect the OpenAPI schema and check that required endpoints, schemas, status codes, and security schemes exist. This is useful in CI for API governance.

### 152. What is property-based testing?

**Answer:** Property-based testing generates many inputs to check general invariants. It is useful for validators, parsers, and business rules with many edge cases.

### 153. What is load testing?

**Answer:** Load testing measures system behavior under expected or high traffic. For FastAPI, tools like k6, Locust, or wrk can reveal bottlenecks in DB, serialization, or external calls.

### 154. What metrics do you examine during load tests?

**Answer:** Look at p50/p95/p99 latency, error rates, throughput, CPU, memory, event-loop blocking, database pool usage, and downstream service latency.

### 155. How do you avoid flaky API tests?

**Answer:** Control time, isolate databases, avoid dependence on external services, clean state between tests, and use deterministic fixtures. Flakiness is often a sign of hidden coupling.

### 156. What is test coverage, and is 100% coverage enough?

**Answer:** Coverage shows which lines were executed by tests, but it does not prove correctness. Meaningful assertions and risk-based test design matter more than chasing 100%.

### 157. How do you structure test folders?

**Answer:** Common structures include `tests/unit`, `tests/integration`, and `tests/e2e`, with fixtures in `conftest.py`. Match tests to the application architecture.

### 158. How do you test error handling?

**Answer:** Force known exceptions from dependencies or services and assert stable error responses. Also verify logs do not leak secrets.

### 159. How do you use CI for FastAPI quality?

**Answer:** Run formatting, linting, type checks, unit tests, integration tests, migration checks, security scanning, and Docker build verification. Enterprise teams expect automated gates.

### 160. What testing answer impresses interviewers?

**Answer:** Explain a test pyramid: many unit tests for domain logic, fewer integration tests for API/database behavior, contract tests for consumers, and targeted load/security tests for production risks.

## 9. Middleware, Lifespan, Background Tasks, and Events

### 161. What is middleware in FastAPI?

**Answer:** Middleware is code that runs around requests and responses. It can handle logging, correlation IDs, CORS, compression, timing, and security headers.

### 162. When should you use middleware instead of dependencies?

**Answer:** Use middleware for cross-cutting behavior that should apply globally to all requests. Use dependencies when behavior is route-specific and returns typed values.

### 163. What is a lifespan event?

**Answer:** Lifespan events manage application startup and shutdown. They are used to initialize resources like connection pools, clients, caches, and to clean them up.

### 164. Why are lifespan handlers preferred over old startup/shutdown events?

**Answer:** Lifespan provides a structured async context manager pattern for application lifecycle. It makes setup and teardown more explicit and composable.

### 165. What should be initialized during application startup?

**Answer:** Initialize shared clients, connection pools, telemetry, caches, model loading, and health-check dependencies. Avoid doing slow or fragile work unless the deployment expects it.

### 166. What should happen during shutdown?

**Answer:** Close database pools, HTTP clients, message consumers, and telemetry exporters gracefully. This helps prevent data loss and resource leaks.

### 167. What are FastAPI background tasks?

**Answer:** Background tasks are functions scheduled to run after the response is sent. They are useful for simple post-response work such as sending emails or writing audit records.

### 168. When should you not use FastAPI background tasks?

**Answer:** Do not use them for critical, long-running, CPU-heavy, or distributed jobs. Use Celery, RQ, Dramatiq, Arq, Kafka consumers, or a workflow system instead.

### 169. What is a common risk with in-process background tasks?

**Answer:** If the process crashes, the task may be lost. In multi-worker deployments, background tasks are also tied to the worker that handled the request.

### 170. How do you implement request timing middleware?

**Answer:** Record time before calling `call_next(request)`, then add duration to logs or response headers. Use monotonic clocks rather than wall-clock time.

### 171. How do you implement correlation IDs?

**Answer:** Read an incoming request ID header or generate one if missing, store it in context, add it to logs, and return it in response headers. This improves debugging across services.

### 172. What is CORS middleware?

**Answer:** CORS middleware controls which browser origins can call your API. It is important for frontend integration but does not replace authentication or authorization.

### 173. What is GZip middleware?

**Answer:** It compresses responses above a configured size. It can reduce bandwidth but costs CPU and may not help already-compressed content.

### 174. How do you handle exceptions globally?

**Answer:** Register exception handlers for specific exception types. Return consistent error bodies and status codes while logging enough detail for operators.

### 175. What is a custom response class?

**Answer:** A custom response class controls serialization, media type, or headers. Examples include `ORJSONResponse`, `HTMLResponse`, `FileResponse`, and `StreamingResponse`.

### 176. How do you support WebSockets in FastAPI?

**Answer:** Use `@app.websocket('/path')` and accept/send messages through a WebSocket object. Authentication and scaling need special attention with WebSockets.

### 177. What is the challenge of WebSockets in multi-instance deployments?

**Answer:** Connections are stateful and live on a specific instance. Broadcasts, presence, and shared state usually require Redis, pub/sub, or a message broker.

### 178. How would you implement graceful degradation in middleware?

**Answer:** Keep middleware robust: do not let optional telemetry or logging failures break user requests. Use timeouts and fallback behavior for non-critical middleware calls.

### 179. What should not be done in middleware?

**Answer:** Avoid heavy business logic, blocking I/O, large body reads without need, and route-specific authorization that depends on complex domain state. Middleware should remain thin.

### 180. What lifecycle answer is strong for enterprise interviews?

**Answer:** Discuss startup readiness, graceful shutdown, resource cleanup, Kubernetes probes, telemetry initialization, and safe handling of partially available dependencies.

## 10. OpenAPI, Documentation, and API Design

### 181. How does FastAPI generate OpenAPI documentation?

**Answer:** FastAPI inspects routes, type hints, Pydantic models, dependencies, status codes, and metadata to generate an OpenAPI schema. The schema powers interactive docs and client generation.

### 182. What is OpenAPI?

**Answer:** OpenAPI is a standard specification for describing HTTP APIs. It documents endpoints, parameters, request bodies, responses, authentication, and schemas.

### 183. Why is OpenAPI important in large companies?

**Answer:** It enables contract-first collaboration, client generation, governance, testing, documentation, and integration between teams. It reduces ambiguity in distributed systems.

### 184. How do you add tags to endpoints?

**Answer:** Use the `tags` parameter in route decorators or routers. Tags group endpoints in generated documentation.

### 185. How do you add summaries and descriptions?

**Answer:** Use `summary` and `description` in path operation decorators, or docstrings for longer descriptions. Good docs should explain behavior, not just repeat names.

### 186. How do you document response status codes?

**Answer:** Use `responses={...}` in route decorators and set explicit `status_code`. This documents success, validation, auth, conflict, and error responses.

### 187. How do you hide an endpoint from OpenAPI docs?

**Answer:** Set `include_in_schema=False` on the route decorator. This is useful for internal endpoints but should not be used as a security mechanism.

### 188. How do you customize the OpenAPI schema?

**Answer:** FastAPI allows custom OpenAPI generation by overriding the app’s `openapi` function. Use this carefully for corporate metadata, gateways, or documentation extensions.

### 189. What is API versioning?

**Answer:** API versioning manages changes over time. Common approaches include URL versioning such as `/v1`, header versioning, or media type versioning.

### 190. What changes require a new API version?

**Answer:** Breaking changes such as removing fields, changing field meanings, renaming endpoints, or changing status code semantics usually require versioning or a careful migration path.

### 191. What is backward compatibility?

**Answer:** Backward compatibility means old clients continue working after the API changes. Additive changes are usually safe; removals and semantic changes are risky.

### 192. How should deprecation be handled?

**Answer:** Document deprecation, add response headers if useful, communicate timelines, monitor usage, and provide migration guidance. Do not break clients silently.

### 193. What is idempotency?

**Answer:** An operation is idempotent if repeating it has the same effect as doing it once. GET, PUT, and DELETE are expected to be idempotent in many REST designs.

### 194. How do you implement idempotency for POST requests?

**Answer:** Accept an idempotency key, store request outcome, and return the same result for retries. This is important for payments, orders, and unreliable networks.

### 195. What is the difference between PUT and PATCH?

**Answer:** PUT usually replaces a resource representation. PATCH applies partial changes. In practice, define semantics clearly and test them.

### 196. How do you design error responses?

**Answer:** Use consistent fields such as code, message, details, correlation ID, and validation errors. Avoid leaking stack traces or internal implementation details.

### 197. What is HATEOAS, and is it common in FastAPI APIs?

**Answer:** HATEOAS means responses include links for available actions. It is part of REST maturity but is not commonly implemented fully in many enterprise JSON APIs.

### 198. How do you design APIs for frontend teams?

**Answer:** Keep schemas stable, document examples, use predictable errors, support pagination/filtering/sorting, and coordinate changes through OpenAPI contracts.

### 199. What is a health endpoint?

**Answer:** A health endpoint reports service status. Production systems often separate liveness, readiness, and dependency health.

### 200. What API design answer stands out?

**Answer:** Explain trade-offs: REST consistency, backward compatibility, OpenAPI governance, domain-driven resource boundaries, pagination, error contracts, and security-by-design.

## 11. Error Handling, Responses, and Serialization

### 201. How do you raise an HTTP error in FastAPI?

**Answer:** Raise `HTTPException(status_code=..., detail=...)`. FastAPI converts it into a JSON error response with the given status code.

### 202. When should you use 400 vs 422?

**Answer:** 400 is usually for malformed or invalid business requests. 422 is FastAPI’s default for syntactically valid requests that fail validation against the declared schema.

### 203. When should you return 401?

**Answer:** Return 401 when authentication is missing or invalid. Include appropriate `WWW-Authenticate` headers for bearer-token flows when relevant.

### 204. When should you return 403?

**Answer:** Return 403 when the user is authenticated but not allowed to perform the action. Do not use 403 for missing credentials.

### 205. When should you return 404?

**Answer:** Return 404 when a resource does not exist or should not be revealed. In security-sensitive cases, 404 can prevent disclosing resource existence.

### 206. When should you return 409?

**Answer:** Return 409 for conflicts such as duplicate unique values, version conflicts, or business-state conflicts. It is common for optimistic locking or already-existing resources.

### 207. How do you return 201 Created?

**Answer:** Set `status_code=201` in the route decorator and usually include the created resource or a location header. Use it for successful creation operations.

### 208. How do you return 204 No Content?

**Answer:** Set `status_code=204` and return no body. It is common for successful deletes or updates that do not need a response body.

### 209. What is response serialization?

**Answer:** It is converting Python objects into response formats like JSON. FastAPI uses encoders and response models to produce JSON-compatible output.

### 210. What is `jsonable_encoder`?

**Answer:** `jsonable_encoder` converts objects like Pydantic models, datetimes, UUIDs, and enums into JSON-compatible structures. It is useful before storing or returning custom data.

### 211. How do you handle datetime serialization?

**Answer:** Use timezone-aware datetimes and let Pydantic/FastAPI serialize them as ISO 8601 strings. Avoid naive datetimes in distributed systems.

### 212. Why are timezone-aware datetimes important?

**Answer:** Distributed systems and European/German users may operate across time zones and daylight-saving changes. Store UTC internally and convert at boundaries when needed.

### 213. How do you return a file?

**Answer:** Use `FileResponse` for files on disk or `StreamingResponse` for generated/large files. Set correct media type and content-disposition when needed.

### 214. How do you return non-JSON responses?

**Answer:** Use response classes such as `HTMLResponse`, `PlainTextResponse`, `Response`, `FileResponse`, or `StreamingResponse`. Set the appropriate media type.

### 215. How do you customize validation error responses?

**Answer:** Register a custom exception handler for `RequestValidationError`. Keep the response format stable and useful for clients.

### 216. How do you avoid leaking internal errors?

**Answer:** Catch and log unexpected exceptions, return generic 500 responses, and avoid exposing stack traces. Observability should happen in logs/traces, not client responses.

### 217. How should domain exceptions be handled?

**Answer:** Translate domain-specific exceptions into HTTP errors at the API boundary. This keeps domain logic independent from FastAPI.

### 218. What is a problem-details error format?

**Answer:** Problem Details is a standardized JSON structure for HTTP API errors. Even if not using it exactly, a consistent error schema helps clients handle errors reliably.

### 219. How do you document custom error responses?

**Answer:** Use the `responses` parameter in route decorators and define Pydantic error models. This makes OpenAPI documentation reflect real client behavior.

### 220. What response-handling mistake is common?

**Answer:** Returning ORM objects directly without controlling response models can leak internal fields or trigger lazy-loading issues. Use explicit response schemas.

## 12. Deployment, Containers, and Production Operations

### 221. How do you run a FastAPI app locally?

**Answer:** Use an ASGI server such as Uvicorn, for example `uvicorn app.main:app --reload`. The reload flag is for development only.

### 222. How should FastAPI be run in production?

**Answer:** Run it with an ASGI server and appropriate worker configuration, often behind a reverse proxy or load balancer. Avoid development reload mode in production.

### 223. What is the role of Gunicorn with Uvicorn workers?

**Answer:** Gunicorn can manage multiple worker processes while Uvicorn handles ASGI inside each worker. This is a common Linux production pattern, though direct Uvicorn can also be used.

### 224. How many workers should you run?

**Answer:** It depends on CPU cores, memory, workload type, and external bottlenecks. Start with measured load tests rather than blindly applying formulas.

### 225. Why use Docker for FastAPI?

**Answer:** Docker packages the application, dependencies, runtime, and startup command consistently. It helps CI/CD, deployment reproducibility, and Kubernetes environments.

### 226. What should a good FastAPI Docker image include?

**Answer:** Use a slim base image, pin dependencies, install only needed packages, run as a non-root user, avoid secrets in layers, and define a clear command and health checks.

### 227. What is a readiness probe?

**Answer:** A readiness probe tells orchestrators whether the service can receive traffic. It should check critical startup state and sometimes required dependencies.

### 228. What is a liveness probe?

**Answer:** A liveness probe tells the orchestrator whether the process is alive and should be restarted. It should be lightweight and not fail due to temporary downstream outages.

### 229. Why separate readiness and liveness?

**Answer:** If a database is temporarily down, the app may be alive but not ready. Restarting every instance during a dependency outage can make recovery worse.

### 230. How do you manage configuration in production?

**Answer:** Use environment variables, secret managers, and typed settings models. Separate config from code and validate required settings at startup.

### 231. What is twelve-factor app methodology?

**Answer:** It is a set of practices for cloud-native applications, including config via environment, stateless processes, logs as streams, and disposability. FastAPI services often follow these principles.

### 232. How do you deploy FastAPI on Kubernetes?

**Answer:** Package it in a container, define deployments/services, configure probes, resource requests/limits, secrets, config maps, horizontal scaling, and ingress or gateway routing.

### 233. How do you handle graceful shutdown in Kubernetes?

**Answer:** Use lifespan shutdown hooks, close connections, stop accepting traffic before termination, and set termination grace periods. This prevents dropped requests and resource leaks.

### 234. What is horizontal scaling?

**Answer:** Horizontal scaling means running more instances of the service. Stateless FastAPI APIs scale horizontally more easily than stateful services.

### 235. What state should not be kept only in process memory?

**Answer:** Sessions, critical jobs, rate-limit counters, distributed locks, and shared cache state should use external systems. In-process state is not shared across workers or pods.

### 236. What is blue-green deployment?

**Answer:** Blue-green deployment runs two production environments and switches traffic from old to new after validation. It reduces downtime and supports quick rollback.

### 237. What is canary deployment?

**Answer:** Canary deployment gradually sends a small percentage of traffic to a new version. It helps detect issues before full rollout.

### 238. How do you handle database migrations during deployment?

**Answer:** Run migrations as controlled release steps, not randomly inside every app worker. Use backward-compatible migrations for zero-downtime deployment.

### 239. What production risks are common with FastAPI?

**Answer:** Common risks include blocking async endpoints, poor database pool sizing, missing timeouts, no structured logs, weak auth, and treating background tasks as durable jobs.

### 240. What deployment answer impresses German enterprise companies?

**Answer:** Talk about reproducible builds, security scanning, non-root containers, audit trails, GDPR-aware logging, readiness/liveness probes, rollback strategy, and infrastructure-as-code.

## 13. Observability, Logging, and Reliability

### 241. What is observability?

**Answer:** Observability is the ability to understand system behavior from logs, metrics, and traces. It helps diagnose production issues without guessing.

### 242. What should be logged in a FastAPI request?

**Answer:** Log request method, path, status code, latency, correlation ID, user or tenant ID when safe, and error information. Do not log secrets or sensitive personal data.

### 243. What is structured logging?

**Answer:** Structured logging uses machine-readable fields, often JSON, instead of free-form text. It makes logs searchable and easier to analyze in centralized systems.

### 244. What is a correlation ID?

**Answer:** A correlation ID links logs and traces for a single request across services. It is essential in microservices and distributed systems.

### 245. What metrics are useful for FastAPI?

**Answer:** Useful metrics include request count, latency percentiles, error rate, in-flight requests, CPU/memory, database pool usage, and downstream call latency.

### 246. What is distributed tracing?

**Answer:** Distributed tracing follows a request across services and records spans for each operation. It helps identify which service or database call caused latency.

### 247. What is OpenTelemetry?

**Answer:** OpenTelemetry is a standard framework for collecting traces, metrics, and logs. It is commonly used to instrument FastAPI services in enterprise platforms.

### 248. What is p95 latency?

**Answer:** p95 latency means 95% of requests are faster than that value. It is more informative than average latency for user experience and SLOs.

### 249. What is an SLO?

**Answer:** A service-level objective defines a reliability target such as 99.9% successful requests under 300 ms. SLOs guide engineering trade-offs.

### 250. What is an error budget?

**Answer:** An error budget is the allowed amount of unreliability within an SLO. If it is exhausted, teams usually prioritize reliability over new features.

### 251. How do you detect event-loop blocking?

**Answer:** Look for high latency under I/O load, use async profiling, monitor loop lag, and inspect code for blocking calls in `async def` endpoints.

### 252. How do you monitor database bottlenecks?

**Answer:** Track slow queries, connection pool saturation, lock waits, transaction duration, and query plans. API symptoms often originate in the database.

### 253. What is a circuit breaker?

**Answer:** A circuit breaker stops calling a failing downstream service for a period of time. It prevents cascading failures and gives dependencies time to recover.

### 254. What is retry logic?

**Answer:** Retry logic repeats failed operations that are likely transient. Use bounded retries with exponential backoff and jitter, and avoid retrying non-idempotent operations blindly.

### 255. What is a timeout budget?

**Answer:** A timeout budget allocates time across downstream calls so the API can return within its overall latency target. It prevents one dependency from consuming the entire request time.

### 256. How do you make FastAPI health checks useful?

**Answer:** Separate liveness from readiness and include dependency checks only where they are operationally meaningful. Health endpoints should be fast and reliable.

### 257. What is graceful degradation?

**Answer:** Graceful degradation means returning partial or reduced functionality when dependencies fail. For example, serve cached data when a recommendation service is unavailable.

### 258. How do you handle incidents?

**Answer:** Use alerts based on user-impacting symptoms, inspect dashboards and traces, mitigate first, communicate clearly, and perform a blameless postmortem afterwards.

### 259. What should not be in logs under GDPR?

**Answer:** Do not log unnecessary personal data, passwords, tokens, full identifiers, health data, or sensitive business data. Apply minimization, retention limits, and access controls.

### 260. What observability answer stands out?

**Answer:** Describe a full path: instrument middleware, propagate correlation IDs, collect metrics/traces/logs, define SLOs, alert on symptoms, and use postmortems to improve resilience.

## 14. Microservices, Integration, and System Design

### 261. When is FastAPI a good choice for microservices?

**Answer:** It is a good choice when services need clear HTTP contracts, type validation, async I/O, high developer productivity, and OpenAPI documentation. It works well for backend APIs, ML services, and integration layers.

### 262. When should you avoid microservices?

**Answer:** Avoid microservices when the team cannot handle operational complexity, distributed transactions, monitoring, and deployment coordination. A modular monolith may be better early on.

### 263. What is a bounded context?

**Answer:** A bounded context is a domain boundary where terms and rules have a specific meaning. In FastAPI, routers and services can be organized around bounded contexts.

### 264. How do services communicate?

**Answer:** Common communication modes include synchronous HTTP/gRPC and asynchronous messaging through queues or event streams. Choose based on consistency, latency, and coupling requirements.

### 265. When would you choose async messaging over HTTP?

**Answer:** Choose messaging for decoupling, resilience, long-running work, event-driven workflows, and smoothing traffic spikes. HTTP is simpler for direct request/response interactions.

### 266. What is eventual consistency?

**Answer:** Eventual consistency means data across services may temporarily differ but will converge over time. It is common in distributed systems using async events.

### 267. What is a saga?

**Answer:** A saga coordinates a business process across services using local transactions and compensating actions. It avoids distributed database transactions.

### 268. How would you design an order API in FastAPI?

**Answer:** Use explicit request/response schemas, validate idempotency keys, persist order state transactionally, publish domain events, and provide status endpoints. Keep payment and inventory integration resilient.

### 269. How would you design a user service?

**Answer:** Separate authentication identity from user profile data, protect PII, enforce tenant boundaries, expose stable APIs, and integrate with enterprise identity providers where needed.

### 270. How would you design a file upload service?

**Answer:** Accept metadata, validate file type and size, store files in object storage, scan for malware if required, use pre-signed URLs for large uploads, and keep DB records for ownership and lifecycle.

### 271. How would you design a notification service?

**Answer:** Accept notification requests, validate templates and recipients, enqueue work, process through workers, retry transient failures, and track delivery status. Avoid sending emails synchronously in API requests.

### 272. How would you design rate limiting across multiple FastAPI instances?

**Answer:** Use a shared store like Redis or an API gateway, not in-memory counters. Enforce per-user, per-IP, or per-client quotas depending on the threat model.

### 273. What is an API gateway?

**Answer:** An API gateway sits in front of services and may handle routing, TLS, authentication, rate limiting, request transformation, and observability. Application-level authorization still remains important.

### 274. What is service discovery?

**Answer:** Service discovery lets services find each other dynamically. In Kubernetes this is often handled by DNS and service objects.

### 275. What is the outbox pattern?

**Answer:** The outbox pattern stores domain events in the same transaction as database changes, then publishes them asynchronously. It prevents losing events after a successful database commit.

### 276. What is idempotent consumer design?

**Answer:** An idempotent consumer handles duplicate messages safely. It tracks processed message IDs or designs operations so repeated execution has no harmful effect.

### 277. How do you handle schema evolution in event-driven systems?

**Answer:** Use versioned event schemas, additive changes, compatibility rules, and consumer-driven testing. Never assume all consumers update at the same time.

### 278. How would you expose ML model inference through FastAPI?

**Answer:** Load the model during startup, validate input schemas, use batching if helpful, set timeouts, monitor latency/drift, and offload heavy inference where needed. Avoid reloading models per request.

### 279. How do you design tenant isolation in a microservice system?

**Answer:** Carry tenant context through auth claims and dependencies, enforce tenant filters in data access, isolate storage if required, and include tenant-aware audit logs.

### 280. What system-design answer impresses large European companies?

**Answer:** Balance technical design with governance: API contracts, data protection, observability, operational ownership, backward compatibility, incident response, and compliance requirements.

## 15. Europe/Germany Enterprise, GDPR, and Big-Company Scenarios

### 281. How does GDPR affect FastAPI API design?

**Answer:** GDPR requires data minimization, lawful processing, purpose limitation, retention controls, access controls, and support for data subject rights. API design should avoid collecting or exposing unnecessary personal data.

### 282. What is data minimization?

**Answer:** Data minimization means collecting and processing only the personal data necessary for a specific purpose. In FastAPI, this affects schemas, logging, analytics, and database design.

### 283. How should logs be designed under GDPR?

**Answer:** Logs should avoid unnecessary personal data and secrets, use pseudonymous IDs where possible, have retention limits, and be access-controlled. Debug logs in production need strict review.

### 284. What is pseudonymization?

**Answer:** Pseudonymization replaces direct identifiers with indirect identifiers, reducing privacy risk. It is useful for logs, analytics, and support workflows but does not make data fully anonymous.

### 285. What is the right to erasure?

**Answer:** It is the right for individuals to request deletion of their personal data under certain conditions. Systems need deletion workflows, retention exceptions, and auditability.

### 286. How would you implement data export for a user?

**Answer:** Create an authenticated endpoint or internal workflow that gathers personal data across systems, serializes it in a portable format, and logs the request. Ensure only authorized subjects or staff can access it.

### 287. How would you implement data deletion across microservices?

**Answer:** Use a coordinated deletion workflow or event-driven process, track completion, handle legal retention exceptions, and ensure backups/archives follow policy. Avoid pretending one table delete is enough.

### 288. How do you handle consent in API systems?

**Answer:** Store consent records with purpose, timestamp, version, and source. Enforce consent checks in application logic and allow withdrawal where legally required.

### 289. What is data residency?

**Answer:** Data residency refers to where data is stored and processed geographically. German or EU enterprises may require EU-region hosting or stricter controls for certain data.

### 290. How do you design APIs for auditability?

**Answer:** Record who did what, when, from where, and on which resource, without logging excessive payload data. Audit logs should be tamper-resistant and searchable.

### 291. How do you handle multi-language requirements in Europe?

**Answer:** Keep locale as explicit user or request context, separate translations from business logic, and return stable error codes plus localized messages where appropriate.

### 292. What is accessibility relevance for API teams?

**Answer:** APIs support accessible frontends by providing clear content structure, localization, error semantics, and predictable validation messages. Backend teams should not ignore accessibility requirements.

### 293. How would you prepare FastAPI for ISO 27001-style environments?

**Answer:** Use secure SDLC practices, access controls, logging, vulnerability scanning, dependency management, incident procedures, and documented risk treatment. The API code should fit into broader controls.

### 294. How do you manage dependencies securely?

**Answer:** Pin versions, scan for vulnerabilities, use lock files, review transitive dependencies, and update regularly. CI should fail on critical vulnerabilities according to policy.

### 295. How do you handle secrets in a German enterprise cloud environment?

**Answer:** Use managed secret stores such as cloud secret managers, Kubernetes secrets with encryption, or Vault. Rotate secrets and restrict access through least privilege.

### 296. What does least privilege mean for a FastAPI service?

**Answer:** The service should only have permissions necessary for its job: limited database access, scoped cloud credentials, restricted network access, and minimal runtime privileges.

### 297. How do you design for works council or internal audit concerns?

**Answer:** Be transparent about what employee data is collected, why it is processed, who can access it, and how long it is retained. Build controls that support policy review.

### 298. How should APIs handle personally identifiable information in responses?

**Answer:** Return only fields needed by the client and use response models to filter internal data. Apply masking or redaction for sensitive fields when full values are not required.

### 299. What interview answer shows maturity for Germany/EU companies?

**Answer:** Say that technical implementation must align with privacy, security, auditability, and operational governance. FastAPI features help, but compliance comes from system design and processes.

### 300. How would you answer a final senior interview question: 'Why should we trust your FastAPI service in production?'

**Answer:** Explain validation, authentication, authorization, tests, observability, deployment safety, incident response, data protection, and clear ownership. Trust comes from engineering discipline, not only framework choice.
