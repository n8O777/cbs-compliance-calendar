import type { Metadata, Viewport } from "next";
import { Encode_Sans, Rubik } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

// The redesign's type: Rubik for display and UI text, Encode Sans for body
// text. Both are variable fonts, self-hosted by next/font. The CSS refers to
// them through the --font-rubik and --font-encode variables.
const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
});

const encodeSans = Encode_Sans({
  variable: "--font-encode",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: `O&P Compliance Calendar | ${site.organization}`,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#002800",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${rubik.variable} ${encodeSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
