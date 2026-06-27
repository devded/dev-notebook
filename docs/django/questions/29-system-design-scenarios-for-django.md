# System design scenarios for Django

## Design a Django URL shortener.

Use a Link model with unique short code, target URL, owner, timestamps, and status. Redirect through a fast lookup path with caching, track analytics asynchronously, validate URLs, prevent abuse, and design collision-resistant code generation.

## Design a Django booking system that prevents double booking.

Use a Booking model with resource, time range, status, and constraints. Enforce conflicts at the database level where possible, use transactions and locks, validate time zones, and make payment or confirmation workflows idempotent.

## Design a Django notification system.

Create notification templates, user preferences, delivery channels, and event records. Generate notifications through domain events or tasks, deduplicate, respect consent, retry delivery, and provide auditability.

## Design a file upload service in Django.

Use direct-to-object-storage uploads for large files, signed URLs, metadata records in Django, validation jobs, virus scanning where required, access control, retention policies, and CDN delivery for public assets.

## Design an audit trail for a financial Django app.

Record actor, action, object, before/after summary, timestamp, request ID, IP or device context where lawful, and integrity controls. Keep audit logs append-only, access-controlled, searchable, and covered by retention policy.

## Design a multi-tenant SaaS backend.

Model tenants, memberships, roles, billing, configuration, and tenant-scoped data. Enforce tenant isolation in queries and permissions, test cross-tenant access, monitor noisy tenants, and define data export/deletion procedures.

## Design a high-volume product catalog API.

Use normalized core models, denormalized read models or search index if needed, caching, cursor pagination, selective fields, background indexing, and clear consistency expectations between database and search.

## Design an order processing workflow.

Use explicit order states, transactions for local state changes, idempotency keys, payment webhooks, background fulfillment tasks, outbox events, and reconciliation jobs. Make every state transition auditable.

## Design a GDPR data deletion pipeline.

Accept verified requests, mark deletion workflow state, delete or anonymize data across models and external systems, remove files, clear caches/search indexes, log compliance actions, and handle legal retention exceptions.

## Design a real-time dashboard with Django.

Use normal HTTP APIs for initial data and WebSockets or server-sent events for updates. Push events through Channels or a message broker, aggregate expensive metrics asynchronously, and protect subscriptions with permissions.
