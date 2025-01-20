import React from "react";
import { theme } from "../../theme";

// Define the data interface
interface RentalData {
  monthlyRent: number | null;
  securityDeposit: number | null;
  maintenanceCharges: number | null;
  maintenanceFrequency: "Monthly" | "Quarterly" | "Yearly" | "";
  isRentNegotiable: boolean;
}

// Define props interface
interface RentalDetailsProps {
  onChange: (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
      | {
          target: { name: string; value: boolean | number | string };
        }
  ) => void;
  data: RentalData;
}

const RentalDetails: React.FC<RentalDetailsProps> = ({ onChange, data }) => (
  <div style={styles.section}>
    <h2 style={styles.heading}>Rental Details</h2>
    <input
      type="number"
      name="monthlyRent"
      placeholder="Monthly Rent"
      onChange={onChange}
      value={data.monthlyRent || ""}
      style={styles.input}
    />
    <input
      type="number"
      name="securityDeposit"
      placeholder="Security Deposit"
      onChange={onChange}
      value={data.securityDeposit || ""}
      style={styles.input}
    />
    <input
      type="number"
      name="maintenanceCharges"
      placeholder="Maintenance Charges"
      onChange={onChange}
      value={data.maintenanceCharges || ""}
      style={styles.input}
    />
    <select
      name="maintenanceFrequency"
      onChange={onChange}
      value={data.maintenanceFrequency}
      style={styles.input}
    >
      <option value="">Select Maintenance Frequency</option>
      <option value="Monthly">Monthly</option>
      <option value="Quarterly">Quarterly</option>
      <option value="Yearly">Yearly</option>
    </select>
    <label style={styles.checkbox}>
      <input
        type="checkbox"
        name="isRentNegotiable"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChange({
            target: { name: "isRentNegotiable", value: e.target.checked },
          })
        }
        checked={data.isRentNegotiable}
      />
      Is Rent Negotiable?
    </label>
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
  checkbox: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing.small,
    marginTop: theme.spacing.small,
  },
};

export default RentalDetails;
