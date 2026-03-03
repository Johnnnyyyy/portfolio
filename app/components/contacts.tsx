"use client";

import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section id="contact" className="contact">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2>Contact Me</h2>
        <p>Let’s build intelligent automation together.</p>
        <a href="mailto:your@email.com" className="btn">
          Email Me
        </a>
      </motion.div>
    </section>
  );
}