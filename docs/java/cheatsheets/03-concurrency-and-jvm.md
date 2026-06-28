# Java: Concurrency and JVM Internals

## 1. Core Concurrency Primitives

| Concept | Description | Key Methods / Keywords |
| :--- | :--- | :--- |
| **Thread** | Smallest unit of execution. Created by extending `Thread` or implementing `Runnable`. | `start()`, `join()`, `interrupt()`, `sleep()`, `yield()` |
| **Runnable** | Functional interface representing a task to be executed by a thread. | `void run()` |
| **Callable&lt;T&gt;**| Similar to `Runnable` but returns a result and can throw exceptions. | `T call()` |
| **Future&lt;T&gt;** | Represents the result of an asynchronous computation. | `get()`, `isDone()`, `cancel()` |
| **synchronized**| Keyword for mutual exclusion. Locks on the object monitor (or class for static methods). | `synchronized(obj) { ... }`, `public synchronized void m()` |
| **volatile** | Ensures visibility of changes to variables across threads. Prevents instruction reordering. | `private volatile int counter;` |

## 2. Java Memory Model (JMM)

*   **Main Memory:** Shared across all threads. Variables are stored here.
*   **Working Memory:** Thread-local cache (registers, L1/L2 caches). Threads read/write here and sync with main memory.
*   **Happens-Before Relationship:** Guarantees memory visibility.
    *   *Monitor Lock Rule:* Unlock on monitor *happens-before* every subsequent lock on that monitor.
    *   *Volatile Variable Rule:* Write to a volatile *happens-before* every subsequent read of that volatile.
    *   *Thread Start Rule:* `Thread.start()` *happens-before* any action in the started thread.
    *   *Thread Join Rule:* Any action in a thread *happens-before* another thread successfully returns from `join()` on that thread.

## 3. `java.util.concurrent` (JUC) Utilities

### 3.1. Thread Pools (`ExecutorService`)

```java
// Common pool creations
ExecutorService cached = Executors.newCachedThreadPool(); // Unbounded, reuses idle threads
ExecutorService fixed = Executors.newFixedThreadPool(10); // Bounded number of threads
ExecutorService single = Executors.newSingleThreadExecutor(); // Single thread, sequential execution
ScheduledExecutorService scheduled = Executors.newScheduledThreadPool(5); // For delayed/periodic tasks

// Usage
Future<String> future = fixed.submit(() -> "Result");
fixed.shutdown(); // Initiates graceful shutdown
fixed.awaitTermination(1, TimeUnit.MINUTES);
```

### 3.2. Synchronizers

| Synchronizer | Purpose | Use Case |
| :--- | :--- | :--- |
| **CountDownLatch** | Allows one or more threads to wait until a set of operations in other threads completes. | Wait for N services to initialize before starting main app. |
| **CyclicBarrier** | Allows a set of threads to all wait for each other to reach a common barrier point. Resettable. | Parallel computation where threads must wait at checkpoints. |
| **Semaphore** | Controls access to a shared resource through a set of permits. | Limit concurrent access to a DB connection pool. |
| **Phaser** | Reusable synchronization barrier, more flexible than CyclicBarrier/CountDownLatch. Supports dynamic number of parties. | Complex multi-stage parallel tasks. |
| **Exchanger** | Synchronization point where threads can pair and swap elements within pairs. | Genetic algorithms, producer-consumer with two buffers. |

### 3.3. Concurrent Collections

*   `ConcurrentHashMap`: High concurrency, non-blocking reads, lock-striping for writes.
*   `CopyOnWriteArrayList`: Thread-safe variant of ArrayList. Mutative operations create a fresh copy. Good for read-heavy workloads.
*   `BlockingQueue` implementations (`ArrayBlockingQueue`, `LinkedBlockingQueue`): Thread-safe queues for Producer-Consumer patterns. Methods: `put()` (blocks if full), `take()` (blocks if empty).

## 4. Locks (`java.util.concurrent.locks`)

```java
Lock lock = new ReentrantLock();
lock.lock();
try {
    // Critical section
} finally {
    lock.unlock(); // Always unlock in finally block!
}
```
*   `ReentrantLock`: Better alternative to `synchronized`. Supports fairness, interruptible lock acquisition (`lockInterruptibly()`), and timeouts (`tryLock()`).
*   `ReadWriteLock` (`ReentrantReadWriteLock`): Pair of associated locks. Read lock can be held by multiple reader threads simultaneously; write lock is exclusive.
*   `StampedLock`: Optimistic read locking capability, can be more efficient than `ReentrantReadWriteLock` in highly contended scenarios.

## 5. CompletableFuture (Java 8+)

Combines `Future` and `CompletionStage` for non-blocking, declarative asynchronous programming.

```java
CompletableFuture.supplyAsync(() -> "Hello")
    .thenApplyAsync(s -> s + " World")
    .thenAccept(System.out::println)
    .exceptionally(ex -> {
        System.err.println("Error: " + ex.getMessage());
        return null;
    });
```

## 6. Virtual Threads (Java 21+)

Lightweight threads managed by the JVM (Project Loom). Great for I/O-bound tasks.
```java
// Create and start a virtual thread
Thread.startVirtualThread(() -> { /* task */ });

// Thread pool for virtual threads
try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
    executor.submit(() -> { /* task */ });
}
```

## 7. JVM Internals

### 7.1. JVM Memory Areas (Runtime Data Areas)

| Area | Shared/Thread-Local | Description | OutOfMemoryError? |
| :--- | :--- | :--- | :--- |
| **Heap** | Shared | Object instances and arrays. Managed by GC. | Yes (`Java heap space`) |
| **Method Area** | Shared | Class structures, method data, constants, static variables. (Metaspace since Java 8). | Yes (`Metaspace`) |
| **JVM Stack** | Thread-Local | Frames for method calls containing local variables and partial results. | Yes (or `StackOverflowError`) |
| **PC Register** | Thread-Local | Address of the currently executing JVM instruction. | No |
| **Native Method Stack** | Thread-Local | Similar to JVM Stack but for native (C/C++) methods. | Yes (or `StackOverflowError`) |

### 7.2. Garbage Collection (GC)

*   **Generational Hypothesis:** Most objects die young. Heap is divided into:
    *   **Young Generation:** Eden Space, Survivor Spaces (S0, S1). Minor GC runs here.
    *   **Old (Tenured) Generation:** Long-lived objects. Major/Full GC runs here.
*   **GC Roots:** Starting points for reachability analysis (Active threads, Local variables, Static variables, JNI references).
*   **Common Collectors:**
    *   **G1 (Garbage First):** Default since Java 9. Divides heap into regions. Balances throughput and latency.
    *   **ZGC / Shenandoah:** Low-latency collectors. Concurrent compaction. Pause times typically &lt; 1ms, independent of heap size.
    *   **Parallel GC:** High throughput, long pauses (stop-the-world).
    *   **Serial GC:** Single-threaded, for small applications/containers.

### 7.3. Class Loading Mechanism

*   **Phases:** Loading -> Linking (Verification, Preparation, Resolution) -> Initialization.
*   **Parent-Delegation Model:** A class loader delegates the loading request to its parent before trying to load it itself.
    1.  **Bootstrap ClassLoader:** Loads core Java classes (rt.jar / java.base module).
    2.  **Platform (Extension) ClassLoader:** Loads platform-specific extensions.
    3.  **Application (System) ClassLoader:** Loads classes from classpath.

### 7.4. JVM Flags (Common)

| Flag | Purpose |
| :--- | :--- |
| `-Xms&lt;size&gt;` | Initial heap size. |
| `-Xmx&lt;size&gt;` | Maximum heap size. |
| `-XX:MaxMetaspaceSize=&lt;size&gt;` | Maximum Metaspace size. |
| `-Xss&lt;size&gt;` | Thread stack size. |
| `-XX:+UseG1GC` | Enable G1 Garbage Collector. |
| `-XX:+UseZGC` | Enable Z Garbage Collector. |
| `-XX:MaxGCPauseMillis=&lt;N&gt;` | Target max pause time for G1 GC. |
| `-Xlog:gc*` | Enable detailed GC logging (Java 9+ unified logging). |
