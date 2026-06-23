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
          color: "white",
          background:
            "radial-gradient(circle at 20% 20%, rgba(34,211,238,0.42), transparent 340px), radial-gradient(circle at 82% 16%, rgba(168,85,247,0.34), transparent 320px), #030712",
          fontFamily: "Arial",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 28,
            letterSpacing: 8,
            textTransform: "uppercase",
            color: "#a5f3fc",
          }}
        >
          <span>{siteConfig.location}</span>
          <span>{siteConfig.role}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 96,
              fontWeight: 900,
              letterSpacing: -8,
              lineHeight: 0.92,
              maxWidth: 980,
            }}
          >
            Potnuru Manikanta
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 34,
              color: "#cbd5e1",
              lineHeight: 1.28,
              maxWidth: 920,
            }}
          >
            Full-stack product engineer building fast interfaces, reliable
            backends, and deployment-ready systems.
          </div>
        </div>
        <div style={{ display: "flex", gap: 18, fontSize: 25, color: "#e2e8f0" }}>
          <span>React</span>
          <span>/</span>
          <span>Next.js</span>
          <span>/</span>
          <span>TypeScript</span>
          <span>/</span>
          <span>GraphQL</span>
          <span>/</span>
          <span>Deployment</span>
        </div>
      </div>
    ),
    size,
  );
}
