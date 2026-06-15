import { motion } from "framer-motion";
import { Calendar, Heart, MessageCircle, Navigation, Camera, Sparkles, Home } from "lucide-react";
import { TimelineItem } from "../../types";
import { formatDate } from "../../utils/dateFormatter";

interface TimelineCardProps {
  item: TimelineItem;
  index: number;
}

export function TimelineCard({ item, index }: TimelineCardProps) {
  const isEven = index % 2 === 0;

  // Determine colors based on perspective
  const colors = {
    man: {
      dot: "bg-man border-man text-white ring-man/30",
      border: "border-man/20 hover:border-man/60",
      badge: "bg-man-light text-man",
      shadow: "hover:shadow-man/10",
      iconColor: "text-man",
      perspectiveLabel: "Por Ele",
    },
    woman: {
      dot: "bg-woman border-woman text-white ring-woman/30",
      border: "border-woman/20 hover:border-woman/60",
      badge: "bg-woman-light text-woman",
      shadow: "hover:shadow-woman/10",
      iconColor: "text-woman",
      perspectiveLabel: "Por Ela",
    },
    both: {
      dot: "bg-primary border-primary text-white ring-primary/30",
      border: "border-primary/20 hover:border-primary/60",
      badge: "bg-purple-100 text-primary",
      shadow: "hover:shadow-primary/10",
      iconColor: "text-primary",
      perspectiveLabel: "Nós Dois",
    },
  }[item.perspective || "both"];

  // Select icon based on content/index
  const getIcon = () => {
    switch (index) {
      case 0:
        return <Sparkles className="w-5 h-5" />;
      case 1:
        return <MessageCircle className="w-5 h-5" />;
      case 2:
        return <Heart className="w-5 h-5" />;
      case 3:
        return <Heart className="w-5 h-5 fill-current" />;
      case 4:
        return <Navigation className="w-5 h-5" />;
      case 5:
        return <Camera className="w-5 h-5" />;
      case 6:
        return <Home className="w-5 h-5" />;
      default:
        return <Calendar className="w-5 h-5" />;
    }
  };

  return (
    <div className={`flex flex-col md:flex-row items-center w-full min-h-[150px] relative ${
      isEven ? "md:flex-row-reverse" : ""
    }`}>
      {/* Spacer for Desktop */}
      <div className="hidden md:block w-1/2" />

      {/* Center Circle Indicator */}
      <div className="absolute left-4 md:left-1/2 -translate-x-1/2 z-10 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
          className={`w-10 h-10 rounded-full border-2 flex items-center justify-center ring-4 shadow-md ${colors.dot}`}
        >
          {getIcon()}
        </motion.div>
      </div>

      {/* Card Content Container */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? 50 : -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full md:w-1/2 pl-16 pr-4 md:px-8 py-2"
      >
        <div className={`bg-white p-6 rounded-2xl border transition-all duration-300 shadow-sm ${colors.border} ${colors.shadow}`}>
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <span className="text-sm font-semibold text-slate-400">
              {formatDate(item.date)}
            </span>
            <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${colors.badge}`}>
              {colors.perspectiveLabel}
            </span>
          </div>

          <h3 className="font-serif text-xl font-bold text-slate-800 mb-2 hover:text-primary transition-colors">
            {item.title}
          </h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            {item.description}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
