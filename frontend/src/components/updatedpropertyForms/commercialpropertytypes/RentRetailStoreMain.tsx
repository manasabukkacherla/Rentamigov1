import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import PropertyName from '../PropertyName';
import RetailStoreType from '../CommercialComponents/RetailStoreType';
import CommercialPropertyAddress from '../CommercialComponents/CommercialPropertyAddress';
import Landmark from '../CommercialComponents/Landmark';
import MapCoordinates from '../MapCoordinates';
import CornerProperty from '../CommercialComponents/CornerProperty';
import RetailStoreDetails from '../CommercialComponents/RetailStoreDetails';
import CommercialPropertyDetails from '../CommercialComponents/CommercialPropertyDetails';
import Rent from '../residentialrent/Rent';
import SecurityDeposit from '../residentialrent/SecurityDeposit';
import MaintenanceAmount from '../residentialrent/MaintenanceAmount';
import OtherCharges from '../residentialrent/OtherCharges';
import Brokerage from '../residentialrent/Brokerage';
import AvailabilityDate from '../AvailabilityDate';
import CommercialContactDetails from '../CommercialComponents/CommercialContactDetails';
import CommercialMediaUpload from '../CommercialComponents/CommercialMediaUpload';
import { Store, MapPin, ChevronRight, ChevronLeft, Building2, Image, UserCircle, ImageIcon, Calendar, DollarSign } from "lucide-react"
import axios from 'axios';

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

interface FormData {
  basicInformation: {
    title: string;
    retailStoreType: string[];
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
  };
  retailStoreDetails: {
    location: string;
    anchorStores: boolean;
    footfallData: string;
    signageAllowed: boolean;
    sharedWashrooms: boolean;
    fireExit: boolean;
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
    electricitySupply: {
      powerLoad: number;
      backup: boolean;
    };
    waterAvailability: string[];
    propertyAge: number;
    propertyCondition: string;
  };
  rentalTerms: {
    rentDetails: {
      expectedRent: number;
      isNegotiable: boolean;
      rentType: string;
    };
    securityDeposit: {
      amount: number;
    };
    maintenanceAmount?: {
      amount?: number;
      frequency?: string;
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
  };
  contactInformation: {
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
  metadata: {
    createdBy: string;
    createdAt: Date;
  };
}

interface MediaUploadProps {
  images: Array<{ category: string; files: Array<{ url: string; file: File }> }>;
  video?: { url: string; file: File };
  documents: Array<{ type: string; file: File }>;
}

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

const RentRetailStoreMain = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    basicInformation: {
      title: '',
      retailStoreType: [],
      address: {
        street: '',
        city: '',
        state: '',
        zipCode: ''
      },
      landmark: '',
      location: {
        latitude: 0,
        longitude: 0
      },
      isCornerProperty: false
    },
    retailStoreDetails: {
      location: '',
      anchorStores: false,
      footfallData: '',
      signageAllowed: false,
      sharedWashrooms: false,
      fireExit: false
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
      electricitySupply: {
        powerLoad: 0,
        backup: false
      },
      waterAvailability: [],
      propertyAge: 0,
      propertyCondition: ''
    },
    rentalTerms: {
      rentDetails: {
        expectedRent: 0,
        isNegotiable: false,
        rentType: ''
      },
      securityDeposit: {
        amount: 0
      },
      maintenanceAmount: {
        amount: 0,
        frequency: ''
      },
      otherCharges: {
        water: {
          amount: 0,
          type: ''
        },
        electricity: {
          amount: 0,
          type: ''
        },
        gas: {
          amount: 0,
          type: ''
        },
        others: {
          amount: 0,
          type: ''
        }
      },
      brokerage: {
        required: '',
        amount: 0
      },
      availability: {
        type: '',
        date: ''
      }
    },
    contactInformation: {
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
    metadata: {
      createdBy: '',
      createdAt: new Date()
    }
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const formSections = [
    {
      title: 'Basic Information',
      icon: <Store className="w-5 h-5" />,
      content: renderFormSection(
        <div className="space-y-6">
          <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <Store className="w-6 h-6 text-black" />
              <h3 className="text-xl font-semibold text-black">Basic Details</h3>
            </div>
            <div className="space-y-6">
              <PropertyName
                propertyName={formData.basicInformation.title}
                onPropertyNameChange={(name) => setFormData({ ...formData, basicInformation: { ...formData.basicInformation, title: name } })}
              />
              <RetailStoreType
                onRetailTypeChange={(type) => setFormData({ ...formData, basicInformation: { ...formData.basicInformation, retailStoreType: type } })}
              />
            </div>
          </div>

          <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <MapPin className="w-6 h-6 text-black" />
              <h3 className="text-xl font-semibold text-black">Location Details</h3>
            </div>
            <div className="space-y-6">
              <CommercialPropertyAddress
                onAddressChange={(address) => setFormData({ ...formData, basicInformation: { ...formData.basicInformation, address } })}
              />
              <Landmark onLandmarkChange={(landmark) => setFormData({ ...formData, basicInformation: { ...formData.basicInformation, landmark } })} />
              
              <CornerProperty
                onCornerPropertyChange={(isCorner) => setFormData({ ...formData, basicInformation: { ...formData.basicInformation, isCornerProperty: isCorner } })}
              />
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Property Details',
      icon: <Building2 className="w-5 h-5" />,
      content: renderFormSection(
        <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <Building2 className="w-6 h-6 text-black" />
            <h3 className="text-xl font-semibold text-black">Property Details</h3>
          </div>
          <div className="space-y-6">
            <RetailStoreDetails
              onDetailsChange={(details) => {
                setFormData({
                  ...formData,
                  retailStoreDetails: {
                    location: details.location || '',
                    anchorStores: details.anchorStores || false,
                    footfallData: details.footfallData || '',
                    signageAllowed: details.signageAllowed || false,
                    sharedWashrooms: details.sharedWashrooms || false,
                    fireExit: details.fireExit || false
                  }
                });
              }}
            />
            <CommercialPropertyDetails
              onDetailsChange={(details) => {
                setFormData({
                  ...formData,
                  propertyDetails: {
                    area: {
                      totalArea: details.area?.totalArea || 0,
                      carpetArea: details.area?.carpetArea || 0,
                      builtUpArea: details.area?.builtUpArea || 0
                    },
                    floor: {
                      floorNumber: details.floor?.floorNumber || 0,
                      totalFloors: details.floor?.totalFloors || 0
                    },
                    facingDirection: details.facingDirection || '',
                    furnishingStatus: details.furnishingStatus || '',
                    propertyAmenities: details.propertyAmenities || [],
                    wholeSpaceAmenities: details.wholeSpaceAmenities || [],
                    electricitySupply: {
                      powerLoad: details.electricitySupply?.powerLoad || 0,
                      backup: details.electricitySupply?.backup || false
                    },
                    waterAvailability: details.waterAvailability || [],
                    propertyAge: details.propertyAge || 0,
                    propertyCondition: details.propertyCondition || ''
                  }
                });
              }}
            />
          </div>
        </div>
      )
    },
    {
      title: 'Rental Terms',
      icon: <DollarSign className="w-5 h-5" />,
      content: renderFormSection(
        <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <DollarSign className="w-6 h-6 text-black" />
            <h3 className="text-xl font-semibold text-black">Rental Terms</h3>
          </div>
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h4 className="text-lg font-medium text-black mb-4">Rent Information</h4>
              <div className="space-y-4 text-black">
                <Rent onRentChange={(rent) => {
                  setFormData({ 
                    ...formData, 
                    rentalTerms: {
                      ...formData.rentalTerms,
                      rentDetails: {
                        expectedRent: rent.expectedRent || 0,
                        isNegotiable: rent.isNegotiable || false,
                        rentType: rent.rentType || ""
                      }
                    }
                  })
                }} />
                {formData.rentalTerms.rentDetails.rentType === 'exclusive' && (
                  <MaintenanceAmount onMaintenanceAmountChange={(maintenance) => setFormData({ ...formData, rentalTerms: { ...formData.rentalTerms, maintenanceAmount: maintenance } })} />
                )}
                <SecurityDeposit onSecurityDepositChange={(deposit) => {
                  setFormData({
                    ...formData,
                    rentalTerms: {
                      ...formData.rentalTerms,
                      securityDeposit: {
                        amount: deposit.amount || 0
                      }
                    }
                  });
                }} />
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h4 className="text-lg font-medium text-black mb-4">Additional Charges</h4>
              <div className="space-y-4 text-black">
                <OtherCharges onOtherChargesChange={(charges) => {
                  setFormData({
                    ...formData,
                    rentalTerms: {
                      ...formData.rentalTerms,
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
                  });
                }} />
                <div className="border-t border-gray-200 my-4"></div>
                <Brokerage onBrokerageChange={(brokerage) => {
                  setFormData({
                    ...formData,
                    rentalTerms: {
                      ...formData.rentalTerms,
                      brokerage: {
                        required: brokerage.required || '',
                        amount: brokerage.amount || 0
                      }
                    }
                  });
                }} />
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Availability',
      icon: <Calendar className="w-5 h-5" />,
      content: renderFormSection(
        <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <Calendar className="w-6 h-6 text-black" />
            <h3 className="text-xl font-semibold text-black">Availability</h3>
          </div>
          <AvailabilityDate onAvailabilityChange={(availability) => setFormData({ ...formData, rentalTerms: { ...formData.rentalTerms, availability } })} />
        </div>
      )
    },
    {
      title: 'Contact Information',
      icon: <UserCircle className="w-5 h-5" />,
      content: renderFormSection(
        <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <UserCircle className="w-6 h-6 text-black" />
            <h3 className="text-xl font-semibold text-black">Contact Details</h3>
          </div>
          <CommercialContactDetails
            onContactChange={(contact) => {
              setFormData({
                ...formData,
                contactInformation: {
                  name: contact.name || '',
                  email: contact.email || '',
                  phone: contact.phone || '',
                  alternatePhone: contact.alternatePhone || '',
                  bestTimeToContact: contact.bestTimeToContact || ''
                }
              });
            }}
          />
        </div>
      )
    },
    {
      title: 'Property Media',
      icon: <ImageIcon className="w-5 h-5" />,
      content: renderFormSection(
        <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <ImageIcon className="w-6 h-6 text-black" />
            <h3 className="text-xl font-semibold text-black">Property Media</h3>
          </div>
          <CommercialMediaUpload
            onMediaChange={(media) => {
              const photos: Record<string, File[]> = {};
              media.images.forEach(({ category, files }) => {
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
                  videoTour: media.video?.file || null,
                  documents: media.documents.map(d => d.file)
                }
              }));
            }}
          />
        </div>
      )
    }
  ];

  const handleNext = () => {
    if (validateCurrentStep()) {
      if (currentStep < formSections.length - 1) {
        setCurrentStep(currentStep + 1);
      }
    } else {
      toast.error('Please fill in all required fields');
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
    // Add API submission logic here
    console.log('Form Data:', formData);
    try {
      const user = sessionStorage.getItem('user');
      if (user) {
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

        const convertedMedia = {
          photos: {
            exterior: await Promise.all((formData.media?.photos?.exterior ?? []).map(convertFileToBase64)),
            interior: await Promise.all((formData.media?.photos?.interior ?? []).map(convertFileToBase64)),
            floorPlan: await Promise.all((formData.media?.photos?.floorPlan ?? []).map(convertFileToBase64)),
            washrooms: await Promise.all((formData.media?.photos?.washrooms ?? []).map(convertFileToBase64)),
            lifts: await Promise.all((formData.media?.photos?.lifts ?? []).map(convertFileToBase64)),
            emergencyExits: await Promise.all((formData.media?.photos?.emergencyExits ?? []).map(convertFileToBase64))
          },
          videoTour: formData.media?.videoTour ? await convertFileToBase64(formData.media.videoTour) : undefined,
          documents: await Promise.all((formData.media?.documents ?? []).map(convertFileToBase64))
        };

        const transformedData = {
          ...formData,
          media: convertedMedia,
          metadata: {
            createdBy: author,
            createdAt: new Date()
          }
        };

        const response = await axios.post('/api/commercial-rent-retail-stores', transformedData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (response.data.success) {
          toast.success('Commercial rent retail store listing created successfully!');
        }
      } else {
        navigate('/login');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to create commercial rent retail store listing. Please try again.');
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
    <div className="min-h-screen bg-white">
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
            disabled={isSubmitting}
          >
            {currentStep === formSections.length - 1 ? (isSubmitting ? 'Submitting...' : 'Submit') : 'Next'}
            <ChevronRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RentRetailStoreMain;
