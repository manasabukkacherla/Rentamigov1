import { useState } from 'react';
import { MapPin, Navigation } from 'lucide-react';
import MapSelector from '../MapSelector';

interface LandmarkProps {
  onLandmarkChange?: (landmark: string) => void;
  onLocationSelect?: (location: { latitude: string; longitude: string }) => void;
  latitude?: string;
  longitude?: string;
}

const Landmark = ({ onLandmarkChange, onLocationSelect, latitude, longitude }: LandmarkProps) => {
  const [landmark, setLandmark] = useState('');
  const [locationLabel, setLocationLabel] = useState('');

  const handleChange = (value: string) => {
    setLandmark(value);
    onLandmarkChange?.(value);
  };

  const handleLocationSelect = (lat: string, lng: string, addressData?: any) => {
    onLocationSelect?.({ latitude: lat, longitude: lng });
    
    // Create a readable location label from coordinates or address data
    if (addressData) {
      const components = [];
      if (addressData.route) components.push(addressData.route);
      if (addressData.sublocality_level_1) components.push(addressData.sublocality_level_1);
      if (addressData.locality) components.push(addressData.locality);
      
      setLocationLabel(components.length > 0 ? components.join(', ') : `${lat}, ${lng}`);
    } else {
      setLocationLabel(`${lat}, ${lng}`);
    }
  };

  return (
    <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
      <div className="space-y-8">
        <div className="flex items-center mb-8">
          <MapPin className="text-black mr-3" size={28} />
          <h3 className="text-2xl font-semibold text-black">Location Details</h3>
        </div>

        <div className="bg-white p-6 rounded-lg space-y-6">
          <div>
            <h4 className="text-lg font-medium mb-4 text-black">Map Location</h4>
            <p className="text-sm text-gray-500 mb-4">
              Use the map below to set your property's location. Click on the map or search for an address.
            </p>
            <MapSelector
              latitude={latitude || ''}
              longitude={longitude || ''}
              onLocationSelect={handleLocationSelect}
            />
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4 text-black">Landmark</h4>
            <div className="relative">
              <input
                type="text"
                value={landmark}
                onChange={(e) => handleChange(e.target.value)}
                placeholder="Enter nearby landmark"
                className="w-full px-4 py-3 rounded-lg bg-white border-2 border-gray-300 focus:border-black outline-none transition-colors duration-200 text-black placeholder:text-black/40"
              />
              <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
          </div>

          <div>
            <label htmlFor="location" className="block text-gray-800 font-medium mb-2">
              Location
            </label>
            <div className="relative">
              <input
                type="text"
                id="location"
                value={locationLabel}
                readOnly
                placeholder="Select location on map"
                className="w-full px-4 py-3 rounded-lg bg-white border-2 border-gray-300 focus:border-black outline-none transition-colors duration-200 text-black placeholder:text-black/40"
              />
              <Navigation className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
            {latitude && longitude && (
              <p className="mt-2 text-xs text-gray-500">
                Coordinates: {latitude}, {longitude}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landmark;