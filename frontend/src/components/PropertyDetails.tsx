import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Fullpage from "./fullpages/Fullpage";

interface PropertyDetails {
  propertyName: string;
  photos: {
    cardPhoto: string[];
    exteriorView: string[];
    // ... other photo fields
  };
  address: {
    line1: string;
    line2: string;
    line3: string;
  };
  // ... add other fields as needed
}

const PropertyDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<PropertyDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const response = await axios.get(
          `https://c5zaskxsitwlc33abxxgi3smli0lydfl.lambda-url.us-east-1.on.aws/api/properties/${id}`
        );
        setProperty(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching property details:", error);
        setLoading(false);
      }
    };

    fetchPropertyDetails();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!property) return <div>Property not found</div>;

  return (
    <div>
      <h1>{property.propertyName}</h1>
      {id && <Fullpage propertyId={id} />}
      {/* Add your property details layout here */}
    </div>
  );
};

export default PropertyDetails;
