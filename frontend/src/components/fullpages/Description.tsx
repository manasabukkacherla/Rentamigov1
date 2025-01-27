import React, { useEffect, useState } from "react";
import axios from "axios";

interface DescriptionProps {
  propertyId: string; // The parent component provides this prop
}

const Description: React.FC<DescriptionProps> = ({ propertyId }) => {
  const [description, setDescription] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchDescription = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(
          `https://api.rentamigo.in/api/properties/${propertyId}/features`
        );

        // Extract propertyDescription from the first object in the response array
        const propertyDescription = response.data[0]?.propertyDescription || null;

        setDescription(propertyDescription);
      } catch (err: any) {
        setError(err.response?.data?.error || "Failed to fetch property description.");
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
    return <div style={{ color: "red" }}>Error: {error}</div>;
  }

  return (
    <div style={{ fontFamily: "Arial, sans-serif", lineHeight: "1.6", color: "#333" }}>
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
