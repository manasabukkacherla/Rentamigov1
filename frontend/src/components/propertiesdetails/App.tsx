import React, { useState } from 'react';
import { ImageGallery } from './components/ImageGallery';
import { BasicInfo } from './components/BasicInfo';
import { AmenitiesTabs } from './components/AmenitiesTabs';
import { PricingCard } from './components/PricingCard';
import { LocationMap } from './components/LocationMap';
import { NearbyPlaces } from './components/NearbyPlaces';
import { SimilarProperties } from './components/SimilarProperties';
import { LatestInsights } from './components/LatestInsights';
import { Reviews } from './components/Reviews';
import { Footer } from './components/Footer';
import { propertyData } from './data';
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react';

function Propertydetail() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const allMedia = [propertyData.video, ...propertyData.images.map((img: { url: any; }) => img.url)];

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % allMedia.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + allMedia.length) % allMedia.length);
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-24 lg:pb-0">
      <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
        {/* Property Header */}
        <div className="bg-white rounded-xl shadow-lg p-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Prestige Lake Ridge</h1>
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="w-5 h-5" />
            <p>Electronic City Phase 1, Bangalore</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-grow relative group">
                {allMedia[currentIndex].includes('vimeo.com') ? (
                  <iframe
                    src={allMedia[currentIndex]}
                    className="w-full aspect-video rounded-lg"
                    frameBorder="0"
                    allow="autoplay; fullscreen"
                    allowFullScreen
                  />
                ) : (
                  <img
                    src={allMedia[currentIndex]}
                    alt="Property"
                    className="w-full aspect-video rounded-lg object-cover"
                  />
                )}

                <button
                  onClick={goToPrevious}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 p-2 rounded-full text-white group-hover:opacity-100 transition-opacity md:opacity-0 opacity-100"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={goToNext}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 p-2 rounded-full text-white group-hover:opacity-100 transition-opacity md:opacity-0 opacity-100"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
              <div className="hidden md:block">
                <ImageGallery
                  images={propertyData.images}
                  onImageSelect={(url) => setCurrentIndex(allMedia.indexOf(url))}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 justify-center">
          <div className="lg:w-[65%] space-y-8">
            <BasicInfo details={propertyData} />
            <AmenitiesTabs details={propertyData} />
            <LocationMap />
            <NearbyPlaces />
            <SimilarProperties />
            <LatestInsights />
            <Reviews />
          </div>
          <div className="lg:w-[30%]">
            <div className="sticky top-4">
              <PricingCard />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Propertydetail;