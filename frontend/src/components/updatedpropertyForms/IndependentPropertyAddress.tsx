"use client";

import React, { useState } from "react";
import { Building, MapPin, Navigation, Locate } from "lucide-react";
import toast from 'react-hot-toast';

interface IndependentPropertyAddressProps {
  propertyAddress: {
    houseName: string;    
    street: string;
    city: string;
    state: string;
    zipCode: string;
    pinCode: string;
    location: {
      latitude: string;
      longitude: string;
    };
  };
  onAddressChange: (propertyAddress: any) => void;
}

const inputClasses =
  "w-full h-12 px-4 rounded-lg border border-black/10 bg-white text-black placeholder:text-black/30 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black shadow-sm transition-all duration-200";

const IndependentPropertyAddress: React.FC<IndependentPropertyAddressProps> = ({
  propertyAddress,
  onAddressChange,
}) => {
  const [showMap, setShowMap] = useState(false);

  const handleChange = (field: string, value: any) => {
    onAddressChange({
      ...propertyAddress,
      [field]: value,
    });
  };

  // Function to update map location based on latitude and longitude
  const updateMapLocation = (lat: string, lng: string) => {
    const iframe = document.getElementById('map-iframe') as HTMLIFrameElement;
    if (iframe && lat && lng) {
      iframe.src = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d500!2d${lng}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s${lat},${lng}!5e0!3m2!1sen!2sin!4v1709667547372!5m2!1sen!2sin`;
    }
  };

  // Function to get current location
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude.toString();
          const lng = position.coords.longitude.toString();

          onAddressChange({
            ...propertyAddress,
            location: { latitude: lat, longitude: lng },
          });

          updateMapLocation(lat, lng);
        },
        (error) => {
          console.error("Error getting location: ", error);
          toast.error("Unable to get your current location. Please check your browser permissions.");
        }
      );
    } else {
      toast.error("Geolocation is not supported by your browser.");
    }
  };

  // Function to open location picker in Google Maps
  const openLocationPicker = () => {
    const lat = propertyAddress.location.latitude || "20.5937";
    const lng = propertyAddress.location.longitude || "78.9629";
    window.open(`https://www.google.com/maps/@${lat},${lng},18z`, "_blank");
    toast.success("Select location in Maps, then manually enter coordinates.");
  };

  const handleLocationSelect = (lat: string, lng: string, addressData?: any) => {
    // let locationLabel = `${lat}, ${lng}`;
    if (addressData) {
      const components = [];
      if (addressData.route) components.push(addressData.route);
      if (addressData.sublocality_level_1) components.push(addressData.sublocality_level_1);
      if (addressData.locality) components.push(addressData.locality);
      // if (components.length > 0) {
      //   locationLabel = components.join(", ");
      // }
    }
    onAddressChange({
      ...propertyAddress,
      location: { latitude: lat, longitude: lng },
    });
  };

  return (
    <div className="bg-white rounded-xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-black/5 mb-8">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center gap-3 border-b border-black/5 pb-6">
          <Building className="h-6 w-6 text-black/70" />
          <h2 className="text-xl font-medium text-black/80">Property Address</h2>
        </div>

        <div className="space-y-6">
          {/* Address Fields */}
          <div className="grid grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-black/70 mb-2.5">House Name</label>
              <input
                type="text"
                value={propertyAddress.houseName || ""}
                onChange={(e) => handleChange("houseName", e.target.value)}
                placeholder="Enter house name"
                className={inputClasses}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black/70 mb-2.5">Pin Code</label>
              <input
                type="text"
                value={propertyAddress.pinCode || ""}
                onChange={(e) => handleChange("pinCode", e.target.value)}
                placeholder="Enter pin code"
                className={inputClasses}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black/70 mb-2.5">ZIP Code</label>
              <input
                type="text"
                value={propertyAddress.zipCode || ""}
                onChange={(e) => handleChange("zipCode", e.target.value)}
                placeholder="Enter ZIP code"
                className={inputClasses}
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-black/70 mb-2.5">City</label>
              <input
                type="text"
                value={propertyAddress.city || ""}
                onChange={(e) => handleChange("city", e.target.value)}
                placeholder="Enter city"
                className={inputClasses}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black/70 mb-2.5">State</label>
              <input
                type="text"
                value={propertyAddress.state || ""}
                onChange={(e) => handleChange("state", e.target.value)}
                placeholder="Enter state"
                className={inputClasses}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black/70 mb-2.5">Street Address</label>
              <input
                type="text"
                value={propertyAddress.street || ""}
                onChange={(e) => handleChange("street", e.target.value)}
                placeholder="Enter street address"
                className={inputClasses}
              />
            </div>
          </div>

          {/* Map Embed and Coordinates */}
          <div className="relative aspect-video bg-gray-100 rounded-xl overflow-hidden mb-4">
        <iframe
          id="map-iframe"
          width="100%"
          height="100%"
          className="rounded-xl"
          title="Property Location Map"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d500!2d${propertyAddress.location.longitude || '78.9629'}!3d${propertyAddress.location.latitude || '20.5937'}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s${propertyAddress.location.latitude},${propertyAddress.location.longitude}!5e0!3m2!1sen!2sin!4v1709667547372!5m2!1sen!2sin`}
        ></iframe>

        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <button
            onClick={getCurrentLocation}
            className="bg-white p-2 rounded-md shadow hover:bg-gray-100 text-sm flex items-center gap-2"
          >
            <Locate className="w-4 h-4 text-blue-600" />
            My Location
          </button>
          <button
            onClick={openLocationPicker}
            className="bg-white p-2 rounded-md shadow hover:bg-gray-100 text-sm flex items-center gap-2"
          >
            <Navigation className="w-4 h-4 text-blue-600" />
            Select Location
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
      <input
          type="number"
          value={propertyAddress.location.latitude}
          onChange={(e) =>
            handleChange("location", {
              ...propertyAddress.location,
              latitude: parseFloat(e.target.value),
            })
          }
          placeholder="Latitude"
          className={inputClasses}
        />
        <input
          type="number"
          value={propertyAddress.location.longitude}
          onChange={(e) =>
            handleChange("location", {
              ...propertyAddress.location,
              longitude: parseFloat(e.target.value),
            })
          }
          placeholder="Longitude"
          className={inputClasses}
        />
      </div>
    </div>
    </div>
    </div>
  );
};


export default IndependentPropertyAddress;
