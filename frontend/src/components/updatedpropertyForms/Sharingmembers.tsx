import React from 'react';
import { Bed } from 'lucide-react';

interface SharingMembersProps {
  onOccupancyChange: (occupancy: {
    totalBeds: number;
    occupiedBeds: number;
    availableBeds: number;
    occupancyType: 'male' | 'female' | 'any';
  }) => void;
}

const SharingMembers: React.FC<SharingMembersProps> = ({ onOccupancyChange }) => {
  const [totalBeds, setTotalBeds] = React.useState(1);
  const [occupiedBeds, setOccupiedBeds] = React.useState(0);
  const [occupancyType, setOccupancyType] = React.useState<'male' | 'female' | 'any'>('any');

  React.useEffect(() => {
    onOccupancyChange({
      totalBeds,
      occupiedBeds,
      availableBeds: totalBeds - occupiedBeds,
      occupancyType
    });
  }, [totalBeds, occupiedBeds, occupancyType, onOccupancyChange]);

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Sharing Details</h3>
      
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Total Beds
          </label>
          <div className="flex items-center space-x-4">
            <input
              type="number"
              min="1"
              value={totalBeds}
              onChange={(e) => setTotalBeds(Math.max(1, parseInt(e.target.value)))}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
            <Bed className="w-5 h-5 text-gray-400" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Occupied Beds
          </label>
          <input
            type="number"
            min="0"
            max={totalBeds}
            value={occupiedBeds}
            onChange={(e) => setOccupiedBeds(Math.min(totalBeds, Math.max(0, parseInt(e.target.value))))}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Available for
        </label>
        <div className="flex space-x-4">
          {(['male', 'female', 'any'] as const).map((type) => (
            <label key={type} className="flex items-center space-x-2">
              <input
                type="radio"
                checked={occupancyType === type}
                onChange={() => setOccupancyType(type)}
                className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm capitalize">{type}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-blue-800">Available Beds</span>
          <span className="text-2xl font-bold text-blue-800">
            {totalBeds - occupiedBeds}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SharingMembers;