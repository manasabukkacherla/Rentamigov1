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

interface SellBuilderFloorProps {
  propertyId: string; // Property ID passed as a prop
  onSubmit?: (formData: any) => void;
}

const SellBuilderFloor = ({ propertyId, onSubmit }: SellBuilderFloorProps) => {
  const [formData, setFormData] = useState({
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
    coordinates: { latitude: "", longitude: "" },
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
    media: { photos: [], video: null },
    otherCharges: {},
    flatAmenities: {},
    societyAmenities: {},
  });

  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Function to update property address details
  const handleAddressChange = useCallback((addressData: any) => {
    setFormData((prev) => ({
      ...prev,
      propertyAddress: { ...prev.propertyAddress, ...addressData },
    }));
  }, []);

  // Function to save data at each step


  const steps = [
    {
      title: "Basic Information",
      component: (
        <>
          <PropertyName
            propertyName={formData.propertyName}
            onPropertyNameChange={(name) =>
              setFormData((prev) => ({ ...prev, propertyName: name }))
            }
          />
          <PropertyAddress
            onPropertyNameChange={(name) =>
              setFormData((prev) => ({ ...prev, propertyName: name }))
            }
            onPropertyTypeSelect={(type) =>
              setFormData((prev) => ({ ...prev, propertyType: type }))
            }
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
            onAddressChange={handleAddressChange}
          />
          <MapCoordinates
            latitude={formData.coordinates.latitude}
            longitude={formData.coordinates.longitude}
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
          />
          <PropertySize
            onPropertySizeChange={(size) =>
              setFormData((prev) => ({ ...prev, size }))
            }
          />
        </>
      ),
    },
    {
      title: "Property Details",
      component: (
        <>
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
        </>
      ),
    },
    {
      title: "Pricing Details",
      component: (
        <>
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
        </>
      ),
    },
    {
      title: "Availability",
      component: (
        <AvailabilityDate
          onAvailabilityChange={(availability) =>
            setFormData((prev) => ({ ...prev, availability }))
          }
        />
      ),
    },
    {
      title: "Property Media",
      component: (
        <MediaUpload
          onMediaChange={(media) => setFormData((prev) => ({ ...prev, media }))}
        />
      ),
    },
  ];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep((prev) => prev + 1);
    } else {
      onSubmit?.(formData);
    }
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className="space-y-12">
      <h2 className="text-3xl font-bold mb-8">{steps[step].title}</h2>
      {steps[step].component}

      {/* Stepper Scroll Bar UI */}
      <div className="mt-6 flex items-center space-x-6 overflow-x-auto pb-2">
        {steps.map((stepObj, index) => (
          <div key={index} className="flex items-center">
            <button
              onClick={() => setStep(index)}
              className="flex items-center focus:outline-none"
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  index <= step ? 'bg-black text-white' : 'bg-gray-200 text-gray-600'
                }`}
              >
                {stepObj.icon ? stepObj.icon : index + 1}
              </div>
              <span className={`ml-3 text-sm font-medium whitespace-nowrap ${
                index <= step ? 'text-black' : 'text-black/70'
              }`}>
                {stepObj.title}
              </span>
            </button>
            {index < steps.length - 1 && (
              <div className={`w-16 h-1 mx-3 ${index < step ? 'bg-black' : 'bg-gray-200'}`} />
            )}
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={handleNext}
        className="px-6 py-3 rounded-lg bg-white text-black hover:bg-white/90 transition-colors duration-200"
      >
        {step < steps.length - 1 ? "Next" : "List Property"}
      </button>

    </form>
  );
};

export default SellBuilderFloor;