import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const HeaderWithSearchBar: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsDropdownOpen(false); // Close the dropdown after navigation
  };

  return (
    <div>
      <header style={styles.header}>
        <div style={styles.logoContainer}>
          <img
            src="/images/rentamigologo.png"
            alt="Logo"
            style={styles.logoImg}
          />
          <span style={styles.logoText}>entamigo</span>
        </div>
        <div style={styles.rightSection}>
          <input
            type="text"
            placeholder="Search Location"
            className="search-bar-input"
            style={styles.searchInput}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "black";
              e.currentTarget.style.backgroundColor = "#f9f9f9";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#ddd";
              e.currentTarget.style.backgroundColor = "#ffffff";
            }}
          />
          <button
            style={styles.menuBtn}
            onClick={toggleDropdown}
            onMouseEnter={() => (styles.menuBtn.color = "#ff6347")}
            onMouseLeave={() => (styles.menuBtn.color = "white")}
          >
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
        <div style={styles.links}>
          {[
            { name: "Home", path: "/" },
            { name: "About", path: "/Aboutus" },
            { name: "For home owners", path: "/homeowners" },
            { name: "Properties", path: "/Tenanthome" }, // Updated path
            { name: "Privacy Policy", path: "/privacy-policy" },
            { name: "Tenancy Policy", path: "/tenancy-policy" },
            { name: "Contact Us", path: "/contact" },
          ].map((link, index) => (
            <button
              key={index}
              onClick={() => handleNavigation(link.path)}
              style={styles.link}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.color = "black";
                (e.target as HTMLElement).style.backgroundColor = "white";
                (e.target as HTMLElement).style.padding = "10px 20px";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.color = "white";
                (e.target as HTMLElement).style.backgroundColor = "transparent";
                (e.target as HTMLElement).style.padding = "0";
              }}
            >
              {link.name}
            </button>
          ))}
        </div>
      </div>
      <style>
        {`
          .search-bar-input {
            width: 200px;
            padding: 10px 15px;
            font-size: 14px;
            border: 2px solid #ddd;
            border-radius: 20px;
            outline: none;
            transition: all 0.3s ease;
            background-color: #ffffff;
            color: #333;
          }

          .search-bar-input:hover {
            border-color: black;
            background-color: #f9f9f9;
          }
        `}
      </style>
    </div>
  );
};

const styles = {
  header: {
    position: "fixed" as "fixed",
    top: 0,
    left: 0,
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "white",
    color: "white",
    zIndex: 1000,
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
  },
  logoImg: {
    width: "70px",
    height: "70px",
    objectFit: "contain" as "contain",
  },
  logoText: {
    fontSize: "40px",
    fontWeight: "bold" as "bold",
    marginLeft: "3px",
    color: "#000", // Black text
    fontFamily: "'Neuropol X', sans-serif", // Font changed to Neuropol X
    textTransform: "none", // Ensures small letters
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
    transition: "color 0.3s ease", // Add transition for smooth hover effect
  },
  icon: {
    marginRight: "10px",
  },
  dropdown: {
    position: "fixed" as "fixed",
    top: "10%",
    left: "10%",
    width: "80%",
    height: "80%",
    backgroundColor: "black",
    zIndex: 999,
    boxSizing: "border-box" as "border-box",
    borderRadius: "15px",
    overflow: "hidden",
    flexDirection: "column" as "column",
    alignItems: "center",
    justifyContent: "center",
  },
  closeBtn: {
    position: "absolute" as "absolute",
    top: "20px",
    right: "20px",
    backgroundColor: "transparent",
    border: "none",
    fontSize: "30px",
    cursor: "pointer",
    color: "white",
  },
  links: {
    display: "flex",
    flexDirection: "column" as "column",
    alignItems: "center",
    gap: "20px",
  },
  link: {
    color: "white",
    fontSize: "30px",
    fontWeight: "bold" as "bold",
    textDecoration: "none",
    textTransform: "uppercase" as "uppercase",
    transition: "all 0.3s ease", // Smooth hover effect
  },
};

export default HeaderWithSearchBar;
