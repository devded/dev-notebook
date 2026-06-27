# Functions & Scope

> Add new questions below in the same format: `## Question? <Badge ... />` then the answer.

## What are decorators? <Badge type="warning" text="medium" />

Functions that wrap another function to extend behavior without modifying it. Applied with `@decorator`. Use `functools.wraps` to preserve metadata.

```python
import functools

def log(fn):
    @functools.wraps(fn)
    def wrapper(*args, **kwargs):
        print(f"calling {fn.__name__}")
        return fn(*args, **kwargs)
    return wrapper

@log
def add(a, b):
    return a + b
```

## Explain closures. <Badge type="warning" text="medium" />

A nested function that captures variables from its enclosing scope, keeping them alive after the outer function returns.

```python
def counter():
    count = 0
    def inc():
        nonlocal count
        count += 1
        return count
    return inc
```

## Why avoid mutable default arguments? <Badge type="warning" text="medium" />

Defaults are evaluated once at definition time, so a mutable default (e.g. `[]`) is shared across all calls. Use `None` and create the object inside.

```python
def bad(items=[]):       # shared across calls!
    items.append(1)
    return items

def good(items=None):
    items = items or []
    items.append(1)
    return items
```

## How does Python's scope system (LEGB) work? <Badge type="warning" text="medium" />

Python resolves a name by searching scopes in order: **L**ocal → **E**nclosing → **G**lobal → **B**uilt-in. Use `global` to rebind a module-level name and `nonlocal` to rebind a name in the enclosing function. A common pitfall: assigning to a name inside a function makes it local unless declared `global`/`nonlocal`.

```python
x = "global"

def outer():
    x = "enclosing"
    def inner():
        print(x)   # 'enclosing' — found in enclosing scope
    inner()

def modify_global():
    global x
    x = "modified global"
```

## What role do lambda functions play? <Badge type="tip" text="easy" />

Lambdas are anonymous single-expression functions, handy for short operations passed to `map()`, `filter()`, or `sorted(key=...)`. Limitations: one expression only, no statements, and overuse hurts readability — prefer a named `def` for anything non-trivial.

```python
numbers = [1, 2, 3, 4, 5]
squared = list(map(lambda x: x ** 2, numbers))
evens   = list(filter(lambda x: x % 2 == 0, numbers))

pairs = [(1, "one"), (2, "two"), (3, "three")]
pairs.sort(key=lambda p: p[1])   # sort by the string
```

## How does a Python function work? <Badge type="tip" text="easy" />

`def` creates a function object bound to a name. Calling it runs the body in a fresh local scope; arguments are passed by object reference. It returns a value with `return` (or `None` implicitly). Functions are first-class — you can pass them around, nest them, and return them.

```python
def greet(name, greeting="Hi"):   # default arg
    return f"{greeting}, {name}!"

greet("Sam")                 # 'Hi, Sam!'
greet("Sam", greeting="Yo")  # keyword arg
```

## How do `map()`, `filter()`, and `reduce()` work? <Badge type="warning" text="medium" />

`map` applies a function to every item; `filter` keeps items where the function is truthy; `reduce` (from `functools`) folds items into a single value.

```python
from functools import reduce

list(map(lambda x: x**2, [1, 2, 3]))        # [1, 4, 9]
list(filter(lambda x: x % 2 == 0, [1,2,3,4]))  # [2, 4]
reduce(lambda a, b: a * b, [1, 2, 3, 4])    # 24
```

## Explain `global`, `local`, and `nonlocal` variables. <Badge type="warning" text="medium" />

A name assigned inside a function is **local** by default. `global` rebinds a module-level name; `nonlocal` rebinds a name in the nearest enclosing function (not global).

```python
count = 0
def inc():
    global count
    count += 1

def outer():
    x = 0
    def inner():
        nonlocal x
        x += 1
    inner()
    return x
```

## What is recursion? Give an example. <Badge type="tip" text="easy" />

A function that calls itself, breaking a problem into smaller subproblems until a base case stops it. Watch the recursion depth limit for deep cases.

```python
def factorial(n):
    if n <= 1:        # base case
        return 1
    return n * factorial(n - 1)
```

## What is the `functools` module for? <Badge type="warning" text="medium" />

Higher-order-function utilities: `lru_cache`/`cache` (memoization), `reduce`, `partial` (pre-fill arguments), `wraps` (preserve metadata in decorators), and `cmp_to_key`.

```python
from functools import partial, lru_cache

@lru_cache
def fib(n): return n if n < 2 else fib(n-1) + fib(n-2)

add5 = partial(lambda a, b: a + b, 5)
add5(10)   # 15
```

## What's the difference between `lambda` and `def`? <Badge type="tip" text="easy" />

`def` creates a named function that can hold many statements and `return`. `lambda` is a single-expression anonymous function (no statements, no explicit `return`) that evaluates to a function object — handy inline.

```python
def square(x): return x * x
square = lambda x: x * x   # equivalent, anonymous
```

## Is it mandatory for a function to return a value? <Badge type="tip" text="easy" />

No. A function with no `return` (or a bare `return`) implicitly returns `None`.

```python
def log(msg):
    print(msg)        # no return
log("hi") is None     # True
```

## How do you write a conditional (ternary) expression? <Badge type="tip" text="easy" />

`value_if_true if condition else value_if_false` — a one-line if/else.

```python
n = 366
leap = "Yes" if n == 366 else "No"
smaller = a if a < b else b
```

## What does `enumerate()` do? <Badge type="tip" text="easy" />

Pairs each item with an index counter while iterating — cleaner than managing a manual counter.

```python
for i, fruit in enumerate(["apple", "mango"], start=1):
    print(i, fruit)     # 1 apple / 2 mango
```

## What does `zip()` do? <Badge type="tip" text="easy" />

Combines several iterables element-wise into tuples, stopping at the shortest.

```python
names = ["tom", "jane"]
ages = [32, 28]
list(zip(names, ages))   # [('tom', 32), ('jane', 28)]
dict(zip(names, ages))   # {'tom': 32, 'jane': 28}
```

## What does `id()` do? <Badge type="tip" text="easy" />

Returns a unique integer identifying an object during its lifetime (its memory address in CPython). `is` compares these identities.

```python
a = [1, 2]
id(a)          # e.g. 140234...
```

## What does `globals()` do? <Badge type="warning" text="medium" />

Returns the current module's global symbol table as a dict — names mapped to objects at global scope. You can read and even modify globals through it.

```python
x = 9
def show():
    return globals()["x"]   # 9
```

## What are docstrings? <Badge type="tip" text="easy" />

A string literal as the first statement of a module, function, class, or method, documenting what it does. Stored in `__doc__` and shown by `help()`.

```python
def add(a, b):
    """Return the sum of two numbers."""
    return a + b

add.__doc__   # 'Return the sum of two numbers.'
```

## What's the difference between parameters and arguments? <Badge type="tip" text="easy" />

**Parameters** are the names in the function definition; **arguments** are the actual values you pass when calling it.

```python
def greet(name):     # name = parameter
    return f"hi {name}"

greet("Sam")          # "Sam" = argument
```

## Positional, keyword, and default arguments? <Badge type="warning" text="medium" />

**Positional** args match by order; **keyword** args match by name (order-independent); **default** values are used when an argument is omitted. (Avoid mutable defaults — see the gotcha above.)

```python
def connect(host, port=5432, *, timeout=30):
    ...

connect("db1")                       # positional + defaults
connect("db1", 5433)                 # positional
connect("db1", port=5433, timeout=5) # keyword (timeout is keyword-only after *)
```

## What are Python's common higher-order functions? <Badge type="warning" text="medium" />

Functions that take/return other functions. Pick by intent:

```python
nums = [1, 2, 3, 4]
list(map(lambda x: x*2, nums))      # transform each   -> [2,4,6,8]
list(filter(lambda x: x%2, nums))   # keep some        -> [1,3]
from functools import reduce
reduce(lambda a, b: a+b, nums)      # fold to one value -> 10
list(zip(nums, "abcd"))             # pair iterables
any(x > 3 for x in nums)            # True if any truthy
all(x > 0 for x in nums)            # True if all truthy
sorted(nums, key=abs, reverse=True) # ordered copy
```

- `map`/`filter` — element-wise transform/select
- `reduce` — combine into a single result
- `zip` — combine iterables in parallel
- `any`/`all` — boolean aggregate over a condition
- `sorted` — return an ordered copy (use `key`)

## How do decorators with arguments work? <Badge type="danger" text="hard" />

Add one more layer: an outer function takes the arguments and returns the actual decorator. So `@repeat(3)` calls `repeat(3)`, which returns the decorator applied to the function.

```python
import functools

def repeat(times):
    def decorator(fn):
        @functools.wraps(fn)
        def wrapper(*args, **kwargs):
            for _ in range(times):
                result = fn(*args, **kwargs)
            return result
        return wrapper
    return decorator

@repeat(3)
def hi(): print("hi")
```

## Can multiple decorators stack, and in what order? <Badge type="warning" text="medium" />

Yes. They apply **bottom-up** (closest to the function first) but execute **top-down** at call time. `@a` over `@b` means `a(b(func))`.

```python
@a
@b
def f(): ...
# equivalent to: f = a(b(f))
```

## How are closures different from decorators? <Badge type="warning" text="medium" />

A **closure** is a nested function that remembers variables from its enclosing scope. A **decorator** is a specific *use* of a closure: it takes a function and returns a wrapped version. Every decorator uses a closure, but closures have many other uses (callbacks, factories, stateful functions).
