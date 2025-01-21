import React, { useState } from 'react';
import { Check, Building2, Dumbbell, School as Pool, Users, Sparkle as Park, Store, Zap } from 'lucide-react';

export interface AmenitiesData {
  selectedAmenities: string[];
  powerBackupType?: 'Partially' | 'Fully';
}

interface SocietyAmenitiesProps {
  amenitiesData: AmenitiesData;
  setAmenitiesData: React.Dispatch<React.SetStateAction<AmenitiesData>>;
}

const AMENITIES = [
  { name: 'Lift', icon: Building2 },
  { name: 'Power Backup', icon: Zap, hasOptions: true },
  { name: 'Security', icon: Building2 },
  { name: 'CCTV', icon: Building2 },
  { name: 'Gym', icon: Dumbbell },
  { name: 'Swimming Pool', icon: Pool },
  { name: 'Kids Pool', icon: Pool },
  { name: 'Jacuzzi', icon: Pool },
  { name: 'Club House', icon: Building2 },
  { name: 'Jogging Track', icon: Users },
  { name: 'Children Play Area', icon: Users },
  { name: 'Badminton Court', icon: Users },
  { name: 'Lawn Tennis Court', icon: Users },
  { name: 'Table Tennis', icon: Users },
  { name: 'Squash Court', icon: Users },
  { name: 'Foosball', icon: Users },
  { name: 'Steam Room', icon: Building2 },
  { name: 'Carrom', icon: Users },
  { name: 'Chess Board', icon: Users },
  { name: 'Multipurpose Hall', icon: Building2 },
  { name: 'Yoga / Meditation Center', icon: Users },
  { name: 'Flower Park', icon: Park },
  { name: 'Day-to-Day Utility Stores', icon: Store },
  { name: 'Thai Massage Parlor', icon: Building2 },
  { name: 'Salon', icon: Building2 },
];

export function SocietyAmenities({ amenitiesData, setAmenitiesData }: SocietyAmenitiesProps) {
  const handleAmenityChange = (amenity: string) => {
    setAmenitiesData(prev => {
      const newSelectedAmenities = prev.selectedAmenities.includes(amenity)
        ? prev.selectedAmenities.filter(a => a !== amenity)
        : [...prev.selectedAmenities, amenity];

      // If Power Backup is unchecked, remove the type
      if (amenity === 'Power Backup' && !newSelectedAmenities.includes('Power Backup')) {
        return {
          ...prev,
          selectedAmenities: newSelectedAmenities,
          powerBackupType: undefined
        };
      }

      return {
        ...prev,
        selectedAmenities: newSelectedAmenities
      };
    });
  };

  const handlePowerBackupTypeChange = (type: 'Partially' | 'Fully') => {
    setAmenitiesData(prev => ({
      ...prev,
      powerBackupType: type
    }));
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {AMENITIES.map(({ name, icon: Icon, hasOptions }) => (
          <div key={name} className="space-y-2">
            <label className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
              <input
                type="checkbox"
                checked={amenitiesData.selectedAmenities.includes(name)}
                onChange={() => handleAmenityChange(name)}
                className="rounded border-gray-300 text-red-500 focus:ring-red-500"
              />
              <div className="flex items-center space-x-2">
                <Icon className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-gray-700">{name}</span>
              </div>
            </label>
            
            {hasOptions && amenitiesData.selectedAmenities.includes(name) && (
              <div className="ml-8 space-y-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="powerBackupType"
                    value="Partially"
                    checked={amenitiesData.powerBackupType === 'Partially'}
                    onChange={() => handlePowerBackupTypeChange('Partially')}
                    className="text-red-500 focus:ring-red-500"
                  />
                  <span className="text-sm text-gray-700">Partially</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="powerBackupType"
                    value="Fully"
                    checked={amenitiesData.powerBackupType === 'Fully'}
                    onChange={() => handlePowerBackupTypeChange('Fully')}
                    className="text-red-500 focus:ring-red-500"
                  />
                  <span className="text-sm text-gray-700">Fully</span>
                </label>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}