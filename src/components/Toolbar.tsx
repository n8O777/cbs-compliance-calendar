"use client";

import { useCalendarStore, useSaveState } from "./CalendarStore";

export function Toolbar() {
  const store = useCalendarStore();
  const status =
    useSaveState() === "failed"
      ? "Entries can't be saved in this browser. Print or save as PDF to keep them."
      : "Your entries save on this device only.";
  return (
    <div className="tools">
      <button type="button" className="btn" id="print" onClick={() => window.print()}>
        Print or save as PDF
      </button>
      <button
        type="button"
        className="btn secondary"
        id="clear"
        onClick={() => {
          if (confirm("Clear all your entries on this device?")) store.clear();
        }}
      >
        Clear my entries
      </button>
      <span className="saved" id="saved" aria-live="polite">
        {status}
      </span>
    </div>
  );
}
