# Django: Models and ORM Optimization

## Field Types & Common Options

| Field Type | Description |
|---|---|
| `CharField(max_length=...)` | String field, for short-to-mid length strings. |
| `TextField()` | Large text field. |
| `IntegerField()` | Integer. Options: `PositiveIntegerField`, `SmallIntegerField`, etc. |
| `DecimalField(max_digits, decimal_places)` | Fixed-precision decimal number. |
| `BooleanField()` | True/False field. (Use `null=True` or `NullBooleanField` for Null). |
| `DateTimeField(auto_now=False, auto_now_add=False)` | Date and time. |
| `DateField()`, `TimeField()` | Date only, Time only. |
| `ForeignKey(to, on_delete)` | Many-to-one relationship. |
| `ManyToManyField(to)` | Many-to-many relationship. |
| `OneToOneField(to, on_delete)` | One-to-one relationship. |

**Common Field Options:**
- `null=True`: Store empty values as NULL in DB.
- `blank=True`: Allow empty values in forms/validation.
- `choices=[('db_val', 'Display Val')]`: Limit choices.
- `default=...`: Default value.
- `unique=True`: Enforce uniqueness at DB level.
- `db_index=True`: Create DB index for this field.
- `help_text="..."`: Extra text displayed in forms.

## Model `Meta` Options

```python
class MyModel(models.Model):
    # ... fields ...
    class Meta:
        ordering = ['-created_at']           # Default ordering (descending)
        db_table = 'custom_table_name'       # Custom DB table name
        unique_together = [['field1', 'field2']] # Composite unique constraint
        indexes = [                          # Custom DB indexes
            models.Index(fields=['last_name', 'first_name']),
        ]
        verbose_name = 'My Model'
        verbose_name_plural = 'My Models'
        abstract = True                      # Don't create DB table, use for inheritance
```

## QuerySet API: Filtering and Retrieval

### Methods returning QuerySets
| Method | Description |
|---|---|
| `filter(**kwargs)` | Objects matching parameters. |
| `exclude(**kwargs)` | Objects NOT matching parameters. |
| `order_by(*fields)` | Order results (use `-` for descending). |
| `values(*fields)` | Returns dictionaries instead of model instances. |
| `values_list(*fields, flat=False)` | Returns tuples. If `flat=True`, returns single values. |
| `distinct([*fields])` | Eliminate duplicate rows. |
| `select_related(*fields)` | Follows foreign-key relationships, selecting additional related-object data. |
| `prefetch_related(*lookups)`| Automatically retrieves related objects for each of the specified lookups. |

### Methods not returning QuerySets
| Method | Description |
|---|---|
| `get(**kwargs)` | Returns ONE object. Raises `DoesNotExist` or `MultipleObjectsReturned`. |
| `first()`, `last()` | Returns first/last object or `None`. |
| `exists()` | Returns `True` if queryset contains any results. |
| `count()` | Returns integer count of rows. |
| `update(**kwargs)` | Performs SQL UPDATE. Returns number of rows matched. |
| `delete()` | Performs SQL DELETE. |

## Advanced Querying

### `Q` Objects (Complex OR/NOT Logic)
Use bitwise operators: `|` (OR), `&` (AND), `~` (NOT).
```python
from django.db.models import Q

# WHERE (name = 'Alice' OR name = 'Bob') AND NOT age = 20
User.objects.filter(Q(name='Alice') | Q(name='Bob'), ~Q(age=20))
```

### `F` Expressions (Database-level Operations)
Reference model field values directly in the database.
```python
from django.db.models import F

# Increment view count in DB without pulling to Python memory
Article.objects.filter(id=1).update(views=F('views') + 1)

# Compare two fields on the same model
Employee.objects.filter(salary__gt=F('bonus') * 2)
```

## Aggregation & Annotation

| Feature | Description | Example |
|---|---|---|
| **Aggregate** | Terminal clause. Returns dict of aggregate values for the entire queryset. | `Book.objects.aggregate(Avg('price'))` |
| **Annotate** | Adds aggregate values to *each item* in the QuerySet. | `Author.objects.annotate(num_books=Count('book'))` |

```python
from django.db.models import Count, Avg, Max, Min, Sum

# Group by related model and count
books_per_publisher = Publisher.objects.annotate(num_books=Count('book'))
# Access annotation: publisher.num_books
```

## ORM Optimization (The N+1 Problem)

**The Problem:** Accessing related fields on a QuerySet iteratively executes a new SQL query for each item.

### `select_related()` (For `ForeignKey` and `OneToOneField`)
Performs a SQL `JOIN` and includes the fields of the related object in the `SELECT` statement.
```python
# Unoptimized (N+1 queries):
books = Book.objects.all()
for book in books:
    print(book.publisher.name) # DB hit for every book

# Optimized (1 query):
books = Book.objects.select_related('publisher').all()
for book in books:
    print(book.publisher.name) # No DB hit
```

### `prefetch_related()` (For `ManyToManyField` and reverse `ForeignKey`)
Does a separate lookup for each relationship and does the 'joining' in Python.
```python
# Unoptimized (N+1 queries):
publishers = Publisher.objects.all()
for publisher in publishers:
    print([book.title for book in publisher.book_set.all()]) # DB hit for every publisher

# Optimized (2 queries):
publishers = Publisher.objects.prefetch_related('book_set').all()
for publisher in publishers:
    print([book.title for book in publisher.book_set.all()]) # No DB hit
```

### Optimization Checklist
1. **Use `exists()`** instead of `if queryset:` when you only need to check existence.
2. **Use `count()`** instead of `len(queryset)` if you only need the count.
3. **Use `update()` and `delete()`** directly on querysets instead of iterating over instances.
4. **Use `values()` or `values_list()`** if you don't need model instances (e.g., just passing data to a template).
5. **Only select needed fields** with `only(*fields)` or `defer(*fields)` to limit columns fetched.
6. **Use `bulk_create()`, `bulk_update()`** to minimize insert/update queries.

```python
# Bulk Create
Entry.objects.bulk_create([
    Entry(headline='This is a test'),
    Entry(headline='This is only a test'),
])

# Bulk Update
entries = Entry.objects.all()
for entry in entries:
    entry.is_published = True
Entry.objects.bulk_update(entries, ['is_published'])
```
