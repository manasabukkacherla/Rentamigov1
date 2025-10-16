import { ReactNode } from "react";

export interface Property {
  id: string;
  name: string;
  rent?: number;
  price?: number;
  status?: 'Available' | 'Rented' | 'Pending' | string;
  imageUrl?: string;
  image?: string;
  basicInformation?: any;
  propertyName?: string;
  title?: string;
  monthlyRent?: number;
  coverImage?: string;
  images?: string[];
  [key: string]: any;
}

export interface Lead {
  id: string;
  name: string;
  propertyName: string;
  email: string;
  phone: string;
  date: string;
  flatNo: string;
  status: 'New' | 'Contacted' | 'Interested' | 'Not Interested' | 'Converted' | 'Visited' | 'RNR' | 'Call Back' | 'No Requirement' | 'Different Requirement';
  createdAt: string;
}


export interface DashboardStats {
  totalProperties: number;
  totalLeads: number;
  availableProperties: number;
  rentedProperties: number;
}

export interface User {
  id: any;
  photoUrl: string | undefined;
  role: any;
  username: string | number | readonly string[] | undefined;
  phone: string | number | readonly string[] | undefined;
  company: string | number | readonly string[] | undefined;
  address: string | number | readonly string[] | undefined;
  plan: any;
  planExpiry: ReactNode;
  tokens: ReactNode;
  fullName: string;
  email: string;
  notifications: {
    emailNotifications: boolean;
    smsNotifications: boolean;
  };
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: string;
  read: boolean;
}
export interface TokenPackage {
  _id(arg0: string, _id: any): void;
  id: string;
  name: string;
  tokens: number; // Number of tokens in the package
  price: number;
  description: string;
}
export interface Plan {
  _id(arg0: string, _id: any): void;
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string; // For example: "1 month", "1 year"
}



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
  // bhkTypes: BHKType[];
  sharingTypes: SharingType[];
  priceRange: {
    min: number | null;
    max: number | null;
  };
}

// Filter Section Props
type FilterSectionType = keyof Filters;

export interface FilterSectionProps {
  title: string;
  items: string[];
  type: FilterSectionType;
}

// Unified Property Card Interface
export interface Property {
  id: string;
  propertyId: string;

  type: PropertyType;
 
  listingType: ListingType;
 
  location: string;
  // bhkType: BHKType;
  // bathrooms: number;
  furnishing: FurnishingType;
  area: number;
 
  postedDate: string;
  sharing?: SharingType;
  
  intent: PropertyIntent;
}