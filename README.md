# Potnuru Manikanta Portfolio

A premium personal portfolio for Potnuru Manikanta, built to present him as a senior full-stack product engineer with strong React/Next.js craft, backend fluency, CMS/API experience, and recent deployment tooling activity.

The site intentionally avoids a generic portfolio template. It is structured as a compact product story: identity signal, technical range, career trajectory, selected proof, architecture thinking, and direct contact.

## Brand Direction

Research sources included the current LinkedIn PDF, resume, public profile site, old portfolio, public GitHub profile, and recent GitHub activity. The resulting positioning is:

> Full-stack product engineer building fast interfaces, reliable backends, and deployment-ready systems.

The design leans dark, cinematic, precise, and technical without feeling like a terminal clone. It emphasizes the combination of interface craft, system thinking, and shipping discipline.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS v4
- React Server Components by default
- Small client component for command palette, section navigation, and pointer glow
- Dynamic Open Graph image with `next/og`
- Metadata, JSON-LD structured data, sitemap, and robots support

## Local Development

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Useful Commands

```bash
pnpm lint
pnpm build
```

## Content Maintenance

Most professional content lives in `src/lib/profile.ts`.

Update this file when:

- Job title, company, or location changes
- GitHub projects should be featured or removed
- Skill positioning changes
- Contact links change
- The portfolio needs a sharper narrative for a new role type

The page pulls from this typed content model, so changes can be made without rewriting layout components.

## Architecture Notes

- `src/app/page.tsx` owns the portfolio composition and section layout.
- `src/components/interactive-layer.tsx` is the only client-side interaction layer.
- `src/app/layout.tsx` owns metadata and JSON-LD.
- `src/app/opengraph-image.tsx` generates the share image.
- `src/app/sitemap.ts` and `src/app/robots.ts` support crawler discovery.

This keeps the page mostly static and fast while still delivering a premium interactive feel.

## Deployment

The project is ready for Vercel:

1. Import the GitHub repository into Vercel.
2. Use the default Next.js build settings.
3. Set the production domain to `manikanta.net` or the preferred portfolio domain.
4. If the final domain changes, update `siteConfig.url` in `src/lib/profile.ts`.

## Design Decisions

- Dark premium palette with cyan highlights to suggest precision, systems, and modern product engineering.
- Narrative sections instead of a conventional resume page.
- Command palette for memorable interaction without adding heavy animation dependencies.
- Server-rendered content for performance and SEO.
- Dynamic OG image so social previews match the brand.

## Source Signals Used

- Current LinkedIn PDF: senior/full-stack positioning at Analytica.
- Resume: education, early backend work, Java/Spring/GraphQL, ML foundation, CodeChef signal.
- Old portfolio: React, Redux, Next.js, Strapi, Hasura, Firebase, Supabase, project history.
- GitHub: `manikanta9176`, 46 public repositories, recent 2026 deployment and dFlow builder command experiments.
- Biodata site: identity/location confirmation only; private family details were intentionally not used in the professional portfolio.

## Getting Started

First, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
