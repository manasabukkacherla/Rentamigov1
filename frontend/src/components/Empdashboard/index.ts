export interface Property {
  id: string;
  // Base Property
  propertyName: string;
  ownerType: 'individual' | 'company';
  propertyDescription: string;
  
  // Property Details
  listingType: 'rent' | 'sale';
  propertyType: 'apartment' | 'villa' | 'house' | 'plot';
  societySize: string;
  city: string;
  projectName: string;
  
  // Property Features
  bedrooms: number;
  bathrooms: number;
  balconies: number;
  floorOfTheProperty: number;
  totalNoOfFloors: number;
  superBuiltUp: number;
  builtUp: number;
  carpetArea: number;
  ageOfTheProperty: number;
  furnishingStatus: 'furnished' | 'semi-furnished' | 'unfurnished';
  facing: 'north' | 'south' | 'east' | 'west';
  
  // Amenities
  societyAmenities: string[];
  flatAmenities: string[];
  
  // Photos
  photos: {
    cardPhoto: string;
    livingRoom: string[];
    kitchen: string[];
    bedrooms: string[];
    bathrooms: string[];
    balcony: string[];
    exterior: string[];
  };
  
  // Location
  address: {
    line1: string;
    line2?: string;
    line3?: string;
    latitude: number;
    longitude: number;
    locality: string;
    area: string;
    pinCode: string;
  };
  
  // Commercials
  monthlyRent: number;
  maintenance: boolean;
  maintenanceAmount?: number;
  maintenanceFrequency?: 'monthly' | 'quarterly' | 'yearly';
  securityDeposit: number;
  
  // Restrictions
  bachelorTenants: boolean;
  nonVegTenants: boolean;
  tenantWithPets: boolean;
  propertyOverlooking: string[];
  carParking: boolean;
  twoWheelerParking: boolean;
  flooringType: string;
  
  // System fields
  createdAt: string;
  status: 'draft' | 'published' | 'archived';
}

export interface User {
  name: string;
  role: string;
}

export type Theme = 'light' | 'dark';

export interface FormStep {
  title: string;
  description: string;
  fields: string[];
}

export type StepId = 
  | 'base'
  | 'details'
  | 'features'
  | 'amenities'
  | 'photos'
  | 'location'
  | 'commercials'
  | 'restrictions';