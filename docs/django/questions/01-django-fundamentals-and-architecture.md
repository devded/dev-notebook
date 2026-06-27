# Django fundamentals and architecture

## What is Django, and why do companies use it for backend development?

Django is a high-level Python web framework that provides batteries-included components such as ORM, routing, templates, forms, authentication, admin, security middleware, and migrations. Companies use it because it enables fast delivery while still supporting maintainable, secure, and scalable backend systems when engineered carefully.

## Explain Django's MTV pattern.

Django uses Model-Template-View. The Model represents data and business persistence, the Template renders presentation, and the View coordinates request handling, business logic, and responses. It resembles MVC, but Django's View is closer to a controller and the Template is closer to the view layer.

## What happens when a request reaches a Django application?

The web server passes the request to WSGI or ASGI, Django creates an HttpRequest, middleware processes it, URL resolution maps it to a view, the view executes business logic, and returns an HttpResponse. Response middleware then runs before the server sends the response to the client.

## What are the main strengths and weaknesses of Django compared with Flask or FastAPI?

Django is stronger for full product backends because it includes ORM, admin, auth, security, forms, migrations, and conventions. Flask and FastAPI are lighter and can be better for small services or async-first APIs. In large companies the choice depends on team skill, governance, lifecycle cost, and service boundaries.

## What does 'batteries included' mean in Django?

It means Django ships with many production-grade components that developers otherwise would need to select and integrate separately. Examples include authentication, sessions, CSRF protection, ORM, admin, migrations, static files, internationalization, and security middleware.

## How does Django encourage maintainable application structure?

It encourages separation into reusable apps, declarative models, URL configuration, views, templates, forms, tests, and settings. Good teams further separate business logic into services, selectors, repositories, or domain modules instead of putting all logic in views or models.

## What is a Django app versus a Django project?

A project is the full Django site or service, including settings and root URL configuration. An app is a reusable module inside the project that owns a focused domain such as billing, accounts, orders, or reporting.

## When should you create a new Django app?

Create a new app when a domain area has its own models, behavior, API surface, tests, and lifecycle. Avoid creating apps only because a file is large; split by business capability, not by technical layer alone.

## What is the role of manage.py?

manage.py is a command-line utility that sets the Django settings module and delegates commands to Django's management system. It is used for development server, migrations, shell, tests, static collection, and custom management commands.

## How would you describe Django to a non-technical stakeholder?

Django is a mature Python framework for building secure web applications quickly. It gives the engineering team prebuilt foundations for data, users, administration, and security so they can focus on product-specific logic.
