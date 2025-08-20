import Fuse from 'fuse.js';
import { Property, SearchCriteria, FurnishingType, PropertyType, ListingType } from '../types';

// Location mappings
const locationMappings: { [key: string]: string[] } = {
  'Koramangala': ['HSR Layout', 'Indiranagar', 'BTM Layout'],
  'HSR Layout': ['Koramangala', 'Sarjapur Road', 'BTM Layout'],
  'Indiranagar': ['Koramangala', 'Richmond Road', 'HAL'],
  'Richmond Road': ['Indiranagar', 'MG Road', 'Brigade Road'],
  'BTM Layout': ['HSR Layout', 'Koramangala', 'JP Nagar']
};

// Area patterns with strict exact matching
const areaPatterns = [
  {
    pattern: /(?:more than|above|over|greater than|bigger than|larger than|min(?:imum)?)\s*(\d+(?:\.\d+)?)\s*(?:sq\.?\s*(?:ft|feet)|sqft|square\s*(?:ft|feet))/i,
    handler: (match: RegExpMatchArray) => ({
      min: parseFloat(match[1]),
      type: 'more'
    })
  },
  {
    pattern: /(?:less than|under|below|maximum|max|smaller than|up to)\s*(\d+(?:\.\d+)?)\s*(?:sq\.?\s*(?:ft|feet)|sqft|square\s*(?:ft|feet))/i,
    handler: (match: RegExpMatchArray) => ({
      max: parseFloat(match[1]),
      type: 'less'
    })
  },
  {
    pattern: /(?:between|from)\s*(\d+(?:\.\d+)?)\s*(?:to|and|-)\s*(\d+(?:\.\d+)?)\s*(?:sq\.?\s*(?:ft|feet)|sqft|square\s*(?:ft|feet))/i,
    handler: (match: RegExpMatchArray) => ({
      min: parseFloat(match[1]),
      max: parseFloat(match[2]),
      type: 'between'
    })
  },
  {
    // Strict exact area pattern
    pattern: /(\d+(?:\.\d+)?)\s*(?:sq\.?\s*(?:ft|feet)|sqft|square\s*(?:ft|feet))/i,
    handler: (match: RegExpMatchArray) => ({
      exact: parseFloat(match[1]),
      type: 'exact',
      strict: true
    })
  }
];

const bhkPatterns = [
  {
    pattern: /(\d+)\s*(?:bhk|bedroom|bed|br|rk|rooms?)/i,
    handler: (match: RegExpMatchArray) => `${match[1]} BHK`
  },
  {
    pattern: /(?:single|one|two|three|four|five)\s*(?:bhk|bedroom|bed|br|rk|rooms?)/i,
    handler: (match: RegExpMatchArray) => ({
      'single': '1 BHK',
      'one': '1 BHK',
      'two': '2 BHK',
      'three': '3 BHK',
      'four': '4 BHK',
      'five': '4+ BHK'
    })[match[0].split(/\s+/)[0].toLowerCase()]
  },
  {
    pattern: /studio\s*(?:apartment|flat)?/i,
    handler: () => '1 RK'
  }
];

const sharingPatterns = [
  {
    pattern: /(\d+)\s*(?:sharing|share|seater|bed)/i,
    handler: (match: RegExpMatchArray) => {
      const num = parseInt(match[1]);
      if (num >= 4) return '4+ Share';
      return `${num} Share`;
    }
  },
  {
    pattern: /(?:single|double|triple|quad)\s*(?:sharing|share|seater|bed)/i,
    handler: (match: RegExpMatchArray) => ({
      'single': '1 Share',
      'double': '2 Share',
      'triple': '3 Share',
      'quad': '4 Share'
    })[match[0].split(/\s+/)[0].toLowerCase()]
  }
];

// Price patterns with enhanced voice recognition support
const pricePatterns = [
  {
    // Exact price match pattern (highest priority)
    pattern: /(?:^|\s)(?:rs\.?|₹|rupees?)?\s*(\d+(?:[,.]\d+)?)\s*(?:k|thousand)?(?:\s+(?:rs\.?|₹|rupees?))?$/i,
    handler: (match: RegExpMatchArray) => ({
      min: parseFloat(match[1].replace(',', '')) * (match[0].toLowerCase().includes('k') || match[0].toLowerCase().includes('thousand') ? 1000 : 1),
      max: parseFloat(match[1].replace(',', '')) * (match[0].toLowerCase().includes('k') || match[0].toLowerCase().includes('thousand') ? 1000 : 1),
      strict: true
    })
  },
  {
    // Voice-friendly pattern for "less than" or "under" price queries
    pattern: /(?:less than|under|below|maximum|max|up to|not more than|cheaper than|within)\s*(?:rs\.?|₹|rupees?)?\s*(\d+(?:[,.]\d+)?)\s*(?:k|thousand)?/i,
    handler: (match: RegExpMatchArray) => ({
      max: parseFloat(match[1].replace(',', '')) * (match[0].toLowerCase().includes('k') || match[0].toLowerCase().includes('thousand') ? 1000 : 1),
      strict: true
    })
  },
  {
    pattern: /(?:between|from|price range|in range|range)\s*(?:rs\.?|₹|rupees?)?\s*(\d+(?:[,.]\d+)?)\s*(?:k|thousand)?\s*(?:to|and|-)\s*(?:rs\.?|₹|rupees?)?\s*(\d+(?:[,.]\d+)?)\s*(?:k|thousand)?/i,
    handler: (match: RegExpMatchArray) => ({
      min: parseFloat(match[1].replace(',', '')) * (match[0].toLowerCase().includes('k') || match[0].toLowerCase().includes('thousand') ? 1000 : 1),
      max: parseFloat(match[2].replace(',', '')) * (match[0].toLowerCase().includes('k') || match[0].toLowerCase().includes('thousand') ? 1000 : 1),
      strict: true
    })
  },
  {
    pattern: /(?:budget|price|cost|rent|starting from|minimum|min|above|more than|at least|over)\s*(?:rs\.?|₹|rupees?)?\s*(\d+(?:[,.]\d+)?)\s*(?:k|thousand)?/i,
    handler: (match: RegExpMatchArray) => ({
      min: parseFloat(match[1].replace(',', '')) * (match[0].toLowerCase().includes('k') || match[0].toLowerCase().includes('thousand') ? 1000 : 1),
      strict: true
    })
  },
  {
    // Simple price pattern for direct voice input with price/cost keywords
    pattern: /(?:price|cost|rent|is|for|at)?\s*(?:rs\.?|₹|rupees?)?\s*(\d+(?:[,.]\d+)?)\s*(?:k|thousand)?/i,
    handler: (match: RegExpMatchArray) => ({
      min: parseFloat(match[1].replace(',', '')) * (match[0].toLowerCase().includes('k') || match[0].toLowerCase().includes('thousand') ? 1000 : 1),
      max: parseFloat(match[1].replace(',', '')) * (match[0].toLowerCase().includes('k') || match[0].toLowerCase().includes('thousand') ? 1000 : 1),
      strict: true
    })
  }
];

const bathroomPatterns = [
  {
    pattern: /(\d+)\s*(?:bath(?:room)?s?|toilets?)/i,
    handler: (match: RegExpMatchArray) => parseInt(match[1])
  },
  {
    pattern: /(?:single|one|two|three|four)\s*(?:bath(?:room)?s?|toilets?)/i,
    handler: (match: RegExpMatchArray) => ({
      'single': 1,
      'one': 1,
      'two': 2,
      'three': 3,
      'four': 4
    })[match[0].split(/\s+/)[0].toLowerCase()]
  }
];

const spellingCorrections: { [key: string]: { value: string; type: string } } = {
  // Property types with variations
  'apartment': { value: 'Apartment', type: 'propertyType' },
  'flat': { value: 'Apartment', type: 'propertyType' },
  'appartment': { value: 'Apartment', type: 'propertyType' },
  'appt': { value: 'Apartment', type: 'propertyType' },
  'house': { value: 'House', type: 'propertyType' },
  'home': { value: 'House', type: 'propertyType' },
  'villa': { value: 'Villa', type: 'propertyType' },
  'pg': { value: 'PG', type: 'propertyType' },
  'paying guest': { value: 'PG', type: 'propertyType' },
  'studio': { value: 'Studio', type: 'propertyType' },
  'penthouse': { value: 'Penthouse', type: 'propertyType' },
  'pent': { value: 'Penthouse', type: 'propertyType' },

  // Locations with variations
  'koramangala': { value: 'Koramangala', type: 'location' },
  'kormangala': { value: 'Koramangala', type: 'location' },
  'koramangla': { value: 'Koramangala', type: 'location' },
  'hsr': { value: 'HSR Layout', type: 'location' },
  'hsrlayout': { value: 'HSR Layout', type: 'location' },
  'hsr layout': { value: 'HSR Layout', type: 'location' },
  'indiranagar': { value: 'Indiranagar', type: 'location' },
  'indranagar': { value: 'Indiranagar', type: 'location' },
  'indirangar': { value: 'Indiranagar', type: 'location' },
  'richmond': { value: 'Richmond Road', type: 'location' },
  'richmond road': { value: 'Richmond Road', type: 'location' },
  'richmund': { value: 'Richmond Road', type: 'location' },
  'btm': { value: 'BTM Layout', type: 'location' },
  'btm layout': { value: 'BTM Layout', type: 'location' },

  // Furnishing with variations
  'furnished': { value: 'Fully Furnished', type: 'furnishing' },
  'fully furnished': { value: 'Fully Furnished', type: 'furnishing' },
  'complete furnished': { value: 'Fully Furnished', type: 'furnishing' },
  'semifurnished': { value: 'Semi Furnished', type: 'furnishing' },
  'semi furnished': { value: 'Semi Furnished', type: 'furnishing' },
  'semi-furnished': { value: 'Semi Furnished', type: 'furnishing' },
  'partially furnished': { value: 'Semi Furnished', type: 'furnishing' },
  'unfurnished': { value: 'Unfurnished', type: 'furnishing' },
  'not furnished': { value: 'Unfurnished', type: 'furnishing' },
  'no furnishing': { value: 'Unfurnished', type: 'furnishing' },
  'bare': { value: 'Unfurnished', type: 'furnishing' },

  // Listing types
  'owner': { value: 'Owner', type: 'listingType' },
  'direct owner': { value: 'Owner', type: 'listingType' },
  'landlord': { value: 'Owner', type: 'listingType' },
  'agent': { value: 'Agent', type: 'listingType' },
  'broker': { value: 'Agent', type: 'listingType' },
  'property dealer': { value: 'Agent', type: 'listingType' },
  'rentamigo': { value: 'RentAmigo', type: 'listingType' },
  'rent amigo': { value: 'RentAmigo', type: 'listingType' }
};

export const extractSearchCriteria = (query: string): SearchCriteria => {
  const criteria: SearchCriteria = {
    location: null,
    propertyType: null,
    // bhkType: null,
    priceRange: {
      min: null,
      max: null,
      strict: false
    },
    areaRange: {
      min: null,
      max: null,
      exact: null,
      strict: false,
      type: null
    },
    furnishing: null,
    strict: false,
    // bathrooms: null,
    listingTypes: [],
    sharing: null
  };

  const normalizedQuery = query.toLowerCase()
    .replace(/[,.!?]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  // Extract area requirements first
  for (const { pattern, handler } of areaPatterns) {
    const match = normalizedQuery.match(pattern);
    if (match) {
      const result = handler(match);
      criteria.areaRange = {
        ...criteria.areaRange,
        ...result,
        strict: true,
        type: result.type as 'more' | 'less' | 'between' | 'exact' | null
      };
      break;
    }
  }

  // Extract other criteria
  // for (const { pattern, handler } of bhkPatterns) {
  //   const match = normalizedQuery.match(pattern);
  //   if (match) {
  //     criteria.bhkType = handler(match);
  //     break;
  //   }
  // }

  // for (const { pattern, handler } of sharingPatterns) {
  //   const match = normalizedQuery.match(pattern);
  //   if (match) {
  //     criteria.sharing = handler(match);
  //     break;
  //   }
  // }

  // for (const { pattern, handler } of bathroomPatterns) {
  //   const match = normalizedQuery.match(pattern);
  //   if (match) {
  //     criteria.bathrooms = handler(match);
  //     break;
  //   }
  // }

  for (const { pattern, handler } of pricePatterns) {
    const match = normalizedQuery.match(pattern);
    if (match) {
      const result = handler(match);
      criteria.priceRange = {
        ...criteria.priceRange,
        ...result
      };
      break;
    }
  }

  // Extract location, property type, furnishing, and listing type
  const terms = normalizedQuery.split(/\s+/);
  
  // Look for multi-word matches first
  for (let i = 0; i < terms.length - 1; i++) {
    const twoWordTerm = `${terms[i]} ${terms[i + 1]}`;
    const threeWordTerm = i < terms.length - 2 ? `${twoWordTerm} ${terms[i + 2]}` : '';

    const twoWordMatch = spellingCorrections[twoWordTerm];
    const threeWordMatch = spellingCorrections[threeWordTerm];

    if (threeWordMatch) {
      updateCriteria(criteria, threeWordMatch);
      i += 2;
    } else if (twoWordMatch) {
      updateCriteria(criteria, twoWordMatch);
      i++;
    }
  }

  // Then look for single word matches
  for (const term of terms) {
    const correction = spellingCorrections[term];
    if (correction) {
      updateCriteria(criteria, correction);
    }
  }

  return criteria;
};

function updateCriteria(criteria: SearchCriteria, correction: { value: string; type: string }) {
  switch (correction.type) {
    case 'location':
      criteria.location = correction.value;
      break;
    case 'propertyType':
      const propertyTypeValue = correction.value as PropertyType;
      if (['Apartment', 'House', 'Villa', 'PG', 'Studio', 'Penthouse', 'Standalone Building', 'Agricultural'].includes(propertyTypeValue)) {
        criteria.propertyType = propertyTypeValue;
      } else {
        criteria.propertyType = null;
      }
      break;
    case 'furnishing':
      const furnishingValue = correction.value as FurnishingType;
      if (['Fully Furnished', 'Semi Furnished', 'Unfurnished'].includes(furnishingValue)) {
        criteria.furnishing = furnishingValue;
      } else {
        criteria.furnishing = 'Unfurnished';
      }
      break;
    case 'listingType':
      const listingTypeValue = correction.value as ListingType;
      if (['Owner', 'Agent', 'RentAmigo'].includes(listingTypeValue)) {
        criteria.listingTypes.push(listingTypeValue);
      }
      break;
  }
}

export const searchProperties = (
  properties: Property[],
  criteria: SearchCriteria
): {
  exact: Property[];
  partial: Property[];
  matchedFields: Set<string>;
  nearbyLocations: string[];
} => {
  const matchedFields = new Set<string>();
  const exact: Property[] = [];
  const partial: Property[] = [];
  const nearbyLocations: string[] = [];

  // Track matched fields
  if (criteria.location) matchedFields.add('location');
  if (criteria.propertyType) matchedFields.add('propertyType');
  // if (criteria.bhkType) matchedFields.add('bhkType');
  if (criteria.furnishing) matchedFields.add('furnishing');
  if (criteria.priceRange.max || criteria.priceRange.min) matchedFields.add('price');
  if (criteria.areaRange.type) matchedFields.add('area');
  // if (criteria.bathrooms) matchedFields.add('bathrooms');
  if (criteria.listingTypes.length) matchedFields.add('listingType');
  if (criteria.sharing) matchedFields.add('sharing');

  // Find exact matches with strict filtering
  const strictMatches = properties.filter(property => {
    // Location check
    if (criteria.location) {
      const locationMatch = property.location.toLowerCase().includes(criteria.location.toLowerCase());
      if (!locationMatch) return false;
    }

    // Strict area check for exact matches
    if (criteria.areaRange.type === 'exact') {
      if (property.area !== criteria.areaRange.exact) return false;
    } else if (criteria.areaRange.type) {
      const area = property.area;
      switch (criteria.areaRange.type) {
        case 'more':
          if (area <= (criteria.areaRange.min || 0)) return false;
          break;
        case 'less':
          if (area >= (criteria.areaRange.max || Infinity)) return false;
          break;
        case 'between':
          if (area < (criteria.areaRange.min || 0) || area > (criteria.areaRange.max || Infinity)) return false;
          break;
      }
    }

    // Property type and sharing type check
    if (criteria.propertyTypes && criteria.propertyTypes.length > 0) {
      // Check if property type is in the selected types array
      if (!criteria.propertyTypes.includes(property.type as PropertyType)) return false;
    } else if (criteria.propertyType) {
      // Fallback to single property type for backward compatibility
      if (property.type !== criteria.propertyType) return false;
    }

    // Handle PG sharing type check
    if (property.type === 'PG' && criteria.sharing && property.sharing !== criteria.sharing) {
      return false;
    }

    // Other criteria checks
    if (criteria.furnishing && property.furnishing !== criteria.furnishing) return false;
    // if (criteria.bathrooms && property.bathrooms !== criteria.bathrooms) return false;
    if (criteria.listingTypes.length && !criteria.listingTypes.includes(property.listingType)) return false;

    // Price range check
    if (criteria.priceRange.max && property.price > criteria.priceRange.max) return false;
    if (criteria.priceRange.min && property.price < criteria.priceRange.min) return false;

    return true;
  });

  exact.push(...strictMatches);

  // Find similar properties if no exact matches
  if (exact.length === 0) {
    if (criteria.location) {
      const nearby = locationMappings[criteria.location] || [];
      nearbyLocations.push(...nearby);

      // Find properties in nearby locations
      const nearbyProperties = properties.filter(property => {
        const nearbyMatch = nearby.some(loc => 
          property.location.toLowerCase().includes(loc.toLowerCase())
        );
        
        // Still enforce area and other critical constraints
        if (criteria.areaRange.type === 'exact') {
          if (property.area !== criteria.areaRange.exact) return false;
        }

        // Check property type for nearby properties
        if (criteria.propertyTypes && criteria.propertyTypes.length > 0) {
          if (!criteria.propertyTypes.includes(property.type as PropertyType)) return false;
        } else if (criteria.propertyType) {
          if (property.type !== criteria.propertyType) return false;
        }
        
        // Handle PG sharing type check for nearby properties
        if (property.type === 'PG' && criteria.sharing && property.sharing !== criteria.sharing) {
          return false;
        }

        return nearbyMatch;
      });

      partial.push(...nearbyProperties);
    }
  }

  return {
    exact,
    partial,
    matchedFields,
    nearbyLocations
  };
};

export const formatSearchSummary = (criteria: SearchCriteria): string => {
  const parts: string[] = [];

  if (criteria.sharing) {
    parts.push(`${criteria.sharing} PG`);
  } 
  // else if (criteria.bhkType) {
  //   parts.push(criteria.bhkType);
  // }
  
  if (criteria.propertyType && criteria.propertyType !== 'PG') {
    parts.push(criteria.propertyType.toLowerCase());
  }

  if (criteria.location) {
    parts.push(`in ${criteria.location}`);
  }

  if (criteria.areaRange.type === 'exact') {
    parts.push(`with ${criteria.areaRange.exact} sq.ft`);
  } else if (criteria.areaRange.type === 'more') {
    parts.push(`more than ${criteria.areaRange.min} sq.ft`);
  } else if (criteria.areaRange.type === 'less') {
    parts.push(`less than ${criteria.areaRange.max} sq.ft`);
  } else if (criteria.areaRange.type === 'between') {
    parts.push(`${criteria.areaRange.min}-${criteria.areaRange.max} sq.ft`);
  }

  if (criteria.listingTypes.length) {
    parts.push(`from ${criteria.listingTypes.join(' or ')}`);
  }

  if (criteria.priceRange.max && criteria.priceRange.min) {
    parts.push(`between ₹${criteria.priceRange.min.toLocaleString()} and ₹${criteria.priceRange.max.toLocaleString()}`);
  } else if (criteria.priceRange.max) {
    parts.push(`under ₹${criteria.priceRange.max.toLocaleString()}`);
  } else if (criteria.priceRange.min) {
    parts.push(`above ₹${criteria.priceRange.min.toLocaleString()}`);
  }

  if (criteria.furnishing) {
    parts.push(`(${criteria.furnishing.toLowerCase()})`);
  }

  // if (criteria.bathrooms) {
  //   parts.push(`with ${criteria.bathrooms} bathroom${criteria.bathrooms > 1 ? 's' : ''}`);
  // }

  return parts.join(' ') || 'All Properties';
};

export const formatNearbySuggestion = (locations: string[]): string => {
  if (locations.length === 0) return '';
  if (locations.length === 1) return `Consider properties in ${locations[0]}`;
  return `Consider properties in ${locations.slice(0, -1).join(', ')} and ${locations[locations.length - 1]}`;
};