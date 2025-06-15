import React, { useState, useMemo } from 'react';
import { MapPin, ChevronDown, X, Home, Search, Filter, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Property, Filters, FurnishingType, ListingType, PropertyIntent, PropertyStatus, PropertyType } from './types';
import { PropertyCard } from './components/PropertyCard';
import { FiltersPanel } from './components/FiltersPanel';
import { VoiceSearch } from './components/VoiceSearch';
import { searchProperties, formatSearchSummary, formatNearbySuggestion, extractSearchCriteria } from './utils/searchUtils';
import axios from 'axios';





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

      // try {
        // const [
        //   agriRes, othersRes, coveredRes, plotRes, retailRes, shedRes, shopRes, showroomRes,
        //   rentAgriRes, rentCoveredRes, warehouseRes, officeSpaceRes, rentOthersRes, rentOfficeSpaceRes, rentShopRes, rentRetailStoreRes, rentShowroomRes, rentShedRes, rentPlotRes,
        //   sellShopRes, sellAgricultureRes, sellCoveredSpaceRes, sellOfficeSpaceRes, sellOthersRes, sellRetailStoreRes, sellShedRes, sellPlotRes,
        //   // Residential Sale Apartments
        //   residentialSaleApartmentsRes,
        //   // Residential Sale Builder Floors
        //   residentialSaleBuilderFloorsRes,
        //   // Residential Rent Apartments
        //   residentialRentApartmentsRes,
        //   // Residential Rent Builder Floors
        //   residentialRentBuilderFloorsRes,
        //   // Residential Rent Independent Houses
        //   residentialRentIndependentHousesRes,
        //   // Residential Lease Independent Houses
        //   residentialLeaseIndependentHousesRes,
        //   // Residential Lease Apartments
        //   residentialLeaseApartmentsRes,
        //   // Residential Lease Builder Floors
        //   residentialLeaseBuilderFloorsRes,
        //   // Residential Sale Plots
        //   residentialSalePlotsRes,
        //   // Residential Sale Independent Houses
        //   residentialSaleIndependentHousesRes,
        //   // Fetch Commercial Sale Showrooms Data
        //   commercialSaleShowroomsRes,
        //   // Fetch Commercial Sale Warehouses Data
        //   commercialSaleWarehousesRes,  // <-- Added Commercial Sale Warehouses API request
        //   // Fetch Commercial Sale Shops Data <-- Added Commercial Sale Shops request
        //   commercialSaleShopsRes,  // <-- Added Commercial Sale Shops API request
        //   // Fetch Residential PG data
        //   // pgMainRes  // <-- Added Residential PG Main request
        // ] = await Promise.all([
        //   // Commercial Lease Properties
        //   fetch('/api/commercial/lease/agriculture'),
        //   fetch('/api/commercial/lease/others'),
        //   fetch('/api/commercial/lease/covered-space'),
        //   fetch('/api/commercial/lease/plots'),
        //   fetch('/api/commercial/lease/retail-store'),
        //   fetch('/api/commercial/lease/sheds'),
        //   fetch('/api/commercial/lease/shops'),
        //   fetch('/api/commercial/lease/showrooms'),
        //   fetch('/api/commercial/lease/warehouses'),
        //   fetch('/api/commercial/lease/office-space'),

        //   // Commercial Rent Properties
        //   fetch('/api/commercial/rent/agriculture'),
        //   fetch('/api/commercial/rent/covered-space'),
        //   fetch('/api/commercial/rent/others'),
        //   fetch('/api/commercial/rent/warehouses'),
        //   fetch('/api/commercial/rent/office-space'),
        //   fetch('/api/commercial/rent/shops'),
        //   fetch('/api/commercial/rent/retail-store'),
        //   fetch('/api/commercial/rent/showrooms'),
        //   fetch('/api/commercial/rent/sheds'),
        //   fetch('/api/commercial/rent/plots'),

        //   // Commercial Sell Properties
        //   fetch('/api/commercial/sell/agriculture'),
        //   fetch('/api/commercial/sell/covered-space'),
        //   fetch('/api/commercial/sell/office-space'),
        //   fetch('/api/commercial/sell/others'),
        //   fetch('/api/commercial/sell/retail-store'),
        //   fetch('/api/commercial/sell/sheds'),
        //   fetch('/api/commercial/sell/plots'),
        //   fetch('/api/commercial/sell/showrooms'),  // <-- Added request for Commercial Sale Showrooms
        //   fetch('/api/commercial/sell/warehouses'),  // <-- Added request for Commercial Sale Warehouses
        //   fetch('/api/commercial/sell/shops'), // <-- Added request for Commercial Sale Shops

        //   // Residential Sale 
        //   fetch('/api/residential/sale/apartment'),
        //   fetch('/api/residential/sale/builder-floor'),
        //   fetch('/api/residential/sale/plots'),
        //   fetch('/api/residential/sale/independent-house'),

        //   // Residential Rent 
        //   fetch('/api/residential/rent/apartment'),
        //   fetch('/api/residential/rent/builder-floor'),
        //   fetch('/api/residential/rent/independent-house'),

        //   // Residential Lease 
        //   fetch('/api/residential/lease/independent-house'),
        //   fetch('/api/residential/lease/apartment'),
        //   fetch('/api/residential/lease/builder-floor'),

        //   // Residential PG data
        //   fetch('/api/residential/pgmain')  // <-- Fetch Residential PG data
        // ]);

        // const [
        //   agriData, othersData, coveredData, plotData, retailData, shedData, shopData, showroomData,
        //   rentAgriData, rentCoveredData, warehouseData, officeSpaceData, rentOthersData, rentOfficeSpaceData, rentShopData, rentRetailStoreData, rentShowroomData, rentShedData, rentPlotData,
        //   sellShopData, sellAgricultureData, sellCoveredSpaceData, sellOfficeSpaceData, sellOthersData, sellRetailStoreData, sellShedData, sellPlotData,
        //   residentialSaleApartmentsData,
        //   residentialSaleBuilderFloorsData,
        //   residentialRentApartmentsData,
        //   residentialRentBuilderFloorsData,
        //   residentialRentIndependentHousesData,
        //   residentialLeaseIndependentHousesData,
        //   residentialLeaseApartmentsData,
        //   residentialLeaseBuilderFloorsData,
        //   residentialSalePlotsData,
        //   residentialSaleIndependentHousesData,
        //   commercialSaleShowroomsData,
        //   commercialSaleWarehousesData,  // <-- Added Commercial Sale Warehouses Data
        //   commercialSaleShopsData,  // <-- Added Commercial Sale Shops Data
        //   // pgMainData  // <-- Residential PG Main Data
        // ] = await Promise.all([
        //   agriRes.json(), othersRes.json(), coveredRes.json(), plotRes.json(), retailRes.json(),
        //   shedRes.json(), shopRes.json(), showroomRes.json(), rentAgriRes.json(), rentCoveredRes.json(),
        //   warehouseRes.json(), officeSpaceRes.json(), rentOthersRes.json(), rentOfficeSpaceRes.json(),
        //   rentShopRes.json(), rentRetailStoreRes.json(), rentShowroomRes.json(), rentShedRes.json(),
        //   rentPlotRes.json(), sellShopRes.json(), sellAgricultureRes.json(), sellCoveredSpaceRes.json(),
        //   sellOfficeSpaceRes.json(), sellOthersRes.json(), sellRetailStoreRes.json(), sellShedRes.json(),
        //   sellPlotRes.json(), residentialSaleApartmentsRes.json(), residentialSaleBuilderFloorsRes.json(),
        //   residentialRentApartmentsRes.json(), residentialRentBuilderFloorsRes.json(), residentialRentIndependentHousesRes.json(),
        //   residentialLeaseIndependentHousesRes.json(), residentialLeaseApartmentsRes.json(), residentialLeaseBuilderFloorsRes.json(),
        //   residentialSalePlotsRes.json(), residentialSaleIndependentHousesRes.json(),
        //   commercialSaleShowroomsRes.json(),
        //   commercialSaleWarehousesRes.json(),  // <-- Commercial Sale Warehouses Data
        //   commercialSaleShopsRes.json(),  // <-- Commercial Sale Shops Data
        //   // pgMainRes.json()  // <-- Residential PG Main Data
        // ]);

        // const allProperties = [
        //   ...agriData.data, ...othersData.data, ...coveredData.data, ...plotData.data,
        //   ...retailData.data, ...shedData.data, ...shopData.data, ...showroomData.data,
        //   ...rentAgriData.data, ...rentCoveredData.data, ...warehouseData.data, ...officeSpaceData.data,
        //   ...rentOthersData.data, ...rentOfficeSpaceData.data, ...rentShopData.data,
        //   ...rentRetailStoreData.data, ...rentShowroomData.data, ...rentShedData.data, ...rentPlotData.data,
        //   ...sellShopData.data, ...sellAgricultureData.data, ...sellCoveredSpaceData.data,
        //   ...sellOfficeSpaceData.data, ...sellOthersData.data, ...sellRetailStoreData.data,
        //   ...sellShedData.data, ...sellPlotData.data,
        //   ...residentialSaleApartmentsData.data, ...residentialSaleBuilderFloorsData.data,
        //   ...residentialRentApartmentsData.data, ...residentialRentBuilderFloorsData.data,
        //   ...residentialRentIndependentHousesData.data, ...residentialLeaseIndependentHousesData.data,
        //   ...residentialLeaseApartmentsData.data, ...residentialLeaseBuilderFloorsData.data,
        //   ...residentialSalePlotsData.data,
        //   ...residentialSaleIndependentHousesData.data,
        //   ...commercialSaleShowroomsData.data,
        //   ...commercialSaleWarehousesData.data,  // Commercial Sale Warehouses Data
        //   ...commercialSaleShopsData.data,  // Commercial Sale Shops Data
        //   // ...pgMainData.data  // Residential PG Main Data
        // ];
        // const data=await axios.get('/api/allproperties/all');
        // const allProperties=[...data.data];

          try {
            const response = await axios.get('/api/allproperties/all');
            const grouped = response.data?.data || {};
        
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
        
            setFetchedProperties(allProperties);
            console.log('Fetched properties:', allProperties);
          } catch (error) {
            console.error('Error fetching properties:', error);
          } finally {
            setLoading(false);
          }
        };
        
        // Update the state with all the fetched properties
       

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
    sharingTypes: [],
    priceRange: {
      min: null,
      max: null
    }
  });
  const filteredProperties: Property[] = useMemo(() => {
    return fetchedProperties.map((item: any): Property => {
      // Define property type flags for regular properties
      // const isOther = item.commercialType?.includes("Other");
      // const isCovered = item.coveredSpaceDetails !== undefined;
      // const isPlot = item.plotDetails !== undefined || item.totalPlotArea !== undefined;
      // const isRetail = item.basicInformation?.storeType?.length > 0;
      // const isShed = item.basicInformation?.shedType?.length > 0 || item.shedDetails !== undefined;
      // const isShop = item.basicInformation?.shopType?.length > 0 || item.shopDetails !== undefined;
      // const isShowroom = item.basicInformation?.showroomType?.length > 0 || item.showroomDetails !== undefined;
      // const isRentAgri = item.Agriculturelanddetails !== undefined;
      // const isRentCovered = item.spaceDetails !== undefined;
      // const isWarehouse = item.coveredSpaceDetails?.ceilingHeight !== undefined;
      // const isOfficeSpace = item.officeSpaceDetails?.seatingcapacity !== undefined;
      // const isResidentialApartmentSale = item.residentialType?.includes("Apartment (Sale)"); // Residential Apartment Sale classification
      // const isResidentialSaleBuilderFloor = item.propertyType === "Sale Builder Floor"; // Residential Sale Builder Floor classification
      // const isResidentialRentApartment = item.residentialType?.includes("Apartment (Rent)"); // Residential Rent Apartment classification
      // const isResidentialRentBuilderFloor = item.propertyType === "Rent Builder Floor"; // Residential Rent Builder Floor classification
      // const isResidentialRentIndependentHouse = item.propertyType === "Rent Independent House"; // Residential Rent Independent House classification
      // const isResidentialLeaseIndependentHouse = item.propertyType === "Lease Independent House"; // Residential Lease Independent House classification
      // const isResidentialLeaseApartment = item.propertyType === "Lease Apartment"; // Lease Apartment classification
      // const isResidentialLeaseBuilderFloor = item.propertyType === "Lease Builder Floor"; // Residential Lease Builder Floor classification
      // const isResidentialSalePlot = item.propertyType === "Sale Plot"; // Residential Sale Plot classification
      // const isResidentialSaleIndependentHouse = item.propertyType === "Sale Independent House"; // Residential Sale Independent House classification
      // const isCommercialSaleShop = item.commercialType?.includes("Shop (Sell)"); // Commercial Sale Shop classification
      // const isCommercialSaleShowroom = item.commercialType?.includes("Showroom (Sell)"); // Commercial Sale Showroom classification
      // const isCommercialSaleWarehouse = item.commercialType?.includes("Warehouse (Sell)"); // Commercial Sale Warehouse classification

      // // Add classification for Rent Shop, Rent Warehouse, Rent Office Space, Rent Showroom, Rent Shed, Rent Plot, Sell Shop, Sell Agriculture, Sell Office Space, Sell Retail Store, and Sell Plot
      // const isRentWarehouse = item.commercialType?.includes("Warehouse (Rent)"); // Rent Warehouse classification
      // const isRentOfficeSpace = item.commercialType?.includes("Office Space (Rent)"); // Rent Office Space classification
      // const isRentShop = item.commercialType?.includes("Shop (Rent)"); // Rent Shop classification
      // const isRentShowroom = item.commercialType?.includes("Showroom (Rent)"); // Rent Showroom classification
      // const isRentShed = item.commercialType?.includes("Shed (Rent)"); // Rent Shed classification
      // const isRentPlot = item.commercialType?.includes("Plot (Rent)"); // Rent Plot classification
      // const isSellShop = item.commercialType?.includes("Shop (Sell)"); // Sell Shop classification
      // const isSellAgriculture = item.commercialType?.includes("Agriculture (Sell)"); // Sell Agriculture classification
      // const isSellOfficeSpace = item.commercialType?.includes("Office Space (Sell)"); // Sell Office Space classification
      // const isSellRetailStore = item.commercialType?.includes("Retail Store (Sell)"); // Sell Retail Store classification
      // const isSellPlot = item.commercialType?.includes("Plot (Sell)"); // Sell Plot classification

      // // Classify Rent Others
      // const isRentOthers = item.commercialType?.includes("Other") && !item.coveredSpaceDetails && !item.plotDetails;

      // // Check if it's PG data from /api/residential/pgmain
      // const isPG = item.pgDetails !== undefined; // Check if the PG details exist

      return {
        id: item._id || item.propertyId || '',
        propertyId: item.propertyId || '',
        title: item.basicInformation?.title || item.title || item.basicInformation?.propertyName || item.pgDetails?.name || 'Unnamed Property',
        propertyName:item.metadata?.propertyName ||'',
        type: item.metadata?.propertyType || '',
        listingType: 'Owner' as ListingType,
        price: item.rent?.expectedRent || item.leaseAmount?.amount || 0,
        location: `${item.basicInformation?.address?.city || ''}, ${item.basicInformation?.address?.state || ''}` || item.pgDetails?.address || '',
        area: item.propertyDetails?.area?.totalArea || item.propertySize || 0,
        image: item.media?.photos?.exterior?.[0] || 'https://via.placeholder.com/400x300?text=No+Image',
        postedDate: item.metadata?.createdAt?.slice(0, 10) || '',
        status: (item.availability?.type || 'Available') as PropertyStatus,
        intent: item.metadata?.intent || '',
        // bhkType: item.propertyDetails?.bhkType || '1 BHK',  // Default BHK Type
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
      !activeFilters.furnishingTypes.length 
      // && !activeFilters.bhkTypes.length 
      && !activeFilters.sharingTypes.length &&
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
    // if (activeFilters.bhkTypes.length) {
    //   criteria.bhkType = activeFilters.bhkTypes[0];
    // }
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

  const categoryCodes: Record<string, string> = {
    residential: "RES",
    commercial: "COM",
    other: "OT",
  };

  const listingCodes: Record<string, string> = {
    rent: "RE",
    sell: "SE",
    lease: "LE",
    "pg/co-living": "PG",
  };

  // Normalize Property Type Mapping
  const subCategoryCodes: Record<string, string> = {
    shops: "SH",
    "retail-store": "RS",
    showrooms: "SR",
    "office-space": "OS",
    warehouses: "WH",
    sheds: "SD",
    "covered-space": "CS",
    plots: "PL",
    agriculture: "AG",
    others: "OT",
    apartment: "AP",
    "independent-house": "IH",
    "builder-floor": "BF",
    "shared-space": "SS",
  };

  const handlePropertyClick = (propertyId: string) => {
    // Example: RA-COMLEAAG0010
    // const categoryCode = propertyId.slice(3,6);
    // const listingCode = propertyId.slice(6,8);
    // const typeCode = propertyId.slice(8,10);

    // // Match with defined mappings
    // const category = Object.entries(categoryCodes).find(([_, code]) => code === categoryCode)?.[0] || '';
    // const listing = Object.entries(listingCodes).find(([_, code]) => code === listingCode)?.[0] || '';
    // const type = Object.entries(subCategoryCodes).find(([_, code]) => code === typeCode)?.[0] || '';

    // console.log('Category:', category);
    // console.log('Listing:', listing);
    // console.log('Type:', type);
    
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