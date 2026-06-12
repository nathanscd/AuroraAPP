import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { reasonsData } from "@/data/reasonsData";
import { PageTitle, SearchBar, Badge } from "@/components/common";
import { ReasonCard } from "@/components/reasons/ReasonCard";
import { storage } from "@/utils/storage";

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
        const matchesCategory = !selectedCategory || reason.category === selectedCategory;
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
    <div className="min-h-screen bg-gradient-to-b from-white to-pink-50 py-12">
      <div className="container">
        <PageTitle
          title="100 Motivos"
          subtitle="Por que você é tão especial para mim"
        />

        {/* Search and Filters */}
        <motion.div
          className="max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-6">
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
              className={`px-4 py-2 rounded-full font-medium transition-colors ${
                selectedCategory === null
                  ? "bg-red-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
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
                className={`px-4 py-2 rounded-full font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-red-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.p
          className="text-center text-gray-600 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {filteredReasons.length} motivo{filteredReasons.length !== 1 ? "s" : ""} encontrado{filteredReasons.length !== 1 ? "s" : ""}
        </motion.p>

        {/* Reasons Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {filteredReasons.map((reason, index) => (
            <motion.div
              key={reason.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
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
