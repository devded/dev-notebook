# Files, email, payments, and external integrations

## How does Django handle file uploads?

Uploaded files are available through request.FILES and can be stored using configured storage backends. For production, storage often points to object storage, and validation plus access control must be designed explicitly.

## What is DEFAULT_FILE_STORAGE or STORAGES used for?

Django storage configuration controls how files are saved and retrieved. Modern Django projects configure storage backends for static files and media files, often using local storage in development and cloud object storage in production.

## How do you send email from Django?

Use Django's email utilities with a configured email backend. In production, use a reliable provider, handle bounces where relevant, avoid blocking user requests, and send most emails through background tasks.

## How would you implement password reset securely?

Use Django's built-in token-based reset flow or a similarly signed, time-limited token design. Avoid revealing whether an email exists, rate-limit requests, log abuse signals, and ensure reset links use the correct trusted domain.

## How should payments be integrated into a Django app?

Use a payment provider, treat provider webhooks as source of truth for final payment state, use idempotency keys, store minimal payment data, never store raw card data unless certified, and reconcile asynchronously.

## How do you verify payment webhooks?

Validate provider signatures, timestamps, event IDs, and expected account or environment. Store processed event IDs under a unique constraint to prevent duplicate processing.

## What is the risk of relying only on frontend payment success pages?

Users can close the browser, network calls can fail, and malicious clients can fake frontend state. Backend confirmation should rely on provider APIs or signed webhooks.

## How do you integrate with a legacy SOAP or XML system?

Create a dedicated adapter layer, validate schemas, handle timeouts and retries, normalize errors, map external data into internal domain objects, and test with fixtures or contract tests.

## How do you handle API credentials for third-party services?

Store credentials in a secret manager, scope them minimally, rotate them, avoid logging them, and separate credentials by environment. Use audit logs for access to production secrets.

## How do you make integrations observable?

Log correlation IDs, external request latency, status codes, retry counts, circuit breaker state, and business-level outcomes. Build dashboards for dependency failures and queues that back up when providers are down.
