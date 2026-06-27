# Strings & Built-ins

> Add new questions below in the same format: `## Question? <Badge ... />` then the answer.

## What is a string in Python? <Badge type="tip" text="easy" />

An immutable sequence of Unicode characters. "Modifying" methods like `upper()`, `replace()`, `split()` return **new** strings — the original never changes.

```python
s = "hello"
s.upper()     # 'HELLO' (new string)
print(s)      # 'hello' (unchanged)
```

## How does string formatting work (`%s`, `.format`, f-strings)? <Badge type="tip" text="easy" />

Three styles; f-strings are the modern default.

```python
name, n = "Sam", 3
"hi %s, %d times" % (name, n)        # %-formatting (C-style)
"hi {}, {} times".format(name, n)    # str.format
f"hi {name}, {n} times"              # f-string (preferred)
```

## What are the common string methods? <Badge type="tip" text="easy" />

```python
"a,b,c".split(",")     # ['a', 'b', 'c']
" ".join(["a", "b"])   # 'a b'
"  hi  ".strip()        # 'hi'  (rstrip/lstrip for one side)
"hello".replace("l", "L")  # 'heLLo'
"lEaRn".title()         # 'Learn'  (capitalize each word)
"abc".upper()           # 'ABC'
"Python".isalpha()      # True   (all letters?)
```

## What do `chr()` and `ord()` do? <Badge type="tip" text="easy" />

`ord()` gives a character's Unicode code point; `chr()` does the reverse.

```python
ord("z")     # 122
chr(122)     # 'z'
```

## What does `len()` do? <Badge type="tip" text="easy" />

Returns the number of items in a container or characters in a string.

```python
len("techbeamers")   # 11
len([1, 2, 3])        # 3
```

## What is negative indexing? <Badge type="tip" text="easy" />

Negative indices count from the end: `-1` is the last item, `-2` the second-to-last. Works on strings, lists, and tuples.

```python
s = "Program"
s[-1]      # 'm'
s[-2]      # 'a'
s[::-1]    # 'margorP'  (reverse)
```

## What is whitespace in Python? <Badge type="tip" text="easy" />

Characters that add spacing — space `" "`, tab `"\t"`, newline `"\n"`. It's significant in Python because **indentation** (whitespace) defines code blocks.

## How do you convert a number to a string (and bases)? <Badge type="tip" text="easy" />

`str()` for the decimal text; `oct()`, `hex()`, `bin()` for other bases.

```python
str(255)    # '255'
hex(255)    # '0xff'
oct(8)      # '0o10'
bin(5)      # '0b101'
```

## How do you generate random numbers? <Badge type="tip" text="easy" />

The `random` module: `random()` (float 0–1), `uniform(a, b)` (float in range), `randint(a, b)` (inclusive int).

```python
import random
random.random()         # e.g. 0.37
random.uniform(1, 10)   # e.g. 6.42
random.randint(1, 6)    # dice roll
random.choice([1, 2, 3])
```

## How do you shuffle a list in place? <Badge type="tip" text="easy" />

`random.shuffle()` reorders the list randomly in place.

```python
import random
items = [1, 2, 3, 4]
random.shuffle(items)   # items now in random order
```

## How do you concatenate strings? <Badge type="tip" text="easy" />

`+` for a couple of strings, but use `"".join()` for many (avoids creating lots of intermediate strings in a loop). f-strings combine text and values cleanly.

```python
"foo" + "bar"            # 'foobar'
" ".join(["a", "b"])     # 'a b'  (efficient for many)
name = "Sam"; f"hi {name}"
```

## Explain Unicode and UTF-8 support in Python. <Badge type="warning" text="medium" />

In Python 3, `str` is a sequence of **Unicode** code points, so text in any language works natively. `bytes` is raw binary. Convert between them with `encode`/`decode` — UTF-8 is the usual encoding.

```python
s = "café"
b = s.encode("utf-8")    # b'caf\xc3\xa9'  (bytes)
b.decode("utf-8")        # 'café'          (back to str)
```
