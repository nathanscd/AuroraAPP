import { motion } from "framer-motion";
import { timelineData } from "@/data/timelineData";
import { PageTitle } from "@/components/common";
import { TimelineCard } from "@/components/timeline/TimelineCard";

export default function TimelinePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-pink-50 py-12">
      <div className="container">
        <PageTitle
          title="Cápsula do Tempo"
          subtitle="Uma jornada através dos momentos que nos definiram"
        />

        <motion.div
          className="relative py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* Timeline Line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-red-300 to-pink-300" />

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
