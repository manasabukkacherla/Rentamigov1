import axios from "axios";
import React, { useEffect, useState } from "react";

// Define a type for perks
interface Perk {
  id: number;
  name: string;
  icon: string; // URL or class name for the icon
}

// Define props for the Perks component
interface PerksProps {
  perks: Perk[]; // List of amenities
}

// Define props for the App component
interface AppProps {
  propertyId: string;
}

// Perks Component
const Perks: React.FC<PerksProps> = ({ perks }) => {
  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ marginBottom: "1.5rem", fontSize: "1.8rem", color: "#333" }}>
        Flat Amenities:
      </h2>
      <div className="responsive-grid">
        {perks.length > 0 ? (
          perks.map((perk) => (
            <div
              key={perk.id}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "0.5rem",
                transition: "transform 0.2s",
                maxWidth: "200px",
                margin: "0",
              }}
            >
              <img
                src={perk.icon}
                alt={perk.name}
                style={{
                  width: "40px",
                  height: "40px",
                  marginRight: "0.5rem",
                }}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/images/default-icon.png"; // Fallback icon
                }}
              />
              <span style={{ fontSize: "0.9rem", color: "#555" }}>{perk.name}</span>
            </div>
          ))
        ) : (
          <p style={{ color: "#888", fontSize: "1rem" }}>
            No flat amenities available for this property.
          </p>
        )}
      </div>
      <style>
        {`
          .responsive-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr); /* 4 columns for large screens */
            gap: 1.5rem;
          }

          @media (max-width: 768px) {
            .responsive-grid {
              grid-template-columns: repeat(2, 1fr); /* 2 columns for small screens */
            }
          }
        `}
      </style>
    </div>
  );
};

// Sample data for perks
const perksData: Perk[] = [
  { id: 1, name: "Air Conditioner", icon: "/images/FlatAmenities/Air Conditioner.png" },
  { id: 2, name: "Bed", icon: "/images/FlatAmenities/Bed.png" },
  { id: 3, name: "Dining Table", icon: "/images/FlatAmenities/Dining Table.png" },
  { id: 4, name: "Gas Connection", icon: "/images/FlatAmenities/Gas Connection.png" },
  { id: 5, name: "Mattress", icon: "/images/FlatAmenities/Mattress.png" },
  { id: 6, name: "Microwave", icon: "/images/FlatAmenities/Microwave.png" },
  { id: 7, name: "Play Station", icon: "/images/FlatAmenities/Play Station.png" },
  { id: 8, name: "Refrigerator", icon: "/images/FlatAmenities/Refrigerator.png" },
  { id: 9, name: "Sofa", icon: "/images/FlatAmenities/Sofa.png" },
  { id: 10, name: "TV", icon: "/images/FlatAmenities/TV.png" },
  { id: 11, name: "Wardrobe", icon: "/images/FlatAmenities/Wardrobe.png" },
  { id: 12, name: "Washing Machine", icon: "/images/FlatAmenities/Washing Machine.png" },
];

// App Component
const App: React.FC<AppProps> = ({ propertyId }) => {
  const [filteredPerks, setFilteredPerks] = useState<Perk[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAmenities = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(
          `https://api.rentamigo.in/api/properties/${propertyId}/flat-amenities`
        );

        console.log("API Response:", response.data);

        const selectedAmenities = response.data[0]?.selectedAmenities || [];

        const normalizedAmenities = selectedAmenities.map((amenity: string) =>
          amenity.replace(/\s+/g, "").toLowerCase()
        );

        const matchedPerks = perksData.filter((perk) =>
          normalizedAmenities.includes(perk.name.replace(/\s+/g, "").toLowerCase())
        );

        setFilteredPerks(matchedPerks);
      } catch (error) {
        console.error("Error fetching flat amenities:", error);
        setError("Failed to load amenities. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchAmenities();
  }, [propertyId]);

  if (loading) {
    return <p style={{ color: "#888", fontSize: "1rem", textAlign: "center" }}>Loading amenities...</p>;
  }

  return (
    <div>
      {error ? (
        <p style={{ color: "red", fontSize: "1.2rem", textAlign: "center" }}>{error}</p>
      ) : (
        <Perks perks={filteredPerks} />
      )}
    </div>
  );
};

export default App;
