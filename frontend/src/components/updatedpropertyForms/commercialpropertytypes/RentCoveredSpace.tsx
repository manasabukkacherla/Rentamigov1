import React, { useState } from 'react';
import PropertyName from '../PropertyName';
import CoveredOpenSpaceType from '../CommercialComponents/CoveredOpenSpaceType';
import CommercialPropertyAddress from '../CommercialComponents/CommercialPropertyAddress';
import Landmark from '../CommercialComponents/Landmark';
import MapCoordinates from '../MapCoordinates';
import CornerProperty from '../CommercialComponents/CornerProperty';
import CoveredOpenSpaceDetails from '../CommercialComponents/CoveredOpenSpaceDetails';
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
import axios from 'axios';
import { useNavigate } from 'react-router-dom';





interface IFormData {

  basicInformation: {
    title: string;
  spaceType: string[];
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

  spaceDetails: {
    totalArea: number;
    squareFeet: number;
    coveredArea: number;
    openArea: number;
    roadWidth: {
      value: number;
      unit: "feet" | "meters";
    };
    ceilingHeight: {
      value: number;
      unit: "feet" | "meters";
    };
    noOfOpenSides: string;
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

interface CoveredOpenSpaceDetailsProps {
  onDetailsChange: (details: Record<string, any>) => void;
}

interface CommercialPropertyDetailsProps {
  onDetailsChange: (details: Record<string, any>) => void;
}

interface RentProps {
  onRentChange: (rent: Record<string, any>) => void;
}

interface MaintenanceAmountProps {
  onMaintenanceAmountChange: (maintenance: Record<string, any>) => void;
  maintenanceAmount: { amount: number; frequency: string };
}

interface SecurityDepositProps {
  onSecurityDepositChange: (deposit: Record<string, any>) => void;
  securityDeposit: { amount: number };
}

interface OtherChargesProps {
  onOtherChargesChange: (charges: Record<string, any>) => void;
  otherCharges: {
    water: { amount?: number; type: string };
    electricity: { amount?: number; type: string };
    gas: { amount?: number; type: string };
    others: { amount?: number; type: string };
  };
}

interface BrokerageProps {
  onBrokerageChange: (brokerage: Record<string, any>) => void;
  brokerage: { required: string; amount?: number };
}

interface CommercialContactDetailsProps {
  onContactChange: (contact: Record<string, any>) => void;
}

interface CommercialMediaUploadProps {
  onMediaChange: (media: Record<string, any>) => void;
  media: IMedia;
}

const RentCoveredSpace = () => {
  const [formData, setFormData] = useState<IFormData>({
    basicInformation: {
      title: '',
      spaceType: [],
      address: {
        street: '',
        city: '',
        state: '',
        zipCode: '',
      },
      landmark: '',
      location: {
        latitude: 0,
        longitude: 0,
      },
      isCornerProperty: false,

      
      
      // propertyType: '',
      // propertySubType: '',
      // propertyStatus: '',
      // propertyAge: '',
      // propertyFurnishing: '',
      // propertyFacing: '',
      // propertyFloor: '',
      // totalFloors: '',
      // propertyDescription: ''
    },
    spaceDetails: {
      totalArea: 0,
      squareFeet: 0,
      coveredArea: 0,
      openArea: 0,
      roadWidth: {
        value: 0,
        unit: 'feet',
      },
      ceilingHeight: {
        value: 0,
        unit: 'feet',
      },
      noOfOpenSides: '',
    },
    propertyDetails: {
      area:{
        totalArea: 0,
        builtUpArea: 0,
        carpetArea: 0,
      },
      floor:{
        floorNumber: 0,
        totalFloors: 0,
      },
      // propertyCondition: '',
      facingDirection: '',
      furnishingStatus: '',
      propertyAmenities: [],
      wholeSpaceAmenities: [],
      electricitySupply: {
        powerLoad: 0,
        backup: false,
      },  
      waterAvailability: '',
      propertyAge: 0,
      propertyCondition: '',
      // propertySize: {
      //   area: 0,
      //   unit: ''
      // },
      // parking: {
      //   type: '',
      //   count: 0
      // },
      // amenities: []
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
  const navigate = useNavigate();

  // const handlePropertyNameChange = (name: string) => {
  //   setFormData(prev => ({
  //     ...prev,
  //     basicInformation: {
  //       ...prev.basicInformation,
  //       propertyName: name
  //     }
  //   }));
  // };

  // const handleSpaceTypeChange = (types: string[]) => {
  //   setFormData(prev => ({
  //     ...prev,
  //     basicInformation: {
  //       ...prev.basicInformation,
  //       spaceType: types
  //     }
  //   }));
  // };

  // const handleAddressChange = (address: { street: string; city: string; state: string; zipCode: string }) => {
  //   setFormData(prev => ({
  //     ...prev,
  //     basicInformation: {
  //       ...prev.basicInformation,
  //       address
  //     }
  //   }));
  // };

  // const handleLandmarkChange = (landmark: string) => {
  //   setFormData(prev => ({
  //     ...prev,
  //     basicInformation: {
  //       ...prev.basicInformation,
  //       landmark
  //     }
  //   }));
  // };

  // const handleLatitudeChange = (lat: string) => {
  //   setFormData(prev => ({
  //     ...prev,
  //     basicInformation: {
  //       ...prev.basicInformation,
  //       latitude: lat
  //     }
  //   }));
  // };

  // const handleLongitudeChange = (lng: string) => {
  //   setFormData(prev => ({
  //     ...prev,
  //     basicInformation: {
  //       ...prev.basicInformation,
  //       longitude: lng
  //     }
  //   }));
  // };

  // // const handleCornerPropertyChange = (isCorner) => setFormData(prev => ({
  // //   ...prev,
  // //   basicInformation: { ...prev.basicInformation, isCornerProperty: isCorner }
  // // }));
  // // };

  const handleSpaceDetailsChange = (details: Record<string, any>) => {
    setFormData(prev => ({
      ...prev,
      spaceDetails: {
        ...prev.spaceDetails,
        ...details
      }
    }));
  };

  const handlePropertyDetailsChange = (details: Record<string, any>) => {
    setFormData(prev => ({
      ...prev,
      propertyDetails: {
        ...prev.propertyDetails,
        ...details
      }
    }));
  };

  // const handleRentChange = (rent: Record<string, any>) => {
  //   setFormData(prev => ({
  //     ...prev,
  //     rentalTerms: {
  //       ...prev.rentalTerms,
  //       rentDetails: rent
  //     }
  //   }));
  // };

  // const handleMaintenanceAmountChange = (maintenance: Record<string, any>) => {
  //   setFormData(prev => ({
  //     ...prev,
  //     rentalTerms: {
  //       ...prev.rentalTerms,
  //       maintenanceAmount: maintenance
  //     }
  //   }));
  // };

  // const handleSecurityDepositChange = (deposit: Record<string, any>) => {
  //   setFormData(prev => ({
  //     ...prev,
  //     rentalTerms: {
  //       ...prev.rentalTerms,
  //       securityDeposit: deposit
  //     }
  //   }));
  // };

  // const handleOtherChargesChange = (charges: Record<string, any>) => {
  //   setFormData(prev => ({
  //     ...prev,
  //     rentalTerms: {
  //       ...prev.rentalTerms,
  //       otherCharges: charges
  //     }
  //   }));
  // };

  // const handleBrokerageChange = (brokerage: Record<string, any>) => {
  //   setFormData(prev => ({
  //     ...prev,
  //     rentalTerms: {
  //       ...prev.rentalTerms,
  //       brokerage: brokerage
  //     }
  //   }));
  // };

  // const handleAvailabilityChange = (availability: { type: 'immediate' | 'specific'; date?: string }) => {
  //   setFormData(prev => ({
  //     ...prev,
  //     rentalTerms: {
  //       ...prev.rentalTerms,
  //       availability
  //     }
  //   }));
  // };

  // const handleContactChange = (contact: Record<string, any>) => {
  //   setFormData(prev => ({
  //     ...prev,
  //     contactInformation: contact
  //   }));
  // };


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


  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  // const handleMediaChange = (media: Record<string, any>) => {
  //   setFormData(prev => ({
  //     ...prev,
  //     media: {
  //       photos: media.images,
  //       video: media.video,
  //       documents: media.documents,
  //       videoTour: media.videoTour
  //     }
  //   }));
  // };

  const formSections = [
    {
      title: 'Basic Information',
      content: (
        <>
          <PropertyName propertyName={formData.basicInformation.title}
                onPropertyNameChange={(name) => setFormData(prev => ({
                  ...prev,
                  basicInformation: { ...prev.basicInformation, title: name }
                }))}/>
          <CoveredOpenSpaceType onSpaceTypeChange={(types) => setFormData(prev => ({
                ...prev,
                basicInformation: { ...prev.basicInformation, spaceType: types }
              }))} />
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
        </>
      )
    },
    {
      title: 'Property Details',
      content: (
        <>
          <CoveredOpenSpaceDetails onDetailsChange={handleSpaceDetailsChange} />
          <CommercialPropertyDetails onDetailsChange={handlePropertyDetailsChange} />
        </>
      )
    },
    {
      title: 'Rental Terms',
      content: (
        <>
          
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
                setFormData(prev => ({
                  ...prev,
                  rentalTerms: {
                    ...prev.rentalTerms,
                    brokerage: {
                      required: brokerage.required,
                      amount: brokerage.amount
                    }
                  }
                }));
              }}
              />
{/* 
<Brokerage
              onBrokerageChange={(brokerage) => {
                handleChange('rentalTerms.brokerage.required', brokerage.required);
                handleChange('rentalTerms.brokerage.amount', brokerage.amount);
              }}
            /> */}

          </div>
        </div>
        </>
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
    <form onSubmit={handleSubmit} className="space-y-12">
      <div className="space-y-12">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {formSections.map((s, i) => (
              <div
                key={i}
                className={`flex flex-col items-center ${i <= currentStep ? "text-black" : "text-gray-400"}`}
                onClick={() => i < currentStep && setCurrentStep(i)}
                style={{ cursor: i < currentStep ? "pointer" : "default" }}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                    i <= currentStep ? "bg-black text-white" : "bg-gray-200 text-gray-400"
                  }`}
                >
                  {i + 1}
                </div>
                <span className="text-xs font-medium">{s.title}</span>
              </div>
            ))}
          </div>
          <div className="w-full bg-gray-200 h-1 rounded-full">
            <div
              className="bg-black h-1 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / (formSections.length - 1)) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-black">{formSections[currentStep].title}</h2>
        </div>

        <div className="space-y-8">{formSections[currentStep].content}</div>
      </div>

      <div className="mt-8 flex justify-between items-center">
        {currentStep > 0 && (
          <button
            type="button"
            onClick={handlePrevious}
            className="flex items-center px-6 py-3 text-black border-2 border-gray-300 rounded-lg hover:border-black transition-colors duration-200"
          >
            Previous
          </button>
        )}
        {currentStep < formSections.length - 1 ? (
          <button
            type="button"
            onClick={handleNext}
            className="flex items-center px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-200 ml-auto"
          >
            Next
          </button>
        ) : (
          <button
            type="submit"
            className="flex items-center px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-200 ml-auto"
          >
            List Property
          </button>
        )}
      </div>
    </form>
  );
};

export default RentCoveredSpace;

