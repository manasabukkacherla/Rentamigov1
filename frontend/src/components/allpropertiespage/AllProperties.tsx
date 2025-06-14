import React, { useState, useMemo } from 'react';
import { MapPin, ChevronDown, X, Home, Search, Filter, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Property, Filters } from './types';
import { PropertyCard } from './components/PropertyCard';
import { FiltersPanel } from './components/FiltersPanel';
import { VoiceSearch } from './components/VoiceSearch';
import { searchProperties, formatSearchSummary, formatNearbySuggestion, extractSearchCriteria } from './utils/searchUtils';

function Allproperties() {
  const navigate = useNavigate();
  const [location, setLocation] = useState('Bangalore, Karnataka');
  const [fetchedProperties, setFetchedProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [locationSearch, setLocationSearch] = useState('');
  const [recentLocations, setRecentLocations] = useState<string[]>(() => {
    const saved = localStorage.getItem('recentLocations');
    return saved ? JSON.parse(saved) : [];
  });

  const popularLocations = [
    'Bangalore, Karnataka',
    'Mumbai, Maharashtra',
    'Delhi, NCR',
    'Hyderabad, Telangana',
    'Chennai, Tamil Nadu',
    'Pune, Maharashtra',
    'Kolkata, West Bengal',
    'Ahmedabad, Gujarat',
    'Jaipur, Rajasthan',
    'Kochi, Kerala',
    'Goa',
    'Chandigarh',
    'Lucknow, Uttar Pradesh',
    'Bhubaneswar, Odisha',
    'Indore, Madhya Pradesh',
  ];

  // Save recentLocations to localStorage
  React.useEffect(() => {
    let hasFetched = false;

    const fetchAllProperties = async () => {
      if (hasFetched) return;
      hasFetched = true;

      try {
        // Fetch data from the new optimized API
        const response = await fetch('/api/properties/all');  // New optimized backend route
        const data = await response.json();

        if (data.success) {
          setFetchedProperties(data.data);  // Set fetched properties
        } else {
          console.error('Failed to fetch properties:', data.message);
        }
      } catch (error) {
        console.error('Error fetching properties:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllProperties();

    return () => {
      hasFetched = true;
    };
  }, []);

  // Filtered locations for modal
  const filteredLocations = popularLocations.filter((loc) =>
    loc.toLowerCase().includes(locationSearch.toLowerCase())
  );

  // Update location and recent locations
  const handleLocationChange = (newLocation: string) => {
    setLocation(newLocation);
    if (!recentLocations.includes(newLocation)) {
      setRecentLocations([newLocation, ...recentLocations.slice(0, 4)]);
    }
    setShowLocationModal(false);
  };

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
      max: null,
    },
  });

  const filteredProperties: Property[] = useMemo(() => {
    return fetchedProperties.map((item: any): Property => {
      return {
        id: item._id || item.propertyId || '',
        propertyId: item.propertyId || '',
        title: item.basicInformation?.title || item.title || item.pgDetails?.name || 'Unnamed Property',
        propertyName: item.metadata?.propertyName || '',
        type: item.metadata?.propertyType || '',
        listingType: 'Owner',
        price: item.rent?.expectedRent || item.leaseAmount?.amount || 0,
        location: `${item.basicInformation?.address?.city || ''}, ${item.basicInformation?.address?.state || ''}` || item.pgDetails?.address || '',
        area: item.propertyDetails?.area?.totalArea || 0,
        image: item.media?.photos?.exterior?.[0] || 'https://via.placeholder.com/400x300?text=No+Image',
        postedDate: item.metadata?.createdAt?.slice(0, 10) || '',
        status: (item.availability?.type || 'Available') ,
        intent: item.metadata?.intent || '',
        bhkType: item.propertyDetails?.bhkType || '1 BHK',
        bathrooms: item.propertyDetails?.bathrooms || 1,
        furnishing: item.propertyDetails?.furnishingStatus || 'Unfurnished',
      };
    });
  }, [fetchedProperties]);

  const searchResults = useMemo(() => {
    const normalizedQuery = searchQuery.trim()
      .toLowerCase()
      .replace(/rupees/g, 'rs')
      .replace(/thousand/g, 'k')
      .replace(/(\d+)\s*k/g, (_, num) => `${num}000`)
      .replace(/(\d+)\s*rupees/g, '$1')
      .replace(/price is/g, 'price')
      .replace(/cost is/g, 'cost')
      .replace(/rent is/g, 'rent')
      .replace(/square feet/g, 'sqft')
      .replace(/sq feet/g, 'sqft')
      .replace(/sq ft/g, 'sqft')
      .replace(/square ft/g, 'sqft');

    if (!normalizedQuery && !activeFilters.listingTypes.length && !activeFilters.propertyTypes.length &&
      !activeFilters.furnishingTypes.length && !activeFilters.bhkTypes.length && !activeFilters.sharingTypes.length &&
      !activeFilters.priceRange.min && !activeFilters.priceRange.max) {
      return {
        exact: filteredProperties,
        partial: [],
        matchedFields: new Set<string>(),
        nearbyLocations: [],
        criteria: null
      };
    }

    const criteria = extractSearchCriteria(normalizedQuery);

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

    const results = searchProperties(filteredProperties, criteria);
    return {
      ...results,
      criteria
    };
  }, [searchQuery, activeFilters, location]);

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

  const handlePropertyClick = (propertyId: string) => {
    navigate(`/detailprop/${propertyId}`);
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-black text-white py-3 sticky top-0 z-10">
        <div className="container mx-auto px-2">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-3">
            <div className="flex items-center gap-2 mb-2 md:mb-0">
              <Home size={20} />
              <span className="text-xl font-bold">RentAmigo</span>
            </div>
            {/* Location selector and other header content */}
          </div>
        </div>
      </header>
      {/* Location Modal */}
      {showLocationModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          {/* Location Modal content */}
        </div>
      )}

      <main className="container mx-auto px-2">
        <div className="py-3">
          {/* Search Results and Filters */}
          {loading ? (
            <div className="text-center py-8 text-gray-500">Loading properties...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
              {sortedResults.map((property) => (
                <div
                  key={property.id}
                  onClick={() => handlePropertyClick(property.propertyId)}
                  className="cursor-pointer"
                >
                  <PropertyCard
                    property={property}
                    matchedFields={searchResults.matchedFields}
                  />
                </div>
              ))}
            </div>
          )}
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
              onClick={(e) => e.stopPropagation()}
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
