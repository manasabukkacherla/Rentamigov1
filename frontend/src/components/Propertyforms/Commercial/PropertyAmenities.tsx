import React, { useState } from 'react';
import { 
  Camera, Shield, Zap, Monitor, Wind, Wifi, Home, 
  FireExtinguisher, Bell, Users, Droplets, Power, Coffee,
  UserRound, UtensilsCrossed, FileCheck, FileSpreadsheet
} from 'lucide-react';

interface PropertyAmenitiesDetails {
  selectedAmenities: string[];
}

interface AmenityOption {
  id: string;
  label: string;
  icon: React.ElementType;
}

export default function PropertyAmenities() {
  const [formData, setFormData] = useState<PropertyAmenitiesDetails>({
    selectedAmenities: [],
  });

  const amenityOptions: AmenityOption[] = [
    { id: 'cctv', label: 'CCTV', icon: Camera },
    { id: 'powerBackup', label: 'Power Backup', icon: Zap },
    { id: 'furnishing', label: 'Furnishing', icon: Home },
    { id: 'ups', label: 'UPS', icon: Power },
    { id: 'centralAC', label: 'Central Air Conditioning', icon: Wind },
    { id: 'oxygenDuct', label: 'Oxygen Duct', icon: Wind },
    { id: 'internet', label: 'Internet Connectivity', icon: Wifi },
    { id: 'vastu', label: 'Vastu Compliant', icon: Home },
    { id: 'fireExtinguishers', label: 'Fire Extinguishers', icon: FireExtinguisher },
    { id: 'fireSensors', label: 'Fire Sensors', icon: Bell },
    { id: 'security', label: 'Security Personnel', icon: Shield },
    { id: 'waterStorage', label: 'Water Storage', icon: Droplets },
    { id: 'dgAvailability', label: 'DG Availability', icon: Power },
    { id: 'cafeteria', label: 'Cafeteria', icon: Coffee },
    { id: 'receptionArea', label: 'Reception Area', icon: UserRound },
    { id: 'pantry', label: 'Pantry', icon: UtensilsCrossed },
    { id: 'fireNoc', label: 'Fire NOC Certified', icon: FileCheck },
    { id: 'occupancyCertificate', label: 'Occupancy Certificate', icon: FileSpreadsheet },
  ];

  const handleToggleAmenity = (amenityId: string) => {
    setFormData(prev => ({
      selectedAmenities: prev.selectedAmenities.includes(amenityId)
        ? prev.selectedAmenities.filter(id => id !== amenityId)
        : [...prev.selectedAmenities, amenityId]
    }));
  };

  return (
    <div className="w-full max-w-3xl pl-4 sm:pl-6 md:pl-8">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">Add Amenities</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {amenityOptions.map((amenity) => {
          const Icon = amenity.icon;
          const isSelected = formData.selectedAmenities.includes(amenity.id);

          return (
            <button
              key={amenity.id}
              onClick={() => handleToggleAmenity(amenity.id)}
              className={`flex items-center gap-3 p-4 rounded-lg border transition-all
                ${isSelected 
                  ? 'border-blue-500 bg-blue-50 text-blue-700' 
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
            >
              <Icon className={`h-5 w-5 ${isSelected ? 'text-blue-500' : 'text-gray-400'}`} />
              <span className="text-sm font-medium">{amenity.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}