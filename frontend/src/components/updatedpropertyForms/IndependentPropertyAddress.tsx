import { ArrowRight, Building, MapPin } from 'lucide-react';
import { useState } from 'react';

interface IndependentPropertyAddressProps {
  onPropertyNameChange: (name: string) => void;
  onPropertyTypeSelect: (type: string) => void;
  onLatitudeChange: (lat: string) => void;
  onLongitudeChange: (lng: string) => void;
}

const IndependentPropertyAddress = ({
  onPropertyNameChange,
  onPropertyTypeSelect,
  onLatitudeChange,
  onLongitudeChange
}: IndependentPropertyAddressProps) => {
  const [propertyName, setPropertyName] = useState<string>("");
  const [selectedPropertyType, setSelectedPropertyType] = useState<string | null>(null);
  const [latitude, setLatitude] = useState<string>("");
  const [longitude, setLongitude] = useState<string>("");
  
  // Property Address states
  const [buildingName, setBuildingName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [pinCode, setPinCode] = useState<string>("");
  const [city, setCity] = useState<string>("");

  const handlePropertyNameChange = (value: string) => {
    setPropertyName(value);
    onPropertyNameChange(value);
  };

  const handlePropertyTypeSelect = (type: string) => {
    setSelectedPropertyType(type);
    onPropertyTypeSelect(type);
  };

  const handleLatitudeChange = (value: string) => {
    setLatitude(value);
    onLatitudeChange(value);
  };

  const handleLongitudeChange = (value: string) => {
    setLongitude(value);
    onLongitudeChange(value);
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <h3 className="text-2xl font-semibold">Property Address</h3>
        <ArrowRight className="opacity-40" size={20} />
        <span className="text-sm opacity-70">Enter Location Details</span>
      </div>

      <div className="space-y-6 max-w-2xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="relative sm:col-span-2">
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <Building size={20} className="text-white/40" />
            </div>
            <input
              type="text"
              value={buildingName}
              onChange={(e) => setBuildingName(e.target.value)}
              placeholder="House Name"
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-transparent border border-white/20 focus:border-white outline-none transition-colors duration-200 text-white placeholder:text-white/40"
            />
          </div>
          
          <div className="relative sm:col-span-2">
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <MapPin size={20} className="text-white/40" />
            </div>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Address"
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-transparent border border-white/20 focus:border-white outline-none transition-colors duration-200 text-white placeholder:text-white/40"
            />
          </div>
          
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <MapPin size={20} className="text-white/40" />
            </div>
            <input
              type="text"
              value={pinCode}
              onChange={(e) => setPinCode(e.target.value)}
              placeholder="Pin Code"
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-transparent border border-white/20 focus:border-white outline-none transition-colors duration-200 text-white placeholder:text-white/40"
            />
          </div>
          
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <MapPin size={20} className="text-white/40" />
            </div>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="City"
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-transparent border border-white/20 focus:border-white outline-none transition-colors duration-200 text-white placeholder:text-white/40"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndependentPropertyAddress;