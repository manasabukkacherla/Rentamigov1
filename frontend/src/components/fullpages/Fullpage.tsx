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
  const fixedHeight = 200; // ✅ Set a fixed height for both Description & Map

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
    minWidth: "400px",
    maxWidth: "600px", // ✅ Prevent excessive growth
    height: `${fixedHeight}px`, // ✅ Fixed height
    overflow: "auto", // ✅ Enable scrolling if content overflows
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "20px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  };

  const mapStyle: React.CSSProperties = {
    flex: 1,
    minWidth: "400px",
    maxWidth: "600px", // ✅ Prevent excessive growth
    height: `${fixedHeight}px`, // ✅ Fixed height
    border: "1px solid #ddd",
    borderRadius: "8px",
    overflow: "hidden", // ✅ Ensures map stays within its box
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  };

  return (
    <div style={containerStyle} className="description-map-container">
      <div style={descriptionStyle}>
        <Description propertyId={propertyId} />
      </div>
      <div style={mapStyle}>
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
    marginTop: "30px",
    flexWrap: "wrap",
  };

  const leftColumnStyle: React.CSSProperties = {
    flex: 2,
    display: "flex",
    flexDirection: "column",
    gap: "0px",
    minWidth: "300px",
    marginTop: "-62px",
    marginLeft: "20px",
  };

  const rightColumnStyle: React.CSSProperties = {
    flex: 1,
    maxWidth: "400px",
    minWidth: "300px",
    position: "sticky",
    top: "20px",
    marginTop: "-100px",
    marginLeft: "72px",
  };

  const transportNearbyStyle: React.CSSProperties = {
    marginTop: "20px",
    width: "100%",
    border: "1px solid #ddd",
    borderRadius: "8px",
    
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  };
  const rentDetailsStyle: React.CSSProperties = {
    marginLeft: "60px",// Add margin left only to RentDetails
   
  };

  return (
    <div style={homepageStyle}>
      <HeaderWithSearchBar />

      <ImageGallery propertyId={propertyId} />

      <div style={layoutStyle} className="layout">
        <div style={leftColumnStyle} className="left-column">
        <div style={rentDetailsStyle}>
          <RentDetails
            propertyId={propertyId}
            monthlyRent={null}
            maintenanceAmount={null}
            securityDeposit={null}
          />
        </div>
          <Details />
          <App propertyId={propertyId} />
          <BuildingAmenities propertyId={propertyId} />
          <NearbyComponent propertyId={propertyId} />
        </div>
        <div style={rightColumnStyle} className="right-column">
          <PropertyRegistrationForm propertyId={propertyId} />
        </div>
      </div>

      <div style={transportNearbyStyle} className="transport-nearby">
        {/*<TransportNearby propertyId={propertyId} />*/}
      </div>

      <Footer />
    </div>
  );
};

export default Fullpage;
