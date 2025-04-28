import React, { useState, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight, Home, Building2, DollarSign, Calendar, Image } from 'lucide-react';
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

// Add custom styles for inclusive/exclusive buttons
const customStyles = `
  /* Target inclusive buttons when selected */
  button.bg-blue-50.border-blue-500.text-blue-700 {
    border-color: #DBEAFE !important; /* border-blue-100 */
    background-color: #EFF6FF !important; /* bg-blue-50 */
  }
`;

interface SellBuilderFloorProps {
  propertyId: string; // Property ID passed as a prop
  onSubmit?: (formData: any) => void;
}

type MediaType = {
  photos: File[];
  video: File | null;
  exteriorViews: File[];
  interiorViews: File[];
  floorPlan: File[];
  washrooms: File[];
  lifts: File[];
  emergencyExits: File[];
  videoTour?: File;
  legalDocuments: File[];
};

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
    media: {
      photos: [] as File[],
      video: null as File | null,
      exteriorViews: [] as File[],
      interiorViews: [] as File[],
      floorPlan: [] as File[],
      washrooms: [] as File[],
      lifts: [] as File[],
      emergencyExits: [] as File[],
      videoTour: undefined as File | undefined,
      legalDocuments: [] as File[]
    } as MediaType,
    otherCharges: {},
    flatAmenities: {},
    societyAmenities: {},
  });

  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const formRef = useRef<HTMLDivElement>(null);

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
          <PricePerSqft
            propertyPrice={Number(formData.price) || 0}
            Area={{
              totalArea: Number(formData.area.superBuiltUpAreaSqft) || 0,
              builtUpArea: Number(formData.area.builtUpAreaSqft) || 0,
              carpetArea: Number(formData.area.carpetAreaSqft) || 0
            }}
          />
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
          onMediaChange={(mediaData) => {
            setFormData((prev) => ({
              ...prev,
              media: {
                ...prev.media,
                ...mediaData,
                photos: [...(mediaData.exteriorViews || []), ...(mediaData.interiorViews || [])],
                video: mediaData.videoTour || null
              }
            }));
          }}
        />
      ),
    },
  ];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep((prev) => prev + 1);
      setTimeout(() => {
        if (formRef.current) {
          window.scrollTo({
            top: formRef.current.offsetTop - 100,
            behavior: 'smooth'
          });
        } else {
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        }
      }, 100);
    } else {
      onSubmit?.(formData);
    }
  };

  const handlePrevious = () => {
    if (step > 0) {
      setStep((prev) => prev - 1);
      setTimeout(() => {
        if (formRef.current) {
          window.scrollTo({
            top: formRef.current.offsetTop - 100,
            behavior: 'smooth'
          });
        } else {
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        }
      }, 100);
    }
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className="max-w-4xl mx-auto text-black">
      <style>{customStyles}</style>
      {/* Progress indicator */}
      <div ref={formRef} className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {steps.map((s, i) => (
            <div
              key={i}
              className={`flex flex-col items-center ${i <= step ? "text-black" : "text-gray-400"}`}
              onClick={() => {
                if (i < step) {
                  setStep(i);
                  setTimeout(() => {
                    if (formRef.current) {
                      window.scrollTo({
                        top: formRef.current.offsetTop - 100,
                        behavior: 'smooth'
                      });
                    }
                  }, 100);
                }
              }}
              style={{ cursor: i < step ? "pointer" : "default" }}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${i <= step ? "bg-black text-white" : "bg-gray-200 text-gray-500"}`}
              >
                {s.title.includes("Basic") ? <Home className="w-6 h-6" /> :
                  s.title.includes("Property") ? <Building2 className="w-6 h-6" /> :
                    s.title.includes("Pricing") ? <DollarSign className="w-6 h-6" /> :
                      s.title.includes("Availability") ? <Calendar className="w-6 h-6" /> :
                        <Image className="w-6 h-6" />}
              </div>
              <span className="text-xs font-medium">{s.title}</span>
            </div>
          ))}
        </div>
        <div className="w-full bg-gray-200 h-1 rounded-full">
          <div
            className="bg-black h-1 rounded-full transition-all duration-300"
            style={{ width: `${(step / (steps.length - 1)) * 100}%` }}
          ></div>
        </div>
      </div>

      <h2 className="text-3xl font-bold mb-8 text-black">{steps[step].title}</h2>

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

     

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between">
          {step > 0 ? (
            <button
              type="button"
              className="flex items-center px-6 py-2 rounded-lg border border-black/20 bg-white text-black transition-all duration-200"
              onClick={handlePrevious}
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              Previous
            </button>
          ) : (
            <div></div> /* Empty div to maintain layout when no Previous button */
          )}

          {step < steps.length - 1 ? (
            <button
              type="button"
              className="flex items-center px-6 py-2 rounded-lg bg-black text-white transition-all duration-200"
              onClick={handleNext}
            >
              Next
              <ChevronRight className="w-5 h-5 ml-2" />
            </button>
          ) : (
            <button
              type="button"
              className="flex items-center px-6 py-2 rounded-lg bg-black text-white transition-all duration-200"
              onClick={() => onSubmit?.(formData)}
            >
              List Property
              <ChevronRight className="w-5 h-5 ml-2" />
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default SellBuilderFloor;