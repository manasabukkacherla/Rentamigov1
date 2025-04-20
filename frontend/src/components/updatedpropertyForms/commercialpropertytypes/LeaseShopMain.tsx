import React, { useState } from 'react';
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
import { MapPin, Building2, DollarSign, Calendar, User, Image, Store, ImageIcon, UserCircle, ChevronRight, ChevronLeft } from 'lucide-react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
interface FormData {
  // propertyId: string;
  basicInformation: {
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
      }
    };
    brokerage: {
      required: 'yes' | 'no';
      amount?: number;
    };
    availability: {
      // immediate: boolean;
      availableFrom: Date;
      // specificDate: Date;
      availableImmediately: boolean;
      leaseDuration: string;
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
    videoTour?: File;
    documents: File[];
  };
}

const LeaseShopMain = () => {
  const [formData, setFormData] = useState<FormData>({
    // propertyId: '',
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
        // immediate: false,
        availableFrom: new Date(),
        // specificDate: new Date(),
        availableImmediately: false,
        leaseDuration: '',
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
      videoTour: undefined,
      documents: []
    }
  });

  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

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
          <div className="bg-whitesmoke rounded-xl p-8 shadow-md border border-black/10 transition-all duration-300 hover:shadow-lg">
            <div className="space-y-8">
              <div className="flex items-center mb-8">
                <Store className="text-black mr-3" size={28} />
                <h3 className="text-2xl font-semibold text-black">Basic Details</h3>
              </div>
              <div className="[&_input]:text-black [&_input]:placeholder:text-black [&_input]:bg-white [&_input]:border-black/20 [&_input]:focus:border-black [&_input]:focus:ring-black [&_label]:text-black [&_svg]:text-black [&_select]:text-black [&_select]:bg-white [&_select_option]:text-black [&_select_option]:bg-white [&_select]:border-black/20 [&_select]:focus:border-black [&_select]:focus:ring-black [&_*]:text-black [&_span]:text-black [&_button]:text-black [&_button]:bg-white [&_button]:hover:bg-black [&_button]:hover:text-white [&_button]:border-black/20 [&_p]:text-black [&_h4]:text-black [&_option]:text-black [&_option]:bg-white [&_select]:placeholder:text-black [&_select]:placeholder:bg-white">
                <PropertyName propertyName={formData.basicInformation.title} onPropertyNameChange={(name) => setFormData(prev => ({ ...prev, basicInformation: { ...prev.basicInformation, title: name } }))} />
                <ShopType onShopTypeChange={(type) => setFormData(prev => ({ ...prev, basicInformation: { ...prev.basicInformation, shopType: type } }))} />
              </div>
            </div>
          </div>

          <div className="bg-whitesmoke rounded-xl p-8 shadow-md border border-black/10 transition-all duration-300 hover:shadow-lg">
            <div className="space-y-8">
              <div className="flex items-center mb-8">
                <MapPin className="text-black mr-3" size={28} />
                <h3 className="text-2xl font-semibold text-black">Location Details</h3>
              </div>
              <div className="[&_input]:text-black [&_input]:placeholder:text-black [&_input]:bg-white [&_input]:border-black/20 [&_input]:focus:border-black [&_input]:focus:ring-black [&_label]:text-black [&_svg]:text-black [&_select]:text-black [&_select]:bg-white [&_select_option]:text-black [&_select_option]:bg-white [&_select]:border-black/20 [&_select]:focus:border-black [&_select]:focus:ring-black [&_*]:text-black [&_span]:text-black [&_button]:text-black [&_button]:bg-white [&_button]:hover:bg-black [&_button]:hover:text-white [&_button]:border-black/20 [&_p]:text-black [&_h4]:text-black [&_option]:text-black [&_option]:bg-white [&_select]:placeholder:text-black [&_select]:placeholder:bg-white">
                <CommercialPropertyAddress onAddressChange={(address) => setFormData(prev => ({ ...prev, basicInformation: { ...prev.basicInformation, address } }))} />
                <div className="relative">
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
              <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
            <CornerProperty onCornerPropertyChange={(isCorner) => setFormData(prev => ({ ...prev, basicInformation: { ...prev.basicInformation, isCornerProperty: isCorner } }))} />
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Property Details",
      icon: <Building2 className="w-6 h-6" />,
      component: (
        <div className="bg-whitesmoke rounded-xl p-8 shadow-md border border-black/10 transition-all duration-300 hover:shadow-lg">
          <div className="space-y-8">
            <div className="flex items-center mb-8">
              <Building2 className="text-black mr-3" size={28} />
              <h3 className="text-2xl font-semibold text-black">Property Details</h3>
            </div>
            <div className="[&_input]:text-black [&_input]:placeholder:text-black [&_input]:bg-white [&_input]:border-black/20 [&_input]:focus:border-black [&_input]:focus:ring-black [&_label]:text-black [&_svg]:text-black [&_select]:text-black [&_select]:bg-white [&_select_option]:text-black [&_select_option]:bg-white [&_select]:border-black/20 [&_select]:focus:border-black [&_select]:focus:ring-black [&_*]:text-black [&_span]:text-black [&_button]:text-black [&_button]:bg-white [&_button]:hover:bg-black [&_button]:hover:text-white [&_button]:border-black/20 [&_p]:text-black [&_h4]:text-black [&_option]:text-black [&_option]:bg-white [&_select]:placeholder:text-black [&_select]:placeholder:bg-white">
              <div className="space-y-6">
                <ShopDetails
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
                      propertyAge: details.propertyAge || 0,
                      propertyCondition: details.propertyCondition || ''
                    }
                  }))}
                />
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Lease Terms",
      icon: <DollarSign className="w-6 h-6" />,
      component: (
        <div className="bg-whitesmoke rounded-xl p-8 shadow-md border border-black/10 transition-all duration-300 hover:shadow-lg">
          <div className="space-y-8">
            <div className="flex items-center mb-8">
              <DollarSign className="text-black mr-3" size={28} />
              <h3 className="text-2xl font-semibold text-black">Lease Terms</h3>
            </div>
            <div className="[&_input]:text-black [&_input]:placeholder:text-black [&_input]:bg-white [&_input]:border-black/20 [&_input]:focus:border-black [&_input]:focus:ring-black [&_label]:text-black [&_svg]:text-black [&_select]:text-black [&_select]:bg-white [&_select_option]:text-black [&_select_option]:bg-white [&_select]:border-black/20 [&_select]:focus:border-black [&_select]:focus:ring-black [&_*]:text-black [&_span]:text-black [&_button]:text-black [&_button]:bg-white [&_button]:border-black/20 [&_p]:text-black [&_h4]:text-black [&_option]:text-black [&_option]:bg-white [&_select]:placeholder:text-black [&_select]:placeholder:bg-white">
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
                <div className="border-t border-gray-200 my-4"></div>
                <OtherCharges
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
                <div className="border-t border-gray-200 my-4"></div>
                <Brokerage 
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
                <div className="border-t border-gray-200 my-4"></div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Availability",
      icon: <Calendar className="w-6 h-6" />,
      component: (
        <div className="bg-whitesmoke rounded-xl p-8 shadow-md border border-black/10 transition-all duration-300 hover:shadow-lg">
          <div className="space-y-8">
            <div className="flex items-center mb-8">
              <Calendar className="text-black mr-3" size={28} />
              <h3 className="text-2xl font-semibold text-black">Availability</h3>
            </div>
            <div className="[&_input]:text-black [&_input]:placeholder:text-black [&_input]:bg-white [&_input]:border-black/20 [&_input]:focus:border-black [&_input]:focus:ring-black [&_label]:text-black [&_svg]:text-black [&_select]:text-black [&_select]:bg-white [&_select_option]:text-black [&_select_option]:bg-white [&_select]:border-black/20 [&_select]:focus:border-black [&_select]:focus:ring-black [&_*]:text-black [&_span]:text-black [&_button]:text-black [&_button]:bg-white [&_button]:hover:bg-black [&_button]:hover:text-white [&_button]:border-black/20 [&_p]:text-black [&_h4]:text-black [&_option]:text-black [&_option]:bg-white [&_select]:placeholder:text-black [&_select]:placeholder:bg-white">
              <CommercialAvailability
                onAvailabilityChange={(availability) => setFormData(prev => ({
                  ...prev,
                  leaseTerms: {
                    ...prev.leaseTerms,
                    availability: {
                      // immediate: availability.immediate || false,
                      availableFrom: availability.availableFrom || new Date(),
                      // specificDate: availability.immediate ? new Date() : (availability.specificDate ? availability.specificDate : new Date()),
                      availableImmediately: availability.availableImmediately || false,
                      leaseDuration: availability.leaseDuration || '',
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
              <div className="border-t border-gray-200 my-4"></div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Contact Information",
      icon: <User className="w-6 h-6" />,
      component: (
        <div className="bg-whitesmoke rounded-xl p-8 shadow-md border border-black/10 transition-all duration-300 hover:shadow-lg">
          <div className="space-y-8">
            <div className="flex items-center mb-8">
              <UserCircle className="text-black mr-3" size={28} />
              <h3 className="text-2xl font-semibold text-black">Contact Details</h3>
            </div>
            <div className="[&_input]:text-black [&_input]:placeholder:text-black [&_input]:bg-white [&_input]:border-black/20 [&_input]:focus:border-black [&_input]:focus:ring-black [&_label]:text-black [&_svg]:text-black [&_select]:text-black [&_select]:bg-white [&_select_option]:text-black [&_select_option]:bg-white [&_select]:border-black/20 [&_select]:focus:border-black [&_select]:focus:ring-black [&_*]:text-black [&_span]:text-black [&_button]:text-black [&_button]:bg-white [&_button]:hover:bg-black [&_button]:hover:text-white [&_button]:border-black/20 [&_p]:text-black [&_h4]:text-black [&_option]:text-black [&_option]:bg-white [&_select]:placeholder:text-black [&_select]:placeholder:bg-white">
              <CommercialContactDetails
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
              <div className="border-t border-gray-200 my-4"></div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Property Media",
      icon: <Image className="w-6 h-6" />,
      component: (
        <div className="bg-whitesmoke rounded-xl p-8 shadow-md border border-black/10 transition-all duration-300 hover:shadow-lg">
          <div className="space-y-8">
            <div className="flex items-center mb-8">
              <ImageIcon className="text-black mr-3" size={28} />
              <h3 className="text-2xl font-semibold text-black">Property Media</h3>
            </div>
            <div className="[&_input]:text-black [&_input]:placeholder:text-black [&_input]:bg-white [&_input]:border-black/20 [&_input]:focus:border-black [&_input]:focus:ring-black [&_label]:text-black [&_svg]:text-black [&_select]:text-black [&_select]:bg-white [&_select_option]:text-black [&_select_option]:bg-white [&_select]:border-black/20 [&_select]:focus:border-black [&_select]:focus:ring-black [&_*]:text-black [&_span]:text-black [&_button]:text-black [&_button]:bg-white [&_button]:hover:bg-black [&_button]:hover:text-white [&_button]:border-black/20 [&_p]:text-black [&_h4]:text-black [&_option]:text-black [&_option]:bg-white [&_select]:placeholder:text-black [&_select]:placeholder:bg-white">
              <div className="space-y-6">
                <CommercialMediaUpload
                  onMediaChange={(media) => {
                    const photosByCategory: Record<string, File[]> = {
                      exterior: [],
                      interior: [],
                      floorPlan: [],
                      washrooms: [],
                      lifts: [],
                      emergencyExits: []
                    };

                    media.images.forEach(({ category, files }) => {
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
                        videoTour: media.video?.file,
                        documents: media.documents.map(d => d.file)
                      }
                    }));
                  }}
                  />
                <div className="border-t border-gray-200 my-4"></div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const handleNext = () => {
    // if (validateCurrentStep()) {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
    // } else {
    //   toast.error('Please fill in all required fields');
    // }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
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
        console.log(formData)

        const transformedData = {
          ...formData,
          media: convertedMedia,
          metadata: {
            createdBy: author,
            createdAt: new Date()
          }
        };


        console.log(transformedData);
        const response = await axios.post('/api/commercial/lease-shops', transformedData, {
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
    }
    // console.log(formData);
    // navigate('/');
  
  };

  return (
    <div className="max-w-4xl mx-auto text-black">
      {/* Progress indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {steps.map((s, i) => (
            <div
              key={i}
              className={`flex flex-col items-center ${i <= currentStep ? "text-black" : "text-gray-400"}`}
              onClick={() => i < currentStep && setCurrentStep(i)}
              style={{ cursor: i < currentStep ? "pointer" : "default" }}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${i <= currentStep ? "bg-black text-white" : "bg-gray-200 text-gray-500"}`}
              >
                {s.icon}
              </div>
              <span className="text-xs font-medium">{s.title}</span>
            </div>
          ))}
        </div>
        <div className="w-full bg-gray-200 h-1 rounded-full">
          <div
            className="bg-black h-1 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          ></div>
        </div>
      </div>

      <h2 className="text-3xl font-bold mb-8 text-black">{steps[currentStep].title}</h2>

      {steps[currentStep].component}

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
              className="flex items-center px-6 py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition-all duration-200"
            >
              {currentStep === steps.length - 1 ? 'Submit' : 'Next'}
              <ChevronRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>
    </div>
  );
};

export default LeaseShopMain;