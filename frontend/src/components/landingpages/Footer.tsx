import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import rentamigologo from '/images/rentamigologo.png';

const Footer: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("api/forms/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });

      if (response.ok) {
        setMessage("Subscription successful! Check your email for confirmation.");
        setName("");
        setEmail("");
      } else {
        const errorData = await response.json();
        setMessage(errorData.error || "Failed to subscribe");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
      console.error(error);
    }
  };

  const styles = {
    footer: {
      backgroundColor: "black",
      color: "white",
      padding: "40px 20px",
      position: "relative" as "relative",
      overflow: "hidden",
    },
    shimmer: {
      content: "" as "" | undefined,
      position: "absolute" as "absolute",
      top: 0,
      left: "-100%",
      width: "200%",
      height: "100%",
      background: "linear-gradient(90deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0.1) 100%)",
      animation: "shimmer 5s infinite",
      pointerEvents: "none" as "none",
    },
    shimmerKeyframes: `
      @keyframes shimmer {
        0% {
          transform: translateX(-100%);
        }
        100% {
          transform: translateX(100%);
        }
      }
    `,
    socialIcons: {
      margin: "0 10px",
      fontSize: "18px",
      color: "white",
      transition: "transform 0.3s, color 0.3s",
    },
    socialIconsHover: {
      transform: "scale(1.2)",
      color: "#f1f1f1",
    },
    phoneNumberContainer: {
      display: "flex",
      justifyContent: "space-evenly",
      alignItems: "center",
      marginTop: "10px",
      fontSize: "14px",
      gap: "15px", // Adjust spacing between numbers
      marginRight: "138px",
      flexWrap: "wrap" as "wrap", // Enable wrapping for smaller screens
    },
    phoneLink: {
      color: "white",
      textDecoration: "none",
      fontWeight: "bold" as "bold",
    },
    phoneLinkHover: {
      color: "#f1f1f1",
      textDecoration: "underline",
    },
    phoneIcon: {
      marginRight: "8px",
      fontSize: "16px",
    },
    phoneNumberContainerMobile: {
      flexDirection: "column" as "column", // Stack numbers vertically
      alignItems: "flex-start", // Align items to the left for a better mobile layout
      gap: "10px",
    },
    formSection: {
      backgroundColor: "#222",
      padding: "15px",
      borderRadius: "8px",
      display: "flex",
      flexDirection: "column" as "column",
      alignItems: "center",
      justifyContent: "space-between",
      position: "relative" as "relative",
      width: "100%",
      maxWidth: "600px",
      height: "250px",
      margin: "0 auto",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
      transition: "box-shadow 0.3s",
    },
    formInput: {
      backgroundColor: "#333",
      color: "white",
      border: "1px solid #555",
      padding: "10px",
      margin: "10px 0",
      borderRadius: "5px",
      width: "95%",
      marginLeft: "auto",
      marginRight: "auto",
      transition: "background-color 0.3s, border-color 0.3s",
    },
    formInputHover: {
      backgroundColor: "#444",
      borderColor: "#888",
    },
    formInputFocus: {
      backgroundColor: "#444",
      borderColor: "white",
      outline: "none",
    },
    formButton: {
      backgroundColor: "white",
      color: "black",
      border: "1px solid white",
      padding: "10px 20px",
      borderRadius: "5px",
      cursor: "pointer",
      fontWeight: "bold" as "bold",
      transition: "background-color 0.3s, color 0.3s, border-color 0.3s",
      alignSelf: "center",
    },
    formButtonHover: {
      backgroundColor: "black",
      color: "white",
      border: "1px solid #f1f1f1",
    },
    link: {
      color: "white",
      textDecoration: "none",
    },
    linkHover: {
      color: "#f1f1f1",
      textDecoration: "underline",
    },
  };

  return (
    <footer style={styles.footer}>
      <div style={styles.shimmer}></div>
      <div className="container">
        <div className="row">
          {/* Section 1: Company Logo and Address */}
          <div className="col-md-4 mb-4 mb-md-0">
            <img
              src={rentamigologo}
              alt="Company Logo"
              className="mb-3"
              style={{ width: "100px" }}
            />
            <p>
              170, Bentley's GuHa, 27th Main Rd, 3rd Cross Rd, Jay Bheema Nagar, 1st Stage, BTM 1st Stage, Bengaluru, <br />
              Karnataka, 560068
            </p>
            <div className="phone-number-container" style={styles.phoneNumberContainer}>
              <a
                href="tel:+918041554935"
                style={styles.phoneLink}
                onMouseOver={(e) => Object.assign(e.currentTarget.style, styles.phoneLinkHover)}
                onMouseOut={(e) => Object.assign(e.currentTarget.style, styles.phoneLink)}
              >
                <i className="fas fa-phone-alt" style={styles.phoneIcon}></i> 080-41554935
              </a>
              <a
                href="tel:+919886090088"
                style={styles.phoneLink}
                onMouseOver={(e) => Object.assign(e.currentTarget.style, styles.phoneLinkHover)}
                onMouseOut={(e) => Object.assign(e.currentTarget.style, styles.phoneLink)}
              >
                <i className="fas fa-mobile-alt" style={styles.phoneIcon}></i> 9886090088
              </a>
            </div>

            <div>
              <a
                href="https://www.facebook.com/profile.php?id=61572274988795"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                style={styles.socialIcons}
                onMouseOver={(e) => Object.assign(e.currentTarget.style, styles.socialIconsHover)}
                onMouseOut={(e) => Object.assign(e.currentTarget.style, styles.socialIcons)}
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href="https://x.com/Rentamigo2020"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                style={styles.socialIcons}
                onMouseOver={(e) => Object.assign(e.currentTarget.style, styles.socialIconsHover)}
                onMouseOut={(e) => Object.assign(e.currentTarget.style, styles.socialIcons)}
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                href="https://www.instagram.com/rentamigo/?igsh=MWlvcDdhZjZzejAwbQ%3D%3D#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                style={styles.socialIcons}
                onMouseOver={(e) => Object.assign(e.currentTarget.style, styles.socialIconsHover)}
                onMouseOut={(e) => Object.assign(e.currentTarget.style, styles.socialIcons)}
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="https://www.linkedin.com/in/rentamigo-property-management-services-83a106349/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                style={styles.socialIcons}
                onMouseOver={(e) => Object.assign(e.currentTarget.style, styles.socialIconsHover)}
                onMouseOut={(e) => Object.assign(e.currentTarget.style, styles.socialIcons)}
              >
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
          </div>

          {/* Section 2: Links */}
          <div className="col-md-4 mb-4 mb-md-0">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <a
                  href="/Contactus"
                  style={styles.link}
                  onMouseOver={(e) => Object.assign(e.currentTarget.style, styles.linkHover)}
                  onMouseOut={(e) => Object.assign(e.currentTarget.style, styles.link)}
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="/Aboutus"
                  style={styles.link}
                  onMouseOver={(e) => Object.assign(e.currentTarget.style, styles.linkHover)}
                  onMouseOut={(e) => Object.assign(e.currentTarget.style, styles.link)}
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="/owner-page"
                  style={styles.link}
                  onMouseOver={(e) => Object.assign(e.currentTarget.style, styles.linkHover)}
                  onMouseOut={(e) => Object.assign(e.currentTarget.style, styles.link)}
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#"
                  style={styles.link}
                  onMouseOver={(e) => Object.assign(e.currentTarget.style, styles.linkHover)}
                  onMouseOut={(e) => Object.assign(e.currentTarget.style, styles.link)}
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  style={styles.link}
                  onMouseOver={(e) => Object.assign(e.currentTarget.style, styles.linkHover)}
                  onMouseOut={(e) => Object.assign(e.currentTarget.style, styles.link)}
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Section 3: Subscription Form */}
          <div className="col-md-4">
            <div style={styles.formSection}>
              <h2>Subscribe With Us</h2>
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", height: "100%" }}>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={styles.formInput}
                  placeholder="Name"
                  required
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={styles.formInput}
                  placeholder="Email"
                  required
                />
                <button
                  type="submit"
                  style={styles.formButton}
                  onMouseOver={(e) => Object.assign(e.currentTarget.style, styles.formButtonHover)}
                  onMouseOut={(e) => Object.assign(e.currentTarget.style, styles.formButton)}
                >
                  Subscribe
                </button>
              </form>
              {message && <p style={{ color: "white", textAlign: "center", marginTop: "10px" }}>{message}</p>}
            </div>
          </div>
        </div>
      </div>
      <style>{styles.shimmerKeyframes}</style>
    </footer>
  );
};

export default Footer;