"use client";

import { useRef } from "react";
import { useCalendarStore, useSaveState } from "./CalendarStore";

const SAVE_FAILED = "Entries can't be saved in this browser. Print or save as PDF to keep them.";

// Self-review footer: print, clear (with a confirmation dialog), save note.
export function Toolbar() {
  const store = useCalendarStore();
  const failed = useSaveState() === "failed";
  const dialog = useRef<HTMLDialogElement>(null);
  const keep = useRef<HTMLButtonElement>(null);

  const close = () => dialog.current?.close();

  return (
    <div className="review__actions no-print">
      <button type="button" className="btn btn-primary" onClick={() => window.print()}>
        Print or save as PDF
      </button>
      <button
        type="button"
        className="btn review__clear"
        onClick={() => {
          dialog.current?.showModal();
          keep.current?.focus();
        }}
      >
        Clear my entries
      </button>
      <span className="review__saved" aria-live="polite">
        {failed ? SAVE_FAILED : "Your entries save on this device only."}
      </span>

      {/* Native modal dialog: Esc cancels and focus stays inside while open.
          A click on the backdrop (the dialog element itself) also cancels. */}
      <dialog
        ref={dialog}
        className="clear-dialog"
        role="alertdialog"
        aria-labelledby="clear-title"
        aria-describedby="clear-desc"
        onClick={(e) => e.target === dialog.current && close()}
      >
        <div className="clear-dialog__card">
          <h2 id="clear-title">Clear all your entries?</h2>
          <p id="clear-desc">
            This removes every checkmark, date, name, and note saved on this device. It can&apos;t be undone.
          </p>
          <div className="clear-dialog__actions">
            <button type="button" ref={keep} className="clear-dialog__keep" onClick={close}>
              Keep my entries
            </button>
            <button
              type="button"
              className="clear-dialog__clear"
              onClick={() => {
                store.clear();
                close();
              }}
            >
              Clear entries
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}
