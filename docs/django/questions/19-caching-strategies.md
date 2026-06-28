# Caching strategies

## What caching backends can Django use?

::: details View Answer
Django supports cache backends such as local memory, file-based cache, database cache, Memcached, and Redis through supported packages or integrations. Production systems commonly use Redis or Memcached.
:::

## What is per-view caching?

::: details View Answer
Per-view caching caches the entire response of a view for a configured duration. It is useful for expensive read-only pages or endpoints where all users can receive the same response or where cache keys include relevant variation.
:::

## What is template fragment caching?

::: details View Answer
Template fragment caching caches part of a rendered template. It is useful when only expensive page sections are shared or slow, while the rest of the page remains dynamic.
:::

## What is low-level caching?

::: details View Answer
Low-level caching uses the cache API directly to store computed values, query results, or expensive external responses. It gives more control over keys, timeouts, invalidation, and fallback behavior.
:::

## What makes cache invalidation difficult?

::: details View Answer
Cached data must change when underlying data changes, but dependencies can be complex. Common problems include stale permissions, tenant leakage, inconsistent keys, race conditions, and forgetting to invalidate derived data.
:::

## What is cache-aside?

::: details View Answer
In cache-aside, the application checks the cache first, loads from the database on miss, stores the result, and returns it. It is simple but can produce stampedes under high traffic unless protected.
:::

## What is a cache stampede?

::: details View Answer
A cache stampede occurs when many requests see the same expired key and recompute it simultaneously. Mitigate with locks, early refresh, jittered TTLs, background refresh, or serving stale data briefly.
:::

## How do you design safe cache keys in a multi-tenant app?

::: details View Answer
Include tenant, user or permission context when the cached value depends on them. Avoid keys that can leak one tenant's data to another. Normalize key construction and test authorization-sensitive caching paths.
:::

## Should you cache QuerySets?

::: details View Answer
Caching evaluated data can be useful, but caching lazy QuerySets is usually not helpful and can be misleading. Cache serialized results, IDs, computed values, or carefully controlled objects with clear invalidation rules.
:::

## How do you monitor cache effectiveness?

::: details View Answer
Track hit rate, miss rate, latency, evictions, memory usage, key cardinality, error rate, and downstream database load. A cache that hides bugs or leaks data is worse than no cache.
:::

## How do you use the Vary header (or @vary_on_headers) with Django's @cache_page to prevent caching issues? <Badge type="danger" text="hard" />

::: details View Answer
`Vary` tells caches that the response depends on specific headers. If a view returns user-specific data, you must add `Vary: Cookie` (using `@vary_on_cookie` or `@vary_on_headers('Cookie')`). Without it, the caching layer might serve User A's cached private data to User B, leading to severe data leaks.
:::