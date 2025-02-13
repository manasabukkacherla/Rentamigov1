import React, { useState } from 'react';
import { 
  Users,
  Building2,
  DoorClosed,
  Users2,
  Bath
} from 'lucide-react';

interface SellFacilitiesDetails {
  minSeats: string;
  maxSeats: string;
  cabins: string;
  meetingRooms: string;
  privateWashrooms: string;
  publicWashrooms: string;
  hasConferenceRoom: boolean;
}

export default function SellFacilities() {
  const [formData, setFormData] = useState<SellFacilitiesDetails>({
    minSeats: '',
    maxSeats: '',
    cabins: '',
    meetingRooms: '',
    privateWashrooms: '',
    publicWashrooms: '',
    hasConferenceRoom: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleToggleConferenceRoom = () => {
    setFormData(prev => ({
      ...prev,
      hasConferenceRoom: !prev.hasConferenceRoom
    }));
  };

  const NumberInput = ({ 
    label, 
    name,
    icon: Icon,
    placeholder = "Enter number"
  }: { 
    label: string; 
    name: keyof SellFacilitiesDetails;
    icon: React.ElementType;
    placeholder?: string;
  }) => (
    <div>
      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
        <Icon className="h-5 w-5 text-gray-400" />
        {label} <span className="text-red-500">*</span>
      </label>
      <div className="relative w-full sm:w-[360px]">
        <input
          type="number"
          name={name}
          value={formData[name as keyof SellFacilitiesDetails]}
          onChange={handleInputChange}
          min="0"
          className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
          placeholder={placeholder}
        />
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-3xl pl-4 sm:pl-6 md:pl-8">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">Facilities</h2>

      <div className="space-y-6">
        {/* Seating Capacity */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <NumberInput
            label="Min. Number of seats"
            name="minSeats"
            icon={Users}
            placeholder="Enter minimum seats"
          />
          <NumberInput
            label="Max. Number of seats"
            name="maxSeats"
            icon={Users}
            placeholder="Enter maximum seats"
          />
        </div>

        {/* Rooms */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <NumberInput
            label="Number of Cabins"
            name="cabins"
            icon={DoorClosed}
            placeholder="Enter number of cabins"
          />
          <NumberInput
            label="Number of Meeting Rooms"
            name="meetingRooms"
            icon={Users2}
            placeholder="Enter number of rooms"
          />
        </div>

        {/* Washrooms */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <NumberInput
            label="Private Washrooms"
            name="privateWashrooms"
            icon={Bath}
            placeholder="Enter number of washrooms"
          />
          <NumberInput
            label="Public Washrooms"
            name="publicWashrooms"
            icon={Bath}
            placeholder="Enter number of washrooms"
          />
        </div>

        {/* Conference Room Toggle */}
        <div className="flex items-center gap-4 p-4 rounded-lg border border-gray-100 bg-white">
          <Building2 className="h-5 w-5 text-gray-400" />
          <div className="flex-1">
            <h3 className="text-sm font-medium text-gray-900">Conference Room</h3>
          </div>
          <button
            type="button"
            onClick={handleToggleConferenceRoom}
            className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            style={{
              backgroundColor: formData.hasConferenceRoom ? '#2563eb' : '#e5e7eb'
            }}
          >
            <span
              className={`${
                formData.hasConferenceRoom ? 'translate-x-6' : 'translate-x-1'
              } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
            />
            <span className="sr-only">Toggle Conference Room</span>
          </button>
        </div>
      </div>
    </div>
  );
}