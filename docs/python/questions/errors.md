# Errors & Exceptions

> Add new questions below in the same format: `## Question? <Badge ... />` then the answer.

## What's the best way to handle exceptions? <Badge type="warning" text="medium" />

Use `try`/`except` and catch **specific** exceptions rather than a bare `except`. The full structure is `try` → `except` (per error type) → `else` (runs if no error) → `finally` (always runs, ideal for cleanup). Reserve exceptions for exceptional cases, not normal flow control.

```python
def divide(a, b):
    try:
        result = a / b
    except ZeroDivisionError:
        print("Can't divide by zero!")
        return None
    except TypeError as e:
        print(f"Type error: {e}")
        return None
    else:
        return result          # only if no exception
    finally:
        print("Finishing up…")  # always runs
```

## When and how should you use context managers? <Badge type="warning" text="medium" />

Context managers handle resource setup and cleanup automatically via the `with` statement, implementing `__enter__` and `__exit__`. Cleaner than `try`/`finally` and the cleanup still runs if an exception occurs — ideal for files, DB connections, locks.

```python
class DatabaseConnection:
    def __init__(self, host):
        self.host = host

    def __enter__(self):
        print(f"Connecting to {self.host}")
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        print("Closing connection")   # always runs

with DatabaseConnection("localhost") as db:
    print("doing work")
# connection closed automatically here
```

## How do you write your own context manager? <Badge type="warning" text="medium" />

Two ways. **Class-based**: implement `__enter__`/`__exit__` (return `True` from `__exit__` to suppress an exception, `False` to propagate). **Generator-based**: decorate a generator with `@contextlib.contextmanager` and `yield` the resource inside a `try/finally`.

```python
from contextlib import contextmanager

# Class-based
class FileOpener:
    def __init__(self, name): self.name = name
    def __enter__(self):
        self.f = open(self.name); return self.f
    def __exit__(self, exc_type, exc_val, exc_tb):
        self.f.close(); return False

# Generator-based (less boilerplate)
@contextmanager
def open_file(name):
    f = open(name)
    try:
        yield f
    finally:
        f.close()   # always runs

with open_file("data.txt") as f:
    content = f.read()
```

## What are the built-in exceptions? <Badge type="tip" text="easy" />

Python ships a hierarchy rooted at `BaseException`. Common ones: `ValueError`, `TypeError`, `KeyError`, `IndexError`, `AttributeError`, `FileNotFoundError`, `ZeroDivisionError`, `RuntimeError`, `StopIteration`. Catch specific ones, not bare `Exception`.

## What is `raise` used for? <Badge type="tip" text="easy" />

To deliberately trigger an exception — to signal an error, re-raise a caught one, or chain with `from`.

```python
def withdraw(amount, balance):
    if amount > balance:
        raise ValueError("insufficient funds")

try:
    ...
except KeyError as e:
    raise RuntimeError("lookup failed") from e   # chaining
```

## How do you handle multiple exceptions? <Badge type="warning" text="medium" />

Group types in a tuple in one `except`, or use several `except` clauses for different handling.

```python
try:
    risky()
except (ValueError, TypeError) as e:   # same handling
    print("bad input:", e)
except KeyError:
    print("missing key")
```

## What's the difference between try-except and try-finally? <Badge type="tip" text="easy" />

`try`/`except` **handles** an error so the program continues. `try`/`finally` doesn't handle anything — `finally` just guarantees cleanup runs whether or not an exception propagates. They're often combined.

```python
try:
    f = open("x")
finally:
    f.close()      # always runs, even if an exception bubbles up
```

## What is an exception? <Badge type="tip" text="easy" />

An event that disrupts normal program flow at runtime — e.g. dividing by zero or a missing key. Python raises an exception object; if uncaught, it propagates up and crashes the program with a traceback.

## Syntax errors vs runtime exceptions? <Badge type="tip" text="easy" />

A **syntax error** is invalid code the parser rejects before anything runs — it can't execute at all. A **runtime exception** occurs during execution on otherwise-valid code (e.g. `ZeroDivisionError`) and can be caught with `try`/`except`.

```python
# SyntaxError: caught at parse time, not catchable at runtime
# if True print("x")

try:
    1 / 0           # runtime exception — catchable
except ZeroDivisionError:
    pass
```

## How do you create a custom exception? <Badge type="warning" text="medium" />

Subclass `Exception` (or a more specific built-in). Add attributes if you need to carry context.

```python
class InsufficientFundsError(Exception):
    def __init__(self, needed):
        super().__init__(f"need {needed} more")
        self.needed = needed

raise InsufficientFundsError(50)
```

## Why is catching a generic `Exception` bad practice? <Badge type="warning" text="medium" />

A broad `except Exception:` (or bare `except:`) hides bugs, swallows errors you didn't anticipate, and makes debugging hard — it can even catch things you meant to let propagate. Catch the **specific** exceptions you can handle; re-raise the rest.

```python
# BAD
try: risky()
except Exception: pass        # silently hides everything

# GOOD
try: risky()
except (ValueError, KeyError) as e:
    log.warning("handled: %s", e)
```
