import { PortfolioPicker } from "@/components/portfolio-picker";
import {
  expertise,
  metrics,
  projects,
  siteConfig,
  timeline,
} from "@/lib/profile";

export function BentoPortfolio() {
  return (
    <div className="bento-portfolio">
      <header className="bento-topbar">
        <div>
          <p className="bento-kicker">{siteConfig.role}</p>
          <h1>{siteConfig.name}</h1>
        </div>
        <div className="bento-topbar-actions">
          <p>{siteConfig.location}</p>
          <PortfolioPicker className="bento-picker-trigger" label="Layouts" showMeta={false} />
        </div>
      </header>

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
              <p>{item.organization}</p>
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
