"use client";

import { useSaveState, useSavedLabel } from "./CalendarStore";
import { useProgress, type ProgressFields } from "./progress";
import { ProgressBar } from "./ui";

const SAVE_FAILED = "Entries can't be saved in this browser. Print or save as PDF to keep them.";

// Hero "Your progress" card: three linked progress rows and the storage note.
export function ProgressCard({ fields }: { fields: ProgressFields }) {
  const p = useProgress(fields);
  const savedLabel = useSavedLabel();
  const failed = useSaveState() === "failed";
  const rows = [
    { id: "before-january", label: "Before January check", count: p.checks },
    { id: "deadlines", label: "Deadlines dated", count: p.deadlines },
    { id: "abc-review", label: "Facility self-review", count: p.review },
  ];

  return (
    <aside aria-label="Your progress" className="progress-card">
      <div className="progress-card__title">Your progress</div>
      <p className="progress-card__sub">Everything you enter stays in this browser.</p>
      <div className="progress-card__rows">
        {rows.map(({ id, label, count }) => (
          <a key={id} href={`#${id}`} className="progress-card__row">
            <span className="progress-card__label">
              <span>{label}</span>
              <span className="progress-card__count">
                {count.done} of {count.total}
              </span>
            </span>
            <ProgressBar done={count.done} total={count.total} />
          </a>
        ))}
      </div>
      <div className="progress-card__note">
        <span aria-hidden="true" className="progress-card__dot" />
        <span aria-live="polite">
          {failed ? (
            SAVE_FAILED
          ) : (
            <>
              <strong>No login needed.</strong> Entries save on this device only. Clearing your browser
              data removes them. {savedLabel}
            </>
          )}
        </span>
      </div>
    </aside>
  );
}
