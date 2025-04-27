import React, { useState, useMemo } from 'react';
import { Building2, Search, Filter, MapPin, Users, IndianRupee, Eye, Pencil, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PG {
  id: string;
  name: string;
  location: string;
  area: string;
  rooms: string;
  occupancy: string;
  rent: number;
  sharing: string;
  amenities: string[];
  image: string;
}

const PGListings: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    priceRange: 'all',
    sharing: 'all',
    area: 'all',
    amenities: [] as string[],
  });
  const [showFilters, setShowFilters] = useState(false);

  // Sample PG data
  const pgs: PG[] = [
    {
      id: '1',
      name: 'Sunshine PG',
      location: 'Koramangala',
      area: 'Koramangala',
      rooms: '24',
      occupancy: '95%',
      rent: 12000,
      sharing: 'single',
      amenities: ['wifi', 'parking', 'gym'],
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80'
    },
    {
      id: '2',
      name: 'Green Valley',
      location: 'HSR Layout',
      area: 'HSR Layout',
      rooms: '32',
      occupancy: '88%',
      rent: 14000,
      sharing: 'double',
      amenities: ['wifi', 'gym'],
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80'
    },
    {
      id: '3',
      name: 'City Living',
      location: 'Indiranagar',
      area: 'Indiranagar',
      rooms: '28',
      occupancy: '92%',
      rent: 15000,
      sharing: 'triple',
      amenities: ['wifi', 'parking'],
      image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80'
    },
  ];

  // Filter PGs based on search term and filters
  const filteredPGs = useMemo(() => {
    return pgs.filter(pg => {
      const matchesSearch = pg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          pg.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesPrice = filters.priceRange === 'all' ||
        (filters.priceRange === 'under10k' && pg.rent < 10000) ||
        (filters.priceRange === '10k-15k' && pg.rent >= 10000 && pg.rent <= 15000) ||
        (filters.priceRange === 'above15k' && pg.rent > 15000);

      const matchesSharing = filters.sharing === 'all' || pg.sharing === filters.sharing;
      
      const matchesArea = filters.area === 'all' || pg.area === filters.area;

      const matchesAmenities = filters.amenities.length === 0 ||
        filters.amenities.every(amenity => pg.amenities.includes(amenity));

      return matchesSearch && matchesPrice && matchesSharing && matchesArea && matchesAmenities;
    });
  }, [pgs, searchTerm, filters]);

  const handleAmenityToggle = (amenity: string) => {
    setFilters(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const handleView = (pgId: string) => {
    navigate(`/pgdash/listings/${pgId}`);
  };

  const handleEdit = (pgId: string) => {
    // Handle edit action
    console.log('Edit PG:', pgId);
  };

  const handleDelete = (pgId: string) => {
    // Handle delete action
    console.log('Delete PG:', pgId);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">PG Listings</h1>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
          Add New PG
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search PGs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 ${
                showFilters ? 'bg-gray-50' : ''
              }`}
            >
              <Filter className="h-5 w-5 mr-2" />
              Filters
            </button>
          </div>

          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                <select
                  value={filters.priceRange}
                  onChange={(e) => setFilters(prev => ({ ...prev, priceRange: e.target.value }))}
                  className="w-full p-2 border border-gray-200 rounded-lg"
                >
                  <option value="all">All Prices</option>
                  <option value="under10k">Under ₹10,000</option>
                  <option value="10k-15k">₹10,000 - ₹15,000</option>
                  <option value="above15k">Above ₹15,000</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sharing Type</label>
                <select
                  value={filters.sharing}
                  onChange={(e) => setFilters(prev => ({ ...prev, sharing: e.target.value }))}
                  className="w-full p-2 border border-gray-200 rounded-lg"
                >
                  <option value="all">All Types</option>
                  <option value="single">Single Sharing</option>
                  <option value="double">Double Sharing</option>
                  <option value="triple">Triple Sharing</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Area</label>
                <select
                  value={filters.area}
                  onChange={(e) => setFilters(prev => ({ ...prev, area: e.target.value }))}
                  className="w-full p-2 border border-gray-200 rounded-lg"
                >
                  <option value="all">All Areas</option>
                  <option value="Koramangala">Koramangala</option>
                  <option value="HSR Layout">HSR Layout</option>
                  <option value="Indiranagar">Indiranagar</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Amenities</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.amenities.includes('wifi')}
                      onChange={() => handleAmenityToggle('wifi')}
                      className="rounded text-indigo-600"
                    />
                    <span className="ml-2 text-sm text-gray-600">WiFi</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.amenities.includes('parking')}
                      onChange={() => handleAmenityToggle('parking')}
                      className="rounded text-indigo-600"
                    />
                    <span className="ml-2 text-sm text-gray-600">Parking</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.amenities.includes('gym')}
                      onChange={() => handleAmenityToggle('gym')}
                      className="rounded text-indigo-600"
                    />
                    <span className="ml-2 text-sm text-gray-600">Gym</span>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPGs.map((pg) => (
            <div key={pg.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
              <img
                src={pg.image}
                alt={pg.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold text-gray-800">{pg.name}</h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleView(pg.id)}
                      className="p-1 text-blue-600 hover:text-blue-900"
                    >
                      <Eye className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleEdit(pg.id)}
                      className="p-1 text-indigo-600 hover:text-indigo-900"
                    >
                      <Pencil className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(pg.id)}
                      className="p-1 text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span className="text-sm">{pg.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users className="h-4 w-4 mr-2" />
                    <span className="text-sm">{pg.sharing} sharing</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <IndianRupee className="h-4 w-4 mr-2" />
                    <span className="text-sm">₹{pg.rent.toLocaleString()}/month</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredPGs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No PGs found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PGListings;