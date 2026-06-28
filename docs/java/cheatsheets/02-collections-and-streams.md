# Java: Collections and Streams API

## Core Collections Interfaces

| Interface | Description | Key Implementations |
| :--- | :--- | :--- |
| **Collection** | Root interface for collections (no maps). | `List`, `Set`, `Queue` |
| **List** | Ordered collection (sequence), allows duplicates. | `ArrayList`, `LinkedList` |
| **Set** | Unordered collection, no duplicates. | `HashSet`, `TreeSet`, `LinkedHashSet` |
| **Queue** | Collection designed for holding elements prior to processing. | `PriorityQueue`, `LinkedList` |
| **Deque** | Double-ended queue. | `ArrayDeque`, `LinkedList` |
| **Map** | Key-value pairs, no duplicate keys. (Not extending Collection) | `HashMap`, `TreeMap`, `LinkedHashMap`, `ConcurrentHashMap` |

## Key Implementations & Characteristics

| Class | Internal Data Structure | Ordered? | Synchronized? | Null allowed? | Performance (Add/Get/Remove) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `ArrayList` | Resizable Array | Yes (Insertion) | No | Yes | O(1)/O(1)/O(n) |
| `LinkedList` | Doubly-Linked List | Yes (Insertion) | No | Yes | O(1)/O(n)/O(1) |
| `HashSet` | Hash Table (via HashMap) | No | No | Yes (One) | O(1) |
| `TreeSet` | Red-Black Tree | Yes (Sorted) | No | No | O(log n) |
| `LinkedHashSet` | Hash Table + Linked List | Yes (Insertion) | No | Yes (One) | O(1) |
| `HashMap` | Hash Table | No | No | Yes (1 key, N vals) | O(1) |
| `TreeMap` | Red-Black Tree | Yes (Sorted) | No | No | O(log n) |
| `LinkedHashMap`| Hash Table + Linked List | Yes (Insertion) | No | Yes (1 key, N vals) | O(1) |
| `ConcurrentHashMap`| Hash Table (Segmented/CAS) | No | Thread-Safe | No | O(1) |

## Common Collection Methods

### `Collection<E>` (List, Set, Queue)
```java
int size();
boolean isEmpty();
boolean contains(Object o);
boolean add(E e);
boolean remove(Object o);
void clear();
Iterator<E> iterator();
Object[] toArray();
// Java 8+
boolean removeIf(Predicate<? super E> filter);
Stream<E> stream();
```

### `Map<K, V>`
```java
V put(K key, V value);
V get(Object key);
V remove(Object key);
boolean containsKey(Object key);
boolean containsValue(Object value);
Set<K> keySet();
Collection<V> values();
Set<Map.Entry<K, V>> entrySet();
// Java 8+
V getOrDefault(Object key, V defaultValue);
void forEach(BiConsumer<? super K, ? super V> action);
V putIfAbsent(K key, V value);
V computeIfAbsent(K key, Function<? super K, ? extends V> mappingFunction);
```

## Utility Classes (`Collections` & `Arrays`)

```java
// Collections
Collections.sort(list); // Mutates list
Collections.reverse(list);
Collections.shuffle(list);
Collections.unmodifiableList(list); // Returns read-only view
Collections.singletonList("Item"); // Immutable list of size 1
Collections.emptyList(); // Immutable empty list

// Arrays
Arrays.asList("A", "B"); // Fixed-size list backed by array
Arrays.sort(arr);
Arrays.binarySearch(arr, key);
Arrays.copyOf(arr, newLength);
Arrays.stream(arr); // Create stream from array
```

## Java 9+ Factory Methods (Immutable)

```java
List<String> list = List.of("A", "B", "C");
Set<String> set = Set.of("A", "B", "C");
Map<String, Integer> map = Map.of("A", 1, "B", 2);
Map<String, Integer> map2 = Map.ofEntries(
    Map.entry("A", 1), Map.entry("B", 2)
);
```

---

## Streams API

A sequence of elements supporting sequential and parallel aggregate operations.

**Pipeline Structure:** `Source` -> `Intermediate Operation(s)` -> `Terminal Operation`

### Creating Streams

```java
// From Collections
Stream<String> s1 = list.stream();
Stream<String> s2 = list.parallelStream();

// From Arrays
Stream<String> s3 = Arrays.stream(new String[]{"A", "B"});

// From Values
Stream<String> s4 = Stream.of("A", "B", "C");

// Infinite Streams
Stream<Integer> s5 = Stream.iterate(0, n -> n + 2); // 0, 2, 4, 6...
Stream<Double> s6 = Stream.generate(Math::random);
```

### Intermediate Operations (Lazy)
Return a new `Stream`. They are not executed until a terminal operation is invoked.

| Operation | Type | Description |
| :--- | :--- | :--- |
| `filter(Predicate)` | Stateless | Keeps elements matching predicate |
| `map(Function)` | Stateless | Transforms elements |
| `flatMap(Function)` | Stateless | Flattens streams of streams into a single stream |
| `distinct()` | Stateful | Removes duplicates (relies on `equals()`) |
| `sorted()` | Stateful | Sorts elements (natural order) |
| `sorted(Comparator)` | Stateful | Sorts elements using comparator |
| `peek(Consumer)` | Stateless | Performs action on each element (for debugging) |
| `limit(long)` | Stateful (Short-circuit) | Truncates stream to max size |
| `skip(long)` | Stateful | Discards first N elements |
| `takeWhile(Predicate)`| Stateful (Short-circuit) | Takes elements while condition is true (Java 9) |
| `dropWhile(Predicate)`| Stateful | Drops elements while condition is true (Java 9) |

### Terminal Operations (Eager)
Produce a non-stream result (primitive, object, void) and consume the stream.

| Operation | Return Type | Description |
| :--- | :--- | :--- |
| `forEach(Consumer)` | `void` | Performs action on each element |
| `toArray()` | `Object[]` | Converts stream to array |
| `reduce(BinaryOperator)`| `Optional<T>` | Reduces elements to a single value |
| `collect(Collector)` | `R` | Accumulates elements into a collection/result |
| `min(Comparator)` | `Optional<T>` | Finds minimum element |
| `max(Comparator)` | `Optional<T>` | Finds maximum element |
| `count()` | `long` | Returns number of elements |
| `anyMatch(Predicate)` | `boolean` (Short-circuit)| True if ANY element matches |
| `allMatch(Predicate)` | `boolean` (Short-circuit)| True if ALL elements match |
| `noneMatch(Predicate)`| `boolean` (Short-circuit)| True if NO element matches |
| `findFirst()` | `Optional<T>` (Short-circuit)| Returns first element |
| `findAny()` | `Optional<T>` (Short-circuit)| Returns any element (useful in parallel) |

### Common Collectors (`Collectors` utility class)

```java
// To Collections
List<String> list = stream.collect(Collectors.toList());
Set<String> set = stream.collect(Collectors.toSet());
TreeSet<String> treeSet = stream.collect(Collectors.toCollection(TreeSet::new)); // Java 8
// Java 16+
List<String> list16 = stream.toList(); 

// Joining Strings
String joined = stream.collect(Collectors.joining(", ", "[", "]")); // "[A, B, C]"

// Grouping and Partitioning
Map<Integer, List<String>> byLength = stream.collect(
    Collectors.groupingBy(String::length)
);

Map<Boolean, List<String>> partitioned = stream.collect(
    Collectors.partitioningBy(s -> s.length() > 3)
);

// Aggregating
Long count = stream.collect(Collectors.counting());
IntSummaryStatistics stats = stream.collect(Collectors.summarizingInt(String::length));
```

### Primitive Streams
Avoid autoboxing overhead. `IntStream`, `LongStream`, `DoubleStream`.

```java
IntStream intStream = IntStream.range(1, 10); // 1 to 9
IntStream intStreamClosed = IntStream.rangeClosed(1, 10); // 1 to 10

// Mapping from Object stream to Primitive stream
IntStream lengths = list.stream().mapToInt(String::length);

// Summarizing directly
int sum = lengths.sum();
OptionalDouble avg = lengths.average();

// Back to Object Stream
Stream<Integer> boxed = intStream.boxed();
```
