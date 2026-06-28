# REST APIs & HTTP

> Add new questions below in the same format: `## Question? <Badge ... />` then the answer.

## What is a REST API? <Badge type="tip" text="easy" />

::: details View Answer
An HTTP-based API following REST principles: resources identified by URLs, manipulated with standard HTTP methods, exchanging representations (usually JSON), and stateless requests. It's the dominant style for web/service APIs.
:::

## What are the main HTTP methods? <Badge type="tip" text="easy" />

::: details View Answer
- **GET** — read (safe, idempotent)
- **POST** — create (not idempotent)
- **PUT** — replace (idempotent)
- **PATCH** — partial update
- **DELETE** — remove (idempotent)
:::

## PUT vs PATCH? <Badge type="warning" text="medium" />

::: details View Answer
`PUT` replaces the **entire** resource (you send the full representation); `PATCH` applies a **partial** update (only the changed fields). `PUT` is idempotent; `PATCH` may or may not be.
:::

## Which HTTP status codes should you know? <Badge type="warning" text="medium" />

::: details View Answer
- **2xx** success: 200 OK, 201 Created, 204 No Content
- **3xx** redirect: 301, 304 Not Modified
- **4xx** client error: 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 409 Conflict, 422 Unprocessable, 429 Too Many Requests
- **5xx** server error: 500 Internal, 502 Bad Gateway, 503 Unavailable
:::

## What makes an API RESTful? <Badge type="warning" text="medium" />

::: details View Answer
Statelessness, resource-based URLs (nouns, not verbs), proper use of HTTP methods and status codes, a uniform interface, client–server separation, cacheability, and ideally HATEOAS (links to related actions).
:::

## What is idempotency and why does it matter? <Badge type="danger" text="hard" />

::: details View Answer
An idempotent operation produces the same result no matter how many times it's repeated. `GET`, `PUT`, `DELETE` are idempotent; `POST` isn't. It matters for safe retries — a client can re-send a request after a network failure without causing duplicate side effects.
:::

## How would you version a REST API? <Badge type="danger" text="hard" />

::: details View Answer
Common approaches: URL path (`/v1/users`), a custom header or `Accept` media type (`application/vnd.api.v2+json`), or a query param (`?version=2`). URL versioning is the most explicit/common. Version to avoid breaking existing clients; deprecate old versions on a schedule.
:::

## How do you handle pagination, filtering, and sorting? <Badge type="danger" text="hard" />

::: details View Answer
- **Pagination:** offset/limit (`?page=2&size=20`) or cursor-based (`?cursor=...`, better for large/changing data).
- **Filtering:** query params (`?status=active&min_price=10`).
- **Sorting:** a `sort` param (`?sort=-created_at` for descending).

Return metadata (total count, next/prev links) alongside the results.
:::

## How would you structure a production-ready REST API? <Badge type="danger" text="hard" />

::: details View Answer
Layered project (routing → service → repository), a solid framework (FastAPI/Django REST), an ORM with migrations, JWT/OAuth auth, input validation (Pydantic), consistent error responses + status codes, versioning, pagination, structured logging + monitoring, a pytest suite in CI, Docker packaging, and automated CD to a scalable host behind a load balancer. (See the full backend checklist in [Security & Best Practices](./security).)
:::