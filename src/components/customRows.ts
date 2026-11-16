"use client";

import { useCalendarStore, useField } from "./CalendarStore";

// "Your own items" deadline rows can be added and removed. The ordered list of
// row IDs is stored in one field as comma-separated IDs. Until a visitor adds
// or removes a row the field is absent and the default rows apply, which are
// the same r28–r32 rows the calendar has always had, so existing entries stay
// attached to their rows.
export const CUSTOM_ROWS_FIELD = "custom-rows";

/** Fields stored per deadline row: due date, responsible person, item name. */
export const rowFields = (id: string) => [`${id}d`, `${id}w`, `${id}i`];

export function parseCustomRows(value: unknown, defaults: string[]): string[] {
  if (typeof value !== "string") return defaults;
  return value ? value.split(",") : [];
}

export function useCustomRows(defaults: string[]) {
  const store = useCalendarStore();
  const ids = parseCustomRows(useField(CUSTOM_ROWS_FIELD), defaults);

  return {
    ids,
    add() {
      // "row-" keeps new IDs clear of existing field names (c1–c7, r0–r32, …).
      const id = "row-" + Date.now().toString(36);
      store.update({ [CUSTOM_ROWS_FIELD]: [...ids, id].join(",") });
    },
    remove(id: string) {
      const patch: Record<string, undefined | string> = {
        [CUSTOM_ROWS_FIELD]: ids.filter((x) => x !== id).join(","),
      };
      for (const field of rowFields(id)) patch[field] = undefined;
      store.update(patch);
    },
  };
}
