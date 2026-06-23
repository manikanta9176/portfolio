"use client";

import type { ComponentType } from "react";
import { PortfolioCursor } from "@/components/portfolio-cursor";
import { PortfolioFavicon } from "@/components/portfolio-favicon";
import { ScrollOffsetSync } from "@/components/scroll-offset-sync";
import { usePortfolio } from "@/portfolios/provider";
import { BrutalistPortfolio } from "@/portfolios/brutalist";
import { BentoPortfolio } from "@/portfolios/bento";
import { EditorialPortfolio } from "@/portfolios/editorial";
import { NoirPortfolio } from "@/portfolios/noir";
import { SwissPortfolio } from "@/portfolios/swiss";
import { TerminalPortfolio } from "@/portfolios/terminal";
import { TimelinePortfolio } from "@/portfolios/timeline";
import type { PortfolioId } from "@/portfolios/types";

const portfolioViews: Record<PortfolioId, ComponentType> = {
  editorial: EditorialPortfolio,
  noir: NoirPortfolio,
  terminal: TerminalPortfolio,
  brutalist: BrutalistPortfolio,
  swiss: SwissPortfolio,
  bento: BentoPortfolio,
  timeline: TimelinePortfolio,
};

export function PortfolioRouter() {
  const { portfolioId, ready } = usePortfolio();

  if (!ready) {
    return (
      <div aria-busy="true" aria-label="Loading portfolio" className="portfolio-boot" />
    );
  }

  const View = portfolioViews[portfolioId];
  return (
    <>
      <PortfolioFavicon />
      <PortfolioCursor />
      <ScrollOffsetSync />
      <View />
    </>
  );
}
