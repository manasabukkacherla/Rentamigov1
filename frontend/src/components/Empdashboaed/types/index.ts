export interface Property {
  id: string;
  name: string;
  location: string;
  status: 'Available' | 'Rented' | 'Under Maintenance';
  type: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'suspended' | 'blocked';
  subscriptionType: 'trial' | 'basic' | 'premium';
  subscriptionStart: string;
  subscriptionEnd: string;
  lastActive: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  propertyInterest: string;
  status: 'new' | 'contacted' | 'viewing-scheduled' | 'negotiating' | 'converted' | 'lost';
  priority: 'high' | 'medium' | 'low';
  createdAt: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  read: boolean;
  timestamp: string;
}

export interface RevenueData {
  month: string;
  rental: number;
  maintenance: number;
  deposits: number;
}

export interface DashboardStats {
  totalProperties: number;
  activeProperties: number;
  rentedProperties: number;
  monthlyRevenue: number;
  occupancyRate: number;
  propertyTypes: {
    type: string;
    count: number;
  }[];
  revenueHistory: RevenueData[];
  leads: Lead[];
}
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  read: boolean;
  timestamp: string;
}