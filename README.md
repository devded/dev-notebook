# Dev Notebook

A personal developer notebook built with [VitePress](https://vitepress.dev) for maintaining
interview cheatsheets and framework tutorials, organized by language.

## Run locally

```bash
npm install
npm run dev      # local dev server with hot reload → http://localhost:5173
npm run build    # build static site to docs/.vitepress/dist
npm run preview  # preview the built site
```

## Structure

Each **technology** is a self-contained top-level section under `docs/` with a uniform
layout. The nav groups them into **Languages** and **Frameworks**.

```
docs/
├── .vitepress/config.mjs   # site config: nav + sidebar
├── index.md                # home page
│
├── python/                 # LANGUAGE
│   ├── index.md            #   overview
│   ├── cheatsheet.md       #   quick syntax reference
│   └── questions/          #   interview questions, one .md per topic
│       ├── index.md        #   "all topics" landing
│       └── <topic>.md
├── java/                   # LANGUAGE  (same layout)
│
├── django/                 # FRAMEWORK
│   ├── index.md            #   overview
│   ├── tutorial.md         #   tutorial notes
│   └── questions/          #   interview questions (NN-<topic>.md, ordered)
│       ├── index.md
│       └── NN-<topic>.md
├── fastapi/                # FRAMEWORK  (index + questions/)
├── flask/                  # FRAMEWORK  (index + tutorial)
└── spring-boot/            # FRAMEWORK  (index + tutorial)
```

**Convention per section:** `index.md` (overview) + optional `cheatsheet.md` (languages)
or `tutorial.md` (frameworks) + a `questions/` folder of topic pages. Each question is an
always-visible `## Question` heading with the answer below.

## Add a new note

1. Create a `.md` in the relevant section's `questions/` folder (or its root for a tutorial).
2. Register it under the matching `sidebar` key in `docs/.vitepress/config.mjs`.
3. Save — the dev server hot-reloads.

### Add a new technology

Copy an existing section folder (e.g. `python/` for a language, `django/` for a framework),
then add a `nav` entry (under Languages or Frameworks) and a new `sidebar` key
(e.g. `'/go/'`) in `config.mjs`.

> The Django/FastAPI question pages were generated from the bulk source markdown files in
> the project root (`django_300_*.md`, `fastapi_300_*.md`) by parsing `## section` /
> `### question` / `**Answer:**` blocks into one page per section.
