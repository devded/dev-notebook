# System Design & Scalability

> Add new questions below in the same format: `## Question? <Badge ... />` then the answer.

## What factors matter when designing a backend service? <Badge type="warning" text="medium" />

::: details View Answer
Scalability, reliability/availability, data model & consistency needs, latency/throughput, security, observability, cost, and maintainability. Clarify requirements and expected load first, then choose architecture, storage, caching, and communication patterns to fit.
:::

## How would you design a URL shortener (like Bitly)? <Badge type="danger" text="hard" />

::: details View Answer
Generate a short unique key per URL (base62 of an auto-increment ID, or a hash), store `key → long_url` in a fast key-value store / indexed DB, and redirect (301/302) on lookup. Add caching (Redis) for hot links, rate limiting, analytics, and key collision handling. Reads vastly outnumber writes → optimize for read scaling and caching.
:::

## How would you design a simple chat application? <Badge type="danger" text="hard" />

::: details View Answer
Use **WebSockets** for real-time bidirectional messaging, a message broker (Redis pub/sub / Kafka) to fan out across server instances, a DB for message history, and presence tracking. Consider delivery guarantees, ordering, offline storage, and horizontal scaling of the WebSocket layer.
:::

## Horizontal vs vertical scaling? <Badge type="danger" text="hard" />

::: details View Answer
**Vertical** = bigger machine (more CPU/RAM) — simple but capped and a single point of failure. **Horizontal** = more machines behind a load balancer — near-limitless and fault-tolerant, but needs statelessness and distributed-system handling. Modern systems favor horizontal.
:::

## What is load balancing and why does it matter? <Badge type="danger" text="hard" />

::: details View Answer
Distributing incoming traffic across multiple servers to improve throughput, avoid overload, and provide failover. Strategies: round-robin, least-connections, IP-hash. Tools: Nginx, HAProxy, cloud load balancers. Requires stateless services or shared session storage.
:::

## What challenges arise in distributed systems? <Badge type="danger" text="hard" />

::: details View Answer
Network partitions/failures, partial failure, consistency vs availability trade-offs (CAP), clock skew, message ordering/duplication, distributed transactions, and observability. Design for failure: retries, idempotency, timeouts, circuit breakers.
:::

## Eventual vs strong consistency? <Badge type="danger" text="hard" />

::: details View Answer
**Strong:** every read returns the latest write — simpler reasoning, lower availability/higher latency. **Eventual:** replicas converge over time; reads may be stale briefly — higher availability/scalability. Choose per use case (banking → strong; social feed → eventual).
:::

## Why is caching important? <Badge type="warning" text="medium" />

::: details View Answer
It stores frequently accessed data closer/faster (memory) to cut latency, database load, and cost. Trade-off: cache invalidation and potential staleness. Layers: client, CDN, application, database.
:::

## When would you use Redis? <Badge type="warning" text="medium" />

::: details View Answer
An in-memory key-value store for caching, session storage, rate limiting, leaderboards, pub/sub, and queues — when you need very low latency and can tolerate memory-bound data (with optional persistence).
:::

## What cache eviction strategies are common? <Badge type="danger" text="hard" />

::: details View Answer
- **LRU** — evict least recently used (most common).
- **LFU** — evict least frequently used.
- **FIFO** — evict oldest inserted.
- **TTL** — expire after a time limit.
:::

## What is a message queue? <Badge type="warning" text="medium" />

::: details View Answer
A broker that decouples producers from consumers by buffering messages, enabling async processing, load leveling, and resilience (work survives consumer downtime). Examples: RabbitMQ, Kafka, SQS.
:::

## When would you use RabbitMQ, Kafka, or Redis Streams? <Badge type="danger" text="hard" />

::: details View Answer
- **RabbitMQ** — traditional task/message broker with flexible routing; great for job queues and RPC.
- **Kafka** — high-throughput, durable, replayable event streaming/log; great for event sourcing, analytics, pipelines.
- **Redis Streams** — lightweight streaming when you already use Redis and want low latency without Kafka's overhead.
:::