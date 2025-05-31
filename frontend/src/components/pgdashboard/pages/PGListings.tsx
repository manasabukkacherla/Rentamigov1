import React, { useState, useMemo, useEffect } from 'react';
import axios from 'axios';
import { Eye, Pencil, Trash2, Search, Filter, MapPin, Users, IndianRupee, Wifi, Car, Dumbbell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
interface PG {
  propertyId: string;
  pgDetails: {
    name: string;
    address: string;
  };
  pricing: {
    rent: number;
  };
  media: {
    photos: string[];
  };
  roomConfiguration: {
    sharingTypes: string[];
    singleRoomAmenities: string[];
    doubleShareRoomAmenities: string[];
    tripleShareRoomAmenities: string[];
    fourShareRoomAmenities: string[];
    fiveShareRoomAmenities: string[];
  };
}

const PGListings: React.FC = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook for navigation
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    priceRange: 'all',
    sharing: 'all',
    area: 'all',
    amenities: [] as string[],
  });
  const [showFilters, setShowFilters] = useState(false);
  const [pgs, setPgs] = useState<PG[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch PG data from the API when the component mounts
  useEffect(() => {
    const fetchPGs = async () => {
      try {
        const response = await axios.get('/api/residential/pgmain');
        setPgs(response.data.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch PG data');
        setLoading(false);
      }
    };

    fetchPGs();
  }, []);

  // Filter PGs based on search term and filter criteria
  const filteredPGs = useMemo(() => {
    return pgs.filter(pg => {
      const matchesSearch =
        pg.pgDetails.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pg.pgDetails.address.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesPrice =
        filters.priceRange === 'all' ||
        (filters.priceRange === 'under10k' && pg.pricing.rent < 10000) ||
        (filters.priceRange === '10k-15k' && pg.pricing.rent >= 10000 && pg.pricing.rent <= 15000) ||
        (filters.priceRange === 'above15k' && pg.pricing.rent > 15000);

      const matchesSharing = filters.sharing === 'all' || pg.roomConfiguration.sharingTypes.includes(filters.sharing);
      const matchesArea = filters.area === 'all' || pg.pgDetails.address === filters.area;

      const matchesAmenities =
        filters.amenities.length === 0 ||
        filters.amenities.every(amenity => pg.roomConfiguration.singleRoomAmenities.includes(amenity));

      return matchesSearch && matchesPrice && matchesSharing && matchesArea && matchesAmenities;
    });
  }, [pgs, searchTerm, filters]);

  // Handle View button click and navigate to PG details page
  const handleView = (propertyId: string) => {
    console.log('Navigating to PG:', propertyId);  // Debugging line to see if id is correct
    navigate(`/pgdash/listings/${propertyId}`); // Navigate using propertyId
  };

 const handleEdit = (propertyId: string) => {
  navigate(`/updatepropertyform/${propertyId}`);
};


const handleDelete = async (propertyId: string) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this PG listing?");
  if (!confirmDelete) return;

  try {
    const response = await axios.delete(`/api/residential/pgmain/${propertyId}`);

    if (response.data.success) {
      setPgs(prev => prev.filter(pg => pg.propertyId !== propertyId));
      toast.success(`Property with ID ${propertyId} deleted successfully.`);
    } else {
      toast.error(response.data.error || "Failed to delete the property.");
    }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Delete error:', message);
    toast.error("Delete failed: " + message);
  }
};



  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">PG Listings</h1>
        <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-900 transition-colors">
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
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
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
              {/* Filters */}
            </div>
          )}
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <p>Loading PGs...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            filteredPGs.map((pg) => (
              <div key={pg.propertyId} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                <img src={pg.media.photos[0]} alt={pg.pgDetails.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold text-gray-900">{pg.pgDetails.name}</h3>
                    <div className="flex space-x-2">
                      <button onClick={() => handleView(pg.propertyId)} className="p-1 text-gray-600 hover:text-gray-900">
                        <Eye className="h-5 w-5" />
                      </button>
                      <button onClick={() => handleEdit(pg.propertyId)} className="p-1 text-gray-600 hover:text-gray-900">
                        <Pencil className="h-5 w-5" />
                      </button>
                      <button onClick={() => handleDelete(pg.propertyId)} className="p-1 text-gray-600 hover:text-gray-900">
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span className="text-sm">{pg.pgDetails.address}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Users className="h-4 w-4 mr-2" />
                      <span className="text-sm">{pg.roomConfiguration.sharingTypes.join(', ')}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <IndianRupee className="h-4 w-4 mr-2" />
                      <span className="text-sm">₹{pg.pricing.rent.toLocaleString()}/month</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {pg.roomConfiguration.singleRoomAmenities.includes('wifi') && (
                        <Wifi className="h-4 w-4 text-gray-600" />
                      )}
                      {pg.roomConfiguration.singleRoomAmenities.includes('parking') && (
                        <Car className="h-4 w-4 text-gray-600" />
                      )}
                      {pg.roomConfiguration.singleRoomAmenities.includes('gym') && (
                        <Dumbbell className="h-4 w-4 text-gray-600" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {filteredPGs.length === 0 && !loading && !error && (
          <div className="text-center py-12">
            <p className="text-gray-500">No PGs found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PGListings;
