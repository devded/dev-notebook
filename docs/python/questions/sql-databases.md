# SQL & Databases

> Add new questions below in the same format: `## Question? <Badge ... />` then the answer.

## What is SQL and why does it matter for backend devs? <Badge type="tip" text="easy" />

::: details View Answer
SQL (Structured Query Language) is the standard language for querying and managing relational databases. Backend developers use it constantly to store, retrieve, and aggregate application data efficiently and reliably.
:::

## SQL vs NoSQL databases? <Badge type="tip" text="easy" />

::: details View Answer
**SQL** (relational): structured tables, fixed schema, strong consistency, joins, ACID — great for related, transactional data. **NoSQL** (document/key-value/graph/wide-column): flexible schema, horizontal scaling, eventual consistency — great for large, unstructured, or rapidly evolving data.
:::

## What are the main SQL command categories? <Badge type="warning" text="medium" />

::: details View Answer
- **DDL** (Data Definition): `CREATE`, `ALTER`, `DROP` — structure.
- **DML** (Data Manipulation): `SELECT`, `INSERT`, `UPDATE`, `DELETE` — data.
- **DCL** (Data Control): `GRANT`, `REVOKE` — permissions.
- **TCL** (Transaction Control): `COMMIT`, `ROLLBACK`, `SAVEPOINT` — transactions.
:::

## `DELETE` vs `TRUNCATE` vs `DROP`? <Badge type="warning" text="medium" />

::: details View Answer
`DELETE` removes rows (optionally with `WHERE`), logged, can be rolled back. `TRUNCATE` removes **all** rows fast, resets identity, minimal logging. `DROP` removes the **table** itself (structure and data).
:::

## What is a primary key? <Badge type="tip" text="easy" />

::: details View Answer
A column (or set) that uniquely identifies each row — non-null and unique. A table has exactly one.
:::

## What is a foreign key? <Badge type="tip" text="easy" />

::: details View Answer
A column referencing another table's primary key, enforcing referential integrity (the related row must exist).

```sql
CREATE TABLE orders (
  id INT PRIMARY KEY,
  user_id INT REFERENCES users(id)
);
```
:::

## What is normalization (1NF, 2NF, 3NF)? <Badge type="warning" text="medium" />

::: details View Answer
Organizing tables to reduce redundancy. **1NF:** atomic values, no repeating groups. **2NF:** 1NF + no partial dependency on part of a composite key. **3NF:** 2NF + no transitive dependency (non-key columns depend only on the key).
:::

## What is denormalization and when do you use it? <Badge type="warning" text="medium" />

::: details View Answer
Intentionally adding redundancy (duplicated columns, precomputed aggregates) to cut expensive joins and speed up reads — at the cost of write complexity and consistency. Used in read-heavy/reporting/analytics systems.
:::

## Explain the types of SQL joins. <Badge type="warning" text="medium" />

::: details View Answer
```sql
-- INNER: rows matching in both tables
-- LEFT:  all left rows + matches (NULLs if none)
-- RIGHT: all right rows + matches
-- FULL:  all rows from both, matched where possible
SELECT * FROM a INNER JOIN b ON a.id = b.a_id;
```
:::

## `WHERE` vs `HAVING`? <Badge type="warning" text="medium" />

::: details View Answer
`WHERE` filters rows **before** grouping; `HAVING` filters groups **after** `GROUP BY` (can use aggregates).

```sql
SELECT dept, COUNT(*) FROM emp
WHERE active = true        -- per-row
GROUP BY dept
HAVING COUNT(*) > 5;       -- per-group
```
:::

## Explain `GROUP BY` and aggregate functions. <Badge type="warning" text="medium" />

::: details View Answer
`GROUP BY` collapses rows sharing a value into groups; aggregates (`COUNT`, `SUM`, `AVG`, `MIN`, `MAX`) compute one value per group.

```sql
SELECT region, SUM(sales) FROM orders GROUP BY region;
```
:::

## What are indexes and how do they help? <Badge type="danger" text="hard" />

::: details View Answer
An index is an auxiliary data structure (usually a B-tree) that lets the DB find rows without scanning the whole table — turning O(n) lookups into O(log n). Crucial for columns used in `WHERE`, `JOIN`, and `ORDER BY`.
:::

## When can indexes slow things down? <Badge type="danger" text="hard" />

::: details View Answer
Every `INSERT`/`UPDATE`/`DELETE` must also update indexes, slowing writes. Too many/unused indexes waste space and time; low-selectivity columns barely help. Index deliberately.
:::

## Explain transactions and ACID. <Badge type="danger" text="hard" />

::: details View Answer
A transaction is an all-or-nothing unit of work. **ACID:** **A**tomicity (all or nothing), **C**onsistency (valid state to valid state), **I**solation (concurrent txns don't interfere), **D**urability (committed data survives crashes).
:::

## What transaction isolation levels exist? <Badge type="danger" text="hard" />

::: details View Answer
From weakest to strongest: **Read Uncommitted** (dirty reads), **Read Committed** (no dirty reads), **Repeatable Read** (no non-repeatable reads), **Serializable** (no phantoms). Higher isolation prevents more anomalies but reduces concurrency.
:::

## Relational vs document databases? <Badge type="warning" text="medium" />

::: details View Answer
Relational stores normalized rows across related tables with a fixed schema and joins. Document stores (e.g. MongoDB) keep self-contained JSON-like documents with flexible schemas — fewer joins, easier to scale horizontally.
:::

## When choose PostgreSQL over MySQL? <Badge type="warning" text="medium" />

::: details View Answer
PostgreSQL for advanced features and correctness: rich types (JSONB, arrays), window functions, CTEs, strict SQL compliance, extensibility. MySQL for simpler, read-heavy workloads and very wide hosting support. Both are solid; Postgres is often preferred for complex apps.
:::

## When is MongoDB a better choice? <Badge type="warning" text="medium" />

::: details View Answer
For flexible/evolving schemas, hierarchical or denormalized documents, rapid prototyping, and horizontal scaling of large datasets where rigid relations and joins aren't central.
:::

## ORM advantages and disadvantages vs raw SQL? <Badge type="warning" text="medium" />

::: details View Answer
**Pros:** less boilerplate, DB-agnostic, safer (parameterized), integrates with the language/objects. **Cons:** abstraction can hide inefficient queries (N+1), harder to express complex queries, learning curve, occasional performance cost — often mixed with raw SQL for hot paths.
:::