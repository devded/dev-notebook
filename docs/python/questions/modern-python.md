# Modern Python (3.10+ / 3.11+)

> Add new questions below in the same format: `## Question? <Badge ... />` then the answer.

## What is structural pattern matching (`match`/`case`)? <Badge type="warning" text="medium" />

Added in Python 3.10, `match`/`case` matches a value against structural patterns — literals, sequences, mappings, classes — and can bind variables. More powerful than a C-style switch.

```python
def handle(command):
    match command.split():
        case ["go", direction]:
            return f"moving {direction}"
        case ["quit"]:
            return "bye"
        case _:
            return "unknown"
```

## What are the performance improvements in Python 3.11? <Badge type="warning" text="medium" />

The "Faster CPython" project made 3.11 ~10–60% faster than 3.10 (≈25% on average) via a specializing adaptive interpreter, cheaper function calls (frame optimizations), and lazy/zero-cost exception handling.

## How has error reporting improved in newer versions? <Badge type="tip" text="easy" />

Python 3.11 added **fine-grained error locations** — tracebacks underline the exact expression that failed, not just the line — making debugging much faster.

```
  File "x.py", line 1
    result = a / b + c / d
                     ~~^~~
ZeroDivisionError: division by zero
```

## What are exception groups (`except*`)? <Badge type="danger" text="hard" />

Python 3.11's `ExceptionGroup` lets you raise and handle multiple exceptions at once (e.g. from concurrent tasks), caught selectively with `except*`.

```python
try:
    raise ExceptionGroup("errors", [ValueError("a"), TypeError("b")])
except* ValueError as eg:
    print("got value errors:", eg.exceptions)
except* TypeError as eg:
    print("got type errors:", eg.exceptions)
```

## What are dataclasses and what's new with them? <Badge type="warning" text="medium" />

`@dataclass` auto-generates `__init__`, `__repr__`, `__eq__`, etc. from annotated fields — less boilerplate for data-holding classes. Supports defaults, `field(default_factory=...)`, `frozen=True`, and `slots=True` (3.10+).

```python
from dataclasses import dataclass

@dataclass(slots=True)
class Point:
    x: int
    y: int = 0
```

## What are the typing improvements in recent Python? <Badge type="warning" text="medium" />

Built-in generics (`list[int]` instead of `List[int]`, 3.9+), the `X | Y` union syntax (3.10), `Self` type (3.11), `LiteralString`, variadic generics, and `assert_type`. These make type hints cleaner without importing from `typing` as much.

```python
def first(items: list[int]) -> int | None:
    return items[0] if items else None
```

## What new string interpolation options exist? <Badge type="tip" text="easy" />

f-strings remain the standard (`f"{value}"`), with the 3.8 `=` debug specifier (`f"{x=}"` prints `x=...`). Python 3.12 relaxed f-string grammar (nested quotes, multiline, backslashes).

```python
x = 42
print(f"{x=}")   # x=42
```
