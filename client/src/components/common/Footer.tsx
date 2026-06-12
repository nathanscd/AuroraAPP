import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gradient-to-r from-pink-50 to-red-50 border-t border-pink-100 py-8">
      <div className="container">
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-500 fill-red-500" />
            <span className="font-serif text-lg font-semibold text-gray-800">Memórias Especiais</span>
          </div>
          <p className="text-sm text-gray-600 text-center">
            Uma coleção de memórias que construímos juntos
          </p>
          <p className="text-xs text-gray-500">
            © 2024 - Feito com amor
          </p>
        </div>
      </div>
    </footer>
  );
}
