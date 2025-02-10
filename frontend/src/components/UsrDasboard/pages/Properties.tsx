import React, { useState, useEffect } from 'react';
import { Plus, Filter, X, Home, Clock, CheckCircle, Search } from 'lucide-react';
import { PropertyCard } from '../PropertyCard';
import { Property } from '../types';
import { LoadingOverlay } from '../LoadingOverlay';
import axios from 'axios';

const initialProperties: Property[] = [
  {
    id: '1',
    name: 'Luxury Villa with Pool',
    rent: 45000,
    status: 'Available',
    imageUrl: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800',
  },
  {
    id: '2',
    name: 'Modern City Apartment',
    rent: 25000,
    status: 'Rented',
    imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800',
  },
];

const statusConfig = {
  Available: {
    icon: Home,
    color: 'bg-green-100 text-green-800 border-green-200',
    description: 'Ready to rent'
  },
  Rented: {
    icon: CheckCircle,
    color: 'bg-blue-100 text-blue-800 border-blue-200',
    description: 'Currently occupied'
  },
  Pending: {
    icon: Clock,
    color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    description: 'Under process'
  }
};

export function Properties() {
  const [isLoading, setIsLoading] = useState(true);
  const [properties, setProperties] = useState<Property[]>(initialProperties);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);
  const [filter, setFilter] = useState<'Available' | 'Rented' | 'Pending' | 'All'>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [newProperty, setNewProperty] = useState<Omit<Property, 'id'>>({
    name: '',
    rent: 0,
    status: 'Available',
    imageUrl: '',
  });

  useEffect(() => {
    const fetchUserProperties = async () => {
      try {
        const storedUser = sessionStorage.getItem("user");
        if (!storedUser) {
          console.warn("No user found in session.");
          setIsLoading(false);
          return;
        }

        const userData = JSON.parse(storedUser);
        const userId = userData.id;

        // Fetch properties, images, and commercials
        const [propertiesRes, imagesRes, commercialsRes] = await Promise.all([
          axios.get("http://localhost:8000/api/properties/property/user", { params: { userId } }),
          axios.get("http://localhost:8000/api/photos/upload-photos", { params: { userId } }),
          axios.get("http://localhost:8000/api/properties/property-commercials/user", { params: { userId } })
        ]);

        const userProperties = propertiesRes.data;
        const propertyImages = imagesRes.data;
        const propertyCommercials = commercialsRes.data;

        // Merge Data & Sort by createdAt (Newest First)
        const finalProperties = userProperties
          .map((property: any) => {
            const image = propertyImages.find((img: any) => img.property._id === property._id);
            const commercial = propertyCommercials.find((com: any) => com.property._id === property._id);

            return {
              id: property._id,
              name: property.propertyName,
              rent: commercial?.monthlyRent || 0, // Ensure rent is set
              status: property.status || 'Available',
              imageUrl: image?.photos?.coverImage || 'https://via.placeholder.com/300', // Fallback Image
              createdAt: new Date(property.createdAt) || new Date(0) // Handle missing createdAt
            };
          })
          .sort((a: { createdAt: { getTime: () => number; }; }, b: { createdAt: { getTime: () => number; }; }) => b.createdAt.getTime() - a.createdAt.getTime()); // Sort by most recent

        setProperties(finalProperties);
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProperties();
  }, []);

   /** ✅ Handle Property Edit */
 /** ✅ Handle Property Editing */
 const handleEdit = (id: string) => {
  const property = properties.find((p) => p.id === id);
  if (property) {
    setSelectedPropertyId(property);
    setShowAddModal(true);
  }
};

/** ✅ Handle Property Deletion */
const handleDelete = async (id: string) => {
  if (!window.confirm('Are you sure you want to delete this property?')) return;

  try {
    await axios.delete(`http://localhost:8000/api/properties/property/${id}`);
    setProperties((prevProperties) => prevProperties.filter((p) => p.id !== id));
  } catch (error) {
    console.error("Error deleting property:", error);
    alert("Failed to delete property. Please try again.");
  }
};

/** ✅ Handle Status Update */
const handleStatusUpdate = (id: string) => {
  const property = properties.find((p) => p.id === id);
  if (property) {
    setSelectedPropertyId(property);
    setShowStatusModal(true);
  }
};

/** ✅ Handle Status Change */
const handleStatusChange = async (newStatus: Property['status']) => {
  if (!selectedProperty) return;

  try {
    await axios.patch(`http://localhost:8000/api/properties/property/${selectedProperty.id}`, { status: newStatus });

    setProperties((prevProperties) =>
      prevProperties.map((property) =>
        property.id === selectedProperty.id ? { ...property, status: newStatus } : property
      )
    );

    setShowStatusModal(false);
    setSelectedPropertyId(null);
  } catch (error) {
    console.error("Error updating status:", error);
    alert("Failed to update property status. Please try again.");
  }
};
  const handleAddProperty = (e: React.FormEvent) => {
    e.preventDefault();
    if (newProperty.name && newProperty.rent && newProperty.imageUrl) {
      const newId = (properties.length + 1).toString();
      setProperties([...properties, { ...newProperty, id: newId }]);
      setShowAddModal(false);
      setNewProperty({
        name: '',
        rent: 0,
        status: 'Available',
        imageUrl: '',
      });
    }
  };

  const selectedProperty = selectedPropertyId 
    ? properties.find(p => p.id === selectedPropertyId)
    : null;

  const filteredProperties = properties
    .filter(property => {
      // First apply status filter
      if (filter !== 'All' && property.status !== filter) {
        return false;
      }
      
      // Then apply search filter
      if (searchTerm) {
        const search = searchTerm.toLowerCase();
        return (
          property.name.toLowerCase().includes(search) ||
          property.rent.toString().includes(search) ||
          property.status.toLowerCase().includes(search)
        );
      }
      
      return true;
    });

  return (
    <>
      {isLoading ? (
        <LoadingOverlay message="Loading properties..." />
      ) : (
        <div className="p-2 sm:p-4 md:p-6">
          {/* Header Section */}
          <div className="flex flex-col gap-2 sm:gap-4 mb-4 sm:mb-6">
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-black">Properties</h1>
            
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
              {/* Global Search */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-black/40 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search properties by name, rent, or status..."
                  className="w-full pl-10 pr-4 py-2 text-sm border border-black/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 placeholder:text-black/30"
                />
              </div>
              
              {/* Status Filter and Add Button */}
              <div className="flex gap-2 sm:gap-4">
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value as typeof filter)}
                  className="px-3 py-2 bg-white text-sm text-black/80 rounded-lg border border-black/10 hover:bg-black/5 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="All">All Properties</option>
                  <option value="Available">Available</option>
                  <option value="Rented">Rented</option>
                  <option value="Pending">Pending</option>
                </select>
                <button 
                  onClick={() => setShowAddModal(true)}
                  className="flex items-center justify-center px-4 py-2 bg-black text-white text-sm rounded-lg hover:bg-black/80 transition-colors whitespace-nowrap"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Property
                </button>
              </div>
            </div>
          </div>

          {/* Properties Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-4 md:gap-6">
            {filteredProperties.map((property) => (
           <PropertyCard
                key={property.id}
                property={property}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onStatusUpdate={handleStatusUpdate}
              />
            ))}
            
            {/* No Results Message */}
            {filteredProperties.length === 0 && (
              <div className="col-span-full py-8 text-center text-black/60">
                <p className="text-sm">No properties found matching your criteria.</p>
              </div>
            )}
          </div>

          {/* Status Update Modal */}
          {showStatusModal && selectedProperty && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-2 sm:p-4 z-50">
              <div className="bg-white rounded-xl p-3 sm:p-4 md:p-6 w-full max-w-md">
                <div className="flex justify-between items-center mb-3 sm:mb-4">
                  <h2 className="text-base sm:text-lg md:text-xl font-semibold text-black">
                    Update Property Status
                  </h2>
                  <button 
                    onClick={() => setShowStatusModal(false)}
                    className="p-1 hover:bg-black/5 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 sm:w-6 sm:h-6 text-black/60" />
                  </button>
                </div>
                
                <p className="text-sm text-black/60 mb-4">
                  Select a new status for <span className="font-medium text-black">{selectedProperty.name}</span>
                </p>

                <div className="space-y-2">
                  {(Object.keys(statusConfig) as Array<keyof typeof statusConfig>).map((status) => {
                    const StatusIcon = statusConfig[status].icon;
                    const isSelected = selectedProperty.status === status;
                    
                    return (
                      <button
                        key={status}
                        onClick={() => handleStatusChange(status)}
                        className={`w-full flex items-center p-3 rounded-lg border-2 transition-all
                          ${isSelected 
                            ? `${statusConfig[status].color} border-current` 
                            : 'border-black/10 hover:border-black/20'
                          }
                        `}
                      >
                        <StatusIcon className={`w-5 h-5 mr-3 ${isSelected ? 'text-current' : 'text-black/40'}`} />
                        <div className="text-left">
                          <p className={`font-medium ${isSelected ? 'text-current' : 'text-black'}`}>
                            {status}
                          </p>
                          <p className={`text-xs ${isSelected ? 'text-current/70' : 'text-black/60'}`}>
                            {statusConfig[status].description}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => setShowStatusModal(false)}
                    className="flex-1 px-4 py-2 bg-black/5 text-black text-sm rounded-lg hover:bg-black/10 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Add/Edit Modal */}
          {showAddModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-2 sm:p-4 z-50">
              <div className="bg-white rounded-xl p-3 sm:p-4 md:p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-3 sm:mb-4">
                  <h2 className="text-base sm:text-lg md:text-xl font-semibold text-black">
                    {newProperty.id ? 'Edit Property' : 'Add New Property'}
                  </h2>
                  <button 
                    onClick={() => setShowAddModal(false)}
                    className="p-1 hover:bg-black/5 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 sm:w-6 sm:h-6 text-black/60" />
                  </button>
                </div>
                <form onSubmit={handleAddProperty} className="space-y-3 sm:space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-black/70 mb-1">Property Name</label>
                    <input
                      type="text"
                      value={newProperty.name}
                      onChange={(e) => setNewProperty({ ...newProperty, name: e.target.value })}
                      className="w-full px-3 py-1.5 sm:py-2 text-sm sm:text-base rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-red-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black/70 mb-1">Rent (₹/month)</label>
                    <input
                      type="number"
                      value={newProperty.rent}
                      onChange={(e) => setNewProperty({ ...newProperty, rent: Number(e.target.value) })}
                      className="w-full px-3 py-1.5 sm:py-2 text-sm sm:text-base rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-red-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black/70 mb-1">Status</label>
                    <select
                      value={newProperty.status}
                      onChange={(e) => setNewProperty({ ...newProperty, status: e.target.value as Property['status'] })}
                      className="w-full px-3 py-1.5 sm:py-2 text-sm sm:text-base rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      <option value="Available">Available</option>
                      <option value="Rented">Rented</option>
                      <option value="Pending">Pending</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black/70 mb-1">Image URL</label>
                    <input
                      type="url"
                      value={newProperty.imageUrl}
                      onChange={(e) => setNewProperty({ ...newProperty, imageUrl: e.target.value })}
                      className="w-full px-3 py-1.5 sm:py-2 text-sm sm:text-base rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-red-500"
                      required
                    />
                  </div>
                  <div className="flex gap-2 sm:gap-3 pt-2">
                    <button
                      type="submit"
                      className="flex-1 px-4 py-1.5 sm:py-2 bg-black text-white text-sm sm:text-base rounded-lg hover:bg-black/80 transition-colors"
                    >
                      {newProperty.id ? 'Save Changes' : 'Add Property'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowAddModal(false)}
                      className="flex-1 px-4 py-1.5 sm:py-2 bg-black/5 text-black text-sm sm:text-base rounded-lg hover:bg-black/10 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}