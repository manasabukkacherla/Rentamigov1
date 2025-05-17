// Property-related Union Types
export type PropertyType =
  | 'Agricultural'
  | 'Shop'
  | 'Retail Store'
  | 'Showroom'
  | 'Shed'
  | 'Warehouse'
  | 'Office Space'
  | 'Plot'
  | 'Covered Space (Rent)'
  | 'Agricultural Land (Rent)'
  | 'Warehouse (Rent)'
  | 'Office Space (Rent)'
  | 'Shop (Rent)'
  | 'Showroom (Rent)'
  | 'Shed (Rent)'
  | 'Plot (Rent)'
  | 'Shop (Sell)'
  | 'Agriculture (Sell)'
  | 'Office Space (Sell)'
  | 'Retail Store (Sell)'
  | 'Plot (Sell)'
  | 'Standalone Building (Rent)'
  | 'Standalone Building'
  | 'Residential Apartment (Sale)'
  | 'Residential Sale Builder Floor'
  | 'Residential Apartment (Rent)'
  | 'Residential Rent Builder Floor'
  | 'Residential Rent Independent House'
  | 'Residential Lease Independent House'
  | 'Residential Lease Apartment'
  | 'Residential Lease Builder Floor'
  | 'Residential Sale Plot'
  | 'Residential Sale Independent House'
  | 'Commercial Sale Warehouse'
  | 'Commercial Sale Shop'
  | 'Commercial Sale Showroom';


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

export type PropertyIntent = 'Rent' | 'Sale' | 'Lease';

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
  title: string;
  type: PropertyType;
  listingType: ListingType;
  price: number;
  location: string;
  bhkType: BHKType;
  bathrooms: number;
  furnishing: FurnishingType;
  area: number;
  image: string;
  postedDate: string;
  sharing?: SharingType;
  status: PropertyStatus;
  intent: PropertyIntent;
}
