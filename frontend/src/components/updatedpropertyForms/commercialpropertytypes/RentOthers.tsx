import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import PropertyName from '../PropertyName';
import OtherCommercialType from '../CommercialComponents/OtherCommercialType';
import CommercialPropertyAddress from '../CommercialComponents/CommercialPropertyAddress';
import Landmark from '../CommercialComponents/Landmark';
import MapCoordinates from '../MapCoordinates';
import CornerProperty from '../CommercialComponents/CornerProperty';
import OtherPropertyDetails from '../CommercialComponents/OtherPropertyDetails';
import CommercialPropertyDetails from '../CommercialComponents/CommercialPropertyDetails';
import Rent from '../residentialrent/Rent';
import SecurityDeposit from '../residentialrent/SecurityDeposit';
import MaintenanceAmount from '../residentialrent/MaintenanceAmount';
import OtherCharges from '../residentialrent/OtherCharges';
import Brokerage from '../residentialrent/Brokerage';
import AvailabilityDate from '../AvailabilityDate';
import CommercialContactDetails from '../CommercialComponents/CommercialContactDetails';
import CommercialMediaUpload from '../CommercialComponents/CommercialMediaUpload';

// Define interface for form data structure based on the backend model
interface FormData {
  propertyName: string;
  commercialType: string[];
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
  otherDetails: {
    propertyTypeDescription?: string;
    specialFeatures?: string;
    usageRecommendation?: string;
    additionalRequirements?: string;
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
    rentType: 'inclusive' | 'exclusive';
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
    date?: string;
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
      others: File[];
    };
    videoTour?: File;
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
const RentOthers = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    propertyName: '',
    commercialType: [],
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: ''
    },
    landmark: '',
    coordinates: { latitude: '', longitude: '' },
    isCornerProperty: false,
    otherDetails: {
      propertyTypeDescription: '',
      specialFeatures: '',
      usageRecommendation: '',
      additionalRequirements: ''
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
      propertyAmenities: [],
      wholeSpaceAmenities: [],
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
      rentType: 'inclusive'
    },
    securityDeposit: {
      amount: 0
    },
    maintenanceAmount: {
      amount: 0,
      frequency: 'monthly'
    },
    otherCharges: {
      water: {
        type: 'inclusive',
        amount: 0
      },
      electricity: {
        type: 'inclusive',
        amount: 0
      },
      gas: {
        type: 'inclusive',
        amount: 0
      },
      others: {
        type: 'inclusive',
        amount: 0
      }
    },
    brokerage: {
      required: '',
      amount: 0
    },
    availability: {
      type: 'immediate'
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
        emergencyExits: [],
        others: []
      },
      videoTour: undefined,
      documents: []
    }
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handler functions
  const handlePropertyNameChange = (name: string) => {
    setFormData(prev => ({ ...prev, propertyName: name }));
  };
  
  const handleCommercialTypeChange = (types: string[]) => {
    setFormData(prev => ({ ...prev, commercialType: types }));
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
  
  const handleOtherDetailsChange = (details: Record<string, any>) => {
    setFormData(prev => ({ 
      ...prev, 
      otherDetails: { ...prev.otherDetails, ...details }
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
      const updated = { ...prev };
      
      if (!updated.maintenanceAmount) {
        updated.maintenanceAmount = { amount: 0, frequency: 'monthly' };
      } else {
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
  
  const handleAvailabilityChange = (availability: { type: 'immediate' | 'specific'; date?: string }) => {
    setFormData(prev => ({ 
      ...prev, 
      availability: {
        type: availability.type,
        date: availability.date
      }
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
          emergencyExits: media.images.find(img => img.category === 'emergencyExits')?.files.map(f => f.file) || [],
          others: media.images.find(img => img.category === 'others')?.files.map(f => f.file) || []
        },
        videoTour: media.video?.file,
        documents: media.documents.map(doc => doc.file)
      }
    }));
  };

  const formSections = [
    {
      title: 'Basic Information',
      content: (
        <>
          <PropertyName propertyName={formData.propertyName} onPropertyNameChange={handlePropertyNameChange} />
          <OtherCommercialType onCommercialTypeChange={handleCommercialTypeChange} />
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
          <OtherPropertyDetails onDetailsChange={handleOtherDetailsChange} />
          <CommercialPropertyDetails onDetailsChange={handlePropertyDetailsChange} />
        </>
      )
    },
    {
      title: 'Rental Terms',
      content: (
        <>
          <Rent onRentChange={handleRentChange} />
          {formData.rent.rentType === 'exclusive' && (
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
      content: <AvailabilityDate onAvailabilityChange={handleAvailabilityChange} />
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log('Form Data:', formData);
    try {
      const user = sessionStorage.getItem('user');
      if (user) {
        const author = JSON.parse(user).id;

        // Convert all media files to base64
        const convertedMedia = {
          photos: {
            exterior: await Promise.all((formData.media?.photos?.exterior || []).map(convertFileToBase64)),
            interior: await Promise.all((formData.media?.photos?.interior || []).map(convertFileToBase64)),
            floorPlan: await Promise.all((formData.media?.photos?.floorPlan || []).map(convertFileToBase64)),
            washrooms: await Promise.all((formData.media?.photos?.washrooms || []).map(convertFileToBase64)),
            lifts: await Promise.all((formData.media?.photos?.lifts || []).map(convertFileToBase64)),
            emergencyExits: await Promise.all((formData.media?.photos?.emergencyExits || []).map(convertFileToBase64)),
            others: await Promise.all((formData.media?.photos?.others || []).map(convertFileToBase64))
          },
          videoTour: formData.media?.videoTour ? await convertFileToBase64(formData.media.videoTour) : null,
          documents: await Promise.all((formData.media?.documents || []).map(convertFileToBase64))
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
        const response = await axios.post('/api/commercial/others', transformedData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        console.log(response.data)

        if (response.data.success) {
          // Show success message and redirect
          toast.success('Commercial rent others listing created successfully!');
          navigate('/dashboard'); // Redirect to dashboard or appropriate page
        }
      } else {
        toast.error('User not logged in');
        navigate('/login');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to create commercial rent others listing. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-12">
      <div className="space-y-12">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {formSections.map((s, i) => (
              <div
                key={i}
                className={`flex flex-col items-center ${i <= currentStep ? "text-black" : "text-gray-400"}`}
                onClick={() => i < currentStep && setCurrentStep(i)}
                style={{ cursor: i < currentStep ? "pointer" : "default" }}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                    i <= currentStep ? "bg-black text-white" : "bg-gray-200 text-gray-400"
                  }`}
                >
                  {i + 1}
                </div>
                <span className="text-xs font-medium">{s.title}</span>
              </div>
            ))}
          </div>
          <div className="w-full bg-gray-200 h-1 rounded-full">
            <div
              className="bg-black h-1 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / (formSections.length - 1)) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-black">{formSections[currentStep].title}</h2>
        </div>

        <div className="space-y-8">{formSections[currentStep].content}</div>
      </div>

      <div className="mt-8 flex justify-between items-center">
        {currentStep > 0 && (
          <button
            type="button"
            onClick={handlePrevious}
            className="flex items-center px-6 py-3 text-black border-2 border-gray-300 rounded-lg hover:border-black transition-colors duration-200"
            disabled={isSubmitting}
          >
            Previous
          </button>
        )}
        {currentStep < formSections.length - 1 ? (
          <button
            type="button"
            onClick={handleNext}
            className="flex items-center px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-200 ml-auto"
            disabled={isSubmitting}
          >
            Next
          </button>
        ) : (
          <button
            type="submit"
            className="flex items-center px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-200 ml-auto disabled:bg-gray-500 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'List Property'}
          </button>
        )}
      </div>
    </form>
  );
};

export default RentOthers;

