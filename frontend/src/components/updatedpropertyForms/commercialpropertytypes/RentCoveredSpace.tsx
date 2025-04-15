import React, { useState } from 'react';
import PropertyName from '../PropertyName';
import CoveredOpenSpaceType from '../CommercialComponents/CoveredOpenSpaceType';
import CommercialPropertyAddress from '../CommercialComponents/CommercialPropertyAddress';
import Landmark from '../CommercialComponents/Landmark';
import MapCoordinates from '../MapCoordinates';
import CornerProperty from '../CommercialComponents/CornerProperty';
import CoveredOpenSpaceDetails from '../CommercialComponents/CoveredOpenSpaceDetails';
import CommercialPropertyDetails from '../CommercialComponents/CommercialPropertyDetails';
import Rent from '../residentialrent/Rent';
import SecurityDeposit from '../residentialrent/SecurityDeposit';
import MaintenanceAmount from '../residentialrent/MaintenanceAmount';
import OtherCharges from '../residentialrent/OtherCharges';
import Brokerage from '../residentialrent/Brokerage';
import AvailabilityDate from '../AvailabilityDate';
import CommercialContactDetails from '../CommercialComponents/CommercialContactDetails';
import CommercialMediaUpload from '../CommercialComponents/CommercialMediaUpload';

// Define interfaces based on backend model
interface IArea {
  totalArea: number;
  builtUpArea: number;
  carpetArea: number;
}

interface IBasicInformation {
  title: string;
  spaceType: string[];
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  landmark: string;
  location: {
    latitude: number;
    longitude: number;
  };
  isCornerProperty: boolean;
}

interface ISpaceDetails {
  totalArea: number;
  squareFeet: number;
  coveredArea: number;
  openArea: number;
  roadWidth: {
    value: number;
    unit: "feet" | "meters";
  };
  ceilingHeight: {
    value: number;
    unit: "feet" | "meters";
  };
  noOfOpenSides: string;
}

interface IAvailability {
  availableFrom?: string;
  availableImmediately: boolean;
}

interface IContactInformation {
  name: string;
  email: string;
  phone: string;
  alternatePhone?: string;
  bestTimeToContact?: string;
}

interface IMedia {
  photos: {
    exterior: string[];
    interior: string[];
    floorPlan: string[];
    washrooms: string[];
    lifts: string[];
    emergencyExits: string[];
  };
  videoTour?: string;
  documents: string[];
}

interface IRentalTerms {
  rentDetails: {
    expectedRent: number;
    isNegotiable: boolean;
    rentType: string;
  };
  securityDeposit: {
    amount: number;
  };
  maintenanceAmount: {
    amount: number;
    frequency: string;
  };
  otherCharges: {
    water: {
      amount?: number;
      type: string;
    };
    electricity: {
      amount?: number;
      type: string;
    };
    gas: {
      amount?: number;
      type: string;
    };
    others: {
      amount?: number;
      type: string;
    };
  };
  brokerage: {
    required: string;
    amount?: number;
  };
  availability: {
    type: string;
    date?: string;
  };
}

interface IFloor {
  floorNumber: number;
  totalFloors: number;
}

interface IFormData {
  basicInformation: IBasicInformation;
  spaceDetails: ISpaceDetails;
  propertyDetails: {
    area: IArea;
    floor: IFloor;
    facingDirection: string;
    furnishingStatus: string;
    propertyAmenities: string[];
    wholeSpaceAmenities: string[];
    electricitySupply: {
      powerLoad: number;
      backup: boolean;
    };
    waterAvailability: string;
    propertyAge: number;
    propertyCondition: string;
  };
  rentalTerms: IRentalTerms;
  availability: IAvailability;
  contactInformation: IContactInformation;
  media: IMedia;
}

const RentCoveredSpace = () => {
  const [formData, setFormData] = useState<IFormData>({
    basicInformation: {
      title: '',
      spaceType: [],
      address: {
        street: '',
        city: '',
        state: '',
        zipCode: '',
      },
      landmark: '',
      location: {
        latitude: 0,
        longitude: 0,
      },
      isCornerProperty: false,
    },
    spaceDetails: {
      totalArea: 0,
      squareFeet: 0,
      coveredArea: 0,
      openArea: 0,
      roadWidth: {
        value: 0,
        unit: 'feet',
      },
      ceilingHeight: {
        value: 0,
        unit: 'feet',
      },
      noOfOpenSides: '',
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
      facingDirection: '',
      furnishingStatus: '',
      propertyAmenities: [],
      wholeSpaceAmenities: [],
      electricitySupply: {
        powerLoad: 0,
        backup: false,
      },
      waterAvailability: '',
      propertyAge: 0,
      propertyCondition: '',
    },
    rentalTerms: {
      rentDetails: {
        expectedRent: 0,
        isNegotiable: false,
        rentType: '',
      },
      securityDeposit: {
        amount: 0,
      },
      maintenanceAmount: {
        amount: 0,
        frequency: '',
      },
      otherCharges: {
        water: {
          amount: 0,
          type: '',
        },
        electricity: {
          amount: 0,
          type: '',
        },
        gas: {
          amount: 0,
          type: '',
        },
        others: {
          amount: 0,
          type: '',
        },
      },
      brokerage: {
        required: '',
        amount: 0,
      },
      availability: {
        type: '',
        date: '',
      },
    },
    availability: {
      availableFrom: '',
      availableImmediately: true,
    },
    contactInformation: {
      name: '',
      email: '',
      phone: '',
      alternatePhone: '',
      bestTimeToContact: '',
    },
    media: {
      photos: {
        exterior: [],
        interior: [],
        floorPlan: [],
        washrooms: [],
        lifts: [],
        emergencyExits: [],
      },
      videoTour: '',
      documents: [],
    },
  });

  const [currentStep, setCurrentStep] = useState(0);

  // Handler functions
  const handlePropertyNameChange = (name: string): void => {
    setFormData(prev => ({
      ...prev,
      basicInformation: {
        ...prev.basicInformation,
        title: name
      }
    }));
  };

  const handleSpaceTypeChange = (types: string[]): void => {
    setFormData(prev => ({
      ...prev,
      basicInformation: {
        ...prev.basicInformation,
        spaceType: types
      }
    }));
  };

  const handleAddressChange = (address: { street: string; city: string; state: string; zipCode: string; }): void => {
    setFormData(prev => ({
      ...prev,
      basicInformation: {
        ...prev.basicInformation,
        address: address
      }
    }));
  };

  const handleLandmarkChange = (landmark: string): void => {
    setFormData(prev => ({
      ...prev,
      basicInformation: {
        ...prev.basicInformation,
        landmark: landmark
      }
    }));
  };

  const handleLatitudeChange = (lat: string): void => {
    setFormData(prev => ({
      ...prev,
      basicInformation: {
        ...prev.basicInformation,
        location: {
          ...prev.basicInformation.location,
          latitude: parseFloat(lat) || 0
        }
      }
    }));
  };

  const handleLongitudeChange = (lng: string): void => {
    setFormData(prev => ({
      ...prev,
      basicInformation: {
        ...prev.basicInformation,
        location: {
          ...prev.basicInformation.location,
          longitude: parseFloat(lng) || 0
        }
      }
    }));
  };

  const handleCornerPropertyChange = (isCorner: boolean): void => {
    setFormData(prev => ({
      ...prev,
      basicInformation: {
        ...prev.basicInformation,
        isCornerProperty: isCorner
      }
    }));
  };

  const handleSpaceDetailsChange = (details: Record<string, any>): void => {
    setFormData(prev => ({
      ...prev,
      spaceDetails: {
        ...prev.spaceDetails,
        ...details
      }
    }));
  };

  const handlePropertyDetailsChange = (details: Record<string, any>): void => {
    setFormData(prev => ({
      ...prev,
      propertyDetails: {
        ...prev.propertyDetails,
        ...details
      }
    }));
  };

  const handleRentChange = (rent: Record<string, any>): void => {
    setFormData(prev => ({
      ...prev,
      rentalTerms: {
        ...prev.rentalTerms,
        rentDetails: {
          ...prev.rentalTerms.rentDetails,
          expectedRent: rent.expectedRent || 0,
          isNegotiable: rent.isNegotiable || false,
          rentType: rent.rentType || ''
        }
      }
    }));
  };

  const handleMaintenanceAmountChange = (maintenance: Record<string, any>): void => {
    setFormData(prev => ({
      ...prev,
      rentalTerms: {
        ...prev.rentalTerms,
        maintenanceAmount: {
          amount: maintenance.amount || 0,
          frequency: maintenance.frequency || ''
        }
      }
    }));
  };

  const handleSecurityDepositChange = (deposit: Record<string, any>): void => {
    setFormData(prev => ({
      ...prev,
      rentalTerms: {
        ...prev.rentalTerms,
        securityDeposit: {
          amount: deposit.amount || 0
        }
      }
    }));
  };

  const handleOtherChargesChange = (charges: Record<string, any>): void => {
    setFormData(prev => ({
      ...prev,
      rentalTerms: {
        ...prev.rentalTerms,
        otherCharges: {
          water: {
            amount: charges.water?.amount || 0,
            type: charges.water?.type || ''
          },
          electricity: {
            amount: charges.electricity?.amount || 0,
            type: charges.electricity?.type || ''
          },
          gas: {
            amount: charges.gas?.amount || 0,
            type: charges.gas?.type || ''
          },
          others: {
            amount: charges.others?.amount || 0,
            type: charges.others?.type || ''
          }
        }
      }
    }));
  };

  const handleBrokerageChange = (brokerage: Record<string, any>): void => {
    setFormData(prev => ({
      ...prev,
      rentalTerms: {
        ...prev.rentalTerms,
        brokerage: {
          required: brokerage.required || '',
          amount: brokerage.amount || 0
        }
      }
    }));
  };

  const handleAvailabilityChange = (availability: { type: 'immediate' | 'specific'; date?: string | undefined; }): void => {
    // Get today's date in ISO format for immediate availability
    const today = new Date().toISOString().split('T')[0];
    
    setFormData(prev => ({
      ...prev,
      rentalTerms: {
        ...prev.rentalTerms,
        availability: {
          type: availability.type || '',
          date: availability.type === 'immediate' ? today : (availability.date || '')
        }
      },
      availability: {
        availableImmediately: availability.type === 'immediate',
        availableFrom: availability.type === 'immediate' ? today : (availability.date || '')
      }
    }));
  };

  const handleContactChange = (contact: Record<string, any>): void => {
    setFormData(prev => ({
      ...prev,
      contactInformation: {
        name: contact.name || '',
        email: contact.email || '',
        phone: contact.phone || '',
        alternatePhone: contact.alternatePhone || '',
        bestTimeToContact: contact.bestTimeToContact || ''
      }
    }));
  };

  const handleMediaChange = (media: { images: { category: string; files: { url: string; file: File; }[]; }[]; video?: { url: string; file: File; } | undefined; documents: { type: string; file: File; }[]; }): void => {
    // Transform the media data to match the backend structure
    const transformedMedia: IMedia = {
      photos: {
        exterior: [] as string[],
        interior: [] as string[],
        floorPlan: [] as string[],
        washrooms: [] as string[],
        lifts: [] as string[],
        emergencyExits: [] as string[]
      },
      videoTour: media.video?.url || '',
      documents: media.documents.map(doc => doc.file.name)
    };

    // Map the images to their respective categories
    media.images.forEach(category => {
      const urls = category.files.map(file => file.url);
      switch (category.category) {
        case 'exterior':
          transformedMedia.photos.exterior = urls;
          break;
        case 'interior':
          transformedMedia.photos.interior = urls;
          break;
        case 'floorPlan':
          transformedMedia.photos.floorPlan = urls;
          break;
        case 'washrooms':
          transformedMedia.photos.washrooms = urls;
          break;
        case 'lifts':
          transformedMedia.photos.lifts = urls;
          break;
        case 'emergencyExits':
          transformedMedia.photos.emergencyExits = urls;
          break;
        default:
          break;
      }
    });

    setFormData(prev => ({
      ...prev,
      media: transformedMedia
    }));
  };

  const formSections = [
    {
      title: 'Basic Information',
      content: (
        <>
          <PropertyName propertyName={formData.basicInformation.title} onPropertyNameChange={handlePropertyNameChange} />
          <CoveredOpenSpaceType onSpaceTypeChange={handleSpaceTypeChange} />
          <CommercialPropertyAddress onAddressChange={handleAddressChange} />
          <Landmark onLandmarkChange={handleLandmarkChange} />
          <MapCoordinates 
            latitude={formData.basicInformation.location.latitude.toString()} 
            longitude={formData.basicInformation.location.longitude.toString()} 
            onLatitudeChange={handleLatitudeChange} 
            onLongitudeChange={handleLongitudeChange} 
          />
          <CornerProperty onCornerPropertyChange={handleCornerPropertyChange} />
        </>
      )
    },
    {
      title: 'Property Details',
      content: (
        <>
          <CoveredOpenSpaceDetails onDetailsChange={handleSpaceDetailsChange} />
          <CommercialPropertyDetails onDetailsChange={handlePropertyDetailsChange} />
        </>
      )
    },
    {
      title: 'Rental Terms',
      content: (
        <>
          <Rent onRentChange={handleRentChange} />
          {formData.rentalTerms.rentDetails.rentType === 'exclusive' && (
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Data:', formData);
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
          >
            Previous
          </button>
        )}
        {currentStep < formSections.length - 1 ? (
          <button
            type="button"
            onClick={handleNext}
            className="flex items-center px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-200 ml-auto"
          >
            Next
          </button>
        ) : (
          <button
            type="submit"
            className="flex items-center px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-200 ml-auto"
          >
            List Property
          </button>
        )}
      </div>
    </form>
  );
};

export default RentCoveredSpace;

