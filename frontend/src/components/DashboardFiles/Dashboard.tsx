import React, { useState } from 'react';
import { Building2, ArrowUpRight, Users, Building, Plus, X, Home, Key, DollarSign } from 'lucide-react';
import type { Property } from './CommonDashboard';
import { useNavigate } from "react-router-dom";  

const stats = [
  { 
    icon: Building2, 
    label: 'Total Properties', 
    value: '24', 
    trend: '+2 this month',
    color: 'blue' 
  },
  { 
    icon: Building, 
    label: 'Active Properties', 
    value: '18', 
    trend: '+1 this month',
    color: 'green' 
  },
  { 
    icon: Users, 
    label: 'Total Leads', 
    value: '156', 
    trend: '+12 this week',
    color: 'purple' 
  }
];

interface DashboardProps {
  onNavigate?: (page: string) => void;
  properties: Property[];
}

export function Dashboard({ onNavigate, properties }: DashboardProps) {
  const [showPopup, setShowPopup] = useState(false);
  const recentProperties = properties.slice(0, 3);
  const navigate = useNavigate();

  const handlePropertyTypeSelect = (type: 'rent' | 'lease' | 'sell') => {
    setShowPopup(false);
    navigate(`/property-listing-form?type=${type}`);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
        {stats.map((stat, index) => (
          <div 
            key={index} 
            className="group bg-white rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 cursor-pointer"
          >
            <div className={`inline-flex p-2 sm:p-3 rounded-lg bg-${stat.color}-50 group-hover:bg-${stat.color}-100 transition-colors`}>
              <stat.icon className={`h-5 w-5 sm:h-6 sm:w-6 text-${stat.color}-500 group-hover:text-${stat.color}-600 transition-colors`} />
            </div>
            <h3 className="text-gray-500 group-hover:text-gray-700 mt-3 sm:mt-4 text-sm sm:text-base transition-colors">
              {stat.label}
            </h3>
            <div className="flex items-center gap-1.5 sm:gap-2 mt-1.5 sm:mt-2">
              <span className="text-xl sm:text-2xl font-bold group-hover:text-blue-600 transition-colors">
                {stat.value}
              </span>
              <span className="text-xs sm:text-sm text-green-600 group-hover:text-green-700 flex items-center transition-colors">
                {stat.trend}
                <ArrowUpRight className="h-3 w-3 sm:h-4 sm:w-4 ml-0.5 sm:ml-1" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Properties */}
      <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-bold">Recent Properties</h2>
          <div className="flex items-center gap-2 sm:ml-auto">
            <button 
              onClick={() => onNavigate?.('properties')}
              className="text-sm sm:text-base text-blue-600 hover:text-blue-700"
            >
              View all
            </button>
            <button
              onClick={() => setShowPopup(true)}
              className="text-sm sm:text-base px-3 py-1.5 sm:px-4 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add New Property
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {recentProperties.map((property) => (
            <div 
              key={property.id} 
              className="group border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-blue-200 hover:-translate-y-1"
            >
              <div className="relative overflow-hidden">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-40 sm:h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
              </div>
              <div className="p-3 sm:p-4">
                <h3 className="font-semibold text-base sm:text-lg group-hover:text-blue-600 transition-colors">
                  {property.title}
                </h3>
                <p className="text-gray-500 text-xs sm:text-sm">{property.address}</p>
                <div className="flex items-center justify-between mt-3 sm:mt-4">
                  <span className="font-bold text-blue-600 text-sm sm:text-base group-hover:text-blue-700">
                    {property.price}
                  </span>
                  <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm ${
                    property.status === 'Occupied' 
                      ? 'bg-green-100 text-green-800'
                      : property.status === 'Available'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-orange-100 text-orange-800'
                  }`}>
                    {property.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Property Type Selection Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full mx-auto overflow-hidden shadow-2xl transform transition-all">
            <div className="relative p-6 pb-4 bg-gradient-to-br from-blue-600 to-blue-700">
              <button
                onClick={() => setShowPopup(false)}
                className="absolute right-4 top-4 text-white/80 hover:text-white transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
              <h3 className="text-2xl font-bold text-white mb-2">List Your Property</h3>
              <p className="text-blue-100">Choose how you want to list your property</p>
            </div>
            
            <div className="p-6 pt-4 grid gap-4">
              <button
                onClick={() => handlePropertyTypeSelect('rent')}
                className="flex items-center gap-4 p-4 bg-white border-2 border-blue-100 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all group"
              >
                <div className="p-3 rounded-lg bg-blue-100 group-hover:bg-blue-500 transition-colors">
                  <Home className="h-6 w-6 text-blue-600 group-hover:text-white transition-colors" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">Rent Property</h4>
                  <p className="text-sm text-gray-500">List your property for short-term rental</p>
                </div>
              </button>

              <button
                onClick={() => handlePropertyTypeSelect('lease')}
                className="flex items-center gap-4 p-4 bg-white border-2 border-green-100 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all group"
              >
                <div className="p-3 rounded-lg bg-green-100 group-hover:bg-green-500 transition-colors">
                  <Key className="h-6 w-6 text-green-600 group-hover:text-white transition-colors" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-gray-900 group-hover:text-green-600 transition-colors">Lease Property</h4>
                  <p className="text-sm text-gray-500">List your property for long-term lease</p>
                </div>
              </button>

              <button
                onClick={() => handlePropertyTypeSelect('sell')}
                className="flex items-center gap-4 p-4 bg-white border-2 border-purple-100 rounded-xl hover:border-purple-500 hover:bg-purple-50 transition-all group"
              >
                <div className="p-3 rounded-lg bg-purple-100 group-hover:bg-purple-500 transition-colors">
                  <DollarSign className="h-6 w-6 text-purple-600 group-hover:text-white transition-colors" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">Sell Property</h4>
                  <p className="text-sm text-gray-500">List your property for sale</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}