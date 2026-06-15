import { motion } from "framer-motion";
import { Flower } from "@/types";

interface FlowerCardProps {
  flower: Flower;
  onClick: () => void;
}

export function FlowerCard({ flower, onClick }: FlowerCardProps) {
  // Determine gender indicators
  const indicators = {
    man: {
      badge: "bg-man-light text-man",
      label: "Ele",
      ring: "group-hover:ring-man/30",
    },
    woman: {
      badge: "bg-woman-light text-woman",
      label: "Ela",
      ring: "group-hover:ring-woman/30",
    },
    both: {
      badge: "bg-purple-100 text-primary",
      label: "Nós",
      ring: "group-hover:ring-primary/30",
    },
  }[flower.plantedBy || "both"];

  // Mapping color classes to SVG hex colors
  const getFlowerHexColor = (colorClass: string) => {
    const maps: Record<string, string> = {
      "bg-red-500": "#EF4444",
      "bg-yellow-400": "#FACC15",
      "bg-pink-400": "#F472B6",
      "bg-amber-100": "#FEF3C7",
      "bg-purple-500": "#A855F7",
      "bg-pink-600": "#DB2777",
      "bg-pink-300": "#FBCFE8",
      "bg-slate-100": "#E2E8F0",
      "bg-orange-500": "#F97316",
      "bg-pink-200": "#FDE2E4",
      "bg-blue-500": "#3B82F6",
      "bg-red-400": "#F87171",
    };
    return maps[colorClass] || "#EC4899"; // default pink
  };

  const flowerColor = getFlowerHexColor(flower.color);

  return (
    <motion.div
      onClick={onClick}
      className="group flex flex-col items-center cursor-pointer p-4 rounded-2xl bg-white/40 hover:bg-white/80 border border-transparent hover:border-purple-100/50 transition-all duration-300 shadow-sm hover:shadow-lg w-[160px]"
      whileHover={{ y: -6 }}
    >
      {/* Flower Pot and Plant SVG */}
      <div className="w-24 h-32 relative flex items-end justify-center mb-3">
        {/* Animated Stem & Flower */}
        <motion.div
          className="absolute bottom-6 flex flex-col items-center origin-bottom"
          animate={{ rotate: [0, -2, 2, 0] }}
          transition={{
            repeat: Infinity,
            duration: 4,
            ease: "easeInOut",
          }}
          whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
        >
          {/* Flower Head */}
          <motion.svg
            width="50"
            height="50"
            viewBox="0 0 100 100"
            className="origin-center"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
          >
            {/* Petals */}
            <circle cx="50" cy="20" r="18" fill={flowerColor} opacity="0.9" />
            <circle cx="80" cy="50" r="18" fill={flowerColor} opacity="0.9" />
            <circle cx="50" cy="80" r="18" fill={flowerColor} opacity="0.9" />
            <circle cx="20" cy="50" r="18" fill={flowerColor} opacity="0.9" />
            <circle cx="28" cy="28" r="18" fill={flowerColor} opacity="0.9" />
            <circle cx="72" cy="28" r="18" fill={flowerColor} opacity="0.9" />
            <circle cx="72" cy="72" r="18" fill={flowerColor} opacity="0.9" />
            <circle cx="28" cy="72" r="18" fill={flowerColor} opacity="0.9" />
            {/* Center */}
            <circle cx="50" cy="50" r="16" fill="#FBBF24" />
          </motion.svg>

          {/* Stem */}
          <div className="w-1.5 h-16 bg-emerald-500 rounded-full relative -mt-1 z-[-1]">
            {/* Leaves */}
            <div className="absolute top-4 -left-3 w-4 h-2.5 bg-emerald-600 rounded-full rotate-[30deg]" />
            <div className="absolute top-8 -right-3 w-4 h-2.5 bg-emerald-600 rounded-full -rotate-[30deg]" />
          </div>
        </motion.div>

        {/* Flower Pot */}
        <div className="w-12 h-8 bg-amber-700/80 rounded-b-xl border-t-4 border-amber-800 flex items-center justify-center shadow-inner relative z-10">
          <div className="w-8 h-1 bg-amber-900/30 rounded-full" />
        </div>
      </div>

      {/* Flower Details */}
      <h3 className="font-medium text-slate-800 text-sm text-center truncate w-full mb-1 group-hover:text-primary transition-colors">
        {flower.name}
      </h3>

      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${indicators.badge}`}>
        {indicators.label}
      </span>
    </motion.div>
  );
}
