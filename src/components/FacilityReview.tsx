"use client";

import { useEffect, useRef } from "react";
import type { ReviewCategory } from "@/lib/types";
import { useEntries } from "./CalendarStore";
import { StoredCheckbox, StoredInput, StoredTextarea } from "./fields";

export function FacilityReview({ categories }: { categories: ReviewCategory[] }) {
  const entries = useEntries();
  const detailsRefs = useRef<(HTMLDetailsElement | null)[]>([]);

  // Differs from the reference: closed <details> don't print their contents,
  // so expand every category while printing (from the Print button or the
  // browser's own print command) and restore the on-screen state afterwards.
  useEffect(() => {
    let reopened: HTMLDetailsElement[] = [];
    const beforePrint = () => {
      reopened = detailsRefs.current.filter((d): d is HTMLDetailsElement => !!d && !d.open);
      reopened.forEach((d) => (d.open = true));
    };
    const afterPrint = () => {
      reopened.forEach((d) => (d.open = false));
      reopened = [];
    };
    window.addEventListener("beforeprint", beforePrint);
    window.addEventListener("afterprint", afterPrint);
    return () => {
      window.removeEventListener("beforeprint", beforePrint);
      window.removeEventListener("afterprint", afterPrint);
    };
  }, []);

  const counts = categories.map((cat) => ({
    done: cat.items.filter((item) => entries[item.id] === true).length,
    total: cat.items.length,
  }));
  const done = counts.reduce((sum, c) => sum + c.done, 0);
  const total = counts.reduce((sum, c) => sum + c.total, 0);

  return (
    <>
      <div className="review-meta">
        <label>
          Review date
          <StoredInput field="abc-date" type="date" />
        </label>
        <label>
          Reviewer
          <StoredInput field="abc-who" type="text" placeholder="Name" />
        </label>
        <label>
          Accreditation date
          <StoredInput field="abc-acc" type="date" />
        </label>
      </div>
      <p className="progress" id="abc-progress" aria-live="polite">
        {done} of {total} items checked
      </p>
      <div className="bar" aria-hidden="true">
        <span id="abc-bar" style={{ width: `${total ? Math.round((done / total) * 100) : 0}%` }} />
      </div>
      <div id="abc-cats">
        {categories.map((cat, ci) => (
          <details
            className="cat"
            key={cat.title}
            open={ci === 0}
            ref={(el) => {
              detailsRefs.current[ci] = el;
            }}
          >
            <summary>
              {cat.title}
              <span className="cnt" id={`abc-cnt${ci}`}>
                {counts[ci].done} of {counts[ci].total}
              </span>
            </summary>
            {cat.note && <p className="cat-note">{cat.note}</p>}
            <ul className="chk">
              {cat.items.map((item) => (
                <li key={item.id}>
                  <StoredCheckbox field={item.id} id={item.id} />
                  <label htmlFor={item.id}>{item.text}</label>
                  <StoredInput
                    field={`${item.id}n`}
                    type="text"
                    aria-label={`Notes: ${item.text}`}
                    placeholder="Notes"
                  />
                </li>
              ))}
            </ul>
          </details>
        ))}
      </div>
      <div className="review-comments">
        <div>
          <label className="note-label" htmlFor="abc-comments">
            Additional comments
          </label>
          <StoredTextarea field="abc-comments" id="abc-comments" />
        </div>
        <div>
          <label className="note-label" htmlFor="abc-recs">
            General recommendations
          </label>
          <StoredTextarea field="abc-recs" id="abc-recs" />
        </div>
      </div>
    </>
  );
}
