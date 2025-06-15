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
  url: string;
  category: keyof PropertyMedia['photos'];
  title?: string;
}

export interface ImageGalleryProps {
  images: PropertyImage[];
  onImageSelect: (url: string) => void;
}
