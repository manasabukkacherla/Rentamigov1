"use client"

import { useState, useRef } from "react";
import { Store, Building2, DollarSign, Calendar, UserCircle, Image as ImageIcon, MapPin, ChevronLeft, ChevronRight } from "lucide-react"
import PropertyName from '../PropertyName';
import OtherCommercialType from '../CommercialComponents/OtherCommercialType';
import CommercialPropertyAddress from '../CommercialComponents/CommercialPropertyAddress';
import Landmark from '../CommercialComponents/Landmark';
import MapCoordinates from '../MapCoordinates';
import CornerProperty from '../CommercialComponents/CornerProperty';
import OtherPropertyDetails from '../CommercialComponents/OtherPropertyDetails';
import CommercialPropertyDetails from '../CommercialComponents/CommercialPropertyDetails';
import LeaseAmount from '../lease/LeaseAmount';
import LeaseTenure from '../lease/LeaseTenure';
import MaintenanceAmount from '../residentialrent/MaintenanceAmount';
import OtherCharges from '../residentialrent/OtherCharges';
import Brokerage from '../residentialrent/Brokerage';
import CommercialAvailability from '../CommercialComponents/CommercialAvailability';
import CommercialContactDetails from '../CommercialComponents/CommercialContactDetails';
import CommercialMediaUpload from '../CommercialComponents/CommercialMediaUpload';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import MapLocation from "../CommercialComponents/MapLocation";

interface FormData {
  basicInformation: {
    title: string;
    type: string[];
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
    coordinates: {
      latitude: string;
      longitude: string;
    };
    isCornerProperty: boolean;
  };
  propertyDetails: {
    otherPropertyDetails: Record<string, any>;
    area: Record<string, any>;
    floor: Record<string, any>;
    facingDirection: string;
    furnishingStatus: string;
    propertyAmenities: string[];
    wholeSpaceAmenities: string[];
    waterAvailability: string;
    propertyAge: string;
    propertyCondition: string;
    electricitySupply: {
      powerLoad: number;
      backup: boolean;
    };
  };
  leaseTerms: {
leaseAmount: {
  minimumTenure: string;
  minimumUnit: string;
  maximumTenure: string;
  maximumUnit: string;
  lockInPeriod: string;
  lockInUnit: string;
  noticePeriod: string;
  noticePeriodUnit: string;
};
maintenanceAmount: {
  amount: number;
  frequency: "monthly" | "quarterly" | "half-yearly" | "yearly";
};
otherCharges: {
  water: {
    type: string;
    amount: number;
  };
  electricity: {
    type: string;
    amount: number;
  };
  gas: {
    type: string;
    amount: number;
  };
  others: {
    type: string;
    amount: number;
  };
};
brokerage: {
  amount ?: number;
  required: string;
};
  };
availability: {
  availableFrom: Date;
  availableImmediately: boolean;
  availabilityStatus: string;
  leaseDuration: string;
  noticePeriod: string;
  isPetsAllowed: boolean;
  operatingHours: {
    restricted: boolean;
  };
};
contactInformation: {
  name: string;
  email: string;
  phone: string;
  alternatePhone ?: string;
  bestTimeToContact ?: string;
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

const LeaseOthersMain = () => {
  const [formData, setFormData] = useState<FormData>({
    basicInformation: {
      title: '',
      type: [],
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
      coordinates: {
        latitude: '',
        longitude: ''
      },
      isCornerProperty: false,
    },
    propertyDetails: {
      otherPropertyDetails: {},
      area: {},
      floor: {},
      facingDirection: '',
      furnishingStatus: '',
      propertyAmenities: [],
      wholeSpaceAmenities: [],
      waterAvailability: '',
      propertyAge: '',
      propertyCondition: '',
      electricitySupply: {
        powerLoad: 0,
        backup: false
      }
    },
    leaseTerms: {
      leaseAmount: {
        minimumTenure: '1',
        minimumUnit: 'years',
        maximumTenure: '3',
        maximumUnit: 'years',
        lockInPeriod: '1',
        lockInUnit: 'years',
        noticePeriod: '1',
        noticePeriodUnit: 'months'
      },
      maintenanceAmount: {
        amount: 0,
        frequency: "monthly"
      },
      otherCharges: {
        water: {
          type: "inclusive",
          amount: 0
        },
        electricity: {
          type: "inclusive",
          amount: 0
        },
        gas: {
          type: "inclusive",
          amount: 0
        },
        others: {
          type: "inclusive",
          amount: 0
        }
      },
      brokerage: {
        amount: 0,
        required: "no"
      },
    },
    availability: {
      availableFrom: new Date(),
      availableImmediately: false,
      availabilityStatus: '',
      leaseDuration: '',
      noticePeriod: '',
      isPetsAllowed: false,
      operatingHours: {
        restricted: false
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
        emergencyExits: [],
      },
      videoTour: null,
      documents: []
    }
  });

  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();
  const formRef = useRef<HTMLDivElement>(null);

  const steps = [
    {
      title: "Basic Information",
      icon: <Store className="w-5 h-5" />,
      component: (
        <div className="space-y-8">

          <div className="space-y-6">
            <PropertyName
              propertyName={formData.basicInformation.title}
              onPropertyNameChange={(name) => setFormData(prev => ({
                ...prev,
                basicInformation: {
                  ...prev.basicInformation,
                  title: name
                }
              }))}
            />
            <OtherCommercialType
              onCommercialTypeChange={(types) => setFormData(prev => ({
                ...prev,
                type: types
              }))}
            />
          </div>

          <div className="space-y-6">
            <CommercialPropertyAddress
              address={formData.basicInformation.address}
              onAddressChange={(address) => setFormData(prev => ({
                ...prev,
                address
              }))}
            />
            <MapLocation
              latitude={formData.basicInformation.location.latitude}
              longitude={formData.basicInformation.location.longitude}
              landmark={formData.basicInformation.landmark}
              onLocationChange={(location) => setFormData(prev => ({ ...prev, location }))}
              onAddressChange={(address) => setFormData(prev => ({ ...prev, address }))}
              onLandmarkChange={(landmark) => setFormData(prev => ({ ...prev, landmark }))}
            />

            <CornerProperty
              isCornerProperty={formData.basicInformation.isCornerProperty}
              onCornerPropertyChange={(isCorner) => setFormData(prev => ({
                ...prev,
                isCornerProperty: isCorner
              }))}
            />
          </div>
        </div>
      ),
    },
    {
      title: "Property Details",
      icon: <Building2 className="w-5 h-5" />,
      component: (
        <div className="space-y-6">
          <OtherPropertyDetails
            onDetailsChange={(details) => setFormData(prev => ({
              ...prev,
              propertyDetails: { ...prev.propertyDetails, ...details }
            }))}
          />
          <CommercialPropertyDetails
            onDetailsChange={(details) => setFormData(prev => ({
              ...prev,
              propertyDetails: {
                ...prev.propertyDetails,
                ...details,
                electricitySupply: {
                  ...prev.propertyDetails.electricitySupply,
                  powerLoad: details.electricitySupply?.powerLoad ?? prev.propertyDetails.electricitySupply.powerLoad
                }
              }
            }))}
          />
        </div>
      ),
    },
    {
      title: "Lease Terms",
      icon: <DollarSign className="w-5 h-5" />,
      component: (
        <div className="space-y-6">
          <div className="space-y-4">
            <LeaseAmount
              onLeaseAmountChange={(amount) => setFormData(prev => ({
                ...prev,
                leaseTerms: { ...prev.leaseTerms, ...amount }
              }))}
            />
            <LeaseTenure
              onLeaseTenureChange={(tenure) => {
                // Format the tenure data to match what the backend schema expects
                const formattedTenure = {
                  minimumTenure: tenure.minimumTenure.duration.toString(),
                  minimumUnit: tenure.minimumTenure.durationType,
                  maximumTenure: tenure.maximumTenure.duration.toString(),
                  maximumUnit: tenure.maximumTenure.durationType,
                  lockInPeriod: tenure.lockInPeriod.duration.toString(),
                  lockInUnit: tenure.lockInPeriod.durationType,
                  noticePeriod: tenure.noticePeriod.duration.toString(),
                  noticePeriodUnit: tenure.noticePeriod.durationType
                };

                setFormData(prev => ({
                  ...prev,
                  leaseTerms: { ...prev.leaseTerms, ...formattedTenure }
                }));
              }}
            />
          </div>
          <div className="space-y-4">
            <MaintenanceAmount
              maintenanceAmount={formData.leaseTerms.maintenanceAmount}
              onMaintenanceAmountChange={(maintenance) => setFormData(prev => ({
                ...prev,
                maintenanceAmount: {
                  amount: maintenance.amount,
                  frequency: maintenance.frequency as "monthly" | "quarterly" | "half-yearly" | "yearly"
                }
              }))}
            />
            <div className="border-t border-gray-200 my-4"></div>
            <OtherCharges otherCharges={formData.leaseTerms.otherCharges} onOtherChargesChange={(charges) => {
              // Since the OtherCharges component sends the old state, wait for the component to update
              // by deferring the formData update with setTimeout
              setTimeout(() => {
                setFormData(prev => ({
                  ...prev,
                  otherCharges: {
                    water: charges.water || { amount: 0, type: 'inclusive' },
                    electricity: charges.electricity || { amount: 0, type: 'inclusive' },
                    gas: charges.gas || { amount: 0, type: 'inclusive' },
                    others: charges.others || { amount: 0, type: 'inclusive' }
                  }
                }));
              }, 0);
            }} />
            <div className="border-t border-gray-200 my-4"></div>
            <Brokerage
              bro={formData.leaseTerms.brokerage}
              onBrokerageChange={(brokerage) => setFormData(prev => ({
                ...prev,
                leaseTerms: { ...prev.leaseTerms, brokerage }
              }))}
            />
          </div>
        </div>
      ),
    },
    {
      title: "Availability",
      icon: <Calendar className="w-5 h-5" />,
      component: (
        <div className="space-y-6">
          <CommercialAvailability
            onAvailabilityChange={(availability) => setFormData(prev => ({
              ...prev,
              leaseTerms: { ...prev.leaseTerms, ...availability }
            }))}
          />
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
            onContactChange={(contact) => setFormData(prev => ({
              ...prev,
              leaseTerms: { ...prev.leaseTerms, ...contact }
            }))}
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
                  ...prev.media,
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
    console.log(formData);
    try {
      // Remove validation checks
      const user = sessionStorage.getItem('user');
      if (user) {
        const author = JSON.parse(user).id;

        // Prepare location data for API submission
        const locationData = {
          latitude: formData.basicInformation.location.latitude.toString() || formData.basicInformation.coordinates.latitude,
          longitude: formData.basicInformation.location.longitude.toString() || formData.basicInformation.coordinates.longitude
        };

        // Normalize leaseTenure data to ensure all values are strings
        const normalizedLeaseTenure = {
          minimumTenure: typeof formData.leaseTerms.leaseAmount.minimumTenure === 'object'
            ? ((formData.leaseTerms.leaseAmount.minimumTenure as any)?.durationType || 'years')
            : formData.leaseTerms.leaseAmount.minimumUnit,
          maximumTenure: typeof formData.leaseTerms.leaseAmount.maximumTenure === 'object'
            ? ((formData.leaseTerms.leaseAmount.maximumTenure as any)?.duration?.toString() || '3')
            : formData.leaseTerms.leaseAmount.maximumTenure,
          maximumUnit: typeof formData.leaseTerms.leaseAmount.maximumUnit === 'object'
            ? ((formData.leaseTerms.leaseAmount.maximumUnit as any)?.durationType || 'years')
            : formData.leaseTerms.leaseAmount.maximumUnit,
          lockInPeriod: typeof formData.leaseTerms.leaseAmount.lockInPeriod === 'object'
            ? ((formData.leaseTerms.leaseAmount.lockInPeriod as any)?.duration?.toString() || '1')
            : formData.leaseTerms.leaseAmount.lockInPeriod,
          lockInUnit: typeof formData.leaseTerms.leaseAmount.lockInUnit === 'object'
            ? ((formData.leaseTerms.leaseAmount.lockInUnit as any)?.durationType || 'years')
            : formData.leaseTerms.leaseAmount.lockInUnit,
          noticePeriod: typeof formData.leaseTerms.leaseAmount.noticePeriod === 'object'
            ? ((formData.leaseTerms.leaseAmount.noticePeriod as any)?.duration?.toString() || '1')
            : formData.leaseTerms.leaseAmount.noticePeriod,
          noticePeriodUnit: typeof formData.leaseTerms.leaseAmount.noticePeriodUnit === 'object'
            ? ((formData.leaseTerms.leaseAmount.noticePeriodUnit as any)?.durationType || 'months')
            : formData.leaseTerms.leaseAmount.noticePeriodUnit
        };

        // Convert files to base64 strings
        const convertedMedia = {
          photos: {
            exterior: await Promise.all((formData.media.photos?.exterior ?? []).map(convertFileToBase64)),
            interior: await Promise.all((formData.media.photos?.interior ?? []).map(convertFileToBase64)),
            floorPlan: await Promise.all((formData.media.photos?.floorPlan ?? []).map(convertFileToBase64)),
            washrooms: await Promise.all((formData.media.photos?.washrooms ?? []).map(convertFileToBase64)),
            lifts: await Promise.all((formData.media.photos?.lifts ?? []).map(convertFileToBase64)),
            emergencyExits: await Promise.all((formData.media.photos?.emergencyExits ?? []).map(convertFileToBase64))
          },
          videoTour: formData.media.videoTour ? await convertFileToBase64(formData.media.videoTour) : null,
          documents: await Promise.all((formData.media.documents ?? []).map(convertFileToBase64))
        };

        // Remove redundant coordinates field from final submission
        const { basicInformation, ...formDataWithoutCoordinates } = formData;

        const transformedData = {
          ...formDataWithoutCoordinates,
          location: locationData,
          leaseTerms: normalizedLeaseTenure,
          media: convertedMedia,
          metadata: {
            createdBy: author,
            createdAt: new Date(),
            propertyType: 'Commercial',
            propertyName: 'Other Commercial Property',
            intent: 'Lease',
            status: 'Available',
          }
        };

        toast.info('Submitting property listing... Please wait');

        const response = await axios.post('/api/commercial/lease/others', transformedData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (response.data.success) {
          toast.success('Other commercial property lease listing created successfully!');
        } else {
          toast.error(response.data.message || 'Failed to create listing. Please try again.');
        }
      } else {
        toast.warning('You need to be logged in to create a listing');

      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to create commercial property lease listing. Please try again.');
    }
  };

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
          <h1 className="text-2xl sm:text-3xl font-bold text-black">Lease Other Commercial Property</h1>
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
            type="button"
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className={`flex items-center px-6 py-2 rounded-lg border border-black/20 transition-all duration-200 ${currentStep === 0
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

export default LeaseOthersMain;