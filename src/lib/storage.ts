// Browser-only persistence for a calendar's user entries.
//
// All entries for one calendar live in a single localStorage key as a flat
// JSON object of { fieldId: string | boolean }, the same shape the calendar
// has used since launch. Never rename or reshape existing fields: visitors'
// saved entries are read back by these exact IDs. Nothing is sent to a server.

export type FieldValue = string | boolean;
export type Entries = Record<string, FieldValue>;

/** ISO timestamp of the last successful save; shown as "Last saved …". */
export const SAVED_AT_FIELD = "saved-at";

export type SaveState = "idle" | "failed";

export interface CalendarStore {
  subscribe(listener: () => void): () => void;
  getEntries(): Entries;
  getSaveState(): SaveState;
  set(field: string, value: FieldValue): void;
  /** Sets several fields at once; `undefined` deletes a field. */
  update(patch: Record<string, FieldValue | undefined>): void;
  clear(): void;
}

function createStore(storageKey: string): CalendarStore {
  let entries: Entries | null = null;
  let saveState: SaveState = "idle";
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

  function update(patch: Record<string, FieldValue | undefined>) {
    const next: Entries = { ...load() };
    for (const [field, value] of Object.entries(patch)) {
      if (value === undefined) delete next[field];
      else next[field] = value;
    }
    next[SAVED_AT_FIELD] = new Date().toISOString();
    try {
      localStorage.setItem(storageKey, JSON.stringify(next));
      saveState = "idle";
    } catch {
      delete next[SAVED_AT_FIELD];
      saveState = "failed";
    }
    entries = next;
    notify();
  }

  return {
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    getEntries: load,
    getSaveState: () => saveState,
    set: (field, value) => update({ [field]: value }),
    update,
    clear() {
      entries = {};
      try {
        localStorage.removeItem(storageKey);
      } catch {}
      saveState = "idle";
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
