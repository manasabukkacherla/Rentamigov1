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

  const handleLocationSelect = (selectedLocation: string) => {
    setLocation(selectedLocation);
    
    // Add to recent locations
    const updatedRecent = [selectedLocation, ...recentLocations.filter(loc => loc !== selectedLocation)].slice(0, 5);
    setRecentLocations(updatedRecent);
    localStorage.setItem('recentLocations', JSON.stringify(updatedRecent));
    
    // Close modal
    setShowLocationModal(false);
    setLocationSearch('');
  };

  const filteredPopularLocations = popularLocations.filter(loc =>
    loc.toLowerCase().includes(locationSearch.toLowerCase())
  );

  const searchResults = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    
    // If no search query and no filters, return all properties
    if (!normalizedQuery && 
        !activeFilters.listingTypes.length && 
        !activeFilters.propertyTypes.length && 
        !activeFilters.furnishingTypes.length && 
        !activeFilters.sharingTypes.length && 
        !activeFilters.priceRange.min && 
        !activeFilters.priceRange.max) {
      return {
        exact: fetchedProperties,
        partial: [],
        matchedFields: new Set<string>(),
        nearbyLocations: [],
        criteria: {
          location: null,
          propertyType: null,
          propertyTypes: [],
          priceRange: { min: null, max: null, strict: false },
          areaRange: { min: null, max: null, exact: null, strict: false, type: null },
          furnishing: null,
          strict: false,
          listingTypes: [],
          sharing: null
        }
      };
    }

    // Enhanced search logic
    let filteredProperties = [...fetchedProperties];

    // Apply location-based filtering first (from navbar location selector)
    if (location && location !== 'All Locations') {
      filteredProperties = filteredProperties.filter(property => {
        const propertyLocation = property.location.toLowerCase();
        const selectedLocation = location.toLowerCase();
        
        // Check if property location contains the selected location
        return propertyLocation.includes(selectedLocation) ||
               propertyLocation.includes(selectedLocation.split(',')[0]) || // Check city name only
               (property.basicInformation?.location?.address?.toLowerCase().includes(selectedLocation)) ||
               (property.basicInformation?.location?.formattedAddress?.toLowerCase().includes(selectedLocation));
      });
    }

    // Text-based search - search across multiple fields
    if (normalizedQuery) {
      filteredProperties = filteredProperties.filter(property => {
        const searchableText = [
          property.title,
          property.propertyName,
          property.location,
          property.type,
          property.listingType,
          property.furnishing,
          property.sharing || '',
          property.price.toString(),
          property.area.toString(),
          property.basicInformation?.title || '',
          property.basicInformation?.location?.address || '',
          property.basicInformation?.location?.formattedAddress || ''
        ].join(' ').toLowerCase();
        
        // Split query into individual terms for flexible matching
        const queryTerms = normalizedQuery.split(/\s+/).filter(term => term.length > 0);
        
        // Check if all query terms are found in the searchable text
        return queryTerms.every(term => searchableText.includes(term));
      });
    }

    // Extract search criteria for structured search
    const criteria = extractSearchCriteria(normalizedQuery);

    // Apply filters from filter panel
    if (activeFilters.listingTypes.length) {
      criteria.listingTypes = activeFilters.listingTypes;
    }
    if (activeFilters.propertyTypes.length) {
      criteria.propertyTypes = [...activeFilters.propertyTypes];
    }
    if (activeFilters.furnishingTypes.length) {
      criteria.furnishing = activeFilters.furnishingTypes[0];
    }
    if (activeFilters.sharingTypes.length) {
      criteria.sharing = activeFilters.sharingTypes[0];
    }
    if (activeFilters.priceRange.min !== null || activeFilters.priceRange.max !== null) {
      criteria.priceRange = {
        min: activeFilters.priceRange.min,
        max: activeFilters.priceRange.max,
        strict: true,
      };
    }

    // Apply structured filters to the already text-filtered properties
    const structuredFiltered = filteredProperties.filter(property => {
      // Location filter
      if (criteria.location) {
        const locationMatch = property.location.toLowerCase().includes(criteria.location.toLowerCase()) ||
          (property.basicInformation?.location?.address?.toLowerCase().includes(criteria.location.toLowerCase())) ||
          (property.basicInformation?.location?.formattedAddress?.toLowerCase().includes(criteria.location.toLowerCase()));
        if (!locationMatch) return false;
      }

      // Property type filter
      if (criteria.propertyTypes && criteria.propertyTypes.length > 0) {
        if (!criteria.propertyTypes.includes(property.type as any)) return false;
      } else if (criteria.propertyType) {
        if (property.type !== criteria.propertyType) return false;
      }

      // Furnishing filter
      if (criteria.furnishing && property.furnishing !== criteria.furnishing) return false;

      // Sharing filter (for PG properties)
      if (criteria.sharing && property.sharing !== criteria.sharing) return false;

      // Listing type filter
      if (criteria.listingTypes.length && !criteria.listingTypes.includes(property.listingType)) return false;

      // Price range filter
      if (criteria.priceRange.max && property.price > criteria.priceRange.max) return false;
      if (criteria.priceRange.min && property.price < criteria.priceRange.min) return false;

      // Area filter
      if (criteria.areaRange.type === 'exact' && property.area !== criteria.areaRange.exact) return false;
      if (criteria.areaRange.type === 'more' && property.area <= (criteria.areaRange.min || 0)) return false;
      if (criteria.areaRange.type === 'less' && property.area >= (criteria.areaRange.max || Infinity)) return false;
      if (criteria.areaRange.type === 'between' && 
          (property.area < (criteria.areaRange.min || 0) || property.area > (criteria.areaRange.max || Infinity))) return false;

      return true;
    });

    return {
      exact: structuredFiltered,
      partial: [],
      matchedFields: new Set<string>(),
      nearbyLocations: [],
      criteria
    };
  }, [searchQuery, activeFilters, fetchedProperties, location]);

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
              <form onSubmit={(e) => {
                e.preventDefault();
                // Trigger search when form is submitted (Enter key)
                if (searchQuery.trim()) {
                  // Search is already handled by useMemo, just prevent page refresh
                }
              }} className="flex items-center gap-2">
                <div className="relative flex-1">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                    <Search size={16} />
                  </div>
                  <input
                    type="text"
                    placeholder="Search by location, property type, price (e.g., 25k, under 30000), area, furnishing..."
                    className="w-full px-3 py-2 pl-9 rounded text-black text-sm focus:outline-none focus:ring-1 focus:ring-black"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-1 bg-white/10 px-3 py-2 rounded text-sm hover:bg-white/20"
                >
                  <Filter size={16} />
                  <span>Filters</span>
                  {(activeFilters.listingTypes.length > 0 || 
                    activeFilters.propertyTypes.length > 0 || 
                    activeFilters.furnishingTypes.length > 0 || 
                    activeFilters.sharingTypes.length > 0 || 
                    activeFilters.priceRange.min || 
                    activeFilters.priceRange.max) && (
                    <span className="bg-red-500 text-white text-xs rounded-full px-1 ml-1">
                      {[
                        ...activeFilters.listingTypes,
                        ...activeFilters.propertyTypes,
                        ...activeFilters.furnishingTypes,
                        ...activeFilters.sharingTypes,
                        ...(activeFilters.priceRange.min || activeFilters.priceRange.max ? ['Price'] : [])
                      ].length}
                    </span>
                  )}
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
          <>
            {/* Search Results Summary */}
            {(searchQuery || location !== 'Bangalore, Karnataka' || activeFilters.listingTypes.length > 0 || 
              activeFilters.propertyTypes.length > 0 || 
              activeFilters.furnishingTypes.length > 0 || 
              activeFilters.sharingTypes.length > 0 || 
              activeFilters.priceRange.min || 
              activeFilters.priceRange.max) && (
              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">
                      {sortedResults.length === 0 ? (
                        'No properties found'
                      ) : (
                        `Found ${sortedResults.length} property${sortedResults.length !== 1 ? 'ies' : ''}`
                      )}
                      {searchQuery && (
                        <span className="ml-1">for "{searchQuery}"</span>
                      )}
                      {location && location !== 'All Locations' && location !== 'Bangalore, Karnataka' && (
                        <span className="ml-1">in {location}</span>
                      )}
                    </p>
                    {/* Show applied price filters */}
                    {(searchResults.criteria.priceRange.min || searchResults.criteria.priceRange.max) && (
                      <p className="text-xs text-blue-600 mt-1">
                        Price filter: 
                        {searchResults.criteria.priceRange.min && searchResults.criteria.priceRange.max && 
                         searchResults.criteria.priceRange.min === searchResults.criteria.priceRange.max ? (
                          `₹${searchResults.criteria.priceRange.min.toLocaleString()}`
                        ) : (
                          `${searchResults.criteria.priceRange.min ? `₹${searchResults.criteria.priceRange.min.toLocaleString()}` : 'Any'} - ${searchResults.criteria.priceRange.max ? `₹${searchResults.criteria.priceRange.max.toLocaleString()}` : 'Any'}`
                        )}
                      </p>
                    )}
                    {/* Show location filter */}
                    {location && location !== 'All Locations' && location !== 'Bangalore, Karnataka' && (
                      <p className="text-xs text-green-600 mt-1">
                        Location: {location}
                      </p>
                    )}
                    {sortedResults.length === 0 && (searchQuery || location !== 'Bangalore, Karnataka') && (
                      <div className="text-xs text-gray-500 mt-2">
                        <p>Try adjusting your search terms, location, or filters</p>
                        <p className="mt-1">Search examples: "25k", "under 30000", "apartment koramangala", "furnished pg"</p>
                      </div>
                    )}
                  </div>
                  {(searchQuery || location !== 'Bangalore, Karnataka' || activeFilters.listingTypes.length > 0 || 
                    activeFilters.propertyTypes.length > 0 || 
                    activeFilters.furnishingTypes.length > 0 || 
                    activeFilters.sharingTypes.length > 0 || 
                    activeFilters.priceRange.min || 
                    activeFilters.priceRange.max) && (
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setLocation('Bangalore, Karnataka');
                        setActiveFilters({
                          listingTypes: [],
                          propertyTypes: [],
                          furnishingTypes: [],
                          sharingTypes: [],
                          priceRange: { min: null, max: null },
                          category: []
                        });
                      }}
                      className="text-xs text-blue-600 hover:text-blue-800 underline"
                    >
                      Clear all
                    </button>
                  )}
                </div>
              </div>
            )}
            
            {/* Properties Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {sortedResults.length === 0 && !loading ? (
                <div className="col-span-full text-center py-12">
                  <AlertCircle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No properties found</h3>
                  <p className="text-gray-500 mb-4">
                    {searchQuery ? 
                      'Try adjusting your search terms or clearing filters.' :
                      'No properties match your current filters.'
                    }
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setLocation('Bangalore, Karnataka');
                      setActiveFilters({
                        listingTypes: [],
                        propertyTypes: [],
                        furnishingTypes: [],
                        sharingTypes: [],
                        priceRange: { min: null, max: null },
                        category: []
                      });
                    }}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800"
                  >
                    View all properties
                  </button>
                </div>
              ) : (
                sortedResults.map((property) => (
                  <div
                    key={property.id}
                    onClick={() => handlePropertyClick(property.propertyId.slice(8, 10), property.propertyId)}
                    className="cursor-pointer"
                  >
                    <PropertyCard 
                      property={property} 
                      onDelete={handleDeleteProperty}
                    />
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </main>

      {/* Location Selection Modal */}
      <div
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ${
          showLocationModal ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setShowLocationModal(false)}
      >
        <div
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-lg shadow-xl transition-transform duration-300 ${
            showLocationModal ? 'scale-100' : 'scale-95'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Select Location</h3>
              <button
                onClick={() => setShowLocationModal(false)}
                className="p-1 hover:bg-gray-100 rounded-full transition"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            {/* Search Input */}
            <div className="relative mb-4">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <Search size={16} />
              </div>
              <input
                type="text"
                placeholder="Search locations..."
                className="w-full px-3 py-2 pl-9 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                value={locationSearch}
                onChange={(e) => setLocationSearch(e.target.value)}
              />
            </div>

            <div className="max-h-80 overflow-y-auto">
              {/* Current Location */}
              <div className="mb-4">
                <button
                  onClick={() => handleLocationSelect('All Locations')}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${
                    location === 'All Locations'
                      ? 'bg-black text-white'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <MapPin size={16} />
                    <span>All Locations</span>
                  </div>
                </button>
              </div>

              {/* Recent Locations */}
              {recentLocations.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Recent</h4>
                  <div className="space-y-1">
                    {recentLocations.map((recentLocation) => (
                      <button
                        key={recentLocation}
                        onClick={() => handleLocationSelect(recentLocation)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${
                          location === recentLocation
                            ? 'bg-black text-white'
                            : 'hover:bg-gray-100 text-gray-700'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <MapPin size={16} />
                          <span>{recentLocation}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Popular Locations */}
              <div>
                <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Popular Cities</h4>
                <div className="space-y-1">
                  {filteredPopularLocations.map((popularLocation) => (
                    <button
                      key={popularLocation}
                      onClick={() => handleLocationSelect(popularLocation)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${
                        location === popularLocation
                          ? 'bg-black text-white'
                          : 'hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <MapPin size={16} />
                        <span>{popularLocation}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* No results */}
              {locationSearch && filteredPopularLocations.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <p className="text-sm">No locations found for "{locationSearch}"</p>
                  <p className="text-xs mt-1">Try searching for a city name</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

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
