import React from 'react';
import { Building2, GraduationCap, Heart, Train, Bus, Car } from 'lucide-react';

const nearbyCategories = [
  {
    title: 'Hospitals',
    icon: Heart,
    places: [
      { name: 'City Hospital', distance: '0.5 km' },
      { name: 'Apollo Clinic', distance: '1.2 km' },
    ],
  },
  {
    title: 'Educational Institutes',
    icon: GraduationCap,
    places: [
      { name: 'Delhi Public School', distance: '1.0 km' },
      { name: 'Engineering College', distance: '2.5 km' },
    ],
  },
  {
    title: 'Metro Stations',
    icon: Train,
    places: [
      { name: 'Electronic City Metro', distance: '0.8 km' },
      { name: 'Tech Park Metro', distance: '1.5 km' },
    ],
  },
  {
    title: 'Bus Stands',
    icon: Bus,
    places: [
      { name: 'EC Phase 1 Bus Stop', distance: '0.3 km' },
      { name: 'Main Bus Terminal', distance: '1.0 km' },
    ],
  },
  {
    title: 'Railway Stations',
    icon: Train,
    places: [
      { name: 'Electronic City Station', distance: '2.0 km' },
      { name: 'Central Station', distance: '5.0 km' },
    ],
  },
];

export const NearbyPlaces: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Nearby Places</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {nearbyCategories.map((category) => {
          const Icon = category.icon;
          return (
            <div key={category.title} className="space-y-3">
              <div className="flex items-center gap-2">
                <Icon className="w-5 h-5 text-gray-900" />
                <h3 className="font-semibold text-gray-900">{category.title}</h3>
              </div>
              <div className="space-y-2">
                {category.places.map((place) => (
                  <div key={place.name} className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">{place.name}</span>
                    <span className="text-gray-500">{place.distance}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};