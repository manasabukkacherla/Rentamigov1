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
}

export interface DashboardStats {
  totalProperties: number;
  totalLeads: number;
  availableProperties: number;
  rentedProperties: number;
}

export interface User {
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