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

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/properties"
        );
        const formattedProperties = response.data.map((property: any) => ({
          image:
            property.photos.cardPhoto[0] || "https://via.placeholder.com/none",
          title: property.propertyName,
          address: `${property.locality}, ${property.area}`, // Modified this line
          rent: `₹${property.monthlyRent.toLocaleString()}`,
          link: `/Fullpage/${property._id}`,
          propertyId: property._id, // Add this line
        }));
        setProperties(formattedProperties);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, []);

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
      width: "25%",
      position: "fixed",
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
      <div style={styles.header}>
        <Headerr />
      </div>
      <div style={styles.searchBar}>
        <SearchBar />
      </div>
      <div style={styles.mainContent}>
        <div style={styles.filterSection}>
          <FilterComponent />
        </div>
        <PropertySection>
          <div style={styles.propertyGrid}>
            {properties.map((property, index) => (
              <PropertyCard
                key={index}
                image={property.image}
                title={property.title}
                address={property.address}
                rent={property.rent}
                link={property.link}
                propertyId={property.propertyId}
              />
            ))}
          </div>
        </PropertySection>
      </div>
    </div>
  );
};

export default Tenanthome;
