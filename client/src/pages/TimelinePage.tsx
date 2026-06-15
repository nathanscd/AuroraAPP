import { motion } from "framer-motion";
import { timelineData } from "../data/timelineData";
import { PageTitle } from "../components/common";
import { TimelineCard } from "../components/timeline/TimelineCard";
import { Star } from "lucide-react";

export default function TimelinePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-rose-50/50 to-purple-50/50 pt-25 pb-50">
      <div className="container">
        <PageTitle
          title="Cápsula do Tempo"
          subtitle="Uma jornada através dos momentos que nos definiram"
        />

        {/* 7 moments badge */}
        <motion.div
          className="flex justify-center mb-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-purple-500/10 border border-purple-400/20 text-purple-600 text-sm font-semibold backdrop-blur-sm">
            <Star className="w-4 h-4 fill-purple-400/40" />
            <span className="seven-badge w-6 h-6 text-xs">7</span>
            <span>momentos que nos moldaram</span>
            <Star className="w-4 h-4 fill-purple-400/40" />
          </div>
        </motion.div>

        <motion.div
          className="relative py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* Timeline Line — purple gradient */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-400/10 via-purple-500/60 to-purple-400/10" />

          {/* Timeline Items */}
          <div className="relative space-y-12">
            {timelineData.map((item, index) => (
              <TimelineCard key={item.id} item={item} index={index} />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
