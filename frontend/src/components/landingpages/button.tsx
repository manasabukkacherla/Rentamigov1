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
    flexWrap: "wrap",
    gap: "20px",
    padding: "20px",
    width: "100vw", // Full width of the viewport
    justifyContent: "center",
    marginLeft: "-60px", 
  },
  
  section: {
    flex: "1 1 calc(50% - 20px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
    position: "relative",
    height: "calc(85vh - 40px)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  overlay: {
    position: "absolute",
    top: "35%",
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 2,
    textAlign: "center",
    width: "80%", // Adjusted width for better text fit
  },
  text: {
    color: "white",
    fontSize: "2rem", // Base font size for large screens
    fontWeight: "bold",
    //fontFamily: "Britannic Bold",
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
    color: "white", // White text
    cursor: "pointer",
    backgroundColor: "black", // Black background
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
    backgroundImage: "url(./images/aaron-huber-G7sE2S4Lab4-unsplash.jpg)",
    opacity: 0.8, // Added max opacity for black effect
  },
  "section-2": {
    animation: "section2Background 17s infinite",
    backgroundImage: "url(https://source.unsplash.com/random/1920x1080?ocean)",
    opacity: 0.8, // Added max opacity for black effect
  },
};

// CSS Keyframes and Media Queries
const keyframesCSS = `
@keyframes section1Background {
  0%, 25% { 
    background-image: url('./images/Ownerone.jpg'); 
    background-color: rgba(0, 0, 0, 0.6); /* Black opacity overlay */
    background-blend-mode: overlay; 
  }
  26%, 50% { 
    background-image: url('./images/Ownertwo.jpg'); 
    background-color: rgba(0, 0, 0, 0.6); /* Black opacity overlay */
    background-blend-mode: overlay;
  }
  51%, 75% { 
    background-image: url('./images/Ownerthree.jpg'); 
    background-color: rgba(0, 0, 0, 0.6); /* Black opacity overlay */
    background-blend-mode: overlay;
  }
  76%, 100% { 
    background-image: url('./images/Ownerfour.jpg'); 
    background-color: rgba(0, 0, 0, 0.6); /* Black opacity overlay */
    background-blend-mode: overlay;
  }
}

@keyframes section2Background {
  0%, 25% { 
    background-image: url('./images/Tenantone.jpg'); 
    background-color: rgba(0, 0, 0, 0.6); /* Black opacity overlay */
    background-blend-mode: overlay;
  }
  26%, 50% { 
    background-image: url('./images/Tenanttwo.jpg'); 
    background-color: rgba(0, 0, 0, 0.6); /* Black opacity overlay */
    background-blend-mode: overlay;
  }
  51%, 75% { 
    background-image: url('./images/Tenantthree.jpg'); 
    background-color: rgba(0, 0, 0, 0.6); /* Black opacity overlay */
    background-blend-mode: overlay;
  }
  76%, 100% { 
    background-image: url('./images/Tenantfour.jpg'); 
    background-color: rgba(0, 0, 0, 0.6); /* Black opacity overlay */
    background-blend-mode: overlay;
  }
}

/* Add hover styles for buttons */
.hover-button:hover {
  transform: scale(1.1); /* Slightly enlarge the button */
  background-color: rgba(0, 0, 0, 0.8); /* Slightly lighter black */
}

/* Responsive Styles */
@media (max-width: 768px) {
  .hover-button {
    font-size: 1rem;
    width: 150px;
    height: 45px;
  }
  .overlay p {
    font-size: 1.5rem; /* Smaller description text on mobile */
  }
  .overlay {
    top: 30%; /* Adjust positioning for smaller screens */
    width: 90%;
  }
}

@media (max-width: 480px) {
  .hover-button {
    font-size: 0.9rem;
    width: 120px;
    height: 40px;
  }
  .overlay p {
    font-size: 1.2rem; /* Further reduced text size for very small screens */
  }
  .overlay {
    top: 25%; /* Adjust positioning for very small screens */
  }
}
`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = keyframesCSS;
document.head.appendChild(styleSheet);

export default Buttons;