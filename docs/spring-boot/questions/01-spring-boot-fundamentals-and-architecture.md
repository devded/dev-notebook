# Spring Boot Fundamentals and Architecture

## 1. What is Spring Boot and how does it differ from the traditional Spring Framework? <Badge type="tip" text="easy" />

::: details View Answer
**Answer:**
Spring Boot is an extension of the Spring Framework designed to simplify the setup, configuration, and deployment of Spring applications. While the traditional Spring Framework provides a comprehensive programming and configuration model, it often requires extensive boilerplate configuration (XML or Java-based) and dependency management.

Key differences include:
- **Auto-configuration:** Spring Boot automatically configures classes based on the dependencies present in the classpath.
- **Standalone:** It provides embedded HTTP servers (like Tomcat, Jetty, or Undertow), allowing you to run applications directly without deploying to an external servlet container.
- **Starter POMs:** Spring Boot offers opinionated starter dependencies (e.g., `spring-boot-starter-web`) that bundle common dependencies together to simplify build configuration.
- **Production-ready features:** It includes built-in features like metrics, health checks, and externalized configuration via Spring Boot Actuator.
:::

## 2. Explain the core concept of Auto-configuration in Spring Boot. <Badge type="warning" text="medium" />

::: details View Answer
**Answer:**
Auto-configuration is a feature in Spring Boot that automatically configures the Spring application based on the jar dependencies that you have added. It attempts to guess and configure beans that you are likely to need.

For example, if `HSQLDB` is on your classpath and you have not manually configured any database connection beans, Spring Boot will automatically configure an in-memory database.

Auto-configuration is triggered by the `@EnableAutoConfiguration` annotation (which is typically included implicitly via `@SpringBootApplication`). It works by scanning the classpath and looking for classes defined in the `META-INF/spring.factories` (or `META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports` in newer versions) under the `EnableAutoConfiguration` key. Conditions like `@ConditionalOnClass`, `@ConditionalOnMissingBean`, and `@ConditionalOnProperty` determine whether a specific auto-configuration should apply.
:::

## 3. What does the `@SpringBootApplication` annotation do? <Badge type="tip" text="easy" />

::: details View Answer
**Answer:**
`@SpringBootApplication` is a convenience annotation that encapsulates three essential Spring Boot annotations:

1.  `@Configuration`: Tags the class as a source of bean definitions for the application context.
2.  `@EnableAutoConfiguration`: Tells Spring Boot to start adding beans based on classpath settings, other beans, and various property settings.
3.  `@ComponentScan`: Tells Spring to look for other components, configurations, and services in the specified package and its sub-packages.

```java
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication // Equivalent to @Configuration, @EnableAutoConfiguration, and @ComponentScan
public class MyApplication {
    public static void main(String[] args) {
        SpringApplication.run(MyApplication.class, args);
    }
}
```
:::

## 4. How does Spring Boot handle externalized configuration? <Badge type="warning" text="medium" />

::: details View Answer
**Answer:**
Spring Boot allows you to externalize your configuration so you can work with the same application code in different environments. You can use properties files, YAML files, environment variables, and command-line arguments.

Spring Boot uses a specific `PropertySource` order that allows sensible overriding of values. The typical order (from highest precedence to lowest) includes:
1. Command-line arguments.
2. Java System properties (`System.getProperties()`).
3. OS environment variables.
4. Profile-specific application properties (`application-{profile}.properties` or `.yml`).
5. Application properties (`application.properties` or `.yml`).
6. `@PropertySource` annotations on your `@Configuration` classes.
7. Default properties (specified by setting `SpringApplication.setDefaultProperties`).

Values can be injected into beans using `@Value` or bound to structured objects using `@ConfigurationProperties`.
:::

## 5. Describe the Spring Boot Starter dependencies. Can you name a few commonly used ones? <Badge type="tip" text="easy" />

::: details View Answer
**Answer:**
Starters are a set of convenient dependency descriptors that you can include in your application. You get a one-stop-shop for all the Spring and related technology that you need, without having to hunt through sample code and copy-paste loads of dependency descriptors.

Common starters include:
- `spring-boot-starter-web`: For building web applications, including RESTful applications using Spring MVC. Uses Tomcat as the default embedded container.
- `spring-boot-starter-data-jpa`: For using Spring Data JPA with Hibernate.
- `spring-boot-starter-security`: For Spring Security.
- `spring-boot-starter-test`: For testing Spring Boot applications with libraries including JUnit, Jupiter, Hamcrest, and Mockito.
- `spring-boot-starter-actuator`: For using Spring Boot's production-ready features (metrics, health checks, etc.).
:::

## 6. What is Spring Boot Actuator and why is it useful? <Badge type="warning" text="medium" />

::: details View Answer
**Answer:**
Spring Boot Actuator is a sub-project that provides production-ready features to help you monitor and manage your application. When activated, it exposes various endpoints (either via HTTP or JMX) to gather information about the running application.

Useful endpoints include:
- `/actuator/health`: Returns application health information.
- `/actuator/info`: Displays arbitrary application info.
- `/actuator/metrics`: Shows metrics information for the current application.
- `/actuator/env`: Returns properties from Spring's `ConfigurableEnvironment`.
- `/actuator/loggers`: Shows and modifies the configuration of loggers in the application.

It is highly useful for DevOps and monitoring tools to check the status and health of microservices.
:::

## 7. How does the SpringApplication.run() method work internally? <Badge type="danger" text="hard" />

::: details View Answer
**Answer:**
When `SpringApplication.run()` is called, several steps are performed to start the application:

```mermaid
flowchart TD
    A[Start: SpringApplication.run()] --> B[Create SpringApplication instance]
    B --> C[Determine WebApplicationType<br/>Servlet/Reactive/None]
    C --> D[Load ApplicationContextInitializers]
    D --> E[Load ApplicationListeners]
    E --> F[Run method called]
    F --> G[Start StopWatch]
    G --> H[Prepare Environment]
    H --> I[Print Banner]
    I --> J[Create ApplicationContext]
    J --> K[Prepare Context<br/>apply initializers, listeners, load sources]
    K --> L[Refresh Context<br/>Initialize beans, auto-config, start embedded server]
    L --> M[After Refresh<br/>Call ApplicationRunners & CommandLineRunners]
    M --> N[End: Application is Running]
```

1. **Initialization:** Determines the web application type (Servlet, Reactive, or None), loads initializers, and listeners from `spring.factories`.
2. **Environment Preparation:** Creates and configures the `Environment` (properties, profiles).
3. **Banner:** Prints the Spring Boot banner.
4. **Context Creation:** Instantiates the appropriate `ApplicationContext` based on the web application type.
5. **Context Preparation:** Associates the environment, runs initializers, and loads bean definitions from primary sources.
6. **Context Refresh:** The core Spring container initialization process. For web apps, this includes starting the embedded web server (Tomcat/Jetty).
7. **Runners:** Executes any `ApplicationRunner` or `CommandLineRunner` beans.
:::

## 8. What is the difference between `@RestController` and `@Controller` in Spring Boot? <Badge type="tip" text="easy" />

::: details View Answer
**Answer:**
- `@Controller` is a common Spring MVC annotation used to mark a class as a web controller. It typically returns a view name (a String) which is resolved by a ViewResolver to render an HTML page.
- `@RestController` is a convenience annotation introduced in Spring 4.0. It combines `@Controller` and `@ResponseBody`. This means that instead of returning a view, the return value of the methods is automatically serialized (usually into JSON or XML) and written directly to the HTTP response body. It is primarily used for creating RESTful web services.

```java
// Traditional MVC Controller
@Controller
public class MyWebController {
    @GetMapping("/greeting")
    public String greeting(Model model) {
        model.addAttribute("name", "World");
        return "greeting"; // Returns a view template named "greeting"
    }
}

// REST Controller
@RestController
public class MyRestController {
    @GetMapping("/api/greeting")
    public String greeting() {
        return "Hello World"; // Returns literal string "Hello World" in response body
    }
}
```
:::

## 9. How can you disable a specific Auto-configuration class? <Badge type="warning" text="medium" />

::: details View Answer
**Answer:**
You can disable a specific auto-configuration class in a few ways:

1. **Using the `exclude` attribute on `@SpringBootApplication` or `@EnableAutoConfiguration`:**
```java
@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})
public class MyApplication { ... }
```

2. **Using the `excludeName` attribute if the class is not on the classpath:**
```java
@SpringBootApplication(excludeName = {"org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration"})
public class MyApplication { ... }
```

3. **Using application properties (`application.properties` or `application.yml`):**
```properties
spring.autoconfigure.exclude=org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration
```
:::

## 10. Explain the role of `CommandLineRunner` and `ApplicationRunner`. <Badge type="warning" text="medium" />

::: details View Answer
**Answer:**
Both `CommandLineRunner` and `ApplicationRunner` are interfaces provided by Spring Boot. Beans implementing these interfaces are automatically executed exactly once, just before `SpringApplication.run()` completes. They are typically used to execute some startup logic, such as loading initial data into a database or performing specific checks.

The only difference between them is their `run` method signature:
- `CommandLineRunner` receives the raw application arguments as a simple string array (`String... args`).
- `ApplicationRunner` receives an `ApplicationArguments` object, which provides a more structured way to access parsed command-line arguments (e.g., separating option arguments like `--foo=bar` from non-option arguments).

```java
@Component
public class MyStartupRunner implements CommandLineRunner {
    @Override
    public void run(String... args) throws Exception {
        System.out.println("Application started with args: " + Arrays.toString(args));
    }
}
```
:::

## 11. What is the difference between application.properties and application.yml? <Badge type="tip" text="easy" />

::: details View Answer
**Answer:**
Both files serve the same purpose: providing external configuration for the Spring Boot application. The difference lies in their format and syntax.

- **application.properties:** Uses standard key-value pairs. It can become repetitive when configuring deeply nested properties.
```properties
server.port=8080
spring.datasource.url=jdbc:mysql://localhost/test
spring.datasource.username=dbuser
```

- **application.yml:** Uses YAML (YAML Ain't Markup Language), which provides a more structured, hierarchical format. It is often considered more readable and reduces repetition for grouped properties.
```yaml
server:
  port: 8080
spring:
  datasource:
    url: jdbc:mysql://localhost/test
    username: dbuser
```
Spring Boot handles both transparently. YAML files cannot be loaded by the `@PropertySource` annotation in traditional Spring, but Spring Boot's environment handles them natively.
:::

## 12. How does Spring Boot manage dependency versions? <Badge type="warning" text="medium" />

::: details View Answer
**Answer:**
Spring Boot manages dependency versions through the `spring-boot-dependencies` BOM (Bill of Materials).

When you create a Spring Boot project, you typically inherit from the `spring-boot-starter-parent` (in Maven) or apply the Spring Boot dependency management plugin (in Gradle). The parent POM/plugin imports the `spring-boot-dependencies` BOM.

This BOM contains a curated list of compatible versions for hundreds of common third-party libraries (e.g., Hibernate, Jackson, Tomcat). Because of this, you can omit the `<version>` tag when declaring dependencies in your `pom.xml` (or build.gradle). Spring Boot ensures that the versions of the libraries you use are tested and proven to work together, mitigating dependency hell.

You can override a managed version by specifying a property (e.g., `<mysql.version>8.0.22</mysql.version>`) in your build file.
:::

## 13. What is the purpose of `@Conditional` annotations in Spring Boot Auto-configuration? <Badge type="danger" text="hard" />

::: details View Answer
**Answer:**
`@Conditional` annotations are the backbone of Spring Boot's auto-configuration mechanism. They allow configuration classes or individual beans to be conditionally registered in the ApplicationContext based on specific criteria.

Spring Boot provides several specialized conditional annotations:
- `@ConditionalOnClass`: Registers the bean only if the specified class is present on the classpath.
- `@ConditionalOnMissingBean`: Registers the bean only if a bean of the specified type does not already exist in the context. (Useful for providing default implementations that users can override).
- `@ConditionalOnProperty`: Registers the bean based on the presence, absence, or specific value of an environment property.
- `@ConditionalOnWebApplication`: Registers the bean only if the application is a web application.

Example:
```java
@Bean
@ConditionalOnMissingBean(DataSource.class)
public DataSource defaultDataSource() {
    // Provides a default DataSource only if the user hasn't defined their own DataSource bean
    return new EmbeddedDatabaseBuilder().build();
}
```
:::

## 14. How can you change the default embedded server in a Spring Boot web application? <Badge type="warning" text="medium" />

::: details View Answer
**Answer:**
By default, `spring-boot-starter-web` includes Tomcat as the embedded server. To change it to Jetty or Undertow, you need to exclude Tomcat from the web starter and add the starter for your preferred server.

Example (Maven) changing to Undertow:
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
    <exclusions>
        <exclusion>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-tomcat</artifactId>
        </exclusion>
    </exclusions>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-undertow</artifactId>
</dependency>
```
Spring Boot's auto-configuration will detect Undertow on the classpath and configure it as the embedded server instead of Tomcat.
:::

## 15. What are Profiles in Spring Boot and how do you use them? <Badge type="tip" text="easy" />

::: details View Answer
**Answer:**
Profiles provide a way to segregate parts of your application configuration and make it available only in certain environments (e.g., dev, test, prod).

You can mark a bean or a configuration class to belong to a specific profile using the `@Profile("dev")` annotation.

You can also create profile-specific properties files, like `application-dev.properties` or `application-prod.yml`.

To activate a profile, you can set the `spring.profiles.active` property:
- In `application.properties`: `spring.profiles.active=dev`
- As a command-line argument: `java -jar myapp.jar --spring.profiles.active=prod`
- As an environment variable: `SPRING_PROFILES_ACTIVE=test`

Only the beans and properties associated with the active profiles will be loaded into the ApplicationContext.
:::

## 16. Explain the concept of `@ConfigurationProperties`. <Badge type="warning" text="medium" />

::: details View Answer
**Answer:**
`@ConfigurationProperties` is used to bind externalized properties (from `application.properties`/`yml`) to a strongly-typed Java bean. This is superior to using multiple `@Value` annotations because it provides type safety, validation, and structured organization of configuration.

```java
// application.yml
// myapp:
//   api-key: secret123
//   timeout: 5000

@Component
@ConfigurationProperties(prefix = "myapp")
public class MyAppProperties {
    private String apiKey;
    private int timeout;
    // Getters and Setters are required for binding!
    
    public String getApiKey() { return apiKey; }
    public void setApiKey(String apiKey) { this.apiKey = apiKey; }
    public int getTimeout() { return timeout; }
    public void setTimeout(int timeout) { this.timeout = timeout; }
}
```
You can then inject `MyAppProperties` into any component to access the configuration values.
:::

## 17. How do you handle exceptions globally in a Spring Boot REST API? <Badge type="warning" text="medium" />

::: details View Answer
**Answer:**
The standard way to handle exceptions globally across all `@RestController` classes is to use an `@ControllerAdvice` (or `@RestControllerAdvice`) class combined with `@ExceptionHandler` methods.

`@RestControllerAdvice` allows you to intercept exceptions thrown by any controller method and return a customized, standardized HTTP response (usually JSON) containing error details.

```java
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleNotFound(ResourceNotFoundException ex) {
        ErrorResponse error = new ErrorResponse("NOT_FOUND", ex.getMessage());
        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGeneric(Exception ex) {
        ErrorResponse error = new ErrorResponse("INTERNAL_SERVER_ERROR", "An unexpected error occurred");
        return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
```
:::

## 18. What is Spring Boot DevTools and what features does it provide? <Badge type="tip" text="easy" />

::: details View Answer
**Answer:**
Spring Boot DevTools is a module that provides developer conveniences to speed up the development cycle. It is intended for use only during development and is automatically disabled when running a fully packaged application.

Key features include:
- **Automatic Restart:** Restarts the Spring application context automatically when classes on the classpath change. It uses two classloaders (one for base classes, one for restart classes) to make restarts much faster than a cold start.
- **LiveReload:** Includes an embedded LiveReload server that can trigger a browser refresh when resources change.
- **Property Defaults:** Disables caching for template engines (like Thymeleaf) and enables debug logging for web groups by default to aid development.
:::

## 19. How do you implement custom validation in Spring Boot? <Badge type="warning" text="medium" />

::: details View Answer
**Answer:**
While Spring Boot provides standard JSR-380 annotations (like `@NotNull`, `@Size`, `@Email`) via `spring-boot-starter-validation`, you often need custom validation logic.

To implement custom validation:
1.  **Create a constraint annotation:**
```java
@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = CustomValidator.class)
public @interface ValidCustomField {
    String message() default "Invalid custom field";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
```
2.  **Create the validator class implementing `ConstraintValidator`:**
```java
public class CustomValidator implements ConstraintValidator<ValidCustomField, String> {
    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        if (value == null) return false;
        return value.startsWith("CUSTOM_");
    }
}
```
3.  **Apply the annotation** to your DTO field and use `@Valid` in your controller.
:::

## 20. What is the purpose of `spring-boot-starter-parent`? <Badge type="warning" text="medium" />

::: details View Answer
**Answer:**
In a Maven-based Spring Boot project, `spring-boot-starter-parent` is typically used as the parent POM. It provides several crucial benefits:

1.  **Dependency Management:** It inherits from `spring-boot-dependencies`, providing version management for standard dependencies, allowing you to omit `<version>` tags.
2.  **Default Plugin Configuration:** It pre-configures Maven plugins like `maven-compiler-plugin` (setting the Java version), `maven-surefire-plugin` (for testing), and `spring-boot-maven-plugin` (for creating the executable fat JAR).
3.  **Resource Filtering:** It sets up sensible defaults for resource filtering (e.g., allowing you to use `@..@` placeholders in `application.properties` that are replaced by Maven properties).

If you cannot use it as a parent (e.g., you have a corporate parent POM), you can still get the dependency management by importing the `spring-boot-dependencies` BOM in the `<dependencyManagement>` section.
:::