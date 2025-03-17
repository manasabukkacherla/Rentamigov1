import React, { useState } from 'react';
import { PropertyImage } from '../types';
import { X } from 'lucide-react';

interface ImageGalleryProps {
  images: PropertyImage[];
  onImageSelect: (url: string) => void;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({ images, onImageSelect }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = ['kitchen', 'bathroom', 'hall', 'bedroom', 'storeroom'];

  const filteredImages = selectedCategory 
    ? images.filter(img => img.category === selectedCategory)
    : images;

  return (
    <div className="relative">
      <div className="grid grid-cols-2 gap-2 w-64">
        {images.slice(0, 8).map((image) => (
          <div
            key={image.id}
            className="h-24 cursor-pointer overflow-hidden rounded-lg"
            onClick={() => onImageSelect(image.url)}
          >
            <img
              src={image.url}
              alt={image.category}
              className="w-full h-full object-cover hover:opacity-90 transition grayscale hover:grayscale-0"
            />
          </div>
        ))}
        <button
          onClick={() => setShowModal(true)}
          className="col-span-2 text-sm bg-gray-700 hover:bg-gray-600 py-2 rounded-lg text-white"
        >
          View All
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center">
          <div className="bg-gray-800 rounded-lg p-6 w-[90%] max-w-4xl max-h-[90vh] overflow-y-auto text-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">All Images</h2>
              <button onClick={() => setShowModal(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex gap-4 mb-6 overflow-x-auto pb-2">
              <button
                className={`px-4 py-2 rounded-full ${
                  !selectedCategory ? 'bg-gray-100 text-gray-900' : 'bg-gray-700 text-gray-100'
                }`}
                onClick={() => setSelectedCategory(null)}
              >
                All
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-full capitalize ${
                    selectedCategory === category ? 'bg-gray-100 text-gray-900' : 'bg-gray-700 text-gray-100'
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {filteredImages.map((image) => (
                <div
                  key={image.id}
                  className="aspect-video cursor-pointer rounded-lg overflow-hidden"
                  onClick={() => {
                    onImageSelect(image.url);
                    setShowModal(false);
                  }}
                >
                  <img
                    src={image.url}
                    alt={image.category}
                    className="w-full h-full object-cover hover:opacity-90 transition grayscale hover:grayscale-0"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};