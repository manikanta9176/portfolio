import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { siteConfig } from "@/lib/profile";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export const alt = `${siteConfig.name} portfolio preview`;

const accent = "#f59e0b";
const accentSoft = "rgba(245, 158, 11, 0.35)";

export default async function OpenGraphImage() {
  const syne = await readFile(join(process.cwd(), "public/fonts/syne-800.woff"));

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
          background: "#0b0b0b",
          fontFamily: "Syne",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "56%",
            height: "100%",
            padding: "56px 64px",
            background:
              "linear-gradient(160deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.015) 38%, rgba(0,0,0,0.2) 100%), #242424",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 18,
              maxWidth: 580,
            }}
          >
            <div
              style={{
                display: "flex",
                color: "#ffffff",
                fontSize: 46,
                fontWeight: 800,
                lineHeight: 1.12,
                letterSpacing: -1.5,
              }}
            >
              {`${titleName} | ${siteConfig.role}`}
            </div>

            <div
              style={{
                display: "flex",
                alignSelf: "flex-start",
                borderRadius: 999,
                padding: "16px 34px",
                background: accent,
                color: "#111111",
                fontSize: 28,
                fontWeight: 800,
                letterSpacing: 0.5,
                boxShadow: `0 0 0 1px rgba(255,255,255,0.08), 0 10px 40px ${accentSoft}`,
              }}
            >
              Read More
            </div>
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            top: -60,
            left: "55.5%",
            width: 18,
            height: 820,
            background: accent,
            transform: "rotate(13deg)",
            boxShadow: `0 0 30px ${accentSoft}`,
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "44%",
            height: "100%",
            padding: "48px 52px 44px 72px",
            background: "#0f0f0f",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 22,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                fontSize: 118,
                fontWeight: 800,
                lineHeight: 0.88,
                letterSpacing: -6,
                color: "transparent",
                WebkitTextStroke: "2px rgba(255,255,255,0.92)",
                textTransform: "uppercase",
              }}
            >
              {siteConfig.displayName[0]}
            </div>
            <div
              style={{
                fontSize: 30,
                lineHeight: 1.35,
                color: "rgba(255,255,255,0.78)",
                maxWidth: 430,
              }}
            >
              {siteConfig.headline}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 8,
              fontSize: 24,
              fontWeight: 800,
              color: "rgba(255,255,255,0.9)",
              letterSpacing: 0.5,
            }}
          >
            <span>React</span>
            <span style={{ color: "rgba(255,255,255,0.28)" }}>/</span>
            <span>Next.js</span>
            <span style={{ color: "rgba(255,255,255,0.28)" }}>/</span>
            <span>TypeScript</span>
            <span style={{ color: "rgba(255,255,255,0.28)" }}>/</span>
            <span>GraphQL</span>
            <span style={{ color: "rgba(255,255,255,0.28)" }}>/</span>
            <span>Deployment</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Syne",
          data: syne,
          style: "normal",
          weight: 800,
        },
      ],
    },
  );
}
