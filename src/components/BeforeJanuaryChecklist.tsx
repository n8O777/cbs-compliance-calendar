"use client";

import type { ChecklistItem } from "@/lib/types";
import { useEntries } from "./CalendarStore";
import { StoredCheckbox } from "./fields";
import { ProgressBar } from "./ui";

/** Before January progress box: "N / 7" and how many are left to confirm. */
export function BeforeJanuaryProgress({ items }: { items: ChecklistItem[] }) {
  const entries = useEntries();
  const done = items.filter((item) => entries[item.id] === true).length;
  const total = items.length;

  return (
    <div className="before__progress" role="status" aria-live="polite">
      <div className="before__progress-head">
        <span className="before__count">
          {done}
          <span> / {total}</span>
        </span>
        <span className="before__status">
          {done === total ? "All set for January" : `${total - done} to confirm`}
        </span>
      </div>
      <ProgressBar done={done} total={total} />
    </div>
  );
}

/** The seven 2026-change checkboxes (stored as c1–c7). */
export function BeforeJanuaryChecklist({ items }: { items: ChecklistItem[] }) {
  const entries = useEntries();
  return (
    <fieldset className="before__list">
      <legend className="visually-hidden">2026 changes checklist</legend>
      {items.map((item) => (
        <label key={item.id} className={`before__item${entries[item.id] === true ? " is-checked" : ""}`}>
          <StoredCheckbox field={item.id} />
          <span>{item.text}</span>
        </label>
      ))}
    </fieldset>
  );
}
