import React from "react";
import { theme } from "../../theme";

// Define the data interface
interface LocationData {
  city: string;
  projectName: string;
  latitude: number;
  longitude: number;
}

// Define props interface
interface LocationDetailsProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  data: LocationData;
}

const LocationDetails: React.FC<LocationDetailsProps> = ({
  onChange,
  data,
}) => (
  <div style={styles.section}>
    <h2 style={styles.heading}>Location Details</h2>
    <input
      type="text"
      name="city"
      placeholder="City"
      onChange={onChange}
      value={data.city}
      style={styles.input}
    />
    <input
      type="text"
      name="projectName"
      placeholder="Project Name"
      onChange={onChange}
      value={data.projectName}
      style={styles.input}
    />
    <input
      type="number"
      name="latitude"
      placeholder="Latitude"
      onChange={onChange}
      value={data.latitude}
      style={styles.input}
    />
    <input
      type="number"
      name="longitude"
      placeholder="Longitude"
      onChange={onChange}
      value={data.longitude}
      style={styles.input}
    />
  </div>
);

const styles = {
  section: {
    marginBottom: theme.spacing.large,
  },
  heading: {
    fontSize: theme.fontSizes.large,
    marginBottom: theme.spacing.medium,
  },
  input: {
    width: "100%",
    padding: theme.spacing.small,
    marginBottom: theme.spacing.small,
    fontSize: theme.fontSizes.medium,
    border: `1px solid ${theme.colors.border}`,
  },
};

export default LocationDetails;
