# OOP & Design

> Add new questions below in the same format: `## Question? <Badge ... />` then the answer.

## Abstract class vs interface? <Badge type="warning" text="medium" />

Abstract class can have state and constructors, single inheritance. Interface defines a contract, multiple inheritance, `default`/`static` methods since Java 8.

```java
interface Shape {
    double area();                       // abstract
    default String kind() { return "shape"; }  // Java 8+
}
```

## What are the four OOP pillars? <Badge type="tip" text="easy" />

Encapsulation, Inheritance, Polymorphism, Abstraction.
