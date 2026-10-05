// "Your practice's deadlines" table rows, grouped as in the original.
// Copied verbatim from the client's finalized reference file
// (reference/erin-2027-complinace-calendar.html). Do not edit wording without approval.
//
// Each row `id` is a stable localStorage prefix: `<id>d` due date, `<id>w` responsible
// person, and `<id>i` item name (rows with `editableName` only).

import type { DeadlineGroup } from "@/lib/types";

export const deadlineGroups: DeadlineGroup[] = [
  {
    title: "1. Accreditation",
    rows: [
      { id: "r0", item: "Accreditation renewal", sub: "At least every 12 months once your current cycle expires" },
      { id: "r1", item: "Additional locations: accreditation", sub: "Each location is accredited separately", editableName: true },
      { id: "r2", item: "Annual facility self-review", sub: "About 90 days before your accreditation date" },
    ],
  },
  {
    title: "2. Medicare enrollment and PTAN",
    rows: [
      { id: "r3", item: "Medicare revalidation", sub: "Generally every 3 years for DMEPOS" },
      { id: "r4", item: "PECOS enrollment accuracy review", sub: "Verify locations, ownership, contacts, and enrollment information" },
      { id: "r5", item: "NPPES/NPI accuracy review", sub: "Verify NPI records and practice information" },
      { id: "r6", item: "PTAN 1: Medicare billing activity check", sub: "Monitor for six consecutive calendar months with no Medicare claims", editableName: true },
      { id: "r7", item: "PTAN 2: Medicare billing activity check", sub: "Monitor for six consecutive calendar months with no Medicare claims", editableName: true },
      { id: "r8", item: "PTAN 3: Medicare billing activity check", sub: "Monitor for six consecutive calendar months with no Medicare claims", editableName: true },
    ],
  },
  {
    title: "3. Prior authorization",
    rows: [
      { id: "r9", item: "Probationary prior auth period", sub: "Certain newly enrolled suppliers or applicable ownership changes only" },
      { id: "r10", item: "Prior auth exemption status", sub: "Cycle renews June 1" },
    ],
  },
  {
    title: "4. Coding and reimbursement",
    rows: [
      { id: "r11", item: "Quarterly code and fee review", sub: "January, April, July, October" },
      { id: "r12", item: "Payer fee schedule review", sub: "Commercial and Medicaid contracts" },
    ],
  },
  {
    title: "5. Things without deadlines",
    rows: [
      { id: "r13", item: "State licenses", sub: "Report licensure changes to Medicare within 30 days" },
      { id: "r14", item: "Professional credentials", sub: "ABC or BOC and CE cycle" },
      { id: "r15", item: "Surety bond", sub: "42 CFR 424.57(d), unless exempt" },
      { id: "r16", item: "Liability insurance", sub: "At least $300,000; a lapse can mean retroactive revocation" },
      { id: "r17", item: "CAQH attestation/review", sub: "" },
      { id: "r18", item: "Commercial payer recredentialing", sub: "" },
      { id: "r19", item: "Medicaid recredentialing", sub: "" },
      { id: "r20", item: "Payer credentialing", sub: "" },
      { id: "r21", item: "Practitioner license/certification and CE deadlines", sub: "" },
      { id: "r22", item: "Employee exclusion screening", sub: "" },
      { id: "r23", item: "Cybersecurity/security risk review", sub: "" },
      { id: "r24", item: "Employee training", sub: "" },
      { id: "r25", item: "HIPAA Security Risk Analysis", sub: "" },
      { id: "r26", item: "Documentation and coding audit", sub: "" },
      { id: "r27", item: "Policies and SOPs review", sub: "Include complaint resolution protocol and supplier standards notice" },
    ],
  },
  {
    title: "Your own items",
    rows: [
      { id: "r28", item: "", sub: "", editableName: true },
      { id: "r29", item: "", sub: "", editableName: true },
      { id: "r30", item: "", sub: "", editableName: true },
      { id: "r31", item: "", sub: "", editableName: true },
      { id: "r32", item: "", sub: "", editableName: true },
    ],
  },
];
