import React, { useEffect, useState } from "react";
import axios from "axios";
import Headerr from "../landingpages/headerr";
import SearchBar from "./searchbar";
import FilterComponent from "./filtercomponent";
import PropertyCard from "./propertycardpage";
import styled from "styled-components";

interface Property {
  image: string;
  title: string;
  address: string;
  rent: string;
  link: string;
  propertyId: string;
}

const Tenanthome: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [, setSearchQuery] = useState<string>("");

  // Fetch properties from the API
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/properties/property"
        );

        const formattedProperties = response.data.map((property: any) => ({
          image:
            property.photos?.cardPhoto?.[0] || "https://via.placeholder.com/none",
          title: property.propertyName || "Unknown Title",
          address: `${property.locality || "Unknown Locality"}, ${
            property.area || "Unknown Area"
          }`,
          rent: `₹${property.monthlyRent?.toLocaleString() || "0"}`,
          link: `/Fullpage/${property._id}`,
          propertyId: property._id,
        }));

        setProperties(formattedProperties);
        setFilteredProperties(formattedProperties); // Initialize filtered properties
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, []);

  // Handle search input
  const handleSearch = (query: string) => {
    setSearchQuery(query);

    if (!query) {
      setFilteredProperties(properties); // Reset to all properties if the query is empty
    } else {
      const filtered = properties.filter((property) =>
        property.title.toLowerCase().includes(query.toLowerCase()) ||
        property.address.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProperties(filtered);
    }
  };

  // Styled components
  const PropertySection = styled.div`
    width: 75%;
    margin-left: 25%;
    padding: 20px;

    @media (max-width: 768px) {
      width: 100%;
      margin-left: 0;
    }
  `;

  const styles: Record<string, React.CSSProperties> = {
    container: {
      margin: "0",
      padding: "0",
      width: "100%",
      boxSizing: "border-box",
      display: "flex",
      flexDirection: "column",
      position: "relative",
      marginTop: "40px",

    },
    header: {
      width: "100%",
      marginBottom: "20px",
    },
    mainContent: {
      display: "flex",
      width: "100%",
      position: "relative",
    },
    filterSection: {
      width: "5%",
      right:"500px",
      left: 0,
      top: "200px",
      bottom: 0,
    },
    propertyGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
      gap: "10px",
      width: "100%",
    },
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <Headerr />
      </div>

      {/* Search Bar */}
      <div style={styles.searchBar}>
        <SearchBar onSearch={handleSearch} />
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        {/* Filter Section */}
        <div style={styles.filterSection}>
          <FilterComponent />
        </div>

        {/* Properties Section */}
        <PropertySection>
          {filteredProperties.length > 0 ? (
            <div style={styles.propertyGrid}>
              {filteredProperties.map((property, index) => (
                <PropertyCard
                  key={property.propertyId || index}
                  image={property.image}
                  title={property.title}
                  address={property.address}
                  rent={property.rent}
                  link={property.link}
                  propertyId={property.propertyId}
                />
              ))}
            </div>
          ) : (
            <p style={{ textAlign: "center" }}>No properties found.</p>
          )}
        </PropertySection>
      </div>
    </div>
  );
};

export default Tenanthome;
