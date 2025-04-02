import React, { useState } from 'react';
import { Users, Droplet, Wrench, Lamp } from 'lucide-react';

interface Feature {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  options?: string[];
  isOptional?: boolean;
}

const OtherFeatures = () => {
  const [selectedFeatures, setSelectedFeatures] = useState<Set<string>>(new Set());
  const [visitorPolicy, setVisitorPolicy] = useState<string>('');

  const features: Feature[] = [
    {
      id: 'visitor-access',
      label: 'Visitor Access Policy',
      description: 'Rules regarding visitor entry and timings',
      icon: <Users className="w-6 h-6" />,
      options: [
        'No visitors allowed',
        'Visitors allowed during specific hours',
        'Visitors allowed with prior permission',
        'Visitors allowed in common areas only',
        'Family members only'
      ]
    },
    {
      id: 'water-supply',
      label: '24/7 Water Supply',
      description: 'Continuous water supply with backup options',
      icon: <Droplet className="w-6 h-6" />
    },
    {
      id: 'maintenance',
      label: 'Maintenance Support',
      description: 'Regular maintenance and repair services',
      icon: <Wrench className="w-6 h-6" />
    },
    {
      id: 'study-lamp',
      label: 'Shared Study Lamp',
      description: 'Study lamp provided for each resident',
      icon: <Lamp className="w-6 h-6" />,
      isOptional: true
    }
  ];

  const handleFeatureChange = (featureId: string) => {
    const newSelectedFeatures = new Set(selectedFeatures);
    if (newSelectedFeatures.has(featureId)) {
      newSelectedFeatures.delete(featureId);
      if (featureId === 'visitor-access') {
        setVisitorPolicy('');
      }
    } else {
      newSelectedFeatures.add(featureId);
    }
    setSelectedFeatures(newSelectedFeatures);
  };

  return (
    <div className="p-6 bg-black text-white">
      <h1 className="text-2xl font-bold mb-6">Other Features</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature) => (
          <div 
            key={feature.id} 
            className="bg-gray-900 rounded-lg p-4 flex items-start space-x-4 hover:bg-gray-800 transition-colors"
          >
            <div className="flex-shrink-0 mt-1">
              {feature.icon}
            </div>
            <div className="flex-grow">
              <div className="flex items-center justify-between">
                <label htmlFor={feature.id} className="font-medium flex items-center">
                  {feature.label}
                  {feature.isOptional && (
                    <span className="ml-2 text-sm text-gray-400">(Optional)</span>
                  )}
                </label>
                <input
                  type="checkbox"
                  id={feature.id}
                  checked={selectedFeatures.has(feature.id)}
                  onChange={() => handleFeatureChange(feature.id)}
                  className="h-5 w-5 border-white rounded bg-black checked:bg-white checked:border-white focus:ring-white focus:ring-2"
                />
              </div>
              <p className="text-sm text-gray-400 mt-1">{feature.description}</p>

              {/* Visitor Policy Options */}
              {feature.id === 'visitor-access' && 
               selectedFeatures.has('visitor-access') && 
               feature.options && (
                <div className="mt-4 border-t border-gray-800 pt-4">
                  <h3 className="text-sm font-semibold mb-3">Select Visitor Policy:</h3>
                  <div className="space-y-2">
                    {feature.options.map((option) => (
                      <label key={option} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="visitorPolicy"
                          value={option}
                          checked={visitorPolicy === option}
                          onChange={(e) => setVisitorPolicy(e.target.value)}
                          className="h-4 w-4 border-gray-300"
                        />
                        <span className="text-sm text-gray-300">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-800 mt-8 pt-6">
        <h2 className="text-lg font-semibold mb-4">Selected Features:</h2>
        <div className="text-sm">
          <ul className="list-disc list-inside space-y-2">
            {Array.from(selectedFeatures).map(featureId => {
              const feature = features.find(f => f.id === featureId);
              return (
                <li key={featureId} className="text-gray-300">
                  {feature?.label}
                  {featureId === 'visitor-access' && visitorPolicy && (
                    <span className="text-gray-400 ml-2">
                      - {visitorPolicy}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default OtherFeatures;