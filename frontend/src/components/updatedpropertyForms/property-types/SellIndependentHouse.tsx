import React, { useState, useCallback } from "react";
import { Building, Calendar, Image, IndianRupee } from "lucide-react";
import PropertyName from "../PropertyName";
import IndependentPropertyAddress from "../IndependentPropertyAddress";
import MapCoordinates from "../MapCoordinates";
import PropertySize from "../PropertySize";
import IndependentPropertyFeatures from "../IndependentPropertyFeatures";
import Price from "../sell/Price";
import PricePerSqft from "../sell/PricePerSqft";
import RegistrationCharges from "../sell/RegistrationCharges";
import Brokerage from "../residentialrent/Brokerage";
import AvailabilityDate from "../AvailabilityDate";
import MediaUpload from "../MediaUpload";
import OtherCharges from "../residentialrent/OtherCharges";
import FlatAmenities from "../FlatAmenities";
import SocietyAmenities from "../SocietyAmenities";

interface MediaCategory {
  id: string;
  title: string;
  description: string;
  maxPhotos: number;
  photos: { url: string; file: File }[];
}

interface MediaState {
  categories: MediaCategory[];
  video?: { url: string; file: File } | null;
  documents?: { url: string; file: File; name: string; type: string }[];
}

interface PriceData {
  amount: string;
  type: 'fixed' | 'negotiable';
}

interface FormState {
  propertyId: string;
  propertyName: string;
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
    latitude: string;
    longitude: string;
  };
  coordinates: { latitude: string; longitude: string };
  size: string;
  features: Record<string, boolean>;
  price: PriceData;
  area: {
    superBuiltUpAreaSqft: string;
    builtUpAreaSqft: string;
    carpetAreaSqft: string;
  };
  registrationCharges: Record<string, any>;
  brokerage: Record<string, any>;
  availability: string;
  media: MediaState;
  otherCharges: Record<string, any>;
  flatAmenities: string[];
  societyAmenities: string[];
}

interface SellIndependentHouseProps {
  propertyId: string;
  onSubmit?: (formData: any) => void;
}

const SellIndependentHouse = ({ propertyId, onSubmit }: SellIndependentHouseProps) => {
  const [formData, setFormData] = useState<FormState>({
    propertyId: propertyId || localStorage.getItem("propertyId") || "",
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
      latitude: "",
      longitude: "",
    },
    coordinates: { latitude: "", longitude: "" },
    size: "",
    features: {},
    price: {
      amount: "",
      type: "fixed",
    },
    area: {
      superBuiltUpAreaSqft: "",
      builtUpAreaSqft: "",
      carpetAreaSqft: "",
    },
    registrationCharges: {},
    brokerage: {},
    availability: "",
    media: {
      categories: [],
      video: null,
      documents: [],
    },
    otherCharges: {},
    flatAmenities: [],
    societyAmenities: [],
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

  const steps = [
    {
      title: "Basic Information",
      component: (
        <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg text-black">
          <div className="space-y-8">
            <div className="flex items-center mb-8">
              <Building className="text-black mr-3" size={28} />
              <h3 className="text-2xl font-semibold text-black">Property Details</h3>
            </div>
            <div className="[&_input]:text-black [&_input]:placeholder:text-black/60 [&_input]:border-black/20 [&_input]:bg-white [&_input]:focus:border-black [&_input]:focus:ring-black [&_label]:text-black [&_svg]:text-black">
              <PropertyName 
                propertyName={formData.propertyName}
                onPropertyNameChange={(name: string) => setFormData((prev) => ({ ...prev, propertyName: name }))}
              />
            </div>
            <div className="[&_input]:text-black [&_input]:placeholder:text-black/60 [&_input]:border-black/20 [&_input]:bg-white [&_input]:focus:border-black [&_input]:focus:ring-black [&_label]:text-black [&_button]:border-black/20 [&_button]:text-black [&_button]:hover:bg-black [&_button]:hover:text-white [&_svg]:text-black">
              <IndependentPropertyAddress
                onPropertyNameChange={(name) => setFormData((prev) => ({ ...prev, propertyName: name }))}
                onPropertyTypeSelect={(type) => setFormData((prev) => ({ ...prev, propertyType: type }))}
                onLatitudeChange={(lat) => setFormData((prev) => ({ ...prev, propertyAddress: { ...prev.propertyAddress, latitude: lat } }))}
                onLongitudeChange={(lng) => setFormData((prev) => ({ ...prev, propertyAddress: { ...prev.propertyAddress, longitude: lng } }))}
                onAddressChange={handleAddressChange}
              />
            </div>
            <div className="[&_input]:text-black [&_input]:placeholder:text-black/60 [&_input]:border-black/20 [&_input]:bg-white [&_input]:focus:border-black [&_input]:focus:ring-black [&_label]:text-black [&_svg]:text-black [&_span]:text-black">
              <PropertySize
                onPropertySizeChange={(size: string) => setFormData((prev) => ({ ...prev, size }))}
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Property Details",
      component: (
        <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg text-black">
          <div className="space-y-8">
            <div className="flex items-center mb-8">
              <Building className="text-black mr-3" size={28} />
              <h3 className="text-2xl font-semibold text-black">Property Details</h3>
            </div>
            <div className="[&_select]:text-black [&_select]:bg-white [&_select_option]:text-black [&_select_option]:bg-white [&_select]:border-black/20 [&_select]:focus:border-black [&_select]:focus:ring-black [&_label]:text-black [&_input[type=number]]:text-black [&_input[type=number]]:placeholder:text-black [&_input[type=number]]:bg-white [&_input[type=number]]:border-black/20 [&_*]:text-black [&_span]:text-black [&_button]:text-black [&_button]:bg-white [&_button]:hover:bg-black [&_button]:hover:text-white [&_button]:border-black/20">
              <IndependentPropertyFeatures 
                onFeaturesChange={(features: Record<string, boolean>) => setFormData((prev) => ({ ...prev, features }))} 
              />
            </div>
            <div className="[&_select]:text-black [&_select]:bg-white [&_select_option]:text-black [&_select_option]:bg-white [&_select]:border-black/20 [&_select]:focus:border-black [&_select]:focus:ring-black [&_label]:text-black [&_*]:text-black [&_span]:text-black [&_button]:text-black [&_button]:bg-white [&_button]:hover:bg-black [&_button]:hover:text-white [&_button]:border-black/20">
              <FlatAmenities 
                onAmenitiesChange={(amenities: Record<string, number | boolean>) => 
                  setFormData((prev) => ({ 
                    ...prev, 
                    flatAmenities: Object.entries(amenities)
                      .filter(([_, value]) => value)
                      .map(([key]) => key)
                  }))
                } 
              />
            </div>
            <div className="[&_select]:text-black [&_select]:bg-white [&_select_option]:text-black [&_select_option]:bg-white [&_select]:border-black/20 [&_select]:focus:border-black [&_select]:focus:ring-black [&_label]:text-black [&_*]:text-black [&_span]:text-black [&_button]:text-black [&_button]:bg-white [&_button]:hover:bg-black [&_button]:hover:text-white [&_button]:border-black/20">
              <SocietyAmenities 
                onAmenitiesChange={(amenities: Record<string, boolean>) => 
                  setFormData((prev) => ({ 
                    ...prev, 
                    societyAmenities: Object.entries(amenities)
                      .filter(([_, value]) => value)
                      .map(([key]) => key)
                  }))
                } 
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Pricing Details",
      component: (
        <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg text-black">
          <div className="space-y-8">
            <div className="flex items-center mb-8">
              <IndianRupee className="text-black mr-3" size={28} />
              <h3 className="text-2xl font-semibold text-black">Pricing Details</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <label className="block text-black font-medium">Expected Price</label>
                <input
                  type="number"
                  placeholder="Enter expected price"
                  value={formData.price.amount}
                  onChange={(e) => setFormData((prev) => ({ ...prev, price: { ...prev.price, amount: e.target.value } }))}
                  className="w-full p-3 rounded-lg border border-black/20 focus:outline-none focus:border-black focus:ring-1 focus:ring-black bg-white text-black placeholder:text-black/60"
                />
              </div>
              <div className="space-y-4">
                <label className="block text-black font-medium">Price Negotiable</label>
                <select
                  value={formData.price.type}
                  onChange={(e) => setFormData((prev) => ({ ...prev, price: { ...prev.price, type: e.target.value as "fixed" | "negotiable" } }))}
                  className="w-full p-3 rounded-lg border border-black/20 focus:outline-none focus:border-black focus:ring-1 focus:ring-black bg-white text-black"
                >
                  <option value="negotiable">Yes</option>
                  <option value="fixed">No</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Availability",
      component: (
        <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg text-black">
          <div className="space-y-8">
            <div className="flex items-center mb-8">
              <Calendar className="text-black mr-3" size={28} />
              <h3 className="text-2xl font-semibold text-black">Availability</h3>
            </div>
            <div className="[&_input]:text-black [&_input]:placeholder:text-black/60 [&_input]:border-black/20 [&_input]:bg-white [&_input]:focus:border-black [&_input]:focus:ring-black [&_label]:text-black [&_*]:text-black [&_button]:text-black [&_button]:bg-white [&_button]:border-black/20 [&_svg]:text-black">
              <AvailabilityDate
                onAvailabilityChange={(availability) => setFormData((prev) => ({ ...prev, availability: availability.date || "" }))}
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Property Media",
      component: (
        <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg text-black">
          <div className="space-y-8">
            <div className="flex items-center mb-8">
              <Image className="text-black mr-3" size={28} />
              <h3 className="text-2xl font-semibold text-black">Property Media</h3>
            </div>
            <div className="[&_button]:border-black/20 [&_button]:text-black [&_button]:hover:bg-black [&_button]:hover:text-white [&_*]:text-black">
              <MediaUpload
                onMediaChange={(media) => setFormData((prev) => ({ ...prev, media }))}
              />
            </div>
          </div>
        </div>
      ),
    },
  ];

  const saveStepData = async () => {
    setLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    const endpoint = step === 0 ? "basicdetails" : "properties";

    try {
      const response = await fetch(`/api/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          propertyId: propertyId || formData.propertyId,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccessMessage("Step saved successfully! ✅");
        if (step === 0 && result.data?.propertyId) {
          const newPropertyId = propertyId || result.data.propertyId;
          localStorage.setItem("propertyId", newPropertyId);
          setFormData((prev) => ({ ...prev, propertyId: newPropertyId }));
        }
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
    setStep((prev) => prev + 1);
  };

  const handlePrevious = () => {
    setStep((prev) => prev - 1);
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-2xl font-bold mb-8 text-black">Sell Independent House</h1>
        
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
        <div className="bg-white rounded-lg shadow-sm p-6 text-black">
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
            className={`px-4 py-2 rounded-lg ${
              step === 0
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-gray-100 text-black hover:bg-gray-200"
            }`}
          >
            Previous
          </button>
      <button
        onClick={handleNext}
            disabled={loading || step === steps.length - 1}
            className={`px-4 py-2 rounded-lg ${
              loading || step === steps.length - 1
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-black text-white hover:bg-gray-800"
            }`}
          >
            {loading ? "Saving..." : "Next"}
      </button>
        </div>
      </div>
    </div>
  );
};

export default SellIndependentHouse;
