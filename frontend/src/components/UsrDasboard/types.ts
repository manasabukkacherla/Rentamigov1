import { ReactNode } from "react";

// Notification Type
export interface Notification {
  id: string;
  title: string;
  message: string;
  type?: 'success' | 'error' | 'info' | 'warning';
  timestamp?: Date;
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

export type ListingType = 'Owner' | 'Agent' | 'PG' | 'RentAmigo' | 'Premium' | 'Standard';

export type FurnishingType =
  | 'Fully Furnished'
  | 'Semi Furnished'
  | 'Partially Furnished'
  | 'Unfurnished';

export type SharingType =
  | '1 Share'
  | '2 Share'
  | '3 Share'
  | '4 Share'
  | '4+ Share';

export type PropertyStatus = 'Available' | 'Rented' | 'Under Maintenance';

export type PropertyIntent = 'Rent' | 'Sale' | 'Lease';

// Plan Interface
export interface Plan {
  maxProperties: number;
  tokensPerLead: ReactNode;
  _id(arg0: string, _id: any, name: string, _id1: any): void;
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number; // in days
  isPopular?: boolean;
  features?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

// Token Package Interface
export interface TokenPackage {
  _id: string;
  bonusTokens: number;
  id: string;
  name: string;
  description: string;
  price: number;
  tokens: number;
  isPopular?: boolean;
  features?: string[];
  validityDays?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// Unified Property Card Interface
export interface Property {
  // Core required fields
  id: string;
  
  // Identification
  propertyId?: string;
  title?: string;
  name?: string;  // Made optional
  propertyName?: string;
  
  // Property details
  type?: PropertyType | string;
  listingType?: ListingType | string;
  price?: number;
  rent?: number;
  location?: string;
  furnishing?: FurnishingType | string;
  area?: number;
  
  // Media
  image?: string;
  imageUrl?: string;
  
  // Dates
  postedDate?: string | Date;
  
  // Additional info
  sharing?: SharingType | string;
  status?: PropertyStatus | string;
  intent?: PropertyIntent | string;
  
  // For backward compatibility
  basicInformation?: {
    propertyType?: string;
    furnishingStatus?: string;
    title?: string;
    propertyName?: string;
  };
  
  pgDetails?: {
    name?: string;
  };
  
  // Allow any other string key with any value
  [key: string]: any;
}
