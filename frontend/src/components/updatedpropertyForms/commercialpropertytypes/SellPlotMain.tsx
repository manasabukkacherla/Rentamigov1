"use client"

import type React from "react"
import { useState, useRef , useEffect} from "react"
import { Store, Building2, DollarSign, Calendar, UserCircle, Image as ImageIcon, ChevronLeft, ChevronRight, MapPin, Locate, Navigation, Loader2 } from "lucide-react"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import { toast } from "react-toastify"
import PropertyName from "../PropertyName"
import PlotType from "../CommercialComponents/PlotType"
import CommercialPropertyAddress from "../CommercialComponents/CommercialPropertyAddress"
import Landmark from "../CommercialComponents/Landmark"
import MapCoordinates from "../MapCoordinates"
import CornerProperty from "../CommercialComponents/CornerProperty"
import PlotDetails from "../CommercialComponents/PlotDetails"
import Price from "../sell/Price"
import PricePerSqft from "../sell/PricePerSqft"
import RegistrationCharges from "../sell/RegistrationCharges"
import Brokerage from "../residentialrent/Brokerage"
import CommercialAvailability from "../CommercialComponents/CommercialAvailability"
import CommercialContactDetails from "../CommercialComponents/CommercialContactDetails"
import MediaUploadforagriplot from "../Mediauploadforagriplot"
import MapLocation from "../CommercialComponents/MapLocation"

interface MediaFile {
  file: File | null;
  url?: string;
}

interface FormData {
  propertyId?: string;
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
    type: string;
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
      exterior: MediaFile[];
      interior: MediaFile[];
      floorPlan: MediaFile[];
      landscape: MediaFile[];
      adjacent: MediaFile[];
      aerialView: MediaFile[];
    };
    videoTour: MediaFile | null;
    documents: MediaFile[];
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
  
  input[type="radio"] + label,
  input[type="checkbox"] + label {
    color: black;
  }
  
  select {
    color: black;
  }
  
  label {
    color: black;
  }
  
  input,
  textarea,
  select {
    color: black;
  }
`;

const SellPlotMain = () => {
  const navigate = useNavigate();
  const formRef = useRef<HTMLDivElement>(null);
  const param = useParams()
  const propertyId = param.propertyId
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

          handleChange('basicInformation.location', {
            latitude: lat,
            longitude: lng
          });

          updateMapLocation(lat, lng);
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

          const addressComponents = {
            street: '',
            city: '',
            state: '',
            zipCode: ''
          };

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

          if (!addressComponents.street && address.formatted_address) {
            const formattedParts = address.formatted_address.split(',');
            if (formattedParts.length > 0) {
              addressComponents.street = formattedParts[0];
            }
          }

          handleChange('basicInformation.address', addressComponents);

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

  useEffect(() => {
    // 1. Check Login Status
    const user = sessionStorage.getItem("user");
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }

    // 2. Fetch Property Data (Edit Mode)
    const fetchPropertyData = async () => {
      if (!propertyId) {
        setIsEditMode(false);
        return;
      }

      try {
        setIsLoading(true);
        setIsEditMode(true);

        const response = await axios.get(`/api/commercial/sell/plots/${propertyId}`);
        const data = response.data.data;

        const prepareExistingImages = (imageUrls: string[]): MediaFile[] => {
          return imageUrls.map((url) => ({
            file: null,
            url: url,
          }));
        };

        setFormData((prev) => ({
          ...prev,
          propertyId: data.propertyId,

          basicInformation: {
            title: data.basicInformation?.title || "",
            type: data.basicInformation?.type || [],
            address: data.basicInformation?.address || {
              street: "",
              city: "",
              state: "",
              zipCode: "",
            },
            landmark: data.basicInformation?.landmark || "",
            location: data.basicInformation?.location || {
              latitude: "",
              longitude: "",
            },
            isCornerProperty: data.basicInformation?.isCornerProperty || false,
          },

          plotDetails: {
            plotArea: data.plotDetails?.plotArea || 0,
            totalArea: data.plotDetails?.totalArea || 0,
            lengthOfPlot: data.plotDetails?.lengthOfPlot || 0,
            widthOfPlot: data.plotDetails?.widthOfPlot || 0,
            plotFacing: data.plotDetails?.plotFacing || "",
            roadWidth: data.plotDetails?.roadWidth || 0,
            boundaryWall: data.plotDetails?.boundaryWall || false,
            approvals: data.plotDetails?.approvals || [],
            landUseZoning: data.plotDetails?.landUseZoning || "",
            floorAreaRatio: data.plotDetails?.floorAreaRatio || 0,
            landmarkProximity: data.plotDetails?.landmarkProximity || [],
            infrastructure: data.plotDetails?.infrastructure || [],
            security: data.plotDetails?.security || [],
            previousConstruction: data.plotDetails?.previousConstruction || "",
            roadAccess: data.plotDetails?.roadAccess || "",
            zoninginformation: data.plotDetails?.zoninginformation || "",
            zoningType: data.plotDetails?.zoningType || "commercial",
          },

          propertyDetails: data.propertyDetails || prev.propertyDetails,

          pricingDetails: {
            propertyPrice: data.pricingDetails?.propertyPrice || 0,
            priceType: data.pricingDetails?.priceType || "fixed",
            area: data.pricingDetails?.area || 0,
            totalPrice: data.pricingDetails?.totalPrice || 0,
            pricePerSqft: data.pricingDetails?.pricePerSqft || 0,
          },

          registration: data.registration || prev.registration,
          brokerage: data.brokerage || prev.brokerage,
          availability: data.availability || prev.availability,
          contactInformation: data.contactInformation || prev.contactInformation,

          media: {
            photos: {
              exterior: prepareExistingImages(data.media?.photos?.exterior || []),
              interior: prepareExistingImages(data.media?.photos?.interior || []),
              floorPlan: prepareExistingImages(data.media?.photos?.floorPlan || []),
              landscape: prepareExistingImages(data.media?.photos?.landscape || []),
              adjacent: prepareExistingImages(data.media?.photos?.adjacent || []),
              aerialView: prepareExistingImages(data.media?.photos?.aerialView || []),
            },
            videoTour: data.media?.videoTour
              ? { file: null, url: data.media.videoTour }
              : null,
            documents: prepareExistingImages(data.media?.documents || []),
          },
        }));

      } catch (error) {
        console.error("Error fetching property:", error);
        toast.error("Failed to load property data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPropertyData();
  }, [propertyId]);

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

          <MapLocation
            latitude={formData.basicInformation.location.latitude}
            longitude={formData.basicInformation.location.longitude}
            landmark={formData.basicInformation.landmark}
            onLocationChange={(location) => handleChange('basicInformation.location', location)}
            onAddressChange={(address) => handleChange('basicInformation.address', address)}
            onLandmarkChange={(landmark) => handleChange('basicInformation.landmark', landmark)}
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
          existingMedia={formData.media}
          onMediaChange={(mediaUpdate) => {
            const convertedPhotos: any = {};

            mediaUpdate.images.forEach(({ category, files }) => {
              convertedPhotos[category] = files;
            });

            handleChange('media', {
              photos: {
                ...formData.media.photos,
                ...convertedPhotos
              },
              videoTour: mediaUpdate.video || null,
              documents: mediaUpdate.documents
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

  // Handle media conversion for submission
  const prepareMediaForSubmission = async (media: FormData['media']) => {
    const convertMediaFiles = async (mediaFiles: MediaFile[]): Promise<string[]> => {
      const results: string[] = [];
      
      for (const mediaFile of mediaFiles) {
        if (mediaFile.file) {
          // New file - convert to base64
          const base64 = await convertFileToBase64(mediaFile.file);
          results.push(base64);
        } else if (mediaFile.url) {
          // Existing file - keep URL as is
          results.push(mediaFile.url);
        }
      }
      
      return results;
    };

    return {
      photos: {
        exterior: await convertMediaFiles(media.photos.exterior),
        interior: await convertMediaFiles(media.photos.interior),
        floorPlan: await convertMediaFiles(media.photos.floorPlan),
        landscape: await convertMediaFiles(media.photos.landscape),
        adjacent: await convertMediaFiles(media.photos.adjacent),
        aerialView: await convertMediaFiles(media.photos.aerialView),
      },
      videoTour: media.videoTour?.file 
        ? await convertFileToBase64(media.videoTour.file)
        : media.videoTour?.url || null,
      documents: await convertMediaFiles(media.documents),
    };
  };

  // Create new property
  const handleCreate = async () => {
    try {
      const user = sessionStorage.getItem('user');
      if (!user) {
        toast.error('You must be logged in to list a property.');
        navigate('/login');
        return;
      }

      const author = JSON.parse(user).id;

      // Ensure required fields
      if (!formData.plotDetails.zoningType) {
        toast.error('Please select a zoning type for the plot');
        return;
      }

      const safeCoordinates = {
        latitude: typeof formData.basicInformation.location.latitude === 'string'
          ? formData.basicInformation.location.latitude
          : String(formData.basicInformation.location.latitude || ""),
        longitude: typeof formData.basicInformation.location.longitude === 'string'
          ? formData.basicInformation.location.longitude
          : String(formData.basicInformation.location.longitude || "")
      };

      if (!safeCoordinates.latitude) safeCoordinates.latitude = "";
      if (!safeCoordinates.longitude) safeCoordinates.longitude = "";

      const hasRegistrationType = formData.registration.type || formData.registration.chargesType;
      if (!hasRegistrationType) {
        toast.error('Please select a registration type');
        return;
      }

      if (!formData.plotDetails.totalArea && formData.plotDetails.plotArea) {
        formData.plotDetails.totalArea = formData.plotDetails.plotArea;
      } else if (!formData.plotDetails.totalArea && !formData.plotDetails.plotArea) {
        toast.error('Please enter the total area of the plot');
        return;
      }

      let registrationType = formData.registration.type || formData.registration.chargesType;
      if (registrationType === 'sale' || registrationType === 'rent' || registrationType === 'lease') {
        registrationType = 'inclusive';
      }
      if (registrationType !== 'inclusive' && registrationType !== 'exclusive') {
        registrationType = 'inclusive';
      }

      const updatedFormData = {
        ...formData,
        basicInformation: {
          ...formData.basicInformation,
          location: safeCoordinates
        },
        plotDetails: {
          ...formData.plotDetails,
          zoningType: formData.plotDetails.zoningType || "commercial",
          totalArea: formData.plotDetails.totalArea || formData.plotDetails.plotArea || 0
        },
        registration: {
          ...formData.registration,
          type: registrationType,
          chargesType: registrationType
        }
      };

      console.log("Converting media files to base64...");
      const convertedMedia = await prepareMediaForSubmission(formData.media);

      const transformedData = {
        ...updatedFormData,
        media: convertedMedia,
        metadata: {
          userId: author,
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
      handleSubmissionError(error);
    }
  };

  // Update existing property
  const handleUpdate = async () => {
    try {
      if (!propertyId) {
        toast.error('Property ID is missing');
        return;
      }

      const user = sessionStorage.getItem('user');
      if (!user) {
        toast.error('You must be logged in to update a property.');
        navigate('/login');
        return;
      }

      // Ensure required fields
      if (!formData.plotDetails.zoningType) {
        toast.error('Please select a zoning type for the plot');
        return;
      }

      const safeCoordinates = {
        latitude: typeof formData.basicInformation.location.latitude === 'string'
          ? formData.basicInformation.location.latitude
          : String(formData.basicInformation.location.latitude || ""),
        longitude: typeof formData.basicInformation.location.longitude === 'string'
          ? formData.basicInformation.location.longitude
          : String(formData.basicInformation.location.longitude || "")
      };

      if (!safeCoordinates.latitude) safeCoordinates.latitude = "";
      if (!safeCoordinates.longitude) safeCoordinates.longitude = "";

      const updatedFormData = {
        ...formData,
        basicInformation: {
          ...formData.basicInformation,
          location: safeCoordinates
        },
        plotDetails: {
          ...formData.plotDetails,
          zoningType: formData.plotDetails.zoningType || "commercial",
          totalArea: formData.plotDetails.totalArea || formData.plotDetails.plotArea || 0
        }
      };

      console.log("Converting media files for update...");
      const convertedMedia = await prepareMediaForSubmission(formData.media);

      const transformedData = {
        ...updatedFormData,
        media: convertedMedia,
        metadata: {
          updatedAt: new Date(),
        }
      };

      console.log("Updating data:", transformedData);

      const response = await axios.put(`/api/commercial/sell/plots/${propertyId}`, transformedData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log("Update response from server:", response.data);

      if (response.data.success) {
        toast.success('Commercial plot updated successfully!');
        navigate('/updatepropertyform');
      } else {
        console.error("Server returned success:false", response.data);
        toast.error(response.data.message || 'Failed to update listing. Please try again.');
      }
    } catch (error: any) {
      console.error('Error updating form:', error);
      handleSubmissionError(error);
    }
  };

  // Handle submission errors
  const handleSubmissionError = (error: any) => {
    if (error.response) {
      console.error('Server response error:', error.response.data);
      const errorData = error.response.data;

      if (errorData.errors) {
        console.error('Validation errors:', errorData.errors);
        const errorMessages: string[] = [];

        if (typeof errorData.errors === 'object') {
          Object.entries(errorData.errors).forEach(([field, details]: [string, any]) => {
            console.error(`Field ${field} error:`, details);
            const message = details.message || details.properties?.message || `${field} is invalid`;
            errorMessages.push(`${field}: ${message}`);
          });
        } else if (typeof errorData.message === 'string') {
          errorMessages.push(errorData.message);
        }

        const errorMessage = errorMessages.join('\n');
        toast.error(`Validation errors: ${errorMessage}`);
      } else {
        toast.error(errorData.message || 'Server error. Please try again.');
      }
    } else if (error.request) {
      console.error('No response received:', error.request);
      toast.error('No response from server. Please check your connection.');
    } else {
      console.error('Error details:', error.message);
      toast.error('Failed to process your request. Please try again.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true);
    console.log("Form submission started...")

    try {
      if (isEditMode && propertyId) {
        await handleUpdate();
      } else {
        await handleCreate();
      }
    } catch (error) {
      console.error('Unexpected error during submission:', error);
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin h-12 w-12 mx-auto text-black" />
          <p className="mt-4 text-black">Loading property data...</p>
        </div>
      </div>
    );
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
          <h1 className="text-2xl sm:text-3xl font-bold text-black">
            {isEditMode ? 'Edit Commercial Plot' : 'Sell Commercial Plot'}
          </h1>
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
                {isEditMode ? 'Updating...' : 'Submitting...'}
              </>
            ) : (
              <>
                {currentStep === steps.length - 1 ? (isEditMode ? 'Update' : 'Submit') : 'Next'}
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