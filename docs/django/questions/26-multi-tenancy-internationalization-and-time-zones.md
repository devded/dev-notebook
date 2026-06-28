# Multi-tenancy, internationalization, and time zones

## What is multi-tenancy?

::: details View Answer
Multi-tenancy means one application serves multiple customers or organizations while keeping their data and configuration isolated. Isolation can be implemented with shared tables, separate schemas, or separate databases.
:::

## What are common Django multi-tenancy approaches?

::: details View Answer
Common approaches include tenant_id columns on shared tables, PostgreSQL schemas per tenant, or separate databases per tenant. The right choice depends on isolation, scale, compliance, customization, and operational complexity.
:::

## What is the main risk in shared-table multi-tenancy?

::: details View Answer
The main risk is data leakage if tenant filters are missed. Mitigate with managers, query helpers, database constraints, row-level security where appropriate, tests, and code review rules.
:::

## How would you design tenant-aware permissions?

::: details View Answer
Tie users to tenant memberships and roles, include tenant context in queries, validate object ownership, and enforce rules in services and APIs. Never trust tenant IDs supplied by the client without checking membership.
:::

## What is internationalization in Django?

::: details View Answer
Internationalization prepares code for translation and localization using gettext, translation files, locale middleware, formatting, and language negotiation. It is important for European products serving multiple languages.
:::

## How do you mark strings for translation?

::: details View Answer
Use gettext or gettext_lazy for Python strings and trans or blocktrans in templates. Lazy translation is useful for model metadata, forms, and settings evaluated before the active language is known.
:::

## How should Django handle time zones?

::: details View Answer
Use timezone-aware datetimes, store in UTC, and convert to the user's local time at presentation boundaries. Avoid naive datetimes in application logic.
:::

## Why are time zones especially important in Europe?

::: details View Answer
European products cross multiple time zones and daylight saving changes. Scheduling, deadlines, billing, logs, and compliance records can be wrong if naive datetimes or server-local time are used.
:::

## How do you design localized formats?

::: details View Answer
Use Django's localization utilities and avoid hardcoding date, number, and currency formats. Store canonical values separately from presentation strings.
:::

## How would you test internationalization?

::: details View Answer
Test language activation, translated templates, fallback behavior, locale-specific formatting, time-zone conversions, and API behavior where clients specify language or time zone.
:::

## What is the purpose of the django.contrib.sites framework in Django? <Badge type="tip" text="easy" />

::: details View Answer
The `django.contrib.sites` framework associates database objects and configurations with specific domain websites. It allows a single Django installation to power multiple websites (e.g., `siteA.com` and `siteB.com`) by referencing the `SITE_ID` setting. For example, it is used by built-in frameworks to generate absolute URLs in emails, feed generators, or sitemaps targeting the active site.
:::