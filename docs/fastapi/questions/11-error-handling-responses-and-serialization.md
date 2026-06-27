# Error Handling, Responses, and Serialization

## How do you raise an HTTP error in FastAPI?

Raise `HTTPException(status_code=..., detail=...)`. FastAPI converts it into a JSON error response with the given status code.

## When should you use 400 vs 422?

400 is usually for malformed or invalid business requests. 422 is FastAPI’s default for syntactically valid requests that fail validation against the declared schema.

## When should you return 401?

Return 401 when authentication is missing or invalid. Include appropriate `WWW-Authenticate` headers for bearer-token flows when relevant.

## When should you return 403?

Return 403 when the user is authenticated but not allowed to perform the action. Do not use 403 for missing credentials.

## When should you return 404?

Return 404 when a resource does not exist or should not be revealed. In security-sensitive cases, 404 can prevent disclosing resource existence.

## When should you return 409?

Return 409 for conflicts such as duplicate unique values, version conflicts, or business-state conflicts. It is common for optimistic locking or already-existing resources.

## How do you return 201 Created?

Set `status_code=201` in the route decorator and usually include the created resource or a location header. Use it for successful creation operations.

## How do you return 204 No Content?

Set `status_code=204` and return no body. It is common for successful deletes or updates that do not need a response body.

## What is response serialization?

It is converting Python objects into response formats like JSON. FastAPI uses encoders and response models to produce JSON-compatible output.

## What is `jsonable_encoder`?

`jsonable_encoder` converts objects like Pydantic models, datetimes, UUIDs, and enums into JSON-compatible structures. It is useful before storing or returning custom data.

## How do you handle datetime serialization?

Use timezone-aware datetimes and let Pydantic/FastAPI serialize them as ISO 8601 strings. Avoid naive datetimes in distributed systems.

## Why are timezone-aware datetimes important?

Distributed systems and European/German users may operate across time zones and daylight-saving changes. Store UTC internally and convert at boundaries when needed.

## How do you return a file?

Use `FileResponse` for files on disk or `StreamingResponse` for generated/large files. Set correct media type and content-disposition when needed.

## How do you return non-JSON responses?

Use response classes such as `HTMLResponse`, `PlainTextResponse`, `Response`, `FileResponse`, or `StreamingResponse`. Set the appropriate media type.

## How do you customize validation error responses?

Register a custom exception handler for `RequestValidationError`. Keep the response format stable and useful for clients.

## How do you avoid leaking internal errors?

Catch and log unexpected exceptions, return generic 500 responses, and avoid exposing stack traces. Observability should happen in logs/traces, not client responses.

## How should domain exceptions be handled?

Translate domain-specific exceptions into HTTP errors at the API boundary. This keeps domain logic independent from FastAPI.

## What is a problem-details error format?

Problem Details is a standardized JSON structure for HTTP API errors. Even if not using it exactly, a consistent error schema helps clients handle errors reliably.

## How do you document custom error responses?

Use the `responses` parameter in route decorators and define Pydantic error models. This makes OpenAPI documentation reflect real client behavior.

## What response-handling mistake is common?

Returning ORM objects directly without controlling response models can leak internal fields or trigger lazy-loading issues. Use explicit response schemas.
