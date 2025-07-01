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