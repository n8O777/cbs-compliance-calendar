// 2027 month-by-month calendar entries, in the original order.
// Copied verbatim from the client's finalized reference file
// (reference/erin-2027-complinace-calendar.html). Do not edit wording without approval.
//
// `notesId` is the stable localStorage field key for each month's notes.

import type { CalendarMonth } from "@/lib/types";

export const months: CalendarMonth[] = [
  {
    notesId: "n0",
    name: "January",
    items: [
      {
        date: "Jan 1",
        type: "recurring",
        area: 4,
        heading: "Annual fee schedule and HCPCS updates take effect",
        detail: "Confirm your system and fee schedules were updated correctly.",
      },
      {
        date: "Jan 1",
        type: "confirmed",
        area: 3,
        heading: "CMS Interoperability and Prior Authorization API requirements begin",
        detail: "Impacted payers must implement specified FHIR-based API requirements, including Prior Authorization APIs. Check with your payers and software vendors about availability and workflow integration.",
      },
      {
        date: "Jan 26",
        type: "confirmed",
        area: 3,
        heading: "Upper limb prior auth (L3761, L3916) phase two begins",
        detail: "Adds AZ, GA, IL, MA, OH, OR, PA, and TX to CA, FL, MI, and NY.",
      },
      {
        date: "January",
        type: "practice",
        area: 5,
        heading: "Assign an owner to every deadline on this calendar",
        detail: "Set 30- and 60-day reminders for each one.",
      },
      {
        date: "90 days before your accreditation date",
        type: "practice",
        area: 1,
        heading: "Complete the annual facility self-review",
        detail: "Use the checklist below so there's time to fix gaps before your survey.",
      },
      {
        date: "Early 2027",
        type: "estimate",
        area: 1,
        heading: "Watch for ABC guidance on the 2027 renewal cycle",
        detail: "ABC has said detailed instructions are coming for the annual cycle.",
      },
    ],
  },
  {
    notesId: "n1",
    name: "February",
    items: [
      {
        date: "February",
        type: "practice",
        area: 5,
        heading: "Annual staff compliance training",
        detail: "Keep sign-in records.",
      },
    ],
    quiet: "No fixed federal dates.",
  },
  {
    notesId: "n2",
    name: "March",
    items: [
      {
        date: "March",
        type: "practice",
        area: 3,
        heading: "Train staff for nationwide upper limb prior auth",
        detail: "Takes effect in every state on April 26.",
      },
    ],
    quiet: "No fixed federal dates.",
  },
  {
    notesId: "n3",
    name: "April",
    items: [
      {
        date: "Apr 1",
        type: "recurring",
        area: 4,
        heading: "Quarterly coding and reimbursement review",
        detail: "HCPCS changes from the biannual cycle often take effect now.",
      },
      {
        date: "Apr 2",
        type: "confirmed",
        area: 3,
        heading: "Prior authorization exemption notices",
        detail: "Suppliers in the exemption process may receive continued-exemption or withdrawal notices based on applicable claim-review results; a 90% or greater claim approval rate is required for continued exemption.",
      },
      {
        date: "Apr 30",
        type: "confirmed",
        area: 3,
        heading: "Prior authorization exemption opt-out deadline",
        detail: "Suppliers choosing to opt out of the exemption process must submit the request to their DME MAC by April 30.",
      },
      {
        date: "Apr 26",
        type: "confirmed",
        area: 3,
        heading: "Upper limb prior auth (L3761, L3916) goes nationwide",
        detail: "",
      },
    ],
  },
  {
    notesId: "n4",
    name: "May",
    items: [
      {
        date: "May",
        type: "practice",
        area: 2,
        heading: "Mid-year Medicare enrollment/PTAN activity check",
        detail: "Review Medicare billing activity for every enrollment/PTAN and address potential six-month inactivity deactivation risk.",
      },
      {
        date: "May 18",
        type: "confirmed",
        area: 3,
        heading: "Advance PAR submission may begin for suppliers losing exemption",
        detail: "Suppliers losing exemption may begin submitting prior authorization requests in advance of the June 1 cycle.",
      },
      {
        date: "May",
        type: "practice",
        area: 1,
        heading: "Mid-year safety check",
        detail: "Fire drill, first aid kits, extinguisher inspections, and chemical labels.",
      },
    ],
    quiet: "No fixed federal dates.",
  },
  {
    notesId: "n5",
    name: "June",
    items: [
      {
        date: "Jun 1",
        type: "confirmed",
        area: 3,
        heading: "New annual prior authorization exemption cycle begins",
        detail: "",
      },
    ],
  },
  {
    notesId: "n6",
    name: "July",
    items: [
      {
        date: "Jul 1",
        type: "recurring",
        area: 4,
        heading: "Quarterly coding and reimbursement review",
        detail: "",
      },
      {
        date: "Early July",
        type: "estimate",
        area: 4,
        heading: "CY 2028 DMEPOS proposed rule released",
        detail: "Look for O&P changes coming in 2028.",
      },
    ],
  },
  {
    notesId: "n7",
    name: "August",
    items: [
      {
        date: "End of August",
        type: "estimate",
        area: 4,
        heading: "Comment deadline on the proposed rule",
        detail: "",
      },
    ],
  },
  {
    notesId: "n8",
    name: "September",
    items: [
      {
        date: "Late summer to fall",
        type: "estimate",
        area: 4,
        heading: "Competitive bidding contracts announced",
        detail: "Affects off-the-shelf back, knee, and upper extremity braces starting in 2028.",
      },
    ],
  },
  {
    notesId: "n9",
    name: "October",
    items: [
      {
        date: "Oct 1",
        type: "recurring",
        area: 4,
        heading: "Quarterly review and annual ICD-10-CM update",
        detail: "Update diagnosis codes in templates.",
      },
      {
        date: "Individual date",
        type: "practice",
        area: 3,
        heading: "Track probationary prior authorization period",
        detail: "For affected suppliers, the one-year probationary period is tied to the supplier's own applicable start date; confirm and track your date.",
      },
    ],
  },
  {
    notesId: "n10",
    name: "November",
    items: [
      {
        date: "Nov 15",
        type: "recurring",
        area: 2,
        heading: "Medicare participation decision window opens",
        detail: "Runs through Dec 31.",
      },
      {
        date: "Late November",
        type: "estimate",
        area: 4,
        heading: "CY 2028 DMEPOS final rule released",
        detail: "",
      },
      {
        date: "November",
        type: "practice",
        area: 5,
        heading: "HIPAA risk assessment and policy and SOP review",
        detail: "",
      },
      {
        date: "November",
        type: "practice",
        area: 1,
        heading: "Patient satisfaction survey analysis and performance management plan review",
        detail: "Document improvements for your next survey.",
      },
    ],
  },
  {
    notesId: "n11",
    name: "December",
    items: [
      {
        date: "December",
        type: "practice",
        area: 5,
        heading: "Build your 2028 compliance calendar",
        detail: "Carry forward every date and owner.",
      },
    ],
  },
];
