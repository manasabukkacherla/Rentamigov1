import { useState } from "react"
import { Store, Building2, DollarSign, Calendar, UserCircle, Image as ImageIcon, ChevronLeft, ChevronRight } from "lucide-react"
import PropertyName from "../PropertyName"
import ShedType from "../CommercialComponents/ShedType"
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
  propertyAge: number;
  propertyCondition: string;
  waterAvailability: string[];
  electricitySupply: {
    powerLoad: number;
    backup: boolean;
  };
}

interface RegistrationChargesType {
  included: boolean;
  amount?: number;
  stampDuty?: number;
}

interface BrokerageType {
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

interface MediaType {
  photos: (string | File)[];
  video?: string | File;
}

interface FormDataType {
  propertyName: string;
  shedType: string;
  address: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
  };
  landmark: string;
  coordinates: {
    latitude: string;
    longitude: string;
  };
  isCornerProperty: boolean;
  shedDetails: Partial<ShedDetailsType>;
  propertyDetails: Partial<PropertyDetailsType>;
  price: string | number;
  registrationCharges: Partial<RegistrationChargesType>;
  brokerage: Partial<BrokerageType>;
  availability: Partial<AvailabilityType>;
  contactDetails: Partial<ContactDetailsType>;
  media: {
    photos: (string | File)[];
    video?: string | File;
  };
}

const SellShedMain = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormDataType>({
    propertyName: "",
    shedType: "",
    address: {},
    landmark: "",
    coordinates: { latitude: "", longitude: "" },
    isCornerProperty: false,
    shedDetails: {},
    propertyDetails: {},
    price: "",
    registrationCharges: {},
    brokerage: {},
    availability: {},
    contactDetails: {},
    media: { photos: [] },
  })

  const [currentStep, setCurrentStep] = useState(0)
  const steps = [
    {
      title: "Basic Information",
      icon: <Store className="w-5 h-5" />,
      component: (
        <div className="space-y-8">
          <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <Store className="text-black w-6 h-6" />
              <h3 className="text-xl font-semibold text-black">Basic Details</h3>
            </div>
            <div className="space-y-6">
              <PropertyName
                propertyName={formData.propertyName}
                onPropertyNameChange={(name) => handleChange("propertyName", name)}
              />
              <ShedType onShedTypeChange={(type) => handleChange("shedType", type)} />
            </div>
          </div>

          <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <Store className="text-black w-6 h-6" />
              <h3 className="text-xl font-semibold text-black">Location Details</h3>
            </div>
            <div className="space-y-6">
              <CommercialPropertyAddress onAddressChange={(address) => handleChange("address", address)} />
              <Landmark onLandmarkChange={(landmark) => handleChange("landmark", landmark)} />
              
              <CornerProperty onCornerPropertyChange={(isCorner) => handleChange("isCornerProperty", isCorner)} />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Property Details",
      icon: <Building2 className="w-5 h-5" />,
      component: (
        <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <Building2 className="text-black w-6 h-6" />
            <h3 className="text-xl font-semibold text-black">Property Details</h3>
          </div>
          <div className="space-y-6">
            <ShedDetails onDetailsChange={(details) => handleChange("shedDetails", details)} />
            <CommercialPropertyDetails onDetailsChange={(details) => handleChange("propertyDetails", details)} />
          </div>
        </div>
      ),
    },
    {
      title: "Pricing Details",
      icon: <DollarSign className="w-5 h-5" />,
      component: (
        <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <DollarSign className="text-black w-6 h-6" />
            <h3 className="text-xl font-semibold text-black">Pricing Details</h3>
          </div>
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h4 className="text-lg font-medium text-black mb-4">Price Information</h4>
              <div className="space-y-4 text-black">
                <Price onPriceChange={(price) => handleChange("price", price.amount)} />
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h4 className="text-lg font-medium text-black mb-4">Additional Charges</h4>
              <div className="space-y-4 text-black">
                <div className="text-black">
                  <RegistrationCharges
                    onRegistrationChargesChange={(charges) => handleChange("registrationCharges", charges)}
                  />
                </div>
                <div className="border-t border-gray-200 my-4"></div>
                <div className="text-black">
                  <Brokerage onBrokerageChange={(brokerage) => handleChange("brokerage", brokerage)} />
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Availability",
      icon: <Calendar className="w-5 h-5" />,
      component: (
        <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <Calendar className="text-black w-6 h-6" />
            <h3 className="text-xl font-semibold text-black">Availability</h3>
          </div>
          <div className="space-y-6">
            <CommercialAvailability onAvailabilityChange={(availability) => handleChange("availability", availability)} />
          </div>
        </div>
      ),
    },
    {
      title: "Contact Information",
      icon: <UserCircle className="w-5 h-5" />,
      component: (
        <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <UserCircle className="text-black w-6 h-6" />
            <h3 className="text-xl font-semibold text-black">Contact Details</h3>
          </div>
          <div className="space-y-6">
            <CommercialContactDetails onContactChange={(contact) => handleChange("contactDetails", contact)} />
          </div>
        </div>
      ),
    },
    {
      title: "Property Media",
      icon: <ImageIcon className="w-5 h-5" />,
      component: (
        <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <ImageIcon className="text-black w-6 h-6" />
            <h3 className="text-xl font-semibold text-black">Property Media</h3>
          </div>
          <div className="space-y-6">
            <CommercialMediaUpload onMediaChange={(media) => handleChange("media", media)} />
          </div>
        </div>
      ),
    },
  ]

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0))

  const handleChange = (key: string, value: string | boolean | Record<string, any>) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
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
    console.log(formData);
    try {
      // Convert media files to base64 strings if they exist
      let mediaData: Partial<MediaType> = { photos: [] };
      
      if (formData.media.photos && formData.media.photos.length > 0) {
        const photoPromises = formData.media.photos.map(async (photo: any) => {
          if (photo instanceof File) {
            return await convertFileToBase64(photo);
          }
          return photo;
        });
        mediaData.photos = await Promise.all(photoPromises);
      }
      
      if (formData.media.video && formData.media.video instanceof File) {
        mediaData.video = await convertFileToBase64(formData.media.video);
      }
      
      // Transform data for backend
      const transformedData = {
        ...formData,
        media: mediaData,
        // Ensure availability data matches the schema
        availability: {
          type: formData.availability.type || 'immediate',
          date: formData.availability.date,
          preferredSaleDuration: formData.availability.preferredSaleDuration,
          noticePeriod: formData.availability.noticePeriod,
          isPetsAllowed: formData.availability.isPetsAllowed || false,
          operatingHours: formData.availability.operatingHours || false
        },
        // Add metadata
        metaData: {
          createdAt: new Date(),
          createdBy: sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user') || '{}').id : null
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
    <div className="min-h-screen bg-white">
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
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
                        i <= currentStep ? "bg-black text-white" : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                      }`}
                    >
                      {s.icon}
                    </div>
                    <span
                      className={`text-xs mt-1 font-medium transition-colors duration-200 ${
                        i <= currentStep ? "text-black" : "text-gray-500 group-hover:text-gray-700"
                      }`}
                    >
                      {s.title}
                    </span>
                  </div>
                  {i < steps.length - 1 && (
                    <div className="flex items-center mx-1">
                      <div
                        className={`w-12 h-1 transition-colors duration-200 ${
                          i < currentStep ? "bg-black" : "bg-gray-200"
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
          <h2 className="text-3xl font-bold text-black mb-2">{steps[currentStep].title}</h2>
          <p className="text-gray-600">Please fill in the details for your shed property</p>
        </div>

        <div>
          {steps[currentStep].component}

          {/* Navigation Buttons */}
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
            <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 0}
                className={`flex items-center px-6 py-2 rounded-lg border border-black/20 transition-all duration-200 ${
                  currentStep === 0
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
      </div>
    </div>
  )
}

export default SellShedMain

