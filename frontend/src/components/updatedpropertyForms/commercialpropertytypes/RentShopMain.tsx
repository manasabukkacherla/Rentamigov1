"use client"

import React, { useState, useEffect, useRef } from "react"
import { toast } from 'react-toastify'
import MapSelector from "../MapSelector"
import ShopDetails from "../CommercialComponents/ShopDetails"
import CommercialPropertyDetails from "../CommercialComponents/CommercialPropertyDetails"
import Rent from "../residentialrent/Rent"
import SecurityDeposit from "../residentialrent/SecurityDeposit"
import MaintenanceAmount from "../residentialrent/MaintenanceAmount"
import OtherCharges from "../residentialrent/OtherCharges"
import Brokerage from "../residentialrent/Brokerage"
import AvailabilityDate from "../AvailabilityDate"
import CommercialContactDetails from "../CommercialComponents/CommercialContactDetails"
import CommercialMediaUpload from "../CommercialComponents/CommercialMediaUpload"
import { Store, MapPin, ChevronRight, ChevronLeft, Building2, Image, UserCircle, ImageIcon, DollarSign, Calendar, Loader2 } from "lucide-react"
import CommercialPropertyAddress from "../CommercialComponents/CommercialPropertyAddress"
import Landmark from "../CommercialComponents/Landmark"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import PropertyName from "../PropertyName"
import ShopType from "../CommercialComponents/ShopType"
import CornerProperty from "../CommercialComponents/CornerProperty"

interface IBasicInformation {
  title: string;
  shopType: string[];
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

interface IShopDetails {
  frontageWidth: number;
  heightOfShop: number;
  displayWindow: boolean;
  attachedStorageRoom: boolean;
  averageFootTraffic: string;
  customerParking: boolean;
  previousBusiness: string;
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

interface IContactInformation {
  name: string;
  email: string;
  phone: string;
  alternatePhone?: string;
  bestTimeToContact?: string;
}

interface IMedia {
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
}

interface FormData {
  basicInformation: IBasicInformation;
  shopDetails: IShopDetails;
  rentalTerms: IRentalTerms;
  contactInformation: IContactInformation;
  media: IMedia;
}

interface PropertyNameProps {
  propertyName: string;
  onPropertyNameChange: (name: string) => void;
}

interface ShopTypeProps {
  onShopTypeChange: (types: string[]) => void;
}

interface CornerPropertyProps {
  onCornerPropertyChange: (isCorner: boolean) => void;
}

interface ShopDetailsProps {
  onDetailsChange: (details: IShopDetails) => void;
}

interface RentProps {
  onRentChange: (rent: { expectedRent: number; isNegotiable: boolean; rentType: string }) => void;
}

interface SecurityDepositProps {
  onSecurityDepositChange: (deposit: { amount: number }) => void;
}

interface MaintenanceAmountProps {
  onMaintenanceAmountChange: (maintenance: { amount: number; frequency: string }) => void;
}

interface OtherChargesProps {
  onOtherChargesChange: (charges: {
    water: { type: string; amount?: number };
    electricity: { type: string; amount?: number };
    gas: { type: string; amount?: number };
    others: { type: string; amount?: number };
  }) => void;
}

interface BrokerageProps {
  onBrokerageChange: (brokerage: { required: string; amount?: number }) => void;
}

interface AvailabilityDateProps {
  onAvailabilityChange: (availability: { type: string; date?: string }) => void;
}

interface CommercialContactDetailsProps {
  onContactChange: (contact: IContactInformation) => void;
}

interface CommercialMediaUploadProps {
  onMediaChange: (media: {
    images: { category: string; files: { file: File }[] }[];
    video?: { file: File };
    documents: { file: File }[];
  }) => void;
}

const RentShopMain = () => {
  const navigate = useNavigate();
  const formRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState<FormData>({
    basicInformation: {
      title: '',
      shopType: [],
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
    shopDetails: {
      frontageWidth: 0,
      heightOfShop: 0,
      displayWindow: false,
      attachedStorageRoom: false,
      averageFootTraffic: 'low',
      customerParking: false,
      previousBusiness: ''
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
        frequency: ''
      },
      otherCharges: {
        water: {
          type: '',
          amount: 0
        },
        electricity: {
          type: '',
          amount: 0
        },
        gas: {
          type: '',
          amount: 0
        },
        others: {
          type: '',
          amount: 0
        }
      },
      brokerage: {
        required: 'no'
      },
      availability: {
        type: 'immediate',
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
    }
  })

  const [currentStep, setCurrentStep] = useState(0)

  const handleLocationSelect = (latitude: string, longitude: string) => {
    setFormData({
      ...formData,
      basicInformation: {
        ...formData.basicInformation,
        location: {
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude)
        }
      }
    });
  };

  const formSections = [
    {
      title: "Basic Information",
      icon: <Store className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <PropertyName
            propertyName={formData.basicInformation.title}
            onPropertyNameChange={(name) => setFormData(prev => ({
              ...prev,
              basicInformation: { ...prev.basicInformation, title: name }
            }))}
          />
          <ShopType
            onShopTypeChange={(types) => setFormData(prev => ({
              ...prev,
              basicInformation: { ...prev.basicInformation, shopType: types }
            }))}
          />
          <CommercialPropertyAddress
            onAddressChange={(address) => setFormData(prev => ({
              ...prev,
              basicInformation: { ...prev.basicInformation, address }
            }))}
          />
          <Landmark
            onLandmarkChange={(landmark) => setFormData(prev => ({
              ...prev,
              basicInformation: { ...prev.basicInformation, landmark }
            }))}
            onLocationSelect={(location) => setFormData(prev => ({
              ...prev,
              basicInformation: {
                ...prev.basicInformation,
                location: {
                  latitude: parseFloat(location.latitude),
                  longitude: parseFloat(location.longitude)
                }
              }
            }))}
          />
          <CornerProperty
            onCornerPropertyChange={(isCorner) => setFormData(prev => ({
              ...prev,
              basicInformation: { ...prev.basicInformation, isCornerProperty: isCorner }
            }))}
          />
        </div>
      ),
    },
    {
      title: "Shop Details",
      icon: <Building2 className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <ShopDetails
            onDetailsChange={(details) => setFormData(prev => ({
              ...prev,
              shopDetails: {
                frontageWidth: details.frontageWidth,
                heightOfShop: details.heightOfShop,
                displayWindow: details.displayWindow,
                attachedStorageRoom: details.attachedStorageRoom,
                averageFootTraffic: details.averageFootTraffic,
                customerParking: details.customerParking,
                previousBusiness: details.previousBusiness
              }
            }))}
          />
        </div>
      ),
    },
    {
      title: "Rental Terms",
      icon: <DollarSign className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <Rent
            onRentChange={(rent) => setFormData(prev => ({
              ...prev,
              rentalTerms: {
                ...prev.rentalTerms,
                rentDetails: {
                  expectedRent: rent.expectedRent,
                  isNegotiable: rent.isNegotiable,
                  rentType: rent.rentType
                }
              }
            }))}
          />
          {formData.rentalTerms.rentDetails.rentType === 'exclusive' && (
            <MaintenanceAmount
              onMaintenanceAmountChange={(maintenance) => setFormData(prev => ({
                ...prev,
                rentalTerms: {
                  ...prev.rentalTerms,
                  maintenanceAmount: {
                    amount: maintenance.amount,
                    frequency: maintenance.frequency
                  }
                }
              }))}
            />
          )}
          <SecurityDeposit
            onSecurityDepositChange={(deposit) => setFormData(prev => ({
              ...prev,
              rentalTerms: {
                ...prev.rentalTerms,
                securityDeposit: {
                  amount: deposit.amount
                }
              }
            }))}
          />
          <OtherCharges
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
          <Brokerage
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
      ),
    },
    {
      title: "Availability",
      icon: <Calendar className="w-5 h-5" />,
      content: (
        <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
          <AvailabilityDate
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
      ),
    },
    {
      title: "Contact Information",
      icon: <UserCircle className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <CommercialContactDetails
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
      ),
    },
    {
      title: "Property Media",
      icon: <ImageIcon className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
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
      ),
    },
  ];

  const [isSubmitting, setIsSubmitting] = useState(false)
  // const navigate = useNavigate()

  const handleNext = () => {
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

  const handleStepClick = (index: number) => {
    setCurrentStep(index)
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log(formData)

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

        const response = await axios.post('/api/commercial/rent/shops', transformedData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (response.data.success) {
          toast.success('Commercial rent shop listing created successfully!');
        }
      } else {
        navigate('/login');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to create commercial rent shop listing. Please try again.');
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
      {/* <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8"> */}
      {/* <div className="bg-white rounded-xl shadow-md overflow-hidden"> */}
      {/* <div ref={formRef} className="p-6 sm:p-10"> */}
      {/* <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-black">Rent Commercial Shop</h1>
          </div> */}

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-black">Rent Commercial Shop</h1>
        </div>
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-black mb-2">{formSections[currentStep].title}</h2>
          <p className="text-gray-600">Please fill in the details for your property</p>
        </div>

        {formSections[currentStep].content}
      </div>
      {/* Navigation Buttons */}
      {/* {!formSubmitted && ( */}
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
                {currentStep === formSections.length - 1 ? 'Submit' : 'Next'}
                <ChevronRight className="w-5 h-5 ml-2" />
              </>
            )}
          </button>
        </div>
      </div>
      {/* )} */}
    </div>
    // </div>
    // </div>
    // </div>
  )
}

export default RentShopMain

