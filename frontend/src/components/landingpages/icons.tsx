import React from "react";

const Icons: React.FC = () => {
  const features = [
    {
      icon: "./images/dollaricon.jpg",
      alt: "Deposit Icon",
      title: "Just 1 Month Deposit",
      description: "Peace of mind for both landlords and tenants.",
    },
    {
      icon: "./images/lockicon.png",
      alt: "Lock Icon",
      title: "Minimum Lock-in Period",
      description: "Don't worry about uncertainties anymore.",
    },
    {
      icon: "./images/walleticon.jpeg",
      alt: "Wallet Icon",
      title: "No Brokerage or Hidden Fees",
      description: "It's all transparent, and no middlemen involved.",
    },
    {
      icon: "./images/truckicon.png",
      alt: "Truck Icon",
      title: "Quick and Instant Move-in",
      description: "It's all transparent, and no middlemen involved.",
    },
    {
      icon: "./images/truckicon.png",
      alt: "Truck Icon",
      title: "Quick and Instant Move-in",
      description: "It's all transparent, and no middlemen involved.",
    },
  ];

  return (
    <section style={styles.features}>
      <div style={styles.container}>
        <div className="features-flex" style={styles.featuresFlex}>
          {features.map((feature, index) => (
            <div key={index} style={styles.featureCard}>
              <div style={styles.iconContainer}>
                <img
                  src={feature.icon}
                  alt={feature.alt}
                  style={styles.iconImage}
                />
              </div>
              <h3 style={styles.title}>{feature.title}</h3>
              <p style={styles.description}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const styles: Record<string, React.CSSProperties> = {
  features: {
    padding: "4rem 1rem",
    backgroundColor: "white",
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
  },
  featuresFlex: {
    display: "flex",
    gap: "20px",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  featureCard: {
    flex: "1 1 18%", // Changed from 22% to 18%
    maxWidth: "18%", // Changed from 22% to 18%
    textAlign: "center",
    padding: "1rem",
    backgroundColor: "#fff",
  },
  iconContainer: {
    width: "80px",
    height: "80px",
    display: "flex", // Flexbox for centering
    justifyContent: "center", // Horizontally center
    alignItems: "center", // Vertically center
    margin: "0 auto 1rem", // Center the icon container and add bottom margin
    borderRadius: "50%", // Optional: Make it circular
    backgroundColor: "#f0f0f0", // Optional: Add a background color
  },
  iconImage: {
    width: "60%", // Scale the icon appropriately
    height: "60%",
  },
  title: {
    fontSize: "1.25rem",
    fontWeight: "bold",
    marginBottom: "0.5rem",
    color: "#1a1a1a",
  },
  description: {
    fontSize: "1rem",
    color: "#666",
  },
};

// Inject Responsive Styles with Media Query
const responsiveStyles = `
  @media (max-width: 768px) {
    .features-flex > div {
      flex: 1 1 100% !important;
      max-width: 100% !important;
    }
  }
`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = responsiveStyles;
document.head.appendChild(styleSheet);

export default Icons;
