"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Store, Building2, DollarSign, Calendar, UserCircle, Image as ImageIcon, MapPin, ChevronLeft, ChevronRight, Loader2 } from "lucide-react"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import axios from "axios"
import PropertyName from "../PropertyName"
import PlotType from "../CommercialComponents/PlotType"
import CommercialPropertyAddress from "../CommercialComponents/CommercialPropertyAddress"
import Landmark from "../CommercialComponents/Landmark"
import CornerProperty from "../CommercialComponents/CornerProperty"
import PlotDetails from "../CommercialComponents/PlotDetails"
import LeaseAmount from "../lease/LeaseAmount"
import LeaseTenure from "../lease/LeaseTenure"
import Brokerage from "../residentialrent/Brokerage"
import CommercialAvailability from "../CommercialComponents/CommercialAvailability"
import CommercialContactDetails from "../CommercialComponents/CommercialContactDetails"
import MediaUploadforagriplot from "../Mediauploadforagriplot"
import MapLocation from "../CommercialComponents/MapLocation"

interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

interface Coordinates {
  latitude: string;
  longitude: string;
}

interface Area {
  totalArea?: number;
  carpetArea: number;
  builtUpArea: number;
}

interface Floor {
  floorNumber: number;
  totalFloors: number;
}

interface ElectricitySupply {
  powerLoad: number;
  backup: boolean;
}

interface PropertyDetails {
  area?: Area;
  floor?: Floor;
  facingDirection?: string;
  furnishingStatus?: string;
  propertyAmenities?: string[];
  wholeSpaceAmenities?: string[];
  electricitySupply?: ElectricitySupply;
  waterAvailability?: string;
}

interface PlotDetailsType {
  totalPlotArea: number;
  zoningType: string;
  infrastructure: string[];
  roadAccess: string;
  securityRoom: boolean;
  previousConstruction: string;
  zoningInformation: string;
}

interface LeaseDuration {
  duration: number;
  type: string;
  amountType: "fixed" | "negotiable";
}

interface Tenure {
  duration: number;
  type: string;
}

interface LeaseTenureType {
  minimumTenure: Tenure;
  maximumTenure: Tenure;
  lockInPeriod: Tenure;
  noticePeriod: Tenure;
}

interface MaintenanceCharges {
  amount?: number;
  frequency?: "monthly" | "quarterly" | "half-yearly" | "yearly";
}

interface ChargeDetails {
  type?: "inclusive" | "exclusive";
  amount?: number;
}

interface OtherCharges {
  electricityCharges?: ChargeDetails;
  waterCharges?: ChargeDetails;
  gasCharges?: ChargeDetails;
  otherCharges?: "inclusive" | "exclusive";
  amount?: number;
}

interface LeaseDetails {
  leaseAmount: number;
  leaseduration: LeaseDuration;
  leasetenure: LeaseTenureType;
  maintenanceCharges?: MaintenanceCharges;
  otherCharges?: OtherCharges;
}

interface BrokerageType {
  required?: boolean;
  amount?: number;
}

interface Availability {
  availableFrom?: Date;
  availableImmediately?: boolean;
  availabilityStatus: string;
  leaseDuration?: string;
  noticePeriod?: string;
  isPetsAllowed?: boolean;
  operatingHours?: boolean;
}

interface ContactInformation {
  name: string;
  email: string;
  phone: string;
  alternatePhone?: string;
  bestTimeToContact?: string;
  preferredContactTime?: string;
}

interface MediaPhotos {
  exterior: (File | string)[];
  interior: (File | string)[];
  floorPlan: (File | string)[];
  washroom: (File | string)[];
  lift: (File | string)[];
  emergencyExit: (File | string)[];
}

interface Media {
  photos: MediaPhotos;
  videoTour?: File | string | null;
  documents: (File | string)[];
}

interface IMetadata {
  createdBy: string;
  createdAt: Date;
  propertyType: string;
  propertyName: string;
  intent: string;
  status: string;
  updatedBy?: string;
  updatedAt?: Date;
}

interface FormData {
  propertyId?: string;
  basicInformation: {
    title: string;
    plotType: string[];
    address: Address;
    landmark?: string;
    coordinates: Coordinates;
    isCornerProperty: boolean;
  };
  propertyDetails: PropertyDetails;
  plotDetails: PlotDetailsType;
  leaseDetails: LeaseDetails;
  brokerage?: BrokerageType;
  availability: Availability;
  contactInformation: ContactInformation;
  media: Media;
  metadata: IMetadata;
}

// CORRECTED initial form data for ResidentialSalePlot
const initialFormData: FormData = {
  basicInformation: {
    title: "",
    plotType: [],
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: ""
    },
    landmark: "",
    coordinates: {
      latitude: "",
      longitude: ""
    },
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
    facingDirection: "",
    furnishingStatus: "",
    propertyAmenities: [],
    wholeSpaceAmenities: [],
    waterAvailability: "",
  },
  plotDetails: {
    totalPlotArea: 0,
    zoningType: "residential",
    infrastructure: [],
    roadAccess: "",
    securityRoom: false,
    previousConstruction: "",
    zoningInformation: ""
  },
  leaseDetails: {
    leaseAmount: 0,
    leaseduration: {
      duration: 0,
      type: "month",
      amountType: "fixed"
    },
    leasetenure: {
      minimumTenure: {
        duration: 0,
        type: "month"
      },
      maximumTenure: {
        duration: 0,
        type: "month"
      },
      lockInPeriod: {
        duration: 0,
        type: "month"
      },
      noticePeriod: {
        duration: 0,
        type: "month"
      }
    },
    maintenanceCharges: {
      amount: 0,
      frequency: "monthly"
    },
    otherCharges: {
      electricityCharges: {
        type: "inclusive",
        amount: 0
      },
      waterCharges: {
        type: "inclusive",
        amount: 0
      },
      gasCharges: {
        type: "inclusive",
        amount: 0
      },
      otherCharges: "inclusive",
      amount: 0
    }
  },
  brokerage: {
    required: false,
    amount: 0
  },
  availability: {
    availableFrom: new Date(),
    availableImmediately: false,
    availabilityStatus: "later",
    leaseDuration: "",
    noticePeriod: "",
    isPetsAllowed: false,
    operatingHours: false,
  },
  contactInformation: {
    name: "",
    email: "",
    phone: "",
    alternatePhone: "",
    bestTimeToContact: "",
    preferredContactTime: ""
  },
  media: {
    photos: {
      exterior: [],
      interior: [],
      floorPlan: [],
      washroom: [],
      lift: [],
      emergencyExit: []
    },
    videoTour: null,
    documents: []
  },
  metadata: {
    createdBy: "",
    createdAt: new Date(),
    propertyType: "Residential",
    propertyName: "Plot",
    intent: "Sale",
    status: "active"
  }
};

const convertFileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

const convertFilesToBase64 = async (files: (File | string)[]): Promise<string[]> => {
  const results: string[] = [];
  for (const file of files) {
    if (file instanceof File) {
      const base64 = await convertFileToBase64(file);
      results.push(base64);
    } else {
      results.push(file);
    }
  }
  return results;
};

const globalStyles = `
  input::placeholder,
  textarea::placeholder {
    color: rgba(0, 0, 0, 0.6);
  }
  
  input[type="radio"] + label,
  input[type="checkbox"] + label {
    color: black;
  }
  
  select {
    color: black;
  }
  
  label {
    color: black;
  }
  
  input,
  textarea,
  select {
    color: black;
  }
`;

const SellPlot = () => {
  const navigate = useNavigate();
  const param = useParams()
  const propertyId = param.propertyId;
  const [isEditMode, setIsEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const [currentStep, setCurrentStep] = useState(0);

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

  // CORRECTED useEffect for fetching property data
  useEffect(() => {
    const fetchPlotById = async () => {
      console.log("🔄 Fetching property data for ID:", propertyId);
      
      if (!propertyId) {
        setIsEditMode(false);
        return;
      }

      try {
        setLoading(true);
        // CORRECTED: Use residential API endpoint
        const res = await axios.get(`/api/residential/sale/plots/${propertyId}`);
        console.log("📦 API Response:", res.data);
        
        if (res.data && res.data.success) {
          const property = res.data.data;
          console.log("🏠 Property data loaded:", property);

          // Convert backend data to frontend format
          const convertedData: FormData = {
            propertyId: property.propertyId,
            basicInformation: property.basicInformation || initialFormData.basicInformation,
            propertyDetails: property.propertyDetails || initialFormData.propertyDetails,
            plotDetails: property.plotDetails || initialFormData.plotDetails,
            leaseDetails: property.leaseDetails || initialFormData.leaseDetails,
            brokerage: property.brokerage || initialFormData.brokerage,
            availability: property.availability || initialFormData.availability,
            contactInformation: property.contactInformation || initialFormData.contactInformation,
            media: property.media || initialFormData.media,
            metadata: property.metadata || initialFormData.metadata
          };

          setFormData(convertedData);
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

    fetchPlotById();
  }, [propertyId]);

  // Define form steps
  const steps = [
    {
      title: "Basic Information",
      icon: <Store className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <PropertyName
            propertyName={formData.basicInformation.title}
            onPropertyNameChange={(name) => handleChange('basicInformation.title', name)}
          />
          <PlotType onPlotTypeChange={(type) => handleChange('basicInformation.plotType', type)} />
          <CommercialPropertyAddress address={formData.basicInformation.address}  onAddressChange={(address) => handleChange('basicInformation.address', address)} />
          <MapLocation 
            latitude={formData.basicInformation.coordinates.latitude}
            longitude={formData.basicInformation.coordinates.longitude}
            landmark={formData.basicInformation.landmark}
            onLocationChange={(location) => handleChange('basicInformation.coordinates', location)}
            onAddressChange={(address) => handleChange('basicInformation.address', address)}
          />
          <CornerProperty
            isCornerProperty={formData.basicInformation.isCornerProperty}
            onCornerPropertyChange={(isCorner) => handleChange('basicInformation.isCornerProperty', isCorner)}
          />
        </div>
      ),
    },
    {
      title: "Property Details",
      icon: <Building2 className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <PlotDetails onDetailsChange={(details) => {
            // Update both propertyDetails.area and plotDetails
            const updatedArea = {
              totalArea: details.totalArea || details.totalPlotArea || 0,
              carpetArea: details.carpetArea || 0,
              builtUpArea: details.builtUpArea || 0
            };

            handleChange('propertyDetails.area', updatedArea);

            handleChange('plotDetails', {
              ...formData.plotDetails,
              totalPlotArea: details.totalPlotArea || details.totalArea || 0,
              infrastructure: details.infrastructure || [],
              roadAccess: details.roadAccess || "",
              securityRoom: details.securityRoom || false,
              previousConstruction: details.previousConstruction || "",
              zoningInformation: details.zoningInformation || ""
            });
          }} />

          {/* Zoning Type */}
          <div className="bg-gray-100 rounded-lg p-6 shadow-sm border border-gray-200">
            <h4 className="text-lg font-medium text-black mb-4">Zoning Information</h4>
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-3">
                <label className="block text-md font-medium mb-2 text-black">Zoning Type</label>
                <select
                  value={formData.plotDetails.zoningType}
                  onChange={(e) => handleChange('plotDetails.zoningType', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white border-2 border-gray-300 focus:border-black outline-none transition-colors duration-200 text-black"
                >
                  <option value="residential" className="text-black bg-white">Residential</option>
                  <option value="commercial" className="text-black bg-white">Commercial</option>
                  <option value="industrial" className="text-black bg-white">Industrial</option>
                  <option value="mixed" className="text-black bg-white">Mixed Use</option>
                </select>
              </div>
              <div className="grid grid-cols-1 gap-3">
                <label className="block text-md font-medium mb-2 text-black">Zoning Information</label>
                <input
                  type="text"
                  value={formData.plotDetails.zoningInformation}
                  onChange={(e) => handleChange('plotDetails.zoningInformation', e.target.value)}
                  placeholder="Additional zoning details"
                  className="w-full px-4 py-3 rounded-lg bg-white border-2 border-gray-300 focus:border-black outline-none transition-colors duration-200 text-black"
                />
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Lease Terms",
      icon: <DollarSign className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <div className="space-y-4 text-black">
            <LeaseAmount
              onLeaseAmountChange={(amount) => handleChange('leaseDetails', {
                ...formData.leaseDetails,
                leaseAmount: amount.leaseAmount,
                leaseduration: {
                  ...formData.leaseDetails.leaseduration,
                  duration: amount.leaseTenure || 0,
                  type: amount.leaseTermType || 'month',
                  amountType: 'fixed'
                }
              })}
            />
            <LeaseTenure
              onLeaseTenureChange={(tenure) => handleChange('leaseDetails', {
                ...formData.leaseDetails,
                leasetenure: {
                  minimumTenure: {
                    duration: tenure.minimumTenure.duration || 0,
                    type: tenure.minimumTenure.durationType || 'month'
                  },
                  maximumTenure: {
                    duration: tenure.maximumTenure.duration || 0,
                    type: tenure.maximumTenure.durationType || 'month'
                  },
                  lockInPeriod: {
                    duration: tenure.lockInPeriod.duration || 0,
                    type: tenure.lockInPeriod.durationType || 'month'
                  },
                  noticePeriod: {
                    duration: tenure.noticePeriod.duration || 1,
                    type: tenure.noticePeriod.durationType || 'month'
                  }
                }
              })}
            />
          </div>
        </div>
      ),
    },
    {
      title: "Availability",
      icon: <Calendar className="w-5 h-5" />,
      content: (
        <CommercialAvailability onAvailabilityChange={(availability) => handleChange('availability', availability)} />
      )
    },
    {
      title: "Contact Information",
      icon: <UserCircle className="w-5 h-5" />,
      content: (
        <CommercialContactDetails 
            contactInformation={formData.contactInformation}
            onContactChange={(contact) => handleChange('contactInformation', contact)}
          />
      ),
    },
    {
      title: "Property Media",
      icon: <ImageIcon className="w-6 h-6" />,
      content: (
        <div className="space-y-8">
          <MediaUploadforagriplot
            onMediaChange={(media: {
              images: { category: string; files: { url: string; file: File }[] }[];
              video?: { url: string; file: File };
              documents: { type: string; file: File }[];
            }) => {
              const convertedMedia: Media = {
                photos: {
                  exterior: media.images.find(img => img.category === 'exterior')?.files.map(f => f.file) || [],
                  interior: media.images.find(img => img.category === 'interior')?.files.map(f => f.file) || [],
                  floorPlan: media.images.find(img => img.category === 'floorPlan')?.files.map(f => f.file) || [],
                  washroom: media.images.find(img => img.category === 'washroom')?.files.map(f => f.file) || [],
                  lift: media.images.find(img => img.category === 'lift')?.files.map(f => f.file) || [],
                  emergencyExit: media.images.find(img => img.category === 'emergencyExit')?.files.map(f => f.file) || []
                },
                videoTour: media.video?.file || null,
                documents: media.documents.map(d => d.file)
              };
              setFormData(prev => ({ ...prev, media: convertedMedia }));
            }}
          />
        </div>
      )
    },
  ];

  // CORRECTED handleSubmit function for ResidentialSalePlot
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log("Form submission started...");
    console.log("🎯 Edit mode:", isEditMode);

    try {
      const user = sessionStorage.getItem('user');
      if (!user) {
        console.log("User not authenticated, redirecting to login");
        toast.error('You must be logged in to list a property.');
        navigate('/login');
        return;
      }

      const author = JSON.parse(user).id;
      console.log("User authenticated, ID:", author);

      // Prepare the data in backend format
      const backendData = {
        propertyId: isEditMode ? propertyId : undefined,
        basicInformation: {
          ...formData.basicInformation,
          coordinates: {
            latitude: formData.basicInformation.coordinates.latitude || "0",
            longitude: formData.basicInformation.coordinates.longitude || "0"
          }
        },
        propertyDetails: formData.propertyDetails,
        plotDetails: formData.plotDetails,
        leaseDetails: formData.leaseDetails,
        brokerage: formData.brokerage,
        availability: formData.availability,
        contactInformation: formData.contactInformation,
        media: formData.media,
        metadata: {
          createdBy: author,
          createdAt: isEditMode ? formData.metadata.createdAt : new Date(),
          propertyType: "Residential",
          propertyName: "Plot",
          intent: "Sale",
          status: "active",
          updatedAt: new Date()
        }
      };

      console.log("📤 Data prepared for backend:", backendData);

      // Convert media files to base64
      console.log("📸 Converting media files to base64...");
      const convertedMedia = {
        photos: {
          exterior: await convertFilesToBase64(formData.media.photos.exterior),
          interior: await convertFilesToBase64(formData.media.photos.interior),
          floorPlan: await convertFilesToBase64(formData.media.photos.floorPlan),
          washroom: await convertFilesToBase64(formData.media.photos.washroom),
          lift: await convertFilesToBase64(formData.media.photos.lift),
          emergencyExit: await convertFilesToBase64(formData.media.photos.emergencyExit),
        },
        videoTour: formData.media.videoTour
          ? (formData.media.videoTour instanceof File
            ? await convertFileToBase64(formData.media.videoTour)
            : formData.media.videoTour)
          : null,
        documents: await convertFilesToBase64(formData.media.documents)
      };

      const finalData = {
        ...backendData,
        media: convertedMedia
      };

      console.log("🎯 Final data being sent:", finalData);

      let response;
      const apiUrl = isEditMode 
        ? `/api/residential/sale/plots/${propertyId}`
        : '/api/residential/sale/plots';

      if (isEditMode && propertyId) {
        console.log("📤 Making UPDATE request to:", apiUrl);
        // This is correct - data sent directly
response = await axios.put(`/api/residential/sale/plots/${propertyId}`, finalData, {
  headers: {
    'Content-Type': 'application/json'
  }
});
      } else {
        console.log("📤 Making CREATE request to:", apiUrl);
        response = await axios.post(apiUrl, finalData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
      }

      console.log("✅ Response from server:", response.data);

      if (response.data.success) {
        const successMessage = isEditMode 
          ? 'Property listing updated successfully!' 
          : 'Property listing created successfully!';
        
        toast.success(successMessage);
        
        if (!isEditMode) {
          setFormData({...initialFormData});
        }
        
        navigate('/updatepropertyform');
      } else {
        console.error("Server returned success:false", response.data);
        toast.error(response.data.message || `Failed to ${isEditMode ? 'update' : 'create'} listing. Please try again.`);
      }
    } catch (error: any) {
      console.error('Error submitting form:', error);

      if (error.response) {
        console.error('Server response error:', error.response.data);
        
        let errorMessage = `Failed to ${isEditMode ? 'update' : 'create'} plot listing. Please try again.`;
        if (error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
        } else if (error.response.data && error.response.data.error) {
          errorMessage = error.response.data.error;
        }

        toast.error(errorMessage);
      } else if (error.request) {
        console.error('No response received:', error.request);
        toast.error('No response from server. Please check your connection.');
      } else {
        console.error('Error details:', error.message);
        toast.error(`Failed to ${isEditMode ? 'update' : 'create'} plot listing. Please try again.`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Add loading state
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
      <style>{globalStyles}</style>

      {/* Progress Bar */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex justify-center">
            <div className="flex items-center space-x-2">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="flex items-center cursor-pointer"
                  onClick={() => setCurrentStep(index)}
                >
                  <div className="flex flex-col items-center group">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${index <= currentStep
                      ? 'bg-black text-white'
                      : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                      }`}>
                      {step.icon}
                    </div>
                    <span className={`text-xs mt-1 font-medium transition-colors duration-200 ${index <= currentStep
                      ? 'text-black'
                      : 'text-gray-500 group-hover:text-gray-700'
                      }`}>
                      {step.title}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
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

      {/* Form Content */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-black">
            {isEditMode ? 'Edit Residential Plot' : 'List Residential Plot'}
          </h1>
          {isEditMode && (
            <p className="text-green-600 mt-2">You are editing an existing property. Changes will be updated.</p>
          )}
        </div>
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-black mb-2">{steps[currentStep].title}</h2>
          <p className="text-gray-600">Please fill in the details for your property</p>
        </div>

        {steps[currentStep].content}
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

export default SellPlot;