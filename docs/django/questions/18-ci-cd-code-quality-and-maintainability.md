# CI/CD, code quality, and maintainability

## What should a Django CI pipeline run?

It should run linting, formatting checks, type checks if used, tests, migration checks, security scans, dependency audits, static asset builds if relevant, and possibly container image scans.

## How do you ensure migrations are committed?

Run makemigrations --check --dry-run in CI. This fails when model changes exist without corresponding migration files.

## What tools are common for Python/Django code quality?

Common tools include ruff, black, isort, mypy or pyright, pytest, coverage.py, bandit, pip-audit, pre-commit, and Docker-based integration checks. The exact stack depends on company standards.

## How would you structure business logic in a maintainable Django codebase?

Keep views thin, serializers focused on validation and representation, and move domain workflows into services, use cases, or model methods where appropriate. The goal is testable business logic not tightly coupled to HTTP.

## What is the risk of putting too much logic in serializers?

Serializers can become large, hard to test, and coupled to one API representation. Complex workflows, side effects, and cross-aggregate business rules are often clearer in service functions called by serializers or views.

## What is the risk of putting too much logic in models?

Models can become god objects that mix persistence, business workflows, integrations, permissions, and presentation logic. Keep model methods useful but avoid making every concern part of the model class.

## How do you handle code ownership in a large Django monolith?

Use clear app boundaries, code owners, module-level documentation, architectural decision records, service interfaces, and CI checks. Ownership should follow business domains rather than arbitrary technical folders.

## What is technical debt in a Django project?

Technical debt includes shortcuts that increase future change cost, such as untested business rules, unsafe migrations, tangled app dependencies, global state, duplicated validation, slow queries, or undocumented external integrations.

## How do you review a Django pull request?

Review correctness, permissions, data model, migrations, query count, transaction safety, tests, security, API compatibility, operational impact, and readability. In enterprise settings, also review observability and rollback strategy.

## How do you keep a Django project upgradeable?

Avoid private APIs, pin dependencies, read deprecation warnings, keep tests strong, upgrade incrementally, use supported Django versions, and remove compatibility hacks after migrations.
