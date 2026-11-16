"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import type { AreaId, CalendarItem, CalendarMonth, DateType, DateTypeInfo } from "@/lib/types";
import { useEntries } from "./CalendarStore";
import { StoredTextarea } from "./fields";
import { Mark, StatusTag } from "./ui";

type Filter = DateType | "all";
type View = "month" | "grid" | "timeline";

const VIEWS: { value: View; label: string }[] = [
  { value: "month", label: "Month" },
  { value: "grid", label: "Year grid" },
  { value: "timeline", label: "Timeline" },
];

const short = (name: string) => name.slice(0, 3);

// The month-by-month calendar: filter chips, and Month / Year grid / Timeline
// views. Monthly notes are stored under each month's `notesId` (n0–n11).
export function MonthlyCalendar({
  year,
  months,
  areas,
  dateTypes,
  heading,
}: {
  year: number;
  months: CalendarMonth[];
  areas: Record<AreaId, string>;
  dateTypes: DateTypeInfo[];
  /** Section eyebrow, heading and intro, shown beside the view switch. */
  heading: ReactNode;
}) {
  const [filter, setFilter] = useState<Filter>("all");
  const [view, setView] = useState<View>("month");
  const [current, setCurrent] = useState(0);
  const entries = useEntries();

  const visible = (item: CalendarItem) => filter === "all" || item.type === filter;
  const label = (type: DateType) => dateTypes.find((t) => t.type === type)!.label;
  const allItems = months.flatMap((m) => m.items);

  const filters: { value: Filter; label: string; desc: string; count: number }[] = [
    { value: "all", label: "All dates", desc: "every type", count: allItems.length },
    ...dateTypes.map((t) => ({
      value: t.type,
      label: t.label,
      desc: t.legend,
      count: allItems.filter((i) => i.type === t.type).length,
    })),
  ];

  // Year grid and timeline entries open their month in Month view.
  const openMonth = (index: number) => {
    setView("month");
    setCurrent(index);
    document.getElementById("calendar")?.scrollIntoView({ block: "start" });
  };

  return (
    <>
      <div className="cal__head">
        <div className="cal__intro">{heading}</div>
        <div role="group" aria-label="Calendar view" className="cal__views">
          {VIEWS.map((v) => (
            <button key={v.value} type="button" aria-pressed={view === v.value} onClick={() => setView(v.value)}>
              {v.label}
            </button>
          ))}
        </div>
      </div>

      <div role="group" aria-label="Filter dates" className="cal__filters">
        {filters.map((f) => (
          <button key={f.value} type="button" aria-pressed={filter === f.value} onClick={() => setFilter(f.value)}>
            <Mark type={f.value} size={12} />
            <span className="cal__filter-text">
              <span className="cal__filter-label">
                {f.label} <span>{f.count}</span>
              </span>
              <span className="cal__filter-desc">{f.desc}</span>
            </span>
          </button>
        ))}
      </div>

      {view === "month" && (
        <MonthView
          year={year}
          months={months}
          current={current}
          setCurrent={setCurrent}
          visible={visible}
          filter={filter}
          filterLabel={filter === "all" ? "" : label(filter)}
          showAll={() => setFilter("all")}
          areas={areas}
          label={label}
        />
      )}

      {view === "grid" && (
        <div className="cal-grid">
          {months.map((m, i) => {
            const items = m.items.filter(visible);
            const notes = entries[m.notesId];
            return (
              <button
                key={m.notesId}
                type="button"
                className="cal-grid__month"
                aria-label={`Open ${m.name}, ${items.length} dates`}
                onClick={() => openMonth(i)}
              >
                <span className="cal-grid__head">
                  <span className="cal-grid__name">{m.name}</span>
                  <span className="cal-grid__count">
                    {items.length} {items.length === 1 ? "date" : "dates"}
                  </span>
                </span>
                <span className="cal-grid__items">
                  {items.map((item, j) => (
                    <span key={j} className="cal-grid__item">
                      <Mark type={item.type} size={9} />
                      <span>
                        <strong>{item.date}</strong> · {item.heading}
                      </span>
                    </span>
                  ))}
                </span>
                {items.length === 0 && <span className="cal-grid__empty">No matching dates this month.</span>}
                {typeof notes === "string" && notes.trim() && <span className="cal-grid__notes">Your notes added</span>}
              </button>
            );
          })}
        </div>
      )}

      {view === "timeline" && (
        <>
          <div className="cal-tl">
            <div className="cal-tl__inner">
              <div className="cal-tl__row cal-tl__row--head">
                <div className="cal-tl__lane-head">Status</div>
                {months.map((m) => (
                  <div key={m.notesId} className="cal-tl__month">
                    {short(m.name)}
                  </div>
                ))}
              </div>
              {dateTypes
                .filter((t) => filter === "all" || filter === t.type)
                .map((t) => (
                  <div key={t.type} className="cal-tl__row">
                    <div className="cal-tl__lane">
                      <StatusTag type={t.type} label={t.label} />
                      <span>{t.legend}</span>
                    </div>
                    {months.map((m, i) => (
                      <div key={m.notesId} className="cal-tl__cell">
                        {m.items
                          .filter((item) => item.type === t.type)
                          .map((item, j) => (
                            <button
                              key={j}
                              type="button"
                              title={item.heading}
                              className={`cal-tl__item tag--${t.type}`}
                              onClick={() => openMonth(i)}
                            >
                              <span className="cal-tl__clamp">
                                <strong>{item.date}</strong>
                                {item.heading}
                              </span>
                            </button>
                          ))}
                      </div>
                    ))}
                  </div>
                ))}
            </div>
          </div>
          <p className="cal-tl__hint">Scroll sideways to see the full year. Select any date to open its month and add notes.</p>
        </>
      )}
    </>
  );
}

function MonthView({
  year,
  months,
  current,
  setCurrent,
  visible,
  filter,
  filterLabel,
  showAll,
  areas,
  label,
}: {
  year: number;
  months: CalendarMonth[];
  current: number;
  setCurrent: (i: number) => void;
  visible: (item: CalendarItem) => boolean;
  filter: Filter;
  filterLabel: string;
  showAll: () => void;
  areas: Record<AreaId, string>;
  label: (type: DateType) => string;
}) {
  const month = months[current];
  const items = month.items.filter(visible);
  const hasFederal = month.items.some((i) => i.type === "confirmed" || i.type === "recurring");
  const noFederal =
    items.length > 0 && !hasFederal && (filter === "all" || filter === "practice" || filter === "estimate");
  const n = months.length;

  // Keep the selected month's tab visible in the sideways-scrolling tab row.
  const tabsRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const tabs = tabsRef.current;
    const tab = tabs?.children[current] as HTMLElement | undefined;
    if (!tabs || !tab) return;
    const left = tab.offsetLeft - tabs.offsetLeft;
    if (left < tabs.scrollLeft || left + tab.offsetWidth > tabs.scrollLeft + tabs.clientWidth) {
      tabs.scrollTo({ left: left - (tabs.clientWidth - tab.offsetWidth) / 2 });
    }
  }, [current]);

  return (
    <div className="cal-month">
      <div role="tablist" aria-label="Months" className="cal-month__tabs" ref={tabsRef}>
        {months.map((m, i) => {
          const count = m.items.filter(visible).length;
          return (
            <button
              key={m.notesId}
              type="button"
              role="tab"
              aria-selected={i === current}
              aria-controls="cal-month-panel"
              aria-label={`${m.name}, ${count} dates`}
              className={count ? undefined : "is-empty"}
              onClick={() => setCurrent(i)}
            >
              <span>{short(m.name)}</span>
              <span className="cal-month__badge">{count}</span>
            </button>
          );
        })}
      </div>
      <div role="tabpanel" id="cal-month-panel" className="cal-month__panel">
        <div className="cal-month__main">
          <div className="cal-month__title-row">
            <h3 className="cal-month__title">
              {month.name} <span>{year}</span>
            </h3>
            <div className="cal-month__nav">
              <button type="button" aria-label="Previous month" onClick={() => setCurrent((current + n - 1) % n)}>
                ←
              </button>
              <button type="button" aria-label="Next month" onClick={() => setCurrent((current + 1) % n)}>
                →
              </button>
            </div>
          </div>
          {items.length === 0 && (
            <div className="cal-month__empty">
              <div className="cal-month__empty-title">
                No {filterLabel} dates in {month.name}
              </div>
              <p>
                Try another month, or show every type of date. You can still add your own notes for {month.name}.
              </p>
              <button type="button" className="btn btn-primary" onClick={showAll}>
                Show all dates
              </button>
            </div>
          )}
          <ul className="cal-month__items">
            {items.map((item, i) => (
              <li key={i} className={`cal-item cal-item--${item.type}`}>
                <div className="cal-item__date">{item.date}</div>
                <div className="cal-item__body">
                  <div className="cal-item__meta">
                    <StatusTag type={item.type} label={label(item.type)} />
                    <span className="cal-item__area">{areas[item.area]}</span>
                  </div>
                  <div className="cal-item__title">{item.heading}</div>
                  {item.detail && <p className="cal-item__detail">{item.detail}</p>}
                </div>
              </li>
            ))}
          </ul>
          {noFederal && <p className="cal-month__no-federal">No fixed federal dates.</p>}
        </div>
        <div className="cal-month__notes">
          <label htmlFor="month-notes">Your notes for {month.name}</label>
          <StoredTextarea
            key={month.notesId}
            field={month.notesId}
            id="month-notes"
            className="input"
            rows={9}
            placeholder="Add your own deadlines, owners, and reminders for this month."
          />
          <p>Saved on this device only.</p>
        </div>
      </div>
    </div>
  );
}
