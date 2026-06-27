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

```
docs/
├── .vitepress/config.mjs   # site config: nav + sidebar (edit here when adding pages)
├── index.md                # home page
├── python/
│   ├── index.md
│   ├── cheatsheet.md
│   ├── django.md
│   └── flask.md
└── java/
    ├── index.md
    ├── cheatsheet.md
    └── spring-boot.md
```

## Add a new note

1. Create a `.md` file in the relevant language folder (or a new folder for a new language).
2. Register it in the `sidebar` (and `nav` for a new language) in `docs/.vitepress/config.mjs`.
3. Save — the dev server hot-reloads.

### Add a new language

Copy the `python/` folder pattern, then add a `nav` entry and a new `sidebar` key
(e.g. `'/javascript/'`) in `config.mjs`.
