import {
  DEFAULT_PORTFOLIO_ID,
  isPortfolioId,
  PORTFOLIO_STORAGE_KEY,
} from "@/portfolios/registry";
import type { PortfolioId } from "@/portfolios/types";

export function readPortfolioPreference(): PortfolioId | null {
  if (typeof window === "undefined") {
    return null;
  }

  const stored = localStorage.getItem(PORTFOLIO_STORAGE_KEY);
  if (isPortfolioId(stored)) {
    return stored;
  }

  const legacy = sessionStorage.getItem(PORTFOLIO_STORAGE_KEY);
  if (isPortfolioId(legacy)) {
    localStorage.setItem(PORTFOLIO_STORAGE_KEY, legacy);
    sessionStorage.removeItem(PORTFOLIO_STORAGE_KEY);
    return legacy;
  }

  return null;
}

export function writePortfolioPreference(id: PortfolioId) {
  localStorage.setItem(PORTFOLIO_STORAGE_KEY, id);
  sessionStorage.removeItem(PORTFOLIO_STORAGE_KEY);
}

export function resolvePortfolioPreference(): PortfolioId {
  return readPortfolioPreference() ?? DEFAULT_PORTFOLIO_ID;
}
