interface BadgeProps {
  label: string;
  variant?: "default" | "secondary" | "accent";
  className?: string;
}

export function Badge({ label, variant = "default", className = "" }: BadgeProps) {
  const variants = {
    default: "bg-red-100 text-red-700",
    secondary: "bg-pink-100 text-pink-700",
    accent: "bg-amber-100 text-amber-700",
  };

  return (
    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${variants[variant]} ${className}`}>
      {label}
    </span>
  );
}
