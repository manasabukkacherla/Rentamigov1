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

interface BuildingAmenitiesProps {
  propertyId: string;
}

const Perks: React.FC<PerksProps> = ({ perks }) => {
  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h2
        style={{
          marginBottom: "1.5rem",
          fontSize: "1.8rem",
          color: "#333",
        }}
      >
        Society/Building Amenities:
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

// List of all available perks
const perksData: Perk[] = [
  { id: 1, name: "Badminton", icon: "/images/SocietyAmenties/Badminton Court.png" },
  { id: 2, name: "Basketball Court", icon: "/images/SocietyAmenties/Basketball Court.png" },
  { id: 3, name: "Carrom", icon: "/images/SocietyAmenties/carrom.png" },
  { id: 4, name: "CCTV", icon: "/images/SocietyAmenties/CCTV.png" },
  { id: 5, name: "Chess Board", icon: "/images/SocietyAmenties/Chess Board.png" },
  { id: 6, name: "Children Play Area", icon: "/images/SocietyAmenties/Children Play Area.png" },
  { id: 7, name: "Club House", icon: "/images/SocietyAmenties/Club House.png" },
  { id: 8, name: "Day-to-Day Utility Stores", icon: "/images/SocietyAmenties/Day-to-Day Utility Stores.png" },
  { id: 9, name: "Flower Park", icon: "/images/SocietyAmenties/Flower Park.png" },
  { id: 10, name: "Gym", icon: "/images/SocietyAmenties/Gym.png" },
  { id: 11, name: "Jacuzzi", icon: "/images/SocietyAmenties/Jacuzzi.png" },
  { id: 12, name: "Jogging Track", icon: "/images/SocietyAmenties/Jogging Track.png" },
  { id: 13, name: "Kids Pool", icon: "/images/SocietyAmenties/Kids Pool.png" },
  { id: 14, name: "Lawn Tennis Court", icon: "/images/SocietyAmenties/Lawn Tennis Court.png" },
  { id: 15, name: "Lift", icon: "/images/SocietyAmenties/Lift.png" },
  { id: 16, name: "Massage Parlor", icon: "/images/SocietyAmenties/Massage Parlor.png" },
  { id: 17, name: "Meditation Room", icon: "/images/SocietyAmenties/Meditation Room.png" },
  { id: 18, name: "Multipurpose Hall", icon: "/images/SocietyAmenties/Multipurpose Hall.png" },
  { id: 19, name: "Power Backup", icon: "/images/SocietyAmenties/Power Backup.png" },
  { id: 20, name: "Salon", icon: "/images/SocietyAmenties/Salon.png" },
  { id: 21, name: "Security", icon: "/images/SocietyAmenties/Security.png" },
  { id: 22, name: "Snooker", icon: "/images/SocietyAmenties/Snooker.png" },
  { id: 23, name: "Squash Court", icon: "/images/SocietyAmenties/Squash Court.png" },
  { id: 24, name: "Steam Room", icon: "/images/SocietyAmenties/Steam Room.png" },
  { id: 25, name: "Barbecue Grill", icon: "/images/SocietyAmenties/Swimming Pool.png" },
  { id: 26, name: "Table Tennis", icon: "/images/SocietyAmenties/Table Tennis.png" },
  { id: 27, name: "Yoga Center", icon: "/images/SocietyAmenties/Yoga Center.png" },
];

const BuildingAmenities: React.FC<BuildingAmenitiesProps> = ({ propertyId }) => {
  const [filteredPerks, setFilteredPerks] = useState<Perk[]>([]);

  useEffect(() => {
    const fetchAmenities = async () => {
      try {
        const response = await axios.get(
          `https://api.rentamigo.in/api/properties/${propertyId}/society-amenities`
        );

        const selectedAmenities = response.data[0]?.selectedAmenities || [];

        const normalizedAmenities = selectedAmenities.map((amenity: string) =>
          amenity.replace(/\s+/g, "").toLowerCase()
        );

        const matchedPerks = perksData.filter((perk) =>
          normalizedAmenities.includes(perk.name.replace(/\s+/g, "").toLowerCase())
        );

        setFilteredPerks(matchedPerks);
      } catch (error) {
        console.error("Error fetching society amenities:", error);
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

export default BuildingAmenities;
