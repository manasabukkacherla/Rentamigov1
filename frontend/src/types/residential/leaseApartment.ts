export interface IBasicInformation {
  propertyId?: string;
  title: string;
  showflat: boolean;
  apartmentType: string;
  flatno: number;
  floor: number;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    location: {
      latitude: string;
      longitude: string;
      locationLabel: string;
    }
  };
}

export interface PropertyDetails {
  propertysize: number;
  bedrooms: number;
  washrooms: number;
  bathrooms: number;
  balconies: number;
  parkingdetails: 'yes' | 'No';
  ExtraRooms: string[];
  utility: 'Yes' | 'No';
  Furnishingstatus: 'Unfurnished' | 'Semi-Furnished' | 'Fully-Furnished';
  totalfloors: number;
  propertyonfloor: number;
  propertyfacing: string;
  propertyage: string;
  superareasqft: number;
  superareasqmt: number;
  builtupareasqft: number;
  builtupareasqmt: number;
  carpetareasqft: number;
  carpetareasqmt: number;
  electricityavailability: string;
  wateravailability: string[];
}

export interface FlatAmenities {
  lights: number;
  geysers: number;
  lofts: number;
  clothHanger: number;
  cotWithMattress: number;
  airConditioner: number;
  exhaustFan: number;
  ceilingFan: number;
  wardrobes: number;
  kitchenCabinets: number;
  diningTableWithChairs: number;
  sideTable: number;
  desertCooler: number;
}

export interface LeaseDetails {
  monthlyRent: number;
  securityDeposit: number;
  maintenanceCharges: {
    amount: number;
    type: 'monthly' | 'quarterly' | 'yearly';
  };
  leaseDuration: {
    minimumDuration: number;
    maximumDuration: number;
    durationUnit: 'months' | 'years';
  };
  rentNegotiable: boolean;
  additionalCharges: {
    waterCharges: {
      type: 'inclusive' | 'exclusive';
      amount: number;
    };
    electricityCharges: {
      type: 'inclusive' | 'exclusive';
      amount: number;
    };
    gasCharges: {
      type: 'inclusive' | 'exclusive';
      amount: number;
    };
    otherCharges: {
      type: 'inclusive' | 'exclusive';
      amount: number;
    };
  };
  brokerage: {
    type: 'yes' | 'no';
    amount: number;
  };
}

export interface SocietyAmenitiesType {
  availableitems: string[];
  securityandsafety: string[];
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

export interface Media {
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

export interface Availability {
  availablefrom: string;
  date: string;
  type?: 'immediate' | 'specific';
}

export interface FormData {
  propertyId?: string;
  basicInformation: IBasicInformation;
  propertyDetails: PropertyDetails;
  availableitems: SocietyAmenitiesType;
  flatamenities: FlatAmenities;
  leaseDetails: LeaseDetails;
  media: Media;
  availability: Availability;
} 