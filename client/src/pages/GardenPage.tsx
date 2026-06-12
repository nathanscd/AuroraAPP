import { useState } from "react";
import { motion } from "framer-motion";
import { flowersData } from "../data/flowersData";
import { PageTitle, Modal, ImagePlaceholder, Badge } from "../components/common";
import { FlowerCard } from "../components/garden/FlowerCard";
import { formatDate } from "../utils/dateFormatter";
import { Flower } from "../types";

export default function GardenPage() {
  const [selectedFlower, setSelectedFlower] = useState<Flower | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-green-50 to-pink-50 py-12">
      <div className="container">
        <PageTitle
          title="Jardim Virtual"
          subtitle="Um jardim de flores que representam nossas memórias"
        />

        {/* Garden Background */}
        <motion.div
          className="mb-12 rounded-lg overflow-hidden shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-gradient-to-b from-green-100 via-green-50 to-pink-100 py-16">
            <div className="flex flex-wrap gap-8 justify-center items-center px-4">
              {flowersData.map((flower, index) => (
                <motion.div
                  key={flower.id}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  viewport={{ once: true }}
                >
                  <FlowerCard
                    flower={flower}
                    onClick={() => setSelectedFlower(flower)}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Info Section */}
        <motion.div
          className="max-w-2xl mx-auto text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-600 text-lg">
            Cada flor representa uma memória especial. Clique em qualquer flor para conhecer sua história.
          </p>
        </motion.div>

        {/* Flower Detail Modal */}
        <Modal
          isOpen={!!selectedFlower}
          onClose={() => setSelectedFlower(null)}
          title={selectedFlower?.name}
        >
          {selectedFlower && (
            <div className="space-y-4">
              <ImagePlaceholder height="300px" />
              <div>
                <Badge label={formatDate(selectedFlower.date)} variant="secondary" />
              </div>
              <p className="text-gray-700 leading-relaxed">{selectedFlower.description}</p>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
}
