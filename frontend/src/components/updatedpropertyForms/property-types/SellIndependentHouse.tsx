"use client"

import { useState, useCallback, useRef } from "react"
import { Building2, MapPin, IndianRupee, Calendar, Image, Ruler, Home, Store, ChevronLeft, ChevronRight, Loader2, DollarSign } from "lucide-react"
import PropertyName from "../PropertyName"
import PropertyAddress from "../IndependentPropertyAddress"
import PropertySize from "../PropertySize"
import PropertyFeatures from "../PropertyFeatures"
import FlatAmenities from "../FlatAmenities"
import SocietyAmenities from "../SocietyAmenities"
import ResidentialPropertyMediaUpload from "../ResidentialPropertyMediaUpload"
import AvailabilityDate from "../AvailabilityDate"
import Restrictions from "../Restrictions"
import axios from "axios"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import RegistrationCharges from "../sell/RegistrationCharges"
import Price from "../sell/Price"
import Brokerage from "../residentialrent/Brokerage"

interface Address {
  houseNo: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  pinCode: string;
  location: {
    latitude: string;
    longitude: string;
  };
}

interface IBasicInformation {
  title: string;
  address: {
    houseName: string;    
    street: string;
    city: string;
    state: string;
    zipCode: string;
    pinCode: string;
    location: {
      latitude: string;
      longitude: string;
    };
  };
}

interface PropertyDetails {
  bedrooms: number;
  washrooms: number;
  balconies: number;
  hasParking: boolean;
  parkingDetails: {
    twoWheeler: number;
    fourWheeler: number;
  };
  extraRooms: {
    servant: boolean;
    puja: boolean;
    store: boolean;
    others: boolean;
  };
  utilityArea: string;
  furnishingStatus: string;
  totalFloors: number;
  propertyOnFloor: number;
  facing: string;
  propertyAge: string;
  superBuiltUpAreaSqft: number;
  superBuiltUpAreaSqmt: number;
  builtUpAreaSqft: number;
  builtUpAreaSqmt: number;
  carpetAreaSqft: number;
  carpetAreaSqmt: number;
  electricityAvailability: string;
  waterAvailability: {
    borewell: boolean;
    governmentSupply: boolean;
    tankerSupply: boolean;
  };
}

interface FlatAmenities {
  lights: number;
  ceilingFan: number;
  geysers: number;
  chimney: boolean;
  callingBell: boolean;
  wardrobes: number;
  lofts: number;
  kitchenCabinets: number;
  clothHanger: number;
  pipedGasConnection: boolean;
  gasStoveWithCylinder: boolean;
  ironingStand: boolean;
  bathtub: boolean;
  shower: boolean;
  sofa: boolean;
  coffeeTable: boolean;
  tvUnit: boolean;
  diningTableWithChairs: number;
  cotWithMattress: number;
  sideTable: number;
  studyTableWithChair: number;
  television: boolean;
  refrigerator: boolean;
  washingMachine: boolean;
  dishwasher: boolean;
  waterPurifier: boolean;
  microwaveOven: boolean;
  inductionCooktop: boolean;
  gasStove: boolean;
  airConditioner: number;
  desertCooler: number;
  ironBox: boolean;
  exhaustFan: number;
}

interface SocietyAmenities {
  powerutility: string[];
  parkingtranspotation: string[];
  recreationalsportsfacilities: string[];
  childrenfamilyamenities: string[];
  healthwellnessfacilities: string[];
  shoppingconviencestores: string[];
  ecofriendlysustainable: string[];
  communityculturalspaces: string[];
  smarthometechnology: string[];
  otheritems: string[];
}

interface IMedia {
  photos: {
    exterior: (File | string)[];
    interior: (File | string)[];
    floorPlan: (File | string)[];
    washrooms: (File | string)[];
    lifts: (File | string)[];
    emergencyExits: (File | string)[];
    bedrooms: (File | string)[];
    halls: (File | string)[];
    storerooms: (File | string)[];
    kitchen: (File | string)[];
  };
  videoTour?: File | string;
  documents: (File | string)[];
}

interface PropertySize {
  superBuiltUpAreaSqft: number;
  superBuiltUpAreaSqmt: number;
  builtUpAreaSqft: number;
  builtUpAreaSqmt: number;
  carpetAreaSqft: number;
  carpetAreaSqmt: number;
}

interface Restrictions {
  foodPreference: string;
  petsAllowed: string;
  tenantType: string;
}
interface priceDetails {
  propertyPrice: number;
  pricetype: string;
}
interface registration {
  chargestype: string;
  registrationAmount?: number;
  stampDutyAmount?: number;
}
interface brokerage {
  required: string;
  amount?: number;
}

interface IMetadata {
  createdBy: string;
  createdAt: Date;
  propertyType: string;
  propertyName: string;
  intent: string;
  status: string;
}

interface FormData {
  basicInformation: IBasicInformation;
  propertySize: number;
  propertyDetails: PropertyDetails;
  restrictions: Restrictions;
  priceDetails: priceDetails;
  registration: registration;
  brokerage: brokerage;
  flatAmenities: FlatAmenities;
  societyAmenities: SocietyAmenities;
  availability: {
    type: "immediate" | "specific";
    date: string;
  };
  media: IMedia;
  metadata: IMetadata;
}

interface PropertyNameProps {
  title: string
  onPropertyNameChange: (name: string) => void
}

interface MapSelectorProps {
  latitude: string
  longitude: string
  onLocationSelect: (lat: string, lng: string, address?: any) => void
  initialShowMap?: boolean
}

interface PropertySizeProps {
  onPropertySizeChange: (size: string) => void
}

interface PropertyFeaturesProps {
  onFeaturesChange?: (features: Record<string, any>) => void
}

interface FlatAmenitiesProps {
  amenities: string[]
  onChange: (amenities: string[]) => void
}

interface SocietyAmenitiesProps {
  amenities: string[]
  onChange: (amenities: string[]) => void
}

interface RestrictionsProps {
  restrictions: string[]
  onChange: (restrictions: string[]) => void
}

interface AvailabilityDateProps {
  date: Date
  onChange: (date: Date) => void
}

interface PropertyAddressType {
 houseNo?: string
  street?: string
  city?: string
  state?: string
  zipCode?: string
  pincode?: string
  coordinates?: {
    lat: number
    lng: number
  }
  locationLabel?: string
}

interface MediaUploadProps {
  onMediaChange?: (media: {
    exteriorViews: File[];
    interiorViews: File[];
    floorPlan: File[];
    washrooms: File[];
    lifts: File[];
    emergencyExits: File[];
    videoTour?: File;
    legalDocuments: File[];
  }) => void;
}

const SellIndependentHouse = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [propertyId, setPropertyId] = useState<string | undefined>()
  const formRef = useRef<HTMLDivElement>(null)

  const initialFormData: FormData = {
    basicInformation: {
      title: "",
      address: {
        houseName: "",    
        street: "",
        city: "",
        state: "",
        zipCode: "",
        pinCode: "",
        location: {
          latitude: "",
          longitude: ""
        }
      }
    },
    propertySize: 0,
    propertyDetails: {
      bedrooms: 0,
      washrooms: 0,
      balconies: 0,
      hasParking: false,
      parkingDetails: {
        twoWheeler: 0,
        fourWheeler: 0
      },
      extraRooms: {
        servant: false,
        puja: false,
        store: false,
        others: false
      },
      utilityArea: "",
      furnishingStatus: "",
      totalFloors: 0,
      propertyOnFloor: 0,
      facing: "",
      propertyAge: "",
      superBuiltUpAreaSqft: 0,
      superBuiltUpAreaSqmt: 0,
      builtUpAreaSqft: 0,
      builtUpAreaSqmt: 0,
      carpetAreaSqft: 0,
      carpetAreaSqmt: 0,
      electricityAvailability: "",
      waterAvailability: {
        borewell: false,
        governmentSupply: false,
        tankerSupply: false
      }
    },
    restrictions: {
      foodPreference: "",
      petsAllowed: "",
      tenantType: ""
    },
    flatAmenities: {
      lights: 0,
      ceilingFan: 0,
      geysers: 0,
      chimney: false,
      callingBell: false,
      wardrobes: 0,
      lofts: 0,
      kitchenCabinets: 0,
      clothHanger: 0,
      pipedGasConnection: false,
      gasStoveWithCylinder: false,
      ironingStand: false,
      bathtub: false,
      shower: false,
      sofa: false,
      coffeeTable: false,
      tvUnit: false,
      diningTableWithChairs: 0,
      cotWithMattress: 0,
      sideTable: 0,
      studyTableWithChair: 0,
      television: false,
      refrigerator: false,
      washingMachine: false,
      dishwasher: false,
      waterPurifier: false,
      microwaveOven: false,
      inductionCooktop: false,
      gasStove: false,
      airConditioner: 0,
      desertCooler: 0,
      ironBox: false,
      exhaustFan: 0
    },
    societyAmenities: {
      powerutility: [],
      parkingtranspotation: [],
      recreationalsportsfacilities: [],
      childrenfamilyamenities: [],
      healthwellnessfacilities: [],
      shoppingconviencestores: [],
      ecofriendlysustainable: [],
      communityculturalspaces: [],
      smarthometechnology: [],
      otheritems: []
    },
    priceDetails:{
      propertyPrice:0,
      pricetype:""
    },
    registration:{
      chargestype:"",
      registrationAmount:0,
      stampDutyAmount:0
    },
    brokerage:{
      required:"",
      amount:0
    },
    availability: {
      type: "immediate",
      date: "",
    },
    media: {
      photos: {
        exterior: [],
        interior: [],
        floorPlan: [],
        washrooms: [],
        lifts: [],
        emergencyExits: [],
        bedrooms: [],
        halls: [],
        storerooms: [],
        kitchen: []
      },
      videoTour: undefined,
      documents: []
    },
    metadata: {
      createdBy: "",
      createdAt: new Date(),
      propertyType: "Residential",
      propertyName: "Independent House",
      intent: "Sale",
      status: "Active"
    }
  };

  const [formData, setFormData] = useState<FormData>(initialFormData);

  const handleAddressChange = useCallback((newAddress: Address) => {
    setFormData(prev => ({
      ...prev,
      basicInformation: {
        ...prev.basicInformation,
        address: {
          ...prev.basicInformation.address,
          ...newAddress,
          location: {
            ...prev.basicInformation.address.location,
            ...newAddress.location // <-- This line ensures updated lat/lng are applied
          }
        }
      }
    }));
  }, []);


  const handleLocationSelect = useCallback((lat: string, lng: string, address?: any) => {
    setFormData(prev => ({
      ...prev,
      basicInformation: {
        ...prev.basicInformation,
        address: {
          ...prev.basicInformation.address,
          street: address?.address || prev.basicInformation.address.street,
          city: address?.city || prev.basicInformation.address.city,
          state: address?.state || prev.basicInformation.address.state,
          zipCode: address?.pinCode || prev.basicInformation.address.zipCode,
          location: {
            latitude: lat,
            longitude: lng
          },
        }
      }
    }))
  }, []);

  const handleAvailabilityChange = useCallback((newAvailability: { type: "immediate" | "specific", date?: string }) => {
    setFormData(prev => ({
      ...prev,
      availability: {
        type: newAvailability.type,
        date: newAvailability.date || ""
      }
    }))
  }, []);

  const formSections = [
    {
      title: "Basic Information",
      icon: <Store className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <PropertyName
            propertyName={formData.basicInformation.title}
            onPropertyNameChange={(name: string) => setFormData(prev => ({ ...prev, basicInformation: { ...prev.basicInformation, title: name } }))}
          />
          <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
            <div className="space-y-8">
              <div className="flex items-center mb-8">
                <MapPin className="text-black mr-3" size={28} />
                <h3 className="text-2xl font-semibold text-black">Location Details</h3>
              </div>

              <PropertyAddress
                propertyAddress={formData.basicInformation.address}
                onAddressChange={(newAddress) =>
                  setFormData((prev) => ({
                    ...prev,
                    basicInformation: {
                      ...prev.basicInformation,
                      address: newAddress
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
      title: "Property Details",
      icon: <Building2 className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
            <div className="space-y-8">
              <div className="flex items-center mb-8">
                <Building2 className="text-black mr-3" size={28} />
                <h3 className="text-2xl font-semibold text-black">Property Size</h3>
              </div>
              <div className="[&_input]:text-black [&_input]:placeholder:text-black/60 [&_input]:border-black/20 [&_input]:bg-white [&_input]:focus:border-black [&_input]:focus:ring-black [&_label]:text-black [&_svg]:text-black">
                <PropertySize
                  propertySize={formData.propertySize}
                  onPropertySizeChange={(size: number) => {
                    setFormData(prev => ({
                      ...prev,
                      propertySize: size
                    }));
                  }}
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
              <PropertyFeatures
                onFeaturesChange={(features: Record<string, any>) => {
                  setFormData(prev => ({
                    ...prev,
                    propertyDetails: {
                      ...prev.propertyDetails,
                      ...features
                    }
                  }))
                }}
              />
            </div>


          </div>
          <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
            <Restrictions
              res={formData.restrictions}
              onRestrictionsChange={(restrictions: {
                foodPreference: string;
                petsAllowed: string;
                tenantType: string;
              }) => setFormData(prev => ({
                ...prev,
                restrictions: {
                  ...prev.restrictions,
                  ...restrictions
                }
              }))}
            />
          </div>

          <div className="space-y-6">
            <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
              <div className="space-y-8">
                <div className="flex items-center mb-8">
                  <Building2 className="text-black mr-3" size={28} />
                  <h3 className="text-2xl font-semibold text-black">Amenities</h3>
                </div>

                <div className="space-y-12">
                  <FlatAmenities
                    amenities={formData.flatAmenities}
                    onAmenitiesChange={(amenities) =>
                      setFormData((prev) => ({
                        ...prev,
                        flatAmenities: {
                          ...prev.flatAmenities,
                          ...amenities
                        }
                      }))
                    }
                  />

                  <SocietyAmenities
                    amenities={formData.societyAmenities}
                    onChange={(updatedAmenities) => setFormData((prev) => ({
                      ...prev,
                      societyAmenities: updatedAmenities
                    }))}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Pricing Details",
      icon: <DollarSign className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
            <Price onPriceChange={(price) => setFormData(prev => ({
              ...prev,
              priceDetails: {
                ...prev.priceDetails,
                propertyPrice: price.propertyPrice,
                pricetype: price.pricetype || 'fixed',
              }
            }))} />
            <div className="space-y-4 text-black">
              <div className="text-black">
                <RegistrationCharges
                  onRegistrationChargesChange={(charges) => setFormData(prev => ({
                    ...prev,
                    registration: {
                      ...prev.registration,
                      chargestype: charges.chargestype,
                      registrationAmount: charges.registrationAmount,
                      stampDutyAmount: charges.stampDutyAmount,
                    }
                  }))} />  
              </div>
              <div className="text-black">
                <Brokerage 
                bro={formData.brokerage}
                onBrokerageChange={(brokerage) => setFormData({
                  ...formData,
                  brokerage: {
                      required: brokerage.required || 'No',
                      amount: parseFloat(brokerage.amount?.toString() || '0')
                    }
                  })}
                />
              </div>
            </div>
          </div>
        ),
      },
    
    {
      title: "Availability",
      icon: <Calendar className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
            <div className="space-y-8">
              <AvailabilityDate
                availability={{
                  type: formData.availability.type === "immediate" ? "immediate" : "specific",
                  date: formData.availability.date
                }}
                onAvailabilityChange={handleAvailabilityChange}
              />

            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Property Media",
      icon: <Image className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <div className="space-y-8">
            <ResidentialPropertyMediaUpload
                propertyType="independenthouse"
                propertyId={propertyId}
                value={formData.media}
                onChange={(media) => {
                  setFormData(prev => ({ ...prev, media }));
                  setError(null); // Clear any previous errors
                }}
              />

          </div>
        </div>
      ),
    },
  ];

  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  const handleNext = () => {
    if (currentStep < formSections.length) {
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

  // Add a function to handle media upload errors
  const handleMediaError = (error: any) => {
    console.error('Media upload error:', error);
    setError(error.message || 'Failed to upload media files');
    toast.error(error.message || 'Failed to upload media files');
  };

  // Add a function to handle media upload success
  const handleMediaSuccess = (mediaItems: any[]) => {
    console.log('Media upload success:', mediaItems);
    toast.success(`Successfully uploaded ${mediaItems.length} files`);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);
    console.log('Submitting form data:', formData);

    try {
      const user = sessionStorage.getItem('user');
      if (!user) {
        toast.error('Please login to continue');
        navigate('/login');
        return;
      }

      const author = JSON.parse(user).id;

      // Convert media files to base64
      const convertFileToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = error => reject(error);
        });
      };

      // Helper function to convert array of files to base64
      const convertFilesToBase64 = async (files: (File | string)[]): Promise<string[]> => {
        const results: string[] = [];
        for (const file of files) {
          if (file instanceof File) {
            try {
              const base64 = await convertFileToBase64(file);
              results.push(base64);
            } catch (error) {
              console.error('Error converting file to base64:', error);
              throw new Error('Failed to process media files');
            }
          } else {
            results.push(file); // Already a string (URL)
          }
        }
        return results;
      };

      

      try {
        const convertedMedia = {
          photos: {
            exterior: await convertFilesToBase64(formData.media.photos.exterior),
            interior: await convertFilesToBase64(formData.media.photos.interior),
            floorPlan: await convertFilesToBase64(formData.media.photos.floorPlan),
            washrooms: await convertFilesToBase64(formData.media.photos.washrooms),
            lifts: await convertFilesToBase64(formData.media.photos.lifts),
            emergencyExits: await convertFilesToBase64(formData.media.photos.emergencyExits),
            bedrooms: await convertFilesToBase64(formData.media.photos.bedrooms),
            halls: await convertFilesToBase64(formData.media.photos.halls),
            storerooms: await convertFilesToBase64(formData.media.photos.storerooms),
            kitchen: await convertFilesToBase64(formData.media.photos.kitchen)
          },
          videoTour: formData.media.videoTour 
            ? (formData.media.videoTour instanceof File 
              ? await convertFileToBase64(formData.media.videoTour)
              : formData.media.videoTour)
            : undefined,
          documents: await convertFilesToBase64(formData.media.documents)
        };

        // Update loading toast
        toast.success('Media files processed successfully');

        const transformedData = {
          ...formData,
          media: convertedMedia,
          metadata: {
            createdBy: author,
            createdAt: new Date(),
            propertyType: "Residential",
            propertyName: "Independent House",
            intent: "Sale",
            status: "Active"

          }
        };


        const response = await axios.post('/api/residential/sale/independenthouse', transformedData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (response.data.success) {
          // Set the propertyId from the response
          setPropertyId(response.data.propertyId);
          toast.success('Property listing created successfully!');
          setFormData(initialFormData);
          
          // Scroll to top
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      } catch (error: any) {
        console.error('Error processing media:', error);
        toast.error('Failed to process media files');
        throw error;
      }
    } catch (error: any) {
      console.error('Error submitting form:', error);
      toast.error(error.message || 'Failed to create independent house listing. Please try again.');
      setError(error.message || 'Failed to create independent house listing');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div ref={formRef} className="min-h-screen bg-white">
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex justify-center">
            <div className="flex items-center space-x-2">
              {formSections.map((section, index) => (
                <div
                  key={index}
                  className="flex items-center cursor-pointer"
                  onClick={() => {
                    setCurrentStep(index + 1);
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
                  }}
                >
                  <div className="flex flex-col items-center group">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${index + 1 <= currentStep ? 'bg-black text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                      }`}>
                      {section.icon}
                    </div>
                    <span className={`text-xs mt-1 font-medium transition-colors duration-200 ${index + 1 <= currentStep ? 'text-black' : 'text-gray-500 group-hover:text-gray-700'
                      }`}>
                      {section.title}
                    </span>
                  </div>
                  {index < formSections.length - 1 && (
                    <div className="flex items-center mx-1">
                      <div className={`w-12 h-1 transition-colors duration-200 ${index < currentStep - 1 ? 'bg-black' : 'bg-gray-200'
                        }`} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-black">List Your Independent House</h1>
        </div>
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-black mb-2">{formSections[currentStep - 1].title}</h2>
          <p className="text-gray-600">Please fill in the details for your property</p>
        </div>

        {formSections[currentStep - 1].content}
      </div>

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
            onClick={() => currentStep === formSections.length ? handleSubmit() : handleNext()}
            disabled={isSubmitting}
            className="flex items-center px-6 py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition-all duration-200"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin mr-2 h-5 w-5" />
                Submitting...
              </>
            ) : (
              <>
                {currentStep === formSections.length ? 'Submit' : 'Next'}
                <ChevronRight className="w-5 h-5 ml-2" />
              </>
            )}
          </button>
        </div>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
          {error}
        </div>
      )}
      {success && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-600">
          {success}
        </div>
      )}
    </div>
  );
};

export default SellIndependentHouse;