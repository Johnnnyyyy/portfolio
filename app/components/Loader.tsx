"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Loader({ onFinish }: { onFinish: () => void }) {
  const [percent, setPercent] = useState(1);

  useEffect(() => {
    if (percent < 100) {
      const interval = setInterval(() => {
        setPercent((p) => Math.min(100, p + Math.floor(Math.random() * 3) + 1));
      }, 18 + Math.random() * 22); // randomize speed for game feel
      return () => clearInterval(interval);
    } else {
      const finishTimeout = setTimeout(() => {
        onFinish();
      }, 400);
      return () => clearTimeout(finishTimeout);
    }
  }, [percent, onFinish]);

  return (
    <div className="fullscreen center bg-black text-white">
      <div className="loader-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="loader-title">LOADING INFORMATION...</div>
        </motion.div>
        <div className="loader-bar-outer">
          <motion.div
            className="loader-bar-inner"
            initial={{ width: 0 }}
            animate={{ width: `${percent}%` }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          />
        </div>
        <div className="loader-percent">
          {percent}%
        </div>
      </div>
    </div>
  );
}