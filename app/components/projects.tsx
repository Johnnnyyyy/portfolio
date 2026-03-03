"use client";

import { motion } from "framer-motion";

const projects = [
  {
    title: "n8n Workflow Automation",
    desc: "End-to-end automation integrating APIs, webhooks, and AI logic.",
  },
  {
    title: "AI Document Intelligence",
    desc: "Automated document processing using OpenAI and structured logic.",
  },
  {
    title: "Business System Integration",
    desc: "Integrated Xero, SharePoint, and internal tools into unified workflows.",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="projects">
      <h2>Projects</h2>

      <div className="project-grid">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            className="card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3>{project.title}</h3>
            <p>{project.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}