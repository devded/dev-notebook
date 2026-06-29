# Strings & Text

## 1. What does it mean that `String` is immutable, and why was it designed that way? <Badge type="tip" text="easy" />

::: details View Answer
A `String`'s internal character data cannot change after construction; every "modifying" method (`substring`, `toUpperCase`, `replace`) returns a **new** `String`.

Reasons for immutability:
- **String pool sharing** — literals can be safely cached and reused only if no one can mutate them.
- **Thread safety** — immutable objects are inherently safe to share across threads.
- **Security** — strings are used for file paths, URLs, class names, credentials; immutability prevents a value from being changed after a security check.
- **Hashcode caching** — `String` caches its hash, valid only because the contents never change, making it an excellent `HashMap` key.
:::

## 2. How does the String pool work and what does `intern()` do? <Badge type="warning" text="medium" />

::: details View Answer
The string pool (a.k.a. string table) is a JVM-managed set of canonical `String` instances. All compile-time string **literals** are automatically interned, so identical literals refer to the same object:

```java
String a = "hi";
String b = "hi";
a == b;            // true — same pooled instance

String c = new String("hi");
a == c;            // false — new() forces a fresh heap object
a == c.intern();   // true — intern() returns the pooled canonical instance
```

`intern()` returns the pooled instance equal to the string (adding it if absent). Since Java 7 the pool lives in the heap (not PermGen), so interned strings are garbage-collected normally. Manual interning is rarely worth it — it trades CPU for memory savings only when you have massive numbers of duplicate strings.
:::

## 3. Compare `String`, `StringBuilder`, and `StringBuffer`. <Badge type="tip" text="easy" />

::: details View Answer
| Type | Mutable | Thread-safe | Notes |
|------|---------|-------------|-------|
| `String` | No | Yes (immutable) | New object per modification |
| `StringBuilder` | Yes | No | Fastest; use for local building |
| `StringBuffer` | Yes | Yes (synchronized) | Legacy; lock overhead per call |

Use `StringBuilder` for almost all mutable string construction. `StringBuffer` is rarely justified — true concurrent appends to one buffer are uncommon, and when needed there are usually better designs. `String` is for fixed values and keys.
:::

## 4. Why is repeated `+` concatenation in a loop a performance problem, and what's the fix? <Badge type="warning" text="medium" />

::: details View Answer
Each `+` on `String` produces a brand-new object and copies all previous characters, making concatenation in a loop **O(n²)** in time and garbage:

```java
String s = "";
for (String w : words) s += w;   // quadratic — avoid
```

Fix with an explicit `StringBuilder` (linear time):

```java
var sb = new StringBuilder();
for (String w : words) sb.append(w);
String s = sb.toString();
```

Note: a *single* expression like `a + b + c` is fine — the compiler optimizes it. In modern JDKs (9+) this compiles to an `invokedynamic` call backed by `StringConcatFactory`, which the JVM can optimize at runtime. The problem is specifically **separate `+=` statements across loop iterations**, which the compiler cannot fuse.
:::

## 5. What is the difference between `==` and `.equals()` for strings? <Badge type="tip" text="easy" />

::: details View Answer
- `==` compares **references** — whether two variables point to the same object.
- `.equals()` compares **content** — character-by-character equality.

```java
String a = new String("x");
String b = new String("x");
a == b;        // false (different objects)
a.equals(b);   // true  (same characters)
```

Always use `.equals()` for value comparison. To be null-safe, call it on a known-non-null side or use `Objects.equals(a, b)`. Use `equalsIgnoreCase` for case-insensitive comparison. Relying on `==` "working" for literals is a bug waiting to happen the moment a value comes from `new`, I/O, or concatenation at runtime.
:::

## 6. How does Java represent characters internally, and what's the difference between a `char` and a code point? <Badge type="danger" text="hard" />

::: details View Answer
Java strings are UTF-16: each `char` is a 16-bit code unit. Characters in the Basic Multilingual Plane fit in one `char`, but **supplementary** characters (emoji, some CJK, 𝕏-style math symbols) need a *surrogate pair* — two `char`s representing one Unicode **code point**.

Consequences:
- `"😀".length()` returns **2**, not 1, because the emoji is two code units.
- `charAt(i)` may return half a surrogate pair.
- Use code-point-aware APIs: `codePointAt`, `codePointCount`, `String.chars()` vs `String.codePoints()`, and iterate with `codePoints()` when correctness over non-BMP text matters.

```java
"😀".length();              // 2 (code units)
"😀".codePointCount(0, 2);  // 1 (code points)
```

Since Java 9, `String` uses **compact strings**: a Latin-1 byte[] backing for strings that contain only ISO-8859-1 chars, halving memory, switching to UTF-16 only when needed.
:::

## 7. What charset issues arise when converting between `String` and `byte[]`? <Badge type="warning" text="medium" />

::: details View Answer
`String.getBytes()` and `new String(byte[])` use the **platform default charset** unless you specify one — a classic source of "works on my machine" bugs and corrupted text across systems.

**Always specify the charset explicitly**, preferably `StandardCharsets.UTF_8`:

```java
byte[] data = s.getBytes(StandardCharsets.UTF_8);
String s = new String(data, StandardCharsets.UTF_8);
```

Note that Java 18 (JEP 400) changed the **default** charset to UTF-8 across the board, which removes much of the inconsistency, but explicit charsets remain best practice for portability and clarity. Invalid byte sequences are silently replaced with `�` (U+FFFD) by these constructors; use `CharsetDecoder` if you need to detect/reject malformed input.
:::

## 8. What are text blocks and how do they handle indentation and newlines? <Badge type="warning" text="medium" />

::: details View Answer
Text blocks (standard in Java 15) are multi-line string literals delimited by `"""`:

```java
String json = """
    {
        "name": "Ada",
        "active": true
    }
    """;
```

- **Incidental whitespace** — the compiler finds the minimal common leading indentation across all non-blank lines (and the closing `"""` line) and strips it, so you can indent the block to match your code.
- The opening `"""` must be followed by a newline; the content starts on the next line.
- A trailing newline is included unless the closing `"""` is on the last content line.
- Escapes: `\` at end of line suppresses the newline (line continuation); `\s` is a literal space that also prevents trailing-whitespace stripping.

Text blocks are still ordinary `String`s — no new type, and they're interned like other literals.
:::

## 9. What's the difference between `String.format`, `formatted`, and `printf`? <Badge type="tip" text="easy" />

::: details View Answer
All use the same `java.util.Formatter` syntax:

```java
String.format("%s is %d", name, age);     // returns a String
"%s is %d".formatted(name, age);          // Java 15+, instance method, same result
System.out.printf("%s is %d%n", name, age); // writes to stdout, returns the stream
```

Common conversions: `%s` (string), `%d` (decimal int), `%f` (float, e.g. `%.2f`), `%x` (hex), `%n` (platform newline), `%b` (boolean). You can use argument indices (`%1$s`) and width/precision flags. For locale-sensitive output pass a `Locale` as the first argument; otherwise the default locale is used, which can surprise you (e.g., decimal comma vs point).
:::

## 10. List the most useful `String` methods a senior developer reaches for. <Badge type="tip" text="easy" />

::: details View Answer
- **Inspection:** `isEmpty()`, `isBlank()` (Java 11, whitespace-only), `length()`, `contains()`, `indexOf()`, `startsWith()`, `endsWith()`.
- **Transformation:** `strip()`/`stripLeading()`/`stripTrailing()` (Unicode-aware, Java 11; prefer over `trim()`), `toUpperCase(Locale)`, `replace()`, `repeat(n)` (Java 11).
- **Splitting/joining:** `split(regex)`, `String.join(delim, parts)`, `lines()` (Java 11, stream of lines).
- **Slicing:** `substring()`, `charAt()`, `chars()`/`codePoints()`.
- **Java 12+:** `indent(n)`, `transform(fn)` to apply a function fluently.

Prefer `strip()` over `trim()` (trim only removes ≤ U+0020) and `isBlank()` over manual whitespace checks.
:::

## 11. What does `String.split` do with trailing empty strings and regex metacharacters? <Badge type="danger" text="hard" />

::: details View Answer
Two gotchas:

1. **The argument is a regex**, not a literal. Splitting on `.` or `|` requires escaping: `s.split("\\.")`. Forgetting this is a frequent bug.
2. **Trailing empty strings are removed** by default (limit `0`):
   ```java
   "a,b,,".split(",")        // ["a", "b"]   — trailing empties dropped
   "a,b,,".split(",", -1)    // ["a","b","",""] — negative limit keeps them
   ```

For simple single-character delimiters, performance-sensitive code can avoid regex compilation; modern JDKs special-case single-char patterns. For purely literal splitting consider `Pattern.compile(Pattern.quote(delim))` reused across calls, or a manual loop.
:::

## 12. How do you compile and reuse regular expressions efficiently? <Badge type="warning" text="medium" />

::: details View Answer
Methods like `String.matches`, `replaceAll`, and `split` **recompile** the pattern on every call. In hot paths, compile once and reuse a `Pattern` (it is thread-safe; `Matcher` is not):

```java
private static final Pattern EMAIL =
    Pattern.compile("^[\\w.+-]+@[\\w-]+\\.[\\w.-]+$");

boolean valid = EMAIL.matcher(input).matches();
```

`Pattern.matches()` anchors implicitly (the whole input must match), whereas `Matcher.find()` searches for any substring match. Use named groups `(?<name>...)` and `matcher.group("name")` for readability. Be aware of **catastrophic backtracking** with nested quantifiers on untrusted input — a ReDoS risk; prefer possessive quantifiers or atomic groups, or bound input length.
:::

## 13. What is the difference between greedy, reluctant, and possessive quantifiers in regex? <Badge type="danger" text="hard" />

::: details View Answer
- **Greedy** (`*`, `+`, `?`, `{n,m}`) — match as much as possible, then backtrack as needed.
- **Reluctant/lazy** (`*?`, `+?`) — match as little as possible, expanding only when forced. Useful to avoid over-matching, e.g. `<.+?>` to match a single tag.
- **Possessive** (`*+`, `++`) — match as much as possible and **never backtrack**. They can dramatically improve performance and prevent catastrophic backtracking, at the cost of failing some matches a greedy quantifier would find.

```java
"<a><b>".replaceAll("<.+>",  "X"); // "X"      greedy spans everything
"<a><b>".replaceAll("<.+?>", "X"); // "XX"     lazy matches each tag
```
:::

## 14. Why must `String` make a good `HashMap` key, and how does its hashCode behave? <Badge type="warning" text="medium" />

::: details View Answer
`String` is an ideal key because it's immutable (its hash can't change after insertion) and overrides both `equals` and `hashCode` consistently. `String` **caches** its hash code in a field after first computation:

```java
// effectively: h = 31*h + value[i], over all chars
```

The polynomial `31`-based formula is fast (`31*h` compiles to a shift-subtract) and reasonably distributes typical text. Caching means repeated lookups don't recompute. Caveat: the cached hash is `0` for the empty string and is recomputed each time for strings that genuinely hash to `0`, but that's negligible. Because the algorithm is public and predictable, untrusted keys can be crafted to collide (hash-flooding DoS) — modern `HashMap` mitigates this by treeifying long buckets.
:::

## 15. What's the difference between `chars()` and `codePoints()`, and when does it matter? <Badge type="warning" text="medium" />

::: details View Answer
Both return an `IntStream`, but:
- `chars()` yields UTF-16 **code units** (each `char`), so a surrogate pair appears as two values.
- `codePoints()` yields full Unicode **code points**, correctly treating a surrogate pair as one value.

```java
"a😀b".chars().count();       // 4 (a, hi-surrogate, lo-surrogate, b)
"a😀b".codePoints().count();  // 3 (a, 😀, b)
```

Use `codePoints()` whenever you process text that may contain emoji or supplementary characters — counting, filtering, or transforming per "character". For pure ASCII either works, but defaulting to `codePoints()` avoids subtle bugs.
:::

## 16. How do you reverse a string correctly, including emoji? <Badge type="danger" text="hard" />

::: details View Answer
`new StringBuilder(s).reverse()` is the common answer, and it *does* handle surrogate pairs (it reverses code units but keeps valid pairs together). However, it does **not** preserve grapheme clusters — combining marks or emoji with modifiers (skin tones, ZWJ sequences like 👨‍👩‍👧) get split apart, producing garbage.

For human-correct reversal you must break on **grapheme boundaries** using `java.text.BreakIterator`:

```java
BreakIterator it = BreakIterator.getCharacterInstance();
it.setText(s);
// collect each grapheme cluster, then reverse the list of clusters
```

The lesson: "a character" in Unicode has three meanings — code unit, code point, grapheme — and the right one depends on the task.
:::

## 17. What happens to memory when you call `substring()`? <Badge type="warning" text="medium" />

::: details View Answer
Historically (before Java 7u6), `substring()` shared the **same backing char array** as the original, with an offset and count. This meant a small substring could keep a huge parent string alive — a notorious memory leak.

Since Java 7u6, `substring()` **copies** the relevant characters into a new array, so the substring is independent and the parent can be collected. The trade-off is that substring is now O(n) in the length of the result and allocates, but it eliminates the leak. So today you no longer need the `new String(s.substring(...))` workaround.
:::

## 18. How does `StringBuilder` capacity and resizing work, and how can you optimize it? <Badge type="warning" text="medium" />

::: details View Answer
`StringBuilder` wraps a growable array. The default capacity is 16 chars; when full, it grows (typically doubling plus two), copying the contents — an amortized-O(1) but allocation-heavy operation.

Optimization: if you know the approximate final size, pre-size it:

```java
var sb = new StringBuilder(expectedLength);
```

This avoids repeated array reallocations and copies. Other tips: chain `append` calls (each returns `this`), use `append(char)` over `append(String)` for single characters, and call `toString()` only once at the end. Avoid `setLength`/`insert(0, ...)` in loops, which can cause large copies.
:::

## 19. What are common pitfalls with locale-sensitive case conversion? <Badge type="danger" text="hard" />

::: details View Answer
`toUpperCase()`/`toLowerCase()` are **locale-dependent**. The infamous example is Turkish: in the Turkish locale, lowercasing `"I"` produces a dotless `"ı"`, not `"i"`. So:

```java
"TITLE".toLowerCase()   // "title" in en, but "tıtle" in tr locale!
```

This breaks case-insensitive comparisons for protocol keywords, file extensions, or identifiers when the JVM runs under an unexpected default locale. **Always pass an explicit locale** for machine-facing logic:

```java
s.toUpperCase(Locale.ROOT);
```

Use `Locale.ROOT` for locale-neutral processing and the user's locale only for display text. Similarly, prefer `equalsIgnoreCase` (which is locale-neutral) over manual lowercasing for comparisons.
:::

## 20. How does string concatenation actually compile in modern Java (`invokedynamic`)? <Badge type="danger" text="hard" />

::: details View Answer
Before Java 9, `a + b + c` compiled to explicit `StringBuilder.append` chains. Since Java 9 (JEP 280), the compiler emits a single `invokedynamic` instruction that links to `StringConcatFactory` at first execution.

Benefits:
- The concatenation *strategy* is decided at runtime, not baked into bytecode, so the JDK can improve it without recompiling user code.
- The default strategy builds the result with a precomputed length and a single allocation, avoiding intermediate `StringBuilder` resizing — often faster and producing less garbage than the old approach.

This is why a single multi-operand `+` expression is fine and you should **not** manually rewrite it into `StringBuilder`. The optimization does **not** apply across separate statements (e.g., `+=` in a loop), where you still need an explicit `StringBuilder`.
:::

## 21. What is the difference between `isEmpty()`, `isBlank()`, and `strip()` vs `trim()`? <Badge type="tip" text="easy" />

::: details View Answer
- `isEmpty()` — true only when `length() == 0`.
- `isBlank()` (Java 11) — true when empty **or** contains only whitespace (Unicode-aware).
- `trim()` — removes leading/trailing characters with code ≤ U+0020 (legacy, ASCII-oriented).
- `strip()` (Java 11) — removes leading/trailing **Unicode** whitespace correctly (handles non-breaking spaces and other Unicode whitespace that `trim` misses).

Prefer `isBlank()` and `strip()` in modern code for correct handling of international whitespace.
:::

## 22. How would you efficiently check if a large set of strings contains duplicates or do bulk lookups? <Badge type="warning" text="medium" />

::: details View Answer
Use a `HashSet<String>` for O(1) average membership tests and duplicate detection:

```java
Set<String> seen = new HashSet<>();
for (String s : input) {
    if (!seen.add(s)) { /* duplicate found */ }
}
```

`add` returns `false` if the element was already present, combining insert and check. For huge datasets where exact membership memory is a concern, a **Bloom filter** trades a tunable false-positive rate for drastically lower memory. For prefix queries (autocomplete) a **trie** is appropriate. Avoid `List.contains` in a loop — that's O(n²). Interning is generally not worth it unless duplicate density is extreme.
:::
