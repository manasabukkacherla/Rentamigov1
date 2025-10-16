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
import { useParams } from 'react-router-dom';
interface FormData {
  propertyId?: string;
  basicInformation: {
    title: string;
    plotType: string[];
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
  plotDetails: {
    totalPlotArea: number;
    zoningType: string;
    boundaryWall?: boolean;
    waterSewer?: boolean;
    electricity?: boolean;
    roadAccess: string;
    securityRoom: boolean;
    previousConstruction: string;
  };

  leaseTerms: {
    leaseAmount: {
      amount: number;
      duration: number;
      durationType: string;
      amountType: "fixed" | "negotiable";
    };
    leaseTenure: {
      minimumTenure: string,
      minimumUnit: string,
      maximumTenure: string,
      maximumUnit: string,
      lockInPeriod: string,
      lockInUnit: string,
      noticePeriod: string,
      noticePeriodUnit: string,
    };
  }
  availability: {
    availableFrom?: Date;
    availableImmediately?: boolean;
    availabilityStatus: string;
    leaseDuration?: string;
    noticePeriod?: string;
    isPetsAllowed?: boolean;
    operatingHours?: boolean;
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
      
    };
    videoTour?: File | null;
    documents: File[];
  };
  metadata?: {
    createdBy: string;
    createdAt: Date;
    propertyType: string;
    propertyName: string;
    intent: string;
    status: string;
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

const LeasePlotMain = () => {
  const navigate = useNavigate();
  const { propertyId } = useParams();

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
       location: {
        latitude: "",
        longitude: ""
      },
      isCornerProperty: false,
    },
    plotDetails: {
      totalPlotArea: 0,
      zoningType: "commercial",
      boundaryWall: false,
      waterSewer: false,
      electricity: false,
      roadAccess: "",
      securityRoom: false,
      previousConstruction: ""
      
    },

  leaseTerms: {
      leaseAmount: {
        amount: 0,
        duration: 0,
        durationType: "month",
        amountType: "fixed"
      },
      leaseTenure: {
        minimumTenure: "",
        minimumUnit: "",
        maximumTenure: "",
        maximumUnit: "",
        lockInPeriod: "",
        lockInUnit: "",
        noticePeriod: "",
        noticePeriodUnit: "",
      },
      
      
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
      bestTimeToContact: ""
    },
    media: {
      photos: {
        exterior: [],
        
      },
      videoTour: null,
      documents: []
    }
  });
useEffect(() => {
  const fetchLeasePlotById = async () => {
    try {
      const response = await axios.get(`/api/commercial/lease/plots/${propertyId}`);
      const data = response.data;

      if (data && data.success) {
        const plot = data.data;

        setFormData(prev => ({
          ...prev,
          propertyId: plot.propertyId,
          basicInformation: {
            ...plot.basicInformation,
          },
          plotDetails: {
            ...plot.plotDetails,
          },
          leaseTerms: {
            ...plot.leaseTerms,
          },
          availability: {
            ...plot.availability,
          },
          contactInformation: {
            ...plot.contactInformation,
          },
          media: {
            photos: {
              exterior: [], // Optionally preload image URLs here
            },
            documents: [],
            videoTour: null,
          },
        }));
      } else {
        toast.error("Unable to load property data.");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("Error fetching property.");
    }
  };

  if (propertyId) {
    fetchLeasePlotById();
  }
}, [propertyId]);

  const [currentStep, setCurrentStep] = useState(0);
  const formRef = useRef<HTMLDivElement>(null);
  

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
          <PlotType onPlotTypeChange={(Type) => handleChange('basicInformation.plotType', Type)} />
          <CommercialPropertyAddress onAddressChange={(address) => handleChange('basicInformation.address', address)} address={formData.basicInformation.address}
            
          />
          <MapLocation
            latitude={formData.basicInformation.location.latitude}
            longitude={formData.basicInformation.location.longitude}
            landmark={formData.basicInformation.landmark}
            onLocationChange={(location) => handleChange('basicInformation.location', location)}
            onAddressChange={(address) => handleChange('basicInformation.address', address)}
            onLandmarkChange={(landmark) => handleChange('basicInformation.landmark', landmark)}
            />

          <CornerProperty
            onCornerPropertyChange={(isCorner) => handleChange('basicInformation.isCornerProperty', isCorner)} isCornerProperty={false}          />
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

            // Update plotDetails with area information
            handleChange('plotDetails', {
              ...formData.plotDetails,
              area: updatedArea,
            });

            // Update plotDetails with plot-specific information
            handleChange('plotDetails', {
              ...formData.plotDetails,
              totalPlotArea: details.totalPlotArea || details.totalArea || 0,
              boundaryWall: details.boundaryWall || false,
              waterSewer: details.waterSewer || false,
              electricity: details.electricity || false,
              roadAccess: details.roadAccess || "",
              securityRoom: details.securityRoom || false,
              previousConstruction: details.previousConstruction || "",
              zoningType: details.zoningType || "commercial"
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

          {/* <CommercialPropertyDetails
            onDetailsChange={(details) => handleChange('propertyDetails', details)}
          /> */}
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
              onLeaseAmountChange={(amount) => handleChange('leaseTerms', {
                ...formData.leaseTerms,
                leaseAmount: amount
              })}
            />
            <LeaseTenure
              onLeaseTenureChange={(tenure) => handleChange('leaseTerms', {
                ...formData.leaseTerms,
                leaseTenure: tenure
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
          onContactChange={(contact) => handleChange('contactInformation', contact)} contactInformation={{
            name: "",
            phone: "",
            email: "",
            alternatePhone: "",
            bestTimeToContact: ""
          }}          />
      ),
    },
    {
      title: "Property Media",
      icon: <ImageIcon className="w-5 h-5" />,
      content: (
        <MediaUploadforagriplot
            onMediaChange={(mediaUpdate) => {
              const convertedPhotos: any = {};

              mediaUpdate.images.forEach(({ category, files }) => {
                convertedPhotos[category] = files.map(f => f.file);
              });

              handleChange('media', {
                photos: {
                  ...formData.media.photos,
                  ...convertedPhotos
                },
                videoTour: mediaUpdate.video?.file || null,
                documents: mediaUpdate.documents.map(d => d.file)
              });
            }}
          />
      ),
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
    if (formData.plotDetails.totalPlotArea <= 0) errors.push("Total area");
    if (formData.plotDetails.zoningType) errors.push("Zoning type");
    if (formData.plotDetails.boundaryWall) errors.push("Boundary wall");
    if (formData.plotDetails.waterSewer) errors.push("Water sewer");
    if (formData.plotDetails.electricity) errors.push("Electricity");
    if (formData.plotDetails.roadAccess) errors.push("Road access");
    if (formData.plotDetails.securityRoom) errors.push("Security room");
    if (formData.plotDetails.previousConstruction) errors.push("Previous construction");

    // Check plot details
    if (!formData.plotDetails.zoningType) errors.push("Zoning type");
    if (!formData.plotDetails.roadAccess) errors.push("Road access");
    if (!formData.plotDetails.previousConstruction) errors.push("Previous construction");

    // Check lease details
    if (formData.leaseTerms.leaseAmount.amount <= 0) errors.push("Lease amount");

    // Check contact information
    if (!formData.contactInformation.name) errors.push("Contact name");
    if (!formData.contactInformation.email) errors.push("Contact email");
    if (!formData.contactInformation.phone) errors.push("Contact phone");

    return errors;
  };

  // Submit button will also show validation summary
  // const showValidationSummary = () => {
  //   const errors = validateFormData();
  //   // if (errors.length > 0) {
  //   //   console.warn("Form has missing required fields:", errors);
  //   //   toast.warn(`Please fill in all required fields: ${errors.join(", ")}`);
  //   //   return false;
  //   // }
  //   return true;
  // };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log("Form submission started...");

    // Basic validation
    if (!formData.basicInformation.title) {
      toast.error('Property name is required');
      setIsSubmitting(false);
      return;
    }

    if (!formData.basicInformation.address.street || !formData.basicInformation.address.city) {
      toast.error('Address details are required');
      setIsSubmitting(false);
      return;
    }

    if (!formData.plotDetails.totalPlotArea || formData.plotDetails.totalPlotArea <= 0) {
      toast.error('Total plot area is required and must be greater than 0');
      setIsSubmitting(false);
      return;
    }

    // if (!formData.leaseTerms.leaseAmount || formData.leaseTerms.leaseAmount <= 0) {
    //   toast.error('Lease amount is required and must be greater than 0');
    //   setIsSubmitting(false);
    //   return;
    // }

    if (!formData.contactInformation.name || !formData.contactInformation.phone) {
      toast.error('Contact information is required');
      setIsSubmitting(false);
      return;
    }

    try {
      const user = sessionStorage.getItem('user');
      if (!user) {
        console.log("User not authenticated, redirecting to login");
        toast.error('You must be logged in to list a property.');
        setIsSubmitting(false);
        return;
      }

      const author = JSON.parse(user).id;
      console.log("User authenticated, ID:", author);

      // Ensure coordinates are valid numbers for the backend
      const safelocation = {
        latitude: typeof formData.basicInformation.location.latitude === 'string'
          ? parseFloat(formData.basicInformation.location.latitude) || 0
          : formData.basicInformation.location.latitude || 0,
        longitude: typeof formData.basicInformation.location.longitude === 'string'
          ? parseFloat(formData.basicInformation.location.longitude) || 0
          : formData.basicInformation.location.longitude || 0
      };

      // Generate a unique propertyId if not already set

      // Update form data with safe coordinates and ensure required fields
      const updatedFormData = {
        basicInformation: {
          title: formData.basicInformation.title,
          plotType: formData.basicInformation.plotType,
          address: formData.basicInformation.address,
          landmark: formData.basicInformation.landmark,
          location:safelocation,
          isCornerProperty: formData.basicInformation.isCornerProperty
        },
        plotDetails: {
          totalPlotArea: formData.plotDetails.totalPlotArea || 0,
          zoningType: formData.plotDetails.zoningType || "commercial",
          boundaryWall: formData.plotDetails.boundaryWall || false,
          waterSewer: formData.plotDetails.waterSewer || false,
          electricity: formData.plotDetails.electricity || false,
          roadAccess: formData.plotDetails.roadAccess || "",
          securityRoom: formData.plotDetails.securityRoom || false,
          previousConstruction: formData.plotDetails.previousConstruction || ""
        },
        
        leaseTerms: {
          leaseAmount: {
            amount: formData.leaseTerms.leaseAmount.amount || 0,
            duration: formData.leaseTerms.leaseAmount.duration || 0,
            durationType: formData.leaseTerms.leaseAmount.durationType || "month",
            amountType: formData.leaseTerms.leaseAmount.amountType || "fixed"
          },
          leaseTenure: {
            minimumTenure: formData.leaseTerms.leaseTenure.minimumTenure ||"",
            minimumUnit: formData.leaseTerms.leaseTenure.minimumUnit || "",
            maximumTenure: formData.leaseTerms.leaseTenure.maximumTenure || "",
            maximumUnit: formData.leaseTerms.leaseTenure.maximumUnit || "",
            lockInPeriod: formData.leaseTerms.leaseTenure.lockInPeriod || "",
            lockInUnit: formData.leaseTerms.leaseTenure.lockInUnit || "",
            noticePeriod: formData.leaseTerms.leaseTenure.noticePeriod || "",
            noticePeriodUnit: formData.leaseTerms.leaseTenure.noticePeriodUnit || ""
          },
          
        },
        
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
          bestTimeToContact: formData.contactInformation.bestTimeToContact || ""
        }
      };

      console.log("Property Name being submitted:", updatedFormData.basicInformation.title);
      console.log("Full structure of updatedFormData:", JSON.stringify(updatedFormData, null, 2));

      // Convert all media files to base64
      const convertedMedia = {
        photos: {
          exterior: await Promise.all((formData.media?.photos?.exterior ?? []).map(convertFileToBase64)),
        },
        videoTour: formData.media?.videoTour ? await convertFileToBase64(formData.media.videoTour) : null,
        documents: await Promise.all((formData.media?.documents ?? []).map(convertFileToBase64))
      };

      const transformedData = {
        propertyId: formData.propertyId || `CLPLOT-${Date.now().toString().slice(-8)}`,
        basicInformation: {
          title: formData.basicInformation.title || "",
          plotType: formData.basicInformation.plotType || [],
          address: {
            street: formData.basicInformation.address.street || "",
            city: formData.basicInformation.address.city || "",
            state: formData.basicInformation.address.state || "",
            zipCode: formData.basicInformation.address.zipCode || ""
          },
          landmark: formData.basicInformation.landmark || "",
          location: {
            latitude: formData.basicInformation.location.latitude || "",
            longitude: formData.basicInformation.location.longitude || ""
          },
          isCornerProperty: formData.basicInformation.isCornerProperty || false
        },
        plotDetails: {
          totalPlotArea: formData.plotDetails.totalPlotArea || 0,
          zoningType: formData.plotDetails.zoningType || "commercial",
          boundaryWall: formData.plotDetails.boundaryWall || false,
          waterSewer: formData.plotDetails.waterSewer || false,
          electricity: formData.plotDetails.electricity || false,
          roadAccess: formData.plotDetails.roadAccess || "",
          securityRoom: formData.plotDetails.securityRoom || false,
          previousConstruction: formData.plotDetails.previousConstruction || ""
        },
        leaseTerms: {
          leaseAmount: {
            amount: formData.leaseTerms.leaseAmount.amount || 0,
            duration: formData.leaseTerms.leaseAmount.duration || 0,
            durationType: formData.leaseTerms.leaseAmount.durationType || "month",
            amountType: formData.leaseTerms.leaseAmount.amountType || "fixed"
          },
          leaseTenure: {
            minimumTenure: formData.leaseTerms.leaseTenure.minimumTenure || "",
            minimumUnit: formData.leaseTerms.leaseTenure.minimumUnit || "",
            maximumTenure: formData.leaseTerms.leaseTenure.maximumTenure || "",
            maximumUnit: formData.leaseTerms.leaseTenure.maximumUnit || "",
            lockInPeriod: formData.leaseTerms.leaseTenure.lockInPeriod || "",
            lockInUnit: formData.leaseTerms.leaseTenure.lockInUnit || "",
            noticePeriod: formData.leaseTerms.leaseTenure.noticePeriod || "",
            noticePeriodUnit: formData.leaseTerms.leaseTenure.noticePeriodUnit || ""
          }
        },
        availability: {
          availableFrom: formData.availability.availableFrom,
          availableImmediately: formData.availability.availableImmediately || false,
          availabilityStatus: formData.availability.availabilityStatus || (formData.availability.availableImmediately ? 'immediate' : 'later'),
          leaseDuration: formData.availability.leaseDuration || "",
          noticePeriod: formData.availability.noticePeriod || "",
          isPetsAllowed: formData.availability.isPetsAllowed || false,
          operatingHours: formData.availability.operatingHours || false
        },
        contactInformation: {
          name: formData.contactInformation.name || "",
          email: formData.contactInformation.email || "",
          phone: formData.contactInformation.phone || "",
          alternatePhone: formData.contactInformation.alternatePhone || "",
          bestTimeToContact: formData.contactInformation.bestTimeToContact || ""
        },
        media: convertedMedia,
        metadata: {
          createdBy: author,
          createdAt: new Date(),
          propertyType: 'Commercial',
          propertyName: 'Plot',
          intent: 'Lease',
          status: 'Available'
        }
      };

      console.log("Submitting data:", transformedData);

    const isEditMode = !!formData.propertyId;

const endpoint = isEditMode
  ? `/api/commercial/lease/plots/${formData.propertyId}`
  : '/api/commercial/lease/plots';

const method = isEditMode ? axios.put : axios.post;

const response = await method(endpoint, transformedData, {
  headers: {
    'Content-Type': 'application/json'
  }
});


      console.log("Response from server:", response.data);

      if (response.data.success) {
        toast.success('Commercial plot lease listing created successfully!');
        navigate('/updatepropertyform');
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
          <h1 className="text-2xl sm:text-3xl font-bold text-black">Lease Commercial Plot</h1>
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

export default LeasePlotMain;