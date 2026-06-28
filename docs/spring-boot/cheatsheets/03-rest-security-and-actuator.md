# Spring Boot: REST, Security, and Actuator

## 1. REST APIs

### Annotations Quick Reference
| Annotation | Purpose | Example / Notes |
| :--- | :--- | :--- |
| `@RestController` | Combines `@Controller` & `@ResponseBody`. | Base for REST endpoints. |
| `@RequestMapping` | Maps HTTP requests to handler methods/classes. | `@RequestMapping("/api/v1/users")` |
| `@GetMapping` | Shortcut for `@RequestMapping(method = GET)`. | `@GetMapping("/{id}")` |
| `@PostMapping` | Shortcut for `@RequestMapping(method = POST)`. | `@PostMapping` |
| `@PutMapping` | Shortcut for `@RequestMapping(method = PUT)`. | `@PutMapping("/{id}")` |
| `@DeleteMapping`| Shortcut for `@RequestMapping(method = DELETE)`. | `@DeleteMapping("/{id}")` |
| `@PatchMapping` | Shortcut for `@RequestMapping(method = PATCH)`. | `@PatchMapping("/{id}")` |
| `@PathVariable` | Extracts values from the URI path. | `public User get(@PathVariable Long id)` |
| `@RequestParam` | Extracts query parameters or form data. | `public User get(@RequestParam String name)` |
| `@RequestBody` | Binds HTTP request body to a domain object. | `public User create(@RequestBody User u)` |
| `@ResponseBody` | Indicates return value is bound to response body. | Implicit in `@RestController`. |
| `@ResponseStatus`| Marks a method/exception with status code. | `@ResponseStatus(HttpStatus.CREATED)` |

### Basic Controller Example
```java
@RestController
@RequestMapping("/api/books")
public class BookController {

    @GetMapping("/{id}")
    public ResponseEntity<Book> getBook(@PathVariable Long id) {
        // ...
        return ResponseEntity.ok(book);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Book createBook(@Valid @RequestBody Book book) {
        // ...
        return savedBook;
    }
}
```

### Exception Handling
- `@ControllerAdvice` / `@RestControllerAdvice`: Global exception handling.
- `@ExceptionHandler`: Handles specific exceptions.

```java
@RestControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleNotFound(ResourceNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                             .body(new ErrorResponse(ex.getMessage()));
    }
}
```

## 2. Spring Security

### Core Concepts & Annotations
| Component / Annotation | Description |
| :--- | :--- |
| `SecurityFilterChain` | Bean defining security filter chain configuration (Spring Security 5.7+). |
| `UserDetailsService` | Interface to load user-specific data during authentication. |
| `@EnableWebSecurity` | Enables Spring Security's web security support. |
| `@EnableMethodSecurity`| Enables method-level security (`@PreAuthorize` etc., Spring Boot 3+). |
| `@PreAuthorize` | Method-level security; evaluated before method invocation. |
| `@PostAuthorize` | Method-level security; evaluated after method invocation. |

### Basic Security Configuration (Spring Boot 3 / Spring Security 6)
```java
@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable()) // Disable for stateless REST APIs
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/public/**").permitAll()
                .requestMatchers(HttpMethod.POST, "/api/admin/**").hasRole("ADMIN")
                .anyRequest().authenticated()
            )
            .httpBasic(Customizer.withDefaults()); // Or .oauth2ResourceServer(...) for JWT
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
```

### JWT Authentication Flow
1. **Login**: Client sends credentials -> Server validates -> Generates JWT -> Returns JWT.
2. **Access**: Client sends JWT in `Authorization: Bearer <token>` header -> `OncePerRequestFilter` validates token -> Sets `SecurityContextHolder`.

## 3. Spring Boot Actuator

### Dependency
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
```

### Common Endpoints (Base path: `/actuator`)
| Endpoint | Description |
| :--- | :--- |
| `/health` | Application health information (up/down). |
| `/info` | Arbitrary application info (from properties or build info). |
| `/metrics` | Detailed application metrics (memory, threads, HTTP requests). |
| `/env` | Environment properties and profiles. |
| `/beans` | List of all configured Spring beans. |
| `/loggers` | View and modify application log levels dynamically. |

### Configuration Properties (`application.properties`)
```properties
# Expose endpoints over HTTP
management.endpoints.web.exposure.include=health,info,metrics # Or '*' for all

# Show detailed health info (never, when-authorized, always)
management.endpoint.health.show-details=always

# Custom base path
management.endpoints.web.base-path=/manage
```

### Custom Health Indicator
```java
@Component
public class CustomHealthIndicator implements HealthIndicator {
    @Override
    public Health health() {
        boolean isHealthy = checkSystem(); // Custom logic
        if (isHealthy) {
            return Health.up().withDetail("System", "Operational").build();
        }
        return Health.down().withDetail("System", "Degraded").build();
    }
}
```
