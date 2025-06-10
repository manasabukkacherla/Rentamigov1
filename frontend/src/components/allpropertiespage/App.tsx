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
  let hasFetched = false;

const fetchAllProperties = async () => {
  if (hasFetched) return;
  hasFetched = true;

  try {
    const endpoints = [
      '/api/commercial/lease/agriculture',
      '/api/commercial/lease/others',
      '/api/commercial/lease/covered-space',
      '/api/commercial/lease/plot',
      '/api/commercial/lease/retail-store',
      '/api/commercial/lease/sheds',
      '/api/commercial/lease/shops',
      '/api/commercial/lease/showrooms',
      '/api/commercial/lease/warehouses',
      '/api/commercial/lease/office-space',

      '/api/commercial/rent/agriculture',
      '/api/commercial/rent/covered-space',
      '/api/commercial/rent/others',
      '/api/commercial/rent/warehouses',
      '/api/commercial/rent/office-spaces',
      '/api/commercial/rent/shops',
      '/api/commercial/rent/retail-stores',
      '/api/commercial/rent/showrooms',
      '/api/commercial/rent/sheds',
      '/api/commercial/rent/plots',

      '/api/commercial/sell/agriculture',
      '/api/commercial/sell/covered-space',
      '/api/commercial/sell/office-space',
      '/api/commercial/sell/others',
      '/api/commercial/sell/retail-store',
      '/api/commercial/sell/sheds',
      '/api/commercial/sell/plots',
      '/api/commercial/sell/showrooms',
      '/api/commercial/sell/warehouses',
      '/api/commercial/sell/shops',

      '/api/residential/sale/apartments',
      '/api/residential/sale/builder-floor',
      '/api/residential/sale/plots',
      '/api/residential/sale/independent-house',

      '/api/residential/rent/apartment',
      '/api/residential/rent/builder-floor',
      '/api/residential/rent/independent-house',

      '/api/residential/lease/independent-house',
      '/api/residential/lease/appartment',
      '/api/residential/lease/builder-floor',

      '/api/residential/pgmain'
    ];

    const responses = await Promise.all(endpoints.map(url => fetch(url)));

    for (let i = 0; i < responses.length; i++) {
      if (!responses[i].ok) {
        const text = await responses[i].text();
        throw new Error(`Error fetching ${endpoints[i]}: ${responses[i].status} - ${text}`);
      }
    }

    const jsonData = await Promise.all(responses.map(r => r.json()));

    const allProperties = jsonData.flatMap(data => data.data || []);

    setFetchedProperties(allProperties);
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
      max: null
    }
  });
const filteredProperties: Property[] = useMemo(() => {
  return fetchedProperties.map((item: any): Property => {
    // Define property type flags for regular properties
    const isOther = item.commercialType?.includes("Other");
    const isCovered = item.coveredSpaceDetails !== undefined;
    const isPlot = item.plotDetails !== undefined || item.totalPlotArea !== undefined;
    const isRetail = item.basicInformation?.storeType?.length > 0;
    const isShed = item.basicInformation?.shedType?.length > 0 || item.shedDetails !== undefined;
    const isShop = item.basicInformation?.shopType?.length > 0 || item.shopDetails !== undefined;
    const isShowroom = item.basicInformation?.showroomType?.length > 0 || item.showroomDetails !== undefined;
    const isRentAgri = item.Agriculturelanddetails !== undefined;
    const isRentCovered = item.spaceDetails !== undefined;
    const isWarehouse = item.coveredSpaceDetails?.ceilingHeight !== undefined;
    const isOfficeSpace = item.officeSpaceDetails?.seatingcapacity !== undefined;
    const isResidentialApartmentSale = item.residentialType?.includes("Apartment (Sale)"); // Residential Apartment Sale classification
    const isResidentialSaleBuilderFloor = item.propertyType === "Sale Builder Floor"; // Residential Sale Builder Floor classification
    const isResidentialRentApartment = item.residentialType?.includes("Apartment (Rent)"); // Residential Rent Apartment classification
    const isResidentialRentBuilderFloor = item.propertyType === "Rent Builder Floor"; // Residential Rent Builder Floor classification
    const isResidentialRentIndependentHouse = item.propertyType === "Rent Independent House"; // Residential Rent Independent House classification
    const isResidentialLeaseIndependentHouse = item.propertyType === "Lease Independent House"; // Residential Lease Independent House classification
    const isResidentialLeaseApartment = item.propertyType === "Lease Apartment"; // Lease Apartment classification
    const isResidentialLeaseBuilderFloor = item.propertyType === "Lease Builder Floor"; // Residential Lease Builder Floor classification
    const isResidentialSalePlot = item.propertyType === "Sale Plot"; // Residential Sale Plot classification
    const isResidentialSaleIndependentHouse = item.propertyType === "Sale Independent House"; // Residential Sale Independent House classification
    const isCommercialSaleShop = item.commercialType?.includes("Shop (Sell)"); // Commercial Sale Shop classification
    const isCommercialSaleShowroom = item.commercialType?.includes("Showroom (Sell)"); // Commercial Sale Showroom classification
    const isCommercialSaleWarehouse = item.commercialType?.includes("Warehouse (Sell)"); // Commercial Sale Warehouse classification

    // Add classification for Rent Shop, Rent Warehouse, Rent Office Space, Rent Showroom, Rent Shed, Rent Plot, Sell Shop, Sell Agriculture, Sell Office Space, Sell Retail Store, and Sell Plot
    const isRentWarehouse = item.commercialType?.includes("Warehouse (Rent)"); // Rent Warehouse classification
    const isRentOfficeSpace = item.commercialType?.includes("Office Space (Rent)"); // Rent Office Space classification
    const isRentShop = item.commercialType?.includes("Shop (Rent)"); // Rent Shop classification
    const isRentShowroom = item.commercialType?.includes("Showroom (Rent)"); // Rent Showroom classification
    const isRentShed = item.commercialType?.includes("Shed (Rent)"); // Rent Shed classification
    const isRentPlot = item.commercialType?.includes("Plot (Rent)"); // Rent Plot classification
    const isSellShop = item.commercialType?.includes("Shop (Sell)"); // Sell Shop classification
    const isSellAgriculture = item.commercialType?.includes("Agriculture (Sell)"); // Sell Agriculture classification
    const isSellOfficeSpace = item.commercialType?.includes("Office Space (Sell)"); // Sell Office Space classification
    const isSellRetailStore = item.commercialType?.includes("Retail Store (Sell)"); // Sell Retail Store classification
    const isSellPlot = item.commercialType?.includes("Plot (Sell)"); // Sell Plot classification

    // Classify Rent Others
    const isRentOthers = item.commercialType?.includes("Other") && !item.coveredSpaceDetails && !item.plotDetails;

    // Check if it's PG data from /api/residential/pgmain
    const isPG = item.pgDetails !== undefined; // Check if the PG details exist

    return {
      id: item._id || item.propertyId || '',
      title: item.basicInformation?.title || item.title || item.pgDetails?.name || 'Unnamed Property',
      type: isPG
        ? 'PG' as PropertyType  // PG type classification
        : isCommercialSaleWarehouse
        ? 'Commercial Sale Warehouse' as PropertyType  // Added classification for Commercial Sale Warehouse
        : isCommercialSaleShowroom
        ? 'Commercial Sale Showroom' as PropertyType  // Added classification for Commercial Sale Showroom
        : isCommercialSaleShop
        ? 'Commercial Sale Shop' as PropertyType  // Added classification for Commercial Sale Shop
        : isResidentialSaleIndependentHouse
        ? 'Residential Sale Independent House' as PropertyType
        : isResidentialSalePlot
        ? 'Residential Sale Plot' as PropertyType
        : isResidentialRentApartment
        ? 'Residential Apartment (Rent)' as PropertyType
        : isResidentialApartmentSale
        ? 'Residential Apartment (Sale)' as PropertyType
        : isResidentialSaleBuilderFloor
        ? 'Residential Sale Builder Floor' as PropertyType
        : isResidentialRentBuilderFloor
        ? 'Residential Rent Builder Floor' as PropertyType
        : isResidentialRentIndependentHouse
        ? 'Residential Rent Independent House' as PropertyType
        : isResidentialLeaseIndependentHouse
        ? 'Residential Lease Independent House' as PropertyType
        : isResidentialLeaseApartment
        ? 'Residential Lease Apartment' as PropertyType // Correct classification for Lease Apartments
        : isResidentialLeaseBuilderFloor
        ? 'Residential Lease Builder Floor' as PropertyType
        : isShowroom
        ? 'Showroom' as PropertyType
        : isShed
        ? 'Shed' as PropertyType
        : isRetail
        ? 'Retail Store' as PropertyType
        : isShop
        ? 'Shop' as PropertyType
        : isPlot
        ? 'Plot' as PropertyType
        : isCovered
        ? 'Warehouse' as PropertyType
        : isRentAgri
        ? 'Agricultural Land (Rent)' as PropertyType
        : isRentCovered
        ? 'Covered Space (Rent)' as PropertyType
        : isWarehouse
        ? 'Warehouse' as PropertyType
        : isOfficeSpace
        ? 'Office Space' as PropertyType
        : isRentWarehouse
        ? 'Warehouse (Rent)' as PropertyType
        : isRentOfficeSpace
        ? 'Office Space (Rent)' as PropertyType
        : isRentShop
        ? 'Shop (Rent)' as PropertyType
        : isRentShowroom
        ? 'Showroom (Rent)' as PropertyType
        : isRentShed
        ? 'Shed (Rent)' as PropertyType
        : isRentPlot
        ? 'Plot (Rent)' as PropertyType
        : isSellShop
        ? 'Shop (Sell)' as PropertyType
        : isSellAgriculture
        ? 'Agriculture (Sell)' as PropertyType
        : isSellOfficeSpace
        ? 'Office Space (Sell)' as PropertyType
        : isSellRetailStore
        ? 'Retail Store (Sell)' as PropertyType
        : isSellPlot
        ? 'Plot (Sell)' as PropertyType
        : isRentOthers
        ? 'Standalone Building (Rent)' as PropertyType
        : isOther
        ? 'Standalone Building' as PropertyType
        : 'Agricultural' as PropertyType,
      listingType: 'Owner' as ListingType,
      price: item.rent?.expectedRent || item.leaseAmount?.amount || 0,
      location: `${item.basicInformation?.address?.city || ''}, ${item.basicInformation?.address?.state || ''}` || item.pgDetails?.address || '',
      area: item.propertyDetails?.area?.totalArea || 0,
      image: item.media?.photos?.exterior?.[0] || 'https://via.placeholder.com/400x300?text=No+Image',
      postedDate: item.metadata?.createdAt?.slice(0, 10) || '',
      status: (item.availability?.type || 'Available') as PropertyStatus,
      intent: isSellOfficeSpace || isSellRetailStore || isSellPlot ? 'Sale' as PropertyIntent : 'Lease' as PropertyIntent,
      bhkType: item.propertyDetails?.bhkType || '1 BHK',  // Default BHK Type
      bathrooms: item.propertyDetails?.bathrooms || 1,  // Default number of bathrooms
      furnishing: item.propertyDetails?.furnishingStatus || 'Unfurnished',  // Default furnishing
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