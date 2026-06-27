import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

// https://vitepress.dev/reference/site-config
export default withMermaid(
  defineConfig({
  base: '/dev-notebook/',
  title: 'Dev Notebook',
  description: 'Interview cheatsheets & framework tutorials',
  lastUpdated: true,
  cleanUrls: true,

  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      {
        text: 'Languages',
        items: [
          { text: 'Python', link: '/python/' },
          { text: 'Java', link: '/java/' }
        ]
      },
      {
        text: 'Frameworks',
        items: [
          { text: 'Django', link: '/django/' },
          { text: 'FastAPI', link: '/fastapi/' },
          { text: 'Flask', link: '/flask/' },
          { text: 'Spring Boot', link: '/spring-boot/' }
        ]
      }
    ],

    sidebar: {
      '/python/': [
        {
          text: 'Python',
          collapsed: false,
          items: [
            { text: 'Overview', link: '/python/' },
            { text: 'Cheatsheet', link: '/python/cheatsheet' }
          ]
        },
        {
          text: 'Interview Questions',
          collapsed: false,
          items: [
            { text: "All topics", link: "/python/questions/" },
            { text: "Basics & Internals", link: "/python/questions/basics" },
            { text: "Data & Iteration", link: "/python/questions/data-iteration" },
            { text: "Strings & Built-ins", link: "/python/questions/strings-builtins" },
            { text: "Operators", link: "/python/questions/operators" },
            { text: "Control Flow", link: "/python/questions/control-flow" },
            { text: "Functions & Scope", link: "/python/questions/functions-scope" },
            { text: "Modules & Packages", link: "/python/questions/modules-packages" },
            { text: "OOP", link: "/python/questions/oop" },
            { text: "Errors & Exceptions", link: "/python/questions/errors" },
            { text: "Data Structures & Algorithms", link: "/python/questions/data-structures" },
            { text: "Concurrency", link: "/python/questions/concurrency" },
            { text: "Language & Tooling", link: "/python/questions/language-tooling" },
            { text: "Debugging & Testing", link: "/python/questions/debugging-testing" },
            { text: "File Handling & Data", link: "/python/questions/file-handling" },
            { text: "Libraries & Frameworks", link: "/python/questions/libraries-frameworks" },
            { text: "Networking & Databases", link: "/python/questions/networking-databases" },
            { text: "SQL & Databases", link: "/python/questions/sql-databases" },
            { text: "REST APIs & HTTP", link: "/python/questions/rest-apis" },
            { text: "Authentication", link: "/python/questions/auth" },
            { text: "DevOps, Git & Linux", link: "/python/questions/devops" },
            { text: "Scripting & Automation", link: "/python/questions/scripting-automation" },
            { text: "Web Scraping & APIs", link: "/python/questions/web-scraping-apis" },
            { text: "Regular Expressions", link: "/python/questions/regex" },
            { text: "Environment & Config", link: "/python/questions/environment-config" },
            { text: "Data Science & ML", link: "/python/questions/data-science-ml" },
            { text: "Modern Python (3.11+)", link: "/python/questions/modern-python" },
            { text: "Security & Best Practices", link: "/python/questions/security" },
            { text: "Algorithms & Data Structures", link: "/python/questions/algorithms" },
            { text: "Design Patterns", link: "/python/questions/design-patterns" },
            { text: "System Design & Scalability", link: "/python/questions/system-design" },
            { text: "Cloud & Monitoring", link: "/python/questions/cloud-monitoring" },
            { text: "Behavioral & HR", link: "/python/questions/behavioral" },
            { text: "Questions by Role", link: "/python/questions/by-role" }
          ]
        }
      ],
      '/java/': [
        {
          text: 'Java',
          collapsed: false,
          items: [
            { text: 'Overview', link: '/java/' },
            { text: 'Cheatsheet', link: '/java/cheatsheet' }
          ]
        },
        {
          text: 'Interview Questions',
          collapsed: false,
          items: [
            { text: "All topics", link: "/java/questions/" },
            { text: "Core Language", link: "/java/questions/core-language" },
            { text: "Memory & JVM", link: "/java/questions/memory-jvm" },
            { text: "Collections", link: "/java/questions/collections" },
            { text: "OOP & Design", link: "/java/questions/oop-design" },
            { text: "Concurrency", link: "/java/questions/concurrency" }
          ]
        }
      ],
      '/django/': [
        {
          text: 'Django',
          collapsed: false,
          items: [
            { text: 'Overview', link: '/django/' },
            { text: 'Tutorial', link: '/django/tutorial' }
          ]
        },
        {
          text: 'Interview Questions',
          collapsed: false,
          items: [
            { text: "All topics", link: "/django/questions/" },
            { text: "1. Django fundamentals and architecture", link: "/django/questions/01-django-fundamentals-and-architecture" },
            { text: "2. Settings, configuration, and environments", link: "/django/questions/02-settings-configuration-and-environments" },
            { text: "3. URL routing, views, and request lifecycle", link: "/django/questions/03-url-routing-views-and-request-lifecycle" },
            { text: "4. Templates, forms, and admin", link: "/django/questions/04-templates-forms-and-admin" },
            { text: "5. Models and data modeling", link: "/django/questions/05-models-and-data-modeling" },
            { text: "6. ORM querying", link: "/django/questions/06-orm-querying" },
            { text: "7. Advanced ORM and query correctness", link: "/django/questions/07-advanced-orm-and-query-correctness" },
            { text: "8. Migrations and schema evolution", link: "/django/questions/08-migrations-and-schema-evolution" },
            { text: "9. Transactions, concurrency, and consistency", link: "/django/questions/09-transactions-concurrency-and-consistency" },
            { text: "10. PostgreSQL and database performance", link: "/django/questions/10-postgresql-and-database-performance" },
            { text: "11. Authentication, authorization, and sessions", link: "/django/questions/11-authentication-authorization-and-sessions" },
            { text: "12. Security and OWASP concerns", link: "/django/questions/12-security-and-owasp-concerns" },
            { text: "13. GDPR, privacy, and European compliance", link: "/django/questions/13-gdpr-privacy-and-european-compliance" },
            { text: "14. Django REST Framework basics", link: "/django/questions/14-django-rest-framework-basics" },
            { text: "15. DRF authentication, permissions, and API governance", link: "/django/questions/15-drf-authentication-permissions-and-api-governance" },
            { text: "16. API design and integration scenarios", link: "/django/questions/16-api-design-and-integration-scenarios" },
            { text: "17. Testing Django applications", link: "/django/questions/17-testing-django-applications" },
            { text: "18. CI/CD, code quality, and maintainability", link: "/django/questions/18-ci-cd-code-quality-and-maintainability" },
            { text: "19. Caching strategies", link: "/django/questions/19-caching-strategies" },
            { text: "20. Async, background jobs, and real-time features", link: "/django/questions/20-async-background-jobs-and-real-time-features" },
            { text: "21. Deployment, WSGI/ASGI, and production runtime", link: "/django/questions/21-deployment-wsgi-asgi-and-production-runtime" },
            { text: "22. Docker, Kubernetes, and cloud infrastructure", link: "/django/questions/22-docker-kubernetes-and-cloud-infrastructure" },
            { text: "23. Observability, logging, and incident response", link: "/django/questions/23-observability-logging-and-incident-response" },
            { text: "24. Performance and scalability", link: "/django/questions/24-performance-and-scalability" },
            { text: "25. Architecture, domain design, and monoliths", link: "/django/questions/25-architecture-domain-design-and-monoliths" },
            { text: "26. Multi-tenancy, internationalization, and time zones", link: "/django/questions/26-multi-tenancy-internationalization-and-time-zones" },
            { text: "27. Files, email, payments, and external integrations", link: "/django/questions/27-files-email-payments-and-external-integrations" },
            { text: "28. Python knowledge expected in Django interviews", link: "/django/questions/28-python-knowledge-expected-in-django-interviews" },
            { text: "29. System design scenarios for Django", link: "/django/questions/29-system-design-scenarios-for-django" },
            { text: "30. Germany/EU big-company behavioral and senior discussion", link: "/django/questions/30-germany-eu-big-company-behavioral-and-senior-discu" }
          ]
        }
      ],
      '/fastapi/': [
        {
          text: 'FastAPI',
          collapsed: false,
          items: [
            { text: 'Overview', link: '/fastapi/' }
          ]
        },
        {
          text: 'Interview Questions',
          collapsed: false,
          items: [
            { text: "All topics", link: "/fastapi/questions/" },
            { text: "1. FastAPI Fundamentals and Architecture", link: "/fastapi/questions/01-fastapi-fundamentals-and-architecture" },
            { text: "2. Routing, Parameters, and Request Handling", link: "/fastapi/questions/02-routing-parameters-and-request-handling" },
            { text: "3. Pydantic v2, Schemas, and Validation", link: "/fastapi/questions/03-pydantic-v2-schemas-and-validation" },
            { text: "4. Dependency Injection", link: "/fastapi/questions/04-dependency-injection" },
            { text: "5. Async Python, Concurrency, and Performance", link: "/fastapi/questions/05-async-python-concurrency-and-performance" },
            { text: "6. Security, Authentication, and Authorization", link: "/fastapi/questions/06-security-authentication-and-authorization" },
            { text: "7. Databases, ORMs, and Transactions", link: "/fastapi/questions/07-databases-orms-and-transactions" },
            { text: "8. Testing and Quality Engineering", link: "/fastapi/questions/08-testing-and-quality-engineering" },
            { text: "9. Middleware, Lifespan, Background Tasks, and Events", link: "/fastapi/questions/09-middleware-lifespan-background-tasks-and-events" },
            { text: "10. OpenAPI, Documentation, and API Design", link: "/fastapi/questions/10-openapi-documentation-and-api-design" },
            { text: "11. Error Handling, Responses, and Serialization", link: "/fastapi/questions/11-error-handling-responses-and-serialization" },
            { text: "12. Deployment, Containers, and Production Operations", link: "/fastapi/questions/12-deployment-containers-and-production-operations" },
            { text: "13. Observability, Logging, and Reliability", link: "/fastapi/questions/13-observability-logging-and-reliability" },
            { text: "14. Microservices, Integration, and System Design", link: "/fastapi/questions/14-microservices-integration-and-system-design" },
            { text: "15. Europe/Germany Enterprise, GDPR, and Big-Company Scenarios", link: "/fastapi/questions/15-europe-germany-enterprise-gdpr-and-big-company-sce" }
          ]
        }
      ],
      '/flask/': [
        {
          text: 'Flask',
          collapsed: false,
          items: [
            { text: 'Overview', link: '/flask/' },
            { text: 'Tutorial', link: '/flask/tutorial' }
          ]
        }
      ],
      '/spring-boot/': [
        {
          text: 'Spring Boot',
          collapsed: false,
          items: [
            { text: 'Overview', link: '/spring-boot/' },
            { text: 'Tutorial', link: '/spring-boot/tutorial' }
          ]
        }
      ]
    },

    search: {
      provider: 'local'
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/' }
    ],

    outline: { level: [2, 3], label: 'On this page' },

    footer: {
      message: 'Personal developer notebook',
      copyright: 'Built with VitePress'
    }
  }
})
)
