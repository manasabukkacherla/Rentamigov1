export interface PropertyImage {
  id: string;
  url: string;
  category: string;
}

export interface PropertyDetails {
  // Basic information
  configuration: string;
  furnishingStatus: string;
  size: string;
  availabilityDate: string;

  // Media
  video: string;
  images: PropertyImage[];

  // Amenities and features
  flatAmenities: string[];
  societyAmenities: string[];
  restrictions: string[];
  features: string[];
}