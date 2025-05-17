import React, { useState, useMemo } from 'react';
import { MapPin, ChevronDown, X, Home, Search, Filter, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Property, Filters, BHKType, FurnishingType, ListingType, PropertyIntent, PropertyStatus, PropertyType } from './types';
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
// Updated useEffect to include showroom data
// Updated useEffect to include new property data




React.useEffect(() => {
  let didCancel = false;

  const fetchAllProperties = async () => {
    try {
      const response = await fetch("/api/properties/all");
      const data = await response.json();

      if (!didCancel) {
        const allProperties = [
          ...(data.leaseAgri || []),
          ...(data.leaseOthers || []),
          ...(data.leasePlot || []),
          ...(data.leaseRetail || []),
          ...(data.leaseShop || []),
          ...(data.leaseShowroom || []),
          ...(data.leaseCovered || []),
          ...(data.leaseOffice || []),
          ...(data.leaseShed || []),
          ...(data.leaseWarehouse || []),

          ...(data.rentAgri || []),
          ...(data.rentCovered || []),
          ...(data.rentOffice || []),
          ...(data.rentOthers || []),
          ...(data.rentPlot || []),
          ...(data.rentRetail || []),
          ...(data.rentShed || []),
          ...(data.rentShop || []),
          ...(data.rentShowroom || []),
          ...(data.rentWarehouse || []),

          ...(data.sellAgri || []),
          ...(data.sellCovered || []),
          ...(data.sellOffice || []),
          ...(data.sellOthers || []),
          ...(data.sellPlot || []),
          ...(data.sellRetail || []),
          ...(data.sellShed || []),
          ...(data.sellShop || []),
          ...(data.sellShowroom || []),
          ...(data.sellWarehouse || []),

          ...(data.leaseAppartment || []),
          ...(data.leaseIndepHouse || []),

          ...(data.rentAppartment || []),
          ...(data.rentBuilder || []),
          ...(data.rentIndepHouse || []),

          ...(data.saleAppartment || []),
          ...(data.saleBuilder || []),
          ...(data.saleIndepHouse || []),
          ...(data.salePlot || [])
        ];

        setFetchedProperties(allProperties);
      }
    } catch (error) {
      console.error("Error fetching properties:", error);
    } finally {
      if (!didCancel) {
        setLoading(false);
      }
    }
  };

  fetchAllProperties();

  return () => {
    didCancel = true;
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
      max: null
    }
  });


const filteredProperties: Property[] = useMemo(() => {
  return fetchedProperties.map((item: any): Property => {
    const title = item.basicInformation?.title || item.title || 'Unnamed Property';
    const city = item.basicInformation?.address?.city || '';
    const state = item.basicInformation?.address?.state || '';
    const image = item.media?.photos?.exterior?.[0] || 'https://via.placeholder.com/400x300?text=No+Image';
    const postedDate = item.metadata?.createdAt?.slice(0, 10) || '';
    const price = item.rent?.expectedRent || item.leaseAmount?.amount || 0;
    const area = item.propertyDetails?.area?.totalArea || 0;
    const bhkType = item.propertyDetails?.bhkType || '1 BHK';
    const bathrooms = item.propertyDetails?.bathrooms || 1;
    const furnishing = item.propertyDetails?.furnishingStatus || 'Unfurnished';
    const status = (item.availability?.type || 'Available') as PropertyStatus;

    const commercialType = item.commercialType || '';
    const propertyType = item.propertyType || '';
    const residentialType = item.residentialType || '';

    const classifications: { check: boolean; label: PropertyType }[] = [
      { check: commercialType.includes('Warehouse (Sell)'), label: 'Commercial Sale Warehouse' },
      { check: commercialType.includes('Showroom (Sell)'), label: 'Commercial Sale Showroom' },
      { check: commercialType.includes('Shop (Sell)'), label: 'Commercial Sale Shop' },
      { check: propertyType === 'Sale Independent House', label: 'Residential Sale Independent House' },
      { check: propertyType === 'Sale Plot', label: 'Residential Sale Plot' },
      { check: residentialType.includes('Apartment (Rent)'), label: 'Residential Apartment (Rent)' },
      { check: residentialType.includes('Apartment (Sale)'), label: 'Residential Apartment (Sale)' },
      { check: propertyType === 'Sale Builder Floor', label: 'Residential Sale Builder Floor' },
      { check: propertyType === 'Rent Builder Floor', label: 'Residential Rent Builder Floor' },
      { check: propertyType === 'Rent Independent House', label: 'Residential Rent Independent House' },
      { check: propertyType === 'Lease Independent House', label: 'Residential Lease Independent House' },
      { check: propertyType === 'Lease Apartment', label: 'Residential Lease Apartment' },
      { check: propertyType === 'Lease Builder Floor', label: 'Residential Lease Builder Floor' },
      { check: item.basicInformation?.showroomType?.length > 0 || item.showroomDetails, label: 'Showroom' },
      { check: item.basicInformation?.shedType?.length > 0 || item.shedDetails, label: 'Shed' },
      { check: item.basicInformation?.storeType?.length > 0, label: 'Retail Store' },
      { check: item.basicInformation?.shopType?.length > 0 || item.shopDetails, label: 'Shop' },
      { check: item.plotDetails || item.totalPlotArea, label: 'Plot' },
      { check: item.coveredSpaceDetails, label: 'Warehouse' },
      { check: item.Agriculturelanddetails, label: 'Agricultural Land (Rent)' },
      { check: item.spaceDetails, label: 'Covered Space (Rent)' },
      { check: item.coveredSpaceDetails?.ceilingHeight, label: 'Warehouse' },
      { check: item.officeSpaceDetails?.seatingcapacity, label: 'Office Space' },
      { check: commercialType.includes('Warehouse (Rent)'), label: 'Warehouse (Rent)' },
      { check: commercialType.includes('Office Space (Rent)'), label: 'Office Space (Rent)' },
      { check: commercialType.includes('Shop (Rent)'), label: 'Shop (Rent)' },
      { check: commercialType.includes('Showroom (Rent)'), label: 'Showroom (Rent)' },
      { check: commercialType.includes('Shed (Rent)'), label: 'Shed (Rent)' },
      { check: commercialType.includes('Plot (Rent)'), label: 'Plot (Rent)' },
      { check: commercialType.includes('Agriculture (Sell)'), label: 'Agriculture (Sell)' },
      { check: commercialType.includes('Office Space (Sell)'), label: 'Office Space (Sell)' },
      { check: commercialType.includes('Retail Store (Sell)'), label: 'Retail Store (Sell)' },
      { check: commercialType.includes('Plot (Sell)'), label: 'Plot (Sell)' },
      { check: commercialType.includes('Other') && !item.coveredSpaceDetails && !item.plotDetails, label: 'Standalone Building (Rent)' },
      { check: commercialType.includes('Other'), label: 'Standalone Building' }
    ];

    const matchedType = classifications.find((cls) => cls.check)?.label || 'Agricultural';

    const intent: PropertyIntent = [
      'Commercial Sale Warehouse',
      'Commercial Sale Shop',
      'Commercial Sale Showroom',
      'Retail Store (Sell)',
      'Office Space (Sell)',
      'Plot (Sell)',
      'Agriculture (Sell)'
    ].includes(matchedType)
      ? 'Sale'
      : 'Lease';

    return {
      id: item._id || item.propertyId || '',
      title,
      type: matchedType,
      listingType: 'Owner' as ListingType,
      price,
      location: `${city}, ${state}`,
      area,
      image,
      postedDate,
      status,
      intent,
      bhkType,
      bathrooms,
      furnishing
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

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-black text-white py-3 sticky top-0 z-10">
        <div className="container mx-auto px-2">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-3">
            <div className="flex items-center gap-2 mb-2 md:mb-0">
              <Home size={20} />
              <span className="text-xl font-bold">RentAmigo</span>
            </div>
            {/* Responsive Location Selector */}
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
              <form onSubmit={handleSearch} className="flex items-center gap-2">
                <div className="relative flex-1">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                    <Search size={16} />
                  </div>
                  <input
                    type="text"
                    placeholder={isListening ? 'Listening...' : "Try: '2 BHK in HSR Layout under 30000' or '13000 rent in Koramangala'"}
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
      {/* Location Modal */}
      {showLocationModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Select Location</h2>
              <button
                onClick={() => setShowLocationModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            <div className="relative mb-4">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search for a city..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                value={locationSearch}
                onChange={(e) => setLocationSearch(e.target.value)}
              />
            </div>
            {recentLocations.length > 0 && (
              <div className="mb-2">
                <h3 className="text-sm font-semibold text-gray-700 mb-1">Recent</h3>
                <div className="flex flex-wrap gap-2">
                  {recentLocations.map((loc) => (
                    <button
                      key={loc}
                      className={`px-3 py-1 rounded-full text-sm border ${loc === location ? 'bg-black text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                      onClick={() => handleLocationChange(loc)}
                    >
                      {loc}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <div className="max-h-60 overflow-y-auto">
              {filteredLocations.map((loc) => (
                <button
                  key={loc}
                  className={`w-full text-left px-3 py-2 rounded-lg mb-1 ${loc === location ? 'bg-black text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  onClick={() => handleLocationChange(loc)}
                >
                  {loc}
                </button>
              ))}
              {filteredLocations.length === 0 && (
                <div className="text-gray-400 text-center py-6">No locations found.</div>
              )}
            </div>
          </div>
        </div>
      )}

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

          {/* Previous (Unfiltered) Property Cards */}
          {loading ? (
  <div className="text-center py-8 text-gray-500">Loading properties...</div>
) : (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
    {sortedResults.map((property) => (
  <div 
    key={property.id} 
    onClick={() => navigate(`/detailprop/${property.id}`)} 
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