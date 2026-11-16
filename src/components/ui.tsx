// Small presentational pieces shared across sections. No state, so these
// render on the server or inside client components alike.

import type { ComponentProps, CSSProperties, ReactNode } from "react";
import type { DateType } from "@/lib/types";
import { site } from "@/lib/site";

export function Eyebrow({
  children,
  variant = "light",
  className = "",
}: {
  children: ReactNode;
  variant?: "light" | "sage" | "dark";
  className?: string;
}) {
  const mod = variant === "light" ? "" : ` eyebrow--${variant}`;
  return <div className={`eyebrow${mod} ${className}`.trim()}>{children}</div>;
}

const PUZZLE_PATH =
  "M10 30 H38 C34 22 38 12 50 12 C62 12 66 22 62 30 H90 V58 C98 54 108 58 108 70 C108 82 98 86 90 82 V110 H62 C66 102 62 94 50 94 C38 94 34 102 38 110 H10 V82 C18 86 26 82 26 70 C26 58 18 54 10 58 Z";

/** Decorative outlined puzzle piece. Position and rotation come from `style`. */
export function Puzzle({ size, stroke, style }: { size: number; stroke: string; style: CSSProperties }) {
  return (
    <svg className="puzzle" viewBox="0 0 120 120" width={size} height={size} aria-hidden="true" style={style}>
      <path d={PUZZLE_PATH} style={{ stroke }} />
    </svg>
  );
}

export function ProgressBar({ done, total, className = "" }: { done: number; total: number; className?: string }) {
  return (
    <div className={`bar ${className}`.trim()}>
      <span style={{ width: percent(done, total) }} />
    </div>
  );
}

export function percent(done: number, total: number): string {
  return (total ? Math.round((done / total) * 100) : 0) + "%";
}

export function Mark({ type, size }: { type: DateType | "all"; size?: number }) {
  return (
    <span
      aria-hidden="true"
      className={`mark mark--${type}`}
      style={size ? ({ "--mark": `${size}px` } as CSSProperties) : undefined}
    />
  );
}

export function StatusTag({ type, label }: { type: DateType; label: string }) {
  return (
    <span className={`tag tag--${type}`}>
      <Mark type={type} />
      {label}
    </span>
  );
}

/** Link to the CBS contact page. Opens in a new tab (a deliberate change from the design). */
export function ContactLink(props: Omit<ComponentProps<"a">, "href" | "target" | "rel">) {
  return <a {...props} href={site.contactUrl} target="_blank" rel="noopener noreferrer" />;
}

export function Arrow() {
  return <span aria-hidden="true">→</span>;
}
