# Concurrency

> Add new questions below in the same format: `## Question? <Badge ... />` then the answer.

## Threads vs processes vs asyncio? <Badge type="warning" text="medium" />

Threads: good for I/O-bound, limited by GIL for CPU. Processes: true parallelism for CPU-bound, higher overhead. `asyncio`: single-threaded cooperative concurrency for high-volume I/O.

```python
import asyncio

async def main():
    await asyncio.gather(task_a(), task_b())

asyncio.run(main())
```

## Explain async/await in Python <Badge type="danger" text="hard" />

`async def` defines a coroutine; `await` pauses it until an awaited coroutine completes, letting the event loop run other tasks meanwhile. It's single-threaded cooperative multitasking — great for I/O-bound work, no help for CPU-bound (GIL). `asyncio.gather()` runs coroutines concurrently.

```python
import asyncio

async def fetch():
    await asyncio.sleep(1)       # non-blocking I/O wait
    return {"data": 42}

async def main():
    results = await asyncio.gather(fetch(), fetch(), fetch())
    print(results)

asyncio.run(main())
```

## What are coroutines and how do they differ from threads? <Badge type="danger" text="hard" />

Coroutines are functions that can suspend and resume at `await` points, scheduled cooperatively by an event loop in a **single thread** — switching only where you yield control. Threads are OS-scheduled and can be preempted anytime, needing locks for shared state and limited by the GIL for CPU work. Coroutines are lighter weight and avoid most race conditions, ideal for high-volume I/O.

## How does Python handle multithreading? <Badge type="warning" text="medium" />

Via the `threading` module, but the GIL lets only one thread run Python bytecode at a time — so threads help **I/O-bound** work (one runs while others wait) but not CPU-bound work. Use `multiprocessing` for CPU parallelism.

```python
import threading
t = threading.Thread(target=worker)
t.start(); t.join()
```

## Difference between concurrency and parallelism? <Badge type="warning" text="medium" />

**Concurrency** = dealing with many tasks by interleaving progress (one core, switching). **Parallelism** = literally running tasks at the same time on multiple cores. `asyncio`/threads give concurrency; `multiprocessing` gives parallelism.

## What are asyncio tasks and events? <Badge type="danger" text="hard" />

A **Task** wraps a coroutine to run it concurrently on the event loop (`asyncio.create_task`). An **Event** (`asyncio.Event`) is a synchronization primitive coroutines can wait on until it's set.

```python
import asyncio

async def main():
    task = asyncio.create_task(worker())   # schedule concurrently
    await task

asyncio.run(main())
```

## Explain `Lock`, `RLock`, `Semaphore`, `Condition`, and `Event`. <Badge type="danger" text="hard" />

`threading` synchronization primitives:

- **`Lock`** — basic mutual exclusion; one thread holds it at a time.
- **`RLock`** — reentrant lock; the same thread can acquire it multiple times.
- **`Semaphore`** — allows up to N concurrent holders (limit a resource pool).
- **`Condition`** — wait/notify coordination between threads.
- **`Event`** — a simple flag threads can `wait()` on until it's `set()`.

```python
import threading
lock = threading.Lock()
with lock:           # acquire/release safely
    shared += 1
```

## What is multiprocessing? <Badge type="warning" text="medium" />

Running work in separate **processes**, each with its own Python interpreter and memory (and its own GIL) — so it achieves true CPU parallelism across cores. Use the `multiprocessing` module.

```python
from multiprocessing import Process
p = Process(target=work)
p.start(); p.join()
```

## How is multiprocessing different from multithreading (and when to use each)? <Badge type="warning" text="medium" />

Threads share memory in one process and are limited by the GIL → good for **I/O-bound** work. Processes have separate memory and bypass the GIL → good for **CPU-bound** work, at the cost of higher overhead and pricier data sharing.

## How do processes communicate in Python? <Badge type="danger" text="hard" />

Since processes don't share memory, use IPC: `multiprocessing.Queue`/`Pipe` for message passing, `Value`/`Array` or `shared_memory` for shared state, or a `Manager` for shared objects.

```python
from multiprocessing import Process, Queue
q = Queue()
Process(target=lambda: q.put(42)).start()
q.get()   # 42
```

## What is an event loop? <Badge type="warning" text="medium" />

The core of `asyncio` — a single-threaded scheduler that runs coroutines, pausing them at `await` points and resuming others while one waits on I/O. `asyncio.run()` starts and manages it.

