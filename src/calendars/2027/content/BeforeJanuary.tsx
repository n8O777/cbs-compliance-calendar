// Copy is verbatim from the design handoff. Do not edit wording without approval.
import { BeforeJanuaryChecklist, BeforeJanuaryProgress } from "@/components/BeforeJanuaryChecklist";
import { Eyebrow } from "@/components/ui";
import { beforeJanuaryChecks } from "../data/before-january";

export function BeforeJanuary() {
  return (
    <section id="before-january" className="before section">
      <div className="container split">
        <div className="before__intro">
          <Eyebrow variant="sage">Before January</Eyebrow>
          <h2 className="h2">Check your 2026 changes</h2>
          <p className="lead before__lead">
            Seven changes from 2026 that should already be part of your workflows when 2027 starts.
          </p>
          <BeforeJanuaryProgress items={beforeJanuaryChecks} />
        </div>
        <BeforeJanuaryChecklist items={beforeJanuaryChecks} />
      </div>
    </section>
  );
}
