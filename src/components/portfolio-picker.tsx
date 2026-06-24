"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { PortfolioSwitcher } from "@/components/portfolio-switcher";
import { usePortfolio } from "@/portfolios/provider";
import { dispatchSiteCursorSync } from "@/lib/site-cursor";

interface PortfolioPickerProps {
  className?: string;
}

export function PortfolioPicker({ className = "" }: PortfolioPickerProps) {
  const { portfolioId, portfolio } = usePortfolio();
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    triggerRef.current?.setAttribute("aria-expanded", open ? "true" : "false");
  }, [open]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.body.classList.add("overlay-open");
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.classList.remove("overlay-open");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const dialogCopy = {
    editorial: {
      kicker: "Switch portfolio",
      title: "Same story, different editorial rhythm.",
    },
    noir: {
      kicker: "Layout channel",
      title: "Pick another interface for the same signal.",
    },
    terminal: {
      kicker: "$ layouts --list",
      title: "Select a portfolio shell to mount.",
    },
    brutalist: {
      kicker: "Layout switch",
      title: "Same content. Loud different frame.",
    },
    swiss: {
      kicker: "Index",
      title: "Choose another grid system.",
    },
    bento: {
      kicker: "Dashboard",
      title: "Swap the card architecture.",
    },
    timeline: {
      kicker: "Route",
      title: "Jump to another journey layout.",
    },
    oddity: {
      kicker: "Gift shop exit",
      title: "Leave this hall for another dimension of the same person.",
    },
  }[portfolioId];

  const dialog = open ? (
      <div
        aria-modal="true"
        className={`portfolio-picker-backdrop portfolio-picker-backdrop-${portfolioId}`}
        onClick={() => setOpen(false)}
        onPointerMove={(event) =>
          dispatchSiteCursorSync(event.clientX, event.clientY)
        }
        role="dialog"
      >
        <div
          className={`portfolio-picker-panel portfolio-picker-panel-${portfolioId}`}
          onClick={(event) => event.stopPropagation()}
        >
          <div className="portfolio-picker-head">
            <div>
              <p className="portfolio-picker-kicker">{dialogCopy.kicker}</p>
              <p className="portfolio-picker-title">{dialogCopy.title}</p>
            </div>
            <button
              className="portfolio-picker-close"
              onClick={() => setOpen(false)}
              type="button"
            >
              Close
            </button>
          </div>
          <PortfolioSwitcher onSelect={() => setOpen(false)} variant={portfolioId} />
        </div>
      </div>
    ) : null;

  return (
    <>
      <button
        ref={triggerRef}
        aria-haspopup="dialog"
        aria-label={`Current look: ${portfolio.label}. Change look.`}
        className={`portfolio-picker-trigger portfolio-picker-trigger-${portfolioId} ${className}`.trim()}
        onClick={(event) => {
          dispatchSiteCursorSync(event.clientX, event.clientY);
          setOpen(true);
        }}
        type="button"
      >
        <span className="portfolio-picker-trigger-copy">
          <span className="portfolio-picker-trigger-name">{portfolio.label}</span>
          <span aria-hidden="true" className="portfolio-picker-trigger-chevron">
            ▾
          </span>
        </span>
      </button>

      {dialog ? createPortal(dialog, document.body) : null}
    </>
  );
}
