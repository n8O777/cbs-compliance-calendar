// Wording copied verbatim from the reference file. Do not edit wording without approval.
// The CTA destination intentionally differs: the reference used a mailto: link.
const CTA_HREF = "https://www.cbsmedicalbilling.com/contact/";

export function HelpCta() {
  return (
    <div className="cta">
      <h2>Need help staying ahead of all of this?</h2>
      <p>You don’t have to manage compliance alone. CBS Medical Billing &amp; Consulting helps O&amp;P practices stay on top of Medicare enrollment, accreditation readiness, coding and reimbursement changes, prior authorization requirements, documentation, audits, payer requirements, and operational compliance.</p>
      <p><strong>Let CBS help you identify the gaps before they become problems.</strong></p>
      <a className="cta-link" href={CTA_HREF} target="_blank" rel="noopener noreferrer">Talk to CBS About Your Practice &rarr;</a>
    </div>
  );
}

export function TeamCta() {
  return (
    <div className="cta">
      <blockquote>Compliance shouldn&apos;t begin when the audit letter arrives.</blockquote>
      <p>Staying compliant is an ongoing process—not a once-a-year project. CBS Medical Billing &amp; Consulting works with O&amp;P practices nationwide to identify compliance gaps, strengthen workflows, prepare for audits and accreditation, and protect reimbursement.</p>
      <p><strong>Need help keeping your practice on track? Let CBS be part of your compliance team.</strong></p>
      <a className="cta-link" href={CTA_HREF} target="_blank" rel="noopener noreferrer">Talk to CBS About Your Practice &rarr;</a>
    </div>
  );
}
