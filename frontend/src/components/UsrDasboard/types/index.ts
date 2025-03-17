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