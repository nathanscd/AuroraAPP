import { useState } from "react";
import { motion } from "framer-motion";
import { placesData } from "../data/placesData";
import { PageTitle, Modal, ImagePlaceholder, Badge } from "@/components/common";
import { JourneyMap } from "@/components/map/JourneyMap";
import { formatDate } from "../utils/dateFormatter";
import { Place } from "../types";
import { MapPin, Calendar, Heart } from "lucide-react";

const PLACE_STYLES = {
  man:    { ring: "ring-pink-200",   badge: "bg-pink-50 text-pink-600 border-pink-200",   dot: "bg-pink-400",   label: "Por Ele"     },
  woman:  { ring: "ring-purple-200", badge: "bg-purple-50 text-purple-600 border-purple-200", dot: "bg-purple-400", label: "Por Ela"  },
  both:   { ring: "ring-fuchsia-200",badge: "bg-fuchsia-50 text-fuchsia-600 border-fuchsia-200", dot: "bg-fuchsia-400", label: "Nós Dois" },
};

const sortedPlaces = [...placesData].sort(
  (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
);

export default function PlacesPage() {
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [modalPlace, setModalPlace]       = useState<Place | null>(null);

  const getBadgeVariant = (visitedBy?: "man" | "woman" | "both") => {
    if (visitedBy === "man") return "man";
    if (visitedBy === "woman") return "woman";
    return "default";
  };

  const getBadgeLabel = (visitedBy?: "man" | "woman" | "both") => {
    if (visitedBy === "man") return "Visitado por Ele";
    if (visitedBy === "woman") return "Visitado por Ela";
    return "Visitado por Nós Dois";
  };

  const handleMarkerClick = (place: Place) => {
    setSelectedPlace((prev) => (prev?.id === place.id ? null : place));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-rose-50/50 to-purple-50/50 pt-20 pb-50">
      <div className="container">
        <PageTitle
          title="Lugares Especiais"
          subtitle="O mapa da nossa história — cada ponto, uma memória"
        />

        {/* ──── Journey Map ──── */}
        <motion.div
          className="mb-16 rounded-3xl overflow-hidden shadow-2xl ring-2 ring-pink-100/80 relative bg-[#fcfbf9] p-3 border border-pink-200/50"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="absolute top-5 left-5 w-2 h-2 rounded-full bg-amber-850/30 border border-amber-600/30 z-20 shadow-xs" />
          <div className="absolute top-5 right-5 w-2 h-2 rounded-full bg-amber-850/30 border border-amber-600/30 z-20 shadow-xs" />
          <div className="absolute bottom-5 left-5 w-2 h-2 rounded-full bg-amber-850/30 border border-amber-600/30 z-20 shadow-xs" />
          <div className="absolute bottom-5 right-5 w-2 h-2 rounded-full bg-amber-850/30 border border-amber-600/30 z-20 shadow-xs" />

          <div className="absolute inset-3 rounded-2xl pointer-events-none z-20"
            style={{
              boxShadow: "inset 0 0 40px rgba(217,70,239,0.05), 0 0 0 1px rgba(233,121,249,0.1)"
            }}
          />
          <JourneyMap
            places={sortedPlaces}
            selectedPlace={selectedPlace}
            onMarkerClick={handleMarkerClick}
            className="w-full h-[480px] rounded-2xl"
          />
        </motion.div>

        {/* ──── Journey header ──── */}
        <motion.div
          className="flex items-center gap-4 mb-8"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-pink-200 to-transparent" />
          <div className="flex items-center gap-2 text-slate-400 text-xs uppercase tracking-widest font-medium">
            <Heart className="w-3.5 h-3.5 text-pink-400 fill-pink-300" />
            {sortedPlaces.length} destinos visitados
            <Heart className="w-3.5 h-3.5 text-pink-400 fill-pink-300" />
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-pink-200 to-transparent" />
        </motion.div>

        {/* ──── Places Timeline Cards ──── */}
        <div className="space-y-6 max-w-4xl mx-auto">
          {sortedPlaces.map((place, index) => {
            const style = PLACE_STYLES[place.visitedBy || "both"];
            const isActive = selectedPlace?.id === place.id;

            return (
              <motion.div
                key={place.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="relative"
              >
                {isActive && (
                  <div
                    className="absolute -top-3 left-10 w-16 h-5 bg-amber-100/60 border border-amber-200/40 backdrop-blur-[0.5px] z-10 shadow-2xs select-none"
                    style={{
                      transform: "rotate(-2deg)",
                      clipPath: "polygon(0% 10%, 95% 0%, 100% 90%, 5% 100%)",
                      opacity: 0.8
                    }}
                  />
                )}

                <motion.div
                  onClick={() => handleMarkerClick(place)}
                  whileHover={{ x: 4, scale: 1.01 }}
                  className={`flex items-start gap-5 bg-[#fdfdfb] rounded-2xl p-6 shadow-sm border cursor-pointer transition-all duration-300 relative ${
                    isActive
                      ? "border-pink-300/80 shadow-md ring-2 ring-pink-100"
                      : "border-stone-200/80 hover:border-purple-200/60"
                  }`}
                  style={{
                    backgroundImage: "linear-gradient(rgba(242, 238, 230, 0.45) 1px, transparent 1px)",
                    backgroundSize: "100% 26px",
                  }}
                >
                  <div className="absolute top-0 bottom-0 left-16 w-[1px] bg-red-200/60 pointer-events-none" />

                  <div
                    className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-serif font-bold text-white text-sm shadow-sm z-10"
                    style={{ background: "linear-gradient(135deg, #f472b6, #c084fc)" }}
                  >
                    {index + 1}
                  </div>

                  <div className="flex-1 min-w-0 pl-4 z-10">
                    <div className="flex items-start justify-between gap-3 flex-wrap">
                      <h3 className="font-serif font-bold text-stone-800 text-lg leading-tight">
                        {place.name}
                      </h3>
                      <span className={`text-[9px] font-sans font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded-full border shrink-0 ${style.badge}`}>
                        {style.label}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 mt-1.5 mb-3 font-serif italic text-stone-400">
                      <Calendar className="w-3.5 h-3.5" />
                      <span className="text-xs">{formatDate(place.date)}</span>
                    </div>

                    <p className="text-stone-600 text-sm leading-relaxed font-serif line-clamp-2">
                      {place.description}
                    </p>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPlace(place);
                        setModalPlace(place);
                      }}
                      className="mt-4 inline-flex items-center text-xs font-semibold text-pink-600 hover:text-pink-700 underline underline-offset-4 decoration-pink-300 hover:decoration-pink-500 transition-colors"
                    >
                      Ver recordações →
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* ──── Place Detail Modal ──── */}
        <Modal
          isOpen={!!modalPlace}
          onClose={() => { setModalPlace(null); setSelectedPlace(null); }}
          title={modalPlace?.name}
          className="bg-[#fcfbf9] border border-stone-200/80 max-w-md shadow-2xl"
        >
          {modalPlace && (
            <div className="space-y-6">
              {/* Polaroid Frame */}
              <div className="bg-white border border-stone-200/80 p-4 pb-10 shadow-md rounded-xs relative max-w-[280px] mx-auto"
                style={{ transform: "rotate(-1deg)" }}
              >
                <div
                  className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-14 h-5 bg-amber-100/50 border border-amber-200/40 backdrop-blur-[0.5px] z-10"
                  style={{ clipPath: "polygon(0% 15%, 98% 0%, 100% 85%, 2% 100%)" }}
                />

                {modalPlace.imageUrl ? (
                  <img
                    src={modalPlace.imageUrl}
                    alt={modalPlace.name}
                    className="w-full h-[200px] object-cover rounded-xs"
                  />
                ) : (
                  <ImagePlaceholder height="200px" />
                )}

                <div className="mt-4 text-center">
                  <p className="font-serif italic text-stone-500 text-xs tracking-wide">
                    {modalPlace.name}
                  </p>
                </div>
              </div>

              {/* Scrapbook entry details */}
              <div className="bg-white/80 border border-stone-100 rounded-xl p-5 shadow-inner-sm space-y-4">
                <div className="flex flex-wrap gap-2 justify-center">
                  <Badge label={formatDate(modalPlace.date)} variant="secondary" />
                  <Badge
                    label={getBadgeLabel(modalPlace.visitedBy)}
                    variant={getBadgeVariant(modalPlace.visitedBy)}
                  />
                </div>

                <div className="w-full h-px bg-gradient-to-r from-transparent via-stone-200 to-transparent my-1" />

                <p className="text-stone-700 leading-relaxed font-serif text-[14px] italic text-center px-2">
                  "{modalPlace.description}"
                </p>

                <div className="text-[10px] text-stone-400 font-mono pt-3 border-t border-stone-100 flex justify-between">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-pink-400" />
                    Marcador de Viagem
                  </span>
                  <span>{modalPlace.latitude.toFixed(6)}°, {modalPlace.longitude.toFixed(6)}°</span>
                </div>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
}