# File Handling & Data Processing

> Add new questions below in the same format: `## Question? <Badge ... />` then the answer.

## How do you open and close a file? <Badge type="tip" text="easy" />

Use `open()` and always prefer a `with` block, which closes the file automatically even on error.

```python
with open("data.txt", "r") as f:
    content = f.read()
# file closed here
```

## What are the file opening modes? <Badge type="tip" text="easy" />

`r` read, `w` write (truncates), `a` append, `x` create-exclusive, `r+` read/write. Add `b` for binary (`rb`, `wb`) or `t` for text (default).

## How do you read and write data to a file? <Badge type="tip" text="easy" />

Read with `read()`, `readline()`, or iterate line by line (memory-friendly); write with `write()`/`writelines()`.

```python
with open("out.txt", "w") as f:
    f.write("line 1\n")

with open("out.txt") as f:
    for line in f:          # streams one line at a time
        print(line.strip())
```

## How do you read a CSV file? <Badge type="warning" text="medium" />

Use the `csv` module (`reader`/`DictReader`) or `pandas.read_csv` for analysis.

```python
import csv
with open("data.csv", newline="") as f:
    for row in csv.DictReader(f):
        print(row["name"])

import pandas as pd
df = pd.read_csv("data.csv")
```

## How does Python process JSON files? <Badge type="tip" text="easy" />

The `json` module converts between JSON and Python objects: `load`/`dump` for files, `loads`/`dumps` for strings.

```python
import json
with open("data.json") as f:
    data = json.load(f)            # JSON -> dict
with open("out.json", "w") as f:
    json.dump(data, f, indent=2)   # dict -> JSON
```

## How do you handle binary files? <Badge type="warning" text="medium" />

Open in binary mode (`rb`/`wb`); reads/writes use `bytes`. Useful for images, audio, or any non-text data.

```python
with open("image.png", "rb") as f:
    data = f.read()            # bytes
with open("copy.png", "wb") as f:
    f.write(data)
```

## What is pandas and how is it used? <Badge type="warning" text="medium" />

A data-analysis library built around the `DataFrame` (2D labeled table) and `Series` (1D). It handles loading, cleaning, filtering, grouping, and joining tabular data.

```python
import pandas as pd
df = pd.read_csv("sales.csv")
df[df["amount"] > 100].groupby("region")["amount"].sum()
```

## How do you process data in chunks with pandas? <Badge type="warning" text="medium" />

Pass `chunksize` to `read_csv` to get an iterator of smaller DataFrames — lets you process files bigger than memory.

```python
total = 0
for chunk in pd.read_csv("huge.csv", chunksize=100_000):
    total += chunk["amount"].sum()
```

## Why use NumPy arrays over nested Python lists? <Badge type="warning" text="medium" />

NumPy arrays are contiguous, fixed-type, and vectorized — far faster and more memory-efficient than lists for numeric work, with broadcasting and rich math operations.

```python
import numpy as np
a = np.array([1, 2, 3])
a * 2            # array([2, 4, 6]) — elementwise, no loop
```

## How do you use the `os` and `sys` modules? <Badge type="tip" text="easy" />

`os` interacts with the operating system (paths, env vars, directories); `sys` deals with the interpreter (argv, exit, path).

```python
import os, sys
os.getenv("HOME")
os.listdir(".")
sys.argv          # command-line arguments
sys.exit(1)
```

## `read()` vs `readlines()`? <Badge type="tip" text="easy" />

`read()` returns the whole file as one string; `readlines()` returns a list of lines (keeping `\n`). For big files, iterate the file object instead — it streams line by line.

```python
with open("f.txt") as f:
    text = f.read()        # 'line1\nline2\n'
with open("f.txt") as f:
    lines = f.readlines()  # ['line1\n', 'line2\n']
```

## How do you delete a file? <Badge type="tip" text="easy" />

`os.remove()` (or `pathlib.Path.unlink()`); check existence or catch `FileNotFoundError`.

```python
import os
if os.path.exists("temp.txt"):
    os.remove("temp.txt")
```

## How do you check if a file exists? <Badge type="tip" text="easy" />

`os.path.exists()` / `os.path.isfile()`, or `pathlib`.

```python
from pathlib import Path
Path("data.csv").exists()    # True / False
Path("data.csv").is_file()
```

## What is the `seek()` method for? <Badge type="warning" text="medium" />

Moves the file's read/write position. `seek(offset, whence)` — `whence` 0=start, 1=current, 2=end. `tell()` reports the current position.

```python
with open("f.txt") as f:
    f.seek(5)        # jump to byte 5
    f.read()         # read from there
    f.seek(0)        # back to start
```

## How do you handle file encoding? <Badge type="warning" text="medium" />

Pass `encoding=` to `open()` (default is UTF-8 on modern Python). Specify it explicitly for portability; handle bad bytes with `errors=`.

```python
with open("f.txt", encoding="utf-8") as f:
    text = f.read()
open("f.txt", encoding="latin-1", errors="replace")
```

## What is the `mmap` module for? <Badge type="danger" text="hard" />

Memory-maps a file so you can access it like a `bytes`/`bytearray` without loading it all into memory — great for random access to very large files and sharing memory between processes.

```python
import mmap
with open("big.bin", "r+b") as f:
    mm = mmap.mmap(f.fileno(), 0)
    mm[0:4]            # read bytes like a slice
    mm.close()
```

## How do you handle large JSON files efficiently? <Badge type="warning" text="medium" />

Don't `json.load` a huge file at once. Stream it with a library like `ijson` (incremental parsing), or use JSON Lines (one object per line) and process line by line.

```python
import json
with open("data.jsonl") as f:
    for line in f:           # one JSON object per line
        record = json.loads(line)
```

## How do you get the home directory (`~`)? <Badge type="tip" text="easy" />

`~` isn't auto-expanded — use `os.path.expanduser` (or `pathlib.Path.home()`).

```python
import os
os.path.expanduser("~")          # '/home/user'
os.path.expanduser("~/data.txt") # '/home/user/data.txt'

from pathlib import Path
Path.home()                      # PosixPath('/home/user')
```
