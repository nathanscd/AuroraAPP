import { motion } from "framer-motion";
import React from "react";

const orbs = Array.from({ length: 6 });

export default function BackgroundOrbs() {
  return (
    <>
      {orbs.map((_, i) => (
        <motion.div
          key={i}
          className="glow-orb"
          style={{
            width: `${Math.random() * 200 + 100}px`,
            height: `${Math.random() * 200 + 100}px`,
            background: `radial-gradient(circle at 50% 50%, oklch(0.96 0.05 ${320 + i * 10} / 0.4), transparent)`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{ y: [0, -20, 0] }}
          transition={{ repeat: Infinity, duration: 8 + i, ease: "easeInOut" }}
        />
      ))}
    </>
  );
}
