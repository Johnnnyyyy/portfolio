"use client";

import { motion } from "framer-motion";

export default function StartScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="fullscreen center bg-black text-white">
      <motion.button
        whileHover={{ scale: 1.1, boxShadow: "0 0 24px #38bdf8, 0 0 48px #0ea5e9" }}
        whileTap={{ scale: 0.95 }}
        onClick={onStart}
        className="unlock-btn"
      >
        <span className="unlock-text">
          <span className="unlock-glow">PREVIEW ACCESS</span>
        </span>
      </motion.button>
    </div>
  );
}