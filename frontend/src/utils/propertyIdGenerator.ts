import { v4 as uuidv4 } from 'uuid';

interface PropertyType {
  type: 'residential' | 'commercial';
  subtype: string;
}

interface PropertyTypeMap {
  residential: Record<string, number>;
  commercial: Record<string, number>;
}

const propertyTypeMap: PropertyTypeMap = {
  residential: {
    'apartment': 10,
    'independenthouse': 20,
    'builderfloor': 30,
    'plot': 40,
    'shared-space': 50
  },
  commercial: {
    'shop': 60,
    'retail-store': 70,
    'shed': 80,
    'warehouse': 90,
    'showroom': 100,
    'office-space': 110,
    'covered-space': 120,
    'agriculture': 130,
    'others': 140
  }
};

export const generatePropertyId = (propertyType: PropertyType): string => {
  // Get the base number for the property type
  const baseNumber = propertyTypeMap[propertyType.type]?.[propertyType.subtype] || 0;
  
  // Generate a UUID and take first 6 characters
  const uuidPrefix = uuidv4().slice(0, 6).toUpperCase();
  
  // Format the base number to always be 2 digits
  const typeSuffix = baseNumber.toString().padStart(2, '0');
  
  // Combine to create the property ID
  return `${uuidPrefix}-${typeSuffix}`;
};

// Example usage:
// const apartmentId = generatePropertyId({ type: 'residential', subtype: 'apartment' });
// const shopId = generatePropertyId({ type: 'commercial', subtype: 'shop' }); 