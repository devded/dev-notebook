# Core Language

> Add new questions below in the same format: `## Question? <Badge ... />` then the answer.

## `==` vs `.equals()`? <Badge type="tip" text="easy" />

`==` compares references (same object); `.equals()` compares logical equality. Override `equals()` and `hashCode()` together.

```java
String a = new String("hi");
String b = new String("hi");
a == b;        // false (different objects)
a.equals(b);   // true  (same value)
```

## String vs StringBuilder vs StringBuffer? <Badge type="warning" text="medium" />

`String` is immutable — concatenation creates new objects. `StringBuilder` is mutable, use it in loops. `StringBuffer` is the thread-safe (synchronized) variant.

```java
StringBuilder sb = new StringBuilder();
for (int i = 0; i < 5; i++) sb.append(i);
String result = sb.toString();
```

## `final`, `finally`, `finalize`? <Badge type="tip" text="easy" />

`final` = constant/non-overridable; `finally` = always-run block; `finalize()` = deprecated GC hook.

## Checked vs unchecked exceptions? <Badge type="warning" text="medium" />

Checked (`IOException`, `SQLException`) must be handled or declared with `throws`. Unchecked (`RuntimeException` subclasses like `NullPointerException`) are not enforced at compile time.

## Overloading vs overriding? <Badge type="warning" text="medium" />

Overloading = same method name, different parameters, resolved at compile time. Overriding = subclass redefines a superclass method, resolved at runtime (polymorphism).
