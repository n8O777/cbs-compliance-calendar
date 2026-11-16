# CBS 2027 O&P Compliance Calendar — design tokens

Sampled from rcm.cbsmedicalbilling.com screenshots. Implementation file: `Compliance Calendar 2027.dc.html`.

## Color
| Token | Value | Use |
|---|---|---|
| green-950 | #002200 | Footer |
| green-900 | #002800 | Hero, header, mid CTA, headings on light |
| green-850 | #003300 | Section bands, primary buttons, selected states |
| green-800 | #153915 | Header CTA fill (border #4d6e4d) |
| green-600 | #2f6b2f | Progress fills, focus border |
| green-500 | #5f9a5f | Pillar numbers, square bullets |
| green-300 | #a9d6a9 | Eyebrow text/dot on dark, hover on dark |
| green-200 | #c2e0c2 | Pillar tint, active nav pill |
| green-100 | #eaf4ea / #ebf5eb | Pillar tint, eyebrow pill fill on light |
| pillar ramp | #fff → #eaf4ea → #d6ead6 → #c2e0c2 → #aed6ae | Numbered cards 01–05 |
| sage | #eef1e8 | Alternate section background |
| paper | #f7f7f4 | Stats band, deadlines section |
| ink | #1d2b1d | Body text |
| ink-muted | #4b5b4b | Secondary text (≥ 7:1 on white) |
| line | #e1e7de | Card borders |
| danger | #8a2424 | Destructive confirm |

### Status (always color + shape)
| Status | Fill / text / border | Marker |
|---|---|---|
| Confirmed | #003300 / #fff / solid #003300 | filled circle |
| Recurring | #d4ead4 / #003300 / solid #8fbf8f | ring |
| Estimate | #fbf1dc / #6b4a00 / dashed #b7862a | dashed circle; card border dashed |
| Your practice | #fff / #003300 / solid #003300 | diamond |

## Type
- Display: **Rubik** 800–900 (Google Fonts). Body: **Encode Sans** 400–700.
- H1: clamp(44px, 7.2vw, 88px) / 0.98, 900
- H2: clamp(34px, 4.6vw, 54px) / 1.02, 900
- H3: 17–26px, 800–900
- Stat: clamp(32px, 4vw, 40px), 900
- Body L: 17–18px / 1.6. Body: 15–15.5px / 1.6. Small: 13–14px
- Eyebrow: Rubik 700, 12px, uppercase, 0.08em tracking, pill with 7px dot

## Spacing
- Container: max-width 1240px, side padding clamp(20px, 4vw, 40px)
- Section padding: clamp(64px, 9vw, 112px) vertical
- Column gap: clamp(32px, 5vw, 64px). Card gaps: 10–24px. Card padding: 18–34px
- Scale in use: 4 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 64

## Radii
- Buttons, inputs: 6px. Cards: 8–10px. Panels/modal: 12px. Pills/tags: 999px
- Feature cards: 6px top border #9ccc9c

## Shadow
- Card: 0 14px 40px rgba(0,40,0,.07)
- Raised: 0 24px 60px rgba(0,0,0,.28) (on dark)
- Sticky progress: 0 10px 28px rgba(0,40,0,.08)

## Interaction
- Focus: 3px solid #6fb86f outline, 2px offset
- Min hit target 44px; inputs 44–46px tall
- Storage: `localStorage['cbs-2027-compliance-v1']`
- Print: only Deadlines + Self-review print, with branded header; collapsed groups expand.
