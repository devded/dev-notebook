# Templates, forms, and admin

## What is Django's template language designed for?

It is designed for safe presentation logic, not arbitrary Python execution. It supports variable interpolation, filters, tags, inheritance, includes, escaping, and localization while discouraging business logic in templates.

## What is template inheritance?

Template inheritance lets a base template define common layout and child templates override named blocks. It avoids duplication across pages and helps maintain consistent HTML structure.

## Why does Django autoescape template output?

Autoescaping protects against cross-site scripting by escaping user-controlled values before rendering them as HTML. Developers should only mark content safe when it has been sanitized or is trusted.

## What is the difference between Form and ModelForm?

Form defines fields and validation manually. ModelForm derives fields from a model and can create or update model instances. ModelForm is convenient but should still explicitly define allowed fields to avoid mass-assignment risks.

## Where should form validation logic live?

Field-specific validation belongs in clean_&lt;field&gt;(), cross-field validation belongs in clean(), and model-level invariants may belong in model validation or domain services. Critical business rules should not exist only in templates or JavaScript.

## What is the Django admin best used for?

The admin is best for trusted internal operational workflows such as content management, support tooling, and back-office data maintenance. It is usually not a replacement for a custom customer-facing product UI.

## How do you customize the Django admin?

Use ModelAdmin options such as list_display, search_fields, list_filter, ordering, readonly_fields, fieldsets, inlines, actions, custom forms, and custom permissions. For advanced workflows, override admin views carefully or build separate internal tools.

## What risks exist when exposing Django admin in production?

Risks include brute-force attacks, excessive privileges, data leaks, unsafe custom actions, and accidental destructive changes. Mitigate with strong authentication, MFA or SSO, least privilege, audit logs, rate limiting, network restrictions where appropriate, and careful permission design.

## What are admin actions?

Admin actions are bulk operations users can execute on selected rows. They are useful for internal workflows but must be permission-checked, auditable, idempotent where possible, and safe for large querysets.

## How can forms help security beyond validation?

Forms centralize input parsing, type conversion, validation, error reporting, and cleaned_data access. They reduce the chance of trusting raw request.POST and help prevent invalid or malicious input from reaching business logic.

## What is Jinja2 templating, and does Django support it? <Badge type="warning" text="medium" />

Jinja2 is a fast, secure, and widely used third-party templating engine for Python. While Django has its own default template language (DTL), it officially supports Jinja2 as an alternative engine. Jinja2 provides benefits like sandbox execution, higher rendering performance, and easier debugging compared to DTL.

## What are context processors in Django? <Badge type="warning" text="medium" />

A context processor is a python function that accepts a request object and returns a dictionary of data to be merged into the template context. This makes common data (such as user details, site settings, or cart counts) globally available across all templates without passing them explicitly from every view.

## How does Django encourage clean and reusable templates? <Badge type="tip" text="easy" />

Django supports modular layouts through several features:
* **Template Inheritance (`{% extends %}`)**: Defines a master layout (like `base.html`) containing common headers and footers that child templates extend.
* **Block tags (`{% block %}`)**: Allow child templates to override specific content sections.
* **Include tag (`{% include %}`)**: Injects smaller reusable UI fragments (like a sidebar or navbar) across multiple pages.

## How do you register a model with the Django admin site? <Badge type="tip" text="easy" />

To register a model so it can be managed in the Django admin panel, import the model in your app's `admin.py` and call `admin.site.register()`:

```python
# admin.py
from django.contrib import admin
from .models import Article

admin.site.register(Article)
```
Alternatively, you can use the `@admin.register()` decorator, which is cleaner when defining a custom `ModelAdmin` class:
```python
@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    list_display = ("title", "created_at")
```
