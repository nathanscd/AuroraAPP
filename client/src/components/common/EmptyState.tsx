import { ReactNode } from "react";
import { Heart } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: ReactNode;
}

export function EmptyState({ title, description, icon }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-4">
        {icon || <Heart className="w-16 h-16 text-gray-300" />}
      </div>
      <h3 className="font-serif text-2xl font-bold text-gray-600 mb-2">{title}</h3>
      {description && <p className="text-gray-500 max-w-md">{description}</p>}
    </div>
  );
}
