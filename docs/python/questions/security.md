# Security & Best Practices

> Add new questions below in the same format: `## Question? <Badge ... />` then the answer.

## What are best practices for securing Python applications? <Badge type="warning" text="medium" />

::: details View Answer
Validate and sanitize all input, use parameterized queries, keep secrets out of code (env vars/secret managers), pin and patch dependencies, hash passwords properly, apply least-privilege, enable HTTPS/TLS, and never run untrusted input through `eval`/`exec`/`pickle`.
:::

## How do you securely handle sensitive data? <Badge type="warning" text="medium" />

::: details View Answer
Keep secrets in environment variables or a secrets manager (Vault, AWS Secrets Manager), encrypt data at rest and in transit, never log secrets, and avoid committing them — use `.gitignore` for `.env` files.

```python
import os
db_password = os.environ["DB_PASSWORD"]   # not hardcoded
```
:::

## What are common Python security vulnerabilities? <Badge type="warning" text="medium" />

::: details View Answer
SQL injection, command injection, insecure deserialization (`pickle`/`yaml.load`), use of `eval`/`exec` on input, hardcoded secrets, path traversal, SSRF, and outdated/vulnerable dependencies.
:::

## What common web vulnerabilities should every backend dev know? <Badge type="danger" text="hard" />

::: details View Answer
- **SQL Injection** — untrusted input in queries → use parameterized queries/ORM.
- **XSS (Cross-Site Scripting)** — injected scripts run in users' browsers → escape/sanitize output, set CSP.
- **CSRF (Cross-Site Request Forgery)** — tricking a logged-in user into unwanted actions → use CSRF tokens, `SameSite` cookies.
- Plus: broken auth, insecure direct object references, SSRF, security misconfiguration (see the OWASP Top 10).
:::

## How do you use `bcrypt` and `hashlib` for passwords? <Badge type="danger" text="hard" />

::: details View Answer
Never store plaintext. Use a slow, salted password hash like `bcrypt` (or `argon2`). `hashlib` is for general hashing/integrity — for passwords use its `pbkdf2_hmac`, not raw `sha256`.

```python
import bcrypt
hashed = bcrypt.hashpw(b"secret", bcrypt.gensalt())
bcrypt.checkpw(b"secret", hashed)   # True
```
:::

## What is code injection and how do you prevent it? <Badge type="danger" text="hard" />

::: details View Answer
Injection happens when untrusted input is executed as code/queries. Prevent it: never `eval`/`exec` user input, use parameterized SQL, and validate/whitelist inputs.

```python
# BAD
eval(user_input)
# GOOD — parameterized query
cur.execute("SELECT * FROM users WHERE id = ?", (user_id,))
```
:::

## How do you prevent command injection? <Badge type="danger" text="hard" />

::: details View Answer
Avoid `shell=True` with user input. Pass arguments as a list to `subprocess` so the shell never interprets them; validate inputs.

```python
import subprocess
# BAD: subprocess.run(f"ping {host}", shell=True)
subprocess.run(["ping", "-c", "1", host])   # safe: args list
```
:::

## What are the benefits of linting, and which tools are used? <Badge type="tip" text="easy" />

::: details View Answer
Linters catch bugs, style issues, and smells early, enforcing consistency across a team. Common tools: `ruff` (fast, all-in-one), `flake8`, `pylint`, `black` (formatter), `mypy` (type checking).
:::

## What is sandboxing and when is it used? <Badge type="warning" text="medium" />

::: details View Answer
Running untrusted code in an isolated, restricted environment so it can't harm the host — via containers (Docker), VMs, restricted subprocesses, or dedicated services. Used for executing user-submitted code, plugins, or analyzing malware.
:::

## What are type annotations and how do they help? <Badge type="tip" text="easy" />

::: details View Answer
Optional hints declaring expected types. They don't affect runtime but enable static checkers (`mypy`, `pyright`), better IDE help, and self-documenting code.

```python
def greet(name: str, times: int = 1) -> str:
    return f"hi {name} " * times
```
:::

## How do you manage environment variables securely? <Badge type="warning" text="medium" />

::: details View Answer
Store secrets in env vars (not code), load them with `os.environ`/`python-dotenv`, keep `.env` out of version control, and use a secrets manager in production. Fail fast if a required variable is missing.

```python
import os
key = os.environ.get("API_KEY")
if not key:
    raise RuntimeError("API_KEY not set")
```
:::

## What are the benefits and limitations of static type checking (mypy)? <Badge type="danger" text="hard" />

::: details View Answer
**Benefits:** catches type bugs before runtime, documents intent, improves IDE autocomplete/refactoring, and scales well on large codebases. **Limitations:** hints aren't enforced at runtime (no perf/safety impact unless you run a checker), can be verbose, struggle with very dynamic code, and need stubs for some untyped libraries.

```python
def total(prices: list[float]) -> float:
    return sum(prices)
# `mypy app.py` flags type mismatches; Python itself ignores the hints
```
:::

## How would you design a production-grade Python backend? <Badge type="danger" text="hard" />

::: details View Answer
A pragmatic checklist:

- **Language features:** type hints everywhere, dataclasses/Pydantic for models, context managers for resources, generators for streaming.
- **Concurrency:** `asyncio` for I/O-bound (APIs, DB, network); `multiprocessing`/a task queue (Celery) for CPU-bound — never rely on threads for CPU work (GIL).
- **Framework:** FastAPI/Flask/Django depending on needs; an ORM (SQLAlchemy/Django ORM) with parameterized queries.
- **Testing:** pyramid — many unit tests (pytest + fixtures + mocks), some integration, few E2E; run in CI.
- **Logging/observability:** structured `logging` (not `print`), correlation IDs, metrics, and error tracking (Sentry).
- **Config/secrets:** env vars / secret manager, never in code; settings per environment.
- **Code organization:** layered (API → service → repository), small modules, dependency injection, linting/formatting (ruff/black) and type checks in CI.
- **Ops:** containerized (Docker), pinned dependencies, health checks, graceful shutdown.
:::