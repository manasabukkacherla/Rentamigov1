import axios from "axios";
import React, { useEffect, useState } from "react";

// Define a type for perks
interface Perk {
  id: number;
  name: string;
  icon: string; // URL or class name for the icon
}

// Define props for the component
interface PerksProps {
  perks: Perk[]; // List of amenities
}
// Add interface for App component props
interface AppProps {
  propertyId: string;
}

const Perks: React.FC<PerksProps> = ({ perks }) => {
  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ marginBottom: "1.5rem", fontSize: "1.8rem", color: "#333" }}>
        FLAT AMENITIES:
      </h2>
      <div className="responsive-grid">
        {perks.map((perk) => (
          <div
            key={perk.id}
            style={{
              display: "flex",
              alignItems: "center",
              padding: "0.5rem",
              transition: "transform 0.2s",
              maxWidth: "200px", // Keep the card width as needed
              margin: "0",
            }}
          >
            <img
              src={perk.icon}
              alt={perk.name}
              style={{
                width: "40px", // Decreased icon size to fit compact design
                height: "40px",
                marginRight: "0.5rem", // Reduced spacing
              }}
            />
            <span style={{ fontSize: "0.9rem", color: "#555" }}>
              {perk.name}
            </span>
          </div>
        ))}
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
  {
    id: 1,
    name: "Air Conditioner",
    icon: "/images/FlatAmenities/Air Conditioner.png",
  },
  { id: 2, name: "Bed", icon: "/images/FlatAmenities/Bed.png" },
  {
    id: 3,
    name: "Dining Table",
    icon: "/images/FlatAmenities/Dining Table.png",
  },
  {
    id: 4,
    name: "Gas Connection",
    icon: "/images/FlatAmenities/Gas Connection.png",
  },
  { id: 5, name: "Matress", icon: "/images/FlatAmenities/Matress.png" },
  { id: 6, name: "Microwave", icon: "/images/FlatAmenities/Microwave.png" },
  {
    id: 7,
    name: "Play Station",
    icon: "/images/FlatAmenities/Play Station.png",
  },
  {
    id: 8,
    name: "Refrigerator",
    icon: "/images/FlatAmenities/Refrigerator.png",
  },
  { id: 9, name: "Sofa", icon: "/images/FlatAmenities/Sofa.png" },
  { id: 10, name: "TV", icon: "/images/FlatAmenities/TV.png" },
  { id: 11, name: "Wardrobe", icon: "/images/FlatAmenities/Wardrobe.png" },
  {
    id: 12,
    name: "Washing Machine",
    icon: "/images/FlatAmenities/Washing Machine.png",
  },
];

// App Component
const App: React.FC<AppProps> = ({ propertyId }) => {
  const [filteredPerks, setFilteredPerks] = useState<Perk[]>([]);

  useEffect(() => {
    const fetchAmenities = async () => {
      try {
        const response = await axios.get(
          `https://c5zaskxsitwlc33abxxgi3smli0lydfl.lambda-url.us-east-1.on.aws/api/properties/details/${propertyId}`
        );
        const { flatAmenities } = response.data;

        // Combine and convert all amenities to lowercase
        const activeAmenities = [...flatAmenities].map((amenity) =>
          amenity.replace(/\s+/g, "").toLowerCase()
        );
        console.log("activeamenities", activeAmenities);

        // Filter perks with case-insensitive matching
        const activePerks = perksData.filter((perk) =>
          activeAmenities.includes(perk.name.replace(/\s+/g, "").toLowerCase())
        );
        console.log("Active perks", activePerks);
        setFilteredPerks(activePerks);
      } catch (error) {
        console.error("Error fetching amenities:", error);
      }
    };

    fetchAmenities();
  }, [propertyId]);

  return (
    <div>
      <Perks perks={filteredPerks} />
    </div>
  );
};

export default App;
