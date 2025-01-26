import React, { useEffect, useState } from "react";
import axios from "axios";
import Headerr from "../landingpages/headerr";
import SearchBar from "./searchbar";
import FilterComponent from "./filtercomponent";
import PropertyCard from "./propertycardpage";
import styled from "styled-components";
import { Loader2 } from "lucide-react";

interface Property {
  image: string;
  title: string;
  address: string;
  rent: string;
  link: string;
  propertyId: string;
  details?: any;
}

const Tenanthome: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFiltering, setIsFiltering] = useState(false);
  const [, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setIsLoading(true);
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
        setFilteredProperties(formattedProperties);
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const fetchDetailedProperties = async () => {
    const detailedProperties = await Promise.all(
      properties.map(async (property) => {
        try {
          const response = await axios.get(
            `http://localhost:8000/api/properties/property-details/${property.propertyId}`
          );
          return { ...property, details: response.data };
        } catch (error) {
          console.error("Error fetching property details:", error);
          return property;
        }
      })
    );
    return detailedProperties;
  };

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    setIsFiltering(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    const filtered = properties.filter(
      (property) =>
        property.title.toLowerCase().includes(query.toLowerCase()) ||
        property.address.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProperties(filtered);
    setIsFiltering(false);
  };

  const handleApplyFilters = async (
    filters: Record<string, string[]>,
    priceRange: string | null
  ) => {
    const detailedProperties = await fetchDetailedProperties();

    const filtered = detailedProperties.filter((property) => {
      const { details } = property;

      if (!details) return false;

      if (
        filters["BHK Type"] &&
        filters["BHK Type"].length > 0 &&
        !filters["BHK Type"].includes(details.property.propertyConfiguration)
      ) {
        return false;
      }

      if (priceRange) {
        const rent = details.propertyCommercials?.monthlyRent || 0;
        const [min, max] = priceRange.split("-").map((x) => x.trim().replace(/\D/g, ""));
        if (min && rent < parseInt(min, 10)) return false;
        if (max && rent > parseInt(max, 10)) return false;
      }

      if (
        filters["Furnishing Type"] &&
        filters["Furnishing Type"].length > 0 &&
        !filters["Furnishing Type"].includes(details.property.furnishingStatus)
      ) {
        return false;
      }

      if (
        filters["Property Type"] &&
        filters["Property Type"].length > 0 &&
        !filters["Property Type"].includes(details.property.propertyType)
      ) {
        return false;
      }

      if (
        filters["Availability Date"] &&
        filters["Availability Date"].length > 0 &&
        !filters["Availability Date"].some((date) => {
          const availableFrom = new Date(details.propertyAvailability.availableFrom);
          const today = new Date();
          const daysDifference = Math.ceil(
            (availableFrom.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
          );
          if (date === "Immediate" && daysDifference <= 0) return true;
          if (date === "Within 15 Days" && daysDifference <= 15) return true;
          if (date === "Within 30 Days" && daysDifference <= 30) return true;
          if (date === "After 30 Days" && daysDifference > 30) return true;
          return false;
        })
      ) {
        return false;
      }

      if (
        filters["Preferred Tenants"] &&
        filters["Preferred Tenants"].length > 0 &&
        !filters["Preferred Tenants"].some((tenant) => {
          const preferred = [
            details.propertyRestrictions.bachelorTenants === "Yes" && "Bachelor Male",
            details.propertyRestrictions.bachelorTenants === "Yes" && "Bachelor Female",
            details.propertyRestrictions.tenantWithPets === "Yes" && "Family",
          ];
          return preferred.includes(tenant);
        })
      ) {
        return false;
      }

      return true;
    });

    setFilteredProperties(filtered);
  };

  const handleClearFilters = () => {
    setFilteredProperties(properties);
  };

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
      right: "500px",
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

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="w-full">
          <div className="flex items-center justify-center mb-8">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-gray-200 border-t-red-500 rounded-full animate-spin"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <Loader2 className="w-8 h-8 text-red-500 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (isFiltering) {
      return (
        <div className="w-full space-y-6">
          <div className="flex justify-center">
            <div className="inline-flex items-center px-4 py-2 bg-red-50 text-red-500 rounded-full">
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              <span>Filtering properties...</span>
            </div>
          </div>
        </div>
      );
    }

    if (filteredProperties.length === 0) {
      return <p style={{ textAlign: "center" }}>No properties found.</p>;
    }

    return (
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
    );
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <Headerr />
      </div>

      <div>
        <SearchBar onSearch={handleSearch} />
      </div>

      <div style={styles.mainContent}>
        <div style={styles.filterSection}>
          <FilterComponent
            onApplyFilters={handleApplyFilters}
            onClearFilters={handleClearFilters}
          />
        </div>

        <PropertySection>{renderContent()}</PropertySection>
      </div>
    </div>
  );
};

export default Tenanthome;
