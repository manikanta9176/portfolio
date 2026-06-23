import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/profile";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          color: "#111111",
          background: "#ece6da",
          fontFamily: "Arial",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 24,
            letterSpacing: 8,
            textTransform: "uppercase",
            color: "#5f5950",
          }}
        >
          <span>{siteConfig.name}</span>
          <span>{siteConfig.role}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 118,
              fontWeight: 900,
              letterSpacing: -8,
              lineHeight: 0.82,
              textTransform: "uppercase",
            }}
          >
            {siteConfig.displayName[0]}
          </div>
          <div
            style={{
              fontSize: 118,
              fontWeight: 900,
              letterSpacing: -8,
              lineHeight: 0.82,
              textTransform: "uppercase",
              color: "transparent",
              WebkitTextStroke: "2px #111111",
            }}
          >
            {siteConfig.displayName[1]}
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 30,
              color: "#5f5950",
              lineHeight: 1.35,
              maxWidth: 900,
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
          <div style={{ display: "flex", gap: 18, fontSize: 22, color: "#111111" }}>
            <span>React</span>
            <span>/</span>
            <span>Next.js</span>
            <span>/</span>
            <span>TypeScript</span>
            <span>/</span>
            <span>GraphQL</span>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 20,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#5f5950",
            }}
          >
            View portfolio →
          </div>
        </div>
      </div>
    ),
    size,
  );
}
