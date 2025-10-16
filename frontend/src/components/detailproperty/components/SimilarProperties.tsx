import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MapPin, Bed, Bath, Square, Bookmark, BookmarkCheck, 
  ChevronLeft, ChevronRight, Calendar, ArrowRight, IndianRupee
} from 'lucide-react';
import axios from 'axios';



interface MediaPhotos {
  exterior?: string[];
  interior?: string[];
  plot?: string[];
  [key: string]: any;
}

interface PropertyMedia {
  photos?: MediaPhotos;
  [key: string]: any;
}

interface Property {
  id: string;
  propertyId?: string;
  title: string;
  type: string;
  status?: string;
  intent?: string;
  listingType?: string;
  price?: number;
  formattedPrice?: string;
  area?: number;
  formattedArea?: string;
  bedrooms?: number;
  bathrooms?: number;
  location?: string;
  images?: { url: string }[];
  media?: PropertyMedia;
  url: string;
  image?: string;
  imageUrl?: string;
  postedDate?: string;
  createdAt?: string;
  propertyType?: string;
  furnishing?: string;
}

export const SimilarProperties: React.FC<{ propertyType: string }> = ({ propertyType }) => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [savedProperties, setSavedProperties] = useState<string[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePropertyClick = (propertyTypeCode: string, propertyId: string) => {
    const url = propertyTypeCode !== 'PL' && propertyTypeCode !== 'AG' 
      ? `/detailprop/${propertyId}`
      : `/agriplot/${propertyId}`;
    navigate(url);
  };

  // Format price in Indian numbering system
  const formatPrice = (price?: number) => {
    if (!price) return 'Price on request';
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(2)} Cr`;
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(2)} L`;
    } else {
      return `₹${price.toLocaleString()}`;
    }
  };

  // Get status color class

  // Toggle save property
  const toggleSaveProperty = (e: React.MouseEvent, propertyId: string) => {
    e.stopPropagation();
    setSavedProperties(prev => 
      prev.includes(propertyId)
        ? prev.filter(id => id !== propertyId)
        : [...prev, propertyId]
    );
  };

  // Process property images when properties change
  useEffect(() => {
    if (!properties.length) return;

    // Debug: Log the first property's image data
    console.log('Processing properties with images:', properties.map(p => ({
      id: p.id,
      media: p.media,
      imageUrl: p.imageUrl,
      images: p.images,
      image: p.image
    })));

    // Ensure all properties have an imageUrl with proper URL
    
    const updatedProperties = properties.map(property => {
      // Get image from the nested media structure first, then fall back to other sources
      let imgUrl = property.media?.photos?.exterior?.[0] || 
                  property.media?.photos?.plot?.[0] ||
                  property.media?.photos?.interior?.[0] ||
                  property.images?.[0]?.url || 
                  property.imageUrl || 
                  property.image ||
                  'https://via.placeholder.com/400x300?text=No+Image';
     
      // If the URL is relative, make it absolute
      if (imgUrl && !imgUrl.startsWith('http') && !imgUrl.startsWith('data:image') && !imgUrl.startsWith('https://via.placeholder.com')) {
        imgUrl = imgUrl.startsWith('/') 
          ? `${window.location.origin}${imgUrl}`
          : `${window.location.origin}/${imgUrl}`;
      }
      console.log('Image URL:', imgUrl);
      return {
        ...property,
        imageUrl: imgUrl
      };
    });
    console.log(updatedProperties)
    setProperties(updatedProperties);
  }, [properties]);

  // Fetch recent properties
  useEffect(() => {
    const fetchRecentProperties = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/allproperties/all');
        
        // Flatten the grouped properties
        const flattenGrouped = (grouped: Record<string, any>): Property[] => {
          const all: Property[] = [];
          for (const groupKey in grouped) {
            const category = grouped[groupKey];
            for (const subType in category) {
              const items = category[subType];
              if (Array.isArray(items)) {
                all.push(...items);
              }
            }
          }
          return all;
        };

        const allProperties = flattenGrouped(response.data?.data || {});
        
        // Process properties
        const processedProperties = allProperties
          .sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime())
          .slice(0, 10)
          .map((property: any) => ({
            ...property,
            formattedPrice: formatPrice(property.price),
            formattedArea: property.area ? `${property.area.toLocaleString()} sq.ft` : 'N/A',
            postedDate: property.createdAt ? new Date(property.createdAt).toLocaleDateString() : 'N/A',
            type: property.propertyType || 'Property',
            imageUrl: property.images?.[0]?.url
          }));

        setProperties(processedProperties);
      } catch (error) {
        console.error('Error fetching properties:', error);
        setProperties([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentProperties();
  }, [propertyType]);

  // Handle scroll to show current item
  const scrollToIndex = (index: number) => {
    if (!scrollContainerRef.current) return;
    
    const container = scrollContainerRef.current;
    const items = container.children;
    if (index < 0 || index >= items.length) return;
    
    const item = items[index] as HTMLElement;
    container.scrollTo({
      left: item.offsetLeft - container.offsetLeft - 16,
      behavior: 'smooth'
    });
    
    setCurrentIndex(index);
  };

  // Handle scroll events
  const handleScroll = useCallback(() => {
    if (!scrollContainerRef.current) return;
    
    const container = scrollContainerRef.current;
    const containerWidth = container.offsetWidth;
    const scrollLeft = container.scrollLeft;
    const scrollWidth = container.scrollWidth;
    
    // Update current index based on scroll position
    const newIndex = Math.round(scrollLeft / (scrollWidth / properties.length));
    if (newIndex !== currentIndex) {
      setCurrentIndex(newIndex);
    }
    
    // Update scroll buttons disabled state
    const isAtStart = scrollLeft <= 10;
    const isAtEnd = scrollLeft + containerWidth >= scrollWidth - 10;
    
    if (isAtStart && currentIndex !== 0) {
      setCurrentIndex(0);
    } else if (isAtEnd && currentIndex !== properties.length - 1) {
      setCurrentIndex(properties.length - 1);
    }
  }, [currentIndex, properties.length]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  }

  if (!properties.length) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-gray-500">No similar properties found</div>
      </div>
    );
  }
  console.log('Properties:', properties);
  return (
    <div className="relative">
      <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Similar Properties</h2>
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => scrollToIndex(currentIndex - 1)}
            disabled={currentIndex === 0}
            className="p-2 rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous property"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={() => scrollToIndex(currentIndex + 1)}
            disabled={currentIndex >= properties.length - 1}
            className="p-2 rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next property"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div 
        ref={scrollContainerRef}
        className="flex overflow-x-auto snap-x snap-mandatory gap-6 scroll-smooth pb-4 px-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        onScroll={handleScroll}
      >
        {properties.map((property) => {
          const isSaved = savedProperties.includes(property.id);
        
          return (
            <div
              key={property.id}
              className="flex-none w-full snap-center sm:w-[calc(100%/2-12px)] lg:w-[calc(100%/3-16px)]"
              onClick={() => handlePropertyClick(property.propertyId?.slice(8,10) || '', property.propertyId || property.id || '')}
            >
              <div className="h-full bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col">
                {/* Image Section */}
                <div className="relative h-48 bg-gray-100 group">
                  <div className="relative w-full h-full overflow-hidden">
                    <img
                      src={property.imageUrl}
                      alt={property.title || 'Property image'}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      onError={(e) => {
                        console.error('Error loading image:', property.imageUrl);
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://via.placeholder.com/400x300?text=No+Image';
                      }}
                      onLoad={() => console.log('Image loaded successfully:', property.imageUrl)}
                    />
                    
                    {/* Image Count Badge - Show if there are multiple images */}
                    {((property.images && property.images.length > 1) || (property.media?.photos?.exterior && property.media.photos.exterior.length > 1)) && (
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
                        +{Math.max(
                          property.images?.length || 0,
                          property.media?.photos?.exterior?.length || 0
                        ) - 1} more
                      </div>
                    )}
                  </div>

                  {/* Status and Type Badges */}
                  <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                    {property.listingType && (
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        property.listingType === 'RentAmigo' 
                          ? 'bg-black text-white' 
                          : 'bg-white text-gray-800 border border-gray-200'
                      }`}>
                        {property.listingType}
                      </span>
                    )}
                    
                    {(property.status || property.intent) && (
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        property.status === 'Available' 
                          ? 'bg-green-100 text-green-800' 
                          : property.status === 'Rented' || property.status === 'Sold' 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-gray-100 text-gray-800'
                      }`}>
                        {property.status || 'Available'}
                      </span>
                    )}
                  </div>
                  
                  {/* Save Button */}
                  <button
                    onClick={(e) => toggleSaveProperty(e, property.id)}
                    className="absolute top-2 right-2 p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-md hover:bg-gray-100 transition-colors"
                    aria-label={isSaved ? "Unsave property" : "Save property"}
                  >
                    {isSaved ? (
                      <BookmarkCheck className="w-5 h-5 text-gray-900" />
                    ) : (
                      <Bookmark className="w-5 h-5 text-gray-900" />
                    )}
                  </button>
                  
                  {/* Posted Date */}
                  <div className="absolute bottom-2 left-2">
                    <div className="flex items-center gap-1 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-lg shadow-md">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-900">{property.postedDate}</span>
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
                    
                    <div className="flex items-center gap-1 text-2xl font-bold text-gray-900 mb-2">
                      <IndianRupee className="w-6 h-6" />
                      <span>{property.formattedPrice || 'Price on Request'}</span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 mb-4">
                      {property.bedrooms && (
                        <div className="bg-gray-50 p-2 rounded-lg text-center">
                          <div className="flex items-center justify-center gap-1 text-gray-700">
                            <Bed className="w-4 h-4" />
                            <span className="font-medium">{property.bedrooms}</span>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">Beds</p>
                        </div>
                      )}
                      
                      {property.bathrooms && (
                        <div className="bg-gray-50 p-2 rounded-lg text-center">
                          <div className="flex items-center justify-center gap-1 text-gray-700">
                            <Bath className="w-4 h-4" />
                            <span className="font-medium">{property.bathrooms}</span>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">Baths</p>
                        </div>
                      )}
                      
                      <div className="bg-gray-50 p-2 rounded-lg text-center">
                        <div className="flex items-center justify-center gap-1 text-gray-700">
                          <Square className="w-4 h-4" />
                          <span className="font-medium">{property.formattedArea}</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Area</p>
                      </div>
                    </div>
                    
                    {property.furnishing && (
                      <div className="mb-2">
                        <span className="text-sm text-gray-600">Furnishing: </span>
                        <span className="text-sm font-medium">{property.furnishing}</span>
                      </div>
                    )}
                    
                    {property.listingType && (
                      <div className="text-sm text-gray-600">
                        Listed by: <span className="font-medium">{property.listingType}</span>
                      </div>
                    )}

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
      </div>
      
      <div className="flex gap-1 mt-6 justify-center">
        {properties.map((_: Property, index: number) => (
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