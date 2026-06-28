# OOP

> Add new questions below in the same format: `## Question? <Badge ... />` then the answer.

## Instance vs class vs static methods? <Badge type="warning" text="medium" />

::: details View Answer
**Instance methods** take `self` and can read/modify instance state. **Class methods** (`@classmethod`) take `cls` — great for alternative constructors or class-level state. **Static methods** (`@staticmethod`) take neither; they're plain functions grouped in the class namespace.

```python
class Calendar:
    def __init__(self, day):
        self.day = day

    @classmethod
    def from_string(cls, s):          # alternative constructor
        return cls(datetime.strptime(s, "%Y-%m-%d"))

    @staticmethod
    def is_weekend(day):              # no class/instance access
        return day.weekday() in (5, 6)

    def schedule(self, time):         # uses instance state
        return f"Meeting on {self.day} at {time}"
```
:::

## How do inheritance and MRO work? <Badge type="danger" text="hard" />

::: details View Answer
Method Resolution Order is the sequence Python searches through an inheritance hierarchy to find a method — crucial with multiple inheritance. Python computes it with the **C3 linearization** algorithm. Inspect it via `Cls.__mro__` or `Cls.mro()`.

```python
class Animal:
    def speak(self): return "sound"

class Flyable:
    def fly(self): return "flying"

class Bird(Animal, Flyable):
    def speak(self): return "tweet"

print(Bird.__mro__)
# (Bird, Animal, Flyable, object)
```
:::

## `__str__` vs `__repr__`? <Badge type="tip" text="easy" />

::: details View Answer
`__str__` is the human-readable form (for `print`); `__repr__` is the unambiguous developer form (for debugging/REPL), ideally valid Python.

```python
class Point:
    def __init__(self, x): self.x = x
    def __repr__(self): return f"Point({self.x!r})"
```
:::

## What is the purpose of `self`? <Badge type="tip" text="easy" />

::: details View Answer
`self` is the conventional name for an instance method's first parameter — it refers to the instance the method was called on. Python makes it explicit: `dog.bark()` is really `Dog.bark(dog)`. Omit it and you get a `TypeError`.

```python
class Dog:
    def __init__(self, name):
        self.name = name
    def bark(self):
        return f"{self.name} says woof!"

Dog("Rex").bark()   # Python passes the instance as self
```
:::

## What are magic (dunder) methods? <Badge type="warning" text="medium" />

::: details View Answer
Double-underscore methods that Python calls implicitly so your objects can behave like built-ins. Examples: `__init__` (construct), `__repr__`/`__str__` (display), `__len__` (`len()`), `__getitem__`/`__setitem__` (`obj[key]`), `__iter__`/`__next__` (iteration), `__eq__`/`__lt__` (comparisons).

```python
class Countdown:
    def __init__(self, start): self.current = start
    def __iter__(self): return self
    def __next__(self):
        if self.current <= 0:
            raise StopIteration
        self.current -= 1
        return self.current + 1

for n in Countdown(3):
    print(n)   # 3, 2, 1
```
:::

## What are classes, and how does Python support OOP? <Badge type="tip" text="easy" />

::: details View Answer
A class is a blueprint bundling data (attributes) and behavior (methods); instances are objects created from it. Python supports the four OOP pillars — encapsulation, inheritance, polymorphism, abstraction — with classes that are themselves objects.

```python
class Dog:
    def __init__(self, name):
        self.name = name
    def bark(self):
        return f"{self.name}: woof"

Dog("Rex").bark()
```
:::

## What is inheritance? Give an example. <Badge type="tip" text="easy" />

::: details View Answer
A subclass reuses and extends a parent class's attributes/methods, overriding where needed.

```python
class Animal:
    def speak(self):
        return "..."

class Cat(Animal):       # inherits from Animal
    def speak(self):     # override
        return "meow"

Cat().speak()   # 'meow'
```
:::

## How do you achieve encapsulation? <Badge type="warning" text="medium" />

::: details View Answer
Bundle state with the methods that manage it and signal privacy by convention: a single underscore `_x` means "internal", a double underscore `__x` triggers name-mangling to discourage external access. Expose controlled access via `@property`.

```python
class Account:
    def __init__(self, balance):
        self.__balance = balance       # name-mangled
    @property
    def balance(self):
        return self.__balance
```
:::

## What is polymorphism? <Badge type="warning" text="medium" />

::: details View Answer
The same operation behaving differently across types. Python relies on duck typing — if an object implements the expected method, it works, regardless of its class.

```python
def make_speak(animal):
    return animal.speak()    # works for any object with speak()

make_speak(Cat())   # 'meow'
make_speak(Dog("Rex"))
```
:::

## What does `super()` do? <Badge type="warning" text="medium" />

::: details View Answer
Calls a method from the parent (next class in the MRO) — commonly to extend `__init__` rather than fully replacing it.

```python
class Base:
    def __init__(self, x):
        self.x = x

class Child(Base):
    def __init__(self, x, y):
        super().__init__(x)   # run parent init
        self.y = y
```
:::

## How do you prevent a class from being inherited? <Badge type="danger" text="hard" />

::: details View Answer
There's no `final` keyword, but you can block subclassing by raising in `__init_subclass__`, or use `typing.final` for static-checker enforcement.

```python
class Sealed:
    def __init_subclass__(cls, **kwargs):
        raise TypeError("Sealed cannot be subclassed")
```
:::

## What is an abstract class? <Badge type="warning" text="medium" />

::: details View Answer
A class that can't be instantiated and defines methods subclasses must implement. Use `abc.ABC` + `@abstractmethod`.

```python
from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self): ...

class Circle(Shape):
    def __init__(self, r): self.r = r
    def area(self): return 3.14159 * self.r ** 2
```
:::

## How does multiple inheritance work? <Badge type="danger" text="hard" />

::: details View Answer
A class can inherit from several parents; attribute/method lookup follows the MRO (C3 linearization), and `super()` walks that chain. Keep hierarchies shallow to avoid the diamond problem.

```python
class A: pass
class B(A): pass
class C(A): pass
class D(B, C): pass
print(D.__mro__)   # D, B, C, A, object
```
:::

## Class variables vs instance variables? <Badge type="warning" text="medium" />

::: details View Answer
Class variables are shared by all instances (defined in the class body); instance variables are per-object (set on `self`, usually in `__init__`).

```python
class Dog:
    species = "Canis"        # class variable (shared)
    def __init__(self, name):
        self.name = name     # instance variable (per dog)
```
:::

## What is method overriding? <Badge type="tip" text="easy" />

::: details View Answer
A subclass redefines a method inherited from its parent, replacing the behavior; call the original with `super()` if needed.

```python
class Animal:
    def speak(self): return "..."
class Cat(Animal):
    def speak(self): return "meow"   # overrides Animal.speak
```
:::

## Does Python support function/method overloading? <Badge type="warning" text="medium" />

::: details View Answer
Not in the classic (same name, different signatures) sense — a later definition just replaces the earlier. Achieve similar behavior with default args, `*args`/`**kwargs`, or `functools.singledispatch` for type-based dispatch.

```python
from functools import singledispatch

@singledispatch
def area(shape): raise NotImplementedError

@area.register
def _(r: float): return 3.14 * r * r
```
:::

## What is a metaclass, and why use it? <Badge type="danger" text="hard" />

::: details View Answer
A metaclass is the "class of a class" — it controls how classes are created (default is `type`). Use one to enforce conventions, auto-register subclasses, or inject attributes. Rarely needed; decorators or `__init_subclass__` often suffice.

```python
class Meta(type):
    def __new__(mcls, name, bases, ns):
        ns["created_by"] = "Meta"
        return super().__new__(mcls, name, bases, ns)

class Foo(metaclass=Meta): pass
Foo.created_by   # 'Meta'
```
:::

## What is composition (vs inheritance)? <Badge type="warning" text="medium" />

::: details View Answer
Composition builds a class by **holding instances** of other classes as attributes ("has-a"), rather than inheriting from them ("is-a"). It's more flexible and loosely coupled — often preferred over deep inheritance.

```python
class Engine:
    def start(self): return "vroom"

class Car:
    def __init__(self):
        self.engine = Engine()      # composition: Car HAS an Engine
    def start(self):
        return self.engine.start()
```
:::

## How do you check an object's class with `isinstance()`? <Badge type="tip" text="easy" />

::: details View Answer
`isinstance(obj, Class)` returns `True` if `obj` is that class or a subclass; pass a tuple to check several. Prefer it over `type(obj) == Class` because it respects inheritance.

```python
isinstance(5, int)              # True
isinstance(5, (int, float))     # True (any of these)
issubclass(bool, int)           # True
```
:::

## What is OOP and what problems does it solve? <Badge type="tip" text="easy" />

::: details View Answer
Object-Oriented Programming organizes code around **objects** that bundle data and behavior. It tackles complexity and duplication via encapsulation (hide internals), inheritance (reuse), polymorphism (uniform interfaces), and abstraction (expose only essentials) — yielding modular, maintainable, reusable code.
:::

## What's the difference between a class and an object? <Badge type="tip" text="easy" />

::: details View Answer
A **class** is the blueprint (defines attributes/methods); an **object** is a concrete instance created from it, with its own data. One class → many objects.

```python
class Dog: ...
a = Dog()   # object (instance)
b = Dog()   # another object
```
:::

## What is the `__init__()` method? <Badge type="tip" text="easy" />

::: details View Answer
The initializer (constructor-like) run automatically when an instance is created — it sets up instance attributes. It receives `self` plus any creation arguments.

```python
class User:
    def __init__(self, name):
        self.name = name      # set up instance state

User("Sam").name              # 'Sam'
```
:::

## Does Python have private variables / what is name mangling? <Badge type="warning" text="medium" />

::: details View Answer
No true privacy. Conventions: a single leading underscore `_x` means "internal, don't touch". A double leading underscore `__x` triggers **name mangling** — Python renames it to `_ClassName__x` to avoid clashes in subclasses, making it harder (not impossible) to access from outside.

```python
class Account:
    def __init__(self):
        self._internal = 1     # convention: private
        self.__secret = 2      # name-mangled

a = Account()
a._Account__secret             # 2  (still reachable)
```
:::

## What is the `@property` decorator (vs getters/setters)? <Badge type="warning" text="medium" />

::: details View Answer
`@property` exposes a method as if it were an attribute, so you can add validation/computation without changing the public API. More Pythonic than Java-style `get_x()`/`set_x()` — callers just use `obj.x`.

```python
class Circle:
    def __init__(self, r): self._r = r

    @property
    def radius(self):           # getter -> obj.radius
        return self._r

    @radius.setter
    def radius(self, value):    # setter -> obj.radius = value
        if value < 0:
            raise ValueError("radius must be >= 0")
        self._r = value
```
:::

## What types of inheritance does Python support? <Badge type="warning" text="medium" />

::: details View Answer
- **Single** — one parent.
- **Multiple** — several parents (`class C(A, B)`).
- **Multilevel** — a chain (`A → B → C`).
- **Hierarchical** — many children from one parent.
- **Hybrid** — a mix (MRO resolves the order).
:::

## What is the `abc` module / abstraction? <Badge type="danger" text="hard" />

::: details View Answer
Abstraction means exposing essential behavior while hiding implementation. The `abc` module provides Abstract Base Classes: subclass `ABC` and mark required methods with `@abstractmethod` — the class can't be instantiated until all are implemented. Use it to define a contract/interface.

```python
from abc import ABC, abstractmethod

class Repository(ABC):
    @abstractmethod
    def save(self, item): ...

class SqlRepo(Repository):
    def save(self, item):
        ...        # must implement, else can't instantiate
```
:::

## What are `__slots__` and how do they save memory? <Badge type="warning" text="medium" />

::: details View Answer
By default, Python stores instance attributes in a dynamic dictionary (`__dict__`). When instantiating millions of objects, this dictionary overhead is massive. Defining `__slots__ = ['attr1', 'attr2']` tells Python not to create a `__dict__` for instances of that class, allocating space only for the specified attributes, which drastically reduces memory usage and speeds up attribute access.
:::

## What is the descriptor protocol (`__get__`, `__set__`, `__delete__`)? <Badge type="danger" text="hard" />

::: details View Answer
The descriptor protocol allows a class to define how its attributes are accessed, mutated, or deleted when accessed from another object. It is the underlying mechanism in Python that powers `@property`, `@classmethod`, `@staticmethod`, `super()`, and the fields in ORMs like Django or SQLAlchemy.
:::

## What is the difference between `__new__` and `__init__`? <Badge type="danger" text="hard" />

::: details View Answer
`__new__` is a static class method responsible for actually *allocating* and returning the new instance (the constructor). `__init__` is an instance method responsible for *initializing* the attributes of the already created instance. Overriding `__new__` is necessary when subclassing immutable types (like `tuple` or `str`) or when implementing the Singleton pattern.
:::