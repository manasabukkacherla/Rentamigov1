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
  const [lat, setLat] = useState(latitude || '');
  const [lng, setLng] = useState(longitude || '');

  const handleChange = (value: string) => {
    setLandmark(value);
    onLandmarkChange?.(value);
  };

  const handleLocationSelect = (lat: string, lng: string, addressData?: any) => {
    setLat(lat);
    setLng(lng);
    onLocationSelect?.({ latitude: lat, longitude: lng });
  };
  
  const handleLatitudeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!isNaN(Number(value)) || value === '-' || value === '') {
      setLat(value);
      onLocationSelect?.({ latitude: value, longitude: lng });
    }
  };

  const handleLongitudeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!isNaN(Number(value)) || value === '-' || value === '') {
      setLng(value);
      onLocationSelect?.({ latitude: lat, longitude: value });
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
              latitude={lat}
              longitude={lng}
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
            <h4 className="text-lg font-medium mb-4 text-black">Coordinates</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="latitude" className="block text-gray-800 font-medium mb-2">
                  Latitude
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="latitude"
                    value={lat}
                    onChange={handleLatitudeChange}
                    placeholder="Enter latitude (e.g., 17.683301)"
                    className="w-full px-4 py-3 rounded-lg bg-white border-2 border-gray-300 focus:border-black outline-none transition-colors duration-200 text-black placeholder:text-black/40"
                  />
                  <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                </div>
              </div>
              <div>
                <label htmlFor="longitude" className="block text-gray-800 font-medium mb-2">
                  Longitude
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="longitude"
                    value={lng}
                    onChange={handleLongitudeChange}
                    placeholder="Enter longitude (e.g., 83.019301)"
                    className="w-full px-4 py-3 rounded-lg bg-white border-2 border-gray-300 focus:border-black outline-none transition-colors duration-200 text-black placeholder:text-black/40"
                  />
                  <Navigation className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                </div>
              </div>
            </div>
            <p className="mt-2 text-xs text-gray-500">
              Enter coordinates manually or use the map above to set the location.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landmark;