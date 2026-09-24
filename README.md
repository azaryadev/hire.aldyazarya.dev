# aldyazarya — hire page

Astro port of the portfolio landing page. Static output, no framework runtime
shipped to the browser except one small vanilla script.

## Run it

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static output in dist/
npm run preview  # serve the built output
npm run check    # astro + typescript diagnostics
```

## Layout

```
src/
  data/           content lives here, not in the markup
    site.ts       name, contact details, nav, ribbon words, hero stats
    services.ts   the three service cards
    projects.ts   the bento grid entries
  components/     one per page section
  layouts/
    Base.astro    <head>, font loading, the client script
  pages/
    index.astro   composes the sections
  styles/         design tokens + one file per section, chained by global.css
public/assets/    portrait cut-outs and project screenshots
```

## Editing content

Most changes are data, not markup.

- New project: add an entry to `src/data/projects.ts` and drop a `.webp` into
  `public/assets/work/` named after its `slug`.
- Contact details, nav labels, hero stats: `src/data/site.ts`.
- Service cards: `src/data/services.ts` (the `icon` field picks one of the three
  inline SVGs defined at the top of `Services.astro`).

### Bento grid maths

The projects grid is 4 columns x 6 rows with the row height locked by an
`aspect-ratio` on the container. It only stays gap-free with **4 wide tiles
(4 cells each) + 8 standard tiles = 24 cells**. If you change that mix, update
`grid-template-rows` and `aspect-ratio` in `src/styles/07-projects.css` to match,
or you will get empty cells at the end.

## Still to wire up

- The contact form is front-end only. Point it at a form endpoint (Formspree,
  Resend, a serverless function) and replace the handler in `Base.astro`.
- Project tiles become links when an entry has an `href` — none are set yet.
- `site` in `astro.config.mjs` is set to `https://hire.aldyazarya.dev`; change it
  if the page ends up somewhere else, since the canonical URL is built from it.
