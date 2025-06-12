import React, { useState, useEffect } from 'react';
import { PropertyCard } from './components/PropertyCard';
import { Property } from './types';

export const AllProperties: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch('/all');
        if (!response.ok) {
          throw new Error('Failed to fetch properties');
        }
        const data = await response.json();
        
        // Transform API data to match Property type
        const transformedProperties = data.map((item: any) => ({
          id: item.id,
          title: item.basicInformation.title || item.basicInformation.propertyName || item.pgDetails.name || 'Unnamed Property',
        //   type: item.metadata.propertyType,
          propertyType: item.metadata.propertyType,
          propertyName: item.metadata.propertyName,
          area: item.propertySize,
          bathrooms: item.propertyDetails.bathrooms || item.propertyDetails.washrooms || 0,
          bedrooms: item.propertyDetails.bedrooms || 0,
          image: item.media.photos.exterior,
          listingType: 'RentAmigo',
          status: item.metadata.status,
          intent: item.metadata.intent,
          location: item.basicInformation.address.location, // Add location handling if needed
          bhkType: `${item.propertyDetails.bedrooms}BHK`,
          furnishing: item.propertyDetails.furnishingStatus || 'Fully Furnished',
        }));
        
        setProperties(transformedProperties);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading) return <div className="text-center py-8">Loading properties...</div>;
  if (error) return <div className="text-red-500 text-center py-8">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">All Properties</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
};
