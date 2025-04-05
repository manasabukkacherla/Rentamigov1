import React, { useState, useCallback } from 'react';
import { Building2, MapPin } from 'lucide-react';
import MapSelector from '../../MapSelector';

interface PgDetails {
  name: string;
  address: string;
  coordinates: {
    latitude: string;
    longitude: string;
  };
  propertyAddress: {
    flatNo: string;
    floor: string;
    houseName: string;
    address: string;
    pinCode: string;
    city: string;
    street: string;
    state: string;
    zipCode: string;
  };
}

const PgName = () => {
  const [details, setDetails] = useState<PgDetails>({
    name: '',
    address: '',
    coordinates: {
      latitude: '',
      longitude: ''
    },
    propertyAddress: {
      flatNo: '',
      floor: '',
      houseName: '',
      address: '',
      pinCode: '',
      city: '',
      street: '',
      state: '',
      zipCode: ''
    }
  });

  const handleChange = (field: keyof Pick<PgDetails, 'name' | 'address'>, value: string) => {
    setDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Function to update property address details
  const handleAddressChange = useCallback((addressData: any) => {
    setDetails((prev) => ({
      ...prev,
      propertyAddress: {
        ...prev.propertyAddress,
        ...addressData,
        zipCode: addressData.pinCode || addressData.zipCode || prev.propertyAddress.zipCode,
        pinCode: addressData.zipCode || addressData.pinCode || prev.propertyAddress.pinCode
      }
    }))
  }, []);

  // Function to update coordinates and address
  const handleLocationSelect = useCallback((latitude: string, longitude: string, addressData?: any) => {
    setDetails((prev) => ({
      ...prev,
      coordinates: { latitude, longitude },
      propertyAddress: addressData ? {
        ...prev.propertyAddress,
        ...addressData,
        zipCode: addressData.postal_code || addressData.pinCode || prev.propertyAddress.zipCode,
        city: addressData.city || addressData.locality || prev.propertyAddress.city,
        state: addressData.state || addressData.administrative_area_level_1 || prev.propertyAddress.state,
        street: addressData.street || addressData.route || prev.propertyAddress.street,
      } : prev.propertyAddress,
    }))
  }, []);

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">PG Name</label>
          <div className="relative">
            <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-black/60" />
            <input
              type="text"
              value={details.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="Enter PG name"
              className="w-full pl-10 pr-3 py-2 bg-white border rounded-lg focus:ring-1 focus:ring-black"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Address</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 w-5 h-5 text-black/60" />
            <textarea
              value={details.address}
              onChange={(e) => handleChange('address', e.target.value)}
              placeholder="Enter complete address"
              rows={3}
              className="w-full pl-10 pr-3 py-2 bg-white border rounded-lg focus:ring-1 focus:ring-black"
            />
          </div>
        </div>

        <div className="mt-6">
          <MapSelector
            latitude={details.coordinates.latitude}
            longitude={details.coordinates.longitude}
            onLocationSelect={handleLocationSelect}
          />
        </div>
      </div>
    </div>
  );
};

export default PgName;