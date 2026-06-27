# FastAPI Fundamentals and Architecture

## What is FastAPI, and why is it popular for modern API development?

FastAPI is a Python web framework for building APIs using standard Python type hints. It is popular because it combines high performance, automatic request validation, automatic OpenAPI documentation, dependency injection, and strong editor support.

## How does FastAPI differ from Flask?

Flask is minimal and flexible but requires more extensions for validation, serialization, dependency handling, and API docs. FastAPI provides these features natively through type hints, Pydantic models, Starlette, and OpenAPI generation.

## How does FastAPI differ from Django REST Framework?

Django REST Framework is tied to Django’s batteries-included ecosystem and is excellent for monolithic database-backed applications. FastAPI is lighter, async-friendly, framework-composable, and often preferred for microservices, high-throughput APIs, and ML/AI service endpoints.

## What are the main building blocks behind FastAPI?

FastAPI sits on Starlette for ASGI routing, middleware, requests, responses, and WebSockets, and uses Pydantic for data validation and serialization. Uvicorn or another ASGI server usually runs the application.

## What is ASGI, and why does it matter in FastAPI?

ASGI is the asynchronous server gateway interface for Python web applications. It allows FastAPI to handle async requests, WebSockets, long-lived connections, and high-concurrency workloads better than traditional WSGI-only frameworks.

## What is a path operation in FastAPI?

A path operation is a function decorated with an HTTP method and path, such as `@app.get('/users/{user_id}')`. It defines how the application handles a specific route and HTTP method.

## What is the difference between `FastAPI()` and `APIRouter()`?

`FastAPI()` creates the main application object. `APIRouter()` groups related endpoints into modules so large codebases can be organized by domain, version, or bounded context.

## Why does FastAPI use Python type hints?

Type hints let FastAPI infer request parameters, validate incoming data, serialize responses, generate OpenAPI schemas, and provide better IDE support. They reduce boilerplate and make API contracts explicit.

## What happens when a request body does not match the declared Pydantic model?

FastAPI returns a 422 validation error by default. The response describes which field failed validation, where it failed, and why.

## What is automatic documentation in FastAPI?

FastAPI automatically generates OpenAPI schema and interactive documentation UIs, usually available at `/docs` and `/redoc`. This helps teams test endpoints and align backend/frontend contracts.

## Why is FastAPI considered high performance?

It runs on ASGI, uses Starlette’s efficient routing layer, supports async I/O, and relies on optimized validation from Pydantic. Actual performance still depends on database access, external services, serialization, and deployment configuration.

## Can FastAPI be used for monoliths as well as microservices?

Yes. FastAPI can power small services, modular monoliths, and microservice architectures. The key is organizing routers, dependencies, configuration, and domain logic cleanly.

## What is the role of Starlette in FastAPI?

Starlette provides the underlying ASGI toolkit: routing, middleware, requests, responses, WebSockets, background tasks, and lifespan events. FastAPI adds validation, dependency injection, OpenAPI generation, and developer ergonomics on top.

## What is the role of Pydantic in FastAPI?

Pydantic validates and serializes input and output data according to Python type annotations. In FastAPI it is commonly used for request bodies, response models, settings, and internal DTOs.

## What does 'declarative API design' mean in FastAPI?

It means defining API behavior through type annotations, models, decorators, and dependencies instead of manual parsing. FastAPI reads these declarations and handles validation, docs, and conversion.

## What is a production-ready FastAPI project structure?

A common structure separates API routers, schemas, domain services, database models, repositories, configuration, tests, and infrastructure code. Large companies expect clear boundaries rather than all logic inside route functions.

## Should business logic live inside FastAPI route functions?

Usually no. Route functions should stay thin: validate input, call application services, and return responses. Business logic belongs in service/domain layers so it can be tested without HTTP.

## What is the difference between a schema and a database model?

A schema is usually a Pydantic model used for validation and API serialization. A database model is usually an ORM or SQL model representing database tables and persistence details.

## What is an ASGI server?

An ASGI server runs an ASGI application and translates network requests into ASGI events. Common choices for FastAPI are Uvicorn, Hypercorn, or Gunicorn with Uvicorn workers.

## What should you mention when asked why a company should choose FastAPI?

Mention type-safe API contracts, automatic docs, async support, ecosystem maturity, good testability, and suitability for microservices. Also acknowledge trade-offs: Django may be better when an admin panel and tightly integrated ORM stack are required.
