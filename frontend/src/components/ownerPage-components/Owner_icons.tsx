import React from "react";

const Icons: React.FC = () => {
  const features = [
    {
      icon: "./images/owner_page_icons/assurance.png",
      alt: "Rental Assurance",
      title: "Rental Assurance",
      description: "Tenant pays or not, you get the rent on time, every time.",
    },
    {
      icon: "./images/owner_page_icons/guarantee.png",
      alt: "Rental Guarantee",
      title: "Rental Guarantee",
      description: "Your house fetches you rent, even if it's vacant.",
    },
    {
      icon: "./images/owner_page_icons/settings.png",
      alt: "Pain-Free Maintenance",
      title: "Pain-Free Maintenance",
      description: "Painting, Cleaning or any other Services we are there.",
    },
    {
      icon: "./images/owner_page_icons/file.png",
      alt: "Documentation",
      title: "Documentation",
      description: "Paperwork across various departments required, we are there.",
    },
    {
      icon: "./images/owner_page_icons/management.png",
      alt: "Tenant Management",
      title: "Tenant Management",
      description:
        "Acting as a bridge between owner & tenant to ensure a smooth experience.",
    },
    {
      icon: "./images/owner_page_icons/medal.png",
      alt: "Win-Win Scenario",
      title: "Win-Win Scenario",
      description: "Enjoy the Rent and leave the rest to us!!",
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
    maxWidth: "1400px",
    margin: "0 auto",
  },
  featuresFlex: {
    display: "flex",
    gap: "20px",
    justifyContent: "space-between", // Ensures equal spacing between items
    flexWrap: "nowrap", // Prevents wrapping on larger screens
  },
  featureCard: {
    flex: "1 1 auto", // Flexible width for each card
    maxWidth: "15%", // Ensures all cards fit in one row
    textAlign: "center",
    padding: "1rem",
    backgroundColor: "#fff",
  },
  iconContainer: {
    width: "85px",
    height: "80px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "0 auto 1rem",
    borderRadius: "50%",
    backgroundColor: "#f0f0f0",
  },
  iconImage: {
    width: "60%",
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
    .features-flex {
      flex-wrap: wrap !important; /* Allow wrapping on small screens */
    }
    .features-flex > div {
      flex: 1 1 100% !important; /* Stack items one by one */
      max-width: 100% !important; /* Full width on small screens */
    }
  }
`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = responsiveStyles;
document.head.appendChild(styleSheet);

export default Icons;
