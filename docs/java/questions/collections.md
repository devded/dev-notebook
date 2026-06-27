# Collections

> Add new questions below in the same format: `## Question? <Badge ... />` then the answer.

## HashMap internals? <Badge type="danger" text="hard" />

Array of buckets; key's `hashCode()` picks the bucket. Collisions form a linked list, converted to a balanced tree after a threshold (Java 8+). Load factor 0.75 triggers resize.

## ArrayList vs LinkedList? <Badge type="tip" text="easy" />

`ArrayList` = dynamic array, O(1) random access, O(n) middle insert. `LinkedList` = doubly linked, O(1) insert/remove at ends, O(n) access. Prefer `ArrayList` for most cases.

## HashMap vs Hashtable vs ConcurrentHashMap? <Badge type="warning" text="medium" />

`HashMap` is unsynchronized (allows null key/value). `Hashtable` is legacy, fully synchronized. `ConcurrentHashMap` is thread-safe with fine-grained locking — preferred for concurrency.
