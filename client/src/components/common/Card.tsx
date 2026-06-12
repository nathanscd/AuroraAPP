import { motion } from "framer-motion";
import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

export function Card({ children, className = "", onClick, hoverable = false }: CardProps) {
  return (
    <motion.div
      className={`bg-white rounded-lg border border-pink-100 shadow-sm p-6 ${
        hoverable ? "cursor-pointer" : ""
      } ${className}`}
      onClick={onClick}
      whileHover={hoverable ? { y: -4, boxShadow: "0 12px 24px rgba(0,0,0,0.1)" } : {}}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}
