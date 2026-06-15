import { motion } from "framer-motion";
import { Heart, Star } from "lucide-react";
import { Reason } from "../../types";

interface ReasonCardProps {
  reason: Reason & { isFavorite?: boolean };
  onFavoriteToggle: (id: string) => void;
}

export function ReasonCard({ reason, onFavoriteToggle }: ReasonCardProps) {
  const isFavorite = !!reason.isFavorite;

  // Determine colors based on gender
  const colors = {
    man: {
      border: "border-man/10 hover:border-man/40",
      numberBg: "bg-man text-white",
      tag: "bg-man-light text-man",
      heartActive: "text-man fill-man",
      heartHover: "hover:bg-man-light/50",
      accent: "man",
      shadow: "hover:shadow-man/10",
    },
    woman: {
      border: "border-woman/10 hover:border-woman/40",
      numberBg: "bg-woman text-white",
      tag: "bg-woman-light text-woman",
      heartActive: "text-woman fill-woman",
      heartHover: "hover:bg-woman-light/50",
      accent: "woman",
      shadow: "hover:shadow-woman/10",
    },
    both: {
      border: "border-purple-100 hover:border-purple-300",
      numberBg: "bg-primary text-white",
      tag: "bg-purple-50 text-primary",
      heartActive: "text-primary fill-primary",
      heartHover: "hover:bg-purple-50",
      accent: "primary",
      shadow: "hover:shadow-primary/10",
    },
  }[reason.gender || "both"];

  const isLuckyNumber = reason.number === 7;

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      className={`bg-white rounded-2xl border p-6 transition-all duration-300 relative overflow-hidden flex flex-col justify-between h-full min-h-[200px] ${
        isLuckyNumber
          ? "border-purple-400/40 shadow-lg shadow-purple-500/15"
          : `shadow-sm ${colors.border} ${colors.shadow}`
      }`}
    >
      {isLuckyNumber && <div className="shimmer absolute inset-0 rounded-2xl" />}
      {/* Decorative gradient background based on gender */}
      <div className={`absolute top-0 right-0 w-24 h-24 rounded-full filter blur-2xl opacity-10 bg-${colors.accent}`} />

      <div className="relative">
        {/* Header: Number & Favorite Button */}
        <div className="flex items-center justify-between mb-4">
          <div
            className={`flex items-center justify-center font-bold text-sm ${
              isLuckyNumber
                ? "seven-badge w-8 h-8"
                : `w-8 h-8 rounded-full ${colors.numberBg}`
            }`}
          >
            {isLuckyNumber ? <span className="flex items-center gap-0.5"><Star className="w-3 h-3 fill-white/50" />{reason.number}</span> : reason.number}
          </div>
          <button
            onClick={() => onFavoriteToggle(reason.id)}
            className={`p-2 rounded-full transition-colors ${colors.heartHover}`}
            aria-label="Favoritar"
          >
            <Heart
              className={`w-5 h-5 transition-transform duration-300 ${
                isFavorite ? colors.heartActive + " scale-110" : "text-slate-400 hover:scale-110"
              }`}
            />
          </button>
        </div>

        {/* Title */}
        <h3 className="font-serif text-lg font-bold text-slate-800 mb-2 leading-snug">
          {reason.title}
        </h3>

        {/* Description */}
        <p className="text-slate-600 text-sm leading-relaxed mb-4">
          {reason.description}
        </p>
      </div>

      {/* Category Tag */}
      <div className="mt-auto">
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${colors.tag}`}>
          {reason.category}
        </span>
      </div>
    </motion.div>
  );
}
