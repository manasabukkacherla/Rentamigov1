"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Store, Building2, DollarSign, Calendar, UserCircle, Image as ImageIcon, ChevronLeft, ChevronRight, MapPin, Locate, Navigation, Loader2 } from "lucide-react"
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
//import CommercialPropertyDetails from "../CommercialComponents/CommercialPropertyDetails"
import Price from "../sell/Price"
import PricePerSqft from "../sell/PricePerSqft"
import RegistrationCharges from "../sell/RegistrationCharges"
import Brokerage from "../residentialrent/Brokerage"
import CommercialAvailability from "../CommercialComponents/CommercialAvailability"
import CommercialContactDetails from "../CommercialComponents/CommercialContactDetails"
import MediaUploadforagriplot from "../Mediauploadforagriplot"
import MapLocation from "../CommercialComponents/MapLocation"

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
    zoningType: string; 
    infrastructure: string[];
    security: string[];
    previousConstruction: string;
    roadAccess: string;
    zoninginformation: string;
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
    amount?: number;
  };
  availability: {
    availableFrom: Date;
    availableImmediately: boolean;
    leaseDuration: string;
    noticePeriod: string;
    petsAllowed: boolean;
    operatingHours: boolean;
    bookingAmount: number;
     
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
  const formRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState<FormData>({
    basicInformation: {
      title: "",
      type: [],
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
      infrastructure: [],
      security: [],
      previousConstruction: "",
      roadAccess: "",
      zoninginformation: "",
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
      operatingHours: false,
      bookingAmount: 0
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

  // Function to update map location based on latitude and longitude
  const updateMapLocation = (lat: string, lng: string) => {
    const iframe = document.getElementById('map-iframe') as HTMLIFrameElement;
    if (iframe && lat && lng) {
      // Use higher zoom level (18) and more precise marker for better accuracy
      iframe.src = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d500!2d${lng}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s${lat},${lng}!5e0!3m2!1sen!2sin!4v1709667547372!5m2!1sen!2sin`;
    }
  };

  // Function to get current location
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude.toString();
          const lng = position.coords.longitude.toString();

          // Update form data
          handleChange('basicInformation.location', {
            latitude: lat,
            longitude: lng
          });

          // Update map
          updateMapLocation(lat, lng);

          // Attempt to reverse geocode for address
          reverseGeocode(lat, lng);
        },
        (error) => {
          console.error("Error getting location: ", error);
          toast.error("Unable to get your current location. Please check your browser permissions.");
        }
      );
    } else {
      toast.error("Geolocation is not supported by your browser.");
    }
  };

  // Reverse geocode to get address from coordinates
  const reverseGeocode = (lat: string, lng: string) => {
    const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`;

    fetch(geocodingUrl)
      .then(response => response.json())
      .then(data => {
        if (data.status === "OK" && data.results && data.results.length > 0) {
          const address = data.results[0];

          // Extract address components
          const addressComponents = {
            street: '',
            city: '',
            state: '',
            zipCode: ''
          };

          // Map address components to our format
          address.address_components.forEach((component: any) => {
            const types = component.types;

            if (types.includes('route')) {
              addressComponents.street = component.long_name;
            } else if (types.includes('locality')) {
              addressComponents.city = component.long_name;
            } else if (types.includes('administrative_area_level_1')) {
              addressComponents.state = component.long_name;
            } else if (types.includes('postal_code')) {
              addressComponents.zipCode = component.long_name;
            }
          });

          // Check if we have a street address, if not use formatted address
          if (!addressComponents.street && address.formatted_address) {
            const formattedParts = address.formatted_address.split(',');
            if (formattedParts.length > 0) {
              addressComponents.street = formattedParts[0];
            }
          }

          // Update address in form data
          handleChange('basicInformation.address', addressComponents);

          // Update landmark with nearby point of interest if available
          const landmark = data.results.find((result: any) =>
            result.types.some((type: string) =>
              ['point_of_interest', 'establishment', 'premise'].includes(type)
            )
          );

          if (landmark && landmark.name) {
            handleChange('basicInformation.landmark', landmark.name);
          }

          toast.success("Location details updated successfully");
        } else {
          console.error("Geocoding failed:", data.status);
        }
      })
      .catch(error => {
        console.error("Error during reverse geocoding:", error);
      });
  };

  // Function to open location picker in Google Maps
  const openLocationPicker = () => {
    const lat = formData.basicInformation.location.latitude || "20.5937";
    const lng = formData.basicInformation.location.longitude || "78.9629";
    window.open(`https://www.google.com/maps/@${lat},${lng},18z`, '_blank');
    toast.info("After selecting a location in Google Maps, please manually input the coordinates here.");
  };

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
          <CommercialPropertyAddress address={formData.basicInformation.address} onAddressChange={(address) => handleChange('basicInformation.address', address)} />

          {/* <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
            <div className="flex items-center mb-8">
              <MapPin className="text-black mr-3" size={28} />
              <h3 className="text-2xl font-semibold text-black">Map Location</h3>
            </div>
            <div className="bg-white p-6 rounded-lg space-y-6">
              <div>
                <h4 className="text-lg font-medium mb-4 text-black">Select Location on Map</h4>
                <p className="text-sm text-gray-500 mb-4">
                  Use the map below to set your property's location. Click on the map or search for an address.
                </p>
                <div className="aspect-video bg-gray-100 rounded-xl overflow-hidden relative mb-6">
                  <iframe
                    id="map-iframe"
                    src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d500!2d${formData.basicInformation.coordinates.longitude || '78.9629'}!3d${formData.basicInformation.coordinates.latitude || '20.5937'}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s${formData.basicInformation.coordinates.latitude || '20.5937'},${formData.basicInformation.coordinates.longitude || '78.9629'}!5e0!3m2!1sen!2sin!4v1709667547372!5m2!1sen!2sin`}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-xl"
                    title="Property Location Map"
                  ></iframe>

                  <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
                    <button
                      onClick={() => getCurrentLocation()}
                      className="bg-white p-2 rounded-lg shadow-md hover:bg-gray-100 transition-colors flex items-center gap-2"
                      aria-label="Get current location"
                      type="button"
                    >
                      <Locate className="w-5 h-5 text-blue-600" />
                      <span className="text-sm font-medium">My Location</span>
                    </button>

                    <button
                      onClick={() => openLocationPicker()}
                      className="bg-white p-2 rounded-lg shadow-md hover:bg-gray-100 transition-colors flex items-center gap-2"
                      aria-label="Select location"
                      type="button"
                    >
                      <Navigation className="w-5 h-5 text-blue-600" />
                      <span className="text-sm font-medium">Select Location</span>
                    </button>
                  </div>

                  <div className="absolute bottom-2 left-2 bg-white bg-opacity-75 px-2 py-1 rounded text-xs text-gray-600">
                    Powered by Google Maps
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-medium mb-4 text-black">Coordinates</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="latitude" className="block text-gray-800 font-medium mb-2">
                      Latitude
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="latitude"
                        value={formData.basicInformation.coordinates.latitude}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (!isNaN(Number(value)) || value === '-' || value === '') {
                            handleChange('basicInformation.coordinates', {
                              ...formData.basicInformation.coordinates,
                              latitude: value
                            });

                            // Update map when latitude changes
                            updateMapLocation(
                              value,
                              formData.basicInformation.coordinates.longitude || '78.9629'
                            );
                          }
                        }}
                        placeholder="Enter latitude (e.g., 17.683301)"
                        className="w-full px-4 py-3 rounded-lg bg-white border-2 border-gray-300 focus:border-black outline-none transition-colors duration-200 text-black placeholder:text-black/40"
                      />
                      <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="longitude" className="block text-gray-800 font-medium mb-2">
                      Longitude
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="longitude"
                        value={formData.basicInformation.coordinates.longitude}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (!isNaN(Number(value)) || value === '-' || value === '') {
                            handleChange('basicInformation.coordinates', {
                              ...formData.basicInformation.coordinates,
                              longitude: value
                            });

                            // Update map when longitude changes
                            updateMapLocation(
                              formData.basicInformation.coordinates.latitude || '20.5937',
                              value
                            );
                          }
                        }}
                        placeholder="Enter longitude (e.g., 83.019301)"
                        className="w-full px-4 py-3 rounded-lg bg-white border-2 border-gray-300 focus:border-black outline-none transition-colors duration-200 text-black placeholder:text-black/40"
                      />
                      <Navigation className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    </div>
                  </div>
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  Enter coordinates manually or use the map above to set the location.
                </p>
              </div>
            </div>
          </div> */}

          <MapLocation
            latitude={formData.basicInformation.location.latitude}
            longitude={formData.basicInformation.location.longitude}
            landmark={formData.basicInformation.landmark}
            onLocationChange={(location) => handleChange('basicInformation.location', location)}
            onAddressChange={(address) => handleChange('basicInformation.address', address)}
            onLandmarkChange={(landmark) => handleChange('basicInformation.landmark', landmark)}
          />

          {/* <Landmark
            onLandmarkChange={(landmark) => handleChange('basicInformation.landmark', landmark)}
            onLocationSelect={(location) => {
              handleChange('basicInformation.coordinates', location);
              // Update map when location changes from Landmark component
              updateMapLocation(location.latitude, location.longitude);
            }}
            latitude={formData.basicInformation.coordinates.latitude}
            longitude={formData.basicInformation.coordinates.longitude}
          /> */}
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
            const updatedDetails = {
              ...details,
              totalArea: details.totalArea || details.plotArea || 0
            };
            handleChange('plotDetails', updatedDetails);
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
      title: "Pricing Details",
      icon: <DollarSign className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <div className="space-y-6">
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
        </div>
      ),
    },
    {
      title: "Availability",
      icon: <Calendar className="w-5 h-5" />,
      content: (
        <CommercialAvailability onAvailabilityChange={(availability) => handleChange('availability', availability)} />
      ),
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
  ]

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

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true);
    console.log("Form submission started...")

    try {
      // Debug the location data to identify the IntersectionObserver issue
      console.log("Location data being submitted:", formData.basicInformation)

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
        latitude: typeof formData.basicInformation.location.latitude === 'string'
          ? formData.basicInformation.location.latitude
          : String(formData.basicInformation.location.latitude || ""),
        longitude: typeof formData.basicInformation.location.longitude === 'string'
          ? formData.basicInformation.location.longitude
          : String(formData.basicInformation.location.longitude || "")
      };

      // Also ensure that coordinates fallback to empty string if undefined
      if (!safeCoordinates.latitude) safeCoordinates.latitude = "";
      if (!safeCoordinates.longitude) safeCoordinates.longitude = "";

      // Defensive: Ensure location object always exists
      // if (!formData.basicInformation) {
      //   formData.basicInformation.latitude= "",
      //   formData.basicInformation.longitude= "",
  
      // }

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
          location: safeCoordinates
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
          userId: author, // Ensure userId is included for backend validation
          createdBy: author,
          createdAt: new Date(),
          propertyType: 'Commercial',
          propertyName: 'Plot',
          intent: 'Sell',
          status: 'Available',
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
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <style>{globalStyles}</style>

      {/* Progress Bar */}
      <div ref={formRef} className="sticky top-0 z-50 bg-white border-b border-gray-200">
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

      <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-black">Sell Commercial Plot</h1>
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
  )
}

export default SellPlotMain
