// Copy is verbatim from the design handoff. Do not edit wording without approval.
import { ProgressCard } from "@/components/ProgressCard";
import type { ProgressFields } from "@/components/progress";
import { Arrow, Eyebrow, Puzzle } from "@/components/ui";
import { site } from "@/lib/site";

export function Hero({ progress }: { progress: ProgressFields }) {
  return (
    <section id="top" className="hero section">
      <Puzzle size={150} stroke="#285228" style={{ right: "30%", top: -20, transform: "rotate(-18deg)", opacity: 0.9 }} />
      <Puzzle size={300} stroke="#2b552b" style={{ right: -60, bottom: -90, transform: "rotate(24deg)" }} />
      <div className="hero__inner split">
        <div className="hero__copy">
          <Eyebrow variant="dark">Free O&amp;P compliance resource</Eyebrow>
          <h1 className="hero__title">Your 2027 O&amp;P compliance calendar</h1>
          <p className="hero__lead">
            Compliance shouldn&apos;t be managed by memory. Use this calendar to track every deadline, put a name
            next to each one, and set 30- and 60-day reminders before January arrives.
          </p>
          <div className="cta-row">
            <a href="#calendar" className="btn-white">
              Open the 2027 calendar <Arrow />
            </a>
            <a href={site.phoneHref} className="phone-link hero__phone">
              Questions? Call <span>{site.phone}</span>
            </a>
          </div>
          <p className="hero__asof">
            <strong>Regulatory information reviewed and current as of November 1, 2026.</strong> CMS requirements,
            payer policies, and effective dates can change. Verify current requirements with CMS, your DME MAC,
            your accrediting organization, applicable state authorities, and individual payers.
          </p>
        </div>
        <ProgressCard fields={progress} />
      </div>
    </section>
  );
}
