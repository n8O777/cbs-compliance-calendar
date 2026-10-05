# 2027 Calendar — Migration Inventory

Source of truth: `reference/erin-2027-complinace-calendar.html` (single self-contained file: inline CSS, inline vanilla JS, Google Fonts). Line numbers below refer to that file.

## Page structure (render order)

| # | Section | Static / interactive | Lines |
|---|---------|----------------------|-------|
| 1 | Header: brand, H1, lede, "reviewed and current as of October 2, 2026" notice | Static | 169–176 |
| 2 | "Five areas to put on your calendar" (5 numbered cards; #1 links to `#abc-review`) | Static | 180–189 |
| 3 | "What ABC and Medicare require" (2 columns, inline `<b>`, source links) | Static | 191–220 |
| 4 | "Before January: check your 2026 changes" (7 checkboxes `c1`–`c7`) | Interactive | 222–235 |
| 5 | "2027 month by month": filter buttons, legend, 12 months + notes per month | Interactive | 237–254 |
| 6 | CTA #1 "Need help staying ahead of all of this?" (mailto) | Static | 256–261 |
| 7 | "Your practice's deadlines" table, with automatic 60/30-day reminders | Interactive | 263–272 |
| 8 | "Annual facility self-review checklist" (`id="abc-review"`): meta fields, progress, 8 categories, 2 textareas, disclaimer | Interactive | 274–290 |
| 9 | Tools: Print or save as PDF, Clear my entries, save status | Interactive | 292–296 |
| 10 | CTA #2 (blockquote, mailto) | Static | 298–303 |
| 11 | Sources (10 items / 11 links) + educational-use disclaimer | Static | 305–320 |
| 12 | Footer: name, Exeter NH address, cbsmedicalbilling.com (plain text, not a link) | Static | 324 |

## Data structures (JS, lines 327–467)

- **`MONTHS`**: 12 × `{ m, items[], quiet? }`; item = `{ d: dateLabel, t: type, a: areaId, h: heading, p: detail }`.
  - Item counts: Jan 6, Feb 1, Mar 1, Apr 4, May 3, Jun 1, Jul 2, Aug 1, Sep 1, Oct 2, Nov 4, Dec 1 = **27**.
  - By type: confirmed 7, recurring 5, estimate 5, practice 10.
  - `quiet: "No fixed federal dates."` on Feb, Mar, May.
  - `p: ""` means no detail line is rendered.
- **`AREA`**: `{1:"Accreditation", 2:"Enrollment and PTAN", 3:"Prior authorization", 4:"Coding and reimbursement", 5:"Practice Compliance"}`.
- **`LABEL`**: `{confirmed:"Confirmed", recurring:"Recurring", estimate:"Estimate", practice:"Your practice"}`.
- **`MY`**: a flat list of group headers `{g}` and rows `{i: item, s: subtext, c?: editableName}`. 6 groups, **33 rows** (`r0`–`r32`):
  - 1. Accreditation: r0–r2 (r1 has an editable name)
  - 2. Medicare enrollment and PTAN: r3–r8 (r6–r8 "PTAN 1/2/3" have editable names)
  - 3. Prior authorization: r9–r10
  - 4. Coding and reimbursement: r11–r12
  - 5. Things without deadlines: r13–r27
  - Your own items: r28–r32 (blank, editable names)
- **`ABC`**: 8 × `{ c: category, i: items[], n?: note }`. Item counts 7, 7, 6, 8, 11, 5, 13, 4 = **61**. `n` is supported by the renderer but unused.
- **Before January**: 7 checklist items, hard-coded in HTML (`c1`–`c7`).

## localStorage

- Single key **`cbs-op-cal-2027-v2`** holds one flat JSON object. Read once on load (try/catch, falls back to `{}`).
- Written on every `input`/`change` event (no debounce). Checkboxes store booleans; text fields store strings (empty strings stay in the object).
- On load, text values are applied only if truthy.

| Field key | Element |
|-----------|---------|
| `c1`–`c7` | Before-January checkboxes |
| `n0`–`n11` | Monthly notes textareas (Jan–Dec) |
| `r{N}d` | Practice deadline due date (`YYYY-MM-DD`) |
| `r{N}w` | Responsible person |
| `r{N}i` | Item name (only on rows with `c: true`) |
| `abc-date`, `abc-who`, `abc-acc` | Review date, reviewer, accreditation date |
| `g{cat}_{item}` | Checklist checkbox (0-indexed) |
| `g{cat}_{item}n` | Checklist item notes |
| `abc-comments`, `abc-recs` | Additional comments, general recommendations |

All keys are derived from **array position**, so inserting or reordering content would shift saved data onto the wrong rows.

Status line (`#saved`, `aria-live`): initially "Your entries save on this device only." → "Saved on this device." after a write. If the write fails: "Entries can't be saved in this browser. Print or save as PDF to keep them."

**Clear my entries**: `confirm("Clear all your entries on this device?")` → resets the store object, `removeItem(KEY)`, blanks every field, resets reminders and progress → "Entries cleared."

## Reminder calculation (`minus`, lines 429–433)

- Input: date-input value `YYYY-MM-DD`. Output: `"Mon D, YYYY"` (e.g. `Mar 2, 2027`) or `""` if unparseable.
- Uses `Date.UTC(y, m-1, d - days)`, so the math is calendar days and timezone-safe.
- Cell shows `60 days: <date>` / `30 days: <date>` (labels bold), or "Add a date" when empty. Recomputes on every input.
- Only the practice-deadline table has reminders. The checklist's "Accreditation date" does not drive anything.

## Filtering (lines 495–499)

- Five buttons: `all | confirmed | recurring | estimate | practice`, single-select via `aria-pressed`.
- Toggles a `.hidden` class on each month `<li>` whose type doesn't match. Months themselves never hide; the notes textarea and `quiet` text stay visible even when no items match.
- The filter isn't saved. `.hidden` is `display:none!important`, so a filtered view prints filtered.

## Checklist progress (lines 472–481)

- Per category: `"{checked} of {total}"` in the summary. Overall: `"{done} of {total} items checked"` (`aria-live`), plus a bar with `width = round(done/total*100)%`.
- Counts only the 61 ABC checkboxes. Before-January checks are excluded.
- Categories are `<details>`; only the first is open by default. Open/closed state isn't saved.

## Print / PDF

- Button → `window.print()`. The `@media print` rules hide filters and tools, switch to a white background with 10.5pt type, prevent page breaks inside months, cards and before-January, remove the table min-width, give textareas thinner lines, and turn CTAs into bordered boxes.
- Collapsed `<details>` categories **do not print their items** (no beforeprint handler).

## Responsive

- `.wrap` max 900px, 20px gutters; safe-area insets on `:root`; `viewport-fit=cover`.
- Five areas: auto-fit grid, min 240px. Rules: 2 → 1 column at ≤720px. Months: 120px label column → stacked at ≤600px.
- Checklist rows: 3 columns → checkbox + label with notes beneath at ≤600px. Comments: 2 → 1 column at ≤640px.
- Deadlines table: horizontal scroll container, `min-width: 720px`.
- Dark mode: `prefers-color-scheme` tokens, plus `data-theme="light|dark"` override hooks (no toggle exists in the file).
- Fonts: Bricolage Grotesque (opsz 12–96, weights 500/700) for headings; Public Sans 400/500/600 for body.

## External links

- Rules: ABC "Navigating DMEPOS Accreditation Changes"; Palmetto GBA supplier standards PDF; eCFR 42 CFR 424.540.
- Sources: CMS DMEPOS prior auth; AOPA "Three important updates"; Noridian F2F/WOPD Oct 28, 2026; HME News; CMS probationary prior auth; eCFR 424.540; Palmetto GBA standards; ABC; CMS-0057-F; CMS DMEPOS PA Operational Guide PDF; CMS competitive bidding.
- All open in the same tab (no `target`).
- Internal anchor: `#abc-review`.

## CBS calls to action

- Both CTAs link to `mailto:info@cbsmedicalbilling.com?subject=O%26P%20Compliance%20Support`, with link text "Talk to CBS About Your Practice →".

## Content observations (preserved as-is unless instructed)

- April lists Apr 30 before Apr 26.
- May shows "No fixed federal dates." but includes the confirmed May 18 item.
- Area 5 label "Practice Compliance" is capitalized differently from the other four areas.
- Rows with editable names (r1, r6–r8) show the default name only as placeholder text.
