import React from 'react';
import { Recycle, Droplets, Leaf, Sun } from 'lucide-react';
import SectionTitle from './SectionTitle';

const practices = [
  {
    id: 1,
    title: 'Crop Rotation',
    description: 'Planting different crops in the same area across seasons to improve soil health, optimize nutrients, and combat pest and weed pressure.',
    icon: <Recycle className="h-10 w-10 text-green-600" />,
    benefits: [
      'Reduces soil erosion',
      'Increases soil fertility and structure',
      'Helps control pests and diseases naturally',
      'Manages risk by diversifying crops'
    ]
  },
  {
    id: 2,
    title: 'Water Conservation',
    description: 'Implementing techniques to reduce water usage while maintaining or improving crop yields through efficient irrigation systems.',
    icon: <Droplets className="h-10 w-10 text-blue-600" />,
    benefits: [
      'Reduces water waste and runoff',
      'Lowers energy costs for pumping water',
      'Minimizes soil erosion and nutrient leaching',
      'Preserves water quality in nearby water bodies'
    ]
  },
  {
    id: 3,
    title: 'Cover Cropping',
    description: 'Planting specific crops to cover the soil rather than for harvest, protecting and enhancing soil quality during off-seasons.',
    icon: <Leaf className="h-10 w-10 text-green-700" />,
    benefits: [
      'Prevents soil erosion',
      'Suppresses weeds naturally',
      'Adds organic matter to soil',
      'Fixes nitrogen when legumes are used'
    ]
  },
  {
    id: 4,
    title: 'Solar Farming',
    description: 'Integrating solar panels with agricultural land use, allowing for both energy production and crop cultivation on the same land.',
    icon: <Sun className="h-10 w-10 text-yellow-600" />,
    benefits: [
      'Generates renewable energy',
      'Provides shade for certain crops',
      'Creates additional farm income',
      'Reduces carbon footprint of farm operations'
    ]
  }
];

const SustainableSection: React.FC = () => {
  return (
    <section id="sustainable-practices" className="py-16 bg-green-50">
      <div className="container mx-auto px-4">
        <SectionTitle title="Sustainable Practices" subtitle="Modern Approaches to Eco-Friendly Farming" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {practices.map(practice => (
            <div key={practice.id} className="bg-white rounded-lg shadow-md p-6 transition-transform duration-300 hover:transform hover:scale-105">
              <div className="flex items-center mb-4">
                {practice.icon}
                <h3 className="text-xl font-serif font-bold text-gray-800 ml-3">{practice.title}</h3>
              </div>
              
              <p className="text-gray-600 mb-6">{practice.description}</p>
              
              <div>
                <h4 className="font-medium text-gray-800 mb-2">Key Benefits:</h4>
                <ul className="space-y-1">
                  {practice.benefits.map((benefit, index) => (
                    <li key={index} className="text-gray-600 flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-serif font-bold text-gray-800 mb-4">Why Sustainable Farming Matters</h3>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Sustainable agriculture is not just about environmental conservation—it's about creating
            resilient farm systems that can withstand climate change, market fluctuations, and evolving
            consumer demands. By adopting these practices, farmers can improve their long-term viability
            while contributing to a healthier planet.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SustainableSection;