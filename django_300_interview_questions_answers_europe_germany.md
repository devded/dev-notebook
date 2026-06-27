# 300 Django Interview Questions and Answers

**Target:** Backend/Django interviews for European and German mid-level to senior roles, including larger product companies and enterprise environments.

**Version orientation:** Django 5.2 LTS and Django 6.0 era. Always confirm the exact version used by the company before an interview.

**How to use this file:** First pass: read all questions. Second pass: answer aloud without looking. Third pass: build short STAR stories for production incidents, performance work, migrations, and architecture trade-offs.

---


## 1. Django fundamentals and architecture

### Q001. What is Django, and why do companies use it for backend development?

**Answer:** Django is a high-level Python web framework that provides batteries-included components such as ORM, routing, templates, forms, authentication, admin, security middleware, and migrations. Companies use it because it enables fast delivery while still supporting maintainable, secure, and scalable backend systems when engineered carefully.

### Q002. Explain Django's MTV pattern.

**Answer:** Django uses Model-Template-View. The Model represents data and business persistence, the Template renders presentation, and the View coordinates request handling, business logic, and responses. It resembles MVC, but Django's View is closer to a controller and the Template is closer to the view layer.

### Q003. What happens when a request reaches a Django application?

**Answer:** The web server passes the request to WSGI or ASGI, Django creates an HttpRequest, middleware processes it, URL resolution maps it to a view, the view executes business logic, and returns an HttpResponse. Response middleware then runs before the server sends the response to the client.

### Q004. What are the main strengths and weaknesses of Django compared with Flask or FastAPI?

**Answer:** Django is stronger for full product backends because it includes ORM, admin, auth, security, forms, migrations, and conventions. Flask and FastAPI are lighter and can be better for small services or async-first APIs. In large companies the choice depends on team skill, governance, lifecycle cost, and service boundaries.

### Q005. What does 'batteries included' mean in Django?

**Answer:** It means Django ships with many production-grade components that developers otherwise would need to select and integrate separately. Examples include authentication, sessions, CSRF protection, ORM, admin, migrations, static files, internationalization, and security middleware.

### Q006. How does Django encourage maintainable application structure?

**Answer:** It encourages separation into reusable apps, declarative models, URL configuration, views, templates, forms, tests, and settings. Good teams further separate business logic into services, selectors, repositories, or domain modules instead of putting all logic in views or models.

### Q007. What is a Django app versus a Django project?

**Answer:** A project is the full Django site or service, including settings and root URL configuration. An app is a reusable module inside the project that owns a focused domain such as billing, accounts, orders, or reporting.

### Q008. When should you create a new Django app?

**Answer:** Create a new app when a domain area has its own models, behavior, API surface, tests, and lifecycle. Avoid creating apps only because a file is large; split by business capability, not by technical layer alone.

### Q009. What is the role of manage.py?

**Answer:** manage.py is a command-line utility that sets the Django settings module and delegates commands to Django's management system. It is used for development server, migrations, shell, tests, static collection, and custom management commands.

### Q010. How would you describe Django to a non-technical stakeholder?

**Answer:** Django is a mature Python framework for building secure web applications quickly. It gives the engineering team prebuilt foundations for data, users, administration, and security so they can focus on product-specific logic.


## 2. Settings, configuration, and environments

### Q011. How should settings be managed across local, staging, and production environments?

**Answer:** Use a base settings module plus environment-specific overrides, or a typed configuration layer that reads environment variables. Secrets must not be committed. Production settings should explicitly configure security, databases, cache, logging, allowed hosts, static files, and email.

### Q012. What is SECRET_KEY used for?

**Answer:** SECRET_KEY is used for cryptographic signing in Django, including sessions, password reset tokens, and other signed data. It must be unique, unpredictable, and kept secret. Rotating it requires planning because existing signed values may become invalid.

### Q013. What is ALLOWED_HOSTS and why does it matter?

**Answer:** ALLOWED_HOSTS defines which Host headers Django will accept. It protects against Host header attacks, cache poisoning, and password reset link manipulation. In production it should contain exact domains, not a broad wildcard unless there is a deliberate multi-tenant strategy.

### Q014. What is DEBUG and why must it be False in production?

**Answer:** DEBUG controls detailed error pages and other development behavior. If enabled in production it can leak settings, environment data, SQL, filesystem paths, and internal implementation details. Production should use structured logging and error monitoring instead.

### Q015. How would you manage environment variables in Docker or Kubernetes?

**Answer:** Use environment variables injected by the platform, backed by a secret manager where possible. Keep non-secret configuration in ConfigMaps or deployment manifests and secrets in Vault, AWS Secrets Manager, GCP Secret Manager, Azure Key Vault, or Kubernetes Secrets with appropriate encryption and access control.

### Q016. How do you avoid configuration drift between environments?

**Answer:** Use infrastructure as code, repeatable deployment pipelines, validated settings checks, and automated smoke tests. Keep environment differences explicit and minimal. Production-like staging reduces surprises around databases, caches, queues, security headers, and external integrations.

### Q017. What are Django system checks?

**Answer:** System checks are validations run by Django to detect configuration, model, security, or compatibility problems. They run during commands such as check and can be extended with custom checks for organizational policies.

### Q018. What is INSTALLED_APPS used for?

**Answer:** INSTALLED_APPS tells Django which applications are active. It controls model discovery, migrations, templates, static files, admin registration, checks, signals, and app configuration.

### Q019. What is MIDDLEWARE ordering and why is it important?

**Answer:** Middleware is executed in order for requests and reverse order for responses. Ordering matters because authentication depends on sessions, CSRF checks must occur at the right point, and security or compression middleware can affect final response behavior.

### Q020. What settings would you review before deploying a Django app in Germany or the EU?

**Answer:** Review DEBUG, SECRET_KEY, ALLOWED_HOSTS, CSRF_COOKIE_SECURE, SESSION_COOKIE_SECURE, SECURE_SSL_REDIRECT, HSTS, database encryption, logging of personal data, cookie consent, retention policies, and GDPR-related data processing responsibilities.


## 3. URL routing, views, and request lifecycle

### Q021. How does Django route a URL to a view?

**Answer:** Django loads the root URLconf, evaluates urlpatterns in order, and uses path converters or regex patterns to match the request path. The matched view receives the request and captured parameters.

### Q022. What is the difference between path() and re_path()?

**Answer:** path() uses simpler route patterns and converters such as int, slug, uuid, and str. re_path() uses regular expressions and is useful for complex legacy patterns, but path() is clearer for most modern URL routing.

### Q023. What is include() used for in URL configuration?

**Answer:** include() delegates part of the URL tree to another URLconf. It lets each app own its URL patterns, improves modularity, and avoids one large root routing file.

### Q024. What is a function-based view?

**Answer:** A function-based view is a Python function that accepts a request and returns a response. It is explicit, easy to read for simple endpoints, and works well when logic is straightforward.

### Q025. What is a class-based view?

**Answer:** A class-based view organizes request handling into methods such as get(), post(), dispatch(), and mixins. It improves reuse for common patterns, but can become hard to understand when too many mixins are layered.

### Q026. When would you choose a function-based view over a class-based view?

**Answer:** Choose a function-based view for simple or highly custom logic where explicit control is more readable. Choose class-based views when you benefit from generic behavior such as list, detail, create, update, delete, or shared mixins.

### Q027. What is dispatch() in a class-based view?

**Answer:** dispatch() receives the request and routes it to the method matching the HTTP verb, such as get() or post(). It is also a common place for cross-cutting logic in mixins, though middleware or decorators may be cleaner.

### Q028. What is HttpRequest and what does it contain?

**Answer:** HttpRequest represents the incoming request. It includes method, path, headers, GET parameters, POST data, cookies, user, session, body, files, and metadata. Some attributes depend on middleware.

### Q029. What is HttpResponse?

**Answer:** HttpResponse is the base response object returned by Django views. It contains content, status code, headers, cookies, and related response metadata. Subclasses include JsonResponse, FileResponse, StreamingHttpResponse, and redirects.

### Q030. How would you handle a 404 in Django?

**Answer:** Raise Http404 in a view or use helpers such as get_object_or_404. In production, configure custom 404 templates or handlers to avoid leaking internals and to provide a useful user experience.


## 4. Templates, forms, and admin

### Q031. What is Django's template language designed for?

**Answer:** It is designed for safe presentation logic, not arbitrary Python execution. It supports variable interpolation, filters, tags, inheritance, includes, escaping, and localization while discouraging business logic in templates.

### Q032. What is template inheritance?

**Answer:** Template inheritance lets a base template define common layout and child templates override named blocks. It avoids duplication across pages and helps maintain consistent HTML structure.

### Q033. Why does Django autoescape template output?

**Answer:** Autoescaping protects against cross-site scripting by escaping user-controlled values before rendering them as HTML. Developers should only mark content safe when it has been sanitized or is trusted.

### Q034. What is the difference between Form and ModelForm?

**Answer:** Form defines fields and validation manually. ModelForm derives fields from a model and can create or update model instances. ModelForm is convenient but should still explicitly define allowed fields to avoid mass-assignment risks.

### Q035. Where should form validation logic live?

**Answer:** Field-specific validation belongs in clean_<field>(), cross-field validation belongs in clean(), and model-level invariants may belong in model validation or domain services. Critical business rules should not exist only in templates or JavaScript.

### Q036. What is the Django admin best used for?

**Answer:** The admin is best for trusted internal operational workflows such as content management, support tooling, and back-office data maintenance. It is usually not a replacement for a custom customer-facing product UI.

### Q037. How do you customize the Django admin?

**Answer:** Use ModelAdmin options such as list_display, search_fields, list_filter, ordering, readonly_fields, fieldsets, inlines, actions, custom forms, and custom permissions. For advanced workflows, override admin views carefully or build separate internal tools.

### Q038. What risks exist when exposing Django admin in production?

**Answer:** Risks include brute-force attacks, excessive privileges, data leaks, unsafe custom actions, and accidental destructive changes. Mitigate with strong authentication, MFA or SSO, least privilege, audit logs, rate limiting, network restrictions where appropriate, and careful permission design.

### Q039. What are admin actions?

**Answer:** Admin actions are bulk operations users can execute on selected rows. They are useful for internal workflows but must be permission-checked, auditable, idempotent where possible, and safe for large querysets.

### Q040. How can forms help security beyond validation?

**Answer:** Forms centralize input parsing, type conversion, validation, error reporting, and cleaned_data access. They reduce the chance of trusting raw request.POST and help prevent invalid or malicious input from reaching business logic.


## 5. Models and data modeling

### Q041. What is a Django model?

**Answer:** A model is a Python class that maps to a database table and defines fields, relationships, constraints, indexes, metadata, and behavior related to stored data. Models are the foundation for the ORM, migrations, admin, forms, and serializers.

### Q042. What is the difference between null=True and blank=True?

**Answer:** null=True affects the database and allows NULL values. blank=True affects validation and forms, allowing the field to be empty. For string fields, prefer blank=True with empty string unless there is a clear reason to distinguish NULL from empty.

### Q043. What is related_name used for?

**Answer:** related_name defines the reverse relation name from the related model back to the source model. It improves readability and avoids clashes when multiple relationships point to the same model.

### Q044. What is on_delete and why is it important?

**Answer:** on_delete defines what happens to dependent objects when a referenced object is deleted. Common choices include CASCADE, PROTECT, RESTRICT, SET_NULL, and DO_NOTHING. It is a business rule, not just a technical option.

### Q045. What is the difference between ForeignKey, OneToOneField, and ManyToManyField?

**Answer:** ForeignKey represents many-to-one, OneToOneField represents a unique one-to-one relationship, and ManyToManyField represents many-to-many via an implicit or explicit join table. Use an explicit through model when the relationship has attributes or lifecycle rules.

### Q046. When would you use a through model for ManyToManyField?

**Answer:** Use a through model when you need extra fields on the relationship, such as role, status, timestamps, ordering, audit data, or permissions. It also gives more control over constraints and indexing.

### Q047. What is Meta in a Django model?

**Answer:** The Meta class configures model-level behavior such as ordering, indexes, constraints, table name, verbose names, permissions, abstract base behavior, and unique constraints.

### Q048. What are model constraints?

**Answer:** Constraints enforce database-level rules such as uniqueness, conditional uniqueness, checks, and exclusions depending on backend support. They are important because application-level validation alone can fail under concurrency or multiple service entry points.

### Q049. What are indexes and when should you add them?

**Answer:** Indexes speed up reads for filters, joins, ordering, uniqueness, and lookup-heavy workloads. Add them based on query patterns and execution plans, not blindly, because indexes increase write cost and storage usage.

### Q050. What is a custom model manager?

**Answer:** A custom manager adds domain-specific query entry points, such as active(), visible_to(user), or for_tenant(tenant). It keeps query construction reusable and avoids scattering filtering rules across views.


## 6. ORM querying

### Q051. What is a QuerySet?

**Answer:** A QuerySet represents a lazy database query. It can be filtered, sliced, annotated, ordered, and combined before evaluation. Evaluation happens when data is iterated, converted to a list, counted in some cases, serialized, or otherwise consumed.

### Q052. What does QuerySet laziness mean?

**Answer:** Laziness means Django does not hit the database until results are needed. This allows query composition but can surprise developers when queries execute inside templates, loops, or logging statements.

### Q053. What is the difference between get(), filter(), and first()?

**Answer:** get() expects exactly one row and raises exceptions if zero or multiple rows exist. filter() returns a QuerySet that may contain zero or more rows. first() returns the first object or None and applies a limit.

### Q054. What is select_related()?

**Answer:** select_related() performs SQL joins and includes related single-valued objects such as ForeignKey and OneToOne relationships in the same query. It is used to prevent N+1 queries for single-valued relations.

### Q055. What is prefetch_related()?

**Answer:** prefetch_related() performs separate queries and joins related objects in Python. It is used for many-to-many, reverse foreign key, and sometimes customized prefetches where select_related cannot work.

### Q056. How do you detect N+1 query problems?

**Answer:** Use Django Debug Toolbar, query logging, test assertions such as assertNumQueries, APM traces, and database logs. N+1 often appears when templates or serializers access related objects inside loops without select_related or prefetch_related.

### Q057. What are annotate() and aggregate()?

**Answer:** annotate() adds calculated values to each row or group in a QuerySet. aggregate() returns summary values for the whole QuerySet, such as count, average, min, or max.

### Q058. What are F expressions?

**Answer:** F expressions reference database fields directly in queries and updates. They are useful for atomic increments, comparisons between fields, and avoiding race conditions caused by read-modify-write in Python.

### Q059. What are Q objects?

**Answer:** Q objects build complex WHERE conditions with OR, AND, and NOT logic. They are useful when filters are dynamic or when the query cannot be expressed as simple keyword arguments.

### Q060. How do values() and values_list() differ from normal QuerySets?

**Answer:** Normal QuerySets return model instances. values() returns dictionaries, and values_list() returns tuples or flat values. They reduce overhead when you only need selected fields, but you lose model methods and instance behavior.


## 7. Advanced ORM and query correctness

### Q061. What is defer() or only() used for?

**Answer:** defer() postpones loading specific fields and only() loads only selected fields initially. They can reduce payload size for wide tables, but careless use can create extra queries when deferred fields are later accessed.

### Q062. What is bulk_create()?

**Answer:** bulk_create() inserts many objects efficiently in fewer queries. It bypasses some per-object save behavior and signals depending on options and backend, so it should be used when you understand those trade-offs.

### Q063. What is bulk_update()?

**Answer:** bulk_update() updates selected fields across many model instances efficiently. It is useful for batch jobs but can bypass custom save() logic and may produce large SQL statements if used with very large batches.

### Q064. What is update_or_create() and what should you be careful about?

**Answer:** update_or_create() fetches an object matching lookup arguments, updates it if found, or creates it otherwise. Under concurrency it may still require database uniqueness constraints and transaction handling to avoid duplicates.

### Q065. What is get_or_create() and when can it race?

**Answer:** get_or_create() tries to retrieve an object and creates it if absent. It can race when no database-level unique constraint protects the lookup fields, so correctness depends on constraints and transaction semantics.

### Q066. How would you write efficient existence checks?

**Answer:** Use exists() when you only need to know whether at least one matching row exists. It avoids loading full model instances and usually produces a cheaper SQL query than evaluating the entire QuerySet.

### Q067. How should you handle very large QuerySets?

**Answer:** Use pagination, streaming patterns, iterator(), chunking by primary key, background jobs, and database-side filtering. Avoid loading millions of rows into memory or doing per-row queries inside loops.

### Q068. What are database functions in Django ORM?

**Answer:** Database functions such as Lower, Coalesce, Cast, Trunc, Extract, JSONObject, and window functions allow computation in SQL while remaining inside the ORM. They are useful for reporting, filtering, normalization, and analytics.

### Q069. What are Subquery and OuterRef used for?

**Answer:** Subquery and OuterRef express correlated subqueries in ORM code. They help annotate rows with related computed values, such as latest event time, without pulling all data into Python.

### Q070. When would you use raw SQL in a Django project?

**Answer:** Use raw SQL for database-specific optimizations, complex reports, unsupported SQL features, or performance-critical queries that the ORM cannot express cleanly. Keep it isolated, parameterized, tested, documented, and reviewed for portability and security.


## 8. Migrations and schema evolution

### Q071. What are Django migrations?

**Answer:** Migrations are version-controlled files that describe database schema changes over time. They let teams apply, rollback, review, and deploy schema evolution consistently across environments.

### Q072. What is makemigrations?

**Answer:** makemigrations compares current model definitions with migration history and generates migration files. Developers should review generated migrations before committing because automatic detection may not capture data migration intent or operational safety.

### Q073. What is migrate?

**Answer:** migrate applies unapplied migrations to the target database. It uses the migration graph and records applied migrations in the database to keep schema state synchronized.

### Q074. What is a data migration?

**Answer:** A data migration changes data as part of schema evolution, using RunPython or RunSQL. It should be written to be repeatable, reversible when practical, efficient, and safe for production data volumes.

### Q075. What makes a migration dangerous in a large production database?

**Answer:** Dangerous migrations include table rewrites, long locks, large backfills inside a transaction, adding non-null columns with defaults on huge tables, dropping columns used by old code, and creating indexes without considering lock behavior.

### Q076. How would you add a non-nullable column safely to a large table?

**Answer:** Deploy in phases: add the nullable column, deploy code that writes it, backfill in batches, add validation or constraints, then make it non-null once data is complete. For large PostgreSQL tables, also consider lock behavior and online migration strategies.

### Q077. What is squashmigrations?

**Answer:** squashmigrations combines many migrations into a smaller set to reduce migration history overhead for new installations. It requires care when older deployments may still need the original migration chain.

### Q078. How do you resolve conflicting migrations?

**Answer:** Conflicts occur when branches create separate migration heads. Resolve by creating a merge migration or rebasing and regenerating migrations, then verify the resulting graph and database state in a clean environment.

### Q079. Why should migrations be reviewed in code review?

**Answer:** Migrations can cause downtime, data loss, performance degradation, or rollback problems. Reviewers should inspect SQL impact, reversibility, constraints, indexes, data volume, and compatibility with rolling deployments.

### Q080. How do you make migrations compatible with blue-green or rolling deployments?

**Answer:** Use expand-and-contract changes: first add backward-compatible schema, then deploy code that handles both old and new fields, then backfill, then remove old schema in a later release. Avoid deploying code that requires a schema not yet available on all instances.


## 9. Transactions, concurrency, and consistency

### Q081. What is transaction.atomic()?

**Answer:** transaction.atomic() creates a database transaction block. If the block completes, changes commit; if an exception escapes, changes roll back. Nested atomic blocks use savepoints depending on configuration and backend.

### Q082. When should you use transactions in Django?

**Answer:** Use transactions when multiple database operations must succeed or fail together, such as payments, inventory updates, order creation, or permission changes. Keep transactions short to avoid lock contention.

### Q083. What is select_for_update()?

**Answer:** select_for_update() locks selected rows until the transaction commits or rolls back. It is used to prevent concurrent updates to the same rows, such as account balances, inventory, or job claims.

### Q084. How would you prevent double-spending or duplicate order processing?

**Answer:** Use idempotency keys, database constraints, transactions, row-level locks, unique references, and state-machine transitions. Do not rely only on application checks before writes because concurrent requests can pass the same check.

### Q085. What are race conditions in Django applications?

**Answer:** Race conditions occur when concurrent requests or workers read and write shared data in an unsafe order. They are common in counters, bookings, payments, inventory, and status transitions. Mitigation usually requires database constraints, atomic updates, locks, or queues.

### Q086. How can F expressions help avoid race conditions?

**Answer:** F expressions let the database update a value based on its current value atomically, such as views = F('views') + 1. This avoids lost updates caused by reading a value into Python, modifying it, and saving it later.

### Q087. What is optimistic locking?

**Answer:** Optimistic locking allows concurrent reads but detects conflicting writes using a version number, timestamp, or conditional update. If the row changed since it was read, the update fails and the application retries or reports a conflict.

### Q088. What is pessimistic locking?

**Answer:** Pessimistic locking prevents conflicts by locking data before modification, often with select_for_update. It improves correctness for critical sections but can reduce throughput and cause deadlocks if locks are held too long or acquired inconsistently.

### Q089. What is transaction.on_commit()?

**Answer:** transaction.on_commit() registers callbacks to run only after the surrounding transaction successfully commits. It is useful for sending Celery tasks, emails, or cache invalidations that should not happen if the transaction rolls back.

### Q090. Why should external API calls usually not happen inside a database transaction?

**Answer:** External calls can be slow, fail unpredictably, and hold database locks longer than necessary. A safer pattern is to commit local state, then trigger external side effects through an outbox, task queue, or on_commit callback.


## 10. PostgreSQL and database performance

### Q091. Why is PostgreSQL commonly used with Django in large companies?

**Answer:** PostgreSQL is mature, reliable, feature-rich, and well supported by Django. It provides strong transactions, indexing options, JSON support, full-text search, constraints, extensions, and operational tooling.

### Q092. How do you inspect SQL generated by Django ORM?

**Answer:** Use str(queryset.query), database query logging, Django Debug Toolbar, APM traces, or connection.queries in development. For performance work, inspect the actual query plan using EXPLAIN or EXPLAIN ANALYZE.

### Q093. What is EXPLAIN ANALYZE used for?

**Answer:** It shows the database execution plan and actual runtime statistics. It helps identify sequential scans, bad joins, missing indexes, misestimated row counts, expensive sorts, and slow aggregation.

### Q094. What are common causes of slow Django database queries?

**Answer:** Common causes include missing indexes, N+1 queries, loading too many rows, expensive annotations, unbounded pagination, inefficient joins, stale statistics, lock waits, and doing Python-side processing that should be done in SQL.

### Q095. What is connection pooling and why might it matter?

**Answer:** Connection pooling reuses database connections instead of opening a new connection for every request or worker. It reduces overhead and protects the database from too many concurrent connections, especially in containerized deployments.

### Q096. How would you design pagination for a large table?

**Answer:** Offset pagination is simple but can become slow for deep pages. Cursor or keyset pagination using stable ordering is better for high-volume APIs because it avoids scanning and skipping many rows.

### Q097. What is a partial index?

**Answer:** A partial index indexes only rows matching a condition, such as active=true or deleted_at IS NULL. It can reduce index size and improve performance when queries frequently filter on that condition.

### Q098. What is a covering index?

**Answer:** A covering index contains all columns needed by a query, allowing the database to satisfy the query using the index alone in some cases. It can speed up read-heavy paths but increases write and storage cost.

### Q099. How do you handle soft deletes in Django?

**Answer:** Use a deleted_at timestamp or status field, default managers that hide deleted rows, constraints that account for active rows, and clear policies for uniqueness, retention, restoration, and hard deletion. Be careful that admin, raw queries, and related managers respect the policy.

### Q100. What database metrics would you monitor for a Django service?

**Answer:** Monitor query latency, slow queries, connection count, lock waits, deadlocks, transaction duration, replication lag, cache hit ratio, CPU, I/O, table bloat, index usage, and error rates.


## 11. Authentication, authorization, and sessions

### Q101. What does django.contrib.auth provide?

**Answer:** It provides users, groups, permissions, password hashing, authentication backends, login/logout views, decorators, mixins, and integration with sessions and admin. Many companies extend it rather than replacing it entirely.

### Q102. What is the difference between authentication and authorization?

**Answer:** Authentication verifies who the user is. Authorization determines what the authenticated user is allowed to do. Confusing the two often leads to security bugs.

### Q103. How do Django sessions work by default?

**Answer:** Django stores a session key in a cookie and stores session data server-side in the configured session backend, commonly the database or cache. Signed-cookie sessions store data client-side but must be used carefully because clients can see the data even if they cannot tamper with it.

### Q104. What are authentication backends?

**Answer:** Authentication backends define how credentials are checked and how permissions are loaded. They allow integration with LDAP, SSO, OAuth, custom user identifiers, or object-level permission systems.

### Q105. Why is a custom user model recommended early in a project?

**Answer:** Changing the user model later is painful because it affects foreign keys, migrations, admin, forms, and authentication. Starting with a custom user model gives flexibility for email login, UUID primary keys, profile fields, or organization-specific identity rules.

### Q106. How do permissions work in Django?

**Answer:** Django creates add, change, delete, and view permissions for models. Users can receive permissions directly or through groups. Custom permissions can be defined in model Meta and enforced in views, admin, APIs, and business logic.

### Q107. What are object-level permissions?

**Answer:** Object-level permissions decide access per object, such as whether a user can edit a specific invoice or project. Django has hooks for object permissions, but full implementation often requires custom logic or packages such as django-guardian.

### Q108. How would you implement SSO in a Django application?

**Answer:** Use a standard protocol such as OIDC, OAuth2, or SAML through a maintained library or identity provider integration. Map external identities to local users, validate tokens, handle group or role mapping, and define account provisioning and deprovisioning rules.

### Q109. What is MFA and when should it be required?

**Answer:** Multi-factor authentication requires an additional factor beyond password, such as TOTP, WebAuthn, or hardware keys. It should be required for admin, privileged users, financial workflows, and systems handling sensitive data.

### Q110. How should password storage be handled in Django?

**Answer:** Use Django's built-in password hashers and never store plain-text passwords. Passwords are salted and hashed with strong adaptive algorithms. Teams should monitor framework security releases and avoid custom password hashing.


## 12. Security and OWASP concerns

### Q111. How does Django protect against CSRF?

**Answer:** Django uses CSRF middleware and tokens to ensure state-changing requests come from trusted forms or clients. For APIs, CSRF rules depend on whether session authentication or token-based authentication is used.

### Q112. How does Django help prevent XSS?

**Answer:** Django templates autoescape variables by default. Developers must still avoid unsafe mark_safe usage, sanitize rich text, set security headers, validate input, and be careful with JavaScript contexts.

### Q113. How does Django help prevent SQL injection?

**Answer:** The ORM parameterizes queries and escapes values properly when used correctly. Raw SQL must use parameters rather than string concatenation. SQL injection is still possible if developers build unsafe raw queries.

### Q114. What is clickjacking and how does Django mitigate it?

**Answer:** Clickjacking tricks users into clicking hidden or framed UI elements. Django provides X-Frame-Options middleware to control whether pages can be embedded in frames.

### Q115. What is SecurityMiddleware?

**Answer:** SecurityMiddleware provides production security features such as HTTPS redirect, HSTS, content type sniffing protection, referrer policy, cross-origin opener policy, and related headers depending on settings and Django version.

### Q116. What is HSTS and when should it be enabled?

**Answer:** HTTP Strict Transport Security tells browsers to use HTTPS for future requests. Enable it only after confirming HTTPS works for all subdomains and deployment paths, because a bad HSTS rollout can lock users out.

### Q117. How would you secure cookies in production?

**Answer:** Set Secure, HttpOnly, SameSite, appropriate domain and path, and reasonable expiry. For sessions and CSRF cookies, use SESSION_COOKIE_SECURE, CSRF_COOKIE_SECURE, and SameSite settings consistent with authentication and cross-site requirements.

### Q118. What are common insecure Django deployment mistakes?

**Answer:** Common mistakes include DEBUG=True, weak SECRET_KEY, wildcard ALLOWED_HOSTS, missing HTTPS, unpatched Django versions, exposed admin without protection, excessive permissions, logging secrets, and unsafe file uploads.

### Q119. How should file uploads be secured?

**Answer:** Validate file type and size, store outside executable paths, use randomized names, scan when needed, restrict direct access, serve through controlled URLs, and avoid trusting client-provided MIME types or filenames.

### Q120. How do you keep dependencies secure?

**Answer:** Pin dependencies, use lock files, scan with tools such as pip-audit or Snyk, monitor Django security releases, update regularly, and run automated tests before deployment. Avoid abandoned packages in security-critical paths.


## 13. GDPR, privacy, and European compliance

### Q121. What GDPR principles affect Django application design?

**Answer:** Key principles include lawfulness, fairness, transparency, purpose limitation, data minimization, accuracy, storage limitation, integrity, confidentiality, and accountability. These principles affect models, logs, analytics, consent, retention, exports, and deletion workflows.

### Q122. How would you implement the right to erasure?

**Answer:** Define what can be deleted, anonymized, or retained for legal obligations. Implement deletion workflows that cover primary records, related data, files, backups policy, search indexes, caches, analytics, and third-party processors.

### Q123. How would you support data export requests?

**Answer:** Build a controlled export process that gathers the user's personal data from relevant systems, serializes it in a portable format, logs the request, verifies identity, and avoids exposing other users' data.

### Q124. Why is logging personal data risky?

**Answer:** Logs are often copied to external systems, retained longer, and accessed by more people than application data. Avoid logging personal data, secrets, tokens, session IDs, payment details, and sensitive request bodies unless there is a strong, documented reason and protection.

### Q125. What is data minimization in a Django model?

**Answer:** It means only storing fields required for a defined purpose. Avoid collecting unnecessary dates of birth, addresses, IDs, IP addresses, or free-text sensitive information when the product does not need them.

### Q126. How would you design audit logs under GDPR?

**Answer:** Audit logs should record necessary security and compliance events while minimizing personal data. They need retention policies, access controls, integrity protection, and a clear legal basis when they contain user identifiers.

### Q127. How do cookie rules affect Django apps in Europe?

**Answer:** Strictly necessary cookies such as session cookies may be treated differently from analytics or marketing cookies. Non-essential cookies usually require informed consent before placement, so Django integration with analytics must respect consent state.

### Q128. What is privacy by design?

**Answer:** Privacy by design means considering privacy requirements during architecture and development, not after launch. In Django this includes model design, permissions, retention jobs, pseudonymization, secure defaults, and review of third-party services.

### Q129. How would you handle production data in developer environments?

**Answer:** Avoid copying production personal data to local machines. If unavoidable, use strong approval, minimization, anonymization or pseudonymization, encryption, access logs, and deletion timelines.

### Q130. What would German enterprise clients expect around data residency and processors?

**Answer:** They may expect clarity on hosting region, subprocessors, data processing agreements, retention, access controls, breach procedures, encryption, and auditability. Engineering should be able to explain where data flows and how operational access is controlled.


## 14. Django REST Framework basics

### Q131. What is Django REST Framework?

**Answer:** Django REST Framework, or DRF, is a toolkit for building Web APIs on top of Django. It provides serializers, views, viewsets, routers, authentication, permissions, throttling, pagination, filtering, and browsable API support.

### Q132. What is a serializer in DRF?

**Answer:** A serializer converts complex objects such as model instances into primitive data types for rendering, and validates incoming data for deserialization. It is similar to a form for APIs but also controls representation.

### Q133. What is the difference between Serializer and ModelSerializer?

**Answer:** Serializer requires fields and validation to be defined explicitly. ModelSerializer derives fields and default create/update behavior from a Django model. ModelSerializer is convenient but should still explicitly list fields.

### Q134. What is a ViewSet?

**Answer:** A ViewSet groups related API actions such as list, retrieve, create, update, partial_update, and destroy into one class. Routers can automatically generate URL patterns for ViewSets.

### Q135. What is an APIView?

**Answer:** APIView is DRF's class-based view foundation for API endpoints. It gives explicit control over HTTP methods while adding DRF request parsing, authentication, permissions, throttling, and response handling.

### Q136. When would you use APIView instead of ModelViewSet?

**Answer:** Use APIView for custom workflows, non-CRUD endpoints, webhooks, or operations that do not map cleanly to a model resource. Use ModelViewSet for standard CRUD resources when conventions are helpful.

### Q137. What is partial_update?

**Answer:** partial_update handles PATCH requests where only some fields are supplied. Serializers receive partial=True so required-field validation is adjusted for partial updates.

### Q138. What is the browsable API?

**Answer:** The browsable API is an HTML interface generated by DRF for interacting with API endpoints during development or internal use. It is useful for debugging but may be disabled or restricted in production depending on security policy.

### Q139. How does DRF handle request parsing?

**Answer:** DRF chooses a parser based on content type, such as JSONParser, FormParser, or MultiPartParser. Parsed data is available as request.data, unlike raw Django request.POST which only covers form data.

### Q140. How does DRF render responses?

**Answer:** DRF uses renderer classes, such as JSONRenderer or BrowsableAPIRenderer, based on content negotiation. Most production APIs primarily use JSON, but renderer configuration can be customized globally or per view.


## 15. DRF authentication, permissions, and API governance

### Q141. What is the difference between authentication_classes and permission_classes in DRF?

**Answer:** Authentication identifies the user or client making the request. Permissions decide whether that authenticated or anonymous principal may perform the action.

### Q142. What DRF authentication methods are common in enterprise systems?

**Answer:** Common methods include session authentication for internal tools, token authentication for simple APIs, JWT/OIDC for modern SSO, OAuth2 for delegated access, and mTLS or signed requests for service-to-service calls.

### Q143. What is IsAuthenticated?

**Answer:** IsAuthenticated is a DRF permission class that allows only authenticated users. It does not by itself enforce object ownership, roles, tenant boundaries, or business-specific authorization.

### Q144. What is has_object_permission()?

**Answer:** has_object_permission() checks authorization for a specific object, usually after the object is retrieved. It is needed for object-level rules such as ownership, organization membership, or per-resource roles.

### Q145. What is throttling in DRF?

**Answer:** Throttling limits request rates by user, IP, scope, or custom keys. It protects against abuse, accidental traffic spikes, brute force behavior, and expensive endpoints being overused.

### Q146. What is API versioning?

**Answer:** API versioning allows clients to migrate between incompatible API changes. DRF supports strategies such as URL path, namespace, host name, query parameter, and accept header versioning.

### Q147. How would you deprecate an API endpoint?

**Answer:** Communicate deprecation timelines, add response headers or documentation warnings, monitor client usage, provide migration guides, and remove only after the agreed support window. Big companies expect predictable lifecycle management.

### Q148. What is pagination in DRF?

**Answer:** Pagination splits large result sets into pages. DRF supports page number, limit-offset, and cursor pagination. Cursor pagination is often preferred for high-volume stable feeds.

### Q149. How do you implement filtering and ordering in DRF?

**Answer:** Use filter backends such as DjangoFilterBackend, SearchFilter, and OrderingFilter, or custom filter logic. Always whitelist allowed filter and ordering fields to avoid performance and data exposure problems.

### Q150. How do you document DRF APIs for large teams?

**Answer:** Generate OpenAPI schemas with tools such as drf-spectacular or DRF's schema support, keep examples accurate, document errors, versioning, authentication, rate limits, pagination, and idempotency behavior.


## 16. API design and integration scenarios

### Q151. What makes a REST API resource-oriented?

**Answer:** It exposes stable resources using nouns, standard HTTP methods, status codes, representations, and links or identifiers. Business actions can still exist, but the API should not become a random collection of RPC-style endpoints without structure.

### Q152. What is idempotency and why does it matter?

**Answer:** An operation is idempotent if repeating it has the same effect as executing it once. It matters for retries, payment flows, order creation, and distributed systems where clients may not know whether the first request succeeded.

### Q153. How would you implement idempotency keys in Django?

**Answer:** Store a client-provided key with request fingerprint, user or tenant, status, and response metadata under a uniqueness constraint. Wrap processing in a transaction and return the previous result when the same key is retried.

### Q154. What status code would you return after creating a resource?

**Answer:** Usually return 201 Created with the created representation or a Location header. For asynchronous creation, 202 Accepted may be more appropriate.

### Q155. How should validation errors be represented in APIs?

**Answer:** Use a consistent error structure with field errors, non-field errors, machine-readable codes, and human-readable messages. Avoid leaking internals and document error formats so clients can handle them reliably.

### Q156. What is the difference between PUT and PATCH?

**Answer:** PUT usually replaces a resource representation, while PATCH applies partial modifications. APIs should define exact semantics and validation behavior because clients depend on consistency.

### Q157. How do you design APIs for backward compatibility?

**Answer:** Avoid removing fields, changing meanings, narrowing enum values, changing error formats, or altering pagination behavior without versioning. Additive changes are safer, but still require client communication and contract tests.

### Q158. What is a webhook and how should a Django app receive one securely?

**Answer:** A webhook is an HTTP callback from another system. Verify signatures, timestamps, replay protection, source IP only if reliable, idempotency, schema validation, and queue processing. Respond quickly and process heavy work asynchronously.

### Q159. How do you handle third-party API failures?

**Answer:** Use timeouts, retries with backoff, circuit breakers, idempotency, clear error states, and background reconciliation. Do not let slow external systems hold web request threads or database locks.

### Q160. How would you design an API for both web and mobile clients?

**Answer:** Use stable versioned endpoints, pagination, filtering, compact payloads, explicit error codes, backward compatibility, and authentication suitable for each client type. Avoid tying API design to one frontend's current screen layout.


## 17. Testing Django applications

### Q161. What types of tests should a Django project have?

**Answer:** A strong suite includes unit tests for pure logic, model and service tests, API tests, integration tests for database behavior, permission tests, migration tests where needed, and end-to-end tests for critical user journeys.

### Q162. What is TestCase in Django?

**Answer:** TestCase wraps each test in a transaction and flushes database state efficiently, making it suitable for most database tests. It also provides Django-specific assertions and test client support.

### Q163. When would you use TransactionTestCase?

**Answer:** Use TransactionTestCase when you need to test transaction behavior, commits, rollbacks, select_for_update, or code that cannot run inside the wrapping transaction used by TestCase. It is slower but more realistic for transaction-specific cases.

### Q164. What is the Django test client?

**Answer:** The test client simulates requests against Django views without running an actual server. It is useful for testing views, templates, redirects, sessions, authentication, and basic integration flows.

### Q165. How do you test DRF APIs?

**Answer:** Use APIClient or APIRequestFactory, authenticate test users, assert status codes, response bodies, permissions, pagination, validation errors, and database side effects. For public APIs, also test schema and backward compatibility.

### Q166. How do you test that a view does not create N+1 queries?

**Answer:** Use assertNumQueries around the request or serialization path with realistic fixtures. Combine it with select_related or prefetch_related and keep regression tests for important list endpoints.

### Q167. What are factories and why are they useful?

**Answer:** Factories create realistic test data with less duplication than manual object creation. Tools such as factory_boy help build related objects while keeping tests readable and maintainable.

### Q168. How should external services be tested?

**Answer:** Mock or fake external services in unit tests, use contract tests for expected payloads, and run limited integration tests against sandbox environments. Avoid depending on real third-party services for every test run.

### Q169. What makes a test flaky?

**Answer:** Flaky tests depend on timing, ordering, shared state, network calls, random data, time zones, or external systems. Fix by isolating state, freezing time, using deterministic fixtures, and avoiding sleeps where event synchronization is needed.

### Q170. What testing expectations are common in big-company interviews?

**Answer:** Interviewers expect you to discuss test pyramid trade-offs, regression tests for bugs, CI reliability, permission coverage, migration safety, contract testing, and how tests support refactoring rather than just increasing coverage percentage.


## 18. CI/CD, code quality, and maintainability

### Q171. What should a Django CI pipeline run?

**Answer:** It should run linting, formatting checks, type checks if used, tests, migration checks, security scans, dependency audits, static asset builds if relevant, and possibly container image scans.

### Q172. How do you ensure migrations are committed?

**Answer:** Run makemigrations --check --dry-run in CI. This fails when model changes exist without corresponding migration files.

### Q173. What tools are common for Python/Django code quality?

**Answer:** Common tools include ruff, black, isort, mypy or pyright, pytest, coverage.py, bandit, pip-audit, pre-commit, and Docker-based integration checks. The exact stack depends on company standards.

### Q174. How would you structure business logic in a maintainable Django codebase?

**Answer:** Keep views thin, serializers focused on validation and representation, and move domain workflows into services, use cases, or model methods where appropriate. The goal is testable business logic not tightly coupled to HTTP.

### Q175. What is the risk of putting too much logic in serializers?

**Answer:** Serializers can become large, hard to test, and coupled to one API representation. Complex workflows, side effects, and cross-aggregate business rules are often clearer in service functions called by serializers or views.

### Q176. What is the risk of putting too much logic in models?

**Answer:** Models can become god objects that mix persistence, business workflows, integrations, permissions, and presentation logic. Keep model methods useful but avoid making every concern part of the model class.

### Q177. How do you handle code ownership in a large Django monolith?

**Answer:** Use clear app boundaries, code owners, module-level documentation, architectural decision records, service interfaces, and CI checks. Ownership should follow business domains rather than arbitrary technical folders.

### Q178. What is technical debt in a Django project?

**Answer:** Technical debt includes shortcuts that increase future change cost, such as untested business rules, unsafe migrations, tangled app dependencies, global state, duplicated validation, slow queries, or undocumented external integrations.

### Q179. How do you review a Django pull request?

**Answer:** Review correctness, permissions, data model, migrations, query count, transaction safety, tests, security, API compatibility, operational impact, and readability. In enterprise settings, also review observability and rollback strategy.

### Q180. How do you keep a Django project upgradeable?

**Answer:** Avoid private APIs, pin dependencies, read deprecation warnings, keep tests strong, upgrade incrementally, use supported Django versions, and remove compatibility hacks after migrations.


## 19. Caching strategies

### Q181. What caching backends can Django use?

**Answer:** Django supports cache backends such as local memory, file-based cache, database cache, Memcached, and Redis through supported packages or integrations. Production systems commonly use Redis or Memcached.

### Q182. What is per-view caching?

**Answer:** Per-view caching caches the entire response of a view for a configured duration. It is useful for expensive read-only pages or endpoints where all users can receive the same response or where cache keys include relevant variation.

### Q183. What is template fragment caching?

**Answer:** Template fragment caching caches part of a rendered template. It is useful when only expensive page sections are shared or slow, while the rest of the page remains dynamic.

### Q184. What is low-level caching?

**Answer:** Low-level caching uses the cache API directly to store computed values, query results, or expensive external responses. It gives more control over keys, timeouts, invalidation, and fallback behavior.

### Q185. What makes cache invalidation difficult?

**Answer:** Cached data must change when underlying data changes, but dependencies can be complex. Common problems include stale permissions, tenant leakage, inconsistent keys, race conditions, and forgetting to invalidate derived data.

### Q186. What is cache-aside?

**Answer:** In cache-aside, the application checks the cache first, loads from the database on miss, stores the result, and returns it. It is simple but can produce stampedes under high traffic unless protected.

### Q187. What is a cache stampede?

**Answer:** A cache stampede occurs when many requests see the same expired key and recompute it simultaneously. Mitigate with locks, early refresh, jittered TTLs, background refresh, or serving stale data briefly.

### Q188. How do you design safe cache keys in a multi-tenant app?

**Answer:** Include tenant, user or permission context when the cached value depends on them. Avoid keys that can leak one tenant's data to another. Normalize key construction and test authorization-sensitive caching paths.

### Q189. Should you cache QuerySets?

**Answer:** Caching evaluated data can be useful, but caching lazy QuerySets is usually not helpful and can be misleading. Cache serialized results, IDs, computed values, or carefully controlled objects with clear invalidation rules.

### Q190. How do you monitor cache effectiveness?

**Answer:** Track hit rate, miss rate, latency, evictions, memory usage, key cardinality, error rate, and downstream database load. A cache that hides bugs or leaks data is worse than no cache.


## 20. Async, background jobs, and real-time features

### Q191. What is the difference between WSGI and ASGI?

**Answer:** WSGI is the traditional synchronous Python web server interface. ASGI supports both synchronous and asynchronous protocols and enables async views, WebSockets, and long-lived connections when the stack supports them.

### Q192. Does async Django automatically make database queries non-blocking?

**Answer:** No. Async views help for non-blocking I/O, but database ORM operations may still require sync-to-async boundaries unless using supported async ORM methods. Incorrect async usage can reduce performance instead of improving it.

### Q193. When should you use async views in Django?

**Answer:** Use async views for endpoints dominated by concurrent I/O, such as calling multiple external APIs, long polling, or streaming. Do not use async just for CPU-bound work or normal database-heavy CRUD without understanding bottlenecks.

### Q194. What is Celery commonly used for in Django projects?

**Answer:** Celery runs background jobs such as emails, reports, imports, exports, notifications, billing reconciliation, image processing, and scheduled tasks. It decouples slow or retryable work from request-response latency.

### Q195. What problems can occur with background tasks?

**Answer:** Tasks can run twice, fail halfway, see stale data, overload dependencies, or execute before a transaction commits. Design tasks to be idempotent, retry-safe, observable, and triggered after commit where appropriate.

### Q196. What is an outbox pattern?

**Answer:** The outbox pattern writes an event or message to a database table in the same transaction as business data. A separate worker publishes it reliably, reducing the chance of losing side effects after commit.

### Q197. What is Django Channels used for?

**Answer:** Django Channels adds support for WebSockets and other asynchronous protocols. It is useful for real-time notifications, chat, dashboards, collaborative features, and event streams.

### Q198. How would you scale WebSockets in Django?

**Answer:** Use ASGI workers, a channel layer such as Redis, load balancer support for long-lived connections, authentication on connect, backpressure controls, and horizontal scaling with careful resource limits.

### Q199. How do you schedule periodic tasks in a Django ecosystem?

**Answer:** Use Celery Beat, django-q, APScheduler, Kubernetes CronJobs, or cloud scheduler services. The right choice depends on reliability, observability, locking, deployment topology, and operational ownership.

### Q200. How do you prevent multiple workers from running the same scheduled job concurrently?

**Answer:** Use distributed locks, database advisory locks, unique job rows, scheduler singleton configuration, or idempotent task design. In Kubernetes or autoscaled environments, assume multiple instances can exist.


## 21. Deployment, WSGI/ASGI, and production runtime

### Q201. How is a Django application typically deployed?

**Answer:** Common deployments use Gunicorn or uWSGI for WSGI, Uvicorn/Daphne/Hypercorn for ASGI, behind Nginx, a load balancer, or a platform ingress. Static files, media, database, cache, and background workers are deployed as separate concerns.

### Q202. What is Gunicorn?

**Answer:** Gunicorn is a Python WSGI HTTP server commonly used to run Django in production. It manages worker processes and delegates HTTP handling behind a reverse proxy or platform load balancer.

### Q203. What is Uvicorn?

**Answer:** Uvicorn is an ASGI server used for async-capable Python applications. It can run Django ASGI applications and is common when async views or WebSockets are needed.

### Q204. Why should the Django development server not be used in production?

**Answer:** It is designed for development convenience, not production security, robustness, performance, or process management. Production requires a proper application server and reverse proxy or platform runtime.

### Q205. What is collectstatic?

**Answer:** collectstatic gathers static files from apps and configured directories into STATIC_ROOT for serving by a web server, CDN, WhiteNoise, or object storage pipeline.

### Q206. How should user-uploaded media be served in production?

**Answer:** Store media in durable storage such as object storage or a shared volume, serve through controlled URLs or CDN, validate access permissions when needed, and avoid routing large file delivery through Django unless authorization requires it.

### Q207. What are health checks for Django services?

**Answer:** Health checks are endpoints used by load balancers and orchestrators to determine whether an instance is alive and ready. Readiness may check database, cache, migrations, or critical dependencies, while liveness should be lightweight.

### Q208. How do you handle zero-downtime deployments?

**Answer:** Use rolling or blue-green deployments, backward-compatible migrations, readiness checks, graceful worker shutdown, versioned assets, and rollback plans. Avoid changes that require all instances to switch at exactly the same moment.

### Q209. What is graceful shutdown?

**Answer:** Graceful shutdown lets workers finish active requests or tasks before exiting. It prevents dropped requests, partial work, and inconsistent behavior during deployments or autoscaling.

### Q210. What would you include in a production runbook for Django?

**Answer:** Include deployment steps, rollback steps, migrations policy, environment variables, operational dashboards, alert definitions, common failure modes, task queue operations, database procedures, and escalation contacts.


## 22. Docker, Kubernetes, and cloud infrastructure

### Q211. How would you containerize a Django app?

**Answer:** Use a minimal Python base image, install pinned dependencies, copy application code, run as a non-root user, configure environment variables, expose the app server command, and separate web, worker, scheduler, and migration jobs.

### Q212. What should not be baked into a Docker image?

**Answer:** Do not bake secrets, environment-specific settings, local databases, private credentials, or generated runtime state into the image. Images should be portable and configured at runtime.

### Q213. How do migrations run in Kubernetes deployments?

**Answer:** Use a controlled migration job, release pipeline step, or init process with locking. Avoid every application pod trying to run migrations independently unless there is a safe coordination mechanism.

### Q214. How do you manage static files in containerized Django deployments?

**Answer:** Either collect static during image build or release, then serve through WhiteNoise, Nginx, CDN, or object storage. Keep the approach consistent so asset versions match deployed code.

### Q215. What are Kubernetes readiness and liveness probes?

**Answer:** Readiness probes decide whether a pod should receive traffic. Liveness probes decide whether a pod should be restarted. Django readiness may include dependency checks, while liveness should avoid expensive checks that cause restart loops.

### Q216. How do you scale Django horizontally?

**Answer:** Run multiple stateless web instances behind a load balancer, externalize sessions if needed, use shared database/cache/storage, scale workers separately, and ensure background jobs and scheduled tasks are coordinated.

### Q217. What breaks stateless scaling in Django?

**Answer:** Local file storage, local memory sessions, in-process caches, singleton assumptions, local task queues, and per-instance scheduled jobs can break horizontal scaling. Move shared state to external services.

### Q218. How would you configure secrets in cloud deployments?

**Answer:** Use managed secret stores, IAM-based access, rotation policies, audit logs, and least privilege. Inject secrets at runtime and avoid printing them in logs or exposing them in error pages.

### Q219. What cloud services are commonly paired with Django?

**Answer:** Common services include managed PostgreSQL, Redis, object storage, CDN, container orchestration, secret management, monitoring, log aggregation, message queues, and email delivery services.

### Q220. What infrastructure topics might German enterprise interviews include?

**Answer:** Expect questions about EU regions, data residency, IAM, audit logs, encryption, incident response, disaster recovery, Kubernetes operations, Terraform, and compliance-friendly deployment practices.


## 23. Observability, logging, and incident response

### Q221. What is observability?

**Answer:** Observability is the ability to understand system behavior from outputs such as logs, metrics, traces, events, and profiles. For Django, it helps diagnose slow requests, errors, database issues, queue delays, and dependency failures.

### Q222. What should Django application logs include?

**Answer:** Logs should include timestamp, level, service, environment, request ID, user or tenant identifier when safe, path, status, latency, error details, and correlation IDs. Avoid secrets and unnecessary personal data.

### Q223. What is structured logging?

**Answer:** Structured logging emits machine-parseable fields, often JSON, instead of only free-text messages. It improves searching, alerting, dashboards, and incident analysis.

### Q224. What metrics would you collect for Django web requests?

**Answer:** Collect request count, latency percentiles, status code distribution, error rate, throughput, active workers, database query latency, cache hit rate, external API latency, and saturation signals.

### Q225. What traces are useful in Django?

**Answer:** Distributed traces show time spent in middleware, views, serializers, ORM queries, cache, external APIs, templates, and background tasks. They help locate bottlenecks across service boundaries.

### Q226. How do you use request IDs?

**Answer:** Generate or propagate a request ID for each incoming request and include it in logs, responses, and downstream calls. It lets engineers trace one user request across Django, workers, proxies, and external services.

### Q227. What is an SLO?

**Answer:** A Service Level Objective is a measurable reliability target, such as 99.9% successful requests under 300 ms for a key endpoint. SLOs guide alerting and engineering trade-offs.

### Q228. What should an alert be based on?

**Answer:** Alerts should focus on user impact and actionable symptoms, such as high error rate, high latency, failed payments, queue backlog, or database unavailability. Avoid noisy alerts that do not require human action.

### Q229. How would you investigate a sudden increase in 500 errors?

**Answer:** Check deployment timeline, error tracking, logs with request IDs, changed dependencies, database health, external APIs, feature flags, and traffic patterns. Roll back if the issue is severe and a recent release is strongly correlated.

### Q230. What should a post-incident review include?

**Answer:** It should include timeline, impact, detection, root causes, contributing factors, what worked, what failed, and concrete follow-up actions. The tone should be blameless and focused on system improvement.


## 24. Performance and scalability

### Q231. How do you approach Django performance optimization?

**Answer:** Start with measurement: latency percentiles, traces, query plans, CPU, memory, cache, and traffic patterns. Optimize the real bottleneck, validate improvement, and avoid premature complexity.

### Q232. What are common Django performance bottlenecks?

**Answer:** Common bottlenecks include N+1 queries, slow database queries, inefficient serializers, template rendering overhead, large payloads, cache misses, slow external APIs, too few workers, and CPU-heavy work inside requests.

### Q233. How do you optimize a slow DRF list endpoint?

**Answer:** Inspect queries, add select_related or prefetch_related, limit fields, paginate, avoid expensive SerializerMethodField loops, add indexes, cache stable data, and profile serialization time separately from database time.

### Q234. What is SerializerMethodField and what is the performance risk?

**Answer:** SerializerMethodField computes representation values in Python. It can cause N+1 queries or expensive per-row work if it accesses related data or external services inside a list serializer.

### Q235. How do you reduce response payload size?

**Answer:** Use pagination, field selection, concise representations, compression, separate detail endpoints, avoid embedding huge nested objects, and return links or IDs where appropriate.

### Q236. What is horizontal scaling?

**Answer:** Horizontal scaling adds more application instances to handle load. Django web instances are usually easy to scale horizontally when they are stateless and shared services handle database, cache, storage, and sessions.

### Q237. What is vertical scaling?

**Answer:** Vertical scaling increases resources of an existing instance, such as CPU or memory. It can be simple but has limits and may not improve bottlenecks caused by database locks, slow queries, or external APIs.

### Q238. How do you tune Gunicorn workers?

**Answer:** Tune based on CPU cores, workload type, memory usage, request latency, blocking I/O, and load testing. Too few workers reduce throughput; too many can exhaust memory or database connections.

### Q239. How do you protect a Django app from overload?

**Answer:** Use rate limiting, throttling, timeouts, queue backpressure, circuit breakers, autoscaling, caching, database connection limits, load shedding, and graceful degradation.

### Q240. What is graceful degradation?

**Answer:** Graceful degradation means keeping critical functionality available when non-critical dependencies fail. For example, checkout should work even if recommendation widgets, analytics, or email previews are unavailable.


## 25. Architecture, domain design, and monoliths

### Q241. Is a Django monolith always bad?

**Answer:** No. A well-structured monolith can be simpler, faster to develop, easier to test, and operationally cheaper than microservices. Problems arise when boundaries are unclear, deployments are risky, or team ownership conflicts grow.

### Q242. When would you split a Django monolith into services?

**Answer:** Consider splitting when a domain needs independent scaling, deployment, data ownership, security boundary, or team autonomy. Splitting too early can create distributed systems complexity without business value.

### Q243. How do you keep app boundaries clean in Django?

**Answer:** Define ownership, avoid circular imports, keep domain APIs explicit, limit cross-app model access, document dependencies, and use service functions or events for cross-domain workflows.

### Q244. What is a service layer in Django?

**Answer:** A service layer contains application workflows that coordinate models, permissions, transactions, and side effects. It can make views, serializers, and tasks thinner and business logic easier to test.

### Q245. What is a selector pattern?

**Answer:** Selectors are functions or classes that encapsulate read queries for a domain, such as visible_projects_for(user). They centralize query logic and improve reuse, testing, and performance tuning.

### Q246. What is domain-driven design in a Django context?

**Answer:** It means organizing code around business concepts and invariants rather than only technical layers. Django apps, services, models, and events should reflect the language and boundaries of the business domain.

### Q247. What is an anti-corruption layer?

**Answer:** It is a translation layer between your domain and an external system or legacy model. It prevents external concepts, field names, and failure modes from leaking throughout your core code.

### Q248. How do you handle cross-app workflows?

**Answer:** Use explicit service orchestration, domain events, task queues, or well-defined interfaces rather than random imports and signal side effects. Keep transaction boundaries and ownership clear.

### Q249. Are Django signals good for business logic?

**Answer:** Signals are useful for decoupled framework events, but hidden business workflows in signals can be hard to trace, test, and reason about. Prefer explicit service calls for critical business behavior.

### Q250. How would you explain a major architectural decision in an interview?

**Answer:** State the context, constraints, options considered, trade-offs, decision, consequences, and how you would revisit it. Big-company interviews value balanced reasoning more than one fashionable pattern.


## 26. Multi-tenancy, internationalization, and time zones

### Q251. What is multi-tenancy?

**Answer:** Multi-tenancy means one application serves multiple customers or organizations while keeping their data and configuration isolated. Isolation can be implemented with shared tables, separate schemas, or separate databases.

### Q252. What are common Django multi-tenancy approaches?

**Answer:** Common approaches include tenant_id columns on shared tables, PostgreSQL schemas per tenant, or separate databases per tenant. The right choice depends on isolation, scale, compliance, customization, and operational complexity.

### Q253. What is the main risk in shared-table multi-tenancy?

**Answer:** The main risk is data leakage if tenant filters are missed. Mitigate with managers, query helpers, database constraints, row-level security where appropriate, tests, and code review rules.

### Q254. How would you design tenant-aware permissions?

**Answer:** Tie users to tenant memberships and roles, include tenant context in queries, validate object ownership, and enforce rules in services and APIs. Never trust tenant IDs supplied by the client without checking membership.

### Q255. What is internationalization in Django?

**Answer:** Internationalization prepares code for translation and localization using gettext, translation files, locale middleware, formatting, and language negotiation. It is important for European products serving multiple languages.

### Q256. How do you mark strings for translation?

**Answer:** Use gettext or gettext_lazy for Python strings and trans or blocktrans in templates. Lazy translation is useful for model metadata, forms, and settings evaluated before the active language is known.

### Q257. How should Django handle time zones?

**Answer:** Use timezone-aware datetimes, store in UTC, and convert to the user's local time at presentation boundaries. Avoid naive datetimes in application logic.

### Q258. Why are time zones especially important in Europe?

**Answer:** European products cross multiple time zones and daylight saving changes. Scheduling, deadlines, billing, logs, and compliance records can be wrong if naive datetimes or server-local time are used.

### Q259. How do you design localized formats?

**Answer:** Use Django's localization utilities and avoid hardcoding date, number, and currency formats. Store canonical values separately from presentation strings.

### Q260. How would you test internationalization?

**Answer:** Test language activation, translated templates, fallback behavior, locale-specific formatting, time-zone conversions, and API behavior where clients specify language or time zone.


## 27. Files, email, payments, and external integrations

### Q261. How does Django handle file uploads?

**Answer:** Uploaded files are available through request.FILES and can be stored using configured storage backends. For production, storage often points to object storage, and validation plus access control must be designed explicitly.

### Q262. What is DEFAULT_FILE_STORAGE or STORAGES used for?

**Answer:** Django storage configuration controls how files are saved and retrieved. Modern Django projects configure storage backends for static files and media files, often using local storage in development and cloud object storage in production.

### Q263. How do you send email from Django?

**Answer:** Use Django's email utilities with a configured email backend. In production, use a reliable provider, handle bounces where relevant, avoid blocking user requests, and send most emails through background tasks.

### Q264. How would you implement password reset securely?

**Answer:** Use Django's built-in token-based reset flow or a similarly signed, time-limited token design. Avoid revealing whether an email exists, rate-limit requests, log abuse signals, and ensure reset links use the correct trusted domain.

### Q265. How should payments be integrated into a Django app?

**Answer:** Use a payment provider, treat provider webhooks as source of truth for final payment state, use idempotency keys, store minimal payment data, never store raw card data unless certified, and reconcile asynchronously.

### Q266. How do you verify payment webhooks?

**Answer:** Validate provider signatures, timestamps, event IDs, and expected account or environment. Store processed event IDs under a unique constraint to prevent duplicate processing.

### Q267. What is the risk of relying only on frontend payment success pages?

**Answer:** Users can close the browser, network calls can fail, and malicious clients can fake frontend state. Backend confirmation should rely on provider APIs or signed webhooks.

### Q268. How do you integrate with a legacy SOAP or XML system?

**Answer:** Create a dedicated adapter layer, validate schemas, handle timeouts and retries, normalize errors, map external data into internal domain objects, and test with fixtures or contract tests.

### Q269. How do you handle API credentials for third-party services?

**Answer:** Store credentials in a secret manager, scope them minimally, rotate them, avoid logging them, and separate credentials by environment. Use audit logs for access to production secrets.

### Q270. How do you make integrations observable?

**Answer:** Log correlation IDs, external request latency, status codes, retry counts, circuit breaker state, and business-level outcomes. Build dashboards for dependency failures and queues that back up when providers are down.


## 28. Python knowledge expected in Django interviews

### Q271. Why is Python knowledge important for Django roles?

**Answer:** Django is Python code, so performance, correctness, typing, packaging, concurrency, and readability depend on core Python skill. Senior interviews often test Python fundamentals alongside Django-specific patterns.

### Q272. What is a decorator and where is it used in Django?

**Answer:** A decorator wraps a function or method to add behavior. Django uses decorators for login_required, permission_required, csrf_exempt, cache control, and custom access checks.

### Q273. What is a context manager and how does Django use it?

**Answer:** A context manager controls setup and teardown around a block using with. Django uses this pattern in transaction.atomic(), override_settings(), database cursor handling, and tests.

### Q274. What are generators useful for?

**Answer:** Generators produce values lazily, reducing memory usage for streams or large sequences. In Django, streaming responses or batch processing can benefit, but database and transaction behavior must be considered carefully.

### Q275. What is the GIL and does it affect Django?

**Answer:** The Global Interpreter Lock limits execution of Python bytecode by multiple threads in one CPython process. Django apps often bottleneck on I/O, but CPU-heavy work should move to separate processes, workers, or specialized services.

### Q276. What is the difference between a list comprehension and a generator expression?

**Answer:** A list comprehension builds the full list immediately, while a generator expression yields values lazily. For large data, generator expressions can reduce memory, but they can only be consumed once.

### Q277. Why should mutable default arguments be avoided?

**Answer:** Mutable defaults are created once at function definition time and shared across calls. This can cause unexpected state leakage between requests, tests, or users.

### Q278. What is type hinting useful for in Django projects?

**Answer:** Type hints improve readability, IDE support, refactoring safety, and static analysis. They are especially useful in service layers, domain code, and integration boundaries, even when dynamic ORM typing is imperfect.

### Q279. What is dependency injection in Python/Django?

**Answer:** Dependency injection means passing dependencies explicitly instead of hardcoding them. It makes services easier to test and swap, such as payment clients, email senders, or storage adapters.

### Q280. How do you profile Python code in a Django service?

**Answer:** Use cProfile, py-spy, scalene, APM profilers, logging timers, and database traces. Profile under realistic data and traffic because microbenchmarks can mislead.


## 29. System design scenarios for Django

### Q281. Design a Django URL shortener.

**Answer:** Use a Link model with unique short code, target URL, owner, timestamps, and status. Redirect through a fast lookup path with caching, track analytics asynchronously, validate URLs, prevent abuse, and design collision-resistant code generation.

### Q282. Design a Django booking system that prevents double booking.

**Answer:** Use a Booking model with resource, time range, status, and constraints. Enforce conflicts at the database level where possible, use transactions and locks, validate time zones, and make payment or confirmation workflows idempotent.

### Q283. Design a Django notification system.

**Answer:** Create notification templates, user preferences, delivery channels, and event records. Generate notifications through domain events or tasks, deduplicate, respect consent, retry delivery, and provide auditability.

### Q284. Design a file upload service in Django.

**Answer:** Use direct-to-object-storage uploads for large files, signed URLs, metadata records in Django, validation jobs, virus scanning where required, access control, retention policies, and CDN delivery for public assets.

### Q285. Design an audit trail for a financial Django app.

**Answer:** Record actor, action, object, before/after summary, timestamp, request ID, IP or device context where lawful, and integrity controls. Keep audit logs append-only, access-controlled, searchable, and covered by retention policy.

### Q286. Design a multi-tenant SaaS backend.

**Answer:** Model tenants, memberships, roles, billing, configuration, and tenant-scoped data. Enforce tenant isolation in queries and permissions, test cross-tenant access, monitor noisy tenants, and define data export/deletion procedures.

### Q287. Design a high-volume product catalog API.

**Answer:** Use normalized core models, denormalized read models or search index if needed, caching, cursor pagination, selective fields, background indexing, and clear consistency expectations between database and search.

### Q288. Design an order processing workflow.

**Answer:** Use explicit order states, transactions for local state changes, idempotency keys, payment webhooks, background fulfillment tasks, outbox events, and reconciliation jobs. Make every state transition auditable.

### Q289. Design a GDPR data deletion pipeline.

**Answer:** Accept verified requests, mark deletion workflow state, delete or anonymize data across models and external systems, remove files, clear caches/search indexes, log compliance actions, and handle legal retention exceptions.

### Q290. Design a real-time dashboard with Django.

**Answer:** Use normal HTTP APIs for initial data and WebSockets or server-sent events for updates. Push events through Channels or a message broker, aggregate expensive metrics asynchronously, and protect subscriptions with permissions.


## 30. Germany/EU big-company behavioral and senior discussion

### Q291. How would you explain a production incident you caused?

**Answer:** Use a blameless but accountable structure: what happened, impact, detection, immediate mitigation, root cause, what you learned, and what systemic changes you made. Avoid blaming individuals or hiding responsibility.

### Q292. How do you handle disagreement with a tech lead about architecture?

**Answer:** Clarify goals and constraints, present trade-offs with evidence, propose a reversible experiment when possible, and align on decision criteria. Once a decision is made, support it unless there is a serious risk that must be escalated.

### Q293. How do you balance delivery speed and code quality?

**Answer:** Separate essential quality from perfection. Protect security, correctness, tests, migrations, and observability while making conscious trade-offs on less critical polish. Document debt and create follow-up ownership.

### Q294. How would you onboard into a large existing Django codebase?

**Answer:** Start by running the app and tests, reading architecture docs, tracing key flows, reviewing models and migrations, understanding deployment, and pairing with domain experts. Look for boundaries, risky areas, and operational dashboards.

### Q295. How do you communicate technical risk to product managers?

**Answer:** Translate risk into business impact, probability, timeline, user effect, and options. Offer choices such as quick mitigation, safer phased rollout, or deeper fix with cost and benefit.

### Q296. What does ownership mean for a backend engineer?

**Answer:** Ownership means caring about design, implementation, tests, deployment, monitoring, incidents, documentation, and long-term maintainability. It does not end when code is merged.

### Q297. How do you mentor junior Django developers?

**Answer:** Give clear review feedback, explain reasoning, pair on tricky areas, provide examples, encourage testing and debugging habits, and let them own bounded tasks with support.

### Q298. How do you work in an English-speaking engineering team in Germany?

**Answer:** Use precise written communication, document decisions, ask clarifying questions early, respect direct feedback culture, and make work visible through tickets, pull requests, and design notes.

### Q299. What would you ask a German company about their Django stack?

**Answer:** Ask about Django and Python versions, deployment platform, database, test strategy, CI/CD, observability, on-call expectations, data protection requirements, team ownership, release process, and upgrade policy.

### Q300. How should you prepare for a senior Django interview in Europe?

**Answer:** Prepare Django internals, ORM performance, PostgreSQL, security, GDPR, DRF, testing, deployment, system design, incident stories, and trade-off discussions. Interviewers usually value production judgment as much as syntax knowledge.


---

## Extra preparation checklist for Germany / Europe


- Be ready to discuss GDPR, auditability, data minimization, data residency, retention, and processor/subprocessor responsibilities.

- Prepare one story about a production bug, one about a slow query or performance improvement, one about a risky migration, and one about an architecture trade-off.

- Review PostgreSQL fundamentals: indexes, query plans, transactions, locks, connection pooling, and pagination strategies.

- Review deployment and operations: Docker, Kubernetes, WSGI/ASGI, Gunicorn/Uvicorn, health checks, logging, metrics, traces, alerts, and rollback strategy.

- Practice explaining your choices in clear English: context, trade-off, decision, consequence.


## Official reference links


- Django documentation: https://docs.djangoproject.com/

- Django download and supported versions: https://www.djangoproject.com/download/

- Django release notes: https://docs.djangoproject.com/en/6.0/releases/

- Django REST Framework documentation: https://www.django-rest-framework.org/
