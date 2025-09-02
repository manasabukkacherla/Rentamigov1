import React, { useEffect, useState } from 'react';
import { MapPin, ChevronLeft, ChevronRight, ChevronUp, X } from 'lucide-react';

import axios from 'axios';
import { useParams } from 'react-router-dom';
import { PropertyMedia } from '@/components/detailproperty/types';

interface EnquiryFormProps {
  onClose: () => void;
  property?: any;
}

const EnquiryForm: React.FC<EnquiryFormProps> = ({ onClose, property }) => {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log('Enquiry submitted:', {
        ...formData,
        propertyId: property?.propertyId,
        propertyTitle: property?.metadata?.propertyName || property?.basicInformation?.title
      });
      
      alert('Thank you for your enquiry! We will get back to you soon.');
      onClose();
    } catch (error) {
      console.error('Error submitting enquiry:', error);
      alert('There was an error submitting your enquiry. Please try again.');
    }
  };

  function setShowEnquiryForm(arg0: boolean): void {
    throw new Error('Function not implemented.');
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative max-h-[80vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-semibold text-gray-900 mb-4">Enquiry Form</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {property && (
            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-gray-900">Property: {property.metadata?.propertyName || property.basicInformation?.title}</h3>
              {property.pricingDetails?.propertyPrice && (
                <p className="text-sm text-gray-600">
                  Price: ₹{property.pricingDetails.propertyPrice}
                </p>
              )}
            </div>
          )}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              defaultValue={''}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-lg transition"
          >
            Submit Enquiry
          </button>
        </form>
      </div>
      
      
    </div>
  );
};

interface PricingCardProps {
  property: any;
  listing: string;
  type: string;
  onEnquireClick: () => void;
}

const PricingCard: React.FC<PricingCardProps> = ({ property, listing, type, onEnquireClick }) => {
  const [showMobilePricing, setShowMobilePricing] = React.useState(false);

  const renderPriceSection = () => {
    if (listing === 'sell' && type === 'PL') {
      return (
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Pricing Details</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Property Price</span>
                <span className="font-medium">₹{property?.pricingDetails?.propertyPrice || 'N/A'}</span>
              </div>
             
              <div className="flex justify-between">
                <span className="text-gray-600">Price per Sqft</span>
                <span className="font-medium">₹{property?.pricingDetails?.pricePerSqFt || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Price</span>
                <span className="font-medium">₹{property?.pricingDetails?.totalPrice || 'N/A'}</span>
              </div>
             
            </div>
          </div>
        </div>
      );
    } else if (listing === 'rent' && type === 'PL') {
      return (
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Rental Details</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Expected Rent</span>
                <span className="font-medium">₹{property?.rentalTerms?.rentDetails?.expectedRent || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Rent Type</span>
                <span className="font-medium">{property?.rentalTerms?.rentDetails?.rentType || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Security Deposit</span>
                <span className="font-medium">₹{property?.rentalTerms?.securityDeposit?.amount || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Negotiable</span>
                <span className="font-medium">{property?.rentalTerms?.rentDetails?.isNegotiable ? 'Yes' : 'No'}</span>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (listing === 'lease' && type === 'AG') {
      return (
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Lease Details</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Lease Amount</span>
                <span className="font-medium">₹{property?.leaseTerms?.leaseAmount?.amount || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Duration</span>
                <span className="font-medium">
                  {property?.leaseTerms?.leaseAmount?.duration} {property?.leaseTerms?.leaseAmount?.durationType || 'months'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Negotiable</span>
                <span className="font-medium">{property?.leaseTerms?.leaseAmount?.isNegotiable ? 'Yes' : 'No'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Minimum Tenure</span>
                <span className="font-medium">
                  {property?.leaseTerms?.leaseTenure?.minimumTenure} {property?.leaseTerms?.leaseTenure?.minimumUnit}
                </span>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      {/* Mobile View - Button to show pricing */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setShowMobilePricing(!showMobilePricing)}
          className="w-full flex items-center justify-between px-4 py-3 bg-gray-100 rounded-lg text-gray-800 font-medium"
        >
          <span>View Pricing Details</span>
          <ChevronUp className={`w-5 h-5 transition-transform ${showMobilePricing ? 'transform rotate-180' : ''}`} />
        </button>
        {showMobilePricing && (
          <div className="mt-2 p-4 border border-gray-200 rounded-lg">
            {renderPriceSection()}
            <button
              onClick={onEnquireClick}
              className="w-full mt-4 bg-black hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition"
            >
              Enquire Now
            </button>
          </div>
        )}
      </div>

      {/* Desktop View */}
      <div className="hidden lg:block bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-2xl font-bold text-black mb-6">Price Details</h3>
        {renderPriceSection()}
        <button
          onClick={onEnquireClick}
          className="w-full mt-6 bg-black hover:bg-black text-white font-medium py-3 px-4 rounded-lg transition"
        >
          Enquire Now
        </button>
      </div>
    </>
  );
};

export interface AgricultureProperty {
  propertyId: string;
  basicInformation: {
    title: string;
    Type: string[];
    powerSupply: 'Available' | 'Not Available';
    address: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
    };
    location: {
      latitude: string;
      longitude: string;
    };
    landmark: string;
    isCornerProperty: boolean;
  };
  Agriculturelanddetails: {
    totalArea: number;
    soilType: string;
    irrigation: boolean;
    fencing: boolean;
    cropSuitability: string;
    waterSource?: string;
    legalClearances: boolean;
  };
  price?: {
    expectedPrice?: number;
    isNegotiable?: boolean;
  };
  pricingDetails?: {
    propertyPrice?: number;
    priceType?: string;
    area?: number;
    totalPrice?: number;
    pricePerSqft?: number;
  };
  rent: {
    expectedRent?: number;
    isNegotiable?: boolean
  };
  availability: {
    type: 'immediate' | 'specific';
    date?: string;
    noticePeriod?: string;
  };
  contactDetails: {
    name: string;
    email: string;
    phone: string;
    alternatePhone?: string;
    bestTimeToContact?: string;
  };
  media: {
    photos: {
      exterior: string[];
    };
    videoTour?: string | null;
    documents: string[];
  };
  metadata: {
    createdBy: string;
    createdAt: string;
    propertyType: string;
    propertyName: string;
    intent: string;
    status: string;
  };
  operatingHoursRestrictions?: boolean;
  petsAllowed?: boolean;
  __v?: number;
  _id?: string;
}
interface propertyRentPlot {
  basicInformation: {
    title: string;
    Type: string[];
    address: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
    };
    location: {
      latitude: string;
      longitude: string;
    };

    landmark: string;
    isCornerProperty: boolean;
  };
  propertyDetails: {
    totalArea: number;
    zoningType: string;
    boundaryWall: boolean;
    waterSewer: boolean;
    electricity: boolean;
    roadAccess: string;
    securityRoom: boolean;
    previousConstruction: string;
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
  };
  availability: {
    type: string;
    date: string; // ISO date string
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
      exterior: string[]; // base64 image strings
      interior: string[];
      floorPlan: string[];
      washrooms: string[];
      lifts: string[];
      emergencyExits: string[];
    };
    documents: any[]; // assuming undefined structure
  };
  metadata: {
    createdBy: {
      _id: string;
      email: string;
    };
    createdAt: string; // ISO date string
    propertyType: string;
    intent: string;
    propertyName: string;
    status: string;
  };
  _id: string;
  propertyId: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
};
interface leaseagriculture {
  basicInformation: {
    title: string;
    landType: string[];
    address: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
    };
    location: {
      latitude: string;
      longitude: string;
    };
    landmark: string;
    isCornerProperty: boolean;
    powerSupply: string;

  };

  Agriculturelanddetails: {
    totalArea?: Number;
    soilType: string;
    irrigation: boolean;
    fencing: boolean;
    cropSuitability: string;
    waterSource: string;
    legalClearances: boolean;
  };


  leaseTerms: {
    leaseAmount: {
      amount: number;
      duration: number;
      durationType: string;
      isNegotiable: boolean;
    };
    leaseTenure: {
      minimumTenure: string;
      minimumUnit: string;
      maximumTenure: string;
      maximumUnit: string;
      lockInPeriod: string;
      lockInUnit: string;
      noticePeriod: string;
      noticePeriodUnit: string;
    };

  };

  availability: {
    availableFrom: Date;
    availableImmediately: boolean;
    availabilityStatus: string;
    leaseDuration: string;
    noticePeriod: string;
    isPetsAllowed: boolean;
    operatingHours: boolean;
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
    videoTour: File | null;
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


interface plotsell {
  basicInformation: {
    title: string;
    Type: string[];
    address: string;
    landmark: string;
    city: string;
    state: string;
    zipCode: string;
    isCornerProperty: boolean;
  };
  plotDetails: {
    totalArea: number;
    zoningType: string;
    boundaryWall: boolean;
    waterSewer: boolean;
    electricity: boolean;
    previousConstruction: string[];
    roadAccess: string;
    securityRoom: boolean;
  };
  pricingDetails: {
    propertyPrice: number;
    priceType: string;
    area: number;
    totalPrice: number;
    pricePerSqFt: number;
  };
  availability: {
    availableImmediately: boolean;
    availabilityStatus: string;
    possessionDate: string;
    leaseDuration: string;
    noticePeriod: string;
    petsAllowed: boolean;
    operatingHours: {
      restricted: boolean;
      restrictions: string;
    };
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
      plot: string[]; // base64 strings
      surroundings: string[];
      documents: string[];
    };
    videoTour: string | null;
  };
  metadata: {
    createdBy: {
      _id: string;
      email: string;
    };
    createdAt: string; // ISO datetime
    propertyType: string;
    intent: string;
    propertyName: string;
    status: string;
  };
  _id: string;
  propertyId: string;
  createdAt: string; // ISO datetime
  updatedAt: string; // ISO datetime
}

interface leaseplotproperty {
  propertyId?: string;
  basicInformation: {
    title: string;
    plotType: string[];
    address: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
      _id: string;
    };
    landmark: string;
    location: {
      latitude: string;
      longitude: string;
      _id: string;
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




const PlotManagement: React.FC = () => {
  const [showEnquiryForm, setShowEnquiryForm] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<AgricultureProperty | propertyRentPlot | plotsell | leaseagriculture | leaseplotproperty | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showPriceCard, setShowPriceCard] = useState(false);
  const [showAllFeatures, setShowAllFeatures] = useState(false);
  const [propertyRentPlot, setPropertyRentPlot] = useState<any>(null);
  
  const categoryCodes: Record<string, string> = {
    residential: "RES",
    commercial: "COM",
    other: "OT",
  };

  const listingCodes: Record<string, string> = {
    rent: "RE",
    sell: "SE",
    lease: "LE",
    "pg/co-living": "PG",
  };

  // Normalize Property Type Mapping
  const subCategoryCodes: Record<string, string> = {
    shops: "SH",
    "retail-store": "RS",
    showrooms: "SR",
    "office-space": "OS",
    warehouses: "WH",
    sheds: "SD",
    "covered-space": "CS",
    plots: "PL",
    agriculture: "AG",
    others: "OT",
    apartment: "AP",

    "independenthouse": "IH",
    "builderfloor": "BF",

    "shared-space": "SS",
  };


  const { id: propertyId } = useParams<{ id: string }>();
  const [property, setProperty] = useState<AgricultureProperty | null>(null);
  const [rentplotproperty, setRentplotproperty] = useState<propertyRentPlot | null>(null);
  const [sellplotproperty, setsellplotproperty] = useState<plotsell | null>(null);
  const [leaseagricultureproperty, setLeaseagricultureproperty] = useState<leaseagriculture | null>(null);
  const [leaseplotproperty, setLeaseplotproperty] = useState<leaseplotproperty | null>(null);
  const [loading, setLoading] = useState(true);
  const [propertyMedia, setPropertyMedia] = useState<PropertyMedia>({} as PropertyMedia);

  if (!propertyId) {
    console.log("No property ID");
    return;
  }
  const categoryCode = propertyId.slice(3, 6);
  const listingCode = propertyId.slice(6, 8);
  const typeCode = propertyId.slice(8, 10);
  console.log(typeCode)
  // Match with defined mappings
  const category = Object.entries(categoryCodes).find(([_, code]) => code === categoryCode)?.[0] || '';
  const listing = Object.entries(listingCodes).find(([_, code]) => code === listingCode)?.[0] || '';
  const type = Object.entries(subCategoryCodes).find(([_, code]) => code === typeCode)?.[0] || '';

  console.log('Category:', category);
  console.log('Listing:', listing);
  console.log('Type:', type);

  // Subcomponents for segregated field rendering
  const AgricultureFields = ({ property }: { property: any }) => {
    if (!property) return null;
    const details = property.Agriculturelanddetails || property.plotDetails || property.propertyDetails || {};
    const price = property.pricingDetails?.propertyPrice ?? property.price?.expectedPrice;
    return (
      <div>
        <h3>Agriculture Property Details</h3>
        <div><strong>Title:</strong> {property.basicInformation?.title}</div>
        <div><strong>Total Area:</strong> {details.totalArea}</div>
        <div><strong>Soil Type:</strong> {details.soilType}</div>
        <div><strong>Irrigation:</strong> {details.irrigation ? 'Yes' : 'No'}</div>
        <div><strong>Fencing:</strong> {details.fencing ? 'Yes' : 'No'}</div>
        <div><strong>Crop Suitability:</strong> {details.cropSuitability}</div>
        <div><strong>Water Source:</strong> {details.waterSource}</div>
        <div><strong>Legal Clearances:</strong> {details.legalClearances ? 'Yes' : 'No'}</div>
        {typeof price !== 'undefined' && (
          <div><strong>Price:</strong> ₹{price}</div>
        )}
      </div>
    );
  };

  const PlotFields = ({ property }: { property: any }) => {
    if (!property) return null;
    // Defensive: try plotDetails, propertyDetails, or fallback to {}
    const details = property.plotDetails || property.propertyDetails || {};
    const listingType = property.metadata?.intent?.toLowerCase() || property.intent?.toLowerCase() || '';
    const isRent = listingType === 'rent';
    const issell = listingType === 'sell' || listingType === 'sell';
    // For rent plots
    const rent = property.rentalTerms?.rentDetails || property.rent || {};
    const securityDeposit = property.rentalTerms?.securityDeposit?.amount;
    // For sell plots
    const price = property.pricingDetails?.propertyPrice ?? property.price?.expectedPrice;
    // Features for commercial plot (no agriculture fields)
    const features: string[] = [];
    if (details.boundaryWall) features.push('Boundary Wall Present');
    if (details.waterSewer) features.push('Water & Sewer Available');
    if (details.electricity) features.push('Electricity Available');
    if (details.roadAccess) features.push(`Road Access: ${details.roadAccess}`);
    if (details.securityRoom) features.push('Security Room Available');
    if (details.previousConstruction && details.previousConstruction !== 'none') features.push(`Previous Construction: ${details.previousConstruction}`);
    // Add rent/sell-specific features
    if (listing === 'rent' && type == 'plot') {
      if (typeof rent.expectedRent !== 'undefined') features.push(`Expected Rent: ₹${rent.expectedRent}`);
      if (typeof securityDeposit !== 'undefined') features.push(`Security Deposit: ₹${securityDeposit}`);
      if (rent.isNegotiable) features.push('Rent is Negotiable');
      if (rent.rentType) features.push(`Rent Type: ${rent.rentType}`);
    }
    if (listing === 'sell' && type == 'plot') {
      if (typeof price !== 'undefined') features.push(`Sell Price: ₹${price}`);
    }
    if (listing === 'lease' && type == 'agriculture') {
      if (typeof price !== 'undefined') features.push(`Lease Price: ₹${price}`);
    }
    return (
      <div>
        <h3>Commercial Plot Details</h3>
        <div><strong>Title:</strong> {property.basicInformation?.title}</div>
        <div><strong>Total Area:</strong> {details.totalArea}</div>
        <div><strong>Zoning Type:</strong> {details.zoningType}</div>
        {details.zoninginformation && (
          <div><strong>Zoning Information:</strong> {details.zoninginformation}</div>
        )}
        <div><strong>Boundary Wall:</strong> {details.boundaryWall ? 'Yes' : 'No'}</div>
        <div><strong>Water & Sewer:</strong> {details.waterSewer ? 'Yes' : 'No'}</div>
        <div><strong>Electricity:</strong> {details.electricity ? 'Yes' : 'No'}</div>
        <div><strong>Road Access:</strong> {details.roadAccess}</div>
        <div><strong>Security Room:</strong> {details.securityRoom ? 'Yes' : 'No'}</div>
        <div><strong>Previous Construction:</strong> {details.previousConstruction}</div>
        {isRent && (
          <>
            <div><strong>Expected Rent:</strong> ₹{rent.expectedRent}</div>
            <div><strong>Rent Negotiable:</strong> {rent.isNegotiable ? 'Yes' : 'No'}</div>
            <div><strong>Rent Type:</strong> {rent.rentType}</div>
            <div><strong>Security Deposit:</strong> ₹{securityDeposit}</div>
          </>
        )}
        {issell && (
          <>
            <div><strong>sell Price:</strong> ₹{price}</div>
          </>
        )}
       
      </div>
    );
  };



  useEffect(() => {
    const fetchPropertyDetails = async () => {

      try {
        const response = await axios.get(`/api/${category}/${listing}/${type}/${propertyId}`);
        console.log(response);
        setProperty(response.data.data);
        setRentplotproperty(response.data.data);
        setsellplotproperty(response.data.data);
        setPropertyMedia(response.data.data.media);
        setLeaseagricultureproperty(response.data.data);
        setLeaseplotproperty(response.data.data);

        setLoading(false);

      } catch (err) {
        console.log(err);
      }
    };

    fetchPropertyDetails();
  }, [propertyId]);

  console.log(property);
  if (listing === 'rent') {
    // Support both new and legacy data shapes
    const expectedRent = property?.rent?.expectedRent ?? property?.rent?.expectedRent;
    console.log(expectedRent);
  }

  // Helper to flatten and normalize all possible image arrays from property objects
  function getAllImages() {
    const sources = [
      property?.media?.photos,
      rentplotproperty?.media?.photos,
      sellplotproperty?.media?.photos
    ];
    let allImages: string[] = [];
    for (const src of sources) {
      if (!src) continue;
      if (Array.isArray(src)) {
        // If it's already an array of strings (rare)
        allImages = allImages.concat(src.filter(Boolean));
      } else if (typeof src === 'object') {
        // If it's an object of arrays (common)
        for (const arr of Object.values(src)) {
          if (Array.isArray(arr)) {
            allImages = allImages.concat(arr.filter(Boolean));
          }
        }
      }
    }
    // Remove duplicates and falsy values
    return Array.from(new Set(allImages)).filter(Boolean);
  }

  const images = getAllImages();

  // For displaying rent or sell price in the UI
  const expectedRent = property?.rent?.expectedRent;
  const propertyPrice = property?.pricingDetails?.propertyPrice;

  // Render the correct fields based on type
  let propertyFields = null;
  if (type === 'AG') {
    propertyFields = <AgricultureFields property={property} />;
  } else if (type === 'PL') {
    propertyFields = <PlotFields property={property} />;
  }

  const selectedImage = images[selectedImageIndex] || '';
  const handlePrevImage = () => {
    setSelectedImageIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };


  return (
    <div className="min-h-screen bg-white py-4 sm:py-8">
      <div className="mx-auto px-2 max-w-[1600px]">
        {/* Property Title Section */}
        <div className="mb-6">
          {loading ? (
            <div className="text-center py-10 text-gray-500">Loading property details...</div>
          ) : !property ? (
            <div className="text-center py-10 text-red-500">No property data found.</div>
          ) : (
            <>
              <h1 className="text-2xl sm:text-3xl font-bold text-black">{type === 'agriculture' ? property?.basicInformation?.title || '' : listing === 'rent' ? rentplotproperty?.basicInformation?.title : sellplotproperty?.basicInformation?.title}</h1>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">
                    {(() => {
                      if (type === 'agriculture') {
                        const address = property?.basicInformation?.address;
                        return address ? `${address.street || ''}, ${address.city || ''}, ${address.state || ''} ${address.zipCode || ''}`.replace(/^, | ,| , | $/g, '') : '';
                      } else if (listing === 'rent') {
                        const address = rentplotproperty?.basicInformation?.address;
                        return address ? `${address.street || ''}, ${address.city || ''}, ${address.state || ''} ${address.zipCode || ''}`.replace(/^, | ,| , | $/g, '') : '';
                      } else if(listing === 'sell'){
                        const address = sellplotproperty?.basicInformation;

                        return `${address?.address || ''}, ${address?.city || ''}, ${address?.state || ''} ${address?.zipCode || ''}`.replace(/^, | ,| , | $/g, '') || '';

                      }else if(listing === 'lease') {
                        const address = leaseplotproperty?.basicInformation?.address;

                        return `${address?.street || ''}, ${address?.city || ''}, ${address?.state || ''} ${address?.zipCode || ''}`.replace(/^, | ,| , | $/g, '');

                      }
                    })()}
                  </span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Image Gallery Section */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-8">
          <div className="p-4 sm:p-6">
            <h2 className="text-2xl font-bold text-black mb-6">Plot Gallery</h2>
            {/* Mobile Image Gallery */}
            <div className="block lg:hidden">
              <div className="relative h-[300px] sm:h-[400px] rounded-lg overflow-hidden group mb-4">
                <img
                  src={selectedImage}
                  alt="Selected plot view"
                  className="w-full h-full object-cover"
                />

                {/* Navigation Buttons */}
                <div className="absolute inset-0 flex items-center justify-between p-4">
                  <button
                    onClick={handlePrevImage}
                    className="bg-black/50 hover:bg-black text-white rounded-full p-2 backdrop-blur-sm transition-colors"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="bg-black/50 hover:bg-black text-white rounded-full p-2 backdrop-blur-sm transition-colors"
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </div>

                {/* Image Counter */}
                <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full backdrop-blur-sm">
                  {selectedImageIndex + 1} / {images.length}
                </div>
              </div>

              {/* Mobile Thumbnail Scroll */}
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {images.map((image: string, index: number) => (
                  <div
                    key={index}
                    className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden cursor-pointer transition-all ${selectedImageIndex === index ? 'ring-2 ring-black' : 'hover:opacity-90'
                      }`}
                    onClick={() => setSelectedImageIndex(index)}
                  >
                    <img
                      src={image}
                      alt={`Plot view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop Image Gallery */}
            <div className="hidden lg:flex gap-4">
              {/* Main Image */}
              <div className="w-2/3">
                <div className="relative h-[450px] rounded-lg overflow-hidden group">
                  <img
                    src={selectedImage}
                    alt="Selected plot view"
                    className="w-full h-full object-cover"
                  />

                  {/* Navigation Buttons */}
                  <div className="absolute inset-0 flex items-center justify-between p-4">
                    <button
                      onClick={handlePrevImage}
                      className="bg-black hover:bg-gray-900 text-white rounded-full p-2 transition-colors"
                    >
                      <ChevronLeft className="h-7 w-6" />
                    </button>


                    <button
                      onClick={handleNextImage}
                      className="bg-black hover:bg-gray-900 text-white rounded-full p-2 transition-colors"
                    >
                      <ChevronRight className="h-7 w-6" />
                    </button>


                  </div>

                  {/* Image Counter */}
                  <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full backdrop-blur-sm">
                    {selectedImageIndex + 1} / {images.length}
                  </div>
                </div>
              </div>

              {/* Side Image Stacks */}
              <div className="w-1/3 flex gap-4">
                {/* First Stack */}
                <div className="w-1/2 space-y-4">
                  {images.slice(0, 3).map((image: string, index: number) => (
                    <div
                      key={index}
                      className={`relative h-[140px] rounded-lg overflow-hidden cursor-pointer transition-all ${selectedImageIndex === index ? 'ring-2 ring-black' : 'hover:opacity-90'
                        }`}
                      onClick={() => setSelectedImageIndex(index)}
                    >
                      <img
                        src={image}
                        alt={`Plot view ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                {/* Second Stack */}
                <div className="w-1/2 space-y-4">
                  {images.slice(3, 6).map((image: string, index: number) => (
                    <div
                      key={index + 3}
                      className={`relative h-[140px] rounded-lg overflow-hidden cursor-pointer transition-all ${selectedImageIndex === index + 3 ? 'ring-2 ring-black' : 'hover:opacity-90'
                        }`}
                      onClick={() => setSelectedImageIndex(index + 3)}
                    >
                      <img
                        src={image}
                        alt={`Plot view ${index + 4}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Property Address and Map Section */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-8">
          <div className="p-4 sm:p-6">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Address Section */}
              <div className="md:w-1/2">
                <div className="flex items-start gap-3">
                  <MapPin className="h-6 w-6 text-gray-400 mt-1" />
                  <div>
                    <h2 className="text-2xl font-bold text-black mb-2">Property Address</h2>
                    <p className="text-gray-600">{type === 'agriculture' ? property?.basicInformation?.address?.street : 
                    listing === 'rent' ? rentplotproperty?.basicInformation?.address?.street : listing === 'sell' ? 
                    sellplotproperty?.basicInformation?.state : listing === 'lease' ? 
                    leaseplotproperty?.basicInformation?.address?.street : ''}, 
                    {type === 'agriculture' ? property?.basicInformation?.address?.city : listing === 'rent' ? rentplotproperty?.basicInformation?.address?.city : listing === 'sell' ? sellplotproperty?.basicInformation.city : listing === 'lease' ? 
                    leaseplotproperty?.basicInformation?.address?.city : ''}, {type === 'agriculture' ? property?.basicInformation?.address?.state : listing === 'rent' ? rentplotproperty?.basicInformation?.address?.state : listing === 'sell' ? sellplotproperty?.basicInformation?.state : listing === 'lease' ? leaseplotproperty?.basicInformation?.address?.state : ''}, {type === 'agriculture' ? property?.basicInformation?.address?.zipCode : listing === 'rent' ? rentplotproperty?.basicInformation?.address?.zipCode : listing === 'sell' ? sellplotproperty?.basicInformation?.zipCode : listing === 'lease' ? leaseplotproperty?.basicInformation?.address?.zipCode : ''}</p>
                  </div>
                </div>
              </div>

              {/* Map Section */}
              <div className="md:w-1/2 h-[300px] rounded-lg overflow-hidden">
                <iframe
                  src={`https://maps.google.com/maps?q=${property?.basicInformation?.location?.latitude || ''},${property?.basicInformation?.location?.longitude || ''}&z=15&output=embed`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Property Location"
                  className="rounded-lg"
                ></iframe>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="p-4 sm:p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8">
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h3 className="text-sm font-medium text-gray-500">Total Area</h3>
                    <p className="text-lg font-semibold text-black">
                      {type === 'agriculture' ? property?.Agriculturelanddetails?.totalArea || '' : listing === 'rent' ? rentplotproperty?.propertyDetails?.totalArea || '' : listing === 'sell' ? sellplotproperty?.plotDetails.totalArea : leaseplotproperty?.plotDetails.totalPlotArea || ''}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h3 className="text-sm font-medium text-gray-500">Price</h3>
                    <p className="text-lg font-semibold text-black">
                      {(() => {
                        if (type === 'agriculture') {
                          return listing !== 'lease'
                            ? property?.price?.expectedPrice || property?.rent?.expectedRent || 'N/A'
                            : leaseagricultureproperty?.leaseTerms?.leaseAmount?.amount || 'N/A';
                        }
                        if (listing === 'rent') {
                          return rentplotproperty?.rentalTerms?.rentDetails?.expectedRent || 'N/A';
                        }
                        if (listing === 'sell') {
                          return sellplotproperty?.pricingDetails?.propertyPrice
                            ?? sellplotproperty?.pricingDetails?.totalPrice
                            ?? sellplotproperty?.pricingDetails?.pricePerSqFt
                            ?? 'N/A';
                        }
                        if (listing === 'lease') {
                          return leaseplotproperty?.leaseTerms?.leaseAmount?.amount || 'N/A';
                        }
                        return 'N/A';
                      })()}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h3 className="text-sm font-medium text-gray-500">{type === 'agriculture' ? 'Land Type' : 'price type'}</h3>
                    <p className="text-lg font-semibold text-black">{(() => {
                      if (type === 'agriculture') {
                        return property?.Agriculturelanddetails?.soilType || 'N/A';
                      }
                      if (listing === 'rent') {
                        return rentplotproperty?.rentalTerms?.rentDetails?.rentType || 'N/A';
                      }
                      if (listing === 'sell') {
                        return sellplotproperty?.pricingDetails?.priceType || 'N/A';
                      }
                      if (listing === 'lease') {
                        return leaseplotproperty?.leaseTerms?.leaseAmount?.amountType || 'N/A';
                      }
                      return 'N/A';
                    })()}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h3 className="text-sm font-medium text-gray-500">{type === 'agriculture' ? 'Soil Type' : 'Zoning Type'}</h3>
                    <p className="text-lg font-semibold text-black">{(() => {
                      if (type === 'agriculture') {
                        return property?.Agriculturelanddetails?.soilType || 'N/A';
                      }
                      if (listing === 'rent') {
                        return rentplotproperty?.propertyDetails?.zoningType || 'N/A';
                      }
                      if (listing === 'sell') {
                        return sellplotproperty?.plotDetails?.zoningType || 'N/A';
                      }
                      if (listing === 'lease') {
                        return leaseplotproperty?.leaseTerms?.leaseAmount?.amountType || 'N/A';
                      }
                      return 'N/A';
                    })()}</p>
                  </div>
                </div>

                <div className="mb-8">
                  <h2 className="text-lg sm:text-xl font-semibold text-black mb-4">{type === 'agriculture' ? 'Water Source' : 'road access'}</h2>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <p className="text-gray-800">{type === 'agriculture' ? property?.Agriculturelanddetails?.waterSource || '' : listing === 'rent' ? rentplotproperty?.propertyDetails?.roadAccess || '' : sellplotproperty?.plotDetails?.roadAccess || ''}</p>
                  </div>
                </div>

                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    {/* <h2 className="text-lg sm:text-xl font-semibold text-black">Features</h2>
                    <button
                      onClick={() => setShowAllFeatures(!showAllFeatures)}
                      className="text-gray-600 hover:text-gray-900 flex items-center gap-1"
                    >
                      {showAllFeatures ? 'Show Less' : 'View All Features'}
                      <ChevronDown className={`h-5 w-5 transition-transform ${showAllFeatures ? 'rotate-180' : ''}`} />
                    </button> */}
                  </div>
                  <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 transition-all duration-300 ${showAllFeatures ? '' : 'max-h-[120px] overflow-hidden'}`}>
                    {property && (() => {
                      const features: string[] = [];

                      return type == 'agriculture' && features.length > 0 ? features.map((feature, index) => (
                        <div key={index} className="flex items-center bg-gray-50 p-4 rounded-lg border border-gray-200">
                          <div className="h-2 w-2 bg-black rounded-full mr-3"></div>
                          <span className="text-gray-800">{feature}</span>
                        </div>
                      )) : <span className="text-gray-500">No notable features listed.</span>;
                    })()}
                  </div>
                  {!showAllFeatures && (
                    <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white pointer-events-none"></div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Pricing Card - Sticky on Desktop, Modal on Mobile */}
          <div className="lg:col-span-1">
            <PricingCard 
              property={listing === 'sell' ? sellplotproperty : 
                        listing === 'rent' ? rentplotproperty : 
                        listing === 'lease' && type === 'AG' ? leaseagricultureproperty : 
                        leaseplotproperty}
              listing={listing}
              type={type}
              onEnquireClick={() => {
                setSelectedProperty(listing === 'sell' ? sellplotproperty : 
                                 listing === 'rent' ? rentplotproperty : 
                                 listing === 'lease' && type === 'AG' ? leaseagricultureproperty : 
                                 leaseplotproperty);
                setShowEnquiryForm(true);
              }}
            />
                    {listing == "rent" && type == "plots" && (
                      <div className="p-4 bg-white rounded-xl shadow-md w-full max-w-md">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Pricing Details</h2>
                        <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-sm">
                          <div className="text-gray-600 font-semibold">Excepted rent</div>
                          <div className="text-black font-bold">₹{rentplotproperty?.rentalTerms?.rentDetails?.expectedRent}</div>

                          <div className="text-gray-600 font-semibold">Rent Type</div>
                          <div className="text-black font-bold">{rentplotproperty?.rentalTerms?.rentDetails?.rentType}</div>
                        </div>
                      </div>
                    )}
                    {type == "agriculture" && listing != "lease" && (
                      <div className="p-4 bg-white rounded-xl shadow-md w-full max-w-md">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Pricing Details</h2>
                        <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-sm">
                          <div className="text-gray-600 font-semibold">Property Price</div>
                          <div className="text-black font-bold">₹{property?.price?.expectedPrice || property?.rent?.expectedRent}</div>

                          <div className="text-gray-600 font-semibold">Price Type</div>
                          <div className="text-black font-bold">{property?.price?.isNegotiable ? "Not Negotiable" : "Negotiable"}</div>
                        </div>
                      </div>
                    )}
                    {type == "agriculture" && listing == "lease" && (
                      <div className="p-4 bg-white rounded-xl shadow-md w-full max-w-md">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Pricing Details</h2>
                        <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-sm">
                          <div className="text-gray-600 font-semibold">Lease Amount</div>
                          <div className="text-black font-bold">₹{leaseagricultureproperty?.leaseTerms?.leaseAmount?.amount}</div>

                          
                        </div>
                      </div>
                    )}

                    {listing === 'lease' && type !== "agriculture" && (
                      <div className="space-y-2 w-full">
                        <div className="flex justify-between">
                          <span className="text-black font-bold">Lease Amount:</span>
                          <span className="text-black font-bold">{leaseplotproperty?.leaseTerms?.leaseAmount?.amount}</span>
                        </div>
                        
                        

                      </div>
                    )}
{/* Enquiry Form Modal */}
{showEnquiryForm && (
        <EnquiryForm
          onClose={() => setShowEnquiryForm(false)}
        />
      )}
    </div>  {/* ← closes the outermost <div className="min-h-screen …"> */}



                  </div>
                </div>
              </div>
  )
};

export default PlotManagement;