import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import PropertyName from '../PropertyName';
import ShedType from '../CommercialComponents/ShedType';
import CommercialPropertyAddress from '../CommercialComponents/CommercialPropertyAddress';
import Landmark from '../CommercialComponents/Landmark';
import CornerProperty from '../CommercialComponents/CornerProperty';
import ShedDetails from '../CommercialComponents/ShedDetails';
import CommercialPropertyDetails from '../CommercialComponents/CommercialPropertyDetails';
import LeaseAmount from '../lease/LeaseAmount';
import LeaseTenure from '../lease/LeaseTenure';
import MaintenanceAmount from '../residentialrent/MaintenanceAmount';
import OtherCharges from '../residentialrent/OtherCharges';
import Brokerage from '../residentialrent/Brokerage';
import CommercialAvailability from '../CommercialComponents/CommercialAvailability';
import CommercialContactDetails from '../CommercialComponents/CommercialContactDetails';
import CommercialMediaUpload from '../CommercialComponents/CommercialMediaUpload';
import { MapPin, Building2, DollarSign, Calendar, User, Image, Store, ImageIcon, UserCircle, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import MapLocation from '../CommercialComponents/MapLocation';

interface MediaType {
  images: { category: string; files: { url: string; file: File; }[]; }[];
  video?: { url: string; file: File; };
  documents: { type: string; file: File; }[];
}

// Define interfaces based on the backend model (CommercialLeaseShed.ts)
interface FormDataType {
  propertyName: string;
  Type: string[];
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  landmark: string;
  coordinates: { latitude: string; longitude: string };
  isCornerProperty: boolean;
  shedDetails: {
    totalArea?: number | null;
    carpetArea?: number | null;
    height?: number | null;
    entranceWidth?: number | null;
    additionalDetails?: string;
  };
  propertyDetails: {
    area?: {
      totalArea?: number | null;
      builtUpArea?: number | null;
      carpetArea?: number | null;
    };
    floor?: {
      floorNumber?: number | null;
      totalFloors?: number | null;
    };
    facingDirection?: string;
    furnishingStatus?: string;
    propertyAmenities?: string[];
    wholeSpaceAmenities?: string[];
    electricitySupply?: {
      powerLoad?: number | null;
      backup?: boolean;
    };
    waterAvailability?: string;
    propertyAge?: string | number | null;
    propertyCondition?: string;
  };
  leaseAmount: {
    amount?: number | null;
    type?: string;
    duration?: number | null;
    durationUnit?: string;
  };
  leaseTenure: {
    min?: number | null;
    max?: number | null;
    minUnit?: string;
    maxUnit?: string;
    lockInPeriod?: number | null;
    lockInUnit?: string;
    noticePeriod?: number | null;
    noticePeriodUnit?: string;
  };
  maintenanceAmount: {
    amount: number;
    frequency: string;
  };
  otherCharges: {
    water: { type: string; amount: number };
    electricity: { type: string; amount: number };
    gas: { type: string; amount: number };
    others: { type: string; amount: number };
  };
  brokerage: {
    required: string;
    amount?: number;
  };
  availability: {
    availableImmediately?: boolean;
    availableFrom?: Date;
    leaseDuration?: string;
    noticePeriod?: string;
    petsAllowed?: boolean;
    operatingHours?: {
      restricted?: boolean;
      restrictions?: string;
    };
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
    };
    videoTour: File | null;
    documents: File[];
  };
}

// Validation utility functions
const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePhone = (phone: string) => {
  const phoneRegex = /^[0-9]{10}$/;
  return phoneRegex.test(phone);
};

// Error display component
const ErrorDisplay = ({ errors }: { errors: Record<string, string> }) => {
  if (Object.keys(errors).length === 0) return null;

  return (
    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
      <div className="flex items-center">
        <svg className="h-5 w-5 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="text-red-800 font-medium">Please fix the following errors:</h3>
      </div>
      <ul className="mt-2 list-disc list-inside text-red-600">
        {Object.values(errors).map((error, index) => (
          <li key={index} className="text-sm">{error}</li>
        ))}
      </ul>
    </div>
  );
};

const LeaseShedMain = () => {
  const navigate = useNavigate();
  const formRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState<FormDataType>({
    propertyName: '',
    Type: [],
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: ''
    },
    landmark: '',
    coordinates: { latitude: '', longitude: '' },
    isCornerProperty: false,
    shedDetails: {},
    propertyDetails: {},
    leaseAmount: {},
    leaseTenure: {},
    maintenanceAmount: {
      amount: 0,
      frequency: 'monthly'
    },
    otherCharges: {
      water: { type: 'inclusive', amount: 0 },
      electricity: { type: 'inclusive', amount: 0 },
      gas: { type: 'inclusive', amount: 0 },
      others: { type: 'inclusive', amount: 0 }
    },
    brokerage: { required: 'no', amount: 0 },
    availability: {},
    contactDetails: {
      name: '',
      email: '',
      phone: '',
      alternatePhone: '',
      bestTimeToContact: ''
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
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Check login status on component mount
  useEffect(() => {
    const user = sessionStorage.getItem('user');
    if (!user) {
      navigate('/login');
    } else {
      setIsLoggedIn(true);
    }
  }, [navigate]);

  const renderFormSection = (content: React.ReactNode) => (
    <div className="space-y-4">
      <ErrorDisplay errors={formErrors} />
      {content}
    </div>
  );

  const steps = [
    {
      title: "Basic Information",
      icon: <MapPin className="w-6 h-6" />,
      component: renderFormSection(
        <div className="space-y-6">
          <div className="space-y-6">
            <div className="relative">
              <PropertyName propertyName={formData.propertyName} onPropertyNameChange={(name) => setFormData((prev) => ({ ...prev, propertyName: name }))} />
              <Store className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black" size={18} />
            </div>
            <ShedType onShedTypeChange={(type) => setFormData((prev) => ({ ...prev, Type: type }))} />
          </div>

          <div className="space-y-6">
            <CommercialPropertyAddress address={formData.address} onAddressChange={(address) => setFormData((prev) => ({ ...prev, address }))} />
            <MapLocation
              latitude={formData.coordinates.latitude}
              longitude={formData.coordinates.longitude}
              landmark={formData.landmark}
              onLocationChange={(location) => setFormData((prev) => ({ ...prev, coordinates: location }))}
              onAddressChange={(address) => setFormData((prev) => ({ ...prev, address }))}
              onLandmarkChange={(landmark) => setFormData((prev) => ({ ...prev, landmark }))}
            />

            <div className="flex items-center space-x-2 cursor-pointer">
              <CornerProperty isCornerProperty={formData.isCornerProperty} onCornerPropertyChange={(isCorner) => setFormData((prev) => ({ ...prev, isCornerProperty: isCorner }))} />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Property Details",
      icon: <Building2 className="w-6 h-6" />,
      component: renderFormSection(
        <div className="space-y-6">
          <ShedDetails onDetailsChange={(details) => setFormData((prev) => ({ ...prev, shedDetails: details }))} />
          <CommercialPropertyDetails onDetailsChange={(details) => setFormData((prev) => ({ ...prev, propertyDetails: details }))} />
        </div>
      ),
    },
    {
      title: "Lease Terms",
      icon: <DollarSign className="w-6 h-6" />,
      component: renderFormSection(
        <div className="space-y-6">
          <LeaseAmount onLeaseAmountChange={(amount) => setFormData((prev) => ({ ...prev, leaseAmount: amount }))} />
          <LeaseTenure onLeaseTenureChange={(tenure) => {
            console.log("Received tenure values:", tenure);

            // Explicitly set min and max as numeric values
            const updatedTenure = {
              min: tenure.minimumTenure ? Number(tenure.minimumTenure) : tenure.min,
              minUnit: tenure.minimumUnit || tenure.minUnit,
              max: tenure.maximumTenure ? Number(tenure.maximumTenure) : tenure.max,
              maxUnit: tenure.maximumUnit || tenure.maxUnit,
              lockInPeriod: tenure.lockInPeriod,
              lockInUnit: tenure.lockInUnit,
              noticePeriod: tenure.noticePeriod,
              noticePeriodUnit: tenure.noticePeriodUnit
            };

            console.log("Setting tenure values:", updatedTenure);
            setFormData((prev) => ({ ...prev, leaseTenure: updatedTenure }));
          }} />
          <MaintenanceAmount maintenanceAmount={formData.maintenanceAmount} onMaintenanceAmountChange={(maintenance) => setFormData((prev) => ({ ...prev, maintenanceAmount: maintenance }))} />
          <OtherCharges otherCharges={formData.otherCharges} onOtherChargesChange={(charges) => setFormData((prev) => ({ ...prev, otherCharges: charges }))} />
          <Brokerage bro={formData.brokerage} onBrokerageChange={(brokerage) => setFormData((prev) => ({ ...prev, brokerage }))} />
        </div>
      ),
    },
    {
      title: "Availability",
      icon: <Calendar className="w-6 h-6" />,
      component: renderFormSection(
        <div className="space-y-6">
          <CommercialAvailability onAvailabilityChange={(availability) => setFormData((prev) => ({ ...prev, availability }))} />
        </div>
      ),
    },
    {
      title: "Contact Information",
      icon: <User className="w-6 h-6" />,
      component: renderFormSection(
        <div className="space-y-6">
          <CommercialContactDetails contactInformation={formData.contactDetails} onContactChange={(contact) => setFormData((prev) => ({ ...prev, contactDetails: contact }))} />
        </div>
      ),
    },
    {
      title: "Property Media",
      icon: <Image className="w-6 h-6" />,
      component: renderFormSection(
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
                const photosByCategory: Record<string, File[]> = {
                  exterior: [],
                  interior: [],
                  floorPlan: [],
                  washrooms: [],
                  lifts: [],
                  emergencyExits: []
                };

                media.photos.forEach(({ category, files }) => {
                  if (category in photosByCategory) {
                    photosByCategory[category] = files.map(f => f.file);
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

  const validateCurrentStep = () => {
    const errors: Record<string, string> = {};

    switch (currentStep) {
      case 0: // Basic Information
        if (!formData.propertyName.trim()) {
          errors.propertyName = 'Property name is required';
        }
        if (formData.Type.length === 0) {
          errors.Type = 'Please select at least one shed type';
        }
        if (!formData.address.street) {
          errors.street = 'Street address is required';
        }
        if (!formData.address.city) {
          errors.city = 'City is required';
        }
        if (!formData.address.state) {
          errors.state = 'State is required';
        }
        if (!formData.address.zipCode) {
          errors.zipCode = 'Zip code is required';
        }
        break;
      case 1: // Property Details
        if (!formData.shedDetails.totalArea) {
          errors.totalArea = 'Total area is required';
        }
        if (!formData.shedDetails.carpetArea) {
          errors.carpetArea = 'Carpet area is required';
        }
        if (!formData.shedDetails.height) {
          errors.height = 'Height is required';
        }
        if (!formData.shedDetails.entranceWidth) {
          errors.entranceWidth = 'Entrance width is required';
        }
        break;
      case 2: // Lease Terms
        if (!formData.leaseAmount.amount) {
          errors.leaseAmount = 'Lease amount is required';
        }
        if (!formData.leaseAmount.type) {
          errors.leaseType = 'Lease type is required';
        }
        if (!formData.leaseTenure.min) {
          errors.minTenure = 'Minimum tenure is required';
        }
        if (!formData.leaseTenure.max) {
          errors.maxTenure = 'Maximum tenure is required';
        }
        break;
      case 4: // Contact Information
        if (!formData.contactDetails.name) {
          errors.name = 'Name is required';
        }
        if (!formData.contactDetails.email) {
          errors.email = 'Email is required';
        } else if (!validateEmail(formData.contactDetails.email)) {
          errors.email = 'Please enter a valid email address';
        }
        if (!formData.contactDetails.phone) {
          errors.phone = 'Phone number is required';
        } else if (!validatePhone(formData.contactDetails.phone)) {
          errors.phone = 'Please enter a valid 10-digit phone number';
        }
        break;
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

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

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    // Prevent the default form submission behavior
    e.preventDefault();

    console.log('Form Data for submission:', formData);
    console.log('LeaseTenure values for submission:', formData.leaseTenure);

    setIsSubmitting(true);

    try {
      const user = sessionStorage.getItem('user');
      if (!user) {
        navigate('/login');
        return;
      }

      const author = JSON.parse(user).id;

      // Transform media data
      // const processMediaData = async () => {
      //   const convertedPhotos: Record<string, string[]> = {
      //     exterior: [],
      //     interior: [],
      //     floorPlan: [],
      //     washrooms: [],
      //     lifts: [],
      //     emergencyExits: []
      //   };

      //   // Debug the media categories
      //   // console.log("Media images categories:", formData.media.images.map(cat => cat.category));

      //   // Helper function to normalize category names
      //   const normalizeCategory = (category: string): string => {
      //     // Map any variations of category names to the correct keys in convertedPhotos
      //     const categoryMap: Record<string, string> = {
      //       'exterior': 'exterior',
      //       'interior': 'interior',
      //       'floorplan': 'floorPlan',
      //       'floorPlan': 'floorPlan',
      //       'floor plan': 'floorPlan',
      //       'washrooms': 'washrooms',
      //       'lifts': 'lifts',
      //       'emergencyexits': 'emergencyExits',
      //       'emergencyExits': 'emergencyExits',
      //       'emergency exits': 'emergencyExits'
      //     };

      //     return categoryMap[category.toLowerCase()] || category.toLowerCase();
      //   };
      //   // Process images
      //   for (const category in formData.media.photos) {
      //     const originalCategory = category;
      //     const normalizedCategory = normalizeCategory(originalCategory);

      //     console.log(`Processing category: ${originalCategory} -> normalized to: ${normalizedCategory}`);
      //     if (normalizedCategory in convertedPhotos) {
      //       const filePromises = formData.media.photos[category].map((f: { file: File; url: string; }) =>
      //         f.file ? convertFileToBase64(f.file) : f.url
      //       );
      //       convertedPhotos[normalizedCategory as keyof typeof convertedPhotos] = await Promise.all(filePromises);
      //       console.log(`Converted ${convertedPhotos[normalizedCategory as keyof typeof convertedPhotos].length} files for ${normalizedCategory}`);
      //     } else {
      //       console.log(`Category not found: ${originalCategory} (normalized: ${normalizedCategory})`);
      //     }
      //   }

      //   // Process video
      //   let videoTour = '';
      //   if (formData.media.videoTour?.file) {
      //     videoTour = await convertFileToBase64(formData.media.videoTour.file);
      //   } else if (formData.media.videoTour?.url) {
      //     videoTour = formData.media.videoTour.url;
      //   }

      //   // Process documents
      //   const documents = await Promise.all(
      //     formData.media.documents.map(doc =>
      //       doc.file ? convertFileToBase64(doc.file) : doc.type
      //     )
      //   );

      //   return {
      //     photos: convertedPhotos,
      //     videoTour,
      //     documents
      //   };
      // };

      // // Ensure proper capitalization for enum values
      // const leaseAmountType = formData.leaseAmount.type ?
      //   formData.leaseAmount.type.charAt(0).toUpperCase() + formData.leaseAmount.type.slice(1) : 'Fixed';

      // // Fix maintenance frequency format to match backend expectations
      // let maintenanceFrequency = '';
      // if (formData.maintenanceAmount.frequency) {
      //   // Convert frequencies to match backend enum exactly
      //   const frequencyMap: Record<string, string> = {
      //     'monthly': 'Monthly',
      //     'quarterly': 'Quarterly',
      //     'yearly': 'Yearly',
      //     'half-yearly': 'Half-Yearly',
      //     'half yearly': 'Half-Yearly'
      //   };
      //   maintenanceFrequency = frequencyMap[formData.maintenanceAmount.frequency.toLowerCase()] || 'Monthly';
      // } else {
      //   maintenanceFrequency = 'Monthly';
      // }

      // console.log("Original frequency:", formData.maintenanceAmount.frequency);
      // console.log("Mapped frequency:", maintenanceFrequency);

      // const mediaData = await processMediaData();

      // // Fix the additionaldetails field mapping
      // const shedDetails = {
      //   totalArea: formData.shedDetails.totalArea || 0,
      //   carpetArea: formData.shedDetails.carpetArea || 0,
      //   height: formData.shedDetails.height || 0,
      //   entranceWidth: formData.shedDetails.entranceWidth || 0,
      //   additionaldetails: formData.shedDetails.additionalDetails || '' // Map from additionalDetails to additionaldetails
      // };

      // // Check the leaseTenure values before creating the payload
      // console.log("LeaseTenure values for payload:", {
      //   min: formData.leaseTenure.min,
      //   max: formData.leaseTenure.max,
      //   minType: typeof formData.leaseTenure.min,
      //   maxType: typeof formData.leaseTenure.max
      // });

      // // Convert form data to match backend model
      // const payload = {
      //   basicInformation: {
      //     title: formData.propertyName,
      //     shedType: formData.shedType,
      //     address: {
      //       street: formData.address.street || '',
      //       city: formData.address.city || '',
      //       state: formData.address.state || '',
      //       zipCode: formData.address.zipCode || ''
      //     },
      //     landmark: formData.landmark,
      //     location: {
      //       latitude: parseFloat(formData.coordinates.latitude) || 0,
      //       longitude: parseFloat(formData.coordinates.longitude) || 0
      //     },
      //     isCornerProperty: formData.isCornerProperty
      //   },
      //   shedDetails: shedDetails,
      //   propertyDetails: {
      //     area: {
      //       totalArea: formData.propertyDetails.area?.totalArea || 0,
      //       builtUpArea: formData.propertyDetails.area?.builtUpArea || 0,
      //       carpetArea: formData.propertyDetails.area?.carpetArea || 0
      //     },
      //     floor: {
      //       floorNumber: formData.propertyDetails.floor?.floorNumber || 0,
      //       totalFloors: formData.propertyDetails.floor?.totalFloors || 0
      //     },
      //     facingDirection: formData.propertyDetails.facingDirection || '',
      //     furnishingStatus: formData.propertyDetails.furnishingStatus || '',
      //     propertyAmenities: formData.propertyDetails.propertyAmenities || [],
      //     wholeSpaceAmenities: formData.propertyDetails.wholeSpaceAmenities || [],
      //     electricitySupply: {
      //       powerLoad: formData.propertyDetails.electricitySupply?.powerLoad || 0,
      //       backup: formData.propertyDetails.electricitySupply?.backup || false
      //     },
      //     waterAvailability: formData.propertyDetails.waterAvailability || '',
      //     propertyAge: formData.propertyDetails.propertyAge ? Number(formData.propertyDetails.propertyAge) : 0,
      //     propertyCondition: formData.propertyDetails.propertyCondition || ''
      //   },
      //   leaseTerms: {
      //     leaseDetails: {
      //       leaseAmount: {
      //         amount: formData.leaseAmount.amount || 0,
      //         type: leaseAmountType as 'Fixed' | 'Negotiable',
      //         duration: formData.leaseAmount.duration || 1,
      //         durationUnit: formData.leaseAmount.durationUnit || 'month'
      //       }
      //     },
      //     tenureDetails: {
      //       minimumTenure: formData.leaseTenure.min !== null && formData.leaseTenure.min !== undefined ? Number(formData.leaseTenure.min) : 1,
      //       minimumUnit: formData.leaseTenure.minUnit || 'year',
      //       maximumTenure: formData.leaseTenure.max !== null && formData.leaseTenure.max !== undefined ? Number(formData.leaseTenure.max) : 3,
      //       maximumUnit: formData.leaseTenure.maxUnit || 'year',
      //       lockInPeriod: formData.leaseTenure.lockInPeriod !== null && formData.leaseTenure.lockInPeriod !== undefined ? Number(formData.leaseTenure.lockInPeriod) : 1,
      //       lockInUnit: formData.leaseTenure.lockInUnit || 'year',
      //       noticePeriod: formData.leaseTenure.noticePeriod !== null && formData.leaseTenure.noticePeriod !== undefined ? Number(formData.leaseTenure.noticePeriod) : 1,
      //       noticePeriodUnit: formData.leaseTenure.noticePeriodUnit || 'month'
      //     },
      //     maintenanceAmount: {
      //       amount: formData.maintenanceAmount.amount || 0,
      //       frequency: maintenanceFrequency as 'Monthly' | 'Quarterly' | 'Yearly' | 'Half-Yearly'
      //     },
      //     otherCharges: {
      //       waterCharges: {
      //         type: formData.otherCharges.waterCharges?.type || 'inclusive',
      //         amount: formData.otherCharges.waterCharges?.amount || 0
      //       },
      //       electricityCharges: {
      //         type: formData.otherCharges.electricityCharges?.type || 'inclusive',
      //         amount: formData.otherCharges.electricityCharges?.amount || 0
      //       },
      //       gasCharges: {
      //         type: formData.otherCharges.gasCharges?.type || 'inclusive',
      //         amount: formData.otherCharges.gasCharges?.amount || 0
      //       },
      //       otherCharges: {
      //         type: formData.otherCharges.otherCharges?.type || 'inclusive',
      //         amount: formData.otherCharges.otherCharges?.amount || 0
      //       }
      //     },
      //     brokerage: {
      //       required: formData.brokerage.required?.toLowerCase() || 'no',
      //       amount: formData.brokerage.amount
      //     },
      //     availability: {
      //       availableImmediately: formData.availability.availableImmediately || false,
      //       availableFrom: formData.availability.availableFrom || new Date(),
      //       leaseDuration: formData.availability.leaseDuration || '1 year',
      //       noticePeriod: formData.availability.noticePeriod || '1 month',
      //       petsAllowed: formData.availability.petsAllowed || false,
      //       operatingHours: {
      //         restricted: formData.availability.operatingHours?.restricted || false,
      //         restrictions: formData.availability.operatingHours?.restrictions || ''
      //       }
      //     }
      //   },
      //   contactInformation: {
      //     name: formData.contactDetails.name || '',
      //     email: formData.contactDetails.email || '',
      //     phone: formData.contactDetails.phone || '',
      //     alternatePhone: formData.contactDetails.alternatePhone,
      //     bestTimeToContact: formData.contactDetails.bestTimeToContact
      //   },
      //   media: mediaData,
      //   metadata: {
      //     createdBy: author,
      //     createdAt: new Date(),
      //     updatedAt: new Date(),
      //     status: 'active',
      //     views: 0,
      //     favorites: 0,
      //     isVerified: false
      //   }
      // };

      // console.log('Payload:', payload);

      // // Using the correct API endpoint pattern based on other similar components
      // // Looking at similar files, we'll use the plural form
      // const response = await axios.post('/api/commercial/lease/sheds', payload);

      // if (response.status === 201) {
      //   toast.success('Property listed successfully!');
      //   navigate('/dashboard');
      // } else {
      //   toast.error('Failed to list property. Please try again.');
      // }
    } catch (error) {
      console.error('Error submitting property:', error);
      toast.error('An error occurred. Please try again later.');
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
    <div ref={formRef} className="min-h-screen bg-white">
      {/* Progress indicator */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex justify-center">
            <div className="flex items-center space-x-2">
              {steps.map((section, index) => (
                <div
                  key={index}
                  className="flex items-center cursor-pointer"
                  onClick={() => {
                    setCurrentStep(index);
                    // Scroll to top of the form when clicking on progress indicators
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
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${index <= currentStep
                      ? 'bg-black text-white'
                      : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                      }`}>
                      {section.icon}
                    </div>
                    <span className={`text-xs mt-1 font-medium transition-colors duration-200 ${index <= currentStep
                      ? 'text-black'
                      : 'text-gray-500 group-hover:text-gray-700'
                      }`}>
                      {section.title}
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

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-black">Lease Commercial Shed</h1>
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
                Submitting...
              </>
            ) : (
              <>
                {currentStep === steps.length - 1 ? 'Submit' : 'Next'}
                <ChevronRight className="w-5 h-5 ml-2" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeaseShedMain;
