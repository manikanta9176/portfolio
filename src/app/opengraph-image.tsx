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

const paper = "#ece6da";
const paperDeep = "#ddd4c4";
const ink = "#111111";
const muted = "#5f5950";
const accent = "#d62828";

export default async function OpenGraphImage() {
  const syne = await readFile(join(process.cwd(), "public/fonts/syne-800.woff"));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "56px 64px 52px",
          background: `linear-gradient(145deg, ${paper} 0%, ${paperDeep} 100%)`,
          color: ink,
          fontFamily: "Syne",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 22,
              fontWeight: 800,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: muted,
            }}
          >
            {siteConfig.name}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 22,
              fontWeight: 800,
              letterSpacing: 5,
              textTransform: "uppercase",
              color: muted,
            }}
          >
            {siteConfig.role}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 0,
            marginTop: -12,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 132,
              fontWeight: 800,
              lineHeight: 0.84,
              letterSpacing: -8,
              textTransform: "uppercase",
              color: ink,
            }}
          >
            {siteConfig.displayName[0]}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 132,
              fontWeight: 800,
              lineHeight: 0.84,
              letterSpacing: -8,
              textTransform: "uppercase",
              color: "transparent",
              WebkitTextStroke: `2px ${ink}`,
            }}
          >
            {siteConfig.displayName[1]}
          </div>
          <div
            style={{
              display: "flex",
              width: 72,
              height: 6,
              marginTop: 28,
              background: accent,
            }}
          />
          <div
            style={{
              display: "flex",
              marginTop: 24,
              maxWidth: 920,
              fontSize: 30,
              lineHeight: 1.35,
              color: muted,
            }}
          >
            {siteConfig.headline}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 14,
              fontSize: 24,
              fontWeight: 800,
              color: ink,
            }}
          >
            <span>React</span>
            <span style={{ color: "rgba(17,17,17,0.28)" }}>/</span>
            <span>Next.js</span>
            <span style={{ color: "rgba(17,17,17,0.28)" }}>/</span>
            <span>TypeScript</span>
            <span style={{ color: "rgba(17,17,17,0.28)" }}>/</span>
            <span>GraphQL</span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              borderRadius: 999,
              padding: "14px 28px",
              background: ink,
              color: paper,
              fontSize: 24,
              fontWeight: 800,
              letterSpacing: 1,
              textTransform: "uppercase",
            }}
          >
            Open portfolio
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
