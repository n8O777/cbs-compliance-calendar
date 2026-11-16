"use client";

import type { Entries } from "@/lib/storage";
import { useEntries } from "./CalendarStore";
import { CUSTOM_ROWS_FIELD, parseCustomRows } from "./customRows";

/** The stored field IDs a calendar's progress is counted from. */
export interface ProgressFields {
  /** Before January checkbox IDs. */
  checks: string[];
  /** Fixed deadline row IDs (a row counts as dated when `<id>d` is set). */
  deadlineRows: string[];
  /** Default "Your own items" row IDs. */
  customRowDefaults: string[];
  /** Self-review checkbox IDs. */
  reviewItems: string[];
}

export interface Count {
  done: number;
  total: number;
}

export const isDated = (entries: Entries, rowId: string) => {
  const v = entries[`${rowId}d`];
  return typeof v === "string" && v !== "";
};

export function useProgress(fields: ProgressFields) {
  const entries = useEntries();
  const custom = parseCustomRows(entries[CUSTOM_ROWS_FIELD], fields.customRowDefaults);
  const rows = [...fields.deadlineRows, ...custom];
  const checked = (ids: string[]): Count => ({
    done: ids.filter((id) => entries[id] === true).length,
    total: ids.length,
  });
  return {
    checks: checked(fields.checks),
    deadlines: { done: rows.filter((id) => isDated(entries, id)).length, total: rows.length },
    review: checked(fields.reviewItems),
  };
}
