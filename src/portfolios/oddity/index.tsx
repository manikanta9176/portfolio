"use client";

import { useCallback, useEffect, useState } from "react";
import { PortfolioPicker } from "@/components/portfolio-picker";
import {
  expertise,
  formatTimelineOrganization,
  metrics,
  principles,
  projects,
  siteConfig,
  timeline,
} from "@/lib/profile";

const halls = [
  {
    id: "intro",
    label: "Admissions",
    code: "A-∞",
    warning: "Do not feed the engineer",
  },
  {
    id: "craft",
    label: "Specimen Wing",
    code: "B-12?",
    warning: "Live APIs behind glass",
  },
  {
    id: "journey",
    label: "Geology Pit",
    code: "C-04",
    warning: "Strata may contain internships",
  },
  {
    id: "work",
    label: "Evidence Locker",
    code: "D-7½",
    warning: "Red strings are load-bearing",
  },
  {
    id: "contact",
    label: "Payphone Alcove",
    code: "E-00",
    warning: "Calls recorded for quality",
  },
] as const;

type HallId = (typeof halls)[number]["id"];

function isHallId(value: string): value is HallId {
  return halls.some((hall) => hall.id === value);
}

function readHallFromHash(): HallId {
  if (typeof window === "undefined") {
    return "intro";
  }

  const hash = window.location.hash.replace("#", "");
  return isHallId(hash) ? hash : "intro";
}

function OddityHallContent({ hall }: { hall: HallId }) {
  const meta = halls.find((item) => item.id === hall) ?? halls[0];

  switch (hall) {
    case "intro":
      return (
        <section className="oddity-hall oddity-hall-admissions oddity-hall-active" id="intro">
          <div className="oddity-warning">{meta.warning}</div>
          <article className="oddity-ticket-stub">
            <p className="oddity-placard">Admit one human · non-transferable</p>
            <h1>{siteConfig.displayName.join(" ")}</h1>
            <p className="oddity-role">{siteConfig.role}</p>
            <p className="oddity-copy">{siteConfig.headline}</p>
            <ul className="oddity-metrics-ticket">
              {metrics.map((metric) => (
                <li key={metric.label}>
                  <strong>{metric.value}</strong>
                  <span>{metric.label}</span>
                </li>
              ))}
            </ul>
          </article>
          <div aria-hidden="true" className="oddity-sticker oddity-sticker-a">
            PROPERTY OF MANIKANTA
          </div>
          <div aria-hidden="true" className="oddity-sticker oddity-sticker-b">
            NOT A RESUME
          </div>
        </section>
      );
    case "craft":
      return (
        <section className="oddity-hall oddity-hall-specimens oddity-hall-active" id="craft">
          <div className="oddity-warning">Caution: sharp TypeScript</div>
          <header className="oddity-hall-head">
            <p className="oddity-placard">Specimen Wing · climate controlled at 72°F</p>
            <h2>Capabilities in formaldehyde</h2>
          </header>
          <div className="oddity-jar-grid">
            {expertise.map((item, index) => (
              <article className="oddity-jar" key={item.title}>
                <p className="oddity-jar-label">Jar #{index + 1}</p>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
                <div className="oddity-jar-tags">
                  {item.stack.map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>
      );
    case "journey":
      return (
        <section className="oddity-hall oddity-hall-geology oddity-hall-active" id="journey">
          <div className="oddity-warning">Dig site · hard hat optional</div>
          <header className="oddity-hall-head">
            <p className="oddity-placard">Geology Pit · sediment samples 2019–present</p>
            <h2>Career strata</h2>
          </header>
          <div className="oddity-strata">
            {timeline.map((item) => (
              <article className="oddity-strata-layer" key={item.title}>
                <p className="oddity-strata-era">{item.period}</p>
                <h3>{item.title}</h3>
                <p className="oddity-strata-org">{formatTimelineOrganization(item)}</p>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
          <ul className="oddity-principles">
            {principles.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </section>
      );
    case "work":
      return (
        <section className="oddity-hall oddity-hall-evidence oddity-hall-active" id="work">
          <div className="oddity-warning">Active investigation</div>
          <header className="oddity-hall-head">
            <p className="oddity-placard">Evidence Locker · case file MP-2026</p>
            <h2>Projects pinned with red yarn</h2>
          </header>
          <div className="oddity-board">
            {projects.map((project) => (
              <article className="oddity-polaroid" key={project.name}>
                <p className="oddity-polaroid-type">{project.type}</p>
                <h3>{project.name}</h3>
                <p>{project.copy}</p>
                <div className="oddity-polaroid-links">
                  {project.links.map((link) => (
                    <a href={link.href} key={link.href} rel="noreferrer" target="_blank">
                      {link.label}
                    </a>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>
      );
    case "contact":
      return (
        <section className="oddity-hall oddity-hall-payphone oddity-hall-active" id="contact">
          <div className="oddity-warning">Quarter optional · Wi-Fi required</div>
          <header className="oddity-hall-head">
            <p className="oddity-placard">Payphone Alcove · dial tone included</p>
            <h2>Start a transmission</h2>
          </header>
          <div className="oddity-payphone">
            <p className="oddity-payphone-screen">{siteConfig.email}</p>
            <div className="oddity-payphone-keys">
              <a href={`mailto:${siteConfig.email}`}>Email</a>
              <a href={siteConfig.linkedin}>LinkedIn</a>
              <a href={siteConfig.github}>GitHub</a>
              <a href={siteConfig.url}>Site</a>
            </div>
          </div>
          <p className="oddity-footnote">
            Open to full-stack product work, React/Next.js builds, CMS platforms, and teams
            that appreciate a little weirdness in the interface.
          </p>
        </section>
      );
  }
}

export function OddityPortfolio() {
  const [hall, setHall] = useState<HallId>("intro");

  const hallIndex = halls.findIndex((item) => item.id === hall);
  const current = halls[hallIndex] ?? halls[0];

  const goToHall = useCallback((id: HallId) => {
    setHall(id);
    window.history.replaceState(null, "", `#${id}`);
  }, []);

  const stepHall = useCallback(
    (delta: number) => {
      const next = halls[hallIndex + delta];
      if (next) {
        goToHall(next.id);
      }
    },
    [goToHall, hallIndex],
  );

  useEffect(() => {
    setHall(readHallFromHash());

    const onHashChange = () => {
      setHall(readHallFromHash());
    };

    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    document.body.dataset.cursorSection = hall;
    document.documentElement.dataset.oddityHall = hall;
  }, [hall]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        stepHall(1);
      }

      if (event.key === "ArrowLeft") {
        stepHall(-1);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [stepHall]);

  return (
    <div className="oddity-portfolio">
      <header className="oddity-booth">
        <div className="oddity-booth-ticket">
          <p className="oddity-booth-kicker">Museum of Potnuru · Est. probably 2026</p>
          <p className="oddity-booth-title">Oddity Museum</p>
          <p className="oddity-booth-meta">
            Hall {current.code} · {current.label}
          </p>
        </div>
        <div className="oddity-booth-actions">
          <PortfolioPicker className="oddity-picker-trigger" />
          <p aria-live="polite" className="oddity-booth-counter">
            Exhibit {hallIndex + 1} of {halls.length} (give or take)
          </p>
        </div>
      </header>

      <nav aria-label="Museum floor plan" className="oddity-floorplan">
        <p className="oddity-floorplan-label">Floor plan (not to scale)</p>
        <div className="oddity-floorplan-dial" role="tablist">
          {halls.map((item) => (
            <button
              aria-current={hall === item.id ? "true" : undefined}
              className={`oddity-floorplan-node${
                hall === item.id ? " oddity-floorplan-node-active" : ""
              }`}
              key={item.id}
              onClick={() => goToHall(item.id)}
              role="tab"
              type="button"
            >
              <span>{item.code}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
        <div className="oddity-floorplan-arrows">
          <button
            disabled={hallIndex === 0}
            onClick={() => stepHall(-1)}
            type="button"
          >
            ← Prev hall
          </button>
          <button
            disabled={hallIndex === halls.length - 1}
            onClick={() => stepHall(1)}
            type="button"
          >
            Next hall →
          </button>
        </div>
      </nav>

      <main className="oddity-stage">
        <OddityHallContent hall={hall} key={hall} />
      </main>

      <aside aria-hidden="true" className="oddity-marquee-wall">
        <p>NO FLASH PHOTOGRAPHY · NO FLASH PHOTOGRAPHY · NO FLASH PHOTOGRAPHY ·</p>
      </aside>
    </div>
  );
}
