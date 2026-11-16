// Copy is verbatim from the design handoff. Do not edit wording without approval.
import Image from "next/image";
import { ContactLink } from "@/components/ui";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__top">
          <div className="site-footer__brand">
            <Image src="/cbs-logo-white.svg" alt="CBS Medical Billing & Consulting" width={192} height={96} unoptimized />
            <p>Experienced, people-first billing and revenue cycle partner for Orthotics &amp; Prosthetics practices.</p>
          </div>
          <nav aria-label="Footer" className="site-footer__nav">
            <a href={site.homeUrl}>cbsmedicalbilling.com</a>
            <a href={site.rcmUrl}>Revenue cycle management</a>
            <ContactLink>Contact</ContactLink>
          </nav>
          <address className="site-footer__address">
            19 Hampton Rd, Building B, Unit 16
            <br />
            Exeter, NH 03833
            <br />
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <br />
            <a href={site.phoneHref}>{site.phone}</a>
          </address>
        </div>
        <p className="site-footer__legal">
          This calendar is provided by CBS Medical Billing &amp; Consulting for educational purposes and general
          compliance planning only and is not legal advice. Medicare requirements, effective dates, payer policies,
          and accreditation requirements may change. Practices should verify current requirements with CMS, their
          DME MAC, accrediting organization, applicable state authorities, and individual payers.
        </p>
      </div>
    </footer>
  );
}

/** Branded header shown only on printouts. */
export function PrintHeader() {
  return (
    <div className="print-header print-only">
      <div>
        <div className="print-header__org">CBS Medical Billing &amp; Consulting</div>
        <div className="print-header__title">2027 O&amp;P Compliance Calendar: deadlines and annual self-review</div>
      </div>
      <div className="print-header__meta">
        {site.phone} · {site.email}
        <br />
        Regulatory information reviewed as of October 2, 2026
      </div>
    </div>
  );
}
