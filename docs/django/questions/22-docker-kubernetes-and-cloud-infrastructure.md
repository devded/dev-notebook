# Docker, Kubernetes, and cloud infrastructure

## How would you containerize a Django app?

Use a minimal Python base image, install pinned dependencies, copy application code, run as a non-root user, configure environment variables, expose the app server command, and separate web, worker, scheduler, and migration jobs.

## What should not be baked into a Docker image?

Do not bake secrets, environment-specific settings, local databases, private credentials, or generated runtime state into the image. Images should be portable and configured at runtime.

## How do migrations run in Kubernetes deployments?

Use a controlled migration job, release pipeline step, or init process with locking. Avoid every application pod trying to run migrations independently unless there is a safe coordination mechanism.

## How do you manage static files in containerized Django deployments?

Either collect static during image build or release, then serve through WhiteNoise, Nginx, CDN, or object storage. Keep the approach consistent so asset versions match deployed code.

## What are Kubernetes readiness and liveness probes?

Readiness probes decide whether a pod should receive traffic. Liveness probes decide whether a pod should be restarted. Django readiness may include dependency checks, while liveness should avoid expensive checks that cause restart loops.

## How do you scale Django horizontally?

Run multiple stateless web instances behind a load balancer, externalize sessions if needed, use shared database/cache/storage, scale workers separately, and ensure background jobs and scheduled tasks are coordinated.

## What breaks stateless scaling in Django?

Local file storage, local memory sessions, in-process caches, singleton assumptions, local task queues, and per-instance scheduled jobs can break horizontal scaling. Move shared state to external services.

## How would you configure secrets in cloud deployments?

Use managed secret stores, IAM-based access, rotation policies, audit logs, and least privilege. Inject secrets at runtime and avoid printing them in logs or exposing them in error pages.

## What cloud services are commonly paired with Django?

Common services include managed PostgreSQL, Redis, object storage, CDN, container orchestration, secret management, monitoring, log aggregation, message queues, and email delivery services.

## What infrastructure topics might German enterprise interviews include?

Expect questions about EU regions, data residency, IAM, audit logs, encryption, incident response, disaster recovery, Kubernetes operations, Terraform, and compliance-friendly deployment practices.
