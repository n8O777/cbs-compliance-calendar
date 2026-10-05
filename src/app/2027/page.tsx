import { Calendar2027 } from "@/calendars/2027/Calendar2027";
import { metadata as calendar2027Metadata } from "@/calendars/2027/config";

// Permanent archive URL for the 2027 calendar. Keep this route unchanged in
// future years.
export const metadata = calendar2027Metadata;

export default function Calendar2027Page() {
  return <Calendar2027 />;
}
