"use client";

import React, { useState } from "react";
import { Building, MapPin, Navigation, Locate } from "lucide-react";
import toast from "react-hot-toast";

interface PropertyAddressProps {
  address: {
    flatNo?: number;
    showFlatNo?: boolean;
    floor?: number;
    apartmentName?: string;
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
    locationLabel?: string;
  };
  onAddressChange: (address: any) => void;
  showFlatNo?: boolean;
}

const PropertyAddress: React.FC<PropertyAddressProps> = ({
  address = {}, // Default to an empty object to prevent errors if address is not provided
  onAddressChange,
  showFlatNo = true,
}) => {
  const [showMap, setShowMap] = useState(false);

  // Function to handle changes in the address fields
  const handleChange = (field: string, value: any) => {
    onAddressChange({
      ...address,
      [field]: value,
    });
  };

  // Function to update map location based on latitude and longitude
  const updateMapLocation = (lat: string, lng: string) => {
    const iframe = document.getElementById("map-iframe") as HTMLIFrameElement;
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

          onAddressChange((prev) => ({
            ...prev,
            coordinates: { lat: Number(lat), lng: Number(lng) },
          }));

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
    const lat = address.coordinates?.lat || "20.5937";
    const lng = address.coordinates?.lng || "78.9629";
    window.open(`https://www.google.com/maps/@${lat},${lng},18z`, "_blank");
    toast.info("After selecting a location in Google Maps, please manually input the coordinates here.");
  };

  const inputClasses =
    "w-full h-12 px-4 rounded-lg border border-black/10 bg-white text-black placeholder:text-black/30 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black shadow-sm transition-all duration-200";

  return (
    <div className="bg-white rounded-xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-black/5 mb-8">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center gap-3 border-b border-black/5 pb-6">
          <Building className="h-6 w-6 text-black/70" />
          <h2 className="text-xl font-medium text-black/80">Property Address</h2>
        </div>

        {/* Show Flat No Toggle */}
        {showFlatNo && (
          <label className="flex items-center gap-2.5 text-sm text-black/70 bg-black/5 px-4 py-3 rounded-lg w-fit">
            <input
              type="checkbox"
              checked={address.showFlatNo ?? false} // Use default value if showFlatNo is undefined
              onChange={(e) =>
                handleChange("showFlatNo", e.target.checked ? true : false)
              }
              className="rounded border-black/10 text-black focus:ring-black/5"
            />
            Show Flat No. in the Listing
          </label>
        )}

        {/* Address Fields in Three Lines */}
        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-black/70 mb-2.5">
                Apartment / House Name
              </label>
              <input
                type="text"
                value={address.apartmentName || ""}
                onChange={(e) => handleChange("apartmentName", e.target.value)}
                placeholder="Enter apartment/house name"
                className={inputClasses}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black/70 mb-2.5">
                Flat No / Block No
              </label>
              <input
                type="text"
                value={address.flatNo || ""}
                onChange={(e) => handleChange("flatNo", parseFloat(e.target.value))}
                placeholder="Enter flat/block number"
                className={inputClasses}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black/70 mb-2.5">Floor</label>
              <input
                type="text"
                value={address.floor || ""}
                onChange={(e) => handleChange("floor", parseFloat(e.target.value))}
                placeholder="Enter floor"
                className={inputClasses}
              />
            </div>
          </div>

          {/* Line 2: City, State, ZIP Code */}
          <div className="grid grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-black/70 mb-2.5">City</label>
              <input
                type="text"
                value={address.city || ""}
                onChange={(e) => handleChange("city", e.target.value)}
                placeholder="Enter city"
                className={inputClasses}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black/70 mb-2.5">State</label>
              <input
                type="text"
                value={address.state || ""}
                onChange={(e) => handleChange("state", e.target.value)}
                placeholder="Enter state"
                className={inputClasses}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black/70 mb-2.5">ZIP Code</label>
              <input
                type="text"
                value={address.zipCode || ""}
                onChange={(e) => handleChange("zipCode", e.target.value)}
                placeholder="Enter ZIP code"
                className={inputClasses}
              />
            </div>
          </div>

          {/* Street Address */}
          <div>
            <label className="block text-sm font-medium text-black/70 mb-2.5">Street Address</label>
            <input
              type="text"
              value={address.street || ""}
              onChange={(e) => handleChange("street", e.target.value)}
              placeholder="Enter street address"
              className={inputClasses}
            />
          </div>
        </div>

        {/* Map Embed and Coordinates */}
        <div className="bg-white p-6 rounded-lg space-y-6">
          <h4 className="text-lg font-medium mb-4 text-black">Select Location on Map</h4>
          <p className="text-sm text-gray-500 mb-4">
            Use the map below to set your property's location. Click on the map or search for an address.
          </p>
          <div className="aspect-video bg-gray-100 rounded-xl overflow-hidden relative mb-6">
            <iframe
              id="map-iframe"
              src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d500!2d${address.coordinates?.lng || '78.9629'}!3d${address.coordinates?.lat || '20.5937'}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s${address.coordinates?.lat || '20.5937'},${address.coordinates?.lng || '78.9629'}!5e0!3m2!1sen!2sin!4v1709667547372!5m2!1sen!2sin`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-xl"
              title="Property Location Map"
            ></iframe>
            <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
              <button
                onClick={() => getCurrentLocation()}
                className="bg-white p-2 rounded-lg shadow-md hover:bg-gray-100 transition-colors flex items-center gap-2"
                aria-label="Get current location"
                type="button"
              >
                <Locate className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium">My Location</span>
              </button>

              <button
                onClick={() => openLocationPicker()}
                className="bg-white p-2 rounded-lg shadow-md hover:bg-gray-100 transition-colors flex items-center gap-2"
                aria-label="Select location"
                type="button"
              >
                <Navigation className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium">Select Location</span>
              </button>
            </div>
          </div>

          {/* Coordinates Inputs */}
          <div>
            <h4 className="text-lg font-medium mb-4 text-black">Coordinates</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="latitude" className="block text-gray-800 font-medium mb-2">
                  Latitude
                </label>
                <input
                  type="text"
                  id="latitude"
                  value={address.coordinates?.lat || ""}
                  onChange={(e) =>
                    handleChange("coordinates", {
                      ...address.coordinates,
                      lat: parseFloat(e.target.value),
                    })
                  }
                  placeholder="Enter latitude"
                  className={inputClasses}
                />
              </div>
              <div>
                <label htmlFor="longitude" className="block text-gray-800 font-medium mb-2">
                  Longitude
                </label>
                <input
                  type="text"
                  id="longitude"
                  value={address.coordinates?.lng || ""}
                  onChange={(e) =>
                    handleChange("coordinates", {
                      ...address.coordinates,
                      lng: parseFloat(e.target.value),
                    })
                  }
                  placeholder="Enter longitude"
                  className={inputClasses}
                />
              </div>
            </div>
            <p className="mt-2 text-xs text-gray-500">
              Enter coordinates manually or use the map above to set the location.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyAddress;
