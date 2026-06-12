import { motion } from "framer-motion";
import { Link } from "wouter";
import { ROUTES, APP_NAME, MAIN_TAGLINE, RELATIONSHIP_START_DATE } from "@/constants";
import { calculateDaysTogether, formatDaysToReadable } from "@/utils/dateFormatter";
import { Card, PageTitle } from "@/components/common";
import { Heart, Clock, BookOpen, MapPin, Flower, Gift } from "lucide-react";

const experiences = [
  {
    id: "timeline",
    title: "Cápsula do Tempo",
    description: "Reviva os momentos especiais que vivemos juntos",
    icon: Clock,
    route: ROUTES.TIMELINE,
    color: "from-red-400 to-red-600",
  },
  {
    id: "reasons",
    title: "100 Motivos",
    description: "Descubra por que você é tão especial para mim",
    icon: Heart,
    route: ROUTES.REASONS,
    color: "from-pink-400 to-red-500",
  },
  {
    id: "story",
    title: "Livro Interativo",
    description: "Nossa história contada capítulo por capítulo",
    icon: BookOpen,
    route: ROUTES.STORY,
    color: "from-rose-400 to-pink-500",
  },
  {
    id: "places",
    title: "Lugares Especiais",
    description: "Explore os lugares que marcaram nossa jornada",
    icon: MapPin,
    route: ROUTES.PLACES,
    color: "from-amber-400 to-orange-500",
  },
  {
    id: "garden",
    title: "Jardim Virtual",
    description: "Um jardim de flores que representam nossas memórias",
    icon: Flower,
    route: ROUTES.GARDEN,
    color: "from-purple-400 to-pink-500",
  },
];

export default function HomePage() {
  const daysTogether = calculateDaysTogether(RELATIONSHIP_START_DATE);
  const readableDays = formatDaysToReadable(daysTogether);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-pink-50 to-white">
      {/* Hero Section */}
      <motion.section
        className="container py-16 md:py-24"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-center max-w-2xl mx-auto">
          <motion.div
            className="flex justify-center mb-6"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Heart className="w-16 h-16 text-red-500 fill-red-500" />
          </motion.div>

          <h1 className="font-serif text-5xl md:text-6xl font-bold text-gray-800 mb-4">
            {APP_NAME}
          </h1>

          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            {MAIN_TAGLINE}
          </p>

          <motion.div
            className="bg-gradient-to-r from-pink-100 to-red-100 rounded-lg p-8 mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-sm font-medium text-gray-600 uppercase tracking-wider mb-2">
              Tempo Juntos
            </p>
            <p className="font-serif text-4xl font-bold text-red-600">
              {daysTogether} dias
            </p>
            <p className="text-gray-600 mt-2">{readableDays}</p>
          </motion.div>
        </div>
      </motion.section>

      {/* Experiences Grid */}
      <section className="container py-16">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {experiences.map((exp, index) => {
            const Icon = exp.icon;
            return (
              <Link key={exp.id} href={exp.route}>
                <a>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card hoverable>
                      <div className={`bg-gradient-to-br ${exp.color} rounded-lg p-6 mb-4 text-white`}>
                        <Icon className="w-12 h-12" />
                      </div>
                      <h3 className="font-serif text-2xl font-bold text-gray-800 mb-2">
                        {exp.title}
                      </h3>
                      <p className="text-gray-600">{exp.description}</p>
                    </Card>
                  </motion.div>
                </a>
              </Link>
            );
          })}
        </motion.div>
      </section>

      {/* CTA Section */}
      <motion.section
        className="container py-16 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="bg-gradient-to-r from-red-500 to-pink-500 rounded-lg p-12 text-white">
          <Gift className="w-12 h-12 mx-auto mb-4" />
          <h2 className="font-serif text-3xl font-bold mb-4">Comece a Explorar</h2>
          <p className="text-lg opacity-90 mb-6">
            Escolha uma experiência acima e mergulhe em nossas memórias especiais
          </p>
        </div>
      </motion.section>
    </div>
  );
}
