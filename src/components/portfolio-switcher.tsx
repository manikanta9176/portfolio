"use client";

import { usePortfolio } from "@/portfolios/provider";
import type { PortfolioId } from "@/portfolios/types";

interface PortfolioSwitcherProps {
  compact?: boolean;
  onSelect?: () => void;
  variant: PortfolioId;
}

export function PortfolioSwitcher({
  compact = false,
  onSelect,
  variant,
}: PortfolioSwitcherProps) {
  const { portfolioId, portfolios, setPortfolio, shufflePortfolio } = usePortfolio();

  return (
    <div
      className={`portfolio-switcher portfolio-switcher-${variant} ${compact ? "portfolio-switcher-compact" : ""}`.trim()}
    >
      <div className="portfolio-switcher-head">
        <div>
          <p className="portfolio-switcher-kicker">Same site, different look</p>
          {!compact ? (
            <p className="portfolio-switcher-copy">
              Pick the version that feels right to you. Your choice is remembered.
            </p>
          ) : null}
        </div>
        <button
          className="portfolio-shuffle"
          onClick={shufflePortfolio}
          type="button"
        >
          Random
        </button>
      </div>
      <div
        aria-label="Choose a look"
        className="portfolio-switcher-grid"
        role="radiogroup"
      >
        {portfolios.map((item) => {
          const isActive = portfolioId === item.id;
          const chipProps = {
            className: `portfolio-chip ${isActive ? "portfolio-chip-active" : ""}`,
            onClick: () => {
              setPortfolio(item.id);
              onSelect?.();
            },
            type: "button" as const,
          };
          const chipContent = (
            <>
              <span className="portfolio-chip-label">{item.label}</span>
              <span className="portfolio-chip-tagline">{item.tagline}</span>
            </>
          );

          return isActive ? (
            <button aria-checked="true" key={item.id} role="radio" {...chipProps}>
              {chipContent}
            </button>
          ) : (
            <button aria-checked="false" key={item.id} role="radio" {...chipProps}>
              {chipContent}
            </button>
          );
        })}
      </div>
    </div>
  );
}
