import React, { useState } from 'react';
import SingleRoomAmenities from './SingleRoomAmenities';
import TwoShareRoomAmenities from './TwoShareRoomAmenities';
import ThreeShareRoomAmenities from './ThreeShareRoomAmenities';
import FourShareRoomAmenities from './FourShareRoomAmenities';
import FiveShareRoomAmenities from './FiveShareRoomAmenities';
import CustomShareRoomAmenities from './CustomShareRoomAmenities';

interface ShareOption {
  id: string;
  label: string;
  value: number;
}

const Configuration = () => {
  const [selectedShare, setSelectedShare] = useState<string>('');
  const [customShare, setCustomShare] = useState<string>('');

  const shareOptions: ShareOption[] = [
    { id: 'single', label: 'Single Share', value: 1 },
    { id: 'double', label: 'Double Share', value: 2 },
    { id: 'triple', label: 'Triple Share', value: 3 },
    { id: 'four', label: 'Four Share', value: 4 },
    { id: 'five', label: 'Five Share', value: 5 },
    { id: 'more', label: 'More', value: 0 },
  ];

  const handleShareChange = (optionId: string) => {
    setSelectedShare(optionId);
    if (optionId !== 'more') {
      setCustomShare('');
    }
  };

  const renderAmenitiesComponent = (shareType: string) => {
    switch (shareType) {
      case 'single':
        return <SingleRoomAmenities />;
      case 'double':
        return <TwoShareRoomAmenities />;
      case 'triple':
        return <ThreeShareRoomAmenities />;
      case 'four':
        return <FourShareRoomAmenities />;
      case 'five':
        return <FiveShareRoomAmenities />;
      case 'more':
        return customShare ? <CustomShareRoomAmenities occupantCount={parseInt(customShare, 10)} /> : null;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      <div className="p-6 bg-black text-white">
        <h1 className="text-2xl font-bold mb-6">Share Configuration</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {shareOptions.map((option) => (
            <div key={option.id} className="flex items-center">
              <input
                type="radio"
                id={option.id}
                name="shareType"
                checked={selectedShare === option.id}
                onChange={() => handleShareChange(option.id)}
                className="h-5 w-5 border-white bg-black checked:bg-white focus:ring-white focus:ring-2"
              />
              <label htmlFor={option.id} className="ml-3 text-white">
                {option.label}
              </label>
            </div>
          ))}
        </div>
        
        {selectedShare === 'more' && (
          <div className="mt-4 max-w-md">
            <input
              type="number"
              value={customShare}
              onChange={(e) => setCustomShare(e.target.value)}
              placeholder="Enter number of shares"
              min="6"
              className="w-full px-3 py-2 bg-black border border-white text-white placeholder-gray-400 focus:outline-none focus:border-white"
            />
          </div>
        )}
      </div>

      {/* Render selected room amenities component */}
      {selectedShare && (
        <div>
          {renderAmenitiesComponent(selectedShare)}
        </div>
      )}
    </div>
  );
};

export default Configuration;