"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { PortfolioPicker } from "@/components/portfolio-picker";
import { useActiveSection } from "@/hooks/use-active-section";
import { getPortfolioSectionIds } from "@/lib/portfolio-sections";
import { commands } from "@/lib/profile";

const noirLabels: Record<string, string> = {
  intro: "Intro",
  signal: "Signal",
  work: "Work",
  systems: "Systems",
  contact: "Contact",
};

const sectionIds = getPortfolioSectionIds("noir");
const sections = sectionIds.map((id) => ({
  id,
  label: noirLabels[id] ?? id,
}));

export function InteractiveLayer() {
  const activeSection = useActiveSection(sectionIds, "-38% 0px -50% 0px");
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [pointer, setPointer] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const controller = new AbortController();

    window.addEventListener(
      "pointermove",
      (event) => {
        setPointer({
          x: Math.round((event.clientX / window.innerWidth) * 100),
          y: Math.round((event.clientY / window.innerHeight) * 100),
        });
      },
      { signal: controller.signal, passive: true },
    );

    window.addEventListener(
      "keydown",
      (event) => {
        if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
          event.preventDefault();
          setPaletteOpen((isOpen) => !isOpen);
        }

        if (event.key === "Escape") {
          setPaletteOpen(false);
        }
      },
      { signal: controller.signal },
    );

    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (!paletteOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.body.classList.add("overlay-open");

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.classList.remove("overlay-open");
    };
  }, [paletteOpen]);

  const activeIndex = useMemo(
    () => Math.max(0, sections.findIndex((section) => section.id === activeSection)),
    [activeSection],
  );

  const activeStop = sections[activeIndex] ?? sections[0];

  const commandDialog = paletteOpen ? (
    <div
      aria-modal="true"
      className="noir-command-backdrop"
      onClick={() => setPaletteOpen(false)}
      role="dialog"
    >
      <div
        className="noir-command-panel"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="border-b border-white/10 px-5 py-4">
          <p className="text-xs uppercase tracking-[0.35em] text-cyan-200">
            Command palette
          </p>
          <p className="mt-2 text-sm text-white/55">
            Fast routes to the most important professional signals.
          </p>
        </div>
        <div className="p-3">
          {commands.map((command) => (
            <a
              className="group flex items-center justify-between rounded-2xl px-4 py-4 text-sm text-white/80 transition hover:bg-white/10 hover:text-white"
              href={command.href}
              key={command.label}
              rel="noreferrer"
              target={command.href.startsWith("mailto:") ? undefined : "_blank"}
            >
              <span>{command.label}</span>
              <span className="text-white/30 transition group-hover:translate-x-1 group-hover:text-cyan-200">
                -&gt;
              </span>
            </a>
          ))}
        </div>
        <button
          className="w-full border-t border-white/10 px-5 py-4 text-left text-xs uppercase tracking-[0.28em] text-white/40 transition hover:bg-white/5 hover:text-white/70"
          onClick={() => setPaletteOpen(false)}
          type="button"
        >
          Close
        </button>
      </div>
    </div>
  ) : null;

  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 opacity-70"
        style={{
          background: `radial-gradient(circle at ${pointer.x}% ${pointer.y}%, rgba(125, 211, 252, 0.16), transparent 30rem)`,
        }}
      />

      <nav aria-label="Section navigation" className="noir-desktop-rail">
        {sections.map((section, index) => (
          <a
            aria-current={index === activeIndex ? "location" : undefined}
            aria-label={`Jump to ${section.label}`}
            className={`noir-rail-stop${
              index === activeIndex ? " noir-rail-stop-active" : ""
            }`}
            href={`#${section.id}`}
            key={section.id}
          >
            <span className="noir-rail-stop-label">{section.label}</span>
            <span aria-hidden="true" className="noir-rail-stop-dot" />
          </a>
        ))}
      </nav>

      <nav
        aria-label="Mobile section navigation"
        className="noir-mobile-dock lg:hidden"
      >
        <p aria-live="polite" className="noir-mobile-dock-label">
          <span>{String(activeIndex + 1).padStart(2, "0")}</span>
          <span>{activeStop.label}</span>
        </p>
        <div className="noir-mobile-dock-track" role="group" aria-label="Section progress">
          {sections.map((section, index) => (
            <a
              aria-current={index === activeIndex ? "step" : undefined}
              aria-label={section.label}
              className={`noir-mobile-dock-node${
                index === activeIndex ? " noir-mobile-dock-node-active" : ""
              }${index < activeIndex ? " noir-mobile-dock-node-done" : ""}`}
              href={`#${section.id}`}
              key={section.id}
            />
          ))}
        </div>
      </nav>

      <header className="noir-chrome">
        <a className="noir-mark" href="#intro">
          MP
        </a>
        <div className="noir-chrome-actions">
          <PortfolioPicker className="noir-picker-trigger" showMeta={false} />
          <button
            className="noir-command-trigger"
            onClick={() => setPaletteOpen(true)}
            type="button"
          >
            Command
            <span className="noir-command-kbd">Cmd K</span>
          </button>
        </div>
      </header>

      {commandDialog ? createPortal(commandDialog, document.body) : null}
    </>
  );
}
