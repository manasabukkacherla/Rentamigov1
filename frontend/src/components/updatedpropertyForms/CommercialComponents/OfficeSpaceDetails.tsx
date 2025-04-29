import React, { useState } from 'react';
import { ArrowRight, Users, Building2, Video, Option as Reception, Wifi, Server, DoorOpen } from 'lucide-react';

interface IOfficeDetails {
  seatingCapacity: number;
  cabins: {
    available: boolean;
    count: number;
  };
  conferenceRoom: boolean;
  meetingRoom: boolean;
  receptionArea: boolean;
  wifiSetup: boolean;
  serverRoom: boolean;
  coworkingFriendly: boolean;
}

interface OfficeSpaceDetailsProps {
  onDetailsChange: (details: IOfficeDetails) => void;
}

const OfficeSpaceDetails: React.FC<OfficeSpaceDetailsProps> = ({ onDetailsChange }) => {
  const [details, setDetails] = useState<IOfficeDetails>({
    seatingCapacity: 0,
    cabins: {
      available: false,
      count: 0
    },
    conferenceRoom: false,
    meetingRoom: false,
    receptionArea: false,
    wifiSetup: false,
    serverRoom: false,
    coworkingFriendly: false
  });

  const handleChange = (field: keyof IOfficeDetails, value: any) => {
    const newDetails = {
      ...details,
      [field]: value
    };
    setDetails(newDetails);
    onDetailsChange(newDetails);
  };

  const handleCabinsChange = (field: keyof IOfficeDetails['cabins'], value: any) => {
    const newDetails = {
      ...details,
      cabins: {
        ...details.cabins,
        [field]: value
      }
    };
    setDetails(newDetails);
    onDetailsChange(newDetails);
  };

  return (
    <div className="bg-gray-100 rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center gap-3 mb-8">
        <h3 className="text-2xl font-semibold text-gray-900">Office Space Details</h3>
        <ArrowRight className="text-gray-400" size={20} />
        <span className="text-sm text-gray-500">Enter Office Specifications</span>
      </div>

      <div className="space-y-8 max-w-4xl">
        {/* Seating and Cabins */}
        <div className="bg-white p-6 rounded-lg space-y-6 border border-gray-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Seating Capacity */}
            <div className="space-y-4">
              <h4 className="text-lg font-medium flex items-center gap-2 text-gray-800">
                <Users size={20} className="text-gray-600" />
                Seating Capacity
              </h4>
              <input
                type="number"
                min="0"
                value={details.seatingCapacity}
                onChange={(e) => handleChange('seatingCapacity', parseInt(e.target.value))}
                placeholder="Enter total seating capacity"
                className="w-full px-4 py-3 rounded-lg bg-white border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors duration-200 text-gray-900 placeholder:text-gray-400"
              />
            </div>

            {/* Cabins */}
            <div className="space-y-4">
              <h4 className="text-lg font-medium flex items-center gap-2 text-gray-800">
                <Building2 size={20} className="text-gray-600" />
                Cabins
              </h4>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      checked={details.cabins.available}
                      onChange={(e) => handleCabinsChange('available', e.target.checked)}
                      className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="text-gray-700">Available</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      checked={!details.cabins.available}
                      onChange={(e) => handleCabinsChange('available', false)}
                      className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="text-gray-700">Not Available</span>
                  </label>
                </div>
                {details.cabins.available && (
                  <input
                    type="number"
                    min="0"
                    value={details.cabins.count}
                    onChange={(e) => handleCabinsChange('count', parseInt(e.target.value))}
                    placeholder="Number of cabins"
                    className="w-full px-4 py-3 rounded-lg bg-white border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors duration-200 text-gray-900 placeholder:text-gray-400"
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Meeting Spaces */}
        <div className="bg-white p-6 rounded-lg space-y-6 border border-gray-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Conference Room */}
            <div className="space-y-4">
              <h4 className="text-lg font-medium flex items-center gap-2 text-gray-800">
                <Video size={20} className="text-gray-600" />
                Conference Room
              </h4>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={details.conferenceRoom}
                    onChange={(e) => handleChange('conferenceRoom', e.target.checked)}
                    className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="text-gray-700">Available</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={!details.conferenceRoom}
                    onChange={(e) => handleChange('conferenceRoom', false)}
                    className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="text-gray-700">Not Available</span>
                </label>
              </div>
            </div>

            {/* Meeting Room */}
            <div className="space-y-4">
              <h4 className="text-lg font-medium flex items-center gap-2 text-gray-800">
                <DoorOpen size={20} className="text-gray-600" />
                Meeting Room
              </h4>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={details.meetingRoom}
                    onChange={(e) => handleChange('meetingRoom', e.target.checked)}
                    className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="text-gray-700">Available</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={!details.meetingRoom}
                    onChange={(e) => handleChange('meetingRoom', false)}
                    className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="text-gray-700">Not Available</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Features */}
        <div className="bg-white p-6 rounded-lg space-y-6 border border-gray-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Reception Area */}
            <div className="space-y-4">
              <h4 className="text-lg font-medium flex items-center gap-2 text-gray-800">
                <Reception size={20} className="text-gray-600" />
                Reception Area
              </h4>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={details.receptionArea}
                    onChange={(e) => handleChange('receptionArea', e.target.checked)}
                    className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="text-gray-700">Yes</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={!details.receptionArea}
                    onChange={(e) => handleChange('receptionArea', false)}
                    className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="text-gray-700">No</span>
                </label>
              </div>
            </div>

            {/* WiFi Setup */}
            <div className="space-y-4">
              <h4 className="text-lg font-medium flex items-center gap-2 text-gray-800">
                <Wifi size={20} className="text-gray-600" />
                WiFi & Internet
              </h4>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={details.wifiSetup}
                    onChange={(e) => handleChange('wifiSetup', e.target.checked)}
                    className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="text-gray-700">Available</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={!details.wifiSetup}
                    onChange={(e) => handleChange('wifiSetup', false)}
                    className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="text-gray-700">Not Available</span>
                </label>
              </div>
            </div>

            {/* Server Room */}
            <div className="space-y-4">
              <h4 className="text-lg font-medium flex items-center gap-2 text-gray-800">
                <Server size={20} className="text-gray-600" />
                Server Room
              </h4>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={details.serverRoom}
                    onChange={(e) => handleChange('serverRoom', e.target.checked)}
                    className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="text-gray-700">Available</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={!details.serverRoom}
                    onChange={(e) => handleChange('serverRoom', false)}
                    className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="text-gray-700">Not Available</span>
                </label>
              </div>
            </div>

            {/* Co-working Friendly */}
            <div className="space-y-4">
              <h4 className="text-lg font-medium flex items-center gap-2 text-gray-800">
                <Users size={20} className="text-gray-600" />
                Co-working Friendly
              </h4>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={details.coworkingFriendly}
                    onChange={(e) => handleChange('coworkingFriendly', e.target.checked)}
                    className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="text-gray-700">Yes</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={!details.coworkingFriendly}
                    onChange={(e) => handleChange('coworkingFriendly', false)}
                    className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="text-gray-700">No</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfficeSpaceDetails;