# Python: Advanced Functions and OOP

## Advanced Functions

| Concept | Syntax / Example | Description |
| :--- | :--- | :--- |
| **`*args`** | `def f(*args): pass` | Accepts arbitrary positional arguments (as a tuple). |
| **`**kwargs`** | `def f(**kwargs): pass` | Accepts arbitrary keyword arguments (as a dict). |
| **Lambda** | `lambda x, y: x + y` | Anonymous, single-expression function. |
| **Map** | `map(lambda x: x*2, lst)` | Applies function to every item of iterable. Returns iterator. |
| **Filter** | `filter(lambda x: x>0, lst)` | Returns items of iterable where function evaluates to True. |
| **Reduce** | `from functools import reduce`<br>`reduce(lambda x,y: x+y, lst)` | Applies function cumulatively to items, reducing sequence to single value. |
| **Zip** | `zip(list1, list2)` | Aggregates elements from iterables into tuples. |
| **Enumerate** | `enumerate(iterable, start=0)` | Returns iterator of `(index, value)` pairs. |
| **Any / All** | `any(lst)` / `all(lst)` | Returns `True` if any/all elements evaluate to `True`. |
| **Decorators** | `@decorator_func` | Modifies function behavior by wrapping it. |

### Decorators Example
```python
def my_decorator(func):
    def wrapper(*args, **kwargs):
        print("Before function call")
        result = func(*args, **kwargs)
        print("After function call")
        return result
    return wrapper

@my_decorator
def say_hello(name):
    print(f"Hello, {name}!")
```

### Closures & Scope
- **`global`**: Declares a variable as global within a local scope.
- **`nonlocal`**: Declares a variable as not local, searching enclosing scopes (excluding global).
- **Closure**: Inner function remembers state of its enclosing scope even if outer function has finished executing.

```python
def make_multiplier(n):
    def multiplier(x):
        return x * n
    return multiplier

times3 = make_multiplier(3)
print(times3(5)) # 15
```

## Object-Oriented Programming (OOP)

| Concept | Syntax / Example | Description |
| :--- | :--- | :--- |
| **Class** | `class MyClass:` | Blueprint for creating objects. |
| **Instance Method**| `def method(self, arg):` | Operates on an instance (`self`). |
| **Class Method** | `@classmethod`<br>`def cmethod(cls, arg):` | Operates on the class (`cls`). |
| **Static Method** | `@staticmethod`<br>`def smethod(arg):` | Operates independently of class/instance. |
| **Property** | `@property`<br>`def attr(self):` | Access method like an attribute (getter). Use `@attr.setter` for setter. |
| **Inheritance** | `class Child(Parent):` | Child inherits attributes and methods from Parent. |
| **Multiple Inher.**| `class Child(P1, P2):` | Inherits from multiple classes. Method Resolution Order (MRO) applies. |
| **`super()`** | `super().__init__()` | Calls method from parent class (often used in `__init__`). |
| **Dunder Methods** | `__init__`, `__str__`, `__len__` | Magic methods for operator overloading and special behavior. |

### Basic Class Structure
```python
class Animal:
    species = "Unknown"  # Class attribute

    def __init__(self, name):
        self.name = name  # Instance attribute
        self._protected = True  # Convention for protected
        self.__private = True   # Name mangling: _Animal__private

    def speak(self):
        return f"{self.name} makes a noise."

class Dog(Animal):
    def __init__(self, name, breed):
        super().__init__(name)
        self.breed = breed

    def speak(self): # Method overriding
        return f"{self.name} barks."
```

### Advanced OOP Concepts
- **Duck Typing**: "If it walks like a duck and quacks like a duck, it must be a duck." Focus on object behavior, not type.
- **Abstract Base Classes (ABC)**: Prevents instantiation of base class and enforces implementation of abstract methods in subclasses.
```python
from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self): pass

class Circle(Shape):
    def area(self): return 3.14  # Subclass MUST implement area()
```
- **Dataclasses (Python 3.7+)**: Automatically generates boilerplate methods (`__init__`, `__repr__`, `__eq__`).
```python
from dataclasses import dataclass

@dataclass
class Point:
    x: float
    y: float
    # Point(1, 2) automatically gets a nice string representation and equality
```
- **MRO (Method Resolution Order)**: Accessed via `ClassName.__mro__` or `ClassName.mro()`. The order in which base classes are searched when executing a method in multiple inheritance.
