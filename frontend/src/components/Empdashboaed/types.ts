import { PropertyType, ListingType, PropertyStatus, PropertyIntent } from '../allpropertiespage/types';

export interface Property {
  id: string;
  propertyId: string;
  title: string;
  type: PropertyType;
  propertyName: string;
  listingType: ListingType;
  price: number;
  location: string;
  furnishing: string;
  area: number;
  image: string;
  postedDate: string;
  sharing?: string;
  status: PropertyStatus;
  intent: PropertyIntent;
}
