import type { PortfolioId } from "@/portfolios/types";

export const portfolioSectionIds: Record<PortfolioId, readonly string[]> = {
  editorial: ["intro", "craft", "journey", "work", "contact"],
  noir: ["intro", "signal", "work", "systems", "contact"],
  terminal: ["intro", "craft", "journey", "work", "contact"],
  brutalist: ["intro", "craft", "journey", "work", "contact"],
  swiss: ["intro", "craft", "journey", "work", "contact"],
  bento: ["intro", "craft", "journey", "work", "contact"],
  timeline: ["intro", "craft", "journey", "work", "contact"],
  oddity: ["intro", "craft", "journey", "work", "contact"],
  folio: ["intro", "craft", "journey", "work", "contact"],
};

export function getPortfolioSectionIds(portfolioId: PortfolioId) {
  return portfolioSectionIds[portfolioId];
}
