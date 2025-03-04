import { Search } from "lucide-react";
import React from "react";

const ResponsiveSearchBar: React.FC = () => {
  return (
    <div style={styles.container}>
      <style>
        {`
          .responsive-search-bar-container {
            position: relative;
            width: 100%;
            max-width: 500px;
          }

          .responsive-search-bar-input {
            width: 100%;
            padding: 8px 45px 8px 20px;
            font-size: 16px;
            border: 2px solid #ddd;
            border-radius: 30px;
            outline: none;
            transition: all 0.3s ease;
            background-color: #ffffff;
            color: #333;
          }

          .responsive-search-bar-input:hover {
            border-color: black;
          }

          .responsive-search-icon {
            position: absolute;
            right: 15px;
            top: 50%;
            transform: translateY(-50%);
            color: #666;
          }

          @media (max-width: 768px) {
            .search-bar-container {
              max-width: 80%;
              margin: 0 auto;
            }

            .search-bar-input {
              padding: 10px 40px 10px 15px;
              font-size: 14px;
            }

            .search-icon {
              right: 12px;
              width: 18px;
              height: 18px;
            }
          }

        @media (max-width: 480px) {
            .responsive-search-bar-container {
              max-width: 85%;
              margin-left:0px;
              ;    
            }

            .responsive-search-bar-input {
              padding: 4px 35px 4px 12px;
              font-size: 13px;
               height: 28px;
            }

            .responsive-search-icon {
              right: 10px;
              width: 16px;
              height: 16px;
            }
          }
        `}
      </style>
      <div className="responsive-search-bar-container">
        <input
          type="text"
          placeholder="Search..."
          className="search-bar-input"
        />
        <Search className="search-icon" size={20} />
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "64px",
    width: "100%",
    padding: "0 15px",
    boxSizing: "border-box",
    height: "48px",
  },
};

export default ResponsiveSearchBar;
