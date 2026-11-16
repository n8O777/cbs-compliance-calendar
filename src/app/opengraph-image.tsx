import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Social share image, generated at build time in the hero's style and served
// at /opengraph-image. The calendar's metadata (calendars/2027/config.ts)
// points "/" and "/2027" at it for Open Graph and X/Twitter.
export const alt = "Your 2027 O&P compliance calendar, a free O&P compliance resource from CBS Medical Billing & Consulting";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const PUZZLE =
  "M10 30 H38 C34 22 38 12 50 12 C62 12 66 22 62 30 H90 V58 C98 54 108 58 108 70 C108 82 98 86 90 82 V110 H62 C66 102 62 94 50 94 C38 94 34 102 38 110 H10 V82 C18 86 26 82 26 70 C26 58 18 54 10 58 Z";

export default async function Image() {
  const [rubik, encode, logo] = await Promise.all([
    // Literal paths so the build traces only these three files.
    readFile(join(process.cwd(), "src/assets/og/Rubik-Black.ttf")),
    readFile(join(process.cwd(), "src/assets/og/EncodeSans-SemiBold.ttf")),
    readFile(join(process.cwd(), "public/cbs-logo-white.svg")),
  ]);
  const logoSrc = `data:image/svg+xml;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
          background: "#002800",
          color: "#fff",
          padding: "64px 72px",
          fontFamily: "Encode Sans",
        }}
      >
        <svg
          viewBox="0 0 120 120"
          width="420"
          height="420"
          style={{ position: "absolute", right: -70, bottom: -120, transform: "rotate(24deg)" }}
        >
          <path d={PUZZLE} fill="none" stroke="#2b552b" strokeWidth={5} strokeLinejoin="round" />
        </svg>
        <svg
          viewBox="0 0 120 120"
          width="190"
          height="190"
          style={{ position: "absolute", right: 300, top: -30, transform: "rotate(-18deg)" }}
        >
          <path d={PUZZLE} fill="none" stroke="#285228" strokeWidth={5} strokeLinejoin="round" />
        </svg>

        <img src={logoSrc} width={206} height={103} alt="" />

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              alignSelf: "flex-start",
              gap: 12,
              padding: "10px 18px",
              border: "2px solid #3c603c",
              borderRadius: 999,
              color: "#a9d6a9",
              fontSize: 20,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            <div style={{ width: 9, height: 9, borderRadius: 9, background: "#a9d6a9" }} />
            Free O&amp;P compliance resource
          </div>
          <div
            style={{
              fontFamily: "Rubik",
              fontSize: 88,
              lineHeight: 0.98,
              letterSpacing: "-0.015em",
              marginTop: 28,
              maxWidth: 980,
            }}
          >
            Your 2027 O&amp;P compliance calendar
          </div>
          <div style={{ fontSize: 30, color: "#dbe9db", marginTop: 26, maxWidth: 820, lineHeight: 1.4 }}>
            Compliance shouldn&apos;t be managed by memory.
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Rubik", data: rubik, weight: 900, style: "normal" },
        { name: "Encode Sans", data: encode, weight: 600, style: "normal" },
      ],
    },
  );
}
