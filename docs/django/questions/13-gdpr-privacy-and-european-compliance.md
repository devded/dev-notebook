# GDPR, privacy, and European compliance

## What GDPR principles affect Django application design?

Key principles include lawfulness, fairness, transparency, purpose limitation, data minimization, accuracy, storage limitation, integrity, confidentiality, and accountability. These principles affect models, logs, analytics, consent, retention, exports, and deletion workflows.

## How would you implement the right to erasure?

Define what can be deleted, anonymized, or retained for legal obligations. Implement deletion workflows that cover primary records, related data, files, backups policy, search indexes, caches, analytics, and third-party processors.

## How would you support data export requests?

Build a controlled export process that gathers the user's personal data from relevant systems, serializes it in a portable format, logs the request, verifies identity, and avoids exposing other users' data.

## Why is logging personal data risky?

Logs are often copied to external systems, retained longer, and accessed by more people than application data. Avoid logging personal data, secrets, tokens, session IDs, payment details, and sensitive request bodies unless there is a strong, documented reason and protection.

## What is data minimization in a Django model?

It means only storing fields required for a defined purpose. Avoid collecting unnecessary dates of birth, addresses, IDs, IP addresses, or free-text sensitive information when the product does not need them.

## How would you design audit logs under GDPR?

Audit logs should record necessary security and compliance events while minimizing personal data. They need retention policies, access controls, integrity protection, and a clear legal basis when they contain user identifiers.

## How do cookie rules affect Django apps in Europe?

Strictly necessary cookies such as session cookies may be treated differently from analytics or marketing cookies. Non-essential cookies usually require informed consent before placement, so Django integration with analytics must respect consent state.

## What is privacy by design?

Privacy by design means considering privacy requirements during architecture and development, not after launch. In Django this includes model design, permissions, retention jobs, pseudonymization, secure defaults, and review of third-party services.

## How would you handle production data in developer environments?

Avoid copying production personal data to local machines. If unavoidable, use strong approval, minimization, anonymization or pseudonymization, encryption, access logs, and deletion timelines.

## What would German enterprise clients expect around data residency and processors?

They may expect clarity on hosting region, subprocessors, data processing agreements, retention, access controls, breach procedures, encryption, and auditability. Engineering should be able to explain where data flows and how operational access is controlled.
