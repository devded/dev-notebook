# URL routing, views, and request lifecycle

## How does Django route a URL to a view?

Django loads the root URLconf, evaluates urlpatterns in order, and uses path converters or regex patterns to match the request path. The matched view receives the request and captured parameters.

## What is the difference between path() and re_path()?

path() uses simpler route patterns and converters such as int, slug, uuid, and str. re_path() uses regular expressions and is useful for complex legacy patterns, but path() is clearer for most modern URL routing.

## What is include() used for in URL configuration?

include() delegates part of the URL tree to another URLconf. It lets each app own its URL patterns, improves modularity, and avoids one large root routing file.

## What is a function-based view?

A function-based view is a Python function that accepts a request and returns a response. It is explicit, easy to read for simple endpoints, and works well when logic is straightforward.

## What is a class-based view?

A class-based view organizes request handling into methods such as get(), post(), dispatch(), and mixins. It improves reuse for common patterns, but can become hard to understand when too many mixins are layered.

## When would you choose a function-based view over a class-based view?

Choose a function-based view for simple or highly custom logic where explicit control is more readable. Choose class-based views when you benefit from generic behavior such as list, detail, create, update, delete, or shared mixins.

## What is dispatch() in a class-based view?

dispatch() receives the request and routes it to the method matching the HTTP verb, such as get() or post(). It is also a common place for cross-cutting logic in mixins, though middleware or decorators may be cleaner.

## What is HttpRequest and what does it contain?

HttpRequest represents the incoming request. It includes method, path, headers, GET parameters, POST data, cookies, user, session, body, files, and metadata. Some attributes depend on middleware.

## What is HttpResponse?

HttpResponse is the base response object returned by Django views. It contains content, status code, headers, cookies, and related response metadata. Subclasses include JsonResponse, FileResponse, StreamingHttpResponse, and redirects.

## How would you handle a 404 in Django?

Raise Http404 in a view or use helpers such as get_object_or_404. In production, configure custom 404 templates or handlers to avoid leaking internals and to provide a useful user experience.

## What is the purpose of the render() shortcut function in Django? <Badge type="tip" text="easy" />

The `render()` function combines a given template with a context dictionary containing data and returns a fully rendered `HttpResponse` object. It acts as a shortcut by handling template loading and context processing in a single line.

```python
from django.shortcuts import render

def my_view(request):
    context = {"message": "Hello World"}
    return render(request, "my_template.html", context)
```
