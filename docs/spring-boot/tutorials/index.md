# Spring Boot Tutorials

Long-form, example-driven tutorials with diagrams. Each one teaches a topic from the
ground up — mental model, runnable Spring Boot 3.x code, mermaid flowcharts, common
pitfalls, and best practices — and pairs with the matching
[interview questions](../questions/) set for drilling afterward.

## Foundations

- [Fundamentals & Architecture](./fundamentals-and-architecture) — auto-configuration, starters, the context, startup lifecycle
- [IoC & Dependency Injection](./ioc-and-dependency-injection) — beans, scopes, lifecycle, constructor injection
- [Configuration & Profiles](./configuration-and-profiles) — properties/YAML, `@ConfigurationProperties`, profiles, precedence
- [Aspect-Oriented Programming](./aop) — proxies, advice, pointcuts, the self-invocation pitfall

## Web & APIs

- [Spring MVC & REST](./spring-mvc-and-rest) — DispatcherServlet, controllers, DTOs, content negotiation
- [Validation & Error Handling](./validation-and-error-handling) — Bean Validation, `@ControllerAdvice`, `ProblemDetail`
- [WebFlux & Reactive](./spring-webflux-reactive) — Reactor, Mono/Flux, backpressure, R2DBC, when (not) to use it
- [Security & OAuth2](./spring-security-and-oauth2) — filter chain, JWT, method security, OAuth2/OIDC

## Data & Persistence

- [Spring Data JPA & Hibernate](./spring-data-jpa-and-hibernate) — entities, relationships, the N+1 problem, projections
- [Transactions & Connection Pooling](./transactions-and-connection-pooling) — propagation, isolation, HikariCP
- [Caching & Performance](./caching-and-performance) — cache abstraction, Caffeine/Redis, finding bottlenecks

## Concurrency & Messaging

- [Async & Scheduling](./async-and-scheduling) — `@Async`, thread pools, `@Scheduled`, virtual threads, events
- [Messaging — Kafka & RabbitMQ](./messaging-kafka-and-rabbitmq) — producers/consumers, DLQ, outbox, delivery semantics

## Testing & Quality

- [Testing](./testing) — JUnit 5, Mockito, slices, Testcontainers, MockMvc/WebTestClient

## Distributed Systems & Operations

- [Microservices & Spring Cloud](./microservices-and-spring-cloud) — discovery, gateway, config, Resilience4j, sagas
- [Actuator, Observability & Logging](./actuator-observability-and-logging) — health, Micrometer, tracing, structured logs
- [Docker, Kubernetes & Deployment](./docker-kubernetes-and-deployment) — images, buildpacks, probes, graceful shutdown
- [Advanced System Design](./advanced-system-design) — hexagonal/DDD, idempotency, outbox, resilience, scaling
