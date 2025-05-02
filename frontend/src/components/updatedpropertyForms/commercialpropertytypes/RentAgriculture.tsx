

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import PropertyName from '../PropertyName';
import AgriculturalLandType from '../CommercialComponents/AgriculturalLandType';
import CommercialPropertyAddress from '../CommercialComponents/CommercialPropertyAddress';
import Landmark from '../CommercialComponents/Landmark';
import CornerProperty from '../CommercialComponents/CornerProperty';
import AgriculturalLandDetails from '../CommercialComponents/AgriculturalLandDetails';
import CommercialPropertyDetails from '../CommercialComponents/CommercialPropertyDetails';
import Rent from '../residentialrent/Rent';
import SecurityDeposit from '../residentialrent/SecurityDeposit';
import MaintenanceAmount from '../residentialrent/MaintenanceAmount';
import OtherCharges from '../residentialrent/OtherCharges';
import Brokerage from '../residentialrent/Brokerage';
import AvailabilityDate from '../AvailabilityDate';
import CommercialContactDetails from '../CommercialComponents/CommercialContactDetails';
import MediaUploadforagriplot from '../Mediauploadforagriplot';
import { ChevronLeft, ChevronRight, Store, Building2, Calendar, MapPin, DollarSign, ImageIcon, UserCircle } from 'lucide-react';
import axios from 'axios';
import MapLocation from '../CommercialComponents/MapLocation';

const globalStyles = `
  input::placeholder,
  textarea::placeholder {
    color: rgba(0, 0, 0, 0.6);
  }
  
  /* Make radio button and checkbox text black */
  input[type="radio"] + label,
  input[type="checkbox"] + label {
    color: black;
  }
  
  /* Make select placeholder text black */
  select {
    color: black;
  }
  
  /* Make all form labels black */
  label {
    color: black;
  }
  
  /* Make all input text black */
  input,
  textarea,
  select {
    color: black;
  }
`;

// Error display component for validation errors
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

interface FormData {
  propertyName: string;
  landType: string[];
  powerSupply: boolean;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  landmark: string;
  coordinates: {
    latitude: string;
    longitude: string;
  };
  isCornerProperty: boolean;
  Agriculturelanddetails: {
    totalArea: number;
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
    propertyAge: string;
    propertyCondition: string;
    electricitySupply: {
      powerLoad: number;
      backup: boolean;
    };
  };
  rent: {
    expectedRent: number;
    isNegotiable: boolean;
    maintenanceType: 'inclusive' | 'exclusive';
  };
  securityDeposit: {
    amount: number;
  };
  maintenanceAmount?: {
    amount: number;
    frequency: 'monthly' | 'quarterly' | 'half-yearly' | 'yearly';
  };
  otherCharges: {
    water: {
      type: 'inclusive' | 'exclusive';
      amount?: number;
    };
    electricity: {
      type: 'inclusive' | 'exclusive';
      amount?: number;
    };
    gas: {
      type: 'inclusive' | 'exclusive';
      amount?: number;
    };
    others: {
      type: 'inclusive' | 'exclusive';
      amount?: number;
    };
  };
  brokerage: {
    required: string;
    amount?: number;
  };
  availability: {
    type: 'immediate' | 'specific';
    date?: string | undefined;
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
    videoTour?: File | null;
    documents: File[];
  };
}

const convertFileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

const RentAgriculture = () => {
  const navigate = useNavigate();
  const formRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState<FormData>({
    propertyName: '',
    landType: [] as string[],
    powerSupply: false,
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: ''
    },
    landmark: '',
    coordinates: {
      latitude: '',
      longitude: ''
    },
    isCornerProperty: false,
    Agriculturelanddetails: {
      totalArea: 0,
      soilType: '',
      irrigation: false,
      fencing: false,
      cropSuitability: '',
      waterSource: '',
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
      facingDirection: '',
      furnishingStatus: '',
      propertyAmenities: [] as string[],
      wholeSpaceAmenities: [] as string[],
      waterAvailability: '',
      propertyAge: '',
      propertyCondition: '',
      electricitySupply: {
        powerLoad: 0,
        backup: false
      }
    },
    rent: {
      expectedRent: 0,
      isNegotiable: false,
      maintenanceType: 'inclusive' as 'inclusive' | 'exclusive'
    },
    securityDeposit: {
      amount: 0
    },
    maintenanceAmount: {
      amount: 0,
      frequency: 'monthly' as 'monthly' | 'quarterly' | 'half-yearly' | 'yearly'
    },
    otherCharges: {
      water: {
        type: 'inclusive' as 'inclusive' | 'exclusive',
        amount: 0
      },
      electricity: {
        type: 'inclusive' as 'inclusive' | 'exclusive',
        amount: 0
      },
      gas: {
        type: 'inclusive' as 'inclusive' | 'exclusive',
        amount: 0
      },
      others: {
        type: 'inclusive' as 'inclusive' | 'exclusive',
        amount: 0
      }
    },
    brokerage: {
      required: '',
      amount: 0
    },
    availability: {
      type: 'immediate' as 'immediate' | 'specific',
      date: undefined
    },
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
    },
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

  const validateCurrentStep = () => {
    const errors: Record<string, string> = {};
    // Add validation logic here if needed
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const renderFormSection = (content: React.ReactNode) => (
    <div className="space-y-4">
      <ErrorDisplay errors={formErrors} />
      {content}
    </div>
  );

  // Handler functions
  const handlePropertyNameChange = (name: string) => {
    setFormData(prev => ({ ...prev, propertyName: name }));
  };

  const handleLandTypeChange = (types: string[]) => {
    setFormData(prev => ({ ...prev, landType: types }));
  };

  const handleAddressChange = (address: { street: string; city: string; state: string; zipCode: string; }) => {
    setFormData(prev => ({ ...prev, address }));
  };

  const handleLandmarkChange = (landmark: string) => {
    setFormData(prev => ({ ...prev, landmark }));
  };

  const handleLatitudeChange = (lat: string) => {
    setFormData(prev => ({
      ...prev,
      coordinates: { ...prev.coordinates, latitude: lat }
    }));
  };

  const handleLongitudeChange = (lng: string) => {
    setFormData(prev => ({
      ...prev,
      coordinates: { ...prev.coordinates, longitude: lng }
    }));
  };

  const handleCornerPropertyChange = (isCorner: boolean) => {
    setFormData(prev => ({ ...prev, isCornerProperty: isCorner }));
  };

  const handleLandDetailsChange = (details: Record<string, any>) => {
    setFormData(prev => ({
      ...prev,
      Agriculturelanddetails: { ...prev.Agriculturelanddetails, ...details }
    }));
  };

  const handlePropertyDetailsChange = (details: Record<string, any>) => {
    setFormData(prev => ({
      ...prev,
      propertyDetails: { ...prev.propertyDetails, ...details }
    }));
  };

  const handleRentChange = (rent: Record<string, any>) => {
    setFormData(prev => ({
      ...prev,
      rent: { ...prev.rent, ...rent }
    }));
  };

  const handleMaintenanceAmountChange = (maintenance: Record<string, any>) => {
    setFormData(prev => {
      // Create a new object to avoid directly modifying prev
      const updated = { ...prev };

      // Initialize maintenanceAmount if it doesn't exist
      if (!updated.maintenanceAmount) {
        updated.maintenanceAmount = { amount: 0, frequency: 'monthly' };
      } else {
        // Merge with existing values
        updated.maintenanceAmount = {
          ...updated.maintenanceAmount,
          ...maintenance
        };
      }

      return updated;
    });
  };

  const handleSecurityDepositChange = (deposit: Record<string, any>) => {
    setFormData(prev => ({
      ...prev,
      securityDeposit: { ...prev.securityDeposit, ...deposit }
    }));
  };

  const handleOtherChargesChange = (charges: Record<string, any>) => {
    setFormData(prev => ({
      ...prev,
      otherCharges: { ...prev.otherCharges, ...charges }
    }));
  };

  const handleBrokerageChange = (brokerage: Record<string, any>) => {
    setFormData(prev => ({
      ...prev,
      brokerage: { ...prev.brokerage, ...brokerage }
    }));
  };

  const handleContactChange = (contact: Record<string, any>) => {
    setFormData(prev => ({
      ...prev,
      contactDetails: { ...prev.contactDetails, ...contact }
    }));
  };

  const handleMediaChange = (media: {
    images: { category: string; files: { url: string; file: File; }[]; }[];
    video?: { url: string; file: File; } | undefined;
    documents: { type: string; file: File; }[];
  }) => {
    setFormData(prev => ({
      ...prev,
      media: {
        photos: {
          exterior: media.images.find(img => img.category === 'exterior')?.files.map(f => f.file) || [],
          interior: media.images.find(img => img.category === 'interior')?.files.map(f => f.file) || [],
          floorPlan: media.images.find(img => img.category === 'floorPlan')?.files.map(f => f.file) || [],
          washrooms: media.images.find(img => img.category === 'washrooms')?.files.map(f => f.file) || [],
          lifts: media.images.find(img => img.category === 'lifts')?.files.map(f => f.file) || [],
          emergencyExits: media.images.find(img => img.category === 'emergencyExits')?.files.map(f => f.file) || []
        },
        videoTour: media.video ? media.video.file : null,
        documents: media.documents.map(d => d.file)
      }
    }));
  };

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

  const formSections = [
    {
      title: 'Basic Information',
      icon: <Store className="w-5 h-5" />,
      content: renderFormSection(
        <div className="space-y-6">
          <div className="space-y-6">
            <PropertyName propertyName={formData.propertyName} onPropertyNameChange={handlePropertyNameChange} />
            <AgriculturalLandType onLandTypeChange={handleLandTypeChange} />
          </div>




          <div className="space-y-6">
            <CommercialPropertyAddress onAddressChange={handleAddressChange} />
            {/* <Landmark onLandmarkChange={handleLandmarkChange} /> */}
            <MapLocation 
            latitude={formData.coordinates.latitude}
            longitude={formData.coordinates.longitude}
            onLocationChange={(location) => handleChange('coordinates', location)}
            onAddressChange={(address) => handleChange('address', address)}
            onLandmarkChange={(landmark) => handleChange('landmark', landmark)}
            />
            <CornerProperty onCornerPropertyChange={handleCornerPropertyChange} />

          </div>
        </div>
      )
    },
    {
      title: 'Property Details',
      icon: <Building2 className="w-5 h-5" />,
      content: renderFormSection(

        <div className="space-y-6">
          <AgriculturalLandDetails onDetailsChange={handleLandDetailsChange} />
          {/* <CommercialPropertyDetails onDetailsChange={handlePropertyDetailsChange} /> */}
        </div>

      )
    },
    {
      title: 'Rental Terms',
      icon: <DollarSign className="w-5 h-5" />,
      content: renderFormSection(

        <div className="space-y-6">

          <div className="space-y-4 text-black">
            <Rent onRentChange={handleRentChange} />
            {formData.rent.maintenanceType === 'exclusive' && (
              <MaintenanceAmount onMaintenanceAmountChange={handleMaintenanceAmountChange} />
            )}
            <SecurityDeposit onSecurityDepositChange={handleSecurityDepositChange} />
          </div>
        </div>
      )
    },
    {
      title: 'Availability',
      icon: <Calendar className="w-5 h-5" />,
      content: renderFormSection(
        <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">

          <AvailabilityDate onAvailabilityChange={(availability) => setFormData(prev => ({
            ...prev,
            availability: {
              type: availability.type,
              date: availability.date
            }
          }))} />
        </div>

      )
    },
    {
      title: 'Contact Information',
      icon: <UserCircle className="w-5 h-5" />,
      content: renderFormSection(

        <CommercialContactDetails onContactChange={handleContactChange} />

      )
    },
    {
      title: 'Property Media',
      icon: <ImageIcon className="w-5 h-5" />,
      content: renderFormSection(
        <MediaUploadforagriplot onMediaChange={handleMediaChange} />

      )
    }
  ];

  const handleNext = () => {
    if (validateCurrentStep()) {
      if (currentStep < formSections.length - 1) {
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
    } else {
      toast.error('Please fill in all required fields');
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    setIsSubmitting(true);
    try {
      const user = sessionStorage.getItem('user');
      if (user) {
        const author = JSON.parse(user).id;

        // Convert all media files to base64
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
        console.log(formData)

        const transformedData = {
          ...formData,
          media: convertedMedia,
          metaData: {
            createdBy: author,
            createdAt: new Date()
          }
        };

        console.log(transformedData);
        const response = await axios.post('/api/commercial/rent/agriculture', transformedData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        console.log(response.data)

        if (response.data.success) {
          // Show success message and redirect
          toast.success('Commercial rent agriculture listing created successfully!');
        }
      } else {
        navigate('/login');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to create commercial rent agriculture listing. Please try again.');
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
      <style>{globalStyles}</style>

      {/* Progress Bar */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex justify-center">
            <div className="flex items-center space-x-2">
              {formSections.map((section, index) => (
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
                      {section.icon}
                    </div>
                    <span className={`text-xs mt-1 font-medium transition-colors duration-200 ${index <= currentStep
                      ? 'text-black'
                      : 'text-gray-500 group-hover:text-gray-700'
                      }`}>
                      {section.title}
                    </span>
                  </div>
                  {index < formSections.length - 1 && (
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
          <h1 className="text-2xl sm:text-3xl font-bold text-black">Rent Commercial Agriculture</h1>
        </div>
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-black mb-2">{formSections[currentStep].title}</h2>
          <p className="text-gray-600">Please fill in the details for your property</p>
        </div>

        {formSections[currentStep].content}
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
            onClick={currentStep === formSections.length - 1 ? handleSubmit : handleNext}
            className="flex items-center px-6 py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition-all duration-200"
            disabled={currentStep === formSections.length - 1 && isSubmitting}
          >
            {currentStep === formSections.length - 1
              ? (isSubmitting ? 'Submitting...' : 'Submit')
              : 'Next'}
            {!isSubmitting && <ChevronRight className="w-5 h-5 ml-2" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RentAgriculture;
