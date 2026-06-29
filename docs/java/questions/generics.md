# Generics

## 1. What are generics and what problems do they solve? <Badge type="tip" text="easy" />

::: details View Answer
Generics (Java 5+) let you parameterize types over types, enabling type-safe containers and algorithms without casting.

Problems solved:
- **Compile-time type safety:** Errors that were previously runtime `ClassCastException`s become compile errors.
- **No manual casts:** The compiler inserts casts for you.
- **Reusable, expressive APIs:** One implementation works for many element types.

```java
List<String> names = new ArrayList<>();
names.add("a");
String s = names.get(0); // no cast, guaranteed String
// names.add(42);        // compile error
```

Before generics you stored `Object` and cast on retrieval, deferring failures to runtime.
:::

## 2. How do you declare a generic class? <Badge type="tip" text="easy" />

::: details View Answer
A type parameter is declared in angle brackets after the class name and can be used throughout the class body.

```java
public class Box<T> {
    private T value;
    public void set(T value) { this.value = value; }
    public T get() { return value; }
}

Box<Integer> b = new Box<>(); // diamond infers Integer
```

Conventions: `T` (type), `E` (element), `K`/`V` (key/value), `R` (result), `N` (number). A class can have multiple parameters: `class Pair<A, B>`. Type parameters are scoped to the class and cannot be used in `static` fields/methods (since statics are shared across all parameterizations).
:::

## 3. What is a generic method and how does type inference work for it? <Badge type="warning" text="medium" />

::: details View Answer
A generic method declares its own type parameters **before** the return type, independent of any class-level parameters.

```java
public static <T> T firstOrNull(List<T> list) {
    return list.isEmpty() ? null : list.get(0);
}

public static <K, V> Map<V, K> invert(Map<K, V> in) { ... }
```

The compiler infers type arguments from the call-site arguments and the target type, so you rarely specify them. When inference fails or is ambiguous, you can supply an explicit witness:

```java
List<String> empty = Collections.<String>emptyList();
```

Generic methods are useful even in non-generic classes (e.g. most `Collections`/`Arrays` utilities).
:::

## 4. What are bounded type parameters? <Badge type="warning" text="medium" />

::: details View Answer
A bound restricts the types that can be substituted, using `extends` (works for both classes and interfaces).

```java
public static <T extends Comparable<T>> T max(List<T> list) {
    T best = list.get(0);
    for (T x : list) if (x.compareTo(best) > 0) best = x;
    return best;
}
```

Within the method, `T` is known to have `Comparable`'s API, so you can call `compareTo`.

**Multiple bounds** use `&`; if a class is among them it must come first:
```java
<T extends Number & Comparable<T>> ...
```

There is no lower bound (`super`) on type *parameters* — lower bounds only exist on wildcards.
:::

## 5. What are wildcards, and what is the difference between `?`, `? extends T`, and `? super T`? <Badge type="warning" text="medium" />

::: details View Answer
Wildcards represent an unknown type at the **use site** (in variable/parameter types), not the declaration site.

- **`<?>` unbounded:** "some unknown type." You can read elements as `Object` and call non-type-dependent methods, but cannot add anything except `null`.
- **`<? extends T>` upper-bounded:** "T or a subtype." A **producer** you read `T` from; you cannot add (except `null`) because the exact subtype is unknown.
- **`<? super T>` lower-bounded:** "T or a supertype." A **consumer** you write `T` into; reading yields only `Object`.

```java
List<? extends Number> producer = List.of(1, 2.0);
Number n = producer.get(0);   // OK to read
// producer.add(3);           // compile error

List<? super Integer> consumer = new ArrayList<Number>();
consumer.add(42);             // OK to write
// Integer i = consumer.get(0); // compile error (only Object)
```
:::

## 6. What is the PECS principle? <Badge type="warning" text="medium" />

::: details View Answer
**PECS = "Producer Extends, Consumer Super."** It guides wildcard choice in API design:

- If a parameter **produces** values you read out, use `? extends T`.
- If a parameter **consumes** values you write in, use `? super T`.
- If it does both, use an exact type `T` (no wildcard).

The canonical example is a copy method:
```java
public static <T> void copy(List<? extends T> src,  // producer
                            List<? super T> dest) {  // consumer
    for (T t : src) dest.add(t);
}
```

This lets `copy(List<Integer>, List<Number>)` compile, maximizing flexibility for callers while preserving type safety inside the method.
:::

## 7. What is type erasure? <Badge type="danger" text="hard" />

::: details View Answer
Generics are a **compile-time** feature. The compiler checks types, then **erases** them so the bytecode contains no generic type information — this preserves backward compatibility with pre-generics code.

During erasure the compiler:
- Replaces each type parameter with its **leftmost bound** (or `Object` if unbounded). `T` → `Object`, `T extends Number` → `Number`.
- Inserts **synthetic casts** where values are read out.
- Generates **bridge methods** to preserve polymorphism after erasure.

```java
List<String> a = new ArrayList<>();
List<Integer> b = new ArrayList<>();
System.out.println(a.getClass() == b.getClass()); // true - both ArrayList
```

So at runtime `List<String>` and `List<Integer>` are the same class. This is why much "generic" reflection requires extra machinery.
:::

## 8. What are the practical consequences and limitations of type erasure? <Badge type="danger" text="hard" />

::: details View Answer
Because type arguments vanish at runtime, you **cannot**:

- Use `instanceof` with a parameterized type: `x instanceof List<String>` is illegal (only `List<?>`).
- Create an instance of a type parameter: `new T()` is illegal.
- Create arrays of a parameterized/parameter type: `new T[10]` and `new List<String>[10]` are illegal.
- Have overloads that differ only by type argument — `m(List<String>)` and `m(List<Integer>)` erase to the same signature.
- Catch or throw a generic exception type.
- Reference type parameters in `static` context.

```java
// All illegal:
// if (obj instanceof List<String>) {}
// T t = new T();
// T[] arr = new T[5];
```

Workarounds typically pass a `Class<T>` token or a `Supplier<T>` factory.
:::

## 9. How does the `Class<T>` token pattern work around erasure? <Badge type="danger" text="hard" />

::: details View Answer
Since `T` is erased, you pass a runtime representation of the type — a `Class<T>` object — so the method can do reflection, casts, or instantiation.

```java
public static <T> T fromJson(String json, Class<T> type) {
    T obj = type.cast(parse(json, type)); // type.cast replaces unchecked cast
    return obj;
}
List<User> u = ...; // call: fromJson(s, User.class)
```

This "type token" pattern appears throughout the JDK (`Class.cast`, `EnumMap`, `Arrays.newInstance`). For **generic** types (e.g. `List<User>`) a single `Class` is insufficient, so frameworks use a `TypeReference`/`super type token` trick — a subclassed generic whose type argument is recoverable via `getGenericSuperclass()`.
:::

## 10. Why are Java generics invariant, and how does that differ from arrays? <Badge type="danger" text="hard" />

::: details View Answer
Generics are **invariant**: `List<String>` is **not** a subtype of `List<Object>`, even though `String` is a subtype of `Object`.

This is deliberate type safety. If it were allowed:
```java
List<String> ls = new ArrayList<>();
List<Object> lo = ls;   // illegal - and for good reason
lo.add(42);             // would corrupt ls with an Integer
String s = ls.get(0);   // ClassCastException at runtime
```

Arrays, by contrast, are **covariant** (`String[]` *is* `Object[]`), so the above compiles for arrays but throws `ArrayStoreException` at runtime — the check is deferred to runtime rather than caught by the compiler. Wildcards (`? extends`/`? super`) let you opt into controlled covariance/contravariance where safe.
:::

## 11. What are raw types and why should you avoid them? <Badge type="warning" text="medium" />

::: details View Answer
A **raw type** is a generic type used without type arguments, e.g. `List` instead of `List<String>`. It exists only for backward compatibility with pre-Java-5 code.

```java
List raw = new ArrayList(); // raw type
raw.add("hello");
raw.add(42);                // no compile error
String s = (String) raw.get(1); // ClassCastException at runtime
```

Problems:
- You lose all compile-time type checking; errors surface as runtime `ClassCastException`.
- Using a raw type **disables generics for the entire object**, including unrelated methods, producing "unchecked" warnings.

Use `List<?>` when you genuinely don't care about the element type — it stays type-safe (you can't add arbitrary elements). Never use raw types in new code.
:::

## 12. Why can't you create a generic array, and how do you work around it? <Badge type="danger" text="hard" />

::: details View Answer
`new T[n]` and `new List<String>[n]` are illegal because arrays are **reified** (carry their element type at runtime for `ArrayStoreException` checks) while generics are **erased**. A generic array would be unable to perform that runtime check, breaking type safety.

Workarounds:
```java
// 1. Create Object[] and cast (unchecked warning, but common in libraries):
@SuppressWarnings("unchecked")
T[] arr = (T[]) new Object[n];

// 2. Pass a Class token and use reflection (safe, reified):
T[] arr2 = (T[]) Array.newInstance(componentType, n);

// 3. Prefer a collection:
List<T> list = new ArrayList<>();
```

This is why `ArrayList` stores an `Object[]` internally and casts on access, and why `toArray(T[])` takes an array argument to obtain the runtime type.
:::

## 13. What are bridge methods? <Badge type="danger" text="hard" />

::: details View Answer
A **bridge method** is a synthetic method the compiler generates to preserve polymorphism after type erasure when a subclass overrides a generic method.

```java
class Node<T> { public void set(T t) {} }
class IntNode extends Node<Integer> {
    public void set(Integer i) {} // intends to override
}
```

After erasure, `Node.set` has signature `set(Object)`, but `IntNode.set` is `set(Integer)` — different signatures, so it would *not* override. The compiler generates a synthetic bridge:
```java
// synthetic in IntNode:
public void set(Object o) { set((Integer) o); }
```

This keeps virtual dispatch working when called through a `Node` reference. Bridge methods are visible in reflection (`Method.isBridge()`) and can occasionally surprise frameworks doing method introspection.
:::

## 14. Can a generic class have multiple type parameters and recursive bounds? <Badge type="warning" text="medium" />

::: details View Answer
Yes. Multiple parameters are comma-separated, and a **recursive (self-referential) bound** lets a type refer to itself.

```java
public class Pair<K, V> { K key; V value; }

// recursive bound: T must be comparable to itself
public static <T extends Comparable<T>> T max(Collection<T> c) { ... }

// curiously recurring template pattern for fluent builders
abstract class Builder<T extends Builder<T>> {
    @SuppressWarnings("unchecked")
    T self() { return (T) this; }
    T name(String n) { /* ... */ return self(); }
}
```

`Enum<E extends Enum<E>>` in the JDK is the textbook recursive bound: it guarantees an enum's `compareTo` only accepts its own type.
:::

## 15. Why can't type parameters be used in a `static` context? <Badge type="warning" text="medium" />

::: details View Answer
A class-level type parameter `T` is bound per *instance creation* (each `Box<String>`, `Box<Integer>` chooses its own `T`). A `static` member is shared across **all** parameterizations, so there is no single `T` to refer to.

```java
class Box<T> {
    // static T shared;        // illegal
    // static T create() {...} // illegal
    static <U> U pick(U a, U b) { return a; } // OK: its own parameter
}
```

A static method can declare its **own** type parameters, which is unrelated to the class's. This is also why factory methods like `Optional.empty()` are generic methods that infer the type from context.
:::

## 16. What is the difference between `List<Object>`, `List<?>`, and a raw `List`? <Badge type="warning" text="medium" />

::: details View Answer
- **`List<Object>`:** A list that explicitly holds `Object`. Type-checked: you can add any object, and you can only assign a `List<Object>` to it (not a `List<String>`).
- **`List<?>`:** A list of some *unknown but specific* type. Read-only for elements (you can add only `null`), but fully type-safe. Any `List<X>` can be assigned to it.
- **Raw `List`:** No generics at all — unsafe, allows anything, emits unchecked warnings, and disables generic checking on the whole reference.

```java
void m(List<?> any)      { /* any.add("x") illegal */ Object o = any.get(0); }
void n(List<Object> objs){ objs.add("x"); }          // OK
```

Prefer `<?>` for "I just need to read/iterate any list" — it is the safe alternative to a raw type.
:::

## 17. How do you handle `@SuppressWarnings("unchecked")` responsibly? <Badge type="warning" text="medium" />

::: details View Answer
Unchecked warnings flag operations the compiler cannot verify as type-safe (raw casts, generic-array creation, reflective casts). Suppressing them is sometimes necessary, but:

- Apply the annotation to the **narrowest scope possible** — a single local variable or statement, never a whole class.
- Add a comment explaining **why** the cast is provably safe.
- Verify safety yourself before suppressing.

```java
@SuppressWarnings("unchecked") // safe: we only ever store Strings here
List<String> ls = (List<String>) rawList;
```

Suppressing warnings does not change runtime behavior — it just silences the compiler. If the cast is actually wrong, you still get a `ClassCastException` at the point of use.
:::

## 18. Can you overload methods that differ only in their generic type arguments? <Badge type="warning" text="medium" />

::: details View Answer
No. Because of erasure, both methods reduce to the same signature, so the class won't compile:

```java
// Compile error: "name clash, both have erasure m(List)"
void m(List<String> a) {}
void m(List<Integer> a) {}
```

Both erase to `m(List)`. Workarounds:
- Give the methods different names (`mStrings`, `mInts`).
- Differentiate by another parameter or arity.
- Use a single generic method `<T> void m(List<T> a)`.

The same constraint explains why you can't have two `Comparable` implementations (`Comparable<Foo>` and `Comparable<Bar>`) on one class — their erasures collide in the bridge methods.
:::

## 19. How does the diamond operator improve generics, and what changed in Java 9+? <Badge type="tip" text="easy" />

::: details View Answer
The diamond `<>` (Java 7) lets the compiler infer the type arguments of a constructor from the variable's declared type, removing redundant repetition.

```java
Map<String, List<Integer>> m = new HashMap<>(); // inferred, vs new HashMap<String, List<Integer>>()
```

Java 9 extended the diamond to **anonymous classes** where the inferred type is denotable:
```java
Comparator<String> c = new Comparator<>() {
    public int compare(String a, String b) { return a.length() - b.length(); }
};
```

Inference uses the target type, so `var list = new ArrayList<>();` infers `ArrayList<Object>` — when combining `var` with diamond, specify the type argument explicitly.
:::

## 20. What is a heap pollution warning and when does it occur? <Badge type="danger" text="hard" />

::: details View Answer
**Heap pollution** occurs when a variable of a parameterized type refers to an object that is not of that type, breaking the type system's guarantees. It typically arises from unchecked operations or **varargs of generic type**.

```java
@SafeVarargs // assert no pollution occurs
static <T> List<T> listOf(T... items) { return Arrays.asList(items); }
```

Generic varargs create an array of a non-reifiable type under the hood (`T[]`), which is the source of the warning. If the method only **reads** from the array and never exposes it, it is safe — annotate it `@SafeVarargs` (allowed on `static`, `final`, or `private` methods). If it stores or returns the raw array, pollution can leak and cause a delayed `ClassCastException`.
:::

## 21. How do you recover generic type information at runtime when you need it? <Badge type="danger" text="hard" />

::: details View Answer
Erasure removes type arguments of *values*, but generic types embedded in **class/field/method declarations** survive in metadata and are accessible via reflection.

```java
class Repo extends ArrayList<User> {}
Type t = Repo.class.getGenericSuperclass();          // ArrayList<User>
Type arg = ((ParameterizedType) t).getActualTypeArguments()[0]; // User
```

This is the basis of the **super type token** pattern used by Jackson (`TypeReference`), Gson (`TypeToken`), and Spring (`ParameterizedTypeReference`):
```java
var ref = new TypeReference<List<User>>() {}; // anonymous subclass captures the type
```

You cannot recover the type argument of a plain `List<User>` *value*, only of types that appear in a declaration the compiler retains.
:::

## 22. What is the difference between `<T extends Comparable<T>>` and `<T extends Comparable<? super T>>`? <Badge type="danger" text="hard" />

::: details View Answer
Both bound `T` to be comparable, but the second is more flexible.

- `<T extends Comparable<T>>` requires `T` to implement `Comparable<T>` exactly.
- `<T extends Comparable<? super T>>` accepts `T` whose `Comparable` is implemented by a **supertype** of `T`.

This matters with inheritance. Suppose `Animal implements Comparable<Animal>` and `Dog extends Animal` (without redeclaring `Comparable`). Then `Dog` implements `Comparable<Animal>`, not `Comparable<Dog>`:

```java
// Fails for Dog: Dog is not Comparable<Dog>
static <T extends Comparable<T>> T max1(List<T> l) { ... }
// Works for Dog: Comparable<? super Dog> matches Comparable<Animal>
static <T extends Comparable<? super T>> T max2(List<T> l) { ... }
```

This is why `Collections.max` and `Collections.sort` use the `? super T` form — applying PECS to the `Comparable` consumer.
:::
