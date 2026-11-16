import { CalendarStoreProvider } from "@/components/CalendarStore";
import { FacilityReview } from "@/components/FacilityReview";
import { MonthlyCalendar } from "@/components/MonthlyCalendar";
import { PracticeDeadlines } from "@/components/PracticeDeadlines";
import { Toolbar } from "@/components/Toolbar";
import { STORAGE_KEY, YEAR } from "./config";
import { SiteHeader } from "@/components/SiteHeader";
import type { ProgressFields } from "@/components/progress";
import { Eyebrow } from "@/components/ui";
import { BeforeJanuary } from "./content/BeforeJanuary";
import { HelpCta, TeamCta } from "./content/Ctas";
import { FiveAreas } from "./content/FiveAreas";
import { Footer, PrintHeader } from "./content/Footer";
import { Hero } from "./content/Hero";
import { Rules } from "./content/Rules";
import { Sources } from "./content/Sources";
import { beforeJanuaryChecks } from "./data/before-january";
import { reviewCategories } from "./data/facility-review";
import { areas, dateTypes } from "./data/labels";
import { months } from "./data/months";
import { deadlineGroups } from "./data/practice-deadlines";

const NAV = [
  { id: "areas", label: "Five areas" },
  { id: "requirements", label: "Requirements" },
  { id: "before-january", label: "Before January" },
  { id: "calendar", label: "Calendar" },
  { id: "deadlines", label: "Deadlines" },
  { id: "abc-review", label: "Self-review" },
  { id: "sources", label: "Sources" },
];

const customGroup = deadlineGroups.find((g) => g.custom);

// Stored field IDs the hero's progress card counts.
const PROGRESS: ProgressFields = {
  checks: beforeJanuaryChecks.map((c) => c.id),
  deadlineRows: deadlineGroups.filter((g) => !g.custom).flatMap((g) => g.rows.map((r) => r.id)),
  customRowDefaults: customGroup ? customGroup.rows.map((r) => r.id) : [],
  reviewItems: reviewCategories.flatMap((c) => c.items.map((i) => i.id)),
};

// The 2027 O&P Compliance Calendar. Layout and wording follow the redesign
// handoff (design/design_handoff_compliance_calendar_2027); the regulatory
// content was carried over from the client's reference file.
export function Calendar2027() {
  return (
    <CalendarStoreProvider storageKey={STORAGE_KEY}>
      <PrintHeader />
      <SiteHeader nav={NAV} ctaLabel="Talk To CBS" />

      <main id="main">
        <Hero progress={PROGRESS} />
        <FiveAreas />
        <Rules />

        <BeforeJanuary />

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
                    Tap a label to show only that kind of date. Use the notes space in each month for your own
                    deadlines and reminders.
                  </p>
                </>
              }
            />
          </div>
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

      <Footer />
    </CalendarStoreProvider>
  );
}
