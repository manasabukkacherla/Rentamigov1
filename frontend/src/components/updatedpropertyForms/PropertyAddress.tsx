"use client";

import React, { useState } from "react";
import { Building, Navigation, Locate } from "lucide-react";
import toast from "react-hot-toast";

interface PropertyAddressProps {
  address: {
    flatNo: number;
    showFlatNo: boolean;
    floor: number;
    apartmentName: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    location: {
      latitute: string;
      longitude: string;
    };
    locationLabel: string;
  };
  onAddressChange: (address: any) => void;
}

const PropertyAddress: React.FC<PropertyAddressProps> = ({
  address,
  onAddressChange,
}) => {
  const handleChange = (field: string, value: any) => {
    onAddressChange({
      ...address,
      [field]: value,
    });
  };

  const updateMapLocation = (lat: string, lng: string) => {
    const iframe = document.getElementById("map-iframe") as HTMLIFrameElement;
    if (iframe && lat && lng) {
      iframe.src = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d500!2d${lng}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s${lat},${lng}!5e0!3m2!1sen!2sin!4v1709667547372!5m2!1sen!2sin`;
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude.toString();
          const lng = position.coords.longitude.toString();

          onAddressChange({
            ...address,
            location: { latitute: lat, longitude: lng },
          });

          updateMapLocation(lat, lng);
        },
        (error) => {
          console.error("Error getting location: ", error);
          toast.error("Unable to get your current location.");
        }
      );
    } else {
      toast.error("Geolocation is not supported.");
    }
  };

  const openLocationPicker = () => {
    const lat = address.location.latitute || "20.5937";
    const lng = address.location.longitude || "78.9629";
    window.open(`https://www.google.com/maps/@${lat},${lng},18z`, "_blank");
    toast.success("Select location in Maps, then manually enter coordinates.");
  };

  const inputClasses =
    "w-full h-12 px-4 rounded-lg border border-black/10 bg-white text-black placeholder:text-black/30 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black shadow-sm transition-all duration-200";

  return (
    <div className="bg-white rounded-xl p-8 shadow-lg border border-black/5 mb-8 space-y-8">
      <div className="flex items-center gap-3 border-b border-black/5 pb-6">
        <Building className="h-6 w-6 text-black/70" />
        <h2 className="text-xl font-medium text-black/80">Property Address</h2>
      </div>

      <label className="flex items-center gap-2.5 text-sm text-black/70 bg-black/5 px-4 py-3 rounded-lg w-fit">
        <input
          type="checkbox"
          checked={address.showFlatNo ?? false}
          onChange={(e) => handleChange("showFlatNo", e.target.checked)}
          className="rounded border-black/10 text-black focus:ring-black/5"
        />
        Show Flat No. in the Listing
      </label>

      <div className="grid grid-cols-3 gap-6">
        <input
          type="text"
          value={address.apartmentName}
          onChange={(e) => handleChange("apartmentName", e.target.value)}
          placeholder="Apartment Name"
          className={inputClasses}
        />
        <input
          type="number"
          value={address.flatNo || ""}
          onChange={(e) => handleChange("flatNo", parseInt(e.target.value))}
          placeholder="Flat No"
          className={inputClasses}
        />
        <input
          type="number"
          value={address.floor || ""}
          onChange={(e) => handleChange("floor", parseInt(e.target.value))}
          placeholder="Floor"
          className={inputClasses}
        />
      </div>

      <div className="grid grid-cols-3 gap-6">
        <input
          type="text"
          value={address.city}
          onChange={(e) => handleChange("city", e.target.value)}
          placeholder="City"
          className={inputClasses}
        />
        <input
          type="text"
          value={address.state}
          onChange={(e) => handleChange("state", e.target.value)}
          placeholder="State"
          className={inputClasses}
        />
        <input
          type="text"
          value={address.zipCode}
          onChange={(e) => handleChange("zipCode", e.target.value)}
          placeholder="ZIP Code"
          className={inputClasses}
        />
      </div>

      <input
        type="text"
        value={address.street}
        onChange={(e) => handleChange("street", e.target.value)}
        placeholder="Street"
        className={inputClasses}
      />

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
          src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d500!2d${address.location.longitude || '78.9629'}!3d${address.location.latitute || '20.5937'}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s${address.location.latitute},${address.location.longitude}!5e0!3m2!1sen!2sin!4v1709667547372!5m2!1sen!2sin`}
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
          value={address.location.latitute}
          onChange={(e) =>
            handleChange("location", {
              ...address.location,
              latitute: parseFloat(e.target.value),
            })
          }
          placeholder="Latitude"
          className={inputClasses}
        />
        <input
          type="number"
          value={address.location.longitude}
          onChange={(e) =>
            handleChange("location", {
              ...address.location,
              longitude: parseFloat(e.target.value),
            })
          }
          placeholder="Longitude"
          className={inputClasses}
        />
      </div>
    </div>
  );
};

export default PropertyAddress;
