# Routing, Parameters, and Request Handling

## How do you define a basic GET endpoint in FastAPI?

Use a path operation decorator such as `@app.get('/items')` above a function. The function return value is automatically serialized to JSON unless a custom response is returned.

## How are path parameters declared?

Path parameters are declared in the URL template and function signature, for example `/users/{user_id}` with `user_id: int`. FastAPI validates and converts the value based on the type hint.

## How are query parameters declared?

Any function parameter not present in the path is treated as a query parameter by default. For example, `limit: int = 10` becomes an optional query parameter with a default value.

## What is the difference between required and optional query parameters?

A parameter without a default value is required. A parameter with a default value or typed as `str | None = None` is optional.

## How do you add validation to query parameters?

Use `Query()` with constraints such as `min_length`, `max_length`, `ge`, `le`, `pattern`, and descriptions. This validation is reflected in OpenAPI documentation.

## How do you add validation to path parameters?

Use `Path()` with constraints such as `gt`, `ge`, `lt`, and `le`. Path parameters are always required because they are part of the route.

## How do you accept request headers?

Declare a parameter using `Header()`, for example `user_agent: str | None = Header(default=None)`. FastAPI handles header name conversion, including hyphenated names.

## How do you accept cookies?

Declare a parameter using `Cookie()`. This is useful for session IDs, CSRF tokens, or feature flags, although stateless token auth is often preferred for APIs.

## How do you receive a JSON request body?

Declare a parameter typed as a Pydantic model. FastAPI parses the body as JSON, validates it, and gives your function a model instance.

## How do you receive multiple body parameters?

Declare multiple parameters with `Body()`, or wrap them into a single Pydantic request model. For enterprise APIs, a single explicit request model is usually clearer.

## How do you upload files in FastAPI?

Use `UploadFile` with `File()`. `UploadFile` is preferred for large files because it provides a file-like interface and avoids loading the entire file into memory at once.

## What is the difference between `bytes` and `UploadFile` for file uploads?

`bytes` reads the entire uploaded file into memory. `UploadFile` streams via a spooled temporary file and exposes metadata like filename and content type.

## How do you support form data?

Use `Form()` parameters. It is commonly used for OAuth2 password flows or compatibility with browser form submissions.

## How do you return a custom status code?

Set `status_code` in the decorator, for example `@app.post('/items', status_code=201)`, or return a `Response`/`JSONResponse` with an explicit status code.

## How do you redirect from a FastAPI endpoint?

Return `RedirectResponse(url='...')`. Use appropriate status codes such as 302 for temporary redirects or 307/308 when preserving the method matters.

## How do you stream a response?

Return `StreamingResponse` with an iterator or async iterator. This is useful for large downloads, server-generated files, or incremental AI output.

## How do you serve static files?

Mount `StaticFiles` at a path, such as `app.mount('/static', StaticFiles(directory='static'), name='static')`. In production, static files are often better served by a CDN or reverse proxy.

## How does FastAPI choose whether a parameter is path, query, body, header, or cookie?

FastAPI uses the path template, parameter type, default marker classes like `Query`, `Body`, `Header`, and whether the type is a Pydantic model. Pydantic models are usually interpreted as request bodies.

## What is route ordering, and why can it matter?

More specific routes should be registered before conflicting dynamic routes. For example, `/users/me` should appear before `/users/{user_id}` to avoid interpreting `me` as a user ID.

## How would you design route naming and versioning for a large company API?

Use consistent resource naming, plural nouns, clear HTTP methods, and version prefixes such as `/api/v1`. For large systems, route modules should map to domains and avoid leaking internal database structure.
