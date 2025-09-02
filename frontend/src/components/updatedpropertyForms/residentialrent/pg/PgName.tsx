import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Building2, MapPin, Locate, Navigation } from 'lucide-react';
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

type AccommodationType = 'boys' | 'girls' | 'both boys and girls';

interface PgNameProps {
  pgName?: string;
  onPgNameChange?: (name: string) => void;
  accommodationType?: AccommodationType;
  onAccommodationTypeChange?: (type: AccommodationType) => void;
  address?: string;
  onAddressChange?: (address: string) => void;
  location?: {
    latitude: number;
    longitude: number;
  };
  onLocationChange?: (location: { latitude: number; longitude: number }) => void;
}

const PgName: React.FC<PgNameProps> = ({
  pgName = '',
  onPgNameChange,
  accommodationType = 'both boys and girls',
  onAccommodationTypeChange,
  address = '',
  onAddressChange,
  location = { latitude: 0, longitude: 0 },
  onLocationChange
}) => {
  const [details, setDetails] = useState<PgDetails>({
    name: pgName,
    address: address,
    coordinates: {
      latitude: location.latitude.toString(),
      longitude: location.longitude.toString()
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
  
  // Update local state when props change
  useEffect(() => {
    setDetails(prev => ({
      ...prev,
      name: pgName,
      address: address,
      coordinates: {
        latitude: location.latitude.toString(),
        longitude: location.longitude.toString()
      }
    }));
  }, [pgName, address, location]);
  
  const [selectedType, setSelectedType] = useState<AccommodationType>(accommodationType);

  const handleChange = (field: keyof Pick<PgDetails, 'name' | 'address'>, value: string) => {
    setDetails(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Update parent component state
    if (field === 'name' && onPgNameChange) {
      onPgNameChange(value);
    } else if (field === 'address' && onAddressChange) {
      onAddressChange(value);
    }
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
    }));
    
    // Update parent component state
    if (onLocationChange) {
      onLocationChange({
        latitude: parseFloat(latitude) || 0,
        longitude: parseFloat(longitude) || 0
      });
    }
    
    // If we have address data and onAddressChange is provided, update the address
    if (addressData && onAddressChange) {
      const formattedAddress = [
        addressData.street || addressData.route,
        addressData.city || addressData.locality,
        addressData.state || addressData.administrative_area_level_1,
        addressData.postal_code || addressData.pinCode
      ].filter(Boolean).join(', ');
      
      if (formattedAddress) {
        onAddressChange(formattedAddress);
      }
    }
  }, [onLocationChange, onAddressChange]);

  // Function to get current location
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude.toString();
          const lng = position.coords.longitude.toString();
          handleLocationSelect(lat, lng);
          updateMapLocation(lat, lng);
        },
        (error) => {
          console.error("Error getting location: ", error);
          alert("Unable to get your current location. Please check your browser permissions.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  // Function to open a location picker
  const openLocationPicker = () => {
    // Since we're using an iframe, we'll redirect to Google Maps in a new tab
    const lat = details.coordinates.latitude || "12.9716";
    const lng = details.coordinates.longitude || "77.5946";
    window.open(`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`, '_blank');
    alert("After selecting a location in Google Maps, please manually input the coordinates here.");
  };

  // Function to update map location based on latitude and longitude
  const updateMapLocation = (lat: string, lng: string) => {
    const iframe = document.getElementById('map-iframe') as HTMLIFrameElement;
    if (iframe && lat && lng) {
      iframe.src = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000!2d${lng}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDI4JzM0LjIiTiA1NMKwMTUnMjMuNCJF!5e0!3m2!1sen!2sin!4v1709667547372!5m2!1sen!2sin`;
    }
  };

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

        {/* PG Type Selection */}
        <div>
          <label className="block text-sm font-medium mb-1">PG Accommodation Type</label>
          <div className="flex flex-col sm:flex-row gap-6">
            {[
              { id: 'boys', label: 'Boys Only' },
              { id: 'girls', label: 'Girls Only' },
              { id: 'both boys and girls', label: 'Both Boys & Girls' },
            ].map((option) => (
              <div key={option.id} className="flex items-center">
                <input
                  type="radio"
                  id={option.id}
                  name="pgType"
                  value={option.id}
                  checked={selectedType === option.id}
                  onChange={(e) => {
                    const newType = e.target.value as AccommodationType;
                    setSelectedType(newType);
                    if (onAccommodationTypeChange) {
                      onAccommodationTypeChange(newType);
                    }
                  }}
                  className="h-5 w-5 border-black bg-white checked:bg-black focus:ring-black focus:ring-2"
                />
                <label htmlFor={option.id} className="ml-3 text-lg">
                  {option.label}
                </label>
              </div>
            ))}
          </div>
          <div className="mt-2">
            <span className="text-sm">Selected accommodation type: <span className="font-semibold">{[
              { id: 'boys', label: 'Boys Only' },
              { id: 'girls', label: 'Girls Only' },
              { id: 'both boys and girls', label: 'Both Boys & Girls' },
            ].find(opt => opt.id === selectedType)?.label}</span></span>
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
          <div className="relative">
            <div className="aspect-video bg-gray-100 rounded-xl overflow-hidden relative mb-6">
              <iframe
                id="map-iframe"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.5965966906644!2d77.64163427473439!3d12.838572987455667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae6b2ef7f1c6f3%3A0x6c06e8c7dc1ac0e!2sElectronic%20City%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1709667547372!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-xl"
                title="PG Location Map"
              ></iframe>

              <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
                <button 
                  onClick={() => getCurrentLocation()}
                  className="bg-white p-2 rounded-lg shadow-md hover:bg-gray-100 transition-colors flex items-center gap-2"
                  aria-label="Get current location"
                >
                  <Locate className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium">My Location</span>
                </button>
                
                <button
                  onClick={() => openLocationPicker()}
                  className="bg-white p-2 rounded-lg shadow-md hover:bg-gray-100 transition-colors flex items-center gap-2"
                  aria-label="Select location"
                >
                  <Navigation className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium">Select Location</span>
                </button>
              </div>
            </div>
          </div>

          {/* Latitude and Longitude Fields */}
          <div className="flex gap-4 mt-4">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Latitude</label>
              <input
                type="number"
                step="any"
                value={details.coordinates.latitude}
                onChange={e => {
                  const lat = e.target.value;
                  handleLocationSelect(lat, details.coordinates.longitude);
                  updateMapLocation(lat, details.coordinates.longitude);
                }}
                placeholder="Latitude"
                className="w-full px-3 py-2 bg-white border rounded-lg focus:ring-1 focus:ring-black"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Longitude</label>
              <input
                type="number"
                step="any"
                value={details.coordinates.longitude}
                onChange={e => {
                  const lng = e.target.value;
                  handleLocationSelect(details.coordinates.latitude, lng);
                  updateMapLocation(details.coordinates.latitude, lng);
                }}
                placeholder="Longitude"
                className="w-full px-3 py-2 bg-white border rounded-lg focus:ring-1 focus:ring-black"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PgName;