"use client";

import { useEffect } from "react";
import { computeSectionScrollTop } from "@/lib/section-scroll";
import { usePortfolio } from "@/portfolios/provider";
import type { PortfolioId } from "@/portfolios/types";

const SCROLL_GAP = "0.85rem";
const BIND_RETRIES_MS = [0, 50, 150, 300, 600];

function resolveChrome(portfolioId: PortfolioId): HTMLElement | null {
  const mobileSideRail = window.matchMedia("(max-width: 959px)").matches;

  switch (portfolioId) {
    case "editorial":
      return document.querySelector<HTMLElement>(".site-header");
    case "noir":
      return document.querySelector<HTMLElement>(".noir-chrome");
    case "terminal":
      return document.querySelector<HTMLElement>(".terminal-chrome");
    case "brutalist":
      return mobileSideRail ? document.querySelector<HTMLElement>(".brutalist-rail") : null;
    case "bento":
      return document.querySelector<HTMLElement>(".bento-topbar");
    case "swiss":
      return mobileSideRail ? document.querySelector<HTMLElement>(".swiss-index") : null;
    case "timeline":
      return mobileSideRail ? document.querySelector<HTMLElement>(".timeline-rail") : null;
    case "oddity":
      return document.querySelector<HTMLElement>(".oddity-booth");
    case "folio":
      return document.querySelector<HTMLElement>(".folio-chrome");
  }
}

function readScrollGapPx(): number {
  const gap = getComputedStyle(document.documentElement).getPropertyValue("--scroll-gap").trim();
  if (!gap || gap === "0px") {
    return 0;
  }

  const probe = document.createElement("div");
  probe.style.position = "absolute";
  probe.style.visibility = "hidden";
  probe.style.pointerEvents = "none";
  probe.style.height = gap;
  document.body.appendChild(probe);
  const pixels = probe.offsetHeight;
  probe.remove();
  return pixels;
}

function measureChromeHeight(portfolioId: PortfolioId): number {
  const chrome = resolveChrome(portfolioId);
  if (!chrome) {
    return 0;
  }

  return Math.ceil(chrome.getBoundingClientRect().height);
}

function applyChromeHeight(portfolioId: PortfolioId) {
  const chromeHeight = measureChromeHeight(portfolioId);
  document.documentElement.style.setProperty("--chrome-height", `${chromeHeight}px`);
  document.documentElement.style.setProperty("--scroll-gap", chromeHeight > 0 ? SCROLL_GAP : "0px");
}

function isSectionAnchor(element: HTMLElement | null): element is HTMLElement {
  return Boolean(element?.matches("section[id], header[id]"));
}

function getSectionScrollTop(id: string, portfolioId: PortfolioId): number | null {
  const section = document.getElementById(id);
  if (!isSectionAnchor(section)) {
    return null;
  }

  const chromeHeight = measureChromeHeight(portfolioId);
  const gap = chromeHeight > 0 ? readScrollGapPx() : 0;

  return computeSectionScrollTop(section, chromeHeight, gap);
}

function scrollToSection(
  id: string,
  portfolioId: PortfolioId,
  behavior: ScrollBehavior = "smooth",
): boolean {
  const top = getSectionScrollTop(id, portfolioId);
  if (top === null) {
    return false;
  }

  window.scrollTo({ top, behavior });
  return true;
}

export function ScrollOffsetSync() {
  const { portfolioId, ready } = usePortfolio();

  useEffect(() => {
    if (!ready) {
      return;
    }

    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    if (window.location.hash) {
      window.scrollTo(0, 0);
    }

    let observer: ResizeObserver | null = null;
    let frame = 0;
    const retryTimers: number[] = [];

    const sync = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        applyChromeHeight(portfolioId);
      });
    };

    const bind = () => {
      observer?.disconnect();
      observer = null;
      sync();

      const chrome = resolveChrome(portfolioId);
      if (!chrome) {
        return;
      }

      observer = new ResizeObserver(sync);
      observer.observe(chrome);
    };

    const scrollToHash = (behavior: ScrollBehavior = "auto") => {
      const hash = window.location.hash;
      if (!hash || hash === "#") {
        return;
      }

      const id = decodeURIComponent(hash.slice(1));
      scrollToSection(id, portfolioId, behavior);
    };

    const onAnchorClick = (event: Event) => {
      const link = (event.target as Element | null)?.closest('a[href^="#"]');
      if (!(link instanceof HTMLAnchorElement)) {
        return;
      }

      const hash = link.getAttribute("href");
      if (!hash || hash === "#") {
        return;
      }

      const id = decodeURIComponent(hash.slice(1));
      if (!isSectionAnchor(document.getElementById(id))) {
        return;
      }

      event.preventDefault();
      window.history.pushState(null, "", hash);
      scrollToSection(id, portfolioId, "smooth");
    };

    const onHashChange = () => {
      scrollToHash("smooth");
    };

    bind();
    for (const delay of BIND_RETRIES_MS) {
      retryTimers.push(
        window.setTimeout(() => {
          bind();
          scrollToHash("auto");
        }, delay),
      );
    }

    const media = window.matchMedia("(max-width: 959px)");
    media.addEventListener("change", bind);
    window.addEventListener("resize", sync);
    document.addEventListener("click", onAnchorClick, true);
    window.addEventListener("hashchange", onHashChange);

    return () => {
      cancelAnimationFrame(frame);
      for (const timer of retryTimers) {
        window.clearTimeout(timer);
      }
      media.removeEventListener("change", bind);
      window.removeEventListener("resize", sync);
      document.removeEventListener("click", onAnchorClick, true);
      window.removeEventListener("hashchange", onHashChange);
      observer?.disconnect();
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "auto";
      }
      document.documentElement.style.setProperty("--chrome-height", "0px");
      document.documentElement.style.setProperty("--scroll-gap", "0px");
    };
  }, [portfolioId, ready]);

  return null;
}
