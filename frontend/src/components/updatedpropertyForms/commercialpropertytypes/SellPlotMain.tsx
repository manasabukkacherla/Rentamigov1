"use client"

import type React from "react"
import { useState } from "react"
import { Store, Building2, DollarSign, Calendar, UserCircle, Image as ImageIcon, ChevronLeft, ChevronRight } from "lucide-react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { toast } from "react-toastify"
import PropertyName from "../PropertyName"
import PlotType from "../CommercialComponents/PlotType"
import CommercialPropertyAddress from "../CommercialComponents/CommercialPropertyAddress"
import Landmark from "../CommercialComponents/Landmark"
import MapCoordinates from "../MapCoordinates"
import CornerProperty from "../CommercialComponents/CornerProperty"
import PlotDetails from "../CommercialComponents/PlotDetails"
import CommercialPropertyDetails from "../CommercialComponents/CommercialPropertyDetails"
import Price from "../sell/Price"
import PricePerSqft from "../sell/PricePerSqft"
import RegistrationCharges from "../sell/RegistrationCharges"
import Brokerage from "../residentialrent/Brokerage"
import CommercialAvailability from "../CommercialComponents/CommercialAvailability"
import CommercialContactDetails from "../CommercialComponents/CommercialContactDetails"
import CommercialMediaUpload from "../CommercialComponents/CommercialMediaUpload"

interface FormData {
  basicInformation: {
    propertyName: string;
    plotType: string[];
    address: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
    };
    landmark: string;
    coordinates: {
      latitude: string;
      longitude: string;
    };
    isCornerProperty: boolean;
  };
  plotDetails: {
    plotArea: number;
    totalArea: number;
    lengthOfPlot: number;
    widthOfPlot: number;
    plotFacing: string;
    roadWidth: number;
    boundaryWall: boolean;
    approvals: string[];
    landUseZoning: string;
    floorAreaRatio: number;
    landmarkProximity: string[];
    zoningType: string; // Required by backend validation - must be set to avoid 400 errors
  };
  propertyDetails: {
    area: {
      totalArea: number;
      builtUpArea: number;
      carpetArea: number;
    };
    facingDirection: string;
    waterAvailability: string;
    ownershipType: string;
    propertyCondition: string;
  };
  pricingDetails: {
    propertyPrice: number;
    priceType: string;
    area: number;
    totalPrice: number;
    pricePerSqft: number;
  };
  registration: {
    chargesType: string;
    registrationAmount: number;
    stampDutyAmount: number;
    type: string; // Required by backend validation - must be set to avoid 400 errors
  };
  brokerage: {
    required: string;
    amount: number;
  };
  availability: {
    availableFrom: Date;
    availableImmediately: boolean;
    leaseDuration: string;
    noticePeriod: string;
    petsAllowed: boolean;
    operatingHours: {
      restricted: boolean;
      restrictions: string;
    };
  };
  contactInformation: {
    name: string;
    email: string;
    phone: string;
    alternatePhone: string;
    bestTimeToContact: string;
  };
  media: {
    photos: {
      exterior: File[];
      interior: File[];
      floorPlan: File[];
      landscape: File[];
      adjacent: File[];
      aerialView: File[];
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

const SellPlotMain = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    basicInformation: {
      propertyName: "",
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
    plotDetails: {
      plotArea: 0,
      totalArea: 0,
      lengthOfPlot: 0,
      widthOfPlot: 0,
      plotFacing: "",
      roadWidth: 0,
      boundaryWall: false,
      approvals: [],
      landUseZoning: "",
      floorAreaRatio: 0,
      landmarkProximity: [],
      zoningType: "commercial"
    },
    propertyDetails: {
      area: {
        totalArea: 0,
        builtUpArea: 0,
        carpetArea: 0
      },
      facingDirection: "",
      waterAvailability: "",
      ownershipType: "",
      propertyCondition: ""
    },
    pricingDetails: {
      propertyPrice: 0,
      priceType: "fixed",
      area: 0,
      totalPrice: 0,
      pricePerSqft: 0
    },
    registration: {
      chargesType: "inclusive",
      registrationAmount: 0,
      stampDutyAmount: 0,
      type: "inclusive"
    },
    brokerage: {
      required: "no",
      amount: 0
    },
    availability: {
      availableFrom: new Date(),
      availableImmediately: false,
      leaseDuration: "",
      noticePeriod: "",
      petsAllowed: false,
      operatingHours: {
        restricted: false,
        restrictions: ""
      }
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
        interior: [],
        floorPlan: [],
        landscape: [],
        adjacent: [],
        aerialView: []
      },
      videoTour: null,
      documents: []
    }
  });

  const [currentStep, setCurrentStep] = useState(0)

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
        <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <Store className="w-6 h-6 text-black" />
            <h3 className="text-xl font-semibold text-black">Property Details</h3>
          </div>
          <PropertyName
            propertyName={formData.basicInformation.propertyName}
            onPropertyNameChange={(name) => handleChange('basicInformation.propertyName', name)}
          />
          <PlotType onPlotTypeChange={(type) => handleChange('basicInformation.plotType', type)} />
          <CommercialPropertyAddress onAddressChange={(address) => handleChange('basicInformation.address', address)} />
          <Landmark
            onLandmarkChange={(landmark) => handleChange('basicInformation.landmark', landmark)}
            onLocationSelect={(location) => handleChange('basicInformation.coordinates', location)}
          />
          <CornerProperty
            onCornerPropertyChange={(isCorner) => handleChange('basicInformation.isCornerProperty', isCorner)}
          />
        </div>
      ),
    },
    {
      title: "Property Details",
      icon: <Building2 className="w-5 h-5" />,
      content: (
        <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <Building2 className="w-6 h-6 text-black" />
            <h3 className="text-xl font-semibold text-black">Property Details</h3>
          </div>
          <PlotDetails onDetailsChange={(details) => {
            // Make sure totalArea is properly set
            const updatedDetails = {
              ...details,
              totalArea: details.totalArea || details.plotArea || 0
            };
            handleChange('plotDetails', updatedDetails);
          }} />

          {/* Zoning Type - Required field */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 mt-6">
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

          <CommercialPropertyDetails
            onDetailsChange={(details) => handleChange('propertyDetails', details)}
          />
        </div>
      ),
    },
    {
      title: "Pricing Details",
      icon: <DollarSign className="w-5 h-5" />,
      content: (
        <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <DollarSign className="w-6 h-6 text-black" />
            <h3 className="text-xl font-semibold text-black">Pricing Details</h3>
          </div>
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h4 className="text-lg font-medium text-black mb-4">Price Information</h4>
              <div className="space-y-4 text-black">
                <div className="text-black">
                  <Price onPriceChange={(price) => handleChange('pricingDetails', {
                    ...formData.pricingDetails,
                    propertyPrice: price.propertyPrice,
                    priceType: price.pricetype
                  })} />
                </div>
                <div className="text-black">
                  <PricePerSqft
                    propertyPrice={formData.pricingDetails.propertyPrice}
                    Area={formData.propertyDetails.area}
                    onPricePerSqftChange={(data) => {
                      handleChange('pricingDetails', {
                        ...formData.pricingDetails,
                        area: data.area,
                        totalPrice: data.totalprice,
                        pricePerSqft: data.pricePerSqft
                      });
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h4 className="text-lg font-medium text-black mb-4">Additional Charges</h4>
              <div className="space-y-4 text-black">
                <div className="text-black">
                  <RegistrationCharges
                    onRegistrationChargesChange={(charges) => handleChange('registration', charges)}
                  />
                </div>

                {/* Registration Type - Required field */}
                <div className="border-t border-gray-200 my-4"></div>
                <div className="text-black">
                  <label className="block text-md font-medium mb-2 text-black">
                    Registration Type <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-1 gap-3">
                    <select
                      value={formData.registration.type}
                      onChange={(e) => {
                        // Set both type and chargesType for consistency
                        handleChange('registration', {
                          ...formData.registration,
                          type: e.target.value,
                          chargesType: e.target.value
                        });
                      }}
                      className="w-full px-4 py-3 rounded-lg bg-white border-2 border-gray-300 focus:border-black outline-none transition-colors duration-200 text-black"
                      required
                    >
                      <option value="" disabled className="text-black bg-white">Select Registration Type</option>
                      <option value="inclusive" className="text-black bg-white">Inclusive</option>
                      <option value="exclusive" className="text-black bg-white">Exclusive</option>
                    </select>
                    {!formData.registration.type && (
                      <p className="text-red-500 text-sm">This field is required</p>
                    )}
                  </div>
                </div>

                <div className="border-t border-gray-200 my-4"></div>
                <div className="text-black">
                  <Brokerage onBrokerageChange={(brokerage) => handleChange('brokerage', brokerage)} />
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
      content: (
        <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <Calendar className="w-6 h-6 text-black" />
            <h3 className="text-xl font-semibold text-black">Availability</h3>
          </div>
          <CommercialAvailability onAvailabilityChange={(availability) => handleChange('availability', availability)} />
        </div>
      ),
    },
    {
      title: "Contact Information",
      icon: <UserCircle className="w-5 h-5" />,
      content: (
        <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <UserCircle className="w-6 h-6 text-black" />
            <h3 className="text-xl font-semibold text-black">Contact Information</h3>
          </div>
          <CommercialContactDetails
            onContactChange={(contact) => handleChange('contactInformation', contact)}
          />
        </div>
      ),
    },
    {
      title: "Property Media",
      icon: <ImageIcon className="w-5 h-5" />,
      content: (
        <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <ImageIcon className="w-6 h-6 text-black" />
            <h3 className="text-xl font-semibold text-black">Property Media</h3>
          </div>
          <CommercialMediaUpload
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
        </div>
      ),
    },
  ]

  // Navigation handlers
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    console.log("Form submission started...")

    try {
      // Debug the location data to identify the IntersectionObserver issue
      console.log("Location data being submitted:", formData.basicInformation.coordinates)

      const user = sessionStorage.getItem('user');
      if (!user) {
        console.log("User not authenticated, redirecting to login")
        toast.error('You must be logged in to list a property.');
        navigate('/login');
        return;
      }

      const author = JSON.parse(user).id;
      console.log("User authenticated, ID:", author);

      // Ensure coordinates are valid strings to prevent Google Maps errors
      const safeCoordinates = {
        latitude: typeof formData.basicInformation.coordinates.latitude === 'string'
          ? formData.basicInformation.coordinates.latitude
          : String(formData.basicInformation.coordinates.latitude || ""),
        longitude: typeof formData.basicInformation.coordinates.longitude === 'string'
          ? formData.basicInformation.coordinates.longitude
          : String(formData.basicInformation.coordinates.longitude || "")
      };

      // Ensure required fields are present
      if (!formData.plotDetails.zoningType) {
        console.error("Missing required field: plotDetails.zoningType");
        toast.error('Please select a zoning type for the plot');
        return;
      }

      // Check for both possible registration type fields
      const hasRegistrationType = formData.registration.type || formData.registration.chargesType;
      if (!hasRegistrationType) {
        console.error("Missing required field: registration.type/chargesType");
        toast.error('Please select a registration type');
        return;
      }

      // Ensure plotDetails.totalArea is set (required by backend)
      if (!formData.plotDetails.totalArea && formData.plotDetails.plotArea) {
        console.log("Setting totalArea from plotArea");
        formData.plotDetails.totalArea = formData.plotDetails.plotArea;
      } else if (!formData.plotDetails.totalArea && !formData.plotDetails.plotArea) {
        console.error("Missing required field: plotDetails.totalArea/plotArea");
        toast.error('Please enter the total area of the plot');
        return;
      }

      // Map registration types correctly
      let registrationType = formData.registration.type || formData.registration.chargesType;
      // Ensure it's one of the accepted types for the backend
      if (registrationType === 'sale' || registrationType === 'rent' || registrationType === 'lease') {
        registrationType = 'inclusive'; // Map sale/rent/lease to inclusive
      }
      if (registrationType !== 'inclusive' && registrationType !== 'exclusive') {
        registrationType = 'inclusive'; // Default to inclusive if value is not recognized
      }

      // Update form data with safe coordinates and ensure required fields
      const updatedFormData = {
        ...formData,
        basicInformation: {
          ...formData.basicInformation,
          coordinates: safeCoordinates
        },
        plotDetails: {
          ...formData.plotDetails,
          zoningType: formData.plotDetails.zoningType || "commercial", // Ensure zoningType is set
          totalArea: formData.plotDetails.totalArea || formData.plotDetails.plotArea || 0 // Ensure totalArea is set
        },
        registration: {
          ...formData.registration,
          type: registrationType, // Use mapped registration type
          chargesType: registrationType // Set both fields to be safe
        }
      };

      console.log("Converting media files to base64...");
      console.log("Final form data to be submitted:", updatedFormData);

      // Convert all media files to base64
      const convertedMedia = {
        photos: {
          exterior: await Promise.all((formData.media?.photos?.exterior ?? []).map(convertFileToBase64)),
          interior: await Promise.all((formData.media?.photos?.interior ?? []).map(convertFileToBase64)),
          floorPlan: await Promise.all((formData.media?.photos?.floorPlan ?? []).map(convertFileToBase64)),
          landscape: await Promise.all((formData.media?.photos?.landscape ?? []).map(convertFileToBase64)),
          adjacent: await Promise.all((formData.media?.photos?.adjacent ?? []).map(convertFileToBase64)),
          aerialView: await Promise.all((formData.media?.photos?.aerialView ?? []).map(convertFileToBase64))
        },
        videoTour: formData.media?.videoTour ? await convertFileToBase64(formData.media.videoTour) : null,
        documents: await Promise.all((formData.media?.documents ?? []).map(convertFileToBase64))
      };

      const transformedData = {
        ...updatedFormData,
        media: convertedMedia,
        metadata: {
          createdBy: author,
          createdAt: new Date()
        }
      };

      console.log("Submitting data:", transformedData);

      const response = await axios.post('/api/commercial/sell/plots', transformedData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log("Response from server:", response.data);

      if (response.data.success) {
        toast.success('Commercial plot listing created successfully!');
        navigate('/updatepropertyform');
      } else {
        console.error("Server returned success:false", response.data);
        toast.error(response.data.message || 'Failed to create listing. Please try again.');
      }
    } catch (error: any) {
      console.error('Error submitting form:', error);

      if (error.response) {
        console.error('Server response error:', error.response.data);
        const errorData = error.response.data;

        // Check for validation errors
        if (errorData.errors) {
          console.error('Validation errors:', errorData.errors);

          // Extract detailed validation error messages
          const errorMessages: string[] = [];

          // MongoDB validation errors come in different formats
          if (typeof errorData.errors === 'object') {
            // Log each field error in detail
            Object.entries(errorData.errors).forEach(([field, details]: [string, any]) => {
              console.error(`Field ${field} error:`, details);
              const message = details.message || details.properties?.message || `${field} is invalid`;
              errorMessages.push(`${field}: ${message}`);
            });
          } else if (typeof errorData.message === 'string') {
            // Generic error message
            errorMessages.push(errorData.message);
          }

          // Display the error messages to the user
          const errorMessage = errorMessages.join('\n');
          toast.error(`Validation errors: ${errorMessage}`);

          // Log what we sent versus what was expected
          console.error("Validation failed. Check these fields in your request:", errorMessages);
        } else {
          toast.error(errorData.message || 'Server error. Please try again.');
        }
      } else if (error.request) {
        console.error('No response received:', error.request);
        toast.error('No response from server. Please check your connection.');
      } else {
        console.error('Error details:', error.message);
        toast.error('Failed to create commercial plot listing. Please try again.');
      }
    }
  }

  return (
    <div className="min-h-screen bg-white">
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

      {/* Form Content
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-black mb-2">Sell Commercial Plot</h2>
          <p className="text-gray-600">Please fill in the details for your property</p>
        </div> */}

      {/* <form onSubmit={handleSubmit} className="space-y-8">
          {steps[currentStep].content}

         
          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className={`flex items-center px-6 py-2.5 rounded-lg border transition-all duration-200 ${currentStep === 0
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "border-black/20 text-black hover:bg-black hover:text-white"
                }`}
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              Previous
            </button>

            {currentStep < steps.length - 1 ? (
              <button
                type="button"
                onClick={handleNext}
                className="flex items-center px-6 py-2.5 rounded-lg bg-black text-white hover:bg-gray-800 transition-all duration-200"
              >
                Next
                <ChevronRight className="w-5 h-5 ml-2" />
              </button>
            ) : (
              <button
                type="submit"
                className="flex items-center px-6 py-2.5 rounded-lg bg-black text-white hover:bg-gray-800 transition-all duration-200"
              >
                List Property
                <ChevronRight className="w-5 h-5 ml-2" />
              </button>
            )}
          </div>
        </form> */}
      <div className="max-w-5xl mx-auto px-4 py-8">
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
            className="flex items-center px-6 py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition-all duration-200"
          >
            {currentStep === steps.length - 1 ? 'Submit' : 'Next'}
            <ChevronRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default SellPlotMain

