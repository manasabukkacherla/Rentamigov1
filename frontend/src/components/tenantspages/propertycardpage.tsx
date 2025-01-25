import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface PropertyCardProps {
  propertyId: string;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ propertyId }) => {
  const navigate = useNavigate();
  const [propertyData, setPropertyData] = useState<{
    image: string;
    title: string;
    locality: string;
    area: string;
    rent: string;
  } | null>(null);

  useEffect(() => {
    const fetchPropertyData = async () => {
      try {
        const propertiesBaseUrl = "http://localhost:8000/api/properties";
        const photosBaseUrl = "http://localhost:8000/api/photos";

        // Fetch locality and area
        const locationResponse = await axios.get(`${propertiesBaseUrl}/${propertyId}/locations`);
        const locationData = locationResponse.data[0]; // Assuming the first location is relevant

        let rent = "25000"; // Default rent if no commercials are found

        try {
          // Fetch monthly rent
          const commercialsResponse = await axios.get(`${propertiesBaseUrl}/${propertyId}/commercials`);
          const commercialsData = commercialsResponse.data[0]; // Assuming the first commercial is relevant
          if (commercialsData && commercialsData.monthlyRent) {
            rent = commercialsData.monthlyRent;
          }
        } catch (err) {
          console.warn("No commercials found, using default rent:", rent);
        }

        let coverImage = ""; // Default to an empty string if no cover image is found

        try {
          // Fetch cover image
          const photosResponse = await axios.get(`${photosBaseUrl}/${propertyId}/photos`);
          const photosData = photosResponse.data.photos;
          coverImage = photosData.coverImage || ""; // Use coverImage if available
        } catch (err) {
          console.warn("No photos found, using default image.");
        }

        // Set property data
        setPropertyData({
          image: coverImage || locationData.image || "", // Prioritize coverImage
          title: locationData.propertyName || "Property Title",
          locality: locationData.locality || "Locality not available",
          area: locationData.area || "Area not available",
          rent, // Use fetched or default rent
        });
      } catch (error) {
        console.error("Error fetching property data:", error);
      }
    };

    fetchPropertyData();
  }, [propertyId]);

  const handleClick = () => {
    navigate(`/Fullpage/${propertyId}`);
  };

  if (!propertyData) {
    return <p>Loading...</p>;
  }

  return (
    <div onClick={handleClick} style={styles.cardLink}>
      <div style={styles.card} className="md:max-w-[450px]">
        {/* Image Section */}
        <img src={propertyData.image} alt={propertyData.title} style={styles.image} />

        {/* Title and Address */}
        <div style={styles.content}>
          <h3 style={styles.title}>{propertyData.title}</h3>
          <p style={styles.address}>
            {propertyData.locality}, {propertyData.area}
          </p>
        </div>

        {/* Footer */}
        <div style={styles.footer}>
          <div style={styles.rent}>
            <p>Rent Starting From</p>
            <p style={styles.rentPrice}>{propertyData.rent}/month</p>
          </div>
          <button
            style={styles.callbackButton}
            onClick={(e) => {
              e.stopPropagation(); // Prevent card navigation when clicking the button
            }}
          >
            Enquiry
          </button>
        </div>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  cardLink: {
    textDecoration: "none",
    color: "inherit",
    cursor: "pointer",
  },
  card: {
    width: "100%",
    maxWidth: "380px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    margin: "20px auto",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: "230px",
    objectFit: "cover",
  },
  content: {
    padding: "15px",
  },
  title: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "5px",
  },
  address: {
    fontSize: "14px",
    color: "#666",
    marginBottom: "15px",
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 15px",
    borderTop: "1px solid #ddd",
    backgroundColor: "#f9f9f9",
  },
  rent: {
    fontSize: "14px",
  },
  rentPrice: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#333",
  },
  callbackButton: {
    padding: "10px 20px",
    fontSize: "14px",
    color: "#050404",
    backgroundColor: "#28a745",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    textAlign: "center",
  },
};

export default PropertyCard;
