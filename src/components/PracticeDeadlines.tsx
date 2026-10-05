"use client";

import { Fragment } from "react";
import { minus } from "@/lib/reminders";
import type { DeadlineGroup } from "@/lib/types";
import { useField } from "./CalendarStore";
import { StoredInput } from "./fields";

function Reminders({ rowId }: { rowId: string }) {
  const due = useField(`${rowId}d`);
  return (
    <td className="remind" id={`${rowId}m`}>
      {typeof due === "string" && due ? (
        <>
          <b>60 days:</b> {minus(due, 60)}
          <br />
          <b>30 days:</b> {minus(due, 30)}
        </>
      ) : (
        "Add a date"
      )}
    </td>
  );
}

export function PracticeDeadlines({ groups }: { groups: DeadlineGroup[] }) {
  return (
    <div className="dates-wrap">
      <table className="dates">
        <thead>
          <tr>
            <th scope="col">Item</th>
            <th scope="col">Due date</th>
            <th scope="col">Responsible person</th>
            <th scope="col">Reminders</th>
          </tr>
        </thead>
        <tbody id="mydates">
          {groups.map((group) => (
            <Fragment key={group.title}>
              <tr className="group">
                <td colSpan={4}>{group.title}</td>
              </tr>
              {group.rows.map((row) => (
                <tr key={row.id}>
                  <td className="item">
                    {row.editableName ? (
                      <StoredInput
                        field={`${row.id}i`}
                        className="custom"
                        aria-label="Item name"
                        placeholder={row.item || "Add an item"}
                      />
                    ) : (
                      row.item
                    )}
                    {row.sub && <small>{row.sub}</small>}
                  </td>
                  <td>
                    <StoredInput field={`${row.id}d`} type="date" aria-label="Due date" />
                  </td>
                  <td>
                    <StoredInput
                      field={`${row.id}w`}
                      className="who"
                      aria-label="Responsible person"
                      placeholder="Name"
                    />
                  </td>
                  <Reminders rowId={row.id} />
                </tr>
              ))}
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
