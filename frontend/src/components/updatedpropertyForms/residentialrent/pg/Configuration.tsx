import React, { useState } from 'react';
import SingleRoomAmenities from './SingleRoomAmenities';
import TwoShareRoomAmenities from './TwoShareRoomAmenities';
import ThreeShareRoomAmenities from './ThreeShareRoomAmenities';
import FourShareRoomAmenities from './FourShareRoomAmenities';
import FiveShareRoomAmenities from './FiveShareRoomAmenities';
import CustomShareRoomAmenities from './CustomShareRoomAmenities';
import { UserPlus, Users } from 'lucide-react';

interface ShareOption {
  id: string;
  label: string;
  value: number;
}

interface ConfigurationProps {
  selectedShares: string[];
  setSelectedShares: React.Dispatch<React.SetStateAction<string[]>>;
  customShare: string;
  setCustomShare: React.Dispatch<React.SetStateAction<string>>;
  roomConfiguration?: {
    totalRooms?: number;
    sharingTypes?: string[];
    customShare?: string;
    singleRoomAmenities?: string[];
    doubleShareRoomAmenities?: string[];
    tripleShareRoomAmenities?: string[];
    fourShareRoomAmenities?: string[];
    fiveShareRoomAmenities?: string[];
    customShareRoomAmenities?: string[];
  };
  onRoomConfigurationChange?: (config: any) => void;
}

const Configuration: React.FC<ConfigurationProps> = ({ 
  selectedShares, 
  setSelectedShares, 
  customShare, 
  setCustomShare,
  roomConfiguration = {},
  onRoomConfigurationChange
}) => {

  const shareOptions: ShareOption[] = [
    { id: 'single', label: 'Single Share', value: 1 },
    { id: 'double', label: 'Double Share', value: 2 },
    { id: 'triple', label: 'Triple Share', value: 3 },
    { id: 'four', label: 'Four Share', value: 4 },
    { id: 'five', label: 'Five Share', value: 5 },
    { id: 'more', label: 'More', value: 0 },
  ];

  const handleShareChange = (optionId: string) => {
    setSelectedShares((prev) => {
      if (prev.includes(optionId)) {
        // Remove if already selected
        return prev.filter((id) => id !== optionId);
      } else {
        return [...prev, optionId];
      }
    });
    if (optionId !== 'more') {
      setCustomShare('');
    }
  };

  const updateRoomConfig = (field: string, value: any) => {
    if (onRoomConfigurationChange) {
      onRoomConfigurationChange({
        ...roomConfiguration,
        [field]: value
      });
    }
  };

  const renderAmenitiesComponent = (shareType: string) => {
    const roomConfig = roomConfiguration || {}; // Ensure roomConfiguration is not undefined
  
    switch (shareType) {
      case 'single':
        return (
          <SingleRoomAmenities
            amenities={roomConfig.singleRoomAmenities || []}
            onAmenitiesChange={(amenities) => updateRoomConfig('singleRoomAmenities', amenities)}
          />
        );
      case 'double':
        return (
          <TwoShareRoomAmenities
            amenities={roomConfig.doubleShareRoomAmenities || []}
            onAmenitiesChange={(amenities) => updateRoomConfig('doubleShareRoomAmenities', amenities)}
          />
        );
      case 'triple':
        return (
          <ThreeShareRoomAmenities
            amenities={roomConfig.tripleShareRoomAmenities || []}
            onAmenitiesChange={(amenities) => updateRoomConfig('tripleShareRoomAmenities', amenities)}
          />
        );
      case 'four':
        return (
          <FourShareRoomAmenities
            amenities={roomConfig.fourShareRoomAmenities || []}
            onAmenitiesChange={(amenities) => updateRoomConfig('fourShareRoomAmenities', amenities)}
          />
        );
      case 'five':
        return (
          <FiveShareRoomAmenities
            amenities={roomConfig.fiveShareRoomAmenities || []}
            onAmenitiesChange={(amenities: any) => updateRoomConfig('fiveShareRoomAmenities', amenities)}
          />
        );
      case 'more':
        return customShare ? (
          <CustomShareRoomAmenities
            occupantCount={parseInt(customShare, 10)}
            amenities={roomConfig.customShareRoomAmenities || []}
            onAmenitiesChange={(amenities) => updateRoomConfig('customShareRoomAmenities', amenities)}
          />
        ) : null;
      default:
        return null;
    }
  };
  

  return (
    <div className="space-y-6">
      {/* Room Sharing Configuration */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center mb-6">
          <div className="p-2 rounded-md bg-gray-100 mr-3">
            <Users className="h-5 w-5 text-gray-700" />
          </div>
          <h3 className="text-lg font-medium text-gray-900">Room Sharing Options</h3>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {shareOptions.map((option) => (
            <div 
              key={option.id}
              className={`
                flex items-center p-4 rounded-lg border cursor-pointer transition-all
                ${selectedShares.includes(option.id)
                  ? 'border-black text-white shadow-md '
                  : 'border-gray-200 bg-white hover:border-black  hover:text-white'
                }
              `}
            >
              <input
                type="checkbox"
                id={option.id}
                name="shareType"
                checked={selectedShares.includes(option.id)}
                onChange={() => handleShareChange(option.id)}
                className={`h-4 w-4 ${selectedShares.includes(option.id) ? 'accent-white' : 'accent-black'}`}
              />
              <label htmlFor={option.id} className="ml-3 flex-grow cursor-pointer group-hover:text-white">
                {option.label}
              </label>
              <UserPlus className={`h-4 w-4 ${selectedShares.includes(option.id) ? 'text-white' : 'text-gray-500'}`} />
            </div>
          ))}
        </div>
        
        {selectedShares.includes('more') && (
          <div className="mt-4 max-w-md">
            <label htmlFor="customShare" className="block text-sm text-gray-700 mb-2">
              Custom Number of Shares (6 or more)
            </label>
            <div className="relative">
              <input
                id="customShare"
                type="number"
                value={customShare}
                onChange={(e) => setCustomShare(e.target.value)}
                placeholder="Enter number of shares"
                min="6"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-black focus:border-black"
              />
              <Users className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>
        )}
      </div>

      {/* Room Amenities Section */}
      {selectedShares.filter(s => s !== 'more').map((share) => (
        <div key={share} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="mb-4">
            <h3 className="text-lg font-medium text-gray-900">
              {share === 'single' ? 'Single Room' :
                share === 'double' ? 'Double Share Room' :
                share === 'triple' ? 'Triple Share Room' :
                share === 'four' ? 'Four Share Room' :
                share === 'five' ? 'Five Share Room' :
                ''} Amenities
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Select amenities available for this room type
            </p>
          </div>
          {renderAmenitiesComponent(share)}
        </div>
      ))}
      {/* Custom share amenities */}
      {selectedShares.includes('more') && customShare && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="mb-4">
            <h3 className="text-lg font-medium text-gray-900">
              {customShare}-Share Room Amenities
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Select amenities available for this room type
            </p>
          </div>
          {renderAmenitiesComponent('more')}
        </div>
      )}
    </div>
  );
};

export default Configuration;
