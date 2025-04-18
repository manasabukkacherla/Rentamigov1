import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PropertyName from '../PropertyName';
import WarehouseType from '../CommercialComponents/WarehouseType';
import CommercialPropertyAddress from '../CommercialComponents/CommercialPropertyAddress';
import Landmark from '../CommercialComponents/Landmark';
import MapCoordinates from '../MapCoordinates';
import CornerProperty from '../CommercialComponents/CornerProperty';
import WarehouseDetails from '../CommercialComponents/WarehouseDetails';
import CommercialPropertyDetails from '../CommercialComponents/CommercialPropertyDetails';
import Rent from '../residentialrent/Rent';
import SecurityDeposit from '../residentialrent/SecurityDeposit';
import MaintenanceAmount from '../residentialrent/MaintenanceAmount';
import OtherCharges from '../residentialrent/OtherCharges';
import Brokerage from '../residentialrent/Brokerage';
import AvailabilityDate from '../AvailabilityDate';
import CommercialContactDetails from '../CommercialComponents/CommercialContactDetails';
import CommercialMediaUpload from '../CommercialComponents/CommercialMediaUpload';
import { MapPin, Building2, DollarSign, Calendar, User, Image, Warehouse, ImageIcon, UserCircle, ChevronRight, ChevronLeft } from 'lucide-react';
import { toast } from 'react-toastify';

// Define the FormData interface to match the backend structure
interface FormData {
  basicInformation: {
    title: string;
    warehouseType: string[];
    // price: number;
    // currency: string;
  };
  propertyDetails: {
    address: {
      street: string;
      city: string;
      state: string;
      country: string;
      zipCode: string;
    };
    location: {
      latitude: number;
      longitude: number;
    };
    totalArea: number;
    areaUnit: string;
    yearBuilt: number;
    parkingSpaces: number;
    propertyCondition: string;
  };
  warehouseDetails: {
    access24x7: boolean,
    ceilingHeight: number,
    totalArea: number,
    docks: {
      height: number,
      count: number,
    },
    floorLoadCapacity: number,
    fireSafety: boolean,
    securityPersonnel: boolean,
    truckParking: boolean,
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
  availability: {
    availableFrom?: string;
    availableImmediately: boolean;
  };
  contactInformation: {
    name: string;
    email: string;
    phone: string;
    preferredContactMethod: string;
    responseTime: string;
    alternatePhone: string;
    bestTimeToContact: string;
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

const convertFileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

const RentWarehouse = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    basicInformation: {
      title: '',
      warehouseType: [],
    },
    propertyDetails: {
      address: {
        street: '',
        city: '',
        state: '',
        country: '',
        zipCode: '',
      },
      location: {
        latitude: 0,
        longitude: 0,
      },
      totalArea: 0,
      areaUnit: '',
      yearBuilt: 0,
      parkingSpaces: 0,
      propertyCondition: '',
    },
    warehouseDetails: {
      access24x7: false,
      ceilingHeight: 0,
      totalArea: 0,
      docks: {
        height: 0,
        count: 0,
      },
      floorLoadCapacity: 0,
      fireSafety: false,
      securityPersonnel: false,
      truckParking: false,
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
        required: 'no',
        amount: 0,
      },
      availability: {
        type: 'immediate',
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
      preferredContactMethod: '',
      responseTime: '',
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
      videoTour: null,
      documents: [],
    },
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formSections = [
    {
      title: 'Basic Information',
      icon: <MapPin className="w-6 h-6" />,
      content: (
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <div className="flex items-center gap-2 mb-6">
            <Warehouse className="text-black" size={24} />
            <h3 className="text-xl font-semibold text-gray-800">Basic Details</h3>
          </div>
          <div className="space-y-6">
            <div className="relative">
              <PropertyName
                propertyName={formData.basicInformation.title}
                onPropertyNameChange={(name) => setFormData(prev => ({
                  ...prev,
                  basicInformation: { ...prev.basicInformation, title: name }
                }))}
              />
              <Warehouse className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
            <WarehouseType
              onWarehouseTypeChange={(types) => setFormData(prev => ({
                ...prev,
                basicInformation: { ...prev.basicInformation, warehouseType: types }
              }))}
            />
            <CommercialPropertyAddress
              onAddressChange={(address) => setFormData(prev => ({
                ...prev,
                basicInformation: { ...prev.basicInformation, address }
              }))}
            />
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

            <div className="flex items-center space-x-2 cursor-pointer">
              <CornerProperty
                onCornerPropertyChange={(isCorner) => setFormData(prev => ({
                  ...prev,
                  basicInformation: { ...prev.basicInformation, isCornerProperty: isCorner }
                }))}
              />
              </div>
          </div>
        </div>
      )
    },
    {
      title: 'Property Details',
      icon: <Building2 className="w-6 h-6" />,
      content: (
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <div className="flex items-center gap-2 mb-6">
            <Building2 className="text-black" size={24} />
            <h3 className="text-xl font-semibold text-gray-800">Property Details</h3>
          </div>
          <div className="space-y-6">
            <WarehouseDetails
              onDetailsChange={(details) => handleChange('warehouseDetails', details)}
            />
            <CommercialPropertyDetails
              onDetailsChange={(details) => handleChange('propertyDetails', details)}
            />
          </div>
        </div>
      )
    },
    {
      title: 'Rental Terms',
      icon: <DollarSign className="w-6 h-6" />,
      content: (
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <div className="flex items-center gap-2 mb-6">
            <DollarSign className="text-black" size={24} />
            <h3 className="text-xl font-semibold text-gray-800">Rental Terms</h3>
          </div>
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
              onBrokerageChange={(brokerage) => {
                handleChange('rentalTerms.brokerage.required', brokerage.required);
                handleChange('rentalTerms.brokerage.amount', brokerage.amount);
              }}
            />
          </div>
        </div>
      )
    },
    {
      title: 'Availability',
      icon: <Calendar className="w-6 h-6" />,
      content: (
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <div className="flex items-center gap-2 mb-6">
            <Calendar className="text-black" size={24} />
            <h3 className="text-xl font-semibold text-gray-800">Availability</h3>
          </div>
          <div className="space-y-6">
            <AvailabilityDate
              onAvailabilityChange={(availability) => {
                handleChange('rentalTerms.availability.type', availability.type);

                const dateToStore = availability.type === 'immediate'
                  ? new Date().toISOString()
                  : availability.date || '';

                handleChange('rentalTerms.availability.date', dateToStore);

                handleChange('availability.availableFrom', dateToStore);
                handleChange('availability.availableImmediately', availability.type === 'immediate');
              }}
            />
          </div>
        </div>
      )
    },
    {
      title: 'Contact Information',
      icon: <User className="w-6 h-6" />,
      content: (
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <div className="flex items-center gap-2 mb-6">
            <UserCircle className="text-black" size={24} />
            <h3 className="text-xl font-semibold text-gray-800">Contact Details</h3>
          </div>
          <div className="space-y-6">
            <CommercialContactDetails
              onContactChange={(contact) => handleChange('contactInformation', contact)}
            />
          </div>
        </div>
      )
    },
    {
      title: 'Property Media',
      icon: <Image className="w-6 h-6" />,
      content: (
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <div className="flex items-center gap-2 mb-6">
            <ImageIcon className="text-black" size={24} />
            <h3 className="text-xl font-semibold text-gray-800">Property Media</h3>
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
                    videoTour: media.video?.file || null,
                    documents: media.documents.map(d => d.file)
                  }
                }));
              }}
            />
          </div>
        </div>
      )
    }
  ];

  const handleChange = (field: string, value: any) => {
    setFormData(prev => {
      const fields = field.split('.');
      const lastField = fields.pop() || '';

      const newData = { ...prev };
      let current: any = newData;

      for (const field of fields) {
        current = { ...current[field] };
      }

      current[lastField] = value;
      return newData;
    });
  };

  const handleMediaChange = (field: string, files: FileList | null) => {
    if (!files) return;

    const fileArray = Array.from(files);
    const base64Array = fileArray.map(file => {
      return new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64 = reader.result as string;
          resolve(base64.split(',')[1]);
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(base64Array).then(base64Files => {
      setFormData(prev => ({
        ...prev,
        media: {
          ...prev.media,
          [field]: base64Files
        }
      }));
    });
  };

  const handleNext = () => {
    // if (validateCurrentStep()) {
    if (currentStep < formSections.length - 1) {
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
        const response = await axios.post('/api/commercial-rent-warehouses', transformedData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        console.log(response.data)

        if (response.data.success) {
          toast.success('Commercial warehouse listing created successfully!');
        }
      } else {
        navigate('/login');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to create commercial shop listing. Please try again.');
    }
    // console.log(formData);
  };

  return (
    // <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
    <div className='max-w-4xl mx-auto'>
      {/* Progress Steps */}
      <div className="bg-white p-6 rounded-2xl shadow-lg mb-8 [forced-colors:active] border border-transparent">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800 [forced-colors:active]:text-[CanvasText]">List Your Warehouse for Rent</h2>
          <div className="text-sm text-gray-500 [forced-colors:active]:text-[CanvasText]">Step {currentStep + 1} of {formSections.length}</div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-gray-200 [forced-colors:active]:border-[CanvasText]"></div>
          </div>
          <div className="relative flex justify-between">
            {formSections.map((section, index) => (
              <div key={index} className="flex flex-col items-center">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full ${index <= currentStep
                      ? 'bg-black text-white [forced-colors:active]:bg-[Highlight] [forced-colors:active]:text-[HighlightText]'
                      : 'bg-gray-200 text-gray-500 [forced-colors:active]:bg-[ButtonText] [forced-colors:active]:text-[Canvas]'
                    }`}
                >
                  {section.icon}
                </div>
                <div className="mt-2 text-xs font-medium text-gray-500 [forced-colors:active]:text-[CanvasText]">{section.title}</div>
              </div>
            ))}
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
                >
                  {currentStep === formSections.length - 1 ? 'Submit' : 'Next'}
                  <ChevronRight className="w-5 h-5 ml-2" />
                </button>
              </div>
            </div>
          </div>
        </div>
  );
};

export default RentWarehouse;
