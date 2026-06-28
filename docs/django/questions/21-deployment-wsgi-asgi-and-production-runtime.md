# Deployment, WSGI/ASGI, and production runtime

## How is a Django application typically deployed?

Common deployments use Gunicorn or uWSGI for WSGI, Uvicorn/Daphne/Hypercorn for ASGI, behind Nginx, a load balancer, or a platform ingress. Static files, media, database, cache, and background workers are deployed as separate concerns.

## What is Gunicorn?

Gunicorn is a Python WSGI HTTP server commonly used to run Django in production. It manages worker processes and delegates HTTP handling behind a reverse proxy or platform load balancer.

## What is Uvicorn?

Uvicorn is an ASGI server used for async-capable Python applications. It can run Django ASGI applications and is common when async views or WebSockets are needed.

## Why should the Django development server not be used in production?

It is designed for development convenience, not production security, robustness, performance, or process management. Production requires a proper application server and reverse proxy or platform runtime.

## What is collectstatic?

collectstatic gathers static files from apps and configured directories into STATIC_ROOT for serving by a web server, CDN, WhiteNoise, or object storage pipeline.

## How should user-uploaded media be served in production?

Store media in durable storage such as object storage or a shared volume, serve through controlled URLs or CDN, validate access permissions when needed, and avoid routing large file delivery through Django unless authorization requires it.

## What are health checks for Django services?

Health checks are endpoints used by load balancers and orchestrators to determine whether an instance is alive and ready. Readiness may check database, cache, migrations, or critical dependencies, while liveness should be lightweight.

## How do you handle zero-downtime deployments?

Use rolling or blue-green deployments, backward-compatible migrations, readiness checks, graceful worker shutdown, versioned assets, and rollback plans. Avoid changes that require all instances to switch at exactly the same moment.

## What is graceful shutdown?

Graceful shutdown lets workers finish active requests or tasks before exiting. It prevents dropped requests, partial work, and inconsistent behavior during deployments or autoscaling.

## What would you include in a production runbook for Django?

Include deployment steps, rollback steps, migrations policy, environment variables, operational dashboards, alert definitions, common failure modes, task queue operations, database procedures, and escalation contacts.

## What is WhiteNoise, and how does it compare to serving static files via Nginx or a CDN? <Badge type="warning" text="medium" />

WhiteNoise is a Python middleware that allows the WSGI/ASGI app to serve its own static files efficiently. While Nginx is more performant for raw file serving, WhiteNoise simplifies deployments on PaaS (like Heroku) or containerized setups without requiring a separate web server layer. A CDN is still recommended in front of WhiteNoise to cache the files globally.

