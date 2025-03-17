export interface Property {
  id: string;
  name: string;
  rent: number;
  status: 'Available' | 'Rented' | 'Pending';
  imageUrl: string;
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
}

export interface DashboardStats {
  totalProperties: number;
  totalLeads: number;
  availableProperties: number;
  rentedProperties: number;
}

export interface User {
  id: string;
  fullName: string;
  username: string;
  email: string;
  role: string;
  photoUrl: string;
  tokens: number;
  plan: 'free' | 'basic' | 'premium' | 'enterprise';
  planExpiry: string;
  phone: string;
  company: string;
  address: string;
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