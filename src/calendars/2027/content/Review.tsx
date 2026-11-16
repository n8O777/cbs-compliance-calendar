// Copy is verbatim from the design handoff. Do not edit wording without approval.
import { FacilityReview } from "@/components/FacilityReview";
import { Toolbar } from "@/components/Toolbar";
import { Eyebrow } from "@/components/ui";
import { reviewCategories } from "../data/facility-review";

export function Review() {
  return (
    <section id="abc-review" className="review section">
      <div className="container">
        <Eyebrow className="no-print">90 days before your survey</Eyebrow>
        <h2 className="h2">Annual facility self-review checklist</h2>
        <p className="lead review__lead">
          With accreditation surveys now every year, walk through your facility well before your accreditation date,
          ideally 90 days ahead, so there&apos;s time to fix what you find. Check off what&apos;s in place and add
          notes.
        </p>
        <FacilityReview categories={reviewCategories} />
        <p className="review__disclaimer">
          A general readiness checklist from CBS Medical Billing &amp; Consulting, built around common survey areas and
          the Medicare DMEPOS supplier standards. It doesn&apos;t replace your accrediting organization&apos;s
          standards. Check theirs for the full requirements.
        </p>
        <Toolbar />
      </div>
    </section>
  );
}
