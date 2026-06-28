# Testing Django applications

## What types of tests should a Django project have?

A strong suite includes unit tests for pure logic, model and service tests, API tests, integration tests for database behavior, permission tests, migration tests where needed, and end-to-end tests for critical user journeys.

## What is TestCase in Django?

TestCase wraps each test in a transaction and flushes database state efficiently, making it suitable for most database tests. It also provides Django-specific assertions and test client support.

## When would you use TransactionTestCase?

Use TransactionTestCase when you need to test transaction behavior, commits, rollbacks, select_for_update, or code that cannot run inside the wrapping transaction used by TestCase. It is slower but more realistic for transaction-specific cases.

## What is the Django test client?

The test client simulates requests against Django views without running an actual server. It is useful for testing views, templates, redirects, sessions, authentication, and basic integration flows.

## How do you test DRF APIs?

Use APIClient or APIRequestFactory, authenticate test users, assert status codes, response bodies, permissions, pagination, validation errors, and database side effects. For public APIs, also test schema and backward compatibility.

## How do you test that a view does not create N+1 queries?

Use assertNumQueries around the request or serialization path with realistic fixtures. Combine it with select_related or prefetch_related and keep regression tests for important list endpoints.

## What are factories and why are they useful?

Factories create realistic test data with less duplication than manual object creation. Tools such as factory_boy help build related objects while keeping tests readable and maintainable.

## How should external services be tested?

Mock or fake external services in unit tests, use contract tests for expected payloads, and run limited integration tests against sandbox environments. Avoid depending on real third-party services for every test run.

## What makes a test flaky?

Flaky tests depend on timing, ordering, shared state, network calls, random data, time zones, or external systems. Fix by isolating state, freezing time, using deterministic fixtures, and avoiding sleeps where event synchronization is needed.

## What testing expectations are common in big-company interviews?

Interviewers expect you to discuss test pyramid trade-offs, regression tests for bugs, CI reliability, permission coverage, migration safety, contract testing, and how tests support refactoring rather than just increasing coverage percentage.

## How do you reliably mock external API calls in your Django tests to prevent actual network requests? <Badge type="warning" text="medium" />

You should never make real network requests in CI. You can use the `responses` library to intercept `requests` calls and return mock JSON, or use `unittest.mock.patch` to mock the internal service class or function that makes the call, ensuring deterministic and fast tests.

## What are the advantages of using pytest-django over Django's standard unittest framework? <Badge type="warning" text="medium" />

Pytest offers more concise assertions (just `assert x == y`), powerful fixture injection instead of complex class inheritance, better error reporting, and the ability to run subsets of tests easily. `pytest-django` adds features like `@pytest.mark.django_db` for automatic transaction rollback.

