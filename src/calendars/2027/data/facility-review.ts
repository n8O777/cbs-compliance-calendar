// Annual facility self-review checklist categories and items.
// Copied verbatim from the client's finalized reference file
// (reference/erin-2027-complinace-calendar.html). Do not edit wording without approval.
//
// Each item `id` is a stable localStorage key for its checkbox; `<id>n` holds its notes.

import type { ReviewCategory } from "@/lib/types";

export const reviewCategories: ReviewCategory[] = [
  {
    title: "Business and enrollment records",
    items: [
      { id: "g0_0", text: "Formation documents on file (articles, bylaws, or operating agreement)" },
      { id: "g0_1", text: "Business licenses current for every location" },
      { id: "g0_2", text: "Certificate of occupancy on file" },
      { id: "g0_3", text: "Medicare enrollment matches your current locations, owners, and key staff" },
      { id: "g0_4", text: "Accreditation certificate on file for every location" },
      { id: "g0_5", text: "Liability insurance certificate current, at least $300,000" },
      { id: "g0_6", text: "Surety bond current, or exemption documented" },
    ],
  },
  {
    title: "Staff and credentials",
    items: [
      { id: "g1_0", text: "Current licenses and certifications on file for every clinician" },
      { id: "g1_1", text: "Job descriptions match each person's credentials and duties" },
      { id: "g1_2", text: "Roster of clinical staff with titles and responsibilities" },
      { id: "g1_3", text: "Duties and privileging documented for staff without clinical credentials" },
      { id: "g1_4", text: "OIG exclusion screening done for all staff" },
      { id: "g1_5", text: "I-9 and W-4 on file for all employees" },
      { id: "g1_6", text: "Annual performance reviews completed" },
    ],
  },
  {
    title: "Policies and programs",
    items: [
      { id: "g2_0", text: "Policy and procedure manual reviewed and updated this year" },
      { id: "g2_1", text: "Employee handbook current" },
      { id: "g2_2", text: "Quality or performance improvement plan reviewed this year" },
      { id: "g2_3", text: "Patient satisfaction results analyzed and improvements documented" },
      { id: "g2_4", text: "Safety program reviewed this year" },
      { id: "g2_5", text: "HIPAA policies current, with a named privacy contact" },
    ],
  },
  {
    title: "Facility and postings",
    items: [
      { id: "g3_0", text: "Accessible parking marked, if you have a lot" },
      { id: "g3_1", text: "Hours of operation posted at the entrance" },
      { id: "g3_2", text: "Medicare supplier standards posted" },
      { id: "g3_3", text: "HIPAA notice and privacy contact posted" },
      { id: "g3_4", text: "Financial policy posted" },
      { id: "g3_5", text: "Business license and clinician licenses or certifications posted" },
      { id: "g3_6", text: "Emergency numbers posted" },
      { id: "g3_7", text: "Evacuation plan posted; exits lit and marked" },
    ],
  },
  {
    title: "Patient communication",
    items: [
      { id: "g4_0", text: "Patients told the expected timeline for their device" },
      { id: "g4_1", text: "Patients told their financial responsibility up front" },
      { id: "g4_2", text: "Treatment goals and expected outcomes discussed" },
      { id: "g4_3", text: "Patient rights provided" },
      { id: "g4_4", text: "Device use, care, maintenance, and precautions explained" },
      { id: "g4_5", text: "Follow-up schedule given" },
      { id: "g4_6", text: "After-hours contact provided" },
      { id: "g4_7", text: "Complaint process in place, with a form patients can use" },
      { id: "g4_8", text: "Payment authorization form on file" },
      { id: "g4_9", text: "Warranty policy provided" },
      { id: "g4_10", text: "Copy of the supplier standards given to Medicare patients" },
    ],
  },
  {
    title: "Exam room privacy and safety",
    items: [
      { id: "g5_0", text: "Conversations can't be overheard" },
      { id: "g5_1", text: "Windows covered for privacy" },
      { id: "g5_2", text: "No records or images from earlier patients left in the room" },
      { id: "g5_3", text: "Evacuation route posted inside the room" },
      { id: "g5_4", text: "Walking aids available for patients who need them" },
    ],
  },
  {
    title: "Lab and workplace safety",
    items: [
      { id: "g6_0", text: "Safety orientation documented for every employee" },
      { id: "g6_1", text: "Staff trained on fire extinguisher location and use" },
      { id: "g6_2", text: "Extinguishers in place, with current inspections" },
      { id: "g6_3", text: "Fire drill held and documented, with who attended and what to improve" },
      { id: "g6_4", text: "Every employee knows their role in the evacuation plan" },
      { id: "g6_5", text: "First aid kits stocked and in date" },
      { id: "g6_6", text: "Lab clean, with staff-only signage on the doors" },
      { id: "g6_7", text: "Flammables stored in a labeled cabinet" },
      { id: "g6_8", text: "All chemical containers clearly and permanently labeled" },
      { id: "g6_9", text: "Bloodborne pathogen training documented" },
      { id: "g6_10", text: "Eye and ear protection available" },
      { id: "g6_11", text: "Guards in place on machinery" },
      { id: "g6_12", text: "Equipment inventory and maintenance log current" },
    ],
  },
  {
    title: "Billing and compliance",
    items: [
      { id: "g7_0", text: "Compliance contact designated and meeting regularly with leadership" },
      { id: "g7_1", text: "Billing staff training documented" },
      { id: "g7_2", text: "Documentation and coding audit completed" },
      { id: "g7_3", text: "Prior authorization and order requirements built into intake" },
    ],
  },
];
