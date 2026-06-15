import { ReactNode } from "react";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline" | "man" | "woman";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  className?: string;
}

export function Button({
  children,
  onClick,
  variant = "primary",
  size = "md",
  disabled = false,
  className = "",
}: ButtonProps) {
  const variants = {
    primary: "bg-primary text-white hover:bg-primary/95 shadow-sm shadow-primary/10",
    secondary: "bg-purple-100 text-primary hover:bg-purple-200",
    outline: "border-2 border-primary text-primary hover:bg-purple-50",
    man: "bg-man text-white hover:bg-man/95 shadow-sm shadow-man/10",
    woman: "bg-woman text-white hover:bg-woman/95 shadow-sm shadow-woman/10",
  };

  const sizes = {
    sm: "px-3 py-1 text-sm",
    md: "px-6 py-2 text-base",
    lg: "px-8 py-3 text-lg",
  };

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      className={`rounded-lg font-medium transition-colors ${variants[variant]} ${sizes[size]} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
    >
      {children}
    </motion.button>
  );
}
