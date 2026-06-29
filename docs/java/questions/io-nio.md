# I/O, Files & NIO.2

## 1. What is the difference between byte streams and character streams? <Badge type="tip" text="easy" />

::: details View Answer
- **Byte streams** (`InputStream`/`OutputStream` and subclasses like `FileInputStream`) operate on raw 8-bit bytes. Use them for binary data: images, audio, serialized objects, compressed files.
- **Character streams** (`Reader`/`Writer` and subclasses like `FileReader`) operate on 16-bit `char`s and handle **charset decoding/encoding** between bytes and text.

The bridge classes `InputStreamReader` and `OutputStreamWriter` convert between the two and let you specify a charset explicitly — which you should always do:

```java
var reader = new InputStreamReader(in, StandardCharsets.UTF_8);
```

Rule of thumb: text → character streams; everything else → byte streams.
:::

## 2. Why is buffering important, and how do `BufferedInputStream`/`BufferedReader` help? <Badge type="warning" text="medium" />

::: details View Answer
Unbuffered streams often perform one system call per `read()`/`write()` byte or char, which is dramatically slow due to syscall overhead. Buffering reads/writes large chunks into an in-memory array and serves individual calls from it, cutting syscalls by orders of magnitude.

```java
try (var in = new BufferedReader(new FileReader(path))) {
    String line;
    while ((line = in.readLine()) != null) { ... }
}
```

`BufferedReader` also adds `readLine()` and `lines()`. Always wrap raw file/socket streams in a buffered decorator (or use the NIO.2 helpers, which buffer internally). On writes, remember buffered output isn't persisted until `flush()`/`close()`.
:::

## 3. How does try-with-resources prevent resource leaks in I/O code? <Badge type="tip" text="easy" />

::: details View Answer
File handles, sockets, and channels are scarce OS resources; failing to close them leaks descriptors until the process runs out. Try-with-resources guarantees `close()` is called in reverse declaration order, even on exception:

```java
try (var in  = Files.newInputStream(src);
     var out = Files.newOutputStream(dst)) {
    in.transferTo(out);
}   // out then in are closed automatically
```

It also correctly handles the case where both the body and `close()` throw, attaching the latter as a *suppressed* exception rather than masking the real failure — something manual `finally { close(); }` does poorly.
:::

## 4. What advantages does the NIO.2 `Path`/`Files` API offer over the legacy `File` class? <Badge type="warning" text="medium" />

::: details View Answer
`java.nio.file` (Java 7) largely supersedes `java.io.File`:

- **Better errors** — operations throw specific `IOException` subtypes (`NoSuchFileException`, `AccessDeniedException`) instead of returning a useless `boolean false`.
- **Rich `Files` utilities** — `copy`, `move`, `delete`, `readString`, `walk`, `createDirectories`, atomic moves, symlink handling.
- **`Path`** is an abstract, manipulable path (`resolve`, `relativize`, `normalize`) decoupled from the filesystem.
- **Pluggable filesystems** via `FileSystemProvider` (e.g., treat a ZIP as a filesystem).
- **Attributes & metadata** via `Files.readAttributes`, POSIX permissions, file watching (`WatchService`).

```java
Path p = Path.of("/var/log").resolve("app.log");
```
:::

## 5. Show the simplest correct ways to read and write text files in modern Java. <Badge type="tip" text="easy" />

::: details View Answer
NIO.2 provides one-liners that handle opening, buffering, charset, and closing:

```java
// Read whole file (Java 11+); UTF-8 by default
String text = Files.readString(path);

// Write whole file (Java 11+)
Files.writeString(path, text, StandardOpenOption.CREATE, StandardOpenOption.TRUNCATE_EXISTING);

// Read all lines
List<String> lines = Files.readAllLines(path);

// Stream lines lazily (must be closed)
try (Stream<String> s = Files.lines(path)) {
    s.filter(l -> !l.isBlank()).forEach(System.out::println);
}
```

`readString`/`readAllLines` load the whole file into memory — fine for small files, but use `Files.lines` or a `BufferedReader` for large ones to bound memory.
:::

## 6. How do you read and write binary files efficiently? <Badge type="warning" text="medium" />

::: details View Answer
For small files, `Files.readAllBytes(path)` / `Files.write(path, bytes)` are simplest. For large files, stream with a buffer or use `transferTo`:

```java
// Small binary file
byte[] data = Files.readAllBytes(path);

// Large file copy without loading into memory
try (var in = Files.newInputStream(src);
     var out = Files.newOutputStream(dst)) {
    in.transferTo(out);     // Java 9+, internally buffered
}

// Or let Files do it (can be atomic / preserve attributes)
Files.copy(src, dst, StandardCopyOption.REPLACE_EXISTING);
```

`readAllBytes` caps at `Integer.MAX_VALUE` and risks `OutOfMemoryError` on huge files; prefer streaming or channels for those.
:::

## 7. What is `InputStream.transferTo` and when is it useful? <Badge type="tip" text="easy" />

::: details View Answer
`transferTo(OutputStream)` (Java 9) copies all remaining bytes from an input stream to an output stream using an internal buffer, returning the count copied. It replaces the boilerplate read/write loop:

```java
long copied = in.transferTo(out);
```

It's ideal for piping (proxying a download, copying request to response, gzip pass-through). It does **not** close either stream — wrap them in try-with-resources. Note it runs on the calling thread and blocks until done; for very large transfers `FileChannel.transferTo`/`transferFrom` can leverage zero-copy OS primitives (e.g., `sendfile`) for even better performance.
:::

## 8. What is Java serialization, and what do `Serializable` and `transient` do? <Badge type="warning" text="medium" />

::: details View Answer
Serialization converts an object graph into a byte stream (`ObjectOutputStream.writeObject`) and back (`ObjectInputStream.readObject`).

- A class must implement the marker interface **`Serializable`** to be serializable; otherwise `NotSerializableException`.
- Fields marked **`transient`** are skipped — used for derived/cached data, or sensitive values (passwords) you don't want persisted.
- **`static`** fields aren't serialized (they belong to the class, not the instance).

```java
class Session implements Serializable {
    private String user;
    private transient String passwordHash; // not serialized
}
```

Deserialization **bypasses constructors**, reconstructing the object directly from the stream — a key reason it's dangerous.
:::

## 9. What is `serialVersionUID` and why does it matter? <Badge type="warning" text="medium" />

::: details View Answer
`serialVersionUID` is a version stamp for a `Serializable` class. During deserialization, the JVM compares the stream's UID with the class's; a mismatch throws `InvalidClassException`.

```java
private static final long serialVersionUID = 1L;
```

If you **don't** declare it, the compiler generates one from the class's structure (fields, methods, hierarchy). Any change — even adding a method — alters the generated UID and breaks deserialization of previously serialized data. So always declare it explicitly to control compatibility, and bump it intentionally when you make an incompatible change.
:::

## 10. Why is Java's built-in serialization considered risky, and what are the alternatives? <Badge type="danger" text="hard" />

::: details View Answer
Risks:
- **Security** — deserializing untrusted data can trigger *gadget chains* leading to remote code execution; this has caused numerous CVEs. Deserialization runs code (`readObject`) and instantiates arbitrary classes from the stream.
- **Fragility** — tight coupling to class internals; refactoring breaks the wire format.
- **Performance & opacity** — verbose, slow, hard to interoperate with non-Java systems.

Mitigations / alternatives:
- **Never deserialize untrusted input.** If unavoidable, use **serialization filters** (`ObjectInputFilter`, Java 9+) to allowlist classes.
- Prefer explicit, schema-based formats: **JSON** (Jackson/Gson), **Protocol Buffers**, **Avro**, **MessagePack** — language-neutral, versionable, and safe.
- For value types, design DTOs and map them explicitly rather than serializing domain objects.
:::

## 11. How can you customize the serialization process? <Badge type="danger" text="hard" />

::: details View Answer
Several hooks exist:
- **`writeObject`/`readObject`** (private methods) — customize field handling; call `defaultWriteObject`/`defaultReadObject` for the standard part, then add custom logic.
- **`Externalizable`** — full manual control via `writeExternal`/`readExternal`; uses the public no-arg constructor on read.
- **`writeReplace`/`readResolve`** — substitute a different object during serialization/deserialization (e.g., to enforce singletons or use a serialization proxy).
- **Serialization Proxy Pattern** (Effective Java) — serialize a small private static nested class instead of the real object; `readResolve` reconstructs via the public API. This is the safest pattern: it avoids constructor bypass and many security pitfalls.

Records serialize specially: always through their canonical constructor, making them inherently safer.
:::

## 12. What is a `ByteBuffer`, and explain its position/limit/capacity model. <Badge type="danger" text="hard" />

::: details View Answer
`ByteBuffer` is NIO's container for bytes used with channels. It has three cursors:
- **capacity** — total size, fixed at allocation.
- **position** — index of the next read/write.
- **limit** — first index that must not be read/written.

After writing, you call **`flip()`** (limit = position, position = 0) to switch to reading. `clear()` resets for writing again; `rewind()` re-reads; `compact()` keeps unread bytes.

```java
ByteBuffer buf = ByteBuffer.allocate(1024);
channel.read(buf);   // writes into buffer, advances position
buf.flip();          // prepare to read what was written
while (buf.hasRemaining()) process(buf.get());
buf.clear();         // ready to fill again
```

Forgetting `flip()` is the classic NIO bug — you end up reading the empty tail instead of the data you wrote.
:::

## 13. What is the difference between a direct and a heap `ByteBuffer`? <Badge type="danger" text="hard" />

::: details View Answer
- **Heap buffer** (`allocate`) — backed by a Java `byte[]` on the heap. Cheap to allocate, but I/O may require an extra copy to/from a temporary direct buffer because the GC can move heap memory.
- **Direct buffer** (`allocateDirect`) — backed by off-heap, native memory. Channels can do I/O directly into it (no intermediate copy), which is faster for frequent, large transfers, and supports memory mapping.

Trade-offs: direct buffers are more expensive to allocate/free, are not subject to normal GC (freed via a `Cleaner` when unreachable, which can be unpredictable), and over-allocation can exhaust native memory. Use direct buffers for long-lived, high-throughput I/O; heap buffers for small/short-lived ones.
:::

## 14. What are memory-mapped files and when should you use them? <Badge type="danger" text="hard" />

::: details View Answer
`FileChannel.map()` maps a region of a file directly into the process's virtual address space, returning a `MappedByteBuffer`. Reads/writes touch memory pages that the OS lazily pages in/out — no explicit read/write syscalls per access.

```java
try (FileChannel ch = FileChannel.open(path, READ, WRITE)) {
    MappedByteBuffer mbb = ch.map(MapMode.READ_WRITE, 0, ch.size());
    mbb.putInt(0, 42);   // writes straight to the mapped page
}
```

Use cases: very large files, random access, sharing memory between processes, high-performance databases/indexes. Caveats: mapping size limited to `Integer.MAX_VALUE` per `map` call, unmapping is non-deterministic (the mapping persists until GC/cleaner runs), and I/O errors surface as exceptions on access. Java 14+ `MemorySegment` / the Foreign Function & Memory API (stable in Java 22) is the modern successor for off-heap and mapped access.
:::

## 15. What is the difference between blocking and non-blocking I/O in Java? <Badge type="warning" text="medium" />

::: details View Answer
- **Blocking I/O** (`java.io`, `InputStream.read`, `Socket`) — the calling thread halts until data is available or the operation completes. Simple to reason about; one thread per connection, which limits scalability.
- **Non-blocking I/O** (`java.nio` channels in non-blocking mode + `Selector`) — a channel returns immediately even if no data is ready; a single thread can multiplex thousands of connections by polling readiness via a `Selector`.

```java
channel.configureBlocking(false);
selector.select();        // wait for any registered channel to be ready
```

Non-blocking scales to many idle connections (the C10k problem) but is harder to program. Frameworks like Netty build on it. Note: NIO's selector model is *readiness-based*, distinct from truly *asynchronous* (completion-based) I/O.
:::

## 16. What is `java.nio.channels.AsynchronousFileChannel`/`AsynchronousSocketChannel` (NIO.2 async I/O)? <Badge type="danger" text="hard" />

::: details View Answer
NIO.2 added *asynchronous* (completion-based) channels where you initiate an operation and get notified when it finishes, rather than polling readiness:

```java
AsynchronousFileChannel ch = AsynchronousFileChannel.open(path, READ);
ch.read(buffer, 0, attachment, new CompletionHandler<>() {
    public void completed(Integer n, Object att) { /* done */ }
    public void failed(Throwable t, Object att)  { /* error */ }
});
// or: Future<Integer> f = ch.read(buffer, 0);
```

You either pass a `CompletionHandler` callback or get a `Future`. The OS (via a thread pool) performs the work and invokes the callback on completion. This suits high-throughput servers wanting to avoid thread-per-connection without manual selector loops. In practice many teams now reach for **virtual threads** (Java 21) to write simple blocking-style code that scales like async.
:::

## 17. How do virtual threads (Java 21) change the blocking vs non-blocking trade-off? <Badge type="warning" text="medium" />

::: details View Answer
Virtual threads (Project Loom, stable in Java 21) are lightweight threads scheduled by the JVM onto a small pool of OS carrier threads. When a virtual thread performs a **blocking** I/O call, the JVM unmounts it from its carrier so the carrier can run other virtual threads — you get async-like scalability with simple, readable blocking code.

```java
try (var exec = Executors.newVirtualThreadPerTaskExecutor()) {
    exec.submit(() -> {
        String body = Files.readString(path); // blocks the virtual thread, not the OS thread
    });
}
```

This largely removes the need to write callback-based or selector-based non-blocking code for scalability. Caveat: native calls and `synchronized` blocks can *pin* a virtual thread to its carrier; prefer `ReentrantLock` in hot paths (pinning on `synchronized` is being addressed in later releases).
:::

## 18. How do you walk a directory tree and find files in NIO.2? <Badge type="warning" text="medium" />

::: details View Answer
Use the `Files` stream-based walkers (remember to close the stream):

```java
// Recursive walk, lazy
try (Stream<Path> s = Files.walk(start)) {
    s.filter(Files::isRegularFile)
     .filter(p -> p.toString().endsWith(".log"))
     .forEach(System.out::println);
}

// Filtered search with depth + predicate
try (Stream<Path> s = Files.find(start, 5,
        (p, attr) -> attr.isRegularFile() && attr.size() > 1_000_000)) {
    s.forEach(System.out::println);
}

// One directory level only
try (Stream<Path> s = Files.list(dir)) { ... }
```

For full control (e.g., handling errors per file, pre/post-visit hooks), implement `FileVisitor` and use `Files.walkFileTree`. The streams must be closed because they hold open directory handles.
:::

## 19. What is the `WatchService` and what is it used for? <Badge type="warning" text="medium" />

::: details View Answer
`WatchService` lets you monitor a directory for filesystem changes (create/modify/delete) using OS-native notifications instead of polling:

```java
WatchService ws = FileSystems.getDefault().newWatchService();
dir.register(ws, ENTRY_CREATE, ENTRY_MODIFY, ENTRY_DELETE);
WatchKey key = ws.take();              // blocks until events
for (WatchEvent<?> ev : key.pollEvents()) { ... }
key.reset();
```

Uses: hot-reloading config, build watchers, processing inboxes. Caveats: it watches a single directory (not recursive — you register subdirectories yourself), event coalescing can drop/merge rapid changes, and behavior/latency varies by OS (efficient on Linux/Windows via inotify/ReadDirectoryChangesW, polling-based on some platforms like macOS).
:::

## 20. How do you ensure file writes are durable and atomic? <Badge type="danger" text="hard" />

::: details View Answer
Two separate concerns:

- **Durability** — bytes must reach disk, not just the OS page cache. Use `FileChannel.force(true)` or open with `StandardOpenOption.SYNC`/`DSYNC`, or `FileDescriptor.sync()`. Closing a stream does **not** guarantee an fsync.
- **Atomicity** — readers should never see a half-written file. Write to a temp file, fsync it, then atomically rename:

```java
Path tmp = Files.createTempFile(dir, "data", ".tmp");
Files.write(tmp, bytes);
try (var ch = FileChannel.open(tmp, WRITE)) { ch.force(true); }
Files.move(tmp, target, StandardCopyOption.ATOMIC_MOVE,
                        StandardCopyOption.REPLACE_EXISTING);
```

`ATOMIC_MOVE` (a rename on the same filesystem) is the standard atomic-publish technique used by databases and config writers. It throws if source and target are on different filesystems.
:::

## 21. What is the difference between `flush()` and `close()`, and why does flushing matter? <Badge type="tip" text="easy" />

::: details View Answer
- **`flush()`** forces buffered output to be written to the underlying destination (next layer / OS), but keeps the stream open.
- **`close()`** flushes *and* releases the resource (file descriptor, socket). After close the stream is unusable.

Why it matters: with buffered writers, data sits in memory until flushed. If the program forgets to flush/close (or crashes), recent writes are lost. For long-lived streams (logging, network protocols) you often need to `flush()` explicitly so the other side sees data promptly. Try-with-resources guarantees the final `close()` (and thus a flush), which is why it's the safe default.
:::

## 22. How do you read standard input and handle console I/O robustly? <Badge type="warning" text="medium" />

::: details View Answer
- `System.in` is a raw byte `InputStream`; wrap it for text:
  ```java
  var br = new BufferedReader(new InputStreamReader(System.in, StandardCharsets.UTF_8));
  String line = br.readLine();
  ```
- `Scanner` is convenient for tokenized parsing but slower and has tricky `nextLine()`/`nextInt()` interactions; for high-volume input prefer `BufferedReader`.
- `System.console()` returns a `Console` for interactive terminals and crucially offers `readPassword()` (no echo). It returns `null` when I/O is redirected (pipes, IDEs), so guard for that.
- Don't close `System.in`/`System.out` in try-with-resources unless you really intend to — closing them affects the whole JVM.
:::

## 23. What's the difference between `Files.newBufferedReader`, `Files.lines`, and `Files.readAllLines`? <Badge type="warning" text="medium" />

::: details View Answer
- **`readAllLines`** — eagerly loads every line into a `List<String>` in memory. Simple, but unsuitable for large files.
- **`lines`** — returns a lazy `Stream<String>` that reads on demand; memory-efficient for huge files, but the stream holds an open file handle and **must be closed** (use try-with-resources). I/O errors surface as `UncheckedIOException` during iteration.
- **`newBufferedReader`** — gives you a `BufferedReader` for manual line-by-line control (`readLine()`), interleaving logic, or partial reads.

```java
try (Stream<String> lines = Files.lines(path)) {
    long count = lines.filter(l -> l.contains("ERROR")).count();
}
```

All default to UTF-8 (Java 11+) and accept an explicit `Charset`.
:::
