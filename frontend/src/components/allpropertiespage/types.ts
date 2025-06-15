// Property-related Union Types
export type PropertyType =
  | 'Apartment'
  | 'House'
  | 'Villa'
  | 'PG'
  | 'Studio'
  | 'Penthouse'
  | 'Standalone Building'
  | 'Agricultural'
  | 'Office Space'
  | 'Retail Store'
  | 'Shop'
  | 'Warehouse'
  | 'Shed'
  | 'Covered Space'
  | 'Showroom'
  | 'Plot';

export type PropertyCategory = 'Residential' | 'Commercial';

export type PropertyIntent = 'Rent' | 'Sale' | 'Lease';

export type ListingType = 'Owner' | 'Agent' | 'PG' | 'RentAmigo';

export type FurnishingType =
  | 'Fully Furnished'
  | 'Semi Furnished'
  | 'Partially Furnished'
  | 'Unfurnished';

export type BHKType =
  | '1 RK'
  | '1 BHK'
  | '2 BHK'
  | '3 BHK'
  | '4 BHK'
  | '4+ BHK';

export type SharingType =
  | '1 Share'
  | '2 Share'
  | '3 Share'
  | '4 Share'
  | '4+ Share';

export type PropertyStatus = 'Available' | 'Rented' | 'Under Maintenance';

// Commercial Property Types
export interface CommercialPropertyType {
  Agriculture: {
    landDetails: {
      totalArea: number;
    };
  };
  CoveredSpace: {
    area: {
      totalArea: number;
    };
  };
  OfficeSpace: {
    area: {
      totalArea: number;
    };
  };
  Others: {
    area: {
      totalArea: number;
    };
  };
  RetailStore: {
    area: {
      totalArea: number;
    };
  };
  Shed: {
    propertySize: number;
  };
  Warehouse: {
    area: {
      totalArea: number;
    };
  };
  Plot: {
    area: {
      totalArea: number;
    };
  };
  Shop: {
    area: {
      totalArea: number;
    };
  };
  Showroom: {
    area: {
      totalArea: number;
    };
  };
}

// Base Property Interface
export interface BaseProperty {
  _id?: string;
  propertyId: string;
  title: string;
  basicInformation?: {
    title?: string;
    address?: {
      city?: string;
      state?: string;
    };
  };
  metadata?: {
    propertyName?: string;
    propertyType?: PropertyType;
    intent?: PropertyIntent;
    createdAt?: Date;
  };
  propertyDetails?: {
    area?: {
      totalArea?: number;
    };
    bathrooms?: number;
    furnishingStatus?: FurnishingType;
  };
  media?: {
    photos?: {
      exterior?: string[];
    };
  };
  rent?: {
    expectedRent: number;
  };
  leaseAmount?: {
    amount: number;
  };
  availability?: {
    type: PropertyStatus;
  };
}

// Unified Property Card Interface
export interface Property {
  id: string;
  propertyId: string;
  title: string;
  location: string;
  propertyName: string;
  type: PropertyType;
  listingType: ListingType;
  price: number;
  area: number;
  image: string;
  postedDate: string;
  status: PropertyStatus;
  intent: PropertyIntent;
  bathrooms: number;
  furnishing: FurnishingType;
}

// Property Response Interface
export interface PropertyResponse {
  success: boolean;
  message: string;
  data: {
    commercialRent: {
      agriculture: Property[];
      coveredSpace: Property[];
      officeSpace: Property[];
      others: Property[];
      retailStore: Property[];
      shed: Property[];
      warehouse: Property[];
      plot: Property[];
      shop: Property[];
      showroom: Property[];
    };
  };
}

// Search Criteria used in filters/search
export interface SearchCriteria {
  location: string | null;
  propertyType: PropertyType | null;
  bhkType: BHKType | null;
  priceRange: {
    min: number | null;
    max: number | null;
    strict: boolean;
  };
  areaRange: {
    min: number | null;
    max: number | null;
    exact: number | null;
    strict: boolean;
    type: 'more' | 'atleast' | 'less' | 'between' | 'around' | 'exact' | null;
  };
  furnishing: FurnishingType | null;
  strict: boolean;
  bathrooms: number | null;
  listingTypes: ListingType[];
  sharing: SharingType | null;
}

// Active filter state
export interface Filters {
  listingTypes: ListingType[];
  propertyTypes: PropertyType[];
  furnishingTypes: FurnishingType[];
  bhkTypes: BHKType[];
  sharingTypes: SharingType[];
  priceRange: {
    min: number | null;
    max: number | null;
  };
}

// Unified Property Card Interface
export interface Property {
  id: string;
  propertyId: string;
  title: string;
  type: PropertyType;
  propertyName: string;
  listingType: ListingType;
  price: number;
  location: string;
  // bhkType: BHKType;
  bathrooms: number;
  furnishing: FurnishingType;
  area: number;
  image: string;
  postedDate: string;
  sharing?: SharingType;
  status: PropertyStatus;
  intent: PropertyIntent;
}
