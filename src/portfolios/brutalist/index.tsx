import { PortfolioPicker } from "@/components/portfolio-picker";
import {
  expertise,
  metrics,
  principles,
  projects,
  siteConfig,
  timeline,
} from "@/lib/profile";

export function BrutalistPortfolio() {
  return (
    <div className="brutalist-portfolio">
      <header className="brutalist-hero" id="intro">
        <p className="brutalist-kicker">{siteConfig.role}</p>
        <h1>
          {siteConfig.displayName[0]}
          <br />
          {siteConfig.displayName[1]}
        </h1>
        <p className="brutalist-lede">{siteConfig.headline}</p>
        <PortfolioPicker className="brutalist-picker-trigger" label="Switch layout" />
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
              <p>{item.organization}</p>
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
  );
}
