import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Menu, X, Music } from "lucide-react";
import { ROUTES } from "../../constants";

export function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Início", path: ROUTES.HOME },
    { name: "Linha do Tempo", path: ROUTES.TIMELINE },
    { name: "Motivos", path: ROUTES.REASONS },
    { name: "Nossa História", path: ROUTES.STORY },
    { name: "Lugares Especiais", path: ROUTES.PLACES },
    { name: "Jardim Virtual", path: ROUTES.GARDEN },
  ];

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full top-0 z-50 ${scrolled ? "bg-white/80 backdrop-blur-xl" : "bg-transparent p-2"} transition-all duration-500`}>
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href={ROUTES.HOME}>
          <a className="flex items-center gap-2.5 group">
            <motion.div
              whileHover={{ scale: 1.15, rotate: 12 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="relative"
            >
              <Heart className="w-6 h-6 text-primary fill-primary/15" />
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-purple-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
            <span className="font-serif text-2xl font-bold">
              Aurora
            </span>
          </a>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = location === item.path;
            return (
              <Link key={item.path} href={item.path}>
                <a
                  className={`relative px-3 py-2 text-sm font-medium rounded-xl transition-all duration-200 ${
                    isActive
                      ? "text-primary"
                      : "text-slate-600 hover:text-primary"
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-1 left-3 right-3 h-0.5 bg-gradient-to-r from-purple-500 to-violet-500 rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              </Link>
            );
          })}
        </div>

        {/* Right side: music note */}
        <div className="hidden md:flex items-center gap-2 text-purple-400/60 text-xs font-medium italic">
          <Music className="w-3.5 h-3.5" />
          <span>Best Friend</span>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-slate-500 hover:text-primary hover:bg-purple-50 rounded-xl transition-all focus:outline-none"
          aria-label="Menu"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden bg-white/95 backdrop-blur-xl border-b border-purple-100 overflow-hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {navItems.map((item) => {
                const isActive = location === item.path;
                return (
                  <Link key={item.path} href={item.path}>
                    <a
                      onClick={() => setIsOpen(false)}
                      className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? "bg-purple-50 text-primary font-semibold border-l-2 border-primary"
                          : "text-slate-600 hover:bg-slate-50 hover:text-primary"
                      }`}
                    >
                      {item.name}
                    </a>
                  </Link>
                );
              })}
              <div className="mt-3 pt-3 border-t border-purple-100 flex items-center gap-2 px-4 text-purple-400/60 text-xs italic">
                <Music className="w-3 h-3" />
                <span>"Best Friend" — Rex Orange County</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
