import { useState, useEffect, useCallback, useMemo } from "react";
import { X } from "lucide-react";
import { Property } from "../types/index";
import { PropertyCard } from "../components/PropertyCard";
import { LoadingOverlay } from "../LoadingOverlay";
import axios from "axios";

// Sample initial properties for demonstration
const initialProperties: Property[] = [
  {
    id: '1',
    title: 'Modern Apartment in Downtown',
    imageUrl: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    price: 2500,
    location: '123 Main St, San Francisco, CA',
    area: 1200,
    furnishing: 'Fully Furnished',
    postedDate: '2023-06-15T10:30:00.000Z',
    status: 'Available',
    intent: 'Rent',
    type: 'Apartment',
    listingType: 'RentAmigo',
    propertyId: 'APT12345678',
    name: ""
  },

];

export function Properties() {
  const [isLoading, setIsLoading] = useState(true);
  const [properties, setProperties] = useState<Property[]>([]);
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);
  const [filter, setFilter] = useState<"Available" | "Rented" | "Pending" | "All">("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [typeFilter, setTypeFilter] = useState<string>("All");
  const [intentFilter, setIntentFilter] = useState<string>("All");

  // Fetch all properties on component mount
  useEffect(() => {
    let isMounted = true;
    
    const fetchAllProperties = async () => {
      try {
        // First try to get user-specific properties
        try {
          const storedUser = sessionStorage.getItem("user");
          if (storedUser) {
            const userData = JSON.parse(storedUser);
            const userId = userData.id;
            const propertiesRes = await axios.get("/api/properties/property/user", { 
              params: { userId } 
            });
            
            const userProperties = propertiesRes.data || [];
            if (userProperties.length > 0) {
              const finalProperties = userProperties.map((property: any) => ({
                ...property, // Spread all existing properties first
                id: property.id || `property-${Math.random().toString(36).substr(2, 9)}`,
                title: property.title || property.basicInformation?.title || property.pgDetails?.name || property.basicInformation?.propertyName || 'Untitled Property',
                name: property.name || property.basicInformation?.propertyName || property.pgDetails?.name || '',
                status: property.status || 'Available',
                price: property.price || property.rent || 0,
                rent: property.rent || property.price || 0,
                type: property.type || property.metadata?.propertyType || property.metaData?.propertyType || 'Unknown',
                intent: property.intent || property.metadata?.intent || property.metaData?.intent || 'Rent',
                location: property.location || 
                          (property.basicInformation?.address ? 
                            `${property.basicInformation.address.city || ''}, ${property.basicInformation.address.state || ''}` : 
                            'Location not specified'),
                area: property.area || property.propertyDetails?.area?.totalArea || 0,
                furnishing: property.furnishing || property.propertyDetails?.furnishingStatus || 'Unfurnished',
                imageUrl: property.imageUrl || property.image || property.media?.photos?.exterior?.[0] || 'https://via.placeholder.com/300',
                propertyId: property.propertyId || property.id,
                listingType: property.listingType || 'Standard',
                postedDate: property.postedDate || property.createdAt || 
                           (property.metadata?.createdAt ? 
                             new Date(property.metadata.createdAt).toISOString() : 
                             new Date().toISOString())
              }));
              
              if (isMounted) {
                setProperties(finalProperties);
                setIsLoading(false);
                return; // Exit if we have user properties
              }
            }
          }
        } catch (userPropsError) {
          console.warn("Couldn't fetch user properties, falling back to all properties:", userPropsError);
        }

        // Fallback to all properties if no user properties found
        const response = await axios.get('/api/allproperties/all');
        const grouped = response.data?.data || {};

        // Flatten the grouped properties
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
        
        // Transform the properties to match our Property type
        const formattedProperties = allProperties.map((property: any) => ({
          id: property.id || `property-${Math.random().toString(36).substr(2, 9)}`,
          title: property.title || property.title || 'Untitled Property',
          name: property.propertyName || property.name || '',
          status: property.status || 'Available',
          price: property.price || property.rent || 0,
          rent: property.rent || property.price || 0,
          type: property.type || property.propertyType || 'Unknown',
          intent: property.intent || 'Rent',
          location: property.location || 'Location not specified',
          area: property.area,
          furnishing: property.furnishing,
          imageUrl: property.imageUrl || property.image || 'https://via.placeholder.com/300',
          propertyId: property.propertyId || property._id,
          listingType: property.listingType || 'Standard',
          postedDate: property.postedDate || property.createdAt || new Date().toISOString(),
          basicInformation: property.basicInformation || {}
        }));

        if (isMounted) {
          setProperties(formattedProperties);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching properties:", error);
        if (isMounted) {
          // Fallback to sample data in development
          if (process.env.NODE_ENV === 'development') {
            setProperties(initialProperties);
          }
          setIsLoading(false);
        }
      }
    };

    fetchAllProperties();
    
    return () => {
      isMounted = false;
    };
  }, []);

  // Handle property deletion
  const handleDelete = useCallback(async (id: string) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      try {
        await axios.delete(`/api/properties/${id}`);
        setProperties((prev: Property[]) => prev.filter((p) => p.id !== id));
      } catch (error) {
        console.error("Error deleting property:", error);
        alert("Failed to delete property. Please try again.");
      }
    }
  }, []);

  // Handle property edit
  const handleEdit = useCallback((id: string) => {
    // Navigate to edit page or open edit modal
    console.log("Edit property:", id);
  }, []);

  // Handle status update initiation
  const handleStatusUpdate = useCallback((id: string) => {
    setSelectedPropertyId(id);
    setShowStatusModal(true);
  }, []);

  // Handle status change confirmation
  const handleStatusChange = useCallback(async (newStatus: string) => {
    if (!selectedPropertyId) return;
    
    try {
      await axios.patch(`/api/properties/${selectedPropertyId}`, { 
        status: newStatus 
      });
      
      setProperties((prev: Property[]) => 
        prev.map((p: Property) => 
          p.id === selectedPropertyId ? { ...p, status: newStatus } : p
        )
      );
      
      setShowStatusModal(false);
      setSelectedPropertyId(null);
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update property status');
    }
  }, [selectedPropertyId]);

  // Filter properties based on search and filters
  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      const propertyTitle = String(property.title || property.name || '').toLowerCase();
      const propertyLocation = String(property.location || '').toLowerCase();
      const propertyType = String(property.type || '');
      const propertyIntent = String(property.intent || '');
      const propertyStatus = String(property.status || '');
      
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = searchTerm === '' || 
        propertyTitle.includes(searchLower) || 
        propertyLocation.includes(searchLower);
        
      const matchesStatus = filter === 'All' || propertyStatus === filter;
      const matchesType = typeFilter === 'All' || propertyType === typeFilter;
      const matchesIntent = intentFilter === 'All' || propertyIntent === intentFilter;
      
      return matchesSearch && matchesStatus && matchesType && matchesIntent;
    });
  }, [properties, searchTerm, filter, typeFilter, intentFilter]);

  if (isLoading) {
    return <LoadingOverlay />;
  }

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            My Properties
          </h1>
          <p className="text-gray-500">
            Manage your property listings and view their status
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search properties..."
            className="w-full p-2 border rounded"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2 flex-wrap">
          <select 
            className="p-2 border rounded"
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
          >
            <option value="All">All Status</option>
            <option value="Available">Available</option>
            <option value="Rented">Rented</option>
            <option value="Pending">Pending</option>
          </select>
          
          <select 
            className="p-2 border rounded"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="All">All Types</option>
            <option value="Apartment">Apartment</option>
            <option value="House">House</option>
            <option value="Villa">Villa</option>
            <option value="Condo">Condo</option>
          </select>
          
          <select 
            className="p-2 border rounded"
            value={intentFilter}
            onChange={(e) => setIntentFilter(e.target.value)}
          >
            <option value="All">All Intents</option>
            <option value="Rent">For Rent</option>
            <option value="Sale">For Sale</option>
          </select>
        </div>
      </div>

      {/* Properties Grid */}
      {filteredProperties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onDelete={handleDelete}
              onEdit={handleEdit}
              onStatusUpdate={handleStatusUpdate}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">No properties found matching your criteria.</p>
        </div>
      )}

      {/* Status Update Modal */}
      {showStatusModal && selectedPropertyId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-2 sm:p-4 z-50">
          <div className="bg-white rounded-xl p-3 sm:p-4 md:p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-3 sm:mb-4">
              <h2 className="text-lg sm:text-xl font-semibold">Update Status</h2>
              <button
                onClick={() => setShowStatusModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-3">
              {['Available', 'Rented', 'Pending'].map((status) => (
                <button
                  key={status}
                  onClick={() => handleStatusChange(status)}
                  className="w-full text-left p-2 hover:bg-gray-50 rounded"
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}