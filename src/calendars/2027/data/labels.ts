// Area names and date-type labels used by the calendar, filters, and legend.
// Copied verbatim from the client's finalized reference file
// (reference/erin-2027-complinace-calendar.html). Do not edit wording without approval.

import type { AreaId, DateTypeInfo } from "@/lib/types";

export const areas: Record<AreaId, string> = {
  1: "Accreditation",
  2: "Enrollment and PTAN",
  3: "Prior authorization",
  4: "Coding and reimbursement",
  5: "Practice Compliance",
};

// Filter order and legend text follow the original page.
export const dateTypes: DateTypeInfo[] = [
  { type: "confirmed", label: "Confirmed", legend: "published by CMS" },
  { type: "recurring", label: "Recurring", legend: "happens every year" },
  { type: "estimate", label: "Estimate", legend: "target or past-year timing" },
  { type: "practice", label: "Your practice", legend: "depends on your dates" },
];
