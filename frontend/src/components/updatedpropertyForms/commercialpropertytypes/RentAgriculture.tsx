import React, { useState } from 'react';
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
import CommercialMediaUpload from '../CommercialComponents/CommercialMediaUpload';
import { ChevronLeft } from 'lucide-react';
import { ChevronRight } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
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
    propertyAge: number;
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
      propertyAge: 0,
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
        exterior: [] ,
        interior: [] ,
        floorPlan: [] ,
        washrooms: [],
        lifts: [] ,
        emergencyExits: [] 
      },
      videoTour: null,
      documents: [] 
    },
  });

  const [currentStep, setCurrentStep] = useState(0);

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

  const formSections = [
    {
      title: 'Basic Information',
      content: (
        <>
          <PropertyName propertyName={formData.propertyName} onPropertyNameChange={handlePropertyNameChange} />
          <AgriculturalLandType onLandTypeChange={handleLandTypeChange} />
          <CommercialPropertyAddress onAddressChange={handleAddressChange} />
          <Landmark onLandmarkChange={handleLandmarkChange} />
          
          <CornerProperty onCornerPropertyChange={handleCornerPropertyChange} />
        </>
      )
    },
    {
      title: 'Property Details',
      content: (
        <>
          <AgriculturalLandDetails onDetailsChange={handleLandDetailsChange} />
          <CommercialPropertyDetails onDetailsChange={handlePropertyDetailsChange} />
        </>
      )
    },
    {
      title: 'Rental Terms',
      content: (
        <>
          <Rent onRentChange={handleRentChange} />
          {formData.rent.maintenanceType === 'exclusive' && (
            <MaintenanceAmount onMaintenanceAmountChange={handleMaintenanceAmountChange} />
          )}
          <SecurityDeposit onSecurityDepositChange={handleSecurityDepositChange} />
          <OtherCharges onOtherChargesChange={handleOtherChargesChange} />
          <Brokerage onBrokerageChange={handleBrokerageChange} />
        </>
      )
    },
    {
      title: 'Availability',
      content: <AvailabilityDate onAvailabilityChange={(availability) => setFormData(prev => ({
        ...prev,
        availability: {
          type: availability.type,
          date: availability.date
        }
      }))} />
    },
    {
      title: 'Contact Information', 
      content: <CommercialContactDetails onContactChange={handleContactChange} />
    },
    {
      title: 'Property Media',
      content: <CommercialMediaUpload onMediaChange={handleMediaChange} />
    }
  ];

  const handleNext = () => {
    if (currentStep < formSections.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Data:', formData);
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
        const response = await axios.post('/api/commercial/agriculture', transformedData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        console.log(response.data)

        if (response.data.success) {
          // Show success message and redirect
          toast.success('Commercial rent agriculture listing created successfully!');
          // navigate('/dashboard'); // Redirect to dashboard or appropriate page
        }
      } else {
        navigate('/login');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to create commercial rent agriculture listing. Please try again.');
    }
  };

  return (
    <div>
    <div className="max-w-5xl mx-auto px-4 py-8">
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
          >
            {currentStep === formSections.length - 1 ? 'Submit' : 'Next'}
            <ChevronRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RentAgriculture;

