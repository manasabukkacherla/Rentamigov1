import React from "react";
import { theme } from "../../theme";

// Define the data interface
interface PersonalData {
  ownerType: "Owner" | "Agent" | "Builder" | "";
  name: string;
  whatsappNumber: string;
  email: string;
}

// Define props interface
interface PersonalDetailsProps {
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  data: PersonalData;
}

const PersonalDetails: React.FC<PersonalDetailsProps> = ({
  onChange,
  data,
}) => (
  <div style={styles.section}>
    <h2 style={styles.heading}>Personal Details</h2>
    <select
      name="ownerType"
      onChange={onChange}
      value={data.ownerType}
      style={styles.input}
    >
      <option value="">Select Owner Type</option>
      <option value="Owner">Owner</option>
      <option value="Agent">Agent</option>
      <option value="Builder">Builder</option>
    </select>
    <input
      type="text"
      name="name"
      placeholder="Name"
      onChange={onChange}
      value={data.name}
      style={styles.input}
    />
    <input
      type="tel"
      name="whatsappNumber"
      placeholder="WhatsApp Number"
      onChange={onChange}
      value={data.whatsappNumber}
      style={styles.input}
    />
    <input
      type="email"
      name="email"
      placeholder="Email"
      onChange={onChange}
      value={data.email}
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

export default PersonalDetails;
