"use client"

import { useState } from "react"
import { Store, Building2, DollarSign, Calendar, UserCircle, Image as ImageIcon, MapPin, ChevronLeft, ChevronRight } from "lucide-react"
import PropertyName from "../PropertyName"
import RetailStoreType from "../CommercialComponents/RetailStoreType"
import CommercialPropertyAddress from "../CommercialComponents/CommercialPropertyAddress"
import Landmark from "../CommercialComponents/Landmark"
import MapCoordinates from "../MapCoordinates"
import CornerProperty from "../CommercialComponents/CornerProperty"
import RetailStoreDetails from "../CommercialComponents/RetailStoreDetails"
import CommercialPropertyDetails from "../CommercialComponents/CommercialPropertyDetails"
import LeaseAmount from "../lease/LeaseAmount"
import LeaseTenure from "../lease/LeaseTenure"
import MaintenanceAmount from "../residentialrent/MaintenanceAmount"
import OtherCharges from "../residentialrent/OtherCharges"
import Brokerage from "../residentialrent/Brokerage"
import CommercialAvailability from "../CommercialComponents/CommercialAvailability"
import CommercialContactDetails from "../CommercialComponents/CommercialContactDetails"
import CommercialMediaUpload from "../CommercialComponents/CommercialMediaUpload"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import axios from "axios"

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
    waterAvailability: string;
    propertyAge: number;
    propertyCondition: string;
  };
  leaseTerms: {
    leaseDetails: {
      leaseAmount: {
        amount: number;
        type: string;
        duration: number;
        durationUnit: string;
      };
    };
    tenureDetails: {
      minimumTenure: number;
      minimumUnit: string;
      maximumTenure: number;
      maximumUnit: string;
      lockInPeriod: number;
      lockInUnit: string;
      noticePeriod: number;
      noticePeriodUnit: string;
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
      date: Date;
      availableImmediately: boolean;
      preferredSaleDuration: string;
      noticePeriod: string;
      isPetsAllowed: boolean;
      operatingHours: boolean;
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
    videoTour?: File;
    documents: File[];
  };
  metadata?: {
    createdBy: string;
    createdAt: Date;
  };
}

const LeaseRetailStoreMain = () => {
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
      waterAvailability: '',
      propertyAge: 0,
      propertyCondition: ''
    },
    leaseTerms: {
      leaseDetails: {
        leaseAmount: {
          amount: 0,
          type: 'fixed',
          duration: 0,
          durationUnit: 'years'
        },
      },
      tenureDetails: {
        minimumTenure: 0,
    minimumUnit: 'years',
    maximumTenure: 0,
    maximumUnit: 'years',
    lockInPeriod: 0,
    lockInUnit: 'years',
    noticePeriod: 0,
    noticePeriodUnit: 'months'
      },
      maintenanceAmount: {
        amount: 0,
        frequency: 'monthly'
      },
      otherCharges: {
        water: {
          amount: 0,
          type: 'inclusive',
        },
        electricity: {
          amount: 0,
          type: 'inclusive',
        },
        gas: {
          amount: 0,
          type: 'inclusive',
        },
        others: {
          amount: 0,
          type: 'inclusive',
        },
      },
      brokerage: {
        required: 'no',
        amount: 0
      },
      availability: {
        date: new Date(),
        availableImmediately: false,
        preferredSaleDuration: '',
        noticePeriod: '',
        isPetsAllowed: false,
        operatingHours:  false,
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

      videoTour: undefined,
      documents: []
    }
  });

  const [currentStep, setCurrentStep] = useState(0)
  const navigate = useNavigate()

  const steps = [
    {
      title: "Basic Information",
      icon: <Store className="w-5 h-5" />,
      component: (
        <div className="space-y-8">
          <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <Store className="text-black w-6 h-6" />
              <h3 className="text-xl font-semibold text-black">Basic Details</h3>
            </div>
            <div className="space-y-6">
              <PropertyName
                propertyName={formData.basicInformation.title}
                onPropertyNameChange={(name) => setFormData(prev => ({
                  ...prev,
                  basicInformation: { ...prev.basicInformation, title: name }
                }))}
              />
              <RetailStoreType
                onRetailTypeChange={(types) => setFormData(prev => ({
                  ...prev,
                  basicInformation: { ...prev.basicInformation, retailStoreType: types }
                }))}
              />
            </div>
          </div>

          <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <MapPin className="text-black w-6 h-6" />
              <h3 className="text-xl font-semibold text-black">Location Details</h3>
            </div>
            <div className="space-y-6">
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
                  basicInformation: { ...prev.basicInformation, location: { latitude: parseFloat(location.latitude), longitude: parseFloat(location.longitude) } }
                }))}
              />
              <CornerProperty
                onCornerPropertyChange={(isCorner) => setFormData(prev => ({
                  ...prev,
                  basicInformation: { ...prev.basicInformation, isCornerProperty: isCorner }
                }))}
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Property Details",
      icon: <Building2 className="w-5 h-5" />,
      component: (
        <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <Building2 className="text-black w-6 h-6" />
            <h3 className="text-xl font-semibold text-black">Property Details</h3>
          </div>
          <div className="space-y-6">
            <RetailStoreDetails
              onDetailsChange={(details) => setFormData(prev => ({
                ...prev,
                retailStoreDetails: { ...prev.retailStoreDetails, ...details }
              }))}
            />
            <CommercialPropertyDetails
              onDetailsChange={(details) => setFormData(prev => ({
                ...prev,
                propertyDetails: {
                  ...prev.propertyDetails,
                  ...details,
                  propertyAge: details.propertyAge ?? 0,
                  electricitySupply: {
                    ...prev.propertyDetails.electricitySupply,
                    ...details.electricitySupply,
                    powerLoad: details.electricitySupply?.powerLoad ?? 0
                  },
                  waterAvailability: details.waterAvailability
                }
              }))}
            />
          </div>
        </div>
      ),
    },
    {
      title: "Lease Terms",
      icon: <DollarSign className="w-5 h-5" />,
      component: (
        <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <DollarSign className="text-black w-6 h-6" />
            <h3 className="text-xl font-semibold text-black">Lease Terms</h3>
          </div>
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h4 className="text-lg font-medium text-black mb-4">Lease Information</h4>
              <div className="space-y-4">
              <LeaseAmount 
                  onLeaseAmountChange={(amount) => setFormData(prev => ({
                    ...prev,
                    leaseTerms: {
                      ...prev.leaseTerms,
                      leaseDetails: {
                        ...prev.leaseTerms.leaseDetails,
                        leaseAmount: {
                          amount: Number(amount.amount) || 0,
                          type: amount.type || 'fixed',
                          duration: Number(amount.duration) || 0,
                          durationUnit: amount.durationUnit || 'years'
                        },
                        
                      }
                    }
                  }))}
                />
                <LeaseTenure 
                  onLeaseTenureChange={(tenure) => setFormData(prev => ({
                    ...prev,
                    leaseTerms: {
                      ...prev.leaseTerms,
                      leaseDetails: {
                        ...prev.leaseTerms.leaseDetails,
                        // leaseDuration: tenure.leaseDuration || '',
                      },
                      tenureDetails: {
                        minimumTenure: Number(tenure.minimumTenure) || 0,
                        minimumUnit: tenure.minimumUnit || 'years',
                        maximumTenure: Number(tenure.maximumTenure) || 0,
                        maximumUnit: tenure.maximumUnit || 'years',
                        lockInPeriod: Number(tenure.lockInPeriod) || 0,
                        lockInUnit: tenure.lockInUnit || 'years',
                        noticePeriod: Number(tenure.noticePeriod) || 0,
                        noticePeriodUnit: tenure.noticePeriodUnit || 'months'
                      }
                    }
                  }))}
                />
                <MaintenanceAmount 
                  onMaintenanceAmountChange={(maintenance) => setFormData(prev => ({
                    ...prev,
                    leaseTerms: {
                      ...prev.leaseTerms,
                      maintenanceAmount: {
                        amount: Number(maintenance.amount) || 0,
                        frequency: maintenance.frequency || 'monthly'
                      }
                    }
                  }))}
                />
              {/* </div>
            </div>
             */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h4 className="text-lg font-medium text-black mb-4">Additional Charges</h4>
              <div className="space-y-4">
                
                <div className="border-t border-gray-200 my-4"></div>
                <OtherCharges 
                  onOtherChargesChange={(charges) => setFormData(prev => ({
                    ...prev,
                    leaseTerms: {
                      ...prev.leaseTerms,
                      otherCharges: { ...prev.leaseTerms.otherCharges, ...charges }
                    }
                  }))} 
                />
                <div className="border-t border-gray-200 my-4"></div>
                <Brokerage 
                  onBrokerageChange={(brokerage) => setFormData(prev => ({
                    ...prev,
                    leaseTerms: {
                      ...prev.leaseTerms,
                      brokerage: { ...prev.leaseTerms.brokerage, ...brokerage }
                    }
                  }))} 
                />
              </div>
            </div>
          </div>
          </div>
          </div>
        </div>
      ),
    },
    {
      title: "Availability",
      icon: <Calendar className="w-5 h-5" />,
      component: (
        <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <Calendar className="text-black w-6 h-6" />
            <h3 className="text-xl font-semibold text-black">Availability</h3>
          </div>
          <div className="space-y-6">
          <div className="[&_input]:text-black [&_input]:placeholder:text-black [&_input]:bg-white [&_input]:border-black/20 [&_input]:focus:border-black [&_input]:focus:ring-black [&_label]:text-black [&_svg]:text-black [&_select]:text-black [&_select]:bg-white [&_select_option]:text-black [&_select_option]:bg-white [&_select]:border-black/20 [&_select]:focus:border-black [&_select]:focus:ring-black [&_*]:text-black [&_span]:text-black [&_button]:text-black [&_button]:bg-white [&_button]:hover:bg-black [&_button]:hover:text-white [&_button]:border-black/20 [&_p]:text-black [&_h4]:text-black [&_option]:text-black [&_option]:bg-white [&_select]:placeholder:text-black [&_select]:placeholder:bg-white">
          {/* <CommercialAvailability
                onAvailabilityChange={(availability) => setFormData(prev => ({
                  ...prev,
                  leaseTerms: {
                    ...prev.leaseTerms,
                    availability: {
                      // immediate: availability.immediate || false,
                      availableFrom: availability.availableFrom || new Date(),
                      // specificDate: availability.immediate ? new Date() : (availability.specificDate ? availability.specificDate : new Date()),
                      availableImmediately: availability.availableImmediately || false,
                      preferredSaleDuration: availability.preferredSaleDuration || '',
                      noticePeriod: availability.noticePeriod || '',
                      petsAllowed: availability.petsAllowed || false,
                      operatingHours:availability.operatingHours?.restricted || false,
                    }
                  }
                }))}
                  /> */}
                   <CommercialAvailability
              onAvailabilityChange={(availability) => setFormData(prev => ({
                ...prev,
                leaseTerms: {
                  ...prev.leaseTerms,
                  availability: {
                    ...prev.leaseTerms.availability,
                    ...availability,
                    date: availability.availableImmediately ? new Date() : availability.date
                  }
                }
              }))}
            />

                  </div>
          </div>
        </div>
      ),
    },
    {
      title: "Contact Information",
      icon: <UserCircle className="w-5 h-5" />,
      component: (
        <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <UserCircle className="text-black w-6 h-6" />
            <h3 className="text-xl font-semibold text-black">Contact Details</h3>
          </div>
          <div className="space-y-6">
            <CommercialContactDetails
              onContactChange={(contact) => setFormData(prev => ({
                ...prev,
                contactInformation: { ...prev.contactInformation, ...contact }
              }))}
            />
          </div>
        </div>
      ),
    },
    {
      title: "Property Media",
      icon: <ImageIcon className="w-5 h-5" />,
      component: (
        <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <ImageIcon className="text-black w-6 h-6" />
            <h3 className="text-xl font-semibold text-black">Property Media</h3>
          </div>
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
                    videoTour: media.video?.file || undefined,
                    documents: media.documents.map(d => d.file)
                  }
                }));
              }}
            />
          </div>
        </div>
      ),
    },
  ];

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const user = sessionStorage.getItem('user');
      if (user) {
        const author = JSON.parse(user).id;

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

        const transformedData = {
          ...formData,
          media: convertedMedia,
          metadata: {
            createdBy: author,
            createdAt: new Date()
          }
        };

        const response = await axios.post('/api/commercial/lease/retail-store', transformedData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (response.data.success) {
          toast.success('Retail store lease listing created successfully!');
        }
      } else {
        navigate('/login');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to create retail store lease listing. Please try again.');
    }
    console.log(formData);
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-white">
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
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
                        i <= currentStep ? "bg-black text-white" : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                      }`}
                    >
                      {s.icon}
                    </div>
                    <span
                      className={`text-xs mt-1 font-medium transition-colors duration-200 ${
                        i <= currentStep ? "text-black" : "text-gray-500 group-hover:text-gray-700"
                      }`}
                    >
                      {s.title}
                    </span>
                  </div>
                  {i < steps.length - 1 && (
                    <div className="flex items-center mx-1">
                      <div
                        className={`w-12 h-1 transition-colors duration-200 ${
                          i < currentStep ? "bg-black" : "bg-gray-200"
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
          <h2 className="text-3xl font-bold text-black mb-2">{steps[currentStep].title}</h2>
          <p className="text-gray-600">Please fill in the details for your property</p>
        </div>

        {steps[currentStep].component}
      </div>

      {/* Navigation Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between">
          <button
            type="button"
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className={`flex items-center px-6 py-2 rounded-lg border border-black/20 transition-all duration-200 ${
              currentStep === 0
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-black hover:bg-black hover:text-white"
            }`}
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Previous
          </button>
          {currentStep < steps.length - 1 ? (
            <button
              type="button"
              onClick={handleNext}
              className="flex items-center px-6 py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition-all duration-200"
            >
              Next
              <ChevronRight className="w-5 h-5 ml-2" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              className="flex items-center px-6 py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition-all duration-200"
            >
              List Property
              <ChevronRight className="w-5 h-5 ml-2" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeaseRetailStoreMain;
