# Language & Tooling

> Add new questions below in the same format: `## Question? <Badge ... />` then the answer.

## Why is Python called an interpreted language? <Badge type="tip" text="easy" />

::: details View Answer
You don't compile Python before running it — the interpreter executes it. The nuance: Python first compiles source to **bytecode** (`.pyc`), then the Python Virtual Machine (PVM) interprets that bytecode. This happens automatically. Pros: fast dev cycle, REPL, cross-platform. Cons: slower than fully compiled languages, must ship the interpreter.
:::

## What does PEP 8 say about indentation? <Badge type="tip" text="easy" />

::: details View Answer
PEP 8 is Python's official style guide. For indentation: **4 spaces per level**, spaces over tabs, never mix the two. It also suggests keeping lines under 79 characters. Tools like Black, Flake8, and pylint enforce/auto-format these rules.

```python
def function():
    if condition:
        do_something()   # 4 spaces per level
```
:::

## What's the difference between `.py` and `.pyc` files? <Badge type="warning" text="medium" />

::: details View Answer
`.py` is human-readable source you write. `.pyc` is the compiled bytecode Python generates (in `__pycache__/`) to speed up imports. On import, if the source is unchanged Python loads the cached `.pyc` and skips recompiling. They're binary, version-specific but cross-platform, auto-regenerated, and should **not** be committed to version control.
:::

## Why store API keys in environment variables, and how do you access them? <Badge type="warning" text="medium" />

::: details View Answer
Hardcoding secrets is risky — they leak through version control and can't vary per environment. Store them in env vars and read them via `os`. In development, `python-dotenv` can load a `.env` file (kept out of git).

```python
import os

api_key = os.getenv("API_KEY", "development-key")  # fallback
if api_key is None:
    raise RuntimeError("API_KEY not set!")
```
:::

## What is pickling, and how do you customize serialization? <Badge type="danger" text="hard" />

::: details View Answer
Pickling serializes Python objects to a byte stream (`pickle.dump`/`load`, or `dumps`/`loads` in memory) to persist or transfer them. Customize with `__getstate__` (what to pickle) and `__setstate__` (how to restore). ⚠️ Never unpickle untrusted data — it can execute arbitrary code; prefer JSON or Protocol Buffers across trust boundaries.

```python
import pickle

with open("data.pkl", "wb") as f:
    pickle.dump({"a": 1}, f)

class Cache:
    def __getstate__(self):
        state = self.__dict__.copy()
        state.pop("_cache", None)   # skip transient field
        return state
    def __setstate__(self, state):
        self.__dict__.update(state)
        self._cache = {}
```
:::

## How would you optimize the performance of a Python app? <Badge type="warning" text="medium" />

::: details View Answer
Profile first (`cProfile`, `timeit`) to find real bottlenecks. Then: pick better algorithms/data structures, use built-ins and comprehensions, cache with `functools.lru_cache`, vectorize with NumPy, move CPU-bound work to `multiprocessing` or C extensions, and use generators to cut memory pressure.

```python
from functools import lru_cache

@lru_cache(maxsize=None)
def fib(n):
    return n if n < 2 else fib(n-1) + fib(n-2)
```
:::

## How can you optimize memory usage? <Badge type="warning" text="medium" />

::: details View Answer
Use generators/iterators instead of building big lists, `__slots__` to avoid per-instance `__dict__`, `array`/NumPy for homogeneous numbers, process files in chunks, and delete large unused objects (`del`) so they can be collected.

```python
class Point:
    __slots__ = ("x", "y")     # no per-instance __dict__
    def __init__(self, x, y):
        self.x, self.y = x, y
```
:::

## What is monkey patching? <Badge type="danger" text="hard" />

::: details View Answer
Dynamically changing a class or module at runtime — replacing/adding methods or attributes after definition. Useful for testing (stubbing) or hotfixing third-party code, but risky: it makes behavior hard to trace, so use sparingly.

```python
import some_module
some_module.api_call = lambda *a, **k: {"mocked": True}  # patch for a test
```
:::

## What is `weakref` and when would you use it? <Badge type="danger" text="hard" />

::: details View Answer
A weak reference points to an object **without** increasing its reference count, so it doesn't prevent garbage collection. Useful for caches and observer patterns where you don't want the reference itself to keep objects alive.

```python
import weakref

class Node: pass
n = Node()
ref = weakref.ref(n)
ref()        # the object (or None once n is collected)
del n
ref()        # None
```
:::

## What is bytecode and the Python Virtual Machine (PVM)? <Badge type="warning" text="medium" />

::: details View Answer
When you run a `.py` file, CPython first **compiles** the source to platform-independent **bytecode** (cached in `.pyc` under `__pycache__`). The **PVM** is the interpreter loop that executes that bytecode instruction by instruction. This compile-then-interpret pipeline is why Python is "interpreted" yet has a compile step.

```python
import dis
def add(a, b): return a + b
dis.dis(add)     # shows the bytecode instructions
```
:::

## What is reference counting? <Badge type="warning" text="medium" />

::: details View Answer
CPython's primary memory management: every object tracks how many references point to it. When the count drops to zero, the object is freed immediately.

```python
import sys
a = []
sys.getrefcount(a)   # count (includes the temporary arg ref)
b = a                # count goes up
del b                # count goes down
```
:::

## Why is a garbage collector needed if Python has reference counting? <Badge type="danger" text="hard" />

::: details View Answer
Reference counting can't reclaim **reference cycles** — objects that reference each other keep each other's count above zero even when unreachable, leaking memory. The cyclic **garbage collector** (`gc` module) detects and frees these cycles.

```python
a = {}; b = {}
a["b"] = b; b["a"] = a   # cycle — refcount never hits 0
import gc; gc.collect()  # the cyclic GC reclaims it
```
:::