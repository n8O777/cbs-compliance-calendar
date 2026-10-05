# CBS O&P Compliance Calendar

Interactive O&P compliance calendar for CBS Medical Billing & Consulting.
Built with Next.js (App Router), TypeScript, and Tailwind CSS, deployed on Vercel.

## Routes

| Path    | Purpose                          |
| ------- | -------------------------------- |
| `/`     | Current compliance calendar      |
| `/2027` | Permanent 2027 calendar          |

Production domain: `compliance.cbsmedicalbilling.com`

## Architecture

- Static frontend only — no database, auth, CMS, API, or backend services.
- User-entered information is stored only in the visitor's browser
  (`localStorage`, one key per calendar year, e.g. `cbs-op-cal-2027-v2`).
- `/` renders the current year's calendar; `/YYYY` is that year's permanent URL.
  Both share the same storage key, so entries appear on either URL.
- The 2027 content is migrated verbatim from the client's reference file,
  `reference/erin-2027-complinace-calendar.html`. See
  `docs/2027-migration-analysis.md`.

## Structure

```
src/
  app/                    Routes, root layout, global CSS (ported from the reference)
    page.tsx              / (current calendar)
    2027/page.tsx         /2027 (permanent 2027 calendar)
  calendars/2027/         Everything specific to the 2027 calendar
    Calendar2027.tsx      Assembles the page in the original section order
    config.ts             Year, storage key, page metadata
    data/                 Compliance data (months, deadlines, checklists, labels)
    content/              Fixed prose (header, rules, CTAs, sources)
  components/             Interactive, year-agnostic client components
  lib/                    Storage, reminder date math, shared types
```

Stored field IDs (`n0`, `r6d`, `g3_2`, etc.) are declared explicitly in the data
files. Never renumber them; add new IDs for new items.

## Development

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
npm run lint
```
