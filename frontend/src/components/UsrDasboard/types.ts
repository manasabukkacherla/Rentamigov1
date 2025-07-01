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
  };
  
  // Allow any other string key with any value
  [key: string]: any;
}
