"use client"

import { useState,useEffect, useRef, AwaitedReactNode, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal } from "react"
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
import { useNavigate, Navigate, useParams } from "react-router-dom"


// --- Types for strong typing and error-free state updates ---

type ContactInformation = {
  name: string;
  email: string;
  phone: string;
  alternatePhone: string;
  bestTimeToContact: string;
};

type SpaceDetails = {
  totalArea: string;
  areaUnit: string;
  coveredArea: string;
  openArea: string;
  roadWidth: string;
  ceilingHeight: string;
  openSides: string;
};

type FormDataType = {
   propertyId?: string;
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
  propertyDetails: {
    area: {
      totalArea: number;
      builtUpArea: number;
      carpetArea: number;
    };
    floor: {
      floorNumber: number;
      totalFloors: number;
    };
    facingDirection: string;
    furnishingStatus: string;
    propertyAmenities: string[];
    wholeSpaceAmenities: string[];
    electricitySupply: {
      powerLoad: number;
      backup: boolean;
    };
    waterAvailability: string;
    propertyAge: string;
    propertyCondition: string;
  };
  registration: {
    chargestype: string;
    registrationAmount: number;
    stampDutyAmount: number;
  };
  pricingDetails: {
    propertyPrice: number;
    pricetype: string;
  };
  brokerage: {
    required: string;
    amount: number;
  };
  availability: {
    type: string;
    isPetsAllowed: boolean;
    operatingHours: boolean;
    noticePeriod: string;
    date: string;
    preferredSaleDuration: string;
  };
  contactInformation: ContactInformation;
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
};

const SellCoveredSpaceMain = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

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
    spaceDetails: {
      totalArea: "",
      areaUnit: "",
      coveredArea: "",
      openArea: "",
      roadWidth: "",
      ceilingHeight: "",
      openSides: "",
    },
    propertyDetails: {
      area: {
        totalArea: 0,
        builtUpArea: 0,
        carpetArea: 0,
      },
      floor: {
        floorNumber: 0,
        totalFloors: 0,
      },
      facingDirection: "",
      furnishingStatus: "",
      propertyAmenities: [],
      wholeSpaceAmenities: [],
      electricitySupply: {
        powerLoad: 0,
        backup: false,
      },
      waterAvailability: "",
      propertyAge: "",
      propertyCondition: "",
    },
    registration: {
      chargestype: "",
      registrationAmount: 0,
      stampDutyAmount: 0,
    },
    pricingDetails: {
      propertyPrice: 0,
      pricetype: "",
    },
    brokerage: {
      required: "",
      amount: 0
    },
    availability: {
      type: "immediate",
      isPetsAllowed: false,
      operatingHours: false,
      noticePeriod: "",
      date: "",
      preferredSaleDuration: "",
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
      videoTour: null as File | null,
      documents: [] as File[]
    },
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

   const params = useParams()
   const propertyId = params.propertyId;
    const [currentStep, setCurrentStep] = useState(0);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const formRef = useRef<HTMLDivElement>(null)

  // Helper to convert File[] to string[] (simulate upload, or use URLs if already uploaded)
  const filesToUrls = (files: File[]): string[] => {
    // In production, you should upload the file and get the URL from the server
    // Here, we use a placeholder or local URL
    return files
      .filter(f => !!f)
      .map(f => (typeof f === 'string' ? f : URL.createObjectURL(f)));
  };
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

    console.log("Fetching Commercial Covered Space details for:", propertyId);
    setLoading(true);
    try {
      const response = await axios.get(`/api/commercial/sale/coveredspace/${propertyId}`);
      
      if (response.data && response.data.data) {
        const sellcoveredData = response.data.data;
        
        // Transform the backend data to match frontend form structure
        setFormData((prev) => ({
          ...prev,
          propertyId: sellcoveredData.propertyId || '',
          basicInformation: {
            title: sellcoveredData.basicInformation?.title || '',
            Type: sellcoveredData.basicInformation?.Type || [],
            address: {
              street: sellcoveredData.basicInformation?.address?.street || '',
              city: sellcoveredData.basicInformation?.address?.city || '',
              state: sellcoveredData.basicInformation?.address?.state || '',
              zipCode: sellcoveredData.basicInformation?.address?.zipCode || ''
            },
            landmark: sellcoveredData.basicInformation?.landmark || '',
            location: {
              latitude: sellcoveredData.basicInformation?.location?.latitude?.toString() || '',
              longitude: sellcoveredData.basicInformation?.location?.longitude?.toString() || ''
            },
            isCornerProperty: sellcoveredData.basicInformation?.isCornerProperty || false
          },
          spaceDetails: {
            totalArea: sellcoveredData.spaceDetails?.totalArea?.toString() || '',
            areaUnit: sellcoveredData.spaceDetails?.areaUnit || '',
            coveredArea: sellcoveredData.spaceDetails?.coveredArea?.toString() || '',
            openArea: sellcoveredData.spaceDetails?.openArea?.toString() || '',
            roadWidth: sellcoveredData.spaceDetails?.roadWidth?.value?.toString() || 
                      sellcoveredData.spaceDetails?.roadWidth?.toString() || '',
            ceilingHeight: sellcoveredData.spaceDetails?.ceilingHeight?.value?.toString() || 
                          sellcoveredData.spaceDetails?.ceilingHeight?.toString() || '',
            openSides: sellcoveredData.spaceDetails?.noOfOpenSides?.toString() || 
                      sellcoveredData.spaceDetails?.openSides?.toString() || ''
          },
          propertyDetails: {
            area: {
              totalArea: sellcoveredData.propertyDetails?.area?.totalArea || 0,
              builtUpArea: sellcoveredData.propertyDetails?.area?.builtUpArea || 0,
              carpetArea: sellcoveredData.propertyDetails?.area?.carpetArea || 0
            },
            floor: {
              floorNumber: sellcoveredData.propertyDetails?.floor?.floorNumber || 0,
              totalFloors: sellcoveredData.propertyDetails?.floor?.totalFloors || 0
            },
            facingDirection: sellcoveredData.propertyDetails?.facingDirection || '',
            furnishingStatus: sellcoveredData.propertyDetails?.furnishingStatus || '',
            propertyAmenities: sellcoveredData.propertyDetails?.propertyAmenities || [],
            wholeSpaceAmenities: sellcoveredData.propertyDetails?.wholeSpaceAmenities || [],
            electricitySupply: {
              powerLoad: sellcoveredData.propertyDetails?.electricitySupply?.powerLoad || 0,
              backup: sellcoveredData.propertyDetails?.electricitySupply?.backup || false
            },
            waterAvailability: Array.isArray(sellcoveredData.propertyDetails?.waterAvailability) 
              ? sellcoveredData.propertyDetails.waterAvailability[0] || ''
              : sellcoveredData.propertyDetails?.waterAvailability || '',
            propertyAge: sellcoveredData.propertyDetails?.propertyAge || '',
            propertyCondition: sellcoveredData.propertyDetails?.propertyCondition || ''
          },
          pricingDetails: {
            propertyPrice: sellcoveredData.pricingDetails?.propertyPrice || 0,
            pricetype: sellcoveredData.pricingDetails?.pricetype || ''
          },
          registration: {
            chargestype: sellcoveredData.registration?.chargestype || '',
            registrationAmount: sellcoveredData.registration?.registrationAmount || 0,
            stampDutyAmount: sellcoveredData.registration?.stampDutyAmount || 0
          },
          brokerage: {
            required: sellcoveredData.brokerage?.required || '',
            amount: sellcoveredData.brokerage?.amount || 0
          },
          availability: {
            type: sellcoveredData.availability?.type || 'immediate',
            isPetsAllowed: sellcoveredData.availability?.isPetsAllowed || false,
            operatingHours: sellcoveredData.availability?.operatingHours || false,
            noticePeriod: sellcoveredData.availability?.noticePeriod || '',
            date: sellcoveredData.availability?.date ? 
                  new Date(sellcoveredData.availability.date).toISOString().split('T')[0] : '',
            preferredSaleDuration: sellcoveredData.availability?.preferredSaleDuration || ''
          },
          contactInformation: {
            name: sellcoveredData.contactInformation?.name || '',
            email: sellcoveredData.contactInformation?.email || '',
            phone: sellcoveredData.contactInformation?.phone || '',
            alternatePhone: sellcoveredData.contactInformation?.alternatePhone || '',
            bestTimeToContact: sellcoveredData.contactInformation?.bestTimeToContact || ''
          },
          // Note: Media files need special handling - you might need to fetch them separately
          // or convert URLs to File objects if needed for editing
          media: {
            photos: {
              exterior: sellcoveredData.media?.photos?.exterior || [],
              interior: sellcoveredData.media?.photos?.interior || [],
              floorPlan: sellcoveredData.media?.photos?.floorPlan || [],
              washrooms: sellcoveredData.media?.photos?.washrooms || [],
              lifts: sellcoveredData.media?.photos?.lifts || [],
              emergencyExits: sellcoveredData.media?.photos?.emergencyExits || []
            },
            videoTour: sellcoveredData.media?.videoTour || null,
            documents: sellcoveredData.media?.documents || []
          }
        }));

        console.log('Form data set successfully:', sellcoveredData);
      } else {
        toast.error('No data found for this property');
        navigate('/properties');
      }
    } catch (error: any) {
      console.error('Error fetching property details:', error);
      toast.error('Failed to load property details');
      navigate('/Userdashboard/properties');
    } finally {
      setLoading(false);
    }
  };

  if (propertyId) {
    fetchById();
  }
}, [propertyId, navigate]);

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
              onSpaceTypeChange={(Type: string[]) =>
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
            <Price onPriceChange={(price) => {
              setFormData(prev => ({
                ...prev,
                pricingDetails: {
                  ...prev.pricingDetails,
                  propertyPrice: price.propertyPrice,
                  pricetype: price.pricetype,
                }
              }));
            }} />
          </div>
          <div className="text-black">
            <RegistrationCharges onRegistrationChargesChange={(charges) => {
              setFormData(prev => ({
                ...prev,
                registration: {
                  chargestype: charges.chargestype,
                  registrationAmount: charges.registrationAmount,
                  stampDutyAmount: charges.stampDutyAmount,
                }
              }));
            }} />
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
            contactInformation={formData.contactInformation}
            onContactChange={(contact) => handleChange('contactInformation', contact)} />
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
  
  setLoading(true);
  console.log('Form Data:', formData);

  try {
    const user = sessionStorage.getItem('user');
    if (!user) {
      toast.error('Please log in to continue');
      navigate('/login');
      return;
    }

    const userData = JSON.parse(user);
    const author = userData.id;

    const submitData = {
      ...formData,
      basicInformation: {
        ...formData.basicInformation,
        location: {
          latitude: String(formData.basicInformation.location.latitude),
          longitude: String(formData.basicInformation.location.longitude)
        }
      },
      availability: {
        type: formData.availability.type || 'immediate',
        date: formData.availability.date,
        preferredSaleDuration: formData.availability.preferredSaleDuration,
        noticePeriod: formData.availability.noticePeriod,
        isPetsAllowed: formData.availability.isPetsAllowed || false,
        operatingHours: formData.availability.operatingHours || false
      },
      brokerage: {
        required: formData.brokerage.required || 'no',
        amount: Number(formData.brokerage.amount) || 0
      },
      metadata: {
        createdBy: author,
        createdAt: new Date().toISOString(),
        propertyType: 'Commercial',
        propertyName: 'Covered Space',
        intent: 'Sell',
        status: 'Available'
      }
    };

    let response;
    if (propertyId) {
      // Update existing property
      console.log('Updating property:', propertyId);
      response = await axios.put(`/api/commercial/sale/coveredspace/${propertyId}`, {
        data: submitData
      });
    } else {
      // Create new property
      console.log('Creating new property');
      response = await axios.post('/api/commercial/sale/coveredspace', submitData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
 const safelocation = {
          latitude: typeof formData.basicInformation.location.latitude === 'string'
            ? parseFloat(formData.basicInformation.location.latitude) || 0
            : formData.basicInformation.location.latitude || 0,
          longitude: typeof formData.basicInformation.location.longitude === 'string'
            ? parseFloat(formData.basicInformation.location.longitude) || 0
            : formData.basicInformation.location.longitude || 0
        };

        const updatedFormData = {
          ...formData,
          basicInformation: {
            ...formData.basicInformation,
            location: safelocation,
          }
        };
        console.log("Updated form data:", JSON.stringify(updatedFormData));

    if (response.data.success) {
      toast.success(propertyId ? "Property updated successfully!" : "Property listed successfully!");
      navigate('/Userdashboard/properties');
    } else {
      throw new Error(response.data.error || (propertyId ? 'Failed to update property' : 'Failed to list property'));
    }
  } catch (error: any) {
    console.error('Error submitting form:', error);
    
    if (error.response) {
      console.error('Server response error:', error.response.data);
      toast.error(error.response.data.details?.[0] || error.response.data.error || 
                 (propertyId ? 'Failed to update property' : 'Failed to list property'));
    } else if (error.request) {
      console.error('No response received:', error.request);
      toast.error('No response from server. Please check your connection.');
    } else {
      toast.error(error.message || (propertyId ? 'Failed to update property' : 'Failed to list property'));
    }
  } finally {
    setLoading(false);
  }
};
// Add this inside your return statement, before the progress indicator
if (loading && propertyId) {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
        <p className="text-gray-600">Loading property details...</p>
      </div>
    </div>
  );
}
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
