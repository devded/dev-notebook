# Design Patterns in Java

## 1. What are the three categories of GoF design patterns? <Badge type="tip" text="easy" />

::: details View Answer
The Gang of Four catalog groups 23 patterns into three categories by intent:

- **Creational** — control object creation: Singleton, Factory Method, Abstract Factory, Builder, Prototype.
- **Structural** — compose objects and classes into larger structures: Adapter, Decorator, Facade, Proxy, Composite, Bridge, Flyweight.
- **Behavioral** — assign responsibilities and define communication between objects: Strategy, Observer, Template Method, Command, State, Chain of Responsibility, Iterator, Mediator, Visitor, etc.

Patterns are not code to copy verbatim — they are reusable solutions to recurring design problems, expressed in your domain.
:::

## 2. What is the Singleton pattern, and what is the safest way to implement it? <Badge type="warning" text="medium" />

::: details View Answer
Singleton ensures a class has exactly **one instance** with a global access point. The cleanest and safest implementation is the **enum singleton**, recommended by Joshua Bloch:

```java
public enum Config {
    INSTANCE;
    public String get(String key) { ... }
}
```

It is concise, thread-safe by JVM guarantees, and inherently safe against **serialization** and **reflection** attacks that can otherwise create extra instances. Drawbacks of singletons in general: they introduce global state, hinder unit testing (hard to mock/replace), and can hide dependencies — in modern apps a DI container usually manages singleton scope instead.
:::

## 3. Explain the initialization-on-demand holder idiom for lazy singletons. <Badge type="danger" text="hard" />

::: details View Answer
The holder idiom gives **lazy** initialization with no synchronization cost:

```java
public class Service {
    private Service() {}
    private static class Holder {
        static final Service INSTANCE = new Service();
    }
    public static Service getInstance() {
        return Holder.INSTANCE;
    }
}
```

It works because the JVM loads `Holder` (and runs its static initializer) only on first reference to `getInstance()`, and class initialization is guaranteed thread-safe by the language spec. This avoids the pitfalls of **double-checked locking**, which historically was broken without `volatile`:

```java
private static volatile Service instance; // volatile is mandatory
```

The holder idiom is generally preferred for lazy class-based singletons.
:::

## 4. What is the difference between Factory Method and Abstract Factory? <Badge type="warning" text="medium" />

::: details View Answer
Both decouple clients from concrete classes, but at different scopes:

- **Factory Method** defines a single method (often abstract) that subclasses override to decide which **one** product to create. It is about creating one product through inheritance.
- **Abstract Factory** is an object that provides methods to create a **family** of related products that are meant to be used together, typically through composition.

```java
// Factory Method
abstract class Dialog { abstract Button createButton(); }

// Abstract Factory
interface GuiFactory { Button createButton(); Checkbox createCheckbox(); }
class MacFactory implements GuiFactory { ... }
class WinFactory implements GuiFactory { ... }
```

Rule of thumb: Factory Method = one product, subclass decides; Abstract Factory = consistent set of products, swap the whole factory.
:::

## 5. When and how would you use the Builder pattern? <Badge type="warning" text="medium" />

::: details View Answer
Builder constructs complex objects step by step, avoiding telescoping constructors and improving readability — especially with many optional parameters.

```java
Pizza p = new Pizza.Builder()
        .size(12)
        .addTopping("mushroom")
        .cheese(true)
        .build();
```

Benefits:
- Readable, self-documenting calls; optional parameters without constructor explosion.
- Can enforce invariants and required fields in `build()`.
- Produces an immutable object.

In modern Java, **records** cover the simple immutable-carrier case, but Builder remains valuable when there are many optional fields, validation, or staged construction. Note `StringBuilder` is the idiom under a familiar name.
:::

## 6. What is the Prototype pattern and how does it relate to cloning? <Badge type="warning" text="medium" />

::: details View Answer
Prototype creates new objects by **copying an existing instance** rather than constructing from scratch — useful when creation is expensive or the concrete type should be decided at runtime.

In Java it is historically tied to `Cloneable`/`clone()`, but `clone()` is widely regarded as broken: it bypasses constructors, does a **shallow** copy by default, and has an awkward contract. Preferred alternatives:

```java
// Copy constructor
public Order(Order other) { this.items = new ArrayList<>(other.items); }

// Static copy factory
public static Order copyOf(Order o) { ... }
```

For records, you "copy with changes" via a compact pattern (e.g. `new Point(p.x(), p.y()+1)`). Be careful to perform **deep copies** of mutable nested state.
:::

## 7. Explain the Adapter pattern with an example. <Badge type="tip" text="easy" />

::: details View Answer
Adapter converts the interface of a class into another interface clients expect, letting otherwise incompatible types work together — like a plug adapter.

```java
interface PaymentGateway { void pay(int cents); }

class LegacyBilling { void charge(double dollars) { ... } }

class BillingAdapter implements PaymentGateway {
    private final LegacyBilling legacy;
    BillingAdapter(LegacyBilling l) { this.legacy = l; }
    public void pay(int cents) { legacy.charge(cents / 100.0); }
}
```

It is heavily used to wrap third-party or legacy code behind a clean, domain-friendly interface. The JDK's `Arrays.asList` and the old `InputStreamReader` (bytes → chars) are adapter-style bridges.
:::

## 8. What is the Decorator pattern and where is it used in the JDK? <Badge type="warning" text="medium" />

::: details View Answer
Decorator attaches additional responsibilities to an object **dynamically** by wrapping it in another object that implements the same interface. It is a flexible alternative to subclassing for extending behavior.

```java
InputStream in = new BufferedInputStream(
        new GZIPInputStream(
            new FileInputStream("data.gz")));
```

The entire `java.io` streams hierarchy is the canonical example: buffering, compression, and data conversion are stacked as decorators. `Collections.unmodifiableList` and `synchronizedList` are also decorators. The benefit is composing behaviors at runtime in any order without a combinatorial explosion of subclasses.
:::

## 9. How does the Facade pattern differ from Adapter? <Badge type="tip" text="easy" />

::: details View Answer
Both put an interface in front of other code, but the intent differs:

- **Facade** provides a **simplified, unified entry point** to a complex subsystem, hiding its many moving parts. It is about reducing complexity, not matching an existing interface.
- **Adapter** changes one **existing** interface into another expected one. It is about compatibility.

```java
// Facade
class OrderFacade {
    void placeOrder(Cart c) {
        inventory.reserve(c);
        payment.charge(c);
        shipping.schedule(c);
    }
}
```

A Spring `@Service` that orchestrates several repositories and clients behind one method is effectively a facade.
:::

## 10. What is the Proxy pattern and what variants exist? <Badge type="warning" text="medium" />

::: details View Answer
A Proxy is a stand-in that controls access to a real object, sharing its interface. Common variants:

- **Virtual proxy** — lazy initialization of expensive resources (Hibernate lazy-loaded entities).
- **Protection proxy** — access control / security checks.
- **Remote proxy** — represents an object in another address space (RMI stubs).
- **Smart proxy** — adds logging, caching, reference counting.

In Java, proxies are often created dynamically:

```java
Foo proxy = (Foo) Proxy.newProxyInstance(loader, new Class[]{Foo.class}, handler);
```

This is the foundation of Spring AOP (`@Transactional`, `@Cacheable`). The difference from Decorator is intent: Decorator **adds behavior**, Proxy **controls access** (though structurally similar).
:::

## 11. Explain the Composite pattern. <Badge type="warning" text="medium" />

::: details View Answer
Composite lets you treat individual objects and compositions of objects **uniformly** through a common interface, modeling part-whole tree hierarchies.

```java
interface FileNode { long size(); }

record File(long size) implements FileNode {}

class Directory implements FileNode {
    private final List<FileNode> children = new ArrayList<>();
    public long size() {
        return children.stream().mapToLong(FileNode::size).sum();
    }
}
```

A client can call `size()` on a leaf file or a whole directory tree without knowing which it holds. The Swing component tree and the JSF/DOM node trees are classic composites.
:::

## 12. What is the Strategy pattern and how do lambdas modernize it? <Badge type="warning" text="medium" />

::: details View Answer
Strategy defines a family of interchangeable algorithms behind a common interface, letting the algorithm vary independently of the client.

Classically each strategy is a class implementing an interface. With Java 8+ functional interfaces, a strategy is often just a lambda:

```java
// Classic: many small classes implementing Comparator
// Modern: pass behavior directly
list.sort(Comparator.comparing(Employee::getSalary));

Function<Order, BigDecimal> pricing = discountStrategy; // swap at runtime
```

`Comparator`, `Runnable`, `Function`, and `Predicate` are strategy interfaces baked into the JDK. Lambdas remove the boilerplate of a class per strategy, making the pattern almost invisible while keeping its substitutability.
:::

## 13. Explain the Observer pattern and modern alternatives. <Badge type="warning" text="medium" />

::: details View Answer
Observer establishes a one-to-many dependency so that when a subject changes state, all registered observers are notified.

```java
interface Observer { void update(Event e); }
class Subject {
    private final List<Observer> observers = new ArrayList<>();
    void subscribe(Observer o) { observers.add(o); }
    void emit(Event e) { observers.forEach(o -> o.update(e)); }
}
```

The legacy `java.util.Observer`/`Observable` were **deprecated in Java 9** because of design weaknesses. Modern alternatives:
- `PropertyChangeListener` / `Flow` (Reactive Streams, Java 9) for backpressure-aware streams.
- Reactive libraries (Project Reactor, RxJava) and event buses.
- Spring `ApplicationEvent` / `@EventListener`.

The pattern underpins event-driven UIs and pub/sub messaging.
:::

## 14. What is the Template Method pattern, and how can lambdas/default methods change it? <Badge type="warning" text="medium" />

::: details View Answer
Template Method defines the **skeleton** of an algorithm in a base method, deferring specific steps to subclasses via abstract "hook" methods.

```java
abstract class DataImporter {
    public final void run() {       // template, fixed order
        var raw = read();
        var clean = transform(raw);
        write(clean);
    }
    protected abstract Data read();
    protected abstract Data transform(Data d);
    protected abstract void write(Data d);
}
```

It relies on **inheritance** (the steps are overridden). A modern, composition-based alternative passes the varying steps as **functions** instead of subclassing:

```java
void run(Supplier<Data> read, UnaryOperator<Data> transform, Consumer<Data> write) {
    write.accept(transform.apply(read.get()));
}
```

Lambdas favor composition over inheritance, reducing rigid class hierarchies.
:::

## 15. Describe the Command pattern. <Badge type="warning" text="medium" />

::: details View Answer
Command encapsulates a request as an object, decoupling the sender from the receiver. This enables queuing, logging, undo/redo, and scheduling of operations.

```java
interface Command { void execute(); }

class AddItem implements Command {
    private final Cart cart; private final Item item;
    AddItem(Cart c, Item i) { cart = c; item = i; }
    public void execute() { cart.add(item); }
}
```

In modern Java a `Runnable` or any functional interface is a lightweight Command — the `ExecutorService` queue is essentially a command queue. Adding an `undo()` method enables reversible operations. It is the backbone of task schedulers, transactional outboxes, and UI action systems.
:::

## 16. What is the State pattern and how does it differ from a simple enum/switch? <Badge type="danger" text="hard" />

::: details View Answer
State lets an object alter its behavior when its internal state changes, so it "appears to change its class". Each state is an object encapsulating the behavior valid in that state and the legal transitions.

```java
interface OrderState { OrderState next(Order o); void cancel(Order o); }
class Created implements OrderState { ... }
class Paid implements OrderState { ... }
class Shipped implements OrderState { ... }
```

Versus a giant `switch (status)`: the State pattern localizes each state's logic in its own class, makes illegal transitions explicit, and is open to extension. The trade-off is more classes. For simple, stable state machines, an `enum` with abstract methods per constant is a clean middle ground:

```java
enum Light { RED { Light next(){ return GREEN; } }, GREEN { ... }, YELLOW { ... };
             abstract Light next(); }
```
:::

## 17. Explain the Chain of Responsibility pattern. <Badge type="warning" text="medium" />

::: details View Answer
Chain of Responsibility passes a request along a chain of handlers; each handler either processes it or forwards it to the next. The sender doesn't know which handler will act.

```java
abstract class Handler {
    protected Handler next;
    Handler linkTo(Handler n) { this.next = n; return n; }
    abstract void handle(Request r);
}
```

It is exactly the model behind **Servlet filters**, Spring Security filter chains, and OkHttp/HTTP interceptors. Benefits: handlers are decoupled and reorderable; you can add/remove steps without touching others. A functional variant composes `Function`s or uses a list of predicates/handlers iterated in order.
:::

## 18. How do records and sealed types replace some classic patterns? <Badge type="danger" text="hard" />

::: details View Answer
Modern Java language features absorb several patterns:

- **Records** replace much **Builder/DTO/value-object** boilerplate by auto-generating constructors, accessors, `equals`/`hashCode`.
- **Sealed interfaces + records + pattern-matching `switch`** give an algebraic-data-type style that replaces the **Visitor** pattern. Instead of a `visit` method per type, you exhaustively match:

```java
sealed interface Shape permits Circle, Square {}
record Circle(double r) implements Shape {}
record Square(double s) implements Shape {}

double area(Shape sh) {
    return switch (sh) {
        case Circle c -> Math.PI * c.r() * c.r();
        case Square s -> s.s() * s.s();
    }; // exhaustive — no default needed
}
```

This is double dispatch without the Visitor ceremony, and the compiler enforces exhaustiveness.
:::

## 19. How have lambdas and functional interfaces changed pattern usage overall? <Badge type="warning" text="medium" />

::: details View Answer
Many behavioral patterns existed largely to **pass behavior around** in a language without first-class functions. Lambdas make that direct:

- **Strategy** → a `Function`/`Comparator` lambda.
- **Command** → a `Runnable`/`Supplier`.
- **Template Method** → higher-order functions taking step lambdas.
- **Observer callbacks** → `Consumer` listeners.
- **Factory** → a `Supplier<T>` (e.g. `Optional.orElseGet(supplier)`).

The patterns still exist conceptually, but the implementation collapses from a class hierarchy to a few lambdas. The lesson: patterns describe *intent*; the idiomatic *mechanism* evolves with the language. Don't over-engineer with full GoF class structures when a functional interface suffices.
:::

## 20. What is the difference between Strategy and State, which look structurally similar? <Badge type="danger" text="hard" />

::: details View Answer
Both delegate behavior to a swappable object implementing a common interface, so they look alike. The difference is **intent and who controls transitions**:

- **Strategy:** The client chooses the algorithm, and strategies are **independent and unaware of each other**. The object's behavior is configured, not evolving.
- **State:** The states **know about each other** and drive transitions; the object moves through a lifecycle, and the "strategy" changes itself over time based on internal events.

In short: Strategy is "pick an interchangeable algorithm"; State is "behavior driven by an internal state machine that transitions itself".
:::

## 21. What pitfalls and anti-patterns surround overusing design patterns? <Badge type="warning" text="medium" />

::: details View Answer
Patterns are tools, not goals. Common abuses:

- **Over-engineering:** Wrapping trivial logic in factories, strategies, and abstract layers ("FactoryFactory") that add indirection without value (YAGNI).
- **Singleton overuse:** Hidden global mutable state that wrecks testability and concurrency. Prefer DI-managed scope.
- **Cargo-cult patterns:** Forcing a textbook GoF class structure where a lambda, record, or plain method would do.
- **Premature abstraction:** Introducing extension points for variation that never materializes.

Senior judgment is knowing *when not to* apply a pattern. Favor the simplest design that meets current requirements and refactor toward patterns when real pressure appears.
:::

## 22. How does Dependency Injection relate to the classic creational patterns? <Badge type="warning" text="medium" />

::: details View Answer
Dependency Injection (DI) is an application of the **Inversion of Control** principle and largely supersedes hand-written creational patterns in application code:

- The container becomes the **Factory / Abstract Factory**, deciding which implementation to wire.
- Bean scopes (`singleton`, `prototype`) provide **Singleton** and **Prototype** lifecycles without manual code.
- Objects receive collaborators rather than constructing them, which improves testability (inject mocks) and decouples wiring from logic.

```java
@Service
class OrderService {
    OrderService(PaymentGateway gw, InventoryRepo repo) { ... } // injected
}
```

You still use Builder for complex value objects and Factory Method for runtime-conditional creation, but the *plumbing* of object graphs moves to the DI framework instead of bespoke factories and singletons.
:::
