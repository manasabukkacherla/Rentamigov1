import React, { useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

const MapComponent = () => {
  const [location] = useState({
    lat: 37.4239163, // Default to Google's coordinates
    lng: -122.0947209,
  });
  const [isOpen, setIsOpen] = useState(false);
  const [marker, setMarker] = useState<google.maps.Marker | null>(null);

  const containerStyle = {
    width: "100%",
    height: "400px",
  };

  // Function to create marker
  const createMarker = (map: google.maps.Map) => {
    if (marker) {
      marker.setMap(null); // Remove existing marker
    }

    const newMarker = new google.maps.Marker({
      position: location,
      map: map,
      animation: google.maps.Animation.DROP,
      title: "Click for location details",
    });

    newMarker.addListener("click", () => {
      setIsOpen(!isOpen);
    });

    setMarker(newMarker);
  };

  return (
    <div>
      <LoadScript googleMapsApiKey="AIzaSyAtamavZgGRRKvXmK8L5DGXCPqYuGj5_Qw">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={location}
          zoom={15}
          onLoad={(map) => createMarker(map)}
        >
          {isOpen && marker && (
            <InfoWindow
              position={location}
              onCloseClick={() => setIsOpen(false)}
            >
              <div>
                <h3>Location Details</h3>
                <p>Latitude: {location.lat}</p>
                <p>Longitude: {location.lng}</p>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default MapComponent;
