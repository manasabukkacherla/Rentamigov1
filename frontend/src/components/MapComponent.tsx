import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import axios from "axios";

interface Location {
  latitude: string;
  longitude: string;
  locality: string;
  area?: string;
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
}

interface MapComponentProps {
  propertyId: string;
}

const MapComponent: React.FC<MapComponentProps> = ({ propertyId }) => {
  const [location, setLocation] = useState<Location | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const containerStyle = {
    width: "100%",
    height: "600px", // Increased height
  };

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await axios.get(
          `https://api.rentamigo.in/api/properties/${propertyId}/locations`
        );
        if (response.data && response.data.length > 0) {
          // Assuming the API returns an array of locations, pick the first one
          const locationData = response.data[0];
          setLocation(locationData);
        } else {
          console.error("No locations found for the given property.");
        }
      } catch (error) {
        console.error("Error fetching location data:", error);
      }
    };

    fetchLocation();
  }, [propertyId]);

  return (
    <div>
      <LoadScript googleMapsApiKey="AIzaSyAtamavZgGRRKvXmK8L5DGXCPqYuGj5_Qw">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={
            location
              ? {
                  lat: parseFloat(location.latitude),
                  lng: parseFloat(location.longitude),
                }
              : { lat: 0, lng: 0 } // Default center if no location is available
          }
          zoom={15}
        >
          {location && (
            <Marker
              position={{
                lat: parseFloat(location.latitude),
                lng: parseFloat(location.longitude),
              }}
              onClick={() => setIsOpen(!isOpen)}
              animation={google.maps.Animation.DROP}
            />
          )}
          {isOpen && location && (
            <InfoWindow
              position={{
                lat: parseFloat(location.latitude),
                lng: parseFloat(location.longitude),
              }}
              onCloseClick={() => setIsOpen(false)}
            >
              <div>
                <h3>{location.locality}</h3>
                <p>{location.addressLine1}</p>
                {location.addressLine2 && <p>{location.addressLine2}</p>}
                {location.addressLine3 && <p>{location.addressLine3}</p>}
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default MapComponent;