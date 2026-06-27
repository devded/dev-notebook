# Algorithms & Data Structures

> Add new questions below in the same format: `## Question? <Badge ... />` then the answer.

## Pros and cons of common data structures? <Badge type="warning" text="medium" />

| Structure | Strengths | Weaknesses |
| --- | --- | --- |
| Array/list | O(1) index, cache-friendly | O(n) insert/delete in middle |
| Linked list | O(1) insert/delete at ends | O(n) access, extra memory |
| Stack (LIFO) | O(1) push/pop | only top accessible |
| Queue (FIFO) | O(1) enqueue/dequeue | only ends accessible |
| Hash table | O(1) avg lookup/insert | unordered, collisions, memory |
| Tree (BST/heap) | O(log n) ordered ops | balancing needed |
| Graph | models relationships | traversal complexity |

## What is Big-O notation and why does it matter? <Badge type="warning" text="medium" />

Big-O describes how an algorithm's time/space grows with input size `n`, ignoring constants — letting you compare scalability independent of hardware. Common: O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2ⁿ).

## Time complexities of searching and sorting? <Badge type="warning" text="medium" />

- **Linear search** O(n); **binary search** O(log n) (sorted data).
- **Bubble/insertion/selection** O(n²); **merge/heap sort** O(n log n); **quicksort** O(n log n) avg, O(n²) worst; Python's **Timsort** O(n log n).

## DFS vs BFS — when to use each? <Badge type="danger" text="hard" />

**DFS** (depth-first, stack/recursion) goes deep first — good for path existence, topological sort, cycle detection; less memory on deep graphs. **BFS** (breadth-first, queue) explores level by level — finds the **shortest path** in unweighted graphs.

```python
def bfs(graph, start):
    from collections import deque
    seen, q = {start}, deque([start])
    while q:
        node = q.popleft()
        for nxt in graph[node]:
            if nxt not in seen:
                seen.add(nxt); q.append(nxt)
```

## Recursion vs iteration — when is each preferable? <Badge type="warning" text="medium" />

**Recursion** is cleaner for naturally recursive problems (trees, divide-and-conquer) but risks stack overflow and call overhead. **Iteration** is more memory-efficient and often faster. Python has no tail-call optimization and a recursion limit (~1000), so prefer iteration for deep/linear work.

## How do you reverse a linked list? <Badge type="warning" text="medium" />

Iteratively re-point each node's `next` to the previous node.

```python
def reverse(head):
    prev = None
    while head:
        head.next, prev, head = prev, head, head.next
    return prev   # new head
```

## How do you implement an LRU cache? <Badge type="danger" text="hard" />

An `OrderedDict` gives O(1) get/put while tracking recency; evict the oldest when full.

```python
from collections import OrderedDict

class LRUCache:
    def __init__(self, capacity):
        self.cap = capacity
        self.cache = OrderedDict()

    def get(self, key):
        if key not in self.cache:
            return -1
        self.cache.move_to_end(key)      # mark recently used
        return self.cache[key]

    def put(self, key, value):
        if key in self.cache:
            self.cache.move_to_end(key)
        self.cache[key] = value
        if len(self.cache) > self.cap:
            self.cache.popitem(last=False)  # evict oldest
```

(For function memoization, `functools.lru_cache` does this for you.)
