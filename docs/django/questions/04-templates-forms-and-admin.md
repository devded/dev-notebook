# Templates, forms, and admin

## What is Django's template language designed for?

::: details View Answer
It is designed for safe presentation logic, not arbitrary Python execution. It supports variable interpolation, filters, tags, inheritance, includes, escaping, and localization while discouraging business logic in templates.
:::

## What is template inheritance?

::: details View Answer
Template inheritance lets a base template define common layout and child templates override named blocks. It avoids duplication across pages and helps maintain consistent HTML structure.
:::

## Why does Django autoescape template output?

::: details View Answer
Autoescaping protects against cross-site scripting by escaping user-controlled values before rendering them as HTML. Developers should only mark content safe when it has been sanitized or is trusted.
:::

## What is the difference between Form and ModelForm?

::: details View Answer
Form defines fields and validation manually. ModelForm derives fields from a model and can create or update model instances. ModelForm is convenient but should still explicitly define allowed fields to avoid mass-assignment risks.
:::

## Where should form validation logic live?

::: details View Answer
Field-specific validation belongs in clean_&lt;field&gt;(), cross-field validation belongs in clean(), and model-level invariants may belong in model validation or domain services. Critical business rules should not exist only in templates or JavaScript.
:::

## What is the Django admin best used for?

::: details View Answer
The admin is best for trusted internal operational workflows such as content management, support tooling, and back-office data maintenance. It is usually not a replacement for a custom customer-facing product UI.
:::

## How do you customize the Django admin?

::: details View Answer
Use ModelAdmin options such as list_display, search_fields, list_filter, ordering, readonly_fields, fieldsets, inlines, actions, custom forms, and custom permissions. For advanced workflows, override admin views carefully or build separate internal tools.
:::

## What risks exist when exposing Django admin in production?

::: details View Answer
Risks include brute-force attacks, excessive privileges, data leaks, unsafe custom actions, and accidental destructive changes. Mitigate with strong authentication, MFA or SSO, least privilege, audit logs, rate limiting, network restrictions where appropriate, and careful permission design.
:::

## What are admin actions?

::: details View Answer
Admin actions are bulk operations users can execute on selected rows. They are useful for internal workflows but must be permission-checked, auditable, idempotent where possible, and safe for large querysets.
:::

## How can forms help security beyond validation?

::: details View Answer
Forms centralize input parsing, type conversion, validation, error reporting, and cleaned_data access. They reduce the chance of trusting raw request.POST and help prevent invalid or malicious input from reaching business logic.
:::

## What is Jinja2 templating, and does Django support it? <Badge type="warning" text="medium" />

::: details View Answer
Jinja2 is a fast, secure, and widely used third-party templating engine for Python. While Django has its own default template language (DTL), it officially supports Jinja2 as an alternative engine. Jinja2 provides benefits like sandbox execution, higher rendering performance, and easier debugging compared to DTL.
:::

## What are context processors in Django? <Badge type="warning" text="medium" />

::: details View Answer
A context processor is a python function that accepts a request object and returns a dictionary of data to be merged into the template context. This makes common data (such as user details, site settings, or cart counts) globally available across all templates without passing them explicitly from every view.
:::

## How does Django encourage clean and reusable templates? <Badge type="tip" text="easy" />

::: details View Answer
Django supports modular layouts through several features:
* **Template Inheritance (`{% extends %}`)**: Defines a master layout (like `base.html`) containing common headers and footers that child templates extend.
* **Block tags (`{% block %}`)**: Allow child templates to override specific content sections.
* **Include tag (`{% include %}`)**: Injects smaller reusable UI fragments (like a sidebar or navbar) across multiple pages.
:::

## How do you register a model with the Django admin site? <Badge type="tip" text="easy" />

::: details View Answer
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
:::

## How do you create and register custom template tags and filters in Django? <Badge type="warning" text="medium" />

::: details View Answer
1. Create a `templatetags` directory inside your app (must contain an empty `__init__.py`).
2. Create a Python file inside it (e.g., `my_custom_tags.py`).
3. Instantiate a template register library, define your function, and register it:

```python
from django import template
register = template.Library()

@register.filter
def lowercase_first(value):
    return value[0].lower() + value[1:] if value else ""

@register.simple_tag
def current_year():
    from datetime import datetime
    return datetime.now().year
```
4. Load the library in your template using `{% load my_custom_tags %}` and use the custom tags/filters.
:::

## What is the django.contrib.messages framework and how does it work? <Badge type="tip" text="easy" />

::: details View Answer
The messages framework stores temporary, flash notifications (like success alerts or error messages) in one request and retrieves them for display in a subsequent request (typically after a POST redirect). It supports different storage backends (cookie-based or session-based) and categorizes messages by level (DEBUG, INFO, SUCCESS, WARNING, ERROR).

```python
from django.contrib import messages
from django.shortcuts import redirect

def my_view(request):
    messages.success(request, "Profile updated successfully.")
    return redirect("profile-detail")
```
:::

## How do you create custom template tags, and what is the difference between @register.simple_tag and @register.inclusion_tag? <Badge type="warning" text="medium" />

::: details View Answer
Custom template tags encapsulate presentation logic. `@register.simple_tag` processes data and returns a string that is rendered directly in the template. `@register.inclusion_tag` processes data and renders a completely different HTML template fragment with that data, returning the rendered HTML. Inclusion tags are perfect for reusable UI components.
:::

## What is a FormSet, and when would you use an InlineFormSet? <Badge type="warning" text="medium" />

::: details View Answer
A FormSet is a layer of abstraction for working with multiple forms on the same page, handling initialization, validation, and submission of the collection together. An `InlineFormSet` is a specific type of FormSet that handles related objects via a foreign key, useful for editing a parent object and its children (like an Order and its OrderItems) in a single view.
:::

## How do you optimize the Django Admin for tables with millions of rows that contain ForeignKey relationships? <Badge type="danger" text="hard" />

::: details View Answer
By default, the Django Admin loads all related foreign keys into a `<select>` dropdown, which will time out or crash on millions of rows. Optimization involves using `raw_id_fields` (to display an input box with a lookup popup) or `autocomplete_fields` (to provide an async select2 search). Additionally, overriding `get_queryset` to use `select_related` and disabling expensive `list_filter`s are necessary.
:::