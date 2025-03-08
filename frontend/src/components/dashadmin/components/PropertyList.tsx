import React from 'react';

const PropertyList = () => {
  const properties = [
    {
      id: 1,
      name: 'Luxury Villa',
      location: 'Beverly Hills',
      price: '$2,500,000',
      views: 1243
    },
    {
      id: 2,
      name: 'Modern Apartment',
      location: 'Downtown',
      price: '$850,000',
      views: 956
    },
    {
      id: 3,
      name: 'Beach House',
      location: 'Malibu',
      price: '$3,200,000',
      views: 847
    },
    {
      id: 4,
      name: 'City Penthouse',
      location: 'Manhattan',
      price: '$4,100,000',
      views: 732
    }
  ];

  return (
    <div className="space-y-4">
      {properties.map((property) => (
        <div
          key={property.id}
          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
        >
          <div>
            <h4 className="font-medium text-gray-900">{property.name}</h4>
            <p className="text-sm text-gray-500">{property.location}</p>
          </div>
          <div className="text-right">
            <p className="font-medium text-gray-900">{property.price}</p>
            <p className="text-sm text-gray-500">{property.views} views</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PropertyList;