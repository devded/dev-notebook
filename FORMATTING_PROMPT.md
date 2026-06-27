# Reusable Prompt — Format Interview Questions

Copy everything in the block below, fill in `LANGUAGE`, `TOPIC`, and paste your raw
questions where indicated, then send it to the LLM.

---

```
You are formatting interview questions for my VitePress developer notebook.

LANGUAGE: <python | java | ...>
TOPIC FILE: <e.g. oop  →  docs/<language>/questions/<topic>.md>

Convert the raw questions/answers below into always-visible markdown using
EXACTLY this format, one block per question (NO collapsible/details blocks):

## <the question>? <Badge type="<TYPE>" text="<LABEL>" />

<a concise answer, 1-4 sentences, in your own words>

```<lang>
// optional code block, only when it helps
```

RULES:
- Each question is a level-2 heading (`##`) so it is always visible — do NOT use
  `::: details` or any collapsible container.
- Badge mapping: easy → type="tip" text="easy", medium → type="warning" text="medium",
  hard → type="danger" text="hard". Judge difficulty yourself if not given.
- PARAPHRASE every answer in your own words — do NOT copy source text verbatim.
- Keep answers tight and interview-ready (no fluff). Use inline `code` for identifiers.
- Add a fenced code block with the correct language tag whenever code clarifies the answer.
- Skip exact duplicates and merge near-duplicates.
- Output ONLY the markdown, ready to paste — no preamble, no explanation.

RAW QUESTIONS:
<paste here>
```

---

## After you get the output

1. Open the matching topic file, e.g. `docs/python/questions/oop.md`.
2. Paste the blocks under the existing ones.
3. Save — `npm run dev` hot-reloads.

## Topic file reference

| Python | Java |
| --- | --- |
| `questions/basics.md` | `questions/core-language.md` |
| `questions/data-iteration.md` | `questions/memory-jvm.md` |
| `questions/functions-scope.md` | `questions/collections.md` |
| `questions/oop.md` | `questions/oop-design.md` |
| `questions/concurrency.md` | `questions/concurrency.md` |
