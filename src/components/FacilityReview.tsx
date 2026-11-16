"use client";

import { useState } from "react";
import type { ReviewCategory } from "@/lib/types";
import { useEntries } from "./CalendarStore";
import { StoredCheckbox, StoredInput, StoredTextarea } from "./fields";
import { percent, ProgressBar } from "./ui";

// Annual facility self-review. Stored fields (unchanged): abc-date, abc-who,
// abc-acc, abc-comments, abc-recs; each item's checkbox under its ID
// (g0_0 …) and its notes under `<id>n`.
export function FacilityReview({ categories }: { categories: ReviewCategory[] }) {
  const entries = useEntries();
  // UI only, not stored: which groups are open. The first starts open.
  const [open, setOpen] = useState<Record<number, boolean>>({ 0: true });

  const counts = categories.map((cat) => cat.items.filter((item) => entries[item.id] === true).length);
  const done = counts.reduce((a, b) => a + b, 0);
  const total = categories.reduce((a, c) => a + c.items.length, 0);

  return (
    <>
      <div className="review__fields">
        <label>
          <span>Review date</span>
          <StoredInput field="abc-date" type="date" className="input" />
        </label>
        <label>
          <span>Reviewer</span>
          <StoredInput field="abc-who" type="text" className="input" placeholder="Name and title" />
        </label>
        <label>
          <span>Accreditation date</span>
          <StoredInput field="abc-acc" type="date" className="input" />
        </label>
      </div>

      <div className="review__progress">
        <div className="review__progress-main" role="status" aria-live="polite">
          <div className="review__progress-head">
            <span className="review__progress-text">
              {done} of {total} items checked
            </span>
            <span className="review__progress-pct">{percent(done, total)}</span>
          </div>
          <ProgressBar done={done} total={total} />
        </div>
        <div className="review__toggle-all no-print">
          <button
            type="button"
            className="btn-small"
            onClick={() => setOpen(Object.fromEntries(categories.map((_, i) => [i, true])))}
          >
            Expand all
          </button>
          <button type="button" className="btn-small" onClick={() => setOpen({})}>
            Collapse all
          </button>
        </div>
      </div>

      <div className="review__groups">
        {categories.map((cat, ci) => {
          const isOpen = !!open[ci];
          const complete = counts[ci] === cat.items.length;
          const panelId = `sr-panel-${ci}`;
          return (
            <div key={cat.title} className="review-group">
              <h3>
                <button
                  type="button"
                  className="review-group__head"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpen((o) => ({ ...o, [ci]: !o[ci] }))}
                >
                  <span className="review-group__num">{String(ci + 1).padStart(2, "0")}</span>
                  <span className="review-group__title">{cat.title}</span>
                  <span className={`review-group__count${complete ? " is-complete" : ""}`}>
                    {counts[ci]} of {cat.items.length}
                  </span>
                  <span aria-hidden="true" className="review-group__chev" />
                </button>
              </h3>
              {/* Collapsed panels stay in the page so they can print expanded (print.css). */}
              <div id={panelId} className={`review-group__panel${isOpen ? "" : " is-collapsed"}`}>
                {cat.note && <p className="review-group__note">{cat.note}</p>}
                {cat.items.map((item) => (
                  <div key={item.id} className={`review-item${entries[item.id] === true ? " is-checked" : ""}`}>
                    <label className="review-item__check">
                      <StoredCheckbox field={item.id} />
                      <span>{item.text}</span>
                    </label>
                    <StoredInput
                      field={`${item.id}n`}
                      type="text"
                      className="input review-item__note"
                      aria-label={`Notes for: ${item.text}`}
                      placeholder="Notes"
                    />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="review__comments">
        <label>
          <span>Additional comments</span>
          <StoredTextarea field="abc-comments" className="input" rows={5} />
        </label>
        <label>
          <span>General recommendations</span>
          <StoredTextarea field="abc-recs" className="input" rows={5} />
        </label>
      </div>
    </>
  );
}
