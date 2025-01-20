import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface DescriptionProps {
  propertyId: string; // Accepting propertyId as a prop
}

const Description: React.FC<DescriptionProps> = ({ propertyId }) => {
  const [description, setDescription] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchDescription = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/properties/${propertyId}`
        );
        setDescription(response.data.propertyDescription); // Assuming `propertyDescription` is the field name
      } catch (err: any) {
        setError(err.response?.data?.error || err.message);
      } finally {
        setLoading(false);
      }
    };

    if (propertyId) {
      fetchDescription();
    }
  }, [propertyId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div style={{ color: 'red' }}>Error: {error}</div>;
  }

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', lineHeight: '1.6', color: '#333' }}>
      <h2>About the Property</h2>
      {description ? (
        <p>
          <strong>Description:</strong> {description}
        </p>
      ) : (
        <p>
          <strong>No description available for this property.</strong>
        </p>
      )}
    </div>
  );
};

export default Description;
