"use client";

import React from "react";
import { useNavigate } from "react-router-dom";

const linkbutton: React.FC = () => {
  const navigate = useNavigate();
  const handleServiceNavigation = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigate("/owner-page", { state: { scrollToServices: true } });
  };
  const styles = {
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexWrap: "wrap" as const,
      width: "100%",
      margin: "0px 40px",
    },
    content: {
      flex: 1,
      paddingRight: "20px",
    },
    contentHeading: {
      fontSize: "2rem",
      fontWeight: "bold",
      marginBottom: "20px",
      color: "#2c3e50",
    },
    contentParagraph: {
      fontSize: "1rem",
      color: "#555",
      marginBottom: "30px",
    },
    ctaButton: {
      display: "inline-block",
      padding: "10px 20px",
      fontSize: "1rem",
      fontWeight: "bold",
      color: "white",
      backgroundColor: "black",
      border: "none",
      borderRadius: "5px",
      textDecoration: "none",
      cursor: "pointer",
      transition: "background-color 0.3s",
    },
    ctaButtonHover: {
      backgroundColor: "#0056b3",
    },
    imageContainer: {
      flex: 1,
      position: "relative" as const,
      textAlign: "center" as const,
    },
    image: {
      maxWidth: "80%",
      borderRadius: "15px",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    },
    decorativeDots: {
      position: "absolute" as const,
      top: "-10px",
      right: "-30px",
      background: "radial-gradient(circle, #e0e0e0 20%, transparent 10%)",
      backgroundSize: "10px 10px",
      width: "300px",
      height: "300px",
      borderRadius: "50%",
      zIndex: -1 as const,
    },
    mediaQuery: "@media (max-width: 768px)",
  };

  return (
    <section style={styles.container}>
      {/* Left Content */}
      <div style={styles.content}>
        <h1 style={styles.contentHeading}>Get End to End Legal Assistance</h1>
        <p style={styles.contentParagraph}>
          Purchasing a property is the single biggest and expensive affair a
          person makes in their lifetime. A real estate attorney can make the
          entire purchasing process easier and safe.
        </p>
        <a href="#" onClick={handleServiceNavigation} style={styles.ctaButton}>
          Explore More
        </a>
      </div>

      {/* Right Image */}
      <div style={styles.imageContainer}>
        <div style={styles.decorativeDots}></div>
        <img
          src="./images/imageE.jpg"
          alt="Legal Assistance"
          style={styles.image}
        />
      </div>
    </section>
  );
};

export default linkbutton;
