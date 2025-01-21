import { Search } from "lucide-react";
import React from "react";

interface SearchBarProps {
  onSearch: (query: string) => void; // Prop for handling search input
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value); // Pass the input value to the parent
  };

  return (
    <div style={styles.container}>
      <style>
        {`
          .search-bar-container {
            position: relative;
            width: 100%;
            max-width: 500px; /* Default width for large screens */
            margin: 0 auto;
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

          /* Medium Screen Adjustments */
          @media screen and (max-width: 1024px) {
            .search-bar-container {
              max-width: 400px; /* Adjust width for medium screens */
            }

            .search-bar-input {
              font-size: 15px; /* Slightly smaller font */
              padding: 10px 40px 10px 15px; /* Adjust padding */
            }
          }

          /* Small Screen Adjustments */
          @media screen and (max-width: 768px) {
            .search-bar-container {
              max-width: 300px; /* Fixed width for small screens */
            }

            .search-bar-input {
              width: 100%; /* Ensure it fills the container */
              font-size: 14px; /* Smaller font size */
              padding: 10px 35px 10px 15px; /* Adjust padding */
            }

            .search-icon {
              right: 20px; /* Position the search icon closer */
            }
          }

          /* Very Small Screen Adjustments */
          @media screen and (max-width: 480px) {
            .search-bar-container {
              max-width: 250px; /* Narrow width for very small screens */
            }

            .search-bar-input {
              font-size: 12px; /* Smallest font size */
              padding: 8px 30px 8px 10px; /* Compact padding */
            }

            .search-icon {
              right: 15px; /* Adjust search icon position */
            }
          }
        `}
      </style>
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search properties..."
          className="search-bar-input"
          onChange={handleInputChange} // Trigger search on input change
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
    margin: "20px 0",
  },
};

export default SearchBar;
