import React, { useState, useMemo } from 'react';
import { Home, Search, Filter, X, AlertCircle, MapPin } from 'lucide-react';
import { Property, Filters } from './types';
import { PropertyCard } from './components/PropertyCard';
import { FiltersPanel } from './components/FiltersPanel';
import { VoiceSearch } from './components/VoiceSearch';
import { searchProperties, formatSearchSummary, formatNearbySuggestion, extractSearchCriteria } from './utils/searchUtils';
import 'regenerator-runtime/runtime';

const sampleProperties: Property[] = [
  {
    id: '1',
    title: 'Modern Apartment in City Center',
    type: 'Apartment',
    listingType: 'Owner',
    price: 25000,
    location: 'Koramangala, Bangalore',
    bhkType: '3 BHK',
    bathrooms: 2,
    furnishing: 'Fully Furnished',
    area: 1200,
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800',
    postedDate: '2024-03-15',
  },
  {
    id: '2',
    title: 'Luxury Villa with Garden',
    type: 'Villa',
    listingType: 'RentAmigo',
    price: 45000,
    location: 'HSR Layout, Bangalore',
    bhkType: '4 BHK',
    bathrooms: 3,
    furnishing: 'Semi Furnished',
    area: 2500,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800',
    postedDate: '2024-03-14',
  },
  {
    id: '3',
    title: 'Cozy Studio Apartment',
    type: 'Studio',
    listingType: 'PG',
    price: 15000,
    location: 'Indiranagar, Bangalore',
    bhkType: '1 RK',
    bathrooms: 1,
    furnishing: 'Fully Furnished',
    area: 500,
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800',
    postedDate: '2024-03-13',
  },
  {
    id: '4',
    title: 'Spacious Penthouse with Terrace',
    type: 'Penthouse',
    listingType: 'Owner',
    price: 75000,
    location: 'Richmond Road, Bangalore',
    bhkType: '4+ BHK',
    bathrooms: 4,
    furnishing: 'Semi Furnished',
    area: 3500,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800',
    postedDate: '2024-03-12',
  },
  {
    id: '5',
    title: 'Budget 2BHK Near Metro',
    type: 'Apartment',
    listingType: 'Agent',
    price: 18000,
    location: 'Indiranagar, Bangalore',
    bhkType: '2 BHK',
    bathrooms: 2,
    furnishing: 'Semi Furnished',
    area: 950,
    image: 'https://images.unsplash.com/photo-1515263487990-61b07816b324?auto=format&fit=crop&w=800',
    postedDate: '2024-03-16',
  },
  {
    id: '6',
    title: 'Premium 3BHK with Pool Access',
    type: 'Apartment',
    listingType: 'RentAmigo',
    price: 35000,
    location: 'Koramangala, Bangalore',
    bhkType: '3 BHK',
    bathrooms: 3,
    furnishing: 'Fully Furnished',
    area: 1600,
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800',
    postedDate: '2024-03-15',
  },
  {
    id: '7',
    title: 'Compact 1BHK for Singles',
    type: 'Apartment',
    listingType: 'Owner',
    price: 16000,
    location: 'HSR Layout, Bangalore',
    bhkType: '1 BHK',
    bathrooms: 1,
    furnishing: 'Fully Furnished',
    area: 650,
    image: 'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?auto=format&fit=crop&w=800',
    postedDate: '2024-03-14',
  },
  {
    id: '8',
    title: 'Single Sharing PG Accommodation',
    type: 'PG',
    listingType: 'PG',
    price: 12000,
    location: 'Koramangala, Bangalore',
    bhkType: '1 RK',
    bathrooms: 1,
    furnishing: 'Fully Furnished',
    area: 400,
    image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800',
    postedDate: '2024-03-16',
    sharing: '1 Share'
  },
  {
    id: '9',
    title: 'Spacious 4BHK Family Home',
    type: 'House',
    listingType: 'Owner',
    price: 55000,
    location: 'Indiranagar, Bangalore',
    bhkType: '4 BHK',
    bathrooms: 4,
    furnishing: 'Semi Furnished',
    area: 2800,
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800',
    postedDate: '2024-03-13',
  },
  {
    id: '10',
    title: 'Triple Sharing Student PG with Meals',
    type: 'PG',
    listingType: 'PG',
    price: 14000,
    location: 'HSR Layout, Bangalore',
    bhkType: '1 RK',
    bathrooms: 1,
    furnishing: 'Fully Furnished',
    area: 450,
    image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800',
    postedDate: '2024-03-15',
    sharing: '3 Share'
  },
  {
    id: '11',
    title: 'Luxury 3BHK with Garden View',
    type: 'Apartment',
    listingType: 'RentAmigo',
    price: 42000,
    location: 'Richmond Road, Bangalore',
    bhkType: '3 BHK',
    bathrooms: 3,
    furnishing: 'Fully Furnished',
    area: 1800,
    image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800',
    postedDate: '2024-03-16',
  },
  {
    id: '12',
    title: 'Double Sharing PG for Working Professionals',
    type: 'PG',
    listingType: 'PG',
    price: 13000,
    location: 'Koramangala, Bangalore',
    bhkType: '1 RK',
    bathrooms: 1,
    furnishing: 'Fully Furnished',
    area: 400,
    image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800',
    postedDate: '2024-03-14',
    sharing: '2 Share'
  }
];

function Allproperties() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showSimilar, setShowSimilar] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [sortBy, setSortBy] = useState<'relevance' | 'price-asc' | 'price-desc' | 'date'>('relevance');
  const [activeFilters, setActiveFilters] = useState<Filters>({
    listingTypes: [],
    propertyTypes: [],
    furnishingTypes: [],
    bhkTypes: [],
    sharingTypes: [],
    priceRange: {
      min: null,
      max: null
    }
  });

  const searchResults = useMemo(() => {
    if (!searchQuery.trim() && !activeFilters.listingTypes.length && !activeFilters.propertyTypes.length && 
        !activeFilters.furnishingTypes.length && !activeFilters.bhkTypes.length && !activeFilters.sharingTypes.length &&
        !activeFilters.priceRange.min && !activeFilters.priceRange.max) {
      return { 
        exact: sampleProperties, 
        partial: [], 
        matchedFields: new Set<string>(),
        nearbyLocations: [],
        criteria: null 
      };
    }

    const criteria = extractSearchCriteria(searchQuery);
    
    if (activeFilters.listingTypes.length) {
      criteria.listingTypes = activeFilters.listingTypes;
    }
    if (activeFilters.propertyTypes.length) {
      criteria.propertyType = activeFilters.propertyTypes[0];
    }
    if (activeFilters.furnishingTypes.length) {
      criteria.furnishing = activeFilters.furnishingTypes[0];
    }
    if (activeFilters.bhkTypes.length) {
      criteria.bhkType = activeFilters.bhkTypes[0];
    }
    if (activeFilters.sharingTypes.length) {
      criteria.sharing = activeFilters.sharingTypes[0];
    }
    if (activeFilters.priceRange.min !== null || activeFilters.priceRange.max !== null) {
      criteria.priceRange = {
        ...criteria.priceRange,
        min: activeFilters.priceRange.min,
        max: activeFilters.priceRange.max,
        strict: true
      };
    }

    const results = searchProperties(sampleProperties, criteria);

    return {
      ...results,
      criteria
    };
  }, [searchQuery, activeFilters]);

  const sortedResults = useMemo(() => {
    const results = showSimilar ? searchResults.partial : searchResults.exact;
    
    switch (sortBy) {
      case 'price-asc':
        return [...results].sort((a, b) => a.price - b.price);
      case 'price-desc':
        return [...results].sort((a, b) => b.price - a.price);
      case 'date':
        return [...results].sort((a, b) => 
          new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()
        );
      default:
        return results;
    }
  }, [searchResults, showSimilar, sortBy]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSimilar(false);
    setSortBy('relevance');
  };

  const handleVoiceResult = (transcript: string) => {
    setSearchQuery(transcript);
    setShowSimilar(false);
    setSortBy('relevance');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch(e);
    }
  };

  const handleFilterChange = (filters: Filters) => {
    setActiveFilters(filters);
    setShowFilters(false);
    setShowSimilar(false);
    setSortBy('relevance');
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-black text-white py-3 sticky top-0 z-10">
        <div className="container mx-auto px-2">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Home size={20} />
              <span className="text-xl font-bold">RentAmigo</span>
            </div>
            <div className="flex-1">
              <form onSubmit={handleSearch} className="flex items-center gap-2">
                <div className="relative flex-1">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                    <Search size={16} />
                  </div>
                  <input
                    type="text"
                    placeholder={isListening ? 'Listening...' : "Try: '2 BHK in HSR Layout under ₹30,000'"}
                    className="w-full px-3 py-2 pl-9 rounded text-black text-sm focus:outline-none focus:ring-1 focus:ring-black"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                </div>
                <VoiceSearch 
                  onResult={handleVoiceResult}
                  isListening={isListening}
                  setIsListening={setIsListening}
                />
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-1 bg-white/10 px-3 py-2 rounded text-sm hover:bg-white/20"
                >
                  <Filter size={16} />
                  <span>Filters</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-2">
        <div className="py-3">
          {searchResults.criteria && (
            <div className="mb-3">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-lg font-semibold">
                  {formatSearchSummary(searchResults.criteria)}
                </h2>
                
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                  className="px-3 py-1.5 rounded border border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                >
                  <option value="relevance">Sort by Relevance</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="date">Newest First</option>
                </select>
              </div>

              {searchResults.exact.length === 0 && !showSimilar && (
                <div className="bg-gray-50 border rounded p-3 mt-3">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="text-gray-500 mt-0.5" size={18} />
                    <div>
                      <p className="text-gray-700">
                        No properties found for {formatSearchSummary(searchResults.criteria)}.
                      </p>
                      {searchResults.nearbyLocations.length > 0 && (
                        <p className="text-gray-600 mt-2">
                          <MapPin size={14} className="inline mr-1" />
                          {formatNearbySuggestion(searchResults.nearbyLocations)}
                        </p>
                      )}
                      <button
                        onClick={() => setShowSimilar(true)}
                        className="text-black underline mt-2 text-sm"
                      >
                        Show similar properties
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
            {sortedResults.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                matchedFields={searchResults.matchedFields}
              />
            ))}
          </div>

          {sortedResults.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No properties found matching your criteria.</p>
            </div>
          )}
        </div>

        {showFilters && (
          <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setShowFilters(false)}>
            <div 
              className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-white overflow-hidden flex flex-col"
              onClick={e => e.stopPropagation()}
            >
              <FiltersPanel onFilterChange={handleFilterChange} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Allproperties;