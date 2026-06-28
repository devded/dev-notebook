# Migrations and schema evolution

## What are Django migrations?

::: details View Answer
Migrations are version-controlled files that describe database schema changes over time. They let teams apply, rollback, review, and deploy schema evolution consistently across environments.
:::

## What is makemigrations?

::: details View Answer
makemigrations compares current model definitions with migration history and generates migration files. Developers should review generated migrations before committing because automatic detection may not capture data migration intent or operational safety.
:::

## What is migrate?

::: details View Answer
migrate applies unapplied migrations to the target database. It uses the migration graph and records applied migrations in the database to keep schema state synchronized.
:::

## What is a data migration?

::: details View Answer
A data migration changes data as part of schema evolution, using RunPython or RunSQL. It should be written to be repeatable, reversible when practical, efficient, and safe for production data volumes.
:::

## What makes a migration dangerous in a large production database?

::: details View Answer
Dangerous migrations include table rewrites, long locks, large backfills inside a transaction, adding non-null columns with defaults on huge tables, dropping columns used by old code, and creating indexes without considering lock behavior.
:::

## How would you add a non-nullable column safely to a large table?

::: details View Answer
Deploy in phases: add the nullable column, deploy code that writes it, backfill in batches, add validation or constraints, then make it non-null once data is complete. For large PostgreSQL tables, also consider lock behavior and online migration strategies.
:::

## What is squashmigrations?

::: details View Answer
squashmigrations combines many migrations into a smaller set to reduce migration history overhead for new installations. It requires care when older deployments may still need the original migration chain.
:::

## How do you resolve conflicting migrations?

::: details View Answer
Conflicts occur when branches create separate migration heads. Resolve by creating a merge migration or rebasing and regenerating migrations, then verify the resulting graph and database state in a clean environment.
:::

## Why should migrations be reviewed in code review?

::: details View Answer
Migrations can cause downtime, data loss, performance degradation, or rollback problems. Reviewers should inspect SQL impact, reversibility, constraints, indexes, data volume, and compatibility with rolling deployments.
:::

## How do you make migrations compatible with blue-green or rolling deployments?

::: details View Answer
Use expand-and-contract changes: first add backward-compatible schema, then deploy code that handles both old and new fields, then backfill, then remove old schema in a later release. Avoid deploying code that requires a schema not yet available on all instances.
:::

## When and why would you use --fake or --fake-initial when running Django migrations? <Badge type="warning" text="medium" />

::: details View Answer
`--fake` tells Django to mark a migration as applied in the `django_migrations` table without actually running the SQL. This is used to fix corrupted migration states or when manually altering a database. `--fake-initial` is used when adopting an existing legacy database into Django; it fakes the initial migration if the tables already exist.
:::