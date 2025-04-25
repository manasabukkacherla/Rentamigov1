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
              onClick={() => handleShareChange(option.id)}
              className={`
                flex items-center p-4 rounded-lg border cursor-pointer transition-all
                ${selectedShare === option.id 
                  ? 'border-black bg-black text-white shadow-md' 
                  : 'border-gray-200 bg-white text-gray-800'
                }
              `}
            >
              <input
                type="radio"
                id={option.id}
                name="shareType"
                checked={selectedShare === option.id}
                onChange={() => {}}
                className={`h-4 w-4 ${selectedShare === option.id ? 'accent-white' : 'accent-black'}`}
              />
              <label htmlFor={option.id} className="ml-3 flex-grow cursor-pointer">
                {option.label}
              </label>
              <UserPlus className={`h-4 w-4 ${selectedShare === option.id ? 'text-white' : 'text-gray-500'}`} />
            </div>
          ))}
        </div>
        
        {selectedShare === 'more' && (
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
      {selectedShare && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="mb-4">
            <h3 className="text-lg font-medium text-gray-900">
              {selectedShare === 'single' ? 'Single Room' : 
               selectedShare === 'double' ? 'Double Share Room' :
               selectedShare === 'triple' ? 'Triple Share Room' :
               selectedShare === 'four' ? 'Four Share Room' :
               selectedShare === 'five' ? 'Five Share Room' :
               `${customShare}-Share Room`} Amenities
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Select amenities available for this room type
            </p>
          </div>
          
          {renderAmenitiesComponent(selectedShare)}
        </div>
      )}
    </div>
  );
};

export default Configuration;
