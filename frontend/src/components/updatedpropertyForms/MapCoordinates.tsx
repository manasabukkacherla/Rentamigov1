import { ArrowRight, MapPin } from 'lucide-react';

interface MapCoordinatesProps {
  latitude: string;
  longitude: string;
  onLatitudeChange: (lat: string) => void;
  onLongitudeChange: (lng: string) => void;
}

const MapCoordinates = ({ latitude, longitude, onLatitudeChange, onLongitudeChange }: MapCoordinatesProps) => {
  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <h3 className="text-2xl font-semibold">Location Coordinates</h3>
        <ArrowRight className="opacity-40" size={20} />
        <span className="text-sm opacity-70">Enter Map Details</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl">
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            <MapPin size={20} className="text-white/40" />
          </div>
          <input
            type="text"
            value={latitude}
            onChange={(e) => onLatitudeChange(e.target.value)}
            placeholder="Enter latitude"
            className="w-full pl-10 pr-4 py-3 rounded-lg bg-transparent border border-white/20 focus:border-white outline-none transition-colors duration-200 text-white placeholder:text-white/40"
          />
        </div>
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            <MapPin size={20} className="text-white/40" />
          </div>
          <input
            type="text"
            value={longitude}
            onChange={(e) => onLongitudeChange(e.target.value)}
            placeholder="Enter longitude"
            className="w-full pl-10 pr-4 py-3 rounded-lg bg-transparent border border-white/20 focus:border-white outline-none transition-colors duration-200 text-white placeholder:text-white/40"
          />
        </div>
      </div>
    </div>
  );
};

export default MapCoordinates;