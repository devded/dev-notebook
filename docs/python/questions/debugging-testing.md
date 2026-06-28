# Debugging & Testing

> Add new questions below in the same format: `## Question? <Badge ... />` then the answer.

## How do you debug a Python program? <Badge type="tip" text="easy" />

::: details View Answer
Options range from `print()`/logging, to the built-in debugger `pdb` (`breakpoint()` in 3.7+), to IDE debuggers (VS Code, PyCharm) with breakpoints, step-through, and variable inspection. Read the traceback first — it usually points straight to the failure.
:::

## What are popular debugging tools? <Badge type="tip" text="easy" />

::: details View Answer
`pdb`/`ipdb` (interactive debuggers), IDE debuggers, `logging`, `traceback`, `faulthandler`, and profilers like `cProfile`/`py-spy` for performance issues.
:::

## What is a breakpoint and how do you use it? <Badge type="tip" text="easy" />

::: details View Answer
A breakpoint pauses execution so you can inspect state. Since Python 3.7, call `breakpoint()` to drop into `pdb`; then use `n` (next), `s` (step), `c` (continue), `p var` (print).

```python
def buggy(x):
    breakpoint()        # drops into pdb here
    return x / 0
```
:::

## What is unit testing? <Badge type="warning" text="medium" />

::: details View Answer
Testing individual units (functions/methods) in isolation to verify each behaves correctly, catching regressions early. Python ships with `unittest`; `pytest` is the popular third-party choice.
:::

## How do you write a basic test with `unittest`? <Badge type="warning" text="medium" />

::: details View Answer
Subclass `unittest.TestCase`, write `test_*` methods, and use `assert*` helpers.

```python
import unittest

class TestAdd(unittest.TestCase):
    def test_add(self):
        self.assertEqual(add(2, 3), 5)

if __name__ == "__main__":
    unittest.main()
```
:::

## What is pytest and how is it used? <Badge type="warning" text="medium" />

::: details View Answer
A lightweight testing framework using plain `assert`, fixtures, and parametrization — less boilerplate than `unittest`. Run with `pytest`.

```python
import pytest

@pytest.mark.parametrize("a,b,expected", [(2, 3, 5), (0, 0, 0)])
def test_add(a, b, expected):
    assert add(a, b) == expected
```
:::

## How do you test a function with side effects? <Badge type="warning" text="medium" />

::: details View Answer
Isolate the side effect with `unittest.mock` — patch the external dependency (network, DB, time) and assert on calls or return a fake value.

```python
from unittest.mock import patch

@patch("mymodule.requests.get")
def test_fetch(mock_get):
    mock_get.return_value.json.return_value = {"ok": True}
    assert fetch()["ok"]
```
:::

## How do you log messages? <Badge type="tip" text="easy" />

::: details View Answer
Use the `logging` module instead of `print` — it supports levels, formatting, and routing to files/handlers.

```python
import logging
logging.basicConfig(level=logging.INFO)
log = logging.getLogger(__name__)
log.info("started")
log.error("something failed")
```
:::

## How do you use assertions? <Badge type="tip" text="easy" />

::: details View Answer
`assert condition, message` raises `AssertionError` if the condition is false — good for sanity checks and tests. Note assertions are stripped when Python runs with `-O`, so don't use them for production validation.

```python
def average(nums):
    assert nums, "list must not be empty"
    return sum(nums) / len(nums)
```
:::

## What is a traceback and how do you analyze it? <Badge type="tip" text="easy" />

::: details View Answer
A traceback is the call stack printed when an unhandled exception occurs. Read it **bottom-up**: the last line is the exception type/message; the frames above show the call chain and exact line numbers leading to it.
:::

## What profiling tools does Python have? <Badge type="warning" text="medium" />

::: details View Answer
`cProfile` (function-level CPU profiling), `timeit` (micro-benchmarks), `line_profiler` (per-line timing), `py-spy` (sampling profiler, no code changes), and `memory_profiler`/`tracemalloc` for memory. Profile before optimizing.

```python
import cProfile
cProfile.run("expensive()")

import timeit
timeit.timeit("sum(range(100))", number=10000)
```
:::

## How do you measure memory usage? <Badge type="warning" text="medium" />

::: details View Answer
`sys.getsizeof()` for a single object, `tracemalloc` (stdlib) to snapshot allocations, or `memory_profiler` for line-by-line usage.

```python
import sys, tracemalloc
sys.getsizeof([1, 2, 3])        # bytes

tracemalloc.start()
# ... run code ...
print(tracemalloc.get_traced_memory())   # (current, peak)
```
:::

## What are the common `pdb` commands? <Badge type="tip" text="easy" />

::: details View Answer
Start with `python -m pdb script.py` (or `breakpoint()`), then:

| Command | Action |
| --- | --- |
| `b` | set breakpoint |
| `c` | continue |
| `n` | next line (step over) |
| `s` | step into |
| `l` | list source |
| `p expr` | print expression |
| `q` | quit |
:::

## How do you monitor a program's code flow? <Badge type="danger" text="hard" />

::: details View Answer
`sys.settrace()` installs a trace hook called on events like function calls — useful for tracing/profiling/coverage tools.

```python
import sys

def tracer(frame, event, arg):
    if event == "call":
        print("call:", frame.f_code.co_name)
    return tracer

sys.settrace(tracer)
# ... run code ...
sys.settrace(None)   # disable
```
:::

## What are the logging levels? <Badge type="tip" text="easy" />

::: details View Answer
In increasing severity: `DEBUG` < `INFO` < `WARNING` < `ERROR` < `CRITICAL`. The configured level filters out anything below it (default is `WARNING`).

```python
import logging
logging.basicConfig(level=logging.DEBUG)
logging.debug("details"); logging.warning("heads up"); logging.error("failed")
```
:::

## What's the difference between `unittest` and `pytest`? <Badge type="warning" text="medium" />

::: details View Answer
`unittest` is the stdlib, class-based (`TestCase`) framework with `assertEqual`-style methods. `pytest` is third-party, uses plain `assert`, has powerful fixtures and parametrization, less boilerplate, and runs `unittest` tests too — the common modern choice.
:::

## What is a test fixture? <Badge type="warning" text="medium" />

::: details View Answer
Reusable setup (and teardown) that puts the system into a known state before a test — e.g. a temp DB, sample data, or a client. In `pytest`, fixtures are functions injected by name.

```python
import pytest

@pytest.fixture
def sample():
    return {"id": 1, "name": "Sam"}

def test_name(sample):       # fixture injected
    assert sample["name"] == "Sam"
```
:::

## Unit vs integration vs functional vs end-to-end tests? <Badge type="danger" text="hard" />

::: details View Answer
- **Unit** — one function/class in isolation (dependencies mocked); fast, many.
- **Integration** — several components together (e.g. code + real DB).
- **Functional** — a feature against requirements, via its interface.
- **End-to-end** — the whole system as a user would, through the UI/API; slow, few.

(The "test pyramid": lots of unit tests, fewer integration, fewest E2E.)
:::