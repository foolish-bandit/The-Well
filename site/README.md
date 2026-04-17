# Site

The Well's public site. Astro 4, pre-rendered at build time from YAML under `../data/judges/`, served from Cloudflare Pages.

## Principles

- **No client-side JS on judge pages.** Every judge record is pure static HTML.
- **No analytics, no third-party scripts.** The read path records nothing.
- **Print-friendly.** Every judge page prints cleanly — litigators will want that.
- **Dark mode follows `prefers-color-scheme`.** No toggle, no JS, no flash.

## Stack

- Astro 4 (static output)
- Tailwind CSS
- Source Serif 4 (body) + Inter (UI), self-hosted via Fontsource
- Pagefind for search (index built post-`astro build`)
- `@astrojs/sitemap` for `sitemap-index.xml`

## Scripts

```bash
pnpm --filter @thewell/site dev       # dev server
pnpm --filter @thewell/site build     # build + pagefind index
pnpm --filter @thewell/site preview   # preview the built site
```

The build will fail if any file under `../data/judges/` does not validate against the schema in `src/lib/schema.ts`.

## Deploy

Cloudflare Pages via `.github/workflows/deploy.yml`. Output directory is `site/dist`.
