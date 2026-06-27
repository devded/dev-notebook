# Authentication, authorization, and sessions

## What does django.contrib.auth provide?

It provides users, groups, permissions, password hashing, authentication backends, login/logout views, decorators, mixins, and integration with sessions and admin. Many companies extend it rather than replacing it entirely.

## What is the difference between authentication and authorization?

Authentication verifies who the user is. Authorization determines what the authenticated user is allowed to do. Confusing the two often leads to security bugs.

## How do Django sessions work by default?

Django stores a session key in a cookie and stores session data server-side in the configured session backend, commonly the database or cache. Signed-cookie sessions store data client-side but must be used carefully because clients can see the data even if they cannot tamper with it.

## What are authentication backends?

Authentication backends define how credentials are checked and how permissions are loaded. They allow integration with LDAP, SSO, OAuth, custom user identifiers, or object-level permission systems.

## Why is a custom user model recommended early in a project?

Changing the user model later is painful because it affects foreign keys, migrations, admin, forms, and authentication. Starting with a custom user model gives flexibility for email login, UUID primary keys, profile fields, or organization-specific identity rules.

## How do permissions work in Django?

Django creates add, change, delete, and view permissions for models. Users can receive permissions directly or through groups. Custom permissions can be defined in model Meta and enforced in views, admin, APIs, and business logic.

## What are object-level permissions?

Object-level permissions decide access per object, such as whether a user can edit a specific invoice or project. Django has hooks for object permissions, but full implementation often requires custom logic or packages such as django-guardian.

## How would you implement SSO in a Django application?

Use a standard protocol such as OIDC, OAuth2, or SAML through a maintained library or identity provider integration. Map external identities to local users, validate tokens, handle group or role mapping, and define account provisioning and deprovisioning rules.

## What is MFA and when should it be required?

Multi-factor authentication requires an additional factor beyond password, such as TOTP, WebAuthn, or hardware keys. It should be required for admin, privileged users, financial workflows, and systems handling sensitive data.

## How should password storage be handled in Django?

Use Django's built-in password hashers and never store plain-text passwords. Passwords are salted and hashed with strong adaptive algorithms. Teams should monitor framework security releases and avoid custom password hashing.
