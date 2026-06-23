import { MarqueeBand } from "@/components/creative/marquee-band";
import { ProjectRail } from "@/components/creative/project-rail";
import { SiteExperience } from "@/components/creative/site-experience";
import {
  expertise,
  metrics,
  principles,
  projects,
  siteConfig,
  timeline,
} from "@/lib/profile";

export default function Home() {
  return (
    <div className="relative">
      <SiteExperience />
      <main>
        <section className="section-shell mood-band mood-band-intro hero-grid" id="intro">
          <div>
            <p className="section-kicker">{siteConfig.role}</p>
            <h1 className="hero-name-line">{siteConfig.displayName[0]}</h1>
            <h1 className="hero-name-line hero-name-line-accent">
              {siteConfig.displayName[1]}
            </h1>
          </div>

          <div className="hero-footer">
            <div>
              <p className="max-w-2xl text-lg leading-8 text-[var(--muted)] sm:text-xl">
                {siteConfig.headline} I design interfaces with editorial clarity,
                engineer systems with full-stack range, and ship products that feel
                considered from prototype to deployment.
              </p>
              <div className="mt-8 flex flex-wrap gap-6">
                <a className="text-link" href="#work">
                  Selected work
                </a>
                <a className="text-link" href={`mailto:${siteConfig.email}`}>
                  Start a project
                </a>
              </div>
            </div>

            <div className="metric-grid">
              {metrics.map((metric) => (
                <div className="metric-card" key={metric.label}>
                  <p className="metric-value">{metric.value}</p>
                  <p className="metric-label">{metric.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <MarqueeBand />

        <section className="section-shell mood-band mood-band-craft py-24 sm:py-32" id="craft">
          <div className="max-w-3xl">
            <p className="section-kicker">Capabilities</p>
            <h2 className="display-title mt-5">
              Craft across surface, system, and ship.
            </h2>
            <p className="mt-6 text-lg leading-8 text-[var(--muted)]">
              The work spans polished product interfaces, composable backend layers,
              and the deployment mechanics that turn ideas into production reality.
            </p>
          </div>

          <div className="craft-grid mt-14">
            {expertise.map((item, index) => (
              <article className="craft-card" key={item.title}>
                <p className="craft-number">0{index + 1} / {item.eyebrow}</p>
                <h3 className="craft-title">{item.title}</h3>
                <p className="craft-copy">{item.copy}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {item.stack.map((skill) => (
                    <span className="tag" key={skill}>
                      {skill}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section-shell mood-band mood-band-journey py-24 sm:py-32" id="journey">
          <div className="max-w-3xl">
            <p className="section-kicker">Trajectory</p>
            <h2 className="display-title mt-5">
              From backend discipline to product systems.
            </h2>
          </div>

          <div className="journey-list mt-14">
            {timeline.map((item) => (
              <article className="journey-item" key={item.title}>
                <p className="journey-period">{item.period}</p>
                <div>
                  <h3 className="journey-title">{item.title}</h3>
                  <p className="journey-org">{item.organization}</p>
                </div>
                <div>
                  <p className="journey-copy">{item.copy}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {item.proof.map((proof) => (
                      <span className="tag" key={proof}>
                        {proof}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="principle-stack">
            {principles.map((principle, index) => (
              <div className="principle-line" key={principle}>
                <span className="principle-index">0{index + 1}</span>
                <p className="principle-text">{principle}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section-shell mood-band mood-band-work py-24 sm:py-32" id="work">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="section-kicker">Selected work</p>
              <h2 className="display-title mt-5">
                Proof in shipped experiments and product surfaces.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-7 text-[var(--muted)]">
              Scroll the rail to explore repositories, platform experiments, and
              product prototypes that show how the stack is actually used.
            </p>
          </div>

          <ProjectRail items={projects} />
        </section>

        <section className="section-shell mood-band mood-band-contact py-24 sm:py-32" id="contact">
          <div className="max-w-4xl">
            <p className="section-kicker">Contact</p>
            <h2 className="display-title mt-5">
              Let&apos;s build something with taste and technical depth.
            </h2>
            <p className="mt-6 text-lg leading-8 text-[var(--muted)]">
              Open to full-stack product engineering, React and Next.js product work,
              CMS-backed platforms, deployment tooling, and teams that care about
              execution quality.
            </p>
          </div>

          <div className="contact-panel mt-12">
            <a className="contact-email" href={`mailto:${siteConfig.email}`}>
              {siteConfig.email}
            </a>
            <div className="contact-links">
              <a className="text-link" href={siteConfig.linkedin} rel="noreferrer" target="_blank">
                LinkedIn
              </a>
              <a className="text-link" href={siteConfig.github} rel="noreferrer" target="_blank">
                GitHub
              </a>
              <a className="text-link" href={siteConfig.url}>
                manikanta.net
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
