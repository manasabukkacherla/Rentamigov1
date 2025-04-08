import React, { useState, useCallback } from "react";
import PropertyName from "../PropertyName";
import PropertyAddress from "../PropertyAddress";
import MapCoordinates from "../MapCoordinates";
import PropertySize from "../PropertySize";
import PropertyFeatures from "../PropertyFeatures";
import Price from "../sell/Price";
import PricePerSqft from "../sell/PricePerSqft";
import RegistrationCharges from "../sell/RegistrationCharges";
import Brokerage from "../residentialrent/Brokerage";
import AvailabilityDate from "../AvailabilityDate";
import MediaUpload from "../MediaUpload";
import OtherCharges from "../residentialrent/OtherCharges";
import FlatAmenities from "../FlatAmenities";
import SocietyAmenities from "../SocietyAmenities";

interface SellApartmentProps {
  propertyId: string;
  onSubmit?: (formData: any) => void;
}

const SellApartment = ({ propertyId, onSubmit }: SellApartmentProps) => {
  const [formData, setFormData] = useState({
    propertyId,
    propertyName: "",
    propertyAddress: {
      flatNo: "",
      floor: "",
      houseName: "",
      address: "",
      pinCode: "",
      city: "",
      street: "",
      state: "",
      zipCode: "",
    },
    coordinates: { 
      latitude: "", 
      longitude: "",
      locationLabel: ""
    },
    size: "",
    features: {},
    price: "",
    area: {
      superBuiltUpAreaSqft: "",
      builtUpAreaSqft: "",
      carpetAreaSqft: "",
    },
    registrationCharges: {},
    brokerage: {},
    availability: {},
    media: {
      exteriorViews: [],
      interiorViews: [],
      floorPlan: [],
      washrooms: [],
      lifts: [],
      emergencyExits: [],
      videoTour: null,
      legalDocuments: []
    },
    otherCharges: {},
    flatAmenities: {},
    societyAmenities: {},
  });

  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleAddressChange = useCallback((addressData: any) => {
    setFormData((prev) => ({
      ...prev,
      propertyAddress: { ...prev.propertyAddress, ...addressData },
    }));
  }, []);
  
  
  const handleLocationChange = useCallback((location: { latitude: string; longitude: string, label: string }) => {
    setFormData((prev) => ({
      ...prev,
      coordinates: {
        latitude: location.latitude,
        longitude: location.longitude,
        locationLabel: location.label
      },
    }));
  }, []);

  const saveStepData = async () => {
    setLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const response = await fetch("/api/basicdetails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccessMessage("Step saved successfully! ✅");
      } else {
        setErrorMessage(`Error saving step: ${result.message}`);
      }
    } catch (error) {
      console.error("Error saving step:", error);
      setErrorMessage("Failed to save step. Check your connection.");
    }

    setLoading(false);
  };

  const handleNext = async () => {
    await saveStepData();
    if (step < steps.length - 1) {
      setStep((prev) => prev + 1);
    } else {
      onSubmit?.(formData);
    }
  };

  const handlePrevious = () => {
    if (step > 0) {
      setStep((prev) => prev - 1);
    }
  };

  const steps = [
    {
      title: "Basic Information",
      component: (
        <div className="space-y-6">
          <PropertyName
            propertyName={formData.propertyName}
            onPropertyNameChange={(name) =>
              setFormData((prev) => ({ ...prev, propertyName: name }))
            }
          />
          <PropertyAddress
            address={{
              ...formData.propertyAddress,
              coordinates: {
                lat: formData.coordinates.latitude ? Number(formData.coordinates.latitude) : 0,
                lng: formData.coordinates.longitude ? Number(formData.coordinates.longitude) : 0,
              },
              locationLabel: formData.coordinates.locationLabel
            }}
            onAddressChange={handleAddressChange}
          />
          <MapCoordinates
            latitude={formData.coordinates.latitude}
            longitude={formData.coordinates.longitude}
            locationLabel={formData.coordinates.locationLabel}
            onLatitudeChange={(lat) =>
              setFormData((prev) => ({
                ...prev,
                coordinates: { ...prev.coordinates, latitude: lat },
              }))
            }
            onLongitudeChange={(lng) =>
              setFormData((prev) => ({
                ...prev,
                coordinates: { ...prev.coordinates, longitude: lng },
              }))
            }
            onLocationChange={handleLocationChange}
          />
          <PropertySize
            onPropertySizeChange={(size) =>
              setFormData((prev) => ({ ...prev, size }))
            }
          />
        </div>
      ),
    },
    {
      title: "Property Details",
      component: (
        <div className="space-y-6">
          <PropertyFeatures
            onFeaturesChange={(features) =>
              setFormData((prev) => ({ ...prev, features }))
            }
          />
          <FlatAmenities
            onAmenitiesChange={(amenities) =>
              setFormData((prev) => ({ ...prev, flatAmenities: amenities }))
            }
          />
          <SocietyAmenities
            onAmenitiesChange={(amenities) =>
              setFormData((prev) => ({ ...prev, societyAmenities: amenities }))
            }
          />
        </div>
      ),
    },
    {
      title: "Pricing Details",
      component: (
        <div className="space-y-6">
          <Price
            onPriceChange={(price) =>
              setFormData((prev) => ({ ...prev, price: price.amount }))
            }
          />
          <PricePerSqft price={formData.price} area={formData.area} />
          <RegistrationCharges
            onRegistrationChargesChange={(charges) =>
              setFormData((prev) => ({ ...prev, registrationCharges: charges }))
            }
          />
          <OtherCharges
            onOtherChargesChange={(charges) =>
              setFormData((prev) => ({ ...prev, otherCharges: charges }))
            }
          />
          <Brokerage
            onBrokerageChange={(brokerage) =>
              setFormData((prev) => ({ ...prev, brokerage }))
            }
          />
        </div>
      ),
    },
    {
      title: "Availability",
      component: (
        <div className="space-y-6">
          <AvailabilityDate
            onAvailabilityChange={(availability) =>
              setFormData((prev) => ({ ...prev, availability }))
            }
          />
        </div>
      ),
    },
    {
      title: "Property Media",
      component: (
        <div className="space-y-6">
          <MediaUpload
            onMediaChange={(media) => setFormData((prev) => ({ ...prev, media }))}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-2xl font-bold mb-8 text-black">Sell Apartment</h1>
        
        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-8">
          {steps.map((s, index) => (
            <div key={index} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  index <= step ? "bg-black text-white" : "bg-gray-200 text-gray-600"
                }`}
              >
                {index + 1}
              </div>
              <div className="ml-2 text-sm font-medium text-black">{s.title}</div>
              {index < steps.length - 1 && (
                <div className="w-16 h-0.5 bg-gray-200 mx-2"></div>
              )}
            </div>
          ))}
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
          {steps[step].component}
        </div>

        {/* Messages */}
        {errorMessage && (
          <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-lg">
            {errorMessage}
          </div>
        )}
        {successMessage && (
          <div className="mt-4 p-4 bg-green-50 text-green-600 rounded-lg">
            {successMessage}
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <button
            onClick={handlePrevious}
            disabled={step === 0}
            className={`px-6 py-3 rounded-lg ${
              step === 0
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-gray-100 text-black hover:bg-gray-200"
            }`}
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={loading}
            className={`px-6 py-3 rounded-lg ${
              loading
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-black text-white hover:bg-gray-800"
            }`}
          >
            {loading ? "Saving..." : step < steps.length - 1 ? "Next" : "List Property"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SellApartment;
