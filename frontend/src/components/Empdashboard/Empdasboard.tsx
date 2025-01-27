import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { Navbar } from "./Navbar";
import { PropertyCard } from './PropertyCard';
import { SearchFilters } from './SearchFilters';
import { useNavigate } from 'react-router-dom';

interface Property {
  id: string;
  propertyName: string;
  ownerName: string;
  rentAmount: number;
  status: string;
  description: string;
  images: string[];
}

function PropertyDashboard() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [rentRange, setRentRange] = useState<[number, number]>([0, 10000]);
  const [statusFilter, setStatusFilter] = useState('');
  const navigate = useNavigate();

useEffect(() => {
  const fetchProperties = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://api.rentamigo.in/api/properties/allproperties");
      if (!response.ok) {
        throw new Error("Failed to fetch properties.");
      }
      const data: Property[] = await response.json();

      // Optional: Validate that each property includes necessary fields
      const validatedProperties = data.map((property) => ({
        id: property.id,
        propertyName: property.propertyName || "N/A",
        ownerName: property.ownerName || "N/A",
        rentAmount: property.rentAmount || 0,
        status: property.status || "N/A",
        description: property.description || "No description available.",
        images: property.images || [],
      }));

      setProperties(validatedProperties);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred.");
    } finally {
      setLoading(false);
    }
  };
  fetchProperties();
}, []);

  
  

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.propertyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.ownerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRent = property.rentAmount >= rentRange[0] && property.rentAmount <= rentRange[1];
    const matchesStatus = !statusFilter || property.status === statusFilter;
    return matchesSearch && matchesRent && matchesStatus;
  });

  const handleAddPropertyClick = () => {
    navigate('/property-listing-form');
  };

  const handleEditProperty = (property: Property) => {
    navigate(`/edit-property/${property.id}`);
  };

  const handleDeleteProperty = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      try {
        const response = await fetch(`https://api.rentamigo.in/api/properties/${id}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error("Failed to delete property.");
        }
        setProperties(prev => prev.filter(property => property.id !== id));
      } catch (err) {
        console.error(err);
        alert("Failed to delete the property.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <main className="container mx-auto px-4 pt-24 pb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Property Dashboard
          </h2>
          <button
            onClick={handleAddPropertyClick}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-5 h-5" />
            Add Property
          </button>
        </div>

        <SearchFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          rentRange={rentRange}
          onRentRangeChange={setRentRange}
          status={statusFilter}
          onStatusChange={setStatusFilter}
        />

        {loading ? (
          <p className="text-center text-gray-500">Loading properties...</p>
        ) : error ? (
          <p className="text-center text-red-500">Error: {error}</p>
        ) : (
          <>
            {filteredProperties.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProperties.map(property => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    onEdit={handleEditProperty}
                    onDelete={handleDeleteProperty}
                  />
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500">No properties found.</p>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default PropertyDashboard;
