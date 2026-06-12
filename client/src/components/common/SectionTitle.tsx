interface SectionTitleProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export function SectionTitle({ title, subtitle, centered = true }: SectionTitleProps) {
  return (
    <div className={`${centered ? "text-center" : ""} mb-8`}>
      <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-800 mb-2">
        {title}
      </h2>
      {subtitle && (
        <p className="text-gray-600">
          {subtitle}
        </p>
      )}
    </div>
  );
}
