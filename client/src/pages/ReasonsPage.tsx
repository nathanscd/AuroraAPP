import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { reasonsData } from "../data/reasonsData";
import { PageTitle, SearchBar, Badge } from "../components/common";
import { ReasonCard } from "../components/reasons/ReasonCard";
import { storage } from "../utils/storage";
import { Heart, Star } from "lucide-react";

export default function ReasonsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(
    new Set(storage.getItem("favorites", []))
  );

  const categories = Array.from(new Set(reasonsData.map((r) => r.category)));

  const filteredReasons = useMemo(() => {
    return reasonsData
      .map((reason) => ({
        ...reason,
        isFavorite: favorites.has(reason.id),
      }))
      .filter((reason) => {
        const matchesSearch =
          reason.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          reason.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory =
          !selectedCategory || reason.category === selectedCategory;
        return matchesSearch && matchesCategory;
      });
  }, [searchQuery, selectedCategory, favorites]);

  const handleFavoriteToggle = (id: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
    storage.setItem("favorites", Array.from(newFavorites));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-rose-50/50 to-purple-50/50 pt-20 pb-50">
      <div className="container">
        <PageTitle
          title="Motivos"
          subtitle="Por que você é tão especial para mim"
        />

        {/* Hero stat pills */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-10"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-400/15 text-purple-600 text-xs font-semibold backdrop-blur-sm">
            <Heart className="w-3.5 h-3.5 fill-purple-400/30" />
            <span>{reasonsData.length} motivos listados</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-400/15 text-purple-600 text-xs font-semibold backdrop-blur-sm">
            <Star className="w-3.5 h-3.5 fill-purple-400/30" />
            <span>{favorites.size} favoritos</span>
          </div>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          className="max-w-2xl mx-auto mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-5">
            <SearchBar
              placeholder="Buscar motivos..."
              onSearch={setSearchQuery}
            />
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            <motion.button
              onClick={() => setSelectedCategory(null)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                selectedCategory === null
                  ? "bg-gradient-to-r from-purple-600 to-violet-600 text-white shadow-md shadow-purple-500/25"
                  : "bg-purple-500/10 text-purple-600 border border-purple-400/15 hover:bg-purple-500/20 backdrop-blur-sm"
              }`}
            >
              Todos
            </motion.button>
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-purple-600 to-violet-600 text-white shadow-md shadow-purple-500/25"
                    : "bg-purple-500/10 text-purple-600 border border-purple-400/15 hover:bg-purple-500/20 backdrop-blur-sm"
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.p
          className="text-center text-slate-500 text-xs mb-8 uppercase tracking-widest font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {filteredReasons.length} motivo{filteredReasons.length !== 1 ? "s" : ""} encontrado{filteredReasons.length !== 1 ? "s" : ""}
        </motion.p>

        {/* Reasons Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {filteredReasons.map((reason, index) => (
            <motion.div
              key={reason.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.04 }}
              viewport={{ once: true }}
            >
              <ReasonCard
                reason={reason}
                onFavoriteToggle={handleFavoriteToggle}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
