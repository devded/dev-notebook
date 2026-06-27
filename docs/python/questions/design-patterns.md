# Design Patterns

> Add new questions below in the same format: `## Question? <Badge ... />` then the answer.

## What is a design pattern? <Badge type="warning" text="medium" />

A reusable, proven solution to a recurring design problem — a template, not copy-paste code. Categories: **creational** (object creation), **structural** (composition), **behavioral** (communication). They give a shared vocabulary and promote maintainable design.

## Explain the Singleton pattern (pros/cons). <Badge type="warning" text="medium" />

Ensures a class has only one instance with a global access point (e.g. a config or connection pool). **Pros:** single shared state, lazy init. **Cons:** global state, harder to test, can hide dependencies. In Python, a module is already a natural singleton.

```python
class Singleton:
    _instance = None
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance
```

## What is the Factory pattern? <Badge type="warning" text="medium" />

A creational pattern that delegates object creation to a factory function/method, so callers don't hardcode concrete classes — easy to extend with new types.

```python
def make_animal(kind):
    return {"dog": Dog, "cat": Cat}[kind]()

pet = make_animal("dog")
```

## Explain the Strategy pattern (with example). <Badge type="danger" text="hard" />

Encapsulates interchangeable algorithms behind a common interface, selected at runtime. In Python, functions are first-class, so you can just pass a function.

```python
def quicksort(data): ...
def mergesort(data): ...

def sort_with(data, strategy):
    return strategy(data)

sort_with([3, 1, 2], quicksort)   # swap strategy freely
```

## When is the Observer pattern useful? <Badge type="danger" text="hard" />

When many objects ("observers") need to react to changes in another object ("subject") — a publish/subscribe relationship. Useful for event systems, UI updates, and notifications, keeping subject and observers loosely coupled.

```python
class Subject:
    def __init__(self): self._observers = []
    def subscribe(self, fn): self._observers.append(fn)
    def notify(self, event):
        for fn in self._observers:
            fn(event)
```
