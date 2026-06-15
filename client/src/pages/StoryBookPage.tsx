import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PageTitle } from "../components/common";
import { Book3D } from "../components/storybook/Book3D";
import { fetchAndParseStoryDoc, ParsedPage } from "../utils/googleDocsParser";
import { BookOpen } from "lucide-react";

export default function StoryBookPage() {
  const [pages, setPages] = useState<ParsedPage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadDoc() {
      setIsLoading(true);
      const parsedPages = await fetchAndParseStoryDoc();
      setPages(parsedPages);
      setIsLoading(false);
    }
    loadDoc();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-rose-50/50 to-purple-50/50 pt-20 pb-50 perspective-[2000px] overflow-hidden">
      <div className="container relative z-10">
        <PageTitle
          title="Livro Interativo"
          subtitle="A nossa história contada em páginas mágicas"
        />

        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center mt-20"
            >
              <motion.div
                animate={{ 
                  rotateY: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center shadow-lg border border-purple-200"
                style={{ transformStyle: "preserve-3d" }}
              >
                <BookOpen className="w-8 h-8 text-purple-400" />
              </motion.div>
              <p className="mt-6 text-slate-400 font-serif italic text-lg tracking-wide">Desenhando as páginas...</p>
            </motion.div>
          ) : (
            <motion.div
              key="book"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-8 md:mt-16 w-full flex justify-center"
            >
              <Book3D pages={pages} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
