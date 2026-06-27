# Python Cheatsheet

A quick syntax reference of the things that come up most often.

## Data structures

| Type | Mutable | Ordered | Notes |
| --- | --- | --- | --- |
| `list` | ✅ | ✅ | Dynamic array, O(1) append, O(n) insert |
| `tuple` | ❌ | ✅ | Hashable if elements are |
| `dict` | ✅ | ✅ (3.7+) | Hash map, O(1) avg lookup |
| `set` | ✅ | ❌ | Unique elements, O(1) membership |
| `frozenset` | ❌ | ❌ | Hashable set |

## Time complexity (CPython)

| Operation | list | dict / set |
| --- | --- | --- |
| Index / key access | O(1) | O(1) |
| Search (`in`) | O(n) | O(1) |
| Append / add | O(1) | O(1) |
| Insert / delete (middle) | O(n) | O(1) |

## Comprehensions

```python
squares = [x * x for x in range(10)]
evens = [x for x in range(10) if x % 2 == 0]
matrix = [[r * c for c in range(3)] for r in range(3)]
lookup = {k: v for k, v in pairs}
unique = {x % 3 for x in range(10)}
gen = (x * x for x in range(10))  # lazy generator
```

## Common gotchas

```python
# Mutable default argument — DON'T
def bad(items=[]):       # shared across calls!
    items.append(1)
    return items

def good(items=None):
    items = items or []
    items.append(1)
    return items

# Late binding in closures
fns = [lambda: i for i in range(3)]   # all return 2
fns = [lambda i=i: i for i in range(3)]  # fixed: 0,1,2
```

## Strings

```python
"hello".upper()            # 'HELLO'
"a,b,c".split(",")         # ['a', 'b', 'c']
",".join(["a", "b"])       # 'a,b'
f"{value:.2f}"             # format float
"text".startswith("te")    # True
"  x  ".strip()            # 'x'
```

## Useful built-ins

```python
enumerate(seq, start=1)     # index + value
zip(a, b)                   # pair up iterables
sorted(seq, key=len, reverse=True)
map(fn, seq); filter(fn, seq)
any(seq); all(seq)
sum(seq); min(seq); max(seq)
```

## collections module

```python
from collections import Counter, defaultdict, deque, namedtuple

Counter("aabbbc")           # {'b': 3, 'a': 2, 'c': 1}
d = defaultdict(list); d["k"].append(1)
q = deque([1, 2]); q.appendleft(0); q.pop()
Point = namedtuple("Point", "x y")
```

## OOP essentials

```python
class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        raise NotImplementedError

    def __repr__(self):
        return f"Animal({self.name!r})"

class Dog(Animal):
    def speak(self):
        return "woof"
```

- `@staticmethod` — no `self`/`cls`.
- `@classmethod` — receives `cls`, used for alternative constructors.
- `@property` — getter that looks like an attribute.

## Decorators

```python
import functools

def timed(fn):
    @functools.wraps(fn)
    def wrapper(*args, **kwargs):
        return fn(*args, **kwargs)
    return wrapper
```

---

> 💡 Looking for Q&A? See the [Python Interview Questions](./questions/) pages.
