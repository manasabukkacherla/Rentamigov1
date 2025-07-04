import React, { useState } from 'react';
import { Calendar, Droplet, ThermometerSun } from 'lucide-react';

interface CropProps {
  crop: {
    id: number;
    name: string;
    description: string;
    image: string;
    growingSeason: string;
    soilRequirements: string;
    idealClimate: string;
  };
}

const CropCard: React.FC<CropProps> = ({ crop }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="relative h-96 rounded-lg overflow-hidden shadow-md transition-transform duration-500 transform hover:scale-105 cursor-pointer perspective"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className={`relative w-full h-full transition-all duration-700 transform-style-preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
        {/* Front side */}
        <div className="absolute w-full h-full backface-hidden">
          <img 
            src={crop.image} 
            alt={crop.name} 
            className="w-full h-2/3 object-cover"
          />
          <div className="p-4 bg-white h-1/3">
            <h3 className="text-xl font-serif font-bold text-gray-800 mb-2">{crop.name}</h3>
            <p className="text-gray-600 text-sm line-clamp-2">{crop.description}</p>
          </div>
        </div>

        {/* Back side */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-white p-6">
          <h3 className="text-xl font-serif font-bold text-green-800 mb-4">{crop.name} Details</h3>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <Calendar className="h-5 w-5 text-green-600 mr-3 mt-0.5" />
              <div>
                <h4 className="font-medium text-gray-800">Growing Season</h4>
                <p className="text-gray-600 text-sm">{crop.growingSeason}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Droplet className="h-5 w-5 text-green-600 mr-3 mt-0.5" />
              <div>
                <h4 className="font-medium text-gray-800">Soil Requirements</h4>
                <p className="text-gray-600 text-sm">{crop.soilRequirements}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <ThermometerSun className="h-5 w-5 text-green-600 mr-3 mt-0.5" />
              <div>
                <h4 className="font-medium text-gray-800">Ideal Climate</h4>
                <p className="text-gray-600 text-sm">{crop.idealClimate}</p>
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-4 right-4 text-sm text-gray-400">
            Click to flip back
          </div>
        </div>
      </div>
    </div>
  );
};

export default CropCard;