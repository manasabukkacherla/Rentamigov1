import { Search } from "lucide-react";
import React from "react";

const SearchBar: React.FC = () => {
  return (
    <div style={styles.container}>
      <style>
        {`
          .search-bar-container {
            position: relative;
            width: 100%;
            max-width: 500px;
          }

          .search-bar-input {
            width: 100%;
            padding: 12px 45px 12px 20px;
            font-size: 16px;
            border: 2px solid #ddd;
            border-radius: 30px;
            outline: none;
            transition: all 0.3s ease;
            background-color: #ffffff;
            color: #333;
          }

          .search-bar-input:hover {
            border-color: black;
          }

          .search-icon {
            position: absolute;
            right: 15px;
            top: 50%;
            transform: translateY(-50%);
            color: #666;
          }

          @media screen and (max-width: 768px) {
            .search-bar-container {
              display: none;
            }
          }
        `}
      </style>
      <div className="search-bar-container">
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
    marginTop: "85px",
  },
};

export default SearchBar;
