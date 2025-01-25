import React, { useRef, useEffect, useState } from "react";
import HeaderWithSearchBar from "./Headerwithsearchbar";
import ImageGallery from "./ImageGallery";
import App from "./Perks";
import BuildingAmenities from "./Buildingaminities";
import Description from "./Description";
import MapComponent from "../MapComponent";
import TransportNearby from "./TransportNearby";
import Footer from "../landingpages/Footer";
import PropertyRegistrationForm from "./Owner_registrationForm";
import RentDetails from "./Rent_monthly";
import { useParams } from "react-router-dom";
import Details from "./PropertyDetails";

const NearbyComponent: React.FC<{ propertyId: string }> = ({ propertyId }) => {
  const descriptionRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const [descriptionHeight, setDescriptionHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    const updateHeight = () => {
      if (descriptionRef.current) {
        const height = descriptionRef.current.offsetHeight;
        setDescriptionHeight(height);
        if (mapRef.current) {
          mapRef.current.style.height = `${height}px`;
        }
      }
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => {
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  const containerStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "stretch",
    gap: "20px",
    width: "100%",
    flexWrap: "wrap",
  };

  const descriptionStyle: React.CSSProperties = {
    flex: 1,
    minWidth: "300px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "20px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  };

  const mapStyle: React.CSSProperties = {
    flex: 1,
    minWidth: "300px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  };

  return (
    <div style={containerStyle} className="description-map-container">
      <div style={descriptionStyle} ref={descriptionRef}>
        <Description propertyId={propertyId} />
      </div>
      <div style={mapStyle} ref={mapRef}>
        <MapComponent propertyId={propertyId} />
      </div>
    </div>
  );
};

const Fullpage: React.FC = () => {
  const { id: propertyId } = useParams<{ id: string }>();
  if (!propertyId) return <div>Property not found</div>;

  const homepageStyle: React.CSSProperties = {
    marginTop: "50px",
    padding: "50px",
    position: "relative",
  };

  const layoutStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    gap: "20px",
    alignItems: "flex-start",
    marginTop: "50px",
    flexWrap: "wrap",
  };

  const leftColumnStyle: React.CSSProperties = {
    flex: 2,
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    minWidth: "300px",
  };

  const rightColumnStyle: React.CSSProperties = {
    flex: 1,
    maxWidth: "400px",
    minWidth: "300px",
    position: "sticky",
    top: "20px",
    marginTop: "-100px",
  };

  const transportNearbyStyle: React.CSSProperties = {
    marginTop: "20px",
    width: "100%",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "20px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  };

  return (
    <div style={homepageStyle}>
      <HeaderWithSearchBar />

      <ImageGallery propertyId={propertyId} />

      <div style={layoutStyle} className="layout">
        <div style={leftColumnStyle} className="left-column">
          <RentDetails
            propertyId={propertyId}
            monthlyRent={null}
            maintenanceAmount={null}
            securityDeposit={null}
          />
          <Details  />
          <App propertyId={propertyId} />
          <BuildingAmenities propertyId={propertyId} />
          <NearbyComponent propertyId={propertyId} />
        </div>
        <div style={rightColumnStyle} className="right-column">
          <PropertyRegistrationForm propertyId={propertyId} />
        </div>
      </div>

      <div style={transportNearbyStyle} className="transport-nearby">
        <TransportNearby propertyId={propertyId} />
      </div>

      <Footer />
    </div>
  );
};

export default Fullpage;
