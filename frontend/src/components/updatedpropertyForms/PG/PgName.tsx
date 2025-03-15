import React, { useState } from 'react';
import { Building2, MapPin, Map } from 'lucide-react';

interface PgDetails {
  name: string;
  address: string;
  longitude: string;
  latitude: string;
}

const PgName = () => {
  const [details, setDetails] = useState<PgDetails>({
    name: '',
    address: '',
    longitude: '',
    latitude: '',
  });

  const handleChange = (field: keyof PgDetails, value: string) => {
    setDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="p-4 bg-black text-white">
      <div className="flex items-center space-x-2 mb-4">
        <Building2 className="w-6 h-6 text-purple-400" />
        <h1 className="text-xl font-bold">PG Details</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Basic Details */}
        <div className="bg-gray-900 rounded-lg p-4">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">PG Name</label>
              <div className="relative">
                <Building2 className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={details.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="Enter PG name"
                  className="w-full pl-8 pr-2 py-2 text-sm bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Complete Address</label>
              <div className="relative">
                <MapPin className="absolute left-2 top-3 w-4 h-4 text-gray-400" />
                <textarea
                  value={details.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  placeholder="Enter complete address"
                  rows={3}
                  className="w-full pl-8 pr-2 py-2 text-sm bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-white"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Location Coordinates */}
        <div className="bg-gray-900 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-4">
            <Map className="w-5 h-5 text-blue-400" />
            <h2 className="font-semibold">Location Coordinates</h2>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Longitude</label>
              <input
                type="text"
                value={details.longitude}
                onChange={(e) => handleChange('longitude', e.target.value)}
                placeholder="Enter longitude"
                className="w-full px-3 py-2 text-sm bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Latitude</label>
              <input
                type="text"
                value={details.latitude}
                onChange={(e) => handleChange('latitude', e.target.value)}
                placeholder="Enter latitude"
                className="w-full px-3 py-2 text-sm bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-white"
              />
            </div>
          </div>

          {/* Location Preview */}
          {details.longitude && details.latitude && (
            <div className="mt-4 p-3 bg-gray-800 rounded-md text-sm">
              <div className="flex items-center justify-between text-gray-400">
                <span>Location Preview:</span>
                <a
                  href={`https://www.google.com/maps?q=${details.latitude},${details.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300"
                >
                  View on Google Maps
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Summary */}
      {(details.name || details.address || details.longitude || details.latitude) && (
        <div className="mt-4 p-4 bg-gray-900 rounded-lg">
          <h2 className="text-sm font-semibold mb-2">Details Summary:</h2>
          <div className="space-y-2 text-sm text-gray-400">
            {details.name && (
              <div className="flex items-center space-x-2">
                <Building2 className="w-4 h-4" />
                <span>{details.name}</span>
              </div>
            )}
            {details.address && (
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 mt-1" />
                <span>{details.address}</span>
              </div>
            )}
            {(details.longitude || details.latitude) && (
              <div className="flex items-center space-x-2">
                <Map className="w-4 h-4" />
                <span>
                  {details.latitude && `Lat: ${details.latitude}`}
                  {details.latitude && details.longitude && ', '}
                  {details.longitude && `Long: ${details.longitude}`}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PgName;