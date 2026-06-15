import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { flowersData } from "@/data/flowersData";
import { Modal, Badge } from "@/components/common";
import { BoutiqueFlower, colorMap } from "@/components/garden/BoutiqueFlower";
import { formatDate } from "@/utils/dateFormatter";
import { Flower } from "@/types";
import { Music, X } from "lucide-react";

/* ── Distribute flowers across shelves ──────────────────── */
const SHELF_CAPACITIES = [4, 5, 3]; // 3 shelves: 4, 5, 3 flowers
function distributeFlowers(flowers: Flower[]) {
  const shelves: Flower[][] = [];
  let idx = 0;
  for (const cap of SHELF_CAPACITIES) {
    shelves.push(flowers.slice(idx, idx + cap));
    idx += cap;
  }
  // any overflow goes to a 4th shelf
  if (idx < flowers.length) shelves.push(flowers.slice(idx));
  return shelves;
}

const shelves = distributeFlowers(flowersData);

const FLOATING_PETALS = Array.from({ length: 15 }).map((_, i) => ({
  id: i,
  left: `${(i * 7.7) % 100}%`,
  delay: i * 0.8,
  duration: 8 + (i % 5) * 2,
  size: 14 + (i % 4) * 4,
  emoji: ["🌸", "💮", "🌺", "🌸"][i % 4]
}));

/* ── Badge helpers ────────────────────────────────────── */
const getBadgeVariant = (p?: "man" | "woman" | "both") =>
  p === "man" ? "man" : p === "woman" ? "woman" : "default";
const getBadgeLabel = (p?: "man" | "woman" | "both") =>
  p === "man" ? "Cultivado por Ele" : p === "woman" ? "Cultivado por Ela" : "Cultivado por Nós Dois";

/* ── Shelf component ─────────────────────────────────── */
function WoodenShelf({ flowers, shelfIndex, onFlowerClick }: {
  flowers: Flower[];
  shelfIndex: number;
  onFlowerClick: (f: Flower) => void;
}) {
  return (
    <motion.div
      className="relative w-full"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: shelfIndex * 0.15 }}
    >
      {/* Flowers sitting on the shelf */}
      <div className="flex items-end justify-center gap-5 md:gap-8 px-6 pb-3">
        {flowers.map((flower, i) => (
          <BoutiqueFlower
            key={flower.id}
            flower={flower}
            index={shelfIndex * 5 + i}
            onClick={() => onFlowerClick(flower)}
          />
        ))}
      </div>

      {/* The wooden plank */}
      <div className="relative">
        {/* Shelf surface */}
        <div
          className="w-full rounded-sm"
          style={{
            height: "18px",
            background: "linear-gradient(to bottom, #c8a97e, #a07850, #8b6640)",
            boxShadow: "0 4px 14px rgba(0,0,0,0.22), inset 0 2px 4px rgba(255,255,255,0.12)",
          }}
        >
          {/* Wood grain lines */}
          {[15, 35, 55, 75].map((pct) => (
            <div
              key={pct}
              className="absolute top-2 bottom-2 rounded-full opacity-20"
              style={{ left: `${pct}%`, width: "1px", background: "#5c3d1e" }}
            />
          ))}
        </div>

        {/* Brass plate on wood shelf */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex items-center justify-center">
          <div
            className="px-3 py-0.5 rounded-[2px] font-serif text-[9px] uppercase tracking-widest font-extrabold text-amber-950 shadow-sm border border-amber-700/50 select-none"
            style={{
              background: "linear-gradient(to bottom, #ffe066, #d4af37, #aa8010)",
              boxShadow: "inset 0 1px 1px rgba(255,255,255,0.4), 0 1px 3px rgba(0,0,0,0.3)",
              textShadow: "0.5px 0.5px 0px rgba(255,255,255,0.3)"
            }}
          >
            Seção {["I", "II", "III", "IV"][shelfIndex]}
          </div>
        </div>

        {/* Drop shadow beneath shelf */}
        <div
          className="absolute left-4 right-4 rounded-full pointer-events-none"
          style={{
            height: "8px",
            background: "rgba(0,0,0,0.12)",
            filter: "blur(6px)",
            top: "16px",
          }}
        />

        {/* Shelf brackets */}
        {[8, 92].map((pct) => (
          <div
            key={pct}
            className="absolute bottom-0"
            style={{
              left: `${pct}%`,
              transform: "translateX(-50%)",
              width: "10px",
              height: "30px",
              background: "linear-gradient(to bottom, #a07850, #7a5c38)",
              clipPath: "polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)",
              boxShadow: "2px 0 6px rgba(0,0,0,0.15)",
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}

/* ── Main Page ────────────────────────────────────────── */
export default function GardenPage() {
  const [selectedFlower, setSelectedFlower] = useState<Flower | null>(null);

  return (
    <div
      className="min-h-screen pt-20 pb-32 relative overflow-hidden"
      style={{ background: "linear-gradient(to bottom, #fdf6ec, #faf0e6, #f5e6d4)" }}
    >
      {/* Floating Petals background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {FLOATING_PETALS.map((petal) => (
          <motion.div
            key={petal.id}
            className="absolute text-rose-300/30 select-none"
            style={{
              left: petal.left,
              top: "-5%",
              fontSize: `${petal.size}px`,
            }}
            animate={{
              y: ["0vh", "105vh"],
              x: ["0px", (petal.id % 2 === 0 ? "40px" : "-40px"), "0px"],
              rotate: [0, 360],
            }}
            transition={{
              duration: petal.duration,
              repeat: Infinity,
              delay: petal.delay,
              ease: "linear",
            }}
          >
            {petal.emoji}
          </motion.div>
        ))}
      </div>
      {/* ── Page Header ── */}
      <div className="container relative z-10">
        {/* Hand-lettered style title */}
        <motion.div
          className="text-center mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-amber-700/60 text-xs uppercase tracking-[0.4em] font-medium mb-2">
            ✿ Boutique de Flores ✿
          </p>
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-amber-900 leading-tight">
            Jardim das
            <span className="block text-rose-600 italic">Memórias</span>
          </h1>
          <p className="mt-3 text-amber-800/60 font-serif italic text-base">
            Cada flor guarda um momento nosso
          </p>
        </motion.div>

        {/* Rex Orange County quote */}
        <motion.div
          className="flex justify-center mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-rose-200/60 text-rose-600/80 text-xs italic"
            style={{ background: "rgba(255,255,255,0.5)", backdropFilter: "blur(8px)" }}
          >
            <Music className="w-3.5 h-3.5" />
            <span>"You make me feel something I've never felt before" 🌸</span>
            <Music className="w-3.5 h-3.5" />
          </div>
        </motion.div>
      </div>

      {/* ── Flower Shop Scene ── */}
      <div
        className="relative mx-auto max-w-5xl px-4"
        style={{ perspective: "1200px" }}
      >
        {/* WALL background */}
        <motion.div
          className="relative rounded-3xl overflow-hidden"
          style={{
            background: "linear-gradient(170deg, #f9f1e4 0%, #f3e6cf 40%, #eddcbb 100%)",
            boxShadow: "0 30px 80px rgba(139,95,60,0.2), inset 0 0 60px rgba(255,240,200,0.3)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Ambient window light from top */}
          <div
            className="absolute inset-x-0 top-0 pointer-events-none"
            style={{
              height: "200px",
              background: "radial-gradient(ellipse at 50% -10%, rgba(255,235,180,0.6) 0%, transparent 70%)",
            }}
          />

          {/* Fairy lights string */}
          <div className="absolute top-6 left-0 right-0 flex justify-center gap-8 px-12 pointer-events-none z-10">
            {Array.from({ length: 16 }).map((_, i) => (
              <motion.div
                key={i}
                className="rounded-full"
                style={{ width: "6px", height: "8px", background: i % 3 === 0 ? "#fde68a" : i % 3 === 1 ? "#fca5a5" : "#c4b5fd" }}
                animate={{ opacity: [0.5, 1, 0.5], scale: [0.9, 1.1, 0.9] }}
                transition={{ duration: 1.5 + (i * 0.2) % 1, repeat: Infinity, delay: (i * 0.15) % 2 }}
              />
            ))}
          </div>

          {/* Wire for fairy lights */}
          <div
            className="absolute pointer-events-none"
            style={{ top: "10px", left: "5%", right: "5%", height: "1px", background: "rgba(100,70,40,0.25)", zIndex: 9 }}
          />

          {/* Hanging vines on sides */}
          <div className="absolute top-0 left-4 flex flex-col gap-0 pointer-events-none" style={{ zIndex: 5 }}>
            {["🌿", "🍃", "🌿", "🍃"].map((v, i) => (
              <motion.span
                key={i}
                style={{ fontSize: "22px", opacity: 0.6, lineHeight: 1.4 }}
                animate={{ rotate: [0, -4, 4, 0] }}
                transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.3 }}
              >
                {v}
              </motion.span>
            ))}
          </div>
          <div className="absolute top-0 right-4 flex flex-col gap-0 pointer-events-none" style={{ zIndex: 5 }}>
            {["🍃", "🌿", "🍃", "🌿"].map((v, i) => (
              <motion.span
                key={i}
                style={{ fontSize: "22px", opacity: 0.6, lineHeight: 1.4 }}
                animate={{ rotate: [0, 4, -4, 0] }}
                transition={{ duration: 3.5 + i * 0.4, repeat: Infinity, delay: i * 0.2 }}
              >
                {v}
              </motion.span>
            ))}
          </div>

          {/* Small sparkles */}
          {[15, 30, 50, 70, 85].map((pct, i) => (
            <motion.div
              key={i}
              className="absolute pointer-events-none text-yellow-300/50 text-xs"
              style={{ left: `${pct}%`, top: `${20 + (i * 12) % 30}%` }}
              animate={{ opacity: [0, 0.8, 0], scale: [0.5, 1, 0.5] }}
              transition={{ duration: 2 + i * 0.5, repeat: Infinity, delay: i * 0.7 }}
            >
              ✦
            </motion.div>
          ))}

          {/* ── SHELVES ── */}
          <div className="pt-16 pb-8 px-6 md:px-12 space-y-2">
            {shelves.map((shelfFlowers, si) => (
              <WoodenShelf
                key={si}
                flowers={shelfFlowers}
                shelfIndex={si}
                onFlowerClick={setSelectedFlower}
              />
            ))}
          </div>

          {/* Floor / base of shop */}
          <div
            style={{
              height: "24px",
              background: "linear-gradient(to bottom, #c8a97e, #a07850)",
              borderRadius: "0 0 24px 24px",
            }}
          />

          {/* Subtle vignette around shop */}
          <div
            className="absolute inset-0 rounded-3xl pointer-events-none"
            style={{
              boxShadow: "inset 0 0 80px rgba(139,95,60,0.15)",
            }}
          />
        </motion.div>

        {/* Sign above the shop */}
        <motion.div
          className="absolute -top-10 left-1/2 -translate-x-1/2 z-10"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div
            className="px-8 py-2 rounded-b-xl font-serif text-sm font-bold text-amber-900"
            style={{ background: "linear-gradient(to bottom, #a07850, #8b6640)", color: "#fde68a", boxShadow: "0 6px 20px rgba(0,0,0,0.2)" }}
          >
            🌸 Floristeria da Nossa História 🌸
          </div>
        </motion.div>

        {/* Flower count tag */}
        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <p className="font-serif italic text-amber-800/50 text-sm">
            {flowersData.length} flores cultivadas com amor ✿
          </p>
          <p className="text-amber-700/40 text-xs mt-1">Clique em qualquer flor para conhecer sua história</p>
        </motion.div>
      </div>

      {/* ── Flower Detail Modal ── */}
      <Modal
        isOpen={!!selectedFlower}
        onClose={() => setSelectedFlower(null)}
        title={selectedFlower?.name}
        className="bg-[#fdfcf7] border border-amber-200/80 max-w-md"
      >
        {selectedFlower && (() => {
          const colors = colorMap[selectedFlower.color] ?? { petal: "#F472B6", center: "#FDE68A", stem: "#16a34a" };
          return (
            <div className="space-y-6">
              {/* Detailed SVG Flower display */}
              <div
                className="w-full flex flex-col items-center justify-center rounded-2xl relative overflow-hidden"
                style={{ height: "220px", background: "radial-gradient(circle, #fdfaf4 0%, #f7ebd4 100%)", border: "1px solid rgba(220,190,160,0.25)" }}
              >
                {/* Floating petals in the background */}
                {Array.from({ length: 4 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute pointer-events-none text-rose-300/20"
                    style={{
                      fontSize: "18px",
                      left: `${15 + (i * 22)}%`,
                      top: `${10 + (i * 25) % 60}%`
                    }}
                    animate={{
                      y: [0, 60, 0],
                      rotate: [0, 180, 360],
                      opacity: [0.1, 0.4, 0.1]
                    }}
                    transition={{
                      duration: 6 + i * 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    🌸
                  </motion.div>
                ))}

                {/* Large Boutique Flower SVG */}
                <motion.div
                  animate={{ rotate: [0, -2, 2, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  className="flex flex-col items-center origin-bottom scale-[1.5]"
                >
                  <svg width="52" height="52" viewBox="0 0 100 100" className="drop-shadow-md">
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
                    <circle cx="50" cy="50" r="14" fill={colors.center} />
                    <circle cx="50" cy="50" r="7" fill="rgba(0,0,0,0.08)" />
                  </svg>

                  {/* Stem */}
                  <div
                    className="w-1.5 rounded-full relative -mt-1"
                    style={{ height: "48px", background: "linear-gradient(to bottom, #22c55e, #15803d)" }}
                  >
                    {/* Left leaf */}
                    <div
                      className="absolute rounded-full"
                      style={{
                        width: "18px", height: "9px",
                        background: "#16a34a",
                        top: "14px",
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
                        top: "28px",
                        right: "-12px",
                        transform: "rotate(35deg)",
                        borderRadius: "50% 0 50% 50%",
                      }}
                    />
                  </div>

                  {/* Pot */}
                  <div className="relative" style={{ marginTop: "-2px" }}>
                    <div
                      className="rounded-sm"
                      style={{
                        width: "40px", height: "7px",
                        background: "linear-gradient(to bottom, #c2410c, #9a3412)",
                        borderRadius: "4px 4px 0 0",
                      }}
                    />
                    <div
                      style={{
                        width: "36px", height: "26px",
                        background: "linear-gradient(135deg, #ea580c, #c2410c, #9a3412)",
                        borderRadius: "2px 2px 8px 8px",
                        margin: "0 auto",
                        boxShadow: "inset -3px 0 6px rgba(0,0,0,0.15), inset 3px 0 4px rgba(255,255,255,0.1)",
                      }}
                    />
                  </div>
                </motion.div>
              </div>

              {/* Florist Vintage Card Tag */}
              <div className="bg-[#fbfaf5] border border-amber-200/60 rounded-2xl p-5 shadow-sm relative overflow-hidden"
                style={{
                  backgroundImage: "radial-gradient(#e5d3b3 0.75px, transparent 0.75px)",
                  backgroundSize: "14px 14px",
                }}
              >
                {/* String hole in card */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-[#fdfcf7] border border-amber-200/60 shadow-inner flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-900/10" />
                </div>
                
                <div className="pt-4 space-y-4 text-center">
                  <h3 className="font-serif text-xl font-bold text-amber-950 tracking-wide mt-1">
                    {selectedFlower.name}
                  </h3>
                  
                  {/* Decorative flourish */}
                  <div className="text-amber-850/40 text-[9px] uppercase tracking-[0.3em] flex items-center justify-center gap-2">
                    <span className="w-8 h-[1px] bg-amber-800/20" />
                    <span>Flor N° {selectedFlower.id}</span>
                    <span className="w-8 h-[1px] bg-amber-800/20" />
                  </div>

                  <div className="flex flex-col items-center justify-center gap-2 text-xs font-serif text-amber-900/80">
                    <div className="flex items-center gap-1.5">
                      <span className="text-amber-700/50">Cultivada por:</span>
                      <span className={`px-2.5 py-0.5 rounded-full font-sans font-semibold text-[10px] ${
                        selectedFlower.plantedBy === "man" 
                          ? "bg-pink-50 text-pink-600 border border-pink-100" 
                          : selectedFlower.plantedBy === "woman" 
                          ? "bg-purple-50 text-purple-600 border border-purple-100" 
                          : "bg-amber-50 text-amber-700 border border-amber-100"
                      }`}>
                        {getBadgeLabel(selectedFlower.plantedBy)}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-amber-700/50">Data de plantio:</span>
                      <span className="font-sans font-medium text-amber-850">{formatDate(selectedFlower.date)}</span>
                    </div>
                  </div>

                  {/* Memory message */}
                  <div className="bg-white/95 border border-amber-100/50 rounded-xl p-4 text-left shadow-sm">
                    <p className="text-amber-950/80 leading-relaxed font-serif italic text-[14px]">
                      "{selectedFlower.description}"
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}
      </Modal>
    </div>
  );
}
