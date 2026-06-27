# Spring Boot Tutorial Notes

Notes for Spring Boot — convention-over-configuration framework for building Java apps & APIs.

## Setup

Generate a project at [start.spring.io](https://start.spring.io) with dependencies: *Spring Web*, *Spring Data JPA*, a database driver.

```
src/main/java/com/example/demo/
├── DemoApplication.java   # @SpringBootApplication entry point
├── controller/
├── service/
├── repository/
└── model/
```

```bash
./mvnw spring-boot:run     # Maven
./gradlew bootRun          # Gradle
```

## Entry point

```java
@SpringBootApplication
public class DemoApplication {
    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }
}
```

## REST controller

```java
@RestController
@RequestMapping("/api/posts")
public class PostController {

    private final PostService service;

    public PostController(PostService service) {  // constructor injection
        this.service = service;
    }

    @GetMapping
    public List<Post> all() { return service.findAll(); }

    @GetMapping("/{id}")
    public Post one(@PathVariable Long id) { return service.find(id); }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Post create(@RequestBody Post post) { return service.save(post); }
}
```

## Entity & repository (JPA)

```java
@Entity
public class Post {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String body;
    // getters / setters
}

public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findByTitleContaining(String keyword);  // derived query
}
```

## Service layer

```java
@Service
public class PostService {
    private final PostRepository repo;
    public PostService(PostRepository repo) { this.repo = repo; }

    public List<Post> findAll() { return repo.findAll(); }
    public Post find(Long id) {
        return repo.findById(id)
                   .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }
    public Post save(Post p) { return repo.save(p); }
}
```

## Config (application.properties)

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/mydb
spring.datasource.username=postgres
spring.datasource.password=secret
spring.jpa.hibernate.ddl-auto=update
server.port=8080
```

## Interview talking points

- **IoC / Dependency Injection** — the container manages bean lifecycle; prefer constructor injection.
- Key stereotypes: `@Component`, `@Service`, `@Repository`, `@Controller`/`@RestController`.
- **Spring Boot starters** bundle dependencies; **auto-configuration** wires sensible defaults.
- **Spring Data JPA** generates queries from method names.
- Layered architecture: Controller → Service → Repository.
- Use **profiles** (`application-dev.properties`) for env-specific config.
