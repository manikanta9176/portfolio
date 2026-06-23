import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/profile";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

const accent = "#f5a623";
const accentGlow = "rgba(245, 166, 35, 0.55)";

export default function OpenGraphImage() {
  const titleName = `${siteConfig.displayName[1]} ${siteConfig.displayName[0]}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          background: "#121212",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "58%",
            height: "100%",
            padding: "64px 72px",
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 42%, rgba(0,0,0,0.15) 100%), #2a2a2a",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
              maxWidth: 620,
              color: "#ffffff",
              fontSize: 52,
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: -1,
            }}
          >
            <span>{titleName} |</span>
            <span>{siteConfig.role}</span>
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 48,
              borderRadius: 999,
              padding: "22px 42px",
              background: accent,
              color: "#151515",
              fontSize: 34,
              fontWeight: 800,
              letterSpacing: 1,
              boxShadow: `0 0 28px ${accentGlow}, 0 0 56px rgba(245, 166, 35, 0.28)`,
            }}
          >
            Read More
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            top: -80,
            left: "54%",
            width: 28,
            height: 900,
            background: accent,
            transform: "rotate(14deg)",
            boxShadow: `0 0 24px ${accentGlow}`,
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "42%",
            height: "100%",
            padding: "56px 48px 52px 64px",
            background: "#101010",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div
              style={{
                fontSize: 92,
                fontWeight: 800,
                lineHeight: 0.95,
                letterSpacing: -4,
                color: "#f3f3f3",
              }}
            >
              {siteConfig.displayName[0]}
            </div>
            <div
              style={{
                fontSize: 34,
                lineHeight: 1.35,
                color: "rgba(255,255,255,0.72)",
                maxWidth: 420,
              }}
            >
              {siteConfig.headline}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 10,
              fontSize: 28,
              fontWeight: 700,
              color: "rgba(255,255,255,0.88)",
            }}
          >
            <span>React</span>
            <span style={{ color: "rgba(255,255,255,0.35)" }}>/</span>
            <span>Next.js</span>
            <span style={{ color: "rgba(255,255,255,0.35)" }}>/</span>
            <span>TypeScript</span>
            <span style={{ color: "rgba(255,255,255,0.35)" }}>/</span>
            <span>GraphQL</span>
            <span style={{ color: "rgba(255,255,255,0.35)" }}>/</span>
            <span>Deployment</span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
