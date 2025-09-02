import { useState } from 'react';
import { ArrowRight, Home, Building2, Users, Bed, User } from 'lucide-react';

interface SharingMembersProps {
  onSharingTypeChange?: (type: string) => void;
  onSharingDetailsChange?: (details: {
    totalBeds: number;
    occupiedBeds: number;
    availableFor: string;
    availableBeds: number;
  }) => void;
}

const SharingMembers = ({ onSharingTypeChange, onSharingDetailsChange }: SharingMembersProps) => {
  const [selectedType, setSelectedType] = useState<string>('');
  const [sharingDetails, setSharingDetails] = useState({
    totalBeds: 1,
    occupiedBeds: 0,
    availableFor: '',
    availableBeds: 1
  });

  const roomTypes = [
    {
      id: 'single-room-shared',
      name: 'Single Room - Shared',
      description: 'Single room in a shared accommodation',
      icon: Users
    },
    {
      id: 'studio',
      name: 'Studio Room',
      description: 'Single room apartment with attached bathroom',
      icon: Home
    },
    {
      id: '1bhk',
      name: '1 BHK',
      description: '1 Bedroom, Hall, Kitchen',
      icon: Building2
    },
    {
      id: '2bhk',
      name: '2 BHK',
      description: '2 Bedrooms, Hall, Kitchen',
      icon: Building2
    },
    {
      id: '3bhk',
      name: '3 BHK',
      description: '3 Bedrooms, Hall, Kitchen',
      icon: Building2
    },
    {
      id: '3plus-bhk',
      name: '3+ BHK',
      description: 'More than 3 Bedrooms',
      icon: Building2
    }
  ];

  const handleTypeSelect = (type: string) => {
    setSelectedType(type);
    onSharingTypeChange?.(type);
  };

  const handleSharingDetailsChange = (field: string, value: number | string) => {
    const updatedDetails = { ...sharingDetails, [field]: value };
    
    // Automatically calculate available beds
    if (field === 'totalBeds' || field === 'occupiedBeds') {
      const total = field === 'totalBeds' ? value : sharingDetails.totalBeds;
      const occupied = field === 'occupiedBeds' ? value : sharingDetails.occupiedBeds;
      updatedDetails.availableBeds = Math.max(0, Number(total) - Number(occupied));
    }

    setSharingDetails(updatedDetails);
    onSharingDetailsChange?.(updatedDetails);
  };

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-3 mb-6">
          <h3 className="text-2xl font-semibold text-black">Room Configuration</h3>
          <ArrowRight className="opacity-40 text-black" size={20} />
          <span className="text-sm opacity-70 text-black">Select Room Type</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl">
          {roomTypes.map(({ id, name, description, icon: Icon }) => (
            <button
              key={id}
              onClick={() => handleTypeSelect(id)}
              className={`flex flex-col p-6 rounded-lg border transition-all duration-200 ${
                selectedType === id
                  ? 'bg-white text-black border-black'
                  : 'border-black/20 hover:border-black bg-white'
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <Icon
                  size={24}
                  className={selectedType === id ? 'text-black' : 'text-black/60'}
                />
                <h4 className="font-medium text-lg text-black">{name}</h4>
              </div>
              <p className={`text-sm ${
                selectedType === id ? 'text-black/70' : 'text-black/60'
              }`}>
                {description}
              </p>
            </button>
          ))}
        </div>
      </div>

      {selectedType === 'single-room-shared' && (
        <div>
          <div className="flex items-center gap-3 mb-6">
            <h3 className="text-2xl font-semibold text-black">Sharing Details</h3>
            <ArrowRight className="opacity-40 text-black" size={20} />
            <span className="text-sm opacity-70 text-black">Enter Bed Information</span>
          </div>

          <div className="space-y-6 max-w-4xl">
            {/* Total and Occupied Beds */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-black/80 text-sm">Total Beds</label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2">
                    <Bed size={20} className="text-black/40" />
                  </div>
                  <input
                    type="number"
                    min="1"
                    value={sharingDetails.totalBeds}
                    onChange={(e) => handleSharingDetailsChange('totalBeds', parseInt(e.target.value) || 0)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-transparent border border-black/20 focus:border-black outline-none transition-colors duration-200 text-black"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-black/80 text-sm">Occupied Beds</label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2">
                    <User size={20} className="text-black/40" />
                  </div>
                  <input
                    type="number"
                    min="0"
                    max={sharingDetails.totalBeds}
                    value={sharingDetails.occupiedBeds}
                    onChange={(e) => handleSharingDetailsChange('occupiedBeds', parseInt(e.target.value) || 0)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-transparent border border-black/20 focus:border-black outline-none transition-colors duration-200 text-black"
                  />
                </div>
              </div>
            </div>

            {/* Available For */}
            <div className="space-y-2">
              <label className="text-black/80 text-sm">Available For</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="availableFor"
                    value="male"
                    checked={sharingDetails.availableFor === 'male'}
                    onChange={(e) => handleSharingDetailsChange('availableFor', e.target.value)}
                    className="text-black border-black/20 bg-transparent focus:ring-black"
                  />
                  <span className="text-black/80">Male</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="availableFor"
                    value="female"
                    checked={sharingDetails.availableFor === 'female'}
                    onChange={(e) => handleSharingDetailsChange('availableFor', e.target.value)}
                    className="text-black border-black/20 bg-transparent focus:ring-black"
                  />
                  <span className="text-black/80">Female</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="availableFor"
                    value="any"
                    checked={sharingDetails.availableFor === 'any'}
                    onChange={(e) => handleSharingDetailsChange('availableFor', e.target.value)}
                    className="text-black border-black/20 bg-transparent focus:ring-black"
                  />
                  <span className="text-black/80">Any</span>
                </label>
              </div>
            </div>

            {/* Available Beds */}
            <div className="bg-white/5 p-4 rounded-lg border border-black/20">
              <div className="flex items-center justify-between">
                <span className="text-black/80">Available Beds</span>
                <span className="text-2xl font-semibold text-black">{sharingDetails.availableBeds}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedType && selectedType !== 'single-room-shared' && (
        <div className="mt-8 p-4 bg-white/5 rounded-lg border border-black/20">
          <h4 className="text-lg font-medium mb-2 text-black">Selected Configuration</h4>
          <p className="text-black/80">
            {roomTypes.find(type => type.id === selectedType)?.description}
          </p>
          {selectedType === 'studio' && (
            <p className="mt-2 text-sm text-black/60">
              Ideal for individuals or couples seeking a compact, self-contained living space
            </p>
          )}
          {['1bhk', '2bhk', '3bhk', '3plus-bhk'].includes(selectedType) && (
            <p className="mt-2 text-sm text-black/60">
              Suitable for families or professionals requiring more space and privacy
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default SharingMembers;