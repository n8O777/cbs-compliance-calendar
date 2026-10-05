export type DateType = "confirmed" | "recurring" | "estimate" | "practice";
export type AreaId = 1 | 2 | 3 | 4 | 5;

export interface DateTypeInfo {
  type: DateType;
  label: string;
  legend: string;
}

export interface CalendarItem {
  date: string;
  type: DateType;
  area: AreaId;
  heading: string;
  /** Empty string means no detail line is shown. */
  detail: string;
}

export interface CalendarMonth {
  notesId: string;
  name: string;
  items: CalendarItem[];
  quiet?: string;
}

export interface DeadlineRow {
  id: string;
  item: string;
  sub: string;
  /** The item name is a user-editable field; `item` is shown as its placeholder. */
  editableName?: boolean;
}

export interface DeadlineGroup {
  title: string;
  rows: DeadlineRow[];
}

export interface ChecklistItem {
  id: string;
  text: string;
}

export interface ReviewCategory {
  title: string;
  note?: string;
  items: ChecklistItem[];
}
