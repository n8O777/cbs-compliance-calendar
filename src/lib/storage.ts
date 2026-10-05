// Browser-only persistence for a calendar's user entries.
//
// All entries for one calendar live in a single localStorage key as a flat
// JSON object of { fieldId: string | boolean }, the same shape as the
// reference implementation. Nothing is ever sent to a server.

export type FieldValue = string | boolean;
export type Entries = Record<string, FieldValue>;

export const STATUS_INITIAL = "Your entries save on this device only.";
const STATUS_SAVED = "Saved on this device.";
const STATUS_FAILED = "Entries can't be saved in this browser. Print or save as PDF to keep them.";
const STATUS_CLEARED = "Entries cleared.";

export interface CalendarStore {
  subscribe(listener: () => void): () => void;
  getEntries(): Entries;
  getStatus(): string;
  set(field: string, value: FieldValue): void;
  clear(): void;
}

function createStore(storageKey: string): CalendarStore {
  let entries: Entries | null = null;
  let status = STATUS_INITIAL;
  const listeners = new Set<() => void>();

  const notify = () => listeners.forEach((l) => l());

  // Read lazily so nothing touches localStorage during server rendering.
  function load(): Entries {
    if (entries) return entries;
    try {
      const parsed = JSON.parse(localStorage.getItem(storageKey) || "{}");
      entries = parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
    } catch {
      entries = {};
    }
    return entries!;
  }

  return {
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    getEntries: load,
    getStatus: () => status,
    set(field, value) {
      entries = { ...load(), [field]: value };
      try {
        localStorage.setItem(storageKey, JSON.stringify(entries));
        status = STATUS_SAVED;
      } catch {
        status = STATUS_FAILED;
      }
      notify();
    },
    clear() {
      entries = {};
      try {
        localStorage.removeItem(storageKey);
      } catch {}
      status = STATUS_CLEARED;
      notify();
    },
  };
}

// One store per storage key, so every route rendering the same calendar
// (e.g. "/" and "/2027") shares the same entries.
const stores = new Map<string, CalendarStore>();

export function getCalendarStore(storageKey: string): CalendarStore {
  let store = stores.get(storageKey);
  if (!store) {
    store = createStore(storageKey);
    stores.set(storageKey, store);
  }
  return store;
}
