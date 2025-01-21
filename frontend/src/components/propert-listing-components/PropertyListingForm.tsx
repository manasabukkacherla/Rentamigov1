"use client";

import React, { useState } from "react";
import { Calendar, Check, ChevronDown, Upload } from "lucide-react";

interface PhotosType {
  cardPhoto: File[];
  exteriorView: File[];
  livingRoom: File[];
  kitchen: File[];
  diningRoom: File[];
  bedroom1: File[];
  bedroom2: File[];
  bedroom3: File[];
  bedroom4: File[];
  bathroom1: File[];
  bathroom2: File[];
  bathroom3: File[];
  bathroom4: File[];
  balcony1: File[];
  balcony2: File[];
  balcony3: File[];
  balcony4: File[];
  studyRoom: File[];
  pujaRoom: File[];
  theaterRoom: File[];
  gymRoom: File[];
  utilityArea: File[];
  others: File[];
}
// First, let's define our interfaces based on the new schema
interface PropertyFormData {
  cardPhoto: string;
  bathroom3: string;
  bathroom4: string;
  propertyVideo: string;
  utilityArea: string;
  balcony1: string;
  balcony2: string;
  balcony3: string;
  balcony4: string;
  bathroom1: string;
  bathroom2: string;
  bedroom1: string;
  bedroom2: string;
  bedroom3: string;
  bedroom4: string;
  diningRoom: string;
  kitchen: string;
  livingRoom: string;
  exteriorView: string;
  ownerType: "Owner" | "Agent" | "Builder";
  name: string;
  whatsappNumber: string;
  email: string;
  availability: {
    date: string;
    status: "Available" | "Unavailable";
  };
  // Property Details
  listingType: "Sale" | "Rent/Lease" | "PG/Hostel";
  propertyType:
    | "Apartment"
    | "Standalone Building"
    | "Villa"
    | "Row House"
    | "Studio Room";
  societySize?: "<50" | "50-100" | ">100";
  city: string;
  projectName: string;

  // Property Features
  bedrooms: "Studio Room" | "1 BHK" | "2 BHK" | "3 BHK" | "3+ BHK" | "4 BHK";
  bathrooms: number;
  balconies: number;
  studyRoom: string;
  servantRoom: string;
  pujaRoom: string;
  theaterRoom: string;
  gymRoom: string;
  floorOfTheProperty: number;
  totalNoOfFloors: number;
  superBuiltUp: number;
  builtUp: number;
  carpetArea: number;
  ageOfTheProperty: "<5 Years" | "5-10 Years" | ">10 Years";
  furnishingStatus: "Unfurnished" | "Semi Furnished" | "Fully Furnished";
  facing:
    | "North"
    | "East"
    | "South"
    | "West"
    | "North-East"
    | "South-East"
    | "North-West"
    | "South-West";

  // Location Details
  latitude: number;
  longitude: number;
  locality: string;
  area: string;
  pinCode: number;

  // Commercials
  monthlyRent?: number;
  maintenanceAmount?: number;
  maintenanceFrequency?: "Monthly" | "Quarterly" | "Yearly";
  securityDeposit?: number;

  // Restrictions
  bachelorTenants: "Yes" | "No" | "Doesn't Matter";
  nonVegTenants: "Yes" | "No" | "Doesn't Matter";
  tenantWithPets: "Yes" | "No" | "Doesn't Matter" | "NA";
  propertyOverlooking: "Garden / Park" | "Pool" | "Main Road";
  carParking: "Yes / No" | "If Yes How many";
  twoWheelerParking: "Yes / No" | "If Yes How many";
  flooringType:
    | "Ceramic Tiles"
    | "Marble"
    | "Vitrified"
    | "Mosaic"
    | "Wooden"
    | "Granite"
    | "Normal Tile";

  // Basic Info
  propertyId: string;
  leaseNo: string;

  // Property Details

  propertyConfiguration: string;

  // Location
  propertyName: string;
  flatNumber: string;
  address: string[];
  zipCode: string;

  // Features

  extraRooms: {
    servantRoom: boolean;
    pujaRoom: boolean;
    gymRoom: boolean;
    theaterRoom: boolean;
  };
  floorOfProperty: string;
  totalFloors: string;
  areas: {
    superBuiltup: string;
    builtup: string;
    carpet: string;
  };
  ageOfProperty: string;

  // Commercial Details

  maintenance: "Included" | "Excluded";

  availabilityDate: string;
  propertyStatus: "Filling Fast" | "Newly Launched" | "Coming Soon";

  // Description and Reviews
  propertyDescription: string;
  landmarks: string[];
  reviews: Array<{
    review: string;
    customerName: string;
  }>;

  // Amenities
  societyAmenities: {
    [key: string]: boolean;
  };
  flatAmenities: {
    [key: string]: boolean;
  };

  // Photos
  photos: PhotosType;
}

export default function PropertyListingForm() {
  const [formData, setFormData] = useState<PropertyFormData>({
    cardPhoto: "",
    propertyVideo: "",
    utilityArea: "",
    balcony1: "",
    balcony2: "",
    balcony3: "",
    balcony4: "",
    bathroom1: "",
    bathroom2: "",
    bathroom3: "",
    bathroom4: "",
    bedroom1: "",
    bedroom2: "",
    bedroom3: "",
    bedroom4: "",
    diningRoom: "",
    kitchen: "",
    livingRoom: "",
    exteriorView: "",
    availability: {
      date: "", // Initialize with empty string
      status: "Available",
    },
    ownerType: "Owner",
    name: "",
    whatsappNumber: "",
    email: "",
    listingType: "Rent/Lease",
    propertyType: "Apartment",
    societySize: "<50",
    city: "",
    projectName: "",
    propertyId: "u23rghtfj567klmn",
    leaseNo: "RA0001",
    propertyConfiguration: "",
    propertyName: "",
    flatNumber: "",
    address: ["", "", ""],

    area: "",
    zipCode: "",

    extraRooms: {
      servantRoom: false,
      pujaRoom: false,
      gymRoom: false,
      theaterRoom: false,
    },
    floorOfProperty: "",
    totalFloors: "",
    areas: {
      superBuiltup: "",
      builtup: "",
      carpet: "",
    },

    // Property Features
    bedrooms: "1 BHK",
    bathrooms: 1,
    balconies: 0,
    studyRoom: "",
    servantRoom: "",
    pujaRoom: "",
    theaterRoom: "",
    gymRoom: "",
    floorOfTheProperty: 0,
    totalNoOfFloors: 0,
    superBuiltUp: 0,
    builtUp: 0,
    carpetArea: 0,
    ageOfTheProperty: "<5 Years",
    furnishingStatus: "Unfurnished",
    facing: "North",

    // Location Details
    latitude: 0,
    longitude: 0,
    locality: "",

    pinCode: 0,
    // Commercials
    monthlyRent: 0,
    maintenance: "Included",
    maintenanceAmount: 0,
    maintenanceFrequency: "Monthly",
    securityDeposit: 0,

    ageOfProperty: "",

    availabilityDate: "",
    propertyStatus: "Filling Fast",
    propertyDescription: "",
    landmarks: Array(6).fill(""),
    reviews: Array(3).fill({ review: "", customerName: "" }),
    // Restrictions
    bachelorTenants: "Doesn't Matter",
    nonVegTenants: "Doesn't Matter",
    tenantWithPets: "Doesn't Matter",
    propertyOverlooking: "Garden / Park",
    carParking: "Yes / No",
    twoWheelerParking: "Yes / No",
    flooringType: "Ceramic Tiles",
    societyAmenities: {
      lift: false,
      powerBackup: false,
      security: false,
      cctv: false,
      gym: false,
      swimmingPool: false,
      kidsPool: false,
      jacuzzi: false,
      clubHouse: false,
      joggingTrack: false,
      childrenPlayArea: false,
      badmintonCourt: false,
      lawnTennisCourt: false,
      tableTennis: false,
      squashCourt: false,
      foosball: false,
      steamRoom: false,
      carrom: false,
      chessBoard: false,
      multipurposeHall: false,
      yogaMeditationCenter: false,
      flowerPark: false,
      dayToUtilityStores: false,
      thaiMassageParlor: false,
      salon: false,
    },
    flatAmenities: {
      airConditioner: false,
      bed: false,
      wardrobe: false,
      tv: false,
      refrigerator: false,
      washingMachine: false,
      microwave: false,
      sofa: false,
      diningTable: false,
      gasConnection: false,
      playStation: false,
    },
    // Update the photos property in the initial state
    photos: {
      cardPhoto: [],
      exteriorView: [],
      livingRoom: [],
      kitchen: [],
      diningRoom: [],
      bedroom1: [],
      bedroom2: [],
      bedroom3: [],
      bedroom4: [],
      bathroom1: [],
      bathroom2: [],
      bathroom3: [],
      bathroom4: [],
      balcony1: [],
      balcony2: [],
      balcony3: [],
      balcony4: [],
      studyRoom: [],
      pujaRoom: [],
      theaterRoom: [],
      gymRoom: [],
      utilityArea: [],
      others: [],
    } as PhotosType,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();

      const propertyData = {
        // Basic Info
        name: formData.name || "",
        whatsappNumber: formData.whatsappNumber || "",
        email: formData.email || "",
        city: formData.city || "",
        projectName: formData.projectName || "",
        locality: formData.locality || "",
        area: formData.area || "",
        flatNo: formData.flatNumber,
        ownerType: formData.ownerType,
        listingType: formData.listingType,
        propertyVideo: formData.propertyVideo || "",

        // Address structure
        address: {
          line1: formData.address[0] || "",
          line2: formData.address[1] || "",
          line3: formData.address[2] || "",
        },

        // Required Photos/Areas with default values

        // Location Details
        latitude: formData.latitude,
        longitude: formData.longitude,
        pinCode: formData.pinCode,

        // Property Details
        propertyType: formData.propertyType,
        propertyConfiguration: formData.propertyConfiguration,
        propertyName: formData.propertyName,
        propertyDescription: formData.propertyDescription,
        propertyStatus: formData.propertyStatus,
        propertyOverlooking: formData.propertyOverlooking,
        carParking: formData.carParking,
        twoWheelerParking: formData.twoWheelerParking,
        flooringType: formData.flooringType,

        // Extra Rooms
        studyRoom: formData.studyRoom || "",
        servantRoom: formData.servantRoom || "",
        pujaRoom: formData.pujaRoom || "",
        theaterRoom: formData.theaterRoom || "",
        gymRoom: formData.gymRoom || "",

        // Property Features
        floorOfTheProperty: formData.floorOfTheProperty,
        totalNoOfFloors: formData.totalNoOfFloors,
        furnishingStatus: formData.furnishingStatus,

        // Required Photos/Areas
        cardPhoto: formData.cardPhoto || "",
        exteriorView: formData.exteriorView || "",
        livingRoom: formData.livingRoom || "",
        kitchen: formData.kitchen || "",
        diningRoom: formData.diningRoom || "",
        bedroom1: formData.bedroom1 || "",
        bedroom2: formData.bedroom2 || "",
        bedroom3: formData.bedroom3 || "",
        bedroom4: formData.bedroom4 || "",
        bathroom1: formData.bathroom1 || "",
        bathroom2: formData.bathroom2 || "",
        bathroom3: formData.bathroom3 || "",
        bathroom4: formData.bathroom4 || "",
        balcony1: formData.balcony1 || "",
        balcony2: formData.balcony2 || "",
        balcony3: formData.balcony3 || "",
        balcony4: formData.balcony4 || "",
        utilityArea: formData.utilityArea || "",

        // Features
        bedrooms: formData.bedrooms,
        bathrooms: formData.bathrooms,
        balconies: formData.balconies,
        floorOfProperty: formData.floorOfProperty,
        totalFloors: formData.totalFloors,
        facing: formData.facing,
        ageOfTheProperty: formData.ageOfTheProperty,

        // Areas
        superBuiltUp: formData.areas.superBuiltup,
        builtUp: formData.areas.builtup,
        carpetArea: formData.areas.carpet,

        // Commercials
        monthlyRent: formData.monthlyRent,
        maintenance: formData.maintenance,
        maintenanceAmount: formData.maintenanceAmount,
        maintenanceFrequency: formData.maintenanceFrequency,
        securityDeposit: formData.securityDeposit,

        // Availability
        availability: {
          date: formData.availability.date,
          status: formData.availability.status,
        },

        // Society Amenities
        ...formData.societyAmenities,

        // Flat Amenities
        ...formData.flatAmenities,

        // Restrictions
        bachelorTenants: formData.bachelorTenants,
        nonVegTenants: formData.nonVegTenants,
        tenantWithPets: formData.tenantWithPets,

        // Additional Details
        landmarks: formData.landmarks,
        reviews: formData.reviews,

        // Remove photos as they'll be handled separately
        photos: undefined,
      };

      // Add property data as JSON string
      formDataToSend.append("propertyData", JSON.stringify(propertyData));

      // Append photos with correct field names
      if (formData.photos) {
        const photoFields = {
          cardPhoto: formData.photos.cardPhoto,
          exteriorView: formData.photos.exteriorView,
          livingRoom: formData.photos.livingRoom,
          kitchen: formData.photos.kitchen,
          diningRoom: formData.photos.diningRoom,
          bedroom: formData.photos.bedroom1,
          'bedroom"': formData.photos.bedroom2,
          'bedroom""': formData.photos.bedroom3,
          'bedroom"""': formData.photos.bedroom4,
          bathroom: formData.photos.bathroom1,
          'bathroom"': formData.photos.bathroom2,
          'bathroom""': formData.photos.bathroom3,
          'bathroom"""': formData.photos.bathroom4,
          balcony: formData.photos.balcony1,
          'balcony"': formData.photos.balcony2,
          'balcony""': formData.photos.balcony3,
          'balcony"""': formData.photos.balcony4,
          utilityArea: formData.photos.utilityArea,
          others: formData.photos.others,
        };

        Object.entries(photoFields).forEach(([fieldName, files]) => {
          if (files && files.length > 0) {
            files.forEach((file) => {
              formDataToSend.append(fieldName, file);
            });
          }
        });
      }

      const response = await fetch("https://c5zaskxsitwlc33abxxgi3smli0lydfl.lambda-url.us-east-1.on.aws/api/properties", {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create property");
      }

      const result = await response.json();
      console.log("Property created:", result);
    } catch (error: any) {
      console.error("Error submitting property:", error);
    }
  };
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (
    category: "extraRooms" | "societyAmenities" | "flatAmenities",
    name: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [name]: !prev[category][name],
      },
    }));
  };

  const handleFileUpload = (category: string, files: FileList | null) => {
    if (!files) return;

    setFormData((prev) => ({
      ...prev,
      photos: {
        ...prev.photos,
        [category]: [...(prev.photos[category] || []), ...Array.from(files)],
      },
    }));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <img
              src="/src/assets/logo.png"
              alt="Rentamigo Logo"
              className="h-10"
            />
            <button className="px-4 py-1 border border-gray-300 rounded-full hover:bg-gray-50">
              Log Out
            </button>
          </div>
        </div>
      </div>

      {/* Main Form */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form className="space-y-8" onSubmit={handleSubmit}>
        <div className="p-6 bg-white rounded-lg shadow-md">
  <h2 className="text-2xl font-bold text-gray-800 mb-6">Basic Information</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {/* City Field */}
    <div>
      <label htmlFor="city" className="block text-sm font-medium text-gray-600 mb-2">
        City
      </label>
      <input
        type="text"
        id="city"
        name="city"
        value={formData.city}
        onChange={handleChange}
        placeholder="Enter your city"
        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

    {/* Project Name Field */}
    <div>
      <label htmlFor="projectName" className="block text-sm font-medium text-gray-600 mb-2">
        Project Name
      </label>
      <input
        type="text"
        id="projectName"
        name="projectName"
        value={formData.projectName}
        onChange={handleChange}
        placeholder="Enter the project name"
        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

    {/* Locality Field */}
    <div>
      <label htmlFor="locality" className="block text-sm font-medium text-gray-600 mb-2">
        Locality
      </label>
      <input
        type="text"
        id="locality"
        name="locality"
        value={formData.locality}
        onChange={handleChange}
        placeholder="Enter the locality"
        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

    {/* Area Field */}
    <div>
      <label htmlFor="area" className="block text-sm font-medium text-gray-600 mb-2">
        Area
      </label>
      <input
        type="text"
        id="area"
        name="area"
        value={formData.area}
        onChange={handleChange}
        placeholder="Enter the area"
        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  </div>
</div>


          {/* Bedrooms */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Bedrooms</h2>
            <div className="grid grid-cols-2 gap-6">
              {[1].map((num) => (
                <div key={`bedroom${num}`}>
                  <label className="block text-sm font-medium text-gray-700">
                    Bedroom
                  </label>
                  <div className="relative mt-1">
                    <select
                      name={`bedroom${num}`}
                      value={formData[`bedroom${num}`]}
                      onChange={handleChange}
                      className="block w-full rounded-md border-gray-300 pr-10"
                    >
                      <option value="">Select</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="4+">4+</option>
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bathrooms */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Bathrooms</h2>
            <div className="grid grid-cols-2 gap-6">
              {[1].map((num) => (
                <div key={`bathroom${num}`}>
                  <label className="block text-sm font-medium text-gray-700">
                    Bathroom
                  </label>
                  <div className="relative mt-1">
                    <select
                      name={`bathroom${num}`}
                      value={formData[`bathroom${num}`]}
                      onChange={handleChange}
                      className="block w-full rounded-md border-gray-300 pr-10"
                    >
                      <option value="">Select</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="4+">4+</option>
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Balconies */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Balconies</h2>
            <div className="grid grid-cols-2 gap-6">
              {[1].map((num) => (
                <div key={`balcony${num}`}>
                  <label className="block text-sm font-medium text-gray-700">
                    Balcony
                  </label>
                  <div className="relative mt-1">
                    <select
                      name={`balcony${num}`}
                      value={formData[`balcony${num}`]}
                      onChange={handleChange}
                      className="block w-full rounded-md border-gray-300 pr-10"
                    >
                      <option value="">Select</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="4+">4+</option>
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Property Video */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Property Video URL
            </label>
            <input
              type="text"
              name="propertyVideo"
              value={formData.propertyVideo}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300"
            />
          </div>
          {/* Property ID and Lease No */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Property Id
              </label>
              <input
                type="text"
                value={formData.propertyId}
                disabled
                className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Lease No
              </label>
              <input
                type="text"
                value={formData.leaseNo}
                disabled
                className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50"
              />
            </div>
          </div>
          {/* Property Details */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Property Details</h2>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Property Type
                </label>
                <div className="relative mt-1">
                  <select
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleChange}
                  >
                    <option value="Apartment">Apartment</option>
                    <option value="Standalone Building">
                      Standalone Building
                    </option>
                    <option value="Villa">Villa</option>
                    <option value="Row House">Row House</option>
                    <option value="Studio Room">Studio Room</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Property Configuration
                </label>
                <div className="relative mt-1">
                  <select
                    name="propertyConfiguration"
                    value={formData.propertyConfiguration}
                    onChange={handleChange}
                    className="block w-full rounded-md border-gray-300 pr-10"
                  >
                    <option value="">Select</option>
                    <option value="1bhk">1 BHK</option>
                    <option value="2bhk">2 BHK</option>
                    <option value="3bhk">3 BHK</option>
                    <option value="1rk">1 RK</option>
                    <option value="4bhk">4 BHK</option>
                    <option value="4+bhk">4+ BHK</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
          {/* Property Location */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Property Location</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Property Name
                </label>
                <input
                  type="text"
                  name="propertyName"
                  value={formData.propertyName}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Flat Number
                </label>
                <input
                  type="text"
                  name="flatNumber"
                  value={formData.flatNumber}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                {formData.address.map((line, index) => (
                  <input
                    key={index}
                    type="text"
                    value={line}
                    onChange={(e) => {
                      const newAddress = [...formData.address];
                      newAddress[index] = e.target.value;
                      setFormData((prev) => ({ ...prev, address: newAddress }));
                    }}
                    className="mt-1 block w-full rounded-md border-gray-300"
                  />
                ))}
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Latitude
                  </label>
                  <input
                    type="text"
                    name="latitude"
                    value={formData.latitude}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Longitude
                  </label>
                  <input
                    type="text"
                    name="longitude"
                    value={formData.longitude}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Property Features */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Property Features</h2>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Any Extra Room Available
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {Object.entries(formData.extraRooms).map(
                    ([room, checked]) => (
                      <label key={room} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() =>
                            handleCheckboxChange("extraRooms", room)
                          }
                          className="rounded border-gray-300 text-blue-600"
                        />
                        <span className="text-sm">
                          {room.replace(/([A-Z])/g, " $1").trim()}
                        </span>
                      </label>
                    )
                  )}
                </div>
              </div>

              {/* Restrictions */}
              {/* Restrictions */}
              <div>
                <h2 className="text-lg font-semibold mb-4">Restrictions</h2>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Bachelor Tenants
                    </label>
                    <select
                      name="bachelorTenants"
                      value={formData.bachelorTenants}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300"
                    >
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Non-Veg Tenants
                    </label>
                    <select
                      name="nonVegTenants"
                      value={formData.nonVegTenants}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300"
                    >
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Tenant With Pets
                    </label>
                    <select
                      name="tenantWithPets"
                      value={formData.tenantWithPets}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300"
                    >
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Car Parking
                    </label>
                    <select
                      name="carParking"
                      value={formData.carParking}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300"
                    >
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Two Wheeler Parking
                    </label>
                    <select
                      name="twoWheelerParking"
                      value={formData.twoWheelerParking}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300"
                    >
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                      {/* <option value="If Yes How many">If Yes How many</option> */}
                    </select>
                  </div>
                </div>
              </div>

              {/* Property Features (continued) */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Floor of the property
                    </label>
                    <input
                      type="number"
                      name="floorOfProperty"
                      value={formData.floorOfProperty}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Total Floors
                    </label>
                    <input
                      type="number"
                      name="totalFloors"
                      value={formData.totalFloors}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Area
                  </label>
                  <div className="grid grid-cols-3 gap-4 mt-1">
                    <input
                      type="number"
                      name="superBuiltup"
                      value={formData.areas.superBuiltup}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          areas: {
                            ...prev.areas,
                            superBuiltup: e.target.value,
                          },
                        }))
                      }
                      placeholder="Super Builtup"
                      className="block w-full rounded-md border-gray-300"
                    />
                    <input
                      type="number"
                      name="builtup"
                      value={formData.areas.builtup}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          areas: { ...prev.areas, builtup: e.target.value },
                        }))
                      }
                      placeholder="Builtup"
                      className="block w-full rounded-md border-gray-300"
                    />
                    <input
                      type="number"
                      name="carpet"
                      value={formData.areas.carpet}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          areas: { ...prev.areas, carpet: e.target.value },
                        }))
                      }
                      placeholder="Carpet"
                      className="block w-full rounded-md border-gray-300"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label>Age of Property</label>
                    <select
                      name="ageOfTheProperty"
                      value={formData.ageOfTheProperty}
                      onChange={handleChange}
                    >
                      <option value="<5 Years">&lt;5 Years</option>
                      <option value="5-10 Years">5-10 Years</option>
                      <option value=">10 Years">&gt;10 Years</option>
                    </select>
                  </div>
                  <div>
                    <label>Facing</label>
                    <select
                      name="facing"
                      value={formData.facing}
                      onChange={handleChange}
                    >
                      <option value="North">North</option>
                      <option value="East">East</option>
                      <option value="South">South</option>
                      <option value="West">West</option>
                      <option value="North-East">North-East</option>
                      <option value="South-East">South-East</option>
                      <option value="North-West">North-West</option>
                      <option value="South-West">South-West</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Property Description */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Property Description</h2>
            <textarea
              name="propertyDescription"
              value={formData.propertyDescription}
              onChange={handleChange}
              rows={6}
              className="mt-1 block w-full rounded-md border-gray-300"
              placeholder="Enter property description..."
            />
          </div>
          {/* Landmarks */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Landmarks</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {formData.landmarks.map((landmark, index) => (
                <div key={index}>
                  <label className="block text-sm font-medium text-gray-700">
                    Landmark {index + 1}
                  </label>
                  <input
                    type="text"
                    value={landmark}
                    onChange={(e) => {
                      const newLandmarks = [...formData.landmarks];
                      newLandmarks[index] = e.target.value;
                      setFormData((prev) => ({
                        ...prev,
                        landmarks: newLandmarks,
                      }));
                    }}
                    className="mt-1 block w-full rounded-md border-gray-300"
                  />
                </div>
              ))}
            </div>
          </div>
          {/* Reviews */}
          <div>
            <h2 className="text-lg font-semibold mb-4">
              Reviews About The Property
            </h2>
            <div className="space-y-4">
              {formData.reviews.map((review, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Review {index + 1}
                    </label>
                    <input
                      type="text"
                      value={review.review}
                      onChange={(e) => {
                        const newReviews = [...formData.reviews];
                        newReviews[index] = {
                          ...review,
                          review: e.target.value,
                        };
                        setFormData((prev) => ({
                          ...prev,
                          reviews: newReviews,
                        }));
                      }}
                      className="mt-1 block w-full rounded-md border-gray-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Customer Name
                    </label>
                    <input
                      type="text"
                      value={review.customerName}
                      onChange={(e) => {
                        const newReviews = [...formData.reviews];
                        newReviews[index] = {
                          ...review,
                          customerName: e.target.value,
                        };
                        setFormData((prev) => ({
                          ...prev,
                          reviews: newReviews,
                        }));
                      }}
                      className="mt-1 block w-full rounded-md border-gray-300"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Commercials */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Commercials</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Monthly Rent
                </label>
                <input
                  type="number"
                  name="monthlyRent"
                  value={formData.monthlyRent}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Maintenance
                </label>
                <div className="mt-2 space-x-4">
                  {["Included", "Excluded"].map((option) => (
                    <label key={option} className="inline-flex items-center">
                      <input
                        type="radio"
                        name="maintenance"
                        value={option}
                        checked={formData.maintenance === option}
                        onChange={handleChange}
                        className="form-radio h-4 w-4 text-blue-600"
                      />
                      <span className="ml-2">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Maintenance Amount Per Month
                </label>
                <input
                  type="number"
                  name="maintenanceAmount"
                  value={formData.maintenanceAmount}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Security Deposit
                </label>
                <input
                  type="number"
                  name="securityDeposit"
                  value={formData.securityDeposit}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Availability Of the Property
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="date"
                    name="availabilityDate"
                    value={formData.availability.date}
                    onChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        availability: {
                          ...prev.availability,
                          date: e.target.value,
                        },
                      }));
                    }}
                    className="mt-1 block w-full rounded-md border-gray-300"
                  />
                  <select
                    name="availabilityStatus"
                    value={formData.availability.status}
                    onChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        availability: {
                          ...prev.availability,
                          status: e.target.value as "Available" | "Unavailable",
                        },
                      }));
                    }}
                    className="mt-1 block w-full rounded-md border-gray-300"
                  >
                    <option value="Available">Available</option>
                    <option value="Unavailable">Unavailable</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Property Status
                </label>
                <div className="mt-2 space-x-4">
                  {["Filling Fast", "Newly Launched", "Coming Soon"].map(
                    (status) => (
                      <label key={status} className="inline-flex items-center">
                        <input
                          type="radio"
                          name="propertyStatus"
                          value={status}
                          checked={formData.propertyStatus === status}
                          onChange={handleChange}
                          className="form-radio h-4 w-4 text-blue-600"
                        />
                        <span className="ml-2">{status}</span>
                      </label>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* Amenities */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Amenities</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-md font-medium mb-2">
                  Amenities in the society
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {Object.keys(formData.societyAmenities).map((amenity) => (
                    <label key={amenity} className="inline-flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.societyAmenities[amenity]}
                        onChange={() =>
                          handleCheckboxChange("societyAmenities", amenity)
                        }
                        className="form-checkbox h-4 w-4 text-blue-600"
                      />
                      <span className="ml-2">
                        {amenity.replace(/([A-Z])/g, " $1").trim()}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-md font-medium mb-2">
                  Amenities in the flat
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {Object.keys(formData.flatAmenities).map((amenity) => (
                    <label key={amenity} className="inline-flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.flatAmenities[amenity]}
                        onChange={() =>
                          handleCheckboxChange("flatAmenities", amenity)
                        }
                        className="form-checkbox h-4 w-4 text-blue-600"
                      />
                      <span className="ml-2">
                        {amenity.replace(/([A-Z])/g, " $1").trim()}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* Property photos */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Property Photos</h2>
            <div className="grid grid-cols-2 gap-4">
              {Object.keys(formData.photos).map((category) => (
                <div
                  key={category}
                  className="flex flex-col p-4 border rounded-lg"
                >
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    {category.replace(/([A-Z])/g, " $1").trim()}
                  </label>
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-2">
                      {formData.photos[category].map((file, index) => (
                        <div key={index} className="relative">
                          <img
                            src={URL.createObjectURL(file)}
                            alt={`${category} ${index + 1}`}
                            className="h-16 w-16 object-cover rounded"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setFormData((prev) => ({
                                ...prev,
                                photos: {
                                  ...prev.photos,
                                  [category]: prev.photos[category].filter(
                                    (_, i) => i !== index
                                  ),
                                },
                              }));
                            }}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 text-xs"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) =>
                          handleFileUpload(category, e.target.files)
                        }
                        className="hidden"
                        id={`file-${category}`}
                      />
                      <label
                        htmlFor={`file-${category}`}
                        className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer flex items-center"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Photos
                      </label>
                      <span className="text-sm text-gray-500">
                        {formData.photos[category].length} / 5 photos
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Submit Property
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
