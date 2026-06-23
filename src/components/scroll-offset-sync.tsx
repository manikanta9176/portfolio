"use client";

import { useEffect } from "react";
import { usePortfolio } from "@/portfolios/provider";
import type { PortfolioId } from "@/portfolios/types";

const SCROLL_GAP = "0.85rem";
const BIND_RETRIES_MS = [0, 50, 150, 300, 600];

const SECTION_TITLE_SELECTOR = [
  ":scope > .terminal-prompt",
  ":scope .section-kicker",
  ":scope > .timeline-kicker",
  ":scope > .brutalist-kicker",
  ":scope > .swiss-kicker",
  ":scope > .bento-kicker",
  ":scope .display-title",
  ":scope > p:first-of-type",
  ":scope h1",
  ":scope h2",
].join(", ");

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
    default:
      return null;
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

function resolveScrollTarget(section: HTMLElement): HTMLElement {
  return section.querySelector<HTMLElement>(SECTION_TITLE_SELECTOR) ?? section;
}

function scrollToSection(
  id: string,
  portfolioId: PortfolioId,
  behavior: ScrollBehavior = "smooth",
) {
  const section = document.getElementById(id);
  if (!isSectionAnchor(section)) {
    return false;
  }

  const target = resolveScrollTarget(section);
  const chromeHeight = measureChromeHeight(portfolioId);
  const gap = chromeHeight > 0 ? readScrollGapPx() : 0;
  const top = Math.max(
    0,
    target.getBoundingClientRect().top + window.scrollY - chromeHeight - gap,
  );

  window.scrollTo({ top, behavior });
  return true;
}

export function ScrollOffsetSync() {
  const { portfolioId, ready } = usePortfolio();

  useEffect(() => {
    if (!ready) {
      return;
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
      scrollToSection(id, portfolioId);
    };

    const onHashChange = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (!id) {
        return;
      }

      scrollToSection(id, portfolioId, "smooth");
    };

    bind();
    for (const delay of BIND_RETRIES_MS) {
      retryTimers.push(window.setTimeout(bind, delay));
    }

    if (window.location.hash) {
      const scrollToHash = () => {
        const id = decodeURIComponent(window.location.hash.slice(1));
        scrollToSection(id, portfolioId, "auto");
      };

      retryTimers.push(window.setTimeout(scrollToHash, 0));
      retryTimers.push(window.setTimeout(scrollToHash, 150));
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
      document.documentElement.style.setProperty("--chrome-height", "0px");
      document.documentElement.style.setProperty("--scroll-gap", "0px");
    };
  }, [portfolioId, ready]);

  return null;
}
