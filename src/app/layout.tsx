import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Public_Sans } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

// Self-hosted versions of the reference's Google Fonts request: Bricolage
// Grotesque (opsz 12..96; 500/700 fall within its variable weight range) and
// Public Sans 400/500/600. Keeping Public Sans to these weights matters: the
// reference's bold text renders with the 600 face, not a true 700.
// globals.css refers to these fonts by family name, exactly as the reference
// CSS does; the variables are applied only so the @font-face rules load.
const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  axes: ["opsz"],
});

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: `O&P Compliance Calendar | ${site.organization}`,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${bricolage.variable} ${publicSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
