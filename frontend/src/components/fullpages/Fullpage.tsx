import React, { useRef, useEffect, useState } from "react";
import HeaderWithSearchBar from "./Headerwithsearchbar";
import ImageGallery from "./ImageGallery";
import App from "./Perks";
import BuildingAmenities from "./Buildingaminities";
import Description from "./Description";
import MapComponent from "../MapComponent";
import TransportNearby from "./TransportNearby";
//import Footer from "../landingpages/Footer";
import Footer from "../landingpages/Footer";
import PropertyRegistrationForm from "./Owner_registrationForm";
import { useParams } from "react-router-dom";

interface FullpageProps {
  propertyId: string;
}
const NearbyComponent: React.FC = () => {
  const descriptionRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const [descriptionHeight, setDescriptionHeight] = useState<
    number | undefined
  >(undefined);

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

    // Set height initially and on resize
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
        <Description propertyId={""} />
      </div>
      <div style={mapStyle} ref={mapRef}>
        <MapComponent />
      </div>
    </div>
  );
};

const Fullpage: React.FC<FullpageProps> = () => {
  const { id } = useParams<{ id: string }>();
  if (!id) return <div>Property not found</div>;
  const bookingFormRef = useRef<HTMLDivElement>(null);

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
  };

  const transportNearbyStyle: React.CSSProperties = {
    marginTop: "20px",
    width: "100%",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "20px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  };

  const bookingFormStyle: React.CSSProperties = {
    position: "relative",
    marginTop: "50px",
  };

  return (
    <div style={homepageStyle}>
      <HeaderWithSearchBar />
      <ImageGallery propertyId={id} />
      <div style={layoutStyle} className="layout">
        <div style={leftColumnStyle} className="left-column">
          <App propertyId={id} />
          <BuildingAmenities propertyId={id} />
          <NearbyComponent propertyId={id} />
        </div>
        <div style={rightColumnStyle} className="right-column">
          <PropertyRegistrationForm  />
        </div>
      </div>
      <div style={transportNearbyStyle} className="transport-nearby">
        <TransportNearby />
      </div>
      <div>
       <Footer />
      </div>
      <style>
        {`
          @media (max-width: 1200px) {
            .layout {
              gap: 15px;
            }
          }

          @media (max-width: 992px) {
            .layout {
              flex-direction: column;
            }
            .left-column, .right-column {
              width: 100%;
            }
            .description-map-container {
              flex-direction: column;
              gap: 10px;
            }
          }

          @media (max-width: 768px) {
            .transport-nearby {
              width: 100%;
              margin-top: 15px;
            }
          }

          @media (max-width: 576px) {
            .layout {
              gap: 10px;
            }
            .description-map-container {
              gap: 5px;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Fullpage;
