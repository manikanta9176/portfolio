"use client";

import { PortfolioPicker } from "@/components/portfolio-picker";
import { useActiveSection } from "@/hooks/use-active-section";
import { useDismissiblePanel } from "@/hooks/use-dismissible-panel";
import {
  expertise,
  metrics,
  projects,
  siteConfig,
  timeline,
} from "@/lib/profile";

const stops = [
  { id: "intro", label: "Start" },
  { id: "craft", label: "Craft" },
  { id: "journey", label: "Journey" },
  { id: "work", label: "Work" },
  { id: "contact", label: "Contact" },
] as const;

const sectionIds = stops.map((stop) => stop.id);

function TimelineStopLink({
  active,
  index,
  onNavigate,
  stop,
}: {
  active: string;
  index: number;
  onNavigate?: () => void;
  stop: (typeof stops)[number];
}) {
  return (
    <a
      className={active === stop.id ? "timeline-node-active" : ""}
      href={`#${stop.id}`}
      onClick={onNavigate}
    >
      <span>{String(index + 1).padStart(2, "0")}</span>
      <span>{stop.label}</span>
    </a>
  );
}

export function TimelinePortfolio() {
  const active = useActiveSection(sectionIds, "-42% 0px -45% 0px");
  const { close, open, openPanel, ref } = useDismissiblePanel();

  const activeStop = stops.find((stop) => stop.id === active) ?? stops[0];
  const activeIndex = stops.findIndex((stop) => stop.id === activeStop.id);

  const railToggleLabel = (
    <>
      <span className="timeline-rail-current-index">
        {String(activeIndex + 1).padStart(2, "0")}
      </span>
      <span className="timeline-rail-current-label">{activeStop.label}</span>
      <span aria-hidden="true" className="timeline-rail-current-arrow">
        ↓
      </span>
    </>
  );

  return (
    <div className="timeline-portfolio">
      <aside
        className={`timeline-rail${open ? " timeline-rail-expanded" : ""}`}
        ref={ref}
      >
        <nav aria-label="Section navigation" className="timeline-rail-nav">
          {stops.map((stop, index) => (
            <TimelineStopLink active={active} index={index} key={stop.id} stop={stop} />
          ))}
        </nav>

        <div className="timeline-rail-mobile">
          {open ? (
            <button
              aria-controls="timeline-section-nav"
              aria-expanded="true"
              aria-live="polite"
              className="timeline-rail-current timeline-rail-current-open"
              onClick={close}
              type="button"
            >
              {railToggleLabel}
            </button>
          ) : (
            <button
              aria-controls="timeline-section-nav"
              aria-expanded="false"
              aria-live="polite"
              className="timeline-rail-current"
              onClick={openPanel}
              type="button"
            >
              {railToggleLabel}
            </button>
          )}

          <div
            aria-label="Section progress"
            className="timeline-rail-progress"
            role="group"
          >
            {stops.map((stop, index) => (
              <a
                aria-current={active === stop.id ? "step" : undefined}
                aria-label={stop.label}
                className={`timeline-rail-progress-segment${
                  index <= activeIndex ? " timeline-rail-progress-segment-done" : ""
                }${active === stop.id ? " timeline-rail-progress-segment-active" : ""}`}
                href={`#${stop.id}`}
                key={stop.id}
                onClick={close}
              />
            ))}
          </div>
        </div>

        <div
          className={`timeline-rail-unfold${open ? " timeline-rail-unfold-open" : ""}`}
          hidden={!open}
          id="timeline-section-nav"
        >
          {open ? (
            <nav aria-label="Jump to section" className="timeline-rail-mobile-nav">
              {stops.map((stop, index) => (
                <TimelineStopLink
                  active={active}
                  index={index}
                  key={stop.id}
                  onNavigate={close}
                  stop={stop}
                />
              ))}
            </nav>
          ) : null}
        </div>

        <PortfolioPicker className="timeline-picker-trigger" label="Switch" showMeta={false} />
      </aside>

      <main className="timeline-main">
        <section className="timeline-panel" id="intro">
          <p className="timeline-kicker">{siteConfig.role}</p>
          <h1>{siteConfig.name}</h1>
          <p>{siteConfig.headline}</p>
          <div className="timeline-metrics">
            {metrics.map((metric) => (
              <div key={metric.label}>
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="timeline-panel timeline-panel-alt" id="craft">
          <h2>Capabilities</h2>
          {expertise.map((item) => (
            <article className="timeline-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </section>

        <section className="timeline-panel" id="journey">
          <h2>Trajectory</h2>
          {timeline.map((item) => (
            <article className="timeline-card" key={item.title}>
              <p>{item.period}</p>
              <h3>{item.title}</h3>
              <p>{item.organization}</p>
              <p>{item.copy}</p>
            </article>
          ))}
        </section>

        <section className="timeline-panel timeline-panel-alt" id="work">
          <h2>Selected work</h2>
          {projects.map((project) => (
            <article className="timeline-card" key={project.name}>
              <p>
                {project.year} · {project.type}
              </p>
              <h3>{project.name}</h3>
              <p>{project.copy}</p>
            </article>
          ))}
        </section>

        <section className="timeline-panel" id="contact">
          <h2>Contact</h2>
          <a className="timeline-email" href={`mailto:${siteConfig.email}`}>
            {siteConfig.email}
          </a>
        </section>
      </main>
    </div>
  );
}
