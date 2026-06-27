# Deployment, Containers, and Production Operations

## How do you run a FastAPI app locally?

Use an ASGI server such as Uvicorn, for example `uvicorn app.main:app --reload`. The reload flag is for development only.

## How should FastAPI be run in production?

Run it with an ASGI server and appropriate worker configuration, often behind a reverse proxy or load balancer. Avoid development reload mode in production.

## What is the role of Gunicorn with Uvicorn workers?

Gunicorn can manage multiple worker processes while Uvicorn handles ASGI inside each worker. This is a common Linux production pattern, though direct Uvicorn can also be used.

## How many workers should you run?

It depends on CPU cores, memory, workload type, and external bottlenecks. Start with measured load tests rather than blindly applying formulas.

## Why use Docker for FastAPI?

Docker packages the application, dependencies, runtime, and startup command consistently. It helps CI/CD, deployment reproducibility, and Kubernetes environments.

## What should a good FastAPI Docker image include?

Use a slim base image, pin dependencies, install only needed packages, run as a non-root user, avoid secrets in layers, and define a clear command and health checks.

## What is a readiness probe?

A readiness probe tells orchestrators whether the service can receive traffic. It should check critical startup state and sometimes required dependencies.

## What is a liveness probe?

A liveness probe tells the orchestrator whether the process is alive and should be restarted. It should be lightweight and not fail due to temporary downstream outages.

## Why separate readiness and liveness?

If a database is temporarily down, the app may be alive but not ready. Restarting every instance during a dependency outage can make recovery worse.

## How do you manage configuration in production?

Use environment variables, secret managers, and typed settings models. Separate config from code and validate required settings at startup.

## What is twelve-factor app methodology?

It is a set of practices for cloud-native applications, including config via environment, stateless processes, logs as streams, and disposability. FastAPI services often follow these principles.

## How do you deploy FastAPI on Kubernetes?

Package it in a container, define deployments/services, configure probes, resource requests/limits, secrets, config maps, horizontal scaling, and ingress or gateway routing.

## How do you handle graceful shutdown in Kubernetes?

Use lifespan shutdown hooks, close connections, stop accepting traffic before termination, and set termination grace periods. This prevents dropped requests and resource leaks.

## What is horizontal scaling?

Horizontal scaling means running more instances of the service. Stateless FastAPI APIs scale horizontally more easily than stateful services.

## What state should not be kept only in process memory?

Sessions, critical jobs, rate-limit counters, distributed locks, and shared cache state should use external systems. In-process state is not shared across workers or pods.

## What is blue-green deployment?

Blue-green deployment runs two production environments and switches traffic from old to new after validation. It reduces downtime and supports quick rollback.

## What is canary deployment?

Canary deployment gradually sends a small percentage of traffic to a new version. It helps detect issues before full rollout.

## How do you handle database migrations during deployment?

Run migrations as controlled release steps, not randomly inside every app worker. Use backward-compatible migrations for zero-downtime deployment.

## What production risks are common with FastAPI?

Common risks include blocking async endpoints, poor database pool sizing, missing timeouts, no structured logs, weak auth, and treating background tasks as durable jobs.

## What deployment answer impresses German enterprise companies?

Talk about reproducible builds, security scanning, non-root containers, audit trails, GDPR-aware logging, readiness/liveness probes, rollback strategy, and infrastructure-as-code.
