"use client"

import { useState, useRef, useEffect } from "react"
import PropertyName from "../PropertyName"
import AgriculturalLandType from "../CommercialComponents/AgriculturalLandType"
import CommercialPropertyAddress from "../CommercialComponents/CommercialPropertyAddress"
import Landmark from "../CommercialComponents/Landmark"
import MapCoordinates from "../MapCoordinates"
import CornerProperty from "../CommercialComponents/CornerProperty"
import AgriculturalLandDetails from "../CommercialComponents/AgriculturalLandDetails"
//import CommercialPropertyDetails from "../CommercialComponents/CommercialPropertyDetails"
import Price from "../sell/Price"
import PricePerSqft from "../sell/PricePerSqft"
import RegistrationCharges from "../sell/RegistrationCharges"
import Brokerage from "../residentialrent/Brokerage"
import CommercialAvailability from "../CommercialComponents/CommercialAvailability"
import CommercialContactDetails from "../CommercialComponents/CommercialContactDetails"
import MediaUploadforagriplot from "../Mediauploadforagriplot"
import { useNavigate, Navigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import axios from "axios"
import {
  MapPin,
  Building2,
  DollarSign,
  Calendar,
  User,
  Image,
  TreesIcon as Tree,
  ImageIcon,
  UserCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import MapLocation from "../CommercialComponents/MapLocation"
import { BasicInfo } from "@/components/propertiesdetails/components/BasicInfo"

// Interface that matches the backend model structure
interface FormData {
  basicInformation:{ 
    propertyId?: string;
    title: string;
    type: string[];
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
 
  Agriculturelanddetails: {
    totalArea: number;
    powersupply:boolean;
    soilType: string;
    irrigation: boolean;
    fencing: boolean;
    cropSuitability: string;
    waterSource: string;
    legalClearances: boolean;
  };
  propertyDetails: {
    area: {
      totalArea: number;
      carpetArea: number;
      builtUpArea: number;
    };
    floor: {
      floorNumber: number;
      totalFloors: number;
    };
    facingDirection: string;
    furnishingStatus: string;
    propertyAmenities: string[];
    wholeSpaceAmenities: string[];
    waterAvailability: string;
    propertyAge: number;
    propertyCondition: string;
    electricitySupply: {
      powerLoad: number;
      backup: boolean;
    };
  };
  price: {
    expectedPrice: number;
    isNegotiable: boolean;
  };
  registrationCharges: {
    included: boolean;
    amount?: number;
    stampDuty?: number;
  };
  brokerage: {
    required: string;
    amount?: number;
  };
  availability: {
    type: 'immediate' | 'specific';
    date?: Date;
    preferredLeaseDuration?: string;
    noticePeriod?: string;
  };
  petsAllowed: boolean;
  operatingHoursRestrictions: boolean;
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
    };
    videoTour: File | null;
    documents: File[];
  };
  metadata?: {
    createdBy: string;
    createdAt: Date;
    propertyType: string;
    propertyName: string;
    intent: string;
    status: string;
  };
}

const SellAgricultureMain = () => {
  const formRef = useRef<HTMLDivElement>(null)
  const [formData, setFormData] = useState<FormData>({
    basicInformation:{
    title: "",
    type: [],
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
    Agriculturelanddetails: {
      totalArea: 0,
      powersupply: false,
      soilType: "",
      irrigation: false,
      fencing: false,
      cropSuitability: "",
      waterSource: "",
      legalClearances: false
    },
    propertyDetails: {
      area: {
        totalArea: 0,
        carpetArea: 0,
        builtUpArea: 0
      },
      floor: {
        floorNumber: 0,
        totalFloors: 0
      },
      facingDirection: "",
      furnishingStatus: "",
      propertyAmenities: [],
      wholeSpaceAmenities: [],
      waterAvailability: "",
      propertyAge: 0,
      propertyCondition: "",
      electricitySupply: {
        powerLoad: 0,
        backup: false
      }
    },
    price: {
      expectedPrice: 0,
      isNegotiable: false
    },
    registrationCharges: {
      included: false
    },
    brokerage: {
      required: "No",
      amount: 0
    },
    availability: {
      type: "immediate",
      preferredLeaseDuration: "",
      noticePeriod: ""
    },
    petsAllowed: false,
    operatingHoursRestrictions: false,
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
    },
    metadata:{
      createdBy: "",
      createdAt: new Date(),
      propertyType: "",
      propertyName: "",
      intent: "",
      status: ""
    }
  })



   

   const params = useParams()
   const propertyId = params.propertyId;
   const [Loading, setLoading] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate()

useEffect(() => {
  const fetchById = async () => {
    const user = sessionStorage.getItem("user");

    if (!user) {
      navigate("/login");
      return;
    } else {
      setIsLoggedIn(true);
    }

    if (!propertyId) return;

    console.log("Fetching Agricultural Land details for:", propertyId);
    setLoading(true);

    try {
      const response = await axios.get(`/api/commercial/sell/agriculture/${propertyId}`);
if (response.data && response.data.data) {
  const agricultreData = response.data.data;
        setFormData((prev) => ({
          ...prev,
          basicInformation: agricultreData.basicInformation || prev.basicInformation,
          Agriculturelanddetails: agricultreData.Agriculturelanddetails || prev.Agriculturelanddetails,
          propertyDetails: agricultreData.propertyDetails || prev.propertyDetails,
          price: agricultreData.price || prev.price,
          registrationCharges: agricultreData.registrationCharges || prev.registrationCharges,
          brokerage: agricultreData.brokerage || prev.brokerage,
          availability: agricultreData.availability || prev.availability,
          petsAllowed: agricultreData.petsAllowed ?? prev.petsAllowed,
          operatingHoursRestrictions: agricultreData.operatingHoursRestrictions ?? prev.operatingHoursRestrictions,
          contactDetails: agricultreData.contactDetails || prev.contactDetails,
          media: agricultreData.media || prev.media,
          metadata: agricultreData.metadata || prev.metadata
        }));

        toast.success("Agricultural land details loaded successfully!");
      } else {
        toast.error("Failed to load property details.");
      }
    } catch (err) {
      console.error("Error fetching agricultural land details:", err);
      toast.error("Failed to fetch property details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  fetchById();
}, [navigate, propertyId]);

  const steps = [
    {
      title: "Basic Information",
      icon: <Tree className="w-5 h-5" />,
      component: (
        <div className="space-y-8">
          <div className="space-y-6">
            <PropertyName
              propertyName={formData.basicInformation.title}
              onPropertyNameChange={(name) => 
                setFormData(prev => ({ ...prev, basicInformation: { ...prev.basicInformation, title: name } }))
              }
            />
            <AgriculturalLandType
              onLandTypeChange={(types) => setFormData((prev) => ({ ...prev, basicInformation: { ...prev.basicInformation, landType: types } }))}
            />
          </div>

          <div className="space-y-6">
            <CommercialPropertyAddress
              address={formData.basicInformation.address}
              onAddressChange={(address) => setFormData((prev) => ({ ...prev, basicInformation: { ...prev.basicInformation, address } }))}
            />
           
            <MapLocation
              latitude={formData.basicInformation?.location.latitude}
              longitude={formData.basicInformation?.location.longitude}
              landmark={formData.basicInformation.landmark}
              onLocationChange={(location:{latitude:string,longitude:string}) => setFormData(prev => ({
                ...prev,
                basicInformation:{
                  ...prev.basicInformation,
                  location:{
                    latitude:location.latitude,
                    longitude:location.longitude
                  }
                }
              }))}
              onAddressChange={(address) => setFormData(prev => ({
                ...prev,
                basicInformation:{
                  ...prev.basicInformation,
                  address:address
                }
              }))}
              onLandmarkChange={(landmark) => setFormData(prev => ({
                ...prev,
                basicInformation:{
                  ...prev.basicInformation,
                  landmark:landmark
                }
              }))}
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
          <AgriculturalLandDetails
            onDetailsChange={(details) => setFormData((prev) => ({
              ...prev,
              Agriculturelanddetails: details as FormData['Agriculturelanddetails']
            }))}
          />
          {/* <CommercialPropertyDetails
              onDetailsChange={(details) => setFormData((prev) => ({
                ...prev,
                propertyDetails: details as FormData['propertyDetails']
              }))}
            /> */}
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
                price: {
                  ...prev.price,
                  expectedPrice: parseFloat(price.propertyPrice.toString()),
                  isNegotiable: price.pricetype === 'negotiable'
                }
              }))
            } />
            <div className="text-sm mt-2 text-gray-600">
              Price per unit will be calculated automatically based on the area information.
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
                  date: availability.date,
                  preferredLeaseDuration: availability.preferredLeaseDuration,
                  noticePeriod: availability.noticePeriod
                },
                petsAllowed: availability.petsAllowed || false,
                operatingHoursRestrictions: availability.operatingHoursRestrictions || false
              }))
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
              contactDetails: contact as FormData['contactDetails']
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
      <MediaUploadforagriplot
        Media={{
          photos: Object.entries(formData.media.photos).map(([category, files]) => ({
            category,
            files: files.map(file => {
              if (file instanceof File) {
                // New uploads
                return { url: URL.createObjectURL(file), file };
              } else if (typeof file === "string") {
                // Existing URLs from backend
                return { url: file, file: null };
              }
              return { url: "", file: null };
            })
          })),
          videoTour:
            formData.media.videoTour instanceof File
              ? URL.createObjectURL(formData.media.videoTour)
              : formData.media.videoTour || null,
          documents:
            formData.media.documents.map(file =>
              file instanceof File ? URL.createObjectURL(file) : file
            )
        }}
        onMediaChange={(media) => {
          const photosByCategory: Record<string, (File | string)[]> = {
            exterior: [],
            interior: [],
            floorPlan: [],
            washrooms: [],
            lifts: [],
            emergencyExits: []
          };

          media.photos.forEach(({ category, files }) => {
            if (category in photosByCategory) {
              photosByCategory[category] = files.map(f => f.file || f.url);
            }
          });

          setFormData(prev => ({
            ...prev,
            media: {
              photos: {
                exterior: photosByCategory.exterior,
                interior: photosByCategory.interior,
                floorPlan: photosByCategory.floorPlan,
                washrooms: photosByCategory.washrooms,
                lifts: photosByCategory.lifts,
                emergencyExits: photosByCategory.emergencyExits
              },
              videoTour:
                media.videoTour && typeof media.videoTour !== "string"
                  ? media.videoTour
                  : prev.media.videoTour,
              documents: media.documents
            }
          }));
        }}
      />
    </div>
  ),
}
,
  ]

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
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
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
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
  }

  const handleSubmit = async (e: { preventDefault: () => void }) => {
  e.preventDefault();

  try {
    const user = sessionStorage.getItem("user");
    if (!user) {
      toast.error("You must be logged in to create or edit a listing");
      navigate("/login");
      return;
    }

    const author = JSON.parse(user).id;
    setLoading(true);

    // Convert only new File objects to base64 (not URLs)
    const convertFileIfNeeded = async (item: File | string) => {
      if (item instanceof File) {
        return await convertFileToBase64(item);
      }
      return item;
    };

    const convertedMedia = {
      photos: {
        exterior: await Promise.all(formData.media.photos.exterior.map(convertFileIfNeeded)),
        interior: await Promise.all(formData.media.photos.interior.map(convertFileIfNeeded)),
        floorPlan: await Promise.all(formData.media.photos.floorPlan.map(convertFileIfNeeded)),
        washrooms: await Promise.all(formData.media.photos.washrooms.map(convertFileIfNeeded)),
        lifts: await Promise.all(formData.media.photos.lifts.map(convertFileIfNeeded)),
        emergencyExits: await Promise.all(formData.media.photos.emergencyExits.map(convertFileIfNeeded)),
      },
      videoTour: formData.media.videoTour
        ? await convertFileIfNeeded(formData.media.videoTour)
        : null,
      documents: await Promise.all(formData.media.documents.map(convertFileIfNeeded)),
    };

    const payload = {
      ...formData,
      media: convertedMedia,
      metadata: {
        createdBy: author,
        createdAt: new Date(),
        propertyType: "Commercial",
        propertyName: "Agricultural Land",
        intent: "Sell",
        status: "Available",
      },
    };

    let response;
    if (propertyId) {
      response = await axios.put(`/api/commercial/sell/agriculture/${propertyId}`, payload);
      toast.success("Agricultural land updated successfully!");
    } else {
      response = await axios.post(`/api/commercial/sell/agriculture`, payload);
      toast.success("Agricultural land created successfully!");
    }

    if (response.data) {
      // navigate("/dashboard"); // optional
    }
  } catch (error: any) {
    console.error("Error submitting form:", error);
    toast.error(error.response?.data?.message || "Failed to save property. Please try again.");
  } finally {
    setLoading(false);
  }
};

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
              type="button"
              onClick={handleSubmit}
              className="flex items-center px-6 py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition-all duration-200"
            >
              List Property
              <ChevronRight className="w-5 h-5 ml-2" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default SellAgricultureMain
