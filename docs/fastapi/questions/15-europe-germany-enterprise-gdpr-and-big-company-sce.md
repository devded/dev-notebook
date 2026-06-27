# Europe/Germany Enterprise, GDPR, and Big-Company Scenarios

## How does GDPR affect FastAPI API design?

GDPR requires data minimization, lawful processing, purpose limitation, retention controls, access controls, and support for data subject rights. API design should avoid collecting or exposing unnecessary personal data.

## What is data minimization?

Data minimization means collecting and processing only the personal data necessary for a specific purpose. In FastAPI, this affects schemas, logging, analytics, and database design.

## How should logs be designed under GDPR?

Logs should avoid unnecessary personal data and secrets, use pseudonymous IDs where possible, have retention limits, and be access-controlled. Debug logs in production need strict review.

## What is pseudonymization?

Pseudonymization replaces direct identifiers with indirect identifiers, reducing privacy risk. It is useful for logs, analytics, and support workflows but does not make data fully anonymous.

## What is the right to erasure?

It is the right for individuals to request deletion of their personal data under certain conditions. Systems need deletion workflows, retention exceptions, and auditability.

## How would you implement data export for a user?

Create an authenticated endpoint or internal workflow that gathers personal data across systems, serializes it in a portable format, and logs the request. Ensure only authorized subjects or staff can access it.

## How would you implement data deletion across microservices?

Use a coordinated deletion workflow or event-driven process, track completion, handle legal retention exceptions, and ensure backups/archives follow policy. Avoid pretending one table delete is enough.

## How do you handle consent in API systems?

Store consent records with purpose, timestamp, version, and source. Enforce consent checks in application logic and allow withdrawal where legally required.

## What is data residency?

Data residency refers to where data is stored and processed geographically. German or EU enterprises may require EU-region hosting or stricter controls for certain data.

## How do you design APIs for auditability?

Record who did what, when, from where, and on which resource, without logging excessive payload data. Audit logs should be tamper-resistant and searchable.

## How do you handle multi-language requirements in Europe?

Keep locale as explicit user or request context, separate translations from business logic, and return stable error codes plus localized messages where appropriate.

## What is accessibility relevance for API teams?

APIs support accessible frontends by providing clear content structure, localization, error semantics, and predictable validation messages. Backend teams should not ignore accessibility requirements.

## How would you prepare FastAPI for ISO 27001-style environments?

Use secure SDLC practices, access controls, logging, vulnerability scanning, dependency management, incident procedures, and documented risk treatment. The API code should fit into broader controls.

## How do you manage dependencies securely?

Pin versions, scan for vulnerabilities, use lock files, review transitive dependencies, and update regularly. CI should fail on critical vulnerabilities according to policy.

## How do you handle secrets in a German enterprise cloud environment?

Use managed secret stores such as cloud secret managers, Kubernetes secrets with encryption, or Vault. Rotate secrets and restrict access through least privilege.

## What does least privilege mean for a FastAPI service?

The service should only have permissions necessary for its job: limited database access, scoped cloud credentials, restricted network access, and minimal runtime privileges.

## How do you design for works council or internal audit concerns?

Be transparent about what employee data is collected, why it is processed, who can access it, and how long it is retained. Build controls that support policy review.

## How should APIs handle personally identifiable information in responses?

Return only fields needed by the client and use response models to filter internal data. Apply masking or redaction for sensitive fields when full values are not required.

## What interview answer shows maturity for Germany/EU companies?

Say that technical implementation must align with privacy, security, auditability, and operational governance. FastAPI features help, but compliance comes from system design and processes.

## How would you answer a final senior interview question: 'Why should we trust your FastAPI service in production?'

Explain validation, authentication, authorization, tests, observability, deployment safety, incident response, data protection, and clear ownership. Trust comes from engineering discipline, not only framework choice.
