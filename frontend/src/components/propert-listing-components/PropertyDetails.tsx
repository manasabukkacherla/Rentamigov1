import React from "react";
import { theme } from "../../theme";

// Define the data interface
interface PropertyData {
  listingType: "Sale" | "Rent/Lease" | "PG/Hostel" | "";
  propertyType: string;
  societySize: "<50" | "50-100" | ">100" | "";
}

// Define props interface
interface PropertyDetailsProps {
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  data: PropertyData;
}

const PropertyDetails: React.FC<PropertyDetailsProps> = ({
  onChange,
  data,
}) => (
  <div style={styles.section}>
    <h2 style={styles.heading}>Property Details</h2>
    <select
      name="listingType"
      onChange={onChange}
      value={data.listingType}
      style={styles.input}
    >
      <option value="">Select Listing Type</option>
      <option value="Sale">Sale</option>
      <option value="Rent/Lease">Rent/Lease</option>
      <option value="PG/Hostel">PG/Hostel</option>
    </select>
    <input
      type="text"
      name="propertyType"
      placeholder="Property Type"
      onChange={onChange}
      value={data.propertyType}
      style={styles.input}
    />
    <select
      name="societySize"
      onChange={onChange}
      value={data.societySize}
      style={styles.input}
    >
      <option value="">Select Society Size</option>
      <option value="<50">&lt;50</option>
      <option value="50-100">50-100</option>
      <option value=">100">&gt;100</option>
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

export default PropertyDetails;
