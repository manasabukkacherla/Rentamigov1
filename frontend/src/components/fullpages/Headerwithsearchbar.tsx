import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const HeaderWithSearchBar: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleSearchBar = () => {
    setIsSearchBarVisible(!isSearchBarVisible);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsDropdownOpen(false); // Close the dropdown after navigation
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
            src="/images/rentamigologou.png"
            alt="Logo"
            style={styles.logoImg}
          />
          <span style={styles.logoText}>entamigo</span>
        </div>

        <div style={styles.rightSection}>
          {isSearchBarVisible && (
            <input
              type="text"
              placeholder="Search Location"
              style={styles.searchInput}
            />
          )}
          <button style={styles.menuBtn} onClick={toggleSearchBar}>
            <i className="fas fa-search" style={styles.icon}></i>
          </button>
          <button style={styles.menuBtn} onClick={toggleDropdown}>
            <i className="fas fa-bars" style={styles.icon}></i>
          </button>
        </div>
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
              window.innerWidth <= 768 ? "1fr" : "1fr 1fr", // Adjust columns based on screen size
          }}
        >
          {[
  { name: "Home", path: "/" },
  { name: "About", path: "/Aboutus" },
  { name: "For home owners", path: "/owner-page" },
  { name: "Properties", path: "/Tenanthome" },
  { name: "Privacy Policy", path: "/privacy-policy" },
  { name: "Tenancy Policy", path: "/tenancy-policy" },
  { name: "Contact Us", path: "/contact" },
  { name: "Terms and Conditions", path: "/terms-and-conditions" },
].map((link, index) => (
  <button
    key={index}
    onClick={() => handleNavigation(link.path)}
    style={styles.link}
    onMouseEnter={(e) => {
      const target = e.target as HTMLElement;
      target.style.color = styles.linkHover.color;
      target.style.backgroundColor = styles.linkHover.backgroundColor;
    }}
    onMouseLeave={(e) => {
      const target = e.target as HTMLElement;
      target.style.color = styles.link.color;
      target.style.backgroundColor = styles.link.backgroundColor;
    }}
  >
    {link.name}
  </button>
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
  rightSection: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  searchInput: {
    width: "200px",
    padding: "10px 15px",
    fontSize: "14px",
    border: "2px solid #ddd",
    borderRadius: "20px",
    outline: "none",
    transition: "all 0.3s ease",
    backgroundColor: "#ffffff",
    color: "#333",
  },
  menuBtn: {
    backgroundColor: "white",
    color: "black",
    border: "none",
    padding: "10px",
    fontSize: "20px",
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
    top: "10%",
    left: "10%",
    width: "80%",
    height: "80%",
    backgroundColor: "white",
    zIndex: 999,
    boxSizing: "border-box",
    borderRadius: "15px",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  closeBtn: {
    position: "absolute",
    top: "20px",
    right: "20px",
    backgroundColor: "transparent",
    border: "none",
    fontSize: "30px",
    cursor: "pointer",
    color: "black",
  },
  links: {
    display: "grid",
    gap: "20px",
    justifyContent: "center",
    width: "100%",
    textAlign: "center",
    gridTemplateColumns: "1fr 1fr", // Default: 2 columns
  },
  link: {
    color: "black", // Default link color
    fontSize: "20px",
    fontWeight: "bold",
    textDecoration: "none",
    textTransform: "uppercase",
    backgroundColor: "white", // Default background
    padding: "10px 20px",
    borderRadius: "5px",
    transition: "all 0.3s ease", // Smooth hover effect
    cursor: "pointer",
  },
  linkHover: {
    color: "white", // Hover link color
    backgroundColor: "black", // Hover background
  },
  "@media (max-width: 768px)": {
    links: {
      gridTemplateColumns: "1fr", // Single column on small screens
      gap: "15px", // Adjust gap for smaller screens
    },
    link: {
      padding: "12px 18px", // Adjust padding for smaller screens
    },
  },
};



export default HeaderWithSearchBar;
