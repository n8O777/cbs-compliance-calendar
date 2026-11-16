"use client";

import type { ReactNode } from "react";
import { minus } from "@/lib/reminders";
import type { DeadlineGroup, DeadlineRow } from "@/lib/types";
import { useEntries, useText } from "./CalendarStore";
import { useCustomRows } from "./customRows";
import { StoredInput } from "./fields";
import { isDated } from "./progress";

// Stored fields per row (unchanged from the original table): `<id>d` due date,
// `<id>w` responsible person, `<id>i` item name (editable rows only).

/** Deadlines header counter: "N of M dated" and the print button. */
export function DeadlineCounter({ groups }: { groups: DeadlineGroup[] }) {
  const entries = useEntries();
  const custom = groups.find((g) => g.custom);
  const { ids } = useCustomRows(custom ? custom.rows.map((r) => r.id) : []);
  const rows = [...groups.filter((g) => !g.custom).flatMap((g) => g.rows.map((r) => r.id)), ...ids];
  const dated = rows.filter((id) => isDated(entries, id)).length;
  return (
    <div className="dl__counter">
      <span className="dl__count">
        {dated}
        <span> of {rows.length} dated</span>
      </span>
      <button type="button" className="dl__print" onClick={() => window.print()}>
        Print or save as PDF
      </button>
    </div>
  );
}

export function PracticeDeadlines({ groups }: { groups: DeadlineGroup[] }) {
  return (
    <div className="dl__groups">
      {groups.map((group, gi) =>
        group.custom ? (
          <CustomGroup key={group.title} group={group} num={gi + 1} />
        ) : (
          <Group key={group.title} num={gi + 1} title={group.title} rowIds={group.rows.map((r) => r.id)}>
            {group.rows.map((row) => (
              <Row key={row.id} row={row} />
            ))}
          </Group>
        ),
      )}
    </div>
  );
}

function Group({
  num,
  title,
  rowIds,
  children,
  footer,
}: {
  num: number;
  title: string;
  rowIds: string[];
  children: ReactNode;
  footer?: ReactNode;
}) {
  const entries = useEntries();
  const dated = rowIds.filter((id) => isDated(entries, id)).length;
  return (
    <div className="dl-group">
      <div className="dl-group__head">
        <span className="dl-group__num">{String(num).padStart(2, "0")}</span>
        <h3>{title}</h3>
        <span className="dl-group__progress">
          {dated} of {rowIds.length} dated
        </span>
      </div>
      <div className="dl-group__cols" aria-hidden="true">
        <span>Item</span>
        <span>Due date</span>
        <span>Responsible person</span>
        <span>Reminders</span>
        <span />
      </div>
      {children}
      {footer}
    </div>
  );
}

function CustomGroup({ group, num }: { group: DeadlineGroup; num: number }) {
  const { ids, add, remove } = useCustomRows(group.rows.map((r) => r.id));
  return (
    <Group
      num={num}
      title={group.title}
      rowIds={ids}
      footer={
        <div className="dl-group__add">
          <button type="button" onClick={add}>
            + Add a row
          </button>
        </div>
      }
    >
      {ids.map((id) => (
        <Row key={id} row={{ id, item: "", sub: "", editableName: true }} custom onRemove={() => remove(id)} />
      ))}
    </Group>
  );
}

function Row({ row, custom = false, onRemove }: { row: DeadlineRow; custom?: boolean; onRemove?: () => void }) {
  const storedName = useText(`${row.id}i`);
  const name = storedName || row.item || "your own item";

  return (
    <div className="dl-row">
      <div className="dl-row__item">
        {row.editableName ? (
          <>
            {/* Phones only (see deadlines.css): the full default name, which the
                input's placeholder may cut off. */}
            {row.item && (
              <span className="dl-row__hint" aria-hidden="true">
                {row.item}
              </span>
            )}
            <StoredInput
              field={`${row.id}i`}
              className="input dl-row__name"
              aria-label="Item name"
              placeholder={row.item || "Your own item"}
            />
          </>
        ) : (
          <div className="dl-row__title">{row.item}</div>
        )}
        {row.sub && <div className="dl-row__sub">{row.sub}</div>}
      </div>
      <label className="dl-row__date">
        <span className="dl-row__label">Due date</span>
        <StoredInput field={`${row.id}d`} type="date" className="input" aria-label={`Due date for ${name}`} />
      </label>
      <label className="dl-row__person">
        <span className="dl-row__label">Responsible person</span>
        <StoredInput
          field={`${row.id}w`}
          className="input"
          aria-label={`Responsible person for ${name}`}
          placeholder="Name"
          autoComplete="off"
        />
      </label>
      <Reminders rowId={row.id} />
      <div className="dl-row__action">
        {custom && (
          <button type="button" className="dl-row__remove" aria-label={`Remove ${name}`} onClick={onRemove}>
            ×
          </button>
        )}
      </div>
    </div>
  );
}

function Reminders({ rowId }: { rowId: string }) {
  const due = useText(`${rowId}d`);
  const r60 = due && minus(due, 60);
  const r30 = due && minus(due, 30);
  return (
    <div className="dl-row__remind" aria-live="polite">
      {r60 && r30 ? (
        <>
          <span>
            <strong>60 days:</strong> {r60}
          </span>
          <span>
            <strong>30 days:</strong> {r30}
          </span>
        </>
      ) : (
        <span className="dl-row__nodate">Add a date</span>
      )}
    </div>
  );
}
