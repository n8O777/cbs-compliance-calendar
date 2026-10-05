import type { Metadata } from "next";

export const YEAR = 2027;

// Stable localStorage key for this calendar's entries. Never reuse it for
// another year; each calendar year gets its own key.
export const STORAGE_KEY = "cbs-op-cal-2027-v2";

export const metadata: Metadata = {
  // Absolute title: the layout's title template doesn't apply to "/", which
  // sits in the root layout's own segment.
  title: { absolute: "2027 O&P Compliance Calendar | CBS Medical Billing & Consulting" },
  description:
    "Compliance shouldn't be managed by memory. Use this calendar to track every deadline, put a name next to each one, and set 30- and 60-day reminders before January arrives.",
  // "/" and "/2027" render the same page while 2027 is current; point search
  // engines at the permanent yearly URL.
  alternates: { canonical: "/2027" },
};
