# Java Cheatsheet

Quick syntax reference for Java.

## Primitives

| Type | Size | Range / Note |
| --- | --- | --- |
| `byte` | 8-bit | -128..127 |
| `int` | 32-bit | ~±2.1B |
| `long` | 64-bit | suffix `L` |
| `double` | 64-bit | default for decimals |
| `boolean` | — | `true` / `false` |
| `char` | 16-bit | Unicode |

## Collections

| Interface | Common impl | Notes |
| --- | --- | --- |
| `List` | `ArrayList`, `LinkedList` | Ordered, duplicates allowed |
| `Set` | `HashSet`, `TreeSet` | Unique; `TreeSet` sorted |
| `Map` | `HashMap`, `TreeMap` | Key→value; `TreeMap` sorted |
| `Queue` | `LinkedList`, `ArrayDeque` | FIFO |

```java
List<String> list = new ArrayList<>();
Map<String, Integer> map = new HashMap<>();
map.put("a", 1);
map.getOrDefault("b", 0);
Set<Integer> set = new HashSet<>(List.of(1, 2, 3));
```

## Streams (Java 8+)

```java
List<Integer> nums = List.of(1, 2, 3, 4, 5);

int sum = nums.stream()
              .filter(n -> n % 2 == 0)
              .mapToInt(Integer::intValue)
              .sum();

List<String> upper = names.stream()
                          .map(String::toUpperCase)
                          .collect(Collectors.toList());
```

## OOP pillars

- **Encapsulation** — hide state behind methods (`private` fields + getters/setters).
- **Inheritance** — `extends` a class, `implements` an interface.
- **Polymorphism** — overriding (runtime) vs overloading (compile time).
- **Abstraction** — `abstract` classes & interfaces.

```java
public interface Shape {
    double area();              // implicitly public abstract
    default String name() { return "shape"; }  // Java 8+
}

public class Circle implements Shape {
    private final double r;
    public Circle(double r) { this.r = r; }
    @Override public double area() { return Math.PI * r * r; }
}
```

## Exceptions

```java
try {
    risky();
} catch (IOException e) {
    log.error("io failed", e);
} catch (Exception e) {
    throw new RuntimeException(e);
} finally {
    cleanup();
}
```

- **Checked** (must handle/declare): `IOException`, `SQLException`.
- **Unchecked** (runtime): `NullPointerException`, `IllegalArgumentException`.

---

> 💡 Looking for Q&A? See the [Java Interview Questions](./questions/) pages.
