"use client";

import { motion } from "framer-motion";
import type { projects } from "@/lib/profile";

type Project = (typeof projects)[number];

export function ProjectRail({ items }: { items: Project[] }) {
  return (
    <div className="project-rail-shell">
      <div className="project-rail">
        {items.map((project, index) => (
          <motion.article
            className="project-card group"
            initial={{ opacity: 0, y: 36 }}
            key={project.name}
            transition={{ delay: index * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, margin: "-10%" }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <div className="project-card-top">
              <span className="project-index">0{index + 1}</span>
              <span className="project-meta">
                {project.type} / {project.year}
              </span>
            </div>
            <h3 className="project-title">{project.name}</h3>
            <p className="project-copy">{project.copy}</p>
            <div className="project-tags">
              {project.tags.map((tag) => (
                <span className="tag" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
            <div className="project-links">
              {project.links.map((link) => (
                <a
                  className="project-link"
                  href={link.href}
                  key={link.href}
                  rel="noreferrer"
                  target="_blank"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div aria-hidden="true" className="project-card-glow" />
          </motion.article>
        ))}
      </div>
    </div>
  );
}
