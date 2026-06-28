# ORM, SQLAlchemy & Extensions

## 1. How does Flask-SQLAlchemy handle database sessions differently from standard SQLAlchemy? <Badge type="warning" text="medium" />

::: details View Answer
Standard SQLAlchemy requires you to manually manage the session lifecycle (creation, scoping, committing, and closing). 
Flask-SQLAlchemy automatically manages this by using a scoped session that is tied to the Flask application context.
It uses `scoped_session` under the hood, ensuring that each web request gets its own session. When the request ends (either successfully or with an exception), Flask-SQLAlchemy automatically removes the session via `db.session.remove()`.

```mermaid
flowchart TD
    A[Request Starts] --> B[Flask App Context Pushed]
    B --> C[db.session accessed]
    C --> D{Session Exists for Context?}
    D -- No --> E[Create New Session]
    D -- Yes --> F[Return Existing Session]
    E --> G[Execute DB Operations]
    F --> G
    G --> H[Request Ends]
    H --> I[db.session.remove Called automatically]
```
:::

## 2. Explain the N+1 query problem in the context of Flask-SQLAlchemy and how to solve it. <Badge type="warning" text="medium" />

::: details View Answer
The N+1 query problem occurs when an application makes one database query to fetch a list of entities, and then makes N additional queries to fetch related entities for each of the items in the original list.
In Flask-SQLAlchemy, this usually happens with `lazy='select'` (the default) on relationships.

**Solution:**
Use eager loading techniques provided by SQLAlchemy:
1. `joinedload`: Emits a `LEFT OUTER JOIN` and loads the related collection in the same query. Best for many-to-one or one-to-one.
2. `subqueryload`: Emits a second query that re-evaluates the original query inside a subquery, joining the related table. Best for collections (one-to-many).
3. `selectinload`: Emits a second query using an `IN` clause with the primary keys of the parent objects. Often the most efficient for one-to-many collections in modern SQLAlchemy.

Example:
```python
# N+1 Problem
users = User.query.all()
for user in users:
    print(user.addresses) # Triggers a query for each user

# Solved
users = User.query.options(db.joinedload(User.addresses)).all()
```
:::

## 3. What is the difference between `db.session.flush()` and `db.session.commit()`? <Badge type="danger" text="hard" />

::: details View Answer
- **`db.session.flush()`**: Sends all pending insert, update, and delete statements to the database within the current transaction, but does NOT commit the transaction. The database processes the statements, generating primary keys (which SQLAlchemy populates back into the Python objects), but the changes are not visible to other transactions and can still be rolled back.
- **`db.session.commit()`**: Flushes pending changes (if any) and commits the current transaction. The changes become permanent and visible to other transactions. It also releases database locks and ends the transaction.

You typically use `flush()` when you need the database to generate an ID for a newly inserted object to use in subsequent operations within the same transaction.
:::

## 4. How does Flask-Migrate work under the hood? <Badge type="warning" text="medium" />

::: details View Answer
Flask-Migrate is an extension that handles SQLAlchemy database migrations for Flask applications using **Alembic**.
1. It exposes Alembic commands via the Flask CLI (e.g., `flask db migrate`, `flask db upgrade`).
2. When `flask db migrate` is run, Alembic compares the current state of the SQLAlchemy metadata (defined by your models) with the current schema of the database.
3. It generates a migration script in the `migrations/versions` directory containing `upgrade()` and `downgrade()` functions.
4. `flask db upgrade` applies the unapplied migration scripts to the database by executing the `upgrade()` functions and updating the `alembic_version` table in the database to track the current state.
:::

## 5. Explain Connection Pooling in SQLAlchemy and how Flask-SQLAlchemy configures it. <Badge type="danger" text="hard" />

::: details View Answer
Database connection pooling maintains a cache of active database connections so they can be reused for future requests, avoiding the overhead of establishing a new connection every time.

By default, SQLAlchemy uses `QueuePool`. Flask-SQLAlchemy exposes configuration variables to tune this:
- `SQLALCHEMY_POOL_SIZE`: The number of connections to keep open inside the connection pool (default: 5).
- `SQLALCHEMY_POOL_TIMEOUT`: The number of seconds to wait before giving up on getting a connection from the pool (default: 10).
- `SQLALCHEMY_POOL_RECYCLE`: Number of seconds after which a connection is automatically recycled (closed and re-opened). This is crucial to prevent "MySQL server has gone away" errors for connections that are kept alive too long. (Default is often 2 hours).
- `SQLALCHEMY_MAX_OVERFLOW`: The maximum number of connections to create above `SQLALCHEMY_POOL_SIZE` during traffic spikes.
:::

## 6. How does Flask-Login manage user sessions? <Badge type="warning" text="medium" />

::: details View Answer
Flask-Login manages user sessions by storing the user's unique ID in the Flask session cookie.
1. When a user logs in via `login_user(user)`, Flask-Login takes the user's ID (obtained via the `get_id()` method of the User model) and stores it in the signed Flask session cookie.
2. For subsequent requests, the `@login_required` decorator or `current_user` proxy triggers the `user_loader` callback.
3. The `user_loader` callback reads the user ID from the session cookie, queries the database for that user, and returns the User object.
4. This User object is then assigned to the global `current_user` proxy for the duration of the request.
:::

## 7. What is the application factory pattern and why is it important for Flask extensions? <Badge type="tip" text="easy" />

::: details View Answer
The Application Factory pattern involves creating the Flask app instance inside a function rather than in the global scope.

```python
db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config.from_object('config.Config')
    
    db.init_app(app) # Extension initialization
    
    return app
```

**Importance for Extensions:**
By globally declaring `db = SQLAlchemy()` but deferring its attachment to the app using `db.init_app(app)`, you can:
1. Create multiple application instances (e.g., for testing, development, production) without creating multiple database connection pools.
2. Avoid circular imports, as blueprints and models can import the uninitialized `db` object safely.
:::

## 8. How do you implement a Many-to-Many relationship in Flask-SQLAlchemy? <Badge type="warning" text="medium" />

::: details View Answer
A many-to-many relationship requires an association table between the two entities.

```python
# Association table (not a model, just a Table)
user_roles = db.Table('user_roles',
    db.Column('user_id', db.Integer, db.ForeignKey('user.id'), primary_key=True),
    db.Column('role_id', db.Integer, db.ForeignKey('role.id'), primary_key=True)
)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    roles = db.relationship('Role', secondary=user_roles, lazy='subquery',
        backref=db.backref('users', lazy=True))

class Role(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))
```
The `secondary` argument in `db.relationship` configures the relationship to use the association table.
:::

## 9. What are Hybrid Properties in SQLAlchemy? <Badge type="danger" text="hard" />

::: details View Answer
Hybrid properties (`@hybrid_property` from `sqlalchemy.ext.hybrid`) allow you to define properties on your models that can be evaluated both at the **instance level** (in Python) and at the **class level** (translated into SQL expressions).

```python
from sqlalchemy.ext.hybrid import hybrid_property

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50))
    last_name = db.Column(db.String(50))

    @hybrid_property
    def full_name(self):
        return f"{self.first_name} {self.last_name}"

    @full_name.expression
    def full_name(cls):
        return cls.first_name + ' ' + cls.last_name

# Instance level usage (Python execution):
user = User.query.first()
print(user.full_name) 

# Class level usage (SQL translation):
users = User.query.filter(User.full_name == 'John Doe').all()
# Translates to: WHERE first_name || ' ' || last_name = 'John Doe'
```
:::

## 10. How can you handle optimistic concurrency control in SQLAlchemy? <Badge type="danger" text="hard" />

::: details View Answer
Optimistic concurrency control prevents lost updates by using a version counter rather than locking rows.

SQLAlchemy supports this out of the box using a version ID column.

```python
class Account(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    balance = db.Column(db.Numeric)
    version = db.Column(db.Integer, nullable=False)

    __mapper_args__ = {
        'version_id_col': version
    }
```
When an update is issued, SQLAlchemy automatically adds `WHERE version = <old_version>` to the `UPDATE` statement and increments the version counter. If another transaction has already updated the row (changing the version), the `UPDATE` will affect 0 rows, and SQLAlchemy will raise a `StaleDataError`.
:::

## 11. Compare SQLAlchemy event listeners with Flask signals (Blinker). <Badge type="warning" text="medium" />

::: details View Answer
- **SQLAlchemy Event Listeners (`sqlalchemy.event`)**: These operate strictly at the ORM or Core level. They trigger on database actions like `before_insert`, `after_update`, session commits, or engine connects. They are ideal for database-centric logic like auditing, updating timestamps, or slug generation.
- **Flask Signals (Blinker)**: These operate at the Flask application level. They trigger on web-related events like `request_started`, `template_rendered`, or custom application events (e.g., `user_registered`). They are decoupled from the database and are better for application-level workflows like sending emails or invalidating caches.

**Rule of thumb**: If the action must happen *every time* a row is changed (even via a CLI script), use SQLAlchemy events. If it happens in response to a web flow, use Flask signals.
:::

## 12. How does caching work with Flask-Caching? <Badge type="warning" text="medium" />

::: details View Answer
Flask-Caching provides a uniform API over various caching backends (Redis, Memcached, SimpleCache, FileSystemCache).

It's typically used to cache view function outputs or expensive function calls:

```python
from flask_caching import Cache

cache = Cache(config={'CACHE_TYPE': 'RedisCache', 'CACHE_REDIS_URL': 'redis://localhost:6379/0'})
cache.init_app(app)

@app.route('/expensive-data')
@cache.cached(timeout=60, key_prefix='expensive_data')
def expensive_data():
    return perform_expensive_query()
```
When the route is hit, Flask-Caching generates a cache key. If the key exists in Redis, it returns the cached value, bypassing the function execution. If not, the function executes, the result is stored in Redis, and then returned.
:::

## 13. What is the Unit of Work pattern and how does SQLAlchemy implement it? <Badge type="danger" text="hard" />

::: details View Answer
The Unit of Work pattern maintains a list of objects affected by a business transaction and coordinates the writing out of changes.

In SQLAlchemy, the `Session` implements the Unit of Work.
1. When you add, modify, or delete objects, the `Session` tracks them in its internal identity map (`session.new`, `session.dirty`, `session.deleted`).
2. It does not send these changes to the database immediately.
3. When you call `session.commit()` (or `flush()`), the Unit of Work determines the correct topological order to execute `INSERT`, `UPDATE`, and `DELETE` statements based on foreign key dependencies, ensuring referential integrity is maintained.
:::

## 14. Explain Polymorphic relationships in SQLAlchemy. <Badge type="danger" text="hard" />

::: details View Answer
Polymorphic relationships allow a table to represent objects of different classes within an inheritance hierarchy. SQLAlchemy supports Single Table Inheritance, Concrete Table Inheritance, and Joined Table Inheritance.

**Joined Table Inheritance Example:**
```python
class Employee(db.Model):
    __tablename__ = 'employee'
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(50))
    
    __mapper_args__ = {
        'polymorphic_identity': 'employee',
        'polymorphic_on': type
    }

class Engineer(Employee):
    __tablename__ = 'engineer'
    id = db.Column(db.Integer, db.ForeignKey('employee.id'), primary_key=True)
    skill = db.Column(db.String(50))
    
    __mapper_args__ = {
        'polymorphic_identity': 'engineer',
    }
```
Querying `Employee.query.all()` will automatically join the `engineer` table where appropriate and return instances of both `Employee` and `Engineer`.
:::

## 15. How would you handle a database deadlock in a Flask application? <Badge type="danger" text="hard" />

::: details View Answer
A database deadlock occurs when two transactions wait on locks held by each other, causing a cycle. The database engine will abort one of the transactions.

To handle this in a Flask app using SQLAlchemy:
1. Catch the `OperationalError` exception specific to deadlocks.
2. Rollback the current session.
3. Implement a retry mechanism with exponential backoff.

```python
from sqlalchemy.exc import OperationalError
import time

def execute_with_retry(action, max_retries=3):
    for attempt in range(max_retries):
        try:
            action()
            db.session.commit()
            return
        except OperationalError as e:
            db.session.rollback()
            if "Deadlock found" in str(e):
                if attempt == max_retries - 1:
                    raise
                time.sleep(2 ** attempt) # Exponential backoff
            else:
                raise
```
:::

## 16. What is Flask-Marshmallow and how does it integrate with Flask-SQLAlchemy? <Badge type="warning" text="medium" />

::: details View Answer
Flask-Marshmallow provides integration for Marshmallow, an ORM/ODM/framework-agnostic library for converting complex datatypes (like models) to and from native Python datatypes (which can then be serialized to JSON).

With `marshmallow-sqlalchemy`, it can automatically generate schemas from your SQLAlchemy models.

```python
from flask_marshmallow import Marshmallow
ma = Marshmallow(app)

class UserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = User
        load_instance = True # Deserialize to model instances

user_schema = UserSchema()
users_schema = UserSchema(many=True)

# Usage
users = User.query.all()
result = users_schema.dump(users) # Serializes to list of dicts
```
:::

## 17. How do you execute raw SQL queries securely in Flask-SQLAlchemy? <Badge type="tip" text="easy" />

::: details View Answer
To execute raw SQL securely and prevent SQL injection, you should use SQLAlchemy's `text()` construct and bind parameters.

```python
from sqlalchemy import text

# Safe: Using bind parameters
sql = text("SELECT * FROM users WHERE username = :username")
result = db.session.execute(sql, {'username': 'admin'}).fetchall()

# DANGER: DO NOT DO THIS (SQL Injection vulnerability)
# sql = "SELECT * FROM users WHERE username = '%s'" % user_input
# db.session.execute(sql)
```
Using `text()` ensures that the database driver correctly quotes and escapes the parameters.
:::

## 18. Explain how you would manage multiple databases (binds) in Flask-SQLAlchemy. <Badge type="danger" text="hard" />

::: details View Answer
Flask-SQLAlchemy supports multiple database connections using "binds".

1. Define `SQLALCHEMY_BINDS` in your configuration:
```python
SQLALCHEMY_DATABASE_URI = 'postgres://main_db'
SQLALCHEMY_BINDS = {
    'analytics': 'postgres://analytics_db',
    'legacy': 'mysql://legacy_db'
}
```
2. Assign models to specific binds using `__bind_key__`:
```python
class LogData(db.Model):
    __bind_key__ = 'analytics'
    id = db.Column(db.Integer, primary_key=True)
    # ...
```
When you query or commit `LogData`, Flask-SQLAlchemy automatically routes the operations to the `analytics_db` connection pool. Migrations with Flask-Migrate can also be configured to handle multiple binds using the `--multidb` flag during initialization.
:::

## 19. How does Flask-SQLAlchemy's Pagination work? <Badge type="warning" text="medium" />

::: details View Answer
Flask-SQLAlchemy provides a `.paginate()` method on the query object that simplifies pagination.

```python
page = request.args.get('page', 1, type=int)
# Using legacy paginate or the new syntax in FSA 3.0+
pagination = User.query.paginate(page=page, per_page=20, error_out=False)

items = pagination.items
total_pages = pagination.pages
has_next = pagination.has_next
```
Under the hood, `.paginate()` executes two queries:
1. `SELECT count(*) FROM ...` to get the total number of items.
2. `SELECT * FROM ... LIMIT 20 OFFSET 0` to get the items for the requested page.

```mermaid
flowchart LR
    A[Call .paginate] --> B[Execute COUNT query]
    B --> C[Calculate Offset & Limit]
    C --> D[Execute data query]
    D --> E[Return Pagination Object]
```
:::

## 20. How do you implement asynchronous database queries in a Flask application? <Badge type="danger" text="hard" />

::: details View Answer
Flask 2.0+ supports `async` route handlers, but standard Flask-SQLAlchemy (which wraps synchronous SQLAlchemy) does not support true async I/O. Using sync DB calls in async Flask routes will block the event loop.

To achieve true async database queries:
1. You must use SQLAlchemy 1.4+ or 2.0 with the `asyncio` extension (`sqlalchemy.ext.asyncio`).
2. You need an async database driver (e.g., `asyncpg` for PostgreSQL, `aiomysql` for MySQL).
3. You cannot use the standard `Flask-SQLAlchemy` extension directly for async models. Instead, you manage an `AsyncSession` and `create_async_engine`.

```python
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker

engine = create_async_engine("postgresql+asyncpg://user:pass@localhost/db")
async_session = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

@app.route('/async-users')
async def get_users():
    async with async_session() as session:
        result = await session.execute(select(User))
        users = result.scalars().all()
        return jsonify([u.name for u in users])
```
*Note: Some newer extensions like `Flask-SQLAlchemy` version 3 are starting to introduce better async support, but utilizing pure SQLAlchemy 2.0 async paradigms is the most robust approach.*
:::
