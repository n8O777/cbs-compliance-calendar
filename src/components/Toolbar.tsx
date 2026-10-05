"use client";

import { useCalendarStore, useSaveStatus } from "./CalendarStore";

export function Toolbar() {
  const store = useCalendarStore();
  const status = useSaveStatus();
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
