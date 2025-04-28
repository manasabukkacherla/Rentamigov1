import React from 'react';
import { Droplets, Sun, Thermometer, Wind } from 'lucide-react';
import SectionTitle from './SectionTitle';
import CropCard from './CropCard';

const crops = [
  {
    id: 1,
    name: 'Wheat',
    description: 'A cereal grain cultivated worldwide and one of the top three cereal crops, along with maize and rice.',
    image: 'https://images.pexels.com/photos/326082/pexels-photo-326082.jpeg?auto=compress&cs=tinysrgb&w=1200',
    growingSeason: 'Fall to early summer',
    soilRequirements: 'Well-drained loamy soil',
    idealClimate: 'Temperate',
  },
  {
    id: 2,
    name: 'Rice',
    description: 'A staple food for more than half the world\'s population, particularly in Asia, Latin America, and parts of Africa.',
    image: 'https://images.pexels.com/photos/7538066/pexels-photo-7538066.jpeg?auto=compress&cs=tinysrgb&w=1200',
    growingSeason: 'Spring to late summer',
    soilRequirements: 'Clay soil with good water retention',
    idealClimate: 'Warm and humid',
  },
  {
    id: 3,
    name: 'Corn (Maize)',
    description: 'A versatile crop used for food, feed, and fuel production, native to the Americas.',
    image: 'https://images.pexels.com/photos/547264/pexels-photo-547264.jpeg?auto=compress&cs=tinysrgb&w=1200',
    growingSeason: 'Spring to fall',
    soilRequirements: 'Well-drained, fertile soil',
    idealClimate: 'Warm with moderate rainfall',
  },
  {
    id: 4,
    name: 'Soybeans',
    description: 'A legume species native to East Asia, grown for its edible bean which has numerous uses.',
    image: 'https://images.pexels.com/photos/5016298/pexels-photo-5016298.jpeg?auto=compress&cs=tinysrgb&w=1200',
    growingSeason: 'Late spring to fall',
    soilRequirements: 'Well-drained, fertile soil with neutral pH',
    idealClimate: 'Warm with adequate rainfall',
  }
];

const CropSection: React.FC = () => {
  return (
    <section id="crops" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <SectionTitle title="Major Crops" subtitle="Essential Crops and Growing Information" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {crops.map(crop => (
            <CropCard key={crop.id} crop={crop} />
          ))}
        </div>

        <div className="mt-16 bg-white rounded-lg shadow-md p-6 md:p-8">
          <h3 className="text-2xl font-serif font-bold text-gray-800 mb-6">Key Factors for Successful Crop Growth</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex flex-col items-center text-center p-4 rounded-lg bg-blue-50">
              <Droplets className="h-12 w-12 text-blue-500 mb-4" />
              <h4 className="text-xl font-medium text-gray-800 mb-2">Water Management</h4>
              <p className="text-gray-600">Proper irrigation and water conservation techniques to ensure optimal crop growth.</p>
            </div>
            <div className="flex flex-col items-center text-center p-4 rounded-lg bg-yellow-50">
              <Sun className="h-12 w-12 text-yellow-500 mb-4" />
              <h4 className="text-xl font-medium text-gray-800 mb-2">Sunlight Exposure</h4>
              <p className="text-gray-600">Understanding light requirements for different crops throughout their growth cycle.</p>
            </div>
            <div className="flex flex-col items-center text-center p-4 rounded-lg bg-red-50">
              <Thermometer className="h-12 w-12 text-red-500 mb-4" />
              <h4 className="text-xl font-medium text-gray-800 mb-2">Temperature Control</h4>
              <p className="text-gray-600">Managing temperature conditions to protect crops from extreme heat or cold.</p>
            </div>
            <div className="flex flex-col items-center text-center p-4 rounded-lg bg-green-50">
              <Wind className="h-12 w-12 text-green-500 mb-4" />
              <h4 className="text-xl font-medium text-gray-800 mb-2">Air Circulation</h4>
              <p className="text-gray-600">Ensuring adequate airflow to prevent disease and promote healthy plant development.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CropSection;