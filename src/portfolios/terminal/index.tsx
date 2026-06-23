"use client";

import { PortfolioPicker } from "@/components/portfolio-picker";
import { useActiveSection } from "@/hooks/use-active-section";
import {
  commands,
  expertise,
  metrics,
  projects,
  siteConfig,
  timeline,
} from "@/lib/profile";

const sections = [
  { id: "intro", label: "whoami" },
  { id: "craft", label: "capabilities" },
  { id: "journey", label: "experience.log" },
  { id: "work", label: "projects" },
  { id: "contact", label: "contact.env" },
] as const;

const sectionIds = sections.map((section) => section.id);

export function TerminalPortfolio() {
  const active = useActiveSection(sectionIds, "-42% 0px -45% 0px");
  const activeSection = sections.find((section) => section.id === active) ?? sections[0];

  return (
    <div className="terminal-portfolio">
      <div className="terminal-chrome">
        <header className="terminal-titlebar">
          <div className="terminal-dots">
            <span />
            <span />
            <span />
          </div>
          <p>manikanta@portfolio — bash — 80×24</p>
          <PortfolioPicker className="terminal-picker-trigger" label="layouts" showMeta={false} />
        </header>

        <nav aria-label="Section navigation" className="terminal-tabs">
          {sections.map((section) => (
            <a
              aria-current={active === section.id ? "page" : undefined}
              className={active === section.id ? "terminal-tab-active" : ""}
              href={`#${section.id}`}
              key={section.id}
            >
              <span className="terminal-tab-prompt">$</span>
              <span>cd {section.label}</span>
            </a>
          ))}
        </nav>

        <p aria-live="polite" className="terminal-session-line">
          <span className="terminal-session-prompt">$</span> pwd{" "}
          <span className="terminal-session-path">~/{activeSection.label}</span>
        </p>
      </div>

      <main className="terminal-body">
        <section className="terminal-block" id="intro">
          <p className="terminal-prompt">$ whoami</p>
          <h1>{siteConfig.name}</h1>
          <p className="terminal-muted">{siteConfig.role} · {siteConfig.location}</p>
          <p className="terminal-output">{siteConfig.headline}</p>
          <p className="terminal-output">
            Full-stack product engineer building interfaces, APIs, and deployment-ready
            systems.
          </p>
        </section>

        <section className="terminal-block" id="craft">
          <p className="terminal-prompt">$ ls ./capabilities/</p>
          <div className="terminal-grid">
            {expertise.map((item) => (
              <article className="terminal-card" key={item.title}>
                <p className="terminal-file">{item.title.toLowerCase().replace(/\s+/g, "-")}.md</p>
                <p>{item.copy}</p>
                <p className="terminal-tags">{item.stack.join(" · ")}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="terminal-block" id="journey">
          <p className="terminal-prompt">$ tail -n 3 experience.log</p>
          {timeline.map((item) => (
            <article className="terminal-log" key={item.title}>
              <p className="terminal-log-meta">
                [{item.period}] {item.organization}
              </p>
              <h2>{item.title}</h2>
              <p>{item.copy}</p>
            </article>
          ))}
        </section>

        <section className="terminal-block" id="work">
          <p className="terminal-prompt">$ git log --oneline --projects</p>
          {projects.map((project) => (
            <article className="terminal-log" key={project.name}>
              <p className="terminal-log-meta">
                {project.year} · {project.type}
              </p>
              <h2>{project.name}</h2>
              <p>{project.copy}</p>
              <div className="terminal-links">
                {project.links.map((link) => (
                  <a href={link.href} key={link.href} rel="noreferrer" target="_blank">
                    {link.label}
                  </a>
                ))}
              </div>
            </article>
          ))}
        </section>

        <section className="terminal-block" id="contact">
          <p className="terminal-prompt">$ cat contact.env</p>
          <p className="terminal-output">EMAIL={siteConfig.email}</p>
          <p className="terminal-output">GITHUB={siteConfig.github}</p>
          <p className="terminal-output">LINKEDIN={siteConfig.linkedin}</p>
          <div className="terminal-links">
            {commands.map((command) => (
              <a
                href={command.href}
                key={command.label}
                rel="noreferrer"
                target={command.href.startsWith("mailto:") ? undefined : "_blank"}
              >
                {command.label}
              </a>
            ))}
          </div>
        </section>

        <section className="terminal-block">
          <p className="terminal-prompt">$ stats --brief</p>
          <div className="terminal-stats">
            {metrics.map((metric) => (
              <div key={metric.label}>
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
