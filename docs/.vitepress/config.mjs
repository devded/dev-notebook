import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/dev-notebook/',
  title: 'Dev Notebook',
  description: 'Interview cheatsheets & framework tutorials',
  lastUpdated: true,
  cleanUrls: true,

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Python', link: '/python/' },
      { text: 'Java', link: '/java/' },
      { text: 'Django', link: '/django/' },
      { text: 'FastAPI', link: '/fastapi/' }
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
            { text: 'All topics', link: '/python/questions/' },
            { text: 'Basics & Internals', link: '/python/questions/basics' },
            { text: 'Data & Iteration', link: '/python/questions/data-iteration' },
            { text: 'Strings & Built-ins', link: '/python/questions/strings-builtins' },
            { text: 'Operators', link: '/python/questions/operators' },
            { text: 'Control Flow', link: '/python/questions/control-flow' },
            { text: 'Functions & Scope', link: '/python/questions/functions-scope' },
            { text: 'Modules & Packages', link: '/python/questions/modules-packages' },
            { text: 'OOP', link: '/python/questions/oop' },
            { text: 'Errors & Exceptions', link: '/python/questions/errors' },
            { text: 'Data Structures & Algorithms', link: '/python/questions/data-structures' },
            { text: 'Concurrency', link: '/python/questions/concurrency' },
            { text: 'Language & Tooling', link: '/python/questions/language-tooling' },
            { text: 'Debugging & Testing', link: '/python/questions/debugging-testing' },
            { text: 'File Handling & Data', link: '/python/questions/file-handling' },
            { text: 'Libraries & Frameworks', link: '/python/questions/libraries-frameworks' },
            { text: 'Networking & Databases', link: '/python/questions/networking-databases' },
            { text: 'SQL & Databases', link: '/python/questions/sql-databases' },
            { text: 'REST APIs & HTTP', link: '/python/questions/rest-apis' },
            { text: 'Authentication', link: '/python/questions/auth' },
            { text: 'DevOps, Git & Linux', link: '/python/questions/devops' },
            { text: 'Scripting & Automation', link: '/python/questions/scripting-automation' },
            { text: 'Web Scraping & APIs', link: '/python/questions/web-scraping-apis' },
            { text: 'Regular Expressions', link: '/python/questions/regex' },
            { text: 'Environment & Config', link: '/python/questions/environment-config' },
            { text: 'Data Science & ML', link: '/python/questions/data-science-ml' },
            { text: 'Modern Python (3.11+)', link: '/python/questions/modern-python' },
            { text: 'Security & Best Practices', link: '/python/questions/security' },
            { text: 'Algorithms & Data Structures', link: '/python/questions/algorithms' },
            { text: 'Design Patterns', link: '/python/questions/design-patterns' },
            { text: 'System Design & Scalability', link: '/python/questions/system-design' },
            { text: 'Cloud & Monitoring', link: '/python/questions/cloud-monitoring' },
            { text: 'Behavioral & HR', link: '/python/questions/behavioral' },
            { text: 'Questions by Role', link: '/python/questions/by-role' }
          ]
        },
        {
          text: 'Frameworks',
          collapsed: false,
          items: [
            { text: 'Django', link: '/python/django' },
            { text: 'Flask', link: '/python/flask' }
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
            { text: 'All topics', link: '/java/questions/' },
            { text: 'Core Language', link: '/java/questions/core-language' },
            { text: 'Memory & JVM', link: '/java/questions/memory-jvm' },
            { text: 'Collections', link: '/java/questions/collections' },
            { text: 'OOP & Design', link: '/java/questions/oop-design' },
            { text: 'Concurrency', link: '/java/questions/concurrency' }
          ]
        },
        {
          text: 'Frameworks',
          collapsed: false,
          items: [
            { text: 'Spring Boot', link: '/java/spring-boot' }
          ]
        }
      ],
      '/django/': [
        {
          text: 'Django Interview Questions',
          collapsed: false,
          items: [
            { text: 'Overview', link: '/django/' },
            { text: '1. Fundamentals & architecture', link: '/django/01-django-fundamentals-and-architecture' },
            { text: '2. Settings & environments', link: '/django/02-settings-configuration-and-environments' },
            { text: '3. URL routing, views, lifecycle', link: '/django/03-url-routing-views-and-request-lifecycle' },
            { text: '4. Templates, forms, admin', link: '/django/04-templates-forms-and-admin' },
            { text: '5. Models & data modeling', link: '/django/05-models-and-data-modeling' },
            { text: '6. ORM querying', link: '/django/06-orm-querying' },
            { text: '7. Advanced ORM & correctness', link: '/django/07-advanced-orm-and-query-correctness' },
            { text: '8. Migrations & schema evolution', link: '/django/08-migrations-and-schema-evolution' },
            { text: '9. Transactions & concurrency', link: '/django/09-transactions-concurrency-and-consistency' },
            { text: '10. PostgreSQL & DB performance', link: '/django/10-postgresql-and-database-performance' },
            { text: '11. Auth, authz & sessions', link: '/django/11-authentication-authorization-and-sessions' },
            { text: '12. Security & OWASP', link: '/django/12-security-and-owasp-concerns' },
            { text: '13. GDPR & EU compliance', link: '/django/13-gdpr-privacy-and-european-compliance' },
            { text: '14. DRF basics', link: '/django/14-django-rest-framework-basics' },
            { text: '15. DRF auth & API governance', link: '/django/15-drf-authentication-permissions-and-api-governance' },
            { text: '16. API design & integration', link: '/django/16-api-design-and-integration-scenarios' },
            { text: '17. Testing', link: '/django/17-testing-django-applications' },
            { text: '18. CI/CD & code quality', link: '/django/18-ci-cd-code-quality-and-maintainability' },
            { text: '19. Caching strategies', link: '/django/19-caching-strategies' },
            { text: '20. Async & background jobs', link: '/django/20-async-background-jobs-and-real-time-features' },
            { text: '21. Deployment & runtime', link: '/django/21-deployment-wsgi-asgi-and-production-runtime' },
            { text: '22. Docker, K8s & cloud', link: '/django/22-docker-kubernetes-and-cloud-infrastructure' },
            { text: '23. Observability & incidents', link: '/django/23-observability-logging-and-incident-response' },
            { text: '24. Performance & scalability', link: '/django/24-performance-and-scalability' },
            { text: '25. Architecture & domain design', link: '/django/25-architecture-domain-design-and-monoliths' },
            { text: '26. Multi-tenancy & i18n', link: '/django/26-multi-tenancy-internationalization-and-time-zones' },
            { text: '27. Files, email, payments', link: '/django/27-files-email-payments-and-external-integrations' },
            { text: '28. Python knowledge', link: '/django/28-python-knowledge-expected-in-django-interviews' },
            { text: '29. System design scenarios', link: '/django/29-system-design-scenarios-for-django' },
            { text: '30. Behavioral & senior topics', link: '/django/30-germany-eu-big-company-behavioral-and-senior-discu' }
          ]
        }
      ],
      '/fastapi/': [
        {
          text: 'FastAPI Interview Questions',
          collapsed: false,
          items: [
            { text: 'Overview', link: '/fastapi/' },
            { text: '1. Fundamentals & architecture', link: '/fastapi/01-fastapi-fundamentals-and-architecture' },
            { text: '2. Routing & request handling', link: '/fastapi/02-routing-parameters-and-request-handling' },
            { text: '3. Pydantic v2 & validation', link: '/fastapi/03-pydantic-v2-schemas-and-validation' },
            { text: '4. Dependency injection', link: '/fastapi/04-dependency-injection' },
            { text: '5. Async, concurrency, perf', link: '/fastapi/05-async-python-concurrency-and-performance' },
            { text: '6. Security & authorization', link: '/fastapi/06-security-authentication-and-authorization' },
            { text: '7. Databases, ORMs, txns', link: '/fastapi/07-databases-orms-and-transactions' },
            { text: '8. Testing & quality', link: '/fastapi/08-testing-and-quality-engineering' },
            { text: '9. Middleware & lifespan', link: '/fastapi/09-middleware-lifespan-background-tasks-and-events' },
            { text: '10. OpenAPI & API design', link: '/fastapi/10-openapi-documentation-and-api-design' },
            { text: '11. Errors & serialization', link: '/fastapi/11-error-handling-responses-and-serialization' },
            { text: '12. Deployment & operations', link: '/fastapi/12-deployment-containers-and-production-operations' },
            { text: '13. Observability & reliability', link: '/fastapi/13-observability-logging-and-reliability' },
            { text: '14. Microservices & system design', link: '/fastapi/14-microservices-integration-and-system-design' },
            { text: '15. EU/Germany enterprise & GDPR', link: '/fastapi/15-europe-germany-enterprise-gdpr-and-big-company-sce' }
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
