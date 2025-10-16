import React, { useState } from 'react';
import SectionTitle from './SectionTitle';
import { BookOpen, Download, Link, FileText } from 'lucide-react';

const resourceCategories = [
  {
    id: 'guides',
    name: 'Farming Guides',
    icon: <BookOpen className="h-5 w-5" />
  },
  {
    id: 'templates',
    name: 'Planning Templates',
    icon: <FileText className="h-5 w-5" />
  },
  {
    id: 'external',
    name: 'External Resources',
    icon: <Link className="h-5 w-5" />
  }
];

const resourcesData = {
  guides: [
    {
      id: 1,
      title: 'Beginners Guide to Organic Farming',
      description: 'A comprehensive guide covering soil preparation, natural pest control, and crop selection for organic farming.',
      downloadLink: '#'
    },
    {
      id: 2,
      title: 'Advanced Irrigation Techniques',
      description: 'Learn about modern irrigation systems, water conservation methods, and technology-driven solutions.',
      downloadLink: '#'
    },
    {
      id: 3,
      title: 'Seasonal Planting Calendar',
      description: 'Month-by-month guide for planting and harvesting various crops across different climate zones.',
      downloadLink: '#'
    }
  ],
  templates: [
    {
      id: 1,
      title: 'Farm Budget Planner',
      description: 'Excel template for tracking expenses, income, and profitability for your agricultural operation.',
      downloadLink: '#'
    },
    {
      id: 2,
      title: 'Crop Rotation Worksheet',
      description: 'Plan your 3-5 year crop rotation strategy with this intuitive planning template.',
      downloadLink: '#'
    },
    {
      id: 3,
      title: 'Livestock Management Record',
      description: 'Track feeding schedules, health records, and breeding information for your farm animals.',
      downloadLink: '#'
    }
  ],
  external: [
    {
      id: 1,
      title: 'USDA Resources',
      description: 'Official resources from the United States Department of Agriculture including grants, programs, and educational materials.',
      externalLink: 'https://www.usda.gov'
    },
    {
      id: 2,
      title: 'University Extension Services',
      description: 'Access research-based information from agricultural extensions at major universities.',
      externalLink: '#'
    },
    {
      id: 3,
      title: 'Sustainable Agriculture Research',
      description: 'Latest research findings and case studies on sustainable and regenerative agricultural practices.',
      externalLink: '#'
    }
  ]
};

const Resources: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('guides');
  
  return (
    <section id="resources" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <SectionTitle 
          title="Agricultural Resources" 
          subtitle="Guides, Templates, and External References" 
        />
        
        <div className="mt-8 flex flex-wrap justify-center gap-4 mb-12">
          {resourceCategories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center px-6 py-3 rounded-full transition-colors ${
                activeCategory === category.id
                  ? 'bg-green-700 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resourcesData[activeCategory as keyof typeof resourcesData].map(resource => (
            <div 
              key={resource.id} 
              className="bg-gray-50 rounded-lg shadow-md p-6 transition-transform duration-300 hover:transform hover:scale-105"
            >
              <h3 className="text-xl font-serif font-bold text-gray-800 mb-3">{resource.title}</h3>
              <p className="text-gray-600 mb-4">{resource.description}</p>
              
              {('downloadLink' in resource) ? (
                <a 
                  href={resource.downloadLink} 
                  className="inline-flex items-center text-green-700 hover:text-green-900 font-medium"
                >
                  <Download className="h-4 w-4 mr-1" />
                  Download Resource
                </a>
              ) : (
                <a 
                  href={resource.externalLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-green-700 hover:text-green-900 font-medium"
                >
                  <Link className="h-4 w-4 mr-1" />
                  Visit Resource
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Resources;