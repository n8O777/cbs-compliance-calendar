# Handoff: CBS 2027 O&P Compliance Calendar (redesign)

## Overview
A redesign of the live CBS Medical Billing & Consulting "2027 O&P Compliance Calendar" web app. The page now matches the visual language of CBS's RCM landing page (rcm.cbsmedicalbilling.com): deep-green bands, Rubik display type, eyebrow pills, numbered cards, proof-point stats. All existing tool functionality is preserved: date filters, three calendar views, monthly notes, an editable deadlines table with auto-calculated reminders, a 61-item self-review checklist, localStorage persistence, clear-all, and print.

Audience: O&P practice owners and billing staff. The page works as a free tool and as a lead magnet (CTAs to CBS contact page and phone).

## About the design files
`Compliance Calendar 2027.dc.html` is a **design reference built in HTML**: a working prototype showing the intended look and behavior. It is not production code to paste in. Recreate it in the live app's existing stack (framework, component patterns, styling approach). If the live app is plain HTML/JS, a straightforward port is fine, but move inline styles into the app's CSS approach.

The prototype uses a small custom template runtime (`support.js`, `<x-dc>`, `<sc-for>`, `<sc-if>`, `{{ }}` holes). Ignore that runtime. What matters:
- **Markup + inline styles** in the template = exact visual spec.
- **The `<script data-dc-script>` block** = all content data (events, checklists, sources) and behavior. `renderVals()` maps state to view; treat it like a React render.

To view the prototype, open the `.dc.html` file in a browser from this folder (needs `support.js` beside it and network access for Google Fonts).

## Fidelity
**High-fidelity.** Final colors, type, spacing, copy, and interactions. Recreate pixel-accurately. All copy is final and legally reviewed in places; keep it verbatim.

## Page structure (top to bottom)
Container on every section: `max-width:1240px; margin:0 auto; padding-inline: clamp(20px,4vw,40px)`. Section vertical padding: `clamp(64px,9vw,112px)` unless noted. Two-column sections use flex-wrap with `gap: clamp(32px,5vw,64px)` and collapse to one column naturally (flex-basis values given below).

### 0. Sticky header (only sticky element on the page)
- `position:sticky; top:0; z-index:50; background:#002800; border-bottom:1px solid rgba(255,255,255,.12)`. Inner padding `12px clamp(16px,4vw,40px)`, flex, gap 16, wrap.
- Logo: `assets/cbs-logo-white.png`, height 52px, links to `#top`. **Replace with SVG when CBS supplies one.**
- Nav (7 anchor links): Five areas, Requirements, Before January, Calendar, Deadlines, Self-review, Sources → `#areas #requirements #before-january #calendar #deadlines #abc-review #sources`.
  - Link: Rubik 600 14.5px, padding 9px 12px, radius 6, color #e4efe4, transparent bg.
  - Active (section in view, via IntersectionObserver rootMargin `-35% 0px -60% 0px`): bg #c2e0c2, color #002800, `aria-current="true"`.
  - ≥1180px: nav inline, centered between logo and CTA. <1180px: nav drops to its own full-width row below, horizontally scrollable, links get bg rgba(255,255,255,.06), gap 6.
- CTA "Talk To CBS →" → https://www.cbsmedicalbilling.com/contact/. Padding 11px 16px, radius 6, bg #153915, border 1px #4d6e4d, white Rubik 700 15px. Hover bg #1f4a1f.
- Section anchors need `scroll-margin-top` = measured header height + 10px.

### 1. Hero (`#top`)
- bg #002800, white text. Two decorative outlined puzzle-piece SVGs (path in file), strokes #285228 / #2b552b, 5px, positioned top-right and bottom-right, `aria-hidden`.
- Padding `clamp(56px,9vw,110px)` top, `clamp(56px,8vw,96px)` bottom. Left column flex `1 1 520px`; right card flex `0 1 380px`.
- Eyebrow pill (dark variant): "Free O&P compliance resource".
- H1 "Your 2027 O&P compliance calendar": Rubik 900, `clamp(44px,7.2vw,88px)`, line-height .98, letter-spacing -.015em, margin 22px 0 24px, `text-wrap:balance`.
- Lead: `clamp(18px,1.9vw,21px)`/1.55, #dbe9db, max-width 600.
- Primary button "Open the 2027 calendar →" → `#calendar`: white bg, #002800 text, Rubik 800 17px, padding 16px 24px, radius 6; hover bg #dff0df.
- Secondary: "Questions? Call (603) 601-2936" → `tel:+16036012936`, Rubik 600 16px, number underlined; hover #a9d6a9.
- Review note: top border 1px rgba(255,255,255,.14), margin-top 40, padding-top 20, 14px/1.6 #b9d2b9; bold lead "Regulatory information reviewed and current as of October 2, 2026." in white.
- **Your progress card**: white, radius 10, 6px top border #9ccc9c, shadow `0 24px 60px rgba(0,0,0,.28)`, padding 26px 24px 22px. Three linked progress rows (Before January check X of 7 → `#before-january`; Deadlines dated X of N → `#deadlines`; Facility self-review X of 61 → `#abc-review`). Bar: 8px tall, track #e6efe6, fill #2f6b2f, radius 99, width transition .3s. Footer note box bg #f3f7f1 radius 8: "No login needed. Entries save on this device only. Clearing your browser data removes them. Last saved {Mon D, h:mm AM}."

### 2. Five areas (`#areas`)
- bg #003300, white. `flex-wrap: wrap-reverse` so on mobile the heading sits above the cards.
- Right column (flex `1 1 340px`): eyebrow "Start here", H2 "Five areas to put on your calendar", lead (#d6e6d6, 18px, max 440), underlined link "Assign owners to each one →" → `#deadlines` (border-bottom 2px #6fb86f).
- Left column (flex `1 1 560px`): ordered list of 5 cards, gap 14. Card radius 8, padding 22px 24px, flex-wrap: number (Rubik 800 20px, 44px col), H3 (Rubik 800 18px, flex 1 1 170px), body (15px/1.6, flex 2 1 280px).
- Card background ramp 01→05: #fff, #eaf4ea, #d6ead6, #c2e0c2, #aed6ae. Number colors: #5f9a5f, #4d874d, #3f7a3f, #336b33, #285e28.

### 3. Requirements (`#requirements`)
- bg #fff. Eyebrow "The rules behind the dates", H2 "What ABC and Medicare require", lead.
- Grid `repeat(auto-fit,minmax(min(100%,440px),1fr))`, gap 24. Two cards: border 1px #e1e7de, radius 10, shadow `0 14px 40px rgba(0,40,0,.07)`, padding `clamp(22px,3vw,34px)`.
- Card: kicker (Rubik 800 12px uppercase .08em #3d7a3d), H3 Rubik 900 26px, list of rule rows separated by 1px #e8ece5 (8px square bullet #5f9a5f, bold lead sentence #002800), source line at bottom (14px, #4b5b4b, pushed down with `margin-top:auto`).

### 4. Before January (`#before-january`)
- bg #eef1e8 (sage). Left (flex 1 1 320px): eyebrow, H2 "Check your 2026 changes", lead, progress box (white, radius 10, border #dfe5da; big count Rubik 900 36px "N / 7", status "X to confirm" / "All set for January", 8px bar). `role="status" aria-live="polite"`.
- Right (flex 2 1 520px): `fieldset` of 7 checkbox rows (copy in `PRE` array). Row: padding 18px 20px, radius 10, border 1px #dfe5da, white; checked → bg #e7f2e4, border #9cc79c. Checkbox 22px, `accent-color:#003300`.
- **Not sticky.** Scrolls normally.

### 5. Calendar (`#calendar`)
- Header row: eyebrow "The calendar", H2 "2027 month by month", lead; right-aligned segmented view switch (Month / Year grid / Timeline): container bg #eef2ec, padding 4, radius 8; button Rubik 700 14.5px, padding 9px 16px, radius 6, selected bg #003300 white, else #264226 transparent. `aria-pressed`.
- **Filter chips** (All dates / Confirmed / Recurring / Estimate / Your practice), each with marker shape, label + count, and one-line description. Min-height 48, radius 8, border 2px #dde6da; selected border 2px #003300, bg #eaf4ea, shadow `0 4px 14px rgba(0,51,0,.12)`.
- **Month view** (default): panel border #e1e7de radius 12. Top tablist of 12 months (bg #f7f7f4), each tab shows short name + count badge (count respects filter). Selected tab bg #003300. Body: left column (flex 2 1 520px) H3 "{Month} 2027" + prev/next 44px buttons (wrap Dec↔Jan) + event cards; right column (flex 1 1 280px) "Your notes for {Month}" textarea (min-height 200), saved per month.
  - Event card: flex-wrap, padding 18px 20px, radius 10; date column 150px Rubik 800 16px; status tag + category kicker; title Rubik 800 17px; description 15px/1.6. Confirmed cards bg #f4f8f2; Estimate cards dashed border 1.5px #d6bf8e.
  - Empty state (filter yields nothing): dashed box, "No {Status} dates in {Month}", "Show all dates" button resets filter.
  - "No fixed federal dates." italic note when a month has only practice/estimate items.
- **Year grid view**: `repeat(auto-fill,minmax(min(100%,260px),1fr))`, gap 14. Each month is a button card (min-height 180) listing filtered entries with markers; "Your notes added" flag if notes exist. Click → switch to Month view on that month and scroll to `#calendar`.
- **Timeline view**: horizontally scrollable (min-width 1180). Grid `150px repeat(12,1fr)`; one lane per status (lanes respect filter); items are small tag-styled buttons (11.5px, 4-line clamp) that open that month.

### 6. Mid CTA (no id)
- bg #002800. Image slot (4:3, radius 10, placeholder bg #123a12): **team photo needed**. Copy column: eyebrow "O&P compliance partner", H2 "Need help staying ahead of all of this?", body, bold line, white button "Talk to CBS About Your Practice →" + phone.
- **Stat bar** beneath (border-top 1px rgba(255,255,255,.14); grid auto-fit min 220px; dividers between): $750M+ / Collected / "Collected for CBS customers since 2010." · 17-Day / Average reimbursement / "Average reimbursement time for CBS customers." · Nationwide / Service / "Supporting O&P practices across the country." Number Rubik 900 `clamp(30px,3.6vw,38px)`; label Rubik 800 12px uppercase #a9d6a9.
- Stats appear only here (intentionally not in the hero).

### 7. Your practice's deadlines (`#deadlines`)
- bg #f7f7f4. Header: eyebrow "Owners and reminders", H2, lead; right side counter "N of M dated" + "Print or save as PDF" text button.
- Six group cards (5 fixed from `DL` + "06 Your own items"). Group header bg #003300, number #a9d6a9, title Rubik 800 18px, "X of Y dated" #cfe3cf.
- Column header row (≥1180px only): Item (flex 3) · Due date (170px) · Responsible person (flex 1.4) · Reminders (flex 1.4) · 36px action.
- Row: padding 14px 20px, border-top #eef0ea, flex-wrap. Item title bold 15.5px + sub 13.5px #55655a. Inputs: min-height 44, radius 6, border #cfd8cc, bg #fcfdfb; focus border #2f6b2f bg #fff. On narrow widths, inputs show visible "Due date" / "Responsible person" labels.
- Reminders: when a date is set, show "60 days: {date−60}" and "30 days: {date−30}" formatted `Mon D, YYYY`; otherwise a dashed pill "Add a date".
- "Your own items" group: editable item name, × remove button (36px; hover red tint), 5 blank rows by default, "+ Add a row" outline button.

### 8. Annual facility self-review (`#abc-review`)
- bg #fff. Eyebrow "90 days before your survey", H2, lead.
- Header fields grid: Review date (date), Reviewer (text), Accreditation date (date).
- Progress panel (**not sticky**): "X of 61 items checked" + %, 10px bar; Expand all / Collapse all buttons.
- 8 accordion groups (`SR` array). Header button: number, title Rubik 800 17px, count pill ("X of Y"; turns #003300/white when complete), chevron rotating 45°↔-135°. `aria-expanded`/`aria-controls`. First group open by default.
- Item row: checkbox + text (flex 2 1 320px), notes input (flex 1 1 220px). Checked row bg #f4f9f2.
- Two textareas: Additional comments, General recommendations. Disclaimer paragraph.
- Footer actions: "Print or save as PDF" (solid #003300), "Clear my entries" (outline, text #7a2424), "Your entries save on this device only."

### 9. Closing CTA
- bg #003300, decorative puzzle SVG top-right. Blockquote "Compliance shouldn't begin when the audit letter arrives." Rubik 900 `clamp(34px,5vw,62px)`. Body, bold line, CTA + phone. Square image slot (max 460px, bg #164216): **portrait photo needed**.

### 10. Sources (`#sources`)
- Grid `repeat(auto-fill,minmax(min(100%,340px),1fr))`, gap 12. Card bg #fbfcfa, border #e1e7de, radius 10: org kicker + linked title (+ optional second link). All links `target="_blank" rel="noopener"`. Data in `SOURCES`.

### 11. Footer
- bg #002200, text #cfe0cf. Logo (height 96, white PNG → swap for SVG), tagline, footer nav (cbsmedicalbilling.com, Revenue cycle management → https://rcm.cbsmedicalbilling.com/, Contact), address (19 Hampton Rd, Building B, Unit 16, Exeter, NH 03833; info@cbsmedicalbilling.com; (603) 601-2936). Legal disclaimer 13px #b5cab5.

### Modal: Clear entries
- Overlay rgba(0,20,0,.55), `role="alertdialog"`, white card radius 12, 6px top border #9ccc9c, max-width 460. Title "Clear all your entries?", body, "Keep my entries" (focused on open) / "Clear entries" (bg #8a2424, hover #701c1c). Esc and overlay click cancel.

## Status system (always color + shape, never color alone)
| Status | Tag fill / text / border | Marker | Description |
|---|---|---|---|
| Confirmed | #003300 / #fff / 1.5px solid #003300 | filled circle | published by CMS |
| Recurring | #d4ead4 / #003300 / 1.5px solid #8fbf8f | ring (2.5px #3f7f3f) | happens every year |
| Estimate | #fbf1dc / #6b4a00 / 1.5px dashed #b7862a | dashed circle | target or past-year timing |
| Your practice | #fff / #003300 / 1.5px solid #003300 | diamond (rotated square) | depends on your dates |
| All (filter only) | — | half #003300 / half #d4ead4 square | every type |

Tag: inline-flex, gap 7, padding 4px 10px, radius 999, Rubik 700 12.5px. See `mark()` and `tag()` in the script.

## Interactions & behavior
- Filter applies to month tab counts, month entries, year grid, and timeline lanes.
- Year grid / timeline click → Month view at that month, smooth-scroll to `#calendar` offset by header height.
- All edits save immediately to localStorage; hero card shows last-saved time.
- Reminder dates computed client-side (date − 60 / − 30 days), local time, no timezone shift (parse `YYYY-MM-DD` manually, don't use `new Date(str)`).
- Transitions: progress widths .3s, chip/row backgrounds .15–.2s, chevron .2s. Smooth scroll disabled under `prefers-reduced-motion`.
- Focus ring: 3px solid #6fb86f, offset 2px, radius 4 (`:focus-visible`).
- Min hit target 44px.

## State
Persisted (localStorage key `cbs-2027-compliance-v1`, value `{ data, savedAt }`):
```
data = {
  pre:     { [index]: bool },                 // Before January checks
  notes:   { [monthIndex 0-11]: string },     // per-month notes
  dl:      { [rowId]: { date: 'YYYY-MM-DD', person: string } },  // rowId 'g{group}r{row}' or custom id
  custom:  [ { id, item } ],                  // "Your own items" rows (5 blank by default)
  sr:      { ['s{group}_{item}']: bool },     // self-review checks
  srNotes: { ['s{group}_{item}']: string },
  head:    { date, reviewer, acc },
  comments: string, recs: string
}
```
If the live app already uses a different key/shape, keep the live one and migrate; don't wipe existing users' entries.

UI-only (not persisted): `filter` ('all'|'confirmed'|'recurring'|'estimate'|'practice'), `view` ('month'|'grid'|'timeline'), `month` (0–11), open accordion groups, active nav section, confirm-modal open.

## Content data
All event, checklist, deadline, and source copy lives in the script block of the HTML file. Copy verbatim:
- `E`: 27 calendar entries `[monthIndex, dateLabel, status, category, title, description]`
- `PRE`: 7 Before January items
- `DL`: 5 deadline groups with `[item, subtext]` rows (28 rows)
- `SR`: 8 self-review groups, 61 items total
- `SOURCES`: 10 source links

## Print
Only Deadlines and Self-review print. Everything else is hidden. A print-only branded header shows (CBS name, title, phone/email, "Regulatory information reviewed as of October 2, 2026"; 3px #003300 bottom rule). Self-review starts on a new page; collapsed accordion groups print expanded; rows avoid page breaks; shadows removed; `@page { margin: 14mm 12mm }`. See the `@media print` block in `<helmet>`. Print stylesheet may get further refinement.

## Design tokens
See `Design Tokens.md` (included) for the full list. Key values:
- Greens: #002200 footer · #002800 hero/header/headings · #003300 bands/primary · #153915 header CTA · #2f6b2f progress/focus border · #5f9a5f bullets · #a9d6a9 eyebrow on dark · #c2e0c2 active nav · #eaf4ea/#ebf5eb tints
- Neutrals: #eef1e8 sage · #f7f7f4 paper · #1d2b1d ink · #4b5b4b muted · #e1e7de line · #8a2424 danger
- Type: Rubik 500–900 (display/UI), Encode Sans 400–700 (body), both Google Fonts
- Radii: 6 buttons/inputs · 8–10 cards · 12 panels/modal · 999 pills
- Shadows: card `0 14px 40px rgba(0,40,0,.07)` · raised `0 24px 60px rgba(0,0,0,.28)` · panel `0 10px 28px rgba(0,40,0,.08)`

Eyebrow pill (used on every section): inline-flex, gap 10, padding 8px 14px, radius 999, Rubik 700 12px uppercase .08em, 7px dot. Light variant bg #ebf5eb, border #cfe3cf, text/dot #002800. Dark variant transparent, border #3c603c, text/dot #a9d6a9.

## Assets
- `assets/cbs-logo-white.png`: white CBS logo for header and footer, taken from the RCM landing page screenshot. Low-res; **replace with official SVG**.
- `assets/cbs-logo-footer.png`: alternate crop.
- Puzzle-piece decorative SVG: inline path in the HTML.
- Two photo slots (mid CTA 4:3, closing CTA 1:1): CBS to supply team photos. Both can be hidden; the prototype exposes `showTeamPhotos` and `showStats` toggles.

## Files
- `Compliance Calendar 2027.dc.html`: full prototype (markup, styles, data, logic)
- `Design Tokens.md`: token reference
- `assets/`: logos
- `support.js`, `image-slot.js`: prototype runtime only, so the file opens in a browser. Do not port.
