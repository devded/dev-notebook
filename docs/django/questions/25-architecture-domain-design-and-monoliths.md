# Architecture, domain design, and monoliths

## Is a Django monolith always bad?

No. A well-structured monolith can be simpler, faster to develop, easier to test, and operationally cheaper than microservices. Problems arise when boundaries are unclear, deployments are risky, or team ownership conflicts grow.

## When would you split a Django monolith into services?

Consider splitting when a domain needs independent scaling, deployment, data ownership, security boundary, or team autonomy. Splitting too early can create distributed systems complexity without business value.

## How do you keep app boundaries clean in Django?

Define ownership, avoid circular imports, keep domain APIs explicit, limit cross-app model access, document dependencies, and use service functions or events for cross-domain workflows.

## What is a service layer in Django?

A service layer contains application workflows that coordinate models, permissions, transactions, and side effects. It can make views, serializers, and tasks thinner and business logic easier to test.

## What is a selector pattern?

Selectors are functions or classes that encapsulate read queries for a domain, such as visible_projects_for(user). They centralize query logic and improve reuse, testing, and performance tuning.

## What is domain-driven design in a Django context?

It means organizing code around business concepts and invariants rather than only technical layers. Django apps, services, models, and events should reflect the language and boundaries of the business domain.

## What is an anti-corruption layer?

It is a translation layer between your domain and an external system or legacy model. It prevents external concepts, field names, and failure modes from leaking throughout your core code.

## How do you handle cross-app workflows?

Use explicit service orchestration, domain events, task queues, or well-defined interfaces rather than random imports and signal side effects. Keep transaction boundaries and ownership clear.

## Are Django signals good for business logic?

Signals are useful for decoupled framework events, but hidden business workflows in signals can be hard to trace, test, and reason about. Prefer explicit service calls for critical business behavior.

## How would you explain a major architectural decision in an interview?

State the context, constraints, options considered, trade-offs, decision, consequences, and how you would revisit it. Big-company interviews value balanced reasoning more than one fashionable pattern.

## What is the "Fat Model, Skinny View" design pattern and what are its pros and cons? <Badge type="warning" text="medium" />

"Fat Model, Skinny View" is a design principle where business logic, data validation, and database operations are placed in model classes (or manager methods) rather than view functions.
* **Pros**: Promotes code reusability (logic can be shared between views, admin actions, and shell scripts), makes testing database logic simpler, and keeps views clean and readable.
* **Cons**: Can lead to bloated, monolithic model classes that are hard to maintain, violate the Single Responsibility Principle, and create circular dependency issues. Modern applications often delegate this logic to service layers or domain service classes.

## How does the m2m_changed signal differ from post_save, and why is it necessary? <Badge type="warning" text="medium" />

Updating a Many-to-Many relationship (e.g., `user.groups.add(group)`) modifies a join table and does *not* trigger `pre_save` or `post_save` on the related models. `m2m_changed` is required to detect these changes. It fires multiple times with different `action` flags (like `pre_add`, `post_add`, `post_clear`).

## How do you prevent Django signal handlers from falling into an infinite recursive loop? <Badge type="warning" text="medium" />

If a `post_save` signal modifies the instance and calls `instance.save()`, it triggers the signal again endlessly. To prevent this, either use `update_fields=['field_name']` when saving (and check `update_fields` in the signal), disconnect and reconnect the signal around the save, or avoid saving the instance inside its own `post_save` handler by doing modifications in `pre_save` instead.

