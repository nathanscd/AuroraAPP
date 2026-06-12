import { motion } from "framer-motion";

interface PageTitleProps {
  title: string;
  subtitle?: string;
}

export function PageTitle({ title, subtitle }: PageTitleProps) {
  return (
    <motion.div
      className="text-center py-12"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-800 mb-4">
        {title}
      </h1>
      {subtitle && (
        <p className="text-lg text-gray-600">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
