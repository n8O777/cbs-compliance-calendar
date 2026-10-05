const MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/**
 * Formats the date `days` calendar days before `iso` (a date input value,
 * YYYY-MM-DD) as "Mon D, YYYY". Returns "" when the value can't be parsed.
 * UTC arithmetic keeps the result independent of the visitor's timezone.
 * Ported unchanged from the reference implementation.
 */
export function minus(iso: string, days: number): string {
  const p = iso.split("-").map(Number);
  if (p.length !== 3 || !p[0]) return "";
  const d = new Date(Date.UTC(p[0], p[1] - 1, p[2] - days));
  return MON.at(d.getUTCMonth()) + " " + d.getUTCDate() + ", " + d.getUTCFullYear();
}
