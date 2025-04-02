import React, { useState } from 'react';
import { Search, Plus, Filter, Check, AlertCircle, Wrench } from 'lucide-react';
import type { Property } from '../types';

// Mock data for properties
const mockProperties: Property[] = [
  {
    id: '1',
    name: 'Luxury Apartment 2B',
    location: '123 Downtown Ave, New York',
    status: 'available',
    type: 'Apartment',
  },
  {
    id: '2',
    name: 'Commercial Space 5A',
    location: '456 Business District, Chicago',
    status: 'occupied',
    type: 'Commercial',
  },
  {
    id: '3',
    name: 'Family House 12',
    location: '789 Suburban Lane, Los Angeles',
    status: 'maintenance',
    type: 'House',
  },
  // Add more properties as needed
];

const PropertyCard: React.FC<{ property: Property }> = ({ property }) => {
  const statusIcons = {
    available: <Check className="w-4 h-4" />,
    occupied: <AlertCircle className="w-4 h-4" />,
    maintenance: <Wrench className="w-4 h-4" />,
  };

  const statusClasses = {
    available: 'bg-gray-900 text-white',
    occupied: 'bg-gray-200 text-gray-900',
    maintenance: 'bg-gray-500 text-white',
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-300">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">{property.name}</h3>
        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${statusClasses[property.status]}`}>
          {statusIcons[property.status]}
          <span className="ml-1.5">{property.status.charAt(0).toUpperCase() + property.status.slice(1)}</span>
        </span>
      </div>
      
      <div className="space-y-2 mb-6">
        <p className="text-sm text-gray-500 dark:text-gray-400">{property.location}</p>
        <p className="text-sm font-medium text-gray-900 dark:text-white">{property.type}</p>
      </div>
      
      <div className="flex justify-end space-x-2">
        <button className="btn btn-secondary text-sm">Edit</button>
        <button className="btn btn-primary text-sm">View Details</button>
      </div>
    </div>
  );
};

const Properties: React.FC = () => {
  const [filter, setFilter] = useState('all');

  const filterOptions = ['all', 'available', 'occupied', 'maintenance'];

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-light text-gray-900 dark:text-white tracking-tight">Properties</h2>
        <button className="btn btn-primary flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Add Property</span>
        </button>
      </div>

      <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search properties..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white"
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <button className="btn btn-secondary flex items-center space-x-2">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
          <div className="flex rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            {filterOptions.map((option) => (
              <button
                key={option}
                onClick={() => setFilter(option)}
                className={`px-4 py-2 text-sm font-medium ${
                  filter === option
                    ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
                    : 'bg-white text-gray-600 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockProperties
          .filter((property) => filter === 'all' || property.status === filter)
          .map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
      </div>
    </div>
  );
};

export default Properties;