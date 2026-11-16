// Copy is verbatim from the design handoff (the five areas are unchanged from
// the client's reference file). Do not edit wording without approval.
import { Arrow, Eyebrow, Puzzle } from "@/components/ui";

export function FiveAreas() {
  return (
    <section id="areas" className="areas section">
      <Puzzle size={220} stroke="#2b5a2b" style={{ left: -70, bottom: -60, transform: "rotate(12deg)" }} />
      <div className="container split areas__inner">
        <div className="areas__intro">
          <Eyebrow variant="dark">Start here</Eyebrow>
          <h2 className="h2">Five areas to put on your calendar</h2>
          <p className="areas__lead">
            Each one needs a date, an owner, and a reminder. The calendar and deadline table below are built
            around these five.
          </p>
          <a href="#deadlines" className="areas__link">
            Assign owners to each one <Arrow />
          </a>
        </div>
        <ol className="areas__list">
          <li>
            <span className="areas__n">01</span>
            <h3>Know your accreditation date</h3>
            <p>
              DMEPOS resurvey and reaccreditation is transitioning to at least once every 12 months. If your current
              three-year accreditation cycle was issued before January 1, 2026, the annual cycle generally begins
              when that existing cycle expires. Confirm your date, then run the{" "}
              <a href="#abc-review">annual self-review checklist</a>.
            </p>
          </li>
          <li>
            <span className="areas__n">02</span>
            <h3>Protect your Medicare enrollment and PTAN</h3>
            <p>
              Revalidate generally every 3 years for DMEPOS, and monitor Medicare billing activity for every
              enrollment/PTAN because CMS may deactivate billing privileges after six consecutive calendar months
              with no Medicare claims.
            </p>
          </li>
          <li>
            <span className="areas__n">03</span>
            <h3>Keep up with prior authorization</h3>
            <p>Upper limb prior auth phases in through April 26, 2027.</p>
          </li>
          <li>
            <span className="areas__n">04</span>
            <h3>Schedule coding and reimbursement reviews</h3>
            <p>Check HCPCS, fee schedules, and payer rules every quarter.</p>
          </li>
          <li>
            <span className="areas__n">05</span>
            <h3>Give the things without deadlines a deadline</h3>
            <p>Licenses, bonds, insurance, training, HIPAA, audits, and SOPs, each with an owner.</p>
          </li>
        </ol>
      </div>
    </section>
  );
}
