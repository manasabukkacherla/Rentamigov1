import React from 'react';
import SectionTitle from './SectionTitle';

const livestock = [
  {
    id: 1,
    name: 'Cattle',
    image: 'https://images.pexels.com/photos/735968/pexels-photo-735968.jpeg?auto=compress&cs=tinysrgb&w=1200',
    description: 'Raised for meat, milk, and other dairy products. They require proper pasture management and regular veterinary care.',
    housing: 'Barns, sheds, or open pastures with shade',
    feeding: 'Grass, hay, grain, and feed supplements',
    management: 'Rotational grazing, health monitoring, vaccination programs'
  },
  {
    id: 2,
    name: 'Poultry',
    image: 'https://images.pexels.com/photos/2255459/pexels-photo-2255459.jpeg?auto=compress&cs=tinysrgb&w=1200',
    description: 'Birds raised for meat, eggs, and feathers. Includes chickens, turkeys, ducks, and geese.',
    housing: 'Coops, barns with nesting boxes and roosting areas',
    feeding: 'Commercial feed, grains, insects, kitchen scraps',
    management: 'Temperature control, predator protection, egg collection'
  },
  {
    id: 3,
    name: 'Sheep',
    image: 'https://images.pexels.com/photos/288621/pexels-photo-288621.jpeg?auto=compress&cs=tinysrgb&w=1200',
    description: 'Raised for wool, meat, and milk. They are adaptable to various climates and terrains.',
    housing: 'Simple shelters, barns with good ventilation',
    feeding: 'Pasture grazing, hay, grain supplements',
    management: 'Shearing, lambing, parasite control'
  }
];

const LivestockSection: React.FC = () => {
  return (
    <section id="livestock" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <SectionTitle title="Livestock Management" subtitle="Essential Information for Animal Husbandry" />
        
        <div className="mt-12">
          {livestock.map((animal, index) => (
            <div 
              key={animal.id} 
              className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 mb-16 items-center`}
            >
              <div className="md:w-1/2">
                <img 
                  src={animal.image} 
                  alt={animal.name} 
                  className="w-full h-80 object-cover rounded-lg shadow-md"
                />
              </div>
              <div className="md:w-1/2">
                <h3 className="text-2xl font-serif font-bold text-gray-800 mb-4">{animal.name}</h3>
                <p className="text-gray-600 mb-6">{animal.description}</p>
                
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h4 className="font-medium text-gray-800 mb-1">Housing Requirements</h4>
                    <p className="text-gray-600 text-sm">{animal.housing}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h4 className="font-medium text-gray-800 mb-1">Feeding Practices</h4>
                    <p className="text-gray-600 text-sm">{animal.feeding}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h4 className="font-medium text-gray-800 mb-1">Management Techniques</h4>
                    <p className="text-gray-600 text-sm">{animal.management}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LivestockSection;