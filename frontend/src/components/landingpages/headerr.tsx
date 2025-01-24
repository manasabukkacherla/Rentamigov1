import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Headerr: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLinkClick = (link: string) => {
    switch (link) {
      case "Home":
        navigate("/Homepage");
        break;
      case "About":
        navigate("/Aboutus");
        break;
      case "Properties":
        navigate("/Tenanthome");
        break;
      case "For home owners":
        navigate("/owner-page");
        break;
      case "Privacy Policy":
        navigate("/Privacypolicy");
        break;
      case "Tenancy Policy":
        navigate("/Tenancypolicy");
        break;
      case "Contact Us":
        navigate("/Contactus");
        break;
      case "Terms and Conditions":
        navigate("/Termsandconditions");
        break;
      default:
        console.error(`Unknown link: ${link}`);
    }
    toggleDropdown();
  };

  return (
    <div>
      <header style={styles.header}>
        <div
          style={styles.logoContainer}
          onClick={() => navigate("/Homepage")}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && navigate("/Homepage")}
        >
          <img
            src="./images/rentamigologou.png"
            alt="Logo"
            style={styles.logoImg}
          />
          <span style={styles.logoText}>entamigo</span>
        </div>

        <button
          style={styles.menuBtn}
          onClick={toggleDropdown}
        >
          <i className="fas fa-bars" style={styles.icon}></i>
        </button>
      </header>

      <div
        style={{
          ...styles.dropdown,
          display: isDropdownOpen ? "flex" : "none",
        }}
      >
        <button style={styles.closeBtn} onClick={toggleDropdown}>
          ×
        </button>
        <div
          style={{
            ...styles.links,
            gridTemplateColumns:
              window.innerWidth <= 768 ? "1fr" : "1fr 1fr", // Dynamically adjust columns based on screen width
          }}
        >
          {[
            "Home",
            "About",
            "Properties",
            "For home owners",
            "Privacy Policy",
            "Tenancy Policy",
            "Contact Us",
            "Terms and Conditions",
          ].map((link, index) => (
            <a
              key={index}
              href="#"
              style={styles.link}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick(link);
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.color = "white";
                (e.target as HTMLElement).style.backgroundColor = "black";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.color = "black";
                (e.target as HTMLElement).style.backgroundColor = "transparent";
              }}
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles: any = {
  header: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "white",
    zIndex: 1000,
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
  },
  logoImg: {
    width: "50px",
    height: "50px",
    objectFit: "contain",
  },
  logoText: {
    fontSize: "25px",
    fontWeight: "bold",
    marginLeft: "-8px",
    color: "#000",
    fontFamily: "'Neuropol X', sans-serif",
    marginTop: "11px",
  },
  menuBtn: {
    backgroundColor: "transparent",
    color: "black",
    border: "none",
    padding: "10px",
    fontSize: "40px",
    cursor: "pointer",
    borderRadius: "5px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "color 0.3s ease",
  },
  icon: {
    fontSize: "20px",
  },
  dropdown: {
    position: "fixed",
    top: "3%",
    left: "3%",
    width: "96%",
    height: "97%",
    backgroundColor: "white", // White background remains
    zIndex: 1001, 
    boxSizing: "border-box",
    borderRadius: "15px",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage: `
    linear-gradient(rgba(255, 255, 255, 0.52), rgba(255, 255, 255, 0.8)),
    url('./images/rentamigologou.png')
  `, // Layer a semi-transparent white overlay with the image
    //backgroundImage: "url('./images/rentamigologou.png')", // Path to your logo
    backgroundSize: "40%", // Adjust size to make it large and centered
    backgroundPosition: "left bottom", // Center the logo
    backgroundRepeat: "no-repeat", // Prevent repeating the image
   
    opacity: 1.9, // Adjust opacity for a lighter look (matches the gray effect)
  },
  closeBtn: {
    position: "absolute",
    top: "20px",
    right: "20px",
    backgroundColor: "transparent",
    border: "none",
    fontSize: "50px",
    cursor: "pointer",
    color: "black",
  },
  links: {
    display: "grid",
    gap: "20px",
    justifyContent: "center",
    width: "auto",
  },
  link: {
    color: "black", // Default link color
    fontSize: "30px",
    fontWeight: "bold",
    textDecoration: "none",
    textTransform: "uppercase",
    transition: "all 0.3s ease",
    textAlign: "center",
    backgroundColor: "transparent", // Default background
  },
};

export default Headerr;
