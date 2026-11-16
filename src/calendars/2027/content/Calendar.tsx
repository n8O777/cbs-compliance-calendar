// Copy is verbatim from the design handoff. Do not edit wording without approval.
import { MonthlyCalendar } from "@/components/MonthlyCalendar";
import { Eyebrow } from "@/components/ui";
import { YEAR } from "../config";
import { areas, dateTypes } from "../data/labels";
import { months } from "../data/months";

export function Calendar() {
  return (
    <section id="calendar" className="cal section">
      <div className="container">
        <MonthlyCalendar
          year={YEAR}
          months={months}
          areas={areas}
          dateTypes={dateTypes}
          heading={
            <>
              <Eyebrow>The calendar</Eyebrow>
              <h2 className="h2">2027 month by month</h2>
              <p className="lead">
                Tap a label to show only that kind of date. Use the notes space in each month for your own deadlines
                and reminders.
              </p>
            </>
          }
        />
      </div>
    </section>
  );
}
