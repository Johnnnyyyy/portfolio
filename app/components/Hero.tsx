"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="hero">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1>
          AI & Automation <span>Developer</span>
        </h1>
        <p>
          I build intelligent automation systems that eliminate manual work and
          improve operational efficiency.
        </p>
        <a href="#projects" className="btn">
          View My Work
        </a>
      </motion.div>
    </section>
  );
}