# Java: Core Syntax and OOP

## Core Syntax

### Data Types
| Category | Types | Size | Example |
| :--- | :--- | :--- | :--- |
| **Primitives (Integer)** | `byte`, `short`, `int`, `long` | 8, 16, 32, 64 bits | `int x = 42; long y = 42L;` |
| **Primitives (Float)** | `float`, `double` | 32, 64 bits | `float f = 3.14f; double d = 3.14;` |
| **Primitives (Other)** | `char`, `boolean` | 16 bits, 1 bit | `char c = 'A'; boolean b = true;` |
| **Reference Types** | Classes, Interfaces, Arrays | N/A (memory ref) | `String s = "Hello"; int[] arr = {1, 2};` |

### Control Flow
```java
// if-else
if (condition) { /*...*/ } else if (other) { /*...*/ } else { /*...*/ }

// switch (Enhanced - Java 14+)
var result = switch (day) {
    case MONDAY, FRIDAY -> "Work";
    case TUESDAY -> { yield "Office"; }
    default -> "Unknown";
};

// Loops
for (int i = 0; i < 10; i++) {}        // standard
for (String item : collection) {}      // enhanced
while (condition) {}                   // while
do { } while (condition);              // do-while
```

### Strings and Arrays
*   **Strings**: Immutable. Use `StringBuilder` for mutations.
    *   `s.length()`, `s.substring(0, 5)`, `s.equals("Other")`, `s.equalsIgnoreCase("other")`
*   **Arrays**: Fixed size.
    *   `int[] arr = new int[5];`
    *   `int[] arr2 = {1, 2, 3};`
    *   `arr.length`

## Object-Oriented Programming (OOP)

### Classes and Objects
```java
public class Person {
    // 1. Fields (State)
    private String name;
    public static int count = 0; // Class variable

    // 2. Constructors
    public Person(String name) {
        this.name = name;
        count++;
    }

    // 3. Methods (Behavior)
    public String getName() { return this.name; }
    
    // 4. Static Methods
    public static int getCount() { return count; }
}

Person p = new Person("Alice"); // Instantiation
```

### Access Modifiers
| Modifier | Class | Package | Subclass | World |
| :--- | :--- | :--- | :--- | :--- |
| `public` | ✅ | ✅ | ✅ | ✅ |
| `protected`| ✅ | ✅ | ✅ | ❌ |
| *(default)*| ✅ | ✅ | ❌ | ❌ |
| `private` | ✅ | ❌ | ❌ | ❌ |

### The 4 Pillars of OOP

#### 1. Encapsulation
Hiding internal state and requiring all interaction to be performed through an object's methods.
*   **Implementation**: Use `private` fields and public getters/setters.
*   *Record Classes* (Java 14+): Concise way to create immutable data carriers. `public record Point(int x, int y) {}`

#### 2. Inheritance
A mechanism where a new class is derived from an existing class. Java supports *single inheritance* for classes.
```java
public class Employee extends Person {
    private double salary;
    
    public Employee(String name, double salary) {
        super(name); // Call parent constructor
        this.salary = salary;
    }
    
    @Override // Annotation ensures method overrides parent
    public String getName() {
        return super.getName() + " (Employee)";
    }
}
```

#### 3. Polymorphism
The ability of an object to take on many forms.
*   **Compile-time (Method Overloading)**: Same method name, different parameters.
*   **Run-time (Method Overriding)**: Subclass provides a specific implementation of a parent's method.
```java
Person p = new Employee("Bob", 50000);
p.getName(); // Calls Employee's getName() at runtime
```

#### 4. Abstraction
Hiding complex implementation details and showing only the essential features of the object.
*   **Abstract Classes**: Cannot be instantiated. Can have abstract and concrete methods.
    ```java
    public abstract class Shape {
        public abstract double area(); // Must be implemented by subclass
    }
    ```
*   **Interfaces**: A contract for what a class can do. A class can implement *multiple* interfaces.
    ```java
    public interface Flyable {
        void fly(); // implicitly public abstract
        default void land() {} // Java 8+ default method
    }
    public class Bird implements Flyable {
        public void fly() { System.out.println("Flying"); }
    }
    ```

### Key Keywords
*   `this`: Refers to the current object.
*   `super`: Refers to the parent class.
*   `final`:
    *   Variable: Constant, cannot be reassigned.
    *   Method: Cannot be overridden.
    *   Class: Cannot be subclassed.
*   `static`: Belongs to the class rather than instances.
*   `instanceof`: Checks if an object is an instance of a specific class/interface (e.g., `if (obj instanceof String s) { ... }`).
