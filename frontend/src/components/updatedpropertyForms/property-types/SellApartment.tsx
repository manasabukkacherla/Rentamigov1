import React, { useState, useCallback, useRef } from "react";
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
import { MapPin, Building2, DollarSign, Calendar, Image, Home, ImageIcon, ChevronLeft, ChevronRight } from 'lucide-react';

// Add custom styles for inclusive/exclusive buttons
const customStyles = `
  /* Target inclusive buttons when selected */
  button.bg-blue-50.border-blue-500.text-blue-700 {
    border-color: #DBEAFE !important; /* border-blue-100 */
    background-color: #EFF6FF !important; /* bg-blue-50 */
  }
`;

interface FormData {
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
  };
  coordinates: {
    latitude: string;
    longitude: string;
    locationLabel: string;
  };
  size: string;
  features: Record<string, any>;
  price: string;
  area: {
    superBuiltUpAreaSqft: string;
    builtUpAreaSqft: string;
    carpetAreaSqft: string;
  };
  registrationCharges: Record<string, any>;
  brokerage: Record<string, any>;
  availability: Record<string, any>;
  media: {
    exteriorViews: File[];
    interiorViews: File[];
    floorPlan: File[];
    washrooms: File[];
    lifts: File[];
    emergencyExits: File[];
    videoTour: File | null;
    legalDocuments: File[];
  };
  otherCharges: Record<string, any>;
  flatAmenities: Record<string, any>;
  societyAmenities: Record<string, any>;
}

interface SellApartmentProps {
  propertyId: string;
  onSubmit?: (formData: FormData) => void;
}

const SellApartment = ({ propertyId, onSubmit }: SellApartmentProps) => {
  const [formData, setFormData] = useState<FormData>({
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
  const formRef = useRef<HTMLDivElement>(null);

  const handleAddressChange = useCallback((addressData: Partial<FormData['propertyAddress']>) => {
    setFormData((prev) => ({
      ...prev,
      propertyAddress: { ...prev.propertyAddress, ...addressData },
    }));
  }, []);

  const handleLocationChange = useCallback((location: { latitude: string; longitude: string; label: string }) => {
    setFormData((prev) => ({
      ...prev,
      coordinates: {
        latitude: location.latitude,
        longitude: location.longitude,
        locationLabel: location.label
      },
    }));
  }, []);


  const handleNext = async () => {
    if (step < steps.length - 1) {
      setStep((prev) => prev + 1);
      // Scroll to top of the form
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
      // Scroll to top of the form
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

  const steps = [
    {
      title: "Basic Information",
      icon: <Home className="w-6 h-6" />,
      component: (
        <div className="space-y-8">
          <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
            <div className="space-y-8">
              <div className="flex items-center mb-8">
                <Home className="text-black mr-3" size={28} />
                <h3 className="text-2xl font-semibold text-black">Basic Details</h3>
              </div>
              <div className="[&_input]:text-black [&_input]:placeholder:text-black [&_input]:bg-white [&_input]:border-black/20 [&_input]:focus:border-black [&_input]:focus:ring-black [&_label]:text-black [&_svg]:text-black [&_select]:text-black [&_select]:bg-white [&_select_option]:text-black [&_select_option]:bg-white [&_select]:border-black/20 [&_select]:focus:border-black [&_select]:focus:ring-black [&_*]:text-black [&_span]:text-black [&_button]:text-black [&_button]:bg-white [&_button]:border-black/20 [&_p]:text-black [&_h4]:text-black [&_option]:text-black [&_option]:bg-white [&_select]:placeholder:text-black [&_select]:placeholder:bg-white">
                <PropertyName
                  propertyName={formData.propertyName}
                  onPropertyNameChange={(name) =>
                    setFormData((prev) => ({ ...prev, propertyName: name }))
                  }
                />
              </div>
            </div>
          </div>

          <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
            <div className="space-y-8">
              <div className="flex items-center mb-8">
                <MapPin className="text-black mr-3" size={28} />
                <h3 className="text-2xl font-semibold text-black">Location Details</h3>
              </div>
              <div className="[&_input]:text-black [&_input]:placeholder:text-black [&_input]:bg-white [&_input]:border-black/20 [&_input]:focus:border-black [&_input]:focus:ring-black [&_label]:text-black [&_svg]:text-black [&_select]:text-black [&_select]:bg-white [&_select_option]:text-black [&_select_option]:bg-white [&_select]:border-black/20 [&_select]:focus:border-black [&_select]:focus:ring-black [&_*]:text-black [&_span]:text-black [&_button]:text-black [&_button]:bg-white [&_button]:border-black/20 [&_p]:text-black [&_h4]:text-black [&_option]:text-black [&_option]:bg-white [&_select]:placeholder:text-black [&_select]:placeholder:bg-white">
                <PropertyAddress
                  address={formData.propertyAddress}
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
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Property Details",
      icon: <Building2 className="w-6 h-6" />,
      component: (
        <div className="space-y-8">
          <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
            <div className="space-y-8">
              <div className="flex items-center mb-8">
                <Building2 className="text-black mr-3" size={28} />
                <h3 className="text-2xl font-semibold text-black">Property Size</h3>
              </div>
              <div className="[&_input]:text-black [&_input]:placeholder:text-black [&_input]:bg-white [&_input]:border-black/20 [&_input]:focus:border-black [&_input]:focus:ring-black [&_label]:text-black [&_svg]:text-black [&_select]:text-black [&_select]:bg-white [&_select_option]:text-black [&_select_option]:bg-white [&_select]:border-black/20 [&_select]:focus:border-black [&_select]:focus:ring-black [&_*]:text-black [&_span]:text-black [&_button]:text-black [&_button]:bg-white [&_button]:border-black/20 [&_p]:text-black [&_h4]:text-black [&_option]:text-black [&_option]:bg-white [&_select]:placeholder:text-black [&_select]:placeholder:bg-white">
                <PropertySize
                  onPropertySizeChange={(size) =>
                    setFormData((prev) => ({ ...prev, size }))
                  }
                />
              </div>
            </div>
          </div>

          <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
            <div className="space-y-8">
              <div className="flex items-center mb-8">
                <Building2 className="text-black mr-3" size={28} />
                <h3 className="text-2xl font-semibold text-black">Property Features</h3>
              </div>
              <div className="[&_input]:text-black [&_input]:placeholder:text-black [&_input]:bg-white [&_input]:border-black/20 [&_input]:focus:border-black [&_input]:focus:ring-black [&_label]:text-black [&_svg]:text-black [&_select]:text-black [&_select]:bg-white [&_select_option]:text-black [&_select_option]:bg-white [&_select]:border-black/20 [&_select]:focus:border-black [&_select]:focus:ring-black [&_*]:text-black [&_span]:text-black [&_button]:text-black [&_button]:bg-white [&_button]:border-black/20 [&_p]:text-black [&_h4]:text-black [&_option]:text-black [&_option]:bg-white [&_select]:placeholder:text-black [&_select]:placeholder:bg-white">
                <PropertyFeatures
                  onFeaturesChange={(features) =>
                    setFormData((prev) => ({ ...prev, features }))
                  }
                />
              </div>
            </div>
          </div>

          <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
            <div className="space-y-8">
              <div className="flex items-center mb-8">
                <Building2 className="text-black mr-3" size={28} />
                <h3 className="text-2xl font-semibold text-black">Amenities</h3>
              </div>
              <div className="[&_input]:text-black [&_input]:placeholder:text-black [&_input]:bg-white [&_input]:border-black/20 [&_input]:focus:border-black [&_input]:focus:ring-black [&_label]:text-black [&_svg]:text-black [&_select]:text-black [&_select]:bg-white [&_select_option]:text-black [&_select_option]:bg-white [&_select]:border-black/20 [&_select]:focus:border-black [&_select]:focus:ring-black [&_*]:text-black [&_span]:text-black [&_button]:text-black [&_button]:bg-white [&_button]:border-black/20 [&_p]:text-black [&_h4]:text-black [&_option]:text-black [&_option]:bg-white [&_select]:placeholder:text-black [&_select]:placeholder:bg-white">
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
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Pricing Details",
      icon: <DollarSign className="w-6 h-6" />,
      component: (
        <div className="space-y-8">
          <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
            <div className="space-y-8">
              <div className="flex items-center mb-8">
                <DollarSign className="text-black mr-3" size={28} />
                <h3 className="text-2xl font-semibold text-black">Price Details</h3>
              </div>
              <div className="[&_input]:text-black [&_input]:placeholder:text-black [&_input]:bg-white [&_input]:border-black/20 [&_input]:focus:border-black [&_input]:focus:ring-black [&_label]:text-black [&_svg]:text-black [&_select]:text-black [&_select]:bg-white [&_select_option]:text-black [&_select_option]:bg-white [&_select]:border-black/20 [&_select]:focus:border-black [&_select]:focus:ring-black [&_*]:text-black [&_span]:text-black [&_button]:text-black [&_button]:bg-white [&_button]:border-black/20 [&_p]:text-black [&_h4]:text-black [&_option]:text-black [&_option]:bg-white [&_select]:placeholder:text-black [&_select]:placeholder:bg-white">
                <Price
                  onPriceChange={(price) =>
                    setFormData((prev) => ({ ...prev, price: price.amount }))
                  }
                />
                <PricePerSqft
                  propertyPrice={parseFloat(formData.price) || 0}
                  Area={{
                    totalArea: parseFloat(formData.area.superBuiltUpAreaSqft) || 0,
                    builtUpArea: parseFloat(formData.area.builtUpAreaSqft) || 0,
                    carpetArea: parseFloat(formData.area.carpetAreaSqft) || 0
                  }}
                />
              </div>
            </div>
          </div>

          <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
            <div className="space-y-8">
              <div className="flex items-center mb-8">
                <DollarSign className="text-black mr-3" size={28} />
                <h3 className="text-2xl font-semibold text-black">Additional Charges</h3>
              </div>
              <div className="[&_input]:text-black [&_input]:placeholder:text-black [&_input]:bg-white [&_input]:border-black/20 [&_input]:focus:border-black [&_input]:focus:ring-black [&_label]:text-black [&_svg]:text-black [&_select]:text-black [&_select]:bg-white [&_select_option]:text-black [&_select_option]:bg-white [&_select]:border-black/20 [&_select]:focus:border-black [&_select]:focus:ring-black [&_*]:text-black [&_span]:text-black [&_button]:text-black [&_button]:bg-white [&_button]:border-black/20 [&_p]:text-black [&_h4]:text-black [&_option]:text-black [&_option]:bg-white [&_select]:placeholder:text-black [&_select]:placeholder:bg-white">
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
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Availability",
      icon: <Calendar className="w-6 h-6" />,
      component: (
        <>
          <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
            <div className="space-y-8">
              <div className="flex items-center mb-8">
                <Calendar className="text-black mr-3" size={28} />
                <h3 className="text-2xl font-semibold text-black">Availability</h3>
              </div>
              <div className="[&_input]:text-black [&_input]:placeholder:text-black [&_input]:bg-white [&_input]:border-black/20 [&_input]:focus:border-black [&_input]:focus:ring-black [&_label]:text-black [&_svg]:text-black [&_select]:text-black [&_select]:bg-white [&_select_option]:text-black [&_select_option]:bg-white [&_select]:border-black/20 [&_select]:focus:border-black [&_select]:focus:ring-black [&_*]:text-black [&_span]:text-black [&_button]:text-black [&_button]:bg-white [&_button]:border-black/20 [&_p]:text-black [&_h4]:text-black [&_option]:text-black [&_option]:bg-white [&_select]:placeholder:text-black [&_select]:placeholder:bg-white">
                <AvailabilityDate
                  onAvailabilityChange={(availability) =>
                    setFormData((prev) => ({ ...prev, availability }))
                  }
                />
              </div>
            </div>
          </div>
        </>
      ),
    },
    {
      title: "Property Media",
      icon: <Image className="w-6 h-6" />,
      component: (
        <>
          <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
            <div className="space-y-8">
              <div className="flex items-center mb-8">
                <ImageIcon className="text-black mr-3" size={28} />
                <h3 className="text-2xl font-semibold text-black">Property Media</h3>
              </div>
              <div className="[&_input]:text-black [&_input]:placeholder:text-black [&_input]:bg-white [&_input]:border-black/20 [&_input]:focus:border-black [&_input]:focus:ring-black [&_label]:text-black [&_svg]:text-black [&_select]:text-black [&_select]:bg-white [&_select_option]:text-black [&_select_option]:bg-white [&_select]:border-black/20 [&_select]:focus:border-black [&_select]:focus:ring-black [&_*]:text-black [&_span]:text-black [&_button]:text-black [&_button]:bg-white [&_button]:border-black/20 [&_p]:text-black [&_h4]:text-black [&_option]:text-black [&_option]:bg-white [&_select]:placeholder:text-black [&_select]:placeholder:bg-white">
                <MediaUpload
                  onMediaChange={(media) => setFormData((prev) => ({
                    ...prev,
                    media: {
                      ...media,
                      videoTour: media.videoTour || null
                    }
                  }))}
                />
              </div>
            </div>
          </div>
        </>
      ),
    },
  ];

  return (
    <form onSubmit={(e) => e.preventDefault()} className="max-w-5xl mx-auto px-4 py-8 space-y-12">
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
                className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  index <= step ? 'bg-black text-white' : 'bg-gray-200 text-gray-600'
                }`}
              >
                {stepObj.icon ? stepObj.icon : index + 1}
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

      <div className="space-y-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-black mb-2">{steps[step].title}</h2>
          <p className="text-gray-600">Please fill in the details for your apartment property</p>
        </div>
        <div className="space-y-8">{steps[step].component}</div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between">
          {step > 0 ? (
            <button
              type="button"
              className="flex items-center px-6 py-2 rounded-lg border border-black/20 bg-white text-black transition-all duration-200"
              onClick={handlePrevious}
              disabled={loading}
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

export default SellApartment;