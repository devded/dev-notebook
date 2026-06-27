# Security and OWASP concerns

## How does Django protect against CSRF?

Django uses CSRF middleware and tokens to ensure state-changing requests come from trusted forms or clients. For APIs, CSRF rules depend on whether session authentication or token-based authentication is used.

## How does Django help prevent XSS?

Django templates autoescape variables by default. Developers must still avoid unsafe mark_safe usage, sanitize rich text, set security headers, validate input, and be careful with JavaScript contexts.

## How does Django help prevent SQL injection?

The ORM parameterizes queries and escapes values properly when used correctly. Raw SQL must use parameters rather than string concatenation. SQL injection is still possible if developers build unsafe raw queries.

## What is clickjacking and how does Django mitigate it?

Clickjacking tricks users into clicking hidden or framed UI elements. Django provides X-Frame-Options middleware to control whether pages can be embedded in frames.

## What is SecurityMiddleware?

SecurityMiddleware provides production security features such as HTTPS redirect, HSTS, content type sniffing protection, referrer policy, cross-origin opener policy, and related headers depending on settings and Django version.

## What is HSTS and when should it be enabled?

HTTP Strict Transport Security tells browsers to use HTTPS for future requests. Enable it only after confirming HTTPS works for all subdomains and deployment paths, because a bad HSTS rollout can lock users out.

## How would you secure cookies in production?

Set Secure, HttpOnly, SameSite, appropriate domain and path, and reasonable expiry. For sessions and CSRF cookies, use SESSION_COOKIE_SECURE, CSRF_COOKIE_SECURE, and SameSite settings consistent with authentication and cross-site requirements.

## What are common insecure Django deployment mistakes?

Common mistakes include DEBUG=True, weak SECRET_KEY, wildcard ALLOWED_HOSTS, missing HTTPS, unpatched Django versions, exposed admin without protection, excessive permissions, logging secrets, and unsafe file uploads.

## How should file uploads be secured?

Validate file type and size, store outside executable paths, use randomized names, scan when needed, restrict direct access, serve through controlled URLs, and avoid trusting client-provided MIME types or filenames.

## How do you keep dependencies secure?

Pin dependencies, use lock files, scan with tools such as pip-audit or Snyk, monitor Django security releases, update regularly, and run automated tests before deployment. Avoid abandoned packages in security-critical paths.

## How does Django handle Cross-Origin Resource Sharing (CORS) and why is it important? <Badge type="warning" text="medium" />

CORS is a browser security mechanism that restricts cross-origin HTTP requests. Since Django has no built-in CORS middleware, you implement it using the third-party package `django-cors-headers`:
1. Install it via pip: `pip install django-cors-headers`.
2. Add it to `INSTALLED_APPS` and register `CorsMiddleware` near the top of the `MIDDLEWARE` setting.
3. Configure allowed origins in `settings.py`:

```python
CORS_ALLOWED_ORIGINS = [
    "https://example.com",
    "https://sub.example.com",
]
```
