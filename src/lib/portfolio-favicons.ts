import type { PortfolioId } from "@/portfolios/types";

export const DEFAULT_PORTFOLIO_FAVICON: PortfolioId = "editorial";

export function getPortfolioFaviconHref(portfolioId: PortfolioId) {
  return `/favicons/${portfolioId}.svg`;
}

export function syncPortfolioFavicon(portfolioId: PortfolioId) {
  if (typeof document === "undefined") {
    return;
  }

  const href = getPortfolioFaviconHref(portfolioId);
  const link =
    document.querySelector<HTMLLinkElement>('link[data-portfolio-icon]') ??
    document.querySelector<HTMLLinkElement>('link[rel="icon"]');

  if (link) {
    link.href = href;
    link.type = "image/svg+xml";
    link.setAttribute("data-portfolio-icon", "true");
    return;
  }

  const icon = document.createElement("link");
  icon.rel = "icon";
  icon.type = "image/svg+xml";
  icon.href = href;
  icon.setAttribute("data-portfolio-icon", "true");
  document.head.appendChild(icon);
}
