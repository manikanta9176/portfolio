"use client";

import { PortfolioPicker } from "@/components/portfolio-picker";
import { useActiveSection } from "@/hooks/use-active-section";
import { useDismissiblePanel } from "@/hooks/use-dismissible-panel";
import {
  expertise,
  formatTimelineOrganization,
  metrics,
  principles,
  projects,
  siteConfig,
  timeline,
} from "@/lib/profile";

const sections = [
  { id: "intro", label: "Start" },
  { id: "craft", label: "Craft" },
  { id: "journey", label: "Path" },
  { id: "work", label: "Work" },
  { id: "contact", label: "Contact" },
] as const;

const sectionIds = sections.map((section) => section.id);

function BrutalistStopLink({
  active,
  activeIndex,
  index,
  onNavigate,
  section,
}: {
  active: string;
  activeIndex?: number;
  index: number;
  onNavigate?: () => void;
  section: (typeof sections)[number];
}) {
  const isActive = active === section.id;
  const segmentClasses = [
    isActive ? "brutalist-rail-link-active" : "",
    activeIndex !== undefined && index > 0 && index <= activeIndex
      ? "rail-segment-before"
      : "",
    activeIndex !== undefined && index < activeIndex ? "rail-segment-after" : "",
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
      <span>{String(index + 1).padStart(2, "0")}</span>
      <span>{section.label}</span>
    </a>
  );
}

export function BrutalistPortfolio() {
  const active = useActiveSection(sectionIds);
  const { close, open, openPanel, ref } = useDismissiblePanel();

  const activeSection = sections.find((section) => section.id === active) ?? sections[0];
  const activeIndex = sections.findIndex((section) => section.id === activeSection.id);

  const toggleLabel = (
    <>
      <span className="brutalist-rail-current-index">
        {String(activeIndex + 1).padStart(2, "0")}
      </span>
      <span className="brutalist-rail-current-label">{activeSection.label}</span>
    </>
  );

  return (
    <div className="brutalist-portfolio">
      <aside
        className={`brutalist-rail${open ? " brutalist-rail-expanded" : ""}`}
        ref={ref}
      >
        <nav aria-label="Section navigation" className="brutalist-rail-nav">
          <div className="brutalist-rail-nav-stops">
            {sections.map((section, index) => (
              <BrutalistStopLink
                active={active}
                activeIndex={activeIndex}
                index={index}
                key={section.id}
                section={section}
              />
            ))}
          </div>
        </nav>

        <div className="brutalist-rail-mobile">
          {open ? (
            <button
              aria-controls="brutalist-section-nav"
              aria-expanded="true"
              className="brutalist-rail-current"
              onClick={close}
              type="button"
            >
              {toggleLabel}
            </button>
          ) : (
            <button
              aria-controls="brutalist-section-nav"
              aria-expanded="false"
              className="brutalist-rail-current"
              onClick={openPanel}
              type="button"
            >
              {toggleLabel}
            </button>
          )}

          <div
            aria-label="Section progress"
            className="brutalist-rail-blocks"
            role="group"
          >
            {sections.map((section, index) => (
              <a
                aria-current={active === section.id ? "step" : undefined}
                aria-label={section.label}
                className={`brutalist-rail-block${
                  index <= activeIndex ? " brutalist-rail-block-done" : ""
                }${active === section.id ? " brutalist-rail-block-active" : ""}`}
                href={`#${section.id}`}
                key={section.id}
                onClick={close}
              />
            ))}
          </div>
        </div>

        <div
          className={`brutalist-rail-unfold${open ? " brutalist-rail-unfold-open" : ""}`}
          hidden={!open}
          id="brutalist-section-nav"
        >
          {open ? (
            <nav aria-label="Jump to section" className="brutalist-rail-mobile-nav">
              {sections.map((section, index) => (
                <BrutalistStopLink
                  active={active}
                  activeIndex={activeIndex}
                  index={index}
                  key={section.id}
                  onNavigate={close}
                  section={section}
                />
              ))}
            </nav>
          ) : null}
        </div>

        <div className="brutalist-rail-footer">
          <PortfolioPicker className="brutalist-rail-picker" showMeta={false} />
        </div>
      </aside>

      <div className="brutalist-main">
      <header className="brutalist-hero" id="intro">
        <p className="brutalist-kicker">{siteConfig.role}</p>
        <h1>
          {siteConfig.displayName[0]}
          <br />
          {siteConfig.displayName[1]}
        </h1>
        <p className="brutalist-lede">{siteConfig.headline}</p>
        <div className="brutalist-metrics">
          {metrics.map((metric) => (
            <div key={metric.label}>
              <span>{metric.value}</span>
              <p>{metric.label}</p>
            </div>
          ))}
        </div>
      </header>

      <section className="brutalist-section" id="craft">
        <h2>CAPABILITIES</h2>
        <div className="brutalist-stack">
          {expertise.map((item, index) => (
            <article key={item.title}>
              <p>0{index + 1}</p>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="brutalist-section" id="journey">
        <h2>TRAJECTORY</h2>
        {timeline.map((item) => (
          <article className="brutalist-row" key={item.title}>
            <p>{item.period}</p>
            <div>
              <h3>{item.title}</h3>
              <p>{formatTimelineOrganization(item)}</p>
              <p>{item.copy}</p>
            </div>
          </article>
        ))}
        <div className="brutalist-principles">
          {principles.map((principle) => (
            <p key={principle}>{principle}</p>
          ))}
        </div>
      </section>

      <section className="brutalist-section" id="work">
        <h2>WORK</h2>
        {projects.map((project) => (
          <article className="brutalist-project" key={project.name}>
            <div>
              <p>{project.type}</p>
              <h3>{project.name}</h3>
            </div>
            <p>{project.copy}</p>
            <div className="brutalist-links">
              {project.links.map((link) => (
                <a href={link.href} key={link.href} rel="noreferrer" target="_blank">
                  {link.label}
                </a>
              ))}
            </div>
          </article>
        ))}
      </section>

      <section className="brutalist-section brutalist-contact" id="contact">
        <h2>CONTACT</h2>
        <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
        <div className="brutalist-links">
          <a href={siteConfig.github} rel="noreferrer" target="_blank">
            GitHub
          </a>
          <a href={siteConfig.linkedin} rel="noreferrer" target="_blank">
            LinkedIn
          </a>
        </div>
      </section>
      </div>
    </div>
  );
}
