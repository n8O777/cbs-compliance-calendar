# CBS O&P Compliance Calendar

Interactive O&P compliance calendar for CBS Medical Billing & Consulting.
Built with Next.js (App Router) and TypeScript, deployed on Vercel.

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
- The design follows the redesign handoff in
  `design/design_handoff_compliance_calendar_2027/` (spec in its `README.md`).
  The regulatory content was carried over verbatim from the client's reference
  file, `reference/erin-2027-complinace-calendar.html` (see
  `docs/2027-migration-analysis.md`).

## Structure

```
src/
  app/                    Routes, root layout (fonts), globals.css (imports styles/)
    page.tsx              / (current calendar)
    2027/page.tsx         /2027 (permanent 2027 calendar)
  styles/                 base.css (design tokens, shared pieces) + one file per section
  calendars/2027/         Everything specific to the 2027 calendar
    Calendar2027.tsx      Assembles the page in section order
    config.ts             Year, storage key, page metadata
    data/                 Compliance data (months, deadlines, checklists, labels)
    content/              Sections with fixed copy (hero, rules, CTAs, sources, footer)
  components/             Interactive, year-agnostic client components
  lib/                    Storage, reminder date math, shared types, site info
public/                   CBS white logo (SVG)
design/                   Redesign handoff (reference only; not built)
```

## Saved entries

All entries live in one flat JSON object of `{ fieldId: string | boolean }`.
Field IDs are declared in the data files (`c1`, `n0`, `r6d`, `g3_2`, …). Never
rename or renumber them; add new IDs for new items. Visitors' saved entries are
read back by these exact IDs.

| Fields | What |
| --- | --- |
| `c1`–`c7` | Before January checks |
| `n0`–`n11` | Monthly notes |
| `<row>d` / `<row>w` / `<row>i` | Deadline due date / responsible person / item name (`<row>` is `r0`–`r32`, or `row-…` for added rows) |
| `custom-rows` | Ordered "Your own items" row IDs (absent = default `r28`–`r32`) |
| `g<G>_<I>` / `g<G>_<I>n` | Self-review check / its notes |
| `abc-date`, `abc-who`, `abc-acc`, `abc-comments`, `abc-recs` | Self-review details |
| `saved-at` | Last save time, for "Last saved …" |

## Development

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
npm run lint
```
