import React, { useState, useMemo, useEffect } from 'react';
import { MapPin, ChevronDown, X, Home, Search, Filter, AlertCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Property, Filters } from './types';
import { PropertyCard } from './components/PropertyCard';
import { FiltersPanel } from './components/FiltersPanel';
import { VoiceSearch } from './components/VoiceSearch';
import { searchProperties, formatSearchSummary, formatNearbySuggestion, extractSearchCriteria } from './utils/searchUtils';
import axios from 'axios';
import ListingTypeSelector from '../updatedpropertyForms/ListingTypeSelector';

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
  const [showFilters, setShowFilters] = useState(false);  // Manage filter panel visibility

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

useEffect(() => {
  const fetchAllProperties = async () => {
    try {
      const [propertyRes, tokenRes] = await Promise.all([
        axios.get('/api/allproperties/all'),
        axios.get('/api/lead-token'),
      ]);

      const grouped = propertyRes.data?.data || {};
      const tokens = tokenRes.data || [];

      const flattenGrouped = (grouped: Record<string, any>) => {
        const all: any[] = [];
        for (const groupKey in grouped) {
          const category = grouped[groupKey];
          for (const subType in category) {
            const items = category[subType];
            if (Array.isArray(items)) {
              all.push(...items);
            }
          }
        }
        return all;
      };

      const allProperties = flattenGrouped(grouped);

      // Filter properties based on token lead criteria
      const filtered = allProperties.filter((property) => {
        const matchingToken = tokens.find(
          (token: any) =>
            token.propertyId === property.propertyId &&
            token.verified === true &&
            token.status?.toLowerCase() === 'active'
        );
        return !!matchingToken;
      });

      setFetchedProperties(filtered);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching properties or tokens:', error);
      setLoading(false);
    }
  };

  fetchAllProperties();
}, []);


  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<Filters>({
    listingTypes: [],
    propertyTypes: [],
    furnishingTypes: [],
    sharingTypes: [],
    priceRange: {
      min: null,
      max: null,
    },
    category: []
  });

  const handleFilterChange = (filters: Filters) => {
    setShowFilters(false);
    setActiveFilters(filters);
  };

  const handleDeleteProperty = (deletedPropertyId: string) => {
    setFetchedProperties(prevProperties => 
      prevProperties.filter(property => property.propertyId !== deletedPropertyId)
    );
  };

  const searchResults = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    const criteria = extractSearchCriteria(normalizedQuery);

    // Apply filters
    if (activeFilters.listingTypes.length) {
      criteria.listingTypes = activeFilters.listingTypes;
    }
    if (activeFilters.propertyTypes.length) {
      // Support multiple property types
      criteria.propertyTypes = [...activeFilters.propertyTypes];
    }
    if (activeFilters.furnishingTypes.length) {
      criteria.furnishing = activeFilters.furnishingTypes[0]; // Using first selected furnishing type
    }
    if (activeFilters.sharingTypes.length) {
      criteria.sharing = activeFilters.sharingTypes[0]; // Using first selected sharing type
    }
    if (activeFilters.priceRange.min !== null || activeFilters.priceRange.max !== null) {
      criteria.priceRange = {
        min: activeFilters.priceRange.min,
        max: activeFilters.priceRange.max,
        strict: true,
      };
    }

    const results = searchProperties(fetchedProperties, criteria);
    return { ...results, criteria };
  }, [searchQuery, activeFilters, fetchedProperties]);

  const sortedResults = useMemo(() => {
    const results = searchResults.exact;
    return results;
  }, [searchResults]);
  console.log(sortedResults)

  const handlePropertyClick = (propertyname: string, propertyId: string) => {
    const url = propertyname !== 'PL' && propertyname !== 'AG'
      ? `/detailprop/${propertyId}`
      : `/agriplot/${propertyId}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-black text-white py-3 sticky top-0 z-10">
        <div className="container mx-auto px-2">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-3">
            <Link to="/" className="flex items-center gap-2 mb-2 md:mb-0 cursor-pointer">
              <Home size={30} />

            </Link>
          <span className="text-xl font-bold" style={{ fontFamily: 'Neuropol X' }}>
  PropAmigo
</span>

            <div className="flex items-center justify-center w-full md:w-auto">
              <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg flex items-center gap-2 max-w-xs">
                <MapPin className="h-5 w-5 text-gray-300" />
                <span className="text-gray-100 truncate">{location}</span>
                <button
                  className="ml-2 p-1 hover:bg-white/10 rounded-full transition"
                  onClick={() => setShowLocationModal(true)}
                >
                  <ChevronDown className="h-4 w-4 text-gray-300" />
                </button>
              </div>
            </div>

            <div className="flex-1">
              <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-2">
                <div className="relative flex-1">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                    <Search size={16} />
                  </div>
                  <input
                    type="text"
                    placeholder="Search properties..."
                    className="w-full px-3 py-2 pl-9 rounded text-black text-sm focus:outline-none focus:ring-1 focus:ring-black"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
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

      <main className="container mx-auto px-2 py-3">
        {loading ? (
          <div className="text-center py-8 text-gray-500">Loading properties...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {sortedResults.map((property) => (
              (<div
                key={property.id}
                onClick={() => handlePropertyClick(property.propertyId.slice(8, 10), property.propertyId)}
                className="cursor-pointer"
              >

                <PropertyCard 
                  property={property} 
                  onDelete={handleDeleteProperty}
                />



              </div>


              )))}


          </div>
        )}
      </main>

      <div
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ${showFilters ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setShowFilters(false)}
      >
        <div
          className={`absolute right-0 top-0 bottom-0 w-full max-w-sm bg-white overflow-y-auto flex flex-col transform transition-transform duration-300 ${showFilters ? 'translate-x-0' : 'translate-x-full'}`}
          onClick={(e) => e.stopPropagation()}
        >
          <FiltersPanel
            onFilterChange={handleFilterChange}
            onClose={() => setShowFilters(false)}
          />
        </div>
      </div>
    </div>
  );
}

export default Allproperties;
