import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { Place } from "@/types";
import { formatDate } from "@/utils/dateFormatter";

interface PlaceMarkerProps {
  place: Place;
  onClick: () => void;
}

export function PlaceMarker({ place, onClick }: PlaceMarkerProps) {
  // Determine gender style
  const styles = {
    man: {
      border: "border-man/10 hover:border-man/40",
      badge: "bg-man-light text-man",
      iconColor: "text-man",
      shadow: "hover:shadow-man/10",
      label: "Por Ele",
    },
    woman: {
      border: "border-woman/10 hover:border-woman/40",
      badge: "bg-woman-light text-woman",
      iconColor: "text-woman",
      shadow: "hover:shadow-woman/10",
      label: "Por Ela",
    },
    both: {
      border: "border-purple-100 hover:border-purple-300",
      badge: "bg-purple-50 text-primary",
      iconColor: "text-primary",
      shadow: "hover:shadow-primary/10",
      label: "Nós Dois",
    },
  }[place.visitedBy || "both"];

  // Grab first 80 characters of description for preview
  const descPreview = place.description.length > 80 
    ? `${place.description.slice(0, 80)}...` 
    : place.description;

  return (
    <motion.div
      onClick={onClick}
      whileHover={{ y: -6, scale: 1.02 }}
      className={`bg-white rounded-2xl border p-5 shadow-sm cursor-pointer transition-all duration-300 flex flex-col justify-between h-full min-h-[180px] ${styles.border} ${styles.shadow}`}
    >
      <div>
        {/* Header */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <span className="text-xs font-semibold text-slate-400">
            {formatDate(place.date)}
          </span>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${styles.badge}`}>
            {styles.label}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-serif text-lg font-bold text-slate-800 mb-2 leading-snug flex items-center gap-1.5 hover:text-primary transition-colors">
          <MapPin className={`w-4 h-4 shrink-0 ${styles.iconColor}`} />
          {place.name}
        </h3>

        {/* Description Snippet */}
        <p className="text-slate-600 text-sm leading-relaxed mb-4">
          {descPreview}
        </p>
      </div>

      {/* Footer coordinates */}
      <div className="text-[10px] text-slate-400 font-mono flex items-center justify-between border-t border-slate-100 pt-3 mt-auto">
        <span>Coordenadas:</span>
        <span>{place.latitude.toFixed(4)}, {place.longitude.toFixed(4)}</span>
      </div>
    </motion.div>
  );
}
