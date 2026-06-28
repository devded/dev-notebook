# Staff and Lead Engineer Scenarios

## What is PgBouncer, and why do you eventually need it when scaling Django applications? <Badge type="danger" text="hard" />

::: details View Answer
Django opens a new database connection (or uses a thread-local pool if `CONN_MAX_AGE` is set) per worker. At scale, dozens of containers can easily exhaust PostgreSQL's max connections limit. PgBouncer is a lightweight transaction pooler that multiplexes thousands of client connections onto a small number of real database connections, solving this bottleneck.
:::

## How do you configure database read replicas, and how do you route read vs. write queries in Django? <Badge type="danger" text="hard" />

::: details View Answer
You configure multiple databases in the `DATABASES` setting. Then you create a Database Router class with `db_for_read()` returning the replica and `db_for_write()` returning the primary database. You add the router to `DATABASE_ROUTERS`. You must also account for replication lag when reading data immediately after a write.
:::

## How do you prevent Server-Side Request Forgery (SSRF) when your Django app needs to fetch data from user-provided URLs? <Badge type="danger" text="hard" />

::: details View Answer
SSRF occurs when an attacker tricks the server into making HTTP requests to internal networks (e.g., AWS metadata endpoint `169.254.169.254` or internal services). Prevention requires validating the URL, resolving the domain to an IP before requesting, blocking private IP ranges, and disabling HTTP redirects on the client library.
:::

## How do you handle distributed tracing (e.g., OpenTelemetry, Jaeger) across a Django app and other microservices? <Badge type="danger" text="hard" />

::: details View Answer
Distributed tracing tracks a single request across multiple services. You implement it by using middleware (like OpenTelemetry instrumentation) that extracts a correlation ID (like `traceparent`) from incoming HTTP headers, attaches it to the current context, injects it into structured logs, and propagates it in headers when making outgoing API calls to other services.
:::

## How do you architect secure, direct-to-S3 file uploads to bypass the Django server? <Badge type="danger" text="hard" />

::: details View Answer
You create a Django API endpoint that receives a file name/type and uses `boto3` to generate an S3 Pre-signed URL. The frontend then uploads the file directly to S3 via a `PUT` request to that URL. Finally, the frontend notifies Django that the upload succeeded, and Django saves the S3 file path to the database. This prevents large files from blocking Django workers.
:::