"use client";

import { motion } from "framer-motion";

export default function StartScreen({ onStart }: { onStart: () => void }) {
  const handleClick = () => {
    // Call onStart after a small delay for animation feel
    setTimeout(() => onStart(), 200);
  };

  return (
    <div className="fullscreen center bg-black text-white">
      <motion.button
        whileHover={{
          scale: 1.05,
          boxShadow: "0 0 24px #38bdf8, 0 0 48px #0ea5e9",
        }}
        whileTap={{ scale: 0.95 }}
        onClick={handleClick}
        className="unlock-btn flex items-center justify-center text-2xl font-bold"
      >
        <span className="unlock-text inline-flex items-center">
          <span className="unlock-glow">PREVIEW ACCESS</span>
        </span>
      </motion.button>
    </div>
  );
}