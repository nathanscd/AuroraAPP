interface BadgeProps {
  label: string;
  variant?: "default" | "secondary" | "accent" | "man" | "woman";
  className?: string;
}

export function Badge({ label, variant = "default", className = "" }: BadgeProps) {
  const variants = {
    default: "bg-purple-100 text-primary",
    secondary: "bg-purple-50 text-purple-700",
    accent: "bg-amber-100 text-amber-700",
    man: "bg-man-light text-man",
    woman: "bg-woman-light text-woman",
  };

  return (
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${variants[variant]} ${className}`}>
      {label}
    </span>
  );
}
