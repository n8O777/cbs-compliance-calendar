"use client";

import { createContext, useContext, useSyncExternalStore, type ReactNode } from "react";
import {
  getCalendarStore,
  SAVED_AT_FIELD,
  type CalendarStore,
  type Entries,
  type FieldValue,
  type SaveState,
} from "@/lib/storage";

const StoreContext = createContext<CalendarStore | null>(null);
const NO_ENTRIES: Entries = {};

export function CalendarStoreProvider({
  storageKey,
  children,
}: {
  storageKey: string;
  children: ReactNode;
}) {
  return (
    <StoreContext.Provider value={getCalendarStore(storageKey)}>{children}</StoreContext.Provider>
  );
}

export function useCalendarStore(): CalendarStore {
  const store = useContext(StoreContext);
  if (!store) throw new Error("useCalendarStore must be used inside CalendarStoreProvider");
  return store;
}

// The server render (and hydration) always sees empty entries; saved values
// appear once the client takes over, since localStorage is browser-only.

/** Value of one stored field. Components re-render only when their own field changes. */
export function useField(field: string): FieldValue | undefined {
  const store = useCalendarStore();
  return useSyncExternalStore(
    store.subscribe,
    () => store.getEntries()[field],
    () => undefined,
  );
}

/** A stored text field, or "" when unset. */
export function useText(field: string): string {
  const value = useField(field);
  return typeof value === "string" ? value : "";
}

export function useEntries(): Entries {
  const store = useCalendarStore();
  return useSyncExternalStore(store.subscribe, store.getEntries, () => NO_ENTRIES);
}

export function useSaveState(): SaveState {
  const store = useCalendarStore();
  return useSyncExternalStore(store.subscribe, store.getSaveState, () => "idle");
}

/** "Last saved Nov 16, 2:05 PM." once anything has been saved, else "". */
export function useSavedLabel(): string {
  const savedAt = useField(SAVED_AT_FIELD);
  if (typeof savedAt !== "string") return "";
  const date = new Date(savedAt);
  if (Number.isNaN(date.getTime())) return "";
  return (
    "Last saved " +
    date.toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }) +
    "."
  );
}
