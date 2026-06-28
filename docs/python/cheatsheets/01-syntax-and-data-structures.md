# Python: Syntax and Data Structures

## 1. Basics

### Variables & Core Types
| Type | Example | Description |
|---|---|---|
| `int` | `x = 42` | Integer number |
| `float` | `y = 3.14` | Floating point number |
| `complex` | `z = 1 + 2j` | Complex number |
| `bool` | `is_valid = True` | Boolean (`True` or `False`) |
| `str` | `name = "Alice"` | String of characters |
| `NoneType`| `val = None` | Null value |

### Comments & Type Hinting
```python
# Single line comment
''' Multi-line
    string/comment '''

# Type hinting (Python 3.5+)
age: int = 25
def greet(name: str) -> str:
    return f"Hello, {name}"
```

---

## 2. Operators

| Category | Operators | Example |
|---|---|---|
| Arithmetic | `+`, `-`, `*`, `/`, `//` (floor), `%` (mod), `**` (pow) | `10 // 3 == 3` |
| Comparison | `==`, `!=`, `>`, `<`, `>=`, `<=` | `5 != 3` |
| Logical | `and`, `or`, `not` | `True and not False` |
| Identity | `is`, `is not` | `x is None` |
| Membership | `in`, `not in` | `'a' in 'abc'` |
| Bitwise | `&`, `|`, `^`, `~`, `<<`, `>>` | `1 << 2 == 4` |

---

## 3. Control Flow

### Conditionals
```python
if x > 0:
    print("Positive")
elif x == 0:
    print("Zero")
else:
    print("Negative")

# Ternary operator
status = "Adult" if age >= 18 else "Minor"

# Structural Pattern Matching (Python 3.10+)
match status:
    case 200: print("OK")
    case 404: print("Not Found")
    case _: print("Unknown")
```

### Loops
```python
# for loop
for i in range(5):        # 0 to 4
    if i == 2: continue   # Skip 2
    if i == 4: break      # Exit loop

# while loop
while x > 0:
    x -= 1
```

---

## 4. Built-in Data Structures

### Lists (Mutable, Ordered)
```python
lst = [1, 2, 3, "a", "b"]
lst.append(4)             # [1, 2, 3, "a", "b", 4]
lst.insert(1, "x")        # Insert "x" at index 1
lst.pop()                 # Removes and returns last item
lst.remove("a")           # Removes first occurrence of "a"

# Slicing: lst[start:stop:step]
lst[1:4]                  # Items from index 1 to 3
lst[::-1]                 # Reversed list
```

### Tuples (Immutable, Ordered)
```python
tup = (1, 2, 3)
single_tup = (1,)         # Comma required for single element
a, b, c = tup             # Unpacking (a=1, b=2, c=3)
```

### Dictionaries (Mutable, Key-Value, Ordered in 3.7+)
```python
dic = {"a": 1, "b": 2}
dic["c"] = 3              # Add/Update
val = dic.get("d", 0)     # Returns 0 if key not found
dic.pop("a")              # Removes key "a" and returns value

keys = dic.keys()         # View object of keys
values = dic.values()     # View object of values
items = dic.items()       # View object of (key, value) tuples
```

### Sets (Mutable, Unordered, Unique Elements)
```python
s1 = {1, 2, 3}
s2 = set([3, 4, 5])
s1.add(6)                 # {1, 2, 3, 6}

# Set Operations
union = s1 | s2           # {1, 2, 3, 4, 5, 6}
intersect = s1 & s2       # {3}
diff = s1 - s2            # {1, 2, 6}
sym_diff = s1 ^ s2        # {1, 2, 4, 5, 6}
```

---

## 5. Comprehensions

| Type | Syntax | Example |
|---|---|---|
| List | `[expr for item in iter if cond]` | `[x**2 for x in range(5) if x % 2 == 0]` |
| Dictionary| `{k: v for item in iter}` | `{x: x**2 for x in range(3)}` |
| Set | `{expr for item in iter}` | `{x % 2 for x in range(10)}` |
| Generator | `(expr for item in iter)` | `(x**2 for x in range(100))` |

---

## 6. Functions & Arguments

```python
# Default arguments & variable arguments
def func(a, b=2, *args, **kwargs):
    print(a, b)           # Regular args
    print(args)           # Tuple of positional args
    print(kwargs)         # Dict of keyword args

func(1, 3, 4, 5, x=10, y=20)
# Output: 1 3 \n (4, 5) \n {'x': 10, 'y': 20}

# Lambda (Anonymous) Functions
square = lambda x: x ** 2
res = square(5)           # 25
```
