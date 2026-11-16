// Copy is verbatim from the design handoff (the rules are unchanged from the
// client's reference file). Do not edit wording without approval.
import type { ReactNode } from "react";
import { Eyebrow } from "@/components/ui";

function Rule({ lead, children }: { lead: string; children: ReactNode }) {
  return (
    <li>
      <span aria-hidden="true" className="rule__bullet" />
      <span>
        <strong>{lead}</strong> {children}
      </span>
    </li>
  );
}

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

export function Rules() {
  return (
    <section id="requirements" className="requirements section">
      <div className="container">
        <Eyebrow>The rules behind the dates</Eyebrow>
        <h2 className="h2">What ABC and Medicare require</h2>
        <p className="lead requirements__lead">
          The rules behind the dates. Confirm details with your own accrediting organization and the full regulation.
        </p>
        <div className="requirements__grid">
          <article className="rule-card">
            <div className="rule-card__kicker">Accreditation</div>
            <h3>ABC facility accreditation</h3>
            <ul>
              <Rule lead="Annual surveys began January 1, 2026.">
                CMS now requires accrediting organizations to survey DMEPOS suppliers every year, replacing the
                three-year cycle.
              </Rule>
              <Rule lead="Expiring in 2026?">
                Your renewal runs only until 2027. After that, you apply for accreditation every year.
              </Rule>
              <Rule lead="Expiring in 2027 or 2028?">You move to an annual survey at your next reaccreditation date.</Rule>
              <Rule lead="New location, new owner, or new service needing a survey?">
                You also move to a one-year cycle.
              </Rule>
              <Rule lead="Standards and fees">
                were unchanged for the 2026 renewal cycle. ABC says more guidance is coming before the 2027 renewal
                cycle.
              </Rule>
            </ul>
            <p className="rule-card__src">
              Source:{" "}
              <a href="https://www.abcop.org/facility-accreditation/navigating-dmepos-accreditation-changes-with-abc" {...ext}>
                ABC, Navigating DMEPOS Accreditation Changes
              </a>
              . Accredited by BOC or another organization? Confirm your own transition rules.
            </p>
          </article>
          <article className="rule-card">
            <div className="rule-card__kicker">Enrollment</div>
            <h3>Medicare DMEPOS supplier standards</h3>
            <ul>
              <Rule lead="Report changes within 30 days.">
                Any change to your enrollment information, including location, ownership, and licensure (42 CFR
                424.57(c)).
              </Rule>
              <Rule lead="Accredit every location separately.">
                Each location, owned or subcontracted, must meet the quality standards and be accredited to bill
                Medicare.
              </Rule>
              <Rule lead="Tell your accrediting organization">when you open a new location.</Rule>
              <Rule lead="Carry at least $300,000 in liability insurance.">
                If you fabricate your own items, it must also cover product liability and completed operations. A
                lapse can mean revocation back to the lapse date.
              </Rule>
              <Rule lead="Meet surety bond requirements">unless you qualify for an exemption (42 CFR 424.57(d)).</Rule>
              <Rule lead="Give each Medicare patient the supplier standards">
                and keep a complaint resolution protocol.
              </Rule>
              <Rule lead="Monitor Medicare billing activity for every enrollment/PTAN.">
                CMS may deactivate Medicare billing privileges when no Medicare claims are submitted for six
                consecutive calendar months (42 CFR 424.540).
              </Rule>
            </ul>
            <p className="rule-card__src">
              Sources:{" "}
              <a
                href="https://palmettogba.com/palmetto/providers.nsf/files/Abbreviated%20Standards_020816.pdf/$FILE/Abbreviated%20Standards_020816.pdf"
                {...ext}
              >
                Medicare DMEPOS Supplier Standards (Palmetto GBA)
              </a>
              ;{" "}
              <a href="https://www.ecfr.gov/current/title-42/chapter-IV/subchapter-B/part-424/subpart-P/section-424.540" {...ext}>
                eCFR 42 CFR 424.540
              </a>
              .
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
