# Async Python, Concurrency, and Performance

## What is the difference between concurrency and parallelism?

Concurrency means handling multiple tasks by interleaving progress, often during I/O waits. Parallelism means executing tasks at the same time on multiple CPU cores.

## When should you use `async def` in FastAPI endpoints?

Use `async def` when the endpoint awaits non-blocking I/O such as async database drivers, HTTP clients, queues, or caches. It allows the event loop to serve other requests while waiting.

## When is normal `def` acceptable in FastAPI?

Use normal `def` for CPU-light synchronous code or when using blocking libraries that FastAPI can run in a threadpool. However, heavy blocking work should be moved out of the request path.

## What happens if you call blocking I/O inside an `async def` endpoint?

It can block the event loop and reduce concurrency for all requests handled by that worker. Use async libraries, run blocking code in a threadpool, or offload to background workers.

## What is the event loop?

The event loop schedules async tasks and resumes them when awaited I/O completes. Blocking the event loop is one of the most common async performance bugs.

## What is an awaitable?

An awaitable is an object that can be used with `await`, such as a coroutine or task. Awaiting it allows other work to run while waiting for completion.

## How does FastAPI handle sync endpoints?

FastAPI can run synchronous path operation functions in a threadpool so they do not block the event loop directly. This is useful for compatibility with sync libraries.

## What is the GIL, and does async solve CPU-bound problems?

The Global Interpreter Lock limits execution of Python bytecode in multiple threads. Async improves I/O concurrency but does not make CPU-bound Python code faster; use multiprocessing, native extensions, or external workers.

## How would you handle CPU-heavy work in FastAPI?

Offload it to a task queue, worker process, multiprocessing pool, or specialized compute service. The API should return quickly and provide job status if the work is long-running.

## How would you handle long-running requests?

Prefer asynchronous job submission with a 202 response, background processing, and status endpoints. For streaming progress, use WebSockets or server-sent events when appropriate.

## What is connection pooling?

Connection pooling reuses database or HTTP connections instead of opening a new one for every request. It reduces latency and protects downstream systems from connection storms.

## How do you improve FastAPI latency?

Profile first. Common improvements include async I/O, efficient DB queries, connection pooling, caching, response compression where appropriate, smaller payloads, and avoiding blocking calls.

## How do you improve FastAPI throughput?

Use multiple worker processes, tune database pools, reduce per-request overhead, cache expensive reads, avoid synchronous bottlenecks, and scale horizontally behind a load balancer.

## What is the difference between Uvicorn workers and async concurrency?

Async concurrency happens inside a worker process. Multiple workers create multiple processes, allowing better CPU utilization and isolation.

## Why should you be careful with global mutable state?

Global mutable state can behave unpredictably across multiple workers and concurrent requests. Use databases, caches, queues, or carefully protected in-process state.

## What is backpressure in API systems?

Backpressure means slowing or rejecting requests when downstream systems are overloaded. Techniques include rate limits, queues, timeouts, circuit breakers, and 429/503 responses.

## How do timeouts improve reliability?

Timeouts prevent requests from hanging indefinitely and consuming resources. They should be applied to database calls, outbound HTTP calls, queues, and client-facing operations.

## How do you avoid N+1 query problems in FastAPI APIs?

Use eager loading, joins, batch queries, or data loaders depending on the ORM and query pattern. Serialization should not trigger hidden database calls per item.

## What is profiling, and why is it important?

Profiling measures where time or memory is actually spent. Senior interviewers expect evidence-based optimization rather than guessing.

## What performance answer impresses enterprise interviewers?

Explain that FastAPI itself is rarely the only bottleneck; databases, network calls, serialization, and deployment topology usually dominate. Then describe measurement, tracing, load testing, and targeted optimization.
