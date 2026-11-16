// Copy is verbatim from the design handoff. Do not edit wording without approval.
import { DeadlineCounter, PracticeDeadlines } from "@/components/PracticeDeadlines";
import { Eyebrow } from "@/components/ui";
import { deadlineGroups } from "../data/practice-deadlines";

export function Deadlines() {
  return (
    <section id="deadlines" className="dl section">
      <div className="container">
        <div className="dl__head">
          <div className="dl__intro">
            <Eyebrow className="no-print">Owners and reminders</Eyebrow>
            <h2 className="h2">Your practice&apos;s deadlines</h2>
            <p className="lead">
              A deadline that everyone is responsible for often becomes a deadline no one is responsible for. Add the
              date and a name for each item, and your 60- and 30-day reminder dates fill in automatically. Use the
              blank rows at the end for anything else.
            </p>
          </div>
          <DeadlineCounter groups={deadlineGroups} />
        </div>
        <PracticeDeadlines groups={deadlineGroups} />
      </div>
    </section>
  );
}
