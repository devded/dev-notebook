# Data & Iteration

> Add new questions below in the same format: `## Question? <Badge ... />` then the answer.

## Generators vs lists? <Badge type="tip" text="easy" />

Generators are lazy and memory-efficient (one item at a time); lists hold everything in memory. Use generators for large/streaming data.

```python
nums = [x * x for x in range(1000)]   # list — all in memory
gen  = (x * x for x in range(1000))   # generator — lazy
```

## What does `yield` do? <Badge type="warning" text="medium" />

Turns a function into a generator. Each `yield` produces a value and pauses execution, resuming on the next iteration — keeping local state between calls.

```python
def countdown(n):
    while n > 0:
        yield n
        n -= 1
```

## Mutable vs immutable types? <Badge type="tip" text="easy" />

Mutability decides whether an object can change after creation. Immutable: `int`, `float`, `str`, `tuple`, `frozenset` — any "modification" actually creates a new object. Mutable: `list`, `dict`, `set` — modified in place. This matters for dict/set keys, which must be immutable so their hash stays consistent.

```python
s = "hello"
s.upper()      # returns a NEW string
print(s)       # 'hello' (unchanged)

nums = [1, 2, 3]
nums.append(4) # modifies the same list
print(nums)    # [1, 2, 3, 4]
```

## What makes list comprehensions powerful? <Badge type="tip" text="easy" />

They build lists in a single readable expression and are often faster than an equivalent `for`-loop with `.append()`. Trade-off: keep them simple — deeply nested or condition-heavy comprehensions hurt readability, where a plain loop is better.

```python
# loop
squares = []
for x in range(10):
    if x % 2 == 0:
        squares.append(x ** 2)

# comprehension — concise and usually faster
squares = [x ** 2 for x in range(10) if x % 2 == 0]

# nesting is possible, but watch readability
matrix = [[i + j for j in range(3)] for i in range(3)]
```

## What are `*args` and `**kwargs`? <Badge type="tip" text="easy" />

`*args` collects extra positional arguments into a tuple; `**kwargs` collects extra keyword arguments into a dict.

```python
def f(*args, **kwargs):
    print(args)    # tuple
    print(kwargs)  # dict
```

## Also describe dict comprehensions <Badge type="tip" text="easy" />

Same idea as list comprehensions but they build key→value pairs with `{k: v for ...}`.

```python
names = ["Alice", "Bob", "Charlie"]
lengths = {name: len(name) for name in names}
# {'Alice': 5, 'Bob': 3, 'Charlie': 7}
```

## How do you get every Nth item from a list? <Badge type="tip" text="easy" />

Use slice notation `[start:stop:step]`. Omitting `start`/`stop` defaults to the whole sequence; the `step` skips items. It's the most concise and fastest option.

```python
items = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
items[::3]     # [0, 3, 6, 9] — every third item

# equivalent, but more verbose:
[x for i, x in enumerate(items) if i % 3 == 0]
```

## How does `range` work in Python 3? <Badge type="warning" text="medium" />

`range` is a lazy, immutable sequence — it generates numbers on demand instead of building a list (like Python 2's `xrange`). It still supports indexing, slicing, `in` checks, and `len()` without storing all values. Forms: `range(stop)`, `range(start, stop)`, `range(start, stop, step)`.

```python
big = range(1_000_000)   # no million-element list
big[0]                   # 0
10 in big                # True
list(range(0, 10, 2))    # [0, 2, 4, 6, 8] — materialize when needed
```

## What is the difference between `return` and `yield`? <Badge type="warning" text="medium" />

`return` ends the function and hands back a value. `yield` produces a value but **pauses** the function, preserving its state so it resumes on the next iteration — making it a generator.

```python
def squares(n):
    for i in range(n):
        yield i * i     # resumes here each time

list(squares(4))        # [0, 1, 4, 9]
```

## What are iterators and iterables? <Badge type="warning" text="medium" />

An **iterable** is anything you can loop over (it implements `__iter__`) — lists, strings, dicts. An **iterator** is the object that produces items one at a time via `__next__`, raising `StopIteration` when exhausted. `iter()` turns an iterable into an iterator.

```python
nums = [1, 2, 3]      # iterable
it = iter(nums)       # iterator
next(it)              # 1
next(it)              # 2
```
