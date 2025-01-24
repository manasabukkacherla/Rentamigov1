import React from "react";

const Buttons: React.FC = () => {
  const sections = [
    {
      id: 1,
      className: "section-1",
      buttonText: "List with us",
      link: "/owner-page",
      description: "From vacancies to value - we've got it covered !!",
    },
    {
      id: 2,
      className: "section-2",
      buttonText: "Rent with us",
      link: "/Tenanthome",
      description: "From move-in to maintenance - we've got you covered !!",
    },
  ];

  return (
    <div style={styles.container}>
      {sections.map((section) => (
        <div
          key={section.id}
          style={{
            ...styles.section,
            ...sectionStyles[section.className],
          }}
        >
          {section.description && (
            <div style={styles.overlay}>
              <p style={styles.text}>{section.description}</p>
            </div>
          )}
          <a href={section.link} style={styles.link}>
            <button style={styles.button} className="hover-button">
              {section.buttonText}
            </button>
          </a>
        </div>
      ))}
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: "flex",
    flexWrap: "wrap", // Allows wrapping for mobile screens
    width: "calc(100% - 20px)", // Full width minus the gap on both sides
    height: "100vh", // Full height of the viewport
    margin: "0 auto", // Center the container horizontally
    padding: "0 10px", // Equal padding on left and right
    boxSizing: "border-box", // Include padding and borders in dimensions
    gap: "10px", // Space between the two images
  },
  section: {
    flex: "1 1 calc(50% - 10px)", // Each image takes up 50% width minus the gap
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
    position: "relative",
    backgroundSize: "cover", // Ensure images cover the entire section
    backgroundPosition: "center",
    height: "100%", // Full height of the section
    borderRadius: "0", // No rounded corners
  },
  overlay: {
    position: "absolute",
    top: "35%",
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 2,
    textAlign: "center",
    width: "80%",
  },
  text: {
    color: "white",
    fontSize: "2rem",
    fontWeight: "bold",
    padding: "10px 0",
    textAlign: "center",
  },
  button: {
    width: "200px",
    height: "50px",
    margin: "20px",
    border: "none",
    fontSize: "1.2rem",
    fontWeight: "bold",
    fontFamily: "Britannic Bold",
    color: "white",
    cursor: "pointer",
    backgroundColor: "black",
    borderRadius: "5px",
    transition: "transform 0.3s ease, background-color 0.3s ease",
    zIndex: 2,
  },
  link: {
    textDecoration: "none",
  },
};

const sectionStyles: Record<string, React.CSSProperties> = {
  "section-1": {
    animation: "section1Background 17s infinite",
    backgroundImage: "url('./images/aaron-huber-G7sE2S4Lab4-unsplash.jpg')",
  },
  "section-2": {
    animation: "section2Background 17s infinite",
    backgroundImage: "url('https://source.unsplash.com/random/1920x1080?ocean')",
  },
};

// CSS Keyframes and Media Queries
const keyframesCSS = `
@keyframes section1Background {
  0%, 25% { background-image: url('./images/Ownerone.jpg'); }
  26%, 50% { background-image: url('./images/Ownertwo.jpg'); }
  51%, 75% { background-image: url('./images/Ownerthree.jpg'); }
  76%, 100% { background-image: url('./images/Ownerfour.jpg'); }
}

@keyframes section2Background {
  0%, 25% { background-image: url('./images/Tenantone.jpg'); }
  26%, 50% { background-image: url('./images/Tenanttwo.jpg'); }
  51%, 75% { background-image: url('./images/Tenantthree.jpg'); }
  76%, 100% { background-image: url('./images/Tenantfour.jpg'); }
}

/* Add hover styles for buttons */
.hover-button:hover {
  transform: scale(1.1);
  background-color: rgba(0, 0, 0, 0.8);
}

/* Responsive Styles */
@media (max-width: 768px) {
  .hover-button {
    font-size: 1rem;
    width: 150px;
    height: 45px;
  }
  .overlay p {
    font-size: 1.5rem;
  }
  .overlay {
    top: 30%;
    width: 90%;
  }
}

/* Mobile View: Stack images vertically */
@media (max-width: 768px) {
  .section-1,
  .section-2 {
    flex: 1 1 100%; /* Each image takes full width */
    height: 50vh; /* Adjust height for stacked images */
  }
  .container {
    flexDirection: column; /* Stack sections vertically */
    padding: 0 10px; /* Maintain consistent padding on smaller screens */
  }
}
`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = keyframesCSS;
document.head.appendChild(styleSheet);

export default Buttons;
