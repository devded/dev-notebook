# Cloud & Monitoring

> Add new questions below in the same format: `## Question? <Badge ... />` then the answer.

## What cloud services have you used (AWS/Azure/GCP)? <Badge type="warning" text="medium" />

::: details View Answer
Frame your real experience around common categories: **compute** (EC2/Lambda, Azure Functions, Cloud Run), **storage** (S3, Blob, GCS), **databases** (RDS, DynamoDB, Cloud SQL), **networking** (load balancers, VPC), **containers** (ECS/EKS, AKS, GKE), and **messaging** (SQS/SNS, Pub/Sub). Name what you actually built and why.
:::

## How would you deploy a Python web app to the cloud? <Badge type="danger" text="hard" />

::: details View Answer
Containerize with Docker, run behind a WSGI/ASGI server (Gunicorn/Uvicorn) and a reverse proxy/load balancer. Deploy to a managed platform (Cloud Run, ECS/Fargate, App Service, or Kubernetes), store secrets in a secret manager, use a managed DB, and automate build/test/deploy via CI/CD. Add autoscaling, health checks, and logging/monitoring.
:::

## Why is monitoring important in production? <Badge type="warning" text="medium" />

::: details View Answer
It gives visibility into health and performance, surfaces issues before users do, enables alerting, helps diagnose incidents, and informs capacity planning. Covers metrics, logs, and traces (the "three pillars" of observability).
:::

## What metrics would you monitor for a Python API? <Badge type="danger" text="hard" />

::: details View Answer
The "four golden signals": **latency** (response times, p95/p99), **traffic** (requests/sec), **errors** (4xx/5xx rate), and **saturation** (CPU, memory, DB connections). Plus business metrics and queue depth/worker health where relevant.
:::

## What are Prometheus and Grafana, and how do they work together? <Badge type="danger" text="hard" />

::: details View Answer
**Prometheus** is a time-series database that scrapes and stores metrics from your services (via a `/metrics` endpoint) and supports alerting. **Grafana** is a visualization tool that queries Prometheus (and other sources) to build dashboards and alerts. Together: Prometheus collects, Grafana displays.
:::