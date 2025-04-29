export type PropertyType = 'Apartment' | 'House' | 'Villa' | 'PG' | 'Studio' | 'Penthouse' | 'Standalone Building';
export type ListingType = 'Owner' | 'Agent' | 'PG' | 'RentAmigo';
export type FurnishingType = 'Fully Furnished' | 'Semi Furnished' | 'Partially Furnished' | 'Unfurnished';
export type BHKType = '1 RK' | '1 BHK' | '2 BHK' | '3 BHK' | '4 BHK' | '4+ BHK';
export type SharingType = '1 Share' | '2 Share' | '3 Share' | '4 Share' | '4+ Share';
export type PropertyStatus = 'Available' | 'Rented' | 'Under Maintenance';
export type PropertyIntent = 'Rent' | 'Sale' | 'Lease';

export interface SearchCriteria {
  location: string | null;
  propertyType: string | null;
  bhkType: string | null;
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
  furnishing: string | null;
  strict: boolean;
  bathrooms: number | null;
  listingTypes: string[];
  sharing: SharingType | null;
}

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