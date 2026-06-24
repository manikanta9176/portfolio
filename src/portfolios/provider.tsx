"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
} from "react";
import {
  DEFAULT_PORTFOLIO_ID,
  getPortfolio,
  isPortfolioId,
  pickRandomPortfolio,
  portfolios,
} from "./registry";
import type { PortfolioDefinition, PortfolioId } from "./types";
import { syncPortfolioFavicon } from "@/lib/portfolio-favicons";
import {
  resolvePortfolioPreference,
  writePortfolioPreference,
} from "@/lib/portfolio-preference";

interface PortfolioContextValue {
  portfolio: PortfolioDefinition;
  portfolioId: PortfolioId;
  portfolios: PortfolioDefinition[];
  ready: boolean;
  setPortfolio: (id: PortfolioId) => void;
  shufflePortfolio: () => void;
}

const PortfolioContext = createContext<PortfolioContextValue | null>(null);

type PortfolioSnapshot = {
  portfolioId: PortfolioId;
  ready: boolean;
};

const SERVER_SNAPSHOT: PortfolioSnapshot = {
  portfolioId: DEFAULT_PORTFOLIO_ID,
  ready: false,
};

let snapshot: PortfolioSnapshot = SERVER_SNAPSHOT;
let clientHydrated = false;
const listeners = new Set<() => void>();

function resolvePortfolioId(): PortfolioId {
  if (typeof window === "undefined") {
    return DEFAULT_PORTFOLIO_ID;
  }

  const domPortfolio = document.documentElement.dataset.portfolio;
  if (isPortfolioId(domPortfolio)) {
    return domPortfolio;
  }

  const portfolioId = resolvePortfolioPreference();
  writePortfolioPreference(portfolioId);
  document.documentElement.dataset.portfolio = portfolioId;
  return portfolioId;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function emitChange() {
  for (const listener of listeners) {
    listener();
  }
}

function getServerSnapshot(): PortfolioSnapshot {
  return SERVER_SNAPSHOT;
}

function getSnapshot(): PortfolioSnapshot {
  if (typeof window === "undefined") {
    return SERVER_SNAPSHOT;
  }

  if (!clientHydrated) {
    clientHydrated = true;
    snapshot = {
      portfolioId: resolvePortfolioId(),
      ready: true,
    };
  }

  return snapshot;
}

function applyPortfolio(id: PortfolioId) {
  snapshot = { portfolioId: id, ready: true };
  writePortfolioPreference(id);
  document.documentElement.dataset.portfolio = id;
  syncPortfolioFavicon(id);
  delete document.body.dataset.mood;
  delete document.body.dataset.cursorSection;
  document.body.classList.remove("custom-cursor");
  window.scrollTo({ top: 0, behavior: "auto" });
  emitChange();
}

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const store = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setPortfolio = useCallback((id: PortfolioId) => {
    applyPortfolio(id);
  }, []);

  const shufflePortfolio = useCallback(() => {
    const currentId = getSnapshot().portfolioId;
    const alternatives = portfolios.filter((portfolio) => portfolio.id !== currentId);
    const next =
      alternatives[Math.floor(Math.random() * alternatives.length)]?.id ??
      pickRandomPortfolio();
    applyPortfolio(next);
  }, []);

  const value = useMemo(
    () => ({
      portfolio: getPortfolio(store.portfolioId),
      portfolioId: store.portfolioId,
      portfolios,
      ready: store.ready,
      setPortfolio,
      shufflePortfolio,
    }),
    [store.portfolioId, store.ready, setPortfolio, shufflePortfolio],
  );

  return (
    <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);

  if (!context) {
    throw new Error("usePortfolio must be used within PortfolioProvider");
  }

  return context;
}
