import React, { useState } from 'react';
import { Home, Eye, Plus, X, Calendar, User, Filter } from 'lucide-react';

interface Property {
  id: number;
  name: string;
  location: string;
  status: string;
  price: string;
  views: number;
  inquiries: number;
  image: string;
  description: string;
  bedrooms: number;
  bathrooms: number;
  sqft: string;
  postedBy: {
    type: 'owner' | 'agent' | 'rentamigo';
    name: string;
  };
  postedDate: string;
}

const Properties = () => {
  const [filterType, setFilterType] = useState<'all' | 'owner' | 'agent' | 'rentamigo'>('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [properties, setProperties] = useState<Property[]>([
    {
      id: 1,
      name: 'Luxury Villa',
      location: 'Beverly Hills',
      status: 'active',
      price: '$2,500,000',
      views: 1243,
      inquiries: 25,
      image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&q=80&w=500',
      description: 'Stunning luxury villa with panoramic views',
      bedrooms: 5,
      bathrooms: 6,
      sqft: '6,500',
      postedBy: {
        type: 'owner',
        name: 'John Smith'
      },
      postedDate: '2024-02-15'
    },
    {
      id: 2,
      name: 'Modern Apartment',
      location: 'Downtown',
      status: 'pending',
      price: '$850,000',
      views: 956,
      inquiries: 18,
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=500',
      description: 'Contemporary apartment in prime location',
      bedrooms: 2,
      bathrooms: 2,
      sqft: '1,200',
      postedBy: {
        type: 'agent',
        name: 'Sarah Johnson'
      },
      postedDate: '2024-02-14'
    },
    {
      id: 3,
      name: 'Beach House',
      status: 'active',
      location: 'Malibu',
      price: '$3,200,000',
      views: 847,
      inquiries: 31,
      image: 'https://images.unsplash.com/photo-1527030280862-64139fba04ca?auto=format&fit=crop&q=80&w=500',
      description: 'Beachfront property with private access',
      bedrooms: 4,
      bathrooms: 3,
      sqft: '3,800',
      postedBy: {
        type: 'rentamigo',
        name: 'RentAmigo Services'
      },
      postedDate: '2024-02-13'
    }
  ]);

  const filteredProperties = properties
    .filter(property => filterType === 'all' || property.postedBy.type === filterType)
    .filter(property => {
      if (!startDate && !endDate) return true;
      const propertyDate = new Date(property.postedDate).getTime();
      const start = startDate ? new Date(startDate).getTime() : -Infinity;
      const end = endDate ? new Date(endDate).getTime() : Infinity;
      return propertyDate >= start && propertyDate <= end;
    });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const clearFilters = () => {
    setFilterType('all');
    setStartDate('');
    setEndDate('');
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Property Management</h2>
        <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-900 flex items-center">
          <Plus className="w-5 h-5 mr-2" />
          Add Property
        </button>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Filter className="w-5 h-5" />
            <h3 className="font-semibold">Filters</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Posted By</label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as any)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-black"
              >
                <option value="all">All Properties</option>
                <option value="owner">Posted by Owners</option>
                <option value="agent">Posted by Agents</option>
                <option value="rentamigo">Posted by RentAmigo</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              onClick={clearFilters}
              className="px-4 py-2 text-sm text-gray-600 hover:text-black"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProperties.map((property) => (
          <div key={property.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
            <div className="relative h-48">
              <img
                src={property.image}
                alt={property.name}
                className="w-full h-full object-cover"
              />
              <span className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm ${
                property.status === 'active' 
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-black'
              }`}>
                {property.status}
              </span>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <User className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">
                  Posted by {property.postedBy.name} ({property.postedBy.type})
                </span>
              </div>
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">
                  {formatDate(property.postedDate)}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-black">{property.name}</h3>
              <p className="text-gray-600 mt-1">{property.location}</p>
              <p className="text-gray-600 mt-2">{property.description}</p>
              <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
                <span>{property.bedrooms} beds</span>
                <span>{property.bathrooms} baths</span>
                <span>{property.sqft} sq ft</span>
              </div>
              <div className="mt-4 pt-4 border-t">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-black">{property.price}</span>
                  <div className="flex items-center text-gray-500">
                    <Eye className="w-4 h-4 mr-1" />
                    {property.views}
                  </div>
                </div>
              </div>
              <div className="flex space-x-2 mt-4">
                <button className="flex-1 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-900">
                  Edit
                </button>
                <button className="p-2 text-black hover:text-red-600 border border-gray-200 rounded-lg hover:border-red-200">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Properties;