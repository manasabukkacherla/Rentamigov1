"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Store, Building2, DollarSign, Calendar, UserCircle, Image as ImageIcon, MapPin, ChevronLeft, ChevronRight, Loader2 } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import axios from "axios"
import PropertyName from "../PropertyName"
import PlotType from "../CommercialComponents/PlotType"
import CommercialPropertyAddress from "../CommercialComponents/CommercialPropertyAddress"
import Landmark from "../CommercialComponents/Landmark"
import CornerProperty from "../CommercialComponents/CornerProperty"
import PlotDetails from "../CommercialComponents/PlotDetails"
import CommercialPropertyDetails from "../CommercialComponents/CommercialPropertyDetails"
import LeaseAmount from "../lease/LeaseAmount"
import LeaseTenure from "../lease/LeaseTenure"
import MaintenanceAmount from "../residentialrent/MaintenanceAmount"
import OtherCharges from "../residentialrent/OtherCharges"
import Brokerage from "../residentialrent/Brokerage"
import CommercialAvailability from "../CommercialComponents/CommercialAvailability"
import CommercialContactDetails from "../CommercialComponents/CommercialContactDetails"
import MediaUploadforagriplot from "../Mediauploadforagriplot"
import MapLocation from "../CommercialComponents/MapLocation"
import SellPlotMain from "../commercialpropertytypes/SellPlotMain"

interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

interface Coordinates {
  latitude: string;
  longitude: string;
}

interface BasicInformation {
  title: string;
  plotType: string[];
  address: Address;
  landmark: string;
  coordinates: Coordinates;
  isCornerProperty: boolean;
}

interface Area {
  totalArea: number;
  carpetArea: number;
  builtUpArea: number;
}

interface Floor {
  floorNumber: number;
  totalFloors: number;
}

interface PropertyDetails {
  area: Area;
  floor: Floor;
  facingDirection?: string;
  furnishingStatus?: string;
  propertyAmenities?: string[];
  wholeSpaceAmenities?: string;
  waterAvailability?: string;
}

interface PlotDetails {
  totalPlotArea: number;
  zoningType: string;
  infrastructure: string[];
  roadAccess: string;
  securityRoom: boolean;
  previousConstruction: string;
}

interface LeaseDuration {
  duration: number;
  type: string;
  amountType: "fixed" | "negotiable";
}

interface Tenure {
  duration: number;
  type: string;
}

interface LeaseTenure {
  minimumTenure: Tenure;
  maximumTenure: Tenure;
  lockInPeriod: Tenure;
  noticePeriod: Tenure;
}

interface MaintenanceCharges {
  amount: number;
  frequency: "monthly" | "quarterly" | "half-yearly" | "yearly";
}

interface ChargeDetails {
  type: "inclusive" | "exclusive";
  amount?: number;
}

interface OtherCharges {
  electricityCharges: ChargeDetails;
  waterCharges: ChargeDetails;
  gasCharges: ChargeDetails;
  otherCharges: "inclusive" | "exclusive";
  amount?: number;
}

interface LeaseDetails {
  leaseAmount: number;
  leaseduration: LeaseDuration;
  leasetenure: LeaseTenure;
  maintenanceCharges: MaintenanceCharges;
  otherCharges: OtherCharges;
}

interface Brokerage {
  required: boolean;
  amount?: number;
}

interface Availability {
  availableFrom?: Date;
  availableImmediately?: boolean;
  availabilityStatus: string;
  leaseDuration?: string;
  noticePeriod?: string;
  isPetsAllowed?: boolean;
  operatingHours?: boolean;
}

interface ContactInformation {
  name: string;
  email: string;
  phone: string;
  alternatePhone?: string;
  bestTimeToContact?: string;
  preferredContactTime?: string;
}

interface Media {
  photos: {
    exterior: (File | string)[];
    interior: (File | string)[];
    floorPlan: (File | string)[];
    washroom: (File | string)[];
    lift: (File | string)[];
    emergencyExit: (File | string)[];
  };
  videoTour?: File | string | null;
  documents: (File | string)[];
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
  propertyId?: string;
  basicInformation: BasicInformation;
  propertyDetails: PropertyDetails;
  plotDetails: PlotDetails;
  leaseDetails: LeaseDetails;
  brokerage?: Brokerage;
  availability: Availability;
  contactInformation: ContactInformation;
  media: Media;
  metadata: IMetadata;
}

const convertFileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

const convertFilesToBase64 = async (files: (File | string)[]): Promise<string[]> => {
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

const globalStyles = `
  input::placeholder,
  textarea::placeholder {
    color: rgba(0, 0, 0, 0.6);
  }
  
  /* Make radio button and checkbox text black */
  input[type="radio"] + label,
  input[type="checkbox"] + label {
    color: black;
  }
  
  /* Make select placeholder text black */
  select {
    color: black;
  }
  
  /* Make all form labels black */
  label {
    color: black;
  }
  
  /* Make all input text black */
  input,
  textarea,
  select {
    color: black;
  }
`;

const SellPlot = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    basicInformation: {
      title: "",
      plotType: [],
      address: {
        street: "",
        city: "",
        state: "",
        zipCode: ""
      },
      landmark: "",
      coordinates: {
        latitude: "",
        longitude: ""
      },
      isCornerProperty: false,
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
      facingDirection: "",
      furnishingStatus: "",
      propertyAmenities: [],
      wholeSpaceAmenities: "",
      waterAvailability: "",
    },
    plotDetails: {
      totalPlotArea: 0,
      zoningType: "residential",
      infrastructure: [],
      roadAccess: "",
      securityRoom: false,
      previousConstruction: ""
    },
    leaseDetails: {
      leaseAmount: 0,
      leaseduration: {
        duration: 0,
        type: "month",
        amountType: "fixed"
      },
      leasetenure: {
        minimumTenure: {
          duration: 0,
          type: "month"
        },
        maximumTenure: {
          duration: 0,
          type: "month"
        },
        lockInPeriod: {
          duration: 0,
          type: "month"
        },
        noticePeriod: {
          duration: 0,
          type: "month"
        }
      },
      maintenanceCharges: {
        amount: 0,
        frequency: "monthly"
      },
      otherCharges: {
        electricityCharges: {
          type: "inclusive",
          amount: 0
        },
        waterCharges: {
          type: "inclusive",
          amount: 0
        },
        gasCharges: {
          type: "inclusive",
          amount: 0
        },
        otherCharges: "inclusive",
        amount: 0
      }
    },
    brokerage: {
      required: false,
      amount: 0
    },
    availability: {
      availableFrom: new Date(),
      availableImmediately: false,
      availabilityStatus: "later",
      leaseDuration: "",
      noticePeriod: "",
      isPetsAllowed: false,
      operatingHours: false,
    },
    contactInformation: {
      name: "",
      email: "",
      phone: "",
      alternatePhone: "",
      bestTimeToContact: "",
      preferredContactTime: ""
    },
    media: {
      photos: {
        exterior: [],
        interior: [],
        floorPlan: [],
        washroom: [],
        lift: [],
        emergencyExit: []
      },
      videoTour: null,
      documents: []
    },
    metadata: {
      createdBy:"",
      createdAt: new Date(),
      propertyType: "Residential",
      propertyName: "Plot",
      intent: "Sale",
      status: "active"
    }
  });

  const [currentStep, setCurrentStep] = useState(0);
  const formRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [propertyId, setPropertyId] = useState<string | undefined>(undefined);

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
      content: (
        <div className="space-y-6">
          <PropertyName
            propertyName={formData.basicInformation.title}
            onPropertyNameChange={(name) => handleChange('basicInformation.title', name)}
          />
          <PlotType onPlotTypeChange={(type) => handleChange('basicInformation.plotType', type)} />
          <CommercialPropertyAddress address={formData.basicInformation.address}  onAddressChange={(address) => handleChange('basicInformation.address', address)} />
          <MapLocation 
            latitude={formData.basicInformation.coordinates.latitude}
            longitude={formData.basicInformation.coordinates.longitude}
            landmark={formData.basicInformation.landmark}
            onLocationChange={(location) => handleChange('basicInformation.coordinates', location)}
            onAddressChange={(address) => handleChange('basicInformation.address', address)}
          />
          <CornerProperty
            isCornerProperty={formData.basicInformation.isCornerProperty}
            onCornerPropertyChange={(isCorner) => handleChange('basicInformation.isCornerProperty', isCorner)}
          />
        </div>
      ),
    },
    {
      title: "Property Details",
      icon: <Building2 className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <PlotDetails onDetailsChange={(details) => {
            // Make sure totalArea is properly set
            const updatedArea = {
              totalArea: details.totalArea || details.totalPlotArea || 0,
              carpetArea: details.carpetArea || 0,
              builtUpArea: details.builtUpArea || 0
            };

            // Update propertyDetails with area information
            handleChange('propertyDetails', {
              ...formData.propertyDetails,
              area: updatedArea,
            });

            // Update plotDetails with plot-specific information
            handleChange('plotDetails', {
              ...formData.plotDetails,
              totalPlotArea: details.totalPlotArea || details.totalArea || 0,
              infrastructure: details.infrastructure || [],
              roadAccess: details.roadAccess || "",
              securityRoom: details.securityRoom || false,
              previousConstruction: details.previousConstruction || ""
            });
          }} />

          {/* Zoning Type - Required field */}
          <div className="bg-gray-100 rounded-lg p-6 shadow-sm border border-gray-200 mt-6">
            <h4 className="text-lg font-medium text-black mb-4">Zoning Information <span className="text-red-500">*</span></h4>
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-3">
                <label className="block text-md font-medium mb-2 text-black">Zoning Type</label>
                <select
                  value={formData.plotDetails.zoningType}
                  onChange={(e) => handleChange('plotDetails.zoningType', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white border-2 border-gray-300 focus:border-black outline-none transition-colors duration-200 text-black"
                  required
                >
                  <option value="" disabled className="text-black bg-white">Select Zoning Type</option>
                  <option value="commercial" className="text-black bg-white">Commercial</option>
                  <option value="residential" className="text-black bg-white">Residential</option>
                  <option value="industrial" className="text-black bg-white">Industrial</option>
                  <option value="mixed" className="text-black bg-white">Mixed Use</option>
                </select>
                {!formData.plotDetails.zoningType && (
                  <p className="text-red-500 text-sm">This field is required</p>
                )}
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Lease Terms",
      icon: <DollarSign className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <div className="space-y-4 text-black">
            <LeaseAmount
              onLeaseAmountChange={(amount) => handleChange('leaseDetails', {
                ...formData.leaseDetails,
                leaseAmount: amount.leaseAmount,
                leaseduration: {
                  ...formData.leaseDetails.leaseduration,
                  duration: amount.leaseTenure || 0,
                  type: amount.leaseTermType || 'month',
                  amountType: 'fixed'
                }
              })}
            />
            <LeaseTenure
              onLeaseTenureChange={(tenure) => handleChange('leaseDetails', {
                ...formData.leaseDetails,
                leasetenure: {
                  minimumTenure: {
                    duration: tenure.minimumTenure.duration || 0,
                    type: tenure.minimumTenure.durationType || 'month'
                  },
                  maximumTenure: {
                    duration: tenure.maximumTenure.duration || 0,
                    type: tenure.maximumTenure.durationType || 'month'
                  },
                  lockInPeriod: {
                    duration: tenure.lockInPeriod.duration || 0,
                    type: tenure.lockInPeriod.durationType || 'month'
                  },
                  noticePeriod: {
                    duration: tenure.noticePeriod.duration || 1,
                    type: tenure.noticePeriod.durationType || 'month'
                  }
                }
              })}
            />
          </div>
        </div>
      ),
    },
    {
      title: "Availability",
      icon: <Calendar className="w-5 h-5" />,
      content: (
        <CommercialAvailability onAvailabilityChange={(availability) => handleChange('availability', availability)} />
      )
    },
    {
      title: "Contact Information",
      icon: <UserCircle className="w-5 h-5" />,
      content: (
        <CommercialContactDetails 
            contactInformation={formData.contactInformation}
            onContactChange={(contact) => handleChange('contactInformation', contact)}
          />
      ),
    },
    {
      title: "Property Media",
      icon: <ImageIcon className="w-6 h-6" />,
      component: (
        <div className="space-y-8">
          <MediaUploadforagriplot
            onMediaChange={(media: {
              images: { category: string; files: { url: string; file: File }[] }[];
              video?: { url: string; file: File };
              documents: { type: string; file: File }[];
            }) => {
              // Convert the media format to match our FormData interface
              const convertedMedia: Media = {
                photos: {
                  exterior: media.images.find(img => img.category === 'exterior')?.files.map(f => f.file) || [],
                  interior: media.images.find(img => img.category === 'interior')?.files.map(f => f.file) || [],
                  floorPlan: media.images.find(img => img.category === 'floorPlan')?.files.map(f => f.file) || [],
                  washroom: media.images.find(img => img.category === 'washroom')?.files.map(f => f.file) || [],
                  lift: media.images.find(img => img.category === 'lift')?.files.map(f => f.file) || [],
                  emergencyExit: media.images.find(img => img.category === 'emergencyExit')?.files.map(f => f.file) || []
                },
                videoTour: media.video?.file || null,
                documents: media.documents.map(d => d.file)
              };
              setFormData(prev => ({ ...prev, media: convertedMedia }));
            }}
          />
        </div>
      )
    },
  ];

  // Navigation handlers
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

  const validateFormData = () => {
    const errors = [];

    // Check basic information
    if (!formData.basicInformation.title) errors.push("Property name");
    if (!formData.basicInformation.plotType || formData.basicInformation.plotType.length === 0) errors.push("Plot type");
    if (!formData.basicInformation.landmark) errors.push("Landmark");

    // Check address
    const address = formData.basicInformation.address;
    if (!address.street) errors.push("Street address");
    if (!address.city) errors.push("City");
    if (!address.state) errors.push("State");
    if (!address.zipCode) errors.push("Zip code");

    // Check property details
    if (formData.propertyDetails.area.totalArea <= 0) errors.push("Total area");
    if (formData.propertyDetails.area.carpetArea <= 0) errors.push("Carpet area");
    if (formData.propertyDetails.area.builtUpArea <= 0) errors.push("Built-up area");

    // Check plot details
    if (!formData.plotDetails.zoningType) errors.push("Zoning type");
    if (!formData.plotDetails.roadAccess) errors.push("Road access");
    if (!formData.plotDetails.previousConstruction) errors.push("Previous construction");

    // Check lease details
    if (formData.leaseDetails.leaseAmount <= 0) errors.push("Lease amount");

    // Check contact information
    if (!formData.contactInformation.name) errors.push("Contact name");
    if (!formData.contactInformation.email) errors.push("Contact email");
    if (!formData.contactInformation.phone) errors.push("Contact phone");
    if (!formData.metadata?.createdBy) errors.push("Created by");

    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log("Form submission started...");

    // Run validation summary first
    // if (!showValidationSummary()) {
    //   return; // Stop if validation fails
    // }

    console.log("Form data being submitted:", formData);

    try {
      const user = sessionStorage.getItem('user');
      if (!user) {
        console.log("User not authenticated, redirecting to login");
        toast.error('You must be logged in to list a property.');
        return;
      }// Validate required fields before submission
      // if (
      //   !formData.basicInformation.landmark ||
      //   !formData.propertyDetails.area.carpetArea ||
      //   !formData.propertyDetails.area.builtUpArea
      // ) {
      //   toast.error("Please fill in all required fields: Landmark, Carpet area, Built-up area");
      //   return;
      // }

      const author = JSON.parse(user).id;
      console.log("User authenticated, ID:", author);

      // Ensure coordinates are valid numbers for the backend
      const safeCoordinates = {
        latitude: typeof formData.basicInformation.coordinates.latitude === 'string'
          ? parseFloat(formData.basicInformation.coordinates.latitude) || 0
          : formData.basicInformation.coordinates.latitude || 0,
        longitude: typeof formData.basicInformation.coordinates.longitude === 'string'
          ? parseFloat(formData.basicInformation.coordinates.longitude) || 0
          : formData.basicInformation.coordinates.longitude || 0
      };

      // Generate a unique propertyId if not already set
      const propertyId = formData.propertyId || `CLPLOT-${Date.now().toString().slice(-8)}`;
      console.log("Generated or existing propertyId:", propertyId);

      // Update form data with safe coordinates and ensure required fields
      const updatedFormData = {
        propertyId,
        basicInformation: {
          title: formData.basicInformation.title,
          plotType: formData.basicInformation.plotType,
          address: formData.basicInformation.address,
          landmark: formData.basicInformation.landmark,
          coordinates: safeCoordinates,
          isCornerProperty: formData.basicInformation.isCornerProperty
        },
        propertyDetails: {
          area: {
            totalArea: formData.propertyDetails.area.totalArea || 0,
            carpetArea: formData.propertyDetails.area.carpetArea || 0,
            builtUpArea: formData.propertyDetails.area.builtUpArea || 0
          },
          floor: {
            floorNumber: formData.propertyDetails.floor.floorNumber || 0,
            totalFloors: formData.propertyDetails.floor.totalFloors || 0
          },
          facingDirection: formData.propertyDetails.facingDirection || "",
          furnishingStatus: formData.propertyDetails.furnishingStatus || "",
          propertyAmenities: formData.propertyDetails.propertyAmenities || [],
          wholeSpaceAmenities: formData.propertyDetails.wholeSpaceAmenities || ""
        },
        plotDetails: {
          totalPlotArea: formData.plotDetails.totalPlotArea || 0,
          zoningType: formData.plotDetails.zoningType || "residential",
          infrastructure: formData.plotDetails.infrastructure || [],
          roadAccess: formData.plotDetails.roadAccess || "",
          securityRoom: formData.plotDetails.securityRoom || false,
          previousConstruction: formData.plotDetails.previousConstruction || ""
        },
        leaseDetails: {
          leaseAmount: formData.leaseDetails.leaseAmount || 0,
          leaseduration: {
            duration: formData.leaseDetails.leaseduration.duration || 0,
            type: formData.leaseDetails.leaseduration.type || "month",
            amountType: formData.leaseDetails.leaseduration.amountType || "fixed"
          },
          leasetenure: {
            minimumTenure: {
              duration: formData.leaseDetails.leasetenure.minimumTenure.duration || 0,
              type: formData.leaseDetails.leasetenure.minimumTenure.type || "month"
            },
            maximumTenure: {
              duration: formData.leaseDetails.leasetenure.maximumTenure.duration || 0,
              type: formData.leaseDetails.leasetenure.maximumTenure.type || "month"
            },
            lockInPeriod: {
              duration: formData.leaseDetails.leasetenure.lockInPeriod.duration || 0,
              type: formData.leaseDetails.leasetenure.lockInPeriod.type || "month"
            },
            noticePeriod: {
              duration: formData.leaseDetails.leasetenure.noticePeriod.duration || 0,
              type: formData.leaseDetails.leasetenure.noticePeriod.type || "month"
            }
          },
          maintenanceCharges: {
            amount: formData.leaseDetails.maintenanceCharges.amount || 0,
            frequency: formData.leaseDetails.maintenanceCharges.frequency || "monthly"
          },
          otherCharges: {
            electricityCharges: {
              type: formData.leaseDetails.otherCharges.electricityCharges.type || "inclusive",
              amount: formData.leaseDetails.otherCharges.electricityCharges.amount || 0
            },
            waterCharges: {
              type: formData.leaseDetails.otherCharges.waterCharges.type || "inclusive",
              amount: formData.leaseDetails.otherCharges.waterCharges.amount || 0
            },
            gasCharges: {
              type: formData.leaseDetails.otherCharges.gasCharges.type || "inclusive",
              amount: formData.leaseDetails.otherCharges.gasCharges.amount || 0
            },
            otherCharges: formData.leaseDetails.otherCharges.otherCharges || "inclusive",
            amount: formData.leaseDetails.otherCharges.amount || 0
          }
        },
        brokerage: formData.brokerage ? {
          required: formData.brokerage.required || false,
          amount: formData.brokerage.amount || 0
        } : undefined,
        availability: {
          availableFrom: formData.availability.availableFrom,
          availableImmediately: formData.availability.availableImmediately || false,
          availabilityStatus: formData.availability.availabilityStatus || (formData.availability.availableImmediately ? 'immediate' : 'later'),
          leaseDuration: formData.availability.leaseDuration || "",
          noticePeriod: formData.availability.noticePeriod || "",
          isPetsAllowed: formData.availability.isPetsAllowed || false,
          operatingHours: formData.availability.operatingHours || false,
        },
        contactInformation: {
          name: formData.contactInformation.name || "",
          email: formData.contactInformation.email || "",
          phone: formData.contactInformation.phone || "",
          alternatePhone: formData.contactInformation.alternatePhone || "",
          preferredContactTime: formData.contactInformation.preferredContactTime || "",
          bestTimeToContact: formData.contactInformation.bestTimeToContact || ""
        },
        metadata: {
          createdBy: "",
          createdAt: new Date(),
          propertyType: "Residential",
          propertyName: "Plot",
          intent: "Sale",
          status: "active"
        }
      };

      console.log("Property Name being submitted:", updatedFormData.basicInformation.title);
      console.log("Full structure of updatedFormData:", JSON.stringify(updatedFormData, null, 2));

      // Convert all media files to base64
      const convertedMedia = {
        photos: {
          exterior: await Promise.all(formData.media.photos.exterior.map(async file => {
            if (file instanceof File) {
              return await convertFileToBase64(file);
            }
            return file;
          })),
          interior: await Promise.all(formData.media.photos.interior.map(async file => {
            if (file instanceof File) {
              return await convertFileToBase64(file);
            }
            return file;
          })),
          floorPlan: await Promise.all(formData.media.photos.floorPlan.map(async file => {
            if (file instanceof File) {
              return await convertFileToBase64(file);
            }
            return file;
          })),
          washroom: await Promise.all(formData.media.photos.washroom.map(async file => {
            if (file instanceof File) {
              return await convertFileToBase64(file);
            }
            return file;
          })),
          lift: await Promise.all(formData.media.photos.lift.map(async file => {
            if (file instanceof File) {
              return await convertFileToBase64(file);
            }
            return file;
          })),
          emergencyExit: await Promise.all(formData.media.photos.emergencyExit.map(async file => {
            if (file instanceof File) {
              return await convertFileToBase64(file);
            }
            return file;
          })),
        },
        videoTour: formData.media.videoTour
          ? formData.media.videoTour instanceof File
            ? await convertFileToBase64(formData.media.videoTour)
            : formData.media.videoTour
          : null,
        documents: await Promise.all(formData.media.documents.map(async file => {
          if (file instanceof File) {
            return await convertFileToBase64(file);
          }
          return file;
        }))
      };

      const transformedData = {
        ...updatedFormData,
        media: convertedMedia,
        metadata: {
          createdBy: author || "", // Pass the correct field for backend validation
          createdAt: new Date(),
          propertyType: "Residential",
          propertyName: "Plot",
          intent: "Sale",
          status: "active"
        }
      };

      console.log("Submitting data:", transformedData);

      const response = await axios.post('/api/residential/sale/plots', transformedData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log("Response from server:", response.data);

      if (response.data.success) {
          // Set the propertyId from the response
          setPropertyId(response.data.propertyId);
          toast.success('Property listing created successfully!');
          setFormData({...formData} as FormData);
        } else {
        console.error("Server returned success:false", response.data);
        toast.error(response.data.message || 'Failed to create listing. Please try again.');
      }
    } catch (error: any) {
      console.error('Error submitting form:', error);

      if (error.response) {
        console.error('Server response error:', error.response.data);
        console.error('Status code:', error.response.status);
        console.error('Headers:', error.response.headers);

        // Try to provide a more helpful error message
        let errorMessage = 'Failed to create plot lease listing. Please try again.';
        if (error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
        } else if (error.response.data && error.response.data.error) {
          errorMessage = error.response.data.error;
        } else if (typeof error.response.data === 'string') {
          errorMessage = error.response.data;
        }

        toast.error(errorMessage);
      } else if (error.request) {
        console.error('No response received:', error.request);
        toast.error('No response from server. Please check your connection.');
      } else {
        console.error('Error details:', error.message);
        toast.error('Failed to create commercial plot lease listing. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div ref={formRef} className="min-h-screen bg-white">
      <style>{globalStyles}</style>

      {/* Progress Bar */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex justify-center">
            <div className="flex items-center space-x-2">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="flex items-center cursor-pointer"
                  onClick={() => setCurrentStep(index)}
                >
                  <div className="flex flex-col items-center group">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${index <= currentStep
                      ? 'bg-black text-white'
                      : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                      }`}>
                      {step.icon}
                    </div>
                    <span className={`text-xs mt-1 font-medium transition-colors duration-200 ${index <= currentStep
                      ? 'text-black'
                      : 'text-gray-500 group-hover:text-gray-700'
                      }`}>
                      {step.title}
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

      {/* Form Content */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-black">residential Plot</h1>
        </div>
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-black mb-2">{steps[currentStep].title}</h2>
          <p className="text-gray-600">Please fill in the details for your property</p>
        </div>

        {steps[currentStep].content}
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

export default SellPlot;
