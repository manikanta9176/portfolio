import type { PortfolioDefinition, PortfolioId } from "./types";

export const PORTFOLIO_STORAGE_KEY = "portfolio-variant";
export const DEFAULT_PORTFOLIO_ID = "editorial" satisfies PortfolioId;

export const portfolios: PortfolioDefinition[] = [
  {
    id: "editorial",
    label: "Editorial Studio",
    tagline: "Warm editorial scroll experience with spine navigation",
  },
  {
    id: "noir",
    label: "Noir Cinematic",
    tagline: "Original dark glass portfolio from the first release",
  },
  {
    id: "terminal",
    label: "Terminal Shell",
    tagline: "CLI-inspired session with command blocks and logs",
  },
  {
    id: "brutalist",
    label: "Brutalist Poster",
    tagline: "Oversized type, hard rules, poster-like sections",
  },
  {
    id: "swiss",
    label: "Swiss Index",
    tagline: "Fixed numeric index rail with editorial content panels",
  },
  {
    id: "bento",
    label: "Bento Board",
    tagline: "Dashboard grid of cards for every story block",
  },
  {
    id: "timeline",
    label: "Timeline Rail",
    tagline: "Vertical journey line with alternating story panels",
  },
];

export const portfolioIds = portfolios.map((portfolio) => portfolio.id);

export function isPortfolioId(value: string | null | undefined): value is PortfolioId {
  return Boolean(value && portfolioIds.includes(value as PortfolioId));
}

export function getPortfolio(id: PortfolioId): PortfolioDefinition {
  return portfolios.find((portfolio) => portfolio.id === id) ?? portfolios[0];
}

export function pickRandomPortfolio(): PortfolioId {
  return portfolios[Math.floor(Math.random() * portfolios.length)]!.id;
}
