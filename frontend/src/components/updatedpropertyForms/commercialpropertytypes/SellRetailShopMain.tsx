"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import PropertyName from "../PropertyName"
import RetailStoreType from "../CommercialComponents/RetailStoreType"
import CommercialPropertyAddress from "../CommercialComponents/CommercialPropertyAddress"
import Landmark from "../CommercialComponents/Landmark"
import CornerProperty from "../CommercialComponents/CornerProperty"
import RetailStoreDetails from "../CommercialComponents/RetailStoreDetails"
import CommercialPropertyDetails from "../CommercialComponents/CommercialPropertyDetails"
import Price from "../sell/Price"
import RegistrationCharges from "../sell/RegistrationCharges"
import Brokerage from "../residentialrent/Brokerage"
import CommercialAvailability from "../CommercialComponents/CommercialAvailability"
import CommercialContactDetails from "../CommercialComponents/CommercialContactDetails"
import CommercialMediaUpload from "../CommercialComponents/CommercialMediaUpload"
import { MapPin, Building2, DollarSign, Calendar, User, Image, Store, ImageIcon, UserCircle, ChevronLeft, ChevronRight, Loader2 } from "lucide-react"
import axios from "axios"
import { toast } from "react-hot-toast"
import MapLocation from "../CommercialComponents/MapLocation"
import PriceDetails from "../CommercialComponents/PriceDetails"
// interface MediaFile {
//   url: string;
//   file: File;
// }

// interface MediaCategory {
//   category: string;
//   files: MediaFile[];
// }

// interface MediaDocument {
//   type: string;
//   file: File;
// }

interface FormDataState {
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
    waterAvailability: string;
    propertyAge: string;
    propertyCondition: string;
    ownershipType: string;
    possessionStatus: string;
  };
  priceDetails: {
    propertyPrice: number;
    pricetype: string;
  };
    registration: {
      chargestype: string;
      registrationAmount?: number;
      stampDutyAmount?: number;
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
    videoTour: File | null;
    documents: File[];
  };
  metadata?: {
    createdBy?: string;
    createdAt?: Date;
    isVerified?: boolean;
    propertyType?: string;
    propertyName?: string;
    intent?: string;
    status?: string;
  };
}

const SellRetailShopMain = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormDataState>({
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
      waterAvailability: '',
      propertyAge: '',
      propertyCondition: '',
      ownershipType: 'Freehold',
      possessionStatus: 'Ready to Move'
    },
    priceDetails: {
      propertyPrice: 0,
      pricetype: 'fixed',
    },
    registration: {
      chargestype: 'inclusive',
      registrationAmount: 0,
      stampDutyAmount: 0,
      
    },
    brokerage: {
      required: 'No',
      amount: 0
    },
    availability: {
        type: 'Ready to Move',
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
    }
  });

  const [currentStep, setCurrentStep] = useState(0)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const formRef = useRef<HTMLDivElement>(null);

  // Check login status on component mount
  useEffect(() => {
    const user = sessionStorage.getItem('user')
    if (!user) {
      navigate('/login')
    } else {
      setIsLoggedIn(true)
    }
  }, [navigate])

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

  // Define form steps
  const steps = [
    {
      title: "Basic Information",
      icon: <Store className="w-5 h-5" />,
      component: (
        <div className="space-y-8">
          <PropertyName
            propertyName={formData.basicInformation.title}
            onPropertyNameChange={(name: string) => setFormData({ ...formData, basicInformation: { ...formData.basicInformation, title: name } })}
          />
          <RetailStoreType onRetailTypeChange={(types: string[]) => setFormData({ ...formData, basicInformation: { ...formData.basicInformation, Type: types } })} />

          <CommercialPropertyAddress 
            address={formData.basicInformation.address}
            onAddressChange={(address) => setFormData({ ...formData, basicInformation: { ...formData.basicInformation, address } })} 
          />
          {/* <Landmark onLandmarkChange={(landmark) => setFormData({ ...formData, basicInformation: { ...formData.basicInformation, landmark } })} /> */}
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
      ),
    },
    {
      title: "Property Details",
      icon: <Building2 className="w-5 h-5" />,
      component: (
        <div className="space-y-6">
          <RetailStoreDetails
            onDetailsChange={(details) => setFormData({
              ...formData,
              retailStoreDetails: {
                location: details.location || '',
                anchorStores: details.anchorStores || false,
                footfallData: details.footfallData || '',
                signageAllowed: details.signageAllowed || false,
                sharedWashrooms: details.sharedWashrooms || false,
                fireExit: details.fireExit || false
              }
            })}
          />
          <CommercialPropertyDetails
            onDetailsChange={(details) => setFormData({
              ...formData,
              propertyDetails: {
                ...formData.propertyDetails,
                area: {
                  totalArea: parseFloat(details.area?.totalArea?.toString() || '0'),
                  carpetArea: parseFloat(details.area?.carpetArea?.toString() || '0'),
                  builtUpArea: parseFloat(details.area?.builtUpArea?.toString() || '0')
                },
                floor: {
                  floorNumber: parseInt(details.floor?.floorNumber?.toString() || '0'),
                  totalFloors: parseInt(details.floor?.totalFloors?.toString() || '0')
                },
                facingDirection: details.facingDirection || '',
                furnishingStatus: details.furnishingStatus || '',
                propertyAmenities: details.propertyAmenities || [],
                wholeSpaceAmenities: details.wholeSpaceAmenities || [],
                electricitySupply: {
                  powerLoad: parseFloat(details.electricitySupply?.powerLoad?.toString() || '0'),
                  backup: details.electricitySupply?.backup || false
                },
                waterAvailability: details.waterAvailability,
                propertyAge: details.propertyAge || '',
                propertyCondition: details.propertyCondition || ''
              }
            })}
          />
        </div>
      ),
    },
    {
      title: "Pricing Details",
      icon: <DollarSign className="w-5 h-5" />,
      component: (
        <div className="space-y-6">
          <div className="space-y-4 text-black">
        <Price onPriceChange={(price) => setFormData(prev => ({
           ...prev,
          priceDetails: {
            ...prev.priceDetails,
            propertyPrice:price.propertyPrice,
            pricetype: price.pricetype || 'fixed'
  }
}))} />
          </div>
         

          <div className="space-y-4 text-black">
            <div className="text-black">
              <RegistrationCharges
                onRegistrationChargesChange={(charges) => setFormData(prev => ({
                  ...prev,
                  registration: {
                    ...prev.registration,
                    chargestype: charges.chargestype,
                    registrationAmount: charges.registrationAmount,
                    stampDutyAmount: charges.stampDutyAmount,
                  }
                }))} />  
            </div>
            <div className="text-black">
              <Brokerage 
              bro={formData.brokerage}
              onBrokerageChange={(brokerage) => setFormData({
                ...formData,
                brokerage: {
                    required: brokerage.required || 'No',
                    amount: parseFloat(brokerage.amount?.toString() || '0')
                  }
                })}
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Availability",
      icon: <Calendar className="w-5 h-5" />,
      component: (
          <div className="space-y-6">
            <CommercialAvailability onAvailabilityChange={(availability) => setFormData({
              ...formData,
              availability: {
                type: availability.type || 'Ready to Move',
                date: availability.date
              }
            })} />
          </div>
      ),
    },
    {
      title: "Contact Information",
      icon: <UserCircle className="w-5 h-5" />,
      component: (
          <div className="space-y-6">
            <CommercialContactDetails   
              contactInformation={formData.contactInformation}
              onContactChange={(contact) => setFormData({
                ...formData,
                contactInformation: {
                  name: contact.name || '',
                  email: contact.email || '',
                  phone: contact.phone || '',
                  alternatePhone: contact.alternatePhone,
                  bestTimeToContact: contact.bestTimeToContact
                }
              })}
            />
          </div>
      ),
    },
    {
      title: "Property Media",
      icon: <ImageIcon className="w-5 h-5" />,
      component: (
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
      ),
    },
  ]

  // Navigation handlers
  const handleNext = () => {
    // if (validateCurrentStep()) {
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
    // } else {
    //   toast.error('Please fill in all required fields');
    // }
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

  // Validation function for each step
  function validateCurrentStep(): boolean {
    switch (currentStep) {
      case 0: // Basic Information
        return !!formData.basicInformation.title &&
          formData.basicInformation.Type.length > 0 &&
          !!formData.basicInformation.address.street;
      case 1: // Property Details
        return !!formData.retailStoreDetails.location &&
          formData.propertyDetails.area.totalArea > 0;
      case 2: // Pricing Details
        return formData.priceDetails.propertyPrice > 0;
      case 3: // Availability
        return !!formData.availability.type;
      case 4: // Contact Information
        return !!formData.contactInformation.name &&
          !!formData.contactInformation.email &&
          !!formData.contactInformation.phone;
      default:
        return true;
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    // Debug: log price before validation
    console.log('DEBUG price before validation:', formData.priceDetails.propertyPrice);
    e.preventDefault();
    console.log('Form Data:', formData);

    // Validate price and author before submission
    const user = sessionStorage.getItem('user');
    if (!user) {
      toast.error('You need to be logged in to create a listing');
      navigate('/login');
      return;
    }
    const userData = JSON.parse(user);
    const author = userData.id;
    if (!author) {
      toast.error('User information missing. Please log in again.');
      navigate('/login');
      return;
    }
    // Removed price > 0 validation as requested
    setIsSubmitting(true);

    try {
      const token = sessionStorage.getItem('token');
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
        videoTour: formData.media?.videoTour ? await convertFileToBase64(formData.media.videoTour) : null,
        documents: await Promise.all((formData.media?.documents ?? []).map(convertFileToBase64))
      };

      console.log('Sending data to backend with author ID:', author);

      const transformedData = {
        basicInformation: {
          ...formData.basicInformation,
          Type: Array.isArray(formData.basicInformation.Type)
          ? formData.basicInformation.Type
  : (formData.basicInformation.Type ? [formData.basicInformation.Type] : []),

          location: {
            latitude: formData.basicInformation.location.latitude,
            longitude: formData.basicInformation.location.longitude
          },
          address: {
            street: formData.basicInformation.address.street,
            city: formData.basicInformation.address.city,
            state: formData.basicInformation.address.state,
            zipCode: formData.basicInformation.address.zipCode
          },
          landmark: formData.basicInformation.landmark,
          isCornerProperty: formData.basicInformation.isCornerProperty,
          possessionStatus: formData.propertyDetails.possessionStatus,
          ownershipType: formData.propertyDetails.ownershipType,
          propertyAge: formData.propertyDetails.propertyAge,
          propertyCondition: formData.propertyDetails.propertyCondition,
          facingDirection: formData.propertyDetails.facingDirection,
          furnishingStatus: formData.propertyDetails.furnishingStatus,
          propertyAmenities: formData.propertyDetails.propertyAmenities,
          wholeSpaceAmenities: formData.propertyDetails.wholeSpaceAmenities,
          electricitySupply: {
            powerLoad: formData.propertyDetails.electricitySupply.powerLoad,
            backup: formData.propertyDetails.electricitySupply.backup
          },
          waterAvailability: formData.propertyDetails.waterAvailability,
          area: {
            totalArea: formData.propertyDetails.area.totalArea,
            carpetArea: formData.propertyDetails.area.carpetArea,
            builtUpArea: formData.propertyDetails.area.builtUpArea
          },
          floor: {
            floorNumber: formData.propertyDetails.floor.floorNumber,
            totalFloors: formData.propertyDetails.floor.totalFloors
          }
        },
        retailStoreDetails: {
          location: formData.retailStoreDetails.location,
          anchorStores: formData.retailStoreDetails.anchorStores,
          footfallData: formData.retailStoreDetails.footfallData,
          signageAllowed: formData.retailStoreDetails.signageAllowed,
          sharedWashrooms: formData.retailStoreDetails.sharedWashrooms,
          fireExit: formData.retailStoreDetails.fireExit
        },
        propertyDetails: {
          ...formData.propertyDetails,
          area: {
            totalArea: parseFloat(formData.propertyDetails.area.totalArea.toString()),
            carpetArea: parseFloat(formData.propertyDetails.area.carpetArea.toString()),
            builtUpArea: parseFloat(formData.propertyDetails.area.builtUpArea.toString())
          },
          floor: {
            floorNumber: parseInt(formData.propertyDetails.floor.floorNumber.toString()),
            totalFloors: parseInt(formData.propertyDetails.floor.totalFloors.toString())
          },
          facingDirection: formData.propertyDetails.facingDirection,
          furnishingStatus: formData.propertyDetails.furnishingStatus,
          propertyAmenities: formData.propertyDetails.propertyAmenities,
          wholeSpaceAmenities: formData.propertyDetails.wholeSpaceAmenities,
          electricitySupply: {
            powerLoad: parseFloat(formData.propertyDetails.electricitySupply.powerLoad.toString()),
            backup: formData.propertyDetails.electricitySupply.backup
          },
          waterAvailability: formData.propertyDetails.waterAvailability,
        },
          priceDetails: {
            propertyPrice: parseFloat(formData.priceDetails.propertyPrice.toString()),
            pricetype: formData.priceDetails.pricetype=='fixed'?'fixed':'negotiable'
          },
          registration: {
            chargestype: formData.registration.chargestype=='inclusive'?'inclusive':'exclusive',
            registrationAmount: formData.registration.registrationAmount ? parseFloat(formData.registration.registrationAmount.toString()) : 0,
            stampDutyAmount: formData.registration.stampDutyAmount ? parseFloat(formData.registration.stampDutyAmount.toString()) : 0,
          },
        
          brokerage: {
            required: formData.brokerage.required === "Yes" ? "Yes" : "No",
            amount: formData.brokerage.amount ? parseFloat(formData.brokerage.amount.toString()) : undefined
          },
          availability: {
            type: formData.availability.type,
            date: formData.availability.date
        },
        contactInformation: {
          ...formData.contactInformation,
          name: formData.contactInformation.name,
          email: formData.contactInformation.email,
          phone: formData.contactInformation.phone,
          alternatePhone: formData.contactInformation.alternatePhone,
          bestTimeToContact: formData.contactInformation.bestTimeToContact
        },
        media: convertedMedia,
        metadata: {
  createdAt: new Date(),
  isVerified: false,
  propertyType: 'Commercial',
  propertyName: 'Retail Store',
  intent: 'Sell',
  status: 'Available',
  createdBy: author // ensure createdBy is set from logged-in user
},
      };

      // Use the same format as in the backend routes configuration
      const API_ENDPOINT = '/api/commercial/sell/retail-store';
      console.log(`About to send API request to ${API_ENDPOINT}`);
      console.log('Request headers:', {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ''
      });

      console.log('Sending transformedData:', JSON.stringify(transformedData, null, 2));
       const response = await axios.post(API_ENDPOINT, transformedData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : ''
        }
      });

      console.log('API response:', response.data);

      if (response.data.success) {
        toast.success('Commercial sell retail shop listing created successfully!');
        setTimeout(() => {
          navigate('/updatePropertyform');
        }, 1500);
      } else {
        toast.error(response.data.error || 'Failed to create listing');
      }
    } catch (error: any) {
      console.error('Error submitting form:', error);

      // Improved error handling with better user feedback
      if (error.response) {
        // Server responded with an error
        const errorMessage = error.response.data.error || error.response.data.message || 'Failed to create listing';
        toast.error(errorMessage);
      } else if (error.request) {
        // Request was made but no response
        toast.error('No response from server. Please check your internet connection and try again.');
      } else {
        // Error in setting up the request
        toast.error('Failed to create commercial sell retail shop listing. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  // Show login prompt if not logged in
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
    )
  }

  return (
    <div ref={formRef} className="min-h-screen bg-white">
      {/* Progress indicator */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex justify-center">
            <div className="flex items-center space-x-2">
              {steps.map((s, i) => (
                <div
                  key={i}
                  className="flex items-center cursor-pointer"
                  onClick={() => setCurrentStep(i)}
                >
                  <div className="flex flex-col items-center group">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${i <= currentStep ? "bg-black text-white" : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                        }`}
                    >
                      {s.icon}
                    </div>
                    <span
                      className={`text-xs mt-1 font-medium transition-colors duration-200 ${i <= currentStep ? "text-black" : "text-gray-500 group-hover:text-gray-700"
                        }`}
                    >
                      {s.title}
                    </span>
                  </div>
                  {i < steps.length - 1 && (
                    <div className="flex items-center mx-1">
                      <div
                        className={`w-12 h-1 transition-colors duration-200 ${i < currentStep ? "bg-black" : "bg-gray-200"
                          }`}
                      ></div>
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
          <h1 className="text-2xl sm:text-3xl font-bold text-black">Rent Commercial Shop</h1>
        </div>
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-black mb-2">{steps[currentStep].title}</h2>
          <p className="text-gray-600">Please fill in the details for your property</p>
        </div>

        {steps[currentStep].component}
      </div>
        
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
  )
}

export default SellRetailShopMain

