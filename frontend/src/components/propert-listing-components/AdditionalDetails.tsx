import React from "react";
import { theme } from "../../theme";

// Define interfaces for the component props
interface PropertyData {
  propertyName: string;
  flatNo: string;
  address: {
    line1: string;
    line2: string;
    line3: string;
  };
  availability: {
    date: string;
    status: "Available" | "Unavailable";
  };
}

interface AdditionalDetailsProps {
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  data: PropertyData;
}

const AdditionalDetails: React.FC<AdditionalDetailsProps> = ({
  onChange,
  data,
}) => (
  <div style={styles.section}>
    <h2 style={styles.heading}>Additional Details</h2>
    <input
      type="text"
      name="propertyName"
      placeholder="Property Name"
      onChange={onChange}
      value={data.propertyName}
      style={styles.input}
    />
    <input
      type="text"
      name="flatNo"
      placeholder="Flat Number"
      onChange={onChange}
      value={data.flatNo}
      style={styles.input}
    />
    <input
      type="text"
      name="address.line1"
      placeholder="Address Line 1"
      onChange={onChange}
      value={data.address?.line1}
      style={styles.input}
    />
    <input
      type="text"
      name="address.line2"
      placeholder="Address Line 2"
      onChange={onChange}
      value={data.address?.line2}
      style={styles.input}
    />
    <input
      type="text"
      name="address.line3"
      placeholder="Address Line 3"
      onChange={onChange}
      value={data.address?.line3}
      style={styles.input}
    />
    <input
      type="date"
      name="availability.date"
      onChange={onChange}
      value={data.availability?.date}
      style={styles.input}
    />
    <select
      name="availability.status"
      onChange={onChange}
      value={data.availability?.status}
      style={styles.input}
    >
      <option value="">Select Availability Status</option>
      <option value="Available">Available</option>
      <option value="Unavailable">Unavailable</option>
    </select>
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

export default AdditionalDetails;
