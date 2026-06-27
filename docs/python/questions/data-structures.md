# Data Structures & Algorithms

> Add new questions below in the same format: `## Question? <Badge ... />` then the answer.

## When to choose lists vs tuples vs sets? <Badge type="tip" text="easy" />

**Lists** — mutable, ordered; for sequences that change. **Tuples** — immutable, ordered; for fixed data (coordinates, records). **Sets** — unordered, unique elements with O(1) membership; ideal for dedup and "is it in here?" checks. Pick based on both behavior and performance.

```python
cart = ["apples", "bananas"]      # list: mutable sequence
cart.append("oranges")

point = (34.0522, -118.2437)      # tuple: fixed pair

users = {"alice", "bob"}          # set: fast membership
if "alice" in users:              # O(1) lookup
    print("found")
```

## How do dictionaries work under the hood? <Badge type="danger" text="hard" />

Dicts are **hash tables** giving O(1) average lookup. The key's hash picks a slot; collisions are resolved with open addressing. Keys must be immutable so their hash never changes. When the table gets ~two-thirds full, Python allocates a bigger table and rehashes everything to keep collisions low.

```python
class CustomKey:
    def __init__(self, key):
        self.key = key
    def __hash__(self):
        return hash(self.key)
    def __eq__(self, other):
        return self.key == other.key
```

## What sorting algorithm does Python use? <Badge type="warning" text="medium" />

**Timsort** — a hybrid of merge sort and insertion sort. It detects already-ordered "runs" in the data, making it fast on partially sorted input. It's stable, adaptive, and efficient on real-world data. Use `sorted()` (new list) or `.sort()` (in place).

```python
nums = [64, 34, 25, 12, 22]
sorted_nums = sorted(nums)   # new list
nums.sort()                  # in place

students.sort(key=lambda s: s.grade, reverse=True)  # custom key
```

## What are efficient ways to search data? <Badge type="warning" text="medium" />

Linear search is O(n); binary search is O(log n) but needs sorted data. For sorted lists use the `bisect` module. For frequent membership tests prefer dicts/sets (O(1)) over lists (O(n)).

```python
def binary_search(items, target):   # items must be sorted
    lo, hi = 0, len(items) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if items[mid] == target:
            return mid
        elif items[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return -1

from bisect import bisect_left       # built-in binary search
```

## How do you work with strings efficiently? <Badge type="warning" text="medium" />

Strings are immutable, so each modification creates a new object. Avoid `+=` in loops — use `"".join(...)` instead. Lean on built-in methods (`split`, `strip`, `replace`) which are implemented in C and far faster than manual character loops.

```python
words = ["Hello", "World", "!"]
result = " ".join(words)     # efficient

def is_palindrome(s):
    cleaned = "".join(c.lower() for c in s if c.isalnum())
    return cleaned == cleaned[::-1]
```

## How do you create a dictionary? <Badge type="tip" text="easy" />

Several ways: literal braces, the `dict()` constructor, a comprehension, or `zip` of two sequences.

```python
a = {"x": 1, "y": 2}                 # literal
b = dict(x=1, y=2)                   # constructor
c = {k: k**2 for k in range(3)}      # comprehension
d = dict(zip(["x", "y"], [1, 2]))    # from two lists
```

## How do you handle complex data transformations? <Badge type="warning" text="medium" />

Reach for the right tool: `collections.defaultdict` for grouping/counting, comprehensions for simple maps, generator expressions for large data. Break transforms into small steps, validate inputs, and mind time/space complexity.

```python
from collections import defaultdict

def count_errors(logs):
    counts = defaultdict(int)
    for log in logs:
        if "ERROR" in log:
            counts[log.split()[0]] += 1
    return sorted(counts.items(), key=lambda x: (-x[1], x[0]))
```

## How do you safely handle missing dictionary keys? <Badge type="tip" text="easy" />

Several options: `dict.get(key, default)` for a simple fallback, `collections.defaultdict` when building a collection, an `in` check when you need branching logic, or `try/except KeyError`. `get()` is cleanest for most cases.

```python
settings = {"theme": "dark"}
size = settings.get("font_size", 12)   # 12 if missing

from collections import defaultdict
counts = defaultdict(int)
counts["hello"] += 1                    # no KeyError
```

## How do you sort a dictionary by its values? <Badge type="tip" text="easy" />

Sort `dict.items()` with a `key` that picks the value; rebuild a dict if needed (Python 3.7+ preserves insertion order).

```python
scores = {"Alice": 90, "Bob": 75, "Charlie": 95}
ranked = sorted(scores.items(), key=lambda kv: kv[1], reverse=True)
# [('Charlie', 95), ('Alice', 90), ('Bob', 75)]
dict(ranked)   # {'Charlie': 95, 'Alice': 90, 'Bob': 75}
```

## How do you check if two strings are anagrams? <Badge type="warning" text="medium" />

Anagrams use the same characters with the same frequencies. Either sort and compare — O(n log n) — or compare `Counter`s — O(n), faster for long strings.

```python
from collections import Counter

def is_anagram(a, b):
    a = a.replace(" ", "").lower()
    b = b.replace(" ", "").lower()
    return Counter(a) == Counter(b)   # or: sorted(a) == sorted(b)
```

## How do you process a huge file (e.g. 8 GB) that won't fit in memory? <Badge type="danger" text="hard" />

Stream it line by line instead of loading it all. Example — first non-repeating character via two passes: count frequencies, then find the first char with count 1. O(n) time, O(1) memory relative to file size.

```python
from collections import Counter

def first_non_repeating(filename):
    counter = Counter()
    with open(filename, encoding="utf-8") as f:
        for line in f:           # streams, never loads whole file
            counter.update(line)
    with open(filename, encoding="utf-8") as f:
        for line in f:
            for ch in line:
                if counter[ch] == 1:
                    return ch
    return None
```

## `append()` vs `extend()`? <Badge type="tip" text="easy" />

`append(x)` adds `x` as a single element (a list arg becomes a nested list). `extend(iterable)` adds each element of the iterable individually.

```python
a = [1, 2]; a.append([3, 4]); print(a)   # [1, 2, [3, 4]]
b = [1, 2]; b.extend([3, 4]); print(b)   # [1, 2, 3, 4]
```

## How is a dictionary different from a list? <Badge type="tip" text="easy" />

A list is an ordered sequence indexed by integer position; a dict maps unique (hashable) keys to values with O(1) average lookup. Use a list for ordered collections, a dict for keyed lookups.

## `set()` vs `frozenset()`? <Badge type="tip" text="easy" />

Both store unique elements; `set` is mutable, `frozenset` is immutable and hashable — so a `frozenset` can be a dict key or set element.

```python
s = {1, 2, 3}            # mutable
fs = frozenset([1, 2])   # immutable, hashable
{fs: "ok"}               # valid dict key
```

## How do you sort a list? <Badge type="tip" text="easy" />

`list.sort()` sorts in place; `sorted()` returns a new list. Both accept `key` and `reverse`.

```python
nums = [3, 1, 2]
nums.sort()                              # [1, 2, 3] in place
sorted(words, key=len, reverse=True)     # new list, by length desc
```

## What are heaps and when do you use them? <Badge type="warning" text="medium" />

A heap is a binary tree that keeps the smallest (min-heap) element at the root, giving O(log n) push/pop. Use `heapq` for priority queues, scheduling, or top-k problems.

```python
import heapq
h = []
heapq.heappush(h, 3); heapq.heappush(h, 1)
heapq.heappop(h)                # 1 (smallest)
heapq.nlargest(2, [5, 1, 8, 3]) # [8, 5]
```

## What is a stack and how is it implemented? <Badge type="tip" text="easy" />

A LIFO structure. A `list` works (`append`/`pop`), or `collections.deque` for guaranteed O(1) ends.

```python
stack = []
stack.append(1); stack.append(2)
stack.pop()       # 2 (last in, first out)
```

## How do queues work in Python? <Badge type="warning" text="medium" />

FIFO. Use `collections.deque` (`append`/`popleft`, O(1)) — avoid `list.pop(0)` which is O(n). For threading, use `queue.Queue`.

```python
from collections import deque
q = deque()
q.append(1); q.append(2)
q.popleft()       # 1 (first in, first out)
```

## How do you remove duplicates from a list? <Badge type="tip" text="easy" />

`set()` if order doesn't matter; `dict.fromkeys()` to dedupe while preserving order.

```python
list(set([1, 2, 2, 3]))             # order not guaranteed
list(dict.fromkeys([3, 1, 1, 2]))   # [3, 1, 2] — order kept
```

## What are `defaultdict` and `OrderedDict`? <Badge type="warning" text="medium" />

Both in `collections`. `defaultdict` supplies a default value for missing keys via a factory. `OrderedDict` remembers insertion order (less needed since dicts preserve order in 3.7+, but it adds order-aware equality and `move_to_end`).

```python
from collections import defaultdict
d = defaultdict(list)
d["a"].append(1)        # no KeyError
```

## Is a Python list a linked list? <Badge type="warning" text="medium" />

No. A list is a **dynamic array** — a contiguous block of references to objects, with the pointer and length stored in the list header. That's why indexing is O(1) but inserting in the middle is O(n).

## How do you create a multi-dimensional list? <Badge type="tip" text="easy" />

Nest lists. Build them with a comprehension to avoid the shared-reference trap of `[[0]*c]*r`.

```python
grid = [[0 for _ in range(3)] for _ in range(2)]   # 2x3
grid[0][1] = 5
```

## How do you convert a list to other types? <Badge type="tip" text="easy" />

```python
days = ["sun", "mon", "tue"]
" ".join(days)               # 'sun mon tue'   (list -> str)
tuple(days)                  # ('sun','mon','tue') (list -> tuple)
set(["a", "a", "b"])         # {'a', 'b'}      (list -> set, dedupes)
dict(zip(days[::2], days[1::2]))  # pair up -> dict
```

## How do you count occurrences of items in a list? <Badge type="tip" text="easy" />

`list.count(x)` for one item; `collections.Counter` for all at once.

```python
nums = [1, 2, 2, 3, 3, 3]
nums.count(3)                 # 3

from collections import Counter
Counter(nums)                 # {3: 3, 2: 2, 1: 1}
```

## How do you add, remove, and update list elements? <Badge type="tip" text="easy" />

```python
nums = [1, 2, 3]
nums.append(4)        # add to end -> [1,2,3,4]
nums.insert(0, 0)     # add at index -> [0,1,2,3,4]
nums[1] = 99          # update by index
nums.remove(99)       # remove by value
nums.pop()            # remove & return last
del nums[0]           # remove by index
```

## What's the difference between `remove()`, `pop()`, and `del`? <Badge type="warning" text="medium" />

`remove(value)` deletes the first matching **value** (raises `ValueError` if absent). `pop(index)` removes and **returns** the item at an index (last by default). `del` is a statement that removes by index/slice (or deletes the variable).

```python
a = [10, 20, 30]
a.remove(20)   # by value  -> [10, 30]
a.pop(0)       # returns 10 -> [30]
del a[0]       # by index  -> []
```

## How does Python implement lists, and what are the time complexities? <Badge type="danger" text="hard" />

A list is a **dynamic array** of object references that grows by over-allocating, so amortized `append` is O(1). Index/assignment is O(1); search/`in`, `remove`, and middle `insert`/`pop(0)` are O(n) (shifting elements); slicing is O(k) for the slice size.

| Operation | Complexity |
| --- | --- |
| index / `a[i] = x` | O(1) |
| `append` / `pop()` (end) | O(1) amortized |
| `insert(i, x)` / `pop(0)` | O(n) |
| `x in a` / `remove(x)` | O(n) |
| slice `a[i:j]` | O(k) |

## Can a tuple contain mutable objects? <Badge type="warning" text="medium" />

Yes. A tuple's **immutability is shallow** — you can't reassign its slots, but if a slot holds a mutable object (like a list), that object can still be changed in place. (Such a tuple is also no longer hashable.)

```python
t = (1, [2, 3])
t[1].append(4)     # OK — mutating the inner list -> (1, [2, 3, 4])
t[0] = 9           # TypeError — can't rebind a tuple slot
```

## What are tuple packing and unpacking (and `*`)? <Badge type="warning" text="medium" />

Packing groups values into a tuple; unpacking spreads them into variables. A starred target captures the rest as a list.

```python
point = 3, 4            # packing
x, y = point            # unpacking
a, b = b, a             # swap (no temp)
first, *rest = [1, 2, 3, 4]   # first=1, rest=[2,3,4]
```

## What are named tuples and when do you use them? <Badge type="warning" text="medium" />

`collections.namedtuple` creates a lightweight, immutable tuple subclass with **named fields** — clearer than positional indexing, with less overhead than a class. Good for simple records.

```python
from collections import namedtuple
Point = namedtuple("Point", "x y")
p = Point(3, 4)
p.x, p.y          # 3 4  (also p[0], p[1])
```

## How do you create an empty set? <Badge type="tip" text="easy" />

Use `set()` — `{}` makes an empty **dict**, not a set.

```python
empty = set()        # empty set
also_empty = {}      # this is a dict!
{1, 2, 3}            # non-empty set literal
```

## `remove()` vs `discard()` vs `pop()` on sets? <Badge type="warning" text="medium" />

`remove(x)` deletes `x` but raises `KeyError` if absent. `discard(x)` deletes `x` and does nothing if absent. `pop()` removes and returns an arbitrary element.

```python
s = {1, 2, 3}
s.discard(9)   # no error
s.remove(9)    # KeyError
s.pop()        # removes some element
```

## Explain union, intersection, difference, symmetric difference. <Badge type="warning" text="medium" />

```python
a, b = {1, 2, 3}, {2, 3, 4}
a | b    # union              -> {1, 2, 3, 4}
a & b    # intersection       -> {2, 3}
a - b    # difference         -> {1}
a ^ b    # symmetric diff     -> {1, 4}
```

## What are hash collisions and how do they affect performance? <Badge type="danger" text="hard" />

A collision is when two keys hash to the same bucket. Sets/dicts resolve them (open addressing in CPython), keeping average lookup O(1). But many collisions (poor `__hash__`, or adversarial keys) degrade toward O(n). A good, well-distributed `__hash__` keeps performance optimal.

## How do you iterate a dict's keys, values, and items? <Badge type="tip" text="easy" />

Iterating a dict yields keys; use `.values()` and `.items()` for the rest. `.items()` returns key–value pairs.

```python
d = {"a": 1, "b": 2}
for k in d: ...              # keys
for v in d.values(): ...     # values
for k, v in d.items(): ...   # pairs
```

## How do you merge two dictionaries? <Badge type="tip" text="easy" />

The `|` operator (3.9+) returns a merged dict; `update()` merges in place; `{**a, **b}` also works. On key clashes, the right-hand side wins.

```python
a = {"x": 1}; b = {"y": 2}
a | b          # {'x': 1, 'y': 2}
a.update(b)    # mutates a
{**a, **b}     # unpacking merge
```

## How do dicts preserve insertion order? <Badge type="warning" text="medium" />

Since Python 3.7 (guaranteed; 3.6 as an implementation detail), dicts keep keys in insertion order. Internally a compact array of entries records insertion sequence, with a separate sparse hash index for lookups.

## Time complexities of tuple, set, and dict operations? <Badge type="warning" text="medium" />

| Op | tuple | set | dict |
| --- | --- | --- | --- |
| index `t[i]` | O(1) | — | — |
| membership `x in s` | O(n) | O(1) avg | O(1) avg (keys) |
| add / insert | immutable | O(1) avg | O(1) avg |
| delete | immutable | O(1) avg | O(1) avg |

(Set/dict ops degrade to O(n) worst case under heavy hash collisions.)
