import { CalendarStoreProvider } from "@/components/CalendarStore";
import { MonthlyCalendar } from "@/components/MonthlyCalendar";
import { STORAGE_KEY, YEAR } from "./config";
import { SiteHeader } from "@/components/SiteHeader";
import type { ProgressFields } from "@/components/progress";
import { Eyebrow } from "@/components/ui";
import { BeforeJanuary } from "./content/BeforeJanuary";
import { Deadlines } from "./content/Deadlines";
import { HelpCta, TeamCta } from "./content/Ctas";
import { FiveAreas } from "./content/FiveAreas";
import { Footer, PrintHeader } from "./content/Footer";
import { Hero } from "./content/Hero";
import { Review } from "./content/Review";
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

        <Deadlines />

        <Review />

        <TeamCta />

        <Sources />
      </main>

      <Footer />
    </CalendarStoreProvider>
  );
}
