# Contributing

Thanks for your interest! This is a bilingual (Vietnamese + English) static
site about Vietnamese holidays. Contributions of all sizes are welcome.

## Ways to contribute

- **Content** — improve holiday text, fix facts, add a holiday, or improve
  the English translations (`src/data/holidays-en.ts`, `src/data/stories-en.ts`).
- **Code** — bug fixes, accessibility, performance, or new tools.
- **Design** — images, themes, or print/accessibility polish.

## Development setup

```bash
npm install
npm run dev          # http://localhost:3000
```

Key commands:

```bash
npm run typecheck    # tsc --noEmit
npm run lint         # eslint
npm test             # vitest unit tests
npm run build        # static export to out/ (runs generators first)
npm run test:e2e     # Playwright (needs a build + local server)
npm run check:links  # validate outbound links in story data
npm run gen:data     # regenerate lunar table, .ics, search indexes
```

## Bilingual architecture — the one rule that matters

- Vietnamese lives at the root (`/`, `/<slug>/`), English under `/en/`.
- `src/i18n/types.ts` defines the `Messages` shape — **every UI string must
  exist in both `vi.ts` and `en.ts`** or TypeScript will fail.
- Holiday *content* lives in `src/data/holidays.ts` (VI) and
  `src/data/holidays-en.ts` (EN); stories in `stories.ts` / `stories-en.ts`.
  Slugs must match one-to-one — a parity test enforces this.
- Server components may read `src/i18n/data.ts` (`holidaysOf(locale)`);
  client components receive `locale` as a prop and call
  `getStrings(locale)` — they must **not** import the holiday datasets.
- New routes go in both groups: `src/app/(vi)/` and `src/app/en/`, with the
  shared page body in `src/components/pages/`.

## Adding a holiday

1. Add the entry to `src/data/holidays.ts` (VI) and `src/data/holidays-en.ts`
   (EN) — same `slug`, same position.
2. Add a story entry to `src/data/stories.ts` and `src/data/stories-en.ts`
   (≥3 HTTPS sources, English outlets for EN).
3. Add images via `scripts/fetch-images.mjs` + `scripts/gen-thumbs.mjs`,
   then ≥5 entries in `src/data/image-credits.ts`.
4. Run `npm run gen:data` then `npm test` — data-integrity tests will flag
   anything missing.

## Pull requests

- Keep changes focused; describe *what* and *why*.
- Run the checklist in the PR template before requesting review.
- No `Co-Authored-By`/attribution lines in commit messages.
