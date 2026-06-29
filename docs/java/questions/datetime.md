# Date & Time API

## 1. Why are the legacy `java.util.Date` and `Calendar` classes considered problematic? <Badge type="warning" text="medium" />

::: details View Answer
The legacy date/time classes have a long list of design flaws that motivated `java.time` (JSR-310):

- **Mutability:** `Date` and `Calendar` are mutable, so they are not thread-safe and can be changed unexpectedly when shared.
- **Poor API design:** `Date` has misleading methods. The year is offset from 1900 and months are **0-based** (January = 0), a frequent source of bugs.
- **Mixed concerns:** `java.util.Date` actually represents an instant in time (a millisecond offset from the epoch), not a calendar date, despite its name.
- **`SimpleDateFormat` is not thread-safe:** A very common production bug is sharing a single static `SimpleDateFormat` across threads, causing corrupted output or exceptions.
- **No first-class concepts:** There is no clean separation between a date, a time, a date-time, a duration, or a time zone.
:::

## 2. What are the core classes in the `java.time` package and what does each represent? <Badge type="tip" text="easy" />

::: details View Answer
The `java.time` package separates concepts cleanly:

- **`LocalDate`** — a date without time or zone (e.g. `2026-06-29`).
- **`LocalTime`** — a time without date or zone (e.g. `14:30:00`).
- **`LocalDateTime`** — a date and time without a zone.
- **`Instant`** — a point on the timeline in UTC, measured from the epoch (`1970-01-01T00:00:00Z`). Best for machine timestamps.
- **`ZonedDateTime`** — a date-time with a full time zone (`ZoneId`), including DST rules.
- **`OffsetDateTime`** — a date-time with a fixed offset from UTC (e.g. `+02:00`) but **no** DST rules.
- **`Duration`** — a time-based amount (seconds/nanos).
- **`Period`** — a date-based amount (years/months/days).

All of these are **immutable and thread-safe**.
:::

## 3. What is the difference between `Duration` and `Period`? <Badge type="warning" text="medium" />

::: details View Answer
Both represent an amount of time, but on different scales:

- **`Duration`** is **time-based** — measured in seconds and nanoseconds. Use it with `Instant`, `LocalTime`, and other machine-time concepts. `Duration.ofHours(2)` is always exactly 2 hours of elapsed time.
- **`Period`** is **date-based** — measured in years, months, and days. Use it with `LocalDate`. `Period.ofMonths(1)` is a conceptual month, not a fixed number of seconds.

The key subtlety is **DST**. Adding `Duration.ofDays(1)` (exactly 24h) across a DST boundary lands at a different wall-clock time than adding `Period.ofDays(1)` (one calendar day):

```java
ZonedDateTime z = ZonedDateTime.of(
    LocalDateTime.of(2026, 3, 28, 12, 0), ZoneId.of("Europe/Berlin"));
z.plus(Duration.ofDays(1)); // 24h later -> 13:00 (clocks sprang forward)
z.plus(Period.ofDays(1));   // next calendar day -> 12:00
```
:::

## 4. What is an `Instant` and when should you use it over `LocalDateTime`? <Badge type="warning" text="medium" />

::: details View Answer
An `Instant` is a single point on the UTC timeline, stored as seconds + nanoseconds since the epoch. It carries no human calendar fields and no zone.

Use `Instant` for:
- **Machine timestamps** — logging, event ordering, "created at" / "updated at" columns.
- **Measuring elapsed time** together with `Duration`.
- **Persisting moments** unambiguously (store UTC, render in the user's zone on display).

Use `LocalDateTime` only when the zone is genuinely irrelevant or supplied elsewhere (e.g. "the store opens at 09:00 local time everywhere"). `LocalDateTime` does **not** represent a real instant — `2026-06-29T09:00` is a different moment in Tokyo than in New York.
:::

## 5. How do `ZonedDateTime` and `OffsetDateTime` differ? <Badge type="danger" text="hard" />

::: details View Answer
Both attach UTC information to a date-time, but they model different things:

- **`OffsetDateTime`** holds a **fixed offset** like `+02:00`. It has no knowledge of DST or political rule changes. It is ideal for wire formats and database storage (it maps to SQL `TIMESTAMP WITH TIME ZONE`).
- **`ZonedDateTime`** holds a full **`ZoneId`** like `Europe/Berlin`, which knows the historical and future DST transition rules. Arithmetic across DST boundaries is handled correctly.

Rule of thumb:
- For **storage / transport**, prefer `Instant` or `OffsetDateTime` — they are unambiguous and stable.
- For **calendar arithmetic in a user's local zone**, use `ZonedDateTime` so DST is applied.

```java
ZonedDateTime zdt = ZonedDateTime.now(ZoneId.of("America/New_York"));
OffsetDateTime odt = zdt.toOffsetDateTime(); // loses the zone rules, keeps the offset
```
:::

## 6. Why is immutability important in `java.time`, and how do you "modify" a date? <Badge type="tip" text="easy" />

::: details View Answer
Every `java.time` type is immutable. This makes them inherently thread-safe and free of the aliasing bugs that plagued `Calendar`.

Because they cannot be mutated, "modifier" methods (`plusDays`, `withYear`, `minusHours`) return a **new instance**. A classic beginner mistake is ignoring the return value:

```java
LocalDate d = LocalDate.of(2026, 1, 1);
d.plusDays(10);          // BUG: result discarded, d unchanged
d = d.plusDays(10);      // correct
```

The fluent `with*`, `plus*`, and `minus*` families all follow this copy-on-write pattern.
:::

## 7. How do you parse and format dates with `DateTimeFormatter`? <Badge type="warning" text="medium" />

::: details View Answer
`DateTimeFormatter` is the modern, **immutable and thread-safe** replacement for `SimpleDateFormat`.

```java
DateTimeFormatter fmt = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
LocalDateTime dt = LocalDateTime.parse("2026-06-29 14:30", fmt);
String text = dt.format(fmt);
```

Key points:
- Parsing is done via the **target type's** static `parse(text, formatter)` method.
- Use the predefined constants (`DateTimeFormatter.ISO_LOCAL_DATE`, `ISO_INSTANT`, etc.) when possible.
- For locale-sensitive output use `ofLocalizedDateTime(FormatStyle.MEDIUM).withLocale(...)`.
- A single static formatter can be safely shared across threads — unlike `SimpleDateFormat`.
:::

## 8. What is the difference between `yyyy`, `YYYY`, and lowercase pattern letters in formatters? <Badge type="danger" text="hard" />

::: details View Answer
Pattern letters are case-sensitive and easy to confuse:

- **`yyyy`** — year-of-era (the normal calendar year). This is almost always what you want.
- **`YYYY`** — **week-based year**. Around the new year it can differ from the calendar year, producing off-by-one bugs (e.g. Dec 31 2026 might format as `2027` in week-based year).
- **`MM`** — month; **`mm`** — minutes; **`dd`** — day-of-month; **`DD`** — day-of-year.
- **`hh`** — clock hour 1-12 (needs an AM/PM marker `a`); **`HH`** — hour 0-23.

A common production bug is using `YYYY-MM-dd` or `yyyy-mm-dd` and getting wrong values for a handful of days each year. Always use `yyyy-MM-dd HH:mm:ss`.
:::

## 9. What are `TemporalAdjusters` and when are they useful? <Badge type="warning" text="medium" />

::: details View Answer
`TemporalAdjusters` provide reusable strategies for common date calculations, applied via `with()`:

```java
LocalDate d = LocalDate.of(2026, 6, 29);
d.with(TemporalAdjusters.lastDayOfMonth());          // 2026-06-30
d.with(TemporalAdjusters.firstDayOfNextMonth());     // 2026-07-01
d.with(TemporalAdjusters.next(DayOfWeek.MONDAY));    // next Monday
d.with(TemporalAdjusters.dayOfWeekInMonth(3, DayOfWeek.FRIDAY)); // 3rd Friday
```

They answer "business calendar" questions like *the last working day of the quarter* without manual loops. You can also implement a custom `TemporalAdjuster` (a functional interface) for domain-specific rules, e.g. "next business day skipping holidays".
:::

## 10. How do you convert between legacy `Date`/`Calendar` and the modern API? <Badge type="warning" text="medium" />

::: details View Answer
The bridge in both directions runs through `Instant`:

```java
// Legacy -> modern
Date legacy = new Date();
Instant instant = legacy.toInstant();
ZonedDateTime zdt = instant.atZone(ZoneId.systemDefault());
LocalDate ld = zdt.toLocalDate();

// Modern -> legacy
Instant back = zdt.toInstant();
Date legacyAgain = Date.from(back);
```

Notes:
- `java.util.Date` maps to `Instant` (both are instants in UTC).
- `java.sql.Date`/`Time`/`Timestamp` have `toLocalDate()` / `toLocalDateTime()` helpers.
- `GregorianCalendar` has `toZonedDateTime()` and `GregorianCalendar.from(ZonedDateTime)`.
- A `LocalDateTime` has no instant, so you must supply a zone to convert it to a `Date`.
:::

## 11. What is the epoch, and how do you work with epoch seconds/milliseconds? <Badge type="tip" text="easy" />

::: details View Answer
The **epoch** is `1970-01-01T00:00:00Z` (UTC). Most timestamps are stored as an offset from it.

```java
Instant now = Instant.now();
long secs   = now.getEpochSecond();      // seconds since epoch
long millis = now.toEpochMilli();        // milliseconds since epoch

Instant fromMillis = Instant.ofEpochMilli(millis);
Instant fromSecs   = Instant.ofEpochSecond(secs);
```

Be deliberate about units: `System.currentTimeMillis()` is milliseconds, while `Instant.getEpochSecond()` is seconds — mixing them is off by a factor of 1000.
:::

## 12. What pitfalls arise around Daylight Saving Time (DST)? <Badge type="danger" text="hard" />

::: details View Answer
DST creates two kinds of "broken" local times each year:

- **Spring forward (gap):** A local time may not exist (e.g. clocks jump from 02:00 to 03:00). `ZonedDateTime` shifts the value forward into valid time rather than throwing.
- **Fall back (overlap):** A local time occurs twice. By default `ZonedDateTime` picks the **earlier** offset; use `withEarlierOffsetAtOverlap()` / `withLaterOffsetAtOverlap()` to choose.

Guidelines:
- Never compute elapsed time by subtracting wall-clock `LocalDateTime`s — convert to `Instant` first.
- Use `Period` for "same wall-clock time tomorrow" and `Duration` for "exactly N hours later".
- Store moments in UTC (`Instant`); apply the zone only for display.
- Time zone rules change politically; keep the JDK / `tzdata` updated.
:::

## 13. Why is `ZoneId` preferable to a raw offset like `ZoneOffset`? <Badge type="warning" text="medium" />

::: details View Answer
- **`ZoneOffset`** is a fixed amount from UTC (e.g. `+05:30`). It is constant and ignores DST.
- **`ZoneId`** is a region identifier (e.g. `Asia/Kolkata`, `Europe/London`) backed by the IANA tz database, including all historical and future DST transitions.

Prefer `ZoneId` whenever you do calendar arithmetic for a real location, because the offset there can change throughout the year. `ZoneOffset` is a subtype of `ZoneId` and is appropriate only when you truly mean a constant offset (e.g. interpreting a wire value). Avoid the three-letter abbreviations like `"EST"` — they are ambiguous and partly deprecated; use full region IDs.
:::

## 14. How do you compute the difference between two dates or times? <Badge type="warning" text="medium" />

::: details View Answer
There are two idioms depending on the unit you want:

```java
LocalDate start = LocalDate.of(2026, 1, 15);
LocalDate end   = LocalDate.of(2026, 6, 29);

// Calendar breakdown (years/months/days)
Period p = Period.between(start, end);     // P5M14D

// A single unit
long days = ChronoUnit.DAYS.between(start, end);    // 165
long months = ChronoUnit.MONTHS.between(start, end);

// Time-based
Duration d = Duration.between(Instant.now(), later);
long secs = ChronoUnit.SECONDS.between(t1, t2);
```

Use `Period`/`Duration` for a composite amount and `ChronoUnit.between` when you need the count in one specific unit.
:::

## 15. What is `Clock` and why is it valuable for testing? <Badge type="warning" text="medium" />

::: details View Answer
`Clock` abstracts the "current instant + zone" source. The `now()` factory methods all accept an optional `Clock`, which lets you inject time instead of reading the wall clock directly.

```java
Clock fixed = Clock.fixed(Instant.parse("2026-06-29T10:00:00Z"), ZoneOffset.UTC);
LocalDate today = LocalDate.now(fixed);   // deterministic: 2026-06-29
Instant now = Instant.now(fixed);
```

Benefits:
- **Deterministic tests** — `Clock.fixed` and `Clock.offset` make time-dependent logic reproducible.
- **Decoupling** — inject a `Clock` bean so production uses `Clock.systemUTC()` and tests use a fixed clock.

This is far cleaner than mocking static `now()` calls.
:::

## 16. How is `LocalDate.now()` affected by the default time zone, and why can it be dangerous? <Badge type="danger" text="hard" />

::: details View Answer
`LocalDate.now()` (and all zoneless `now()` calls) use `ZoneId.systemDefault()` internally. This means:

- The "current date" depends on the JVM's default zone, which may differ between a developer's laptop, a CI runner, and a production server.
- Around midnight, two servers in different zones can disagree on "today", causing subtle reporting or partitioning bugs.

Defensive practice:
```java
LocalDate today = LocalDate.now(ZoneId.of("UTC")); // explicit, reproducible
```

Always pass an explicit `ZoneId` (or inject a `Clock`) in server code rather than relying on the ambient default.
:::

## 17. What is `ChronoUnit` and how does it relate to `TemporalUnit`? <Badge type="tip" text="easy" />

::: details View Answer
`ChronoUnit` is an enum implementing the `TemporalUnit` interface. It enumerates units of measurement — `SECONDS`, `MINUTES`, `HOURS`, `DAYS`, `WEEKS`, `MONTHS`, `YEARS`, etc. — and is used in two main ways:

```java
Instant later = Instant.now().plus(3, ChronoUnit.HOURS);
long days = ChronoUnit.DAYS.between(d1, d2);
```

The sibling enum `ChronoField` (implementing `TemporalField`) represents addressable fields like `DAY_OF_WEEK` or `MONTH_OF_YEAR`, used with `get()` / `with()`. Units measure *amounts*; fields address *positions*.
:::

## 18. How do you represent and work with "wall-clock-only" recurring times, like a daily 9 AM job? <Badge type="warning" text="medium" />

::: details View Answer
Use `LocalTime` (and possibly `MonthDay`/`DayOfWeek`) for the rule, then resolve to an `Instant` per occurrence in the relevant zone:

```java
LocalTime nineAm = LocalTime.of(9, 0);
ZoneId zone = ZoneId.of("Europe/Paris");

ZonedDateTime nextRun = LocalDate.now(zone)
        .atTime(nineAm)
        .atZone(zone);
Instant trigger = nextRun.toInstant();
```

Storing the *rule* as `LocalTime` + `ZoneId` (rather than a fixed `Instant`) is important: it keeps "9 AM Paris time" correct even after a DST transition shifts the underlying UTC offset.
:::

## 19. What is `Year`, `YearMonth`, and `MonthDay`, and when are they useful? <Badge type="tip" text="easy" />

::: details View Answer
These are partial temporal types for cases where a full date is overkill:

- **`Year`** — just a year (`Year.of(2026)`), with `isLeap()`.
- **`YearMonth`** — year + month (`2026-06`), great for credit card expiry, billing periods, `lengthOfMonth()`.
- **`MonthDay`** — month + day (`--06-29`), great for recurring annual events like birthdays and holidays.

```java
YearMonth ym = YearMonth.of(2026, 2);
ym.lengthOfMonth();          // 28
MonthDay bday = MonthDay.of(6, 29);
bday.atYear(2026);           // LocalDate 2026-06-29
```
:::

## 20. How should timestamps be stored in a database, and how does that map to Java types? <Badge type="danger" text="hard" />

::: details View Answer
The widely recommended approach is to **store moments in UTC**:

- Persist as `TIMESTAMP WITH TIME ZONE` (or a UTC `TIMESTAMP`) and map to **`Instant`** or `OffsetDateTime` in Java. JDBC 4.2+ supports `getObject(col, Instant.class)` / `OffsetDateTime.class`.
- Avoid mapping to `LocalDateTime` for true instants — it discards the zone and is ambiguous.
- Keep display-zone conversion at the presentation layer; convert `Instant` to the user's `ZonedDateTime` only when rendering.
- For genuine local concepts (a date of birth, a store's opening date) `LocalDate`/`LocalDateTime` *are* correct, since no instant is implied.

This separation — UTC instants for moments, local types for calendar facts — prevents the majority of time-zone bugs.
:::

## 21. Are `java.time` types comparable and sortable, and how do equality semantics work? <Badge type="warning" text="medium" />

::: details View Answer
All the main types implement `Comparable`, and also expose `isBefore`, `isAfter`, `isEqual`:

```java
list.sort(Comparator.naturalOrder()); // works for LocalDate, Instant, etc.
zdt1.isBefore(zdt2);
```

A subtle point with `ZonedDateTime`:
- **`equals()`** compares the full state, including the `ZoneId`. So `2026-06-29T12:00+02:00[Europe/Paris]` is **not** `equal` to the same instant expressed as `[Europe/Berlin]` only if their fields differ — but two representations of the **same instant in different zones are not `.equals()`**.
- **`isEqual()`** compares only the underlying instant on the timeline.

Use `isEqual()` / `compareTo()` when you care about "same moment", and `equals()` when you care about "same representation".
:::

## 22. How do you handle leap years and the special date Feb 29 safely? <Badge type="warning" text="medium" />

::: details View Answer
`java.time` validates dates strictly and handles month-length arithmetic correctly:

```java
Year.of(2024).isLeap();                 // true
LocalDate.of(2024, 2, 29);              // valid
LocalDate.of(2026, 2, 29);              // throws DateTimeException

LocalDate leap = LocalDate.of(2024, 2, 29);
leap.plusYears(1);                       // 2025-02-28 (clamped, no exception)
```

Adding a year to Feb 29 lands on Feb 28 of a non-leap year rather than overflowing into March — the API resolves invalid results to the last valid day of the month. For "exactly N days later" use `plusDays`; for "same calendar day next year" use `plusYears` and accept the clamping behavior.
:::
