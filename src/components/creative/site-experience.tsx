"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { PortfolioPicker } from "@/components/portfolio-picker";
import { PortfolioSwitcher } from "@/components/portfolio-switcher";
import { useActiveSection } from "@/hooks/use-active-section";
import { commands, navSections, siteConfig } from "@/lib/profile";

export function SiteExperience() {
  const [ready, setReady] = useState(false);
  const sectionIds = useMemo(() => navSections.map((section) => section.id), []);
  const activeSection = useActiveSection(sectionIds, "-42% 0px -45% 0px", ready);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setReady(true), 1200);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    const onScroll = () => {
      const max =
        document.documentElement.scrollHeight - window.innerHeight || 1;
      setScrollProgress(Math.min(1, window.scrollY / max));
      setScrolled(window.scrollY > 24);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setPaletteOpen((open) => !open);
      }

      if (event.key === "Escape") {
        setPaletteOpen(false);
      }
    };

    window.addEventListener("scroll", onScroll, {
      passive: true,
      signal: controller.signal,
    });
    window.addEventListener("keydown", onKeyDown, { signal: controller.signal });
    onScroll();

    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (!paletteOpen) {
      return;
    }

    document.body.classList.add("overlay-open");

    return () => {
      document.body.classList.remove("overlay-open");
    };
  }, [paletteOpen]);

  const activeIndex = useMemo(
    () => Math.max(0, navSections.findIndex((section) => section.id === activeSection)),
    [activeSection],
  );

  const activeNav = navSections[activeIndex];

  return (
    <>
      <AnimatePresence>
        {!ready ? (
          <motion.div
            animate={{ opacity: 0 }}
            className="preloader"
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
            initial={{ opacity: 1 }}
            key="preloader"
          >
            <motion.p
              animate={{ opacity: [0.2, 1, 0.2] }}
              className="preloader-label"
              transition={{ duration: 1.1, repeat: Infinity }}
            >
              Loading studio
            </motion.p>
            <motion.h2
              animate={{ y: [12, 0], opacity: [0, 1] }}
              className="preloader-name"
              initial={{ y: 12, opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              {siteConfig.displayName.join(" ")}
            </motion.h2>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div
        aria-hidden="true"
        className="scroll-progress"
        style={{ transform: `scaleX(${scrollProgress})` }}
      />

      <header className={`site-header ${scrolled ? "site-header-scrolled" : ""}`}>
        <div className="site-header-start">
          <a className="site-mark" href="#intro">
            MP
          </a>
          <p aria-live="polite" className="header-chapter">
            <span className="header-chapter-number">{activeNav.number}</span>
            <span className="header-chapter-label">{activeNav.label}</span>
          </p>
        </div>

        <div className="site-header-end">
          <p className="site-status">{siteConfig.location}</p>
          <PortfolioPicker className="site-command" label="Portfolios" showMeta={false} />
          <button
            className="site-command"
            onClick={() => setPaletteOpen(true)}
            type="button"
          >
            Connect
          </button>
        </div>
      </header>

      <nav aria-label="Section progress" className="progress-spine">
        <div aria-hidden="true" className="progress-spine-track">
          <div
            aria-hidden="true"
            className="progress-spine-fill"
            style={{ transform: `scaleY(${scrollProgress})` }}
          />
        </div>
        {navSections.map((section, index) => (
          <a
            aria-current={index === activeIndex ? "step" : undefined}
            aria-label={section.label}
            className={`progress-spine-node ${index === activeIndex ? "progress-spine-node-active" : ""}`}
            href={`#${section.id}`}
            key={section.id}
          >
            <span className="progress-spine-label">
              <span className="progress-spine-number">{section.number}</span>
              <span className="progress-spine-text">{section.label}</span>
            </span>
            <span className="progress-spine-dot" />
          </a>
        ))}
      </nav>

      <nav aria-label="Mobile section navigation" className="mobile-section-nav">
        <div aria-label="Section progress" className="mobile-section-progress" role="group">
          {navSections.map((section, index) => (
            <a
              aria-current={index === activeIndex ? "step" : undefined}
              aria-label={section.label}
              className={`mobile-section-progress-segment${
                index <= activeIndex ? " mobile-section-progress-segment-done" : ""
              }${index === activeIndex ? " mobile-section-progress-segment-active" : ""}`}
              href={`#${section.id}`}
              key={section.id}
            />
          ))}
        </div>
        <div className="mobile-section-links">
          {navSections.map((section, index) => (
            <a
              aria-current={index === activeIndex ? "step" : undefined}
              aria-label={section.label}
              className={`mobile-section-link ${index === activeIndex ? "mobile-section-link-active" : ""}`}
              href={`#${section.id}`}
              key={section.id}
              title={section.label}
            >
              <span className="mobile-section-link-number">{section.number}</span>
              {index === activeIndex ? (
                <span className="mobile-section-link-label">{section.label}</span>
              ) : null}
            </a>
          ))}
        </div>
      </nav>

      {paletteOpen ? (
        <div
          aria-modal="true"
          className="palette-backdrop"
          role="dialog"
        >
          <div className="palette-panel">
            <div className="palette-head">
              <p className="section-kicker">Connect</p>
              <button
                className="palette-close"
                onClick={() => setPaletteOpen(false)}
                type="button"
              >
                Close
              </button>
            </div>
            <div className="palette-sections palette-sections-mobile">
              {navSections.map((section) => (
                <a
                  className="palette-section-link"
                  href={`#${section.id}`}
                  key={section.id}
                  onClick={() => setPaletteOpen(false)}
                >
                  <span>{section.number}</span>
                  <span>{section.label}</span>
                </a>
              ))}
            </div>
            <div className="palette-links">
              <PortfolioSwitcher onSelect={() => setPaletteOpen(false)} variant="editorial" />
              {commands.map((command) => (
                <a
                  className="palette-link"
                  href={command.href}
                  key={command.label}
                  rel="noreferrer"
                  target={command.href.startsWith("mailto:") ? undefined : "_blank"}
                >
                  {command.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
