// Copy is verbatim from the design handoff. Do not edit wording without approval.
//
// Differences from the handoff, both deliberate:
// - The two photo slots (mid CTA 4:3 team photo, closing CTA square portrait)
//   are hidden until CBS supplies photos. The copy columns fill the width.
// - "Talk to CBS About Your Practice" opens the contact page in a new tab.
import { Arrow, ContactLink, Eyebrow, Puzzle } from "@/components/ui";
import { site } from "@/lib/site";

function CtaActions() {
  return (
    <div className="cta-row">
      <ContactLink className="btn-white">
        Talk to CBS About Your Practice <Arrow />
      </ContactLink>
      <a href={site.phoneHref} className="phone-link">
        {site.phone}
      </a>
    </div>
  );
}

const STATS = [
  { value: "$750M+", label: "Collected", text: "Collected for CBS customers since 2010." },
  { value: "17-Day", label: "Average reimbursement", text: "Average reimbursement time for CBS customers." },
  { value: "Nationwide", label: "Service", text: "Supporting O&P practices across the country." },
];

export function HelpCta() {
  return (
    <section className="cta cta--mid">
      <div className="container split cta__inner">
        <div className="cta__copy">
          <Eyebrow variant="dark">O&amp;P compliance partner</Eyebrow>
          <h2 className="cta__title">Need help staying ahead of all of this?</h2>
          <p className="cta__body">
            You don’t have to manage compliance alone. CBS Medical Billing &amp; Consulting helps O&amp;P practices
            stay on top of Medicare enrollment, accreditation readiness, coding and reimbursement changes, prior
            authorization requirements, documentation, audits, payer requirements, and operational compliance.
          </p>
          <p className="cta__strong">Let CBS help you identify the gaps before they become problems.</p>
          <CtaActions />
        </div>
      </div>
      <div aria-label="CBS at a glance" role="group" className="stats">
        <div className="stats__grid">
          {STATS.map((s) => (
            <div key={s.label} className="stats__item">
              <div className="stats__value">{s.value}</div>
              <div className="stats__label">{s.label}</div>
              <div className="stats__text">{s.text}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TeamCta() {
  return (
    <section className="cta cta--closing">
      <Puzzle size={260} stroke="#2b5a2b" style={{ right: -70, top: -70, transform: "rotate(-30deg)" }} />
      <div className="container split cta__inner">
        <div className="cta__copy">
          <blockquote className="cta__quote">Compliance shouldn&apos;t begin when the audit letter arrives.</blockquote>
          <p className="cta__body">
            Staying compliant is an ongoing process—not a once-a-year project. CBS Medical Billing &amp; Consulting
            works with O&amp;P practices nationwide to identify compliance gaps, strengthen workflows, prepare for
            audits and accreditation, and protect reimbursement.
          </p>
          <p className="cta__strong">Need help keeping your practice on track? Let CBS be part of your compliance team.</p>
          <CtaActions />
        </div>
      </div>
    </section>
  );
}
