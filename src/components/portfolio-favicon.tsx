"use client";

import { useEffect } from "react";
import { syncPortfolioFavicon } from "@/lib/portfolio-favicons";
import { usePortfolio } from "@/portfolios/provider";

export function PortfolioFavicon() {
  const { portfolioId, ready } = usePortfolio();

  useEffect(() => {
    if (!ready) {
      return;
    }

    syncPortfolioFavicon(portfolioId);
  }, [portfolioId, ready]);

  return null;
}
