# Reflection & Annotations

## 1. What is reflection in Java and what can it do? <Badge type="tip" text="easy" />

::: details View Answer
Reflection is the ability of a program to **inspect and manipulate its own structure at runtime** through the `java.lang.reflect` API. Starting from a `Class<?>` object you can:

- Discover fields, methods, constructors, annotations, modifiers, and the type hierarchy.
- Instantiate objects, invoke methods, and read/write fields dynamically — even ones unknown at compile time.
- Access members regardless of `private`/`protected` visibility (subject to module rules).

It is the foundation for frameworks like Spring, Hibernate, Jackson, and JUnit, which need to operate on user classes they have never seen at compile time.
:::

## 2. What are the different ways to obtain a `Class` object? <Badge type="tip" text="easy" />

::: details View Answer
There are three primary ways:

```java
Class<String> c1 = String.class;            // class literal (compile-time)
Class<?> c2 = "hello".getClass();           // from an instance (runtime type)
Class<?> c3 = Class.forName("java.util.List"); // by fully-qualified name
```

Notes:
- `Class.forName` triggers class loading and static initialization (there is an overload to skip initialization).
- `obj.getClass()` returns the **actual runtime class**, which may be a subclass of the declared reference type.
- For primitives use `int.class`, and `Integer.TYPE` is the primitive `int` class, distinct from `Integer.class`.
:::

## 3. How do you inspect and invoke methods reflectively? <Badge type="warning" text="medium" />

::: details View Answer
```java
Class<?> clazz = Account.class;
Method m = clazz.getMethod("deposit", BigDecimal.class); // public, incl. inherited
Object result = m.invoke(accountInstance, new BigDecimal("100"));
```

Key distinctions:
- **`getMethod` / `getField`** return only **public** members, including inherited ones.
- **`getDeclaredMethod` / `getDeclaredField`** return members declared in **this class** at any visibility, but not inherited ones.
- `invoke` takes the target instance (`null` for static methods) plus arguments.
- Checked exceptions thrown by the target are wrapped in `InvocationTargetException`; call `getCause()` to unwrap.
:::

## 4. How do you access and modify private fields, and what are the caveats? <Badge type="danger" text="hard" />

::: details View Answer
```java
Field f = obj.getClass().getDeclaredField("balance");
f.setAccessible(true);          // suppress Java language access checks
f.set(obj, new BigDecimal("0"));
Object value = f.get(obj);
```

Caveats:
- **Module system (JPMS):** Since Java 9, `setAccessible(true)` on members of types in another module fails with `InaccessibleObjectException` unless that package is **`opens`**-ed to your module (or to everyone via `--add-opens`). Strong encapsulation became the default and was tightened further in Java 17.
- **`final` fields:** Reflectively writing `final` fields is unreliable and effectively disallowed for records and many JIT-optimized cases; do not rely on it.
- **Security & correctness:** Bypassing access control breaks invariants and can fail under a `SecurityManager` (now deprecated for removal).
:::

## 5. What is the performance cost of reflection, and how do frameworks mitigate it? <Badge type="warning" text="medium" />

::: details View Answer
Reflective calls are slower than direct calls because of access checks, argument boxing/array allocation, and missed JIT inlining/optimizations. The first lookup (`getMethod`, `forName`) is especially costly.

Mitigations used in practice:
- **Cache** `Class`, `Method`, and `Field` objects rather than looking them up repeatedly.
- Call `setAccessible(true)` once to skip repeated access checks.
- Use **`MethodHandle`** / `LambdaMetafactory` (`java.lang.invoke`), which the JIT can inline far better than `Method.invoke`.
- Generate bytecode or use annotation processors at build time (e.g. MapStruct, Micronaut) to avoid runtime reflection entirely.

Modern frameworks like Quarkus and Micronaut deliberately replace runtime reflection with build-time processing for faster startup and native-image compatibility.
:::

## 6. What are dynamic proxies and how do you create one? <Badge type="danger" text="hard" />

::: details View Answer
A dynamic proxy is a class generated at runtime that implements one or more **interfaces**, routing every method call to an `InvocationHandler`.

```java
interface Service { String run(String in); }

Service proxy = (Service) Proxy.newProxyInstance(
    Service.class.getClassLoader(),
    new Class<?>[]{ Service.class },
    (Object p, Method method, Object[] args) -> {
        System.out.println("before " + method.getName());
        return ((String) args[0]).toUpperCase(); // delegate / decorate here
    });
```

This is the mechanism behind AOP, transaction management, lazy loading, and mocking. Limitations:
- JDK proxies work on **interfaces only**. For proxying concrete classes, libraries use **CGLIB / ByteBuddy** subclassing instead.
- This is why Spring's `@Transactional` on a self-invoked method inside the same class is bypassed — the call doesn't go through the proxy.
:::

## 7. What is an annotation, and how does it differ from a comment or a marker interface? <Badge type="tip" text="easy" />

::: details View Answer
An annotation is **metadata** attached to code elements (classes, methods, fields, parameters, etc.). Unlike comments, annotations are part of the program model and can be read by the compiler, build tools, or at runtime via reflection.

Compared to a **marker interface** (an empty interface like the old `Cloneable`):
- Annotations can carry **parameters** (`@Column(name="id", nullable=false)`); marker interfaces cannot.
- Annotations can target many element kinds, not just types.
- Marker interfaces participate in the type system (`instanceof`), while annotations do not change a type's supertypes.

Modern code generally favors annotations for configuration metadata.
:::

## 8. What are the built-in meta-annotations? <Badge type="warning" text="medium" />

::: details View Answer
Meta-annotations annotate other annotations:

- **`@Retention`** — how long the annotation is kept (`SOURCE`, `CLASS`, `RUNTIME`).
- **`@Target`** — which element kinds it can be applied to (`TYPE`, `METHOD`, `FIELD`, `PARAMETER`, `TYPE_USE`, etc.).
- **`@Documented`** — include it in generated Javadoc.
- **`@Inherited`** — a subclass inherits the annotation from its superclass (only for `TYPE` targets, and only via `getAnnotations`).
- **`@Repeatable`** — allows the same annotation to appear multiple times on one element, backed by a container annotation.

Plus the common built-ins `@Override`, `@Deprecated`, `@SuppressWarnings`, `@FunctionalInterface`, and `@SafeVarargs`.
:::

## 9. Explain the three `RetentionPolicy` values and their use cases. <Badge type="warning" text="medium" />

::: details View Answer
- **`SOURCE`** — discarded by the compiler; never in the `.class` file. Used by tools and annotation processors at compile time (e.g. `@Override`, Lombok, `@SuppressWarnings`).
- **`CLASS`** — stored in the bytecode but **not** loaded by the JVM at runtime, so not visible to reflection. This is the **default**. Useful for bytecode-level tooling.
- **`RUNTIME`** — stored in bytecode **and** available via reflection. Required for any annotation a framework reads at runtime (Spring `@Autowired`, JPA `@Entity`, JUnit `@Test`).

A frequent bug: writing a custom annotation, reading it with reflection, and getting `null` because the author forgot `@Retention(RetentionPolicy.RUNTIME)` and got the `CLASS` default.
:::

## 10. How do you define a custom annotation with parameters? <Badge type="warning" text="medium" />

::: details View Answer
```java
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
public @interface Retry {
    int maxAttempts() default 3;
    long backoffMillis() default 100;
    Class<? extends Throwable>[] on() default { Exception.class };
}

@Retry(maxAttempts = 5, backoffMillis = 250)
void call() { ... }
```

Rules for annotation members:
- They are declared like methods with no body and may have `default` values.
- Allowed types are restricted: primitives, `String`, `Class`, enums, other annotations, and arrays of these.
- A single member named `value` lets callers omit the name: `@Retry(5)` if `value` were the member.
:::

## 11. How do you read annotations at runtime via reflection? <Badge type="warning" text="medium" />

::: details View Answer
Any `AnnotatedElement` (`Class`, `Method`, `Field`, etc.) exposes annotation accessors:

```java
for (Method m : service.getClass().getDeclaredMethods()) {
    if (m.isAnnotationPresent(Retry.class)) {
        Retry r = m.getAnnotation(Retry.class);
        int attempts = r.maxAttempts();
        // drive retry logic from metadata
    }
}
```

Useful methods:
- `isAnnotationPresent(X.class)`, `getAnnotation(X.class)`.
- `getAnnotations()` (includes inherited `@Inherited` ones) vs `getDeclaredAnnotations()` (declared directly only).
- `getAnnotationsByType(X.class)` resolves `@Repeatable` annotations.

This works only if the annotation has `RUNTIME` retention.
:::

## 12. How do frameworks like Spring and Hibernate use reflection and annotations together? <Badge type="danger" text="hard" />

::: details View Answer
They combine the two to implement declarative behavior:

1. **Scan** the classpath for classes (often via class metadata, not always full loading).
2. **Read runtime annotations** (`@Component`, `@Entity`, `@Autowired`, `@Column`) to build a model of beans, mappings, and dependencies.
3. **Use reflection** to instantiate objects, inject dependencies into fields/constructors, and call lifecycle methods.
4. **Generate dynamic proxies** to weave cross-cutting concerns (`@Transactional`, `@Cacheable`, security) around the real methods.

For example, Hibernate reads `@Entity`/`@Column` to map a class to a table, then uses reflection (or generated accessors) to populate field values from a `ResultSet`. The annotation supplies *what*, reflection performs *how*.
:::

## 13. What is the difference between `getFields()` and `getDeclaredFields()`? <Badge type="tip" text="easy" />

::: details View Answer
- **`getFields()`** returns all **public** fields, including those inherited from superclasses and interfaces.
- **`getDeclaredFields()`** returns **all** fields declared directly in the class (public, protected, package, private), but **excludes inherited** ones.

```java
clazz.getFields();          // public + inherited
clazz.getDeclaredFields();  // any visibility, this class only
```

The same `declared` vs non-`declared` distinction applies to `getMethods`/`getDeclaredMethods` and `getConstructors`/`getDeclaredConstructors`. To get every field across a hierarchy, you must walk `getSuperclass()` calling `getDeclaredFields()` at each level.
:::

## 14. How does reflection interact with generics and type erasure? <Badge type="warning" text="medium" />

::: details View Answer
Generic type arguments are erased at runtime, so `List<String>` and `List<Integer>` are both just `List` to reflection. However, generic information **declared in signatures** is retained as metadata and accessible:

```java
Field f = clazz.getDeclaredField("names"); // List<String> names;
Type t = f.getGenericType();
if (t instanceof ParameterizedType pt) {
    Type arg = pt.getActualTypeArguments()[0]; // class java.lang.String
}
```

So you can recover the parameter of a field, method return type, or superclass declaration via the `Type`/`ParameterizedType` API. What you cannot recover is the type argument of an *instance* (`someList.getClass()` only yields `ArrayList`). This is why libraries use the "super type token" (`TypeReference`) trick to capture generics.
:::

## 15. What security and encapsulation concerns surround reflection? <Badge type="danger" text="hard" />

::: details View Answer
- **Broken encapsulation:** Reflection can read/write private state and invoke private methods, bypassing the invariants a class relies on, which can corrupt state or expose secrets.
- **Module strong encapsulation (JEP 396/403):** Since Java 16/17, illegal reflective access to JDK internals is denied by default; deep reflection on other modules requires explicit `opens`/`--add-opens`. This protects platform integrity.
- **`SecurityManager` deprecation:** The old sandbox mechanism is deprecated for removal, so reflection restrictions now rely mainly on the module system.
- **Attack surface:** Deserialization gadgets and DI misconfiguration often abuse reflection; treat reflective entry points handling untrusted input as security-sensitive.

Best practice: minimize reflective access, prefer `opens` to narrow packages over global `--add-opens`, and avoid reflecting into untrusted code paths.
:::

## 16. What is `@Repeatable` and how does it work under the hood? <Badge type="warning" text="medium" />

::: details View Answer
`@Repeatable` (Java 8+) lets the same annotation appear multiple times on one element. It requires a **container annotation** holding an array:

```java
@Repeatable(Schedules.class)
@Retention(RetentionPolicy.RUNTIME)
@interface Schedule { String cron(); }

@Retention(RetentionPolicy.RUNTIME)
@interface Schedules { Schedule[] value(); }

@Schedule(cron = "0 0 * * *")
@Schedule(cron = "0 12 * * *")
void job() { }
```

The compiler wraps repeated uses into the container automatically. At runtime, use `getAnnotationsByType(Schedule.class)` to retrieve them transparently; `getAnnotation(Schedule.class)` returns `null` because what is actually stored is the `Schedules` container.
:::

## 17. How can you instantiate objects reflectively, and why is `Class.newInstance()` discouraged? <Badge type="warning" text="medium" />

::: details View Answer
```java
Constructor<Account> ctor = Account.class.getDeclaredConstructor(String.class);
ctor.setAccessible(true);
Account a = ctor.newInstance("acc-1");
```

The legacy `Class.newInstance()` is **deprecated** because:
- It only supports the **no-arg** constructor.
- It **swallows** checked exceptions thrown by the constructor, rethrowing them undeclared — breaking the checked-exception contract.

Prefer `getDeclaredConstructor(...).newInstance(...)`, which wraps constructor exceptions in `InvocationTargetException` and supports parameterized constructors. Note that records have a canonical constructor you can obtain via `getDeclaredConstructor` with the component types.
:::

## 18. What is `ElementType.TYPE_USE` and what does it enable? <Badge type="danger" text="hard" />

::: details View Answer
`TYPE_USE` (Java 8) allows an annotation to appear **anywhere a type is used**, not just on declarations:

```java
@NonNull String name;                 // on a field type
List<@NonNull String> items;          // on a type argument
String s = (@NonNull String) obj;     // on a cast
void m() throws @Critical IOException // on a throws clause
```

This powers pluggable type checkers like the Checker Framework, enabling compile-time null-safety and other type-system extensions. Combined with `@Retention(SOURCE)` and an annotation processor, it allows rich static analysis without affecting runtime behavior.
:::

## 19. How do annotation processors differ from runtime reflection? <Badge type="warning" text="medium" />

::: details View Answer
- **Annotation processors** (`javax.annotation.processing`, JSR-269) run **at compile time**. They inspect source via the mirror API (`Element`, `TypeMirror`) and can **generate new source files**. Examples: Lombok, MapStruct, Dagger, immutables. They typically use `SOURCE` retention.
- **Runtime reflection** reads `RUNTIME`-retained annotations while the program executes.

Trade-offs: processors produce code with **zero runtime overhead** and are GraalVM-native friendly, but run only at build time and cannot react to runtime conditions. Reflection is flexible and dynamic but costs startup time and performance. Many modern frameworks shift work from reflection to processors for faster startup and native images.
:::

## 20. What is a `MethodHandle` and how does it compare to `Method.invoke`? <Badge type="danger" text="hard" />

::: details View Answer
`MethodHandle` (from `java.lang.invoke`) is a typed, directly-executable reference to a method, field, or constructor, looked up via a `MethodHandles.Lookup`.

```java
MethodHandles.Lookup lookup = MethodHandles.lookup();
MethodHandle mh = lookup.findVirtual(String.class, "toUpperCase",
        MethodType.methodType(String.class));
String r = (String) mh.invokeExact("hi");
```

Versus `Method.invoke`:
- Access checks happen **once at lookup time**, not on every call.
- The JIT can **inline** method handles, so they are much faster in hot paths.
- They are **strongly typed** via `MethodType` (`invokeExact` enforces the signature), avoiding `Object[]` boxing.

This is the engine behind lambdas, `invokedynamic`, and string concatenation, and is preferred over classic reflection for performance-critical dynamic dispatch.
:::

## 21. How do you reflectively inspect a class hierarchy and implemented interfaces? <Badge type="tip" text="easy" />

::: details View Answer
```java
Class<?> c = ArrayList.class;
c.getSuperclass();          // AbstractList
c.getInterfaces();          // directly declared interfaces
c.getGenericSuperclass();   // includes generic type info
Modifier.isAbstract(c.getModifiers()); // inspect modifiers
c.isInterface(); c.isEnum(); c.isRecord(); c.isSealed();
```

To walk the full hierarchy you iterate `getSuperclass()` until `null` (which stops at `Object`). `getInterfaces()` returns only directly declared interfaces, so a complete interface set requires recursion. Java 16+ adds `isRecord()` / `getRecordComponents()` and `isSealed()` / `getPermittedSubclasses()` for newer language features.
:::

## 22. Why might a Spring `@Transactional` annotation be silently ignored, in terms of reflection/proxies? <Badge type="danger" text="hard" />

::: details View Answer
Spring implements `@Transactional` by wrapping the bean in a **proxy** (JDK dynamic proxy for interfaces, CGLIB subclass for classes). The transactional logic lives in the proxy, not in your class. The annotation is ignored when the call never passes through that proxy:

- **Self-invocation:** Calling `this.doWork()` from another method in the same bean invokes the raw instance directly, bypassing the proxy.
- **`private` / `final` methods:** Cannot be overridden by a CGLIB subclass, so the advice can't be applied.
- **Non-Spring-managed instances:** `new MyService()` is not proxied at all.

Fixes: call through the injected proxy reference, split the transactional method into a separate bean, or use AspectJ load-time weaving which instruments the actual bytecode rather than relying on a proxy.
:::
