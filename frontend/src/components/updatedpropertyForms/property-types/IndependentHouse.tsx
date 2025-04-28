import React, { useState, useCallback } from "react";
import { Building2, MapPin, IndianRupee, Calendar, Image, Ruler, Home } from "lucide-react";
import PropertyName from "../PropertyName";
import IndependentPropertyAddress from "../IndependentPropertyAddress";
import MapCoordinates from "../MapCoordinates";
import PropertySize from "../PropertySize";
import IndependentPropertyFeatures from "../IndependentPropertyFeatures";
import Rent from "../residentialrent/Rent";
import Restrictions from "../Restrictions";
import SecurityDeposit from "../residentialrent/SecurityDeposit";
import MaintenanceAmount from "../residentialrent/MaintenanceAmount";
import Brokerage from "../residentialrent/Brokerage";
import AvailabilityDate from "../AvailabilityDate";
import OtherCharges from "../residentialrent/OtherCharges";
import MediaUpload from "../MediaUpload";
import FlatAmenities from "../FlatAmenities";
import SocietyAmenities from "../SocietyAmenities";

interface IndependentHouseProps {
  propertyId: string;
  onSubmit?: (formData: any) => void;
}

const IndependentHouse = ({ propertyId, onSubmit }: IndependentHouseProps) => {
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
    rent: {
      expectedRent: "",
      isNegotiable: false,
      rentType: "",
    },
    securityDeposit: {},
    maintenanceAmount: {},
    brokerage: {},
    availability: {},
    otherCharges: {},
    media: { photos: [], video: null },
    flatAmenities: {},
    societyAmenities: {},
    restrictions: {
      foodPreference: "",
      petsAllowed: "",
      tenantType: "",
    },
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleAddressChange = useCallback((addressData: any) => {
    setFormData((prev) => ({
      ...prev,
      propertyAddress: { ...prev.propertyAddress, ...addressData },
    }));
  }, []);

  const steps = [
    {
      title: "Basic Info",
      icon: <Building2 className="w-6 h-6" />,
      step: 1
    },
    {
      title: "Size",
      icon: <Ruler className="w-6 h-6" />,
      step: 2
    },
    {
      title: "Features",
      icon: <Home className="w-6 h-6" />,
      step: 3
    },
    {
      title: "Amenities",
      icon: <Building2 className="w-6 h-6" />,
      step: 4
    },
    {
      title: "Rental Terms",
      icon: <IndianRupee className="w-6 h-6" />,
      step: 5
    },
    {
      title: "Media",
      icon: <Image className="w-6 h-6" />,
      step: 6
    },
    {
      title: "Availability",
      icon: <Calendar className="w-6 h-6" />,
      step: 7
    }
  ];

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg text-black">
            <div className="space-y-8">
              <div className="flex items-center mb-8">
                <Building2 className="text-black mr-3" size={28} />
                <h3 className="text-2xl font-semibold text-black">Property Details</h3>
              </div>
              <div className="[&_input]:text-black [&_input]:placeholder:text-black/60 [&_input]:border-black/20 [&_input]:bg-white [&_input]:focus:border-black [&_input]:focus:ring-black [&_label]:text-black [&_svg]:text-black">
                <PropertyName
                  propertyName={formData.propertyName}
                  onPropertyNameChange={(name) => setFormData(prev => ({ ...prev, propertyName: name }))}
                />
              </div>
              <div className="[&_input]:text-black [&_input]:placeholder:text-black/60 [&_input]:border-black/20 [&_input]:bg-white [&_input]:focus:border-black [&_input]:focus:ring-black [&_label]:text-black [&_button]:border-black/20 [&_button]:text-black [&_button]:hover:bg-black [&_button]:hover:text-white [&_svg]:text-black">
                <IndependentPropertyAddress
                  onPropertyNameChange={(name) => setFormData(prev => ({ ...prev, propertyName: name }))}
                  onPropertyTypeSelect={(type) => setFormData(prev => ({ ...prev, propertyType: type }))}
                  onLatitudeChange={(lat) => setFormData(prev => ({ ...prev, coordinates: { ...prev.coordinates, latitude: lat } }))}
                  onLongitudeChange={(lng) => setFormData(prev => ({ ...prev, coordinates: { ...prev.coordinates, longitude: lng } }))}
                  onAddressChange={handleAddressChange}
                />
                <MapCoordinates
                  latitude={formData.coordinates.latitude}
                  longitude={formData.coordinates.longitude}
                  onLatitudeChange={(lat) => setFormData(prev => ({ ...prev, coordinates: { ...prev.coordinates, latitude: lat } }))}
                  onLongitudeChange={(lng) => setFormData(prev => ({ ...prev, coordinates: { ...prev.coordinates, longitude: lng } }))}
                />
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg text-black">
            <div className="space-y-8">
              
              
              <div className="[&_input]:text-black [&_input]:placeholder:text-black/60 [&_input]:border-black/20 [&_input]:bg-white [&_input]:focus:border-black [&_input]:focus:ring-black [&_label]:text-black [&_svg]:text-black">
                <Restrictions
                  restrictions={formData.features.restrictions}
                  onChange={(restrictions) => setFormData(prev => ({ ...prev, features: { ...prev.features, restrictions } }))}
                />
              </div>
              {/* <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg text-black">
             */}
              <div className="[&_select]:text-black [&_select]:bg-white [&_select_option]:text-black [&_select_option]:bg-white [&_select]:border-black/20 [&_select]:focus:border-black [&_select]:focus:ring-black [&_label]:text-black [&_input[type=number]]:text-black [&_input[type=number]]:placeholder:text-black [&_input[type=number]]:bg-white [&_input[type=number]]:border-black/20 [&_*]:text-black [&_span]:text-black [&_button]:text-black [&_button]:bg-white [&_button]:hover:bg-black [&_button]:hover:text-white [&_button]:border-black/20">
                
              <div className="space-y-8">
              <div className="flex items-center mb-8">
                <Home className="text-black mr-3" size={28} />
                <h3 className="text-2xl font-semibold text-black">Property Features</h3>
              </div>
              <div className="[&_select]:text-black [&_select]:bg-white [&_select_option]:text-black [&_select_option]:bg-white [&_select]:border-black/20 [&_select]:focus:border-black [&_select]:focus:ring-black [&_label]:text-black [&_input[type=number]]:text-black [&_input[type=number]]:placeholder:text-black [&_input[type=number]]:bg-white [&_input[type=number]]:border-black/20 [&_*]:text-black [&_span]:text-black [&_button]:text-black [&_button]:bg-white [&_button]:hover:bg-black [&_button]:hover:text-white [&_button]:border-black/20">
              {/* <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg text-black">
            <div className="space-y-8"> */}
              <div className="flex items-center mb-8">
                <Ruler className="text-black mr-3" size={28} />
                <h3 className="text-2xl font-semibold text-black">Property Size</h3>
              </div>
              <div className="[&_input]:text-black [&_input]:placeholder:text-black/60 [&_input]:border-black/20 [&_input]:bg-white [&_input]:focus:border-black [&_input]:focus:ring-black [&_label]:text-black [&_svg]:text-black">
                <PropertySize
                  onPropertySizeChange={(size) => setFormData(prev => ({ ...prev, size }))}
                />
              </div>
            </div>
          </div>
                
                <IndependentPropertyFeatures
                  onFeaturesChange={(features) => setFormData(prev => ({ ...prev, features }))}
                />
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg text-black">
            <div className="space-y-8">
              <div className="flex items-center mb-8">
                <Building2 className="text-black mr-3" size={28} />
                <h3 className="text-2xl font-semibold text-black">Amenities</h3>
              </div>
              <div className="[&_select]:text-black [&_select]:bg-white [&_select_option]:text-black [&_select_option]:bg-white [&_select]:border-black/20 [&_select]:focus:border-black [&_select]:focus:ring-black [&_label]:text-black [&_*]:text-black [&_span]:text-black [&_button]:text-black [&_button]:bg-white [&_button]:hover:bg-black [&_button]:hover:text-white [&_button]:border-black/20">
                <FlatAmenities
                  onAmenitiesChange={(amenities) => setFormData(prev => ({ ...prev, flatAmenities: amenities }))}
                />
                <SocietyAmenities
                  onAmenitiesChange={(amenities) => setFormData(prev => ({ ...prev, societyAmenities: amenities }))}
                />
              </div>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg text-black">
            <div className="space-y-8">
              <div className="flex items-center mb-8">
                <IndianRupee className="text-black mr-3" size={28} />
                <h3 className="text-2xl font-semibold text-black">Rental Terms</h3>
              </div>
              <div className="[&_input]:text-black [&_input]:placeholder:text-black/60 [&_input]:border-black/20 [&_input]:bg-white [&_input]:focus:border-black [&_input]:focus:ring-black [&_label]:text-black [&_svg]:text-black">
                <Rent
                  onRentChange={(rent) => setFormData(prev => ({ ...prev, rent }))}
                />
                {formData.rent.rentType === "exclusive" && (
                  <MaintenanceAmount
                    onMaintenanceAmountChange={(maintenance) => setFormData(prev => ({ ...prev, maintenanceAmount: maintenance }))}
                  />
                )}
                <SecurityDeposit
                  onSecurityDepositChange={(deposit) => setFormData(prev => ({ ...prev, securityDeposit: deposit }))}
                />
                <OtherCharges
                  onOtherChargesChange={(charges) => setFormData(prev => ({ ...prev, otherCharges: charges }))}
                />
                <Brokerage
                  onBrokerageChange={(brokerage) => setFormData(prev => ({ ...prev, brokerage }))}
                />
              </div>
            </div>
          </div>
        );
      case 6:
        return (
          <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg text-black">
            <div className="space-y-8">
              <div className="flex items-center mb-8">
                <Image className="text-black mr-3" size={28} />
                <h3 className="text-2xl font-semibold text-black">Media Upload</h3>
              </div>
              <div className="[&_input]:text-black [&_input]:placeholder:text-black/60 [&_input]:border-black/20 [&_input]:bg-white [&_input]:focus:border-black [&_input]:focus:ring-black [&_label]:text-black [&_svg]:text-black">
                <MediaUpload
                  onMediaChange={(media) => setFormData(prev => ({ ...prev, media }))}
                />
              </div>
            </div>
          </div>
        );
      case 7:
        return (
          <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg text-black">
            <div className="space-y-8">
              <div className="flex items-center mb-8">
                <Calendar className="text-black mr-3" size={28} />
                <h3 className="text-2xl font-semibold text-black">Availability & Restrictions</h3>
              </div>
              <div className="[&_input]:text-black [&_input]:placeholder:text-black/60 [&_input]:border-black/20 [&_input]:bg-white [&_input]:focus:border-black [&_input]:focus:ring-black [&_label]:text-black [&_svg]:text-black">
                <AvailabilityDate
                  onAvailabilityChange={(availability) => setFormData(prev => ({ ...prev, availability }))}
                />
                <Restrictions
                  onRestrictionsChange={(restrictions) => setFormData(prev => ({ ...prev, restrictions }))}
                />
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto p-8">
        <div className="flex items-center gap-2 mb-8">
          <Building2 className="h-8 w-8 text-black" />
          <h1 className="text-3xl font-bold text-black">List Your Independent House</h1>
        </div>

        {/* Stepper Scroll Bar UI */}
        <div className="mt-6 flex items-center space-x-6 overflow-x-auto pb-2">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center">
              <button
                onClick={() => setCurrentStep(step.step)}
                className="flex items-center focus:outline-none"
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    step.step <= currentStep ? 'bg-black text-white' : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {step.icon}
                </div>
                <span className={`ml-3 text-sm font-medium whitespace-nowrap ${
                  step.step <= currentStep ? 'text-black' : 'text-black/70'
                }`}>
                  {step.title}
                </span>
              </button>
              {index < steps.length - 1 && (
                <div className={`w-16 h-1 mx-3 ${index < currentStep ? 'bg-black' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg  mb-15">
          {renderStep()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-end mt-8">
          <button
            onClick={() => {
              if (currentStep === 7) {
                onSubmit?.(formData);
              } else {
                setCurrentStep((prev) => Math.min(prev + 1, 7));
              }
            }}
            disabled={loading}
            className="px-6 py-3 bg-black text-white rounded-lg hover:bg-black/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Saving..." : currentStep === 7 ? "Submit" : "Next"}
          </button>
        </div>

        {/* Messages */}
        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
            {error}
          </div>
        )}
        {success && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-600">
            {success}
          </div>
        )}
      </div>
    </div>
  );
};

export default IndependentHouse;