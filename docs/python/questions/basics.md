# Basics & Internals

> Add new questions below in the same format: `## Question? <Badge ... />` then the answer.

## What is the GIL? <Badge type="warning" text="medium" />

::: details View Answer
The Global Interpreter Lock allows only one thread to execute Python bytecode at a time. CPU-bound work doesn't speed up with threads — use `multiprocessing` or native extensions. I/O-bound work still benefits from threads/`asyncio`.
:::

## `is` vs `==`? <Badge type="tip" text="easy" />

::: details View Answer
`==` compares values, `is` compares identity (same object in memory). Use `is` only for `None`/singletons.

```python
a = [1, 2]; b = [1, 2]
a == b   # True  (same value)
a is b   # False (different objects)
```
:::

## Shallow vs deep copy? <Badge type="warning" text="medium" />

::: details View Answer
`copy.copy()` copies the top level; nested objects are shared. `copy.deepcopy()` recursively copies everything.

```python
import copy
copy.copy(obj)      # shallow
copy.deepcopy(obj)  # deep
```
:::

## How does Python handle variables and memory management? <Badge type="warning" text="medium" />

::: details View Answer
Python is dynamically typed — variables are just references (names) pointing to objects in memory, not the objects themselves. Memory is managed with **reference counting** (an object is freed the moment its reference count hits zero) plus a **cyclic garbage collector** that cleans up reference cycles. Memory lives in a private heap managed by the interpreter.

```python
x = 42   # creates an int object, x points to it
y = x    # y points to the SAME object
x = 100  # x now points to a new int object; y is unchanged

print(y)  # 42  (ints are immutable)
```
:::

## How are arguments passed in Python? <Badge type="warning" text="medium" />

::: details View Answer
Python uses **call-by-object-reference** (a.k.a. call-by-assignment): you pass a reference to the object, not a copy. So mutating a mutable argument in place affects the caller's object, but *rebinding* the parameter name only changes the local variable.

```python
def append_one(lst):
    lst.append(1)     # mutates the caller's list

def reassign(lst):
    lst = [99, 100]   # only rebinds the local name

nums = [0]
append_one(nums); print(nums)  # [0, 1]  — changed
nums = [0]
reassign(nums);   print(nums)  # [0]     — unchanged
```
:::

## Difference between `pass`, `continue`, and `break`? <Badge type="tip" text="easy" />

::: details View Answer
`pass` is a no-op placeholder where syntax requires a statement. `continue` skips to the next loop iteration. `break` exits the loop entirely.

```python
for num in range(10):
    if num % 2 == 0:
        continue       # skip evens
    if num > 5:
        break          # stop completely
    print(num)         # 1, 3, 5
```
:::

## What are the key features of Python? <Badge type="tip" text="easy" />

::: details View Answer
High-level and readable; dynamically typed and interpreted (bytecode + VM); multi-paradigm (OOP, functional, procedural); automatic memory management; a huge standard library ("batteries included") and ecosystem; cross-platform and open source.
:::

## What are the built-in data types? <Badge type="tip" text="easy" />

::: details View Answer
- **Numeric:** `int`, `float`, `complex`
- **Sequence:** `list`, `tuple`, `range`, `str`
- **Mapping:** `dict`
- **Set:** `set`, `frozenset`
- **Boolean:** `bool`
- **Binary:** `bytes`, `bytearray`, `memoryview`
- **None:** `NoneType`

```python
type(42)        # <class 'int'>
type([1, 2])    # <class 'list'>
type({"a": 1})  # <class 'dict'>
```
:::

## Key differences between Python 2 and Python 3? <Badge type="tip" text="easy" />

::: details View Answer
Python 3 made `print()` a function, uses true Unicode `str` by default, `/` is float division (`//` is floor), `range`/`zip` return lazy iterators, and it has cleaner, modern syntax. Python 2 reached end-of-life in 2020 — use Python 3.
:::

## How does Python handle type conversion? <Badge type="tip" text="easy" />

::: details View Answer
Implicit conversion happens automatically in safe cases (e.g. `int + float → float`); explicit conversion uses constructor functions like `int()`, `float()`, `str()`, `list()`.

```python
3 + 2.0          # 5.0  (implicit)
int("42")        # 42   (explicit)
str(3.14)        # '3.14'
list("abc")      # ['a', 'b', 'c']
```
:::

## How do `for` and `while` loops work? <Badge type="tip" text="easy" />

::: details View Answer
A `for` loop iterates over the items of any iterable. A `while` loop repeats as long as its condition is truthy, checking before each pass. Both support `break`, `continue`, and an optional `else` (runs if the loop wasn't `break`-ed).

```python
for ch in "abc":
    print(ch)

n = 3
while n > 0:
    print(n)
    n -= 1
```
:::

## What's the difference between `pass` and `continue`? <Badge type="tip" text="easy" />

::: details View Answer
`pass` does nothing — a placeholder; execution continues to the next line. `continue` skips the rest of the current loop iteration and jumps to the next one.

```python
for i in range(4):
    if i == 2:
        pass        # does nothing, falls through
    if i == 1:
        continue    # skip rest of this iteration
    print(i)        # 0, 2, 3
```
:::

## What are the advantages and disadvantages of Python? <Badge type="tip" text="easy" />

::: details View Answer
**Pros:** readable/concise, huge ecosystem, cross-platform, fast development, multi-paradigm. **Cons:** slower than compiled languages, the GIL limits CPU-bound threading, higher memory use, weaker for mobile and low-level work.
:::

## What are Python keywords? <Badge type="tip" text="easy" />

::: details View Answer
Reserved words with special meaning that can't be used as identifiers — e.g. `if`, `else`, `for`, `while`, `def`, `class`, `return`, `import`, `True`, `False`, `None`, `and`, `or`, `not`, `lambda`, `with`, `yield`. List them with `keyword.kwlist`.

```python
import keyword
keyword.kwlist          # all keywords
keyword.iskeyword("for")  # True
```
:::

## How do you write comments? <Badge type="tip" text="easy" />

::: details View Answer
`#` for single-line comments. There's no block-comment syntax — use multiple `#` lines (a triple-quoted string is a string literal, not a true comment, though it's used for docstrings).

```python
# this is a comment
x = 5  # inline comment
```
:::

## How do you declare a variable, and what is dynamic typing? <Badge type="tip" text="easy" />

::: details View Answer
Just assign — no type declaration needed. Python is **dynamically typed**: the type lives with the value, and a name can be rebound to a different type at runtime.

```python
x = 10        # int
x = "hello"   # now a str — allowed
```
:::

## What is strong typing in Python? <Badge type="warning" text="medium" />

::: details View Answer
Python is **strongly** typed — it won't implicitly coerce unrelated types, so mixing them raises an error rather than silently guessing. (Dynamic = type checked at runtime; strong = no surprise coercions.)

```python
"3" + 5     # TypeError — must convert explicitly
"3" + str(5)  # '35'
```
:::

## What are valid variable naming conventions? <Badge type="tip" text="easy" />

::: details View Answer
Start with a letter or underscore, then letters/digits/underscores; case-sensitive; can't be a keyword. Convention (PEP 8): `snake_case` for variables/functions, `UPPER_CASE` for constants, `CamelCase` for classes, leading `_` for "internal".
:::

## What's the difference between `None`, `False`, `0`, and `""`? <Badge type="warning" text="medium" />

::: details View Answer
They're distinct objects but all **falsy**. `None` is the absence of a value (`NoneType`); `False` is a boolean; `0` is an integer; `""` is an empty string. Use `is None` to check for None — not `== None` or truthiness, since `0`/`""`/`False` are also falsy.

```python
bool(None), bool(False), bool(0), bool("")   # all False
None == False                                 # False (different objects)
```
:::

## What's the difference between `id()`, `type()`, and `isinstance()`? <Badge type="warning" text="medium" />

::: details View Answer
`id(obj)` returns the object's unique identity; `type(obj)` returns its exact class; `isinstance(obj, Cls)` checks class membership including subclasses (preferred for type checks).

```python
id(x)                  # identity (memory address in CPython)
type(5)                # <class 'int'>
isinstance(True, int)  # True  (bool subclasses int)
type(True) == int      # False (exact type only)
```
:::

## How does Python handle cyclic references in memory management? <Badge type="danger" text="hard" />

::: details View Answer
While Python primarily relies on Reference Counting for memory management, reference counting cannot resolve cyclic references (e.g., object A points to object B, and object B points to object A). To solve this, Python includes a generational Garbage Collector (`gc` module) that runs periodically to detect and clean up isolated reference cycles.
:::

## What is the `weakref` module and when would you use it? <Badge type="danger" text="hard" />

::: details View Answer
The `weakref` module allows you to create weak references to objects. A weak reference does not increase the reference count of the object. It is primarily used for implementing caches or mappings of large objects where you don't want the cache to keep the objects alive in memory after they are no longer needed elsewhere, thus preventing memory leaks.
:::