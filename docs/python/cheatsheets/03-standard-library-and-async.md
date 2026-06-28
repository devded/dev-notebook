# Python: Standard Library and Asyncio

## Standard Library Essentials

### `collections`
| Data Structure | Description | Example |
| :--- | :--- | :--- |
| `defaultdict` | Dict with default factory for missing keys. | `d = defaultdict(int); d['k'] += 1` |
| `Counter` | Dict subclass for counting hashable objects. | `c = Counter(['a', 'a', 'b']); c['a'] # 2` |
| `deque` | Double-ended queue, fast append/pop from both ends. | `q = deque([1, 2]); q.appendleft(0)` |
| `namedtuple` | Tuple subclass with named fields. | `Point = namedtuple('Point', ['x', 'y'])` |

### `itertools`
| Function | Description | Example |
| :--- | :--- | :--- |
| `count(start, step)` | Infinite iterator, starts at `start`. | `count(10)` &rarr; 10, 11, 12, ... |
| `cycle(iterable)` | Infinite iterator, cycles through items. | `cycle('AB')` &rarr; A, B, A, B, ... |
| `chain(*iterables)` | Combines multiple iterables into one. | `chain([1], [2, 3])` &rarr; 1, 2, 3 |
| `combinations(p, r)` | `r`-length tuples in sorted order, no repeated elements. | `combinations('AB', 2)` &rarr; ('A', 'B') |
| `groupby(iterable, key)`| Group adjacent items sharing the same key. | `groupby(['a1', 'a2', 'b1'], lambda x: x[0])` |

### `functools`
| Function/Decorator | Description |
| :--- | :--- |
| `@lru_cache(maxsize)` | Memoizes function results. Use `maxsize=None` for unbounded cache. |
| `@cache` | Python 3.9+ equivalent to `@lru_cache(maxsize=None)`. |
| `partial(func, *args, **kw)` | Returns a new function with partial application of arguments. |
| `reduce(func, iterable)` | Applies `func` cumulatively to items, reducing iterable to a single value. |

### System & File I/O (`os`, `sys`, `pathlib`)
*   **`pathlib.Path`:** Object-oriented filesystem paths.
    *   `Path('dir') / 'file.txt'` (Join paths)
    *   `p.exists()`, `p.is_file()`, `p.is_dir()`
    *   `p.read_text()`, `p.write_text('data')`
    *   `p.rglob('*.py')` (Recursive globbing)
*   **`os`:** `os.environ` (dict of env vars), `os.getenv('KEY')`.
*   **`sys`:** `sys.argv` (CLI args), `sys.exit(code)`.

### Data Formats & Serialization
*   **`json`:** `json.dumps(obj)`, `json.loads(str)`, `json.dump(obj, file)`, `json.load(file)`.
*   **`csv`:** `csv.reader(file)`, `csv.DictReader(file)`, `csv.writer(file)`.
*   **`pickle`:** Python-specific object serialization. `pickle.dumps(obj)`, `pickle.loads(bytes)`.
*   **`dataclasses` (3.7+):** `@dataclass` decorator for data-holding classes. Auto-generates `__init__`, `__repr__`, `__eq__`.

## Asyncio Quick Reference

### Core Concepts
*   **Coroutine:** Function defined with `async def`. Must be `await`ed or run in an event loop.
*   **Event Loop:** Manages and distributes execution of asynchronous tasks.
*   **Task:** Wraps a coroutine, scheduling it to run concurrently in the event loop.
*   **Future:** Low-level awaitable representing eventual result of an async operation.

### Running Async Code
```python
import asyncio

async def main():
    await asyncio.sleep(1)
    return "Done"

# Entry point for async programs (Python 3.7+)
if __name__ == "__main__":
    result = asyncio.run(main()) 
```

### Awaitables and Concurrency
| Function/Syntax | Purpose | Example |
| :--- | :--- | :--- |
| `await obj` | Suspend execution until awaitable `obj` completes. | `data = await fetch_data()` |
| `asyncio.create_task(coro)` | Schedule a coroutine to run concurrently; returns a Task. | `task = asyncio.create_task(my_coro())` |
| `asyncio.gather(*aws)` | Run awaitables concurrently. Returns a list of results. | `res = await asyncio.gather(t1, t2)` |
| `asyncio.wait(aws)` | Wait for awaitables with a specified condition (e.g., `FIRST_COMPLETED`). | `done, pending = await asyncio.wait(tasks)` |
| `asyncio.to_thread(func)` | Run blocking synchronous function in a separate thread. (Python 3.9+) | `await asyncio.to_thread(time.sleep, 1)` |

### Synchronization Primitives
*   **`asyncio.Lock()`:** Guarantee exclusive access to a shared resource.
    ```python
    async with lock:
        # access shared state
    ```
*   **`asyncio.Semaphore(value)`:** Limit number of concurrent accesses.
*   **`asyncio.Event()`:** Notify multiple coroutines that an event has happened (`set()`, `wait()`).
*   **`asyncio.Queue()`:** FIFO queue for coordinating work between coroutines (`put()`, `get()`, `task_done()`).

### Context Managers and Iterators
*   **`async with`:** Asynchronous context manager (requires `__aenter__`, `__aexit__`).
*   **`async for`:** Asynchronous iterator (requires `__aiter__`, `__anext__`).

### Common Pitfalls
1.  **Blocking the Loop:** Do not use `time.sleep()`, `requests.get()`, or heavy CPU-bound code in an `async def`. Use `asyncio.sleep()`, `aiohttp`, or `asyncio.to_thread()`.
2.  **Forgetting `await`:** Calling `coroutine()` without `await` returns a coroutine object but does not execute it.
3.  **Mixing Sync and Async:** Be careful not to call async functions directly from sync code without `asyncio.run()` or a running loop.
