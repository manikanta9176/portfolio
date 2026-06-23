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

const stops = [
  { id: "intro", label: "Start" },
  { id: "craft", label: "Craft" },
  { id: "journey", label: "Journey" },
  { id: "work", label: "Work" },
  { id: "contact", label: "Contact" },
];

export function TimelinePortfolio() {
  const [active, setActive] = useState("intro");

  useEffect(() => {
    const observers = stops
      .map((stop) => document.getElementById(stop.id))
      .filter((section): section is HTMLElement => Boolean(section))
      .map((section) => {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setActive(section.id);
            }
          },
          { rootMargin: "-42% 0px -45% 0px", threshold: 0.01 },
        );
        observer.observe(section);
        return observer;
      });

    return () => observers.forEach((observer) => observer.disconnect());
  }, []);

  return (
    <div className="timeline-portfolio">
      <aside className="timeline-rail">
        {stops.map((stop, index) => (
          <a
            className={active === stop.id ? "timeline-node-active" : ""}
            href={`#${stop.id}`}
            key={stop.id}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            <span>{stop.label}</span>
          </a>
        ))}
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
