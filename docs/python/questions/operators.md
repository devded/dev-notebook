# Operators

> Add new questions below in the same format: `## Question? <Badge ... />` then the answer.

## What arithmetic operators are available? <Badge type="tip" text="easy" />

`+` add, `-` subtract, `*` multiply, `/` true division, `//` floor division, `%` modulo, `**` exponent.

```python
7 + 2    # 9
7 / 2    # 3.5
7 // 2   # 3
7 % 2    # 1
7 ** 2   # 49
```

## What's the difference between `/` and `//`? <Badge type="tip" text="easy" />

`/` is **true division** and always returns a float. `//` is **floor division** — it rounds down to the nearest whole number (toward negative infinity), keeping the operands' type.

```python
7 / 2     # 3.5
7 // 2    # 3
-7 // 2   # -4  (rounds toward -∞)
7.0 // 2  # 3.0 (float in, float out)
```

## What does the `%` operator do? <Badge type="tip" text="easy" />

Modulo — the remainder of a division. Handy for parity checks and wrapping values.

```python
10 % 3    # 1
10 % 2    # 0  (even)
```

## What does the `**` operator do? <Badge type="tip" text="easy" />

Exponentiation (power). Works with floats and negative/fractional exponents too.

```python
2 ** 10    # 1024
9 ** 0.5   # 3.0  (square root)
```

## What is operator precedence? <Badge type="warning" text="medium" />

The order operators are evaluated when an expression has several. Roughly: `**` → unary `-` → `*`,`/`,`//`,`%` → `+`,`-` → comparisons → `not` → `and` → `or`. Use parentheses to make intent explicit.

```python
2 + 3 * 4      # 14, not 20  (* before +)
(2 + 3) * 4    # 20
2 ** 3 ** 2    # 512  (** is right-associative: 2**(3**2))
```
