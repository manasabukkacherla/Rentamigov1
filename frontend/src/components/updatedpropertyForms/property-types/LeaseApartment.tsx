import React, { useState, useCallback } from "react";
import PropertyName from "../PropertyName";
import PropertyAddress from "../PropertyAddress";
import MapCoordinates from "../MapCoordinates";
import PropertySize from "../PropertySize";
import Restrictions from "../Restrictions";
import PropertyFeatures from "../PropertyFeatures";
import LeaseAmount from "../lease/LeaseAmount";
import LeaseTenure from "../lease/LeaseTenure";
import MaintenanceAmount from "../residentialrent/MaintenanceAmount";
import Brokerage from "../residentialrent/Brokerage";
import AvailabilityDate from "../AvailabilityDate";
import OtherCharges from "../residentialrent/OtherCharges";
import MediaUpload from "../MediaUpload";
import FlatAmenities from "../FlatAmenities";
import SocietyAmenities from "../SocietyAmenities";

interface LeaseApartmentProps {
  propertyId: string;
  onSubmit?: (formData: any) => void;
}

const LeaseApartment = ({ propertyId, onSubmit }: LeaseApartmentProps) => {
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
    coordinates: { latitude: "", longitude: "" },
    size: "",
    restrictions: {},
    features: {},
    leaseAmount: {},
    leaseTenure: {},
    maintenanceAmount: {},
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



  const handleNext = () => {
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
            address={formData.propertyAddress}
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
        </div>
      ),
    },
    {
      title: "Property Details",
      component: (
        <div className="space-y-6">
          <Restrictions
            onRestrictionsChange={(restrictions) =>
              setFormData((prev) => ({ ...prev, restrictions }))
            }
          />
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
      title: "Lease Terms",
      component: (
        <div className="space-y-6">
          <LeaseAmount
            onLeaseAmountChange={(amount) =>
              setFormData((prev) => ({ ...prev, leaseAmount: amount }))
            }
          />
          <LeaseTenure
            onLeaseTenureChange={(tenure) =>
              setFormData((prev) => ({ ...prev, leaseTenure: tenure }))
            }
          />
          <MaintenanceAmount
            onMaintenanceAmountChange={(amount) =>
              setFormData((prev) => ({ ...prev, maintenanceAmount: amount }))
            }
          />
          <Brokerage
            onBrokerageChange={(brokerage) =>
              setFormData((prev) => ({ ...prev, brokerage }))
            }
          />
          <OtherCharges
            onOtherChargesChange={(charges) =>
              setFormData((prev) => ({ ...prev, otherCharges: charges }))
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
        <h1 className="text-2xl font-bold mb-8 text-black">Lease Apartment</h1>
        
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

export default LeaseApartment;