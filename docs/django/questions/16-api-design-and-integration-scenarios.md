# API design and integration scenarios

## What makes a REST API resource-oriented?

It exposes stable resources using nouns, standard HTTP methods, status codes, representations, and links or identifiers. Business actions can still exist, but the API should not become a random collection of RPC-style endpoints without structure.

## What is idempotency and why does it matter?

An operation is idempotent if repeating it has the same effect as executing it once. It matters for retries, payment flows, order creation, and distributed systems where clients may not know whether the first request succeeded.

## How would you implement idempotency keys in Django?

Store a client-provided key with request fingerprint, user or tenant, status, and response metadata under a uniqueness constraint. Wrap processing in a transaction and return the previous result when the same key is retried.

## What status code would you return after creating a resource?

Usually return 201 Created with the created representation or a Location header. For asynchronous creation, 202 Accepted may be more appropriate.

## How should validation errors be represented in APIs?

Use a consistent error structure with field errors, non-field errors, machine-readable codes, and human-readable messages. Avoid leaking internals and document error formats so clients can handle them reliably.

## What is the difference between PUT and PATCH?

PUT usually replaces a resource representation, while PATCH applies partial modifications. APIs should define exact semantics and validation behavior because clients depend on consistency.

## How do you design APIs for backward compatibility?

Avoid removing fields, changing meanings, narrowing enum values, changing error formats, or altering pagination behavior without versioning. Additive changes are safer, but still require client communication and contract tests.

## What is a webhook and how should a Django app receive one securely?

A webhook is an HTTP callback from another system. Verify signatures, timestamps, replay protection, source IP only if reliable, idempotency, schema validation, and queue processing. Respond quickly and process heavy work asynchronously.

## How do you handle third-party API failures?

Use timeouts, retries with backoff, circuit breakers, idempotency, clear error states, and background reconciliation. Do not let slow external systems hold web request threads or database locks.

## How would you design an API for both web and mobile clients?

Use stable versioned endpoints, pagination, filtering, compact payloads, explicit error codes, backward compatibility, and authentication suitable for each client type. Avoid tying API design to one frontend's current screen layout.
