# Spring Boot: Data JPA and Transactions

## 1. Core Annotations

| Annotation | Target | Description |
| :--- | :--- | :--- |
| `@Entity` | Class | Marks class as a JPA entity. |
| `@Table(name="t")` | Class | Maps entity to a specific database table. |
| `@Id` | Field | Marks field as the primary key. |
| `@GeneratedValue(strategy=...)` | Field | Specifies primary key generation strategy (`AUTO`, `IDENTITY`, `SEQUENCE`, `TABLE`). |
| `@Column(name="c", nullable=false)` | Field | Maps field to a specific column and defines properties (e.g., `unique`, `length`). |
| `@Transient` | Field | Ignores field during persistence (not mapped to DB). |
| `@Version` | Field | Enables optimistic locking using a version field. |
| `@Embedded` / `@Embeddable` | Field / Class | Embeds a value type object into the entity's table. |

## 2. Relationships

| Annotation | Description | Key Attributes |
| :--- | :--- | :--- |
| `@OneToOne` | 1:1 relationship | `cascade`, `fetch` (`EAGER` by default), `mappedBy`, `orphanRemoval` |
| `@OneToMany` | 1:N relationship | `cascade`, `fetch` (`LAZY` by default), `mappedBy`, `orphanRemoval` |
| `@ManyToOne` | N:1 relationship | `cascade`, `fetch` (`EAGER` by default), `optional` |
| `@ManyToMany` | N:N relationship | `cascade`, `fetch` (`LAZY` by default), `mappedBy` |
| `@JoinColumn` | Specifies foreign key column | `name`, `referencedColumnName`, `nullable` |
| `@JoinTable` | Specifies join table (for N:N) | `name`, `joinColumns`, `inverseJoinColumns` |

## 3. Repositories (Spring Data JPA)

### Core Interfaces
- `Repository<T, ID>`: Marker interface.
- `CrudRepository<T, ID>`: Basic CRUD operations (`save`, `findById`, `findAll`, `deleteById`).
- `ListCrudRepository<T, ID>`: CrudRepository returning `List` instead of `Iterable`. (Spring Data 3.0+)
- `PagingAndSortingRepository<T, ID>`: Adds `findAll(Sort)` and `findAll(Pageable)`.
- `JpaRepository<T, ID>`: JPA specific methods (`flush`, `saveAndFlush`, batch deletes). Extends `ListCrudRepository` and `PagingAndSortingRepository`.

### Query Methods
Method names translate into SQL queries.

```java
public interface UserRepository extends JpaRepository<User, Long> {
    // Exact match
    List<User> findByEmail(String email);
    
    // Conditions
    List<User> findByAgeGreaterThan(int age);
    List<User> findByStatusIn(Collection<String> statuses);
    
    // Complex
    List<User> findByLastNameAndFirstNameAllIgnoreCase(String last, String first);
    
    // Traversal (find by related entity property)
    List<User> findByAddress_City(String city);
    
    // Limits and Ordering
    List<User> findTop10ByOrderByCreatedAtDesc();
    
    // Paging
    Page<User> findByRole(String role, Pageable pageable);
    // Slice<User> findByRole(String role, Pageable pageable); // for performance (no count query)
}
```

### Custom Queries (`@Query`)
```java
// JPQL (default)
@Query("SELECT u FROM User u WHERE u.status = ?1")
List<User> findUsersByStatus(String status);

// Native SQL
@Query(value = "SELECT * FROM users WHERE status = :status", nativeQuery = true)
List<User> findUsersByStatusNative(@Param("status") String status);

// Modifying Queries
@Modifying
@Query("UPDATE User u SET u.status = :status WHERE u.lastLoginDate < :date")
int updateStatusForInactiveUsers(@Param("status") String status, @Param("date") LocalDate date);
```

### Projections
Retrieve partial entity data.

```java
// Interface Projection (Closed)
public interface UserSummary {
    String getFirstName();
    String getLastName();
}
List<UserSummary> findByRole(String role);

// Class Projection (DTO)
public record UserDto(String firstName, String lastName) {}
// Requires JPQL constructor expression if not using dynamic projections
@Query("SELECT new com.example.UserDto(u.firstName, u.lastName) FROM User u")
List<UserDto> findAllUserDtos();
```

## 4. Entity Lifecycle & Callbacks

| Annotation | Description |
| :--- | :--- |
| `@PrePersist` | Executed before `EntityManager.persist()` |
| `@PostPersist` | Executed after database insert |
| `@PreUpdate` | Executed before database update |
| `@PostUpdate` | Executed after database update |
| `@PreRemove` | Executed before `EntityManager.remove()` |
| `@PostRemove` | Executed after database delete |
| `@PostLoad` | Executed after loading entity into current persistence context |

## 5. Auditing
1. Enable via `@EnableJpaAuditing` on a configuration class.
2. Add `@EntityListeners(AuditingEntityListener.class)` to the entity.
3. Use annotations on fields:
   - `@CreatedDate`: Sets timestamp of creation.
   - `@LastModifiedDate`: Sets timestamp of last update.
   - `@CreatedBy`: Sets user who created (requires `AuditorAware` bean).
   - `@LastModifiedBy`: Sets user who last updated.

## 6. Transactions (`@Transactional`)

Manages database transaction boundaries. Can be applied at class or method level.

### Key Attributes

| Attribute | Default | Description |
| :--- | :--- | :--- |
| `propagation` | `REQUIRED` | Defines transaction boundaries. (See below) |
| `isolation` | `DEFAULT` | Isolation level (e.g., `READ_COMMITTED`, `SERIALIZABLE`). |
| `readOnly` | `false` | Hints to provider to optimize for read-only (disables dirty checking). |
| `timeout` | `-1` | Timeout in seconds. |
| `rollbackFor` | `RuntimeException.class`, `Error.class` | Exceptions that trigger rollback. |
| `noRollbackFor` | empty | Exceptions that do *not* trigger rollback. |

### Propagation Types

| Type | Behavior |
| :--- | :--- |
| `REQUIRED` | Join existing transaction, or create a new one if none exists. (Standard) |
| `REQUIRES_NEW` | Always create a new transaction, suspending the current one if it exists. |
| `SUPPORTS` | Participate if a transaction exists; otherwise, execute non-transactionally. |
| `NOT_SUPPORTED` | Execute non-transactionally, suspending current transaction if it exists. |
| `MANDATORY` | Join existing transaction; throw exception if none exists. |
| `NEVER` | Execute non-transactionally; throw exception if a transaction exists. |
| `NESTED` | Execute within a nested transaction (savepoint) if a transaction exists, else behave like `REQUIRED`. |

### Important Transaction Notes
1. **Proxy mechanism**: `@Transactional` only works on public methods when called from outside the bean (due to AOP proxying). Self-invocation (calling a `@Transactional` method from another method in the same class) ignores the annotation.
2. **Checked Exceptions**: By default, transactions do NOT roll back on checked exceptions (e.g., `IOException`). Use `@Transactional(rollbackFor = Exception.class)` to change this.
3. **Read-only performance**: Use `@Transactional(readOnly = true)` for fetch operations to avoid overhead of flush and dirty checking.

## 7. Configuration Properties (`application.yml`)

```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/mydb
    username: myuser
    password: mypassword
    driver-class-name: org.postgresql.Driver
  jpa:
    hibernate:
      ddl-auto: update # none, validate, update, create, create-drop
    show-sql: true # Log SQL statements
    properties:
      hibernate:
        format_sql: true # Format logged SQL
        generate_statistics: false # Profiling info
    open-in-view: false # Disable OSIV (Recommended to avoid N+1 issues in web tier)
```

## 8. Common Pitfalls & Best Practices

1. **N+1 Select Problem**: Default `FetchType.EAGER` or iterating over `LAZY` collections triggers multiple queries.
   - *Fix*: Use `@EntityGraph`, `JOIN FETCH` in `@Query`, or DTO projections.
   ```java
   @EntityGraph(attributePaths = {"roles"})
   List<User> findAll();
   ```
2. **Lombok with JPA**: 
   - Avoid `@Data` or `@EqualsAndHashCode` on entities; they load lazy collections and cause issues with proxies. Implement `equals`/`hashCode` using the `@Id` or natural keys, or use Lombok's `@Getter`/`@Setter` instead.
   - Avoid `@ToString` on lazy relationships to prevent `LazyInitializationException`. Use `@ToString.Exclude`.
3. **`save()` vs `saveAll()`**: Prefer `saveAll()` for collections to optimize batching.
4. **LazyInitializationException**: Occurs when accessing a lazy collection outside of the transaction boundary.
   - *Fix*: Fetch required data within the transaction using `JOIN FETCH` or Entity Graphs. Avoid `spring.jpa.open-in-view=true`.
