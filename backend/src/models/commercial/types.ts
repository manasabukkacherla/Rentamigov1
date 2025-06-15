import { Document } from 'mongoose';

export interface ICommercialRentShowroom extends Document {
  basicInformation: {
    title: string;
  };
  metadata: {
    propertyType: string;
    propertyName: string;
  };
  propertySize: {
    area: number;
    unit: string;
  };
  propertyDetails: {
    bathrooms: number;
    bedrooms: number;
  };
  media: {
    photos: {
      exterior: string[];
    };
  };
}
