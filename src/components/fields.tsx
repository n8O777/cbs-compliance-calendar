"use client";

import type { ComponentProps } from "react";
import { useCalendarStore, useField } from "./CalendarStore";

// Form controls bound to a stored field. `data-k` mirrors the field ID, as in
// the reference markup.

type InputProps = Omit<ComponentProps<"input">, "value" | "onChange" | "checked"> & {
  field: string;
};

export function StoredCheckbox({ field, ...props }: InputProps) {
  const store = useCalendarStore();
  const value = useField(field);
  return (
    <input
      {...props}
      type="checkbox"
      data-k={field}
      checked={!!value}
      onChange={(e) => store.set(field, e.target.checked)}
    />
  );
}

export function StoredInput({ field, ...props }: InputProps) {
  const store = useCalendarStore();
  const value = useField(field);
  return (
    <input
      {...props}
      data-k={field}
      value={typeof value === "string" ? value : ""}
      onChange={(e) => store.set(field, e.target.value)}
    />
  );
}

type TextareaProps = Omit<ComponentProps<"textarea">, "value" | "onChange"> & { field: string };

export function StoredTextarea({ field, ...props }: TextareaProps) {
  const store = useCalendarStore();
  const value = useField(field);
  return (
    <textarea
      {...props}
      data-k={field}
      value={typeof value === "string" ? value : ""}
      onChange={(e) => store.set(field, e.target.value)}
    />
  );
}
