# Networking & Databases

> Add new questions below in the same format: `## Question? <Badge ... />` then the answer.

## How do you implement socket programming? <Badge type="danger" text="hard" />

::: details View Answer
Use the `socket` module. A server `bind`s, `listen`s, and `accept`s connections; a client `connect`s. Then `send`/`recv` bytes.

```python
import socket

# server
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.bind(("localhost", 9000))
s.listen()
conn, addr = s.accept()
data = conn.recv(1024)
conn.sendall(b"ack")
```
:::

## How do you make a simple HTTP request? <Badge type="tip" text="easy" />

::: details View Answer
The `requests` library is the common choice; the stdlib `urllib.request` works without dependencies.

```python
import requests
r = requests.get("https://api.example.com")
print(r.status_code, r.json())
```
:::

## How do you connect to a SQL database? <Badge type="warning" text="medium" />

::: details View Answer
Use a DB-API driver: built-in `sqlite3`, or `psycopg2`/`mysql-connector` for Postgres/MySQL. Often via an ORM like SQLAlchemy.

```python
import sqlite3
conn = sqlite3.connect("app.db")
cur = conn.cursor()
```
:::

## How do you execute a query? <Badge type="warning" text="medium" />

::: details View Answer
Use a cursor's `execute()` with **parameterized** queries (prevents SQL injection), then `fetchone`/`fetchall`; `commit` writes.

```python
cur.execute("SELECT * FROM users WHERE id = ?", (user_id,))
rows = cur.fetchall()
conn.commit()
conn.close()
```
:::

## What is a NoSQL database and how do you use it in Python? <Badge type="warning" text="medium" />

::: details View Answer
NoSQL stores non-relational data — document (MongoDB), key-value (Redis), wide-column, or graph. Schema-flexible and horizontally scalable. Use a client library like `pymongo` or `redis`.

```python
from pymongo import MongoClient
db = MongoClient()["mydb"]
db.users.insert_one({"name": "Alice"})
db.users.find_one({"name": "Alice"})
```
:::

## What is SQLite and how do you use it? <Badge type="tip" text="easy" />

::: details View Answer
A lightweight, serverless, file-based SQL database built into Python via the `sqlite3` module — great for local apps, prototyping, and tests.

```python
import sqlite3
conn = sqlite3.connect("app.db")
conn.execute("CREATE TABLE IF NOT EXISTS users (id INTEGER, name TEXT)")
conn.commit()
```
:::

## What is SQLAlchemy and its benefits? <Badge type="warning" text="medium" />

::: details View Answer
A popular SQL toolkit + ORM. The ORM maps classes to tables so you work with objects; benefits include database independence, connection pooling, migrations (with Alembic), and protection from raw SQL string-building.

```python
from sqlalchemy import create_engine, text
engine = create_engine("sqlite:///app.db")
with engine.connect() as conn:
    conn.execute(text("SELECT 1"))
```
:::

## What is a cursor? <Badge type="tip" text="easy" />

::: details View Answer
An object that executes SQL and iterates over result rows — you `execute()` queries and `fetchone()`/`fetchall()` results.

```python
cur = conn.cursor()
cur.execute("SELECT name FROM users")
rows = cur.fetchall()
```
:::

## How do you handle transactions? <Badge type="warning" text="medium" />

::: details View Answer
Group statements and `commit()` to persist or `rollback()` on error so changes are all-or-nothing.

```python
try:
    cur.execute("UPDATE accounts SET bal = bal - 100 WHERE id = 1")
    cur.execute("UPDATE accounts SET bal = bal + 100 WHERE id = 2")
    conn.commit()
except Exception:
    conn.rollback()
```
:::

## How do you use MySQL with Python? <Badge type="warning" text="medium" />

::: details View Answer
Install a driver (`mysql-connector-python` or `PyMySQL`), connect, then use a cursor like any DB-API database.

```python
import mysql.connector
conn = mysql.connector.connect(host="localhost", user="root",
                               password="pw", database="app")
cur = conn.cursor()
cur.execute("SELECT * FROM users")
```
:::

## How do you prevent SQL injection? <Badge type="danger" text="hard" />

::: details View Answer
Never build queries with string formatting of user input. Use **parameterized queries** (placeholders) — the driver escapes values safely. ORMs do this for you.

```python
# BAD: f"SELECT * FROM users WHERE name = '{name}'"
cur.execute("SELECT * FROM users WHERE name = ?", (name,))   # safe
```
:::