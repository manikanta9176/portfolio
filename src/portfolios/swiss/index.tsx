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

const sections = [
  { id: "intro", number: "01", label: "Profile" },
  { id: "craft", number: "02", label: "Craft" },
  { id: "journey", number: "03", label: "Journey" },
  { id: "work", number: "04", label: "Work" },
  { id: "contact", number: "05", label: "Contact" },
];

const sectionIds = sections.map((section) => section.id);

function SwissIndexLink({
  active,
  activeIndex,
  index,
  onNavigate,
  section,
}: {
  active: string;
  activeIndex?: number;
  index?: number;
  onNavigate?: () => void;
  section: (typeof sections)[number];
}) {
  const isActive = active === section.id;
  const segmentClasses = [
    isActive ? "swiss-index-link-active" : "",
    index !== undefined && activeIndex !== undefined && index > 0 && index <= activeIndex
      ? "rail-segment-before"
      : "",
    index !== undefined && activeIndex !== undefined && index < activeIndex
      ? "rail-segment-after"
      : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <a
      aria-current={isActive ? "step" : undefined}
      className={segmentClasses || undefined}
      href={`#${section.id}`}
      onClick={onNavigate}
    >
      <span>{section.number}</span>
      <span>{section.label}</span>
    </a>
  );
}

export function SwissPortfolio() {
  const active = useActiveSection(sectionIds);
  const { close, open, openPanel, ref } = useDismissiblePanel();

  const activeSection = sections.find((section) => section.id === active) ?? sections[0];
  const activeIndex = sections.findIndex((section) => section.id === activeSection.id);

  const toggleLabel = (
    <>
      <span className="swiss-index-current-number">{activeSection.number}</span>
      <span className="swiss-index-current-label">{activeSection.label}</span>
      <span aria-hidden="true" className="swiss-index-current-arrow">
        ↓
      </span>
    </>
  );

  return (
    <div className="swiss-portfolio">
      <aside
        className={`swiss-index${open ? " swiss-index-expanded" : ""}`}
        ref={ref}
      >
        <p className="swiss-brand">MP</p>

        <nav aria-label="Section navigation" className="swiss-index-nav">
          <div className="swiss-index-nav-stops">
            {sections.map((section, index) => (
              <SwissIndexLink
                active={active}
                activeIndex={activeIndex}
                index={index}
                key={section.id}
                section={section}
              />
            ))}
          </div>
        </nav>

        <div className="swiss-index-mobile">
          {open ? (
            <button
              aria-controls="swiss-section-nav"
              aria-expanded="true"
              aria-live="polite"
              className="swiss-index-current swiss-index-current-open"
              onClick={close}
              type="button"
            >
              {toggleLabel}
            </button>
          ) : (
            <button
              aria-controls="swiss-section-nav"
              aria-expanded="false"
              aria-live="polite"
              className="swiss-index-current"
              onClick={openPanel}
              type="button"
            >
              {toggleLabel}
            </button>
          )}

          <div
            aria-label="Section progress"
            className="swiss-index-progress"
            role="group"
          >
            {sections.map((section, index) => (
              <a
                aria-current={active === section.id ? "step" : undefined}
                aria-label={section.label}
                className={`swiss-index-progress-segment${
                  index <= activeIndex ? " swiss-index-progress-segment-done" : ""
                }${active === section.id ? " swiss-index-progress-segment-active" : ""}`}
                href={`#${section.id}`}
                key={section.id}
                onClick={close}
              />
            ))}
          </div>
        </div>

        <div
          className={`swiss-index-unfold${open ? " swiss-index-unfold-open" : ""}`}
          hidden={!open}
          id="swiss-section-nav"
        >
          {open ? (
            <nav aria-label="Jump to section" className="swiss-index-mobile-nav">
              {sections.map((section) => (
                <SwissIndexLink
                  active={active}
                  key={section.id}
                  onNavigate={close}
                  section={section}
                />
              ))}
            </nav>
          ) : null}
        </div>

        <div className="swiss-index-footer">
          <PortfolioPicker className="swiss-picker-trigger" label="Layouts" showMeta={false} />
        </div>
      </aside>

      <main className="swiss-main">
        <section className="swiss-panel" id="intro">
          <p className="swiss-kicker">{siteConfig.location}</p>
          <h1>{siteConfig.name}</h1>
          <p className="swiss-role">{siteConfig.role}</p>
          <p>{siteConfig.headline}</p>
          <div className="swiss-metrics">
            {metrics.map((metric) => (
              <div key={metric.label}>
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="swiss-panel" id="craft">
          <h2>Craft</h2>
          <div className="swiss-grid">
            {expertise.map((item) => (
              <article key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="swiss-panel" id="journey">
          <h2>Journey</h2>
          {timeline.map((item) => (
            <article className="swiss-row" key={item.title}>
              <p>{item.period}</p>
              <div>
                <h3>{item.title}</h3>
                <p>{item.organization}</p>
                <p>{item.copy}</p>
              </div>
            </article>
          ))}
        </section>

        <section className="swiss-panel" id="work">
          <h2>Work</h2>
          {projects.map((project) => (
            <article className="swiss-row" key={project.name}>
              <p>{project.year}</p>
              <div>
                <h3>{project.name}</h3>
                <p>{project.copy}</p>
              </div>
            </article>
          ))}
        </section>

        <section className="swiss-panel" id="contact">
          <h2>Contact</h2>
          <a className="swiss-email" href={`mailto:${siteConfig.email}`}>
            {siteConfig.email}
          </a>
        </section>
      </main>
    </div>
  );
}
