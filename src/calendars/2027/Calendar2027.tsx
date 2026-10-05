import { BeforeJanuaryChecklist } from "@/components/BeforeJanuaryChecklist";
import { CalendarStoreProvider } from "@/components/CalendarStore";
import { FacilityReview } from "@/components/FacilityReview";
import { MonthlyCalendar } from "@/components/MonthlyCalendar";
import { PracticeDeadlines } from "@/components/PracticeDeadlines";
import { Toolbar } from "@/components/Toolbar";
import { STORAGE_KEY, YEAR } from "./config";
import { HelpCta, TeamCta } from "./content/Ctas";
import { FiveAreas } from "./content/FiveAreas";
import { Header } from "./content/Header";
import { Rules } from "./content/Rules";
import { Sources } from "./content/Sources";
import { beforeJanuaryChecks } from "./data/before-january";
import { reviewCategories } from "./data/facility-review";
import { areas, dateTypes } from "./data/labels";
import { months } from "./data/months";
import { deadlineGroups } from "./data/practice-deadlines";

// The 2027 O&P Compliance Calendar. Section order and wording follow the
// client's reference file (reference/erin-2027-complinace-calendar.html).
export function Calendar2027() {
  return (
    <CalendarStoreProvider storageKey={STORAGE_KEY}>
      <Header />

      <main className="wrap">
        <FiveAreas />
        <Rules />

        <section aria-labelledby="before-h">
          <div className="before">
            <h2 id="before-h">Before January: check your 2026 changes</h2>
            <BeforeJanuaryChecklist items={beforeJanuaryChecks} />
          </div>
        </section>

        <section aria-labelledby="cal-h">
          <h2 id="cal-h">2027 month by month</h2>
          <p className="intro">Tap a label to show only that kind of date. Use the lined space under each month for your own deadlines and reminders.</p>
          <MonthlyCalendar year={YEAR} months={months} areas={areas} dateTypes={dateTypes} />
        </section>

        <HelpCta />

        <section aria-labelledby="my-h">
          <h2 id="my-h">Your practice&apos;s deadlines</h2>
          <p className="intro">A deadline that everyone is responsible for often becomes a deadline no one is responsible for. Add the date and a name for each item, and your 60- and 30-day reminder dates fill in automatically. Use the blank rows at the end for anything else.</p>
          <PracticeDeadlines groups={deadlineGroups} />
        </section>

        <section aria-labelledby="abc-h" id="abc-review">
          <h2 id="abc-h">Annual facility self-review checklist</h2>
          <p className="intro">With accreditation surveys now every year, walk through your facility well before your accreditation date, ideally 90 days ahead, so there&apos;s time to fix what you find. Check off what&apos;s in place and add notes.</p>
          <FacilityReview categories={reviewCategories} />
          <p className="rule-src">A general readiness checklist from CBS Medical Billing &amp; Consulting, built around common survey areas and the Medicare DMEPOS supplier standards. It doesn&apos;t replace your accrediting organization&apos;s standards. Check theirs for the full requirements.</p>
        </section>

        <Toolbar />

        <TeamCta />

        <Sources />
      </main>

      <footer><div className="wrap">CBS Medical Billing &amp; Consulting · 19 Hampton Rd, Building B, Unit 16, Exeter, NH 03833 · cbsmedicalbilling.com</div></footer>
    </CalendarStoreProvider>
  );
}
