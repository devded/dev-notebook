# Microservices, Integration, and System Design

## When is FastAPI a good choice for microservices?

It is a good choice when services need clear HTTP contracts, type validation, async I/O, high developer productivity, and OpenAPI documentation. It works well for backend APIs, ML services, and integration layers.

## When should you avoid microservices?

Avoid microservices when the team cannot handle operational complexity, distributed transactions, monitoring, and deployment coordination. A modular monolith may be better early on.

## What is a bounded context?

A bounded context is a domain boundary where terms and rules have a specific meaning. In FastAPI, routers and services can be organized around bounded contexts.

## How do services communicate?

Common communication modes include synchronous HTTP/gRPC and asynchronous messaging through queues or event streams. Choose based on consistency, latency, and coupling requirements.

## When would you choose async messaging over HTTP?

Choose messaging for decoupling, resilience, long-running work, event-driven workflows, and smoothing traffic spikes. HTTP is simpler for direct request/response interactions.

## What is eventual consistency?

Eventual consistency means data across services may temporarily differ but will converge over time. It is common in distributed systems using async events.

## What is a saga?

A saga coordinates a business process across services using local transactions and compensating actions. It avoids distributed database transactions.

## How would you design an order API in FastAPI?

Use explicit request/response schemas, validate idempotency keys, persist order state transactionally, publish domain events, and provide status endpoints. Keep payment and inventory integration resilient.

## How would you design a user service?

Separate authentication identity from user profile data, protect PII, enforce tenant boundaries, expose stable APIs, and integrate with enterprise identity providers where needed.

## How would you design a file upload service?

Accept metadata, validate file type and size, store files in object storage, scan for malware if required, use pre-signed URLs for large uploads, and keep DB records for ownership and lifecycle.

## How would you design a notification service?

Accept notification requests, validate templates and recipients, enqueue work, process through workers, retry transient failures, and track delivery status. Avoid sending emails synchronously in API requests.

## How would you design rate limiting across multiple FastAPI instances?

Use a shared store like Redis or an API gateway, not in-memory counters. Enforce per-user, per-IP, or per-client quotas depending on the threat model.

## What is an API gateway?

An API gateway sits in front of services and may handle routing, TLS, authentication, rate limiting, request transformation, and observability. Application-level authorization still remains important.

## What is service discovery?

Service discovery lets services find each other dynamically. In Kubernetes this is often handled by DNS and service objects.

## What is the outbox pattern?

The outbox pattern stores domain events in the same transaction as database changes, then publishes them asynchronously. It prevents losing events after a successful database commit.

## What is idempotent consumer design?

An idempotent consumer handles duplicate messages safely. It tracks processed message IDs or designs operations so repeated execution has no harmful effect.

## How do you handle schema evolution in event-driven systems?

Use versioned event schemas, additive changes, compatibility rules, and consumer-driven testing. Never assume all consumers update at the same time.

## How would you expose ML model inference through FastAPI?

Load the model during startup, validate input schemas, use batching if helpful, set timeouts, monitor latency/drift, and offload heavy inference where needed. Avoid reloading models per request.

## How do you design tenant isolation in a microservice system?

Carry tenant context through auth claims and dependencies, enforce tenant filters in data access, isolate storage if required, and include tenant-aware audit logs.

## What system-design answer impresses large European companies?

Balance technical design with governance: API contracts, data protection, observability, operational ownership, backward compatibility, incident response, and compliance requirements.
