import { ReactNode } from "react";
import { motion } from "framer-motion";

interface PageLeafProps {
  front: ReactNode;
  back: ReactNode;
  isFlipped: boolean;
  zIndex: number;
  isCover?: boolean;
}

export function PageLeaf({ front, back, isFlipped, zIndex, isCover }: PageLeafProps) {
  const pageBackground = isCover
    ? "linear-gradient(135deg, #3b1d5e 0%, #1e0a3c 60%, #2d1454 100%)"
    : "#FAF8F3";
  const pageBorder = isCover ? "1px solid #4c2278" : "1px solid #e5e0d6";

  return (
    <motion.div
      className="absolute top-0 right-0 w-1/2 h-full"
      style={{
        zIndex,
        transformStyle: "preserve-3d",
        transformOrigin: "left center",
        // Slightly lift the page above the flat book surface
        perspective: "1200px",
      }}
      initial={false}
      animate={{ rotateY: isFlipped ? -180 : 0 }}
      transition={{
        type: "spring",
        stiffness: 38,
        damping: 16,
        mass: 0.9,
      }}
    >
      {/* FRONT face — visible when not flipped */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
          background: pageBackground,
          border: pageBorder,
          borderRadius: "0 12px 12px 0",
        }}
      >
        {/* Binding shadow (left edge of right page) */}
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-black/15 via-black/5 to-transparent z-10 pointer-events-none" />
        {/* Page curl shadow (right edge) */}
        <div className="absolute right-0 top-0 bottom-0 w-3 bg-gradient-to-l from-black/5 to-transparent z-10 pointer-events-none" />
        <div className="h-full relative">{front}</div>
      </div>

      {/* BACK face — visible when flipped (rotated 180°, so left side of spread) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
          transform: "rotateY(180deg)",
          background: pageBackground,
          border: pageBorder,
          borderRadius: "12px 0 0 12px",
        }}
      >
        {/* Binding shadow (right edge of left page) */}
        <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-black/15 via-black/5 to-transparent z-10 pointer-events-none" />
        {/* Page curl shadow (left edge) */}
        <div className="absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-r from-black/5 to-transparent z-10 pointer-events-none" />
        <div className="h-full relative">{back}</div>
      </div>
    </motion.div>
  );
}
