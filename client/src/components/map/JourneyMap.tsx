import { useMemo } from "react";
import { motion } from "framer-motion";
import { Place } from "../../types";
import { Heart } from "lucide-react";

interface JourneyMapProps {
  places: Place[];
  selectedPlace: Place | null;
  onMarkerClick: (place: Place) => void;
  className?: string;
}

const PADDING = 60;
const VIEW_W = 800;
const VIEW_H = 480;

export function JourneyMap({ places, selectedPlace, onMarkerClick, className }: JourneyMapProps) {
  const points = useMemo(() => {
    if (places.length === 0) return [];

    const lats = places.map((p) => p.latitude);
    const lngs = places.map((p) => p.longitude);
    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);
    const minLng = Math.min(...lngs);
    const maxLng = Math.max(...lngs);

    const latRange = maxLat - minLat || 1;
    const lngRange = maxLng - minLng || 1;

    return places.map((place) => {
      // Latitude increases northward, so invert the y axis
      const x = PADDING + ((place.longitude - minLng) / lngRange) * (VIEW_W - PADDING * 2);
      const y = PADDING + (1 - (place.latitude - minLat) / latRange) * (VIEW_H - PADDING * 2);
      return { place, x, y };
    });
  }, [places]);

  // Smooth path through points using simple quadratic curve segments
  const pathD = useMemo(() => {
    if (points.length < 2) return "";
    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];
      const midX = (prev.x + curr.x) / 2;
      const midY = (prev.y + curr.y) / 2;
      d += ` Q ${prev.x} ${prev.y} ${midX} ${midY}`;
      d += ` T ${curr.x} ${curr.y}`;
    }
    return d;
  }, [points]);

  return (
    <div className={`relative bg-gradient-to-br from-pink-50 via-fuchsia-50/60 to-purple-50 ${className || ""}`}>
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f9a8d4" />
            <stop offset="50%" stopColor="#d8b4fe" />
            <stop offset="100%" stopColor="#fcd34d" />
          </linearGradient>
          <radialGradient id="bgGlow" cx="50%" cy="50%" r="70%">
            <stop offset="0%" stopColor="#fdf4ff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#fce7f3" stopOpacity="0.4" />
          </radialGradient>
        </defs>

        {/* Soft background wash */}
        <rect x="0" y="0" width={VIEW_W} height={VIEW_H} fill="url(#bgGlow)" />

        {/* Decorative dotted texture */}
        {Array.from({ length: 60 }).map((_, i) => (
          <circle
            key={`dot-${i}`}
            cx={(i * 53) % VIEW_W}
            cy={(i * 97) % VIEW_H}
            r="1"
            fill="#f9a8d4"
            opacity="0.15"
          />
        ))}

        {/* Journey path */}
        {pathD && (
          <motion.path
            d={pathD}
            fill="none"
            stroke="url(#pathGradient)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="2 10"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
          />
        )}

        {/* Markers */}
        {points.map(({ place, x, y }, index) => {
          const isActive = selectedPlace?.id === place.id;
          return (
            <g
              key={place.id}
              onClick={() => onMarkerClick(place)}
              className="cursor-pointer"
              style={{ transformOrigin: `${x}px ${y}px` }}
            >
              {/* Soft halo */}
              <motion.circle
                cx={x}
                cy={y}
                r={isActive ? 22 : 14}
                fill="#f472b6"
                opacity={isActive ? 0.15 : 0.08}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
              />

              {/* Pin */}
              <motion.circle
                cx={x}
                cy={y}
                r={isActive ? 9 : 6.5}
                fill="white"
                stroke={isActive ? "#ec4899" : "#d8b4fe"}
                strokeWidth={isActive ? 2.5 : 2}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                whileHover={{ scale: 1.2 }}
              />

              {/* Order number */}
              <text
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={isActive ? "10" : "8"}
                fontWeight="700"
                fill={isActive ? "#ec4899" : "#c084fc"}
                fontFamily="serif"
                className="select-none pointer-events-none"
              >
                {index + 1}
              </text>

              {/* Label on active */}
              {isActive && (
                <motion.g
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <rect
                    x={x - 50}
                    y={y - 38}
                    width="100"
                    height="22"
                    rx="11"
                    fill="white"
                    stroke="#f9a8d4"
                    strokeWidth="1"
                    opacity="0.95"
                  />
                  <text
                    x={x}
                    y={y - 27}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontSize="10"
                    fontFamily="serif"
                    fontWeight="600"
                    fill="#9d174d"
                    className="select-none pointer-events-none"
                  >
                    {place.name.length > 18 ? `${place.name.slice(0, 16)}…` : place.name}
                  </text>
                </motion.g>
              )}
            </g>
          );
        })}
      </svg>

      {/* Floating decorative heart */}
      <div className="absolute bottom-4 right-4 opacity-30 pointer-events-none">
        <Heart className="w-6 h-6 text-pink-300 fill-pink-200" />
      </div>
    </div>
  );
}