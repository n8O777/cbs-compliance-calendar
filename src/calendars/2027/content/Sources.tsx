// Copy and links are verbatim from the design handoff (same titles and URLs as
// the client's reference file, with the organization shown as a kicker).
// Do not edit wording without approval.
import { Eyebrow } from "@/components/ui";

interface Source {
  org: string;
  title: string;
  href: string;
  note?: string;
  also?: { title: string; href: string };
}

const SOURCES: Source[] = [
  {
    org: "CMS",
    title: "Prior authorization for certain DMEPOS items",
    href: "https://www.cms.gov/data-research/monitoring-programs/medicare-fee-service-compliance-programs/prior-authorization-and-pre-claim-review-initiatives/prior-authorization-process-certain-durable-medical-equipment-prosthetics-orthotics-and-supplies",
    note: " (upper limb phases, exemption cycle)",
  },
  {
    org: "AOPA · Noridian",
    title: "AOPA: Three important updates from CMS",
    href: "https://aopanet.org/three-important-updates-from-cms/",
    also: {
      title: "Noridian: Face-to-face and WOPD list update, Oct 28, 2026",
      href: "https://med.noridianmedicare.com/web/jadme/article-detail/-/view/6547796/required-list-for-face-to-face-encounter-f2f-and-written-order-prior-to-delivery-wopd-update-effective-october-28-2026",
    },
  },
  {
    org: "HME News",
    title: "CMS updates several DMEPOS lists",
    href: "https://www.hmenews.com/article/cms-updates-several-dmepos-lists",
    note: " (April 13, 2026 prior auth additions)",
  },
  {
    org: "CMS",
    title: "Probationary prior authorization for newly enrolled suppliers",
    href: "https://www.cms.gov/data-research/monitoring-programs/medicare-fee-service-compliance-programs/prior-authorization-pre-claim-review-initiatives/probationary-prior-authorization-process-newly-enrolled-suppliers-certain-durable-medical-equipment",
  },
  {
    org: "eCFR",
    title: "42 CFR 424.540, deactivation of billing privileges",
    href: "https://www.ecfr.gov/current/title-42/chapter-IV/subchapter-B/part-424/subpart-P/section-424.540",
  },
  {
    org: "Palmetto GBA",
    title: "Medicare DMEPOS Supplier Standards, 42 CFR 424.57(c) (Palmetto GBA summary)",
    href: "https://palmettogba.com/palmetto/providers.nsf/files/Abbreviated%20Standards_020816.pdf/$FILE/Abbreviated%20Standards_020816.pdf",
  },
  {
    org: "ABC",
    title: "Navigating DMEPOS accreditation changes",
    href: "https://www.abcop.org/facility-accreditation/navigating-dmepos-accreditation-changes-with-abc",
  },
  {
    org: "CMS",
    title: "Interoperability and Prior Authorization Final Rule (CMS-0057-F)",
    href: "https://www.cms.gov/initiatives/burden-reduction/overview/interoperability/policies-regulations/cms-interoperability-prior-authorization-final-rule-cms-0057-f",
  },
  {
    org: "CMS",
    title: "DMEPOS Prior Authorization Operational Guide",
    href: "https://www.cms.gov/Research-Statistics-Data-and-Systems/Monitoring-Programs/Medicare-FFS-Compliance-Programs/DMEPOS/Downloads/Operational-Guide-for-DMEPOS-PA-current.pdf",
    note: " (exemption cycle dates)",
  },
  {
    org: "CMS",
    title: "Competitive bidding program updates",
    href: "https://www.cms.gov/newsroom/fact-sheets/durable-medical-equipment-prosthetics-orthotics-supplies-competitive-bidding-program-updates",
  },
];

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

export function Sources() {
  return (
    <section id="sources" className="sources section">
      <div className="container">
        <Eyebrow>Where this comes from</Eyebrow>
        <h2 className="h2">Sources</h2>
        <ul className="sources__list">
          {SOURCES.map((s) => (
            <li key={s.href}>
              <span className="sources__org">{s.org}</span>
              <span>
                <a href={s.href} {...ext}>
                  {s.title}
                </a>
                {s.note}
              </span>
              {s.also && (
                <span>
                  and{" "}
                  <a href={s.also.href} {...ext}>
                    {s.also.title}
                  </a>
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
