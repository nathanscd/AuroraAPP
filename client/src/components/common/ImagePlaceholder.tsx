import { Image as ImageIcon } from "lucide-react";

interface ImagePlaceholderProps {
  width?: string | number;
  height?: string | number;
  className?: string;
  color?: string;
}

export function ImagePlaceholder({
  width = "100%",
  height = "300px",
  className = "",
  color = "bg-gradient-to-br from-pink-100 to-red-100",
}: ImagePlaceholderProps) {
  return (
    <div
      className={`${color} rounded-lg flex items-center justify-center ${className}`}
      style={{ width, height }}
    >
      <div className="flex flex-col items-center gap-2 text-gray-400">
        <ImageIcon className="w-12 h-12" />
        <span className="text-sm">Imagem</span>
      </div>
    </div>
  );
}
