"use client"

import React, { useState, useCallback, useRef } from "react";
import { Building2, MapPin, IndianRupee, Calendar, Image, Home, ChevronLeft, ChevronRight, Loader2 } from "lucide-react"
import PropertyName from "../PropertyName";
import PropertyAddress from "../PropertyAddress";
import MapCoordinates from "../MapCoordinates";
import PropertySize from "../PropertySize";
import PropertyFeatures from "../PropertyFeatures";
import Rent from "../residentialrent/Rent";
import Restrictions from "../Restrictions";
import SecurityDeposit from "../residentialrent/SecurityDeposit";
import MaintenanceAmount from "../residentialrent/MaintenanceAmount";
import Brokerage from "../residentialrent/Brokerage";
import AvailabilityDate from "../AvailabilityDate";
import OtherCharges from "../residentialrent/OtherCharges";
import ResidentialPropertyMediaUpload from "../ResidentialPropertyMediaUpload";
import FlatAmenities from "../FlatAmenities";
import SocietyAmenities from "../SocietyAmenities";
import SharingMembers from "../Sharingmembers";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

interface Address {
  flatNo: number;
  showFlatNo: boolean;
  floor: number;
  apartmentName: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  location: {
    latitude: string;
    longitude: string;
  };
}

interface IBasicInformation {
  title: string;
  address: Address;
}

interface PropertyDetails {
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
  propertyOnFloor: number;
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
}

interface IMedia {
  photos: {
    exterior: (File | string)[];
    interior: (File | string)[];
    floorPlan: (File | string)[];
    washrooms: (File | string)[];
    lifts: (File | string)[];
    emergencyExits: (File | string)[];
    bedrooms: (File | string)[];
    halls: (File | string)[];
    storerooms: (File | string)[];
    kitchen: (File | string)[];
  };
  videoTour?: File | string;
  documents: (File | string)[];
}

interface SharingDetails {
  totalBeds: number;
  occupiedBeds: number;
  availableBeds: number;
  occupancyType: "male" | "female" | "any";
}

interface SharingMembersProps {
  onOccupancyChange: (details: SharingDetails) => void;
  occupancyDetails: SharingDetails;
}

interface RentComponentProps {
  rentDetails: Record<string, any>;
  onRentChange: (rent: Record<string, any>) => void;
}

interface AvailabilityDateProps {
  availability: {
    type: "immediate" | "specific";
    date?: string;
  };
  onAvailabilityChange: (availability: {
    type: "immediate" | "specific";
    date?: string;
  }) => void;
}

interface FlatAmenitiesType {
  lights: number;
  ceilingFan: number;
  geysers: number;
  chimney: boolean;
  callingBell: boolean;
  wardrobes: number;
  lofts: number;
  kitchenCabinets: number;
  clothHanger: number;
  pipedGasConnection: boolean;
  gasStoveWithCylinder: boolean;
  ironingStand: boolean;
  bathtub: boolean;
  shower: boolean;
  sofa: boolean;
  coffeeTable: boolean;
  tvUnit: boolean;
  diningTableWithChairs: number;
  cotWithMattress: number;
  sideTable: number;
  studyTableWithChair: number;
  television: boolean;
  refrigerator: boolean;
  washingMachine: boolean;
  dishwasher: boolean;
  waterPurifier: boolean;
  microwaveOven: boolean;
  inductionCooktop: boolean;
  gasStove: boolean;
  airConditioner: number;
  desertCooler: number;
  ironBox: boolean;
  exhaustFan: number;
}

interface SocietyAmenitiesType {
  powerutility: string[];
  parkingtranspotation: string[];
  recreationalsportsfacilities: string[];
  childrenfamilyamenities: string[];
  healthwellnessfacilities: string[];
  shoppingconviencestores: string[];
  ecofriendlysustainable: string[];
  communityculturalspaces: string[];
  smarthometechnology: string[];
  otheritems: string[];
}

interface RentDetails {
  expectedRent: number;
  isNegotiable: boolean;
  rentType: string;
}

interface IMetadata {
  createdBy: string;
  createdAt: Date;
  propertyType: string;
  propertyName: string;
  intent: string;
  status: string;
}

interface FormData {
  basicInformation: IBasicInformation;
  propertySize: number;
  propertyDetails: PropertyDetails;
  sharingDetails: SharingDetails;
  restrictions: {
    foodPreference: string;
    petsAllowed: string;
    tenantType: string;
  };
  flatAmenities: FlatAmenitiesType;
  societyAmenities: SocietyAmenitiesType;
  rentalTerms: {
    rentDetails: RentDetails;
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
    brokerage: {
      required: string;
      amount?: number;
    };
  };
  availability: {
    type: "immediate" | "specific";
    date: string;
  };
  media: IMedia;
  metadata: IMetadata;
}

interface SharedSpaceProps {
  propertyId?: string;
  onSubmit?: (formData: FormData) => void;
}

const SharedSpace = ({ propertyId: initialPropertyId, onSubmit }: SharedSpaceProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [propertyId, setPropertyId] = useState<string | undefined>(initialPropertyId);
  const formRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const initialFormData: FormData = {
    basicInformation: {
      title: "",
      address: {
        flatNo: 0,
        showFlatNo: false,
        floor: 0,
        apartmentName: "",
        street: "",
        city: "",
        state: "",
        zipCode: "",
        location: {
          latitude: "",
          longitude: ""
        }
      }
    },
    propertySize: 0,
    propertyDetails: {
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
      utilityArea: "",
      furnishingStatus: "",
      totalFloors: 0,
      propertyOnFloor: 0,
      facing: "",
      propertyAge: "",
      superBuiltUpAreaSqft: 0,
      superBuiltUpAreaSqmt: 0,
      builtUpAreaSqft: 0,
      builtUpAreaSqmt: 0,
      carpetAreaSqft: 0,
      carpetAreaSqmt: 0,
      electricityAvailability: "",
      waterAvailability: {
        borewell: false,
        governmentSupply: false,
        tankerSupply: false
      }
    },
    sharingDetails: {
      totalBeds: 1,
      occupiedBeds: 0,
      availableBeds: 1,
      occupancyType: "any"
    },
    restrictions: {
      foodPreference: "",
      petsAllowed: "",
      tenantType: ""
    },
    flatAmenities: {
      lights: 0,
      ceilingFan: 0,
      geysers: 0,
      chimney: false,
      callingBell: false,
      wardrobes: 0,
      lofts: 0,
      kitchenCabinets: 0,
      clothHanger: 0,
      pipedGasConnection: false,
      gasStoveWithCylinder: false,
      ironingStand: false,
      bathtub: false,
      shower: false,
      sofa: false,
      coffeeTable: false,
      tvUnit: false,
      diningTableWithChairs: 0,
      cotWithMattress: 0,
      sideTable: 0,
      studyTableWithChair: 0,
      television: false,
      refrigerator: false,
      washingMachine: false,
      dishwasher: false,
      waterPurifier: false,
      microwaveOven: false,
      inductionCooktop: false,
      gasStove: false,
      airConditioner: 0,
      desertCooler: 0,
      ironBox: false,
      exhaustFan: 0
    },
    societyAmenities: {
      powerutility: [],
      parkingtranspotation: [],
      recreationalsportsfacilities: [],
      childrenfamilyamenities: [],
      healthwellnessfacilities: [],
      shoppingconviencestores: [],
      ecofriendlysustainable: [],
      communityculturalspaces: [],
      smarthometechnology: [],
      otheritems: []
    },
    rentalTerms: {
      rentDetails: {
        expectedRent: 0,
        isNegotiable: false,
        rentType: "inclusive"
      },
      securityDeposit: {
        amount: 0
      },
      maintenanceAmount: {
        amount: 0,
        frequency: "monthly"
      },
      otherCharges: {
        water: {
          amount: 0,
          type: "inclusive"
        },
        electricity: {
          amount: 0,
          type: "inclusive"
        },
        gas: {
          amount: 0,
          type: "inclusive"
        },
        others: {
          amount: 0,
          type: "inclusive"
        }
      },
      brokerage: {
        required: "no",
        amount: 0
      }
    },
    availability: {
      type: "immediate",
      date: ""
    },
    media: {
      photos: {
        exterior: [],
        interior: [],
        floorPlan: [],
        washrooms: [],
        lifts: [],
        emergencyExits: [],
        bedrooms: [],
        halls: [],
        storerooms: [],
        kitchen: []
      },
      videoTour: undefined,
      documents: []
    },
    metadata: {
      createdBy: "",
      createdAt: new Date(),
      propertyType: "Residential",
      propertyName: "Shared Space",
      intent: "Rent",
      status: "active"
    }
  };

  const [formData, setFormData] = useState<FormData>(initialFormData);

  const handleAddressChange = useCallback((newAddress: Address) => {
    setFormData(prev => ({
      ...prev,
      basicInformation: {
        ...prev.basicInformation,
        address: {
          ...prev.basicInformation.address,
          ...newAddress,
          location: {
            ...prev.basicInformation.address.location,
            ...newAddress.location
          }
        }
      }
    }));
  }, []);

  const formSections = [
    {
      title: "Basic Information",
      icon: <Home className="w-6 h-6" />,
      component: (
        <div className="space-y-8">
          <PropertyName
            propertyName={formData.basicInformation.title}
            onPropertyNameChange={(name) =>
              setFormData((prev) => ({
                ...prev,
                basicInformation: { ...prev.basicInformation, title: name }
              }))
            }
          />
          <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
            <div className="space-y-8">
              <div className="flex items-center mb-8">
                <MapPin className="text-black mr-3" size={28} />
                <h3 className="text-2xl font-semibold text-black">Location Details</h3>
              </div>
              <PropertyAddress
                address={formData.basicInformation.address}
                onAddressChange={handleAddressChange}
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Sharing Details",
      icon: <Building2 className="w-6 h-6" />,
      component: (
        <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
          <div className="space-y-8">
            <div className="flex items-center mb-8">
              <Building2 className="text-black mr-3" size={28} />
              <h3 className="text-2xl font-semibold text-black">Sharing Details</h3>
            </div>
            <SharingMembers
              onSharingTypeChange={(type: string) => {
                // Handle room type change if needed
              }}
              onSharingDetailsChange={(details: {
                totalBeds: number;
                occupiedBeds: number;
                availableFor: string;
                availableBeds: number;
              }) => {
                setFormData((prev) => ({
                  ...prev,
                  sharingDetails: {
                    ...prev.sharingDetails,
                    totalBeds: details.totalBeds,
                    occupiedBeds: details.occupiedBeds,
                    occupancyType: details.availableFor as "male" | "female" | "any",
                    availableBeds: details.availableBeds
                  }
                }));
              }}
            />
          </div>
        </div>
      ),
    },
    {
      title: "Property Details",
      icon: <Building2 className="w-6 h-6" />,
      component: (
        <div className="space-y-8">
          <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
            <div className="space-y-8">
              <div className="flex items-center mb-8">
                <Building2 className="text-black mr-3" size={28} />
                <h3 className="text-2xl font-semibold text-black">Property Features</h3>
              </div>
              <PropertyFeatures
                onFeaturesChange={(features) =>
                  setFormData((prev) => ({
                    ...prev,
                    propertyDetails: { ...prev.propertyDetails, ...features }
                  }))
                }
              />
            </div>
          </div>

          <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
            <div className="space-y-8">
              <div className="flex items-center mb-8">
                <Building2 className="text-black mr-3" size={28} />
                <h3 className="text-2xl font-semibold text-black">Amenities</h3>
              </div>
              <div className="space-y-12">
                <FlatAmenities
                  amenities={formData.flatAmenities}
                  onAmenitiesChange={(amenities) =>
                    setFormData((prev) => ({
                      ...prev,
                      flatAmenities: { ...prev.flatAmenities, ...amenities }
                    }))
                  }
                />
                <SocietyAmenities
                  amenities={formData.societyAmenities}
                  onChange={(amenities) =>
                    setFormData((prev) => ({
                      ...prev,
                      societyAmenities: amenities
                    }))
                  }
                />
              </div>
            </div>
          </div>

          <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
            <Restrictions
              res={formData.restrictions}
              onRestrictionsChange={(restrictions) =>
                setFormData((prev) => ({ ...prev, restrictions }))
              }
            />
          </div>
        </div>
      ),
    },
    {
      title: "Rental Terms",
      icon: <IndianRupee className="w-6 h-6" />,
      component: (
        <div className="space-y-8">
          <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
            <div className="space-y-8">
              <Rent
                rentDetails={formData.rentalTerms.rentDetails}
                onRentChange={(rent: Record<string, any>) =>
                  setFormData((prev) => ({
                    ...prev,
                    rentalTerms: { ...prev.rentalTerms, rentDetails: rent as RentDetails }
                  }))
                }
              />
              <SecurityDeposit
                deposit={formData.rentalTerms.securityDeposit}
                onSecurityDepositChange={(deposit) =>
                  setFormData((prev) => ({
                    ...prev,
                    rentalTerms: { ...prev.rentalTerms, securityDeposit: deposit }
                  }))
                }
              />
              <MaintenanceAmount
                maintenanceAmount={formData.rentalTerms.maintenanceAmount}
                onMaintenanceAmountChange={(maintenance) =>
                  setFormData((prev) => ({
                    ...prev,
                    rentalTerms: { ...prev.rentalTerms, maintenanceAmount: maintenance }
                  }))
                }
              />
              <OtherCharges
                otherCharges={formData.rentalTerms.otherCharges}
                onOtherChargesChange={(charges) =>
                  setFormData((prev) => ({
                    ...prev,
                    rentalTerms: { ...prev.rentalTerms, otherCharges: charges }
                  }))
                }
              />
              <Brokerage
                bro={formData.rentalTerms.brokerage}
                onBrokerageChange={(brokerage) =>
                  setFormData((prev) => ({
                    ...prev,
                    rentalTerms: { ...prev.rentalTerms, brokerage }
                  }))
                }
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Availability",
      icon: <Calendar className="w-6 h-6" />,
      component: (
        <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
          <div className="space-y-8">
            <AvailabilityDate
              availability={{
                type: formData.availability.type,
                date: formData.availability.date
              }}
              onAvailabilityChange={(availability: { type: "immediate" | "specific"; date?: string }) =>
                setFormData((prev) => ({
                  ...prev,
                  availability: {
                    type: availability.type,
                    date: availability.date || ""
                  }
                }))
              }
            />
          </div>
        </div>
      ),
    },
    {
      title: "Property Media",
      icon: <Image className="w-6 h-6" />,
      component: (
        <div className="space-y-8">
          <ResidentialPropertyMediaUpload
            propertyType="sharedspace"
            propertyId={propertyId}
            value={formData.media}
            onChange={(media) => setFormData((prev) => ({ ...prev, media }))}
          />
        </div>
      ),
    },
  ];

  const handleNext = () => {
    if (currentStep < formSections.length - 1) {
      setCurrentStep((prev) => prev + 1);
      setTimeout(() => {
        if (formRef.current) {
          window.scrollTo({
            top: formRef.current.offsetTop - 100,
            behavior: "smooth"
          });
        } else {
          window.scrollTo({
            top: 0,
            behavior: "smooth"
          });
        }
      }, 100);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
      setTimeout(() => {
        if (formRef.current) {
          window.scrollTo({
            top: formRef.current.offsetTop - 100,
            behavior: "smooth"
          });
        } else {
          window.scrollTo({
            top: 0,
            behavior: "smooth"
          });
        }
      }, 100);
    }
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    console.log(formData);

    try {
      const user = sessionStorage.getItem("user");
      if (!user) {
        navigate("/login");
        return;
      }

      const author = JSON.parse(user).id;

      // Convert media files to base64
      const convertFileToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = (error) => reject(error);
        });
      };

      // Helper function to convert array of files to base64
      const convertFilesToBase64 = async (
        files: (File | string)[]
      ): Promise<string[]> => {
        const results: string[] = [];
        for (const file of files) {
          if (file instanceof File) {
            const base64 = await convertFileToBase64(file);
            results.push(base64);
          } else {
            results.push(file); // Already a string (URL)
          }
        }
        return results;
      };

      const convertedMedia = {
        photos: {
          exterior: await convertFilesToBase64(formData.media.photos.exterior),
          interior: await convertFilesToBase64(formData.media.photos.interior),
          floorPlan: await convertFilesToBase64(formData.media.photos.floorPlan),
          washrooms: await convertFilesToBase64(formData.media.photos.washrooms),
          lifts: await convertFilesToBase64(formData.media.photos.lifts),
          emergencyExits: await convertFilesToBase64(
            formData.media.photos.emergencyExits
          ),
          bedrooms: await convertFilesToBase64(formData.media.photos.bedrooms),
          halls: await convertFilesToBase64(formData.media.photos.halls),
          storerooms: await convertFilesToBase64(formData.media.photos.storerooms),
          kitchen: await convertFilesToBase64(formData.media.photos.kitchen)
        },
        videoTour: formData.media.videoTour
          ? formData.media.videoTour instanceof File
            ? await convertFileToBase64(formData.media.videoTour)
            : formData.media.videoTour
          : undefined,
        documents: await convertFilesToBase64(formData.media.documents)
      };

      const transformedData = {
        ...formData,
        media: convertedMedia,
        metadata: {
          createdBy: author,
          createdAt: new Date(),
          propertyType: "Residential",
          propertyName: "Shared Space",
          intent: "Rent",
          status: "active"
        }
      };

      const response = await axios.post(
        "/api/residential/rent/shared-space",
        transformedData,
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      if (response.data.success) {
        setPropertyId(response.data.propertyId);
        toast.success("Property listing created successfully!");
        setFormData(initialFormData);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to create shared space listing. Please try again.");
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
                    setTimeout(() => {
                      if (formRef.current) {
                        window.scrollTo({
                          top: formRef.current.offsetTop - 100,
                          behavior: "smooth"
                        });
                      } else {
                        window.scrollTo({
                          top: 0,
                          behavior: "smooth"
                        });
                      }
                    }, 100);
                  }}
                >
                  <div className="flex flex-col items-center group">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
                        index <= currentStep
                          ? "bg-black text-white"
                          : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                      }`}
                    >
                      {section.icon}
                    </div>
                    <span
                      className={`text-xs mt-1 font-medium transition-colors duration-200 ${
                        index <= currentStep
                          ? "text-black"
                          : "text-gray-500 group-hover:text-gray-700"
                      }`}
                    >
                      {section.title}
                    </span>
                  </div>
                  {index < formSections.length - 1 && (
                    <div className="flex items-center mx-1">
                      <div
                        className={`w-12 h-1 transition-colors duration-200 ${
                          index < currentStep ? "bg-black" : "bg-gray-200"
                        }`}
                      />
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
          <h1 className="text-2xl sm:text-3xl font-bold text-black">
            List Your Shared Space
          </h1>
        </div>
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-black mb-2">
            {formSections[currentStep].title}
          </h2>
          <p className="text-gray-600">Please fill in the details for your property</p>
        </div>

        {formSections[currentStep].component}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between">
          <button
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
                {currentStep === formSections.length - 1 ? "Submit" : "Next"}
                <ChevronRight className="w-5 h-5 ml-2" />
              </>
            )}
          </button>
        </div>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
          {error}
        </div>
      )}
      {success && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-600">
          {success}
        </div>
      )}
    </div>
  );
};

export default SharedSpace;