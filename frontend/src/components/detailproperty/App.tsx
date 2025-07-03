import React, { useEffect, useState } from 'react';
import { ImageGallery } from './components/ImageGallery';
import { PropertyMedia, PropertyImage } from './types';
import { BasicInfo } from './components/BasicInfo';
import { AmenitiesTabs } from './components/AmenitiesTabs';
import { PricingCard } from './components/PricingCard';
import { LocationMap } from './components/LocationMap';
import { NearbyPlaces } from './components/NearbyPlaces';
import { SimilarProperties } from './components/SimilarProperties';
import { LatestInsights } from './components/LatestInsights';
import { Reviews } from './components/Reviews';
import { Footer } from './components/Footer';
import { propertyData } from './data';
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export interface Property {
  propertyId: string;
  basicInformation: {
    title: string;
    Type: string[];
    address: {
      city: string;
      state: string;
      country: string;
      pincode: string;
    };
    location: {
      latitude: string; longitude: string;
    };
    landmark: string,
    isCornerProperty: boolean;
  };
  shopDetails?: {
    frontageWidth: number;
    heightOfShop: number;
    displayWindow: boolean;
    attachedStorageRoom: boolean;
    averageFootTraffic: string;
    customerParking: boolean;
    previousBusiness: string;
  };
  retailStoreDetails?: {
    location: string,
    anchorStores: boolean,
    footfallData: string,
    signageAllowed: boolean,
    sharedWashrooms: boolean,
    fireExit: boolean
  };
  showroomDetails?: {
    totalSpace: number;
    frontageWidth: number;
    ceilingHeight: number;
    glassFrontage: boolean;
    lightingType: string;
    acInstalled: boolean;
    nearbyCompetitors: {
      present: boolean;
      brandNames: string;
    };
    displayRacks: boolean;
  };
  officeDetails?: {
    seatingCapacity: number;
    cabins: {
      available: boolean;
      count?: number;
    };
    conferenceRoom: boolean;
    meetingRoom: boolean;
    receptionArea: boolean;
    wifiSetup: boolean;
    serverRoom: boolean;
    coworkingFriendly: boolean;
  };
  warehouseDetails?: {
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
  },
  spaceDetails?: {
    totalArea: number;
    areaUnit: string;
    coveredArea: number;
    openArea: number;
    roadWidth: number;
    roadWidthUnit: string;
    ceilingHeight: number;
    ceilingHeightUnit: string;
    noOfOpenSides: number;
  },
  otherDetails?: {
    propertyTypeDescription: string,
    specialFeatures: string,
    usageRecommendation: string,
    additionalRequirements: string
  },
  propertyDetails?: {
    area: {
      totalArea: number;
      carpetArea: number;
      builtUpArea: number;
    };
    floor?: {
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
    propertyAge: string;
    propertyCondition: string;
  };
  images: string[];
  video: string;
  rentalTerms?: {
    rentDetails: {
      expectedRent: number;
      isNegotiable: boolean;
      rentType: string;
    }
    securityDeposit: {
      amount: number;
    }
    maintenanceAmount?: {
      amount?: number;
      frequency?: string;
    }
    otherCharges: {
      water: {
        amount?: number;
        type: string;
      }
      electricity: {
        amount?: number;
        type: string;
      }
      gas: {
        amount?: number;
        type: string;
      }
      others: {
        amount?: number;
        type: string;
      }
    }
    expectedRent?: number;
  };
  leaseTerms?: {
    leaseDetails: {
      leaseAmount: {
        amount: number,
        type: string,
        duration: number,
        durationUnit: string,
      },
    },
    tenureDetails: {
      minimumTenure: number;
      minimumUnit: string;
      maximumTenure: number;
      maximumUnit: string;
      lockInPeriod: number;
      lockInUnit: string;
      noticePeriod: number;
      noticePeriodUnit: string;
    },
    maintenanceAmount: {
      amount: number,
      frequency: string,
    },
    otherCharges: {
      water: {
        amount?: number,
        type: string,
      },
      electricity: {
        amount?: number,
        type: string,
      },
      gas: {
        amount?: number,
        type: string,
      },
      others: {
        amount?: number,
        type: string,
      }
    },
    brokerage: {
      required: string,
      amount?: number,
    },
    availability: {
      date: Date,
      availableImmediately: Boolean,
      preferredSaleDuration: String,
      noticePeriod: String,
      isPetsAllowed: Boolean,
      operatingHours: {
        restricted: Boolean,
        restrictions: String
      }
    },
  };
  pricingDetails?: {
    propertyPrice: number;
    pricetype: "fixed" | "negotiable";
    area: number;
    totalprice: number;
    pricePerSqft: number;
  };
  priceDetails?: {
    propertyPrice: number;
    pricetype: "fixed" | "negotiable";
    area: number;
    totalprice: number;
    pricePerSqft: number;
  };
  registration?: {
    chargestype: "inclusive" | "exclusive";
    registrationAmount?: number;
    stampDutyAmount?: number;
  }
  brokerage: {
    required: string;
    amount?: number;
  }
  availability: {
    type: string;
    date?: string;
    immediate?: boolean;
    availableFrom?: string;
    availableImmediately?: boolean;
    preferredSaleDuration?: string;
    noticePeriod?: string;
    isPetsAllowed?: boolean;
    operatingHours?: boolean;
  }
  contactInformation: {
    name: string;
    email: string;
    phone: string;
    alternatePhone?: string;
    bestTimeToContact?: string;
  };
  media: {
    photos: {
      exterior: string[];
      interior: string[];
      floorPlan: string[];
      washrooms?: string[];
      lifts?: string[];
      emergencyExits?: string[];
      aerial?: string[];
      surroundings?: string[];
    };
    videoTour?: string;
    documents: string[];
  };
  metadata: {
    createdBy: string | null;
    createdAt: Date;
    propertyType: string;
    intent: string;
    propertyName: string;
    status: string;
  };
}



function formatImages(media: PropertyMedia): PropertyImage[] {
  const images: PropertyImage[] = [];
  let id = 0;

  // Add exterior images
  media?.photos?.exterior?.forEach(url => {
    images.push({
      id: `exterior-${id++}`,
      url,
      category: 'exterior'
    });
  });

  // Add interior images
  media?.photos?.interior?.forEach(url => {
    images.push({
      id: `interior-${id++}`,
      url,
      category: 'interior'
    });
  });

  // Add floor plan images
  media?.photos?.floorPlan?.forEach(url => {
    images.push({
      id: `floorPlan-${id++}`,
      url,
      category: 'floorPlan'
    });
  });

  // Add optional image categories if they exist
  if (media?.photos?.washrooms?.length) {
    media.photos.washrooms.forEach(url => {
      images.push({
        id: `washrooms-${id++}`,
        url,
        category: 'washrooms'
      });
    });
  }

  if (media?.photos?.lifts?.length) {
    media.photos.lifts.forEach(url => {
      images.push({
        id: `lifts-${id++}`,
        url,
        category: 'lifts'
      });
    });
  }

  if (media?.photos?.emergencyExits?.length) {
    media.photos.emergencyExits.forEach(url => {
      images.push({
        id: `emergencyExits-${id++}`,
        url,
        category: 'emergencyExits'
      });
    });
  }

  return images;
}

function Propdetail() {
  const { id: propertyId } = useParams<{ id: string }>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const allMedia = [propertyData.video, ...propertyData.images.map((img: { url: any; }) => img.url)];
  const [property, setProperty] = useState<Property>({
  propertyId: '',
  basicInformation: {
    title: '',
    Type: [],
    address: {
      city: '',
      state: '',
      country: '',
      pincode: ''
    },
    location: {
      latitude: '',
      longitude: ''
    },
    landmark: '',
    isCornerProperty: false
  },
  metadata: {
    createdBy: null,
    createdAt: new Date(),
    propertyType: '',
    intent: '',
    propertyName: '',
    status: ''
  },
  images: [],
  video: '',
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
      aerial: [],
      surroundings: []
    },
    videoTour: '',
    documents: []
  },
  brokerage: {
    required: '',
    amount: 0
  },
  availability: {
    type: '',
    date: '',
    immediate: false,
    availableFrom: '',
    availableImmediately: false,
    preferredSaleDuration: '',
    noticePeriod: '',
    isPetsAllowed: false,
    operatingHours: false
  }
});
  const [loading, setLoading] = useState(true);
  const [propertyMedia, setPropertyMedia] = useState<PropertyMedia>({} as PropertyMedia);
  const Media = [
    propertyMedia?.videoTour || '',
    ...(propertyMedia?.photos ? Object.values(propertyMedia.photos).flat() : []),
  ].filter((mediaUrl) => mediaUrl);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % Media.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + Media.length) % Media.length);
  };

  const categoryCodes: Record<string, string> = {
    residential: "RES",
    commercial: "COM",
    other: "OT",
  };

  const listingCodes: Record<string, string> = {
    rent: "RE",
    sale: "SE",
    lease: "LE",
    pgcoliving: "PG",
  };

  // Normalize Property Type Mapping
  const subCategoryCodes: Record<string, string> = {
    shops: "SH",
    retailstore: "RS",
    showrooms: "SR",
    officyspace: "OS",
    warehouses: "WH",
    sheds: "SD",
    coveredspace: "CS",
    plots: "PL",
    agriculture: "AG",
    others: "OT",
    apartment: "AP",
    independenthouse: "IH",
    builderfloor: "BF",
    sharedspace: "SS",
  };
  if (!propertyId) {
    console.log("No property ID");
    return;
  }
  const categoryCode = propertyId.slice(3, 6);
  const listingCode = propertyId.slice(6, 8);
  const typeCode = propertyId.slice(8, 10);

  // Match with defined mappings
  const category = Object.entries(categoryCodes).find(([_, code]) => code === categoryCode)?.[0] || '';
  const listing = Object.entries(listingCodes).find(([_, code]) => code === listingCode)?.[0] || '';
  const type = Object.entries(subCategoryCodes).find(([_, code]) => code === typeCode)?.[0] || '';

  console.log('Category:', category);
  console.log('Listing:', listing);
  console.log('Type:', type);

  useEffect(() => {
    const fetchPropertyDetails = async () => {

      try {
        const response = await axios.get(`/api/${category}/${listing}/${type}/${propertyId}`);
        console.log(response);
        if (response.data.success) {
          setProperty(response.data.data);
          setPropertyMedia(response.data.data.media);
          setLoading(false);
        } else {
          console.log("response.data.message");
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchPropertyDetails();
  }, [propertyId]);

  console.log(property);

  return (
    <div className="min-h-screen bg-gray-100 pb-24 lg:pb-0">
      <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
        {/* Property Header */}
        <div className="bg-white rounded-xl shadow-lg p-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{property?.basicInformation?.title}</h1>
          {/* <h1 className="text-2xl font-bold text-gray-900 mb-2">Prestige</h1> */}
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="w-5 h-10" />
            <p>{property?.basicInformation?.address?.city}, {property?.basicInformation?.address?.state}</p>
            {/* <p>Bangalore, Karnataka</p> */}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-grow relative group">
                {Media[currentIndex]?.includes('vimeo.com') ? (
                  <iframe
                    src={Media[currentIndex]}
                    className="w-full aspect-video rounded-lg"
                    frameBorder="0"
                    allow="autoplay; fullscreen"
                    allowFullScreen
                  />
                ) : (
                  <img
                    src={Media[currentIndex]}
                    alt="Property"
                    className="w-full aspect-video rounded-lg object-cover"
                  />
                )}

                <button
                  onClick={goToPrevious}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 p-2 rounded-full text-white group-hover:opacity-100 transition-opacity md:opacity-0 opacity-100"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={goToNext}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 p-2 rounded-full text-white group-hover:opacity-100 transition-opacity md:opacity-0 opacity-100"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
              <div className="hidden md:block">
                <ImageGallery
                  images={formatImages(propertyMedia)}
                  onImageSelect={(url) => setCurrentIndex(allMedia.indexOf(url))}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 justify-center">
          <div className="lg:w-[65%] space-y-8">
            <BasicInfo property={property} />
            <AmenitiesTabs details={propertyData} property={property} />
            <LocationMap property={property} />
            {/* <NearbyPlaces /> */}
            <SimilarProperties propertyType={property?.metadata?.propertyType} />
            <LatestInsights />
            {/* <Reviews /> */}
          </div>
          <div className="lg:w-[30%]">
            <PricingCard property={property} />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Propdetail;