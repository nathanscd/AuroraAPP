import { motion } from "framer-motion";
import { Flower } from "../../types";

/* ── Color map ── */
export const colorMap: Record<string, { petal: string; center: string; stem: string }> = {
  "bg-red-500":    { petal: "#EF4444", center: "#FBBF24", stem: "#16a34a" },
  "bg-yellow-400": { petal: "#FACC15", center: "#F59E0B", stem: "#16a34a" },
  "bg-pink-400":   { petal: "#F472B6", center: "#FDE68A", stem: "#16a34a" },
  "bg-amber-100":  { petal: "#FDE68A", center: "#F59E0B", stem: "#16a34a" },
  "bg-purple-500": { petal: "#A855F7", center: "#FDE68A", stem: "#16a34a" },
  "bg-pink-600":   { petal: "#DB2777", center: "#FDE68A", stem: "#16a34a" },
  "bg-pink-300":   { petal: "#FBCFE8", center: "#F9A8D4", stem: "#16a34a" },
  "bg-slate-100":  { petal: "#E2E8F0", center: "#CBD5E1", stem: "#16a34a" },
  "bg-orange-500": { petal: "#F97316", center: "#FDE68A", stem: "#16a34a" },
  "bg-pink-200":   { petal: "#FECDD3", center: "#FDE68A", stem: "#16a34a" },
  "bg-blue-500":   { petal: "#3B82F6", center: "#FDE68A", stem: "#16a34a" },
  "bg-red-400":    { petal: "#F87171", center: "#FDE68A", stem: "#16a34a" },
};

const PLANTED_LABELS = { man: "Ele", woman: "Ela", both: "Nós" };

interface BoutiqueFlowerProps {
  flower: Flower;
  index: number;
  onClick: () => void;
}

export function BoutiqueFlower({ flower, index, onClick }: BoutiqueFlowerProps) {
  const colors = colorMap[flower.color] ?? { petal: "#F472B6", center: "#FDE68A", stem: "#16a34a" };
  const label = PLANTED_LABELS[flower.plantedBy || "both"];

  // Vary height slightly so flowers look more natural on the shelf
  const stemHeight = 48 + ((index * 7) % 28); // 48–76px range
  const wiggleDelay = (index * 0.4) % 3;

  return (
    <motion.div
      onClick={onClick}
      className="flex flex-col items-center cursor-pointer group select-none"
      style={{ width: "90px" }}
      initial={{ opacity: 0, y: 30, scale: 0.7 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 180, damping: 15, delay: index * 0.06 }}
      whileHover={{ y: -10, scale: 1.08, transition: { duration: 0.25 } }}
    >
      {/* Flower head with gentle sway */}
      <motion.div
        className="flex flex-col items-center origin-bottom"
        animate={{ rotate: [0, -2.5, 2.5, 0] }}
        transition={{ repeat: Infinity, duration: 3.5 + wiggleDelay, ease: "easeInOut" }}
      >
        {/* Petal SVG */}
        <svg width="52" height="52" viewBox="0 0 100 100" className="drop-shadow-sm">
          {/* 8 petals */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
            <ellipse
              key={i}
              cx={50 + 22 * Math.cos((deg * Math.PI) / 180)}
              cy={50 + 22 * Math.sin((deg * Math.PI) / 180)}
              rx="16" ry="10"
              fill={colors.petal}
              opacity={0.88}
              transform={`rotate(${deg}, ${50 + 22 * Math.cos((deg * Math.PI) / 180)}, ${50 + 22 * Math.sin((deg * Math.PI) / 180)})`}
            />
          ))}
          {/* Center */}
          <circle cx="50" cy="50" r="14" fill={colors.center} />
          <circle cx="50" cy="50" r="7" fill="rgba(0,0,0,0.08)" />
        </svg>

        {/* Stem */}
        <div
          className="w-1.5 rounded-full relative -mt-1"
          style={{ height: `${stemHeight}px`, background: "linear-gradient(to bottom, #22c55e, #15803d)" }}
        >
          {/* Left leaf */}
          <div
            className="absolute rounded-full"
            style={{
              width: "18px", height: "9px",
              background: "#16a34a",
              top: `${Math.round(stemHeight * 0.35)}px`,
              left: "-14px",
              transform: "rotate(-35deg)",
              borderRadius: "50% 50% 50% 0",
            }}
          />
          {/* Right leaf */}
          <div
            className="absolute rounded-full"
            style={{
              width: "16px", height: "8px",
              background: "#15803d",
              top: `${Math.round(stemHeight * 0.6)}px`,
              right: "-12px",
              transform: "rotate(35deg)",
              borderRadius: "50% 0 50% 50%",
            }}
          />
        </div>

        {/* Terracotta pot */}
        <div className="relative" style={{ marginTop: "-2px" }}>
          {/* Pot rim */}
          <div
            className="rounded-sm"
            style={{
              width: "40px", height: "7px",
              background: "linear-gradient(to bottom, #c2410c, #9a3412)",
              borderRadius: "4px 4px 0 0",
            }}
          />
          {/* Pot body */}
          <div
            style={{
              width: "36px", height: "26px",
              background: "linear-gradient(135deg, #ea580c, #c2410c, #9a3412)",
              borderRadius: "2px 2px 8px 8px",
              margin: "0 auto",
              boxShadow: "inset -3px 0 6px rgba(0,0,0,0.15), inset 3px 0 4px rgba(255,255,255,0.1)",
            }}
          >
            <div style={{ width: "28px", height: "2px", background: "rgba(0,0,0,0.1)", borderRadius: "2px", margin: "8px auto" }} />
          </div>
        </div>
      </motion.div>

      {/* Flower name tag — appears on hover */}
      <motion.div
        initial={{ opacity: 0, y: 4 }}
        whileHover={{ opacity: 1, y: 0 }}
        className="mt-2 text-center pointer-events-none"
      >
        <p className="font-serif text-[11px] font-semibold text-amber-900/80 leading-tight">{flower.name}</p>
        <span className="text-[9px] text-amber-700/60 font-medium">
          {label}
        </span>
      </motion.div>

      {/* Always-visible small name (dimmer) */}
      <p className="mt-1 font-serif text-[10px] text-amber-800/50 text-center leading-tight group-hover:opacity-0 transition-opacity">
        {flower.name}
      </p>
    </motion.div>
  );
}
