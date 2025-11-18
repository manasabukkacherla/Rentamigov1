"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import { Building2, MapPin, Calendar, Image, Store, ChevronLeft, ChevronRight, Loader2, DollarSign } from "lucide-react"
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
import { useNavigate, useParams } from "react-router-dom"
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

interface FlatAmenitiesType {
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

interface SocietyAmenitiesType {
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

// UPDATED: Match the ResidentialPropertyMediaUpload component interface
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

interface RestrictionsType {
  foodPreference: string;
  petsAllowed: string;
  tenantType: string;
}

interface PriceDetails {
  propertyPrice: number;
  pricetype: string;
}

interface Registration {
  chargestype: string;
  registrationAmount?: number;
  stampDutyAmount?: number;
}

interface BrokerageType {
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
  propertyId?: string;
  basicInformation: IBasicInformation;
  propertySize: number;
  propertyDetails: PropertyDetails;
  restrictions: RestrictionsType;
  priceDetails: PriceDetails;
  registration: Registration;
  brokerage: BrokerageType;
  flatAmenities: FlatAmenitiesType;
  societyAmenities: SocietyAmenitiesType;
  availability: {
    type: "immediate" | "specific";
    date: string;
  };
  media: IMedia;
  metadata: IMetadata;
}

const SellIndependentHouse = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const param = useParams()
  const propertyId = param.propertyId
  const [isEditMode, setIsEditMode] = useState(false)
  const formRef = useRef<HTMLDivElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

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
    priceDetails: {
      propertyPrice: 0,
      pricetype: ""
    },
    registration: {
      chargestype: "",
      registrationAmount: 0,
      stampDutyAmount: 0
    },
    brokerage: {
      required: "",
      amount: 0
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

  // Fetch property data for editing
  useEffect(() => {
    const fetchIndependentHouseById = async () => {
      console.log("🔄 Fetching property data for ID:", propertyId);
      
      if (!propertyId) {
        setIsEditMode(false);
        return;
      }

      try {
        setLoading(true);
        const res = await axios.get(`/api/residential/sale/independenthouse/${propertyId}`);
        console.log("📦 API Response:", res.data);
        
        if (res.data && res.data.success) {
          const property = res.data.data;
          console.log("🏠 Property data loaded:", property);

          // Convert media data to match component's expected format
          const convertMediaToComponentFormat = (mediaData: any): IMedia => {
            if (!mediaData) {
              console.log("📸 No media data found, using initial state");
              return initialFormData.media;
            }

            const convertedMedia = {
              photos: {
                exterior: mediaData.photos?.exterior || [],
                interior: mediaData.photos?.interior || [],
                floorPlan: mediaData.photos?.floorPlan || [],
                washrooms: mediaData.photos?.washrooms || [],
                lifts: mediaData.photos?.lifts || [],
                emergencyExits: mediaData.photos?.emergencyExits || [],
                bedrooms: mediaData.photos?.bedrooms || [],
                halls: mediaData.photos?.halls || [],
                storerooms: mediaData.photos?.storerooms || [],
                kitchen: mediaData.photos?.kitchen || []
              },
              videoTour: mediaData.videoTour || undefined,
              documents: mediaData.documents || []
            };

            console.log("🔄 Converted media data:", convertedMedia);
            return convertedMedia;
          };

          const updatedFormData = {
            ...initialFormData,
            propertyId: property.propertyId,
            basicInformation: property.basicInformation || initialFormData.basicInformation,
            propertySize: property.propertySize || initialFormData.propertySize,
            propertyDetails: property.propertyDetails || initialFormData.propertyDetails,
            restrictions: property.restrictions || initialFormData.restrictions,
            priceDetails: property.priceDetails || initialFormData.priceDetails,
            registration: property.registration || initialFormData.registration,
            brokerage: property.brokerage || initialFormData.brokerage,
            flatAmenities: property.flatAmenities || initialFormData.flatAmenities,
            societyAmenities: property.societyAmenities || initialFormData.societyAmenities,
            availability: property.availability || initialFormData.availability,
            media: convertMediaToComponentFormat(property.media),
            metadata: property.metadata || initialFormData.metadata
          };

          setFormData(updatedFormData);
          setIsEditMode(true);
          console.log("✅ Form data populated for editing");
          
        } else {
          console.log("❌ No success in response");
          setIsEditMode(false);
        }
      } catch (error) {
        console.error("❌ Error fetching property:", error);
        toast.error("Failed to load property data");
        setIsEditMode(false);
      } finally {
        setLoading(false);
      }
    };

    fetchIndependentHouseById();
  }, [propertyId]);

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
            ...newAddress.location
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

  const handleMediaChange = useCallback((newMedia: IMedia) => {
    console.log("🔄 Media changed in form:", newMedia);
    setFormData(prev => ({ 
      ...prev, 
      media: newMedia 
    }));
    setError(null);
  }, []);

  // Convert File to Base64
  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  // Prepare media for submission
  const prepareMediaForSubmission = async (media: IMedia) => {
    console.log("🔄 Preparing media for submission:", media);

    // Helper function to convert files to base64
    const convertFilesToBase64 = async (items: (File | string)[]): Promise<string[]> => {
      const results: string[] = [];
      
      for (const item of items) {
        if (item instanceof File) {
          try {
            console.log("📤 Converting file to base64:", item.name);
            const base64 = await convertFileToBase64(item);
            results.push(base64);
          } catch (error) {
            console.error('❌ Error converting file to base64:', error);
            throw new Error(`Failed to process file: ${item.name}`);
          }
        } else if (typeof item === 'string') {
          // Already a URL string, keep as is
          console.log("📋 Keeping existing URL:", item);
          results.push(item);
        }
      }
      
      return results;
    };

    try {
      const preparedMedia = {
        photos: {
          exterior: await convertFilesToBase64(media.photos.exterior),
          interior: await convertFilesToBase64(media.photos.interior),
          floorPlan: await convertFilesToBase64(media.photos.floorPlan),
          washrooms: await convertFilesToBase64(media.photos.washrooms),
          lifts: await convertFilesToBase64(media.photos.lifts),
          emergencyExits: await convertFilesToBase64(media.photos.emergencyExits),
          bedrooms: await convertFilesToBase64(media.photos.bedrooms),
          halls: await convertFilesToBase64(media.photos.halls),
          storerooms: await convertFilesToBase64(media.photos.storerooms),
          kitchen: await convertFilesToBase64(media.photos.kitchen)
        },
        videoTour: media.videoTour 
          ? (media.videoTour instanceof File 
            ? await convertFileToBase64(media.videoTour)
            : media.videoTour)
          : null,
        documents: await convertFilesToBase64(media.documents)
      };

      console.log("✅ Media prepared successfully:", preparedMedia);
      return preparedMedia;
    } catch (error) {
      console.error("❌ Error preparing media:", error);
      throw error;
    }
  };

  // Create new property
  const handleCreate = async () => {
    try {
      const user = sessionStorage.getItem('user');
      if (!user) {
        toast.error('Please login to continue');
        navigate('/login');
        return;
      }

      const author = JSON.parse(user).id;

      // Validate required fields
      if (!formData.basicInformation.title) {
        toast.error('Please enter a property title');
        return;
      }

      if (!formData.basicInformation.address.street) {
        toast.error('Please enter property address');
        return;
      }

      console.log("🔄 Starting property creation...");
      
      // Convert media files
      const convertedMedia = await prepareMediaForSubmission(formData.media);

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

      console.log("📤 Submitting data to API...");
      const response = await axios.post('/api/residential/sale/independenthouse', transformedData, {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 30000
      });

      console.log("✅ API Response:", response.data);

      if (response.data.success) {
        toast.success('Property listing created successfully!');
        setFormData(initialFormData);
        navigate('/updatepropertyform');
      } else {
        throw new Error(response.data.message || 'Failed to create property');
      }
    } catch (error: any) {
      console.error('❌ Error creating property:', error);
      throw error;
    }
  };

 const handleUpdate = async () => {
  try {
    if (!propertyId) {
      toast.error('Property ID is missing');
      return;
    }

    const user = sessionStorage.getItem('user');
    if (!user) {
      toast.error('Please login to continue');
      navigate('/login');
      return;
    }

    const author = JSON.parse(user).id; // Get the user ID

    if (!formData.basicInformation.title) {
      toast.error('Please enter a property title');
      return;
    }

    console.log("🔄 Starting property update...");
    
    const convertedMedia = await prepareMediaForSubmission(formData.media);

    const transformedData = {
      ...formData,
      userId: author, // ✅ Add userId to the request body for authorization
      media: convertedMedia,
      metadata: {
        ...formData.metadata,
        updatedAt: new Date(),
      }
    };

    // Remove propertyId from body since it's in the URL
    delete transformedData.propertyId;

    console.log("📤 Updating property via API...");
    const response = await axios.put(`/api/residential/sale/independenthouse/${propertyId}`, transformedData, {
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 30000
    });

    console.log("✅ Update API Response:", response.data);

    if (response.data.success) {
      toast.success('Property updated successfully!');
      navigate('/updatepropertyform');
    } else {
      throw new Error(response.data.message || 'Failed to update property');
    }
  } catch (error: any) {
    console.error('❌ Error updating property:', error);
    throw error;
  }
};
  // Handle submission errors
  const handleSubmissionError = (error: any) => {
    console.error("❌ Submission error details:", error);
    
    if (error.response) {
      console.error('Server response error:', error.response.data);
      const errorData = error.response.data;

      if (errorData.errors) {
        console.error('Validation errors:', errorData.errors);
        const errorMessages: string[] = [];

        if (typeof errorData.errors === 'object') {
          Object.entries(errorData.errors).forEach(([field, details]: [string, any]) => {
            console.error(`Field ${field} error:`, details);
            const message = details.message || details.properties?.message || `${field} is invalid`;
            errorMessages.push(`${field}: ${message}`);
          });
        } else if (typeof errorData.message === 'string') {
          errorMessages.push(errorData.message);
        }

        const errorMessage = errorMessages.join('\n');
        toast.error(`Validation errors: ${errorMessage}`);
      } else if (errorData.message) {
        toast.error(errorData.message);
      } else {
        toast.error('Server error. Please try again.');
      }
    } else if (error.request) {
      console.error('No response received:', error.request);
      toast.error('No response from server. Please check your connection.');
    } else if (error.message) {
      console.error('Error message:', error.message);
      toast.error(error.message);
    } else {
      console.error('Unknown error:', error);
      toast.error('Failed to process your request. Please try again.');
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);
    console.log('🔄 Starting form submission...');
    console.log('🎯 Edit mode:', isEditMode);
    console.log('📝 Form data overview:', {
      title: formData.basicInformation.title,
      address: formData.basicInformation.address.street,
      mediaCounts: {
        exterior: formData.media.photos.exterior.length,
        interior: formData.media.photos.interior.length,
        videoTour: formData.media.videoTour ? 'exists' : 'none',
        documents: formData.media.documents.length
      }
    });

    try {
      if (isEditMode && propertyId) {
        await handleUpdate();
      } else {
        await handleCreate();
      }
    } catch (error: any) {
      console.error('❌ Error in form submission:', error);
      handleSubmissionError(error);
      setError(error.message || `Failed to ${isEditMode ? 'update' : 'create'} independent house listing`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNext = () => {
    if (currentStep < formSections.length) {
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
    if (currentStep > 1) {
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

  // Debug component to see media state
  const MediaDebugInfo = () => (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
      <h3 className="font-bold text-blue-800 mb-2">Media Debug Info:</h3>
      <div className="text-sm text-blue-700">
        <p><strong>Edit Mode:</strong> {isEditMode ? 'Yes' : 'No'}</p>
        <p><strong>Property ID:</strong> {propertyId || 'None'}</p>
        <p><strong>Media Counts:</strong></p>
        <ul className="ml-4">
          <li>Exterior Photos: {formData.media.photos.exterior.length}</li>
          <li>Interior Photos: {formData.media.photos.interior.length}</li>
          <li>Floor Plans: {formData.media.photos.floorPlan.length}</li>
          <li>Washrooms: {formData.media.photos.washrooms.length}</li>
          <li>Video Tour: {formData.media.videoTour ? 'Exists' : 'None'}</li>
          <li>Documents: {formData.media.documents.length}</li>
        </ul>
        <details className="mt-2">
          <summary className="cursor-pointer font-medium">View Full Media Data</summary>
          <pre className="text-xs overflow-auto mt-2 bg-white p-2 rounded border">
            {JSON.stringify(formData.media, null, 2)}
          </pre>
        </details>
      </div>
    </div>
  );

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
          {/* Debug info - you can remove this after confirming media works */}
          <MediaDebugInfo />
          
          <div className="space-y-8">
            <ResidentialPropertyMediaUpload
              propertyType="independenthouse"
              propertyId={propertyId}
              value={formData.media}
              onChange={handleMediaChange}
            />
          </div>
        </div>
      ),
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin h-12 w-12 mx-auto text-black" />
          <p className="mt-4 text-black">Loading property data...</p>
        </div>
      </div>
    );
  }

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
          <h1 className="text-2xl sm:text-3xl font-bold text-black">
            {isEditMode ? 'Edit Independent House' : 'List Your Independent House'}
          </h1>
          {isEditMode && (
            <p className="text-green-600 mt-2">You are editing an existing property. Changes will be updated.</p>
          )}
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
            disabled={currentStep === 1}
            className={`flex items-center px-6 py-2 rounded-lg border border-black/20 transition-all duration-200 ${currentStep === 1
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
                {isEditMode ? 'Updating...' : 'Submitting...'}
              </>
            ) : (
              <>
                {currentStep === formSections.length ? (isEditMode ? 'Update' : 'Submit') : 'Next'}
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
    </div>
  );
};

export default SellIndependentHouse;