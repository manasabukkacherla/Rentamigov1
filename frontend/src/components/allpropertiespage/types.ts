// Property-related Union Types
export type PropertyType =
  | 'Apartment'
  | 'House'
  | 'Villa'
  | 'PG'
  | 'Studio'
  | 'Penthouse'
  | 'Standalone Building'
  | 'Agricultural';

export type ListingType = 'Owner' | 'Agent' | 'PG' | 'RentAmigo';

export type FurnishingType =
  | 'Fully Furnished'
  | 'Semi Furnished'
  | 'Partially Furnished'
  | 'Unfurnished';

// export type BHKType =
//   | '1 RK'
//   | '1 BHK'
//   | '2 BHK'
//   | '3 BHK'
//   | '4 BHK'
//   | '4+ BHK';

export type SharingType =
  | '1 Share'
  | '2 Share'
  | '3 Share'
  | '4 Share'
  | '4+ Share';

export type PropertyStatus = 'Available' | 'Rented' | 'Under Maintenance';

export type PropertyIntent = 'Rent' | 'Sale' | 'Lease';

// Search Criteria used in filters/search
export interface SearchCriteria {
  location: string | null;
  propertyType: PropertyType | null;
  propertyTypes?: PropertyType[]; // For multiple property type filtering
  // bhkType: BHKType | null;
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
  // bathrooms: number | null;
  listingTypes: ListingType[];
  sharing: SharingType | null;
}

// Active filter state
export interface Filters {
  listingTypes: ListingType[];
  propertyTypes: PropertyType[];
  furnishingTypes: FurnishingType[];
  sharingTypes: SharingType[];
  priceRange: {
    min: number | null;
    max: number | null;
  };
  category: string[];
}

// Filter Section Props
type FilterSectionType = keyof Filters;

export interface FilterSectionProps {
  title: string;
  items: string[];
  type: FilterSectionType;
}

interface PropertyMetadata {
  createdBy?: string;
  createdAt?: string; // Store as ISO string
  contact?: {
    name?: string;
    email?: string;
    phone?: string;
  };
  postedBy?: {
    type?: string;
    name?: string;
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
  furnishing: FurnishingType;
  area: number;
  image: string;
  postedDate: string;
  sharing?: SharingType;
  status: PropertyStatus;
  intent: PropertyIntent;
  metadata?: PropertyMetadata;
  createdBy: string;
  
  // Additional properties for property details
  basicInformation?: {
    title: string;
    location: {
      address?: string;
      formattedAddress?: string;
      latitude?: number;
      longitude?: number;
      [key: string]: any;
    };
    [key: string]: any;
  };
  
  rentalTerms?: {
    price: number;
    [key: string]: any;
  };
  
  availability?: {
    status: string;
    [key: string]: any;
  };
  
  [key: string]: any; // Allow additional properties
}