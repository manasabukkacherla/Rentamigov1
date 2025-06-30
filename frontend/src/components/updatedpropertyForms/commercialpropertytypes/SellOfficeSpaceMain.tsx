"use client"

import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import axios from "axios"
import PropertyName from "../PropertyName"
import OfficeSpaceType from "../CommercialComponents/OfficeSpaceType"
import CommercialPropertyAddress from "../CommercialComponents/CommercialPropertyAddress"
import Landmark from "../CommercialComponents/Landmark"
import CornerProperty from "../CommercialComponents/CornerProperty"
import OfficeSpaceDetails from "../CommercialComponents/OfficeSpaceDetails"
import CommercialPropertyDetails from "../CommercialComponents/CommercialPropertyDetails"
import Price from "../sell/Price"
import RegistrationCharges from "../sell/RegistrationCharges"
import Brokerage from "../residentialrent/Brokerage"
import CommercialAvailability from "../CommercialComponents/CommercialAvailability"
import CommercialContactDetails from "../CommercialComponents/CommercialContactDetails"
import CommercialMediaUpload from "../CommercialComponents/CommercialMediaUpload"
import {
  MapPin,
  Building2,
  DollarSign,
  Calendar,
  Briefcase,
  ImageIcon,
  UserCircle,
  ChevronLeft,
  ChevronRight
} from "lucide-react"
import MapLocation from "../CommercialComponents/MapLocation"

// Define proper interface for form data
interface FormData {
  basicInformation: {
    title: string;
    Type: string[];
    address: {
      street: string;
      city: string;
    state: string;
    zipCode: string;
  };
  landmark: string;
  location: {
    latitude: string;
      longitude: string;
  };
  isCornerProperty: boolean;
}
  officeDetails: Record<string, any>;
  propertyDetails: Record<string, any>;
  pricingDetails: {
    propertyPrice: number;
    pricetype: "fixed" | "negotiable";
  };
  area: {
    totalArea: number;
    builtUpArea: number;
    carpetArea: number;
  };
  registration: {
    chargestype: 'inclusive' | 'exclusive',
    registrationAmount?: number,
    stampDutyAmount?: number
  };
  brokerage: {
    required: string;
    amount?: number;
  };
  availability: {
    type: 'immediate' | 'specific';
    date?: string;
  };
  contactDetails: {
    name: string;
    email: string;
    phone: string;
    alternatePhone?: string;
    bestTimeToContact?: string;
  };
  media: {
    photos: {
      exterior: File[];
      interior: File[];
      floorPlan: File[];
      washrooms: File[];
      lifts: File[];
      emergencyExits: File[];
      others: File[];
    };
    videoTour: File | null;
    documents: File[];
  };
}

// Helper function to convert File objects to base64 strings
const convertFileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

const SellOfficeSpaceMain = () => {
  const navigate = useNavigate();
  const formRef = useRef<HTMLDivElement>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form data with proper structure
  const [formData, setFormData] = useState<FormData>({
    basicInformation: {
    title: "",
    Type: [],
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: ""
    },
    landmark: "",
    location: { latitude: "", longitude: "" },
    isCornerProperty: false,
    },
    officeDetails: {},
    propertyDetails: {},
    pricingDetails: {
      propertyPrice: 0,
      pricetype: "fixed"
    },
    area: {
      totalArea: 0,
      builtUpArea: 0,
      carpetArea: 0
    },
    registration: {
      chargestype: "inclusive",
      registrationAmount: 0,
      stampDutyAmount: 0
    },
    brokerage: {
      required: "No"
    },
    availability: {
      type: "immediate"
    },
    contactDetails: {
      name: "",
      email: "",
      phone: "",
      alternatePhone: "",
      bestTimeToContact: ""
    },
    media: {
      photos: {
        exterior: [],
        interior: [],
        floorPlan: [],
        washrooms: [],
        lifts: [],
        emergencyExits: [],
        others: []
      },
      videoTour: null,
      documents: []
    }
  });

  const [currentStep, setCurrentStep] = useState(0);

  // Check login status on component mount
  useEffect(() => {
    const user = sessionStorage.getItem('user');
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleChange = (key: string, value: any) => {
    setFormData(prev => {
      const keys = key.split('.');
      if (keys.length > 1) {
        const newData = { ...prev };
        let current: any = newData;
        for (let i = 0; i < keys.length - 1; i++) {
          current = current[keys[i]];
        }
        current[keys[keys.length - 1]] = value;
        return newData;
      }
      return { ...prev, [key]: value };
    });
  };

  const steps = [
    {
      title: "Basic Information",
      icon: <Briefcase className="w-5 h-5" />,
      component: (
        <div className="space-y-8">
          <PropertyName
            propertyName={formData.basicInformation.title}
            onPropertyNameChange={(name) => setFormData((prev) => ({ ...prev, basicInformation: { ...prev.basicInformation, title: name } }))}
          />
          <OfficeSpaceType
            onOfficeTypeChange={(types) => {
              if (types && types.length > 0) {
                setFormData((prev) => ({ ...prev, basicInformation: { ...prev.basicInformation, Type: types } }))
              }
            }}
          />

          <CommercialPropertyAddress
            address={formData.basicInformation.address}
            onAddressChange={(address) => setFormData((prev) => ({ ...prev, basicInformation: { ...prev.basicInformation, address } }))}
          />
          {/* <Landmark
            onLandmarkChange={(landmark) => setFormData((prev) => ({ ...prev, basicInformation: { ...prev.basicInformation, landmark } }))}
            onLocationSelect={(location) => setFormData((prev) => ({
              ...prev,
              basicInformation: {
                ...prev.basicInformation,
                coordinates: {
                  latitude: location.latitude,
                  longitude: location.longitude
              }
            }))}
          /> */}
          <MapLocation
            latitude={formData.basicInformation.location.latitude.toString()}
            longitude={formData.basicInformation.location.longitude.toString()}
            landmark={formData.basicInformation.landmark}
            onLocationChange={(location) => handleChange('basicInformation.location', location)}
            onAddressChange={(address) => handleChange('basicInformation.address', address)}
            onLandmarkChange={(landmark) => handleChange('basicInformation.landmark', landmark)}
          />

          <CornerProperty
            isCornerProperty={formData.basicInformation.isCornerProperty}
            onCornerPropertyChange={(isCorner) =>
              setFormData((prev) => ({ ...prev, basicInformation: { ...prev.basicInformation, isCornerProperty: isCorner } }))
            }
          />
        </div>
      ),
    },
    {
      title: "Property Details",
      icon: <Building2 className="w-5 h-5" />,
      component: (
        <div className="space-y-6">
          <OfficeSpaceDetails
            onDetailsChange={(details) => setFormData((prev) => ({ ...prev, officeDetails: details }))}
          />
          <CommercialPropertyDetails
            onDetailsChange={(details) => {
              setFormData((prev) => {
                // Extract area data for price per sqft calculations
                const area = {
                  totalArea: Number(details.area?.totalArea || 0),
                  builtUpArea: Number(details.area?.builtUpArea || 0),
                  carpetArea: Number(details.area?.carpetArea || 0)
                };
                return {
                  ...prev,
                  propertyDetails: details,
                  area
                };
              });
            }}
          />
        </div>
      ),
    },
    {
      title: "Pricing Details",
      icon: <DollarSign className="w-5 h-5" />,
      component: (
        <div className="space-y-6">
          <div className="space-y-4 text-black">
            <Price onPriceChange={(price) =>
              setFormData((prev) => ({
                ...prev,
                pricingDetails: {
                  propertyPrice: price.propertyPrice,
                  pricetype: price.pricetype
                }
              }))
            } />

          </div>

          <div className="space-y-4 text-black">
            <div className="text-black">
              <RegistrationCharges
                onRegistrationChargesChange={(charges) =>
                  setFormData((prev) => ({
                    ...prev,
                    registration: {
                      chargestype: charges.chargestype,
                      registrationAmount: charges.registrationAmount,
                      stampDutyAmount: charges.stampDutyAmount
                    }
                  }))
                }
              />
            </div>
            <div className="text-black">
              <Brokerage
                bro={formData.brokerage}
                onBrokerageChange={(brokerage) =>
                  setFormData((prev) => ({
                    ...prev,
                    brokerage: {
                      required: brokerage.required,
                      amount: brokerage.amount
                    }
                  }))
                }
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Availability",
      icon: <Calendar className="w-5 h-5" />,
      component: (
        <div className="space-y-6">
          <CommercialAvailability
            onAvailabilityChange={(availability) => {
              setFormData((prev) => ({
                ...prev,
                availability: {
                  type: availability.type,
                  date: availability.date
                }
              }));
            }}
          />
        </div>
      ),
    },
    {
      title: "Contact Information",
      icon: <UserCircle className="w-5 h-5" />,
      component: (
        <div className="space-y-6">
          <CommercialContactDetails
            contactInformation={formData.contactDetails}
            onContactChange={(contact) => setFormData((prev) => ({
              ...prev,
              contactDetails: {
                name: contact.name,
                email: contact.email,
                phone: contact.phone,
                alternatePhone: contact.alternatePhone,
                bestTimeToContact: contact.bestTimeToContact
              }
            }))}
          />
        </div>
      ),
    },
    {
      title: "Property Media",
      icon: <ImageIcon className="w-5 h-5" />,
      component: (
        <div className="space-y-6">
          <CommercialMediaUpload
            Media={{
              photos: Object.entries(formData.media.photos).map(([category, files]) => ({
                category,
                files: files.map(file => ({ url: URL.createObjectURL(file), file }))
              })),
              videoTour: formData.media.videoTour || null,
              documents: formData.media.documents
            }}
            onMediaChange={(media) => {
              const photos: Record<string, File[]> = {};
              media.photos.forEach(({ category, files }: { category: string, files: { url: string, file: File }[] }) => {
                photos[category] = files.map(f => f.file);
              });

              setFormData(prev => ({
                ...prev,
                media: {
                  ...prev.media,
                  photos: {
                    ...prev.media.photos,
                    ...photos
                  },
                  videoTour: media.videoTour || null,
                  documents: media.documents
                }
              }));
            }}
          />
        </div>
      ),
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
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

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
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

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log("Form Data:", formData);

    try {
      setIsSubmitting(true);

      const user = sessionStorage.getItem('user');
      if (!user) {
        toast.error('You must be logged in to create a property listing');
        return;
      }

      const userData = JSON.parse(user);
      const author = userData.id;



      // Convert uploaded files to base64 strings
      const convertedMedia = {
        photos: {
          exterior: await Promise.all((formData.media?.photos?.exterior || []).map(convertFileToBase64)),
          interior: await Promise.all((formData.media?.photos?.interior || []).map(convertFileToBase64)),
          floorPlan: await Promise.all((formData.media?.photos?.floorPlan || []).map(convertFileToBase64)),
          washrooms: await Promise.all((formData.media?.photos?.washrooms || []).map(convertFileToBase64)),
          lifts: await Promise.all((formData.media?.photos?.lifts || []).map(convertFileToBase64)),
          emergencyExits: await Promise.all((formData.media?.photos?.emergencyExits || []).map(convertFileToBase64)),
          others: await Promise.all((formData.media?.photos?.others || []).map(convertFileToBase64))
        },
        videoTour: formData.media?.videoTour ? await convertFileToBase64(formData.media.videoTour) : null,
        documents: await Promise.all((formData.media?.documents || []).map(convertFileToBase64))
      };

      // Create payload for API
      const transformedData = {
        basicInformation: {
          title: formData.basicInformation.title,
          Type: formData.basicInformation.Type,
          address: formData.basicInformation.address,
          landmark: formData.basicInformation.landmark,
          location: {
            latitude: formData.basicInformation.location.latitude,
            longitude: formData.basicInformation.location.longitude
          },
          isCornerProperty: formData.basicInformation.isCornerProperty
        },
        officeDetails: formData.officeDetails,
        propertyDetails: formData.propertyDetails,
        pricingDetails:{
            propertyPrice: formData.pricingDetails.propertyPrice,
            pricetype: formData.pricingDetails.pricetype
        },
        registration: {
           chargestype: formData.registration.chargestype,
           registrationAmount: formData.registration.registrationAmount,
           stampDutyAmount: formData.registration.stampDutyAmount
        },
        brokerage: formData.brokerage,
        availability: formData.availability,
        contactInformation: formData.contactDetails,
        media: convertedMedia,
        metadata: {
          createdBy: author,
          createdAt: new Date(),
          propertyType: 'Commercial',
          propertyName: 'Office Space',
          intent: 'Sell',
          status: 'Available',
        }
      };

      // Send data to API
      const response = await axios.post('/api/commercial/sell/office-space', transformedData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.data.success) {
        toast.success('Sell office space listing created successfully!');
      } else {
        toast.error(response.data.message || 'Failed to create listing');
      }
    } catch (error: any) {
      console.error("Error submitting form:", error);
      toast.error(error.response?.data?.message || 'Failed to create property listing. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Please log in to continue</h2>
          <button
            onClick={() => navigate('/login')}
            className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Progress indicator */}
      <div ref={formRef} className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex justify-center">
            <div className="flex items-center space-x-2">
              {steps.map((s, i) => (
                <div
                  key={i}
                  className="flex items-center cursor-pointer"
                  onClick={() => setCurrentStep(i)}
                >
                  <div className="flex flex-col items-center group">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${i <= currentStep ? "bg-black text-white" : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                        }`}
                    >
                      {s.icon}
                    </div>
                    <span
                      className={`text-xs mt-1 font-medium transition-colors duration-200 ${i <= currentStep ? "text-black" : "text-gray-500 group-hover:text-gray-700"
                        }`}
                    >
                      {s.title}
                    </span>
                  </div>
                  {i < steps.length - 1 && (
                    <div className="flex items-center mx-1">
                      <div
                        className={`w-12 h-1 transition-colors duration-200 ${i < currentStep ? "bg-black" : "bg-gray-200"
                          }`}
                      ></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-black">Sale Office Space</h1>
        </div>
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-black mb-2">{steps[currentStep].title}</h2>
          <p className="text-gray-600">Please fill in the details for your property</p>
        </div>

        {steps[currentStep].component}
      </div>

      {/* Navigation Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between">
          <button
            type="button"
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className={`flex items-center px-6 py-2 rounded-lg border border-black/20 transition-all duration-200 ${currentStep === 0
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-white text-black hover:bg-black hover:text-white"
              }`}
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Previous
          </button>
          {currentStep < steps.length - 1 ? (
            <button
              type="button"
              onClick={handleNext}
              className="flex items-center px-6 py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition-all duration-200"
            >
              Next
              <ChevronRight className="w-5 h-5 ml-2" />
            </button>
          ) : (
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex items-center px-6 py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition-all duration-200"
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
              <ChevronRight className="w-5 h-5 ml-2" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SellOfficeSpaceMain;

