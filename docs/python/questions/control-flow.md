# Control Flow

> Add new questions below in the same format: `## Question? <Badge ... />` then the answer.
> See also `for`/`while` loops and `pass`/`break`/`continue` in [Basics](./basics).

## Explain `if`, `elif`, and `else`. <Badge type="tip" text="easy" />

::: details View Answer
`if` runs a block when its condition is truthy; `elif` adds more conditions checked in order; `else` runs when none matched. Only the first matching branch executes.

```python
if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
else:
    grade = "C"
```
:::

## What is the `for...else` construct? <Badge type="warning" text="medium" />

::: details View Answer
The `else` block after a `for` loop runs **only if the loop finished without hitting `break`** — handy for search loops.

```python
for n in nums:
    if n == target:
        print("found")
        break
else:
    print("not found")   # runs only if no break
```
:::

## What is the `while...else` construct? <Badge type="warning" text="medium" />

::: details View Answer
Same idea: the `else` runs when the `while` condition becomes false normally, but is skipped if the loop is `break`-ed out of.

```python
while attempts < 3:
    if try_login():
        break
    attempts += 1
else:
    print("locked out")   # only if never broke
```
:::

## What mistakes happen when modifying a collection while iterating it? <Badge type="danger" text="hard" />

::: details View Answer
Adding/removing items from a list or dict *during* iteration can skip elements or raise `RuntimeError: dictionary changed size during iteration`. Iterate over a **copy**, or build a new collection.

```python
# BAD — skips/raises
for x in items:
    if cond(x):
        items.remove(x)

# GOOD
items = [x for x in items if not cond(x)]   # new list
for k in list(d):                            # iterate a copy of keys
    if drop(k):
        del d[k]
```
:::