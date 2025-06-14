"use client"

import { useState, useRef, AwaitedReactNode, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal } from "react"
import PropertyName from "../PropertyName"
import CoveredOpenSpaceType from "../CommercialComponents/CoveredOpenSpaceType"
import CommercialPropertyAddress from "../CommercialComponents/CommercialPropertyAddress"
import Landmark from "../CommercialComponents/Landmark"
import CornerProperty from "../CommercialComponents/CornerProperty"
import CoveredOpenSpaceDetails from "../CommercialComponents/CoveredOpenSpaceDetails"
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
  Warehouse,
  ImageIcon,
  UserCircle,
  ChevronRight,
  ChevronLeft,
  ArrowLeft,
  Loader2,
  Locate,
} from "lucide-react"
import axios from "axios"
import { toast } from "react-hot-toast"
import MapLocation from "../CommercialComponents/MapLocation"


// --- Types for strong typing and error-free state updates ---
type MediaPhotos = {
  exterior: (File | string)[];
  interior: (File | string)[];
  floorPlan: (File | string)[];
  washrooms: (File | string)[];
  lifts: (File | string)[];
  emergencyExits: (File | string)[];
};

type Media = {
  photos: MediaPhotos;
  videoTour: File | string | null;
  documents: (File | string)[];
};

type ContactInformation = {
  name: string;
  email: string;
  phone: string;
  alternatePhone: string;
  bestTimeToContact: string;
};

type PropertyDetails = {
  ceilingHeight: string;
  area: string;
  floor: string;
  facingDirection: string;
  furnishingStatus: string;
  propertyAmenities: string[];
  wholeSpaceAmenities: string[];
  electricitySupply: string;
  waterAvailability: string[];
  propertyAge: string;
  propertyCondition: string;
  priceDetails: {
    Price: number;
    isNegotiable: boolean;
  };
  registrationCharges: {
    included: boolean;
    amount: number;
    stampDuty: number;
  };
  brokerage: {
    required: string;
    amount: number;
  };
  availability: {
    type: string;
    isPetsAllowed: boolean;
    operatingHours: boolean;
  };
  contactInformation: ContactInformation;
  media: Media;
  metadata: {
    createdBy: string;
  };
};

type SpaceDetails = {
  totalArea: string;
  areaUnit: string;
  coveredArea: string;
  openArea: string;
  roadWidth: string;
  ceilingHeight: string;
  noOfOpenSides: string;
};

type FormDataType = {
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
    location: { latitude: string; longitude: string };
    isCornerProperty: boolean;
  };
  spaceDetails: SpaceDetails;
  propertyDetails: PropertyDetails;
  price: string;
  area: {
    superBuiltUpAreaSqft: string;
    builtUpAreaSqft: string;
    carpetAreaSqft: string;
  };
  registrationCharges: {
    included: boolean;
    amount: number;
    stampDuty: number;
  };
  priceDetails: {
    Price: number;
    isNegotiable: boolean;
  };
  brokerage: {
    required: string;
    amount: number;
  };
  availability: {
    type: string;
    isPetsAllowed: boolean;
    operatingHours: boolean;
  };
  contactDetails: ContactInformation;
  media: Media;
  metadata: {
    createdBy: string;
  };
};

const SellCoveredSpaceMain = () => {
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState<FormDataType>({
    basicInformation: {
      title: "",
      Type: [""],
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
    spaceDetails: {
      totalArea: "",
      areaUnit: "",
      coveredArea: "",
      openArea: "",
      roadWidth: "",
      ceilingHeight: "",
      noOfOpenSides: "",
    },
    propertyDetails: {
      ceilingHeight: "",
      area: "",
      floor: "",
      facingDirection: "",
      furnishingStatus: "",
      propertyAmenities: [],
      wholeSpaceAmenities: [],
      electricitySupply: "",
      waterAvailability: [],
      propertyAge: "",
      propertyCondition: "",
      priceDetails: {
        Price: 0,
        isNegotiable: false
      },
      registrationCharges: {
        included: false,
        amount: 0,
        stampDuty: 0
      },
      brokerage: {
        required: "",
        amount: 0
      },
      availability: {
        type: "immediate",
        isPetsAllowed: false,
        operatingHours: false
      },
      contactInformation: {
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
      },
      metadata: {
        createdBy: "demo-user"
      },
    },
    price: "",
    area: {
      superBuiltUpAreaSqft: "",
      builtUpAreaSqft: "",
      carpetAreaSqft: "",
    },
    registrationCharges: {
      included: false,
      amount: 0,
      stampDuty: 0
    },
    priceDetails: {
      Price: 0,
      isNegotiable: false
    },

    brokerage: {
      required: "",
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
      videoTour: null as File | null,
      documents: [] as File[]
    },
    metadata: {
      createdBy: "demo-user" // TODO: Replace with actual user ID if available
    }
  })

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

  const [currentStep, setCurrentStep] = useState(0)
  const formRef = useRef<HTMLDivElement>(null)

  // Helper to convert File[] to string[] (simulate upload, or use URLs if already uploaded)
  const filesToUrls = (files: File[]): string[] => {
    // In production, you should upload the file and get the URL from the server
    // Here, we use a placeholder or local URL
    return files
      .filter(f => !!f)
      .map(f => (typeof f === 'string' ? f : URL.createObjectURL(f)));
  };

  const steps = [
    {
      title: "Basic Information",
      icon: <Warehouse className="w-5 h-5" />,
      component: (
        <div className="space-y-8">
          <div className="space-y-6">
            <PropertyName
              propertyName={formData.basicInformation.title}
              onPropertyNameChange={(name) => setFormData((prev) => ({ ...prev, basicInformation: { ...prev.basicInformation, title: name } }))}
            />
            <CoveredOpenSpaceType
              onSpaceTypeChange={(Type:string[]) => 
                setFormData(prev => ({
                  ...prev,
                  basicInformation: {
                    ...prev.basicInformation,
                    Type: Array.isArray(Type) ? Type : [Type],
                  },
                }))     
            } 
/>
           
          
          </div>

          <div className="space-y-6">
            <CommercialPropertyAddress
              address={formData.basicInformation.address}
              onAddressChange={(address) => setFormData((prev) => ({ ...prev, basicInformation: { ...prev.basicInformation, address } }))}
            />
            {/* <Landmark onLandmarkChange={(landmark) => setFormData((prev) => ({ ...prev, landmark }))} /> */}
            <MapLocation
              latitude={String(formData.basicInformation.location.latitude)}
              longitude={String(formData.basicInformation.location.longitude)}
              landmark={formData.basicInformation.landmark}
              onLocationChange={(location) => setFormData((prev) => ({ ...prev, basicInformation: { ...prev.basicInformation, location } }))}
              onAddressChange={(address) => setFormData((prev) => ({ ...prev, basicInformation: { ...prev.basicInformation, address } }))}
              onLandmarkChange={(landmark) => setFormData((prev) => ({ ...prev, basicInformation: { ...prev.basicInformation, landmark } }))}
            />

            <CornerProperty
              isCornerProperty={formData.basicInformation.isCornerProperty}
              onCornerPropertyChange={(isCorner) =>
                setFormData((prev) => ({ ...prev, isCornerProperty: isCorner }))
              }
            />
          </div>
        </div>
      ),
    },
    {
      title: "Property Details",
      icon: <Building2 className="w-5 h-5" />,
      component: (
        <div className="space-y-6">
          <CoveredOpenSpaceDetails
            onDetailsChange={(details: Record<string, any>) => setFormData((prev) => ({ ...prev, spaceDetails: { ...prev.spaceDetails, ...details } }))}
          />
          <CommercialPropertyDetails
            onDetailsChange={(details: Record<string, any>) => setFormData((prev) => ({ ...prev, propertyDetails: { ...prev.propertyDetails, ...details } }))}
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
            <Price onPriceChange={(price) => setFormData((prev) => ({ ...prev, price: price.amount }))} />
          </div>
          <div className="text-black">
            <RegistrationCharges
              onRegistrationChargesChange={(charges) =>
                setFormData((prev) => ({
                  ...prev,
                  registrationCharges: {
                    included: charges.included,
                    amount: charges.amount,
                    stampDuty: charges.stampDuty
                  }
                }))
              }
            />
          </div>
          <div className="text-black">
            <Brokerage bro={formData.brokerage} onBrokerageChange={(brokerage) => setFormData(prev => ({
              ...prev,
              brokerage: {
                required: brokerage.required,
                amount: brokerage.amount || 0
              }
            }))} />
          </div>
        </div>
      ),
    },
    {
      title: "Availability",
      icon: <Calendar className="w-5 h-5" />,
      component: (
        <div className="space-y-6">
          <CommercialAvailability onAvailabilityChange={(availability) => handleChange('availability', availability)} />
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
            onContactChange={(contact) => handleChange('contactDetails', contact)} />
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
                files: files
                  .filter((file): file is File => typeof file !== 'string')
                  .map((file: File) => ({ url: URL.createObjectURL(file), file }))
              })),
              videoTour: formData.media.videoTour && typeof formData.media.videoTour !== 'string' ? formData.media.videoTour : null,
              documents: formData.media.documents.filter((file): file is File => typeof file !== 'string')
            }}
            onMediaChange={(media) => {
              const photos: Record<string, (File | string)[]> = {};
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
                  videoTour: media.videoTour && typeof media.videoTour !== 'string' ? media.videoTour : null,
                  documents: (media.documents as File[])
                }
              }));
            }}

          />
        </div>
      ),
    },
  ];




  const mapFormDataToBackendFormat = () => {
    // Map formData to backend format and ensure all required fields are present and correctly structured
    const {
      registrationCharges,
      priceDetails,
      brokerage,
      availability,
      contactDetails,
      media,
      propertyDetails,
      metadata,
      ...rest
    } = formData;

    // Ensure all photo arrays are arrays of strings (URLs) and never contain objects/empty objects
    const photos = Object.fromEntries(
      Object.entries(media.photos).map(([key, files]) => [
        key,
        files
          .filter(f => typeof f === 'string' || f instanceof File)
          .map(f => typeof f === 'string' ? f : URL.createObjectURL(f))
          .filter(f => typeof f === 'string' && f.trim() !== ''),
      ]),
    );

    // Compose contactInformation as required by backend
    const contactInformation = {
      name: contactDetails.name || "demo name",
      email: contactDetails.email || "demo@email.com",
      phone: contactDetails.phone || "0000000000",
      // Optionally add alternatePhone, bestTimeToContact if backend supports
    };

    // Compose propertyDetails as required by backend
    const backendPropertyDetails = {
      ...propertyDetails,
      availability: {
        ...(propertyDetails.availability || {}),
        type: propertyDetails.availability?.type || availability.type || "immediate",
        isPetsAllowed: propertyDetails.availability?.isPetsAllowed ?? availability.isPetsAllowed,
        operatingHours: propertyDetails.availability?.operatingHours ?? availability.operatingHours,
      },
      brokerage: {
        ...(propertyDetails.brokerage || {}),
        required: propertyDetails.brokerage?.required || brokerage.required || "yes",
        amount: propertyDetails.brokerage?.amount ?? brokerage.amount ?? 0,
      },
      priceDetails: {
        ...(propertyDetails.priceDetails || {}),
        Price: (propertyDetails.priceDetails?.Price ?? priceDetails.Price ?? 0),
        isNegotiable: propertyDetails.priceDetails?.isNegotiable ?? priceDetails.isNegotiable ?? false,
      },
    };

    return {
      ...rest,
      registrationCharges: {
        included: registrationCharges.included,
        amount: registrationCharges.amount,
        stampDuty: registrationCharges.stampDuty,
      },
      propertyDetails: backendPropertyDetails,
      contactInformation,
      media: {
        photos,
        videoTour: media.videoTour && typeof media.videoTour === 'string' ? media.videoTour : (media.videoTour ? URL.createObjectURL(media.videoTour as File) : undefined),
        documents: filesToUrls(media.documents as File[]),
      },
      metadata: {
        createdBy: metadata.createdBy && metadata.createdBy.trim() !== '' ? metadata.createdBy : "demo-user",
      },
    };
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "/api/commercial/sell/covered-space",
        mapFormDataToBackendFormat()
      );
      console.log("Response:", response.data);
      toast.success("Property listed successfully!");
    } finally {
      setLoading(false);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

    return (
      <div ref={formRef} className="min-h-screen bg-white">
        {/* Progress indicator */}
        <div className="sticky top-0 z-50 bg-white border-b border-gray-200">
          <div className="max-w-5xl mx-auto px-4 py-4">
            <div className="flex justify-center">
              <div className="flex items-center space-x-2">
                {steps.map((s: { icon: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; title: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined }, i: number) => (
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
            <h1 className="text-2xl sm:text-3xl font-bold text-black">Sale Commercial Covered Space</h1>
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
                disabled={loading}
                className={`flex items-center px-6 py-2 rounded-lg ${loading ? "bg-gray-600" : "bg-black hover:bg-gray-800"
                  } text-white transition-all duration-200`}
              >
                {loading ? "Submitting..." : "Submit"}
                {!loading && <ChevronRight className="w-5 h-5 ml-2" />}
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }

export default SellCoveredSpaceMain
