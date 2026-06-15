import { motion } from "framer-motion";
import { Link } from "wouter";
import { ROUTES, APP_NAME, MAIN_TAGLINE, RELATIONSHIP_START_DATE } from "../constants";
import { calculateDaysTogether, formatDaysToReadable } from "../utils/dateFormatter";
import { Card, PageTitle } from "../components/common";
import { Heart, Clock, BookOpen, MapPin, Flower, Music, Star, Sparkles } from "lucide-react";

const experiences = [
  {
    id: "timeline",
    title: "Cápsula do Tempo",
    description: "Reviva os momentos especiais que vivemos juntos",
    icon: Clock,
    route: ROUTES.TIMELINE,
    gradient: "from-violet-600 via-purple-600 to-indigo-600",
    glow: "shadow-purple-500/25",
  },
  {
    id: "reasons",
    title: "Motivos",
    description: "Descubra por que você é tão especial para mim",
    icon: Heart,
    route: ROUTES.REASONS,
    gradient: "from-purple-600 via-fuchsia-600 to-pink-600",
    glow: "shadow-fuchsia-500/25",
  },
  {
    id: "story",
    title: "Livro Interativo",
    description: "Nossa história contada capítulo por capítulo",
    icon: BookOpen,
    route: ROUTES.STORY,
    gradient: "from-indigo-600 via-violet-600 to-purple-600",
    glow: "shadow-violet-500/25",
  },
  {
    id: "places",
    title: "Lugares Especiais",
    description: "Explore os lugares que marcaram nossa jornada",
    icon: MapPin,
    route: ROUTES.PLACES,
    gradient: "from-violet-500 via-purple-500 to-indigo-500",
    glow: "shadow-violet-400/25",
  },
  {
    id: "garden",
    title: "Jardim Virtual",
    description: "Um jardim de flores que representam nossas memórias",
    icon: Flower,
    route: ROUTES.GARDEN,
    gradient: "from-fuchsia-600 via-purple-600 to-violet-600",
    glow: "shadow-fuchsia-400/25",
  },
];

// Animated music bar component
function MusicBars({ color = "text-white" }: { color?: string }) {
  return (
    <span className={`inline-flex items-end gap-0.5 h-5 ${color}`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className="music-bar" style={{ animationDelay: `${(i - 1) * 0.15}s` }} />
      ))}
    </span>
  );
}

export default function HomePage() {
  const daysTogether = calculateDaysTogether(RELATIONSHIP_START_DATE);
  const readableDays = formatDaysToReadable(daysTogether);

  return (
    <div className="min-h-[100vh] overflow-hidden">
      {/* ──────────────── HERO ──────────────── */}
      <section className="relative min-h-[100vh] flex items-center justify-center align-center overflow-hidden">
        {/* Ambient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-rose-50/60 to-purple-50/60" />

        {/* Glow orbs */}
        <div className="glow-orb w-96 h-96 bg-purple-600/20 top-[-10%] left-[-10%]" />
        <div className="glow-orb w-80 h-80 bg-fuchsia-500/15 top-[30%] right-[-8%]" />
        <div className="glow-orb w-64 h-64 bg-violet-400/10 bottom-[10%] left-[20%]" />

        {/* Star particles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-purple-300/40"
            style={{
              top: `${Math.random() * 90 + 5}%`,
              left: `${Math.random() * 90 + 5}%`,
            }}
            animate={{ opacity: [0.2, 0.8, 0.2], scale: [0.8, 1.4, 0.8] }}
            transition={{
              duration: 2.5 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}

        {/* Content */}
        <motion.div
          className="relative z-10 text-center px-6 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {/* Pill label */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/15 border border-purple-400/20 text-purple-300 text-xs font-semibold uppercase tracking-widest mb-8"
          >
            <Sparkles className="w-3 h-3" />
            Uma história de amor
            <Sparkles className="w-3 h-3" />
          </motion.div>

          <motion.h1
            className="font-serif text-6xl md:text-8xl font-bold text-slate-800 glow-text mb-6 leading-none tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {APP_NAME}
          </motion.h1>

          <motion.p
            className="text-slate-600 text-lg md:text-xl leading-relaxed mb-10 max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {MAIN_TAGLINE}
          </motion.p>

          {/* Days together counter */}
          <motion.div
            className="inline-block glass-card rounded-3xl px-10 py-6 relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 }}
          >
            <div className="shimmer absolute inset-0 rounded-3xl" />
            <div className="relative">
              <p className="text-purple-500 text-xs font-bold uppercase tracking-widest mb-1">
                ✦ Tempo Juntos ✦
              </p>
              <motion.p
                className="font-serif text-5xl md:text-6xl font-extrabold text-black glow-text"
                animate={{ scale: [1, 1.03, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                {daysTogether} dias
              </motion.p>
              <p className="text-black/70 text-sm font-medium mt-2">{readableDays}</p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ──────────────── BEST FRIEND BANNER ──────────────── 
      <motion.section
        className="relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 py-5 px-6">
          <div className="container mx-auto flex flex-col sm:flex-row items-center justify-center gap-4 text-white">
            <div className="flex items-center gap-3">
              <Music className="w-5 h-5 text-purple-200 shrink-0" />
              <MusicBars />
            </div>
            <div className="text-center sm:text-left">
              <p className="text-xs text-purple-200 font-semibold uppercase tracking-widest">Nossa Música</p>
              <p className="font-serif text-lg font-bold">
                "Best Friend" — Rex Orange County
              </p>
            </div>
            <div className="flex items-center gap-3">
              <MusicBars />
              <Music className="w-5 h-5 text-purple-200 shrink-0" />
            </div>
          </div>
          <p className="text-center text-purple-100/70 text-xs italic mt-2">
            "I still wanna be your favorite boy" 🎵
          </p>
        </div>
      </motion.section>
      */}

      {/* ──────────────── LUCKY NUMBER 7 ──────────────── */}
      <section className="py-16 px-6 relative overflow-hidden">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            className="relative glass-card rounded-4xl p-8 md:p-12 overflow-hidden border border-purple-400/10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="shimmer absolute inset-0 rounded-4xl" />
            <div className="relative flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
              {/* The 7 */}
              <motion.div
                className="seven-badge w-28 h-28 text-5xl shrink-0 text-white"
                animate={{ rotate: [0, -3, 3, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              >
                7
              </motion.div>
              <div>
                <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
                  <Star className="w-4 h-4 text-purple-400 fill-purple-400/40" />
                  <p className="text-purple-400 text-xs font-bold uppercase tracking-widest">Nosso Número</p>
                  <Star className="w-4 h-4 text-purple-400 fill-purple-400/40" />
                </div>
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-black mb-3">
                  O <span className="gradient-text">Sete</span> que nos define
                </h2>
                <p className="text-gray-950 opacity-80 leading-relaxed text-sm md:text-base max-w-lg">
                  O sete sempre esteve presente em nossa jornada. Sete capítulos da nossa história, sete marcos que nos tornaram quem somos hoje — e é o número que carregamos no coração como símbolo da nossa sorte de ter nos encontrado.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ──────────────── COUPLE PROFILES ──────────────── */}
      <section className="bg-white py-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.h2
            className="font-serif text-3xl md:text-4xl font-bold text-center text-slate-800 mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Nossos Perfis
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Nathanael — Man (Red) */}
            <motion.div
              whileHover={{ y: -8, scale: 1.01 }}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative rounded-3xl p-8 overflow-hidden bg-white border border-man/15 shadow-lg shadow-man/5"
            >
              <div
                className="absolute inset-0 opacity-5 pointer-events-none"
                style={{
                  background: "radial-gradient(ellipse at top right, oklch(0.6 0.22 25), transparent 70%)",
                }}
              />
              <div className="relative">
                <div className="flex items-center gap-4 mb-5">
                  <motion.div
                    className="w-16 h-16 rounded-2xl bg-man-light flex items-center justify-center border border-man/20 shadow-inner"
                    whileHover={{ rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <span className="font-serif text-3xl text-man font-bold">N</span>
                  </motion.div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-slate-800">Ele</h3>
                    <span
                      className="text-[11px] font-bold px-3 py-1 rounded-full"
                      style={{ background: "oklch(0.96 0.02 25)", color: "oklch(0.6 0.22 25)" }}
                    >
                      Nathanael
                    </span>
                  </div>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">
                  O sonhador e criador deste espaço. Sempre busca arrancar os melhores sorrisos dela, adora recordar cada capítulo da nossa história e planejar o amanhã com amor e dedicação.
                </p>
                <div className="mt-5 flex items-center gap-2 text-man text-xs font-semibold">
                  <Heart className="w-3.5 h-3.5 fill-man/30" />
                  <span>Ama você do jeito que você é</span>
                </div>
              </div>
            </motion.div>

            {/* Partner — Woman (Blue) */}
            <motion.div
              whileHover={{ y: -8, scale: 1.01 }}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative rounded-3xl p-8 overflow-hidden bg-white border border-woman/15 shadow-lg shadow-woman/5"
            >
              <div
                className="absolute inset-0 opacity-5 pointer-events-none"
                style={{
                  background: "radial-gradient(ellipse at top right, oklch(0.6 0.2 230), transparent 70%)",
                }}
              />
              <div className="relative">
                <div className="flex items-center gap-4 mb-5">
                  <motion.div
                    className="w-16 h-16 rounded-2xl bg-woman-light flex items-center justify-center border border-woman/20 shadow-inner"
                    whileHover={{ rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <span className="font-serif text-3xl text-woman font-bold">J</span>
                  </motion.div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-slate-800">Ela</h3>
                    <span
                      className="text-[11px] font-bold px-3 py-1 rounded-full"
                      style={{ background: "oklch(0.96 0.02 230)", color: "oklch(0.6 0.2 230)" }}
                    >
                      Jaciara
                    </span>
                  </div>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">
                  A musa inspiradora, dona do sorriso que ilumina qualquer ambiente e do abraço que serve de abrigo seguro. Enche cada momento de cumplicidade, amor genuíno e uma luz única.
                </p>
                <div className="mt-5 flex items-center gap-2 text-woman text-xs font-semibold">
                  <Heart className="w-3.5 h-3.5 fill-woman/30" />
                  <span>Ilumina os dias mais escuros</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ──────────────── CLOSING CTA ──────────────── */}
      <motion.section
        className="relative overflow-hidden py-20 px-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white via-pink-50/50 to-purple-50/60" />
        <div className="glow-orb w-80 h-80 bg-purple-600/20 top-[-20%] left-[-10%]" />
        <div className="glow-orb w-60 h-60 bg-fuchsia-500/15 bottom-[-10%] right-[-5%]" />

        <div className="relative container mx-auto max-w-2xl text-center">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="inline-flex mb-6"
          >
            <Heart className="w-14 h-14 text-purple-400 fill-purple-400/20" />
          </motion.div>

          <h2 className="font-serif text-3xl md:text-5xl font-bold text-slate-800 mb-4 glow-text">
            Mergulhe no Nosso <span className="text-7xl">UNIVERSO</span>
          </h2>
          <p className="text-slate-600 text-base leading-relaxed mb-8">
            Cada página guarda um pedaço da nossa história. Explore, relembre e sinta o amor que construímos juntos, dia após dia.
          </p>

          {/* Best Friend lyric quote */}
          <div className="glass-card rounded-2xl px-6 py-4 inline-block">
            <p className="text-black text-sm italic font-medium">
              🎵 "I still wanna be your favorite boy" 🎵
            </p>
            <p className="text-black/60 text-xs mt-1">— Rex Orange County</p>
          </div>
        </div>

      </motion.section>

      {/* ──────────────── EXPERIENCES GRID ──────────────── */}
      <section className="bg-gradient-to-b from-white via-purple-50/30 to-purple-50/60 py-20 px-6">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-purple-500 text-xs font-bold uppercase tracking-widest mb-2">✦ Explore ✦</p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-800">
              Nossas Experiências
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {experiences.map((exp, index) => {
              const Icon = exp.icon;
              return (
                <Link key={exp.id} href={exp.route}>
                  <a className="block group">
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      whileHover={{ y: -10, scale: 1.02 }}
                      transition={{ duration: 0.4, delay: index * 0.07 }}
                      viewport={{ once: true }}
                      className={`relative bg-white rounded-3xl p-6 border border-purple-100 shadow-lg ${exp.glow} hover:shadow-xl transition-all duration-300 overflow-hidden`}
                    >
                      {/* Background gradient peek */}
                      <div
                        className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl ${exp.gradient} rounded-bl-full opacity-5 group-hover:opacity-10 transition-opacity duration-300`}
                      />
                      <div className={`bg-gradient-to-br ${exp.gradient} rounded-2xl p-5 mb-5 inline-flex shadow-lg ${exp.glow}`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="font-serif text-xl font-bold text-slate-800 mb-2 group-hover:text-primary transition-colors duration-200">
                        {exp.title}
                      </h3>
                      <p className="text-slate-500 text-sm leading-relaxed">{exp.description}</p>

                      {/* Arrow indicator */}
                      <div className="mt-4 flex items-center gap-1 text-primary text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <span>Explorar</span>
                        <span>→</span>
                      </div>
                    </motion.div>
                  </a>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
