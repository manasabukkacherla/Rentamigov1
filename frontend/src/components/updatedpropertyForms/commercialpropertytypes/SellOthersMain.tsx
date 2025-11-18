"use client"

import { useState, useRef, useEffect } from "react"
import PropertyName from "../PropertyName"
import OtherCommercialType from "../CommercialComponents/OtherCommercialType"
import CommercialPropertyAddress from "../CommercialComponents/CommercialPropertyAddress"
import Landmark from "../CommercialComponents/Landmark"
import MapCoordinates from "../MapCoordinates"
import CornerProperty from "../CommercialComponents/CornerProperty"
import OtherPropertyDetails from "../CommercialComponents/OtherPropertyDetails"
import CommercialPropertyDetails from "../CommercialComponents/CommercialPropertyDetails"
import Price from "../sell/Price"
import PricePerSqft from "../sell/PricePerSqft"
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
  User,
  Image,
  FileQuestion,
  ImageIcon,
  UserCircle,
  ChevronLeft,
  ChevronRight,
  Loader2
} from "lucide-react"
import { useNavigate, useNavigation , useParams} from "react-router-dom"
import { toast } from "react-toastify"
import axios from "axios"
import MapLocation from "../CommercialComponents/MapLocation"

// Define interface that matches backend model structure
interface FormData {
  propertyId?: string;
  basicInformation:{
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
    longitude: string
  };
  isCornerProperty: boolean;
},
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
    otherDetails: {
      propertyTypeDescription: string;
      specialFeatures: string;
      usageRecommendation: string;
      additionalRequirements: string;
    };
    facingDirection: string;
    furnishingStatus: string;
    propertyAmenities: string[];
    wholeSpaceAmenities: string[];
    waterAvailability: string;
    propertyAge: string;
    propertyCondition: string;
    electricitySupply: {
      powerLoad: number;
      backup: boolean;
    };
  };
  pricingDetails: {
    propertyPrice: number;
    pricetype: "fixed" | "negotiable";
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
      exterior: (File | { file: File | null; url: string })[];
      interior: (File | { file: File | null; url: string })[];
      floorPlan: (File | { file: File | null; url: string })[];
      washrooms: (File | { file: File | null; url: string })[];
      lifts: (File | { file: File | null; url: string })[];
      emergencyExits: (File | { file: File | null; url: string })[];
      others: (File | { file: File | null; url: string })[];
    };
    videoTour: File | null;
    documents: (File | { file: File | null; url: string })[];
  };
  metaData?: {
    createdBy: string;
    createdAt: Date;
    propertyType: string;
    propertyName: string;
    intent: string;
    status: string;
  };
}

const SellOthersMain = () => {
  const navigate = useNavigate()
  const formRef = useRef<HTMLDivElement>(null)
  const params = useParams()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const propertyId = params.propertyId;
  const [isEditMode, setIsEditMode] = useState(false)
  
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
      otherDetails: {
        propertyTypeDescription: "",
        specialFeatures: "",
        usageRecommendation: "",
        additionalRequirements: ""
      },
      facingDirection: "",
      furnishingStatus: "",
      propertyAmenities: [],
      wholeSpaceAmenities: [],
      waterAvailability: "",
      propertyAge: "",
      propertyCondition: "",
      electricitySupply: {
        powerLoad: 0,
        backup: false
      }
    },
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
      required: "No",
      amount: 0
    },
    availability: {
      type: "immediate"
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
        emergencyExits: [],
        others: []
      },
      videoTour: null,
      documents: []
    }
  })

  // Corrected useEffect with proper data fetching for edit mode
  useEffect(() => {
    // Check login status
    const user = sessionStorage.getItem("user");
    if (user) {
      setIsLoggedIn(true);
    }

    // Fetch existing property data for Edit mode
    const fetchPropertyData = async () => {
      try {
        if (!propertyId) {
          setIsEditMode(false);
          return;
        }

        setIsEditMode(true);
        const response = await axios.get(`/api/commercial/sale/others/${propertyId}`);
        const data = response.data.data;

        // Helper function to handle existing images
        const prepareExistingImages = (imageUrls: string[]) => {
          return imageUrls.map((url) => ({
            file: null, // null indicates existing server image
            url: url
          }));
        };

        setFormData(prev => ({
          ...prev,
          propertyId: data.propertyId,

          basicInformation: {
            title: data.basicInformation?.title || "",
            type: data.basicInformation?.type || [],
            address: data.basicInformation?.address || {
              street: "",
              city: "",
              state: "",
              zipCode: ""
            },
            landmark: data.basicInformation?.landmark || "",
            location: data.basicInformation?.location || { latitude: "", longitude: "" },
            isCornerProperty: data.basicInformation?.isCornerProperty || false,
          },

          propertyDetails: {
            area: data.propertyDetails?.area || {
              totalArea: 0,
              carpetArea: 0,
              builtUpArea: 0
            },
            floor: data.propertyDetails?.floor || {
              floorNumber: 0,
              totalFloors: 0
            },
            otherDetails: data.propertyDetails?.otherDetails || {
              propertyTypeDescription: "",
              specialFeatures: "",
              usageRecommendation: "",
              additionalRequirements: ""
            },
            facingDirection: data.propertyDetails?.facingDirection || "",
            furnishingStatus: data.propertyDetails?.furnishingStatus || "",
            propertyAmenities: data.propertyDetails?.propertyAmenities || [],
            wholeSpaceAmenities: data.propertyDetails?.wholeSpaceAmenities || [],
            waterAvailability: data.propertyDetails?.waterAvailability || "",
            propertyAge: data.propertyDetails?.propertyAge || "",
            propertyCondition: data.propertyDetails?.propertyCondition || "",
            electricitySupply: data.propertyDetails?.electricitySupply || {
              powerLoad: 0,
              backup: false
            }
          },

          pricingDetails: {
            propertyPrice: data.pricingDetails?.propertyPrice || 0,
            pricetype: data.pricingDetails?.pricetype || "fixed"
          },

          registration: {
            chargestype: data.registration?.chargestype || 'inclusive',
            registrationAmount: data.registration?.registrationAmount || 0,
            stampDutyAmount: data.registration?.stampDutyAmount || 0
          },

          brokerage: data.brokerage || {
            required: "No",
            amount: 0
          },

          availability: data.availability || {
            type: "immediate"
          },

          petsAllowed: data.petsAllowed || false,
          operatingHoursRestrictions: data.operatingHoursRestrictions || false,

          contactDetails: data.contactDetails || {
            name: "",
            email: "",
            phone: "",
            alternatePhone: "",
            bestTimeToContact: ""
          },

          media: {
            photos: {
              exterior: data.media?.photos?.exterior ? prepareExistingImages(data.media.photos.exterior) : [],
              interior: data.media?.photos?.interior ? prepareExistingImages(data.media.photos.interior) : [],
              floorPlan: data.media?.photos?.floorPlan ? prepareExistingImages(data.media.photos.floorPlan) : [],
              washrooms: data.media?.photos?.washrooms ? prepareExistingImages(data.media.photos.washrooms) : [],
              lifts: data.media?.photos?.lifts ? prepareExistingImages(data.media.photos.lifts) : [],
              emergencyExits: data.media?.photos?.emergencyExits ? prepareExistingImages(data.media.photos.emergencyExits) : [],
              others: data.media?.photos?.others ? prepareExistingImages(data.media.photos.others) : [],
            },
            videoTour: data.media?.videoTour || null,
            documents: data.media?.documents ? prepareExistingImages(data.media.documents) : []
          }
        }));

      } catch (err) {
        console.error("Error loading property:", err);
        toast.error("Failed to load property data.");
        setIsEditMode(false);
      }
    };

    fetchPropertyData();
  }, [propertyId]);

  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    {
      title: "Basic Information",
      icon: <FileQuestion className="w-5 h-5" />,
      component: (
        <div className="space-y-8">
          <div className="space-y-6">
            <PropertyName
              propertyName={formData.basicInformation.title}
              onPropertyNameChange={(name) => setFormData((prev) => ({ ...prev, basicInformation: { ...prev.basicInformation, title: name } }))}
            />

            <OtherCommercialType
              onCommercialTypeChange={(type) => setFormData((prev) => ({ ...prev, basicInformation: { ...prev.basicInformation, type: type as string[] } }))}
            />
          </div>

          <div className="space-y-6">
            <CommercialPropertyAddress address={formData.basicInformation.address} onAddressChange={(address) => setFormData((prev) => ({ ...prev, basicInformation: { ...prev.basicInformation, address } }))} />
            
            <MapLocation
              latitude={formData.basicInformation.location.latitude.toString()}
              longitude={formData.basicInformation.location.longitude.toString()}
              landmark={formData.basicInformation.landmark}
              onLocationChange={(location) => setFormData((prev) => ({
                ...prev,
                basicInformation: {
                  ...prev.basicInformation,
                  location: location
                }
              }))}
              onAddressChange={(address) => setFormData((prev) => ({
                ...prev,
                basicInformation: {
                  ...prev.basicInformation,
                  address
                }
              }))}
              onLandmarkChange={(landmark) => setFormData((prev) => ({
                ...prev,
                basicInformation: {
                  ...prev.basicInformation,
                  landmark
                }
              }))}
            />

            <CornerProperty
              isCornerProperty={formData.basicInformation.isCornerProperty}
              onCornerPropertyChange={(isCorner) =>
                setFormData((prev) => ({ 
                  ...prev, 
                  basicInformation: { 
                    ...prev.basicInformation, 
                    isCornerProperty: isCorner 
                  } 
                }))
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
          <OtherPropertyDetails
            onDetailsChange={(details) => {
              setFormData((prev) => ({
                ...prev,
                propertyDetails: {
                  ...prev.propertyDetails,
                  otherDetails: details as FormData['propertyDetails']['otherDetails']
                }
              }));
            }}
          />
          <CommercialPropertyDetails
            onDetailsChange={(details) => {
              const updatedDetails = { ...formData.propertyDetails };
              Object.assign(updatedDetails, details);
              setFormData((prev) => ({
                ...prev,
                propertyDetails: updatedDetails
              }));
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
                  propertyPrice: parseFloat(price.propertyPrice.toString()),
                  pricetype: price.pricetype
                }
              }))
            } />
          </div>

          <div className="space-y-4 text-black">
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
            <div className="text-black">
              <Brokerage
                bro={formData.brokerage}
                onBrokerageChange={(brokerage) =>
                  setFormData((prev) => ({
                    ...prev,
                    brokerage: brokerage as FormData['brokerage']
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
                  date: availability.date,
                  preferredLeaseDuration: availability.preferredLeaseDuration,
                  noticePeriod: availability.noticePeriod
                },
                petsAllowed: availability.petsAllowed || false,
                operatingHoursRestrictions: availability.operatingHoursRestrictions || false
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
          <CommercialMediaUpload
            Media={{
              photos: Object.entries(formData.media.photos).map(([category, files]) => ({
                category,
                files: files.map(fileItem => {
                  if (fileItem instanceof File) {
                    return { 
                      url: URL.createObjectURL(fileItem), 
                      file: fileItem,
                      isExisting: false 
                    };
                  }
                  return { 
                    url: fileItem.url, 
                    file: fileItem.file,
                    isExisting: true 
                  };
                })
              })),
              videoTour: formData.media.videoTour || null,
              documents: formData.media.documents.map(doc => {
                if (doc instanceof File) {
                  return { 
                    url: URL.createObjectURL(doc), 
                    file: doc,
                    isExisting: false 
                  };
                }
                return { 
                  url: doc.url, 
                  file: doc.file,
                  isExisting: true 
                };
              })
            }}
            onMediaChange={(media) => {
              console.log('Media changed:', media);
              
              const photos: Record<string, (File | { file: File | null; url: string })[]> = {};
              
              // Process all photo categories including floorPlan, washrooms, lifts, emergencyExits, others
              media.photos.forEach(({ category, files }: { 
                category: string, 
                files: { url: string, file: File, isExisting?: boolean }[] 
              }) => {
                photos[category] = files.map(f => {
                  if (f.isExisting) {
                    // Keep existing images as objects with url
                    return { file: f.file, url: f.url };
                  }
                  return f.file; // New uploads as File objects
                });
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
                  documents: media.documents.map(doc => {
                    if (doc.isExisting) {
                      return { file: doc.file, url: doc.url };
                    }
                    return doc.file;
                  })
                }
              }));
            }}
          />
        </div>
      ),
    },
  ]

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  // Helper function to process media files for submission
  const processMediaForSubmission = async (media: FormData['media']) => {
    const processFileArray = async (files: (File | { file: File | null; url: string })[]) => {
      const results: string[] = [];
      
      for (const fileItem of files) {
        if (fileItem instanceof File) {
          // New file - convert to base64
          const base64 = await convertFileToBase64(fileItem);
          results.push(base64);
        } else if (fileItem.file instanceof File) {
          // New file in object format - convert to base64
          const base64 = await convertFileToBase64(fileItem.file);
          results.push(base64);
        } else if (fileItem.url) {
          // Existing server image - keep URL as is
          results.push(fileItem.url);
        }
      }
      
      return results;
    };

    const processPhotos = async (photos: FormData['media']['photos']) => {
      const processedPhotos: Record<string, string[]> = {};
      
      // Process ALL photo categories
      const photoCategories = [
        'exterior', 
        'interior', 
        'floorPlan', 
        'washrooms', 
        'lifts', 
        'emergencyExits', 
        'others'
      ];
      
      for (const category of photoCategories) {
        processedPhotos[category] = await processFileArray(photos[category as keyof typeof photos] || []);
      }
      
      return processedPhotos;
    };

    return {
      photos: await processPhotos(media.photos),
      videoTour: media.videoTour instanceof File ? await convertFileToBase64(media.videoTour) : media.videoTour,
      documents: await processFileArray(media.documents)
    };
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
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

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validate location before submitting
  const validateLocation = () => {
    const { latitude, longitude } = formData.basicInformation.location;
    return latitude && latitude.trim() !== '' && longitude && longitude.trim() !== '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateLocation()) {
      toast.error('Please select a valid location on the map (latitude and longitude are required).');
      return;
    }
    
    console.log('Submitting payload:', formData);
    setIsSubmitting(true);

    try {
      const user = sessionStorage.getItem('user');
      if (!user) {
        toast.error('You must be logged in to create a property listing');
        setIsSubmitting(false);
        return;
      }

      const userData = JSON.parse(user);
      const author = userData.id || userData._id;
      
      if (!author) {
        toast.error('User ID not found in session');
        setIsSubmitting(false);
        return;
      }

      // Process media files for submission
      const processedMedia = await processMediaForSubmission(formData.media);

      // Create payload matching the backend model structure
      const transformedData = {
        ...formData,
        media: processedMedia,
        metadata: {
          createdBy: author,
          propertyType: 'Commercial',
          propertyName: 'Other', 
          intent: 'Sell',
          status: 'Available',
        }
      };

      let response;
      
      if (isEditMode && propertyId) {
        // UPDATE existing property
        response = await axios.put(`/api/commercial/sell/others/${propertyId}`, transformedData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        toast.success('Commercial property successfully updated!');
      } else {
        // CREATE new property
        response = await axios.post('/api/commercial/sale/others', transformedData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        toast.success('Commercial property successfully listed!');
      }

      if (response.data) {
        navigate('/updatePropertyform');
      }
    } catch (error: any) {
      console.error("Error submitting form:", error);
      toast.error(error.response?.data?.message || `Failed to ${isEditMode ? 'update' : 'create'} property listing. Please try again.`);
    } finally {
      setIsSubmitting(false);
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
          <h1 className="text-2xl sm:text-3xl font-bold text-black">
            {isEditMode ? 'Edit Commercial Property' : 'Sale Commercial Others'}
          </h1>
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
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className={`flex items-center px-6 py-2 rounded-lg border border-black/20 transition-all duration-200 ${currentStep === 0
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white text-black hover:bg-black hover:text-white'
              }`}
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Previous
          </button>
          <button
            onClick={currentStep === steps.length - 1 ? handleSubmit : handleNext}
            disabled={isSubmitting}
            className="flex items-center px-6 py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition-all duration-200"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin mr-2 h-5 w-5" />
                {isEditMode ? 'Updating...' : 'Submitting...'}
              </>
            ) : (
              <>
                {currentStep === steps.length - 1 ? (isEditMode ? 'Update' : 'Submit') : 'Next'}
                <ChevronRight className="w-5 h-5 ml-2" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default SellOthersMain