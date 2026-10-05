"use client";

import { Fragment, useState } from "react";
import type { AreaId, CalendarMonth, DateType, DateTypeInfo } from "@/lib/types";
import { StoredTextarea } from "./fields";

type Filter = DateType | "all";

export function MonthlyCalendar({
  year,
  months,
  areas,
  dateTypes,
}: {
  year: number;
  months: CalendarMonth[];
  areas: Record<AreaId, string>;
  dateTypes: DateTypeInfo[];
}) {
  const [filter, setFilter] = useState<Filter>("all");
  const labels = Object.fromEntries(dateTypes.map((t) => [t.type, t.label])) as Record<
    DateType,
    string
  >;
  const filters: { value: Filter; label: string }[] = [
    { value: "all", label: "All dates" },
    ...dateTypes.map((t) => ({ value: t.type, label: t.label })),
  ];

  return (
    <>
      <div className="filters" role="group" aria-label="Filter dates">
        {filters.map((f) => (
          <button
            key={f.value}
            type="button"
            data-f={f.value}
            aria-pressed={filter === f.value}
            onClick={() => setFilter(f.value)}
          >
            {f.label}
          </button>
        ))}
      </div>
      <p className="legend">
        {dateTypes.map((t, i) => (
          // The space between entries matches the whitespace in the original markup.
          <Fragment key={t.type}>
            {i > 0 && " "}
            <span>
              <span className={`tag t-${t.type}`}>{t.label}</span> {t.legend}
            </span>
          </Fragment>
        ))}
      </p>
      <div id="months">
        {months.map((month) => (
          <div className="month" key={month.notesId}>
            <h3>
              {month.name}
              <small>{year}</small>
            </h3>
            <div>
              {month.items.length > 0 && (
                <ul className="items">
                  {month.items.map((item, i) => (
                    // Filtered-out items get `.hidden`; globals.css overrides it
                    // for print so every entry prints regardless of the filter.
                    <li
                      key={i}
                      data-t={item.type}
                      className={filter !== "all" && item.type !== filter ? "hidden" : undefined}
                    >
                      <span className="date">{item.date}</span>
                      <span className={`tag t-${item.type}`}>{labels[item.type]}</span>
                      <span className="area-ref">{areas[item.area]}</span>
                      <div>{item.heading}</div>
                      {item.detail && <p>{item.detail}</p>}
                    </li>
                  ))}
                </ul>
              )}
              {month.quiet && <p className="quiet">{month.quiet}</p>}
              <label className="note-label" htmlFor={month.notesId}>
                Your notes for {month.name}
              </label>
              <StoredTextarea
                field={month.notesId}
                id={month.notesId}
                placeholder="Add your own deadlines, payer dates, or reminders"
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
