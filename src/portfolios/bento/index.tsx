"use client";

import { PortfolioPicker } from "@/components/portfolio-picker";
import { useActiveSection } from "@/hooks/use-active-section";
import {
  expertise,
  formatTimelineOrganization,
  metrics,
  projects,
  siteConfig,
  timeline,
} from "@/lib/profile";

const sections = [
  { id: "intro", label: "Profile", short: "In" },
  { id: "craft", label: "Craft", short: "Cr" },
  { id: "journey", label: "Journey", short: "Jr" },
  { id: "work", label: "Work", short: "Wk" },
  { id: "contact", label: "Contact", short: "Ct" },
] as const;

const sectionIds = sections.map((section) => section.id);

export function BentoPortfolio() {
  const active = useActiveSection(sectionIds);
  const activeSection = sections.find((section) => section.id === active) ?? sections[0];
  const activeIndex = sections.findIndex((section) => section.id === activeSection.id);

  return (
    <div className="bento-portfolio">
      <header className="bento-topbar">
        <div>
          <p className="bento-kicker">{siteConfig.role}</p>
          <h1>{siteConfig.name}</h1>
        </div>
        <div className="bento-topbar-actions">
          <PortfolioPicker className="bento-picker-trigger" showMeta={false} />
        </div>
      </header>

      <nav aria-label="Mobile section navigation" className="bento-dock">
        <p aria-live="polite" className="bento-dock-current">
          <span>{String(activeIndex + 1).padStart(2, "0")}</span>
          <span>{activeSection.label}</span>
        </p>
        <div className="bento-dock-tiles" role="group" aria-label="Jump to section">
          {sections.map((section, index) => (
            <a
              aria-current={active === section.id ? "step" : undefined}
              aria-label={section.label}
              className={`bento-dock-tile${
                active === section.id ? " bento-dock-tile-active" : ""
              }${index < activeIndex ? " bento-dock-tile-done" : ""}`}
              href={`#${section.id}`}
              key={section.id}
            >
              <span>{section.short}</span>
            </a>
          ))}
        </div>
      </nav>

      <main className="bento-grid">
        <section className="bento-tile bento-hero" id="intro">
          <p>Profile</p>
          <h2>{siteConfig.headline}</h2>
          <a href={`mailto:${siteConfig.email}`}>Start a project</a>
        </section>

        {metrics.map((metric) => (
          <section className="bento-tile bento-stat" key={metric.label}>
            <strong>{metric.value}</strong>
            <span>{metric.label}</span>
          </section>
        ))}

        <section className="bento-tile bento-wide" id="craft">
          <p>Craft</p>
          <div className="bento-cards">
            {expertise.map((item) => (
              <article key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="bento-tile bento-tall" id="journey">
          <p>Journey</p>
          {timeline.map((item) => (
            <article key={item.title}>
              <span>{item.period}</span>
              <h3>{item.title}</h3>
              <p>{formatTimelineOrganization(item)}</p>
            </article>
          ))}
        </section>

        <section className="bento-tile bento-wide" id="work">
          <p>Selected work</p>
          <div className="bento-projects">
            {projects.map((project) => (
              <article key={project.name}>
                <div>
                  <h3>{project.name}</h3>
                  <p>{project.copy}</p>
                </div>
                <div className="bento-links">
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

        <section className="bento-tile bento-contact" id="contact">
          <p>Contact</p>
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          <div className="bento-links">
            <a href={siteConfig.github} rel="noreferrer" target="_blank">
              GitHub
            </a>
            <a href={siteConfig.linkedin} rel="noreferrer" target="_blank">
              LinkedIn
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
