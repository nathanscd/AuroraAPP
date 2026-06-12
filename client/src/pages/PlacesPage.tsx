import { useState } from "react";
import { motion } from "framer-motion";
import { placesData } from "@/data/placesData";
import { PageTitle, Modal, ImagePlaceholder, Badge } from "@/components/common";
import { PlaceMarker } from "@/components/map/PlaceMarker";
import { formatDate } from "@/utils/dateFormatter";
import { Place } from "@/types";

export default function PlacesPage() {
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-pink-50 py-12">
      <div className="container">
        <PageTitle
          title="Lugares Especiais"
          subtitle="Explore os locais que marcaram nossa história"
        />

        {/* Map Placeholder */}
        <motion.div
          className="mb-12 rounded-lg overflow-hidden shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-gradient-to-br from-blue-100 to-blue-200 h-96 flex items-center justify-center">
            <div className="text-center text-blue-600">
              <p className="text-lg font-semibold">Mapa Interativo</p>
              <p className="text-sm">Clique nos marcadores abaixo para explorar</p>
            </div>
          </div>
        </motion.div>

        {/* Places Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {placesData.map((place, index) => (
            <motion.div
              key={place.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              viewport={{ once: true }}
            >
              <PlaceMarker
                place={place}
                onClick={() => setSelectedPlace(place)}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Place Detail Modal */}
        <Modal
          isOpen={!!selectedPlace}
          onClose={() => setSelectedPlace(null)}
          title={selectedPlace?.name}
        >
          {selectedPlace && (
            <div className="space-y-4">
              <ImagePlaceholder height="300px" />
              <div>
                <Badge label={formatDate(selectedPlace.date)} variant="secondary" />
              </div>
              <p className="text-gray-700 leading-relaxed">{selectedPlace.description}</p>
              <div className="text-sm text-gray-500 pt-4 border-t border-pink-100">
                <p>Coordenadas: {selectedPlace.latitude.toFixed(4)}, {selectedPlace.longitude.toFixed(4)}</p>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
}
