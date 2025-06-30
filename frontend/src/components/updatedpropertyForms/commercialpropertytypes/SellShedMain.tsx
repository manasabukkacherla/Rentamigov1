import { useState, useRef } from "react"
import { Building2, DollarSign, Calendar, UserCircle, Image as ImageIcon, ChevronLeft, ChevronRight, Store } from "lucide-react"
import PropertyName from "../PropertyName"
import CommercialPropertyAddress from "../CommercialComponents/CommercialPropertyAddress"
import Landmark from "../CommercialComponents/Landmark"
import CornerProperty from "../CommercialComponents/CornerProperty"
import ShedDetails from "../CommercialComponents/ShedDetails"
import CommercialPropertyDetails from "../CommercialComponents/CommercialPropertyDetails"
import Price from "../sell/Price"
import PricePerSqft from "../sell/PricePerSqft"
import RegistrationCharges from "../sell/RegistrationCharges"
import Brokerage from "../residentialrent/Brokerage"
import CommercialAvailability from "../CommercialComponents/CommercialAvailability"
import CommercialContactDetails from "../CommercialComponents/CommercialContactDetails"
import CommercialMediaUpload from "../CommercialComponents/CommercialMediaUpload"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

import ShedType from "../CommercialComponents/ShedType"
import MapLocation from "../CommercialComponents/MapLocation"
// Interfaces
interface IArea {
  totalArea?: number;
  builtUpArea?: number;
  carpetArea?: number;
}

interface IFloor {
  floorNumber: number;
  totalFloors: number;
}

interface ShedDetailsType {
  totalArea: number;
  carpetArea: number;
  Height: number;
  entranceWidth: number;
  additionalDetails: string;
}

interface PropertyDetailsType {
  area: IArea;
  floorDetails: IFloor;
  facingDirection: string;
  furnishingStatus: string;
  propertyAmenities: string[];
  wholeSpaceAmenities: string[];
  propertyAge: string;
  propertyCondition: string;
  waterAvailability: string[];
  electricitySupply: {
    powerLoad: number;
    backup: boolean;
  };
}
interface Pricing {
  propertyPrice: number;
  pricetype: "fixed" | "negotiable";
}

interface Registration {
  chargestype: 'inclusive' | 'exclusive';
  registrationAmount?: number;
  stampDutyAmount?: number;
}

interface Brokerage {
  required: string;
  amount?: number;
}

interface AvailabilityType {
  type: 'immediate' | 'specific';
  date?: Date;
  preferredSaleDuration?: string;
  noticePeriod?: string;
  isPetsAllowed: boolean;
  operatingHours: boolean;
}

interface ContactDetailsType {
  name: string;
  email: string;
  phone: string;
  alternatePhone?: string;
  bestTimeToContact?: string;
}

interface FormDataType {
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
  shedDetails: Partial<ShedDetailsType>;
  propertyDetails: Partial<PropertyDetailsType>;
  pricingDetails: Pricing;
  registration: Partial<Registration>;
  brokerage: Brokerage;
  availability: AvailabilityType;
  contactDetails: ContactDetailsType;
  media: {
    photos: {
      exterior: File[];
      interior: File[];
      floorPlan: File[];
      washrooms: File[];
      lifts: File[];
      emergencyExits: File[];
    };
    videoTour: File | null;
    documents: File[];

  };
}

const SellShedMain = () => {
  const navigate = useNavigate();
  const formRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState<FormDataType>({
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
    shedDetails: {},
    propertyDetails: {},
    pricingDetails: {
      propertyPrice: 0,
      pricetype: "fixed"
    },
     registration: {
      chargestype: 'inclusive',
      registrationAmount: 0,
      stampDutyAmount: 0
    },
    brokerage: {
      required:"no",
      amount: 0
    },
    availability: {
      type: "immediate",
      isPetsAllowed: false,
      operatingHours: false
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
        emergencyExits: []
      },
      videoTour: null,
      documents: []
    }
  })

  const [currentStep, setCurrentStep] = useState(0)
  const steps = [
    {
      title: "Basic Information",
      icon: <Store className="w-5 h-5" />,
      component: (
        <div className="space-y-8">
          <PropertyName
            propertyName={formData.basicInformation.title}
            onPropertyNameChange={(name) => handleChange("basicInformation.title", name)}
          />
          <ShedType onShedTypeChange={(Type:string[]) => handleChange("basicInformation.Type", Type)} />


          <CommercialPropertyAddress 
            address={formData.basicInformation.address}
            onAddressChange={(address) => handleChange("basicInformation.address", address)} 
          />
          {/* <Landmark onLandmarkChange={(landmark) => handleChange("landmark", landmark)} /> */}
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
            onCornerPropertyChange={(isCorner) => handleChange("basicInformation.isCornerProperty", isCorner)} 
          />
        </div>
      ),
    },
    {
      title: "Property Details",
      icon: <Building2 className="w-5 h-5" />,
      component: (

        <div className="space-y-6">
          <ShedDetails onDetailsChange={(details) => handleChange("shedDetails", details)} />
          <CommercialPropertyDetails onDetailsChange={(details) => handleChange("propertyDetails", details)} />
        </div>
      ),
    },
    {
      title: "Pricing Details",
      icon: <DollarSign className="w-5 h-5" />,
      component: (
        <div className="space-y-6">
          <div className="space-y-4 text-black">
            <Price onPriceChange={(price) => handleChange("pricingDetails.propertyPrice", price.propertyPrice)} />
              
          </div>

          <div className="text-black">
            <RegistrationCharges
              onRegistrationChargesChange={(charges) => handleChange("registration", charges)}
            />
          </div>
          <div className="text-black">
          <Brokerage bro={formData.brokerage}
              onBrokerageChange={(brokerage) => setFormData(prev => ({
                ...prev,
                brokerage: {
                  required: brokerage.required as "yes" | "no",
                  amount: brokerage.amount
                }
              }))}
            />
          </div>
        </div>
      ),
    },
    {
      title: "Availability",
      icon: <Calendar className="w-5 h-5" />,
      component: (
        <div className="space-y-6">
          <CommercialAvailability onAvailabilityChange={(availability) => handleChange("availability", availability)} />
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
            onContactChange={(contact) => handleChange("contactDetails", contact)} 
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
  ]

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
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

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
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

  const handleChange = (key: string, value: any) => {
    setFormData((prev) => {
      const keys = key.split('.');
      if (keys.length === 1) {
        return { ...prev, [key]: value };
      }
      const newData = { ...prev };
      let current: any = newData;
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) current[keys[i]] = {};
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return newData;
    });
  }

  // Function to convert File to base64 string
  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const handleSubmit = async (e?: { preventDefault: () => void }) => {
    if (e) e.preventDefault();
    let author=null
    const user = sessionStorage.getItem('user');
    if (user) {
      author = JSON.parse(user).id;
    }
    console.log(formData);
    try {
      // Convert media files to base64 strings if they exist
      
      const convertedMedia = {
        photos: {
          exterior: await Promise.all((formData.media?.photos?.exterior ?? []).map(convertFileToBase64)),
          interior: await Promise.all((formData.media?.photos?.interior ?? []).map(convertFileToBase64)),
          floorPlan: await Promise.all((formData.media?.photos?.floorPlan ?? []).map(convertFileToBase64)),
          washrooms: await Promise.all((formData.media?.photos?.washrooms ?? []).map(convertFileToBase64)),
          lifts: await Promise.all((formData.media?.photos?.lifts ?? []).map(convertFileToBase64)),
          emergencyExits: await Promise.all((formData.media?.photos?.emergencyExits ?? []).map(convertFileToBase64))
        },
        videoTour: formData.media?.videoTour ? await convertFileToBase64(formData.media.videoTour) : null,
        documents: await Promise.all((formData.media?.documents ?? []).map(convertFileToBase64))
      };

      // Get userId robustly from localStorage
      
      
      // Transform data for backend
      const transformedData = {
        ...formData,
        basicInformation: {
          ...formData.basicInformation,
          location: {
            latitude: formData.basicInformation.location.latitude,
            longitude: formData.basicInformation.location.longitude
          }
        },
        media: convertedMedia,
        // Ensure availability data matches the schema
        pricingDetails:{
          propertyPrice: formData.pricingDetails.propertyPrice,
          pricetype: formData.pricingDetails.pricetype
        },
        registration: {
          chargestype: formData.registration?.chargestype || 'inclusive',
          registrationAmount: formData.registration?.registrationAmount || 0,
          stampDutyAmount: formData.registration?.stampDutyAmount || 0
        },
        brokerage: {
          required: typeof formData.brokerage?.required === 'boolean'
            ? (formData.brokerage.required ? 'yes' : 'no')
            : formData.brokerage?.required || 'no',
          amount: formData.brokerage?.amount || 0
        },
        availability: {
          type: formData.availability.type || 'immediate',
          date: formData.availability.date,
          preferredSaleDuration: formData.availability.preferredSaleDuration,
          noticePeriod: formData.availability.noticePeriod,
          isPetsAllowed: formData.availability.isPetsAllowed || false,
          operatingHours: formData.availability.operatingHours || false
        },
        // Add metadata
        //const user = sessionStorage.getItem('user');
      // if (user) {
      //   const author = JSON.parse(user).id;
        metaData: {
          createdBy: author,
          createdAt: new Date(),
          propertyType: 'Commercial',
          propertyName: 'Shed',
          intent: 'Sell',
          status: 'Available',
        }
      };


      console.log('Submitting data:', transformedData);

      // Submit to backend API
      const response = await axios.post('/api/commercial/sell/sheds', transformedData);

      if (response.status === 201) {
        toast.success("Property listed successfully!");
        // Redirect to some success page or dashboard

      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error("Failed to list property. Please try again.");
    }
  }

  return (
    <div ref={formRef} className="min-h-screen bg-white">
      {/* Progress indicator */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200">
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
          <h1 className="text-2xl sm:text-3xl font-bold text-black">Sale Commercial Shed</h1>
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
            onClick={prevStep}
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
              onClick={nextStep}
              className="flex items-center px-6 py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition-all duration-200"
            >
              Next
              <ChevronRight className="w-5 h-5 ml-2" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              className="flex items-center px-6 py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition-all duration-200"
            >
              Submit
              <ChevronRight className="w-5 h-5 ml-2" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default SellShedMain

