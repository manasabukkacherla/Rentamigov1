export interface EnquiryData {
  id: string;
  name: string;
  email: string;
  phone: string;
  propertyInterest: string;
  status: string;
  priority: string;
  createdAt: string;
  updatedAt?: string;
  message?: string;
  createdBy?: string;
  propertyId?: string;
  propertyType?: string;
  propertyName?: string;
  price?: string;
}
