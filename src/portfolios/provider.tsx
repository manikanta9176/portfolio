"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
} from "react";
import {
  getPortfolio,
  isPortfolioId,
  pickRandomPortfolio,
  PORTFOLIO_STORAGE_KEY,
  portfolios,
} from "./registry";
import type { PortfolioDefinition, PortfolioId } from "./types";

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
  portfolioId: "editorial",
  ready: false,
};

let snapshot: PortfolioSnapshot = SERVER_SNAPSHOT;
let clientHydrated = false;
const listeners = new Set<() => void>();

function resolvePortfolioId(): PortfolioId {
  if (typeof window === "undefined") {
    return "editorial";
  }

  const domPortfolio = document.documentElement.dataset.portfolio;
  if (isPortfolioId(domPortfolio)) {
    return domPortfolio;
  }

  const stored = sessionStorage.getItem(PORTFOLIO_STORAGE_KEY);
  if (isPortfolioId(stored)) {
    return stored;
  }

  const randomPortfolio = pickRandomPortfolio();
  sessionStorage.setItem(PORTFOLIO_STORAGE_KEY, randomPortfolio);
  document.documentElement.dataset.portfolio = randomPortfolio;
  return randomPortfolio;
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
  sessionStorage.setItem(PORTFOLIO_STORAGE_KEY, id);
  document.documentElement.dataset.portfolio = id;
  delete document.body.dataset.mood;
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
