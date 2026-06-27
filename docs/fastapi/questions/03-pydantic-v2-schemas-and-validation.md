# Pydantic v2, Schemas, and Validation

## What is a Pydantic model?

A Pydantic model is a class derived from `BaseModel` that defines fields using type annotations. It validates input data and provides structured Python objects and serialized output.

## What changed conceptually from Pydantic v1 to v2?

Pydantic v2 introduced a redesigned validation engine, new validator decorators, `model_validate`, `model_dump`, and updated configuration patterns. Interviewers often expect awareness of migration differences.

## What is `model_dump()` used for?

`model_dump()` converts a Pydantic model into a Python dictionary. It replaces common v1 usage of `.dict()` in Pydantic v2.

## What is `model_validate()` used for?

`model_validate()` validates external data and creates a model instance. It is the v2-style explicit method for validating Python objects against a model.

## What is the difference between request models and response models?

Request models validate client input. Response models define the shape of output, filter unexpected fields, and document the API contract.

## Why should you use `response_model`?

`response_model` ensures responses match the public API schema and can prevent leaking internal fields such as passwords, internal IDs, or debug metadata.

## How do you exclude `None` fields from a response?

Use `response_model_exclude_none=True` on the route or call `model_dump(exclude_none=True)`. This keeps responses compact and avoids ambiguous nulls.

## How do you define optional fields in modern Python typing?

Use `field: str | None = None` or `Optional[str] = None`. The default value determines whether the field is required.

## What is the difference between `list[str]` and `List[str]`?

`list[str]` is the modern built-in generic syntax introduced in Python 3.9. `List[str]` from `typing` is older but still seen in legacy code.

## How do you add field constraints in Pydantic?

Use `Field()` with constraints and metadata such as `min_length`, `max_length`, `ge`, `le`, `description`, and examples. These constraints can appear in generated JSON Schema.

## How do you define a custom field validator in Pydantic v2?

Use `@field_validator('field_name')` inside the model. It should validate or transform the value and raise a clear error when invalid.

## How do you define validation involving multiple fields?

Use `@model_validator` in Pydantic v2. This is useful for rules like `end_date` must be after `start_date` or exactly one of two fields must be provided.

## What is a computed field?

A computed field is derived from other model fields and included in serialization when configured. It is useful for read-only values such as `full_name` or calculated totals.

## How do aliases work in Pydantic/FastAPI?

Aliases let external JSON names differ from internal Python names. For example, you may expose `userId` while keeping `user_id` internally.

## Why separate create, update, and read schemas?

Create schemas define required input for creation, update schemas usually allow partial fields, and read schemas include output-only fields such as IDs and timestamps. This avoids overloading one model for all use cases.

## How do you model partial updates with Pydantic?

Use an update schema where fields are optional and apply only fields explicitly provided by the client. `model_dump(exclude_unset=True)` is commonly used for PATCH operations.

## What is strict validation?

Strict validation avoids coercing types unexpectedly, such as accepting string `'1'` as integer `1`. It is valuable in financial, healthcare, and regulated systems where silent coercion is risky.

## What is JSON Schema in the FastAPI context?

JSON Schema describes the structure and constraints of JSON data. FastAPI derives JSON Schema from Pydantic models and embeds it into the OpenAPI specification.

## How should you handle backward-compatible schema changes?

Add optional fields, avoid renaming or removing existing fields, and version breaking changes. Communicate deprecations clearly in OpenAPI and release notes.

## What Pydantic mistakes are common in interviews?

Common mistakes include using one schema for everything, leaking password fields in responses, misunderstanding optional vs nullable fields, ignoring `exclude_unset` for PATCH, and using outdated v1 validator patterns without explanation.
