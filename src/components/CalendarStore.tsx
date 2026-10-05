"use client";

import { createContext, useContext, useSyncExternalStore, type ReactNode } from "react";
import {
  getCalendarStore,
  STATUS_INITIAL,
  type CalendarStore,
  type Entries,
  type FieldValue,
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

export function useEntries(): Entries {
  const store = useCalendarStore();
  return useSyncExternalStore(store.subscribe, store.getEntries, () => NO_ENTRIES);
}

export function useSaveStatus(): string {
  const store = useCalendarStore();
  return useSyncExternalStore(store.subscribe, store.getStatus, () => STATUS_INITIAL);
}
