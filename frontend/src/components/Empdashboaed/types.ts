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

export interface Employee {
  id: string;
  name: string;
  role: string;
  email: string;
  avatar?: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  propertyInterest: string;
  status: LeadStatus;
  priority: string;
  createdAt: string;
}

export type LeadStatus = 'new' | 'contacted' | 'viewing-scheduled' | 'negotiating' | 'converted' | 'lost';

export interface DashboardStats {
  totalProperties: number;
  activeProperties: number;
  rentedProperties: number;
  monthlyRevenue: number;
  revenueHistory: Array<{
    month: string;
    rental: number;
    maintenance: number;
    deposits: number;
  }>;
  propertyTypes: Array<{
    type: string;
    count: number;
  }>;
  leads: Lead[];
}
