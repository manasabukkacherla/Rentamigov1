import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import PropertyName from '../PropertyName';
import ShowroomType from '../CommercialComponents/ShowroomType';
import CommercialPropertyAddress from '../CommercialComponents/CommercialPropertyAddress';
import Landmark from '../CommercialComponents/Landmark';
import MapCoordinates from '../MapCoordinates';
import CornerProperty from '../CommercialComponents/CornerProperty';
import ShowroomDetails from '../CommercialComponents/ShowroomDetails';
import CommercialPropertyDetails from '../CommercialComponents/CommercialPropertyDetails';
import Rent from '../residentialrent/Rent';
import SecurityDeposit from '../residentialrent/SecurityDeposit';
import MaintenanceAmount from '../residentialrent/MaintenanceAmount';
import OtherCharges from '../residentialrent/OtherCharges';
import Brokerage from '../residentialrent/Brokerage';
import AvailabilityDate from '../AvailabilityDate';
import CommercialContactDetails from '../CommercialComponents/CommercialContactDetails';
import CommercialMediaUpload from '../CommercialComponents/CommercialMediaUpload';
import { Home, Building2, DollarSign, Calendar, Phone, Image, Store, ChevronLeft, ChevronRight } from 'lucide-react';
import axios from 'axios';
import MapLocation from '../CommercialComponents/MapLocation';

interface FormData {
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
    location: {
      latitude: string;
      longitude: string;
    };
    isCornerProperty: boolean;
  };
  showroomDetails: {
    totalSpace: number;
    frontageWidth: number;
    ceilingHeight: number;
    glassFrontage: boolean;
    lightingType: string;
    acInstalled: boolean;
    nearbyCompetitors: {
      present: boolean;
      brandNames: string;
    };
    displayRacks: boolean;
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
      powerLoad: number | null;
      backup: boolean;
    };
    waterAvailability: string;
    propertyAge: string;
    propertyCondition: string;
  };
  rentalTerms: {
    rentDetails: {
      expectedRent: number;
      rentType: "inclusive" | "exclusive";
      isNegotiable: boolean;
    };
    securityDeposit: {
      amount: number;
    };
    maintenanceCharges: {
      amount: number;
      frequency: "monthly" | "quarterly" | "yearly" | "Half-yearly";
    };
    otherCharges: {
      water: {
        amount: number;
        type: string;
      };
      electricity: {
        amount: number;
        type: string;
      };
      gas: {
        amount: number;
        type: string;
      };
      others: {
        amount: number;
        type: string;
      };
    };
  };
  brokerage: {
    required: string;
    amount: number;
  };
  availability: {
    type: "immediate" | "specific";
    date: string;
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
    propertyType: 'Commercial';
    propertyName: 'Showroom';
    intent: 'Rent';
    status: 'Available' | 'Rented' | 'Under Maintenance';
  };
}

const RentShowroomMain = () => {
  const [formData, setFormData] = useState<FormData>({
    basicInformation: {
      title: '',
      Type: [],
      address: {
        street: '',
        city: '',
        state: '',
        zipCode: ''
      },
      landmark: '',
      location: {
        latitude: '',
        longitude: ''
      },
      isCornerProperty: false
    },
    showroomDetails: {
      totalSpace: 0,
      frontageWidth: 0,
      ceilingHeight: 0,
      glassFrontage: false,
      lightingType: '',
      acInstalled: false,
      nearbyCompetitors: {
        present: false,
        brandNames: ''
      },
      displayRacks: false
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
        powerLoad: null,
        backup: false
      },
      waterAvailability: '',
      propertyAge: '',
      propertyCondition: 'new'
    },
    rentalTerms: {
      rentDetails: {
        expectedRent: 0,
        rentType: 'inclusive',
        isNegotiable: false,
      },
      securityDeposit: {
        amount: 0,
      },
      maintenanceCharges: {
        amount: 0,
        frequency: 'monthly'
      },
      otherCharges: {
        water: {
          amount: 0,
          type: 'inclusive'
        },
        electricity: {
          amount: 0,
          type: 'inclusive'
        },
        gas: {
          amount: 0,
          type: 'inclusive'
        },
        others: {
          amount: 0,
          type: 'inclusive'
        },
      },
    },
    brokerage: {
      required: 'no',
      amount: 0
    },
    availability: {
      type: 'immediate',
      date: ''
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
      createdAt: new Date(),
      propertyType: 'Commercial',
      propertyName: 'Showroom',
      intent: 'Rent',
      status: 'Available'
    }
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleRentChange = (rent: Record<string, any>) => {
    setFormData(prev => ({
      ...prev,
      rentalTerms: {
        ...prev.rentalTerms,
        expectedRent: rent.expectedRent || 0,
        isNegotiable: rent.isNegotiable || false,
        rentType: rent.rentType || 'inclusive'
      }
    }));
  };

  const handleMaintenanceAmountChange = (maintenance: Record<string, any>) => {
    setFormData(prev => ({
      ...prev,
      rentalTerms: {
        ...prev.rentalTerms,
        maintenanceCharges: {
          amount: maintenance.amount || 0,
          frequency: maintenance.frequency || 'monthly'
        }
      }
    }));
  };

  const handleBrokerageChange = (brokerage: Record<string, any>) => {
    setFormData(prev => ({
      ...prev,
      brokerage: {
        required: brokerage.required || 'no',
        amount: brokerage.amount || 0
      }
    }));
  };

  const handleAvailabilityChange = (availability: Record<string, any>) => {
    setFormData(prev => ({
      ...prev,
      availability: {
        ...prev.availability,
        immediate: availability.immediate || false,
        specificDate: availability.specificDate || new Date(),
        availableImmediately: availability.availableImmediately || false,
        leaseDuration: availability.leaseDuration || '',
        noticePeriod: availability.noticePeriod || '',
        petsAllowed: availability.petsAllowed || false,
        operatingHours: {
          restricted: availability.operatingHours?.restricted || false,
          restrictions: availability.operatingHours?.restrictions || ''
        }
      }
    }));
  };

  const handleContactChange = (contact: Record<string, any>) => {
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

  const validateCurrentStep = () => {
    const errors: Record<string, string> = {};
    // Add validation logic here
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const renderFormSection = (content: React.ReactNode) => (
    <div className="space-y-4">
      {Object.keys(formErrors).length > 0 && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
          <div className="flex items-center">
            <svg className="h-5 w-5 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-red-800 font-medium">Please fix the following errors:</h3>
          </div>
          <ul className="mt-2 list-disc list-inside text-red-600">
            {Object.values(formErrors).map((error, index) => (
              <li key={index} className="text-sm">{error}</li>
            ))}
          </ul>
        </div>
      )}
      {content}
    </div>
  );

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
          {/* <div className="space-y-8"> */}
          <PropertyName
            propertyName={formData.basicInformation.title}
            onPropertyNameChange={(name) => setFormData({ ...formData, basicInformation: { ...formData.basicInformation, title: name } })}
          />
          <ShowroomType
            onTypeChange={(type) => setFormData(prev => ({
              ...prev,
              basicInformation: {
                ...prev.basicInformation,
                Type: Array.isArray(type) ? type : [type]
              }
            }))}
          />
          {/* </div> */}


          <CommercialPropertyAddress
            address={formData.basicInformation.address}
            onAddressChange={(address) => setFormData({ ...formData, basicInformation: { ...formData.basicInformation, address } })}
          />
          {/* <Landmark
            onLandmarkChange={(landmark) => setFormData({ ...formData, basicInformation: { ...formData.basicInformation, landmark } })}
          /> */}
          <MapLocation
            latitude={formData.basicInformation.location.latitude.toString()}
            longitude={formData.basicInformation.location.longitude.toString()}
            landmark={formData.basicInformation.landmark}
            onLocationChange={(location) => handleChange('basicInformation.location', location)}
            onAddressChange={(address) => handleChange('basicInformation.address', address)}
            onLandmarkChange={(landmark) => handleChange('basicInformation.landmark', landmark)}
          />
          <CornerProperty
            isCornerProperty={formData.basicInformation.isCornerProperty}
            onCornerPropertyChange={(isCorner) => setFormData({ ...formData, basicInformation: { ...formData.basicInformation, isCornerProperty: isCorner } })}
          />
        </div>
      )
    },
    {
      title: 'Property Details',
      icon: <Building2 className="w-6 h-6" />,
      content: (
        <div className="space-y-8">
          <ShowroomDetails
            onDetailsChange={(details) => setFormData(prev => ({
              ...prev,
              showroomDetails: {
                totalSpace: details.totalSpace || 0,
                frontageWidth: details.frontageWidth || 0,
                ceilingHeight: details.ceilingHeight || 0,
                glassFrontage: details.glassFrontage || false,
                lightingType: details.lightingType || '',
                acInstalled: details.acInstalled || false,
                nearbyCompetitors: {
                  present: details.nearbyCompetitors?.present || false,
                  brandNames: details.nearbyCompetitors?.brandNames || ''
                },
                displayRacks: details.displayRacks || false
              }
            }))}
          />
          <CommercialPropertyDetails
            onDetailsChange={(details) => setFormData({ ...formData, propertyDetails: details })}
          />
        </div>
      )
    },
    {
      title: 'Rental Terms',
      icon: <DollarSign className="w-6 h-6" />,
      content: (
        <div className="space-y-8">
          <Rent
            rentDetails={formData.rentalTerms.rentDetails}
           onRentChange={handleRentChange} />
          {formData.rentalTerms.rentDetails.rentType === 'exclusive' && (
            <MaintenanceAmount
              maintenanceAmount={formData.rentalTerms.maintenanceCharges}
              onMaintenanceAmountChange={handleMaintenanceAmountChange}
            />
          )}
          <SecurityDeposit
            deposit={formData.rentalTerms.securityDeposit}
            onSecurityDepositChange={(deposit: Record<string, any>) => setFormData(prev => ({
              ...prev,
              rentalTerms: {
                ...prev.rentalTerms,
                securityDeposit: {
                  amount: deposit.amount,
                  depositType: deposit.depositType || ''
                }
              }
            }))}
          />

          <OtherCharges
            otherCharges={formData.rentalTerms.otherCharges}
            onOtherChargesChange={(charges) => setFormData(prev => ({
              ...prev,
              rentalTerms: {
                ...prev.rentalTerms,
                otherCharges: {
                  water: { type: charges.water.type, amount: charges.water.amount },
                  electricity: { type: charges.electricity.type, amount: charges.electricity.amount },
                  gas: { type: charges.gas.type, amount: charges.gas.amount },
                  others: { type: charges.others.type, amount: charges.others.amount }
                }
              }
            }))}
          />
          {/* <div className="border-t border-gray-200 my-4"></div> */}
          <Brokerage
          bro={formData.brokerage}
            onBrokerageChange={(brokerage) => setFormData(prev => ({
              ...prev,
              rentalTerms: {
                ...prev.rentalTerms,
                brokerage: {
                  required: brokerage.required,
                  amount: brokerage.amount
                }
              }
            }))}
          />
        </div>
      )
    },
    {
      title: 'Availability',
      icon: <Calendar className="w-6 h-6" />,
      content: (
        <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
          <AvailabilityDate
          availability={formData.availability}
            onAvailabilityChange={(availability) => setFormData(prev => ({
              ...prev,
              rentalTerms: {
                ...prev.rentalTerms,
                availability: {
                  type: availability.type,
                  date: availability.date
                }
              }
            }))}
          />
        </div>
      )
    },
    {
      title: 'Contact Information',
      icon: <Phone className="w-6 h-6" />,
      content: (
        <div className="space-y-6">
          <CommercialContactDetails
          contactInformation={formData.contactInformation}
            onContactChange={(contact) => setFormData(prev => ({
              ...prev,
              contactInformation: {
                name: contact.name,
                email: contact.email,
                phone: contact.phone,
                alternatePhone: contact.alternatePhone,
                bestTimeToContact: contact.bestTimeToContact
              }
            }))}
          />
        </div>
      )
    },
    {
      title: 'Property Media',
      icon: <Image className="w-6 h-6" />,
      content: (
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
              const photos: Record<string, File[]> = {};
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
                  videoTour: media.videoTour || null,
                  documents: media.documents
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

  // Add validation for numeric fields
  const validateNumericField = (value: number | null, fieldName: string): boolean => {
    if (value === null) return true; // Allow null values
    if (isNaN(value)) {
      toast.error(`Please enter a valid number for ${fieldName}`);
      return false;
    }
    if (value <= 0) {
      toast.error(`${fieldName} must be greater than 0`);
      return false;
    }
    return true;
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const formRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    setIsSubmitting(true);

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
            ...formData.metadata,
            createdBy: author,
            createdAt: new Date(),
            propertyType: 'Commercial',
            propertyName: 'Showroom',
            intent: 'Rent',
            status: 'Available',
          }
        };

        const response = await axios.post('/api/commercial/rent/showrooms', transformedData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (response.data.success) {
          toast.success('Commercial rent showroom listing created successfully!');
        }
      } else {
        navigate('/login');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to create commercial rent showroom listing. Please try again.');
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
        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-black">Rent Commercial Showroom</h1>
          </div>
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-black mb-2">{formSections[currentStep].title}</h2>
            <p className="text-gray-600">Please fill in the details for your property</p>
          </div>

          {formSections[currentStep].content}

          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
            <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between">
              <button
                onClick={handlePrevious}
                disabled={currentStep === 0 || isSubmitting}
                className={`flex items-center px-6 py-2 rounded-lg border border-black/20 transition-all duration-200 ${currentStep === 0 || isSubmitting
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-black hover:bg-black hover:text-white"
                  }`}
              >
                <ChevronLeft className="w-5 h-5 mr-2" />
                Previous
              </button>
              <button
                onClick={currentStep === formSections.length - 1 ? handleSubmit : handleNext}
                disabled={isSubmitting}
                className={`flex items-center px-6 py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition-all duration-200 ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                  }`}
              >
                {isSubmitting ? "Submitting..." : currentStep === formSections.length - 1 ? 'Submit' : 'Next'}
                <ChevronRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
  );
};

export default RentShowroomMain;