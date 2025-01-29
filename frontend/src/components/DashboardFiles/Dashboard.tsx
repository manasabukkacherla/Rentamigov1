import React from 'react';
import { Building2, ArrowUpRight, Users, Building } from 'lucide-react';

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

const properties = [
  {
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
    title: "Modern Apartment",
    address: "123 Main St, Suite 4B",
    price: "$2,500/month",
    status: "Occupied"
  },
  {
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be",
    title: "Luxury Condo",
    address: "456 Park Ave, Unit 12",
    price: "$3,200/month",
    status: "Available"
  },
  {
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
    title: "Family Home",
    address: "789 Oak Rd",
    price: "$4,000/month",
    status: "Maintenance"
  }
];

export function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-4 sm:p-6 shadow-sm">
            <div className={`inline-flex p-2 sm:p-3 rounded-lg bg-${stat.color}-50`}>
              <stat.icon className={`h-5 w-5 sm:h-6 sm:w-6 text-${stat.color}-500`} />
            </div>
            <h3 className="text-gray-500 mt-3 sm:mt-4 text-sm sm:text-base">{stat.label}</h3>
            <div className="flex items-center gap-1.5 sm:gap-2 mt-1.5 sm:mt-2">
              <span className="text-xl sm:text-2xl font-bold">{stat.value}</span>
              <span className="text-xs sm:text-sm text-green-600 flex items-center">
                {stat.trend}
                <ArrowUpRight className="h-3 w-3 sm:h-4 sm:w-4 ml-0.5 sm:ml-1" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Properties */}
      <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 mb-6">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-bold">Recent Properties</h2>
          <button className="text-sm sm:text-base text-blue-600 hover:text-blue-700">View all</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {properties.map((property, index) => (
            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-40 sm:h-48 object-cover"
              />
              <div className="p-3 sm:p-4">
                <h3 className="font-semibold text-base sm:text-lg">{property.title}</h3>
                <p className="text-gray-500 text-xs sm:text-sm">{property.address}</p>
                <div className="flex items-center justify-between mt-3 sm:mt-4">
                  <span className="font-bold text-blue-600 text-sm sm:text-base">{property.price}</span>
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
    </div>
  );
}