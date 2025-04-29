import React, { useState, useCallback, useRef } from "react";
import { Building2, MapPin, IndianRupee, Calendar, Image, Ruler, Home, ChevronLeft, ChevronRight, Locate, Navigation, Loader2 } from "lucide-react";
import PropertyName from "../PropertyName";
import IndependentPropertyAddress from "../IndependentPropertyAddress";
import MapCoordinates from "../MapCoordinates";
import PropertySize from "../PropertySize";
import Restrictions from "../Restrictions";
import IndependentPropertyFeatures from "../IndependentPropertyFeatures";
import LeaseAmount from "../lease/LeaseAmount";
import LeaseTenure from "../lease/LeaseTenure";
import MaintenanceAmount from "../residentialrent/MaintenanceAmount";
import Brokerage from "../residentialrent/Brokerage";
import AvailabilityDate from "../AvailabilityDate";
import OtherCharges from "../residentialrent/OtherCharges";
import MediaUpload from "../MediaUpload";
import FlatAmenities from "../FlatAmenities";
import SocietyAmenities from "../SocietyAmenities";
import { toast } from "react-toastify";

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
    flatNo?: number;
    floor?: number;
    houseName?: string;
    street?: string;
    address?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
    locationLabel?: string;
  };
  coordinates: {
    latitude: string;
    longitude: string;
    locationLabel: string;
  };
  size: {
    totalArea: string;
    coveredArea: string;
    plotArea: string;
  };
  restrictions: {
    nonVeg: boolean;
    pets: boolean;
    tenants: string[];
  };
  features: string[];
  leaseAmount: string;
  leaseTenure: string;
  maintenanceAmount: string;
  brokerage: string;
  availability: {
    availableFrom: string;
    noticePeriod: string;
  };
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
  otherCharges: {
    [key: string]: string;
  };
  flatAmenities: string[];
  societyAmenities: string[];
}

interface LeaseIndependentHouseProps {
  propertyId: string;
  onSubmit?: (formData: any) => void;
}

const LeaseIndependentHouse = ({
  propertyId,
  onSubmit,
}: LeaseIndependentHouseProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState<FormData>({
    propertyId: "",
    propertyName: "",
    propertyAddress: {
      flatNo: undefined,
      floor: undefined,
      houseName: "",
      address: "",
      street: "",
      city: "",
      state: "",
      zipCode: "",
      locationLabel: "",
    },
    coordinates: {
      latitude: "",
      longitude: "",
      locationLabel: "",
    },
    size: {
      totalArea: "",
      coveredArea: "",
      plotArea: "",
    },
    restrictions: {
      nonVeg: false,
      pets: false,
      tenants: [],
    },
    features: [],
    leaseAmount: "",
    leaseTenure: "",
    maintenanceAmount: "",
    brokerage: "",
    availability: {
      availableFrom: "",
      noticePeriod: "",
    },
    media: {
      exteriorViews: [],
      interiorViews: [],
      floorPlan: [],
      washrooms: [],
      lifts: [],
      emergencyExits: [],
      videoTour: null,
      legalDocuments: [],
    },
    otherCharges: {},
    flatAmenities: [],
    societyAmenities: [],
  });

  const handleSizeChange = (size: string) => {
    setFormData((prev) => ({
      ...prev,
      size: {
        totalArea: size,
        coveredArea: size,
        plotArea: size
      }
    }));
  };

  const handleFeaturesChange = (features: Record<string, any>) => {
    setFormData((prev) => ({
      ...prev,
      features: Object.keys(features).filter(key => features[key]),
    }));
  };

  const handleFlatAmenitiesChange = (amenities: Record<string, number | boolean>) => {
    setFormData((prev) => ({
      ...prev,
      flatAmenities: Object.keys(amenities).filter(key => amenities[key]),
    }));
  };

  const handleSocietyAmenitiesChange = (amenities: Record<string, boolean>) => {
    setFormData((prev) => ({
      ...prev,
      societyAmenities: Object.keys(amenities).filter(key => amenities[key]),
    }));
  };

  const handleLeaseAmountChange = (leaseAmount: Record<string, any>) => {
    setFormData((prev) => ({
      ...prev,
      leaseAmount: leaseAmount.value || leaseAmount,
    }));
  };

  const handleLeaseTenureChange = (tenure: Record<string, any>) => {
    setFormData((prev) => ({
      ...prev,
      leaseTenure: tenure.value || tenure,
    }));
  };

  const handleMaintenanceAmountChange = (maintenance: Record<string, any>) => {
    setFormData((prev) => ({
      ...prev,
      maintenanceAmount: maintenance.value || maintenance,
    }));
  };

  const handleBrokerageChange = (brokerage: Record<string, any>) => {
    setFormData((prev) => ({
      ...prev,
      brokerage: brokerage.value || brokerage,
    }));
  };

  const handleAvailabilityChange = (availability: { type: "immediate" | "specific"; date?: string }) => {
    setFormData((prev) => ({
      ...prev,
      availability: {
        availableFrom: availability.type === "immediate" ? "Immediate" : availability.date || "",
        noticePeriod: availability.type === "immediate" ? "0" : "30",
      },
    }));
  };

  const formSections = [
    {
      title: "Basic Information",
      icon: <Home className="w-6 h-6" />,
      component: (
        <div className="space-y-8">
          
              <PropertyName
                  propertyName={formData.propertyName}
                  onPropertyNameChange={(name) =>
                    setFormData((prev) => ({ ...prev, propertyName: name }))
                  }
                />

          <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
            <div className="space-y-8">
              <div className="flex items-center mb-8">
                <MapPin className="text-black mr-3" size={28} />
                <h3 className="text-2xl font-semibold text-black">Location Details</h3>
              </div>
              <div className="[&_input]:text-black [&_input]:placeholder:text-black [&_input]:bg-white [&_input]:border-black/20 [&_input]:focus:border-black [&_input]:focus:ring-black [&_label]:text-black [&_svg]:text-black [&_select]:text-black [&_select]:bg-white [&_select_option]:text-black [&_select_option]:bg-white [&_select]:border-black/20 [&_select]:focus:border-black [&_select]:focus:ring-black [&_*]:text-black [&_span]:text-black [&_button]:text-black [&_button]:bg-white [&_button]:border-black/20 [&_p]:text-black [&_h4]:text-black [&_option]:text-black [&_option]:bg-white [&_select]:placeholder:text-black [&_select]:placeholder:bg-white">
                <IndependentPropertyAddress
                  address={formData.propertyAddress}
                  onAddressChange={(address) =>
                    setFormData((prev) => ({ ...prev, propertyAddress: address }))
                  }
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
                  onPropertySizeChange={handleSizeChange}
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
                <IndependentPropertyFeatures
                  onFeaturesChange={handleFeaturesChange}
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
                <div className="space-y-12">
                  <FlatAmenities
                    onAmenitiesChange={handleFlatAmenitiesChange}
                  />
                  <SocietyAmenities
                    onAmenitiesChange={handleSocietyAmenitiesChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Lease Terms",
      icon: <IndianRupee className="w-6 h-6" />,
      component: (
        <div className="space-y-8">
          
            <div className="space-y-8">
              
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
      ),
    },
    {
      title: "Availability",
      icon: <Calendar className="w-6 h-6" />,
      component: (
        <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
          <div className="space-y-8">
            
            <div className="[&_input]:text-black [&_input]:placeholder:text-black [&_input]:bg-white [&_input]:border-black/20 [&_input]:focus:border-black [&_input]:focus:ring-black [&_label]:text-black [&_svg]:text-black [&_select]:text-black [&_select]:bg-white [&_select_option]:text-black [&_select_option]:bg-white [&_select]:border-black/20 [&_select]:focus:border-black [&_select]:focus:ring-black [&_*]:text-black [&_span]:text-black [&_button]:text-black [&_button]:bg-white [&_button]:border-black/20 [&_p]:text-black [&_h4]:text-black [&_option]:text-black [&_option]:bg-white [&_select]:placeholder:text-black [&_select]:placeholder:bg-white">
              <AvailabilityDate
                onAvailabilityChange={handleAvailabilityChange}
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Property Media",
      icon: <Image className="w-6 h-6" />,
      component: (
         <div className="space-y-8">
            
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
          
      ),
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (onSubmit) {
        await onSubmit(formData);
      }
      setSuccess("Property details submitted successfully!");
    } catch (error) {
      setError("Failed to submit property details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (currentStep < formSections.length - 1) {
      setCurrentStep(currentStep + 1);
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

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
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
    <form onSubmit={(e) => e.preventDefault()} className="max-w-5xl mx-auto px-4 py-8 space-y-12">
      <style>{customStyles}</style>
      {/* Progress indicator */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex justify-center">
            <div className="flex items-center space-x-2">
              {formSections.map((section, index) => (
                <div
                  key={index}
                  className="flex items-center cursor-pointer"
                  onClick={() => {
                    if (index < currentStep) {
                      setCurrentStep(index);
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
                >
                  <div className="flex flex-col items-center group">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${index <= currentStep
                      ? 'bg-black text-white'
                      : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                      }`}>
                      {section.icon}
                    </div>
                    <span className={`text-xs mt-1 font-medium transition-colors duration-200 ${index <= currentStep
                      ? 'text-black'
                      : 'text-gray-500 group-hover:text-gray-700'
                      }`}>
                      {section.title}
                    </span>
                  </div>
                  {index < formSections.length - 1 && (
                    <div className="flex items-center mx-1">
                      <div className={`w-12 h-1 transition-colors duration-200 ${index < currentStep ? 'bg-black' : 'bg-gray-200'
                        }`} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-black mb-2">{formSections[currentStep].title}</h2>
          <p className="text-gray-600">Please fill in the details for your independent house property</p>
        </div>
        <div className="space-y-8">{formSections[currentStep].component}</div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between">
          {currentStep > 0 ? (
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
            <div></div>
          )}

          {currentStep < formSections.length - 1 ? (
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
              {loading ? (
                <>
                  <Loader2 className="animate-spin mr-2 h-5 w-5" />
                  Submitting...
                </>
              ) : (
                <>
                  List Property
                  <ChevronRight className="w-5 h-5 ml-2" />
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default LeaseIndependentHouse;