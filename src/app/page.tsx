import { Calendar2027 } from "@/calendars/2027/Calendar2027";
import { metadata as calendar2027Metadata } from "@/calendars/2027/config";

// "/" always shows the *current* calendar. While 2027 is current it renders
// the same calendar as "/2027" (not a redirect), and both routes share one
// localStorage key, so entries made on either URL appear on both. When a newer
// calendar ships, switch this file to that calendar; "/2027" stays as-is.
export const metadata = calendar2027Metadata;

export default function CurrentCalendarPage() {
  return <Calendar2027 />;
}
