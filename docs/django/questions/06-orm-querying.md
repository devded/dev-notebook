# ORM querying

## What is a QuerySet?

::: details View Answer
A QuerySet represents a lazy database query. It can be filtered, sliced, annotated, ordered, and combined before evaluation. Evaluation happens when data is iterated, converted to a list, counted in some cases, serialized, or otherwise consumed.
:::

## What does QuerySet laziness mean?

::: details View Answer
Laziness means Django does not hit the database until results are needed. This allows query composition but can surprise developers when queries execute inside templates, loops, or logging statements.
:::

## What is the difference between get(), filter(), and first()?

::: details View Answer
get() expects exactly one row and raises exceptions if zero or multiple rows exist. filter() returns a QuerySet that may contain zero or more rows. first() returns the first object or None and applies a limit.
:::

## What is select_related()?

::: details View Answer
select_related() performs SQL joins and includes related single-valued objects such as ForeignKey and OneToOne relationships in the same query. It is used to prevent N+1 queries for single-valued relations.
:::

## What is prefetch_related()?

::: details View Answer
prefetch_related() performs separate queries and joins related objects in Python. It is used for many-to-many, reverse foreign key, and sometimes customized prefetches where select_related cannot work.
:::

## How do you detect N+1 query problems?

::: details View Answer
Use Django Debug Toolbar, query logging, test assertions such as assertNumQueries, APM traces, and database logs. N+1 often appears when templates or serializers access related objects inside loops without select_related or prefetch_related.
:::

## What are annotate() and aggregate()?

::: details View Answer
annotate() adds calculated values to each row or group in a QuerySet. aggregate() returns summary values for the whole QuerySet, such as count, average, min, or max.
:::

## What are F expressions?

::: details View Answer
F expressions reference database fields directly in queries and updates. They are useful for atomic increments, comparisons between fields, and avoiding race conditions caused by read-modify-write in Python.
:::

## What are Q objects?

::: details View Answer
Q objects build complex WHERE conditions with OR, AND, and NOT logic. They are useful when filters are dynamic or when the query cannot be expressed as simple keyword arguments.
:::

## How do values() and values_list() differ from normal QuerySets?

::: details View Answer
Normal QuerySets return model instances. values() returns dictionaries, and values_list() returns tuples or flat values. They reduce overhead when you only need selected fields, but you lose model methods and instance behavior.
:::

## What are the common Django exception classes and their purposes? <Badge type="warning" text="medium" />

::: details View Answer
Django has built-in exception classes for handling database and framework-level errors:
* `ObjectDoesNotExist` / `DoesNotExist`: Raised when a single-object query (like `get()`) yields no results.
* `MultipleObjectsReturned`: Raised when a single-object query yields more than one match.
* `ValidationError`: Raised when validation fails on a form, serializer, or model field.
* `PermissionDenied`: Raised when a user lacks authorized permissions for an action.
* `SuspiciousOperation`: Raised when an incoming request contains suspicious data indicative of a security threat.
:::

## How do you exclude database records matching a condition in Django ORM? <Badge type="tip" text="easy" />

::: details View Answer
Use the `.exclude()` method on a QuerySet, which acts as the inverse of `.filter()`. It generates a query that filters out all matching records.

```python
# Fetch all active users except staff members
users = User.objects.filter(is_active=True).exclude(is_staff=True)
```
:::