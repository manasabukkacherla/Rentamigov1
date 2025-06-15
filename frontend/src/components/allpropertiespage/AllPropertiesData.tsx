import React, { useEffect, useState } from 'react';
import { Property } from './types';
interface AllPropertiesData {
  id: string;
  title: string;
  propertyType: string;
  propertyName: string;
  listingType: string;
  price: number;
  location: string;
  image: string;  
  intent: string;
  status: string;
  // bhkType: string;
  bathrooms: number;
  furnishing: string;
  area: number; 
}
interface AllPropertiesDataProps {
  onPropertiesFetched: (properties: AllPropertiesData[]) => void;
}



export const AllPropertiesData: React.FC<AllPropertiesDataProps> = ({ onPropertiesFetched }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Normalize property data to a consistent format
  const normalizeProperty = (item: any): AllPropertiesData => ({
    id: item._id?.toString() || item.propertyId || '',
    title: item.basicInformation?.title || item.title || item.pgDetails?.name || 'Unnamed Property',
    propertyName: item.metadata?.propertyName || '',
    image: item.media?.photos?.exterior || '',
    // Add other common fields here
    propertyType: item.metadata?.propertyType || '',
    listingType: item.metadata?.listingType || '',
    intent: item.metadata?.intent || '',
    location: item.basicInformation?.address.location || '',  
    price: item.pricing?.price || 0,
    area: item.propertySize || 0,
    status: item.metadata?.status || '',
    // bhkType: item.metadata?.bhkType || '',
    bathrooms: item.propertyDetails?.bathrooms || item.propertyDetails?.washrooms || 0,
    furnishing: item.propertyDetails?.furnishing || 'Unfurnished',
      });

  useEffect(() => {
    const fetchAllProperties = async () => {
      try {
        // Fetch all property types from the backend
        const responses = await Promise.all([
          fetch('/api/all/'),

          // fetch('/api/residential/pgmain')
        ]);

        const data = await Promise.all(
          responses.map(res => res.json())
        );

        // Normalize and combine all properties
        const allProperties = data
          .flatMap((res: any) => res.data || [])
          .map(normalizeProperty);

        onPropertiesFetched(allProperties);
      } catch (err) {
        console.error('Error fetching properties:', err);
        setError('Failed to fetch properties');
      } finally {
        setLoading(false);
      }
    };

    fetchAllProperties();
  }, [onPropertiesFetched]);

  if (loading) {
    return <div>Loading properties...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return null;
};
