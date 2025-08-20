import React, { useState, useEffect, useRef } from 'react';
import PropertyName from '../PropertyName';
import ShedType from '../CommercialComponents/ShedType';
import CommercialPropertyAddress from '../CommercialComponents/CommercialPropertyAddress';
import Landmark from '../CommercialComponents/Landmark';
import MapCoordinates from '../MapCoordinates';
import CornerProperty from '../CommercialComponents/CornerProperty';
import ShedDetails from '../CommercialComponents/ShedDetails';
import CommercialPropertyDetails from '../CommercialComponents/CommercialPropertyDetails';
import Rent from '../residentialrent/Rent';
import SecurityDeposit from '../residentialrent/SecurityDeposit';
import MaintenanceAmount from '../residentialrent/MaintenanceAmount';
import OtherCharges from '../residentialrent/OtherCharges';
import Brokerage from '../residentialrent/Brokerage';
import AvailabilityDate from '../AvailabilityDate';
import CommercialContactDetails from '../CommercialComponents/CommercialContactDetails';
import CommercialMediaUpload from '../CommercialComponents/CommercialMediaUpload';
import axios from 'axios';
import { useRouter } from 'next/navigation';

import MapLocation from "../CommercialComponents/MapLocation"
import { toast } from 'react-toastify';

import { Store, MapPin, ChevronRight, ChevronLeft, Building2, Image, UserCircle, ImageIcon, Calendar, DollarSign } from "lucide-react"
import PropertySize from '../PropertySize';
import PropertyFeatures from '../PropertyFeatures';
import MediaUpload from '../MediaUpload';
import { useNavigate } from 'react-router-dom';

interface FormData {
  basicInformation: {
    title: string;
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
  propertyDetails: {
    propertySize: number;
    propertyFeatures: {
      bedrooms: number;
      washrooms: number;
      balconies: number;
      hasParking: boolean;
      parkingDetails?: {
        twoWheeler?: number;
        fourWheeler?: number;
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
      propertyOnFloor: string;
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
    };
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
    maintenanceAmount: {
      amount: number;
      frequency: string;
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
    amount?: number;
  };
  availability: {
    type: string;
    date?: string;
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
    propertyName: 'Shed';
    intent: 'Rent';
    status: 'Available' | 'Rented' | 'Under Maintenance';
  };
}

interface PropertyNameProps {
  value: string;
  onChange: (value: string) => void;
}

interface CommercialPropertyAddressProps {
  onAddressChange: (value: Record<string, string>) => void;
}

interface PropertySizeProps {
  onPropertySizeChange: (value: number) => void;
}

interface PropertyFeaturesProps {
  onFeaturesChange: (value: {
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
    propertyOnFloor: string;
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
  }) => void;
}

interface RentalTermsProps {
  onRentChange: (value: Record<string, any>) => void;
  onMaintenanceAmountChange: (value: Record<string, any>) => void;
  onSecurityDepositChange: (value: Record<string, any>) => void;
  onOtherChargesChange: (value: Record<string, any>) => void;
  onBrokerageChange: (value: Record<string, any>) => void;
  onAvailabilityChange: (value: Record<string, any>) => void;
}

interface AvailabilityDateProps {
  value: string;
  onChange: (value: string) => void;
}

interface ContactInformationProps {
  onContactChange: (value: Record<string, any>) => void;
}

interface MediaUploadProps {
  onMediaChange: (value: {
    images: { category: string; files: { url: string; file: File }[] }[];
    video?: { url: string; file: File };
    documents: { type: string; file: File }[];
  }) => void;
}


const RentShed = () => {
  const [formData, setFormData] = useState<FormData>({
    basicInformation: {
      title: '',
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
    propertyDetails: {
      propertySize: 0,
      propertyFeatures: {
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
        utilityArea: '',
        furnishingStatus: '',
        totalFloors: 0,
        propertyOnFloor: '',
        facing: '',
        propertyAge: '',
        superBuiltUpAreaSqft: 0,
        superBuiltUpAreaSqmt: 0,
        builtUpAreaSqft: 0,
        builtUpAreaSqmt: 0,
        carpetAreaSqft: 0,
        carpetAreaSqmt: 0,
        electricityAvailability: '',
        waterAvailability: {
          borewell: false,
          governmentSupply: false,
          tankerSupply: false
        }
      }
    },
    rentalTerms: {
      rentDetails: {
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
        }
      },
    },
    brokerage: {
      required: 'no',
      amount: 0
    },
    availability: {
      type: 'immediate',
      date: new Date().toISOString()
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
      propertyName: 'Shed',
      intent: 'Rent',
      status: 'Available',
    }
  });

  const [currentStep, setCurrentStep] = useState(0);
  const formRef = useRef<HTMLDivElement>(null);
  const handleChange = (key: string, value: any) => {
    setFormData((prev: FormData) => {
      const keys = key.split('.');
      if (keys.length > 1) {
        const newData = { ...prev };
        let current: Record<string, any> = newData;
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
      content: (
        <div className="space-y-6">
          <PropertyName
            propertyName={formData.basicInformation.title}
            onPropertyNameChange={(name) => setFormData({ ...formData, basicInformation: { ...formData.basicInformation, title: name } })}
          />
          <CommercialPropertyAddress
            address={formData.basicInformation.address}
            onAddressChange={(address) => setFormData({ ...formData, basicInformation: { ...formData.basicInformation, address } })}
          />
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
      icon: <Building2 className="w-5 h-5" />,
      content: (
        <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
          <PropertySize
            propertySize={formData.propertyDetails.propertySize}
            onPropertySizeChange={(value) => setFormData({ ...formData, propertyDetails: { ...formData.propertyDetails, propertySize: Number(value) } })}
          />
          <PropertyFeatures
            onFeaturesChange={(value) => {
              // Ensure all required properties are present with default values
              const propertyFeatures = {
                bedrooms: value.bedrooms || 0,
                washrooms: value.washrooms || 0,
                balconies: value.balconies || 0,
                hasParking: value.hasParking || false,
                parkingDetails: {
                  twoWheeler: value.parkingDetails?.twoWheeler || 0,
                  fourWheeler: value.parkingDetails?.fourWheeler || 0
                },
                extraRooms: {
                  servant: value.extraRooms?.servant || false,
                  puja: value.extraRooms?.puja || false,
                  store: value.extraRooms?.store || false,
                  others: value.extraRooms?.others || false
                },
                utilityArea: value.utilityArea || '',
                furnishingStatus: value.furnishingStatus || '',
                totalFloors: value.totalFloors || 0,
                propertyOnFloor: value.propertyOnFloor || '',
                facing: value.facing || '',
                propertyAge: value.propertyAge || '',
                superBuiltUpAreaSqft: value.superBuiltUpAreaSqft,
                superBuiltUpAreaSqmt: value.superBuiltUpAreaSqmt || 0,
                builtUpAreaSqft: value.builtUpAreaSqft || 0,
                builtUpAreaSqmt: value.builtUpAreaSqmt || 0,
                carpetAreaSqft: value.carpetAreaSqft || 0,
                carpetAreaSqmt: value.carpetAreaSqmt || 0,
                electricityAvailability: value.electricityAvailability || '',
                waterAvailability: {
                  borewell: value.waterAvailability?.borewell || false,
                  governmentSupply: value.waterAvailability?.governmentSupply || false,
                  tankerSupply: value.waterAvailability?.tankerSupply || false
                }
              };

              setFormData({
                ...formData,
                propertyDetails: {
                  ...formData.propertyDetails,
                  propertyFeatures
                }
              });
            }}
          />
        </div>
      )
    },
    {
      title: 'Rental Terms',
      icon: <DollarSign className="w-5 h-5" />,
      content: (

        <div className="space-y-6">


          <Rent rentDetails={formData.rentalTerms.rentDetails} onRentChange={(rent) => {
            setFormData({
              ...formData,
              rentalTerms: {
                ...formData.rentalTerms,
                rentDetails: {
                  ...formData.rentalTerms.rentDetails,
                  expectedRent: Number(rent.expectedRent) || 0,
                  isNegotiable: rent.isNegotiable || false,
                  rentType: rent.rentType || 'inclusive'
                }
              }
            });
          }} />
          {formData.rentalTerms.rentDetails.rentType === 'exclusive' && (
            <MaintenanceAmount maintenanceAmount={formData.rentalTerms.maintenanceAmount} onMaintenanceAmountChange={(maintenance) => setFormData({ ...formData, rentalTerms: { ...formData.rentalTerms, maintenanceAmount: maintenance } })} />
          )}
          <SecurityDeposit deposit={formData.rentalTerms.securityDeposit} onSecurityDepositChange={(deposit) => {
            setFormData({
              ...formData,
              rentalTerms: {
                ...formData.rentalTerms,
                securityDeposit: {
                  amount: Number(deposit.amount) || 0
                }
              }
            });
          }} />


          <OtherCharges otherCharges={formData.rentalTerms.otherCharges} onOtherChargesChange={(charges) => {
            setFormData({
              ...formData,
              rentalTerms: {
                ...formData.rentalTerms,
                otherCharges: {
                  water: {
                    amount: Number(charges.water?.amount) || 0,
                    type: charges.water?.type || 'inclusive'
                  },
                  electricity: {
                    amount: Number(charges.electricity?.amount) || 0,
                    type: charges.electricity?.type || 'inclusive'
                  },
                  gas: {
                    amount: Number(charges.gas?.amount) || 0,
                    type: charges.gas?.type || 'inclusive'
                  },
                  others: {
                    amount: Number(charges.others?.amount) || 0,
                    type: charges.others?.type || 'inclusive'
                  }
                }
              }
            });
          }} />

          <Brokerage bro={formData.brokerage} onBrokerageChange={(brokerage) => {
            setFormData({
              ...formData,
              brokerage: {
                required: brokerage.required || 'no',
                amount: Number(brokerage.amount) || 0
              }
            });
          }} />
        </div>
      )
    },
    {
      title: 'Availability',
      icon: <Calendar className="w-5 h-5" />,
      content: (
        <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
          <AvailabilityDate availability={formData.availability as { type: "immediate" | "specific"; date?: string }} onAvailabilityChange={(availability) => setFormData({
            ...formData,
            availability: {
              type: availability.type || 'immediate',
              date: availability.date || new Date().toISOString()
            }
          })} />
        </div>
      )
    },
    {
      title: 'Contact Information',
      icon: <UserCircle className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <CommercialContactDetails
            contactInformation={formData.contactInformation}
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

  // Simple validation function
  const validateCurrentStep = () => {
    // For simplicity, just return true
    // In a real implementation, this would validate the fields in the current step
    return true;
  };

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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

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
            createdAt: new Date(),
            propertyType: 'Commercial',
            propertyName: 'Shed',
            intent: 'Rent',
            status: 'Available',
          }
        };

        const response = await axios.post('/api/commercial/rent/sheds', transformedData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (response.data.success) {
          toast.success('Commercial rent shed listing created successfully!');
        }
      } else {
        navigate('/login');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to create commercial rent shed listing. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div ref={formRef} className="min-h-screen bg-white">
      {/* Progress Bar */}
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

      {/* Form Content */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-black">Rent Commercial Shed</h1>
        </div>
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-black mb-2">{formSections[currentStep].title}</h2>
          <p className="text-gray-600">Please fill in the details for your property</p>
        </div>

        {formSections[currentStep].content}
      </div>

      {/* Navigation Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between">
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
            className={`flex items-center px-6 py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition-all duration-200 ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""
              }`}
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

export default RentShed;