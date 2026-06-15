import { motion } from "framer-motion";

interface PageTitleProps {
  title: string;
  subtitle?: string;
}

export function PageTitle({ title, subtitle }: PageTitleProps) {
  return (
    <motion.div
      className="text-center py-10"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="font-serif text-5xl md:text-6xl font-bold text-slate-800 mb-3">
        {title}
      </h1>
      {subtitle && (
        <p className="text-slate-500 text-base font-medium">{subtitle}</p>
      )}
      {/* Decorative separator */}
      <div className="flex items-center justify-center gap-3 mt-5">
        <span className="w-12 h-px bg-gradient-to-r from-transparent to-purple-500/40" />
        <span className="w-1.5 h-1.5 rounded-full bg-purple-500/50" />
        <span className="w-1.5 h-1.5 rounded-full bg-purple-400/70" />
        <span className="w-1.5 h-1.5 rounded-full bg-purple-500/50" />
        <span className="w-12 h-px bg-gradient-to-l from-transparent to-purple-500/40" />
      </div>
    </motion.div>
  );
}
