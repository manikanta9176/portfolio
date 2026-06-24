import type { Metadata } from "next";
import { Caveat, Cinzel, DM_Sans, IBM_Plex_Mono, JetBrains_Mono, Syne } from "next/font/google";
import { PortfolioProvider } from "@/portfolios/provider";
import { DEFAULT_PORTFOLIO_ID, PORTFOLIO_STORAGE_KEY, portfolioIds } from "@/portfolios/registry";
import { siteConfig, timeline } from "@/lib/profile";
import "./globals.css";
import "./site-cursor.css";
import "./portfolios.css";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

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

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Senior Full Stack Developer`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.metaDescription,
  applicationName: `${siteConfig.name} Portfolio`,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  keywords: [
    "Manikanta Potnuru",
    "Potnuru Manikanta",
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
    title: `${siteConfig.name} | Senior Full Stack Developer`,
    description: siteConfig.headline,
    url: siteConfig.url,
    siteName: `${siteConfig.name} Portfolio`,
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} portfolio preview`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Senior Full Stack Developer`,
    description: siteConfig.headline,
    images: ["/opengraph-image"],
  },
  alternates: {
    canonical: siteConfig.url,
  },
  icons: {
    icon: [{ url: "/favicons/editorial.svg", type: "image/svg+xml" }],
    shortcut: [{ url: "/favicons/editorial.svg", type: "image/svg+xml" }],
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
    workLocation: {
      "@type": "Place",
      name: timeline[0]?.organization ?? "Current office",
      address: {
        "@type": "PostalAddress",
        addressLocality: timeline[0]?.location ?? "Hyderabad",
        addressCountry: "IN",
      },
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

  const portfolioInitScript = `(function(){var k=${JSON.stringify(PORTFOLIO_STORAGE_KEY)};var t=${JSON.stringify(portfolioIds)};var d=${JSON.stringify(DEFAULT_PORTFOLIO_ID)};var s=localStorage.getItem(k);if(!s||t.indexOf(s)<0){try{var legacy=sessionStorage.getItem(k);if(legacy&&t.indexOf(legacy)>=0){s=legacy;}}catch(e){}}if(!s||t.indexOf(s)<0){s=d;}localStorage.setItem(k,s);try{sessionStorage.removeItem(k);}catch(e){}document.documentElement.dataset.portfolio=s;var i=document.querySelector('link[data-portfolio-icon],link[rel=\"icon\"]');if(!i){i=document.createElement('link');i.rel='icon';document.head.appendChild(i);}i.type='image/svg+xml';i.setAttribute('data-portfolio-icon','true');i.href='/favicons/'+s+'.svg';})();`;

  return (
    <html
      lang="en"
      className={`${syne.variable} ${dmSans.variable} ${ibmPlexMono.variable} ${jetBrainsMono.variable} ${caveat.variable} ${cinzel.variable} h-full antialiased`}
      data-portfolio="editorial"
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: portfolioInitScript }}
          suppressHydrationWarning
        />
      </head>
      <body className="flex min-h-full flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <PortfolioProvider>{children}</PortfolioProvider>
      </body>
    </html>
  );
}
