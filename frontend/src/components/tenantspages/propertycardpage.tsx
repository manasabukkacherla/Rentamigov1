import React from "react";
import { useNavigate } from "react-router-dom";

interface PropertyCardProps {
  image: string;
  title: string;
  address: string;
  rent: string;
  link: string;
  propertyId: string;
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  image,
  title,
  address,
  rent,
  link,
  propertyId,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/Fullpage/${propertyId}`);
  };

  return (
    <div onClick={handleClick} style={styles.cardLink}>
      <div style={styles.card} className="md:max-w-[450px]">
        {/* Image Section */}
        <img src={image} alt={title} style={styles.image} />

        {/* Title and Address */}
        <div style={styles.content}>
          <h3 style={styles.title}>{title}</h3>
          <p style={styles.address}>{address}</p>
        </div>

        {/* Footer */}
        <div style={styles.footer}>
          <div style={styles.rent}>
            <p>Rent Starting From</p>
            <p style={styles.rentPrice}>{rent}/month</p>
          </div>
          <button
            style={styles.callbackButton}
            onClick={(e) => {
              e.stopPropagation(); // Prevent card navigation when clicking the button
            }}
          >
            Enquiry
          </button>
        </div>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  cardLink: {
    textDecoration: "none",
    color: "inherit",
    cursor: "pointer",
  },
  card: {
    width: "100%",
    maxWidth: "380px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    margin: "20px auto",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: "230px",
    objectFit: "cover",
  },
  content: {
    padding: "15px",
  },
  title: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "5px",
  },
  address: {
    fontSize: "14px",
    color: "#666",
    marginBottom: "15px",
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 15px",
    borderTop: "1px solid #ddd",
    backgroundColor: "#f9f9f9",
  },
  rent: {
    fontSize: "14px",
  },
  rentPrice: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#333",
  },
  callbackButton: {
    padding: "10px 20px",
    fontSize: "14px",
    color: "#050404",
    backgroundColor: "#28a745",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    textAlign: "center",
  },
};

export default PropertyCard;
