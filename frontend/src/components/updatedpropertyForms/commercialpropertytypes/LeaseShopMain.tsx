import React, { useState, useEffect, useRef } from 'react';
import PropertyName from '../PropertyName';
import ShopType from '../CommercialComponents/ShopType';
import CommercialPropertyAddress from '../CommercialComponents/CommercialPropertyAddress';
import Landmark from '../CommercialComponents/Landmark';
import MapCoordinates from '../MapCoordinates';
import CornerProperty from '../CommercialComponents/CornerProperty';
import ShopDetails from '../CommercialComponents/ShopDetails';
import CommercialPropertyDetails from '../CommercialComponents/CommercialPropertyDetails';
import LeaseAmount from '../lease/LeaseAmount';
import LeaseTenure from '../lease/LeaseTenure';
import MaintenanceAmount from '../residentialrent/MaintenanceAmount';
import OtherCharges from '../residentialrent/OtherCharges';
import Brokerage from '../residentialrent/Brokerage';
import CommercialAvailability from '../CommercialComponents/CommercialAvailability';
import CommercialContactDetails from '../CommercialComponents/CommercialContactDetails';
import CommercialMediaUpload from '../CommercialComponents/CommercialMediaUpload';
import { MapPin, Building2, DollarSign, Calendar, User, Image, Store, ImageIcon, UserCircle, ChevronRight, ChevronLeft, Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MapLocation from '../CommercialComponents/MapLocation';
interface FormData {
  // propertyId: string;
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
  shopDetails: {
    frontageWidth: number;
    heightOfShop: number;
    displayWindow: boolean;
    attachedStorageRoom: boolean;
    averageFootTraffic: string;
    customerParking: boolean;
    previousBusiness: string;
  };
  propertyDetails: {
    area: {
      totalArea: number;
      builtUpArea: number;
      carpetArea: number;
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
  };
  leaseTerms: {
    leaseDetails: {
      amount: number;
      type: string;
      duration: number;
      durationUnit: string;

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
      }
    };
    brokerage: {
      required: string;
      amount?: number;
    };
    availability: {
      // immediate: boolean;
      date: Date;
      // specificDate: Date;
      availableImmediately: boolean;
      preferredSaleDuration: string;
      noticePeriod: string;
      petsAllowed: boolean;
      operatingHours: {
        restricted: boolean;
        restrictions: string;
      };
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
    videoTour: File | null;
    documents: File[];
  };
}

const LeaseShopMain = () => {
  const [formData, setFormData] = useState<FormData>({
    // propertyId: '',
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
    shopDetails: {
      frontageWidth: 0,
      heightOfShop: 0,
      displayWindow: false,
      attachedStorageRoom: false,
      averageFootTraffic: '',
      customerParking: false,
      previousBusiness: ''
    },
    propertyDetails: {
      area: {
        totalArea: 0,
        builtUpArea: 0,
        carpetArea: 0
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
      propertyCondition: ''
    },
    leaseTerms: {
      leaseDetails: {
        amount: 0,
        type: 'fixed',
        duration: 0,
        durationUnit: 'years'

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
        // immediate: false,
        date: new Date(),
        // specificDate: new Date(),
        availableImmediately: false,
        preferredSaleDuration: '',
        noticePeriod: '',
        petsAllowed: false,
        operatingHours: {
          restricted: false,
          restrictions: ''
        }
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
  });

  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();
  const formRef = useRef<HTMLDivElement>(null);

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const steps = [
    {
      title: "Basic Information",
      icon: <MapPin className="w-6 h-6" />,
      component: (
        <div className="space-y-8">
          <PropertyName propertyName={formData.basicInformation.title} onPropertyNameChange={(name) => setFormData(prev => ({ ...prev, basicInformation: { ...prev.basicInformation, title: name } }))} />
          <ShopType Type={formData.basicInformation.Type} onShopTypeChange={(type) => setFormData(prev => ({ ...prev, basicInformation: { ...prev.basicInformation, Type: type } }))} />

          <div className="space-y-8">
            <CommercialPropertyAddress address={formData.basicInformation.address} onAddressChange={(address) => setFormData(prev => ({ ...prev, basicInformation: { ...prev.basicInformation, address } }))} />
            <MapLocation
              latitude={formData.basicInformation.location.latitude}
              longitude={formData.basicInformation.location.longitude}
              landmark={formData.basicInformation.landmark}
              onLocationChange={(location) => setFormData(prev => ({ ...prev, basicInformation: { ...prev.basicInformation, location } }))}
              onAddressChange={(address) => setFormData(prev => ({ ...prev, basicInformation: { ...prev.basicInformation, address } }))}
              onLandmarkChange={(landmark) => setFormData(prev => ({ ...prev, basicInformation: { ...prev.basicInformation, landmark } }))}
            />
            <CornerProperty isCornerProperty={formData.basicInformation.isCornerProperty} onCornerPropertyChange={(isCorner) => setFormData(prev => ({ ...prev, basicInformation: { ...prev.basicInformation, isCornerProperty: isCorner } }))} />
          </div>
        </div>
      ),
    },
    {
      title: "Property Details",
      icon: <Building2 className="w-6 h-6" />,
      component: (
        <div className="space-y-8">
          <ShopDetails
            shopDetails={formData.shopDetails}
            onDetailsChange={(details) => setFormData(prev => ({
              ...prev,
              shopDetails: {
                frontageWidth: details.frontageWidth || 0,
                heightOfShop: details.heightOfShop || 0,
                displayWindow: details.displayWindow || false,
                attachedStorageRoom: details.attachedStorageRoom || false,
                averageFootTraffic: details.averageFootTraffic || '',
                customerParking: details.customerParking || false,
                previousBusiness: details.previousBusiness || ''
              }
            }))}
          />
          <CommercialPropertyDetails
            onDetailsChange={(details) => setFormData(prev => ({
              ...prev,
              propertyDetails: {
                area: {
                  totalArea: details.area?.totalArea || 0,
                  builtUpArea: details.area?.builtUpArea || 0,
                  carpetArea: details.area?.carpetArea || 0
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
                waterAvailability: details.waterAvailability || '',
                propertyAge: details.propertyAge || '',
                propertyCondition: details.propertyCondition || ''
              }
            }))}
          />
        </div>
      ),
    },
    {
      title: "Lease Terms",
      icon: <DollarSign className="w-6 h-6" />,
      component: (
        <div className="space-y-8">
          <LeaseAmount
            onLeaseAmountChange={(amount) => setFormData(prev => ({
              ...prev,
              leaseTerms: {
                ...prev.leaseTerms,
                leaseDetails: {
                  ...prev.leaseTerms.leaseDetails,
                  leaseAmount: {
                    amount: amount.amount || 0,
                    type: amount.type || 'fixed',
                    duration: amount.duration || 0,
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
            maintenanceAmount={formData.leaseTerms.maintenanceAmount}
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
          <OtherCharges
            otherCharges={formData.leaseTerms.otherCharges}
            onOtherChargesChange={(charges) => setFormData(prev => ({
              ...prev,
              leaseTerms: {
                ...prev.leaseTerms,
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
            bro={formData.leaseTerms.brokerage}
            onBrokerageChange={(brokerage) => setFormData(prev => ({
              ...prev,
              leaseTerms: {
                ...prev.leaseTerms,
                brokerage: {
                  required: brokerage.required as 'yes' | 'no',
                  amount: Number(brokerage.amount) || 0
                }
              }
            }))}
          />
        </div>
      ),
    },
    {
      title: "Availability",
      icon: <Calendar className="w-6 h-6" />,
      component: (
        <div className="space-y-8">
          <CommercialAvailability
            onAvailabilityChange={(availability) => setFormData(prev => ({
              ...prev,
              leaseTerms: {
                ...prev.leaseTerms,
                availability: {
                  // immediate: availability.immediate || false,
                  date: availability.date || new Date(),
                  // specificDate: availability.immediate ? new Date() : (availability.specificDate ? availability.specificDate : new Date()),
                  availableImmediately: availability.availableImmediately || false,
                  preferredSaleDuration: availability.preferredSaleDuration || '',
                  noticePeriod: availability.noticePeriod || '',
                  petsAllowed: availability.petsAllowed || false,
                  operatingHours: {
                    restricted: availability.operatingHours?.restricted || false,
                    restrictions: availability.operatingHours?.restrictions || ''
                  }
                }
              }
            }))}
          />
        </div>
      ),
    },
    {
      title: "Contact Information",
      icon: <User className="w-6 h-6" />,
      component: (
        <div className="space-y-8">

          <CommercialContactDetails
            contactInformation={formData.contactInformation}
            onContactChange={(contact) => setFormData(prev => ({
              ...prev,
              contactInformation: {
                name: contact.name || '',
                email: contact.email || '',
                phone: contact.phone || '',
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
      icon: <Image className="w-6 h-6" />,
      component: (
        <div className="space-y-8">
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
                const photosByCategory: Record<string, File[]> = {
                  exterior: [],
                  interior: [],
                  floorPlan: [],
                  washrooms: [],
                  lifts: [],
                  emergencyExits: []
                };

                media.photos.forEach(({ category, files }) => {
                  if (category in photosByCategory) {
                    photosByCategory[category] = files.map(f => f.file);
                  }
                });

                setFormData(prev => ({
                  ...prev,
                  media: {
                    photos: {
                      exterior: photosByCategory.exterior,
                      interior: photosByCategory.interior,
                      floorPlan: photosByCategory.floorPlan,
                      washrooms: photosByCategory.washrooms,
                      lifts: photosByCategory.lifts,
                      emergencyExits: photosByCategory.emergencyExits
                    },
                    videoTour: media.videoTour || null,
                    documents: media.documents
                  }
                }));
              }}
            />
          </div>
        </div>
      ),
    },
  ];

  const handleNext = () => {
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
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

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
        console.log(formData)

        const transformedData = {
          ...formData,
          media: convertedMedia,
          metadata: {
            createdBy: author,
            createdAt: new Date(),
            propertyType: 'Commercial',
            propertyName: formData.basicInformation.title,
            intent: 'Lease',
            status: 'Available'
          }
        };


        console.log(transformedData);
        const response = await axios.post('/api/commercial/lease/shops', transformedData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        console.log(response.data)

        if (response.data.success) {
          toast.success('Commercial shop listing created successfully!');
        }
      } else {
        navigate('/login');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to create commercial shop listing. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
    // console.log(formData);
    // navigate('/');

  };

  return (
    <div ref={formRef} className="min-h-screen bg-white">
      {/* Progress indicator */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex justify-center">
            <div className="flex items-center space-x-2">
              {steps.map((section, index) => (
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
                  {index < steps.length - 1 && (
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
          <h1 className="text-2xl sm:text-3xl font-bold text-black">Lease Commercial Shop</h1>
        </div>
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
  );
};

export default LeaseShopMain;