# Spring Boot: Annotations and DI

## Core Stereotype Annotations
Used to declare Spring-managed beans. Usually detected via classpath scanning (`@ComponentScan`).

| Annotation | Description | Best Practice Usage |
| :--- | :--- | :--- |
| `@Component` | Generic stereotype for any Spring-managed component. | Base annotation; use when others don't apply. |
| `@Service` | Specialization of `@Component`. Marks a class as a service layer. | Hold business logic. No special behavior over `@Component`. |
| `@Repository` | Specialization of `@Component` for DAOs. | Data access layer. Enables automatic translation of `SQLException` into Spring's `DataAccessException`. |
| `@Controller` | Specialization of `@Component` for presentation layer. | Spring MVC web controllers. Methods usually return views. |
| `@RestController` | Combines `@Controller` and `@ResponseBody`. | RESTful web services. Methods return data (JSON/XML) directly. |
| `@Configuration` | Marks a class as a source of bean definitions. | Contains `@Bean` methods to instantiate and configure dependencies. |

## Dependency Injection (DI) Annotations
How dependencies are wired into beans.

| Annotation | Description | Details / Notes |
| :--- | :--- | :--- |
| `@Autowired` | Injects a bean by type. | Can be applied to constructors (recommended), fields (discouraged), or setter methods. |
| `@Qualifier` | Specifies which bean to inject when multiple beans of the same type exist. | Used alongside `@Autowired`. e.g., `@Qualifier("specificBeanName")` |
| `@Primary` | Marks a bean as the default choice for injection when multiple candidates exist. | Placed on the bean definition (class or `@Bean` method). |
| `@Value` | Injects values from properties files, environment variables, or literals. | Supports SpEL. e.g., `@Value("${app.config.name}")` |

### Constructor Injection vs Field Injection
**Best Practice**: Always use **Constructor Injection**.
- Allows immutability (`final` fields).
- Ensures dependencies are not null upon instantiation.
- Easier to mock in unit tests without reflection.
- Note: `@Autowired` is optional on the constructor if there is only one constructor.

```java
@Service
public class OrderService {
    private final PaymentService paymentService; // final -> immutable
    
    // @Autowired is optional here in modern Spring
    public OrderService(PaymentService paymentService) {
        this.paymentService = paymentService;
    }
}
```

## Bean Scope Annotations
Defines the lifecycle and visibility of a bean. Default scope is **Singleton**.

| Scope (`@Scope("...")`) | Description |
| :--- | :--- |
| `singleton` (Default) | Single instance per Spring IoC container. |
| `prototype` | A new instance is created every time it is requested. |
| `request` | Single instance per HTTP request (Web aware). |
| `session` | Single instance per HTTP session (Web aware). |
| `application` | Single instance per `ServletContext` (Web aware). |
| `websocket` | Single instance per WebSocket lifecycle (Web aware). |

## Bean Configuration & Lifecycle
| Annotation | Description |
| :--- | :--- |
| `@Bean` | Used within `@Configuration` classes. Declares a method that instantiates, configures, and initializes a new object to be managed by Spring. |
| `@PostConstruct` | Method to run **after** dependency injection is done to perform initialization. |
| `@PreDestroy` | Method to run **before** the bean is destroyed (e.g., container shutdown). |
| `@DependsOn` | Forces a bean to be initialized before the bean declaring this annotation. |
| `@Lazy` | Delays initialization of the bean until it's first requested, rather than at startup. |

```java
@Configuration
public class AppConfig {
    
    @Bean(initMethod = "start", destroyMethod = "cleanup")
    @Scope("prototype")
    public CustomClient customClient() {
        return new CustomClient();
    }
}
```

## Conditional Bean Registration
Register beans based on specific conditions (part of Spring Boot Auto-Configuration).

| Annotation | Condition for Bean Creation |
| :--- | :--- |
| `@ConditionalOnClass` | If the specified class is present on the classpath. |
| `@ConditionalOnMissingClass`| If the specified class is NOT present on the classpath. |
| `@ConditionalOnBean` | If the specified bean is already present in the context. |
| `@ConditionalOnMissingBean` | If the specified bean is NOT already present in the context. |
| `@ConditionalOnProperty` | If a specified environment property is set (and optionally matches a value). |
| `@Profile` | If the specified Spring profile is active. (e.g., `@Profile("dev")`) |
