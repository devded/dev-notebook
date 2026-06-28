# Modules & Packages

> Add new questions below in the same format: `## Question? <Badge ... />` then the answer.

## How do you create a module? <Badge type="tip" text="easy" />

::: details View Answer
A module is just a `.py` file. Any functions, classes, or variables in it become importable from other files.

```python
# mymath.py
def add(a, b):
    return a + b

# main.py
import mymath
from mymath import add
print(mymath.add(2, 3))
```
:::

## What is a Python package? <Badge type="tip" text="easy" />

::: details View Answer
A package is a directory of modules. Historically it needed an `__init__.py` file (which runs on import and can expose a public API); namespace packages can omit it. Packages let you organize code into nested namespaces like `pkg.subpkg.module`.

```
mypackage/
├── __init__.py
├── core.py
└── utils/
    ├── __init__.py
    └── helpers.py
```
:::

## How does the module search path work? <Badge type="warning" text="medium" />

::: details View Answer
On import, Python searches `sys.path` in order: the script's directory, `PYTHONPATH` entries, then installation-dependent defaults (stdlib + `site-packages`). The first match wins.

```python
import sys
print(sys.path)        # list of search locations
```
:::

## What are Python namespaces? <Badge type="warning" text="medium" />

::: details View Answer
A namespace maps names to objects. Python keeps separate ones — built-in, global (module), and local (function) — searched via the LEGB rule. They prevent name clashes between modules.
:::

## How do you share global variables across modules? <Badge type="warning" text="medium" />

::: details View Answer
Put them in a dedicated config module and import it everywhere — all importers see the same object. Avoid `from config import x` (copies the reference); use `import config; config.x` so updates are visible.

```python
# config.py
settings = {}

# a.py
import config
config.settings["debug"] = True

# b.py
import config
print(config.settings)   # {'debug': True}
```
:::

## What does `if __name__ == "__main__":` do? <Badge type="tip" text="easy" />

::: details View Answer
When a file runs directly, its `__name__` is `"__main__"`; when imported, it's the module's name. This guard runs code only on direct execution, not on import — ideal for a script entry point or quick tests.

```python
def main():
    print("running directly")

if __name__ == "__main__":
    main()
```
:::

## How do you import modules? <Badge type="tip" text="easy" />

::: details View Answer
Several forms — import the whole module, specific names, with an alias, or (sparingly) everything.

```python
import math                 # math.sqrt(9)
from math import sqrt, pi   # sqrt(9)
import numpy as np          # alias
from math import *          # everything (avoid — pollutes namespace)
```
:::

## What are some core standard-library modules? <Badge type="tip" text="easy" />

::: details View Answer
A few frequently used built-in modules:

- `os` / `sys` — OS and interpreter interaction
- `math` / `random` — math and randomness
- `datetime` — dates and times
- `json` / `csv` / `xml` — data formats
- `re` — regular expressions
- `collections` / `itertools` / `functools` — data-structure and functional helpers
- `logging` — logging
- `sqlite3` — embedded database
- `subprocess` — run external programs
- `traceback` — extract/print stack traces
:::

## What is `__init__.py` for? <Badge type="tip" text="easy" />

::: details View Answer
It marks a directory as a (regular) package and runs on import, so it can initialize package state or define `__all__` to control `from pkg import *`. It may be empty. Modern namespace packages can omit it.
:::