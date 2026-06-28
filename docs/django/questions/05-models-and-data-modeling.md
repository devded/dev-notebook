# Models and data modeling

## What is a Django model?

A model is a Python class that maps to a database table and defines fields, relationships, constraints, indexes, metadata, and behavior related to stored data. Models are the foundation for the ORM, migrations, admin, forms, and serializers.

## What is the difference between null=True and blank=True?

null=True affects the database and allows NULL values. blank=True affects validation and forms, allowing the field to be empty. For string fields, prefer blank=True with empty string unless there is a clear reason to distinguish NULL from empty.

## What is related_name used for?

related_name defines the reverse relation name from the related model back to the source model. It improves readability and avoids clashes when multiple relationships point to the same model.

## What is on_delete and why is it important?

on_delete defines what happens to dependent objects when a referenced object is deleted. Common choices include CASCADE, PROTECT, RESTRICT, SET_NULL, and DO_NOTHING. It is a business rule, not just a technical option.

## What is the difference between ForeignKey, OneToOneField, and ManyToManyField?

ForeignKey represents many-to-one, OneToOneField represents a unique one-to-one relationship, and ManyToManyField represents many-to-many via an implicit or explicit join table. Use an explicit through model when the relationship has attributes or lifecycle rules.

## When would you use a through model for ManyToManyField?

Use a through model when you need extra fields on the relationship, such as role, status, timestamps, ordering, audit data, or permissions. It also gives more control over constraints and indexing.

## What is Meta in a Django model?

The Meta class configures model-level behavior such as ordering, indexes, constraints, table name, verbose names, permissions, abstract base behavior, and unique constraints.

## What are model constraints?

Constraints enforce database-level rules such as uniqueness, conditional uniqueness, checks, and exclusions depending on backend support. They are important because application-level validation alone can fail under concurrency or multiple service entry points.

```python
from django.db import models

class Booking(models.Model):
    start_date = models.DateField()
    end_date = models.DateField()

    class Meta:
        constraints = [
            # Check constraint: end date must be after start date
            models.CheckConstraint(
                check=models.Q(end_date__gt=models.F("start_date")),
                name="booking_dates_chronological"
            )
        ]
```

## What are indexes and when should you add them?

Indexes speed up reads for filters, joins, ordering, uniqueness, and lookup-heavy workloads. Add them based on query patterns and execution plans, not blindly, because indexes increase write cost and storage usage.

## What is a custom model manager?

A custom manager adds domain-specific query entry points, such as active(), visible_to(user), or for_tenant(tenant). It keeps query construction reusable and avoids scattering filtering rules across views.

## What is NoSQL, and does Django officially support NoSQL databases? <Badge type="warning" text="medium" />

NoSQL databases store data in non-tabular formats (such as documents or key-value pairs) rather than relational tables. Django's built-in ORM is designed specifically for relational databases (like PostgreSQL, MySQL, and SQLite) and does not officially support NoSQL databases. Implementing NoSQL in Django requires third-party ORMs/wrappers (like Djongo for MongoDB) or accessing the NoSQL database directly using native Python drivers.

## What are the model inheritance styles supported by Django? <Badge type="warning" text="medium" />

Django supports three model inheritance styles:
1. **Abstract Base Classes**: Used when sharing common fields and behaviors in Python code without creating a database table for the base model.
2. **Multi-table Inheritance**: Creates separate database tables for both parent and child models, linked by an implicit one-to-one relationship.
3. **Proxy Models**: Modifies python-level behavior or default manager of a model without modifying its database table structure.

## What is the difference between CharField and TextField in Django models? <Badge type="tip" text="easy" />

`CharField` is for short-to-medium string fields (e.g., names or URLs), requires a `max_length` parameter, and maps to `VARCHAR` database columns. `TextField` is for large or unbounded text (e.g., descriptions or body text), doesn't require `max_length`, and maps to `TEXT` or `CLOB` database columns.

## What are Django signals, and when should they be used? <Badge type="warning" text="medium" />

Signals allow decoupled applications to get notified when actions occur elsewhere in the framework. Django provides built-in signals like `post_save`, `pre_save`, `post_delete`, and `pre_delete` that trigger receiver functions when model instances are modified. They should be used for cross-app coordination (e.g., creating a user profile whenever a new user is created), but avoided for core database updates because they can make code flow harder to trace and debug.

## What are the operational and performance differences between Abstract Base Classes, Multi-table Inheritance, and Proxy Models? <Badge type="warning" text="medium" />

Abstract Base Classes provide shared fields to child models without creating a database table for the base class. Multi-table Inheritance creates a table for the parent and each child, linking them with an implicit OneToOneField, which causes expensive SQL JOINs on every query. Proxy Models change Python behavior (like managers or ordering) but use the exact same database table as the original model.

## When should you override a model's save() method versus using a pre_save or post_save signal? <Badge type="warning" text="medium" />

Override `save()` when the logic is fundamentally tied to the object's persistence and should always happen (e.g., updating a computed field). Use signals when you need to decouple orthogonal logic (like sending an email or invalidating a cache) across different apps. However, remember that neither `save()` nor signals are triggered by `bulk_create` or `bulk_update`.

## How do you implement a UUID primary key in Django, and what are its performance trade-offs compared to an AutoField? <Badge type="warning" text="medium" />

You implement it by defining `id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)`. UUIDs are great for distributed systems and preventing ID enumeration. However, because UUIDv4 is random, it causes severe index fragmentation and slower insert performance in B-tree indexes compared to sequential `AutoField` integers.

