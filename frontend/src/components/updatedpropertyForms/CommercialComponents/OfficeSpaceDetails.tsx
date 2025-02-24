import { useState } from 'react';
import { ArrowRight, Users, Building2, Video, Option as Reception, Wifi, Server, DoorOpen } from 'lucide-react';

interface OfficeSpaceDetailsProps {
  onDetailsChange?: (details: Record<string, any>) => void;
}

const OfficeSpaceDetails = ({ onDetailsChange }: OfficeSpaceDetailsProps) => {
  const [details, setDetails] = useState({
    seatingCapacity: '',
    cabins: {
      available: false,
      count: ''
    },
    conferenceRoom: false,
    receptionArea: false,
    wifiSetup: false,
    coworkingFriendly: false,
    serverRoom: false,
    meetingRoom: false
  });

  const handleChange = (field: string, value: any) => {
    const updatedDetails = { ...details, [field]: value };
    setDetails(updatedDetails);
    onDetailsChange?.(updatedDetails);
  };

  const handleCabinChange = (field: string, value: any) => {
    const updatedCabins = { ...details.cabins, [field]: value };
    handleChange('cabins', updatedCabins);
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <h3 className="text-2xl font-semibold">Office Space Details</h3>
        <ArrowRight className="opacity-40" size={20} />
        <span className="text-sm opacity-70">Enter Office Specifications</span>
      </div>

      <div className="space-y-8 max-w-4xl">
        {/* Seating and Cabins */}
        <div className="bg-white/5 p-6 rounded-lg space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Seating Capacity */}
            <div className="space-y-4">
              <h4 className="text-lg font-medium flex items-center gap-2">
                <Users size={20} className="text-white/60" />
                Seating Capacity
              </h4>
              <input
                type="number"
                min="0"
                value={details.seatingCapacity}
                onChange={(e) => handleChange('seatingCapacity', e.target.value)}
                placeholder="Enter total seating capacity"
                className="w-full px-4 py-3 rounded-lg bg-transparent border border-white/20 focus:border-white outline-none transition-colors duration-200 text-white placeholder:text-white/40"
              />
            </div>

            {/* Cabins */}
            <div className="space-y-4">
              <h4 className="text-lg font-medium flex items-center gap-2">
                <Building2 size={20} className="text-white/60" />
                Cabins
              </h4>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      checked={details.cabins.available}
                      onChange={() => handleCabinChange('available', true)}
                      className="text-white border-white/20 bg-transparent focus:ring-white"
                    />
                    <span className="text-white/80">Available</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      checked={!details.cabins.available}
                      onChange={() => handleCabinChange('available', false)}
                      className="text-white border-white/20 bg-transparent focus:ring-white"
                    />
                    <span className="text-white/80">Not Available</span>
                  </label>
                </div>
                {details.cabins.available && (
                  <input
                    type="number"
                    min="0"
                    value={details.cabins.count}
                    onChange={(e) => handleCabinChange('count', e.target.value)}
                    placeholder="Number of cabins"
                    className="w-full px-4 py-3 rounded-lg bg-transparent border border-white/20 focus:border-white outline-none transition-colors duration-200 text-white placeholder:text-white/40"
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Meeting Spaces */}
        <div className="bg-white/5 p-6 rounded-lg space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Conference Room */}
            <div className="space-y-4">
              <h4 className="text-lg font-medium flex items-center gap-2">
                <Video size={20} className="text-white/60" />
                Conference Room
              </h4>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={details.conferenceRoom}
                    onChange={() => handleChange('conferenceRoom', true)}
                    className="text-white border-white/20 bg-transparent focus:ring-white"
                  />
                  <span className="text-white/80">Available</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={!details.conferenceRoom}
                    onChange={() => handleChange('conferenceRoom', false)}
                    className="text-white border-white/20 bg-transparent focus:ring-white"
                  />
                  <span className="text-white/80">Not Available</span>
                </label>
              </div>
            </div>

            {/* Meeting Room */}
            <div className="space-y-4">
              <h4 className="text-lg font-medium flex items-center gap-2">
                <DoorOpen size={20} className="text-white/60" />
                Meeting Room
              </h4>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={details.meetingRoom}
                    onChange={() => handleChange('meetingRoom', true)}
                    className="text-white border-white/20 bg-transparent focus:ring-white"
                  />
                  <span className="text-white/80">Available</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={!details.meetingRoom}
                    onChange={() => handleChange('meetingRoom', false)}
                    className="text-white border-white/20 bg-transparent focus:ring-white"
                  />
                  <span className="text-white/80">Not Available</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Features */}
        <div className="bg-white/5 p-6 rounded-lg space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Reception Area */}
            <div className="space-y-4">
              <h4 className="text-lg font-medium flex items-center gap-2">
                <Reception size={20} className="text-white/60" />
                Reception Area
              </h4>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={details.receptionArea}
                    onChange={() => handleChange('receptionArea', true)}
                    className="text-white border-white/20 bg-transparent focus:ring-white"
                  />
                  <span className="text-white/80">Yes</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={!details.receptionArea}
                    onChange={() => handleChange('receptionArea', false)}
                    className="text-white border-white/20 bg-transparent focus:ring-white"
                  />
                  <span className="text-white/80">No</span>
                </label>
              </div>
            </div>

            {/* WiFi Setup */}
            <div className="space-y-4">
              <h4 className="text-lg font-medium flex items-center gap-2">
                <Wifi size={20} className="text-white/60" />
                WiFi & Internet
              </h4>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={details.wifiSetup}
                    onChange={() => handleChange('wifiSetup', true)}
                    className="text-white border-white/20 bg-transparent focus:ring-white"
                  />
                  <span className="text-white/80">Available</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={!details.wifiSetup}
                    onChange={() => handleChange('wifiSetup', false)}
                    className="text-white border-white/20 bg-transparent focus:ring-white"
                  />
                  <span className="text-white/80">Not Available</span>
                </label>
              </div>
            </div>

            {/* Server Room */}
            <div className="space-y-4">
              <h4 className="text-lg font-medium flex items-center gap-2">
                <Server size={20} className="text-white/60" />
                Server Room
              </h4>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={details.serverRoom}
                    onChange={() => handleChange('serverRoom', true)}
                    className="text-white border-white/20 bg-transparent focus:ring-white"
                  />
                  <span className="text-white/80">Available</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={!details.serverRoom}
                    onChange={() => handleChange('serverRoom', false)}
                    className="text-white border-white/20 bg-transparent focus:ring-white"
                  />
                  <span className="text-white/80">Not Available</span>
                </label>
              </div>
            </div>

            {/* Co-working Friendly */}
            <div className="space-y-4">
              <h4 className="text-lg font-medium flex items-center gap-2">
                <Users size={20} className="text-white/60" />
                Co-working Friendly
              </h4>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={details.coworkingFriendly}
                    onChange={() => handleChange('coworkingFriendly', true)}
                    className="text-white border-white/20 bg-transparent focus:ring-white"
                  />
                  <span className="text-white/80">Yes</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={!details.coworkingFriendly}
                    onChange={() => handleChange('coworkingFriendly', false)}
                    className="text-white border-white/20 bg-transparent focus:ring-white"
                  />
                  <span className="text-white/80">No</span>
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