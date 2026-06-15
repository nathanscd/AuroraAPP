import { Heart, Music } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-transparent to-pink-50/80 pt-10 pb-8 mt-auto relative overflow-hidden border-t border-purple-100/50">
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          background:
            "radial-gradient(ellipse at 50% 120%, oklch(0.95 0.05 340 / 0.5), transparent 60%)",
        }}
      />

      <div className="container relative">
        <div className="flex flex-col items-center justify-center gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-purple-400 fill-purple-400/20" />
            <span className="font-serif text-2xl font-bold text-slate-800">
              Aurora
            </span>
            <Heart className="w-5 h-5 text-purple-400 fill-purple-400/20" />
          </div>

          {/* Seven reference */}
          <div className="flex items-center gap-3 text-slate-500 text-xs">
            <span className="w-8 h-px bg-purple-500/30" />
            <span className="italic">sete razões para sorrir a cada dia</span>
            <span className="w-8 h-px bg-purple-500/30" />
          </div>

          {/* Music quote */}
          <div className="flex flex-col items-center text-slate-500 text-xs italic">
            
            <span>"I wanna be the one that makes your day" </span>
            <span>— Best Friend - Rex Orange County</span>
          </div>

          {/* Tagline */}
          <p className="text-slate-400 text-[11px] text-center max-w-xs leading-relaxed">
            Uma coleção de memórias que construímos juntos, com amor e alegria.
          </p>

          <p className="text-slate-400 text-[10px]">© 2026 — Feito com 💜</p>
        </div>
      </div>
    </footer>
  );
}
