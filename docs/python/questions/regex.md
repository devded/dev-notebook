# Regular Expressions

> Add new questions below in the same format: `## Question? <Badge ... />` then the answer.

## What are regular expressions and how are they used? <Badge type="warning" text="medium" />

::: details View Answer
Regex are patterns for matching/searching/extracting text, accessed via the `re` module. Core functions: `match` (start), `search` (anywhere), `findall` (all matches), `sub` (replace).

```python
import re
re.search(r"\d+", "abc123").group()   # '123'
re.findall(r"\w+", "a b c")           # ['a', 'b', 'c']
```
:::

## How do you compile a regular expression? <Badge type="tip" text="easy" />

::: details View Answer
`re.compile()` builds a reusable pattern object — more efficient when used many times.

```python
import re
pattern = re.compile(r"\d{3}-\d{4}")
pattern.search("call 555-1234").group()   # '555-1234'
```
:::

## Give examples of commonly used regex patterns <Badge type="warning" text="medium" />

::: details View Answer
```python
r"\d+"            # one or more digits
r"\w+"            # word characters
r"\s+"            # whitespace
r"^abc"           # starts with 'abc'
r"abc$"           # ends with 'abc'
r"[A-Za-z]+"      # letters only
r"\b\w+@\w+\.\w+\b"   # simple email
```
:::

## How do you replace text using regex? <Badge type="tip" text="easy" />

::: details View Answer
Use `re.sub(pattern, replacement, text)`; backreferences like `\1` reference captured groups.

```python
import re
re.sub(r"\s+", " ", "too   many    spaces")   # 'too many spaces'
re.sub(r"(\w+)@(\w+)", r"\2.\1", "user@host")  # 'host.user'
```
:::

## When should you use regex, and when avoid it? <Badge type="warning" text="medium" />

::: details View Answer
Use regex for genuine pattern matching (validation, extraction, tokenizing). Avoid it for simple fixed-string work (use `str` methods like `in`, `split`, `replace`) and for structured formats like HTML/JSON/XML — use a real parser instead.
:::