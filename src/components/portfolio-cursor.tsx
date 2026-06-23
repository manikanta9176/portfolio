"use client";

import { useEffect, useRef, useState } from "react";
import { useActiveSection } from "@/hooks/use-active-section";
import { getPortfolioSectionIds } from "@/lib/portfolio-sections";
import { SITE_CURSOR_SYNC } from "@/lib/site-cursor";
import { usePortfolio } from "@/portfolios/provider";

export function PortfolioCursor() {
  const { portfolioId, ready } = usePortfolio();
  const sectionIds = getPortfolioSectionIds(portfolioId);
  const activeSection = useActiveSection(sectionIds, "-42% 0px -45% 0px");
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const cursorRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!ready) {
      return;
    }

    const controller = new AbortController();

    const syncCursor = (x: number, y: number) => {
      cursorRef.current = { x, y };
      setCursor({ x, y });
    };

    const onPointerMove = (event: PointerEvent) => {
      syncCursor(event.clientX, event.clientY);
    };

    const onCursorSync = (event: Event) => {
      const { x, y } = (event as CustomEvent<{ x: number; y: number }>).detail;
      syncCursor(x, y);
    };

    window.addEventListener("pointermove", onPointerMove, {
      passive: true,
      signal: controller.signal,
    });
    window.addEventListener(SITE_CURSOR_SYNC, onCursorSync, {
      signal: controller.signal,
    });

    return () => controller.abort();
  }, [ready]);

  useEffect(() => {
    if (!ready) {
      return;
    }

    document.body.classList.add("custom-cursor");
    const section = activeSection || sectionIds[0] || "intro";
    document.body.dataset.cursorSection = section;

    if (portfolioId === "editorial") {
      document.body.dataset.mood = section;
    }

    return () => {
      document.body.classList.remove("custom-cursor");
      delete document.body.dataset.cursorSection;

      if (portfolioId === "editorial") {
        delete document.body.dataset.mood;
      }
    };
  }, [activeSection, portfolioId, ready, sectionIds]);

  if (!ready) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className={`cursor-ring cursor-ring-${portfolioId} hidden lg:block`}
      style={{
        transform: `translate3d(${cursor.x}px, ${cursor.y}px, 0) rotate(var(--cursor-rotate, 0deg))`,
      }}
    />
  );
}
