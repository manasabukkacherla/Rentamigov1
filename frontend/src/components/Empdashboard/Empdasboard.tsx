import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Navbar } from "./Navbar";
import { PropertyCard } from './PropertyCard'; // Reused for properties
import { PropertyForm } from './PropertyForm'; // Reused for properties
import { SearchFilters } from './SearchFilters'; // Reused for properties
import { useApp } from './AppContext';
import { Property } from './types'; // Keep the type as-is

function PropertyDashboard() {
  const { state, dispatch } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null); // Property state
  const [searchTerm, setSearchTerm] = useState('');
  const [rentRange, setRentRange] = useState<[number, number]>([0, 10000]);
  const [statusFilter, setStatusFilter] = useState('');

  const filteredProperties = state.properties.filter(property => {
    const matchesSearch = property.name && property.ownerName
      ? (property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
         property.ownerName.toLowerCase().includes(searchTerm.toLowerCase()))
      : true;
    const matchesRent = property.rentAmount >= rentRange[0] && property.rentAmount <= rentRange[1];
    const matchesStatus = !statusFilter || property.status === statusFilter;
    return matchesSearch && matchesRent && matchesStatus;
  });

  const handleAddProperty = (propertyData: Omit<Property, 'id' | 'createdAt'>) => {
    const newProperty: Property = {
      ...propertyData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    dispatch({ type: 'ADD_PROPERTY', payload: newProperty });
    setShowForm(false);
  };

  const handleEditProperty = (property: Property) => {
    setEditingProperty(property);
    setShowForm(true);
  };

  const handleUpdateProperty = (propertyData: Omit<Property, 'id' | 'createdAt'>) => {
    if (editingProperty) {
      const updatedProperty: Property = {
        ...propertyData,
        id: editingProperty.id,
        createdAt: editingProperty.createdAt
      };
      dispatch({ type: 'UPDATE_PROPERTY', payload: updatedProperty });
      setShowForm(false);
      setEditingProperty(null);
    }
  };

  const handleDeleteProperty = (id: string) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      dispatch({ type: 'DELETE_PROPERTY', payload: id });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors">
            Property Dashboard
          </h2>
          <button
            onClick={() => {
              setEditingProperty(null);
              setShowForm(true);
            }}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
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

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6">
          {filteredProperties.map(property => (
            <PropertyCard
              key={property.id}
              property={property}
              onEdit={handleEditProperty}
              onDelete={handleDeleteProperty}
            />
          ))}
        </div>

        {filteredProperties.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 transition-colors">
              No properties found. Try adjusting your filters or add a new property.
            </p>
          </div>
        )}

        {showForm && (
          <PropertyForm
            onSubmit={editingProperty ? handleUpdateProperty : handleAddProperty}
            onClose={() => {
              setShowForm(false);
              setEditingProperty(null);
            }}
            initialData={editingProperty || undefined}
          />
        )}
      </main>
    </div>
  );
}

export default PropertyDashboard;
