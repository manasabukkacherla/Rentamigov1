export interface PropertyMedia {
  photos: {
    exterior: string[];
    interior: string[];
    floorPlan: string[];
    washrooms?: string[];
    lifts?: string[];
    emergencyExits?: string[];
    aerial?: string[];
    surroundings?: string[];
  };
  videoTour?: string;
  documents: string[];
}

export interface PropertyImage {
  id: string;
  url: string;
  category: keyof PropertyMedia['photos'];
  title?: string;
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