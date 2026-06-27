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
