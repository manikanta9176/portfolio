"use client";

import { useEffect, useMemo, useState } from "react";
import { PortfolioPicker } from "@/components/portfolio-picker";
import { commands } from "@/lib/profile";

const sections = ["intro", "signal", "work", "systems", "contact"];

export function InteractiveLayer() {
  const [activeSection, setActiveSection] = useState(sections[0]);
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
    const observers = sections
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section))
      .map((section) => {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setActiveSection(section.id);
            }
          },
          { rootMargin: "-38% 0px -50% 0px", threshold: 0.01 },
        );

        observer.observe(section);
        return observer;
      });

    return () => observers.forEach((observer) => observer.disconnect());
  }, []);

  const activeIndex = useMemo(
    () => Math.max(0, sections.indexOf(activeSection)),
    [activeSection],
  );

  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 opacity-70"
        style={{
          background: `radial-gradient(circle at ${pointer.x}% ${pointer.y}%, rgba(125, 211, 252, 0.16), transparent 30rem)`,
        }}
      />

      <nav
        aria-label="Section navigation"
        className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 rounded-full border border-white/10 bg-white/[0.03] p-2 shadow-2xl shadow-black/30 backdrop-blur-xl lg:block"
      >
        {sections.map((section, index) => (
          <a
            aria-label={`Jump to ${section}`}
            className={`block h-3 w-3 rounded-full transition ${
              index === activeIndex
                ? "my-4 bg-cyan-200 shadow-[0_0_24px_rgba(125,211,252,0.9)]"
                : "my-3 bg-white/25 hover:bg-white/60"
            }`}
            href={`#${section}`}
            key={section}
          />
        ))}
      </nav>

      <header className="noir-chrome">
        <a className="noir-mark" href="#intro">
          MP
        </a>
        <div className="noir-chrome-actions">
          <PortfolioPicker className="noir-picker-trigger" label="Portfolios" />
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

      {paletteOpen ? (
        <div
          aria-modal="true"
          className="fixed inset-0 z-50 grid place-items-center bg-slate-950/70 px-4 backdrop-blur-md"
          role="dialog"
        >
          <div className="w-full max-w-xl overflow-hidden rounded-[2rem] border border-white/15 bg-[#07101f]/95 shadow-2xl shadow-black/50">
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
      ) : null}
    </>
  );
}
