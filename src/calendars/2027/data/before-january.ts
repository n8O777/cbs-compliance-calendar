// "Before January: check your 2026 changes" checklist.
// Copied verbatim from the client's finalized reference file
// (reference/erin-2027-complinace-calendar.html). Do not edit wording without approval.
//
// Each `id` is a stable localStorage key.

import type { ChecklistItem } from "@/lib/types";

export const beforeJanuaryChecks: ChecklistItem[] = [
  {
    id: "c1",
    text: "Prior authorization added in 2026 (L0651, L1844, L1846, L1852, L1932 in April; L0456, L0457, L0486, L1833 on Oct 28) is built into intake and authorization workflows.",
  },
  {
    id: "c2",
    text: "Face-to-face encounter and written order before delivery are in place for codes added Oct 28, 2026, including L1906, L1933, L1952, L3761, and L3916. For affected items, confirm the applicable face-to-face encounter timing and that the written order is communicated before delivery.",
  },
  {
    id: "c3",
    text: "If you are newly enrolled or underwent an applicable ownership change approved on or after Oct 15, 2026, determine whether probationary prior authorization applies and track your individual probationary period.",
  },
  {
    id: "c4",
    text: "Medicare billing activity has been reviewed for every enrollment/PTAN so potential six-month inactivity deactivation risk is identified early.",
  },
  {
    id: "c5",
    text: "Your accreditation date is confirmed with your accrediting organization, and you know whether your next renewal is annual.",
  },
  {
    id: "c6",
    text: "Liability insurance (at least $300,000) and surety bond, if required, are current, and their renewal dates are on your calendar.",
  },
  {
    id: "c7",
    text: "Any 2026 change in location, ownership, or licensure was reported to Medicare within 30 days and to your accrediting organization.",
  },
];
