const globalStyles = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box; /* Ensure padding and borders don't cause overflow */
  }
  html, body {
    width: 100%;
    overflow-x: hidden; /* Completely hide horizontal scrollbars */
  }
  body {
    margin: 0;
    padding: 0;
  }
`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = globalStyles;
document.head.appendChild(styleSheet);

import React from "react";
import Header from "./headerr";
import Button from "./button";
import Icons from "./icons";
import Linkbutton from "./linkbutton";
import Testimonials from "./testimonials";
import Footer from "./Footer";

const Homepage: React.FC = () => {
  const containerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    width: "100%", // Prevent any child from exceeding the viewport width
    overflowX: "hidden", // Hide horizontal overflow
  };

  const contentStyle: React.CSSProperties = {
    marginTop: "50px",
    padding: "50px",
    width: "100%", // Ensure full-width usage without overflow
    boxSizing: "border-box", // Include padding/borders in width calculation
  };

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        <Header />
        <Button />
        <Icons />
        <Linkbutton />
        <Testimonials />
      </div>
      <Footer />
    </div>
  );
};

export default Homepage;