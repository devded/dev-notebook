# Memory & JVM

> Add new questions below in the same format: `## Question? <Badge ... />` then the answer.

## Heap vs Stack? <Badge type="tip" text="easy" />

Stack stores method frames and local primitives/references; Heap stores objects. GC manages the heap.

## How does garbage collection work? <Badge type="warning" text="medium" />

The JVM reclaims unreachable objects automatically. Generational GC splits the heap into young (Eden + survivor) and old generations; most objects die young, making minor GCs cheap.

## What is the JVM / JRE / JDK? <Badge type="tip" text="easy" />

JVM runs bytecode. JRE = JVM + libraries to run apps. JDK = JRE + compiler and dev tools to build apps.
