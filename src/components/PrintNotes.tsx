"use client";

import type { CalendarMonth } from "@/lib/types";
import { useEntries } from "./CalendarStore";

// Print only. On screen the calendar shows one month's notes at a time, and
// the calendar itself doesn't print, so every month that has notes is listed
// here for the printout. Renders nothing when there are no notes.
export function PrintNotes({ months, heading }: { months: CalendarMonth[]; heading: string }) {
  const entries = useEntries();
  const withNotes = months.filter((m) => {
    const v = entries[m.notesId];
    return typeof v === "string" && v.trim() !== "";
  });
  if (withNotes.length === 0) return null;
  return (
    <section className="print-notes print-only">
      <h2 className="h2">{heading}</h2>
      {withNotes.map((m) => (
        <div key={m.notesId} className="print-notes__month">
          <h3>Your notes for {m.name}</h3>
          <p>{entries[m.notesId] as string}</p>
        </div>
      ))}
    </section>
  );
}
