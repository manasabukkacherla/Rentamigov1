import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Property {
  id: string;
  title: string;
  type: string;
  listingType: string;
  price: number;
  location: string;
  area: number;
  image: string;
  postedDate: string;
  status: string;
  intent: string;
  bhkType: string;
  bathrooms: number;
  furnishing: string;
}

interface PropertyContextType {
  selectedProperty: Property | null;
  setSelectedProperty: (property: Property) => void;
}

const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

export const useProperty = (): PropertyContextType => {
  const context = useContext(PropertyContext);
  if (!context) {
    throw new Error('useProperty must be used within a PropertyProvider');
  }
  return context;
};

export const PropertyProvider = ({ children }: { children: ReactNode }) => {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  return (
    <PropertyContext.Provider value={{ selectedProperty, setSelectedProperty }}>
      {children}
    </PropertyContext.Provider>
  );
};
