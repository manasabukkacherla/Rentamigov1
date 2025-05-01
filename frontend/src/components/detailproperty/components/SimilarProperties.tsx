import React, { useRef, useEffect, useState } from 'react';
import { Building2, Bath, Bed, MapPin, IndianRupee, ChevronLeft, ChevronRight, Heart, Share2, Star, ArrowRight, Check, Clock, Home, Castle, Building, Warehouse, Bookmark, BookmarkCheck } from 'lucide-react';

const properties = [
  {
    id: 1,
    title: 'Modern Apartment with City View',
    location: 'Electronic City Phase 1, Bangalore',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
    price: '24.5',
    beds: 3,
    baths: 2,
    area: '1,500',
    type: 'Apartment',
    status: 'Ready to Move',
    featured: true,
    rating: 4.8
  },
  {
    id: 2,
    title: 'Luxury Villa with Garden',
    location: 'Whitefield, Bangalore',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
    price: '18.2',
    beds: 3,
    baths: 2,
    area: '2,200',
    type: 'Villa',
    status: 'Under Construction',
    featured: false,
    rating: 4.5
  },
  {
    id: 3,
    title: 'Spacious Condominium',
    location: 'HSR Layout, Bangalore',
    image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800',
    price: '22.4',
    beds: 4,
    baths: 3,
    area: '1,800',
    type: 'Condo',
    status: 'Ready to Move',
    featured: false,
    rating: 4.7
  },
  {
    id: 4,
    title: 'Premium Lake View Apartment',
    location: 'Koramangala, Bangalore',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
    price: '32.8',
    beds: 4,
    baths: 3,
    area: '2,100',
    type: 'Apartment',
    status: 'Ready to Move',
    featured: true,
    rating: 4.9
  },
  {
    id: 5,
    title: 'Garden View Penthouse',
    location: 'Indiranagar, Bangalore',
    image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800',
    price: '45.2',
    beds: 5,
    baths: 4,
    area: '3,200',
    type: 'Penthouse',
    status: 'Under Construction',
    featured: false,
    rating: 4.6
  }
];

const propertyTypeIcons: Record<string, React.FC> = {
  'Apartment': Building2,
  'Villa': Home,
  'Condo': Building,
  'Penthouse': Castle,
};

export const SimilarProperties: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [autoScrollPaused, setAutoScrollPaused] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [savedProperties, setSavedProperties] = useState<number[]>([]);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const filters = ['All', 'Apartment', 'Villa', 'Condo', 'Penthouse'];

  const filteredProperties = activeFilter && activeFilter !== 'All'
    ? properties.filter(property => property.type === activeFilter)
    : properties;

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (!autoScrollPaused && scrollContainerRef.current) {
      interval = setInterval(() => {
        const nextIndex = (currentIndex + 1) % filteredProperties.length;
        setCurrentIndex(nextIndex);
        
        const cardWidth = scrollContainerRef.current?.offsetWidth || 0;
        scrollContainerRef.current?.scrollTo({
          left: nextIndex * cardWidth,
          behavior: 'smooth'
        });
      }, 5000);
    }

    return () => clearInterval(interval);
  }, [autoScrollPaused, currentIndex, filteredProperties.length]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const nextIndex = direction === 'left' 
        ? (currentIndex - 1 + filteredProperties.length) % filteredProperties.length
        : (currentIndex + 1) % filteredProperties.length;
      
      setCurrentIndex(nextIndex);
      const cardWidth = scrollContainerRef.current.offsetWidth;
      scrollContainerRef.current.scrollTo({
        left: nextIndex * cardWidth,
        behavior: 'smooth'
      });
    }
  };

  const toggleSave = (id: number) => {
    setSavedProperties(prev => 
      prev.includes(id) 
        ? prev.filter(propId => propId !== id)
        : [...prev, id]
    );
  };

  return (
    <div 
      className="bg-white rounded-xl shadow-lg p-6 overflow-hidden"
      onMouseEnter={() => setAutoScrollPaused(true)}
      onMouseLeave={() => setAutoScrollPaused(false)}
      onTouchStart={() => setAutoScrollPaused(true)}
      onTouchEnd={() => setAutoScrollPaused(false)}
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Similar Properties</h2>
          <p className="text-gray-600">Explore more properties in this area</p>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter === 'All' ? null : filter)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                (filter === 'All' && activeFilter === null) || filter === activeFilter
                  ? 'bg-gray-900 text-white shadow-md' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="relative">
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 -ml-4 hover:bg-gray-50 transition-colors"
          aria-label="Previous property"
        >
          <ChevronLeft className="w-5 h-5 text-gray-900" />
        </button>

        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto snap-x snap-mandatory gap-6 scroll-smooth pb-4 px-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {filteredProperties.map((property) => {
            const TypeIcon = propertyTypeIcons[property.type] || Building2;
            const isSaved = savedProperties.includes(property.id);
            
            return (
              <div
                key={property.id}
                className="flex-none w-full snap-center sm:w-[calc(100%/2-12px)] lg:w-[calc(100%/3-16px)] group"
              >
                <div className="h-full bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col">
                  <div className="relative">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={property.image}
                        alt={property.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                      />
                    </div>
                    
                    <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 bg-white/90 backdrop-blur-sm text-gray-900 text-sm font-medium shadow-md rounded-lg">
                      <TypeIcon className="w-4 h-4" />
                      <span>{property.type}</span>
                    </div>
                    
                    {property.featured && (
                      <div className="absolute top-0 left-0">
                        <div className="bg-gray-900 text-white py-1 px-8 rotate-[-45deg] translate-x-[-30%] translate-y-[40%] text-sm font-medium shadow-md">
                          Featured
                        </div>
                      </div>
                    )}
                    
                    <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-between items-center bg-gradient-to-t from-black/70 via-black/40 to-transparent">
                      <button 
                        onClick={() => toggleSave(property.id)}
                        className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
                        aria-label={isSaved ? "Unsave property" : "Save property"}
                      >
                        {isSaved ? (
                          <BookmarkCheck className="w-5 h-5 text-gray-900" />
                        ) : (
                          <Bookmark className="w-5 h-5 text-gray-900" />
                        )}
                      </button>
                      
                      <div className="flex items-center gap-1 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-lg shadow-md">
                        <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                        <span className="text-sm font-medium text-gray-900">{property.rating}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1 group-hover:text-gray-700 transition-colors">
                      {property.title}
                    </h3>
                    
                    <div className="flex items-center gap-1 text-gray-600 text-sm mb-4">
                      <MapPin className="w-4 h-4 flex-shrink-0" />
                      <span className="line-clamp-1">{property.location}</span>
                    </div>
                    
                    <div className="flex items-center gap-1 text-2xl font-bold text-gray-900 mb-4">
                      <IndianRupee className="w-6 h-6" />
                      <span>{property.price} Cr</span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 mb-4">
                      <div className="bg-gray-50 p-2 rounded-lg text-center">
                        <div className="flex items-center justify-center gap-1 text-gray-700">
                          <Bed className="w-4 h-4" />
                          <span className="font-medium">{property.beds}</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Beds</p>
                      </div>
                      
                      <div className="bg-gray-50 p-2 rounded-lg text-center">
                        <div className="flex items-center justify-center gap-1 text-gray-700">
                          <Bath className="w-4 h-4" />
                          <span className="font-medium">{property.baths}</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Baths</p>
                      </div>
                      
                      <div className="bg-gray-50 p-2 rounded-lg text-center">
                        <div className="flex items-center justify-center gap-1 text-gray-700">
                          <Building2 className="w-4 h-4" />
                          <span className="font-medium">{property.area}</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Sq.ft.</p>
                      </div>
                    </div>

                    <button className="mt-auto w-full py-3 text-center text-white font-medium bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 shadow-sm">
                      <span>View Details</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 -mr-4 hover:bg-gray-50 transition-colors"
          aria-label="Next property"
        >
          <ChevronRight className="w-5 h-5 text-gray-900" />
        </button>
      </div>
      
      <div className="flex gap-1 mt-6 justify-center">
        {filteredProperties.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentIndex(index);
              if (scrollContainerRef.current) {
                const cardWidth = scrollContainerRef.current.offsetWidth;
                scrollContainerRef.current.scrollTo({
                  left: index * cardWidth,
                  behavior: 'smooth'
                });
              }
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-gray-900 w-8' 
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Go to property ${index + 1}`}
          />
        ))}
      </div>
      
      <div className="flex justify-center mt-8">
        <button className="group flex items-center gap-2 px-6 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors shadow-md">
          <span>Browse All Properties</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
};