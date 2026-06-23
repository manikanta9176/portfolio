import {
  expertise,
  identitySignals,
  metrics,
  principles,
  projects,
  siteConfig,
  timeline,
} from "@/lib/profile";
import { InteractiveLayer } from "@/components/interactive-layer";

export function NoirPortfolio() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#030712] text-white">
      <InteractiveLayer />
      <main className="relative z-10 pt-16">
        <Hero />
        <SignalSection />
        <ExperienceSection />
        <SystemsSection />
        <ContactSection />
      </main>
    </div>
  );
}

function Hero() {
  return (
    <section
      className="relative grid min-h-screen place-items-center px-5 py-24 sm:px-8"
      id="intro"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.16),transparent_28rem),radial-gradient(circle_at_80%_10%,rgba(168,85,247,0.12),transparent_26rem),linear-gradient(135deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:auto,auto,72px_72px]" />
      <div className="mx-auto grid w-full max-w-7xl gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
        <div>
          <p className="mb-6 inline-flex rounded-full border border-cyan-200/25 bg-cyan-200/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-100">
            {siteConfig.location} / {siteConfig.role}
          </p>
          <h1 className="max-w-5xl text-balance text-6xl font-black leading-[0.9] tracking-[-0.08em] text-white sm:text-7xl lg:text-8xl">
            Engineering products with the taste of a designer and the range of
            a builder.
          </h1>
          <p className="mt-8 max-w-2xl text-pretty text-lg leading-8 text-slate-300 sm:text-xl">
            {siteConfig.headline} I connect polished interfaces, CMS-backed
            workflows, API layers, and deployment systems into software that
            feels clear from first click to production release.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a className="button-primary" href="#work">
              Explore the work
            </a>
            <a className="button-secondary" href={`mailto:${siteConfig.email}`}>
              Start a conversation
            </a>
          </div>
        </div>

        <aside className="glass-panel relative overflow-hidden rounded-[2rem] p-5 sm:p-7">
          <div className="absolute right-8 top-8 h-24 w-24 rounded-full bg-cyan-300/20 blur-3xl" />
          <div className="relative rounded-[1.5rem] border border-white/10 bg-black/25 p-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-cyan-200">
                  Live identity scan
                </p>
                <h2 className="mt-2 text-2xl font-bold tracking-tight">
                  {siteConfig.name}
                </h2>
              </div>
              <div className="h-3 w-3 rounded-full bg-emerald-300 shadow-[0_0_26px_rgba(110,231,183,0.8)]" />
            </div>
            <div className="space-y-3 py-5">
              {identitySignals.map((signal) => (
                <div
                  className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                  key={signal}
                >
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-cyan-200" />
                  <p className="text-sm leading-6 text-slate-200">{signal}</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-3">
              {metrics.map((metric) => (
                <div className="rounded-2xl bg-white/[0.06] p-4" key={metric.label}>
                  <p className="text-3xl font-black tracking-[-0.05em] text-white">
                    {metric.value}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-400">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

function SignalSection() {
  return (
    <section className="px-5 py-24 sm:px-8" id="signal">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Positioning"
          title="Not just full-stack. Full-context."
          copy="The strongest signal across the sources is range: front-end craft, backend fluency, CMS and API ecosystems, deployment experiments, and a learning trail that keeps moving."
        />
        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {expertise.map((item) => (
            <article className="group glass-card p-6" key={item.title}>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-200/80">
                {item.eyebrow}
              </p>
              <h3 className="mt-5 text-2xl font-bold tracking-tight">
                {item.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-slate-300">{item.copy}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {item.stack.map((skill) => (
                  <span className="pill" key={skill}>
                    {skill}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceSection() {
  return (
    <section className="px-5 py-24 sm:px-8" id="work">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Trajectory"
          title="A career arc from backend rigor to product systems."
          copy="This is presented as a progression, not a resume dump: what each phase proves and why it matters to teams evaluating Manikanta now."
        />
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {timeline.map((item, index) => (
            <article className="glass-card relative p-7" key={item.title}>
              <span className="absolute right-6 top-6 text-7xl font-black tracking-[-0.1em] text-white/[0.03]">
                0{index + 1}
              </span>
              <p className="text-sm font-semibold text-cyan-200">{item.period}</p>
              <h3 className="mt-5 text-2xl font-bold">{item.title}</h3>
              <p className="mt-1 text-sm text-slate-400">{item.organization}</p>
              <p className="mt-5 text-sm leading-7 text-slate-300">{item.copy}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {item.proof.map((proof) => (
                  <span className="pill" key={proof}>
                    {proof}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-[0.7fr_1.3fr]">
          <div className="glass-card p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-200">
              Working principles
            </p>
            <div className="mt-6 space-y-4">
              {principles.map((principle) => (
                <p className="text-lg leading-8 text-white/85" key={principle}>
                  {principle}
                </p>
              ))}
            </div>
          </div>
          <div className="glass-card overflow-hidden p-0">
            <div className="border-b border-white/10 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-200">
                Selected proof
              </p>
            </div>
            <div className="divide-y divide-white/10">
              {projects.map((project) => (
                <ProjectRow project={project} key={project.name} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SystemsSection() {
  return (
    <section className="px-5 py-24 sm:px-8" id="systems">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
          <div className="glass-panel rounded-[2rem] p-8 sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200">
              Systems map
            </p>
            <h2 className="mt-6 text-4xl font-black tracking-[-0.06em] sm:text-5xl">
              The portfolio is designed like the work: layered, useful, and
              shippable.
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-300">
              Instead of forcing a template, the interface turns Manikanta&apos;s
              strongest signals into a product story: craft on the surface,
              architecture underneath, and evidence one click away.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              ["Surface", "Responsive UI, tactile cards, keyboard palette"],
              ["Core", "Typed content model and server-rendered sections"],
              ["Proof", "GitHub-backed project links and recent activity"],
              ["Reach", "SEO, structured data, sitemap, robots, OG image"],
            ].map(([title, copy]) => (
              <div className="glass-card p-7" key={title}>
                <p className="text-5xl font-black tracking-[-0.08em] text-cyan-100/80">
                  {title.slice(0, 2)}
                </p>
                <h3 className="mt-8 text-2xl font-bold">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section className="px-5 py-24 sm:px-8" id="contact">
      <div className="mx-auto max-w-5xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-200">
          Available for product-minded teams
        </p>
        <h2 className="mt-6 text-balance text-5xl font-black tracking-[-0.07em] sm:text-7xl">
          Bring me into work where interface quality and engineering range both
          matter.
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
          The best fit: full-stack product engineering, React/Next.js product
          work, CMS-backed platforms, deployment tooling, and teams that value
          thoughtful execution over noisy complexity.
        </p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <a className="button-primary" href={`mailto:${siteConfig.email}`}>
            Email Manikanta
          </a>
          <a
            className="button-secondary"
            href={siteConfig.linkedin}
            rel="noreferrer"
            target="_blank"
          >
            Connect on LinkedIn
          </a>
          <a
            className="button-secondary"
            href={siteConfig.github}
            rel="noreferrer"
            target="_blank"
          >
            View GitHub
          </a>
        </div>
      </div>
    </section>
  );
}

function SectionHeading({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string;
  title: string;
  copy: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200">
        {eyebrow}
      </p>
      <h2 className="mt-5 text-4xl font-black tracking-[-0.06em] sm:text-6xl">
        {title}
      </h2>
      <p className="mt-5 text-lg leading-8 text-slate-300">{copy}</p>
    </div>
  );
}

function ProjectRow({
  project,
}: {
  project: (typeof projects)[number];
}) {
  return (
    <article className="grid gap-5 p-6 transition hover:bg-white/[0.03] lg:grid-cols-[0.7fr_1.3fr]">
      <div>
        <p className="text-xs uppercase tracking-[0.25em] text-cyan-200/80">
          {project.type} / {project.year}
        </p>
        <h3 className="mt-3 text-2xl font-bold">{project.name}</h3>
      </div>
      <div>
        <p className="text-sm leading-7 text-slate-300">{project.copy}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span className="pill" key={tag}>
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-5 flex flex-wrap gap-3">
          {project.links.map((link) => (
            <a
              className="text-sm font-semibold text-cyan-100 underline-offset-4 transition hover:text-white hover:underline"
              href={link.href}
              key={link.href}
              rel="noreferrer"
              target="_blank"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}
