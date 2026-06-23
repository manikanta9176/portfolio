import type { Metadata } from "next";
import { DM_Sans, IBM_Plex_Mono, Syne } from "next/font/google";
import { siteConfig } from "@/lib/profile";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Potnuru Manikanta | Senior Full Stack Developer",
    template: "%s | Potnuru Manikanta",
  },
  description: siteConfig.description,
  applicationName: "Potnuru Manikanta Portfolio",
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  keywords: [
    "Potnuru Manikanta",
    "Manikanta Potnuru",
    "Senior Full Stack Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript Developer",
    "Full Stack Engineer Hyderabad",
    "Strapi",
    "Hasura",
    "GraphQL",
  ],
  openGraph: {
    title: "Potnuru Manikanta | Senior Full Stack Developer",
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: "Potnuru Manikanta Portfolio",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Potnuru Manikanta portfolio preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Potnuru Manikanta | Senior Full Stack Developer",
    description: siteConfig.description,
    images: ["/opengraph-image"],
  },
  alternates: {
    canonical: siteConfig.url,
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    jobTitle: siteConfig.role,
    url: siteConfig.url,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Hyderabad",
      addressCountry: "IN",
    },
    sameAs: [siteConfig.github, siteConfig.linkedin, siteConfig.bioProfile],
    knowsAbout: [
      "React",
      "Next.js",
      "TypeScript",
      "Full Stack Development",
      "GraphQL",
      "Strapi",
      "Hasura",
      "Deployment Workflows",
    ],
  };

  return (
    <html
      lang="en"
      className={`${syne.variable} ${dmSans.variable} ${ibmPlexMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
      </body>
    </html>
  );
}
