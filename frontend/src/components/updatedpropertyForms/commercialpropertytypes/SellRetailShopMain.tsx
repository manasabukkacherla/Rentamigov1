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

interface MediaFile {
  url: string;
  file: File;
}

interface MediaCategory {
  category: string;
  files: MediaFile[];
}

interface MediaDocument {
  type: string;
  file: File;
}

interface FormDataState {
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
    shopType?: string[];
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
    propertyAge: number;
    propertyCondition: string;
    ownershipType: string;
    possessionStatus: string;
  };
  priceDetails: {
    price: number;
    pricePerSqft: number;
    isNegotiable: boolean;
    registrationCharges: {
      registrationAmount: number;
      stampDuty: number;
      otherCharges: number;
    };
    brokerage: {
      required: string;
      amount: number;
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
    images: MediaCategory[];
    video: { url: string; file: File } | null;
    documents: MediaDocument[];
  };
  metadata?: {
    createdBy?: string;
    createdAt?: Date;
    status?: string;
    isVerified?: boolean;
  };
}

const SellRetailShopMain = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormDataState>({
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
      waterAvailability: '',
      propertyAge: 0,
      propertyCondition: '',
      ownershipType: 'Freehold',
      possessionStatus: 'Ready to Move'
    },
    priceDetails: {
      price: 0,
      pricePerSqft: 0,
      isNegotiable: false,
      registrationCharges: {
        registrationAmount: 0,
        stampDuty: 0,
        otherCharges: 0
      },
      brokerage: {
        required: 'No',
        amount: 0
      },
      availability: {
        type: 'Ready to Move',
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
      images: [
        { category: 'exterior', files: [] },
        { category: 'interior', files: [] },
        { category: 'floorPlan', files: [] },
        { category: 'washrooms', files: [] },
        { category: 'lifts', files: [] },
        { category: 'emergencyExits', files: [] }
      ],
      video: null,
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
          <RetailStoreType onRetailTypeChange={(types: string[]) => setFormData({ ...formData, basicInformation: { ...formData.basicInformation, retailStoreType: types } })} />

          <CommercialPropertyAddress onAddressChange={(address) => setFormData({ ...formData, basicInformation: { ...formData.basicInformation, address } })} />
          <Landmark onLandmarkChange={(landmark) => setFormData({ ...formData, basicInformation: { ...formData.basicInformation, landmark } })} />

          <CornerProperty
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
                propertyAge: parseInt(details.propertyAge?.toString() || '0'),
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
            <Price onPriceChange={(price) => setFormData({
              ...formData,
              priceDetails: {
                ...formData.priceDetails,
                price: parseFloat(price.amount.toString())
              }
            })} />
          </div>


          <div className="space-y-4 text-black">
            <div className="text-black">
              <RegistrationCharges
                onRegistrationChargesChange={(charges) => setFormData({
                  ...formData,
                  priceDetails: {
                    ...formData.priceDetails,
                    registrationCharges: {
                      registrationAmount: parseFloat(charges.registrationAmount?.toString() || '0'),
                      stampDuty: parseFloat(charges.stampDuty?.toString() || '0'),
                      otherCharges: parseFloat(charges.otherCharges?.toString() || '0')
                    }
                  }
                })}
              />
            </div>
            <div className="text-black">
              <Brokerage onBrokerageChange={(brokerage) => setFormData({
                ...formData,
                priceDetails: {
                  ...formData.priceDetails,
                  brokerage: {
                    required: brokerage.required || 'No',
                    amount: parseFloat(brokerage.amount?.toString() || '0')
                  }
                }
              })} />
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
              priceDetails: {
                ...formData.priceDetails,
                availability: {
                  type: availability.type || 'Ready to Move',
                  date: availability.date
                }
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
              onMediaChange={(mediaData) => {
                setFormData({
                  ...formData,
                  media: {
                    images: mediaData.images,
                    video: mediaData.video || null,
                    documents: mediaData.documents
                  }
                });
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
          formData.basicInformation.retailStoreType.length > 0 &&
          !!formData.basicInformation.address.street;
      case 1: // Property Details
        return !!formData.retailStoreDetails.location &&
          formData.propertyDetails.area.totalArea > 0;
      case 2: // Pricing Details
        return formData.priceDetails.price > 0;
      case 3: // Availability
        return !!formData.priceDetails.availability.type;
      case 4: // Contact Information
        return !!formData.contactInformation.name &&
          !!formData.contactInformation.email &&
          !!formData.contactInformation.phone;
      default:
        return true;
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    setIsSubmitting(true);

    try {
      const user = sessionStorage.getItem('user');
      if (!user) {
        toast.error('You need to be logged in to create a listing');
        navigate('/login');
        return;
      }

      const userData = JSON.parse(user);
      const author = userData.id;
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
          exterior: await Promise.all(
            (formData.media.images.find(img => img.category === 'exterior')?.files || [])
              .map(fileObj => convertFileToBase64(fileObj.file))
          ),
          interior: await Promise.all(
            (formData.media.images.find(img => img.category === 'interior')?.files || [])
              .map(fileObj => convertFileToBase64(fileObj.file))
          ),
          floorPlan: await Promise.all(
            (formData.media.images.find(img => img.category === 'floorPlan')?.files || [])
              .map(fileObj => convertFileToBase64(fileObj.file))
          ),
          washrooms: await Promise.all(
            (formData.media.images.find(img => img.category === 'washrooms')?.files || [])
              .map(fileObj => convertFileToBase64(fileObj.file))
          ),
          lifts: await Promise.all(
            (formData.media.images.find(img => img.category === 'lifts')?.files || [])
              .map(fileObj => convertFileToBase64(fileObj.file))
          ),
          emergencyExits: await Promise.all(
            (formData.media.images.find(img => img.category === 'emergencyExits')?.files || [])
              .map(fileObj => convertFileToBase64(fileObj.file))
          )
        },
        videoTour: formData.media.video ? await convertFileToBase64(formData.media.video.file) : undefined,
        documents: await Promise.all(formData.media.documents.map(doc => convertFileToBase64(doc.file)))
      };

      console.log('Sending data to backend with author ID:', author);

      const transformedData = {
        basicInformation: {
          ...formData.basicInformation,
          shopType: Array.isArray(formData.basicInformation.shopType)
            ? formData.basicInformation.shopType
            : (formData.basicInformation.shopType ? [formData.basicInformation.shopType] : []),
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
          propertyAge: parseInt(formData.propertyDetails.propertyAge.toString()),
          propertyCondition: formData.propertyDetails.propertyCondition
        },
        priceDetails: {
          ...formData.priceDetails,
          price: parseFloat(formData.priceDetails.price.toString()),
          pricePerSqft: parseFloat(formData.priceDetails.pricePerSqft.toString()),
          isNegotiable: formData.priceDetails.isNegotiable,
          registrationCharges: {
            registrationAmount: parseFloat(formData.priceDetails.registrationCharges.registrationAmount.toString()),
            stampDuty: parseFloat(formData.priceDetails.registrationCharges.stampDuty.toString()),
            otherCharges: parseFloat(formData.priceDetails.registrationCharges.otherCharges.toString())
          },
          brokerage: {
            required: formData.priceDetails.brokerage.required,
            amount: parseFloat(formData.priceDetails.brokerage.amount.toString())
          },
          availability: {
            type: formData.priceDetails.availability.type,
            date: formData.priceDetails.availability.date
          }
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
          createdBy: author,
          createdAt: new Date(),
          status: 'draft',
          isVerified: false
        }
      };

      // Use the same format as in the backend routes configuration
      const API_ENDPOINT = '/api/commercial/sell/retail-store';
      console.log(`About to send API request to ${API_ENDPOINT}`);
      console.log('Request headers:', {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ''
      });

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
          navigate('/dashboard');
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

