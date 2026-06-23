"use client";

import { useEffect, useState } from "react";
import { PortfolioPicker } from "@/components/portfolio-picker";
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

export function SwissPortfolio() {
  const [active, setActive] = useState("intro");

  useEffect(() => {
    const observers = sections
      .map((section) => document.getElementById(section.id))
      .filter((section): section is HTMLElement => Boolean(section))
      .map((section) => {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setActive(section.id);
            }
          },
          { rootMargin: "-40% 0px -45% 0px", threshold: 0.01 },
        );
        observer.observe(section);
        return observer;
      });

    return () => observers.forEach((observer) => observer.disconnect());
  }, []);

  return (
    <div className="swiss-portfolio">
      <aside className="swiss-index">
        <p className="swiss-brand">MP</p>
        <nav>
          {sections.map((section) => (
            <a
              className={active === section.id ? "swiss-index-link-active" : ""}
              href={`#${section.id}`}
              key={section.id}
            >
              <span>{section.number}</span>
              <span>{section.label}</span>
            </a>
          ))}
        </nav>
        <PortfolioPicker className="swiss-picker-trigger" label="Layouts" />
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
